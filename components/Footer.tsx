import { getAssetPath } from '@/lib/utils';

const imgApple = getAssetPath('70def9900c5cbdff7a5a56c4cc16b8ba61c7afe3.svg');
const imgGoogle = getAssetPath('e2db92e38f36839b53883c4e9edb8aa4098a30a5.svg');

const Footer = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-[#4b52ae] text-white py-6 z-50">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <button className="text-[18px] font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-3 mx-auto">
            무료 레벨테스트 신청하기
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">GO</span>
          </button>
        </div>
      </div>
      
      <footer className="bg-black py-[120px] pb-[190px]">
        <div className="max-w-[1280px] mx-auto px-6 flex justify-center items-start gap-[60px]">
          <div className="flex flex-col gap-[30px]">
            <h3 className="text-[30px] font-bold text-white leading-[40px] tracking-[-0.9px]">
              실전 영어 감각,<br/>
              YES에서 키워보세요!
            </h3>
            <p className="text-[13px] text-[#999999] uppercase leading-[40px]">
              © 2025 YCSE. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-5">
            <a 
              href="https://apps.apple.com/app/id6745255649"
              target="_blank"
              rel="noopener noreferrer"
              className="relative border-2 border-white text-white px-8 py-[25px] rounded-[100px] flex items-center gap-2.5 hover:bg-white hover:text-black transition-colors w-[260px] justify-center"
            >
              <img src={imgApple} alt="Apple" className="w-[25px] h-[30px]" />
              <span className="text-[22px] font-medium">App Store</span>
            </a>
            
            <a 
              href="https://play.google.com/store/apps/details?id=kr.ycse"
              target="_blank"
              rel="noopener noreferrer"
              className="relative border-2 border-white text-white px-8 py-[25px] rounded-[100px] flex items-center gap-2.5 hover:bg-white hover:text-black transition-colors w-[260px] justify-center"
            >
              <img src={imgGoogle} alt="Google" className="w-[27px] h-[30px]" />
              <span className="text-[22px] font-medium">Google Play</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer