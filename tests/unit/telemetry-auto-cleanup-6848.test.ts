/**
 * Issue #6848 — Auto-cleanup for telemetry tables that grow without bound.
 *
 * domain_cost_history, compression_cache_stats, xp_audit_log, and
 * compression_run_telemetry had no retention cleanup, causing unbounded
 * DB growth and OOM crashes on relays with heavy traffic.
 *
 * These tests call the REAL cleanup functions against a real SQLite adapter
 * (seeded with test data). If the production DELETE logic breaks, these
 * tests WILL fail.
 *
 * DATA_DIR isolation is self-contained (mkdtempSync below), not dependent on
 * the test:unit harness's `--import ./tests/_setup/isolateDataDir.ts`. This
 * file calls real DELETE-based cleanup functions against getDbInstance(),
 * which resolves to the developer's real ~/.omniroute/storage.sqlite when
 * DATA_DIR is unset — running this file directly (as documented under
 * "Running Tests": `node --import tsx/esm --test tests/unit/<file>.test.ts`)
 * would otherwise delete real rows from that database, not test rows. Do NOT
 * remove the DATA_DIR override below.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-6848-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Import the real functions — they use getDbInstance(), which resolves to the
// isolated temp DB created above (set before this import so the module's
// first getDbInstance() call already sees the isolated DATA_DIR).
const {
  cleanupDomainCostHistory,
  cleanupCompressionCacheStats,
  cleanupXpAuditLog,
  cleanupCompressionRunTelemetry,
} = await import("../../src/lib/db/cleanup.ts");

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

// Repo test rule: DB-touching tests must close the handle in test.after(),
// or the native test runner can hang indefinitely on a dangling connection.
test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const DAY = 86_400; // seconds

/** Ensure compression_run_telemetry table exists (created lazily in production). */
function ensureTelemetryTable(): void {
  const db = getDbInstance()!;
  db.exec(`
    CREATE TABLE IF NOT EXISTS compression_run_telemetry (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp INTEGER NOT NULL,
      request_id TEXT,
      model TEXT,
      provider TEXT,
      source TEXT,
      tokens_before INTEGER NOT NULL,
      tokens_after INTEGER NOT NULL,
      ratio REAL,
      cost_delta REAL,
      output_styles TEXT,
      output_style_bypass TEXT,
      output_tokens INTEGER
    )
  `);
}

// ─── Tests ───────────────────────────────────────────────────────────────

test("#6848 cleanupDomainCostHistory: deletes rows older than retention window", async () => {
  const db = getDbInstance()!;
  const now = Math.floor(Date.now() / 1000);
  const insert = db.prepare(
    "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
  );

  // 3 old (40 days ago), 2 recent (5 days ago)
  insert.run("key1", 1.0, now - 40 * DAY);
  insert.run("key1", 2.0, now - 40 * DAY);
  insert.run("key1", 3.0, now - 40 * DAY);
  insert.run("key1", 4.0, now - 5 * DAY);
  insert.run("key1", 5.0, now - 5 * DAY);

  const result = await cleanupDomainCostHistory();

  assert.strictEqual(result.deleted, 3);
  assert.strictEqual(result.errors, 0);

  const remaining = db.prepare("SELECT COUNT(*) as cnt FROM domain_cost_history").get() as {
    cnt: number;
  };
  assert.strictEqual(remaining.cnt, 2);
});

test("#6848 cleanupCompressionCacheStats: deletes rows older than retention window", async () => {
  const db = getDbInstance()!;
  const oldDate = new Date(Date.now() - 40 * DAY * 1000).toISOString();
  const recentDate = new Date(Date.now() - 5 * DAY * 1000).toISOString();
  const insert = db.prepare(
    "INSERT INTO compression_cache_stats (provider, compression_mode, created_at) VALUES (?, ?, ?)"
  );

  insert.run("openai", "auto", oldDate);
  insert.run("openai", "auto", oldDate);
  insert.run("anthropic", "auto", recentDate);

  const result = await cleanupCompressionCacheStats();

  assert.strictEqual(result.deleted, 2);
  assert.strictEqual(result.errors, 0);

  const remaining = db.prepare("SELECT COUNT(*) as cnt FROM compression_cache_stats").get() as {
    cnt: number;
  };
  assert.strictEqual(remaining.cnt, 1);
});

