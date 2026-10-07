/**
 * Issue #14268 — Retention pruning and reset for compression_engine_breakdown.
 *
 * Verifies that:
 * 1. cleanupCompressionEngineBreakdown() deletes rows older than the retention window
 *    (retention.compressionAnalytics, default 30 days) and preserves rows within the window.
 * 2. cleanupCompressionEngineBreakdown() handles missing table gracefully.
 * 3. runAutoCleanup() calls cleanupCompressionEngineBreakdown() and surfaces results.
 * 4. resetUsageHistory() prunes compression_engine_breakdown on period resets and wipes on "all".
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14268-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { cleanupCompressionEngineBreakdown, runAutoCleanup, resetUsageHistory } =
  await import("../../src/lib/db/cleanup.ts");

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const DAY_MS = 86_400_000;

function ensureBreakdownTable(): void {
  const db = getDbInstance()!;
  db.exec(`
    CREATE TABLE IF NOT EXISTS compression_engine_breakdown (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      request_id TEXT,
      engine TEXT NOT NULL,
      original_tokens INTEGER NOT NULL DEFAULT 0,
      compressed_tokens INTEGER NOT NULL DEFAULT 0,
      tokens_saved INTEGER NOT NULL DEFAULT 0,
      duration_ms INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_ceb_engine_ts ON compression_engine_breakdown(engine, timestamp);
    CREATE INDEX IF NOT EXISTS idx_ceb_request ON compression_engine_breakdown(request_id);
  `);
}

test.beforeEach(() => {
  ensureBreakdownTable();
  const db = getDbInstance()!;
  db.exec("DELETE FROM compression_engine_breakdown");
});

test("#14268 cleanupCompressionEngineBreakdown: deletes rows older than retention window", async () => {
  const db = getDbInstance()!;
  const now = Date.now();
  const insert = db.prepare(
    "INSERT INTO compression_engine_breakdown (timestamp, engine, original_tokens, compressed_tokens, tokens_saved) VALUES (?, ?, ?, ?, ?)"
  );

  // 3 old (45 days ago), 2 recent (5 days ago)
  const oldIso = new Date(now - 45 * DAY_MS).toISOString();
  const recentIso = new Date(now - 5 * DAY_MS).toISOString();

  insert.run(oldIso, "rtk", 1000, 400, 600);
  insert.run(oldIso, "caveman", 600, 300, 300);
  insert.run(oldIso, "rtk", 2000, 800, 1200);
  insert.run(recentIso, "rtk", 1500, 600, 900);
  insert.run(recentIso, "caveman", 900, 400, 500);

  const initialCount = (
    db.prepare("SELECT COUNT(*) as c FROM compression_engine_breakdown").get() as { c: number }
  ).c;
  assert.strictEqual(initialCount, 5, "seeded 5 rows");

  const result = await cleanupCompressionEngineBreakdown();

  assert.strictEqual(result.errors, 0, "no errors during cleanup");
  assert.strictEqual(result.deleted, 3, "deleted 3 rows older than 30 days");

  const remaining = db
    .prepare("SELECT timestamp, engine FROM compression_engine_breakdown")
    .all() as Array<{ timestamp: string; engine: string }>;
  assert.strictEqual(remaining.length, 2, "2 recent rows remain");
  for (const row of remaining) {
    assert.strictEqual(row.timestamp, recentIso, "remaining row has recent timestamp");
  }
});

test("#14268 cleanupCompressionEngineBreakdown: gracefully returns if table does not exist", async () => {
  const db = getDbInstance()!;
  db.exec("DROP TABLE IF EXISTS compression_engine_breakdown");

  const result = await cleanupCompressionEngineBreakdown();
  assert.deepStrictEqual(result, { deleted: 0, errors: 0 });
});

test("#14268 runAutoCleanup: includes compressionEngineBreakdown in results", async () => {
  const db = getDbInstance()!;
  const now = Date.now();
  const oldIso = new Date(now - 45 * DAY_MS).toISOString();

  db.prepare(
    "INSERT INTO compression_engine_breakdown (timestamp, engine, original_tokens, compressed_tokens, tokens_saved) VALUES (?, ?, ?, ?, ?)"
  ).run(oldIso, "rtk", 1000, 400, 600);

  const autoResult = await runAutoCleanup();
  assert.ok(
    autoResult.results.compressionEngineBreakdown,
    "compressionEngineBreakdown present in results"
  );
  assert.strictEqual(autoResult.results.compressionEngineBreakdown.deleted, 1);
});

test("#14268 resetUsageHistory: prunes compression_engine_breakdown on period reset and wipes on all", async () => {
  const db = getDbInstance()!;
  const now = Date.now();
  const oldIso = new Date(now - 2 * DAY_MS).toISOString();
  const recentIso = new Date(now - 3600_000).toISOString();

  const insert = db.prepare(
    "INSERT INTO compression_engine_breakdown (timestamp, engine, original_tokens, compressed_tokens, tokens_saved) VALUES (?, ?, ?, ?, ?)"
  );

  insert.run(oldIso, "rtk", 1000, 500, 500);
  insert.run(recentIso, "rtk", 2000, 1000, 1000);

  // 1d period reset deletes row older than 1 day
  const periodResult = await resetUsageHistory("1d");
  assert.strictEqual(periodResult.deletedCompressionEngineBreakdown, 1);

  const countAfterPeriod = (
    db.prepare("SELECT COUNT(*) as c FROM compression_engine_breakdown").get() as { c: number }
  ).c;
  assert.strictEqual(countAfterPeriod, 1);

  // "all" wipes remaining
  const allResult = await resetUsageHistory("all");
  assert.strictEqual(allResult.deletedCompressionEngineBreakdown, 1);

  const countAfterAll = (
    db.prepare("SELECT COUNT(*) as c FROM compression_engine_breakdown").get() as { c: number }
  ).c;
  assert.strictEqual(countAfterAll, 0);
});
