// proxy_logs rotation_account + correlation_id ship as migrations 183/184, with
// idempotency checks keyed by version in migrationRunner's switch. The dangerous
// shape is cross-talk: if a check were registered under a neighbouring version,
// it would answer for that migration's schema and skip it on any database where
// ensureProxyLogsColumns had already added the column at boot. Runs the real
// runner against the real SQL files (179/181/183/184).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../src/lib/db/migrations"
);
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-183-184-"));
for (const file of [
  "179_proxy_logs_upstream_status.sql",
  "181_proxy_logs_proxy_name.sql",
  "183_proxy_logs_rotation_account.sql",
  "184_proxy_logs_correlation_id.sql",
]) {
  fs.copyFileSync(path.join(repoMigrations, file), path.join(migrationsDir, file));
}
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

function columns(db: Database.Database, table: string): string[] {
  return (db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>).map(
    (c) => c.name
  );
}

function ledger(db: Database.Database) {
  return db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all();
}

function legacyDb(withNewColumns: boolean): Database.Database {
  const db = new Database(":memory:");
  db.exec(
    `CREATE TABLE proxy_logs (id TEXT PRIMARY KEY${
      withNewColumns ? ", rotation_account TEXT, correlation_id TEXT" : ""
    });`
  );
  return db;
}

test("columns already added at boot: 179/181 still run, 183/184 recorded without re-adding", () => {
  const db = legacyDb(true);
  try {
    runMigrations(db, { isNewDb: true });
    for (const col of ["upstream_status", "proxy_name", "rotation_account", "correlation_id"]) {
      assert.ok(
        columns(db, "proxy_logs").includes(col),
        `${col} must be present and no neighbour check may skip its migration`
      );
    }
    assert.deepEqual(ledger(db), [
      { version: "179", name: "proxy_logs_upstream_status" },
      { version: "181", name: "proxy_logs_proxy_name" },
      { version: "183", name: "proxy_logs_rotation_account" },
      { version: "184", name: "proxy_logs_correlation_id" },
    ]);
  } finally {
    db.close();
  }
});

test("a database without the columns gets rotation_account + correlation_id from 183/184", () => {
  const db = legacyDb(false);
  try {
    runMigrations(db, { isNewDb: true });
    assert.ok(columns(db, "proxy_logs").includes("rotation_account"));
    assert.ok(columns(db, "proxy_logs").includes("correlation_id"));
  } finally {
    db.close();
  }
});

test("184 creates no index on proxy_logs.correlation_id (join starts from call_logs)", () => {
  const db = legacyDb(false);
  try {
    runMigrations(db, { isNewDb: true });
    const indexes = db
      .prepare("SELECT sql FROM sqlite_master WHERE type = 'index' AND tbl_name = 'proxy_logs'")
      .all() as Array<{ sql: string | null }>;
    const joined = indexes.map((i) => i.sql ?? "").join("\n");
    assert.ok(!joined.includes("correlation_id"), "no proxy_logs index may mention correlation_id");
  } finally {
    db.close();
  }
});
