import Hero from '@/components/Hero'
import Section2 from '@/components/Section2'
import Section3 from '@/components/Section3'
import Section3Tia from '@/components/Section3Tia'
import ReviewCarousel from '@/components/ReviewCarousel'
import BlogSection from '@/components/BlogSection'
import Section5 from '@/components/Section5'
import FAQSection from '@/components/FAQSection'
import Script from 'next/script'

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
      <Script
        id="home-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeBreadcrumbJsonLd)
        }}
      />
      <main className="min-h-screen">
        <Hero />
        <Section2 />
        <Section3 />
        <Section3Tia />
        <ReviewCarousel />
        <Section5 />
        <FAQSection />
        <BlogSection />
      </main>
    </>
  )
}
