import createNextIntlPlugin from "next-intl/plugin";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const distDir = process.env.NEXT_DIST_DIR || ".next";
const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir,
  // Turbopack config: redirect native modules to stubs at build time
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      // Point mitm/manager to a stub during build (native child_process/fs can't be bundled)
      "@/mitm/manager": "./src/mitm/manager.stub.ts",
    },
  },
  output: "standalone",
  // OmniRoute is a proxy for AI APIs — request bodies routinely include
  // multi-MB payloads (vision models, image edits, base64-encoded files,
  // long chat histories with embedded images). Next.js's Server Action
  // handler intercepts POSTs with multipart/form-data or
  // x-www-form-urlencoded content-types and enforces a 1 MB cap that
  // surfaces as a 413 with a confusing "Server Actions" hint, even on
  // pure route handlers. 50 MB matches what most upstream LLM providers
  // accept for image-bearing requests; tune via env if a deployment needs
  // more.
  experimental: {
    serverActions: {
      bodySizeLimit: process.env.OMNIROUTE_SERVER_ACTIONS_BODY_LIMIT || "50mb",
    },
  },
  outputFileTracingRoot: projectRoot,
  outputFileTracingIncludes: {
    // Migration SQL files are read via fs.readFileSync at runtime and are NOT
    // auto-traced by webpack/turbopack — include them explicitly.
    "/*": ["./src/lib/db/migrations/**/*"],
  },
  outputFileTracingExcludes: {
    // Planning/task docs are not runtime assets and can break standalone copies
    // when broad fs/path tracing pulls the whole repository into the NFT graph.
    "/*": [
      "./.git/**/*",
      "./_tasks/**/*",
      "./_references/**/*",
      "./_ideia/**/*",
      "./_mono_repo/**/*",
      "./coverage/**/*",
      "./test-results/**/*",
      "./playwright-report/**/*",
      "./app.__qa_backup/**/*",
      "./tests/**/*",
      "./logs/**/*",
    ],
  },
  serverExternalPackages: [
    "pino",
    "pino-pretty",
    "thread-stream",
    "pino-abstract-transport",
    "better-sqlite3",
    "keytar",
    "wreq-js",
    "zod",
    "tls-client-node",
    "koffi",
    "tough-cookie",
    "@ngrok/ngrok",
    "child_process",
    "fs",
    "path",
    "os",
    "crypto",
    "net",
    "tls",
    "http",
    "https",
    "stream",
    "buffer",
    "util",
    "process",
  ],
  transpilePackages: ["@omniroute/open-sse", "@lobehub/icons"],
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.*"],
  typescript: {
    // TODO: Re-enable after fixing all sub-component useTranslations scope issues
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      // Webpack IgnorePlugin: skip thread-stream test files that contain
      // intentionally broken syntax/imports (they cause Turbopack build errors)
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /\/test\//,
          contextRegExp: /thread-stream/,
        })
      );

      // ── Turbopack / Next.js 16 module-hash patch (#394, #396, #398) ────────
      //
      // Next.js 16 (with or without Turbopack) compiles the instrumentation hook
      // into a separate chunk and emits hashed require() calls such as:
      //   require('better-sqlite3-90e2652d1716b047')
      //   require('zod-dcb22c6336e0bc69')
      //   require('pino-28069d5257187539')
      //
      // These hashed names don't exist in node_modules and cause a 500 at
      // startup on all npm global installs (issues #394, #396, #398).
      //
      // We use two strategies:
      //  1. Exact-name externals for all known server-side packages.
      //  2. Hash-strip catch-all: any require('<name>-<16hexchars>[/subpath]')
      //     strips the hash suffix and falls through to the real package name.
      //
      const HASH_PATTERN = /^(.+)-[0-9a-f]{16}(\/.*)?$/;

      const KNOWN_EXTERNALS = new Set([
        "better-sqlite3",
        "keytar",
        "@ngrok/ngrok",
        "wreq-js",
        "zod",
        "pino",
        "pino-pretty",
        "pino-abstract-transport",
        "child_process",
        "fs",
        "path",
        "os",
        "crypto",
        "net",
        "tls",
        "http",
        "https",
        "stream",
        "buffer",
        "util",
        "process",
      ]);

      const prev = config.externals ?? [];
      const prevArr = Array.isArray(prev) ? prev : [prev];
      config.externals = [
        ...prevArr,
        ({ request }, callback) => {
          // Case 1: Exact known package — treat as external
          if (KNOWN_EXTERNALS.has(request)) {
            return callback(null, `commonjs ${request}`);
          }
          // Case 2: Hash-suffixed name — strip hash, preserve subpath
          // e.g. "better-sqlite3-90e2652d1716b047" → "better-sqlite3"
          //      "zod-dcb22c6336e0bc69"            → "zod"
          //      "zod-dcb22c6336e0bc69/v3"         → "zod/v3"
          //      "zod-dcb22c6336e0bc69/v4-mini"    → "zod/v4-mini"
          const hashMatch = request?.match?.(HASH_PATTERN);
          if (hashMatch) {
            const resolved = hashMatch[2] ? `${hashMatch[1]}${hashMatch[2]}` : hashMatch[1];
            return callback(null, `commonjs ${resolved}`);
          }
          callback();
        },
      ];
    } else {
      // Ignore native Node.js modules in browser bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
        net: false,
        tls: false,
        crypto: false,
        process: false,
        os: false,
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
        source: "/responses/:path*",
        destination: "/api/v1/responses/:path*",
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

export default withNextIntl(nextConfig);
