/**
 * tests/unit/db-migrationrunner-duplicate-column-leftovers.test.ts
 *
 * A database whose schema is ahead of the ledger has the columns AND the tables/indexes of a
 * migration file already in place. The replay of that file without its existing columns then
 * hits "table ... already exists" / "index ... already exists". That must not abort boot: the
 * runner falls back to recording the ledger row only, as it did before columns were replayed.
 *
 * `MIGRATIONS_DIR` is resolved once when migrationRunner.ts is evaluated, so the migration
 * files are written before the import.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const CORE_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "mig-dup-col-leftovers-"));
fs.writeFileSync(
  path.join(CORE_DIR, "001_initial_schema.sql"),
  [
    "CREATE TABLE subs (id INTEGER PRIMARY KEY, control_url TEXT);",
    "CREATE TABLE subs_log (id INTEGER PRIMARY KEY);",
    "CREATE INDEX idx_subs_log_id ON subs_log(id);",
  ].join("\n")
);
fs.writeFileSync(
  path.join(CORE_DIR, "002_subs_leftovers.sql"),
  [
    "ALTER TABLE subs ADD COLUMN control_url TEXT;",
    "ALTER TABLE subs ADD COLUMN extra TEXT;",
    "CREATE TABLE subs_log (id INTEGER PRIMARY KEY);",
    "CREATE INDEX idx_subs_log_id ON subs_log(id);",
  ].join("\n")
);
process.env.OMNIROUTE_MIGRATIONS_DIR = CORE_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const { applyMigrationSkippingExistingColumns } =
  await import("../../src/lib/db/migrationRunner/schemaState.ts");
assert.equal(typeof applyMigrationSkippingExistingColumns, "function");

process.on("exit", () => {
  fs.rmSync(CORE_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function columns(db: Database.Database, table: string): string[] {
  return (db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>).map(
    (c) => c.name
  );
}

test("a replay that fails on an existing table/index falls back to recording the ledger row", () => {
  const db = new Database(":memory:");
  try {
    assert.doesNotThrow(() => runMigrations(db as never, { isNewDb: true }));
    const ledger = db.prepare("SELECT version FROM _omniroute_migrations ORDER BY rowid").all();
    assert.deepEqual(ledger, [{ version: "001" }, { version: "002" }]);
    // The failed replay ran in one transaction: nothing of it is left half-applied.
    assert.deepEqual(columns(db, "subs"), ["id", "control_url"]);
  } finally {
    db.close();
  }
});

test("the fallback is final: a second run applies nothing and does not throw", () => {
  const db = new Database(":memory:");
  try {
    runMigrations(db as never, { isNewDb: true });
    assert.equal(runMigrations(db as never), 0);
  } finally {
    db.close();
  }
});
