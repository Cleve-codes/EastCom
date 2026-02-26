import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'africa.felicitysolar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'africa.felicitysolar.com',
        port: '',
        pathname: '/wp-content/**',
      },
    ],
  },
};

export default nextConfig;
