'use client'

import { useState } from 'react'
import Image from 'next/image'
import TiaModal from './TiaModal'
import { getAssetPath } from '@/lib/utils'

const tiaFeatures = [
  {
    icon: getAssetPath('images/section3-2/list2-1.webp'),
    title: '누적 피드백 기반 지도',
    description: '누적된 피드백을 바탕으로\n개인별 맞춤 지도를 합니다',
  },
  {
    icon: getAssetPath('images/section3-2/list2-2.webp'),
    title: '필요할 땐 한국어로 소통',
    description: '표현하기 어려운 내용도\n한국어로 쉽게 상담할 수 있습니다',
  },
  {
    icon: getAssetPath('images/section3-2/list2-2.webp'),
    title: '필요할 땐 한국어로 소통',
    description: '표현하기 어려운 내용도\n한국어로 쉽게 상담할 수 있습니다',
  },
  {
    icon: getAssetPath('images/section3-2/list2-3.webp'),
    title: '누구나 언제든 이용 가능',
    description: '수강 여부와 관계없이\n100% 무료로 이용 가능합니다',
  },
]

const Section3Tia = () => {
  const [isTiaModalOpen, setIsTiaModalOpen] = useState(false)

  return (
    <section className="landing-section-spacing relative w-full overflow-hidden bg-bg-blue text-black">
      <div className="page-shell">
        <div className="grid grid-cols-1 justify-items-center gap-[40px] md:gap-[40px] lg:grid-cols-[360px_minmax(360px,420px)] lg:justify-center lg:items-start lg:gap-x-[80px] lg:gap-y-[50px]">
          <div className="flex flex-col items-center lg:col-span-2">
            <h2 className="type-h2 text-center">
              수업 이후에도
              <br />
              <span className="font-ko">티아</span>가 함께합니다
            </h2>
            <p className="type-body-base mt-[12px] text-center text-primary md:mt-[16px] lg:mt-[20px]">
              티아는 여러분의 영어 여정을 함께하는 AI 선생님입니다.
              <br />
              수업 데이터와 피드백을 분석해 꾸준히 코치해 드립니다.
            </p>
          </div>

          <div className="flex h-[500px] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-[10px] bg-white p-2 md:h-[570px] md:w-[320px] md:max-w-none lg:col-start-1 lg:row-start-2 lg:h-[632px] lg:w-[360px]">
            <video
              className="block h-full w-full max-w-full rounded-[10px] object-cover object-top"
              src={getAssetPath('images/section3-2/tia.mp4')}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="flex w-full flex-col gap-[40px] md:gap-[50px] lg:col-start-2 lg:row-start-2 lg:max-w-[420px] lg:gap-[60px] lg:self-center">
            <div className="flex w-full flex-col gap-[40px] md:gap-[50px] lg:gap-[60px]">
              {tiaFeatures.map((feature, index) => (
                <div key={index} className="flex max-w-[420px] items-center gap-4 md:gap-5 lg:items-start lg:gap-6">
                  <div className="relative h-[70px] w-[70px] flex-shrink-0 md:h-[90px] md:w-[90px] lg:h-[90px] lg:w-[90px]">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={90}
                      height={90}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-4 text-left md:gap-5 lg:gap-7">
                    <h4 className="type-h3 text-black">{feature.title}</h4>
                    <p className="type-body-base whitespace-pre-line text-black/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsTiaModalOpen(true)}
            className="cta-pill-button cta-pill-button-light type-button-primary border-black text-black transition-colors hover:bg-black hover:text-white lg:col-span-2"
          >
            자세히 보기
          </button>
        </div>
      </div>

      <TiaModal
        isOpen={isTiaModalOpen}
        onClose={() => setIsTiaModalOpen(false)}
      />
    </section>
  )
}

export default Section3Tia
