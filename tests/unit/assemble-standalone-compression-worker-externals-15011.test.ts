/**
 * Regression guard for #15011 — the esbuild-bundled compression worker
 * (scripts/build/colocate-standalone.mjs, `--packages=external`) keeps its npm
 * dependencies as runtime imports, but the Next.js standalone tracer never
 * walks that separate worker entry point. Every bare package the worker
 * imports (plus its runtime dependency closure) must therefore be shipped by
 * EXTRA_MODULE_ENTRIES in scripts/build/assembleStandalone.mjs, or the worker
 * spawn dies with ERR_MODULE_NOT_FOUND, compression silently falls back to the
 * main thread and large histories trip the resource-pressure guard (503).
 *
 * The test bundles the worker exactly like the build does and fails as soon as
 * a new external import appears without a matching standalone entry.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { isBuiltin } from "node:module";
import { join } from "node:path";
import { build } from "esbuild";

import { EXTRA_MODULE_ENTRIES } from "../../scripts/build/assembleStandalone.mjs";
import { computeDependencyClosure } from "../../scripts/build/colocateOptionals.mjs";

const ROOT = process.cwd();
const WORKER_SRC = join(ROOT, "open-sse", "services", "compression", "compressionWorker.ts");

// Packages the worker imports that also reach the standalone tree through the
// Next.js server trace, because the app itself imports them on its main path.
const TRACED_BY_NEXT_SERVER = new Set([
  "bcryptjs",
  "pino",
  "playwright",
  "sharp",
  "undici",
  "ws",
  "zod",
]);

// ioredis is optional/lazy (REDIS_URL only, #6559) and shipped by its own
// EXTRA_MODULE_ENTRIES row; its dependency closure is outside this guard.
const CLOSURE_OUT_OF_SCOPE = new Set(["ioredis"]);

function packageNameOf(specifier: string): string {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

async function workerExternalPackages(): Promise<string[]> {
  const result = await build({
    entryPoints: [WORKER_SRC],
    bundle: true,
    platform: "node",
    packages: "external",
    format: "esm",
    write: false,
    metafile: true,
    outfile: join(ROOT, "compressionWorker.probe.js"),
    logLevel: "silent",
  });
  const names = new Set<string>();
  for (const input of Object.values(result.metafile.inputs)) {
    for (const imp of input.imports) {
      if (!imp.external) continue;
      const spec = imp.path;
      if (spec.startsWith(".") || spec.startsWith("/") || isBuiltin(spec)) continue;
      // Workspace alias (node_modules/@omniroute/* are symlinks into the repo).
      if (spec.startsWith("@omniroute/")) continue;
      names.add(packageNameOf(spec));
    }
  }
  return [...names].sort();
}

test("#15011 every compression-worker external (and its closure) ships in the standalone tree", async () => {
  assert.ok(existsSync(WORKER_SRC), `compression worker source missing: ${WORKER_SRC}`);

  const externals = await workerExternalPackages();
  assert.ok(externals.length > 0, "esbuild reported no external packages for the worker");

  const shipped = new Set(
    EXTRA_MODULE_ENTRIES.filter((e) => e.dest[0] === "node_modules").map((e) =>
      e.dest.slice(1).join("/")
    )
  );

  const seeds = externals.filter((name) => !TRACED_BY_NEXT_SERVER.has(name) && !shipped.has(name));
  assert.deepEqual(seeds, [], `worker externals not shipped by EXTRA_MODULE_ENTRIES: ${seeds}`);

  const needed = externals.filter(
    (name) => !TRACED_BY_NEXT_SERVER.has(name) && !CLOSURE_OUT_OF_SCOPE.has(name)
  );
  const closure = computeDependencyClosure(join(ROOT, "node_modules"), needed);
  const missing = closure.filter((name) => !shipped.has(name));
  assert.deepEqual(missing, [], `worker dependency closure not shipped: ${missing}`);
});
