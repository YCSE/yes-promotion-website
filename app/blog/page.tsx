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
    url: 'https://yourenglishschool.co.kr/blog',
    title: '블로그 | YES 화상영어',
    description: '실전 화상영어 학습법과 영어회화 팁을 YES 블로그에서 만나보세요',
    siteName: 'YES 화상영어',
    images: [
      {
        url: '/ogimage.jpg',
        width: 1200,
        height: 630,
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
    canonical: 'https://yourenglishschool.co.kr/blog',
    types: {
      'application/rss+xml': 'https://yourenglishschool.co.kr/rss.xml',
    },
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  
  return <BlogPageClient posts={posts} />
}