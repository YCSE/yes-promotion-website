// NEXT_PUBLIC_* 값은 빌드 시점에 번들에 인라인된다.
// GitHub Actions에서 미설정 변수는 빈 문자열로 들어오므로 빈 값은 "미설정"으로 취급한다.
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || ''
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || ''
export const FB_DOMAIN_VERIFICATION = process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION?.trim() || ''
export const APPSTORE_PROVIDER_TOKEN = process.env.NEXT_PUBLIC_APPSTORE_PROVIDER_TOKEN?.trim() || ''

export type AppStore = 'ios' | 'android'
export type StoreButtonPosition = 'hero' | 'footer'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

export function trackAppStoreClick(store: AppStore, position: StoreButtonPosition) {
  if (typeof window === 'undefined') return

  const params = { store, position }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'AppStoreClick', params)
  }

  if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('event', 'AppStoreClick', params)
  }
}
