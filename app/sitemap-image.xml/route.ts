import { NextResponse } from 'next/server'

const images = [
  {
    loc: 'https://yourenglishschool.co.kr/images/thumbnail_PC.png',
    title: 'YES 화상영어 메인 배너',
    caption: '말하게 되는 영어, 진짜 시작은 YES - 화상영어 플랫폼',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/section2/D1.png',
    title: '화상영어 수업 특징',
    caption: 'YES 화상영어만의 차별화된 학습 방법',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/section3/A1.png',
    title: '체계적인 커리큘럼',
    caption: '레벨별 맞춤 화상영어 커리큘럼',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/section3/A2.png',
    title: '전문 튜터진',
    caption: '검증된 원어민 화상영어 튜터',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/section3/A3.png',
    title: '실시간 피드백',
    caption: 'AI 기반 실시간 화상영어 피드백 시스템',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/section3/A5.png',
    title: '학습 관리 시스템',
    caption: '효율적인 화상영어 학습 관리',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/section3-2/list2-1.png',
    title: 'TIA 기능 1',
    caption: 'YES 화상영어 TIA 학습 시스템',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/section3-2/list2-2.png',
    title: 'TIA 기능 2',
    caption: '화상영어 AI 보조 학습',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/section3-2/list2-3.png',
    title: 'TIA 기능 3',
    caption: '맞춤형 화상영어 학습 분석',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/section4/section4.png',
    title: '화상영어 수강 후기',
    caption: 'YES 화상영어 수강생 후기',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/frame4/img%203.png',
    title: '화상영어 앱 화면',
    caption: 'YES 화상영어 모바일 앱',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/frame4/C1.png',
    title: '레벨 테스트',
    caption: '무료 화상영어 레벨 테스트',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/frame4/C2.png',
    title: '맞춤 커리큘럼',
    caption: '개인 맞춤형 화상영어 커리큘럼',
  },
  {
    loc: 'https://yourenglishschool.co.kr/images/frame4/C3.png',
    title: '학습 리포트',
    caption: '화상영어 학습 성과 분석',
  },
  {
    loc: 'https://yourenglishschool.co.kr/ogimage.jpg',
    title: 'YES 화상영어',
    caption: 'YES 화상영어 - 원어민과 1:1 화상영어 수업',
  },
  {
    loc: 'https://yourenglishschool.co.kr/fav.png',
    title: 'YES 화상영어 로고',
    caption: 'YES 화상영어 브랜드 로고',
  },
]

function generateImageSitemap(): string {
  const baseUrl = 'https://yourenglishschool.co.kr'
  
  const imageEntries = images.map(image => `
  <url>
    <loc>${baseUrl}/</loc>
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${imageEntries}
</urlset>`
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function GET() {
  try {
    const imageSitemap = generateImageSitemap()
    
    return new NextResponse(imageSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Error generating image sitemap:', error)
    return new NextResponse('Error generating image sitemap', { status: 500 })
  }
}