/**
 * Issue #6848 — Auto-cleanup for telemetry tables that grow without bound.
 *
 * domain_cost_history, compression_cache_stats, xp_audit_log, and
 * compression_run_telemetry had no retention cleanup, causing unbounded
 * DB growth and OOM crashes on relays with heavy traffic.
 */

import test from "node:test";
import assert from "node:assert/strict";
import Database from "better-sqlite3";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const TEST_DIR = join(tmpdir(), `omniroute-test-6848-${Date.now()}`);

function createTestDb(): Database.Database {
  mkdirSync(TEST_DIR, { recursive: true });
  const db = new Database(join(TEST_DIR, "test.db"));

  db.exec(`
    CREATE TABLE IF NOT EXISTS domain_cost_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      api_key_id TEXT NOT NULL,
      cost REAL NOT NULL,
      timestamp INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS compression_cache_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider TEXT NOT NULL,
      model TEXT NOT NULL DEFAULT '',
      compression_mode TEXT NOT NULL,
      cache_control_present INTEGER NOT NULL DEFAULT 0,
      estimated_cache_hit INTEGER NOT NULL DEFAULT 0,
      tokens_saved_compression INTEGER NOT NULL DEFAULT 0,
      tokens_saved_caching INTEGER NOT NULL DEFAULT 0,
      net_savings INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS xp_audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      api_key_id TEXT NOT NULL,
      action TEXT NOT NULL,
      xp_earned INTEGER NOT NULL,
      metadata TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

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
    );
  `);

  return db;
}

const DAY = 86_400; // seconds

