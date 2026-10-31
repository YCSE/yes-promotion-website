import Hero from '@/components/Hero'
import Section2 from '@/components/Section2'
import Section3 from '@/components/Section3'
import TiaSection from '@/components/TiaSection'
import ReviewCarousel from '@/components/ReviewCarousel'
import BlogSection from '@/components/BlogSection'
import Section5 from '@/components/Section5'
import FAQSection from '@/components/FAQSection'
import JsonLd from '@/components/JsonLd'
import { courseJsonLd, faqJsonLd, localBusinessJsonLd, productJsonLd } from '@/lib/structuredData'

export default function Home() {
  const homeBreadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'YES 화상영어',
        item: 'https://yourenglishschool.co.kr/'
      }
    ]
  }

  return (
    <>
      <JsonLd id="home-breadcrumb-structured-data" data={homeBreadcrumbJsonLd} />
      {/* 홈 전용 스키마 — 루트 레이아웃에 두면 모든 페이지에 붙는다 */}
      <JsonLd id="faq-structured-data" data={faqJsonLd} />
      <JsonLd id="local-business-structured-data" data={localBusinessJsonLd} />
      <JsonLd id="course-structured-data" data={courseJsonLd} />
      <JsonLd id="product-structured-data" data={productJsonLd} />
      <main className="min-h-screen">
        <Hero />
        <Section2 />
        <Section3 />
        <TiaSection />
        <ReviewCarousel />
        <Section5 />
        <FAQSection />
        <BlogSection />
      </main>
    </>
  )
}
