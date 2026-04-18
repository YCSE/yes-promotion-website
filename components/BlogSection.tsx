import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { getAllPosts, getRandomPosts } from '@/lib/posts'

export default function BlogSection() {
  // Get all posts from content directory
  const allPosts = getAllPosts()
  
  // Get 3 random posts for desktop, will show 2 on mobile
  const randomPosts = getRandomPosts(allPosts, 3)

  return (
    <section className="relative w-full pt-[80px] md:pt-[150px] lg:pt-[200px] pb-[40px] md:pb-[75px] lg:pb-[100px] bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Title */}
        <h2 className="type-h2 text-center mb-[50px] md:mb-[80px] lg:mb-[100px]">
          <span lang="en" className="font-en">YES</span> 블로그에 초대합니다
        </h2>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-2 md:hidden gap-4 mb-[50px]">
          {randomPosts.slice(0, 2).map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="h-full flex flex-col">
                {/* Square Image */}
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-[15px] mb-3">
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
                  <time className="type-body-support font-num text-gray-500 mb-1">
                    {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                  </time>
                  
                  <h4 className="type-h5 mb-1 line-clamp-2 group-hover:text-[#3E86D9] transition-colors">
                    {post.title}
                  </h4>
                  
                  <p className="type-body-support text-[#555555] line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {/* Desktop/Tablet Grid - 3 posts */}
        <div className="hidden md:grid md:grid-cols-3 gap-10 mb-[80px]">
          {randomPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="h-full flex flex-col">
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
                  <time className="type-body-support font-num text-gray-500 mb-2">
                    {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                  </time>
                  
                  <h4 className="type-h5 mb-2 line-clamp-2 group-hover:text-[#3E86D9] transition-colors">
                    {post.title}
                  </h4>
                  
                  <p className="type-body-support text-[#555555] line-clamp-2">
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
            className="relative block w-[200px] h-[60px] md:w-[300px] md:h-[80px] lg:w-[350px] lg:h-[100px] rounded-[100px] border border-black border-solid hover:bg-black hover:text-white transition-all duration-300 group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="type-button-primary text-center text-black group-hover:text-white transition-colors duration-300">
                더 보기
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
