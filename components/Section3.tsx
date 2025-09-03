import Image from 'next/image'

const Section3 = () => {
  const features = [
    {
      icon: '/images/section3/A1.png',
      title: '검증된 원어민급 강사',
      subtitle: '믿을 수 있는 진짜 원어민급 선생님만',
      description: '매칭될 선생님에 대한 걱정은 이제 그만.\nYES는 선생님의 가치관과 티칭 역량까지 꼼꼼히 검증합니다.'
    },
    {
      icon: '/images/section3/A2.png',
      title: '개별 맞춤 커리큘럼',
      subtitle: '나에게 딱 맞는 영어 로드맵',
      description: '모두에게 똑같은 수업은 없습니다.\n내 실력에 맞춘 커리큘럼으로 빠르게 성장할 수 있습니다.'
    },
    {
      icon: '/images/section3/A3.png',
      title: '세계가 인정한 학습법',
      subtitle: '과학적으로 검증된 언어 습득 이론',
      description: 'GPA(성장 참여 접근법)와 OPOL(1인 1언어) 원칙을 적용하여\n체계적이고 효과적인 실력 향상을 보장합니다.'
    },
    {
      icon: '/images/section3/A5.png',
      title: '효율적인 시간 활용',
      subtitle: '틈새 시간만 활용해도 충분한 성과를',
      description: '잠깐의 투자로도 충분한 학습 효과를 누릴 수 있어요.\n효율적인 수업으로 시간을 최대한 활용할 수 있도록 도와드립니다.'
    }
  ]

  const tiaFeatures = [
    {
      icon: '/images/section3-2/list2-1.png',
      title: '누적 피드백 기반 지도',
      description: '누적된 피드백을 바탕으로\n개인별 맞춤 지도를 합니다'
    },
    {
      icon: '/images/section3-2/list2-2.png',
      title: '필요할 땐 한국어로 소통',
      description: '표현하기 어려운 내용도\n한국어로 쉽게 상담할 수 있습니다'
    },
    {
      icon: '/images/section3-2/list2-3.png',
      title: '누구나 언제든 이용 가능',
      description: '수강 여부와 관계없이\n100% 무료로 이용 가능합니다'
    }
  ]

  return (
    <section className="relative w-full bg-[#1A1F3A] text-white py-[200px]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section 3-1 */}
        <div className="mb-[200px]">
          <h2 className="text-[50px] font-extrabold leading-[60px] text-center mb-[100px] tracking-[-1.5px]">
            교과서 밖에서 통하는 영어,<br/>
            YES로 시작하세요!
          </h2>
          
          <div className="grid grid-cols-2 gap-20">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-[110px] h-[110px] mb-[25px] relative">
                  <Image 
                    src={feature.icon} 
                    alt={feature.title}
                    width={110}
                    height={110}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[18px] font-bold text-[#868BC7] mb-[22px] tracking-[-0.54px] leading-[32px]">{feature.title}</p>
                <h3 className="text-[30px] font-bold text-white mb-[23px] tracking-[-0.9px] leading-[40px]">{feature.subtitle}</h3>
                <p className="text-[18px] font-light text-white/90 whitespace-pre-line tracking-[-0.54px] leading-[32px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3-2 */}
        <div className="flex flex-col items-center gap-[100px]">
          <h2 className="text-[50px] font-bold leading-[65px] text-center tracking-[-1px] whitespace-pre">
            수업 이후에도<br/>
            TIA가 여러분의 코치가 되어줍니다
          </h2>
          
          <div className="w-[360px] h-[632px] bg-white rounded-[15px] overflow-hidden flex items-center justify-center p-2">
            <video 
              className="w-full h-full object-contain rounded-[10px]"
              src="/images/section3-2/tia.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          
          <p className="text-[25px] font-light leading-[40px] text-center tracking-[-0.75px] whitespace-pre">
            TIA는 여러분의 영어 여정을 함께하는 AI 선생님입니다.<br/>
            수업 중에 했던 표현과 피드백을 분석해 여러분을 돕는 똑똑한 학습 파트너죠.<br/>
            수업이 끝난 뒤에도 실력이 향상될 수 있도록 계속해서 코치해 줍니다.
          </p>
          
          <div className="flex gap-40 items-start justify-center">
            {tiaFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col gap-[25px] items-center">
                <div className="w-[110px] h-[110px] relative">
                  <Image 
                    src={feature.icon} 
                    alt={feature.title}
                    width={110}
                    height={110}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-7 items-center text-center">
                  <h4 className="text-[23px] font-bold leading-[36px] tracking-[-0.69px]">
                    {feature.title}
                  </h4>
                  <p className="text-[18px] font-light leading-[32px] tracking-[-0.54px] whitespace-pre">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-[350px] h-[100px] rounded-[100px] border-2 border-white text-white text-[25px] font-bold tracking-[-0.75px] hover:bg-white hover:text-[#1A1F3A] transition-colors">
            지금 TIA 만나보기
          </button>
        </div>
      </div>
    </section>
  )
}

export default Section3