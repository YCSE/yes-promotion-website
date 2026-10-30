'use client'

import StoreButtons from '@/components/StoreButtons'

const Footer = () => {
  return (
    <footer id="footer-section" data-header-theme="dark" className="landing-section-spacing bg-black">
      <div className="page-shell flex flex-col items-center gap-[40px] lg:gap-[60px]">
        <div className="flex flex-col items-center gap-[22px] md:gap-[24px] lg:gap-[30px] text-center">
          <h2 className="type-h2 text-white">
            실전 영어 감각,<br />
            익스에서 키워보세요!
          </h2>

          <StoreButtons position="footer" />

          <p lang="en" className="type-body-support text-[#999999] tracking-[0.08em]">
            © 2026 YCSE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
