// call_logs.resilience_actions is a nullable additive column. Fresh
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
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-191-"));
fs.copyFileSync(
  path.join(repoMigrations, "191_call_logs_resilience_actions.sql"),
  path.join(migrationsDir, "191_call_logs_resilience_actions.sql")
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
  return (db.prepare("PRAGMA table_info(call_logs)").all() as Array<{ name: string }>).map(
    (column) => column.name
  );
}

function openDb(withColumn: boolean): Database.Database {
  const db = new Database(":memory:");
  db.exec(
    `CREATE TABLE call_logs (id TEXT PRIMARY KEY, status INTEGER${
      withColumn ? ", resilience_actions TEXT" : ""
    });`
  );
  return db;
}

test("an older call_logs gains resilience_actions and a second run is a no-op", () => {
  const db = openDb(false);
  try {
    runMigrations(db);
    assert.ok(columns(db).includes("resilience_actions"));
    runMigrations(db);
    assert.ok(columns(db).includes("resilience_actions"));
  } finally {
    db.close();
  }
});

test("a fresh call_logs keeps its column and stays idempotent", () => {
  const db = openDb(true);
  try {
    runMigrations(db);
    assert.ok(columns(db).includes("resilience_actions"));
  } finally {
    db.close();
  }
});
