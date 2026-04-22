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
      description: '매칭될 선생님에 대한 걱정은 이제 그만.\n익스는 선생님의 가치관과 티칭 역량까지 꼼꼼히 검증합니다.'
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
    <section className="relative w-full bg-[#222222] text-white py-[80px] md:py-[150px] lg:py-[200px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Section 3-1 */}
        <div className="mb-[80px] md:mb-[150px] lg:mb-[200px]">
          <h2 className="type-h2 text-center mb-[50px] md:mb-[80px] lg:mb-[100px]">
            교과서 밖에서 통하는 영어,<br/>
            <span className="font-ko">익스</span>로 시작하세요!
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
                <h6 className="type-h5 text-text-identity-dark mb-[15px] md:mb-[18px] lg:mb-[22px]">{feature.title}</h6>
                <h4 className="type-h3 text-white mb-[15px] md:mb-[20px] lg:mb-[23px]">{feature.subtitle}</h4>
                <p className="type-body-base text-white/90 whitespace-pre-line">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3-2 */}
        <div className="flex flex-col items-center gap-[40px] md:gap-[70px] lg:gap-[100px]">
          <h2 className="type-h2 text-center whitespace-pre">
            수업 이후에도<br/>
            <span className="font-ko">티아</span>가 여러분의 코치가 되어줍니다
          </h2>
          
          <div className="w-[280px] h-[500px] md:w-[320px] md:h-[570px] lg:w-[360px] lg:h-[632px] bg-white rounded-[10px] overflow-hidden flex items-center justify-center p-2">
            <video 
              className="w-full h-full object-contain rounded-[10px]"
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
                  <p className="type-body-base whitespace-pre">
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
            <span className="font-ko">티아</span> 자세히 보기
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
