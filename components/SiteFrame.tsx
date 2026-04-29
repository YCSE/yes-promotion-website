'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'

export default function SiteFrame({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const needsTopOffset = pathname !== '/'

  return (
    <>
      <SiteHeader />
      <div className={needsTopOffset ? 'pt-16 md:pt-20' : ''}>{children}</div>
      <Footer />
    </>
  )
}
