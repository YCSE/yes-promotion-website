import Link from 'next/link'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { getAllPosts, getRandomPosts } from '@/lib/posts'

export default function BlogSection() {
  const allPosts = getAllPosts()
  const randomPosts = getRandomPosts(allPosts, 3)

  return (
    <section className="landing-section-spacing relative w-full bg-white">
      <div className="page-shell">
        <div className="flex flex-col items-center mb-[40px] md:mb-[40px] lg:mb-[50px]">
          <h2 className="type-h2 text-center">
            <span className="font-ko">익스</span> 블로그에 초대합니다
          </h2>
          <p className="type-body-base text-primary text-center mt-[12px] md:mt-[16px] lg:mt-[20px]">
            실전 감각을 키워주는 영어 이야기들.<br />
            익스 블로그에서 하나씩 살펴보세요.
          </p>
        </div>

        <div className="grid grid-cols-2 md:hidden gap-4 mb-[50px]">
          {randomPosts.slice(0, 2).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="h-full flex flex-col">
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-[10px] mb-3">
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

                <div className="flex-1 flex flex-col">
                  <time className="type-h6 font-num text-gray-500 mb-1">
                    {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                  </time>

                  <h4 className="type-h4 mb-1 line-clamp-2 group-hover:text-[#3E86D9] transition-colors">
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

        <div className="hidden md:grid md:grid-cols-3 gap-10 mb-[80px]">
          {randomPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="h-full flex flex-col">
                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-[10px] mb-4">
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

                <div className="flex-1 flex flex-col">
                  <time className="type-h6 font-num text-gray-500 mb-2">
                    {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                  </time>

                  <h4 className="type-h4 mb-2 line-clamp-2 group-hover:text-[#3E86D9] transition-colors">
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

        <div className="flex justify-center">
          <Link
            href="/blog"
            className="cta-pill-button cta-pill-button-light relative border-border-gray2 border-solid hover:bg-black hover:text-white transition-all duration-300 group"
          >
            <div className="flex items-center justify-center">
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
