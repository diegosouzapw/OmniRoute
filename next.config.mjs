import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { betterSqlite3AliasFor } from "./scripts/build/better-sqlite3-stub-flag.mjs";
import { mitmManagerAliasFor } from "./scripts/build/mitm-stub-flag.mjs";
import { normalizeBasePath } from "./scripts/build/normalizeBasePath.mjs";
import {
  buildSecurityHeaderRules,
  nonPageRoutePrefixes,
  resolveDashboardEmbedMode,
} from "./scripts/build/dashboardEmbed.mjs";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const distDir = process.env.NEXT_DIST_DIR || ".build/next";
const projectRoot = dirname(fileURLToPath(import.meta.url));
const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://static.cloudflareinsights.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://static.cloudflareinsights.com";
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
  // `ws:` is permitted scheme-wide (mirroring the bare `wss:` already allowed) so the
  // dashboard can open `ws://<lan-or-tailscale-host>:*` to its own Live WS server when
  // OmniRoute is reached from a non-loopback host. Same-origin HTTP fetches stay covered
  // by `'self'`; the loopback origins remain listed explicitly for clarity. (#5083)
  "connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https: ws: wss:",
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

const IGNORED_INFRASTRUCTURE_BUILD_DEPENDENCY_MODULES = [
  "/node_modules/fumadocs-mdx/dist/load-from-file-",
  "/node_modules/next-intl/dist/esm/production/extractor/format/index.js",
];

function isKnownInfrastructureBuildDependencyWarning(args) {
  const message = args
    .filter((value) => typeof value === "string")
    .join(" ")
    .replaceAll("\\", "/");
  return (
    message.includes("webpack.FileSystemInfo") &&
    message.includes("for build dependencies failed at 'import(") &&
    message.includes("incorrect cache invalidation") &&
    IGNORED_INFRASTRUCTURE_BUILD_DEPENDENCY_MODULES.some((modulePath) =>
      message.includes(modulePath)
    )
  );
}

function filterKnownInfrastructureWarnings(baseConsole) {
  const filteredConsole = Object.create(baseConsole);
  filteredConsole.warn = (...args) => {
    if (isKnownInfrastructureBuildDependencyWarning(args)) return;
    Reflect.apply(baseConsole.warn, baseConsole, args);
  };
  return filteredConsole;
}

// OMNIROUTE_BUILD_PROFILE=minimal physically removes four optional privileged
// modules (MITM cert install, Zed keychain import, Cloud Sync, 9router
// installer) from the built bundle by aliasing them to feature-disabled stubs.
// The resulting artifact is intended to be published as `omniroute-secure`
// for security-sensitive environments. See docs/security/SOCKET_DEV_FINDINGS.md.
const isMinimalBuild = process.env.OMNIROUTE_BUILD_PROFILE === "minimal";
// Contributor builds validate compilation only and do not need a shippable standalone bundle.
const isContributorBuild = process.env.OMNIROUTE_BUILD_PROFILE === "contributor";

// #10273: `null` unless the operator opts in with DASHBOARD_ALLOW_EMBED=vscode. Read at build
// time like every other knob in this file (OMNIROUTE_BASE_PATH, OMNIROUTE_BUILD_PROFILE, …),
// so changing it requires a rebuild. See scripts/build/dashboardEmbed.mjs.
const dashboardEmbedMode = resolveDashboardEmbedMode(process.env);

const minimalBuildAliases = isMinimalBuild
  ? {
      "@/mitm/cert/install": "./src/mitm/cert/install.stub.ts",
      "@/lib/zed-oauth/keychain-reader": "./src/lib/zed-oauth/keychain-reader.stub.ts",
      "@/lib/cloudSync": "./src/lib/cloudSync.stub.ts",
      "@/lib/services/installers/ninerouter": "./src/lib/services/installers/ninerouter.stub.ts",
    }
  : {};

