'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { getAssetPath } from '@/lib/utils'

const HIDE_DELAY_MS = 3000

export default function SiteHeader() {
  const pathname = usePathname()
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const homeIsActive = pathname === '/'
  const blogIsActive = pathname.startsWith('/blog')
  const headerShadowClass = blogIsActive ? '' : 'shadow-sm'

  useEffect(() => {
    const clearHideTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
      }
    }

    const isInsideHeroSection = () => {
      const staticZones = Array.from(
        document.querySelectorAll<HTMLElement>('.hero-section, [data-header-static-zone="true"]')
      )

      if (staticZones.length === 0) return false

      const headerHeight = window.innerWidth >= 768 ? 80 : 64
      const probeY = window.scrollY + headerHeight + 8

      return staticZones.some((zone) => {
        const zoneTop = zone.getBoundingClientRect().top + window.scrollY
        const zoneBottom = zoneTop + zone.offsetHeight
        return zoneTop <= probeY && zoneBottom > probeY
      })
    }

    const resetHideTimer = () => {
      clearHideTimer()

      if (isInsideHeroSection()) {
        return
      }

      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false)
      }, HIDE_DELAY_MS)
    }

    const revealHeader = () => {
      setIsVisible(true)
      resetHideTimer()
    }

    const handleKeydown = (event: KeyboardEvent) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space']
      if (scrollKeys.includes(event.code) || scrollKeys.includes(event.key)) {
        revealHeader()
      }
    }

    revealHeader()

    window.addEventListener('scroll', revealHeader, { passive: true })
    window.addEventListener('wheel', revealHeader, { passive: true })
    window.addEventListener('touchstart', revealHeader, { passive: true })
    window.addEventListener('touchmove', revealHeader, { passive: true })
    window.addEventListener('resize', revealHeader, { passive: true })
    window.addEventListener('keydown', handleKeydown)

    return () => {
      clearHideTimer()
      window.removeEventListener('scroll', revealHeader)
      window.removeEventListener('wheel', revealHeader)
      window.removeEventListener('touchstart', revealHeader)
      window.removeEventListener('touchmove', revealHeader)
      window.removeEventListener('resize', revealHeader)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full border-b border-gray-100 bg-white ${headerShadowClass} transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="page-shell">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="flex items-center transition-all hover:opacity-80"
            aria-label="YES 화상영어 홈으로 이동"
          >
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src={getAssetPath('fav.webp')}
                alt="YES 화상영어 로고"
                width={48}
                height={48}
                className="h-full w-full rounded-[10px] object-contain"
                priority
              />
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`font-ko text-sm transition-colors md:text-base ${
                homeIsActive ? 'font-semibold text-yes-blue' : 'font-medium text-gray-600 hover:text-yes-blue'
              }`}
            >
              홈
            </Link>
            <Link
              href="/blog"
              className={`font-ko text-sm transition-colors md:text-base ${
                blogIsActive ? 'font-semibold text-yes-blue' : 'font-medium text-gray-600 hover:text-yes-blue'
              }`}
            >
              블로그
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
