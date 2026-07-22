import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

// Regression guard for issue #7701.
//
// dist/open-sse/mcp-server/server.js is produced by:
//   esbuild open-sse/mcp-server/server.ts --bundle --platform=node
//     --packages=external --format=esm --outfile=dist/open-sse/mcp-server/server.js
// (scripts/build/prepublish.ts, Step 8.5)
//
// `--packages=external` means every bare-specifier `import ... from "pkg"` in the
// MCP server's source graph survives UNBUNDLED in the compiled output. Node's ESM
// loader resolves every one of those STATIC top-level imports at *module-link
// time* -- before any of the MCP server's own code (including its startup log
// lines) executes.
//
// Separately, `dist/node_modules/` is populated by Next.js's standalone output
// file tracer (nft), which walks the compiled Next.js app's require graph. nft is
// known (and separately documented in this repo -- see the #6559 comment in
// src/shared/utils/rateLimiter.ts, plus the sqlite-vec/#3066, tls-options/#5452,
// head-response-guard/#7065, and @swc/helpers precedents in assembleStandalone.mjs)
// to sometimes emit a HOLLOW `dist/node_modules/<pkg>/` directory containing only
// package.json, no code. Node's module resolution stops at the FIRST
// node_modules/<pkg> directory found while walking up from the importer -- so a
// hollow dist/node_modules/<pkg> SHADOWS the fully-populated sibling
// node_modules/<pkg> that npm installed for the published package, and the MCP
// server crashes with:
//   Error: Cannot find package '.../dist/node_modules/undici/index.js'
//
// The project's existing mitigation for this bug class is an explicit copy
// guarantee (EXTRA_MODULE_ENTRIES / NATIVE_ASSET_ENTRIES in assembleStandalone.mjs)
// that force-overwrites whatever nft did with a full copy from the sibling
// node_modules. This test proves that `undici` -- a real, static, top-level
// external import of the actual esbuild-compiled MCP server bundle -- has NO such
// guarantee, so a hollow nft trace for it is packaging-fatal.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const ASSEMBLE = path.join(ROOT, "scripts", "build", "assembleStandalone.mjs");

const NODE_BUILTINS = new Set([
  "assert", "async_hooks", "buffer", "child_process", "crypto", "dns", "events",
  "fs", "http", "https", "module", "net", "os", "path", "stream", "tls", "url",
  "util", "worker_threads", "zlib",
]);

function isBuiltin(pkg: string): boolean {
  return pkg.startsWith("node:") || NODE_BUILTINS.has(pkg);
}

/** Bare-specifier packages that survive as STATIC top-level imports in the real,
 * esbuild-compiled (--packages=external) MCP server bundle. */
function mcpBundleStaticExternalImports(): string[] {
  const outFile = path.join(
    os.tmpdir(),
    `omniroute-mcp-server-probe-${process.pid}-${Date.now()}.js`
  );
  try {
    execFileSync(
      "npx",
      [
        "esbuild", "open-sse/mcp-server/server.ts", "--bundle", "--platform=node",
        "--packages=external", "--format=esm", `--outfile=${outFile}`,
      ],
      { cwd: ROOT, stdio: ["ignore", "ignore", "inherit"] }
    );
    const src = fs.readFileSync(outFile, "utf8");
    const re = /^import\s+(?:[^;]*?\s+from\s+)?["']([^."][^"']*)["'];?$/gm;
    const pkgs = new Set<string>();
    let m: RegExpExecArray | null;
    while ((m = re.exec(src))) {
      const spec = m[1];
      const name = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
      if (!isBuiltin(name)) pkgs.add(name);
    }
    return [...pkgs].sort();
  } finally {
    fs.rmSync(outFile, { force: true });
  }
}

function explicitlyGuaranteedPackages(): Set<string> {
  const text = fs.readFileSync(ASSEMBLE, "utf8");
  const entries = [...text.matchAll(/src:\s*\[([^\]]+)\]/gs)];
  const guaranteed = new Set<string>();
  for (const [, segList] of entries) {
    const segments = segList.split(",").map((s) => s.trim().replace(/^"|"$/g, "")).filter(Boolean);
    if (segments[0] !== "node_modules") continue;
    const pkg = segments[1]?.startsWith("@") ? `${segments[1]}/${segments[2]}` : segments[1];
    if (pkg) guaranteed.add(pkg);
  }
  return guaranteed;
}

test("sanity: MCP server bundle probe finds real external packages (parser didn't break)", () => {
  const pkgs = mcpBundleStaticExternalImports();
  assert.ok(pkgs.length > 5, `expected several external packages, got: ${pkgs.join(", ")}`);
  // better-sqlite3 is intentionally NOT expected here (base-red audit, v3.8.49): since
  // `feat(db): migrate core.ts to SqliteAdapter multi-driver factory` (71452e040, predates
  // #7878's Bun-runtime driver) it is loaded lazily via `createRequire()(...)` in
  // src/lib/db/adapters/driverFactory.ts (cascading better-sqlite3 -> node:sqlite ->
  // sql.js, and now bun:sqlite first under Bun) instead of a static top-level `import`, so
  // esbuild's `--packages=external` never emits a static `import "better-sqlite3"` line for
  // it — this probe (which only parses static top-level imports) correctly stops seeing it.
  // That's not a packaging regression: the native addon has its own, stronger copy
  // guarantee in NATIVE_ASSET_ENTRIES (scripts/build/assembleStandalone.mjs — "better-sqlite3
  // native binary", node_modules/better-sqlite3/build), independent of the
  // EXTRA_MODULE_ENTRIES mechanism this file's #7701 regression guard protects for pure-JS
  // static externals like `undici`. Assert on `zod` instead — a real, static, top-level
  // external import of the MCP server's tool-schema layer that isn't going away.
  assert.ok(pkgs.includes("zod"), `missing zod: ${pkgs.join(", ")}`);
});

test("undici (a static top-level external import of the real MCP server bundle) has an explicit dist/node_modules copy guarantee (#7701)", () => {
  const staticExternals = mcpBundleStaticExternalImports();
  assert.ok(
    staticExternals.includes("undici"),
    `expected undici among the MCP bundle's static external imports (sanity check on the repro itself): ${staticExternals.join(", ")}`
  );
  const guaranteed = explicitlyGuaranteedPackages();
  assert.ok(guaranteed.has("undici"), "undici is statically imported at module-link time by the esbuild-compiled MCP server bundle but has NO explicit copy entry in EXTRA_MODULE_ENTRIES (scripts/build/assembleStandalone.mjs) ... (issue #7701).");
});
