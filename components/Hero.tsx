'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const Hero = () => {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let animationId: number
    let position = 0
    const speed = 0.5

    const animate = () => {
      position -= speed

      // When the first image has scrolled completely out of view, reset position
      // Check screen size and use appropriate width
      const isMobile = window.innerWidth < 768
      const imageWidth = isMobile ? 1448 : 3634
      if (position <= -imageWidth) {
        position = 0
      }

      slider.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[1300px] overflow-hidden bg-white">
      <div className="flex flex-col items-center justify-start pt-[40px] md:pt-[200px] gap-[30px] md:gap-[80px] px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 md:gap-10 z-10">
          <div className="text-center">
            <h1 className="type-h1 text-black">
              <span className="block">말하게 되는 영어</span>
              <span className="block">진짜 시작은 <span lang="en" className="font-en font-extrabold text-yes-blue">YES</span></span>
            </h1>
          </div>

          <div className="flex flex-row gap-3 md:gap-4">
            <a
              href="https://apps.apple.com/app/id6745255649"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[150px] md:w-[200px] border border-black text-black py-2.5 md:py-3.5 rounded-[100px] flex items-center justify-center gap-2 hover:border-yes-blue hover:bg-yes-blue hover:text-white transition-all duration-300"
            >
              <img src={getAssetPath('images/70def9900c5cbdff7a5a56c4cc16b8ba61c7afe3.svg')} alt="Apple" className="w-[16px] h-[20px] md:w-[20px] md:h-[24px] invert group-hover:invert-0 transition-all duration-300" />
              <span lang="en" className="font-en type-button-primary">App Store</span>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=kr.ycse"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[150px] md:w-[200px] border border-black text-black py-2.5 md:py-3.5 rounded-[100px] flex items-center justify-center gap-2 hover:border-yes-blue hover:bg-yes-blue hover:text-white transition-all duration-300"
            >
              <img src={getAssetPath('images/e2db92e38f36839b53883c4e9edb8aa4098a30a5.svg')} alt="Google" className="w-[18px] h-[20px] md:w-[22px] md:h-[24px] invert group-hover:invert-0 transition-all duration-300" />
              <span lang="en" className="font-en type-button-primary">Google Play</span>
            </a>
          </div>
        </div>

        <div className="relative w-full h-[238px] md:h-[794px] overflow-hidden mt-[10px] md:-mt-[40px]">
          <div
            ref={sliderRef}
            className="flex absolute h-full items-center"
            style={{ willChange: 'transform' }}
          >
            {/* First copy of the image */}
            <div className="relative h-[238px] md:h-[794px] flex-shrink-0 w-[1448px] md:w-[3634px]">
              <Image
                src={getAssetPath('images/thumbnail_PC.webp')}
                alt="Students and Teachers"
                width={3480}
                height={454}
                className="h-full w-full object-contain object-center"
                priority
              />
            </div>
            {/* Second copy for seamless loop */}
            <div className="relative h-[238px] md:h-[794px] flex-shrink-0 w-[1448px] md:w-[3634px]">
              <Image
                src={getAssetPath('images/thumbnail_PC.webp')}
                alt="Students and Teachers"
                width={3480}
                height={454}
                className="h-full w-full object-contain object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
