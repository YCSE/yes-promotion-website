'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import type { PostData } from '@/lib/posts'

interface RelatedPostsProps {
  posts: PostData[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  // Responsive related posts count
  const [displayPosts, setDisplayPosts] = useState(posts.slice(0, 3))

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDisplayPosts(posts.slice(0, 2))
      } else {
        setDisplayPosts(posts.slice(0, 3))
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [posts])

  if (posts.length === 0) {
    return (
      <div className="max-w-[900px] mx-auto px-6 py-[60px] border-t border-gray-200">
        <div className="text-center">
          <p className="text-[20px] font-bold mb-4">더 많은 영어 학습 팁이 필요하신가요?</p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-[#3E86D9] text-white rounded-full hover:bg-[#3676BF] transition-colors text-[16px] font-medium"
          >
            다른 글 보기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#F8F9FA] py-[60px] md:py-[100px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-[24px] md:text-[32px] font-bold mb-[40px] md:mb-[60px]">
          함께 읽어볼 글
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
          {displayPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="h-full flex flex-col">
                {/* Square Image */}
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-[10px] mb-4">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
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
                  <time className="type-h6 blog-list-meta font-num text-gray-500 mb-2">
                    {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                  </time>

                  <h3 className="text-[16px] md:text-[20px] font-medium mb-2 line-clamp-2 leading-[24px] md:leading-[28px] tracking-[-0.48px] md:tracking-[-0.54px] group-hover:text-[#3E86D9] transition-colors">
                    {post.title}
                  </h3>

                  <p className="blog-list-copy text-[14px] md:text-[16px] text-[#555555] line-clamp-2 font-light leading-[20px] md:leading-[24px] tracking-[-0.42px] md:tracking-[-0.48px]">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
