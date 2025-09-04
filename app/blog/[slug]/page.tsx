import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'

interface BlogPostProps {
  params: {
    slug: string
  }
}

function getPostData(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  try {
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      title: data.title || 'Untitled',
      subtitle: data.subtitle,
      date: data.date || new Date().toISOString(),
      featuredImage: data.featuredImage,
      author: data.author || 'YES English Team',
      content
    }
  } catch (error) {
    console.error('Error reading post:', error)
    return null
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }
    
    const fileNames = fs.readdirSync(postsDirectory)
    
    const params = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => ({
        slug: fileName.replace(/\.md$/, '')
      }))
    
    // Return empty array if no posts exist yet
    // This is required for static export
    if (params.length === 0) {
      return []
    }
    
    return params
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default function BlogPost({ params }: BlogPostProps) {
  const post = getPostData(params.slug)
  
  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}

export async function generateMetadata({ params }: BlogPostProps) {
  const post = getPostData(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | YES English Blog'
    }
  }
  
  return {
    title: `${post.title} | YES English Blog`,
    description: post.subtitle || post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.subtitle || post.content.slice(0, 160),
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.featuredImage ? [post.featuredImage] : []
    }
  }
}