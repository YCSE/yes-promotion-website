import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
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

function getPostsData(): PostData[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  
  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        
        const excerpt = content
          .replace(/^#+\s+.*$/gm, '')
          .replace(/\n+/g, ' ')
          .trim()
          .slice(0, 150) + '...'
        
        return {
          slug,
          title: data.title || 'Untitled',
          subtitle: data.subtitle,
          date: data.date || new Date().toISOString(),
          featuredImage: data.featuredImage,
          excerpt: data.excerpt || excerpt
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return posts
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export default function BlogPage() {
  const posts = getPostsData()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="w-full py-[80px] md:py-[150px] bg-[#F8F9FA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <h1 className="text-[32px] md:text-[50px] lg:text-[70px] leading-tight font-bold text-center mb-4">
            영어 학습 블로그
          </h1>
          <p className="text-[16px] md:text-[20px] text-gray-600 text-center">
            매일 실력이 느는 실전 영어 학습 팁
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-[80px] md:py-[150px]">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-[18px]">
              아직 작성된 포스트가 없습니다. 곧 유용한 콘텐츠가 업로드됩니다!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-105 h-full flex flex-col">
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative w-full h-[200px] md:h-[250px] bg-gray-100 overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <time className="text-[14px] text-gray-500 mb-2">
                      {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                    </time>
                    
                    <h2 className="text-[20px] md:text-[24px] font-bold mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.subtitle && (
                      <p className="text-[16px] text-gray-600 mb-3">
                        {post.subtitle}
                      </p>
                    )}
                    
                    <p className="text-[14px] md:text-[16px] text-gray-600 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-4 text-[#4B52AE] font-medium text-[16px] group-hover:underline">
                      자세히 읽기 →
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}