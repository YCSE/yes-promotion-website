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
        // Refined Brand Colors
        'yes-blue': '#3E86D9', // Primary Brand Color
        'accent-blue': '#3E86D9', // Interactive elements, links
        'bg-blue': '#EFF4FA', // Soft blue section background
        'bg-gray': '#F6F6F6', // Bright neutral section background
        'bg-dark': '#222222', // Dark background
        'border-blue': '#D4E3F4', // Soft blue border/divider
        'border-gray2': '#666666', // CTA/button stroke on light backgrounds
        'text-primary': '#111111', // Main text
        'text-gray': '#666666', // Secondary gray text
        'text-identity-dark': '#5AA4F9', // Identity text on dark background

        // Semantic Colors for Typography (Slate scale for better readability)
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        'sans': ['"Outfit"', '"Inter"', '"Pretendard"', '"Noto Sans KR"', '"Apple SD Gothic Neo"', '"Noto Sans CJK KR"', 'sans-serif'],
        'heading': ['"Outfit"', '"Inter"', '"Pretendard"', '"Noto Sans KR"', '"Apple SD Gothic Neo"', '"Noto Sans CJK KR"', 'sans-serif'],
        'mono': ['"Outfit"', '"Inter"', '"Pretendard"', '"Noto Sans KR"', '"Apple SD Gothic Neo"', '"Noto Sans CJK KR"', 'sans-serif'],
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
      boxShadow: {
        'card': '2px 2px 10px rgba(0, 0, 0, 0.08)',
      },
      // Typography Customization
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '68ch', // Optimal line length for reading
            color: theme('colors.gray.700'),
            fontSize: '1.125rem', // 18px base size
            lineHeight: '1.8',

            // Headings
            'h1, h2, h3, h4': {
              color: theme('colors.gray.900'),
              fontFamily: theme('fontFamily.heading').join(', '),
              fontWeight: '800',
              letterSpacing: '-0.025em',
            },
            h1: {
              fontSize: '2.5rem',
              marginTop: '0',
              marginBottom: '2rem',
              lineHeight: '1.2',
            },
            h2: {
              fontSize: '2rem',
              marginTop: '3.5rem',
              marginBottom: '1.5rem',
              lineHeight: '1.3',
            },
            h3: {
              fontSize: '1.5rem',
              marginTop: '2.5rem',
              marginBottom: '1rem',
              color: theme('colors.yes-blue'),
            },

            // Links
            a: {
              color: theme('colors.yes-blue'),
              textDecoration: 'none',
              fontWeight: '600',
              borderBottom: `1px solid ${theme('colors.yes-blue')}`,
              transition: 'all 0.2s ease',
              '&:hover': {
                color: theme('colors.bg-dark'),
                borderBottomWidth: '2px',
              },
            },

            // Lists
            'ul > li': {
              paddingLeft: '0.5em',
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            'ul > li::marker': {
              color: theme('colors.yes-blue'),
            },

            // Blockquotes
            blockquote: {
              borderLeftColor: theme('colors.yes-blue'),
              borderLeftWidth: '4px',
              backgroundColor: theme('colors.gray.50'),
              padding: '1.5rem',
              fontStyle: 'italic',
              color: theme('colors.gray.800'),
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '2.5rem',
              marginBottom: '2.5rem',
              borderRadius: '0.5rem',
            },

            // Code
            code: {
              color: theme('colors.pink.600'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
              fontSize: '0.9em',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },

            pre: {
              backgroundColor: theme('colors.gray.900'),
              borderRadius: '0.75rem',
              padding: '1.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
            },

            // Images
            img: {
              borderRadius: '0.75rem',
              marginTop: '2.5rem',
              marginBottom: '2.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },

            // Horizontal Rule
            hr: {
              borderColor: theme('colors.gray.200'),
              marginTop: '3rem',
              marginBottom: '3rem',
            },
          },
        },
        // Responsive adjustments
        lg: {
          css: {
            fontSize: '1.125rem', // Maintain 18px on large screens
            h1: { fontSize: '3rem' },
            h2: { fontSize: '2.25rem' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
