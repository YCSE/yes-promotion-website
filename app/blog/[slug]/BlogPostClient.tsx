'use client'

import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  // Custom components for ReactMarkdown
  const markdownComponents = {
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
      <ul className="list-disc list-inside space-y-2 my-4 ml-4">{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 my-4 ml-4">{children}</ol>
    ),
    li: ({ children }: any) => (
      <li className="text-[16px] md:text-[18px] leading-relaxed text-gray-700">{children}</li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#4B52AE] pl-4 py-2 my-4 italic bg-gray-50 rounded-r">
        {children}
      </blockquote>
    ),
    code: ({ inline, children }: any) => {
      if (inline) {
        return <code className="bg-gray-100 px-2 py-1 rounded text-sm">{children}</code>
      }
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
          <code>{children}</code>
        </pre>
      )
    },
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
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