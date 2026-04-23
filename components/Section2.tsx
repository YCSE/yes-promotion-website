'use client'

import { useEffect, useState } from 'react'
import { getAssetPath } from '@/lib/utils'

const speechBubbles = [
  {
    iconName: 'emoji-a1',
    align: 'left',
    text: '인사만 잘 하고\n그다음은 눈빛으로 승부했다',
  },
  {
    iconName: 'emoji-a2',
    align: 'right',
    text: '머릿속에선 완벽했는데\n입 밖으로는 한 마디도 안 나왔다',
  },
  {
    iconName: 'emoji-a3',
    align: 'left',
    text: '나를 제외한 모든 사람이\n농담을 듣고 박장대소하고 있었다',
  },
]

function Section2CardIcon({ iconName, floatIndex = 0 }: { iconName: string; floatIndex?: number }) {
  const fallbackPng = getAssetPath(`images/icon/${iconName}.png`)
  const sources = [
    getAssetPath(`images/icon/${iconName}-1540.webp`),
    getAssetPath(`images/icon/${iconName}-1080.webp`),
  ]

  const [resolvedSrc, setResolvedSrc] = useState(fallbackPng)

  useEffect(() => {
    let cancelled = false
    let probeImage: HTMLImageElement | null = null

    const tryLoad = (candidateIndex: number) => {
      if (candidateIndex >= sources.length) return

      probeImage = new window.Image()
      probeImage.onload = () => {
        if (cancelled) return
        setResolvedSrc(sources[candidateIndex])
      }
      probeImage.onerror = () => {
        if (cancelled) return
        tryLoad(candidateIndex + 1)
      }
      probeImage.src = sources[candidateIndex]
    }

    tryLoad(0)

    return () => {
      cancelled = true
      if (probeImage) {
        probeImage.onload = null
        probeImage.onerror = null
      }
    }
  }, [sources])

  return (
    <span
      className="section2-floating-icon inline-flex"
      style={{
        animationDelay: `${floatIndex * 0.45}s`,
        animationDuration: `${3.2 + floatIndex * 0.3}s`,
      }}
    >
      <img
        src={resolvedSrc}
        alt=""
        aria-hidden="true"
        className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
        decoding="async"
        draggable="false"
      />
    </span>
  )
}

const Section2 = () => {
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
              key={bubble.iconName}
              className="bg-white rounded-[10px] px-8 py-6 min-h-[150px] shadow-card transform hover:scale-105 transition-transform"
            >
              <div className="flex h-full flex-col items-center justify-center gap-[10px]">
                <Section2CardIcon iconName={bubble.iconName} floatIndex={index} />
                <p className="type-body-base text-black whitespace-pre-line text-center">
                  {bubble.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:grid lg:hidden grid-cols-3 gap-6 w-full mx-auto">
          {speechBubbles.map((bubble, index) => (
            <div
              key={bubble.iconName}
              className="bg-white rounded-[10px] px-8 py-6 shadow-card transform hover:scale-105 transition-transform"
            >
              <div className="flex h-full flex-col items-center justify-center gap-[10px]">
                <Section2CardIcon iconName={bubble.iconName} floatIndex={index} />
                <p className="type-body-base text-black whitespace-pre-line text-center">
                  {bubble.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden flex flex-col gap-5">
          {speechBubbles.map((bubble, index) => (
            <div
              key={bubble.iconName}
              className="bg-white rounded-[10px] px-4 py-6 shadow-card"
            >
              <div className="flex h-full w-full items-center justify-center">
                <div className={`flex items-center gap-4 ${bubble.align === 'right' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <Section2CardIcon iconName={bubble.iconName} floatIndex={index} />
                <div className="text-left">
                  <p className={`type-body-base text-black whitespace-pre-line ${bubble.align === 'right' ? 'text-right' : 'text-left'}`}>
                    {bubble.text}
                  </p>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section2
