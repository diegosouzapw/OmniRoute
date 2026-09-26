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
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

// npm omniroute@3.8.50 was built from main and recorded model_capabilities as
// migration 163. On this branch model_capabilities is 169 and 163 belongs to
// radar_feed_cache_generated_at, so the stale ledger row must not shadow it.
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-163-migration-"));
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

fs.writeFileSync(
  path.join(migrationsDir, "163_radar_feed_cache_generated_at.sql"),
  "ALTER TABLE radar_feed_cache ADD COLUMN generated_at TEXT DEFAULT NULL;"
);
fs.writeFileSync(
  path.join(migrationsDir, "169_model_capabilities.sql"),
  "CREATE TABLE IF NOT EXISTS model_capabilities (model_id TEXT PRIMARY KEY);"
);

const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

function createDb(appliedRows: Array<[string, string]>) {
  const db = new Database(":memory:");
  db.exec(`
    CREATE TABLE radar_feed_cache (id TEXT PRIMARY KEY);
    CREATE TABLE model_capabilities (model_id TEXT PRIMARY KEY);
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  const insert = db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)");
  for (const [version, name] of appliedRows) insert.run(version, name);
  return db;
}

function ledger(db: InstanceType<typeof Database>) {
  return db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all();
}

function hasGeneratedAt(db: InstanceType<typeof Database>) {
  const columns = db.prepare("PRAGMA table_info(radar_feed_cache)").all() as Array<{
    name: string;
  }>;
  return columns.some((column) => column.name === "generated_at");
}

const EXPECTED_LEDGER = [
  { version: "163", name: "radar_feed_cache_generated_at" },
  { version: "169", name: "model_capabilities" },
];

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

test("npm 3.8.50 database: 163 model_capabilities moves to 169 and the real 163 runs", () => {
  const db = createDb([["163", "model_capabilities"]]);
  try {
    assert.equal(runMigrations(db), 1);
    assert.deepEqual(ledger(db), EXPECTED_LEDGER);
    assert.ok(hasGeneratedAt(db), "radar_feed_cache.generated_at must exist");
  } finally {
    db.close();
  }
});

test("database already upgraded without the fix: stale 163 row is dropped and 163 runs", () => {
  // The unfixed runner applied 169 but kept 163=model_capabilities, skipping radar's 163.
  const db = createDb([
    ["163", "model_capabilities"],
    ["169", "model_capabilities"],
  ]);
  try {
    assert.equal(runMigrations(db), 1);
    assert.deepEqual(ledger(db), EXPECTED_LEDGER);
    assert.ok(hasGeneratedAt(db), "radar_feed_cache.generated_at must exist");
  } finally {
    db.close();
  }
});

test("release-branch database that already recorded 163 as radar is left alone", () => {
  const db = createDb([
    ["163", "radar_feed_cache_generated_at"],
    ["169", "model_capabilities"],
  ]);
  db.exec("ALTER TABLE radar_feed_cache ADD COLUMN generated_at TEXT DEFAULT NULL;");
  try {
    assert.equal(runMigrations(db), 0);
    assert.deepEqual(ledger(db), EXPECTED_LEDGER);
  } finally {
    db.close();
  }
});

test("a second run after the repair applies nothing", () => {
  const db = createDb([["163", "model_capabilities"]]);
  try {
    runMigrations(db);
    assert.equal(runMigrations(db), 0);
    assert.deepEqual(ledger(db), EXPECTED_LEDGER);
  } finally {
    db.close();
  }
});
