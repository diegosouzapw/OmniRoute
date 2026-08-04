// Guards the native `require` shape that webpack silently rewrites when the
// module specifier (or the require itself) is not statically analyzable.
//
// This failure cannot be caught by running the code: under `tsx`/`node --test` the
// injected loader behaves normally, so the existing driverFactory tests pass in BOTH
// the broken and fixed shapes. The damage only appears in a packaged Next server build.
// The sql.js fallback is covered separately through package assembly and installed-
// artifact boot/write/read outcomes; do not pin another resolver implementation here.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

/**
 * Strips comments before shape-matching. Both files document the rewritten forms they
 * must avoid, so a scan of the raw text matches its own warning and fails on the FIXED
 * source — a guard that can only ever be satisfied by deleting the explanation.
 */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/.*$/gm, "");
}

test("sync driver cascade requires each SQLite module by literal specifier", () => {
  const driverFactory = stripComments(readSource("src/lib/db/adapters/driverFactory.ts"));

  // Positive anchor: proves the read hit the real, non-empty module (#8619).
  assert.match(driverFactory, /^export function createSyncDriverFactory\(/m);

  // The production loader must be the literal-specifier wrapper, never `_require`
  // itself — passing `_require` through the `load` parameter is exactly what makes
  // webpack substitute its missing-module stub.
  assert.match(driverFactory, /^const openSyncDriver = createSyncDriverFactory\(\w+\);$/m);
  assert.match(driverFactory, /^export function tryOpenSync\($/m);
  assert.doesNotMatch(driverFactory, /createSyncDriverFactory\(\s*_require\s*\)/);

  // Every driver the cascade can ask for needs a direct `_require("<literal>")` so
  // webpack emits a real external for it.
  for (const moduleName of ["bun:sqlite", "better-sqlite3", "node:sqlite"]) {
    assert.ok(
      driverFactory.includes(`_require("${moduleName}")`),
      `driverFactory must call _require("${moduleName}") with a literal specifier so webpack emits an external for it`
    );
  }
});
