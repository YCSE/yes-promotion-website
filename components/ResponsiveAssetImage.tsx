'use client'

import { useEffect, useState } from 'react'

type ResponsiveAssetImageProps = {
  high?: string
  medium?: string
  fallback: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  decoding?: 'async' | 'sync' | 'auto'
  draggable?: boolean
  ariaHidden?: boolean
}

function getCandidateOrder(high?: string, medium?: string, fallback?: string) {
  return [high, medium, fallback].filter((value): value is string => Boolean(value))
}

export default function ResponsiveAssetImage({
  high,
  medium,
  fallback,
  alt,
  className,
  loading = 'lazy',
  decoding = 'async',
  draggable = false,
  ariaHidden = false,
}: ResponsiveAssetImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState(fallback)

  useEffect(() => {
    let cancelled = false
    let probeImage: HTMLImageElement | null = null

    const tryLoad = (candidateIndex: number, candidates: string[]) => {
      if (candidateIndex >= candidates.length) return

      probeImage = new window.Image()
      probeImage.onload = () => {
        if (!cancelled) {
          setResolvedSrc(candidates[candidateIndex])
        }
      }
      probeImage.onerror = () => {
        if (!cancelled) {
          tryLoad(candidateIndex + 1, candidates)
        }
      }
      probeImage.src = candidates[candidateIndex]
    }

    const resolveSource = () => {
      const candidates = getCandidateOrder(high, medium, fallback)
      setResolvedSrc(fallback)
      tryLoad(0, candidates)
    }

    resolveSource()

    return () => {
      cancelled = true
      if (probeImage) {
        probeImage.onload = null
        probeImage.onerror = null
      }
    }
  }, [fallback, high, medium])

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      draggable={draggable}
      aria-hidden={ariaHidden}
    />
  )
}
