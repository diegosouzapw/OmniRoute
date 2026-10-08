/**
 * tests/unit/db-migrationrunner-duplicate-column.test.ts
 *
 * A migration file that hits "duplicate column name" must still end up with its missing
 * columns. The runner used to record the whole file as applied at the first duplicate, so the
 * statements after it never ran and, because the file runs in one transaction, the statements
 * before it were rolled back too.
 *
 * `MIGRATIONS_DIR` is resolved once when migrationRunner.ts is evaluated, so the migration
 * files are written before the import and every test starts from a fresh in-memory database.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const CORE_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "mig-dup-col-"));
fs.writeFileSync(
  path.join(CORE_DIR, "001_initial_schema.sql"),
  "CREATE TABLE subs (id INTEGER PRIMARY KEY, control_url TEXT);"
);
fs.writeFileSync(
  path.join(CORE_DIR, "002_subs_selector.sql"),
  [
    "-- ALTER TABLE subs ADD COLUMN commented_out TEXT;",
    "CREATE TABLE subs_log (id INTEGER PRIMARY KEY);",
    "ALTER TABLE subs ADD COLUMN control_url TEXT;",
    'ALTER TABLE "subs" add column last_switch_at TEXT',
    "  DEFAULT NULL;",
    "ALTER TABLE subs ADD COLUMN last_switch_result TEXT;",
    "CREATE INDEX idx_subs_log_id ON subs_log(id);",
  ].join("\n")
);
process.env.OMNIROUTE_MIGRATIONS_DIR = CORE_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const { stripExistingAddColumns } = await import("../../src/lib/db/migrationRunner/schemaState.ts");

process.on("exit", () => {
  fs.rmSync(CORE_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function columns(db: Database.Database, table: string): string[] {
  return (db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>).map(
    (c) => c.name
  );
}

test("adds the missing columns when an earlier column of the file already exists", () => {
  const db = new Database(":memory:");
  try {
    runMigrations(db as never, { isNewDb: true });
    assert.deepEqual(columns(db, "subs"), [
      "id",
      "control_url",
      "last_switch_at",
      "last_switch_result",
    ]);
    const ledger = db.prepare("SELECT version FROM _omniroute_migrations ORDER BY rowid").all();
    assert.deepEqual(ledger, [{ version: "001" }, { version: "002" }]);
  } finally {
    db.close();
  }
});

test("keeps the statements that come before the duplicate and after the last ADD COLUMN", () => {
  const db = new Database(":memory:");
  try {
    runMigrations(db as never, { isNewDb: true });
    const objects = db
      .prepare("SELECT name FROM sqlite_master WHERE name IN ('subs_log', 'idx_subs_log_id')")
      .all();
    assert.equal(objects.length, 2);
  } finally {
    db.close();
  }
});

test("a second run leaves the schema and the ledger untouched", () => {
  const db = new Database(":memory:");
  try {
    runMigrations(db as never, { isNewDb: true });
    const before = columns(db, "subs");
    assert.equal(runMigrations(db as never), 0);
    assert.deepEqual(columns(db, "subs"), before);
  } finally {
    db.close();
  }
});

test("stripExistingAddColumns drops only the statements whose column exists", () => {
  const present = new Set(["subs.control_url"]);
  const sql = [
    "-- ALTER TABLE subs ADD COLUMN control_url TEXT;",
    "ALTER TABLE subs ADD COLUMN control_url TEXT;",
    "ALTER TABLE subs ADD COLUMN other TEXT;",
    "",
  ].join("\n");
  const result = stripExistingAddColumns(sql, (t, c) => present.has(`${t}.${c}`));
  assert.deepEqual(result.skipped, ["subs.control_url"]);
  assert.equal(
    result.sql,
    "-- ALTER TABLE subs ADD COLUMN control_url TEXT;\nALTER TABLE subs ADD COLUMN other TEXT;\n"
  );
});

test("stripExistingAddColumns keeps statements on a table that does not exist yet", () => {
  const sql = "CREATE TABLE t (id INTEGER);\nALTER TABLE t ADD COLUMN x TEXT;\n";
  const result = stripExistingAddColumns(sql, () => false);
  assert.deepEqual(result.skipped, []);
  assert.equal(result.sql, sql);
});
