import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationPath = path.join(
  __dirname,
  "../../src/lib/db/migrations/126_windsurf_to_devin_desktop.sql"
);

test("migration 126 for the Devin Desktop provider exists", () => {
  assert.equal(fs.existsSync(migrationPath), true);
});

function createDb(): Database.Database {
  const db = new Database(":memory:");
  db.exec(`
    CREATE TABLE provider_connections (
      id TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      default_model TEXT
    );
    CREATE TABLE key_value (
      namespace TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      PRIMARY KEY (namespace, key)
    );
    CREATE TABLE combos (id TEXT PRIMARY KEY, data TEXT NOT NULL);
    CREATE TABLE tier_assignments (
      provider TEXT NOT NULL,
      model TEXT NOT NULL,
      tier TEXT NOT NULL,
      cost_per_1m_input REAL DEFAULT 0,
      cost_per_1m_output REAL DEFAULT 0,
      has_free_tier INTEGER DEFAULT 0,
      free_quota_limit INTEGER,
      reason TEXT,
      updated_at TEXT,
      PRIMARY KEY (provider, model)
    );
    CREATE TABLE provider_plans (
      connection_id TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      dimensions_json TEXT NOT NULL,
      source TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE model_context_overrides (
      provider TEXT NOT NULL,
      model_id TEXT NOT NULL,
      real_context INTEGER NOT NULL,
      source TEXT NOT NULL,
      refreshed_at TEXT NOT NULL,
      PRIMARY KEY (provider, model_id)
    );
    CREATE TABLE model_capability_overrides (
      provider TEXT NOT NULL,
      model_id TEXT NOT NULL,
      override_key TEXT NOT NULL,
      override_value TEXT NOT NULL,
      refreshed_at TEXT NOT NULL,
      PRIMARY KEY (provider, model_id, override_key)
    );
    CREATE TABLE session_account_affinity (
      session_key TEXT NOT NULL,
      provider TEXT NOT NULL,
      connection_id TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      last_seen_at INTEGER NOT NULL,
      PRIMARY KEY (session_key, provider)
    );
    CREATE TABLE group_model_permissions (
      id TEXT PRIMARY KEY,
      provider TEXT
    );
    CREATE TABLE upstream_proxy_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider_id TEXT NOT NULL UNIQUE,
      mode TEXT NOT NULL,
      cliproxyapi_model_mapping TEXT,
      native_priority INTEGER NOT NULL,
      cliproxyapi_priority INTEGER NOT NULL,
      enabled INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE discovery_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider_id TEXT NOT NULL,
      method TEXT NOT NULL,
      endpoint TEXT,
      auth_type TEXT,
      models TEXT,
      rate_limit TEXT,
      feasibility INTEGER,
      risk_level TEXT,
      status TEXT,
      notes TEXT,
      discovered_at TEXT,
      verified_at TEXT,
      UNIQUE(provider_id, method, endpoint)
    );
    CREATE TABLE usage_history (id INTEGER PRIMARY KEY, provider TEXT, model TEXT);
    CREATE TABLE call_logs (
      id TEXT PRIMARY KEY,
      provider TEXT,
      model TEXT,
      requested_model TEXT
    );
    CREATE TABLE proxy_logs (id TEXT PRIMARY KEY, provider TEXT);
    CREATE TABLE quota_snapshots (id INTEGER PRIMARY KEY, provider TEXT);
    CREATE TABLE provider_quota_reset_events (id INTEGER PRIMARY KEY, provider TEXT);
    CREATE TABLE session_model_history (id INTEGER PRIMARY KEY, provider TEXT, model_str TEXT);
  `);
  return db;
}

function rows(db: Database.Database, table: string): unknown[] {
  return db.prepare(`SELECT * FROM ${table} ORDER BY 1, 2`).all();
}

