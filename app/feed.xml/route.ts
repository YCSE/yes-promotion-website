// Alternative RSS feed URL (feed.xml)
// Some RSS readers prefer feed.xml over rss.xml
export { GET } from '../rss.xml/route'

// output: 'export'에서 빌드 시 정적 파일로 생성되도록 명시 (Next 15부터 GET 핸들러 기본값이 dynamic)
export const dynamic = 'force-static'
