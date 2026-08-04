/**
 * Regression guard (#3292 / v3.8.13 Electron release fragment).
 *
 * `@/*` maps to `src/*`, but the streaming engine lives in the `open-sse/`
 * workspace (alias `@omniroute/open-sse/*`). So an import of `@/open-sse/...`
 * resolves to the non-existent `src/open-sse/...` and throws
 * "Cannot find module '@/open-sse/...'" at runtime in the built standalone.
 *
 * This bit the #3292 auto-refresh daemon: `instrumentation-node.ts` did
 * `await import("@/open-sse/services/autoRefreshDaemon")`. It was caught by a
 * try/catch (non-fatal), so typecheck and the dev server stayed green, but the
 * packaged Electron app's strict startup-log smoke test failed on the
 * "Cannot find module" line. This test fails fast on any such alias.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const srcRoot = join(import.meta.dirname, "../../src");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (/\.(ts|tsx|js|mjs)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

test("src/ never imports the open-sse workspace via the @/ alias (use @omniroute/open-sse)", () => {
  const offenders: string[] = [];
  for (const file of walk(srcRoot)) {
    const src = readFileSync(file, "utf8");
    // matches  from "@/open-sse/...   and   import("@/open-sse/...
    if (/["'`]@\/open-sse\//.test(src)) {
      const line = src.split("\n").findIndex((l) => /["'`]@\/open-sse\//.test(l)) + 1;
      offenders.push(`${file.replace(srcRoot, "src")}:${line}`);
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `@/open-sse/* resolves to the non-existent src/open-sse/* and throws "Cannot find module" at runtime. Use @omniroute/open-sse/* instead. Offenders:\n${offenders.join("\n")}`
  );
});
