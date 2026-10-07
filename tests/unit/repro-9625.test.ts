/**
 * Issue #9625 — domain_cost_history cleanup cutoff unit mismatch.
 *
 * cleanupDomainCostHistory() computes the cutoff in epoch seconds
 * (Math.floor(Date.now() / 1000)) but the timestamp column stores
 * epoch milliseconds (Date.now()), as inserted by saveCostEntry().
 *
 * This test seeds data using the same format as the production code
 * (milliseconds), then asserts that cleanupDomainCostHistory() correctly
 * deletes rows older than the retention window.
 *
 * Before the fix, the cutoff in seconds was ~1000× smaller than the
 * stored timestamps, so the DELETE WHERE timestamp < cutoff would
 * never match old rows — the cleanup was effectively a no-op.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9625-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { cleanupDomainCostHistory } = await import("../../src/lib/db/cleanup.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const DAY_MS = 86_400_000; // milliseconds

test("#9625 cleanupDomainCostHistory: cutoff in ms matches production timestamps", async () => {
  const db = getDbInstance()!;
  const now = Date.now(); // milliseconds — same as saveCostEntry() default

  const insert = db.prepare(
    "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
  );

  // Seed data using millisecond timestamps (production format).
  // 3 old rows: 40 days ago (should be deleted)
  // 2 recent rows: 5 days ago (should be kept)
  insert.run("key1", 1.0, now - 40 * DAY_MS);
  insert.run("key1", 2.0, now - 40 * DAY_MS);
  insert.run("key1", 3.0, now - 40 * DAY_MS);
  insert.run("key1", 4.0, now - 5 * DAY_MS);
  insert.run("key1", 5.0, now - 5 * DAY_MS);

  const result = await cleanupDomainCostHistory();

  // Before the fix, cutoff was in seconds (~1.7e9) while timestamps
  // are in milliseconds (~1.7e12). The comparison `WHERE ts < 1.7e9`
  // would never match rows with ts ~1.7e12, so nothing was deleted.
  assert.strictEqual(result.deleted, 3, "Should delete 3 old rows (40 days old)");
  assert.strictEqual(result.errors, 0);

  const remaining = db.prepare("SELECT COUNT(*) as cnt FROM domain_cost_history").get() as {
    cnt: number;
  };
  assert.strictEqual(remaining.cnt, 2, "Should keep 2 recent rows (5 days old)");
});

test("#9625 unit mismatch: seconds cutoff would NOT match ms timestamps", () => {
  // Demonstrate the arithmetic bug: a cutoff in seconds is ~1000×
  // smaller than a millisecond timestamp, so the WHERE clause never
  // matches production data.
  const nowMs = Date.now();
  const nowSec = Math.floor(nowMs / 1000);
  const retentionDays = 30;
  const cutoffSec = nowSec - retentionDays * 86_400; // seconds
  const cutoffMs = nowMs - retentionDays * 86_400_000; // milliseconds

  // A row inserted 40 days ago with a millisecond timestamp:
  const oldRowMs = nowMs - 40 * 86_400_000; // ~1.7e12

  // With seconds cutoff: oldRowMs (1.7e12) < cutoffSec (1.7e9) is FALSE
  // because 1.7e12 > 1.7e9 — the row is never matched.
  assert.ok(
    oldRowMs > cutoffSec,
    "Bug: ms timestamp is NOT less than seconds cutoff, so row is never deleted"
  );

  // With milliseconds cutoff: oldRowMs (1.7e12) < cutoffMs (1.7e12) is TRUE
  assert.ok(
    oldRowMs < cutoffMs,
    "Fix: ms timestamp IS less than ms cutoff, so row is correctly deleted"
  );
});
