import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const distDir = process.env.NEXT_DIST_DIR || ".build/next";
const projectRoot = dirname(fileURLToPath(import.meta.url));
const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:";
// Build the static part of the connect-src directive once at config load.
// ws:/wss: are listed as bare schemes (CSP allows any host under a scheme token),
// but the WebSocket dashboard hook also opens sockets to <window.location.host>
// on arbitrary hostnames (LAN, Tailscale 100.64.0.0/10, public domains, ...).
// We extend the per-response header in `headers()` below with the request's own
// host so a Next.js process serving multiple hostnames still emits a CSP that
// matches the page that loaded it. http:/https: are kept broad so the OpenAI-
// compatible /v1 proxy, image fetches, and other upstream calls work.
const CONNECT_SRC_BASE = [
  "'self'",
  "http://localhost:*",
  "http://127.0.0.1:*",
  "ws://localhost:*",
  "ws://127.0.0.1:*",
  "https:",
  "wss:",
].join(" ");
// Replacement marker inside `contentSecurityPolicy` — we always have
// `connect-src 'self' …` as the start of the directive, so we substitute on
// that exact prefix and never on a substring of another directive.
const CONNECT_SRC_MARKER = "connect-src 'self'";
const CONNECT_SRC_REPLACEMENT_PREFIX = `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*`;

// Returns a CSP-safe origin token ("scheme://host[:port]") from a Host header
// value, or null when the header is missing or carries anything that isn't a
// plain host[:port] (defensive against header injection — we only accept a
// narrow charset and never accept a full URL, path, or directive separator).
// The Host header may include a comma-separated list when the request went
// through multiple proxies; we only use the first segment.
function originTokenFromHostHeader(hostHeader, protocol) {
  if (!hostHeader || typeof hostHeader !== "string") return null;
  const firstSegment = hostHeader.split(",")[0].trim();
  if (!firstSegment) return null;
  // Host tokens: alphanumerics, dot, dash, underscore, IPv6 brackets+colons,
  // and a single optional :port suffix.
  if (!/^[A-Za-z0-9._[\]:-]+$/.test(firstSegment)) return null;
  const inferredScheme = protocol === "https:" || protocol === "wss:" ? "https" : "http";
  return `${inferredScheme}://${firstSegment}`;
}

// Augments the static `connect-src` directive with the request's own HTTP
// and WS origins. This is the targeted relaxation needed so the dashboard's
// live WebSocket (`useLiveDashboard` opens ws://<window.location.host>:20129)
// is permitted by CSP when the user accesses OmniRoute from a non-localhost
// host (LAN IP, Tailscale CGNAT 100.64.0.0/10, public DNS, ...). The injected
// tokens are derived solely from the Host header, which is set by the reverse
// proxy / Next.js server — never from a client-controlled header — so this
// cannot be abused by a remote attacker to widen CSP for their own origin.
function appendOwnOriginToCsp(staticCsp, hostHeader, protocol) {
  const ownOrigin = originTokenFromHostHeader(hostHeader, protocol);
  if (!ownOrigin) return staticCsp;
  // Mirror the same host over ws:/wss: so a same-origin WS upgrade is also
  // covered. http://host stays http; https://host translates to wss://host.
  const wsScheme = protocol === "https:" || protocol === "wss:" ? "wss" : "ws";
  const ownWsOrigin = ownOrigin.replace(/^https?:/, `${wsScheme}:`);
  if (!staticCsp.includes(CONNECT_SRC_MARKER)) return staticCsp;
  return staticCsp.replace(
    CONNECT_SRC_MARKER,
    `${CONNECT_SRC_REPLACEMENT_PREFIX} ${ownOrigin} ${ownWsOrigin}`
  );
}

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
  `connect-src ${CONNECT_SRC_BASE}`,
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

