'use client'

import { useState, useEffect } from 'react'

interface TiaModalProps {
  isOpen: boolean
  onClose: () => void
}

const TiaModal = ({ isOpen, onClose }: TiaModalProps) => {
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
      title: '선톡 (Pre-lesson Talk)',
      subtitle: '수업 10분 전, 완벽한 워밍업',
      description: 'TIA가 오늘의 수업 주제와 관련된 맞춤형 워밍업 대화를 제공합니다. 수업 전 미리 영어 모드로 전환하여 학습 효율을 극대화하세요.',
      benefits: [
        '맞춤형 워밍업 질문',
        '오늘의 핵심 표현 미리보기',
        '자신감 있는 수업 시작',
        '학습 효과 4.5배 증가'
      ]
    },
    {
      icon: '📝',
      title: '후톡 (Post-lesson Review)',
      subtitle: '수업 후 복습, 실력 완성의 핵심',
      description: '수업에서 배운 내용을 TIA와 함께 체계적으로 복습합니다. 선생님의 피드백을 바탕으로 개인 맞춤형 복습 자료를 제공합니다.',
      benefits: [
        '수업 내용 자동 정리',
        '틀린 표현 교정 연습',
        '추가 예문 제공',
        '다음 수업 준비 가이드'
      ]
    },
    {
      icon: '🔍',
      title: '해설보기',
      subtitle: '영어 문장의 완벽한 이해',
      description: '어려운 영어 문장도 TIA의 상세한 해설로 쉽게 이해할 수 있습니다. 문법, 어휘, 대체 표현까지 한 번에 학습하세요.',
      benefits: [
        '문법 구조 상세 설명',
        '핵심 어휘 사전식 정리',
        '상황별 대체 표현 제시',
        '실전 활용 예문'
      ]
    }
  ]

  const explanationFeatures = {
    translation: {
      title: '한국어 번역',
      icon: '🌐',
      description: '정확하고 자연스러운 한국어 번역을 제공합니다.'
    },
    grammar: {
      title: '문법 설명',
      icon: '📚',
      description: '문장 구조와 문법 포인트를 친근한 어투로 설명합니다.',
      example: '"이 문장은 현재완료를 사용했어요. 과거부터 지금까지 계속되는 상황을 표현할 때 쓰죠."'
    },
    vocabulary: {
      title: '핵심 어휘',
      icon: '📖',
      description: '문장의 핵심 단어를 사전식으로 정리하여 제공합니다.',
      examples: [
        { term: 'accomplish', definition: '[동사] 성취하다, 달성하다 (목표나 과제를)' },
        { term: 'significant', definition: '[형용사] 중요한, 의미 있는' }
      ]
    },
    alternatives: {
      title: '대체 표현',
      icon: '💡',
      description: '같은 의미를 다르게 표현하는 방법을 제시합니다.',
      examples: [
        { expression: 'Could you help me?', context: '정중한 요청 (일반적)' },
        { expression: 'Would you mind helping me?', context: '더 정중한 요청 (포멀한 상황)' }
      ]
    }
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" />
      
      {/* Modal Content */}
      <div 
        className={`relative bg-white rounded-[30px] w-[90vw] max-w-[1000px] max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
          isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white z-10 shadow-lg transition-all"
        >
          <span className="text-2xl leading-none text-gray-700">&times;</span>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-br from-yes-blue via-purple-600 to-yes-blue text-white p-12 text-center">
            <div className="text-[80px] mb-4">🤖</div>
            <h1 className="text-[45px] font-extrabold mb-4 tracking-[-1.35px]">
              TIA와 함께하는 영어 학습
            </h1>
            <p className="text-[20px] font-light leading-[32px] opacity-95 max-w-[600px] mx-auto">
              AI 영어 선생님 TIA가 여러분의 영어 실력 향상을 도와드립니다
            </p>
          </div>

          {/* Main Features Section */}
          <div className="p-10 bg-white">
            <h2 className="text-[36px] font-bold text-center text-gray-900 mb-10">
              TIA의 주요 기능
            </h2>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-gray-50 to-gray-50/50 rounded-[25px] p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex gap-8">
                    <div className="text-[56px] flex-shrink-0">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-[28px] font-bold text-gray-900">
                          {feature.title}
                        </h3>
                        <span className="text-[18px] font-light text-yes-blue">
                          {feature.subtitle}
                        </span>
                      </div>
                      <p className="text-[17px] font-light text-gray-700 leading-[28px] mb-5">
                        {feature.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {feature.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white/80 rounded-lg px-4 py-2">
                            <span className="text-yes-blue text-[20px]">✓</span>
                            <span className="text-[15px] font-light text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-10"></div>

          {/* Explanation Feature Detail */}
          <div className="p-10 bg-gradient-to-b from-white to-blue-50/30">
            <div className="max-w-[900px] mx-auto">
              <div className="text-center mb-10">
                <span className="text-[64px]">🔍</span>
                <h2 className="text-[36px] font-bold text-gray-900 mt-4 mb-3">
                  해설보기 기능 상세
                </h2>
                <p className="text-[18px] font-light text-gray-600">
                  영어 문장을 완벽하게 이해할 수 있도록 AI 기반 상세 해설을 제공합니다
                </p>
              </div>

              {/* How it works */}
              <div className="bg-white rounded-[20px] p-8 mb-8 shadow-lg">
                <h3 className="text-[24px] font-bold text-gray-900 mb-6">📋 이렇게 작동합니다</h3>
                <div className="space-y-4">
                  {[
                    '수업 중 또는 수업 후 이해가 어려운 영어 문장을 선택합니다',
                    'TIA가 AI 기술로 문장을 즉시 분석하고 캐시에 저장합니다',
                    '문법, 어휘, 번역, 대체 표현을 포함한 상세한 해설을 제공합니다',
                    '학습 패턴을 분석하여 맞춤형 복습 자료를 생성합니다'
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-yes-blue text-white rounded-full flex items-center justify-center text-[15px] font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-[16px] font-light text-gray-700 leading-[26px]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Translation */}
                <div className="bg-white rounded-[18px] p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[40px]">{explanationFeatures.translation.icon}</span>
                    <h4 className="text-[22px] font-bold text-gray-900">
                      {explanationFeatures.translation.title}
                    </h4>
                  </div>
                  <p className="text-[15px] font-light text-gray-600 leading-[24px]">
                    {explanationFeatures.translation.description}
                  </p>
                </div>

                {/* Grammar */}
                <div className="bg-white rounded-[18px] p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[40px]">{explanationFeatures.grammar.icon}</span>
                    <h4 className="text-[22px] font-bold text-gray-900">
                      {explanationFeatures.grammar.title}
                    </h4>
                  </div>
                  <p className="text-[15px] font-light text-gray-600 leading-[24px] mb-3">
                    {explanationFeatures.grammar.description}
                  </p>
                  <p className="text-[14px] font-light text-yes-blue italic bg-blue-50 rounded-lg p-3">
                    {explanationFeatures.grammar.example}
                  </p>
                </div>

                {/* Vocabulary */}
                <div className="bg-white rounded-[18px] p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[40px]">{explanationFeatures.vocabulary.icon}</span>
                    <h4 className="text-[22px] font-bold text-gray-900">
                      {explanationFeatures.vocabulary.title}
                    </h4>
                  </div>
                  <p className="text-[15px] font-light text-gray-600 leading-[24px] mb-4">
                    {explanationFeatures.vocabulary.description}
                  </p>
                  <div className="space-y-2 bg-gray-50 rounded-lg p-3">
                    {explanationFeatures.vocabulary.examples.map((ex, idx) => (
                      <div key={idx} className="text-[14px]">
                        <span className="font-semibold text-gray-900">{ex.term}:</span>
                        <span className="font-light text-gray-600 ml-2">{ex.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alternatives */}
                <div className="bg-white rounded-[18px] p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[40px]">{explanationFeatures.alternatives.icon}</span>
                    <h4 className="text-[22px] font-bold text-gray-900">
                      {explanationFeatures.alternatives.title}
                    </h4>
                  </div>
                  <p className="text-[15px] font-light text-gray-600 leading-[24px] mb-4">
                    {explanationFeatures.alternatives.description}
                  </p>
                  <div className="space-y-3 bg-gray-50 rounded-lg p-3">
                    {explanationFeatures.alternatives.examples.map((ex, idx) => (
                      <div key={idx} className="text-[14px]">
                        <p className="font-medium text-gray-900">"{ex.expression}"</p>
                        <p className="font-light text-yes-blue ml-3">→ {ex.context}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Features */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-[20px] p-8">
                <h3 className="text-[24px] font-bold text-gray-900 mb-6 text-center">
                  🚀 기술적 특징
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center bg-white/70 rounded-lg p-4">
                    <div className="text-[40px] mb-3">⚡</div>
                    <h4 className="text-[18px] font-bold text-gray-900 mb-2">즉시 응답</h4>
                    <p className="text-[14px] font-light text-gray-600 leading-[22px]">
                      LRU 캐시 시스템으로<br/>빠른 응답 제공
                    </p>
                  </div>
                  <div className="text-center bg-white/70 rounded-lg p-4">
                    <div className="text-[40px] mb-3">🎯</div>
                    <h4 className="text-[18px] font-bold text-gray-900 mb-2">맞춤형 설명</h4>
                    <p className="text-[14px] font-light text-gray-600 leading-[22px]">
                      학습자 수준에 맞는<br/>AI 기반 설명 제공
                    </p>
                  </div>
                  <div className="text-center bg-white/70 rounded-lg p-4">
                    <div className="text-[40px] mb-3">📊</div>
                    <h4 className="text-[18px] font-bold text-gray-900 mb-2">학습 데이터</h4>
                    <p className="text-[14px] font-light text-gray-600 leading-[22px]">
                      학습 패턴 분석으로<br/>효율적인 복습 지원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="p-10 bg-gradient-to-b from-blue-50/30 to-white">
            <div className="max-w-[700px] mx-auto">
              <h3 className="text-[32px] font-bold text-center text-gray-900 mb-8">
                TIA와 함께한 학습 효과
              </h3>
              <div className="grid grid-cols-3 gap-8 mb-6">
                <div className="text-center">
                  <div className="text-[48px] font-extrabold text-yes-blue mb-2">87%</div>
                  <p className="text-[16px] font-light text-gray-700">
                    말하기 자신감 향상
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-[48px] font-extrabold text-yes-blue mb-2">3.5x</div>
                  <p className="text-[16px] font-light text-gray-700">
                    학습 속도 증가
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-[48px] font-extrabold text-yes-blue mb-2">92%</div>
                  <p className="text-[16px] font-light text-gray-700">
                    수업 만족도
                  </p>
                </div>
              </div>
              <p className="text-center text-[14px] font-light text-gray-500">
                * 2024년 YES 사용자 3,000명 대상 설문 결과
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-8 bg-gradient-to-r from-yes-blue to-purple-600 text-white text-center">
            <h3 className="text-[28px] font-bold mb-4">
              지금 바로 TIA와 함께 영어 학습을 시작하세요
            </h3>
            <p className="text-[18px] font-light mb-8 opacity-95">
              무료 체험으로 TIA의 강력한 학습 지원을 경험해보세요
            </p>
            <button 
              onClick={handleClose}
              className="bg-white text-yes-blue px-10 py-4 rounded-full text-[18px] font-bold hover:scale-105 transition-transform shadow-lg"
            >
              무료 체험 신청하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TiaModal