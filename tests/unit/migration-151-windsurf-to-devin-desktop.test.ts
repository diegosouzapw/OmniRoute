// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs or exercises a real better-sqlite3-backed SQLite database.
// better-sqlite3 is a native addon; production and CI load it normally, but some
// sandboxes/dev boxes ship a system glibc older than the prebuilt binary requires
// ("GLIBC_2.29 not found"), so the native module fails to dlopen and any test that
// reaches better-sqlite3 directly (or asserts stdout that the load-failure warning
// would pollute) fails HERE while passing in CI. This is a known environment
// limitation, not a defect in the code under test: the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 is unavailable. See
// tests/unit/_helpers/betterSqlite3Availability.ts for a guard helper.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationDir = path.join(__dirname, "../../src/lib/db/migrations");
const migrationPath = path.join(migrationDir, "151_windsurf_to_devin_desktop.sql");
const schemaMigrations = [
  "001_initial_schema.sql",
  "002_mcp_a2a_tables.sql",
  "008_registered_keys.sql",
  "013_quota_snapshots.sql",
  "017_version_manager_upstream_proxy.sql",
  "050_session_account_affinity.sql",
  "059_manifest_routing.sql",
  "064_create_session_model_history.sql",
  "066_api_key_groups.sql",
  "074_discovery_results.sql",
  "079_provider_plans.sql",
  "108_provider_quota_reset_events.sql",
  "110_model_context_overrides.sql",
  "119_model_capability_overrides.sql",
];

test("migration 151 for the Devin Desktop provider exists", () => {
  assert.equal(fs.existsSync(migrationPath), true);
});

function createDb(): Database.Database {
  const db = new Database(":memory:");
  for (const filename of schemaMigrations) {
    db.exec(fs.readFileSync(path.join(migrationDir, filename), "utf8"));
  }
  return db;
}

function rows(db: Database.Database, table: string): unknown[] {
  return db.prepare(`SELECT * FROM ${table} ORDER BY 1, 2`).all();
}

test("migration 151 moves provider aliases when the destination is absent", () => {
  const migration = fs.readFileSync(migrationPath, "utf8");
  const db = createDb();
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('providerAliases', 'windsurf', ?)"
  ).run('{"fast":"swe-1-7"}');

  db.exec(migration);

  assert.deepEqual(
    db.prepare("SELECT key, value FROM key_value WHERE namespace='providerAliases'").all(),
    [{ key: "devin-desktop", value: '{"fast":"swe-1-7"}' }]
  );
  db.close();
});

test("migration 151 moves live key provisioning state with destination-wins collisions", () => {
  const migration = fs.readFileSync(migrationPath, "utf8");
  const sourceOnly = createDb();
  sourceOnly
    .prepare(
      `INSERT INTO registered_keys
         (id, key, key_prefix, name, provider, account_id)
       VALUES ('key-1', 'hash-1', 'ork_test', 'Legacy key', 'windsurf', 'account-1')`
    )
    .run();
  sourceOnly
    .prepare(
      `INSERT INTO provider_key_limits
         (provider, max_active_keys, daily_issue_limit, hourly_issue_limit,
          daily_issued, hourly_issued, last_reset_day, last_reset_hour)
       VALUES ('windsurf', 5, 20, 4, 7, 2, '2026-01-01', '2026-01-01T01')`
    )
    .run();

  sourceOnly.exec(migration);
  assert.equal(
    sourceOnly.prepare("SELECT provider FROM registered_keys WHERE id='key-1'").pluck().get(),
    "devin-desktop"
  );
  assert.deepEqual(
    sourceOnly
      .prepare(
        `SELECT provider, max_active_keys, daily_issue_limit, hourly_issue_limit,
                daily_issued, hourly_issued
         FROM provider_key_limits`
      )
      .get(),
    {
      provider: "devin-desktop",
      max_active_keys: 5,
      daily_issue_limit: 20,
      hourly_issue_limit: 4,
      daily_issued: 7,
      hourly_issued: 2,
    }
  );
  sourceOnly.exec(migration);
  assert.equal(sourceOnly.prepare("SELECT COUNT(*) FROM provider_key_limits").pluck().get(), 1);
  sourceOnly.close();

  const collision = createDb();
  collision.exec(`
    INSERT INTO provider_key_limits (provider, max_active_keys, daily_issued)
      VALUES ('windsurf', 5, 7), ('devin-desktop', 9, 3);
  `);
  collision.exec(migration);
  assert.deepEqual(
    collision
      .prepare("SELECT provider, max_active_keys, daily_issued FROM provider_key_limits")
      .get(),
    { provider: "devin-desktop", max_active_keys: 9, daily_issued: 3 }
  );
  collision.exec(migration);
  assert.equal(collision.prepare("SELECT COUNT(*) FROM provider_key_limits").pluck().get(), 1);
  collision.close();
});

