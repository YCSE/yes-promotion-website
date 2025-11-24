/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'yes-blue': '#4B52AE',
        'yes-navy': '#1A1F3A',
        'yes-gray': '#F8F9FA',
      },
      fontFamily: {
        'sans': ['"Asta Sans"', 'sans-serif'],
        'asta': ['"Asta Sans"', 'sans-serif'],
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'scroll-left': 'scroll-left 120s linear infinite',
        'scroll-right': 'scroll-right 120s linear infinite',
      },
      // Typography 커스터마이징
      typography: (theme) => ({
    DEFAULT: {
      css: {
        '--tw-prose-body': theme('colors.gray.700'),
        '--tw-prose-headings': theme('colors.gray.900'),
        '--tw-prose-links': theme('colors.yes-blue'),
        '--tw-prose-bold': theme('colors.gray.900'),
        '--tw-prose-counters': theme('colors.yes-blue'),
        '--tw-prose-bullets': theme('colors.yes-blue'),
        '--tw-prose-hr': theme('colors.gray.200'),
        '--tw-prose-quotes': theme('colors.gray.900'),
        '--tw-prose-quote-borders': theme('colors.yes-blue'),
        '--tw-prose-captions': theme('colors.gray.600'),
        '--tw-prose-code': theme('colors.yes-blue'),
        '--tw-prose-pre-code': theme('colors.gray.100'),
        '--tw-prose-pre-bg': theme('colors.gray.900'),
        '--tw-prose-th-borders': theme('colors.gray.300'),
        '--tw-prose-td-borders': theme('colors.gray.200'),

        // 링크 스타일링
        'a': {
          color: theme('colors.yes-blue'),
          textDecoration: 'none',
          fontWeight: '600',
          '&:hover': {
            textDecoration: 'underline',
          },
        },

        // 제목 스타일링
        'h1, h2, h3, h4, h5, h6': {
          fontWeight: '800',
          letterSpacing: '-0.02em',
        },

        'h1': {
          fontSize: '2.5rem',
          lineHeight: '1.2',
          marginTop: '0',
          marginBottom: '1.5rem',
        },

        'h2': {
          fontSize: '2rem',
          lineHeight: '1.3',
          marginTop: '2.5rem',
          marginBottom: '1rem',
          paddingBottom: '0.5rem',
          borderBottom: `2px solid ${theme('colors.yes-blue')}`,
        },

        'h3': {
          fontSize: '1.5rem',
          lineHeight: '1.4',
          marginTop: '2rem',
          marginBottom: '0.75rem',
          color: theme('colors.yes-blue'),
        },

        // 리스트 스타일링
        'ul > li::marker': {
          color: theme('colors.yes-blue'),
        },

        'ol > li::marker': {
          color: theme('colors.yes-blue'),
          fontWeight: '700',
        },

        // 코드 블록 스타일링
        'code': {
          color: theme('colors.yes-blue'),
          backgroundColor: theme('colors.gray.100'),
          padding: '0.2rem 0.4rem',
          borderRadius: '0.25rem',
          fontWeight: '600',
        },

        'code::before': {
          content: '""',
        },

        'code::after': {
          content: '""',
        },

        'pre': {
          backgroundColor: theme('colors.gray.900'),
          color: theme('colors.gray.100'),
          borderRadius: '0.5rem',
          padding: '1.25rem',
        },

        'pre code': {
          backgroundColor: 'transparent',
          color: 'inherit',
          padding: '0',
          fontWeight: '400',
        },

        // 인용구 스타일링
        'blockquote': {
          borderLeftColor: theme('colors.yes-blue'),
          borderLeftWidth: '4px',
          fontStyle: 'normal',
          color: theme('colors.gray.700'),
          backgroundColor: theme('colors.gray.50'),
          padding: '1rem 1.5rem',
          borderRadius: '0.25rem',
        },

        'blockquote p:first-of-type::before': {
          content: '""',
        },

        'blockquote p:last-of-type::after': {
          content: '""',
        },

        // 테이블 스타일링
        'thead': {
          borderBottomColor: theme('colors.yes-blue'),
          borderBottomWidth: '2px',
        },

        'thead th': {
          color: theme('colors.gray.900'),
          fontWeight: '700',
        },

        // 이미지 스타일링
        'img': {
          borderRadius: '0.5rem',
          margin: '2rem 0',
        },

        // 수평선 스타일링
        'hr': {
          borderColor: theme('colors.yes-blue'),
          borderTopWidth: '2px',
          margin: '3rem 0',
        },

        // 강조 텍스트
        'strong': {
          color: theme('colors.yes-blue'),
          fontWeight: '700',
        },
      },
    },
  }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}