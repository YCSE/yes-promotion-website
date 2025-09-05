import type { Metadata } from 'next'
import './globals.css'
import './fonts.css'
import Footer from '@/components/Footer'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourenglishschool.co.kr'),
  title: 'YES 화상영어 - 원어민과 1:1 화상영어회화 수업',
  description: 'YES 화상영어는 캠블리, 링글, 스픽, 민트영어보다 효과적인 1:1 화상영어! 원어민급 선생님과 실시간 화상영어회화. 엔구, 어메이징토커보다 체계적인 커리큘럼. 화상영어 무료체험으로 차이를 경험하세요!',
  keywords: '화상영어, 화상영어회화, 온라인화상영어, 원어민화상영어, 화상영어수업, 화상영어추천, 1대1화상영어, 화상영어앱, YES화상영어, 실시간화상영어, 화상영어플랫폼, 영어회화, 온라인영어, 비대면영어, 화상영어학원, 캠블리, 링글, 스픽, 엔구, 어메이징토커, 프렙, 튜터링, 링고다, 버블링, 아이튜터, 민병철유폰, 야나두, 시원스쿨, 리얼클래스, 케이크, 민트영어',
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
    title: 'YES 화상영어 - 원어민과 1:1 화상영어 수업',
    description: 'YES 화상영어로 원어민과 실시간 화상영어회화! 국내 최고의 화상영어 플랫폼, 맞춤형 화상영어 커리큘럼, 전문 화상영어 튜터진. 화상영어 무료체험!',
    images: [
      {
        url: '/ogimage.jpg',
        width: 1200,
        height: 630,
        alt: 'YES 화상영어 - 원어민 화상영어 1:1 수업',
        type: 'image/jpeg',
      }
    ],
    siteName: 'YES 화상영어',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YES 화상영어 - 원어민 화상영어 1:1 수업',
    description: 'YES 화상영어로 원어민과 실시간 화상영어회화! 국내 1위 화상영어 플랫폼, 전문 화상영어 튜터와 맞춤 수업!',
    images: ['/ogimage.jpg'],
    creator: '@yesenglish',
    site: '@yesenglish',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
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
  alternates: {
    canonical: 'https://yourenglishschool.co.kr/',
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Google Search Console에서 받은 코드로 교체
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE', // Yandex Webmaster에서 받은 코드로 교체
    yahoo: 'YOUR_YAHOO_VERIFICATION_CODE', // Yahoo에서 받은 코드로 교체
    other: {
      'naver-site-verification': '80beba25833830552b38dc574c01c9ebbd92a4a0',
      'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE', // Bing Webmaster에서 받은 코드로 교체
      'facebook-domain-verification': 'YOUR_FB_VERIFICATION_CODE' // Facebook에서 받은 코드로 교체
    }
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
    description: 'YES 화상영어로 원어민과 1:1 화상영어 수업! 국내 최고의 화상영어회화 플랫폼, 실시간 화상영어 피드백, AI 맞춤형 화상영어 학습 시스템으로 영어 실력 향상!',
    sameAs: [
      'https://www.facebook.com/yesenglish',
      'https://www.instagram.com/yesenglish',
      'https://www.youtube.com/yesenglish'
    ],
    offers: {
      '@type': 'Offer',
      category: '화상영어 학습 앱',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'KRW',
      priceValidUntil: '2025-12-31',
      description: '화상영어 무료 체험 가능',
      url: 'https://yourenglishschool.co.kr/'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '12500'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: '김서연'
        },
        reviewBody: 'YES 화상영어 덕분에 영어 울렁증을 극복했어요! 화상영어로 원어민과 직접 대화하니 실전 영어가 늘어요. 최고의 화상영어 플랫폼이에요!'
      }
    ],
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
    url: 'https://yourenglishschool.co.kr/',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://yourenglishschool.co.kr/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  const siteNavigationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: ['홈', '블로그', '화상영어 소개', '수업 방식', '레벨 테스트'],
    url: [
      'https://yourenglishschool.co.kr/',
      'https://yourenglishschool.co.kr/blog',
      'https://yourenglishschool.co.kr/',
      'https://yourenglishschool.co.kr/',
      'https://yourenglishschool.co.kr/'
    ]
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'HOME',
        item: 'https://yourenglishschool.co.kr/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '블로그',
        item: 'https://yourenglishschool.co.kr/blog'
      }
    ]
  }

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://yourenglishschool.co.kr/#business',
    name: 'YES 화상영어',
    alternateName: 'YES English',
    description: 'YES 화상영어는 한국 최고의 1:1 온라인 화상영어 교육 플랫폼입니다. 원어민급 튜터와 실시간 화상영어 수업, AI 학습 시스템으로 효과적인 영어 실력 향상을 지원합니다.',
    url: 'https://yourenglishschool.co.kr/',
    logo: 'https://yourenglishschool.co.kr/ogimage.jpg',
    image: [
      'https://yourenglishschool.co.kr/ogimage.jpg',
      'https://yourenglishschool.co.kr/images/thumbnail_PC.png'
    ],
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
      itemListElement: [
        {
          '@type': 'Offer',
          name: '무료 체험 수업',
          description: '25분 무료 레벨 테스트 및 체험 수업',
          price: '0',
          priceCurrency: 'KRW'
        },
        {
          '@type': 'Offer',
          name: '월 정기 구독',
          description: '매일 25분 1:1 화상영어 수업',
          price: '149000',
          priceCurrency: 'KRW'
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '12500',
      reviewCount: '8750'
    }
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'YES 화상영어는 캠블리, 링글, 민트영어와 어떤 차이가 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'YES 화상영어는 캠블리, 링글, 민트영어와 달리 한국인 학습자에 최적화된 커리큘럼을 제공합니다. 스픽, 엔구보다 체계적인 1:1 수업과 AI 피드백으로 3배 빠른 실력 향상! 민트영어, 어메이징토커, 프렙보다 합리적인 가격으로 원어민급 튜터와 수업 가능합니다.'
        }
      },
      {
        '@type': 'Question',
        name: 'YES 화상영어 가격은 캠블리, 링글보다 저렴한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'YES 화상영어는 캠블리, 링글 대비 최대 50% 저렴! 스픽, 엔구와 비교해도 가성비 최고의 화상영어입니다. 어메이징토커, 튜터링보다 체계적인 커리큘럼을 제공하면서도 합리적인 가격. 무료체험 후 본인에게 맞는 플랜을 선택하세요.'
        }
      },
      {
        '@type': 'Question',
        name: '야나두, 시원스쿨처럼 초보자도 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네! YES 화상영어는 야나두, 시원스쿨보다 실전적인 회화 중심 수업! 케이크, 리얼클래스와 달리 실제 튜터와 대화하며 배웁니다. 민병철유폰, 버블링처럼 초급부터 체계적으로 시작 가능. 링고다, 아이튜터보다 친절한 한국인 상담 서비스도 제공합니다.'
        }
      }
    ]
  }

  return (
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#4B52AE" />
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
          id="breadcrumb-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd)
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
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}