function readTimeoutMs(...values) {
  for (const value of values) {
    const normalized = typeof value === "string" ? value.trim() : value;
    if (normalized == null || normalized === "") continue;
    const parsed = Number(normalized);
    if (Number.isFinite(parsed) && parsed >= 0) return Math.floor(parsed);
  }
  return 600_000;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Opt-in subpath deployment behind a reverse proxy (e.g. nginx/Caddy serving
  // OmniRoute under https://host/omniroute/). Empty by default so root-path
  // deployments are unaffected. Next.js strips this prefix from `pathname`
  // before route matching, so authz classification (classifyRoute/isLocalOnlyPath)
  // keeps operating on un-prefixed paths — see src/server/authz/pipeline.ts for
  // the two redirect call sites that re-add it via `request.nextUrl.basePath`.
  basePath: normalizeBasePath(process.env.OMNIROUTE_BASE_PATH),
  // Next 16 (both webpack and Turbopack) app-router renders SSR asset URLs from
  // `assetPrefix` ALONE — basePath only affects routing/links. Without mirroring
  // it here, a subpath build emits /_next/static shell references that 404
  // behind a reverse proxy. The Docker runtime patcher (ensure-docker-base-path)
  // rewrites the same knob for prebuilt root-path images.
  assetPrefix: normalizeBasePath(process.env.OMNIROUTE_BASE_PATH) || undefined,
  // Client-visible mirror of basePath for fetch/EventSource rewriting under reverse
  // proxies (installBasePathFetch), and for client display helpers (useDisplayBaseUrl)
  // that append the subpath to window.location.origin when building curl/endpoint
  // examples. Empty by default (root deploys unchanged).
  env: {
    NEXT_PUBLIC_OMNIROUTE_BASE_PATH: normalizeBasePath(process.env.OMNIROUTE_BASE_PATH),
    // Deployment identity for the PWA service worker URL (PwaRegister):
    // a browser holding a worker from an older deployment must see a
    // different /sw.js?v=<id> URL so the browser treats it as an update
    // instead of keeping the old generation in control. Falls back to a
    // value that is unique per build run when git is absent (CI tarball).
    NEXT_PUBLIC_SW_BUILD_ID:
      process.env.OMNIROUTE_SW_BUILD_ID || process.env.SOURCE_VERSION || `${Date.now()}`,
  },
  distDir,
  // Turbopack config: redirect native modules to stubs at build time
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      // @/mitm/manager → stub ONLY where the runtime can't run the MITM stack
      // (Docker sets OMNIROUTE_MITM_STUB=1 — #3390 graceful degradation). The
      // alias used to be unconditional, which was fine while Docker was the
      // only Turbopack consumer — but the v3.8.45 bundler-default flip shipped
      // the stub to every npm/Electron/VPS artifact and broke Agent Bridge
      // start for all non-Docker users (#6344). See scripts/build/mitm-stub-flag.mjs.
      ...mitmManagerAliasFor(process.env),
      // better-sqlite3 → build-time stub ONLY where the build worker actually
      // aborts while tracing the native addon (SIGABRT at worker teardown,
      // #10060); opt in with OMNIROUTE_BETTER_SQLITE3_STUB=1. The alias used to
      // be unconditional on the premise that serverExternalPackages still won
      // at runtime — it does not: resolveAlias rewrites the request before the
      // externals check, so the stub was bundled and EVERY route answered 500
      // (#11343). See scripts/build/better-sqlite3-stub-flag.mjs.
      ...betterSqlite3AliasFor(process.env),
      ...minimalBuildAliases,
    },
    // src/lib/agentSkills/generator.ts builds its fs base path from a runtime
    // `outputDir` parameter (`path.join(process.cwd(), outputDir)`), which is
    // NOT a compile-time literal, so Turbopack's build-time file-tracing
    // analyzer can't statically narrow the several dynamic readdirSync/rmSync/
    // readFileSync/writeFileSync call sites a few lines below and falls back
    // to an "Overly broad patterns... matches N files" warning — once per
    // Next.js entry point that imports the module (/api/agent-skills/generate,
    // /api/cli-tools/pi-settings). The fs access is legitimate and bounded
    // (skills/<id>/SKILL.md, ~48 known IDs), so this is a known-benign,
    // expected diagnostic — suppress it here rather than fight the analyzer,
    // mirroring the isNextIntlExtractorDynamicImportWarning precedent below
    // for the webpack path. (#6582)
    // open-sse/services/compression/ruleLoader.ts and
    // .../engines/rtk/filterLoader.ts both define an identical
    // getModuleDir() helper that walks up directories via
    // path.resolve(anchor) + fs.existsSync(...) in a loop with a
    // non-literal argument — the same dynamic-path fs access pattern as
    // the agentSkills case above, but not covered by that narrower
    // allowlist glob, so the "Overly broad patterns..." warning kept
    // firing (610 times, once per entry point transitively importing the
    // compression module). Same known-benign, bounded fs access;
    // suppressed here rather than fought. (#7051, follow-up to #6582)
    ignoreIssue: [
      {
        path: "**/src/lib/agentSkills/**",
        description: /Overly broad patterns can lead to build performance issues/,
      },
      {
        path: "**/open-sse/services/compression/**",
        description: /Overly broad patterns can lead to build performance issues/,
      },
    ],
  },
  ...(isContributorBuild ? {} : { output: "standalone" }),
  compress: true,
  productionBrowserSourceMaps: false,
  // Issue #67: enable React Compiler — automates memoization, removes manual useCallback/useMemo debt.
  // See: https://next.dev/blog/react-compiler
  reactCompiler: true,
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
    // Reduce peak heap during production builds (Next.js 15+).
    webpackMemoryOptimizations: true,
    // Run webpack in a separate Node worker, lowering main-process memory.
    webpackBuildWorker: true,
    // Next.js proxy (middleware) has a default 10MB body clone limit. File
    // uploads (OpenAI-compatible /v1/files) routinely exceed this. Match the
    // 512 MB server-side cap; tune via env if needed.
    proxyClientMaxBodySize: process.env.NEXT_PROXY_BODY_LIMIT || "512mb",
    // Next's internal router proxy defaults to 30s when this is unset. OmniRoute
    // can legitimately hold non-streaming chat requests open for minutes while an
    // upstream provider finishes, so reuse the existing request-timeout knobs.
    proxyTimeout: readTimeoutMs(process.env.REQUEST_TIMEOUT_MS, process.env.FETCH_TIMEOUT_MS),
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
      "./open-sse/lib/deepseek-pow-hash.js",
      "./open-sse/lib/deepseek-pow-worker.mjs",
      // sql.js WASM is loaded at runtime by the sqljsAdapter fallback tier
      // (better-sqlite3 → node:sqlite → sql.js). Next traces sql-wasm.js but can
      // omit the runtime sql-wasm.wasm asset from the standalone bundle.
      "./node_modules/sql.js/dist/sql-wasm.wasm",
      // tiktoken is server-externalized below so Node selects its CommonJS entry.
      // That entry reads the tokenizer WASM beside itself at runtime.
      "./node_modules/tiktoken/tiktoken_bg.wasm",
    ],
  },
  outputFileTracingExcludes: {
    // Planning/task docs, tests, and non-production worktrees are not runtime assets
    // and break standalone copies when broad NFT tracing pulls the whole repository into memory.
    // Using "**/*" ensures the exclusion applies across all app and API routes, not just "/".
    "**/*": [
      "**/.git/**",
      "**/_tasks/**",
      "**/_references/**",
      "**/_ideia/**",
      "**/_mono_repo/**",
      "**/coverage/**",
      "**/test-results/**",
      "**/playwright-report/**",
      "**/app.__qa_backup/**",
      "**/tests/**",
      "**/logs/**",
      "**/.claude/**",
      "**/.opencode/**",
      "**/.scratch/**",
      "**/.agents/**",
      "**/.slim/**",
      "**/packages/**",
      "**/.tmp/**",
      "**/electron/**",
      "**/docs/**",
    ],
  },
  serverExternalPackages: [
    "pino",
    "pino-pretty",
    "thread-stream",
    "pino-abstract-transport",
    "better-sqlite3",
    // sql.js WASM is resolved at runtime via createRequire(); Next's static
    // analysis can't follow _require.resolve("sql.js/package.json") and spams
    // build warnings.  Externalizing silences them without changing behaviour.
    "sql.js",
    // tiktoken's node build reads tiktoken_bg.wasm via __dirname-relative
    // fs.readFileSync at import time. When bundled, the wasm asset is not
    // traced into the server chunk and page-data collection for any route
    // importing the vendored ChatGPT Web tokenizer fails with
    // "Missing tiktoken_bg.wasm". Externalizing keeps the require at runtime
    // where node_modules/tiktoken/tiktoken_bg.wasm resolves normally.
    "tiktoken",
    // sqlite-vec ships a native vec0.so loaded at runtime via createRequire().
    // Turbopack otherwise tries to bundle the .so and fails with "Unknown module
    // type"; externalizing it keeps the require at runtime (like better-sqlite3).
    // See issue #3066.
    "sqlite-vec",
    "node-machine-id",
    "keytar",
    "wreq-js",
    "zod",
    "@ngrok/ngrok",
    "@huggingface/transformers",
    // The ESM entry imports tiktoken_bg.wasm as a module. Turbopack can compile
    // that graph but omits the runtime asset, making provider routes fail during
    // module evaluation. Keep Node's CommonJS loader and colocated WASM intact.
    "tiktoken",
    // copilot-m365-web.ts imports 'ws' as a client-side WebSocket. When bundled,
    // ws cannot resolve its 'bufferutil' native addon (frame masking) and throws
    // TypeError: b.mask is not a function on the first outgoing frame, causing
    // every chat request to time out at the stream-readiness watchdog. (#6062)
    "ws",
    "bufferutil",
    "utf-8-validate",
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
  webpack(config, { dev, webpack }) {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      isNextIntlExtractorDynamicImportWarning,
    ];
    const infrastructureLogging = config.infrastructureLogging || {};
    config.infrastructureLogging = {
      ...infrastructureLogging,
      console: filterKnownInfrastructureWarnings(infrastructureLogging.console || console),
    };
    const nextDefaultSplitChunks = config.optimization?.splitChunks;
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
    // Next's development defaults are tuned for incremental route compilation.
    // Retain the custom vendor topology for production without imposing it on dev.
    if (dev) config.optimization.splitChunks = nextDefaultSplitChunks;

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
    // #10273: opt-in embedding for the VS Code Simple Browser (OmniCopilot). Off by default —
    // `securityHeaders` then applies to `/:path*` exactly as it always has. When the operator
    // sets DASHBOARD_ALLOW_EMBED=vscode, buildSecurityHeaderRules() splits that catch-all into
    // two complementary rules: the API surface keeps `frame-ancestors 'none'` + X-Frame-Options,
    // the HTML pages get `frame-ancestors 'self' vscode-webview:` and no X-Frame-Options.
    // The exclusion list is DERIVED from the rewrite table below (self-reference is safe — the
    // config object is fully built by the time Next calls headers()), so a future root-level API
    // alias is excluded automatically instead of silently becoming framable.
    const embedRules = buildSecurityHeaderRules({
      mode: dashboardEmbedMode,
      securityHeaders,
      prefixes: dashboardEmbedMode ? nonPageRoutePrefixes(await nextConfig.rewrites()) : [],
    });
    return [
      ...embedRules,
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
      {
        source: "/dashboard/providers/freepik",
        destination: "/dashboard/providers/magnific",
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
      // Issue #6405 follow-up: unknown root-level paths must return JSON 404,
      // not the dashboard HTML shell. Rewrite the missing prefixes under /api/*
      // so they hit the /api/[...omnirouteApiCatchAll] route (#6424) — which
      // returns application/json with error.type === "not_found". Real /api/*
      // routes take precedence over the catch-all, so any future
      // /api/anthropic/*, /api/openai/*, /api/metrics, /api/debug endpoints
      // still match first.
      {
        source: "/anthropic/:path*",
        destination: "/api/anthropic/:path*",
      },
      {
        source: "/openai/:path*",
        destination: "/api/openai/:path*",
      },
      {
        source: "/metrics",
        destination: "/api/metrics",
      },
      {
        source: "/debug",
        destination: "/api/debug",
      },
      {
        source: "/.env",
        destination: "/api/.env",
      },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(withNextIntl(nextConfig));
