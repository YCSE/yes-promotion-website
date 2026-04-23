'use client'

import { useState } from 'react'

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      question: '레벨 테스트는 어떻게 진행되나요?',
      answer: '레벨 테스트는 말하기 중심으로 간편하게 진행됩니다. 전문 선생님의 수업 이후 AI 티아가 수업을 분석해 학생 수준에 정확히 맞는 조언을 제공합니다.\n\n결과를 바탕으로 최적의 수업 방향도 안내해 드려요.'
    },
    {
      question: '티아가 제공하는 피드백은 정확한가요? 어떤 기준으로 분석하나요?',
      answer: '티아는 최신 AI 언어 모델에 영어선생님의 페르소나를 학습시킨 AI입니다. 수업 중 선생님이 남긴 피드백을 패턴화 해서 학습하여, 학생이 자주 실수하는 부분을 정확히 분석하고 영어학습 방향을 제시합니다.'
    },
    {
      question: '어린이부터 성인까지 모두 수강이 가능한가요?',
      answer: '네, 가능합니다. 익스는 7세부터 성인까지 모든 연령대를 위한 맞춤형 커리큘럼을 제공합니다. 연령과 레벨에 따라 적합한 주제, 속도, 난이도로 수업이 진행됩니다. 1:1 수업의 장점이랄까요?'
    },
    {
      question: '영어를 완전히 처음 시작해도 수업을 따라갈 수 있나요?',
      answer: '물론입니다! 익스는 완전 초보자를 위한 기초 과정부터 시작합니다. 알파벳과 기본 인사말부터 차근차근 학습하며, 한국어 지원이 가능한 티아가 어려운 부분을 친절하게 설명해 드립니다.'
    }
  ]

  return (
    <section className="landing-section-spacing relative w-full bg-bg-blue">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="max-w-[1080px] mx-auto">
          {faqs.map((faq, index) => (
            <div key={index}>
              {index > 0 && <div className="w-full h-[1px] bg-gray-200 my-[30px] md:my-[40px] lg:my-[50px]" />}
              
              <div className="py-[2px]">
                <button
                  type="button"
                  className="block w-full cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className={`type-faq block text-center transition-all ${
                    openFaq === index ? 'text-[#3E86D9] font-bold' : 'text-black font-light'
                  }`}>
                    {faq.question}
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFaq === index ? 'max-h-[250px] md:max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="type-body-base text-gray-600 mt-6 md:mt-7 lg:mt-8 text-center max-w-[800px] mx-auto px-4 md:px-0 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
