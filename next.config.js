/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: isProduction ? 'export' : undefined,
  images: {
    // For static export, images must be unoptimized
    unoptimized: true
  },
  reactStrictMode: true,
  trailingSlash: isProduction,
}

module.exports = nextConfig
