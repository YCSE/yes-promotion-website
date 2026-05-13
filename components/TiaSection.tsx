'use client'

import { useState } from 'react'
import Section3Tia from '@/components/Section3Tia'
import TiaModal from '@/components/TiaModal'
import TiaShowcaseImage from '@/components/TiaShowcaseImage'

export default function TiaSection() {
  const [isTiaModalOpen, setIsTiaModalOpen] = useState(false)

  return (
    <>
      <section
        id="tia"
        data-header-theme="light"
        className="relative w-full scroll-mt-24 overflow-hidden bg-white pt-0 pb-[80px] text-black md:scroll-mt-28 md:pb-[90px] lg:pb-[110px]"
      >
        <div className="page-shell">
          <div className="grid grid-cols-1 justify-items-center gap-[40px] md:gap-[40px] lg:grid-cols-[auto_minmax(360px,420px)] lg:items-start lg:justify-center lg:gap-x-[80px] lg:gap-y-[50px]">
            <div className="flex flex-col items-center lg:col-span-2">
              <h2 className="type-h2 text-center text-black">
                수업 이후에도
                <br />
                <span className="font-ko">티아</span>가 함께합니다
              </h2>
              <p className="type-body-base mt-[12px] text-center text-primary md:mt-[16px] lg:mt-[20px]">
                티아는 여러분과 영어 여정을 함께하는 AI 선생님입니다.
                <br />
                수업 데이터와 피드백을 분석해 꾸준히 코칭을 해 드려요!
              </p>
            </div>

            <TiaShowcaseImage />
            <Section3Tia />

            <div className="flex justify-center lg:col-span-2">
              <button
                type="button"
                onClick={() => setIsTiaModalOpen(true)}
                className="cta-pill-button cta-pill-button-light relative border-border-gray2 border-solid hover:bg-black hover:text-white transition-all duration-300 group"
              >
                <span className="type-button-primary text-center text-black group-hover:text-white transition-colors duration-300">
                  자세히 보기
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <TiaModal isOpen={isTiaModalOpen} onClose={() => setIsTiaModalOpen(false)} />
    </>
  )
}
