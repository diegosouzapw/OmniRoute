import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const modulePath = path.join(process.cwd(), "next.config.mjs");
const originalNextDistDir = process.env.NEXT_DIST_DIR;

async function loadNextConfig(label) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

test.afterEach(() => {
  if (originalNextDistDir === undefined) {
    delete process.env.NEXT_DIST_DIR;
  } else {
    process.env.NEXT_DIST_DIR = originalNextDistDir;
  }
});

test("next config exposes standalone build settings and canonical rewrites", async () => {
  process.env.NEXT_DIST_DIR = ".next-task607";
  const { default: nextConfig } = await loadNextConfig("distdir");

  const rewrites = await nextConfig.rewrites();
  const headers = await nextConfig.headers();
  const securityHeaders = Object.fromEntries(
    headers[0].headers.map(({ key, value }) => [key, value])
  );

  assert.equal(nextConfig.distDir, ".next-task607");
  assert.equal(nextConfig.output, "standalone");
  assert.equal(nextConfig.images.unoptimized, true);
  assert.deepEqual(nextConfig.transpilePackages, ["@omniroute/open-sse", "@lobehub/icons"]);
  assert.equal(headers[0].source, "/:path*");
  assert.match(securityHeaders["Content-Security-Policy"], /default-src 'self'/);
  assert.match(securityHeaders["Content-Security-Policy"], /frame-ancestors 'none'/);
  assert.equal(securityHeaders["X-Frame-Options"], "DENY");
  assert.equal(securityHeaders["X-Content-Type-Options"], "nosniff");
  assert.match(securityHeaders["Strict-Transport-Security"], /includeSubDomains/);
  assert.deepEqual(rewrites.slice(0, 4), [
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
  ]);
});

test("next config declares Turbopack aliases, runtime assets and server externals", async () => {
  const { default: nextConfig } = await loadNextConfig("runtime-assets");
  const serverExternalPackages = new Set(nextConfig.serverExternalPackages);
  const tracingIncludes = nextConfig.outputFileTracingIncludes["/*"];
  const tracingExcludes = nextConfig.outputFileTracingExcludes["/*"];

  assert.equal(nextConfig.turbopack.root, process.cwd());
  assert.equal(nextConfig.turbopack.resolveAlias["@/mitm/manager"], "./src/mitm/manager.stub.ts");
  assert.equal(nextConfig.outputFileTracingRoot, process.cwd());
  assert.ok(tracingIncludes.includes("./src/lib/db/migrations/**/*"));
  assert.ok(
    tracingIncludes.includes("./open-sse/services/compression/engines/rtk/filters/**/*.json")
  );
  assert.ok(tracingIncludes.includes("./open-sse/services/compression/rules/**/*.json"));
  assert.ok(tracingExcludes.includes("./_tasks/**/*"));
  assert.ok(tracingExcludes.includes("./tests/**/*"));

  for (const packageName of [
    "thread-stream",
    "better-sqlite3",
    "wreq-js",
    "fs",
    "path",
    "child_process",
    "crypto",
    "net",
    "tls",
  ]) {
    assert.ok(serverExternalPackages.has(packageName), `${packageName} should be externalized`);
  }
});

test("next-intl webpack hook preserves caller webpack config without legacy fallbacks", async () => {
  const { default: nextConfig } = await loadNextConfig("webpack-pass-through");
  const config = {
    context: process.cwd(),
    plugins: [],
    externals: [],
    resolve: { fallback: { http: true } },
  };

  nextConfig.webpack(config, {
    isServer: false,
    webpack: {
      IgnorePlugin: class {
        constructor(options) {
          this.options = options;
        }
      },
    },
  });

  assert.deepEqual(config.plugins, []);
  assert.deepEqual(config.externals, []);
  assert.deepEqual(config.resolve.fallback, { http: true });
});
