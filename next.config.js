/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.gamebrain.co' },
      { protocol: 'https', hostname: '**.rawcdn.crafty.host' },
    ],
  },
};

module.exports = nextConfig;
