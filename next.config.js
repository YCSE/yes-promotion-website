/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/yes-promotion-website',
  assetPrefix: '/yes-promotion-website/',
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = nextConfig