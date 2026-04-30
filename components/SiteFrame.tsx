'use client'

import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'

export default function SiteFrame({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <div className="pt-16 md:pt-20">{children}</div>
      <Footer />
    </>
  )
}
