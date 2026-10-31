import { APPSTORE_PROVIDER_TOKEN, type AppStore } from './analytics'

export const APP_STORE_URL = 'https://apps.apple.com/app/id6745255649'
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=kr.ycse'

export const DEFAULT_STORE_URLS: Record<AppStore, string> = {
  ios: APP_STORE_URL,
  android: GOOGLE_PLAY_URL,
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

// App Analytics campaign token(ct)은 최대 40자
const APP_STORE_CAMPAIGN_MAX_LENGTH = 40

// 코드 포인트 단위로 다뤄 이모지 등 서로게이트 쌍이 잘리지 않게 한다
const codePoints = (value: string) => Array.from(value)

// ct = <utm_campaign>_<utm_content>. 40자를 넘으면 광고 소재(content)가 통째로 잘려
// 변형별 구분이 사라지지 않도록, campaign이 길어도 content는 최소 절반(19자)까지 남긴다.
// 한쪽만 있으면 그 값만 쓴다.
export function buildAppStoreCampaignToken(campaign = '', content = ''): string {
  const c = codePoints(campaign)
  const t = codePoints(content)

  if (!c.length || !t.length) {
    return (c.length ? c : t).slice(0, APP_STORE_CAMPAIGN_MAX_LENGTH).join('')
  }

  const budget = APP_STORE_CAMPAIGN_MAX_LENGTH - 1 // '_' 구분자 몫
  if (c.length + t.length <= budget) return `${campaign}_${content}`

  const contentLength = Math.min(t.length, Math.max(Math.floor(budget / 2), budget - c.length))
  return `${c.slice(0, budget - contentLength).join('')}_${t.slice(0, contentLength).join('')}`
}

// 랜딩 URL의 UTM 값을 스토어 링크로 넘긴다. 값이 없거나 공백뿐인 키는 넣지 않는다.
// - Google Play: referrer 파라미터에 utm_* 쿼리스트링을 URL 인코딩해서 전달 (Install Referrer)
// - App Store: pt=<provider token>(설정된 경우), ct=<campaign>_<content>, mt=8 (App Analytics 캠페인 링크)
// URLSearchParams는 공백을 '+'로 직렬화하는데, 스토어/앱 쪽 파서가 '+'를 공백으로 복원한다는
// 보장이 없으므로 encodeURIComponent(공백 → %20)로 직접 인코딩한다.
export function buildStoreUrls(
  search: string,
  providerToken: string = APPSTORE_PROVIDER_TOKEN,
): Record<AppStore, string> {
  const query = new URLSearchParams(search)
  const utm: Partial<Record<(typeof UTM_KEYS)[number], string>> = {}
  for (const key of UTM_KEYS) {
    const value = query.get(key)?.trim()
    if (value) utm[key] = value
  }

  const referrer = UTM_KEYS.filter((key) => utm[key])
    .map((key) => `${key}=${encodeURIComponent(utm[key] as string)}`)
    .join('&')

  const googlePlay = referrer
    ? `${GOOGLE_PLAY_URL}&referrer=${encodeURIComponent(referrer)}`
    : GOOGLE_PLAY_URL

  let appStore = APP_STORE_URL
  const ct = buildAppStoreCampaignToken(utm.utm_campaign, utm.utm_content)
  if (ct) {
    const params = [
      ...(providerToken ? [`pt=${encodeURIComponent(providerToken)}`] : []),
      `ct=${encodeURIComponent(ct)}`,
      'mt=8',
    ]
    appStore += `?${params.join('&')}`
  }

  return {
    ios: appStore,
    android: googlePlay,
  }
}
