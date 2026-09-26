// 197 creates agent_sessions; 198 links usage_history rows to it. They are separate files because
// the runner records a file as applied when an ALTER hits "duplicate column name" and rolls the
// rest of that file back: a database that already has the column must still get the table.
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
const MIGRATION_FILES = ["197_agent_sessions.sql", "198_usage_history_agent_session_id.sql"];
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-197-"));
for (const file of MIGRATION_FILES) {
  fs.copyFileSync(path.join(repoMigrations, file), path.join(migrationsDir, file));
}
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

function openDb(withAgentSessionColumn: boolean): Database.Database {
  const db = new Database(":memory:");
  db.exec(
    `CREATE TABLE usage_history (id INTEGER PRIMARY KEY, api_key_id TEXT, timestamp TEXT${
      withAgentSessionColumn ? ", agent_session_id TEXT" : ""
    });`
  );
  return db;
}

function tableExists(db: Database.Database, name: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(name)
  );
}

function usageColumns(db: Database.Database): string[] {
  return (db.prepare("PRAGMA table_info(usage_history)").all() as Array<{ name: string }>).map(
    (column) => column.name
  );
}

function appliedVersions(db: Database.Database): string[] {
  return (
    db.prepare("SELECT version FROM _omniroute_migrations ORDER BY version").all() as Array<{
      version: string;
    }>
  ).map((row) => row.version);
}

test("an older database gains agent_sessions and usage_history.agent_session_id; a rerun is a no-op", () => {
  const db = openDb(false);
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 2);
    assert.ok(tableExists(db, "agent_sessions"));
    assert.ok(usageColumns(db).includes("agent_session_id"));
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
    assert.deepEqual(appliedVersions(db), ["197", "198"]);
  } finally {
    db.close();
  }
});

test("a database that already has the column still gets the agent_sessions table", () => {
  const db = openDb(true);
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 2);
    assert.ok(tableExists(db, "agent_sessions"));
    assert.equal(usageColumns(db).filter((name) => name === "agent_session_id").length, 1);
    assert.deepEqual(appliedVersions(db), ["197", "198"]);
  } finally {
    db.close();
  }
});
