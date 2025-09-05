import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostData {
  slug: string
  title: string
  subtitle?: string
  date: string
  featuredImage?: string
  excerpt: string
}

export function getAllPosts(): PostData[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
      return []
    }
    
    const fileNames = fs.readdirSync(postsDirectory)
    
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        
        // Extract excerpt from content (first paragraph or first 200 chars)
        const contentWithoutFrontmatter = content.trim()
        const firstParagraph = contentWithoutFrontmatter.split('\n\n')[0] || ''
        const excerpt = firstParagraph.replace(/[#*\[\]]/g, '').trim().slice(0, 200)
        
        return {
          slug,
          title: data.title || 'Untitled',
          subtitle: data.subtitle,
          date: data.date || new Date().toISOString(),
          featuredImage: data.featuredImage,
          excerpt: data.excerpt || excerpt
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return posts
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

// Get random posts (up to the count specified)
export function getRandomPosts(posts: PostData[], count: number): PostData[] {
  const shuffled = [...posts].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, posts.length))
}

// Get related posts for a specific post
export function getRelatedPosts(currentSlug: string, count: number = 3): PostData[] {
  const allPosts = getAllPosts()
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug)
  // Return random posts from the remaining ones
  return getRandomPosts(otherPosts, count)
}