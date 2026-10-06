import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gpl-provider-retirement-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

const RETIRED_PROVIDER_IDS = ["raycast", "rc", "hailuo-web"] as const;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 166 disables GPL-derived connections fail-closed and preserves audit history", async () => {
  const db = core.getDbInstance();

  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = 166")
    .get() as { version: number } | undefined;
  assert.ok(applied, "migration 166 must be recorded as applied");

  // api_keys policy columns are reconciled lazily by the domain module on fresh
  // databases; production upgrades already carry them from normal API-key use.
  await apiKeysDb.getApiKeys();

  for (const provider of [...RETIRED_PROVIDER_IDS, "minimax", "minimax-cn"]) {
    const connectionId = `${provider}-connection`;
    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, is_active, created_at, updated_at) " +
        "VALUES (?, ?, 'apikey', ?, 1, datetime('now'), datetime('now'))"
    ).run(connectionId, provider, `${provider}-fixture`);
  }

  db.prepare(
    "INSERT INTO api_keys " +
      "(id, name, key, key_hash, key_prefix, allowed_connections, is_active, created_at) " +
      "VALUES ('restricted-key', 'restricted-key', 'restricted-secret', " +
      "'restricted-hash', 'restrict', ?, 1, datetime('now'))"
  ).run(JSON.stringify(["raycast-connection", "minimax-connection"]));

  for (const provider of RETIRED_PROVIDER_IDS) {
    const connectionId = `${provider}-connection`;
    db.prepare(
      "INSERT INTO exclusive_connection_leases " +
        "(lease_owner_hash, api_key_id, provider, connection_id, generation, state, " +
        "acquired_at, renewed_at, expires_at) VALUES (?, 'restricted-key', ?, ?, 1, " +
        "'ACTIVE', datetime('now'), datetime('now'), datetime('now', '+1 hour'))"
    ).run(provider.padEnd(64, "0"), provider, connectionId);
    db.prepare(
      "INSERT INTO usage_history (provider, model, timestamp) " +
        "VALUES (?, 'legacy-model', datetime('now'))"
    ).run(provider);
    db.prepare(
      "INSERT INTO call_logs (id, timestamp, provider, model, status) " +
        "VALUES (?, datetime('now'), ?, 'legacy-model', 200)"
    ).run(`${provider}-call`, provider);
    db.prepare(
      "INSERT INTO quota_snapshots " +
        "(provider, connection_id, window_key, remaining_percentage, is_exhausted, created_at) " +
        "VALUES (?, ?, 'monthly', 50, 0, ?)"
    ).run(provider, connectionId, new Date().toISOString());
  }

  const sql = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/migrations/166_retire_gpl_derived_providers.sql"),
    "utf8"
  );
  db.exec(sql);
  db.exec(sql);

  for (const provider of RETIRED_PROVIDER_IDS) {
    const connectionId = `${provider}-connection`;
    const connection = db
      .prepare(
        "SELECT is_active, test_status, error_code, last_error_type, last_error_source " +
          "FROM provider_connections WHERE id = ?"
      )
      .get(connectionId) as {
      is_active: number;
      test_status: string;
      error_code: string;
      last_error_type: string;
      last_error_source: string;
    };
    assert.deepEqual(connection, {
      is_active: 0,
      test_status: "unavailable",
      error_code: "PROVIDER_REMOVED",
      last_error_type: "provider_removed",
      last_error_source: "migration:166",
    });

    const lease = db
      .prepare(
        "SELECT state, ended_at, end_reason FROM exclusive_connection_leases " +
          "WHERE connection_id = ?"
      )
      .get(connectionId) as { state: string; ended_at: string | null; end_reason: string | null };
    assert.equal(lease.state, "INVALIDATED");
    assert.ok(lease.ended_at);
    assert.equal(lease.end_reason, "provider integration retired in v3.8.51");

    assert.ok(db.prepare("SELECT id FROM usage_history WHERE provider = ?").get(provider));
    assert.ok(db.prepare("SELECT id FROM call_logs WHERE provider = ?").get(provider));
    assert.ok(db.prepare("SELECT id FROM quota_snapshots WHERE provider = ?").get(provider));
  }

  for (const provider of ["minimax", "minimax-cn"]) {
    const row = db
      .prepare("SELECT is_active FROM provider_connections WHERE id = ?")
      .get(`${provider}-connection`) as { is_active: number };
    assert.equal(row.is_active, 1, `${provider} must remain active`);
  }

  const apiKey = db
    .prepare("SELECT is_active, allowed_connections FROM api_keys WHERE id = 'restricted-key'")
    .get() as { is_active: number; allowed_connections: string };
  assert.equal(apiKey.is_active, 1);
  assert.deepEqual(JSON.parse(apiKey.allowed_connections), [
    "raycast-connection",
    "minimax-connection",
  ]);
});
