'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { PostData as RelatedPostData } from '@/lib/posts'

interface PostData {
  slug: string
  title: string
  subtitle?: string
  date: string
  featuredImage?: string
  author: string
  content: string
}

interface BlogPostClientProps {
  post: PostData
  relatedPosts: RelatedPostData[]
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  // Responsive related posts count
  const [displayPosts, setDisplayPosts] = useState(relatedPosts.slice(0, 3))
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDisplayPosts(relatedPosts.slice(0, 2))
      } else {
        setDisplayPosts(relatedPosts.slice(0, 3))
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [relatedPosts])
  
  // Custom components for ReactMarkdown
  const markdownComponents: any = {
    h1: ({ children }: any) => (
      <h1 className="text-[32px] md:text-[42px] font-bold mt-12 mb-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-[28px] md:text-[36px] font-bold mt-10 mb-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-[24px] md:text-[28px] font-bold mt-8 mb-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-[20px] md:text-[24px] font-bold mt-6 mb-3">{children}</h4>
    ),
    p: ({ children }: any) => (
      <p className="text-[16px] md:text-[18px] leading-relaxed text-gray-700 mb-4">{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-none space-y-3 my-6">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-none space-y-3 my-6 counter-reset-list">{children}</ol>
    ),
    li: ({ children, ordered, index }: any) => (
      <li className="text-[16px] md:text-[18px] leading-relaxed text-gray-700">
        {children}
      </li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#4B52AE] pl-4 py-2 my-4 italic bg-gray-50 rounded-r">
        {children}
      </blockquote>
    ),
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '')
      const isInline = inline !== false && !match
      
      if (isInline) {
        return <code className="bg-blue-50 text-blue-900 px-2 py-1 rounded text-sm font-medium" {...props}>{children}</code>
      }
      
      // For block code, use a more subtle styling for English examples
      return (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg my-4">
          <code className="text-blue-900 font-medium text-[16px] md:text-[18px]" {...props}>{children}</code>
        </div>
      )
    },
    pre: ({ children }: any) => {
      return <>{children}</>
    },
    strong: ({ children }: any) => {
      // Check if children is a string with quotes at start and end
      if (typeof children === 'string') {
        const text = children
        // Handle patterns like '텍스트' or "텍스트"
        if ((text.startsWith("'") && text.endsWith("'")) || 
            (text.startsWith('"') && text.endsWith('"'))) {
          return (
            <span className="font-bold text-[#4B52AE]">
              {text}
            </span>
          )
        }
      }
      return <strong className="font-bold">{children}</strong>
    },
    em: ({ children }: any) => <em className="italic">{children}</em>,
    hr: () => <hr className="my-8 border-gray-300" />,
    a: ({ href, children }: any) => (
      <a href={href} className="text-[#4B52AE] underline hover:text-[#3A4199]" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    img: ({ src, alt }: any) => (
      <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-4" />
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-gray-300">{children}</table>
      </div>
    ),
    thead: ({ children }: any) => <thead className="bg-gray-100">{children}</thead>,
    tbody: ({ children }: any) => <tbody>{children}</tbody>,
    tr: ({ children }: any) => <tr className="border-b border-gray-300">{children}</tr>,
    th: ({ children }: any) => (
      <th className="px-4 py-2 text-left font-bold border-r border-gray-300">{children}</th>
    ),
    td: ({ children }: any) => (
      <td className="px-4 py-2 border-r border-gray-300">{children}</td>
    ),
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
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 ? (
        <div className="bg-[#F8F9FA] py-[60px] md:py-[100px]">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-[24px] md:text-[32px] font-bold mb-[40px] md:mb-[60px]">
              함께 읽어볼 글
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
              {displayPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug} 
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="h-full flex flex-col">
                    {/* Square Image */}
                    <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-[20px] mb-4">
                      {relatedPost.featuredImage ? (
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <time className="text-[12px] md:text-[14px] text-gray-500 mb-2">
                        {format(new Date(relatedPost.date), 'yyyy년 M월 d일', { locale: ko })}
                      </time>
                      
                      <h3 className="text-[16px] md:text-[20px] font-medium mb-2 line-clamp-2 leading-[24px] md:leading-[28px] tracking-[-0.48px] md:tracking-[-0.54px] group-hover:text-[#4B52AE] transition-colors">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-[14px] md:text-[16px] text-[#555555] line-clamp-2 font-light leading-[20px] md:leading-[24px] tracking-[-0.42px] md:tracking-[-0.48px]">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Fallback Footer - only shown when no related posts */
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
      )}
    </article>
  )
}