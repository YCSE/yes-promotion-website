'use client'

import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const Section5 = () => {
  const features = [
    {
      icon: getAssetPath('images/frame4/C1.webp'),
      title: '현재 영어 레벨 정확 진단',
      description: '문법, 어휘 등으로 영역을 세분화하여\n구체적으로 진단합니다'
    },
    {
      icon: getAssetPath('images/frame4/C2.webp'),
      title: '맞춤형 학습 방향 제시',
      description: '나에게 딱 맞는 학습 전략과 수업을 추천해\n막막한 영어 공부의 길을 열어줍니다'
    },
    {
      icon: getAssetPath('images/frame4/C3.webp'),
      title: 'AI 기반 회화 습관 분석',
      description: '대화한 내용 분석해서\n나도 몰랐던 습관을 발견할 수 있어요'
    }
  ]

  return (
    <section
      id="level-test"
      data-header-theme="light"
      className="landing-section-spacing relative w-full scroll-mt-24 bg-white text-black md:scroll-mt-28"
    >
      <div className="page-shell">
        <div className="flex flex-col items-center mb-[40px] md:mb-[40px] lg:mb-[50px]">
          <h2 className="type-h2 text-center text-black">
            지금 레벨테스트 신청하고<br />
            무료 수업 받으세요
          </h2>
          <p className="type-body-base text-primary text-center mt-[12px] md:mt-[16px] lg:mt-[20px]">
            가볍게 시작해 보셔도 괜찮아요.<br />
            여러분에게 맞는 방향으로 차근차근 안내해 드립니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-[40px] md:gap-[40px] lg:gap-[80px] items-center justify-center">
          <div className="relative w-[250px] h-[500px] md:w-[280px] md:h-[560px] lg:w-[300px] lg:h-[607px]">
            <Image
              src={getAssetPath('images/frame4/img 3.webp')}
              alt="Video Call Interface"
              width={300}
              height={607}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-[40px] md:gap-[60px] lg:gap-[75px]">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 md:gap-5 lg:gap-6 items-start">
                <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] flex items-center justify-center flex-shrink-0">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="max-w-[300px]">
                  <h4 className="type-h3 mb-2 md:mb-[10px] lg:mb-3 text-black">
                    {feature.title}
                  </h4>
                  <p className="type-body-base text-gray-600 whitespace-pre-line">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section5
