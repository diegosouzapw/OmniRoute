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
  assert.deepEqual(nextConfig.transpilePackages, [
    "@omniroute/open-sse",
    "@lobehub/icons",
    "fumadocs-ui",
    "fumadocs-core",
  ]);
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
  // sql.js WASM must ship in the standalone bundle: sqljsAdapter resolves it from
  // node_modules/sql.js/dist/sql-wasm.wasm at runtime (driver fallback tier), but
  // Next traces sql-wasm.js without auto-including the runtime .wasm asset.
  assert.ok(
    tracingIncludes.includes("./node_modules/sql.js/dist/sql-wasm.wasm"),
    "sql-wasm.wasm must be trace-included so the sql.js fallback works in standalone builds"
  );
  assert.ok(tracingExcludes.includes("./_tasks/**/*"));
  assert.ok(tracingExcludes.includes("./tests/**/*"));

  for (const packageName of [
    "thread-stream",
    "better-sqlite3",
    // sqlite-vec ships a native vec0.so loaded at runtime; without externalizing it
    // the Turbopack build fails with "Unknown module type" on the .so (issue #3066).
    "sqlite-vec",
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

// ── manager.stub.ts must cover every static @/mitm/manager import (issue #3066) ──
//
// next.config aliases `@/mitm/manager` → `manager.stub.ts` for the Turbopack build
// (Docker uses Turbopack; the VM/webpack build uses the real module, which is why the
// VM validated while Docker's `npm run build` errored). Any route that statically
// imports a name the stub doesn't export breaks the Turbopack build with
// "Export X doesn't exist in target module". This guard fails on that drift — it is
// what would have caught the missing getAllAgentsStatus export in #3066.

test("manager.stub.ts exports every name statically imported from @/mitm/manager", async () => {
  const fs = await import("node:fs");
  const srcDir = path.join(process.cwd(), "src");

  // Collect value names imported via `... from "@/mitm/manager"` across ALL of src/ —
  // not just src/app: src/lib/tailscaleTunnel.ts imports from it and is pulled into
  // routes transitively, so a src/app-only scan would miss that surface. NOT
  // manager.runtime (loaded via dynamic import(), resolves to the real module at
  // runtime). Inline `type` imports are erased at build time and need no stub export.
  const collectImports = (dir: string, acc: Set<string>): void => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        collectImports(full, acc);
        continue;
      }
      if (!/\.(ts|tsx)$/.test(entry.name)) continue;
      const src = fs.readFileSync(full, "utf-8");
      const re = /import\s*\{([^}]*)\}\s*from\s*["']@\/mitm\/manager["']/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(src)) !== null) {
        for (const raw of m[1].split(",")) {
          const token = raw.trim();
          if (!token || /^type\s/.test(token)) continue; // type-only import: no runtime export needed
          const name = token.split(/\s+as\s+/)[0].trim();
          if (name) acc.add(name);
        }
      }
    }
  };

  const imported = new Set<string>();
  collectImports(srcDir, imported);

  // Sanity: the guard is meaningless if the scan finds nothing to check. Kept generic
  // (>= 1 import) rather than asserting a specific symbol, so the test stays valid if any
  // single agent-bridge/traffic-inspector route is later renamed or removed.
  assert.ok(imported.size > 0, "expected at least one static @/mitm/manager import in src/");

  const stubSrc = fs.readFileSync(
    path.join(process.cwd(), "src", "mitm", "manager.stub.ts"),
    "utf-8"
  );
  // Collect stub exports from both declaration forms and named re-export blocks so the
  // guard doesn't false-positive if the stub later uses `export class` / `export { … }`.
  const stubExports = new Set<string>();
  for (const m of stubSrc.matchAll(
    /export\s+(?:const|let|var|class|function|async\s+function)\s+([A-Za-z0-9_]+)/g
  )) {
    stubExports.add(m[1]);
  }
  for (const m of stubSrc.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const part of m[1].split(",")) {
      const exported = part.trim().split(/\s+as\s+/).pop()?.trim(); // `x as y` exports y
      if (exported) stubExports.add(exported);
    }
  }

  const missing = [...imported].filter((name) => !stubExports.has(name));
  assert.deepEqual(
    missing,
    [],
    `manager.stub.ts is missing exports statically imported by routes: ${missing.join(", ")}`
  );
});

test("next-intl webpack hook preserves caller config and filters known extractor warnings", async () => {
  const { default: nextConfig } = await loadNextConfig("webpack-pass-through");
  const config: any = {
    context: process.cwd(),
    plugins: [],
    externals: [],
    ignoreWarnings: [],
    resolve: { fallback: { http: true } },
  };

  nextConfig.webpack(config, {
    isServer: false,
    defaultLoaders: { babel: {} } as any,
    webpack: {
      IgnorePlugin: class {
        options: any;

        constructor(options) {
          this.options = options;
        }
      },
    },
  });

  assert.deepEqual(config.plugins, []);
  assert.deepEqual(config.externals, []);
  assert.deepEqual(config.resolve.fallback, { http: true });
  assert.equal(config.ignoreWarnings.length, 1);
  assert.equal(
    config.ignoreWarnings[0]({
      message:
        "Parsing of /repo/node_modules/next-intl/dist/esm/production/extractor/format/index.js for build dependencies failed at 'import(t)'.",
      module: {
        resource: "/repo/node_modules/next-intl/dist/esm/production/extractor/format/index.js",
      },
    }),
    true
  );
  assert.equal(
    config.ignoreWarnings[0]({
      message:
        "Parsing of /repo/node_modules/next-intl/dist/esm/production/extractor/format/index.js for build dependencies failed at 'import(t)'.",
    }),
    false
  );
  assert.equal(
    config.ignoreWarnings[0]({
      message: "Critical dependency: the request of a dependency is an expression",
      module: {
        resource: "/repo/node_modules/next-intl/dist/esm/production/extractor/format/index.js",
      },
    }),
    true
  );
  assert.equal(
    config.ignoreWarnings[0]({ message: "Critical dependency: request is expression" }),
    false
  );
});

test("optimizePackageImports excludes the internal @omniroute/open-sse workspace (build-OOM guard)", async () => {
  // Regression guard: adding the internal `@omniroute/open-sse` workspace to
  // optimizePackageImports makes Next.js resolve its entire barrel at build
  // time, driving the webpack production pass into a heap runaway that OOM'd
  // even at 28 GB. optimizePackageImports is for EXTERNAL barrel libs only.
  const { default: nextConfig } = await loadNextConfig("optimize-pkg-imports");
  const list = nextConfig.experimental?.optimizePackageImports ?? [];

  assert.ok(Array.isArray(list), "optimizePackageImports should be an array");
  assert.ok(
    !list.includes("@omniroute/open-sse"),
    "do NOT add the internal @omniroute/open-sse workspace to optimizePackageImports — it OOMs the production build"
  );
  // The intended external barrel libs must remain optimized.
  for (const lib of ["lucide-react", "date-fns", "next-intl"]) {
    assert.ok(list.includes(lib), `expected external barrel lib ${lib} to stay optimized`);
  }
});
