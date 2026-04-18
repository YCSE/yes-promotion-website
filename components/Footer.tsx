'use client'

import { getAssetPath } from '@/lib/utils';
import Link from 'next/link';

const imgApple = getAssetPath('70def9900c5cbdff7a5a56c4cc16b8ba61c7afe3.svg');
const imgGoogle = getAssetPath('e2db92e38f36839b53883c4e9edb8aa4098a30a5.svg');

const Footer = () => {
  return (
    <footer id="footer-section" className="bg-black py-[60px] md:py-[90px] lg:py-[120px] pb-[120px] md:pb-[150px] lg:pb-[190px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-[40px] md:gap-[50px] lg:gap-[60px]">
        <div className="flex flex-col gap-[20px] md:gap-[25px] lg:gap-[30px] text-center lg:text-left">
          <h2 className="type-h2 text-white">
            실전 영어 감각,<br />
            YES에서 키워보세요!
          </h2>
          <p lang="en" className="type-body-support text-[#999999] uppercase tracking-[0.08em]">
            © 2025 YCSE. All rights reserved.
          </p>

          <div className="flex gap-4 justify-center lg:justify-start mt-4">
            <Link
              href="/"
              className="type-body-support text-white hover:text-[#3E86D9] transition-colors"
            >
              홈
            </Link>
            <span className="text-white/30">|</span>
            <Link
              href="/blog"
              className="type-body-support text-white hover:text-[#3E86D9] transition-colors"
            >
              블로그
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-5">
          <a
            href="https://apps.apple.com/app/id6745255649"
            target="_blank"
            rel="noopener noreferrer"
            className="relative border-2 border-white text-white px-6 md:px-7 lg:px-8 py-[18px] md:py-[22px] lg:py-[25px] rounded-[100px] flex items-center gap-2 md:gap-2.5 hover:bg-white hover:text-black transition-colors w-[220px] md:w-[240px] lg:w-[260px] justify-center"
          >
            <img src={imgApple} alt="Apple" className="w-[20px] h-[24px] md:w-[22px] md:h-[27px] lg:w-[25px] lg:h-[30px]" />
            <span lang="en" className="font-en type-button-primary">App Store</span>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=kr.ycse"
            target="_blank"
            rel="noopener noreferrer"
            className="relative border-2 border-white text-white px-6 md:px-7 lg:px-8 py-[18px] md:py-[22px] lg:py-[25px] rounded-[100px] flex items-center gap-2 md:gap-2.5 hover:bg-white hover:text-black transition-colors w-[220px] md:w-[240px] lg:w-[260px] justify-center"
          >
            <img src={imgGoogle} alt="Google" className="w-[22px] h-[24px] md:w-[24px] md:h-[27px] lg:w-[27px] lg:h-[30px]" />
            <span lang="en" className="font-en type-button-primary">Google Play</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
