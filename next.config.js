/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d42zd71vraxqs.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "storage.pilput.dev",
      }
    ],
  },
};

module.exports = nextConfig;
