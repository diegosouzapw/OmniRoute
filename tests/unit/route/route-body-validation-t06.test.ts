/**
 * Guard for the t06:route-validation gate (Hard Rule #7 — always validate inputs
 * with Zod schemas).
 *
 * The gate (scripts/check/check-route-validation.mjs) is a source scan: any
 * `route.ts` under src/app/api that calls `request.json()` must also call
 * `validateBody()` or `.safeParse()`. It has NO allowlist, so a route that
 * hand-rolls `typeof x === "string"` checks passes review but fails CI — which
 * is exactly how four routes (#9445 marketplace install, #8523's three Dario
 * admin routes) landed on release/v3.8.50 and kept the branch out of
 * release-green (#9737).
 *
 * This test runs the same rule inside the unit suite so the violation surfaces
 * on the PR that introduces it, instead of on the next base-red sweep.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "..", "..", "..");
const API_ROOT = path.join(REPO_ROOT, "src", "app", "api");

function collectRouteFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectRouteFiles(full));
    } else if (entry.isFile() && entry.name === "route.ts") {
      files.push(full);
    }
  }
  return files;
}

test("every API route reading request.json() validates it with Zod (t06)", () => {
  const offenders: string[] = [];

  for (const file of collectRouteFiles(API_ROOT)) {
    const source = fs.readFileSync(file, "utf8");
    if (!/request\.json\s*\(/.test(source)) continue;
    if (/\bvalidateBody\s*\(/.test(source) || /\.safeParse\s*\(/.test(source)) continue;
    offenders.push(path.relative(REPO_ROOT, file));
  }

  assert.deepEqual(
    offenders,
    [],
    `routes call request.json() without validateBody()/.safeParse() — hand-rolled ` +
      `typeof checks do not satisfy Hard Rule #7 and fail the t06 CI gate:\n  ` +
      offenders.join("\n  ")
  );
});
