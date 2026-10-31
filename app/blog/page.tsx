import { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: '블로그 | YES 화상영어',
  description: '화상영어 학습법과 영어회화 팁을 YES 화상영어 블로그에서 확인하세요. 효과적인 온라인 영어 공부법과 실전 노하우를 공유합니다.',
  keywords: '화상영어 블로그, 영어학습 팁, 화상영어 노하우, 온라인영어 학습법, 영어회화 학습, YES 블로그, 화상영어 후기, 영어공부법',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://yourenglishschool.co.kr/blog/',
    title: '블로그 | YES 화상영어',
    description: '실전 화상영어 학습법과 영어회화 팁을 YES 블로그에서 만나보세요',
    siteName: 'YES 화상영어',
    images: [
      {
        url: '/ogimage.jpg',
        width: 1024,
        height: 500,
        alt: 'YES 화상영어 블로그',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YES 화상영어 블로그',
    description: '실전 화상영어 학습법과 원어민 영어회화 팁',
    images: ['/ogimage.jpg'],
  },
  alternates: {
    canonical: 'https://yourenglishschool.co.kr/blog/',
    types: {
      'application/rss+xml': 'https://yourenglishschool.co.kr/rss.xml',
    },
  },
}

const SITE_URL = 'https://yourenglishschool.co.kr'
const BLOG_URL = `${SITE_URL}/blog/`

export default function BlogPage() {
  const posts = getAllPosts()

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'YES 화상영어 블로그',
    description: 'YES 화상영어 블로그에서 효과적인 영어학습법과 화상영어 수업 팁을 확인하세요.',
    url: BLOG_URL,
    publisher: {
      '@type': 'Organization',
      name: 'YES 화상영어',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/ogimage.jpg`
      }
    },
    // 최신 글 10개 (getAllPosts는 날짜 내림차순)
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${BLOG_URL}${post.slug}/`,
      datePublished: post.date,
      author: {
        '@type': 'Organization',
        name: 'YES 화상영어'
      }
    }))
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: `${SITE_URL}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '블로그',
        item: BLOG_URL
      }
    ]
  }

  return (
    <>
      {/* next/script는 hydration 후 주입되어 정적 HTML에 남지 않으므로 일반 <script>를 쓴다 */}
      <script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        id="blog-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPageClient posts={posts} />
    </>
  )
}