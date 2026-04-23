'use client'

import { useState } from 'react'
import Image from 'next/image'
import TiaModal from './TiaModal'
import { getAssetPath } from '@/lib/utils'

const Section3Tia = () => {
  const [isTiaModalOpen, setIsTiaModalOpen] = useState(false)

  const tiaFeatures = [
    {
      icon: getAssetPath('images/section3-2/list2-1.webp'),
      title: '누적 피드백 기반 지도',
      description: '누적된 피드백을 바탕으로\n개인별 맞춤 지도를 합니다'
    },
    {
      icon: getAssetPath('images/section3-2/list2-2.webp'),
      title: '필요할 땐 한국어로 소통',
      description: '표현하기 어려운 내용도\n한국어로 쉽게 상담할 수 있습니다'
    },
    {
      icon: getAssetPath('images/section3-2/list2-3.webp'),
      title: '누구나 언제든 이용 가능',
      description: '수강 여부와 관계없이\n100% 무료로 이용 가능합니다'
    }
  ]

  return (
    <section className="landing-section-spacing relative w-full overflow-hidden bg-bg-dark text-white">
      <div className="page-shell">
        <div className="flex flex-col items-center gap-[40px] md:gap-[70px] lg:gap-[100px]">
          <div className="flex flex-col items-center">
            <h2 className="type-h2 text-center">
              수업 이후에도<br />
              <span className="font-ko">티아</span>가 함께합니다
            </h2>
            <p className="type-body-base text-primary text-center mt-[12px] md:mt-[16px] lg:mt-[20px]">
              막히는 순간, 망설이지 말고 물어보세요!<br />
              티아가 항상 옆에서 코치해 드릴 거예요.
            </p>
          </div>

          <div className="w-full max-w-[280px] h-[500px] md:w-[320px] md:max-w-none md:h-[570px] lg:w-[360px] lg:h-[632px] bg-white rounded-[10px] overflow-hidden flex items-center justify-center p-2">
            <video
              className="block w-full h-full max-w-full object-cover object-top rounded-[10px]"
              src={getAssetPath('images/section3-2/tia.mp4')}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <p className="type-body-emphasis text-center whitespace-pre-line px-4">
            <span className="font-ko">티아</span>는 여러분의 영어 여정을 함께하는 <span lang="en" className="font-en">AI</span> 선생님입니다.
            수업 중에 했던 표현과 피드백을 분석해 여러분을 돕는 똑똑한 학습 파트너죠.
            수업이 끝난 뒤에도 실력이 향상될 수 있도록 계속해서 코치해 줍니다.
          </p>

          <div className="flex flex-col md:flex-row gap-10 md:gap-20 lg:gap-40 items-center md:items-start justify-center">
            {tiaFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col gap-[20px] md:gap-[25px] items-center max-w-[280px] md:max-w-none">
                <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] relative">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={110}
                    height={110}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-4 md:gap-5 lg:gap-7 items-center text-center">
                  <h4 className="type-h3">
                    {feature.title}
                  </h4>
                  <p className="type-body-base whitespace-pre text-white/80">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsTiaModalOpen(true)}
            className="cta-pill-button cta-pill-button-dark type-button-primary border-white text-white hover:bg-white hover:text-[#222222] transition-colors"
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
