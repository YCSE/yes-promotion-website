import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { MDXComponents } from '@/components/mdx/MDXComponents'
import remarkGfm from 'remark-gfm'
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

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {

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
        <article className="prose prose-lg max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={MDXComponents}
          />
        </article>
      </div>

      {/* Related Posts Section */}
      <RelatedPosts posts={relatedPosts} />
    </article>
  )
}