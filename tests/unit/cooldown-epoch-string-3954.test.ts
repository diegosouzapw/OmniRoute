/**
 * TDD regression for #3954: the router keeps selecting rate-limited (429)
 * accounts because the connection cooldown is not respected.
 *
 * Root cause: `rate_limited_until` is a TEXT column, but the Antigravity
 * full-quota path (`setConnectionRateLimitUntil`) writes a raw epoch NUMBER.
 * SQLite TEXT affinity coerces it to a numeric string like "1781696905131.0".
 * The selection filter `isAccountUnavailable` then does
 * `new Date("1781696905131.0")` → Invalid Date → NaN, so `NaN > Date.now()`
 * is false and the still-cooling connection is NOT skipped → client timeouts.
 *
 * The fix hardens the cooldown read predicates to tolerate numeric-epoch
 * strings (in addition to ISO strings / Date / number), without changing the
 * write path. ISO behavior is preserved (regression guard).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-3954-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { isAccountUnavailable, getEarliestRateLimitedUntil, filterAvailableAccounts } = await import(
  "../../open-sse/services/accountFallback.ts"
);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const HOUR = 3_600_000;

// ── Pure predicate: the exact chokepoint account selection uses ──────────────

test("#3954 isAccountUnavailable: numeric-epoch string (future) is treated as unavailable", () => {
  assert.equal(isAccountUnavailable(String(Date.now() + HOUR)), true);
});

test("#3954 isAccountUnavailable: SQLite REAL→TEXT '.0' epoch string (future) is unavailable", () => {
  assert.equal(isAccountUnavailable(`${Date.now() + HOUR}.0`), true);
});

test("#3954 isAccountUnavailable: numeric-epoch string in the past is available again", () => {
  assert.equal(isAccountUnavailable(String(Date.now() - HOUR)), false);
  assert.equal(isAccountUnavailable(`${Date.now() - HOUR}.0`), false);
});

test("#3954 isAccountUnavailable: ISO strings still work (no regression)", () => {
  assert.equal(isAccountUnavailable(new Date(Date.now() + HOUR).toISOString()), true);
  assert.equal(isAccountUnavailable(new Date(Date.now() - HOUR).toISOString()), false);
});

test("#3954 isAccountUnavailable: empty/null/Date inputs behave", () => {
  assert.equal(isAccountUnavailable(null), false);
  assert.equal(isAccountUnavailable(undefined), false);
  assert.equal(isAccountUnavailable(""), false);
  assert.equal(isAccountUnavailable(new Date(Date.now() + HOUR)), true);
});

test("#3954 getEarliestRateLimitedUntil: honors numeric-epoch-string cooldowns", () => {
  const soon = Date.now() + 30_000;
  const earliest = getEarliestRateLimitedUntil([
    { rateLimitedUntil: String(Date.now() + 90_000) },
    { rateLimitedUntil: String(soon) },
  ]);
  assert.equal(earliest, new Date(soon).toISOString());
});

test("#3954 filterAvailableAccounts: excludes a numeric-epoch-string future cooldown", () => {
  const accts = [
    { id: "cooling", rateLimitedUntil: String(Date.now() + HOUR) },
    { id: "healthy", rateLimitedUntil: null },
  ];
  const available = filterAvailableAccounts(accts as never);
  assert.deepEqual(
    available.map((a) => a.id),
    ["healthy"]
  );
});

// ── End-to-end: the write coercion that triggers the real bug ───────────────

test("#3954 setConnectionRateLimitUntil stores a numeric string that selection still honors", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "AG 3954",
  });
  const connId = (conn as { id: string }).id;
  providersDb.setConnectionRateLimitUntil(connId, Date.now() + HOUR);

  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { get: (id: string) => { rate_limited_until: unknown } | undefined };
  };
  const row = db
    .prepare("SELECT rate_limited_until FROM provider_connections WHERE id = ?")
    .get(connId);
  const stored = row?.rate_limited_until;

  // It is persisted in the numeric-string form (NOT ISO) — this is the trap.
  assert.ok(
    /^\d+(\.\d+)?$/.test(String(stored)),
    `expected numeric epoch string, got ${String(stored)}`
  );
  // The selection filter must still treat this connection as unavailable.
  assert.equal(isAccountUnavailable(String(stored)), true);
});
