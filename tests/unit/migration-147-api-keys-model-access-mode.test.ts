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
/**
 * Acceptance: migration 147 — api_keys.model_access_mode
 *
 * Confirmed backfill:
 *   - Adds model_access_mode column (public shape: "all" | "restricted")
 *   - Legacy empty allowed_models rows → "all"
 *   - Legacy non-empty allowed_models rows → "restricted"
 *
 * The existence assertion keeps the migration artifact part of the accepted contract.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATION_147_PATH = path.join(
  __dirname,
  "../../src/lib/db/migrations/147_api_keys_model_access_mode.sql"
);

interface TestDb {
  exec: (sql: string) => unknown;
  prepare: (sql: string) => {
    run: (...p: unknown[]) => unknown;
    get: (...p: unknown[]) => Record<string, unknown> | undefined;
    all: (...p: unknown[]) => Record<string, unknown>[];
  };
  close: () => void;
}

function makeLegacyApiKeysDb(): TestDb {
  const db = new Database(":memory:") as unknown as TestDb;
  db.exec(`
    CREATE TABLE api_keys (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      key TEXT NOT NULL,
      allowed_models TEXT DEFAULT '[]'
    );
  `);
  return db;
}

function insertKey(db: TestDb, id: string, name: string, allowedModelsJson: string | null): void {
  db.prepare("INSERT INTO api_keys (id, name, key, allowed_models) VALUES (?, ?, ?, ?)").run(
    id,
    name,
    `omni_${id}`,
    allowedModelsJson
  );
}

function modeOf(db: TestDb, id: string): string | null {
  const row = db.prepare("SELECT model_access_mode AS mode FROM api_keys WHERE id = ?").get(id);
  return (row?.mode as string | undefined) ?? null;
}

function hasModelAccessModeColumn(db: TestDb): boolean {
  const cols = db.prepare("PRAGMA table_info(api_keys)").all();
  return cols.some((col) => col.name === "model_access_mode");
}

test("R-migration: 147_api_keys_model_access_mode.sql must exist", () => {
  assert.ok(
    fs.existsSync(MIGRATION_147_PATH),
    "expected src/lib/db/migrations/147_api_keys_model_access_mode.sql"
  );
});

test("R-migration: 147 adds model_access_mode and backfills all/restricted from allowed_models", () => {
  assert.ok(
    fs.existsSync(MIGRATION_147_PATH),
    "expected src/lib/db/migrations/147_api_keys_model_access_mode.sql"
  );

  const sql = fs.readFileSync(MIGRATION_147_PATH, "utf-8");
  const db = makeLegacyApiKeysDb();

  insertKey(db, "legacy-all", "Legacy Allow All", "[]");
  insertKey(db, "legacy-spaced-all", "Legacy Spaced Allow All", "[ ]");
  insertKey(db, "legacy-nullish", "Legacy Nullish", "null");
  insertKey(db, "legacy-sql-null", "Legacy SQL Null", null);
  insertKey(db, "legacy-restricted", "Legacy Restricted", '["ollama-cloud/*","openai/gpt-4.1"]');
  insertKey(db, "legacy-exact", "Legacy Exact", '["openai/gpt-4.1"]');
  insertKey(db, "legacy-scalar", "Legacy Scalar", "true");
  insertKey(db, "legacy-malformed", "Legacy Malformed", "not-json");

  db.exec(sql);

  assert.equal(hasModelAccessModeColumn(db), true, "must add model_access_mode column");

  assert.equal(
    modeOf(db, "legacy-all"),
    "all",
    "legacy empty allowed_models must backfill to model_access_mode=all"
  );
  assert.equal(
    modeOf(db, "legacy-spaced-all"),
    "all",
    "valid empty JSON arrays remain allow-all regardless of whitespace"
  );
  assert.equal(
    modeOf(db, "legacy-nullish"),
    "all",
    "JSON null allowed_models must backfill to all"
  );
  assert.equal(modeOf(db, "legacy-sql-null"), "all", "SQL NULL must backfill to all");
  assert.equal(
    modeOf(db, "legacy-restricted"),
    "restricted",
    "legacy non-empty allowed_models must backfill to restricted"
  );
  assert.equal(
    modeOf(db, "legacy-exact"),
    "restricted",
    "legacy exact-model allow-list must backfill to restricted"
  );
  assert.equal(
    modeOf(db, "legacy-scalar"),
    "restricted",
    "non-array JSON values other than null must fail closed"
  );
  assert.equal(
    modeOf(db, "legacy-malformed"),
    "restricted",
    "malformed legacy values must fail closed"
  );

  db.close();
});
