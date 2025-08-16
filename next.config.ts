import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /*config options here https://ieqpsj.com.br/public/assets/images/ */

  /*images: {
    remotePatterns: [
      {
        hostname: 'ieqpsj.com.br',
      }
    ],
  },*/

};

module.exports = {
  images: {
    remotePatterns: [new URL('https://ieqpsj.com.br/public/assets/images/produtos/**')],
  },
}

export default nextConfig;
