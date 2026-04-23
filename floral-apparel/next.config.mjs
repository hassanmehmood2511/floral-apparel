/**
 * Purpose: Next.js runtime configuration for images and app defaults.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
};

export default nextConfig;
