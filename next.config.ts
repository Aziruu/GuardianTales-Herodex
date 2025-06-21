import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Ganti hostname ini dengan yang baru
        hostname: 'static.wikia.nocookie.net',
        port: '',
        pathname: '/guardian-tales/images/**',
      },
    ],
  },
};

export default nextConfig;
