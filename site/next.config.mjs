/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_SITE_PORT: process.env.SITE_PORT || "20132",
  },
};

export default nextConfig;
