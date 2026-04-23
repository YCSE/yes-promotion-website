'use client'

import { getAssetPath } from '@/lib/utils';
import Link from 'next/link';

const imgApple = getAssetPath('70def9900c5cbdff7a5a56c4cc16b8ba61c7afe3.svg');
const imgGoogle = getAssetPath('e2db92e38f36839b53883c4e9edb8aa4098a30a5.svg');

const Footer = () => {
  return (
    <footer id="footer-section" className="landing-section-spacing bg-black">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-[40px] md:gap-[50px] lg:gap-[60px]">
        <div className="flex flex-col gap-[20px] md:gap-[25px] lg:gap-[30px] text-center lg:text-left">
          <h2 className="type-h2 text-white">
            실전 영어 감각,<br />
            익스에서 키워보세요!
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
            className="cta-pill-button cta-store-button cta-pill-button-dark group relative border-white text-white hover:bg-white hover:text-black transition-colors"
          >
            <img src={imgApple} alt="Apple" className="cta-pill-icon cta-pill-icon-apple group-hover:invert transition-all duration-300" />
            <span lang="en" className="font-en type-button-primary">App Store</span>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=kr.ycse"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-pill-button cta-store-button cta-pill-button-dark group relative border-white text-white hover:bg-white hover:text-black transition-colors"
          >
            <img src={imgGoogle} alt="Google" className="cta-pill-icon cta-pill-icon-google h-[18px] w-[16.2px] group-hover:invert transition-all duration-300" />
            <span lang="en" className="font-en type-button-primary">Google Play</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
