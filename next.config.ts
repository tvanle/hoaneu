import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.hoaneu.com" }],
        destination: "https://hoaneu.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    localPatterns: [
      { pathname: "/**" },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
