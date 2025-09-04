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
      icon: getAssetPath('images/frame4/C2.png'),
      title: '맞춤형 학습 코칭',
      description: '수업에서 받은 피드백을 기반으로 개인별 약점을 분석하고, 맞춤형 추가 학습 자료를 제공합니다.',
    },
    {
      icon: getAssetPath('images/frame4/C3.png'),
      title: '실시간 대화 연습',
      description: '수업 시간 외에도 Tia와 자유롭게 영어 대화를 연습할 수 있습니다. 한국어 지원으로 막힘없이 학습하세요.',
    },
    {
      icon: getAssetPath('images/frame4/C1.png'),
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
              src={getAssetPath('images/tia-hero-background-new.png')}
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
              수업료 외 추가 비용 없이 모든 기능을 무료로 이용하실 수 있습니다
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