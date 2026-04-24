'use client'

import { useEffect, useRef, useState } from 'react'
import { getAssetPath } from '@/lib/utils'

const features = [
  {
    imageSources: [
      getAssetPath('images/icon/card1-feature1-1540.webp'),
      getAssetPath('images/icon/card1-feature1-1080.webp'),
      getAssetPath('images/icon/card1-feature1.png'),
    ],
    title: '검증된 원어민급 강사',
    subtitle: '믿을 수 있는 진짜 원어민급 선생님만',
    description:
      '매칭될 선생님에 대한 걱정은 이제 그만.\n익스는 선생님의 가치관과 티칭 역량까지 꼼꼼히 검증합니다.',
  },
  {
    imageSources: [
      getAssetPath('images/icon/card1-feature2-1540.webp'),
      getAssetPath('images/icon/card1-feature2-1080.webp'),
      getAssetPath('images/icon/card1-feature2.png'),
    ],
    title: '개별 맞춤 커리큘럼',
    subtitle: '나에게 딱 맞는 영어 로드맵',
    description:
      '모두에게 똑같은 수업은 없습니다.\n내 실력에 맞춘 커리큘럼으로 빠르게 성장할 수 있습니다.',
  },
  {
    imageSources: [
      getAssetPath('images/icon/card1-feature3-1540.webp'),
      getAssetPath('images/icon/card1-feature3-1080.webp'),
      getAssetPath('images/icon/card1-feature3.png'),
    ],
    title: '세계가 인정한 학습법',
    subtitle: '과학적으로 검증된 언어 습득 이론',
    description:
      'GPA(성장 참여 접근법)와 OPOL(1인 1언어) 원칙을 적용하여\n체계적이고 효과적인 실력 향상을 보장합니다.',
  },
  {
    imageSources: [
      getAssetPath('images/icon/card1-feature4-1540.webp'),
      getAssetPath('images/icon/card1-feature4-1080.webp'),
      getAssetPath('images/icon/card1-feature4.png'),
    ],
    title: '효율적인 시간 활용',
    subtitle: '틈새 시간만 활용해도 충분한 성과를',
    description:
      '잠깐의 투자로도 충분한 학습 효과를 누릴 수 있어요.\n효율적인 수업으로 시간을 최대한 활용할 수 있도록 도와드립니다.',
  },
]

const FeatureCardImage = ({ sources, alt }: { sources: string[]; alt: string }) => {
  const fallbackSource = sources[sources.length - 1]
  const [resolvedSource, setResolvedSource] = useState(fallbackSource)

  useEffect(() => {
    let isCancelled = false

    setResolvedSource(fallbackSource)

    const loadSource = (index: number) => {
      if (index >= sources.length) {
        return
      }

      const candidate = sources[index]
      const image = new window.Image()

      image.onload = () => {
        if (!isCancelled) {
          setResolvedSource(candidate)
        }
      }

      image.onerror = () => {
        if (!isCancelled) {
          loadSource(index + 1)
        }
      }

      image.src = candidate
    }

    loadSource(0)

    return () => {
      isCancelled = true
    }
  }, [fallbackSource, sources])

  return (
    <div className="relative aspect-[5/2] w-full overflow-hidden">
      <img
        src={resolvedSource}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable="false"
      />
    </div>
  )
}

type DragState = {
  pointerId: number
  startX: number
  startScrollLeft: number
  lastX: number
  lastTimestamp: number
  velocity: number
}

