import type { Metadata } from 'next'

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
      width: 1024,
      height: 500,
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

// Blog/BreadcrumbList JSON-LD는 이 레이아웃이 아닌 app/blog/page.tsx에서 렌더한다.
// (레이아웃에 두면 모든 글 페이지에도 붙어 글 페이지 Breadcrumb과 중복된다)
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="blog-page">{children}</div>
}
