/**
 * tests/unit/db/usage-cost-migrations.test.ts
 *
 * Migration 206_usage_history_provider_reported_cost adds `provider_credits` and
 * `provider_cost_usd` to `usage_history`. The upgrade path is replayed against a
 * database shaped like the pre-migration schema (marker removed, columns dropped),
 * which is what an existing install sees; existing rows keep NULL (= priced from
 * tokens) and negative amounts are rejected.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-cost-migrations-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "unit-test-only";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// core reads DATA_DIR at import time, so it loads after the temp dir is set.
const core = await import("../../../src/lib/db/core.ts");

function columnNames(db: SqliteAdapter, table: string): string[] {
  return (db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>).map(
    (column) => column.name
  );
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("a fresh database carries the provider-reported cost columns and marker", () => {
  const db = core.getDbInstance();
  const usageColumns = columnNames(db, "usage_history");
  assert.ok(usageColumns.includes("provider_credits"), "provider_credits column missing");
  assert.ok(usageColumns.includes("provider_cost_usd"), "provider_cost_usd column missing");
  const marker = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = '206'")
    .get() as { version: string } | undefined;
  assert.equal(marker?.version, "206");
});

test("206 upgrades an existing usage_history without inventing costs", () => {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO usage_history (provider, model, tokens_input, tokens_output, timestamp)
     VALUES ('openai', 'gpt-4o', 1000, 500, '2024-01-01T00:00:00.000Z')`
  ).run();

  // Replay against the pre-migration shape.
  db.exec("ALTER TABLE usage_history DROP COLUMN provider_credits");
  db.exec("ALTER TABLE usage_history DROP COLUMN provider_cost_usd");
  db.prepare("DELETE FROM _omniroute_migrations WHERE version = '206'").run();
  core.resetDbInstance();
  const upgraded = core.getDbInstance();

  assert.deepEqual(
    upgraded
      .prepare("SELECT tokens_input, provider_credits, provider_cost_usd FROM usage_history")
      .all(),
    [{ tokens_input: 1000, provider_credits: null, provider_cost_usd: null }]
  );
  assert.throws(() =>
    upgraded
      .prepare(
        `INSERT INTO usage_history (provider, model, provider_cost_usd, timestamp)
         VALUES ('xai', 'grok', -1, '2024-01-02T00:00:00.000Z')`
      )
      .run()
  );
});
