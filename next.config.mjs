/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  output: "standalone",
  transpilePackages: ["@omniroute/open-sse"],
  allowedDevOrigins: ["192.168.*"],
  typescript: {
    // Migration Phase: ignore TS errors during build.
    // Remove after all 984 type errors are resolved.
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // NEXT_PUBLIC_CLOUD_URL is set in .env — do NOT hardcode here (it overrides .env)
  webpack: (config, { isServer }) => {
    // Ignore fs/path modules in browser bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/chat/completions",
        destination: "/api/v1/chat/completions",
      },
      {
        source: "/responses",
        destination: "/api/v1/responses",
      },
      {
        source: "/models",
        destination: "/api/v1/models",
      },
      {
        source: "/v1/v1/:path*",
        destination: "/api/v1/:path*",
      },
      {
        source: "/v1/v1",
        destination: "/api/v1",
      },
      {
        source: "/codex/:path*",
        destination: "/api/v1/responses",
      },
      {
        source: "/v1/:path*",
        destination: "/api/v1/:path*",
      },
      {
        source: "/v1",
        destination: "/api/v1",
      },
    ];
  },
};

export default nextConfig;