const Section3 = () => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<DragState | null>(null)
  const frameRef = useRef<number | null>(null)
  const targetScrollLeftRef = useRef<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const flushScroll = () => {
    if (frameRef.current !== null) return

    frameRef.current = window.requestAnimationFrame(() => {
      const track = trackRef.current
      if (track && targetScrollLeftRef.current !== null) {
        track.scrollLeft = targetScrollLeftRef.current
      }
      frameRef.current = null
    })
  }

  const snapToNearestCard = (momentum = 0) => {
    const track = trackRef.current
    if (!track) return

    const cards = Array.from(track.children) as HTMLElement[]
    if (cards.length === 0) return

    const projectedLeft = track.scrollLeft - momentum
    const maxScrollLeft = track.scrollWidth - track.clientWidth
    const snapOffset = cards[0]?.offsetLeft ?? 0
    const getSnapLeft = (card: HTMLElement) => Math.min(card.offsetLeft - snapOffset, maxScrollLeft)
    const nearest = cards.reduce((closest, card) => {
      const candidateDistance = Math.abs(getSnapLeft(card) - projectedLeft)
      const closestDistance = Math.abs(getSnapLeft(closest) - projectedLeft)
      return candidateDistance < closestDistance ? card : closest
    }, cards[0])

    track.scrollTo({
      left: getSnapLeft(nearest),
      behavior: 'smooth',
    })
  }

  const stopDragging = (pointerId?: number, shouldSnap = true) => {
    const track = trackRef.current
    const dragState = dragStateRef.current

    if (track && dragState && pointerId !== undefined && track.hasPointerCapture(pointerId)) {
      track.releasePointerCapture(pointerId)
    }

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    targetScrollLeftRef.current = null
    dragStateRef.current = null
    setIsDragging(false)

    if (shouldSnap && track && dragState) {
      snapToNearestCard(dragState.velocity * 180)
    }
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || event.button !== 0) return

    const track = trackRef.current
    if (!track) return

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      lastX: event.clientX,
      lastTimestamp: event.timeStamp,
      velocity: 0,
    }

    track.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    const dragState = dragStateRef.current

    if (!track || !dragState || dragState.pointerId !== event.pointerId) return

    const deltaX = event.clientX - dragState.startX
    const deltaTime = Math.max(event.timeStamp - dragState.lastTimestamp, 1)
    dragState.velocity = (event.clientX - dragState.lastX) / deltaTime
    dragState.lastX = event.clientX
    dragState.lastTimestamp = event.timeStamp
    targetScrollLeftRef.current = dragState.startScrollLeft - deltaX
    flushScroll()
    event.preventDefault()
  }

  return (
    <section className="landing-section-spacing relative w-full bg-bg-dark text-white">
      <div className="page-shell">
        <div className="mb-[30px] flex flex-col items-center md:mb-[40px] lg:mb-[50px]">
          <h2 className="type-h2 text-center text-white">
            교과서 밖에서 통하는 영어,
            <br />
            <span className="font-ko">익스</span>로 시작하세요!
          </h2>
          <p className="type-body-base mt-[12px] text-center text-white/80 md:mt-[16px] lg:mt-[20px]">
            이번에도 흐지부지될까 걱정하지 않아도 돼요.
            <br />
            익스는 당신만을 위한 로드맵으로 함께하니까요.
          </p>
        </div>

        <div className="section3-carousel-bleed">
          <div
            ref={trackRef}
            className={`section3-carousel-track no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible pb-4 md:gap-6 md:pb-5 lg:gap-8 ${
              isDragging ? 'section3-carousel-track-dragging' : ''
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={(event) => stopDragging(event.pointerId)}
            onPointerCancel={(event) => stopDragging(event.pointerId, false)}
            onLostPointerCapture={() => stopDragging(undefined, false)}
          >
            {features.map((feature) => (
              <article
                key={feature.title}
                className="section3-carousel-card snap-start shrink-0 overflow-hidden rounded-[10px] bg-white shadow-card"
              >
                <div className="flex flex-col">
                  <FeatureCardImage sources={feature.imageSources} alt={feature.title} />

                  <div className="p-6 md:p-8 lg:p-10">
                    <h6 className="type-h5 mb-2 text-yes-blue md:mb-[9px] lg:mb-[11px]">
                      {feature.title}
                    </h6>
                    <h4 className="type-h3 mb-[10px] text-black md:mb-[13px] lg:mb-[15px]">
                      {feature.subtitle}
                    </h4>
                    <p className="type-body-base whitespace-pre-line text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section3
