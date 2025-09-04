'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const Section5 = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0) // Default first item open

  const features = [
    {
      icon: getAssetPath('images/frame4/C1.webp'),
      title: '현재 영어 레벨 정확 진단',
      description: '문법, 어휘 등으로 영역을 세분화하여\n구체적으로 진단합니다'
    },
    {
      icon: getAssetPath('images/frame4/C2.webp'),
      title: '맞춤형 학습 방향 제시',
      description: '나에게 딱 맞는 학습 전략과 수업을 추천해\n막막한 영어 공부의 길을 열어줍니다'
    },
    {
      icon: getAssetPath('images/frame4/C3.webp'),
      title: 'AI 기반 회화 습관 분석',
      description: '대화한 내용 분석해서\n나도 몰랐던 습관을 발견할 수 있어요'
    }
  ]

  const faqs = [
    {
      question: '레벨 테스트는 어떻게 진행되나요?',
      answer: '레벨 테스트는 말하기 중심으로 간편하게 진행됩니다. 전문 선생님의 수업 이후 AI Tia가 수업을 분석해 학생 수준에 정확히 맞는 조언을 제공합니다.\n\n결과를 바탕으로 최적의 수업 방향도 안내해 드려요.'
    },
    {
      question: 'Tia가 제공하는 피드백은 정확한가요? 어떤 기준으로 분석하나요?',
      answer: 'Tia는 최신 AI 언어 모델에 영어선생님의 페르소나를 학습시킨 AI입니다. 수업 중 선생님이 남긴 피드백을 패턴화 해서 학습하여, 학생이 자주 실수하는 부분을 정확히 분석하고 영어학습 방향을 제시합니다.'
    },
    {
      question: '어린이부터 성인까지 모두 수강이 가능한가요?',
      answer: '네, 가능합니다. YES는 7세부터 성인까지 모든 연령대를 위한 맞춤형 커리큘럼을 제공합니다. 연령과 레벨에 따라 적합한 주제, 속도, 난이도로 수업이 진행됩니다. 1:1 수업의 장점이랄까요?'
    },
    {
      question: '영어를 완전히 처음 시작해도 수업을 따라갈 수 있나요?',
      answer: '물론입니다! YES는 완전 초보자를 위한 기초 과정부터 시작합니다. 알파벳과 기본 인사말부터 차근차근 학습하며, 한국어 지원이 가능한 Tia가 어려운 부분을 친절하게 설명해 드립니다.'
    }
  ]

  return (
    <section className="relative w-full bg-white py-[80px] md:py-[150px] lg:py-[200px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Title */}
        <h2 className="text-[28px] md:text-[40px] lg:text-[50px] font-bold leading-[36px] md:leading-[50px] lg:leading-[60px] text-center mb-[50px] md:mb-[80px] lg:mb-[100px] text-black tracking-[-0.8px] md:tracking-[-1.2px] lg:tracking-[-1.5px]">
          지금 레벨테스트를 받고<br/>
          무료 수업을 들어보세요
        </h2>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-[50px] md:gap-[70px] lg:gap-[100px] mb-[50px] md:mb-[80px] lg:mb-[100px] items-center justify-center">
          {/* Video Call UI - img 3.png */}
          <div className="relative w-[250px] h-[500px] md:w-[280px] md:h-[560px] lg:w-[300px] lg:h-[607px]">
            <Image 
              src={getAssetPath('images/frame4/img 3.webp')}
              alt="Video Call Interface"
              width={300}
              height={607}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Features */}
          <div className="flex flex-col gap-[40px] md:gap-[60px] lg:gap-[75px]">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 md:gap-5 lg:gap-6 items-start">
                <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] flex items-center justify-center flex-shrink-0">
                  <Image 
                    src={feature.icon}
                    alt={feature.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="max-w-[300px]">
                  <h3 className="text-[18px] md:text-[20px] lg:text-[22px] font-bold mb-4 md:mb-5 lg:mb-6 text-black tracking-[-0.54px] md:tracking-[-0.6px] lg:tracking-[-0.66px]">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] lg:text-[16px] font-light text-gray-600 whitespace-pre-line leading-[20px] md:leading-[22px] lg:leading-[24px] tracking-[-0.42px] md:tracking-[-0.45px] lg:tracking-[-0.48px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section - Exact Figma Design */}
        <div className="max-w-[1080px] mx-auto mt-[50px] md:mt-[80px] lg:mt-[100px]">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="cursor-pointer"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              {index > 0 && <div className="w-full h-[1px] bg-gray-200 my-[30px] md:my-[40px] lg:my-[50px]" />}
              
              <div className="py-[2px]">
                <h4 className={`text-[16px] md:text-[17px] lg:text-[18px] text-center tracking-[-0.48px] md:tracking-[-0.51px] lg:tracking-[-0.54px] transition-all ${
                  openFaq === index ? 'text-[#4B52AE] font-bold' : 'text-black font-light'
                }`}>
                  {faq.question}
                </h4>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFaq === index ? 'max-h-[250px] md:max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-[14px] md:text-[15px] lg:text-[16px] font-light text-gray-600 mt-6 md:mt-7 lg:mt-8 text-center max-w-[800px] mx-auto leading-[1.6em] tracking-[-0.42px] md:tracking-[-0.45px] lg:tracking-[-0.48px] px-4 md:px-0">
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

export default Section5