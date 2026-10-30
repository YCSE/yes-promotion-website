'use client'

import { getAssetPath } from '@/lib/utils'
import ResponsiveAssetImage from '@/components/ResponsiveAssetImage'
import StoreButtons from '@/components/StoreButtons'

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
        alt={`익스 1:1 화상수업 화면 ${index + 1}`}
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

          <StoreButtons position="hero" />
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
