import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here https://ieqpsj.com.br/public/assets/images/ */
};

module.exports = {
  images: {
    remotePatterns: [new URL('https://ieqpsj.com.br/public/assets/images/**')],
  },
}

export default nextConfig;
