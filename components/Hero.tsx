'use client'

import { getAssetPath } from '@/lib/utils'
import ResponsiveAssetImage from '@/components/ResponsiveAssetImage'

const HERO_CARDS = [
  { name: 'hero-call1' },
  { name: 'hero-call2' },
  { name: 'hero-call3' },
  { name: 'hero-call4' },
  { name: 'hero-call5' },
  { name: 'hero-call6' },
  { name: 'hero-call7' },
  { name: 'hero-call8' },
] as const

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

function HeroCallCard({
  name,
  index,
}: {
  name: string
  index: number
}) {
  return (
    <div
      className="hero-call-card relative shrink-0 overflow-hidden bg-white/12"
    >
      <ResponsiveAssetImage
        high={getAssetPath(`images/hero/${name}-1540.webp`)}
        medium={getAssetPath(`images/hero/${name}-1080.webp`)}
        fallback={getAssetPath(`images/hero/${name}.png`)}
        alt={`Hero call thumbnail ${index + 1}`}
        className="h-full w-full object-cover object-top md:object-[center_4%] lg:object-[center_2%]"
        loading={index < 4 ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
      />
    </div>
  )
}

const Hero = () => {
  return (
    <section data-header-theme="light" className="hero-section relative h-[90svh] w-full overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] bg-white" />

      <div className="hero-layout relative z-10 flex h-full flex-col">
        <div className="hero-content-wrapper flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-5 md:gap-[27px] md:px-6 lg:px-8">
          <div className="z-10 text-center">
            <h1 className="type-h1 text-black">
              <span className="block hero-question-line">영어가 너무 어렵다고?</span>
              <span className="block">답은 이미 정해져 <span className="font-ko font-extrabold text-black">익스</span></span>
            </h1>
          </div>

          <div className="flex flex-col items-center gap-3 md:gap-4 sm:flex-row">
            <a
              href="https://apps.apple.com/app/id6745255649"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pill-button cta-store-button cta-pill-button-light group relative border-border-gray2 border-solid text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <AppleStoreIcon />
              <span lang="en" className="font-en type-button-primary text-black transition-colors duration-300 group-hover:text-white">App Store</span>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=kr.ycse"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pill-button cta-store-button cta-pill-button-light group relative border-border-gray2 border-solid text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <GooglePlayIcon />
              <span lang="en" className="font-en type-button-primary text-black transition-colors duration-300 group-hover:text-white">Google Play</span>
            </a>
          </div>
        </div>

        <div className="hero-carousel relative -mx-4 w-[calc(100%+32px)] overflow-hidden md:-mx-6 md:w-[calc(100%+48px)]">
          <div className="hero-carousel-track absolute bottom-0 left-0 flex h-full items-end">
            <div
              className="flex h-full flex-none items-end gap-[35px] pr-[35px] md:gap-[45px] md:pr-[45px] lg:gap-[45px] lg:pr-[45px]"
            >
              {HERO_CARDS.map((card, index) => (
                <HeroCallCard
                  key={card.name}
                  name={card.name}
                  index={index}
                />
              ))}
            </div>

            <div className="flex h-full flex-none items-end gap-[35px] pr-[35px] md:gap-[45px] md:pr-[45px] lg:gap-[45px] lg:pr-[45px]">
              {HERO_CARDS.map((card, index) => (
                <HeroCallCard
                  key={`${card.name}-duplicate`}
                  name={card.name}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