function isNextIntlExtractorDynamicImportWarning(warning) {
  const message = typeof warning === "string" ? warning : warning?.message || "";
  const resource = warning?.module?.resource || warning?.file || "";
  const target = "next-intl/dist/esm/production/extractor/format/index.js";
  return (
    resource.includes(target) &&
    (message.includes("import(t)") || message.includes("dependency is an expression"))
  );
}

// OMNIROUTE_BUILD_PROFILE=minimal physically removes four optional privileged
// modules (MITM cert install, Zed keychain import, Cloud Sync, 9router
// installer) from the built bundle by aliasing them to feature-disabled stubs.
// The resulting artifact is intended to be published as `omniroute-secure`
// for security-sensitive environments. See docs/security/SOCKET_DEV_FINDINGS.md.
const isMinimalBuild = process.env.OMNIROUTE_BUILD_PROFILE === "minimal";

const minimalBuildAliases = isMinimalBuild
  ? {
      "@/mitm/cert/install": "./src/mitm/cert/install.stub.ts",
      "@/lib/zed-oauth/keychain-reader": "./src/lib/zed-oauth/keychain-reader.stub.ts",
      "@/lib/cloudSync": "./src/lib/cloudSync.stub.ts",
      "@/lib/services/installers/ninerouter": "./src/lib/services/installers/ninerouter.stub.ts",
    }
  : {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir,
  // Turbopack config: redirect native modules to stubs at build time
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      // Point mitm/manager to a stub during build (native child_process/fs can't be bundled)
      "@/mitm/manager": "./src/mitm/manager.stub.ts",
      ...minimalBuildAliases,
    },
  },
  output: "standalone",
  compress: true,
  productionBrowserSourceMaps: false,
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
    // Next.js proxy (middleware) has a default 10MB body clone limit. File
    // uploads (OpenAI-compatible /v1/files) routinely exceed this. Match the
    // 512 MB server-side cap; tune via env if needed.
    proxyClientMaxBodySize: process.env.NEXT_PROXY_BODY_LIMIT || "512mb",
    // PR-2 of diegosouzapw/OmniRoute#3932: tree-shake barrel re-exports so
    // route bundles don't pull in 14 locale files, every lucide-react icon,
    // or the full date-fns surface when only one helper is used.
    //
    // NOTE: this list must only contain EXTERNAL barrel libraries. Do NOT add
    // the internal `@omniroute/open-sse` workspace here: optimizePackageImports
    // makes Next.js resolve every export of the package's barrel at build time,
    // and open-sse's `index.ts` re-exports the entire streaming engine
    // (executors/translators/services/handlers/mcp-server — thousands of
    // modules). Combined with the #3501 god-file splits (which multiplied the
    // re-export edges), this drove the webpack production pass into a heap
    // runaway that OOM'd even at a 28 GB --max-old-space-size (RSS pinned at the
    // ceiling in a GC death-spiral). Removing it keeps the build's heap bounded.
    // optimizePackageImports is designed for external libs, not workspaces.
    optimizePackageImports: [
      "lobehub/icons",
      "@lobehub/icons",
      "lucide-react",
      "date-fns",
      "lodash",
      "lodash-es",
      "material-symbols",
      "next-intl",
    ],
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
      "./open-sse/lib/sha3_wasm_bg.wasm",
      "./open-sse/lib/deepseek-pow-solver.cjs",
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
    // sqlite-vec ships a native vec0.so loaded at runtime via createRequire().
    // Turbopack otherwise tries to bundle the .so and fails with "Unknown module
    // type"; externalizing it keeps the require at runtime (like better-sqlite3).
    // See issue #3066.
    "sqlite-vec",
    "node-machine-id",
    "keytar",
    "wreq-js",
    "zod",
    "tls-client-node",
    "koffi",
    "tough-cookie",
    "@ngrok/ngrok",
    "@huggingface/transformers",
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
  transpilePackages: ["@omniroute/open-sse", "@lobehub/icons", "fumadocs-ui", "fumadocs-core"],
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.0.250"],
  typescript: {
    // TODO: Re-enable after fixing all sub-component useTranslations scope issues
    ignoreBuildErrors: true,
  },
  webpack(config, { webpack }) {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      isNextIntlExtractorDynamicImportWarning,
    ];
    config.optimization = config.optimization || {};
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...(config.optimization.splitChunks?.cacheGroups || {}),
        recharts: {
          test: /[\\/]node_modules[\\/]recharts[\\/]/,
          name: "vendor-recharts",
          chunks: "all",
          priority: 20,
        },
        lobeIcons: {
          test: /[\\/]node_modules[\\/]@lobehub[\\/]icons[\\/]/,
          name: "vendor-lobe-icons",
          chunks: "all",
          priority: 20,
        },
        monaco: {
          test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
          name: "vendor-monaco",
          chunks: "all",
          priority: 20,
        },
        xyflow: {
          test: /[\\/]node_modules[\\/]@xyflow[\\/]/,
          name: "vendor-xyflow",
          chunks: "all",
          priority: 20,
        },
        mermaid: {
          test: /[\\/]node_modules[\\/]mermaid[\\/]/,
          name: "vendor-mermaid",
          chunks: "all",
          priority: 20,
        },
        // PR-2 of diegosouzapw/OmniRoute#3932: isolate the heavy long-tail
        // vendor chunks that only some routes actually need, so dashboard
        // pages don't pay for the docs bundle (or vice versa).
        nextIntl: {
          test: /[\\/]node_modules[\\/]next-intl[\\/]/,
          name: "vendor-next-intl",
          chunks: "all",
          priority: 25,
        },
        fumadocs: {
          test: /[\\/]node_modules[\\/](fumadocs-ui|fumadocs-core|fumadocs-mdx)[\\/]/,
          name: "vendor-fumadocs",
          chunks: "all",
          priority: 20,
        },
        comboGraph: {
          test: /[\\/]node_modules[\\/]@?dagre[\\/]|[\\/]node_modules[\\/]@?elkjs[\\/]/,
          name: "vendor-combo-graph",
          chunks: "all",
          priority: 20,
        },
      },
    };

    if (isMinimalBuild) {
      // Mirror the turbopack.resolveAlias entries for webpack-built artifacts.
      // NormalModuleReplacementPlugin swaps the real module for a stub before
      // webpack resolves it, so the privileged source files are never compiled
      // into the standalone output.
      const replacements = [
        [/^@\/mitm\/cert\/install$/, "./src/mitm/cert/install.stub.ts"],
        [/^@\/lib\/zed-oauth\/keychain-reader$/, "./src/lib/zed-oauth/keychain-reader.stub.ts"],
        [/^@\/lib\/cloudSync$/, "./src/lib/cloudSync.stub.ts"],
        [
          /^@\/lib\/services\/installers\/ninerouter$/,
          "./src/lib/services/installers/ninerouter.stub.ts",
        ],
      ];
      for (const [pattern, stubPath] of replacements) {
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(pattern, (resource) => {
            resource.request = stubPath;
          })
        );
      }
    }

    return config;
  },
  images: {
    unoptimized: true,
  },

  async headers() {
    // Next.js supports a function-form `headers` entry that receives the
    // incoming NextRequest and returns the per-response header map. We use
    // this so the CSP's `connect-src` directive can be augmented with the
    // request's own origin — otherwise the dashboard's live WebSocket (which
    // targets <window.location.host>:20129) is blocked whenever the user
    // accesses OmniRoute from anything other than localhost / 127.0.0.1
    // (LAN IPs, Tailscale 100.64/10, public DNS names, ...).
    const buildHeadersForRequest = (request) => {
      // Re-build the static CSP with the request's own host appended so the
      // dashboard WS connection from the same origin is allowed. The Host
      // header is a controlled, server-side value (the reverse proxy already
      // sets it) and we only inject a single token into a single directive,
      // so the relaxation is tightly scoped.
      const hostHeader = request?.headers?.get?.("host") || "";
      const xfp = request?.headers?.get?.("x-forwarded-proto") || "";
      const proto = xfp || new URL(request?.url || "http://placeholder/").protocol || "http:";
      const cspWithOwnOrigin = appendOwnOriginToCsp(contentSecurityPolicy, hostHeader, proto);
      const perRequestHeaders = securityHeaders.map((h) =>
        h.key === "Content-Security-Policy" ? { ...h, value: cspWithOwnOrigin } : h
      );
      return perRequestHeaders;
    };

    return [
      {
        source: "/:path*",
        headers: buildHeadersForRequest,
      },
      // G-10: allow OmniRoute's own dashboard to embed the 9Router UI via our reverse proxy.
      // `frame-ancestors 'self'` overrides the global `frame-ancestors 'none'` only for this
      // path. The route is already LOCAL_ONLY (routeGuard.ts) so remote origins cannot reach it.
      {
        source: "/dashboard/providers/services/:name/embed/:path*",
        headers: [{ key: "Content-Security-Policy", value: "frame-ancestors 'self'" }],
      },
    ];
  },

  async redirects() {
    return [
      // Dashboard routes
      {
        source: "/dashboard/skills",
        destination: "/dashboard/omni-skills",
        permanent: true,
      },
      // Architecture
      {
        source: "/docs/architecture",
        destination: "/docs/architecture/architecture",
        permanent: true,
      },
      {
        source: "/docs/authz-guide",
        destination: "/docs/architecture/authz-guide",
        permanent: true,
      },
      {
        source: "/docs/codebase-documentation",
        destination: "/docs/architecture/codebase-documentation",
        permanent: true,
      },
      {
        source: "/docs/repository-map",
        destination: "/docs/architecture/repository-map",
        permanent: true,
      },
      {
        source: "/docs/resilience-guide",
        destination: "/docs/architecture/resilience-guide",
        permanent: true,
      },
      // Guides
      { source: "/docs/docker-guide", destination: "/docs/guides/docker-guide", permanent: true },
      {
        source: "/docs/electron-guide",
        destination: "/docs/guides/electron-guide",
        permanent: true,
      },
      { source: "/docs/features", destination: "/docs/guides/features", permanent: true },
      { source: "/docs/i18n", destination: "/docs/guides/i18n", permanent: true },
      { source: "/docs/kiro-setup", destination: "/docs/guides/kiro-setup", permanent: true },
      { source: "/docs/pwa-guide", destination: "/docs/guides/pwa-guide", permanent: true },
      { source: "/docs/setup-guide", destination: "/docs/guides/setup-guide", permanent: true },
      { source: "/docs/termux-guide", destination: "/docs/guides/termux-guide", permanent: true },
      {
        source: "/docs/troubleshooting",
        destination: "/docs/guides/troubleshooting",
        permanent: true,
      },
      { source: "/docs/uninstall", destination: "/docs/guides/uninstall", permanent: true },
      { source: "/docs/user-guide", destination: "/docs/guides/user-guide", permanent: true },
      // Reference
      {
        source: "/docs/api-reference",
        destination: "/docs/reference/api-reference",
        permanent: true,
      },
      { source: "/docs/cli-tools", destination: "/docs/reference/cli-tools", permanent: true },
      { source: "/docs/environment", destination: "/docs/reference/environment", permanent: true },
      { source: "/docs/free-tiers", destination: "/docs/reference/free-tiers", permanent: true },
      {
        source: "/docs/provider-reference",
        destination: "/docs/reference/provider-reference",
        permanent: true,
      },
      // Frameworks
      { source: "/docs/a2a-server", destination: "/docs/frameworks/a2a-server", permanent: true },
      {
        source: "/docs/agent-protocols-guide",
        destination: "/docs/frameworks/agent-protocols-guide",
        permanent: true,
      },
      { source: "/docs/cloud-agent", destination: "/docs/frameworks/cloud-agent", permanent: true },
      { source: "/docs/evals", destination: "/docs/frameworks/evals", permanent: true },
      {
        source: "/docs/gamification",
        destination: "/docs/frameworks/gamification",
        permanent: true,
      },
      { source: "/docs/mcp-server", destination: "/docs/frameworks/mcp-server", permanent: true },
      { source: "/docs/memory", destination: "/docs/frameworks/memory", permanent: true },
      { source: "/docs/opencode", destination: "/docs/frameworks/opencode", permanent: true },
      { source: "/docs/skills", destination: "/docs/frameworks/skills", permanent: true },
      { source: "/docs/webhooks", destination: "/docs/frameworks/webhooks", permanent: true },
      // Routing
      { source: "/docs/auto-combo", destination: "/docs/routing/auto-combo", permanent: true },
      {
        source: "/docs/reasoning-replay",
        destination: "/docs/routing/reasoning-replay",
        permanent: true,
      },
      // Security
      { source: "/docs/cli-token", destination: "/docs/security/cli-token", permanent: true },
      {
        source: "/docs/cli-token-auth",
        destination: "/docs/security/cli-token-auth",
        permanent: true,
      },
      { source: "/docs/compliance", destination: "/docs/security/compliance", permanent: true },
      {
        source: "/docs/error-sanitization",
        destination: "/docs/security/error-sanitization",
        permanent: true,
      },
      { source: "/docs/guardrails", destination: "/docs/security/guardrails", permanent: true },
      { source: "/docs/public-creds", destination: "/docs/security/public-creds", permanent: true },
      {
        source: "/docs/route-guard-tiers",
        destination: "/docs/security/route-guard-tiers",
        permanent: true,
      },
      {
        source: "/docs/stealth-guide",
        destination: "/docs/security/stealth-guide",
        permanent: true,
      },
      // Compression
      {
        source: "/docs/compression-engines",
        destination: "/docs/compression/compression-engines",
        permanent: true,
      },
      {
        source: "/docs/compression-guide",
        destination: "/docs/compression/compression-guide",
        permanent: true,
      },
      {
        source: "/docs/compression-language-packs",
        destination: "/docs/compression/compression-language-packs",
        permanent: true,
      },
      {
        source: "/docs/compression-rules-format",
        destination: "/docs/compression/compression-rules-format",
        permanent: true,
      },
      {
        source: "/docs/rtk-compression",
        destination: "/docs/compression/rtk-compression",
        permanent: true,
      },
      // Ops
      { source: "/docs/coverage-plan", destination: "/docs/ops/coverage-plan", permanent: true },
      {
        source: "/docs/e2e-dashboard-shakedown-v3.8.0",
        destination: "/docs/ops/e2e-dashboard-shakedown-v3.8.0",
        permanent: true,
      },
      {
        source: "/docs/fly-io-deployment-guide",
        destination: "/docs/ops/fly-io-deployment-guide",
        permanent: true,
      },
      { source: "/docs/proxy-guide", destination: "/docs/ops/proxy-guide", permanent: true },
      {
        source: "/docs/release-checklist",
        destination: "/docs/ops/release-checklist",
        permanent: true,
      },
      { source: "/docs/sqlite-runtime", destination: "/docs/ops/sqlite-runtime", permanent: true },
      { source: "/docs/tunnels-guide", destination: "/docs/ops/tunnels-guide", permanent: true },
      {
        source: "/docs/vm-deployment-guide",
        destination: "/docs/ops/vm-deployment-guide",
        permanent: true,
      },
      // CLI Pages — Plano 14 (F9)
      { source: "/dashboard/cli-tools", destination: "/dashboard/cli-code", permanent: true },
      {
        source: "/dashboard/cli-tools/:path*",
        destination: "/dashboard/cli-code/:path*",
        permanent: true,
      },
      { source: "/dashboard/agents", destination: "/dashboard/acp-agents", permanent: true },
      {
        source: "/dashboard/agents/:path*",
        destination: "/dashboard/acp-agents/:path*",
        permanent: true,
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

const withMDX = createMDX();

export default withMDX(withNextIntl(nextConfig));
