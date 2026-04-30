'use client'

import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const tiaFeatures = [
  {
    icon: getAssetPath('images/icon/B1.png'),
    title: '맞춤형 학습 코칭',
    description: '수업에서 받은 피드백을 분석해\n개인별 맞춤 학습과 코칭을 제공합니다',
  },
  {
    icon: getAssetPath('images/icon/B2.png'),
    title: '실시간 영어 대화 연습',
    description: '수업 외에도 언제든 티아와 영어로 대화하며\n막히는 부분은 한국어로 도움받을 수 있습니다',
  },
  {
    icon: getAssetPath('images/icon/B3.png'),
    title: '문장 분석 및 해설',
    description: '자세히 알고 싶은 문장이 있나요?\n문법, 어휘, 표현까지 쉽게 풀어드립니다',
  },
  {
    icon: getAssetPath('images/icon/B4.png'),
    title: '게임처럼 배우는 영어',
    description: '티아와 함께하는 다양한 게임으로\n영어를 더 자연스럽고 재미있게 익힐 수 있습니다',
  },
]

const Section3Tia = () => {
  return (
    <div className="mx-auto flex w-fit max-w-full flex-col gap-[40px] md:gap-[50px] lg:col-start-2 lg:row-start-2 lg:w-full lg:max-w-[420px] lg:gap-[60px] lg:self-center">
      <div className="flex w-fit max-w-full flex-col gap-[40px] md:gap-[50px] lg:w-full lg:gap-[60px]">
        {tiaFeatures.map((feature, index) => (
          <div key={index} className="flex w-fit max-w-full items-center gap-4 md:gap-5 lg:w-full lg:items-start lg:gap-6">
            <div className="relative h-[60px] w-[60px] flex-shrink-0 md:h-[80px] md:w-[80px] lg:h-[80px] lg:w-[80px]">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={90}
                height={90}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-2 text-left md:gap-[10px] lg:gap-[14px]">
              <h4 className="type-h3 text-black">{feature.title}</h4>
              <p className="type-body-base whitespace-pre-line text-black/70">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Section3Tia
