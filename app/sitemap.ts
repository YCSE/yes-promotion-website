import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function getAllBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }
    
    const fileNames = fs.readdirSync(postsDirectory)
    
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          slug: fileName.replace(/\.md$/, ''),
          date: data.date || new Date().toISOString(),
          title: data.title || 'Untitled'
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return posts
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error)
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourenglishschool.co.kr'
  const currentDate = new Date().toISOString()
  
  // Get all blog posts
  const blogPosts = getAllBlogPosts()
  
  // Create sitemap entries for blog posts
  const blogPostEntries = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))
  
  // Main sitemap structure
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    ...blogPostEntries
  ]
  
  return routes
}