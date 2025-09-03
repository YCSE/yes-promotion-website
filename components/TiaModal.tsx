'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface TiaModalProps {
  isOpen: boolean
  onClose: () => void
}

const TiaModal = ({ isOpen, onClose }: TiaModalProps) => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Handle animation states
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

  // Close modal on ESC key press
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
      icon: '💬',
      title: '선톡 (Pre-lesson Message)',
      subtitle: '수업 10분 전, 완벽한 워밍업',
      description: '지난 수업에서 받은 피드백을 바탕으로 맞춤형 예습 메시지를 보냅니다. 연구에 따르면 언어 학습 전 워밍업은 집중력을 40% 향상시키고, 새로운 내용 습득 속도를 2배 빠르게 만듭니다.',
      highlight: '인지과학적 접근',
      details: [
        '개인별 실수 패턴 분석',
        '맞춤형 복습 포인트 제공',
        '수업 주제 미리보기',
        '동기부여 메시지'
      ]
    },
    {
      icon: '🧠',
      title: 'AI 피드백 분석 엔진',
      subtitle: '교사 피드백을 패턴화하는 정교한 AI',
      description: 'TIA는 단순한 챗봇이 아닙니다. 최신 Gemini 2.5 Flash 모델을 기반으로 교사의 피드백을 깊이 있게 분석하여 학생의 약점을 정확히 파악하고 맞춤형 학습 전략을 제시합니다.',
      highlight: '1M 토큰 컨텍스트',
      details: [
        '최대 20개 피드백 동시 분석',
        '문법, 어휘, 발음 패턴 인식',
        '장기 학습 궤적 추적',
        '실시간 개선 제안'
      ]
    },
    {
      icon: '🌏',
      title: '24/7 글로벌 학습 파트너',
      subtitle: '언제 어디서나 함께하는 AI 튜터',
      description: 'TIA는 한국 학생들을 위해 특별히 설계되었습니다. K-POP과 한국 문화를 이해하며, 필요시 한국어로 소통이 가능한 진정한 바이링구얼 AI 교사입니다.',
      highlight: '문화적 공감',
      details: [
        '한국어 ↔ 영어 즉시 전환',
        'K-POP 등 관심사 공유',
        '시차 없는 24시간 대화',
        '감정적 지원과 격려'
      ]
    },
    {
      icon: '📊',
      title: '학습 성과 가속화',
      subtitle: '검증된 학습 효과',
      description: '워밍업 활동은 학습자의 인지 능력을 활성화시켜 새로운 정보 습득을 4.5배 빠르게 만듭니다. TIA의 선톡 시스템은 이러한 과학적 원리를 완벽하게 구현합니다.',
      highlight: '과학적 검증',
      details: [
        '기억력 향상: +35%',
        '집중력 지속: 2배 증가',
        '자신감 상승: 67% 개선',
        '인지 유연성 강화'
      ]
    }
  ]

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Modal Content */}
      <div 
        className={`relative w-[90%] max-w-[1200px] max-h-[90vh] bg-white rounded-[30px] overflow-hidden transition-all duration-300 transform ${
          isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-10 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#0066FF] to-[#1A1F3A] text-white p-16">
            <div className="max-w-[800px] mx-auto text-center">
              <div className="text-[80px] mb-6">🤖</div>
              <h1 className="text-[50px] font-extrabold mb-4 tracking-[-1.5px]">
                TIA - Teaching Intelligence Assistant
              </h1>
              <p className="text-[20px] font-light leading-[32px] opacity-90">
                "AI Teacher"를 거꾸로 한 이름, TIA는 단순한 챗봇이 아닌<br/>
                정교하게 설계된 AI 영어 교육 에이전트입니다
              </p>
            </div>
          </div>

          {/* Main Features Grid */}
          <div className="p-16 bg-[#F8F9FA]">
            <h2 className="text-[40px] font-bold text-center mb-12 text-[#1A1F3A]">
              TIA가 특별한 이유
            </h2>
            
            <div className="grid grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-[20px] p-8 cursor-pointer transition-all ${
                    activeFeature === index 
                      ? 'shadow-2xl scale-[1.02] border-2 border-[#0066FF]' 
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-6">
                    <div className="text-[50px]">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="bg-[#0066FF] text-white text-[12px] font-bold px-3 py-1 rounded-full inline-block mb-3">
                        {feature.highlight}
                      </div>
                      <h3 className="text-[24px] font-bold text-[#1A1F3A] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[16px] font-medium text-[#0066FF] mb-4">
                        {feature.subtitle}
                      </p>
                      <p className="text-[16px] text-gray-700 leading-[26px] mb-6">
                        {feature.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="#0066FF">
                              <circle cx="8" cy="8" r="2"/>
                            </svg>
                            <span className="text-[14px] text-gray-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scientific Backing */}
            <div className="bg-white rounded-[20px] p-12">
              <h3 className="text-[32px] font-bold text-center text-[#1A1F3A] mb-8">
                과학적 근거: 워밍업의 중요성
              </h3>
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-[48px] font-extrabold text-[#0066FF] mb-2">4.5x</div>
                  <p className="text-[16px] text-gray-700">
                    워밍업 후 학습 속도 증가
                  </p>
                </div>
                <div>
                  <div className="text-[48px] font-extrabold text-[#0066FF] mb-2">40%</div>
                  <p className="text-[16px] text-gray-700">
                    집중력 향상 효과
                  </p>
                </div>
                <div>
                  <div className="text-[48px] font-extrabold text-[#0066FF] mb-2">67%</div>
                  <p className="text-[16px] text-gray-700">
                    학습 자신감 증가
                  </p>
                </div>
              </div>
              <p className="text-center text-[14px] text-gray-500 mt-6">
                * 2024년 Cambridge English, ResearchGate 연구 결과 기반
              </p>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <p className="text-[20px] text-gray-700 mb-6">
                TIA와 함께 영어 학습의 새로운 차원을 경험하세요
              </p>
              <button 
                onClick={handleClose}
                className="bg-[#0066FF] text-white px-12 py-4 rounded-full text-[18px] font-bold hover:bg-[#0052CC] transition-colors"
              >
                TIA 체험 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TiaModal