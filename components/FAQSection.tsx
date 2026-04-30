'use client'

import { useState } from 'react'

const faqs = [
  {
    question: '영어를 완전히 처음 시작해도 수업을 따라갈 수 있나요?',
    answer:
      '물론입니다!\nYES는 완전 초보자를 위한 기초 과정부터 시작합니다.\n알파벳과 기본 인사말부터 차근차근 학습하며,\n한국어 지원이 가능한 Tia가 어려운 부분을 친절하게 설명해 드립니다.',
  },
  {
    question: '어린이부터 성인까지 모두 수강이 가능한가요?',
    answer:
      '네, 가능합니다.\nYES는 7세부터 성인까지 모든 연령대를 위한 맞춤형 커리큘럼을 제공합니다.\n연령과 레벨에 따라 적합한 주제, 속도, 난이도로 수업이 진행됩니다.\n1:1 수업의 장점이랄까요?',
  },
  {
    question: '레벨 테스트는 어떻게 진행되나요?',
    answer:
      '레벨 테스트는 말하기 중심으로 간편하게 진행됩니다.\n전문 선생님의 수업 이후 AI 티아가 수업을 분석해 학생 수준에 정확히 맞는 조언을 제공합니다.\n결과를 바탕으로 최적의 수업 방향도 안내해 드려요.',
  },
  {
    question: '티아는 어떤 기준으로 분석하고 피드백하나요?',
    answer:
      '티아는 최신 AI 언어 모델에 영어선생님의 페르소나를 학습시킨 AI입니다.\n수업 중 선생님이 남긴 피드백을 패턴화 해서 학습하여,\n학생이 자주 실수하는 부분을 정확히 분석하고 영어학습 방향을 제시합니다.',
  },
]

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <section
      id="faq"
      data-header-theme="light"
      className="landing-section-spacing relative w-full scroll-mt-24 bg-bg-blue md:scroll-mt-28"
    >
      <div className="page-shell">
        <div className="mx-auto max-w-[1080px]">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index

            return (
              <div key={faq.question}>
                {index > 0 && (
                  <div className="my-[30px] h-[1px] w-full bg-gray-200 md:my-[40px] lg:my-[50px]" />
                )}

                <div className="py-[2px]">
                  <button
                    type="button"
                    className="block w-full cursor-pointer"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`type-faq block text-center transition-all ${
                        isOpen ? 'font-bold text-yes-blue' : 'font-light text-text-primary'
                      }`}
                    >
                      {faq.question}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="type-body-base mx-auto mt-6 max-w-[800px] whitespace-pre-line px-4 text-center text-text-primary md:mt-7 md:px-0 lg:mt-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
