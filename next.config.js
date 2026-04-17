/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // uncomment for static export build
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
