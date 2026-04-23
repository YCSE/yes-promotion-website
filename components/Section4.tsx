import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const Section4 = () => {
  return (
    <section className="landing-section-spacing relative w-full bg-white">
      <div className="relative h-[400px] md:h-[450px] lg:h-[516px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getAssetPath('images/section4/section4.webp')}
            alt="Woman using laptop with TIA"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 md:px-6 max-w-[800px]">
          <p className="type-body-emphasis mb-[8px] md:mb-[10px]">
            3개월 만에 영어 회화 실력이 눈에 띄게 향상되었어요.
          </p>
          <p className="type-body-emphasis mb-[30px] md:mb-[35px] lg:mb-[40px]">
            특히 AI 코치 티아의 맞춤형 연습이 큰 도움이 되었습니다!
          </p>
          <p className="type-body-support text-white/90">
            김지현, <span lang="en" className="font-en">OPIc AL</span> 달성
          </p>
        </div>
      </div>
    </section>
  )
}

export default Section4
