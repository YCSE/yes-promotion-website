import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ycse.github.io'),
  title: 'YES - 말하게 되는 영어, 진짜 시작',
  description: '실전에서 통하는 영어 회화, YES와 함께 시작하세요',
  icons: {
    icon: '/yes-promotion-website/fav.png',
    apple: '/yes-promotion-website/fav.png',
  },
  openGraph: {
    title: 'YES - 말하게 되는 영어, 진짜 시작',
    description: '실전에서 통하는 영어 회화, YES와 함께 시작하세요',
    images: ['/yes-promotion-website/images/thumbnail_PC.png'],
    siteName: 'YES Promotion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YES - 말하게 되는 영어, 진짜 시작',
    description: '실전에서 통하는 영어 회화, YES와 함께 시작하세요',
    images: ['/yes-promotion-website/images/thumbnail_PC.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}