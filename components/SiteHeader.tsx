'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getAssetPath } from '@/lib/utils'

const HIDE_DELAY_MS = 2000

type HeaderTheme = 'light' | 'dark'

const LOGO_CANDIDATES: Record<HeaderTheme, string[]> = {
  dark: [getAssetPath('fav2.webp'), getAssetPath('fav2.png')],
  light: [getAssetPath('fav3.webp'), getAssetPath('fav3.png')],
}

export default function SiteHeader() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const frameRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [headerTheme, setHeaderTheme] = useState<HeaderTheme>('light')
  const [logoSrc, setLogoSrc] = useState(LOGO_CANDIDATES.light[1])

  const homeIsActive = pathname === '/'
  const blogIsActive = pathname.startsWith('/blog')

  const updateHeaderTheme = useCallback(() => {
    const headerHeight = headerRef.current?.offsetHeight ?? 64
    const probeY = headerHeight + 8
    const themedSections = Array.from(document.querySelectorAll<HTMLElement>('[data-header-theme]'))

    for (const section of themedSections) {
      const rect = section.getBoundingClientRect()
      if (rect.top <= probeY && rect.bottom > probeY) {
        const nextTheme = section.dataset.headerTheme
        if (nextTheme === 'dark' || nextTheme === 'light') {
          setHeaderTheme(nextTheme)
          return
        }
      }
    }

    setHeaderTheme('light')
  }, [])

  const scheduleThemeUpdate = useCallback(() => {
    if (frameRef.current !== null) return

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null
      updateHeaderTheme()
    })
  }, [updateHeaderTheme])

  const resetHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
    }

    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false)
    }, HIDE_DELAY_MS)
  }, [])

  useEffect(() => {
    setIsVisible(true)
    scheduleThemeUpdate()
    resetHideTimer()

    const revealHeader = () => {
      setIsVisible(true)
      scheduleThemeUpdate()
      resetHideTimer()
    }

    const handleKeydown = (event: KeyboardEvent) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space']
      if (scrollKeys.includes(event.code) || scrollKeys.includes(event.key)) {
        revealHeader()
      }
    }

    window.addEventListener('scroll', revealHeader, { passive: true })
    window.addEventListener('wheel', revealHeader, { passive: true })
    window.addEventListener('touchstart', revealHeader, { passive: true })
    window.addEventListener('touchmove', revealHeader, { passive: true })
    window.addEventListener('resize', scheduleThemeUpdate, { passive: true })
    window.addEventListener('keydown', handleKeydown)

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
      }

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }

      window.removeEventListener('scroll', revealHeader)
      window.removeEventListener('wheel', revealHeader)
      window.removeEventListener('touchstart', revealHeader)
      window.removeEventListener('touchmove', revealHeader)
      window.removeEventListener('resize', scheduleThemeUpdate)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [pathname, resetHideTimer, scheduleThemeUpdate])

  useEffect(() => {
    let cancelled = false
    let probeImage: HTMLImageElement | null = null
    const candidates = LOGO_CANDIDATES[headerTheme]

    setLogoSrc(candidates[candidates.length - 1])

    const tryLoad = (index: number) => {
      if (cancelled || index >= candidates.length) return

      probeImage = new window.Image()
      probeImage.onload = () => {
        if (!cancelled) {
          setLogoSrc(candidates[index])
        }
      }
      probeImage.onerror = () => {
        tryLoad(index + 1)
      }
      probeImage.src = candidates[index]
    }

    tryLoad(0)

    return () => {
      cancelled = true
      probeImage = null
    }
  }, [headerTheme])

  const navToneClass = useMemo(() => {
    return headerTheme === 'dark'
      ? {
          active: 'text-white',
          idle: 'text-white/72 hover:text-white',
        }
      : {
          active: 'text-yes-blue',
          idle: 'text-gray-600 hover:text-yes-blue',
        }
  }, [headerTheme])

  return (
    <header
      ref={headerRef}
      data-site-header="true"
      className={`fixed inset-x-0 top-0 z-50 w-full bg-transparent transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="page-shell">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label="YES 화상영어 홈으로 이동"
          >
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <img
                src={logoSrc}
                alt="YES 화상영어 로고"
                className="h-full w-full object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors md:text-base ${
                homeIsActive ? navToneClass.active : navToneClass.idle
              }`}
            >
              홈
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors md:text-base ${
                blogIsActive ? navToneClass.active : navToneClass.idle
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
