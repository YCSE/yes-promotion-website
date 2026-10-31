import type { Metadata } from 'next'
import './fonts.css'
import './globals.css'
import SiteFrame from '@/components/SiteFrame'
import Analytics from '@/components/Analytics'
import JsonLd from '@/components/JsonLd'
import { FB_DOMAIN_VERIFICATION } from '@/lib/analytics'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://yourenglishschool.co.kr'),
  title: 'YES 화상영어 - 선생님과 1:1 화상영어회화 수업',
  description: '화상영어 추천! YES로 선생님과 1:1 실시간 영어회화. AI 선생님 Tia와 체계적인 커리큘럼. 무료체험!',
  keywords: '화상영어, 화상영어회화, 화상영어추천, 화상영어가격, 영어회화, 영어스피킹, 원어민영어, 성인영어회화, 직장인영어회화, 온라인영어학원, 실전영어회화, 아침영어회화, 화상영어무료체험, YES화상영어, TIA영어',
  authors: [{ name: 'YES' }],
  creator: 'YES',
  publisher: 'YES',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/fav.png',
    apple: '/fav.png',
    shortcut: '/fav.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    url: 'https://yourenglishschool.co.kr/',
    title: 'YES 화상영어 - 선생님과 1:1 화상영어 수업',
    description: 'YES 화상영어로 선생님과 실시간 화상영어회화! 맞춤형 커리큘럼과 전문 튜터진. 화상영어 무료체험!',
    images: [
      {
        url: '/ogimage.jpg',
        width: 1024,
        height: 500,
        alt: 'YES 화상영어 - 원어민급 화상영어 1:1 수업',
        type: 'image/jpeg',
      }
    ],
    siteName: 'YES 화상영어',
  },
  alternates: {
    canonical: 'https://yourenglishschool.co.kr/',
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'YES 화상영어 블로그 RSS' }]
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YES 화상영어 - 원어민급 화상영어 1:1 수업',
    description: 'YES 화상영어로 선생님과 실시간 화상영어회화! 전문 화상영어 튜터와 맞춤 수업!',
    images: ['/ogimage.jpg'],
    creator: '@yesenglish',
    site: '@yesenglish',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    other: {
      'naver-site-verification': '80beba25833830552b38dc574c01c9ebbd92a4a0',
      ...(FB_DOMAIN_VERIFICATION
        ? { 'facebook-domain-verification': FB_DOMAIN_VERIFICATION }
        : {}),
    },
  },
  category: 'education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'YES 화상영어',
    alternateName: 'YES English',
    url: 'https://yourenglishschool.co.kr/',
    logo: 'https://yourenglishschool.co.kr/ogimage.jpg',
    description: 'YES 화상영어로 선생님과 1:1 화상영어 수업! 실시간 피드백과 AI 맞춤형 학습 시스템으로 영어 실력 향상!',
    areaServed: {
      '@type': 'Country',
      name: 'South Korea'
    }
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'YES 화상영어',
    alternateName: 'YES English',
    url: 'https://yourenglishschool.co.kr/'
  }

  const siteNavigationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: ['홈', '블로그', '화상영어 소개', '수업 방식', '레벨 테스트', '티아 학습', '수강 후기', '자주 묻는 질문'],
    url: [
      'https://yourenglishschool.co.kr/',
      'https://yourenglishschool.co.kr/blog',
      'https://yourenglishschool.co.kr/#about',
      'https://yourenglishschool.co.kr/#features',
      'https://yourenglishschool.co.kr/#level-test',
      'https://yourenglishschool.co.kr/#tia',
      'https://yourenglishschool.co.kr/#reviews',
      'https://yourenglishschool.co.kr/#faq'
    ]
  }

  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <meta name="theme-color" content="#3E86D9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="YES 화상영어" />
        <meta name="application-name" content="YES 화상영어" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="article:author" content="YES Education" />
        <meta property="article:published_time" content="2025-01-01T00:00:00.000Z" />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        <link rel="alternate" type="application/rss+xml" title="YES 화상영어 블로그 RSS" href="/rss.xml" />
        {/* 사이트 공통 스키마. FAQ·Course·Product·LocalBusiness는 홈 전용이라 app/page.tsx에 있다 */}
        <JsonLd id="structured-data" data={jsonLd} />
        <JsonLd id="website-structured-data" data={websiteJsonLd} />
        <JsonLd id="site-navigation-structured-data" data={siteNavigationJsonLd} />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
        <Analytics />
      </body>
    </html>
  )
}
