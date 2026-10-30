'use client'

import { useEffect, useState } from 'react'
import { getAssetPath } from '@/lib/utils'
import {
  APPSTORE_PROVIDER_TOKEN,
  trackAppStoreClick,
  type AppStore,
  type StoreButtonPosition,
} from '@/lib/analytics'

const APP_STORE_URL = 'https://apps.apple.com/app/id6745255649'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=kr.ycse'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const

// App Analytics campaign token(ct)은 최대 40자
const APP_STORE_CAMPAIGN_MAX_LENGTH = 40

const imgApple = getAssetPath('70def9900c5cbdff7a5a56c4cc16b8ba61c7afe3.svg')
const imgGoogle = getAssetPath('e2db92e38f36839b53883c4e9edb8aa4098a30a5.svg')

const DEFAULT_URLS: Record<AppStore, string> = {
  ios: APP_STORE_URL,
  android: GOOGLE_PLAY_URL,
}

const VARIANTS: Record<
  StoreButtonPosition,
  { wrapper: string; button: string; label: string }
> = {
  hero: {
    wrapper: 'flex flex-col items-center gap-3 md:gap-4 sm:flex-row',
    button:
      'cta-pill-button cta-store-button cta-pill-button-light group relative border-border-gray2 border-solid text-black hover:bg-black hover:text-white transition-all duration-300',
    label: 'font-en type-button-primary text-black transition-colors duration-300 group-hover:text-white',
  },
  footer: {
    wrapper: 'flex flex-col items-center gap-4 lg:flex-row lg:gap-4',
    button:
      'cta-pill-button cta-store-button cta-pill-button-dark group relative border-white text-white hover:bg-white hover:text-black transition-colors',
    label: 'font-en type-button-primary',
  },
}

const STORES: { id: AppStore; label: string }[] = [
  { id: 'ios', label: 'App Store' },
  { id: 'android', label: 'Google Play' },
]

// 랜딩 URL의 UTM 값을 스토어 링크로 넘긴다.
// - Google Play: referrer 파라미터에 utm_* 쿼리스트링을 URL 인코딩해서 전달 (Install Referrer)
// - App Store: ct=<utm_campaign>, pt=<provider token> (App Analytics 캠페인 링크)
function buildStoreUrls(search: string): Record<AppStore, string> {
  const query = new URLSearchParams(search)

  const referrer = new URLSearchParams()
  UTM_KEYS.forEach((key) => {
    const value = query.get(key)
    if (value) referrer.set(key, value)
  })

  const googlePlay = new URL(GOOGLE_PLAY_URL)
  if (referrer.toString()) {
    googlePlay.searchParams.set('referrer', referrer.toString())
  }

  const appStore = new URL(APP_STORE_URL)
  const campaign = query.get('utm_campaign')
  if (campaign) {
    appStore.searchParams.set('ct', campaign.slice(0, APP_STORE_CAMPAIGN_MAX_LENGTH))
    if (APPSTORE_PROVIDER_TOKEN) {
      appStore.searchParams.set('pt', APPSTORE_PROVIDER_TOKEN)
    }
  }

  return {
    ios: appStore.toString(),
    android: googlePlay.toString(),
  }
}

function AppleStoreIcon() {
  return (
    <svg
      viewBox="0 0 25 30"
      aria-hidden="true"
      className="cta-pill-icon cta-pill-icon-apple"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.975 22.0114C23.988 24.8612 21.052 29.9109 18.0285 29.9609C16.017 29.9984 15.3798 28.7735 13.081 28.7735C10.7821 28.7735 10.07 29.9234 8.17091 29.9984C4.96002 30.1234 0 22.7113 0 16.2617C0 10.3245 4.13543 7.38712 7.74613 7.33712C9.68266 7.29962 11.5067 8.64955 12.6937 8.64955C13.8806 8.64955 16.1044 7.03713 18.4408 7.27462C19.4153 7.31212 22.1639 7.6746 23.9255 10.2495C19.2529 13.2993 19.9775 19.6865 25 22.0364L24.975 22.0114ZM18.4533 0C14.9175 0.137493 12.044 3.8498 12.4438 6.91214C15.7046 7.16213 18.8406 3.51232 18.4533 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 27 30"
      aria-hidden="true"
      className="cta-pill-icon cta-pill-icon-google h-[18px] w-[16.2px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.699863 29.5827L13.6289 16.4564L18.1842 21.0819L2.81173 29.7578C2.22237 30.0828 1.51023 30.0828 0.933152 29.7453L0.699863 29.5827ZM12.3274 15.1313L0 27.645V2.61748L12.3274 15.1313ZM20.0259 9.96823L26.0423 13.3686C26.6317 13.7061 27 14.3312 27 15.0063C27 15.6813 26.6317 16.3189 26.0423 16.6439L19.854 20.1318L14.9304 15.1313L20.0259 9.95573V9.96823ZM0.564803 0.542265C0.675308 0.429754 0.79809 0.342245 0.933152 0.254736C1.51023 -0.0827989 2.23465 -0.0827989 2.81173 0.242234L18.3438 9.00563L13.6166 13.7936L0.564803 0.542265Z"
        fill="currentColor"
      />
    </svg>
  )
}

function StoreIcon({ store, position }: { store: AppStore; position: StoreButtonPosition }) {
  if (position === 'footer') {
    return store === 'ios' ? (
      <img src={imgApple} alt="Apple" className="cta-pill-icon cta-pill-icon-apple group-hover:invert transition-all duration-300" />
    ) : (
      <img src={imgGoogle} alt="Google" className="cta-pill-icon cta-pill-icon-google h-[18px] w-[16.2px] group-hover:invert transition-all duration-300" />
    )
  }

  return store === 'ios' ? <AppleStoreIcon /> : <GooglePlayIcon />
}

export default function StoreButtons({ position }: { position: StoreButtonPosition }) {
  // 정적 export HTML과 첫 hydration은 기본 URL로 렌더하고, 마운트 후에 UTM을 반영한다.
  const [urls, setUrls] = useState(DEFAULT_URLS)

  useEffect(() => {
    if (window.location.search) {
      setUrls(buildStoreUrls(window.location.search))
    }
  }, [])

  const variant = VARIANTS[position]

  return (
    <div className={variant.wrapper}>
      {STORES.map((store) => (
        <a
          key={store.id}
          href={urls[store.id]}
          target="_blank"
          rel="noopener noreferrer"
          className={variant.button}
          onClick={() => trackAppStoreClick(store.id, position)}
        >
          <StoreIcon store={store.id} position={position} />
          <span lang="en" className={variant.label}>{store.label}</span>
        </a>
      ))}
    </div>
  )
}
