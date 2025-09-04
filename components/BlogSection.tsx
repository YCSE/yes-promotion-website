'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useState, useEffect } from 'react'

interface PostData {
  slug: string
  title: string
  subtitle?: string
  date: string
  featuredImage?: string
  excerpt: string
}

// Mock data - same as blog page
const mockPosts: PostData[] = [
  {
    slug: '2025-09-04-movies-tv-language-learning-1',
    title: '영화와 드라마로 영어 정복! 나만의 스마트 학습 툴킷 만들기',
    subtitle: '넷플릭스, 디즈니+ 이제는 영어 실력 향상의 무한한 보고!',
    date: '2025-09-04T16:37:25.557Z',
    featuredImage: '/images/blog/2025-09-04-movies-tv-language-learning-1.jpg',
    excerpt: '영화와 드라마를 통해 영어 학습의 지루함을 없애고, 즐거움과 효과를 동시에 잡으세요. 나만의 맞춤형 학습 툴킷을 만들어 꾸준히 영어 실력을 향상시키는 방법을 알려드립니다.'
  },
  {
    slug: '2025-09-04-inversion-emphasis-english-1',
    title: '영어 도치 구문 완벽 가이드: 강조와 리듬의 예술',
    subtitle: '원어민처럼 말하기 위한 고급 문법 테크닉',
    date: '2025-09-04T15:00:00.000Z',
    featuredImage: '/images/blog/2025-09-04-inversion-emphasis-english-1.jpg',
    excerpt: '영어의 도치 구문은 단순한 문법 규칙을 넘어 언어의 예술적 표현입니다. 강조, 리듬, 그리고 격식을 더하는 도치 구문을 마스터해보세요.'
  }
]

// Get random posts (up to the count specified)
function getRandomPosts(posts: PostData[], count: number): PostData[] {
  const shuffled = [...posts].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, posts.length))
}

export default function BlogSection() {
  const [randomPosts, setRandomPosts] = useState<PostData[]>([])

  useEffect(() => {
    setRandomPosts(getRandomPosts(mockPosts, 2))
  }, [])

  return (
    <section className="relative w-full pt-[80px] md:pt-[150px] lg:pt-[200px] pb-[40px] md:pb-[75px] lg:pb-[100px] bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Title */}
        <h2 className="text-[28px] md:text-[40px] lg:text-[50px] font-extrabold text-center mb-[50px] md:mb-[80px] lg:mb-[100px] leading-[36px] md:leading-[50px] lg:leading-[60px] tracking-[-0.8px] md:tracking-[-1.2px] lg:tracking-[-1.5px]">
          YES 블로그에 초대합니다
        </h2>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-[50px] md:mb-[80px]">
          {randomPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="bg-white h-full flex flex-col">
                {/* Square Image */}
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-[20px] mb-4">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <time className="text-[14px] text-gray-500 mb-2">
                    {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                  </time>
                  
                  <h3 className="text-[18px] md:text-[20px] font-medium mb-2 line-clamp-2 leading-[28px] tracking-[-0.54px] group-hover:text-[#4B52AE] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-[14px] md:text-[16px] text-[#555555] line-clamp-2 font-light leading-[24px] tracking-[-0.48px]">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* More Button */}
        <div className="flex justify-center">
          <Link 
            href="/blog"
            className="relative block w-[350px] h-[100px] rounded-[100px] border border-black border-solid hover:bg-black hover:text-white transition-all duration-300 group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bold text-[25px] leading-[40px] tracking-[-0.75px] text-center text-black group-hover:text-white transition-colors duration-300">
                더 보기
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}