'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getAssetPath } from '@/lib/utils'

const HIDE_DELAY_MS = 2000
const LOGO_MARK_PATH = getAssetPath('logo-mark.svg')

type HeaderTheme = 'light' | 'dark'

export default function SiteHeader() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const frameRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [headerTheme, setHeaderTheme] = useState<HeaderTheme>('light')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const homeIsActive = pathname === '/'
  const blogIsActive = pathname.startsWith('/blog')

  const updateHeaderTheme = useCallback(() => {
    const headerHeight = headerRef.current?.offsetHeight ?? 64
    const probeViewportY = headerHeight + 8
    const probeDocumentY = window.scrollY + probeViewportY
    const heroSection = document.querySelector<HTMLElement>('.hero-section')

    if (heroSection) {
      const heroTop = heroSection.getBoundingClientRect().top + window.scrollY
      const heroBottom = heroTop + heroSection.offsetHeight

      if (heroTop <= probeDocumentY && heroBottom > probeDocumentY) {
        setHeaderTheme('dark')
        return
      }
    }

    const darkSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-header-theme="dark"]')
    )

    for (const section of darkSections) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const sectionBottom = sectionTop + section.offsetHeight

      if (sectionTop <= probeDocumentY && sectionBottom > probeDocumentY) {
        setHeaderTheme('dark')
        return
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

    if (isMenuOpen) return

    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false)
    }, HIDE_DELAY_MS)
  }, [isMenuOpen])

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
    window.addEventListener('load', scheduleThemeUpdate)
    window.addEventListener('resize', scheduleThemeUpdate, { passive: true })
    window.addEventListener('keydown', handleKeydown)

    const delayedInit = window.setTimeout(() => {
      scheduleThemeUpdate()
    }, 120)

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
      }

      window.clearTimeout(delayedInit)

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }

      window.removeEventListener('scroll', revealHeader)
      window.removeEventListener('wheel', revealHeader)
      window.removeEventListener('touchstart', revealHeader)
      window.removeEventListener('touchmove', revealHeader)
      window.removeEventListener('load', scheduleThemeUpdate)
      window.removeEventListener('resize', scheduleThemeUpdate)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [pathname, resetHideTimer, scheduleThemeUpdate])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      setIsVisible(true)
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
      }
      return
    }

    resetHideTimer()
  }, [isMenuOpen, resetHideTimer])

  useEffect(() => {
    if (!isMenuOpen) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (menuRef.current?.contains(target)) return
      setIsMenuOpen(false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown, { passive: true })
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

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

  const logoColor = headerTheme === 'dark' ? '#ffffff' : '#3E86D9'
  const menuButtonToneClass =
    headerTheme === 'dark'
      ? 'text-white hover:text-white'
      : 'text-primary hover:text-primary'
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
              <span
                aria-hidden="true"
                className="block h-full w-full"
                style={{
                  backgroundColor: logoColor,
                  WebkitMaskImage: `url(${LOGO_MARK_PATH})`,
                  maskImage: `url(${LOGO_MARK_PATH})`,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
            </div>
          </Link>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={isMenuOpen}
              aria-controls="site-header-menu"
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${menuButtonToneClass}`}
              onClick={() => {
                setIsVisible(true)
                setIsMenuOpen((prev) => !prev)
              }}
            >
              <span className="sr-only">메뉴</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="1" y1="5" x2="23" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="1" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="1" y1="19" x2="23" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div
              id="site-header-menu"
              className={`absolute right-0 top-full mt-3 min-w-[132px] rounded-[18px] border border-black/5 bg-white/95 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-200 ${
                isMenuOpen
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-2 opacity-0'
              }`}
            >
              <nav className="flex flex-col">
                <Link
                  href="/"
                  className={`rounded-[12px] px-4 py-3 text-sm font-medium transition-colors md:text-base ${
                    homeIsActive ? 'text-yes-blue' : 'text-gray-700 hover:bg-black/5 hover:text-yes-blue'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  홈
                </Link>
                <Link
                  href="/blog"
                  className={`rounded-[12px] px-4 py-3 text-sm font-medium transition-colors md:text-base ${
                    blogIsActive ? 'text-yes-blue' : 'text-gray-700 hover:bg-black/5 hover:text-yes-blue'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  블로그
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
