import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Database from "better-sqlite3";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const migrationPath = path.join(
  repoRoot,
  "src/lib/db/migrations/164_retire_microsoft_designer_web.sql"
);

type ProviderRow = {
  provider: string;
  is_active: number;
  test_status: string | null;
  last_error_type: string | null;
  last_error_source: string | null;
  api_key: string | null;
  provider_specific_data: string | null;
  created_at: string;
};

type LeaseRow = { state: string; end_reason: string | null };

test("migration 164 permanently tombstones only Microsoft Designer Web runtime IDs", () => {
  const db = new Database(":memory:");
  test.after(() => db.close());

  db.exec(`
    CREATE TABLE provider_connections (
      id TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      test_status TEXT,
      last_error TEXT,
      last_error_at TEXT,
      last_error_type TEXT,
      last_error_source TEXT,
      api_key TEXT,
      provider_specific_data TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE exclusive_connection_leases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lease_owner_hash TEXT NOT NULL,
      api_key_id TEXT NOT NULL,
      provider TEXT NOT NULL,
      connection_id TEXT NOT NULL,
      generation INTEGER NOT NULL,
      state TEXT NOT NULL,
      acquired_at TEXT NOT NULL,
      renewed_at TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      ended_at TEXT,
      end_reason TEXT
    );
  `);

  const insertProvider = db.prepare(`
    INSERT INTO provider_connections (
      id, provider, is_active, test_status, api_key, provider_specific_data, created_at, updated_at
    ) VALUES (?, ?, 1, 'active', ?, ?, '2026-01-02T03:04:05.000Z', '2026-01-02T03:04:05.000Z')
  `);
  insertProvider.run("designer-canonical", "microsoft-designer-web", "encrypted-a", '{"keep":1}');
  insertProvider.run("designer-alias", "\tMSDesigner\r", "encrypted-b", '{"keep":2}');

  const controlProviders = [
    "microsoft-designer-web-preview",
    "openai",
    "azure",
    "copilot",
    "musespark-web",
    "modelscope",
  ];
  for (const provider of controlProviders) {
    insertProvider.run(
      `control-${provider}`,
      provider,
      `encrypted-${provider}`,
      '{"control":true}'
    );
  }

  const insertLease = db.prepare(`
    INSERT INTO exclusive_connection_leases (
      lease_owner_hash, api_key_id, provider, connection_id, generation, state,
      acquired_at, renewed_at, expires_at
    ) VALUES (?, 'managed-key', ?, ?, 1, 'ACTIVE',
      '2026-01-02T03:04:05.000Z', '2026-01-02T03:04:05.000Z', '2099-01-02T03:04:05.000Z')
  `);
  insertLease.run("a".repeat(64), "microsoft-designer-web", "designer-canonical");
  insertLease.run("b".repeat(64), "MSDESIGNER", "designer-alias");
  insertLease.run("c".repeat(64), "openai", "control-openai");

  const migrationSql = fs.readFileSync(migrationPath, "utf8");
  db.exec(migrationSql);
  db.exec(migrationSql);

  for (const id of ["designer-canonical", "designer-alias"]) {
    const row = db
      .prepare("SELECT * FROM provider_connections WHERE id = ?")
      .get(id) as ProviderRow;
    assert.equal(row.is_active, 0);
    assert.equal(row.test_status, "unavailable");
    assert.equal(row.last_error_type, "provider_retired");
    assert.equal(row.last_error_source, "migration:retire-microsoft-designer-web");
    assert.match(row.api_key ?? "", /^encrypted-/);
    assert.match(row.provider_specific_data ?? "", /"keep":/);
    assert.equal(row.created_at, "2026-01-02T03:04:05.000Z");
  }

  for (const provider of controlProviders) {
    const row = db
      .prepare("SELECT * FROM provider_connections WHERE id = ?")
      .get(`control-${provider}`) as ProviderRow;
    assert.equal(row.provider, provider);
    assert.equal(row.is_active, 1);
    assert.equal(row.test_status, "active");
    assert.equal(row.last_error_type, null);
  }

  const retiredLeases = db
    .prepare("SELECT state, end_reason FROM exclusive_connection_leases ORDER BY id LIMIT 2")
    .all() as LeaseRow[];
  assert.deepEqual(retiredLeases, [
    { state: "INVALIDATED", end_reason: "AUTHORIZATION_CHANGED" },
    { state: "INVALIDATED", end_reason: "AUTHORIZATION_CHANGED" },
  ]);
  assert.deepEqual(
    db.prepare("SELECT state, end_reason FROM exclusive_connection_leases WHERE id = 3").get(),
    { state: "ACTIVE", end_reason: null }
  );

  db.prepare(
    `
    INSERT OR REPLACE INTO provider_connections (
      id, provider, is_active, test_status, api_key, provider_specific_data, created_at, updated_at
    ) VALUES ('designer-replaced', ' MSDESIGNER ', 1, 'active', 'encrypted-c', '{"keep":3}',
      '2026-02-03T04:05:06.000Z', '2026-02-03T04:05:06.000Z')
  `
  ).run();
  const replaced = db
    .prepare("SELECT * FROM provider_connections WHERE id = 'designer-replaced'")
    .get() as ProviderRow;
  assert.equal(replaced.is_active, 0);
  assert.equal(replaced.test_status, "unavailable");

  db.prepare(
    "UPDATE provider_connections SET provider = 'microsoft-designer-web', is_active = 1, test_status = 'active' WHERE id = 'control-openai'"
  ).run();
  const converted = db
    .prepare("SELECT * FROM provider_connections WHERE id = 'control-openai'")
    .get() as ProviderRow;
  assert.equal(converted.is_active, 0);
  assert.equal(converted.test_status, "unavailable");
  assert.deepEqual(
    db.prepare("SELECT state, end_reason FROM exclusive_connection_leases WHERE id = 3").get(),
    { state: "INVALIDATED", end_reason: "AUTHORIZATION_CHANGED" }
  );

  insertLease.run("d".repeat(64), "openai", "designer-replaced");
  assert.deepEqual(
    db.prepare("SELECT state, end_reason FROM exclusive_connection_leases WHERE id = 4").get(),
    { state: "INVALIDATED", end_reason: "AUTHORIZATION_CHANGED" }
  );

  db.prepare(
    "UPDATE exclusive_connection_leases SET state = 'ACTIVE', ended_at = NULL, end_reason = NULL WHERE id = 1"
  ).run();
  assert.deepEqual(
    db.prepare("SELECT state, end_reason FROM exclusive_connection_leases WHERE id = 1").get(),
    { state: "INVALIDATED", end_reason: "AUTHORIZATION_CHANGED" }
  );
});
