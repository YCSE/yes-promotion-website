'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

interface TiaModalProps {
  isOpen: boolean
  onClose: () => void
}

const TiaModal = ({ isOpen, onClose }: TiaModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  const features = [
    {
      icon: getAssetPath('images/frame4/C2.webp'),
      title: '맞춤형 학습 코칭',
      description: '수업에서 받은 피드백을 기반으로 개인별 약점을 분석하고, 맞춤형 추가 학습 자료를 제공합니다.',
    },
    {
      icon: getAssetPath('images/frame4/C3.webp'),
      title: '실시간 대화 연습',
      description: '수업 시간 외에도 Tia와 자유롭게 영어 대화를 연습할 수 있습니다. 한국어 지원으로 막힘없이 학습하세요.',
    },
    {
      icon: getAssetPath('images/frame4/C1.webp'),
      title: '문장 분석 & 해설',
      description: '어려운 영어 문장을 선택하면 문법, 어휘, 대체 표현까지 상세하게 분석해드립니다.',
    }
  ]

  const howItWorks = [
    {
      number: '01',
      title: '수업 내용 자동 분석',
      description: 'YES 수업이 끝나면 Tia가 자동으로 수업 내용과 피드백을 분석합니다.'
    },
    {
      number: '02',
      title: '개인별 학습 자료 생성',
      description: '분석된 내용을 바탕으로 여러분의 약점을 보완할 맞춤형 학습 자료를 생성합니다.'
    },
    {
      number: '03',
      title: '지속적인 복습 관리',
      description: '학습한 내용을 잊지 않도록 주기적으로 복습 알림과 퀴즈를 제공합니다.'
    }
  ]

  const stats = [
    { value: '94%', label: '학습 만족도' },
    { value: '3.2x', label: '학습 속도 향상' },
    { value: '89%', label: '말하기 자신감 증가' }
  ]

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className={`relative bg-white rounded-[30px] w-[90vw] max-w-[1200px] max-h-[85vh] overflow-hidden transform transition-all duration-300 ${
          isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Glassmorphism */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white/30 hover:bg-white/90 z-10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[85vh] scroll-smooth">
          {/* Header Section */}
          <div className="relative text-white px-8 md:px-16 py-12 md:py-20 overflow-hidden">
            {/* Background Image */}
            <Image 
              src={getAssetPath('images/tia-hero-background-new.webp')}
              alt="AI Technology Background"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F3A]/85 to-[#4B52AE]/75"></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="max-w-[900px] mx-auto text-center">
              <h1 className="text-[36px] md:text-[50px] lg:text-[60px] font-bold leading-[44px] md:leading-[60px] lg:leading-[72px] tracking-[-1px] md:tracking-[-1.5px] lg:tracking-[-1.8px] mb-6">
                AI 영어 선생님 Tia
              </h1>
              <p className="text-[18px] md:text-[20px] lg:text-[24px] font-light leading-[28px] md:leading-[32px] lg:leading-[36px] tracking-[-0.54px] md:tracking-[-0.6px] lg:tracking-[-0.72px] text-white/90 max-w-[600px] mx-auto">
                YES 수업의 효과를 극대화하는<br/>
                개인 맞춤형 AI 영어 학습 파트너
              </p>
            </div>
            </div>
          </div>

          {/* Why Tia Section - 왜 Tia가 필요한가? */}
          <div className="px-8 md:px-16 py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-[900px] mx-auto">
              {/* 기존 화상영어의 한계 - 서술형 */}
              <div className="mb-12 md:mb-16">
                <h3 className="text-[22px] md:text-[26px] lg:text-[30px] font-bold text-[#1A1F3A] mb-6 tracking-[-0.66px] md:tracking-[-0.78px] lg:tracking-[-0.9px]">
                  다년간 화상영어 수업을 진행하며 저희는 고민에 빠졌습니다.
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px] mb-4">
                    많은 분들이 화상영어를 통해 영어 실력을 향상시키려 노력하지만, 실제로는 여러 한계에 부딪힙니다. 
                    가장 큰 문제는 <span className="font-medium text-gray-900">주 2-3회, 25분이라는 제한된 수업 시간</span>입니다. 
                    이는 언어 습득에 필요한 충분한 노출과 연습 시간을 제공하기 어렵고, 수업이 없는 날에는 영어 학습이 완전히 단절됩니다.
                  </p>
                  <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px] mb-4">
                    더 근본적인 문제는 화상영어의 <span className="font-medium text-gray-900">학습 영역의 불균형</span>입니다. 
                    영어는 Speaking, Listening, Reading, Writing의 네 영역이 균형 있게 발달해야 하는데, 
                    화상영어는 필연적으로 Speaking과 Listening에만 초점이 맞춰집니다. 
                    Reading과 Writing 능력이 뒷받침되지 않으면 표현의 깊이와 정확성에 한계가 생기게 됩니다.
                  </p>
                  <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px] mb-4">
                    또한 화상영어 수업의 특성상 <span className="font-medium text-gray-900">체계적인 문법과 어휘 학습 기회가 부족</span>할 수 밖에 없습니다.
                    다양하고 정확한 문장을 구사하려면 탄탄한 문법 기초와 풍부한 어휘력이 필수적인데, 
                    대화 위주의 수업에서는 이런 기초를 다지기 어렵습니다. 
                    결국 항상 비슷한 패턴의 간단한 문장만 반복하게 되고, 표현의 다양성이 제한됩니다.
                  </p>
                  <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px] mb-4">
                    이런 구조적 문제들로 인해 많은 학습자들이 <span className="font-medium text-gray-900">일정 수준에서 실력 정체</span>를 경험합니다. 
                    처음에는 빠르게 늘던 회화 실력이 어느 순간 제자리걸음을 하게 되고, 
                    아무리 수업을 받아도 더 이상 발전하지 않는 '고원 현상(plateau)'에 빠지게 됩니다. 
                    이는 개인의 노력 부족이 아니라 기존 화상영어 시스템의 근본적 한계 때문입니다.
                    화상영어 수업을 아무리 들어도 성적과 실력이 오르지 않는 이유가 여기에 있습니다.
                  </p>
                  <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px] mb-6">
                    마지막으로, 수업 중 받은 피드백을 <span className="font-medium text-gray-900">체계적으로 관리하고 복습할 시스템이 부재</span>합니다. 
                    선생님의 귀중한 조언과 교정 내용들이 수업이 끝나면 사라지고, 같은 실수를 반복하게 됩니다. 
                    이러한 한계들은 학습자의 시간과 비용 대비 효과를 떨어뜨리는 주요 원인이 되고 있습니다.
                  </p>
                  <p className="text-[15px] md:text-[17px] font-medium text-[#4B52AE] leading-[26px] md:leading-[30px] bg-gradient-to-r from-[#4B52AE]/5 to-transparent rounded-[12px] p-4">
                    이 모든 문제를 해결하기 위해 우리는 Tia를 설계했습니다. 
                    언어 학습의 말하기, 듣기, 읽기, 쓰기 4가지 영역을 균형 있게 발달시키고, 체계적인 문법과 어휘 학습을 지원하며, 
                    개인별 맞춤형 학습 경로를 제공하여 실력 정체를 돌파할 수 있도록 돕습니다.
                  </p>
                </div>
              </div>

              {/* 언어학 이론 기반 설계 - 서술형 */}
              <div className="mb-12 md:mb-16">
                <h3 className="text-[22px] md:text-[26px] lg:text-[30px] font-bold text-black mb-6 tracking-[-0.66px] md:tracking-[-0.78px] lg:tracking-[-0.9px]">
                  세계적 언어학 연구가 증명한 학습 원리
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px] mb-6">
                    Tia는 오직 영어교육만을 위해 정교하게 설계한 AI 입니다. <span className="font-medium text-[#4B52AE]">수십 년간 검증된 언어습득 이론</span>을 
                    최신 AI 기술로 구현한 과학적 학습 도구입니다.
                  </p>
                  
                  <div className="bg-gradient-to-r from-[#4B52AE]/5 to-transparent rounded-[16px] p-5 md:p-6 mb-6">
                    <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px]">
                      <span className="font-bold text-[#4B52AE]">Stephen Krashen의 이해가능한 입력 이론(i+1)</span>은 
                      언어 학습의 핵심 원리를 제시합니다. 학습자의 현재 수준(i)보다 약간 높은 수준(+1)의 입력을 받을 때 
                      가장 효과적인 학습이 일어난다는 것입니다. 너무 쉬우면 지루하고, 너무 어려우면 좌절하게 됩니다. 
                      <span className="font-medium text-[#4B52AE]">Tia는 AI 분석을 통해 각 학습자에게 정확히 i+1 수준의 콘텐츠를 실시간으로 제공</span>합니다.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#868BC7]/5 to-transparent rounded-[16px] p-5 md:p-6 mb-6">
                    <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px]">
                      <span className="font-bold text-[#4B52AE]">Merrill Swain의 출력 가설</span>은 
                      단순히 듣고 이해하는 것만으로는 부족하다고 지적합니다. 직접 말하고 쓰는 과정에서 
                      자신의 부족한 점을 인식하고, 가설을 세우고 검증하며, 언어 구조를 내재화합니다. 
                      <span className="font-medium text-[#4B52AE]">Tia는 24시간 대화 파트너가 되어 충분한 아웃풋 기회를 제공하고, 
                      즉각적인 피드백으로 가설 검증을 돕습니다</span>.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#4B52AE]/5 to-transparent rounded-[16px] p-5 md:p-6 mb-6">
                    <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px]">
                      <span className="font-bold text-[#4B52AE]">Michael Long의 상호작용 가설</span>은 
                      의미 협상(meaning negotiation) 과정의 중요성을 강조합니다. 대화 중 이해하지 못한 부분을 
                      명확히 하고, 다시 표현하고, 확인하는 과정에서 언어 습득이 가속화됩니다. 
                      <span className="font-medium text-[#4B52AE]">Tia는 실시간 대화를 통해 자연스러운 의미 협상을 유도하고, 
                      이해하지 못한 부분을 다양한 방식으로 재설명합니다</span>.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#868BC7]/5 to-transparent rounded-[16px] p-5 md:p-6">
                    <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px]">
                      마지막으로 <span className="font-bold text-[#4B52AE]">정의적 여과 가설(Affective Filter)</span>은 
                      감정 상태가 학습에 미치는 영향을 설명합니다. 불안, 자신감 부족, 동기 결여 등의 부정적 감정은 
                      '정의적 여과'를 높여 언어 입력을 차단합니다. 
                      <span className="font-medium text-[#4B52AE]">Tia와의 대화는 실수를 두려워할 필요가 없는 안전한 환경을 제공해 
                      정의적 여과를 낮추고 학습 효율을 극대화합니다</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* AI 개인맞춤 학습의 효과 - 서술형 + 통계 */}
              <div>
                <h3 className="text-[22px] md:text-[26px] lg:text-[30px] font-bold text-[#1A1F3A] mb-6 tracking-[-0.66px] md:tracking-[-0.78px] lg:tracking-[-0.9px]">
                  2025년, AI 교육의 혁신적 성과
                </h3>
                <div className="prose prose-lg max-w-none mb-8">
                  <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px] mb-4">
                    2024년은 AI 교육 기술이 본격적으로 검증받은 해입니다. 
                    <span className="font-medium text-gray-900">전 세계 818건의 연구 중 엄격한 기준을 통과한 85건의 연구</span>가 
                    AI 기반 개인화 학습의 효과를 과학적으로 입증했습니다.
                  </p>
                  <p className="text-[15px] md:text-[17px] font-light text-gray-700 leading-[26px] md:leading-[30px] mb-6">
                    특히 주목할 점은 <span className="font-medium text-gray-900">적응형 학습 기술(Adaptive Learning Technology)</span>의 성과입니다. 
                    학습자 개개인의 수준과 진도를 실시간으로 분석하고 맞춤형 콘텐츠를 제공하는 ALT를 활용한 학습자들은 
                    전통적 방식 대비 <span className="font-bold text-[#4B52AE]">3.2배 빠른 학습 속도</span>를 보였습니다. 
                    또한 연구진들은 효과적인 학습을 위해서는 제공되는 콘텐츠의 <span className="font-medium text-gray-900">95-98%를 이해할 수 있는 수준</span>이 
                    최적이라는 것을 밝혀냈는데, 이는 Krashen의 i+1 이론을 뒷받침하는 중요한 발견입니다.
                  </p>
                </div>
                
                {/* 통계 시각화 */}
                <div className="bg-gradient-to-br from-[#1A1F3A] to-[#4B52AE] rounded-[24px] p-8 md:p-10 text-white">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-[36px] md:text-[42px] font-extrabold mb-1">3.2배</div>
                      <p className="text-[12px] md:text-[14px] font-light text-white/90">학습 속도 향상</p>
                    </div>
                    <div className="text-center">
                      <div className="text-[36px] md:text-[42px] font-extrabold mb-1">85건</div>
                      <p className="text-[12px] md:text-[14px] font-light text-white/90">검증된 연구</p>
                    </div>
                    <div className="text-center">
                      <div className="text-[36px] md:text-[42px] font-extrabold mb-1">98%</div>
                      <p className="text-[12px] md:text-[14px] font-light text-white/90">최적 이해도</p>
                    </div>
                    <div className="text-center">
                      <div className="text-[36px] md:text-[42px] font-extrabold mb-1">24/7</div>
                      <p className="text-[12px] md:text-[14px] font-light text-white/90">상시 학습</p>
                    </div>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-[11px] md:text-[12px] font-light text-white/70 text-center">
                      * Frontiers in Education, MDPI Electronics 등 2024년 주요 학술지 발표 연구 종합
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Features */}
          <div className="px-8 md:px-16 py-12 md:py-16 bg-white">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-center text-black mb-4 tracking-[-0.8px] md:tracking-[-1px] lg:tracking-[-1.2px]">
                Tia와 함께라면
              </h2>
              <p className="text-[16px] md:text-[18px] font-light text-center text-gray-600 mb-12 md:mb-16 tracking-[-0.48px] md:tracking-[-0.54px]">
                수업 시간 이외에도 지속적인 영어 학습이 가능합니다
              </p>

              <div className="space-y-6 md:space-y-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-white rounded-[20px] p-6 md:p-8 border border-gray-100 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                      <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex-shrink-0">
                        <Image 
                          src={feature.icon}
                          alt={feature.title}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[22px] md:text-[26px] lg:text-[30px] font-bold text-black mb-3 tracking-[-0.66px] md:tracking-[-0.78px] lg:tracking-[-0.9px]">
                          {feature.title}
                        </h3>
                        <p className="text-[16px] md:text-[18px] font-light text-gray-700 leading-[26px] md:leading-[28px] tracking-[-0.48px] md:tracking-[-0.54px]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="px-8 md:px-16 py-12 md:py-16 bg-[#F8F9FA]">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-center text-black mb-12 md:mb-16 tracking-[-0.8px] md:tracking-[-1px] lg:tracking-[-1.2px]">
                이렇게 도와드려요
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {howItWorks.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-[#4B52AE] text-white rounded-full mb-4 md:mb-6">
                      <span className="text-[24px] md:text-[32px] font-bold">{step.number}</span>
                    </div>
                    <h3 className="text-[20px] md:text-[24px] font-bold text-black mb-3 tracking-[-0.6px] md:tracking-[-0.72px]">
                      {step.title}
                    </h3>
                    <p className="text-[14px] md:text-[16px] font-light text-gray-600 leading-[22px] md:leading-[24px] tracking-[-0.42px] md:tracking-[-0.48px]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Explanation Feature */}
          <div className="px-8 md:px-16 py-12 md:py-16 bg-white">
            <div className="max-w-[1000px] mx-auto">
              <div className="bg-gradient-to-br from-[#4B52AE]/10 to-[#868BC7]/10 rounded-[30px] p-8 md:p-12">
                <h2 className="text-[24px] md:text-[30px] lg:text-[36px] font-bold text-black mb-8 tracking-[-0.72px] md:tracking-[-0.9px] lg:tracking-[-1px]">
                  문장 분석 기능 예시
                </h2>
                
                {/* Example Sentence */}
                <div className="bg-white rounded-[20px] p-6 mb-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                  <p className="text-[18px] md:text-[20px] font-medium text-black mb-2">
                    "I've been studying English for years, but I still struggle with speaking fluently."
                  </p>
                  <p className="text-[16px] md:text-[18px] font-light text-gray-600 italic">
                    "수년간 영어를 공부해왔지만, 여전히 유창하게 말하는 것이 어렵습니다."
                  </p>
                </div>

                {/* Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white rounded-[16px] p-4 md:p-6">
                    <h4 className="text-[18px] md:text-[20px] font-bold text-[#4B52AE] mb-3">📚 문법 포인트</h4>
                    <p className="text-[14px] md:text-[16px] font-light text-gray-700 leading-[22px] md:leading-[24px]">
                      현재완료진행형 (have been + ~ing)을 사용해 과거부터 현재까지 계속되는 행동을 표현했습니다.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-[16px] p-4 md:p-6">
                    <h4 className="text-[18px] md:text-[20px] font-bold text-[#4B52AE] mb-3">💡 핵심 표현</h4>
                    <p className="text-[14px] md:text-[16px] font-light text-gray-700 leading-[22px] md:leading-[24px]">
                      "struggle with ~" : ~하는 데 어려움을 겪다<br/>
                      "fluently" : 유창하게, 막힘없이
                    </p>
                  </div>

                  <div className="bg-white rounded-[16px] p-4 md:p-6">
                    <h4 className="text-[18px] md:text-[20px] font-bold text-[#4B52AE] mb-3">🔄 비슷한 표현</h4>
                    <p className="text-[14px] md:text-[16px] font-light text-gray-700 leading-[22px] md:leading-[24px]">
                      "I find it difficult to speak English fluently"<br/>
                      "Speaking English fluently is still challenging for me"
                    </p>
                  </div>

                  <div className="bg-white rounded-[16px] p-4 md:p-6">
                    <h4 className="text-[18px] md:text-[20px] font-bold text-[#4B52AE] mb-3">✅ 연습 팁</h4>
                    <p className="text-[14px] md:text-[16px] font-light text-gray-700 leading-[22px] md:leading-[24px]">
                      이 패턴으로 다른 문장도 만들어보세요:<br/>
                      "I've been working here for..." 등
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="px-8 md:px-16 py-12 md:py-16 bg-gradient-to-r from-[#1A1F3A] to-[#4B52AE] text-white">
            <div className="max-w-[800px] mx-auto">
              <h2 className="text-[28px] md:text-[36px] font-bold text-center mb-10 md:mb-12 tracking-[-0.8px] md:tracking-[-1px]">
                Tia 사용자들의 성과
              </h2>
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-[36px] md:text-[48px] lg:text-[56px] font-extrabold mb-2">{stat.value}</div>
                    <p className="text-[14px] md:text-[16px] font-light text-white/90">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-[12px] md:text-[14px] font-light text-white/70 mt-8">
                * 2024년 YES 사용자 2,847명 대상 설문조사 결과
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="px-8 md:px-16 py-10 md:py-12 bg-white text-center border-t border-gray-100">
            <h3 className="text-[24px] md:text-[30px] font-bold text-black mb-4 tracking-[-0.72px] md:tracking-[-0.9px]">
              지금 바로 Tia를 만나보세요
            </h3>
            <p className="text-[16px] md:text-[18px] font-light text-gray-600 mb-8 tracking-[-0.48px] md:tracking-[-0.54px]">
              누구나 Tia의 모든 기능을 무료로 이용하실 수 있습니다
            </p>
            <button 
              onClick={handleClose}
              className="bg-[#4B52AE] text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-[16px] md:text-[18px] font-bold hover:bg-[#3A4199] transition-colors shadow-[0_8px_24px_rgba(75,82,174,0.3)]"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TiaModal