'use client'

import Section3Tia from '@/components/Section3Tia'
import TiaShowcaseImage from '@/components/TiaShowcaseImage'

export default function TiaSection() {
  return (
    <section
      id="tia"
      data-header-theme="dark"
      className="relative w-full scroll-mt-24 overflow-hidden bg-bg-dark pt-0 pb-[80px] text-white md:scroll-mt-28 md:pb-[90px] lg:pb-[110px]"
    >
      <div className="page-shell">
        <div className="grid grid-cols-1 justify-items-center gap-[40px] md:gap-[40px] lg:grid-cols-[auto_minmax(360px,420px)] lg:justify-center lg:items-start lg:gap-x-[80px] lg:gap-y-[50px]">
          <div className="flex flex-col items-center lg:col-span-2">
            <h2 className="type-h2 text-center text-white">
              수업 이후에도
              <br />
              <span className="font-ko">티아</span>가 함께합니다
            </h2>
            <p className="type-body-base mt-[12px] text-center text-white md:mt-[16px] lg:mt-[20px]">
              티아는 여러분과 영어 여정을 함께하는 AI 선생님입니다.
              <br />
              수업 데이터와 피드백을 분석해 꾸준히 코칭을 해 드려요!
            </p>
          </div>

          <TiaShowcaseImage />
          <Section3Tia />
        </div>
      </div>
    </section>
  )
}
