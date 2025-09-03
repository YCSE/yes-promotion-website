import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YES - 말하게 되는 영어, 진짜 시작',
  description: '실전에서 통하는 영어 회화, YES와 함께 시작하세요',
  icons: {
    icon: '/fav.png',
    apple: '/fav.png',
  },
  openGraph: {
    title: 'YES - 말하게 되는 영어, 진짜 시작',
    description: '실전에서 통하는 영어 회화, YES와 함께 시작하세요',
    images: ['/images/thumbnail_PC.png'],
    siteName: 'YES Promotion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YES - 말하게 되는 영어, 진짜 시작',
    description: '실전에서 통하는 영어 회화, YES와 함께 시작하세요',
    images: ['/images/thumbnail_PC.png'],
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