import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Error Number */}
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[180px] font-extrabold text-[#4B52AE] leading-none">
            404
          </h1>
        </div>
        
        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-lg text-gray-600">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#4B52AE] rounded-[100px] hover:bg-[#3A4199] transition-colors duration-300"
          >
            홈으로 돌아가기
          </Link>
          <Link 
            href="/blog/" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[#4B52AE] border-2 border-[#4B52AE] rounded-[100px] hover:bg-[#4B52AE] hover:text-white transition-colors duration-300"
          >
            블로그 둘러보기
          </Link>
        </div>
        
        {/* Helpful Links */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">도움이 필요하신가요?</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link 
              href="/#features" 
              className="text-[#4B52AE] hover:underline"
            >
              YES 화상영어 특징
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/#level-test" 
              className="text-[#4B52AE] hover:underline"
            >
              레벨테스트
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/#faq" 
              className="text-[#4B52AE] hover:underline"
            >
              자주 묻는 질문
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: '404 - 페이지를 찾을 수 없습니다 | YES 화상영어',
  description: '요청하신 페이지를 찾을 수 없습니다. YES 화상영어 홈페이지로 돌아가거나 다른 페이지를 탐색해보세요.',
  robots: {
    index: false,
    follow: false
  }
}