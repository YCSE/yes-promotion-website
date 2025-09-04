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
      if (position <= -3634) { // Updated for increased width
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
    <section className="relative w-full h-[800px] md:h-[1200px] overflow-hidden bg-white">
      <div className="flex flex-col items-center justify-start pt-[80px] md:pt-[200px] gap-[50px] md:gap-[110px] px-4 md:px-6">
        <div className="text-center">
          <h1 className="text-[32px] md:text-[50px] lg:text-[70px] font-bold leading-[40px] md:leading-[60px] lg:leading-[85px] tracking-[-1px] md:tracking-[-1.5px] lg:tracking-[-2.1px] text-black">
            말하게 되는 영어
          </h1>
          <p className="text-[32px] md:text-[50px] lg:text-[70px] font-bold leading-[40px] md:leading-[60px] lg:leading-[85px] tracking-[-1px] md:tracking-[-1.5px] lg:tracking-[-2.1px] text-black">
            진짜 시작은 <span className="font-extrabold text-yes-blue">YES</span>
          </p>
        </div>
        
        <div className="relative w-full h-[541px] md:h-[794px] overflow-visible -mt-[60px]">
          <div 
            ref={sliderRef}
            className="flex absolute h-full items-center"
            style={{ willChange: 'transform' }}
          >
            {/* First copy of the image */}
            <div className="relative h-[541px] md:h-[794px] flex-shrink-0" style={{ width: '3634px' }}>
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
            <div className="relative h-[541px] md:h-[794px] flex-shrink-0" style={{ width: '3634px' }}>
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