import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { notFound } from 'next/navigation'

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
    if (!fs.existsSync(postsDirectory)) {
      return []
    }
    
    const fileNames = fs.readdirSync(postsDirectory)
    
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => ({
        slug: fileName.replace(/\.md$/, '')
      }))
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

  // Convert markdown to HTML (simple conversion for now)
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        // Headers
        if (paragraph.startsWith('### ')) {
          return `<h3 key="${index}" class="text-[24px] md:text-[28px] font-bold mt-8 mb-4">${paragraph.replace('### ', '')}</h3>`
        }
        if (paragraph.startsWith('## ')) {
          return `<h2 key="${index}" class="text-[28px] md:text-[36px] font-bold mt-10 mb-6">${paragraph.replace('## ', '')}</h2>`
        }
        if (paragraph.startsWith('# ')) {
          return `<h1 key="${index}" class="text-[32px] md:text-[42px] font-bold mt-12 mb-8">${paragraph.replace('# ', '')}</h1>`
        }
        
        // Lists
        if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
          const items = paragraph.split('\n').map(item => 
            `<li>${item.replace(/^[-*]\s/, '')}</li>`
          ).join('')
          return `<ul key="${index}" class="list-disc list-inside space-y-2 my-4">${items}</ul>`
        }
        
        // Numbered lists
        if (paragraph.match(/^\d+\.\s/)) {
          const items = paragraph.split('\n').map(item => 
            `<li>${item.replace(/^\d+\.\s/, '')}</li>`
          ).join('')
          return `<ol key="${index}" class="list-decimal list-inside space-y-2 my-4">${items}</ol>`
        }
        
        // Bold and italic
        let formatted = paragraph
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>')
          .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded">$1</code>')
        
        // Regular paragraph
        return `<p key="${index}" class="text-[16px] md:text-[18px] leading-relaxed text-gray-700">${formatted}</p>`
      })
      .join('')
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Header */}
      <div className="w-full py-[60px] md:py-[100px] bg-[#F8F9FA]">
        <div className="max-w-[900px] mx-auto px-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-[#4B52AE] hover:underline mb-6 text-[16px]"
          >
            ← 블로그로 돌아가기
          </Link>
          
          <h1 className="text-[32px] md:text-[48px] lg:text-[60px] font-bold leading-tight mb-4">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="text-[18px] md:text-[24px] text-gray-600 mb-6">
              {post.subtitle}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-gray-500 text-[14px] md:text-[16px]">
            <span>{post.author}</span>
            <span>•</span>
            <time>{format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}</time>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="max-w-[900px] mx-auto px-6 -mt-[30px] mb-[60px]">
          <div className="relative w-full h-[300px] md:h-[500px] rounded-[20px] overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 py-[40px] md:py-[80px]">
        <div 
          className="prose prose-lg max-w-none space-y-6"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />
      </div>

      {/* Footer */}
      <div className="max-w-[900px] mx-auto px-6 py-[60px] border-t border-gray-200">
        <div className="text-center">
          <p className="text-[20px] font-bold mb-4">더 많은 영어 학습 팁이 필요하신가요?</p>
          <Link 
            href="/blog" 
            className="inline-block px-8 py-3 bg-[#4B52AE] text-white rounded-full hover:bg-[#3A4199] transition-colors text-[16px] font-medium"
          >
            다른 글 보기
          </Link>
        </div>
      </div>
    </article>
  )
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