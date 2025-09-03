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
        'yes-blue': '#0066FF',
        'yes-navy': '#1A1F3A',
        'yes-gray': '#F8F9FA',
      },
      fontFamily: {
        'sans': ['"Asta Sans"', 'sans-serif'],
        'asta': ['"Asta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}