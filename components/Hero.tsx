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
      if (position <= -5800) { // Full image width for 2x size
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
    <section className="relative w-full h-[900px] overflow-hidden bg-white">
      <div className="flex flex-col items-center justify-start pt-[200px] gap-[110px]">
        <div className="text-center">
          <h1 className="text-[70px] font-bold leading-[85px] tracking-[-2.1px] text-black">
            말하게 되는 영어
          </h1>
          <p className="text-[70px] font-bold leading-[85px] tracking-[-2.1px] text-black">
            진짜 시작은 <span className="font-extrabold text-[#4b52ae]">YES</span>
          </p>
        </div>
        
        <div className="relative w-full h-[454px] overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex absolute h-full items-center"
            style={{ willChange: 'transform' }}
          >
            {/* First copy of the image */}
            <div className="relative h-[440px] flex-shrink-0">
              <Image 
                src={getAssetPath('images/thumbnail_PC.png')} 
                alt="Students and Teachers" 
                width={5800}
                height={440}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
            {/* Second copy for seamless loop */}
            <div className="relative h-[440px] flex-shrink-0">
              <Image 
                src={getAssetPath('images/thumbnail_PC.png')} 
                alt="Students and Teachers" 
                width={5800}
                height={440}
                className="h-full w-auto object-contain"
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