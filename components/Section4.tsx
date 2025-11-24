'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const Section4 = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      text: "3개월 만에 영어 회화 실력이 눈에 띄게 향상되었어요.\n특히 AI 코치 Tia의 맞춤형 연습이 큰 도움이 되었습니다!",
      author: "김지현, OPIc AL 달성"
    },
    {
      text: "매일 25분씩 꾸준히 하다 보니\n어느새 외국인과 자연스럽게 대화하고 있더라고요.",
      author: "이민수, 직장인"
    },
    {
      text: "GPA 학습법 덕분에 암기 스트레스 없이\n영어를 즐기면서 배우고 있습니다.",
      author: "박서연, 대학생"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-[400px] md:h-[450px] lg:h-[516px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getAssetPath('images/section4/section4.webp')}
          alt="Woman using laptop with TIA"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-6 max-w-[800px]">
        <div className="transition-opacity duration-500 ease-in-out">
          <h2 className="text-[18px] md:text-[24px] lg:text-[30px] font-light leading-[27px] md:leading-[36px] lg:leading-[45px] tracking-[-0.54px] md:tracking-[-0.72px] lg:tracking-[-0.9px] mb-[30px] md:mb-[35px] lg:mb-[40px] whitespace-pre-line">
            {testimonials[currentIndex].text}
          </h2>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] font-bold tracking-[-0.42px] md:tracking-[-0.45px] lg:tracking-[-0.48px] text-white/90">
            {testimonials[currentIndex].author}
          </p>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-4' : 'bg-white/40'
                }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section4