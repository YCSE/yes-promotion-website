import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'YES 화상영어 블로그 - 영어학습 팁 & 화상영어 가이드',
  description: '화상영어 학습법, 원어민 영어회화 꿀팁, 효과적인 온라인 영어 공부법을 YES 화상영어 블로그에서 확인하세요. 캠블리, 링글보다 효과적인 학습 노하우 공개!',
  keywords: '화상영어 블로그, 영어학습 팁, 화상영어 노하우, 온라인영어 학습법, 원어민 영어회화, YES 블로그, 화상영어 후기, 영어공부법',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://yourenglishschool.co.kr/blog',
    title: 'YES 화상영어 블로그 - 영어학습 팁 & 화상영어 가이드',
    description: '실전 화상영어 학습법과 원어민 영어회화 팁을 YES 블로그에서 만나보세요',
    siteName: 'YES 화상영어',
    images: [
      {
        url: '/ogimage.jpg',
        width: 1200,
        height: 630,
        alt: 'YES 화상영어 블로그',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YES 화상영어 블로그',
    description: '실전 화상영어 학습법과 원어민 영어회화 팁',
    images: ['/ogimage.jpg'],
  },
  alternates: {
    canonical: 'https://yourenglishschool.co.kr/blog',
    types: {
      'application/rss+xml': 'https://yourenglishschool.co.kr/rss.xml',
    },
  },
}

interface PostData {
  slug: string
  title: string
  subtitle?: string
  date: string
  featuredImage?: string
  excerpt: string
}

function getAllPosts(): PostData[] {
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

export default function BlogPage() {
  const posts = getAllPosts()
  
  return <BlogPageClient posts={posts} />
}