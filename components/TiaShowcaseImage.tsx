'use client'

import { getAssetPath } from '@/lib/utils'
import ResponsiveAssetImage from '@/components/ResponsiveAssetImage'

export default function TiaShowcaseImage() {
  return (
    <div className="relative inline-flex h-[500px] w-fit overflow-hidden rounded-[10px] bg-white md:h-[570px] lg:col-start-1 lg:row-start-2 lg:h-[632px]">
      <ResponsiveAssetImage
        high={getAssetPath('images/img/tia-1540.webp')}
        medium={getAssetPath('images/img/tia-1080.webp')}
        fallback={getAssetPath('images/img/tia.png')}
        alt="TIA chat interface"
        className="block h-full w-auto max-w-none rounded-[10px] object-contain object-top"
        decoding="async"
        draggable={false}
      />
    </div>
  )
}
