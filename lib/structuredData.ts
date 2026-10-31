// 홈(/) 전용 JSON-LD. 루트 레이아웃에 두면 블로그 글을 포함한 모든 페이지에 붙어
// 페이지 내용과 무관한 FAQ·상품·사업장 정보가 반복되므로 app/page.tsx에서만 렌더한다.
import { SITE_URL } from '@/lib/config'
import { FAQS } from '@/lib/faqs'

const HOME_URL = `${SITE_URL}/`

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
  url: HOME_URL,
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
  url: HOME_URL,
}))

const allOffers = [freeTrialOffer, ...subscriptionOffers]

// FAQ 문항은 화면의 FAQSection과 같은 데이터를 쓴다 (lib/faqs.ts)
export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

// Course Schema - 화상영어 수업 정보
export const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'YES 화상영어 1:1 원어민급 회화 수업',
  description: '원어민급 선생님과 1:1 실시간 화상영어 수업. 개인 맞춤 커리큘럼으로 효과적인 영어 실력 향상',
  provider: {
    '@type': 'Organization',
    name: 'YES 화상영어',
    sameAs: HOME_URL,
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
      name: '원어민급 전문 강사진',
    },
  },
}

// Product Schema - 수업 플랜 정보
export const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'YES 화상영어 수업',
  description: '1:1 맞춤형 화상영어 수업',
  brand: {
    '@type': 'Brand',
    name: 'YES 화상영어',
  },
  offers: allOffers,
}

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'YES 화상영어',
  alternateName: 'YES English',
  description:
    'YES 화상영어는 1:1 온라인 화상영어 교육 플랫폼입니다. 원어민급 튜터와 실시간 화상영어 수업, AI 학습 시스템으로 영어 실력 향상을 지원합니다.',
  url: HOME_URL,
  logo: `${SITE_URL}/ogimage.jpg`,
  image: `${SITE_URL}/ogimage.jpg`,
  telephone: '1670-2905',
  email: 'admin@ycse.kr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '도봉로71가길 38-10',
    addressLocality: '강북구',
    addressRegion: '서울',
    postalCode: '01114',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.6396,
    longitude: 127.0247,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '21:00',
    },
  ],
  priceRange: '₩₩',
  paymentAccepted: ['Credit Card', 'Bank Transfer', 'Mobile Payment'],
  currenciesAccepted: 'KRW',
  areaServed: {
    '@type': 'Country',
    name: 'South Korea',
  },
  serviceType: '화상영어, 온라인영어, 영어회화',
  additionalType: 'https://schema.org/EducationalOrganization',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '화상영어 수업 플랜',
    itemListElement: allOffers,
  },
}
