// 정식 사이트 origin (JSON-LD 등 절대 URL에 사용, 끝 슬래시 없음)
export const SITE_URL = 'https://yourenglishschool.co.kr'

export const config = {
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
}

export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${config.basePath}/${cleanPath}`
}