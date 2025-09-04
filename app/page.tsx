import Hero from '@/components/Hero'
import Section2 from '@/components/Section2'
import Section3 from '@/components/Section3'
import Section4 from '@/components/Section4'
import BlogSection from '@/components/BlogSection'
import Section5 from '@/components/Section5'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Section2 />
      <Section3 />
      <Section4 />
      <BlogSection />
      <Section5 />
    </main>
  )
}