import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { getAllPosts, getRandomPosts } from '@/lib/posts'

export default function BlogSection() {
  // Get all posts from content directory
  const allPosts = getAllPosts()
  
  // Get 3 random posts
  const randomPosts = getRandomPosts(allPosts, 3)

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