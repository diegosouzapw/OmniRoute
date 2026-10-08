// Shared guard for unit tests that construct a real better-sqlite3 Database as a
// test fixture (e.g. seeding a legacy on-disk schema before exercising the
// migration runner). better-sqlite3 is a native addon: production and CI load
// it fine, but some sandboxes/dev boxes ship a system glibc older than the
// prebuilt binary requires (e.g. "GLIBC_2.29 not found"), so `new Database(...)`
// throws ERR_DLOPEN_FAILED at fixture-construction time. That is an environment
// limitation, NOT a defect in the code under test — the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 can't load, so the app keeps
// working; only tests that reach for better-sqlite3 DIRECTLY (to build a
// driver-specific fixture) are affected.
//
// Tests import `betterSqlite3Available` to decide whether to run or to skip with
// a clear, documented reason. In CI (where better-sqlite3 loads) the tests run
// normally; only the constrained sandbox skips them.
//
// Usage:
//   import { betterSqlite3Available, BETTER_SQLITE3_SKIP_REASON } from "./_helpers/betterSqlite3Availability";
//   const canUseBetterSqlite3 = betterSqlite3Available();
//   test("...", { skip: canUseBetterSqlite3 ? false : BETTER_SQLITE3_SKIP_REASON }, () => { ... });

import { createRequire } from "node:module";

export const BETTER_SQLITE3_SKIP_REASON =
  "better-sqlite3 native addon cannot load in this environment (e.g. system " +
  "glibc older than the prebuilt binary requires — 'GLIBC_2.29 not found'). " +
  "This is a sandbox/environment limitation, not a code defect: the runtime " +
  "cascades to node:sqlite/sql.js, and CI runs this test with a working " +
  "better-sqlite3.";

let cached: boolean | null = null;

/**
 * Returns true when a real better-sqlite3 Database can be constructed in the
 * current environment. Result is memoized. Never throws.
 */
export function betterSqlite3Available(): boolean {
  if (cached !== null) return cached;
  try {
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3");
    const db = new Database(":memory:");
    db.close();
    cached = true;
  } catch {
    cached = false;
  }
  return cached;
}

export type BetterSqlite3Constructor = typeof import("better-sqlite3");

/**
 * Loads the better-sqlite3 constructor when it can actually open a database, or
 * returns null. Use this instead of a top-level `import Database from
 * "better-sqlite3"`: a static import fails the whole file at load time when the
 * native addon is missing, before any `skip` option can take effect.
 */
export function loadBetterSqlite3(): BetterSqlite3Constructor | null {
  if (!betterSqlite3Available()) return null;
  const require = createRequire(import.meta.url);
  return require("better-sqlite3") as BetterSqlite3Constructor;
}
