'use client'

import ResponsiveAssetImage from '@/components/ResponsiveAssetImage'
import { getAssetPath } from '@/lib/utils'

const Section5 = () => {
  const features = [
    {
      iconName: 'C1',
      title: '현재 영어 레벨 정확 진단',
      description: '문법, 어휘 등으로 영역을 세분화하여\n구체적으로 진단합니다',
    },
    {
      iconName: 'C2',
      title: '맞춤형 학습 방향 제시',
      description: '나에게 딱 맞는 학습 전략과 수업을 추천해\n막막한 영어 공부의 길을 열어줍니다',
    },
    {
      iconName: 'C3',
      title: 'AI 기반 회화 습관 분석',
      description: '대화한 내용 분석해서\n나도 몰랐던 습관을 발견할 수 있어요',
    },
  ]

  return (
    <section
      id="level-test"
      data-header-theme="light"
      className="landing-section-spacing relative w-full scroll-mt-24 bg-white text-black md:scroll-mt-28"
    >
      <div className="page-shell">
        <div className="mb-[40px] flex flex-col items-center md:mb-[40px] lg:mb-[50px]">
          <h2 className="type-h2 text-center text-black">
            지금 레벨테스트 신청하고
            <br />
            무료 수업 받으세요
          </h2>
          <p className="type-body-base mt-[12px] text-center text-primary md:mt-[16px] lg:mt-[20px]">
            가볍게 시작해 보셔도 괜찮아요.
            <br />
            여러분에게 맞는 방향으로 차근차근 안내해 드립니다.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-[40px] md:gap-[40px] lg:flex-row lg:gap-[80px]">
          <div className="relative h-[500px] w-[250px] md:h-[560px] md:w-[280px] lg:h-[607px] lg:w-[300px]">
            <ResponsiveAssetImage
              high={getAssetPath('images/img/video-call-1540.webp')}
              medium={getAssetPath('images/img/video-call-1080.webp')}
              fallback={getAssetPath('images/img/video call.png')}
              alt="Video Call Interface"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-[40px] md:gap-[60px] lg:gap-[75px]">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 md:gap-5 lg:gap-6">
                <div className="flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center md:h-[80px] md:w-[80px]">
                  <ResponsiveAssetImage
                    high={getAssetPath(`images/icon/${feature.iconName}-1540.webp`)}
                    medium={getAssetPath(`images/icon/${feature.iconName}-1080.webp`)}
                    fallback={getAssetPath(`images/icon/${feature.iconName}.png`)}
                    alt={feature.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="max-w-[300px]">
                  <h4 className="type-h3 mb-2 text-black md:mb-[10px] lg:mb-3">
                    {feature.title}
                  </h4>
                  <p className="type-body-base whitespace-pre-line text-gray-600">
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
