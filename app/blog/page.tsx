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

// Post categories (simplified)
type PostCategory = 'grammar' | 'vocabulary' | 'speaking' | 'culture' | 'strategy';

// Assign category based on post content/title
const getPostCategory = (post: PostData): PostCategory => {
  const title = post.title.toLowerCase();
  const excerpt = post.excerpt.toLowerCase();
  const combined = title + ' ' + excerpt;
  
  // 문법 개념
  if (combined.includes('시제') || combined.includes('조동사') || combined.includes('문법') || 
      combined.includes('구문') || combined.includes('문장') || combined.includes('도치')) {
    return 'grammar';
  }
  // 어휘 주제
  if (combined.includes('어휘') || combined.includes('단어') || combined.includes('표현')) {
    return 'vocabulary';
  }
  // 말하기 상황
  if (combined.includes('대화') || combined.includes('말하기') || combined.includes('회화') ||
      combined.includes('소통') || combined.includes('커뮤니케이션')) {
    return 'speaking';
  }
  // 문화적 주제
  if (combined.includes('문화') || combined.includes('미국') || combined.includes('영국') ||
      combined.includes('유치원') || combined.includes('학교')) {
    return 'culture';
  }
  // 학습 전략
  if (combined.includes('학습') || combined.includes('공부') || combined.includes('팟캐스트') ||
      combined.includes('영화') || combined.includes('드라마') || combined.includes('교환')) {
    return 'strategy';
  }
  
  return 'strategy'; // default
};

// Helper function to get related posts
const getRelatedPosts = (currentPost: PostData, allPosts: PostData[]) => {
  const currentCategory = getPostCategory(currentPost);
  
  return allPosts
    .filter(post => post.slug !== currentPost.slug && getPostCategory(post) === currentCategory)
    .slice(0, 3);
};

// Mock data for demonstration - replace with actual data fetching
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
  },
  {
    slug: '2025-09-03-podcast-listening-skills-1',
    title: '팟캐스트로 듣기 실력 향상시키기',
    subtitle: '통근 시간을 영어 학습 시간으로',
    date: '2025-09-03T10:00:00.000Z',
    featuredImage: '/images/blog/podcast-listening.jpg',
    excerpt: '팟캐스트는 일상 속에서 자연스럽게 영어 듣기 실력을 향상시킬 수 있는 최고의 도구입니다. 레벨별 추천 팟캐스트와 효과적인 학습법을 소개합니다.'
  },
  {
    slug: '2025-09-02-language-exchange-maximizing-1',
    title: '언어 교환 파트너 최대한 활용하기',
    subtitle: '효과적인 언어 교환의 비결',
    date: '2025-09-02T14:30:00.000Z',
    featuredImage: '/images/blog/language-exchange.jpg',
    excerpt: '언어 교환은 원어민과 실전 대화를 나눌 수 있는 좋은 기회입니다. 성공적인 언어 교환을 위한 준비사항과 활용 팁을 알아봅니다.'
  },
  {
    slug: '2025-09-01-present-perfect-vs-past-simple-1',
    title: '현재완료 vs 과거시제 - 언제 어떻게 쓸까?',
    subtitle: '헷갈리기 쉬운 시제 완벽 정리',
    date: '2025-09-01T09:15:00.000Z',
    featuredImage: '/images/blog/present-perfect.jpg',
    excerpt: '현재완료와 과거시제의 차이를 명확히 이해하고 상황에 맞게 사용하는 방법을 예문과 함께 자세히 설명합니다.'
  },
  {
    slug: '2025-08-31-modal-verbs-possibility-certainty-1',
    title: '조동사로 표현하는 가능성과 확실성',
    subtitle: 'May, Might, Must의 정확한 사용법',
    date: '2025-08-31T11:45:00.000Z',
    featuredImage: '/images/blog/modal-verbs.jpg',
    excerpt: '영어 조동사를 사용해 확실성의 정도를 표현하는 방법을 배워봅니다. 일상 대화에서 자연스럽게 활용할 수 있는 예문과 함께 설명합니다.'
  },
  {
    slug: '2025-08-30-immersion-learning-without-abroad-1',
    title: '해외 거주 없이 몰입 학습하기',
    subtitle: '국내에서도 가능한 영어 환경 만들기',
    date: '2025-08-30T08:00:00.000Z',
    featuredImage: '/images/blog/immersion-learning.jpg',
    excerpt: '해외 거주 없이도 영어에 몰입할 수 있는 환경을 만드는 방법을 소개합니다. 일상 속에서 실천할 수 있는 구체적인 팁들을 제공합니다.'
  },
  {
    slug: '2025-08-29-complex-sentence-structures-1',
    title: '고급 화자를 위한 복잡한 문장 구조',
    subtitle: '세련된 영어 구사의 비결',
    date: '2025-08-29T12:30:00.000Z',
    featuredImage: '/images/blog/complex-sentences.jpg',
    excerpt: '단순한 문장에서 벗어나 복잡하고 세련된 문장 구조를 만드는 방법을 배웁니다. 학술 영어와 비즈니스 영어에 필수적인 스킬입니다.'
  }
]

export default function BlogPage() {
  const [displayCount, setDisplayCount] = useState(7) // 1 featured + 6 cards
  
  const featuredPost = mockPosts[0]
  const remainingPosts = mockPosts.slice(1, displayCount)
  const hasMore = displayCount < mockPosts.length

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 6, mockPosts.length))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Blog Posts Section */}
      <div className="max-w-[1280px] mx-auto px-6 py-[80px] md:py-[100px]">
        {mockPosts.length === 0 ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-[80px]">
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
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mb-[100px]">
                <button
                  onClick={handleLoadMore}
                  className="relative w-[350px] h-[100px] rounded-[100px] border border-black border-solid hover:bg-black hover:text-white transition-all duration-300"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-bold text-[25px] leading-[40px] tracking-[-0.75px] text-center">
                      더보기
                    </span>
                  </div>
                </button>
              </div>
            )}
            
            {/* Divider and Related Posts */}
            {featuredPost && (
              <>
                {/* Divider Line */}
                <div className="relative flex items-center justify-center my-[80px]">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                  </div>
                  <div className="relative bg-white px-8">
                    <div className="flex items-center gap-3">
                      <div className="w-[80px] h-[5px] bg-[#4B52AE] rounded-[100px]"></div>
                      <div className="w-[30px] h-[5px] bg-[#4B52AE] opacity-50 rounded-[100px]"></div>
                    </div>
                  </div>
                </div>
                
                {/* Related Posts Section */}
                <div className="mb-[80px]">
                  <h2 className="text-[28px] md:text-[32px] font-bold mb-[40px] text-center">
                    함께 읽어볼 글
                  </h2>
                  
                  {(() => {
                    const relatedPosts = getRelatedPosts(featuredPost, mockPosts);
                    
                    if (relatedPosts.length === 0) {
                      // No related posts - show button to view more posts
                      return (
                        <div className="flex justify-center">
                          <Link
                            href="/blog"
                            className="relative w-[350px] h-[100px] rounded-[100px] border border-black border-solid hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center"
                          >
                            <span className="font-bold text-[25px] leading-[40px] tracking-[-0.75px] text-center">
                              다른 글 보기
                            </span>
                          </Link>
                        </div>
                      );
                    }
                    
                    // Show related posts grid
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {relatedPosts.map((post) => (
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
                    );
                  })()}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}