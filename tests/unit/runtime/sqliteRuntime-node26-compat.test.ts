import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Regression guard for upstream PR decolua/9router#1827 (issue #1812):
// better-sqlite3 < 12.10.1 ships no prebuilt binary for Node 26 (ABI 147),
// causing "Could not locate the bindings file" on startup. The pinned runtime
// versions MUST be >= 12.10.1 so omniroute boots on Node 26.x.
const MIN = [12, 10, 1] as const;

function parseSemver(v: string): [number, number, number] {
  const m = v.match(/(\d+)\.(\d+)\.(\d+)/);
  assert.ok(m, `version "${v}" must contain semver`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function gte(a: readonly [number, number, number], b: readonly [number, number, number]) {
  for (let i = 0; i < 3; i++) {
    if (a[i] > b[i]) return true;
    if (a[i] < b[i]) return false;
  }
  return true;
}

function readPin(file: string): string {
  const src = readFileSync(join(process.cwd(), file), "utf8");
  const m = src.match(/BETTER_SQLITE3_VERSION\s*=\s*["'`]([^"'`]+)["'`]/);
  assert.ok(m, `BETTER_SQLITE3_VERSION not found in ${file}`);
  return m[1];
}

test("bin/cli/runtime/nativeDeps.mjs pins better-sqlite3 >= 12.10.1 (Node 26 prebuilt)", () => {
  const pin = readPin("bin/cli/runtime/nativeDeps.mjs");
  assert.ok(gte(parseSemver(pin), MIN), `pin "${pin}" must be >= 12.10.1`);
});

test("bin/cli/runtime/sqliteRuntime.mjs pins better-sqlite3 >= 12.10.1 (Node 26 prebuilt)", () => {
  const pin = readPin("bin/cli/runtime/sqliteRuntime.mjs");
  assert.ok(gte(parseSemver(pin), MIN), `pin "${pin}" must be >= 12.10.1`);
});
