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
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const MIGRATION_PATH = path.resolve("src/lib/db/migrations/141_modality_bridge_settings.sql");
const INITIAL_SCHEMA_PATH = path.resolve("src/lib/db/migrations/001_initial_schema.sql");

/** Extract the REAL key_value DDL from the initial schema so the seed can never drift. */
function keyValueTableDdl(): string {
  const schema = fs.readFileSync(INITIAL_SCHEMA_PATH, "utf8");
  const match = schema.match(/CREATE TABLE IF NOT EXISTS key_value \([\s\S]*?\);/);
  assert.ok(match, "key_value CREATE TABLE block not found in 001_initial_schema.sql");
  return match[0];
}

function createSeededDb(): InstanceType<typeof Database> {
  const db = new Database(":memory:");
  db.exec(keyValueTableDdl());
  return db;
}

function getSetting(db: InstanceType<typeof Database>, key: string): string | undefined {
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = ?")
    .get(key) as { value: string } | undefined;
  return row?.value;
}

test("migration 141 copies legacy visionBridge* settings to modalityBridge* keys", () => {
  const sql = fs.readFileSync(MIGRATION_PATH, "utf8");
  const db = createSeededDb();
  try {
    const seed = db.prepare(
      "INSERT INTO key_value (namespace, key, value) VALUES ('settings', ?, ?)"
    );
    seed.run("visionBridgeEnabled", "true");
    seed.run("visionBridgeModel", "openai/gpt-4o-mini");
    seed.run("visionBridgePrompt", "legacy prompt");
    seed.run("visionBridgeTimeout", "45000");
    seed.run("visionBridgeMaxImages", "6");

    db.exec(sql);

    assert.equal(getSetting(db, "modalityBridgeVisionEnabled"), "true");
    assert.equal(getSetting(db, "modalityBridgeVisionModel"), "openai/gpt-4o-mini");
    assert.equal(getSetting(db, "modalityBridgeVisionPrompt"), "legacy prompt");
    assert.equal(getSetting(db, "modalityBridgeVisionTimeout"), "45000");
    assert.equal(getSetting(db, "modalityBridgeVisionMaxImages"), "6");
    // Legacy keys stay untouched (one-cycle rollback window).
    assert.equal(getSetting(db, "visionBridgeEnabled"), "true");
  } finally {
    db.close();
  }
});

test("migration 141 is idempotent and never overwrites an existing new key", () => {
  const sql = fs.readFileSync(MIGRATION_PATH, "utf8");
  const db = createSeededDb();
  try {
    const seed = db.prepare(
      "INSERT INTO key_value (namespace, key, value) VALUES ('settings', ?, ?)"
    );
    seed.run("visionBridgeModel", "openai/gpt-4o-mini");
    // Operator already set the new key — the migration must not clobber it.
    seed.run("modalityBridgeVisionModel", "gemini/gemini-2.5-flash");

    db.exec(sql);
    db.exec(sql); // re-run: idempotent

    assert.equal(getSetting(db, "modalityBridgeVisionModel"), "gemini/gemini-2.5-flash");
    const count = db
      .prepare("SELECT COUNT(*) AS n FROM key_value WHERE namespace = 'settings'")
      .get() as { n: number };
    assert.equal(count.n, 2);
  } finally {
    db.close();
  }
});

test("migration 141 is a no-op on a database without legacy settings", () => {
  const sql = fs.readFileSync(MIGRATION_PATH, "utf8");
  const db = createSeededDb();
  try {
    db.exec(sql);
    const count = db.prepare("SELECT COUNT(*) AS n FROM key_value").get() as { n: number };
    assert.equal(count.n, 0);
  } finally {
    db.close();
  }
});