test("#6848 domain_cost_history: deletes rows older than retention window", () => {
  const db = createTestDb();
  try {
    const now = Math.floor(Date.now() / 1000);

    db.prepare(
      "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
    ).run("key1", 1.0, now - 40 * DAY);
    db.prepare(
      "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
    ).run("key1", 2.0, now - 40 * DAY);
    db.prepare(
      "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
    ).run("key1", 3.0, now - 40 * DAY);
    db.prepare(
      "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
    ).run("key1", 4.0, now - 5 * DAY);
    db.prepare(
      "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
    ).run("key1", 5.0, now - 5 * DAY);

    const cutoff = now - 30 * DAY;
    const result = db.prepare("DELETE FROM domain_cost_history WHERE timestamp < ?").run(cutoff);

    assert.strictEqual(result.changes, 3);

    const remaining = db.prepare("SELECT COUNT(*) as count FROM domain_cost_history").get() as {
      count: number;
    };
    assert.strictEqual(remaining.count, 2);
  } finally {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
});

test("#6848 compression_cache_stats: deletes rows older than retention window", () => {
  const db = createTestDb();
  try {
    const oldDate = new Date(Date.now() - 40 * DAY * 1000).toISOString();
    const recentDate = new Date(Date.now() - 5 * DAY * 1000).toISOString();

    db.prepare(
      "INSERT INTO compression_cache_stats (provider, compression_mode, created_at) VALUES (?, ?, ?)"
    ).run("openai", "auto", oldDate);
    db.prepare(
      "INSERT INTO compression_cache_stats (provider, compression_mode, created_at) VALUES (?, ?, ?)"
    ).run("openai", "auto", oldDate);
    db.prepare(
      "INSERT INTO compression_cache_stats (provider, compression_mode, created_at) VALUES (?, ?, ?)"
    ).run("anthropic", "auto", recentDate);

    const cutoff = new Date(Date.now() - 30 * DAY * 1000).toISOString();
    const result = db
      .prepare("DELETE FROM compression_cache_stats WHERE created_at < ?")
      .run(cutoff);

    assert.strictEqual(result.changes, 2);

    const remaining = db.prepare("SELECT COUNT(*) as count FROM compression_cache_stats").get() as {
      count: number;
    };
    assert.strictEqual(remaining.count, 1);
  } finally {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
});

test("#6848 xp_audit_log: deletes rows older than retention window", () => {
  const db = createTestDb();
  try {
    const oldDate = new Date(Date.now() - 40 * DAY * 1000).toISOString();
    const recentDate = new Date(Date.now() - 5 * DAY * 1000).toISOString();

    db.prepare(
      "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, ?, ?, ?)"
    ).run("key1", "login", 10, oldDate);
    db.prepare(
      "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, ?, ?, ?)"
    ).run("key1", "login", 10, oldDate);
    db.prepare(
      "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, ?, ?, ?)"
    ).run("key1", "login", 10, oldDate);
    db.prepare(
      "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, ?, ?, ?)"
    ).run("key1", "login", 10, recentDate);

    const cutoff = new Date(Date.now() - 30 * DAY * 1000).toISOString();
    const result = db.prepare("DELETE FROM xp_audit_log WHERE created_at < ?").run(cutoff);

    assert.strictEqual(result.changes, 3);

    const remaining = db.prepare("SELECT COUNT(*) as count FROM xp_audit_log").get() as {
      count: number;
    };
    assert.strictEqual(remaining.count, 1);
  } finally {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
});

test("#6848 compression_run_telemetry: deletes rows older than retention window", () => {
  const db = createTestDb();
  try {
    const now = Math.floor(Date.now() / 1000);

    db.prepare(
      "INSERT INTO compression_run_telemetry (timestamp, tokens_before, tokens_after) VALUES (?, ?, ?)"
    ).run(now - 40 * DAY, 1000, 500);
    db.prepare(
      "INSERT INTO compression_run_telemetry (timestamp, tokens_before, tokens_after) VALUES (?, ?, ?)"
    ).run(now - 40 * DAY, 2000, 800);
    db.prepare(
      "INSERT INTO compression_run_telemetry (timestamp, tokens_before, tokens_after) VALUES (?, ?, ?)"
    ).run(now - 5 * DAY, 1500, 600);

    const cutoff = now - 30 * DAY;
    const result = db
      .prepare("DELETE FROM compression_run_telemetry WHERE timestamp < ?")
      .run(cutoff);

    assert.strictEqual(result.changes, 2);

    const remaining = db
      .prepare("SELECT COUNT(*) as count FROM compression_run_telemetry")
      .get() as { count: number };
    assert.strictEqual(remaining.count, 1);
  } finally {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
});

test("#6848 no rows deleted when all data is within retention", () => {
  const db = createTestDb();
  try {
    const now = Math.floor(Date.now() / 1000);
    const recentISO = new Date().toISOString();

    db.prepare(
      "INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)"
    ).run("k", 1, now - DAY);
    db.prepare(
      "INSERT INTO compression_cache_stats (provider, compression_mode, created_at) VALUES (?, ?, ?)"
    ).run("p", "auto", recentISO);
    db.prepare(
      "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, ?, ?, ?)"
    ).run("k", "a", 5, recentISO);
    db.prepare(
      "INSERT INTO compression_run_telemetry (timestamp, tokens_before, tokens_after) VALUES (?, ?, ?)"
    ).run(now - DAY, 100, 50);

    const cutoffEpoch = now - 30 * DAY;
    const cutoffISO = new Date(Date.now() - 30 * DAY * 1000).toISOString();

    assert.strictEqual(
      db.prepare("DELETE FROM domain_cost_history WHERE timestamp < ?").run(cutoffEpoch).changes,
      0
    );
    assert.strictEqual(
      db.prepare("DELETE FROM compression_cache_stats WHERE created_at < ?").run(cutoffISO).changes,
      0
    );
    assert.strictEqual(
      db.prepare("DELETE FROM xp_audit_log WHERE created_at < ?").run(cutoffISO).changes,
      0
    );
    assert.strictEqual(
      db.prepare("DELETE FROM compression_run_telemetry WHERE timestamp < ?").run(cutoffEpoch)
        .changes,
      0
    );
  } finally {
    db.close();
    rmSync(TEST_DIR, { recursive: true, force: true });
  }
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
