import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const Section2 = () => {
  const speechBubbles = [
    { text: "질문은 알아들었는데\n뭐라고 대답해야 할지 모르겠다", top: 15, left: 159 },
    { text: "인사만 잘 하고\n그다음은 눈빛으로 승부했다", top: 145, left: 345 },
    { text: "머릿속에선 완벽했는데\n입 밖으로는 한 마디도 안 나왔다", top: 275, left: 570 },
    { text: "나를 제외한 모든 사람이\n농담을 듣고 웃고 있었다", top: 75, left: 665 },
    { text: "실수할까 봐 걱정돼서\n대화가 끝나기만을 기다렸다", top: 234, left: 25 },
    { text: "발음이 틀릴까 봐\n아는 단어도 일부러 안 썼다", top: 364, left: 250 },
  ]

  const mobileSpeechBubbles = [
    { text: "질문은 알아들었는데\n뭐라고 대답해야 할지 모르겠다" },
    { text: "인사만 잘 하고\n그다음은 눈빛으로 승부했다" },
    { text: "머릿속에선 완벽했는데\n입 밖으로는 한 마디도 안 나왔다" },
    { text: "나를 제외한 모든 사람이\n농담을 듣고 웃고 있었다" },
    { text: "실수할까 봐 걱정돼서\n대화가 끝나기만을 기다렸다" },
    { text: "발음이 틀릴까 봐\n아는 단어도 일부러 안 썼다" },
  ]

  return (
    <section className="relative w-full py-[80px] md:py-[150px] lg:py-[200px] bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-[50px] md:mb-[85px]">
          <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[130px] lg:h-[130px] mb-[20px] md:mb-[30px] relative flex items-center justify-center">
            <Image 
              src={getAssetPath('images/section2/D1.png')} 
              alt="Question icon" 
              width={130} 
              height={130}
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-[28px] md:text-[40px] lg:text-[50px] font-extrabold leading-[36px] md:leading-[50px] lg:leading-[60px] text-center text-black tracking-[-0.8px] md:tracking-[-1.2px] lg:tracking-[-1.5px]">
            실전에서는 막막한 영어,<br/>
            나만 그런가요?
          </h2>
        </div>
        
        {/* Desktop version - hidden on mobile */}
        <div className="hidden lg:block relative h-[539px] w-full max-w-[1030px] mx-auto">
          {speechBubbles.map((bubble, index) => (
            <div
              key={index}
              className="absolute bg-white rounded-[20px] px-8 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transform hover:scale-105 transition-transform"
              style={{
                top: `${bubble.top}px`,
                left: `${bubble.left}px`,
                width: '340px',
                height: '150px',
              }}
            >
              <p className="text-[18px] leading-[28px] text-gray-700 font-light whitespace-pre-line text-center flex items-center justify-center h-full tracking-[-0.54px]">
                {bubble.text}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet version - grid layout */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {mobileSpeechBubbles.map((bubble, index) => (
            <div
              key={index}
              className="bg-white rounded-[20px] px-6 py-5 md:px-8 md:py-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transform hover:scale-105 transition-transform"
            >
              <p className="text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-gray-700 font-light whitespace-pre-line text-center tracking-[-0.48px] md:tracking-[-0.54px]">
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