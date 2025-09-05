'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface PostData {
  slug: string
  title: string
  subtitle?: string
  date: string
  featuredImage?: string
  excerpt: string
}

interface BlogPageClientProps {
  posts: PostData[]
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [displayCount, setDisplayCount] = useState(7) // Show featured + 6 posts initially
  
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1, displayCount)
  const hasMore = displayCount < posts.length

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 6, posts.length))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Blog Posts Section */}
      <div className="max-w-[1280px] mx-auto px-6 py-[80px] md:py-[100px]">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-[18px]">
              아직 작성된 포스트가 없습니다. 곧 유용한 콘텐츠가 업로드됩니다!
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="group block mb-[80px] md:mb-[100px]"
              >
                <article className="bg-white">
                  <div className="flex flex-col">
                    {/* Featured Image */}
                    <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] bg-gray-100 overflow-hidden rounded-[20px] mb-8">
                      {featuredPost.featuredImage ? (
                        <Image
                          src={featuredPost.featuredImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 1080px"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                      )}
                    </div>
                    
                    {/* Content below image */}
                    <div className="flex flex-col">
                      <time className="text-[14px] text-gray-500 mb-3">
                        {format(new Date(featuredPost.date), 'yyyy년 M월 d일', { locale: ko })}
                      </time>
                      
                      <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-medium mb-4 leading-tight tracking-[-0.66px]">
                        {featuredPost.title}
                      </h2>
                      
                      {featuredPost.subtitle && (
                        <p className="text-[18px] text-gray-600 mb-4 font-light tracking-[-0.54px]">
                          {featuredPost.subtitle}
                        </p>
                      )}
                      
                      <p className="text-[16px] lg:text-[18px] text-[#555555] line-clamp-3 font-light leading-[28px] tracking-[-0.54px]">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="mt-6 text-[#4B52AE] font-medium text-[18px] group-hover:underline">
                        자세히 읽기 →
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Remaining Posts Grid */}
            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 mb-[80px]">
                {remainingPosts.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <article className="bg-white h-full flex flex-col">
                      {/* Square Image */}
                      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-[20px] mb-4">
                        {post.featuredImage ? (
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 347px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <time className="text-[12px] md:text-[14px] text-gray-500 mb-1 md:mb-2">
                          {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                        </time>
                        
                        <h3 className="text-[14px] md:text-[20px] font-medium mb-1 md:mb-2 line-clamp-2 leading-[20px] md:leading-[28px] tracking-[-0.42px] md:tracking-[-0.54px] group-hover:text-[#4B52AE] transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-[12px] md:text-[16px] text-[#555555] line-clamp-2 font-light leading-[18px] md:leading-[24px] tracking-[-0.36px] md:tracking-[-0.48px]">
                          {post.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mb-[100px]">
                <button
                  onClick={handleLoadMore}
                  className="relative w-[200px] h-[60px] md:w-[300px] md:h-[80px] lg:w-[350px] lg:h-[100px] rounded-[100px] border border-black border-solid hover:bg-black hover:text-white transition-all duration-300 group"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-bold text-[18px] md:text-[22px] lg:text-[25px] leading-[28px] md:leading-[35px] lg:leading-[40px] tracking-[-0.54px] md:tracking-[-0.66px] lg:tracking-[-0.75px] text-center text-black group-hover:text-white transition-colors duration-300">
                      더보기
                    </span>
                  </div>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}