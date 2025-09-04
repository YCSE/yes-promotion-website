import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const Section4 = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[450px] lg:h-[516px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getAssetPath('images/section4/section4.png')}
          alt="Woman using laptop with TIA"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-6 max-w-[800px]">
        <h2 className="text-[18px] md:text-[24px] lg:text-[30px] font-light leading-[27px] md:leading-[36px] lg:leading-[45px] tracking-[-0.54px] md:tracking-[-0.72px] lg:tracking-[-0.9px] mb-[8px] md:mb-[10px]">
          3개월 만에 영어 회화 실력이 눈에 띄게 향상되었어요.
        </h2>
        <p className="text-[18px] md:text-[24px] lg:text-[30px] font-light leading-[27px] md:leading-[36px] lg:leading-[45px] tracking-[-0.54px] md:tracking-[-0.72px] lg:tracking-[-0.9px] mb-[30px] md:mb-[35px] lg:mb-[40px]">
          특히 AI 코치 Tia의 맞춤형 연습이 큰 도움이 되었습니다!
        </p>
        <p className="text-[14px] md:text-[15px] lg:text-[16px] font-light tracking-[-0.42px] md:tracking-[-0.45px] lg:tracking-[-0.48px] text-white/90">
          김지현, OPIc AL 달성
        </p>
      </div>
    </section>
  )
}

export default Section4