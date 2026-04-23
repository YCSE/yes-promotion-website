const Section2 = () => {
  const speechBubbles = [
    { text: "인사만 잘 하고\n그다음은 눈빛으로 승부했다" },
    { text: "머릿속에선 완벽했는데\n입 밖으로는 한 마디도 안 나왔다" },
    { text: "나를 제외한 모든 사람이\n농담을 듣고 웃고 있었다" },
  ]

  return (
    <section className="landing-section-spacing relative w-full bg-white">
      <div className="page-shell">
        <div className="flex flex-col items-center mb-[30px] md:mb-[40px] lg:mb-[50px]">
          <h2 className="type-h2 text-center text-black">
            실전에서는 막막한 영어,<br />
            나만 그런가요?
          </h2>
          <p className="type-body-base text-primary text-center mt-[12px] md:mt-[16px] lg:mt-[20px]">
            문제는 실력이 아니라 ‘말하는 경험’이에요.<br />
            실전에서 바로 꺼내 쓰는 연습이 필요합니다.
          </p>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-6 w-full mx-auto">
          {speechBubbles.map((bubble, index) => (
            <div
              key={index}
              className="bg-white rounded-[10px] px-8 py-6 min-h-[150px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] transform hover:scale-105 transition-transform"
            >
              <p className="type-body-base text-black whitespace-pre-line text-center flex items-center justify-center h-full">
                {bubble.text}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          {speechBubbles.map((bubble, index) => (
            <div
              key={index}
              className="bg-white rounded-[10px] px-8 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transform hover:scale-105 transition-transform"
            >
              <p className="type-body-base text-black whitespace-pre-line text-center">
                {bubble.text}
              </p>
            </div>
          ))}
        </div>

        <div className="md:hidden flex flex-col gap-3">
          {speechBubbles.map((bubble, index) => (
            <div
              key={index}
              className="bg-white rounded-[10px] px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <p className="type-body-base text-black whitespace-pre-line text-center">
                {bubble.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section2
