const performanceStats = [
  { value: '94%', label: '학습 만족도' },
  { value: '3.2x', label: '학습 속도 향상' },
  { value: '89%', label: '말하기 자신감 증가' },
]

const ReviewIntroSection = () => {
  return (
    <section className="landing-section-spacing bg-white">
      <div className="page-shell text-center">
        <div className="flex flex-col items-center">
          <h2 className="type-h2 text-gray-900">
            티아로 달라진 학습 결과
          </h2>
          <p className="type-body-base mt-[12px] text-center text-primary md:mt-[16px] lg:mt-[20px]">
            학습 만족도부터 자신감까지, 눈에 보이는 변화가 시작됩니다.
            <br />
            이미 많은 사용자들이 그 차이를 경험하고 있습니다.
          </p>

          <div className="mt-[34px] w-full max-w-[clamp(260px,calc((100vw-40px)*0.8),360px)] overflow-hidden rounded-[10px] bg-bg-blue md:mt-[38px] md:max-w-[980px] lg:mt-[42px]">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {performanceStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`relative flex flex-col items-center px-5 md:px-6 md:py-[46px] ${
                    index === 0
                      ? 'pt-9 pb-[28px]'
                      : index === performanceStats.length - 1
                        ? 'pt-[28px] pb-9'
                        : 'py-[28px]'
                  }`}
                >
                  <div
                    className="review-intro-value font-en text-[52px] font-bold leading-none tracking-[-0.05em] text-text-primary md:text-[62px] lg:text-[70px]"
                    style={{ animationDelay: `${index * 110 + 70}ms` }}
                  >
                    {stat.value}
                  </div>
                  <p className="type-body-emphasis mt-2 md:mt-[10px] text-gray-900">
                    {stat.label}
                  </p>
                  {index < performanceStats.length - 1 && (
                    <>
                      <div className="absolute bottom-0 left-1/2 h-px w-[50px] -translate-x-1/2 bg-[#C6D6EE] md:hidden" />
                      <div className="absolute right-0 top-1/2 hidden h-[50px] w-px -translate-y-1/2 bg-[#C6D6EE] md:block" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="type-body-support mt-[34px] text-center text-text-gray md:mt-[38px] lg:mt-[42px]">
            * 2024년 익스 사용자 2,847명 대상 설문조사 결과
          </p>
        </div>
      </div>
    </section>
  )
}

export default ReviewIntroSection
