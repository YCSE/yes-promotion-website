'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const BlogHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
      <div className="page-shell">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with Home Link */}
          <Link
            href="/"
            className="flex items-center group transition-all hover:opacity-80"
            aria-label="YES 화상영어 홈으로 이동"
          >
            <div className="relative h-10 w-10">
              <Image
                src={getAssetPath('fav.webp')}
                alt="YES 화상영어 로고"
                width={48}
                height={48}
                className="w-full h-full object-contain rounded-[10px]"
                priority
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm md:text-base text-gray-600 hover:text-[#3E86D9] transition-colors font-medium"
            >
              홈
            </Link>
            <Link
              href="/blog"
              className="text-sm md:text-base text-[#3E86D9] font-medium"
            >
              블로그
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default BlogHeader
