import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/mejormaestro/:path*",
        destination: "https://api.primepass.cl/api/mejormaestro/:path*",
      },
    ];
  },
};

export default nextConfig;
