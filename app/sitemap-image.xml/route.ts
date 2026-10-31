import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/config'

// output: 'export'에서 빌드 시 정적 파일로 생성되도록 명시 (Next 15부터 GET 핸들러 기본값이 dynamic)
export const dynamic = 'force-static'

// 홈(/)이 실제로 렌더하는 이미지만 나열한다. 캡션은 랜딩 문구(원어민급 등)에 맞춘다.
// - 섹션 이미지는 ResponsiveAssetImage가 클라이언트에서 -1540.webp로 바꿔 보여 주므로 그 URL을 쓴다.
// - 제외: alt=""인 장식용 이모지(Section2), 작은 기능 아이콘(B*·C*), 모달을 열어야 보이는
//   TiaModal 이미지, 블로그 썸네일(각 글 페이지 소속), 홈에서 렌더되지 않는 Section4·ogimage·파비콘.
// 새 섹션 이미지를 추가하거나 바꾸면 이 목록도 함께 고친다.
type SitemapImage = { path: string; title: string; caption: string }

const HERO_CAPTION = '원어민급 선생님과 1:1로 영어 회화를 연습하는 익스 화상수업 화면'

const images: SitemapImage[] = [
  // Hero 캐러셀 (alt: 익스 1:1 화상수업 화면 N)
  ...Array.from({ length: 8 }, (_, i) => ({
    path: `/images/hero/hero-call${i + 1}-1540.webp`,
    title: `익스 1:1 화상수업 화면 ${i + 1}`,
    caption: HERO_CAPTION,
  })),
  // Section3 기능 카드
  {
    path: '/images/icon/card1-feature1-1540.webp',
    title: '검증된 원어민급 강사',
    caption: '가치관과 티칭 역량까지 꼼꼼히 검증한 익스의 원어민급 화상영어 선생님',
  },
  {
    path: '/images/icon/card1-feature2-1540.webp',
    title: '개별 맞춤 커리큘럼',
    caption: '내 실력에 맞춘 익스 개별 맞춤 영어 커리큘럼',
  },
  {
    path: '/images/icon/card1-feature3-1540.webp',
    title: '세계가 인정한 학습법',
    caption: 'GPA(성장 참여 접근법)와 OPOL(1인 1언어) 원칙을 적용한 익스 영어 학습법',
  },
  {
    path: '/images/icon/card1-feature4-1540.webp',
    title: '효율적인 시간 활용',
    caption: '틈새 시간만 활용해도 충분한 성과를 내는 익스 화상영어 수업',
  },
  // TiaSection
  {
    path: '/images/img/tia-1540.webp',
    title: 'AI 선생님 티아 대화 화면',
    caption: '수업 데이터와 피드백을 분석해 코칭하는 익스 AI 선생님 티아와의 영어 대화 화면',
  },
  // Section5 레벨테스트
  {
    path: '/images/img/video-call-1540.webp',
    title: '익스 레벨테스트 화상수업 화면',
    caption: '말하기 중심으로 진행되는 익스 레벨테스트 1:1 화상수업 화면',
  },
  // SiteHeader 로고
  {
    path: '/fav.webp',
    title: 'YES 화상영어 로고',
    caption: '익스(YES) 화상영어 로고',
  },
]

function generateImageSitemap(): string {

  // 모든 이미지가 같은 페이지(/)에 속하므로 <url> 하나에 <image:image>를 모은다
  // (이미지마다 <url>을 만들면 같은 <loc>가 중복된다)
  const imageEntries = images.map(image => `
    <image:image>
      <image:loc>${SITE_URL}${image.path}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>${imageEntries}
  </url>
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