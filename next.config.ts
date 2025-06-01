import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  async redirects() {
    const redirects = [
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
    ];

    return redirects;
  },
};

export default nextConfig;
