import createNextIntlPlugin from "next-intl/plugin";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const distDir = process.env.NEXT_DIST_DIR || ".next";
const projectRoot = dirname(fileURLToPath(import.meta.url));
const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:";
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob:",
  "connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https: wss:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

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
    // Migration SQL and compression rule/filter JSON files are read via fs at
    // runtime and are NOT always auto-traced by webpack/turbopack.
    "/*": [
      "./src/lib/db/migrations/**/*",
      "./src/mitm/server.cjs",
      "./open-sse/services/compression/engines/rtk/filters/**/*.json",
      "./open-sse/services/compression/rules/**/*.json",
    ],
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

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
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
      {
        source: "/v1beta/:path*",
        destination: "/api/v1beta/:path*",
      },
      {
        source: "/v1beta",
        destination: "/api/v1beta",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
