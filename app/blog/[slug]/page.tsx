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
      title: 'Post Not Found | YES 화상영어 블로그',
      description: 'YES 화상영어 블로그에서 영어 학습 팁과 화상영어 수업 노하우를 확인하세요.'
    }
  }
  
  const description = post.subtitle || post.content.slice(0, 160).replace(/[#*\n]/g, ' ').trim()
  
  return {
    title: `${post.title} | YES 화상영어 블로그`,
    description: description,
    keywords: `화상영어, 영어회화, 온라인영어, ${post.title}, YES화상영어, 영어학습, 영어공부, 화상영어수업, 1대1영어, 영어스피킹, 비즈니스영어, 토익스피킹, 오픽대비`,
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} | YES 화상영어`,
      description: description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.featuredImage ? [{
        url: post.featuredImage,
        width: 1200,
        height: 630,
        alt: post.title
      }] : [{
        url: '/ogimage.jpg',
        width: 1200,
        height: 630,
        alt: 'YES 화상영어'
      }],
      siteName: 'YES 화상영어',
      locale: 'ko_KR',
      url: `https://yourenglishschool.co.kr/blog/${params.slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | YES 화상영어`,
      description: description,
      images: post.featuredImage ? [post.featuredImage] : ['/ogimage.jpg'],
      creator: '@yesenglish',
      site: '@yesenglish'
    },
    alternates: {
      canonical: `https://yourenglishschool.co.kr/blog/${params.slug}`
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
}