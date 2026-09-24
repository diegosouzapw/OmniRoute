// #11725: usage_history.cpa_auth_index is a nullable opaque column. Fresh
// databases and upgrades from the prior schema both receive it, and a second
// run records the ledger row without re-adding the column.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/lib/db/migrations"
);
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-185-"));
fs.copyFileSync(
  path.join(repoMigrations, "185_usage_history_cpa_auth_index.sql"),
  path.join(migrationsDir, "185_usage_history_cpa_auth_index.sql")
);
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

function columns(db: Database.Database): string[] {
  return (db.prepare("PRAGMA table_info(usage_history)").all() as Array<{ name: string }>).map(
    (column) => column.name
  );
}

function openDb(withColumn: boolean): Database.Database {
  const db = new Database(":memory:");
  db.exec(
    `CREATE TABLE usage_history (id INTEGER PRIMARY KEY, provider TEXT${
      withColumn ? ", cpa_auth_index TEXT" : ""
    });`
  );
  return db;
}

test("an older usage_history gains cpa_auth_index and a second run is a no-op", () => {
  const db = openDb(false);
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 1);
    assert.ok(columns(db).includes("cpa_auth_index"));
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
    assert.deepEqual(db.prepare("SELECT version, name FROM _omniroute_migrations").all(), [
      { version: "185", name: "usage_history_cpa_auth_index" },
    ]);
  } finally {
    db.close();
  }
});

test("a database that already has cpa_auth_index still records migration 185", () => {
  const db = openDb(true);
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 1);
    assert.equal(columns(db).filter((name) => name === "cpa_auth_index").length, 1);
    assert.deepEqual(db.prepare("SELECT version, name FROM _omniroute_migrations").all(), [
      { version: "185", name: "usage_history_cpa_auth_index" },
    ]);
  } finally {
    db.close();
  }
});
