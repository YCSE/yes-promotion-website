'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

const BlogHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with Home Link */}
          <Link 
            href="/" 
            className="flex items-center group transition-all hover:opacity-80"
            aria-label="YES 화상영어 홈으로 이동"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src={getAssetPath('fav.webp')}
                alt="YES 화상영어 로고"
                width={48}
                height={48}
                className="w-full h-full object-contain rounded-lg"
                priority
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm md:text-base text-gray-600 hover:text-[#4B52AE] transition-colors font-medium"
            >
              홈
            </Link>
            <Link
              href="/blog"
              className="text-sm md:text-base text-[#4B52AE] font-medium"
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