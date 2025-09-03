/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/yes-promotion-website' : '',
  assetPrefix: isProd ? '/yes-promotion-website/' : '/',
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = nextConfig