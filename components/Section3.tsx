'use client'

import { useState } from 'react'
import Image from 'next/image'
import TiaModal from './TiaModal'
import { getAssetPath } from '@/lib/utils'

const Section3 = () => {
  const [isTiaModalOpen, setIsTiaModalOpen] = useState(false)

  const features = [
    {
      icon: getAssetPath('images/section3/A1.webp'),
      title: '검증된 원어민급 강사',
      subtitle: '믿을 수 있는 진짜 원어민급 선생님만',
      description: '매칭될 선생님에 대한 걱정은 이제 그만.\nYES는 선생님의 가치관과 티칭 역량까지 꼼꼼히 검증합니다.'
    },
    {
      icon: getAssetPath('images/section3/A2.webp'),
      title: '개별 맞춤 커리큘럼',
      subtitle: '나에게 딱 맞는 영어 로드맵',
      description: '모두에게 똑같은 수업은 없습니다.\n내 실력에 맞춘 커리큘럼으로 빠르게 성장할 수 있습니다.'
    },
    {
      icon: getAssetPath('images/section3/A3.webp'),
      title: '세계가 인정한 학습법',
      subtitle: '과학적으로 검증된 언어 습득 이론',
      description: 'GPA(성장 참여 접근법)와 OPOL(1인 1언어) 원칙을 적용하여\n체계적이고 효과적인 실력 향상을 보장합니다.'
    },
    {
      icon: getAssetPath('images/section3/A5.webp'),
      title: '효율적인 시간 활용',
      subtitle: '틈새 시간만 활용해도 충분한 성과를',
      description: '잠깐의 투자로도 충분한 학습 효과를 누릴 수 있어요.\n효율적인 수업으로 시간을 최대한 활용할 수 있도록 도와드립니다.'
    }
  ]

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
    <section className="relative w-full bg-[#1A1F3A] text-white py-[80px] md:py-[150px] lg:py-[200px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Section 3-1 */}
        <div className="mb-[80px] md:mb-[150px] lg:mb-[200px]">
          <h2 className="text-[28px] md:text-[40px] lg:text-[50px] font-bold leading-[36px] md:leading-[50px] lg:leading-[60px] text-center mb-[50px] md:mb-[80px] lg:mb-[100px] tracking-[-0.8px] md:tracking-[-1.2px] lg:tracking-[-1.5px]">
            교과서 밖에서 통하는 영어,<br />
            YES로 시작하세요!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] mb-[20px] md:mb-[25px] relative">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={110}
                    height={110}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[14px] md:text-[16px] lg:text-[18px] font-bold text-[#868BC7] mb-[15px] md:mb-[18px] lg:mb-[22px] tracking-[-0.42px] md:tracking-[-0.48px] lg:tracking-[-0.54px] leading-[24px] md:leading-[28px] lg:leading-[32px]">{feature.title}</p>
                <h3 className="text-[20px] md:text-[25px] lg:text-[30px] font-bold text-white mb-[15px] md:mb-[20px] lg:mb-[23px] tracking-[-0.6px] md:tracking-[-0.75px] lg:tracking-[-0.9px] leading-[28px] md:leading-[34px] lg:leading-[40px]">{feature.subtitle}</h3>
                <p className="text-[14px] md:text-[16px] lg:text-[18px] font-light text-white/90 whitespace-pre-line tracking-[-0.42px] md:tracking-[-0.48px] lg:tracking-[-0.54px] leading-[24px] md:leading-[28px] lg:leading-[32px]">
                  {index === 2 ? '암기 없이 모국어처럼 습득하는 검증된 학습법.\nGPA와 OPOL 원칙으로 자연스럽게 영어가 틔입니다.' : feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3-2 */}
        <div className="flex flex-col items-center gap-[40px] md:gap-[70px] lg:gap-[100px]">
          <div className="text-center">
            <span className="text-[#868BC7] font-bold text-[16px] md:text-[20px] mb-4 block">Tia가 특별한 이유</span>
            <h2 className="text-[28px] md:text-[40px] lg:text-[50px] font-bold leading-[36px] md:leading-[52px] lg:leading-[65px] tracking-[-0.8px] md:tracking-[-0.9px] lg:tracking-[-1px] whitespace-pre">
              수업이 끝난 후가<br />
              진짜 실력이 느는 시간입니다
            </h2>
          </div>

          <div className="w-[280px] h-[500px] md:w-[320px] md:h-[570px] lg:w-[360px] lg:h-[632px] bg-white rounded-[15px] overflow-hidden flex items-center justify-center p-2">
            <video
              className="w-full h-full object-contain rounded-[10px]"
              src={getAssetPath('images/section3-2/tia.mp4')}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <p className="text-[16px] md:text-[20px] lg:text-[25px] font-light leading-[26px] md:leading-[32px] lg:leading-[40px] text-center tracking-[-0.48px] md:tracking-[-0.6px] lg:tracking-[-0.75px] whitespace-pre-line px-4">
            Tia는 24시간 당신을 기다리는 AI 튜터입니다.
            수업 내용을 완벽하게 복습하고, 언제든 부담 없이 대화하세요.
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
                  <h4 className="text-[18px] md:text-[20px] lg:text-[23px] font-bold leading-[26px] md:leading-[30px] lg:leading-[36px] tracking-[-0.54px] md:tracking-[-0.6px] lg:tracking-[-0.69px]">
                    {feature.title}
                  </h4>
                  <p className="text-[14px] md:text-[16px] lg:text-[18px] font-light leading-[24px] md:leading-[28px] lg:leading-[32px] tracking-[-0.42px] md:tracking-[-0.48px] lg:tracking-[-0.54px] whitespace-pre">
                    {index === 2 ? <span className="text-[#868BC7] font-bold">100% 무료로 이용 가능합니다</span> : feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsTiaModalOpen(true)}
            className="w-[200px] h-[60px] md:w-[320px] md:h-[90px] lg:w-[350px] lg:h-[100px] rounded-[100px] border-2 border-white text-white text-[16px] md:text-[22px] lg:text-[25px] font-bold tracking-[-0.48px] md:tracking-[-0.66px] lg:tracking-[-0.75px] hover:bg-white hover:text-[#1A1F3A] transition-colors"
          >
            Tia 무료로 만나보기
          </button>
        </div>
      </div>

      {/* TIA Modal */}
      <TiaModal
        isOpen={isTiaModalOpen}
        onClose={() => setIsTiaModalOpen(false)}
      />
    </section>
  )
}

export default Section3