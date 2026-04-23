import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const Section3 = () => {
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

  return (
    <section className="landing-section-spacing relative w-full bg-bg-blue text-black">
      <div className="page-shell">
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
              <h4 className="type-h3 text-black mb-[15px] md:mb-[20px] lg:mb-[23px]">{feature.subtitle}</h4>
              <p className="type-body-base text-gray-600 whitespace-pre-line">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section3