test("migration 151 moves current settings safely and preserves historical records", () => {
  const migration = fs.readFileSync(migrationPath, "utf8");
  const db = createDb();
  db.exec(`
    INSERT INTO provider_connections
      (id, provider, default_model, created_at, updated_at) VALUES
      ('legacy-connection', 'windsurf', 'windsurf/swe-1-7', '2026-01-01', '2026-01-01'),
      ('other-connection', 'github', 'github/gpt-5', '2026-01-01', '2026-01-01');

    INSERT INTO key_value VALUES
      ('customModels', 'windsurf', '["legacy-custom"]'),
      ('customModels', 'devin-desktop', '["keep-destination"]'),
      ('syncedAvailableModels', 'windsurf:legacy-connection', '[{"id":"source-collision"}]'),
      ('syncedAvailableModels', 'devin-desktop:legacy-connection', '[{"id":"keep-destination"}]'),
      ('syncedAvailableModels', 'windsurf:move-connection', '[{"id":"move-source"}]'),
      ('modelCompatOverrides', 'windsurf', '{"swe-1-7":true}'),
      ('providerAliases', 'windsurf', '{"fast":"swe-1-7"}'),
      ('providerAliases', 'devin-desktop', '{"fast":"keep-destination"}'),
      ('modelAliases', 'legacy-fast', '"windsurf/swe-1-7"'),
      ('modelAliases', 'destination-fast', '"devin-desktop/swe-1-7"'),
      ('modelAliases', 'other-fast', '"github/gpt-5"');

    INSERT INTO combos (id, name, data, created_at, updated_at) VALUES
      ('combo-1', 'Legacy combo',
       '{"models":[{"provider":"windsurf","providerId":"windsurf","model":"windsurf/swe-1-7"}]}',
       '2026-01-01', '2026-01-01');

    INSERT INTO combo_adaptation_state
      (combo_id, provider_id, learned_score, request_count, success_count, avg_latency_ms,
       last_failure_at, excluded_until, updated_at) VALUES
      ('combo-1', 'windsurf', 0.1, 10, 2, 900, '2026-01-01', '2026-01-02', '2026-01-03'),
      ('combo-1', 'devin-desktop', 0.9, 20, 19, 100, NULL, NULL, '2026-02-03'),
      ('combo-2', 'windsurf', 0.4, 5, 3, 300, NULL, NULL, '2026-01-04');

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

    INSERT INTO key_groups (id, name, created_at, updated_at) VALUES
      ('group-1', 'Legacy group', '2026-01-01', '2026-01-01');
    INSERT INTO group_model_permissions
      (id, group_id, model_pattern, provider, access_type, created_at) VALUES
      ('permission-1', 'group-1', 'swe-*', 'windsurf', 'allow', '2026-01-01');

    INSERT INTO upstream_proxy_config
      (provider_id, mode, native_priority, cliproxyapi_priority, enabled, created_at, updated_at)
      VALUES
      ('windsurf', 'native', 1, 2, 1, '2026-01-01', '2026-01-01'),
      ('devin-desktop', 'fallback', 1, 2, 1, '2026-02-01', '2026-02-01');

    INSERT INTO discovery_results
      (provider_id, method, endpoint, status, notes) VALUES
      ('windsurf', 'public_api', 'https://server.codeium.com', 'verified', 'legacy'),
      ('devin-desktop', 'public_api', 'https://server.codeium.com', 'verified', 'keep');

    INSERT INTO usage_history (id, provider, model, timestamp) VALUES
      (1, 'windsurf', 'swe-1-7', '2026-01-01');
    INSERT INTO call_logs (id, timestamp, provider, model, requested_model) VALUES
      ('call-1', '2026-01-01', 'windsurf', 'swe-1-7', 'windsurf/swe-1-7');
    INSERT INTO proxy_logs (id, timestamp, provider) VALUES
      ('proxy-1', '2026-01-01', 'windsurf');
    INSERT INTO quota_snapshots (id, provider, connection_id, window_key) VALUES
      (1, 'windsurf', 'legacy-connection', 'daily');
    INSERT INTO provider_quota_reset_events
      (id, provider, connection_id, window_key, window_started_at, window_resets_at, observed_at)
      VALUES
      (1, 'windsurf', 'legacy-connection', 'daily', '2026-01-01', '2026-01-02', '2026-01-01');
    INSERT INTO session_model_history
      (id, session_id, combo_name, model_str, provider, used_at) VALUES
      (1, 'session-1', 'Legacy combo', 'windsurf/swe-1-7', 'windsurf', '2026-01-01');
  `);

  db.exec(migration);

  assert.deepEqual(
    db.prepare("SELECT id, provider, default_model FROM provider_connections ORDER BY id").all(),
    [
      {
        id: "legacy-connection",
        provider: "devin-desktop",
        default_model: "devin-desktop/swe-1-7",
      },
      { id: "other-connection", provider: "github", default_model: "github/gpt-5" },
    ]
  );
  assert.deepEqual(
    db
      .prepare("SELECT value FROM key_value WHERE namespace='customModels' AND key='devin-desktop'")
      .get(),
    { value: '["keep-destination"]' }
  );
  assert.deepEqual(
    db
      .prepare(
        "SELECT key, value FROM key_value WHERE namespace='syncedAvailableModels' ORDER BY key"
      )
      .all(),
    [
      {
        key: "devin-desktop:legacy-connection",
        value: '[{"id":"keep-destination"}]',
      },
      { key: "devin-desktop:move-connection", value: '[{"id":"move-source"}]' },
    ]
  );
  assert.deepEqual(
    db
      .prepare(
        "SELECT value FROM key_value WHERE namespace='providerAliases' AND key='devin-desktop'"
      )
      .get(),
    { value: '{"fast":"keep-destination"}' }
  );
  assert.deepEqual(
    db
      .prepare("SELECT key, value FROM key_value WHERE namespace='modelAliases' ORDER BY key")
      .all(),
    [
      { key: "destination-fast", value: '"devin-desktop/swe-1-7"' },
      { key: "legacy-fast", value: '"devin-desktop/swe-1-7"' },
      { key: "other-fast", value: '"github/gpt-5"' },
    ]
  );
  assert.equal(
    db
      .prepare(
        `SELECT 1 FROM key_value
         WHERE key = 'windsurf'
            OR (namespace = 'syncedAvailableModels' AND key LIKE 'windsurf:%')`
      )
      .get(),
    undefined
  );

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
        `SELECT combo_id, provider_id, learned_score, request_count, success_count, avg_latency_ms,
                last_failure_at, excluded_until, updated_at
         FROM combo_adaptation_state
         ORDER BY combo_id`
      )
      .all(),
    [
      {
        combo_id: "combo-1",
        provider_id: "devin-desktop",
        learned_score: 0.9,
        request_count: 20,
        success_count: 19,
        avg_latency_ms: 100,
        last_failure_at: null,
        excluded_until: null,
        updated_at: "2026-02-03",
      },
      {
        combo_id: "combo-2",
        provider_id: "devin-desktop",
        learned_score: 0.4,
        request_count: 5,
        success_count: 3,
        avg_latency_ms: 300,
        last_failure_at: null,
        excluded_until: null,
        updated_at: "2026-01-04",
      },
    ]
  );

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
    "combo_adaptation_state",
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
