import type { Metadata } from 'next'
import './fonts.css'
import './globals.css'
import SiteFrame from '@/components/SiteFrame'
import Analytics from '@/components/Analytics'
import Script from 'next/script'
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

// 실제 판매 중인 월 구독 플랜 (KRW)
const SUBSCRIPTION_PLANS = [
  { name: '주2회 (월 8회)', price: '89000' },
  { name: '주3회 (월 12회)', price: '129000' },
  { name: '주5회 (월 20회)', price: '178000' },
]

const freeTrialOffer = {
  '@type': 'Offer',
  name: '무료 체험 수업',
  description: '레벨 테스트 후 무료 체험 수업',
  price: '0',
  priceCurrency: 'KRW',
  availability: 'https://schema.org/InStock',
  url: 'https://yourenglishschool.co.kr/',
}

const subscriptionOffers = SUBSCRIPTION_PLANS.map((plan) => ({
  '@type': 'Offer',
  name: `월 정기 구독 ${plan.name}`,
  description: `1:1 화상영어 수업 ${plan.name} 월 구독`,
  price: plan.price,
  priceCurrency: 'KRW',
  priceSpecification: {
    '@type': 'UnitPriceSpecification',
    price: plan.price,
    priceCurrency: 'KRW',
    unitCode: 'MON',
    unitText: '월',
  },
  availability: 'https://schema.org/InStock',
  url: 'https://yourenglishschool.co.kr/',
}))

const allOffers = [freeTrialOffer, ...subscriptionOffers]

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

  // Course Schema - 화상영어 수업 정보
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'YES 화상영어 1:1 원어민급 회화 수업',
    description: '원어민급 선생님과 1:1 실시간 화상영어 수업. 개인 맞춤 커리큘럼으로 효과적인 영어 실력 향상',
    provider: {
      '@type': 'Organization',
      name: 'YES 화상영어',
      sameAs: 'https://yourenglishschool.co.kr/'
    },
    courseMode: 'online',
    courseWorkload: 'PT25M',
    educationalLevel: '초급부터 고급까지',
    teaches: '영어회화, 비즈니스 영어, 일상 영어, 여행 영어',
    inLanguage: 'en',
    availableLanguage: ['en', 'ko'],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      instructor: {
        '@type': 'Person',
        name: '원어민급 전문 강사진'
      }
    }
  }

  // Product Schema - 수업 플랜 정보
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'YES 화상영어 수업',
    description: '1:1 맞춤형 화상영어 수업',
    brand: {
      '@type': 'Brand',
      name: 'YES 화상영어'
    },
    offers: allOffers
  }

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://yourenglishschool.co.kr/#business',
    name: 'YES 화상영어',
    alternateName: 'YES English',
    description: 'YES 화상영어는 1:1 온라인 화상영어 교육 플랫폼입니다. 원어민급 튜터와 실시간 화상영어 수업, AI 학습 시스템으로 영어 실력 향상을 지원합니다.',
    url: 'https://yourenglishschool.co.kr/',
    logo: 'https://yourenglishschool.co.kr/ogimage.jpg',
    image: 'https://yourenglishschool.co.kr/ogimage.jpg',
    telephone: '1670-2905',
    email: 'admin@ycse.kr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '도봉로71가길 38-10',
      addressLocality: '강북구',
      addressRegion: '서울',
      postalCode: '01114',
      addressCountry: 'KR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.6396,
      longitude: 127.0247
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '22:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '21:00'
      }
    ],
    priceRange: '₩₩',
    paymentAccepted: ['Credit Card', 'Bank Transfer', 'Mobile Payment'],
    currenciesAccepted: 'KRW',
    areaServed: {
      '@type': 'Country',
      name: 'South Korea'
    },
    serviceType: '화상영어, 온라인영어, 영어회화',
    additionalType: 'https://schema.org/EducationalOrganization',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '화상영어 수업 플랜',
      itemListElement: allOffers
    }
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'YES 화상영어의 특징은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'YES 화상영어는 한국인 학습자에 최적화된 커리큘럼을 제공합니다. 체계적인 1:1 수업과 AI 피드백으로 빠른 실력 향상이 가능하며, 합리적인 가격으로 원어민급 튜터와 수업이 가능합니다.'
        }
      },
      {
        '@type': 'Question',
        name: 'YES 화상영어 가격은 어떻게 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'YES 화상영어는 월 구독제로 운영됩니다. 주2회(월 8회) 89,000원, 주3회(월 12회) 129,000원, 주5회(월 20회) 178,000원이며, 앱에서 본인에게 맞는 플랜을 선택할 수 있습니다.'
        }
      },
      {
        '@type': 'Question',
        name: '초보자도 수업이 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네! YES 화상영어는 초급부터 고급까지 모든 레벨에 맞춤형 수업을 제공합니다. 실제 튜터와 대화하며 학습하고, 한국인 상담 서비스도 제공하여 초보자도 편하게 시작할 수 있습니다.'
        }
      }
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
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
        <Script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd)
          }}
        />
        <Script
          id="site-navigation-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationJsonLd)
          }}
        />
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd)
          }}
        />
        <Script
          id="local-business-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd)
          }}
        />
        <Script
          id="course-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseJsonLd)
          }}
        />
        <Script
          id="product-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd)
          }}
        />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
        <Analytics />
      </body>
    </html>
  )
}
