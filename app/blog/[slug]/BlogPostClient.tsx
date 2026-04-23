import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import { MDXComponents } from '@/components/mdx/MDXComponents'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import type { PostData as RelatedPostData } from '@/lib/posts'
import RelatedPosts from './RelatedPosts'

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

/**
 * Pre-process markdown to convert **bold** to <strong> HTML tags.
 * CommonMark emphasis parsing fails when bold text ends with punctuation
 * (e.g., parentheses or quotes) and is immediately followed by CJK characters,
 * because the closing ** is not recognized as a right-flanking delimiter run.
 */
function preprocessBoldMarkers(content: string): string {
  const lines = content.split('\n')
  const result: string[] = []

  for (const line of lines) {
    // Skip code blocks and headings
    if (line.startsWith('```') || line.startsWith('    ')) {
      result.push(line)
      continue
    }
    // Replace **...** with <strong>...</strong> on non-code lines
    result.push(line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'))
  }

  return result.join('\n')
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {

  return (
    <article className="min-h-screen bg-white">
      {/* Header */}
      <div className="w-full py-[60px] md:py-[100px] bg-[#F8F9FA]">
        <div className="page-shell">
          <div className="max-w-[900px] mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-[#3E86D9] hover:underline mb-6 text-[16px]"
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
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="page-shell -mt-[30px] mb-[60px]">
          <div className="max-w-[900px] mx-auto">
          <div className="relative w-full h-[300px] md:h-[500px] rounded-[10px] overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover shadow-none"
              priority
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="page-shell py-[40px] md:py-[80px]">
        <div className="max-w-[900px] mx-auto">
        <article className="blog-content prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={MDXComponents}
          >
            {preprocessBoldMarkers(post.content)}
          </ReactMarkdown>
        </article>
        </div>
      </div>

      {/* Related Posts Section */}
      <RelatedPosts posts={relatedPosts} />
    </article>
  )
}
