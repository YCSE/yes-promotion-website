/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    // For static export, images must be unoptimized
    unoptimized: true
  },
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = nextConfig