import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'YES 화상영어 블로그 - 영어학습 팁과 화상영어 노하우',
  description: 'YES 화상영어 블로그에서 효과적인 영어학습법, 화상영어 수업 팁, 실전 영어회화 노하우를 확인하세요. 영어 실력 향상을 위한 다양한 콘텐츠를 제공합니다.',
  keywords: '화상영어 블로그, 영어학습 팁, 화상영어 노하우, 영어회화 학습법, YES화상영어 블로그, 온라인영어 학습, 영어공부법',
  openGraph: {
    title: 'YES 화상영어 블로그',
    description: 'YES 화상영어 블로그에서 효과적인 영어학습법과 화상영어 수업 팁을 확인하세요.',
    type: 'website',
    url: 'https://yourenglishschool.co.kr/blog',
    images: [{
      url: '/ogimage.jpg',
      width: 1200,
      height: 630,
      alt: 'YES 화상영어 블로그'
    }],
    siteName: 'YES 화상영어',
    locale: 'ko_KR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YES 화상영어 블로그',
    description: 'YES 화상영어 블로그에서 효과적인 영어학습법과 화상영어 수업 팁을 확인하세요.',
    images: ['/ogimage.jpg'],
    creator: '@yesenglish',
    site: '@yesenglish'
  },
  alternates: {
    canonical: 'https://yourenglishschool.co.kr/blog'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'YES 화상영어 블로그',
    description: 'YES 화상영어 블로그에서 효과적인 영어학습법과 화상영어 수업 팁을 확인하세요.',
    url: 'https://yourenglishschool.co.kr/blog',
    publisher: {
      '@type': 'Organization',
      name: 'YES 화상영어',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourenglishschool.co.kr/ogimage.jpg'
      }
    },
    blogPost: [
      {
        '@type': 'BlogPosting',
        headline: '영화와 드라마로 영어 정복! 나만의 스마트 학습 툴킷 만들기',
        url: 'https://yourenglishschool.co.kr/blog/2025-09-04-movies-tv-language-learning-1',
        datePublished: '2025-09-04',
        author: {
          '@type': 'Organization',
          name: 'YES 화상영어'
        }
      },
      {
        '@type': 'BlogPosting',
        headline: '영어 도치 구문 완벽 가이드: 강조와 리듬의 예술',
        url: 'https://yourenglishschool.co.kr/blog/2025-09-04-inversion-emphasis-english-1',
        datePublished: '2025-09-04',
        author: {
          '@type': 'Organization',
          name: 'YES 화상영어'
        }
      }
    ]
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: 'https://yourenglishschool.co.kr'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '블로그',
        item: 'https://yourenglishschool.co.kr/blog'
      }
    ]
  }

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd)
        }}
      />
      <Script
        id="blog-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd)
        }}
      />
      {children}
    </>
  )
}