test("#6848 cleanupXpAuditLog: deletes rows older than retention window", async () => {
  const db = getDbInstance()!;
  const oldDate = new Date(Date.now() - 40 * DAY * 1000).toISOString();
  const recentDate = new Date(Date.now() - 5 * DAY * 1000).toISOString();
  const insert = db.prepare(
    "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, ?, ?, ?)"
  );

  insert.run("key1", "login", 10, oldDate);
  insert.run("key1", "login", 10, oldDate);
  insert.run("key1", "login", 10, oldDate);
  insert.run("key1", "login", 10, recentDate);

  const result = await cleanupXpAuditLog();

  assert.strictEqual(result.deleted, 3);
  assert.strictEqual(result.errors, 0);

  const remaining = db.prepare("SELECT COUNT(*) as cnt FROM xp_audit_log").get() as { cnt: number };
  assert.strictEqual(remaining.cnt, 1);
});

test("#6848 cleanupCompressionRunTelemetry: deletes rows older than retention window", async () => {
  ensureTelemetryTable();
  const db = getDbInstance()!;
  const now = Math.floor(Date.now() / 1000);
  const insert = db.prepare(
    "INSERT INTO compression_run_telemetry (timestamp, tokens_before, tokens_after) VALUES (?, ?, ?)"
  );

  insert.run(now - 40 * DAY, 1000, 500);
  insert.run(now - 40 * DAY, 2000, 800);
  insert.run(now - 5 * DAY, 1500, 600);

  const result = await cleanupCompressionRunTelemetry();

  assert.strictEqual(result.deleted, 2);
  assert.strictEqual(result.errors, 0);

  const remaining = db.prepare("SELECT COUNT(*) as cnt FROM compression_run_telemetry").get() as {
    cnt: number;
  };
  assert.strictEqual(remaining.cnt, 1);
});

test("#6848 no rows deleted when all data is within retention window (calls all 4 real functions)", async () => {
  ensureTelemetryTable();
  const db = getDbInstance()!;
  const now = Math.floor(Date.now() / 1000);
  const recentISO = new Date().toISOString();

  db.prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)").run(
    "k",
    1,
    now - DAY
  );
  db.prepare(
    "INSERT INTO compression_cache_stats (provider, compression_mode, created_at) VALUES (?, ?, ?)"
  ).run("p", "auto", recentISO);
  db.prepare(
    "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, ?, ?, ?)"
  ).run("k", "a", 5, recentISO);
  db.prepare(
    "INSERT INTO compression_run_telemetry (timestamp, tokens_before, tokens_after) VALUES (?, ?, ?)"
  ).run(now - DAY, 100, 50);

  const r1 = await cleanupDomainCostHistory();
  const r2 = await cleanupCompressionCacheStats();
  const r3 = await cleanupXpAuditLog();
  const r4 = await cleanupCompressionRunTelemetry();

  assert.strictEqual(r1.deleted, 0);
  assert.strictEqual(r2.deleted, 0);
  assert.strictEqual(r3.deleted, 0);
  assert.strictEqual(r4.deleted, 0);
});

test("#6848 DEFAULT_DATABASE_SETTINGS has new retention keys", async () => {
  const mod = await import("../../src/types/databaseSettings.ts");
  const defaults = mod.DEFAULT_DATABASE_SETTINGS.retention;

  assert.ok(typeof defaults.domainCostHistory === "number");
  assert.ok(typeof defaults.compressionCacheStats === "number");
  assert.ok(typeof defaults.xpAuditLog === "number");
  assert.ok(typeof defaults.compressionRunTelemetry === "number");

  assert.strictEqual(defaults.domainCostHistory, 30);
  assert.strictEqual(defaults.compressionCacheStats, 30);
  assert.strictEqual(defaults.xpAuditLog, 30);
  assert.strictEqual(defaults.compressionRunTelemetry, 30);
});