test("migration 126 moves current settings safely and preserves historical records", () => {
  const migration = fs.readFileSync(migrationPath, "utf8");
  const db = createDb();
  db.exec(`
    INSERT INTO provider_connections VALUES
      ('legacy-connection', 'windsurf', 'windsurf/swe-1-7'),
      ('other-connection', 'github', 'github/gpt-5');

    INSERT INTO key_value VALUES
      ('customModels', 'windsurf', '["legacy-custom"]'),
      ('customModels', 'devin-desktop', '["keep-destination"]'),
      ('syncedAvailableModels', 'windsurf', '["swe-1-7"]'),
      ('modelCompatOverrides', 'windsurf', '{"swe-1-7":true}');

    INSERT INTO combos VALUES
      ('combo-1', '{"models":[{"provider":"windsurf","providerId":"windsurf","model":"windsurf/swe-1-7"}]}');

    INSERT INTO tier_assignments
      (provider, model, tier, reason, updated_at) VALUES
      ('windsurf', 'swe-1-7', 'free', 'legacy', '2026-01-01'),
      ('devin-desktop', 'swe-1-7', 'premium', 'keep-destination', '2026-02-01'),
      ('windsurf', 'gpt-5-6-sol-high', 'premium', 'move', '2026-01-01');

    INSERT INTO provider_plans VALUES
      ('legacy-connection', 'windsurf', '[]', 'manual', '2026-01-01');

    INSERT INTO model_context_overrides VALUES
      ('windsurf', 'swe-1-7', 100, 'manual', '2026-01-01'),
      ('devin-desktop', 'swe-1-7', 200, 'manual', '2026-02-01');

    INSERT INTO model_capability_overrides VALUES
      ('windsurf', 'swe-1-7', 'vision', 'false', '2026-01-01'),
      ('devin-desktop', 'swe-1-7', 'vision', 'true', '2026-02-01');

    INSERT INTO session_account_affinity VALUES
      ('session-1', 'windsurf', 'legacy-connection', 1, 2),
      ('session-1', 'devin-desktop', 'destination-connection', 3, 4);

    INSERT INTO group_model_permissions VALUES ('permission-1', 'windsurf');

    INSERT INTO upstream_proxy_config
      (provider_id, mode, native_priority, cliproxyapi_priority, enabled, created_at, updated_at)
      VALUES
      ('windsurf', 'native', 1, 2, 1, '2026-01-01', '2026-01-01'),
      ('devin-desktop', 'fallback', 1, 2, 1, '2026-02-01', '2026-02-01');

    INSERT INTO discovery_results
      (provider_id, method, endpoint, status, notes) VALUES
      ('windsurf', 'public_api', 'https://server.codeium.com', 'verified', 'legacy'),
      ('devin-desktop', 'public_api', 'https://server.codeium.com', 'verified', 'keep');

    INSERT INTO usage_history VALUES (1, 'windsurf', 'swe-1-7');
    INSERT INTO call_logs VALUES (1, 'windsurf', 'swe-1-7', 'windsurf/swe-1-7');
    INSERT INTO proxy_logs VALUES (1, 'windsurf');
    INSERT INTO quota_snapshots VALUES (1, 'windsurf');
    INSERT INTO provider_quota_reset_events VALUES (1, 'windsurf');
    INSERT INTO session_model_history VALUES (1, 'windsurf', 'windsurf/swe-1-7');
  `);

  db.exec(migration);

  assert.deepEqual(rows(db, "provider_connections"), [
    { id: "legacy-connection", provider: "devin-desktop", default_model: "devin-desktop/swe-1-7" },
    { id: "other-connection", provider: "github", default_model: "github/gpt-5" },
  ]);
  assert.deepEqual(
    db
      .prepare("SELECT value FROM key_value WHERE namespace='customModels' AND key='devin-desktop'")
      .get(),
    { value: '["keep-destination"]' }
  );
  assert.equal(db.prepare("SELECT 1 FROM key_value WHERE key='windsurf'").get(), undefined);

  const combo = db.prepare("SELECT data FROM combos WHERE id='combo-1'").get() as { data: string };
  assert.deepEqual(JSON.parse(combo.data), {
    models: [
      {
        provider: "devin-desktop",
        providerId: "devin-desktop",
        model: "devin-desktop/swe-1-7",
      },
    ],
  });

  assert.deepEqual(
    db
      .prepare(
        "SELECT tier, reason FROM tier_assignments WHERE provider='devin-desktop' AND model='swe-1-7'"
      )
      .get(),
    { tier: "premium", reason: "keep-destination" }
  );
  assert.deepEqual(
    db.prepare("SELECT provider, model FROM tier_assignments WHERE model='gpt-5-6-sol-high'").get(),
    { provider: "devin-desktop", model: "gpt-5-6-sol-high" }
  );
  assert.deepEqual(
    db
      .prepare("SELECT real_context FROM model_context_overrides WHERE provider='devin-desktop'")
      .get(),
    { real_context: 200 }
  );
  assert.deepEqual(
    db
      .prepare(
        "SELECT override_value FROM model_capability_overrides WHERE provider='devin-desktop'"
      )
      .get(),
    { override_value: "true" }
  );
  assert.deepEqual(
    db
      .prepare(
        "SELECT connection_id FROM session_account_affinity WHERE session_key='session-1' AND provider='devin-desktop'"
      )
      .get(),
    { connection_id: "destination-connection" }
  );
  assert.deepEqual(
    db.prepare("SELECT mode FROM upstream_proxy_config WHERE provider_id='devin-desktop'").get(),
    { mode: "fallback" }
  );
  assert.deepEqual(
    db.prepare("SELECT notes FROM discovery_results WHERE provider_id='devin-desktop'").get(),
    { notes: "keep" }
  );
  assert.equal(
    db
      .prepare("SELECT provider FROM group_model_permissions WHERE id='permission-1'")
      .pluck()
      .get(),
    "devin-desktop"
  );

  for (const table of [
    "usage_history",
    "call_logs",
    "proxy_logs",
    "quota_snapshots",
    "provider_quota_reset_events",
    "session_model_history",
  ]) {
    assert.equal(db.prepare(`SELECT provider FROM ${table}`).pluck().get(), "windsurf");
  }

  const currentTables = [
    "provider_connections",
    "key_value",
    "combos",
    "tier_assignments",
    "provider_plans",
    "model_context_overrides",
    "model_capability_overrides",
    "session_account_affinity",
    "group_model_permissions",
    "upstream_proxy_config",
    "discovery_results",
  ];
  const afterFirst = JSON.stringify(currentTables.map((table) => rows(db, table)));
  db.exec(migration);
  assert.equal(JSON.stringify(currentTables.map((table) => rows(db, table))), afterFirst);

  db.close();
});
