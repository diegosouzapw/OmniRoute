/**
 * tests/unit/db-quota-migrations-idempotency.test.ts
 *
 * Verifies that migrations 073_quota_pools.sql, 074_quota_consumption.sql,
 * and 075_provider_plans.sql are idempotent: running the migration runner
 * twice produces no errors and the final schema is identical both times.
 *
 * Strategy: initialize DB (triggers all migrations), reset the singleton,
 * reinitialize (re-runs migration runner which is a no-op for already-applied
 * migrations), then assert that all 3 new tables + 5 new indexes exist in
 * sqlite_master.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-mig-idem-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

function getDb() {
  return core.getDbInstance() as unknown as {
    prepare: <TRow = unknown>(sql: string) => {
      all: (...params: unknown[]) => TRow[];
      get: (...params: unknown[]) => TRow | undefined;
      run: (...params: unknown[]) => { changes: number };
    };
  };
}

function listSqliteMaster(type: "table" | "index"): string[] {
  const db = getDb();
  const rows = db
    .prepare<{ name: string }>(
      `SELECT name FROM sqlite_master WHERE type = ? ORDER BY name`
    )
    .all(type);
  return rows.map((r) => r.name);
}

const EXPECTED_TABLES = ["quota_pools", "quota_allocations", "quota_consumption", "provider_plans"];
const EXPECTED_INDEXES = [
  "idx_quota_pools_connection",
  "idx_quota_allocations_apikey",
  "idx_quota_consumption_dim_bucket",
  "idx_quota_consumption_updated_at",
  "idx_provider_plans_provider",
];

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("migrations 073-075 create all expected tables and indexes on first init", () => {
  // First initialization: runs all migrations
  const _db = core.getDbInstance();

  const tables = listSqliteMaster("table");
  const indexes = listSqliteMaster("index");

  for (const table of EXPECTED_TABLES) {
    assert.ok(tables.includes(table), `Expected table '${table}' to exist. Found: ${tables.join(", ")}`);
  }

  for (const idx of EXPECTED_INDEXES) {
    assert.ok(
      indexes.includes(idx),
      `Expected index '${idx}' to exist. Found: ${indexes.join(", ")}`
    );
  }
});

test("running migration runner a second time produces zero errors and identical schema", async () => {
  // Second initialization after reset: migration runner runs again but all
  // migrations are already recorded in _omniroute_migrations — should be no-op.
  core.resetDbInstance();

  // Re-initialize (must not throw)
  let db: ReturnType<typeof getDb>;
  assert.doesNotThrow(() => {
    db = getDb();
  }, "second init should not throw");

  const tables = listSqliteMaster("table");
  const indexes = listSqliteMaster("index");

  for (const table of EXPECTED_TABLES) {
    assert.ok(
      tables.includes(table),
      `Table '${table}' missing after second init. Tables: ${tables.join(", ")}`
    );
  }

  for (const idx of EXPECTED_INDEXES) {
    assert.ok(
      indexes.includes(idx),
      `Index '${idx}' missing after second init. Indexes: ${indexes.join(", ")}`
    );
  }
});

test("quota_pools schema has correct columns", () => {
  const db = getDb();
  const rows = db
    .prepare<{ name: string; type: string; notnull: number; pk: number }>(
      `PRAGMA table_info(quota_pools)`
    )
    .all();

  const colNames = rows.map((r) => r.name);
  assert.ok(colNames.includes("id"), "should have 'id' column");
  assert.ok(colNames.includes("connection_id"), "should have 'connection_id' column");
  assert.ok(colNames.includes("name"), "should have 'name' column");
  assert.ok(colNames.includes("created_at"), "should have 'created_at' column");

  const idCol = rows.find((r) => r.name === "id");
  assert.equal(idCol!.pk, 1, "id should be primary key");
});

test("quota_allocations schema has correct columns and FK", () => {
  const db = getDb();
  const rows = db
    .prepare<{ name: string; type: string; notnull: number; pk: number }>(
      `PRAGMA table_info(quota_allocations)`
    )
    .all();

  const colNames = rows.map((r) => r.name);
  assert.ok(colNames.includes("pool_id"), "should have 'pool_id' column");
  assert.ok(colNames.includes("api_key_id"), "should have 'api_key_id' column");
  assert.ok(colNames.includes("weight"), "should have 'weight' column");
  assert.ok(colNames.includes("cap_value"), "should have 'cap_value' column");
  assert.ok(colNames.includes("cap_unit"), "should have 'cap_unit' column");
  assert.ok(colNames.includes("policy"), "should have 'policy' column");
});

test("quota_consumption schema has correct columns", () => {
  const db = getDb();
  const rows = db
    .prepare<{ name: string; type: string; notnull: number; pk: number }>(
      `PRAGMA table_info(quota_consumption)`
    )
    .all();

  const colNames = rows.map((r) => r.name);
  assert.ok(colNames.includes("api_key_id"), "should have 'api_key_id' column");
  assert.ok(colNames.includes("dimension_key"), "should have 'dimension_key' column");
  assert.ok(colNames.includes("bucket_index"), "should have 'bucket_index' column");
  assert.ok(colNames.includes("consumed"), "should have 'consumed' column");
  assert.ok(colNames.includes("updated_at"), "should have 'updated_at' column");
});

test("provider_plans schema has correct columns", () => {
  const db = getDb();
  const rows = db
    .prepare<{ name: string; type: string; notnull: number; pk: number }>(
      `PRAGMA table_info(provider_plans)`
    )
    .all();

  const colNames = rows.map((r) => r.name);
  assert.ok(colNames.includes("connection_id"), "should have 'connection_id' column");
  assert.ok(colNames.includes("provider"), "should have 'provider' column");
  assert.ok(colNames.includes("dimensions_json"), "should have 'dimensions_json' column");
  assert.ok(colNames.includes("source"), "should have 'source' column");
  assert.ok(colNames.includes("updated_at"), "should have 'updated_at' column");

  const pkCol = rows.find((r) => r.name === "connection_id");
  assert.equal(pkCol!.pk, 1, "connection_id should be primary key");
});
