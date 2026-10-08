// proxy_logs.proxy_name ships as migration 181, with its idempotency check keyed by version in
// migrationRunner's switch. The dangerous shape is cross-talk: if 181's check were registered
// under a neighbouring version, it would answer for that migration's schema and skip it on any
// database where ensureProxyLogsColumns had already added the column at boot. Runs the real
// runner against the real SQL files.
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
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-181-"));
for (const file of [
  "179_proxy_logs_upstream_status.sql",
  "181_proxy_logs_proxy_name.sql",
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

function legacyDb(withProxyName: boolean): Database.Database {
  const db = new Database(":memory:");
  db.exec(
    `CREATE TABLE proxy_logs (id TEXT PRIMARY KEY${
      withProxyName ? ", proxy_name TEXT" : ""
    });`
  );
  return db;
}

test("proxy_name already added at boot: 179 still runs, 181 is recorded without re-adding", () => {
  const db = legacyDb(true);
  try {
    runMigrations(db, { isNewDb: true });
    assert.ok(
      columns(db, "proxy_logs").includes("upstream_status"),
      "179_proxy_logs_upstream_status must not be skipped by the 181 idempotency check"
    );
    assert.deepEqual(ledger(db), [
      { version: "179", name: "proxy_logs_upstream_status" },
      { version: "181", name: "proxy_logs_proxy_name" },
    ]);
  } finally {
    db.close();
  }
});

test("a database without the column gets proxy_name from migration 181", () => {
  const db = legacyDb(false);
  try {
    runMigrations(db, { isNewDb: true });
    assert.ok(columns(db, "proxy_logs").includes("proxy_name"));
    assert.ok(columns(db, "proxy_logs").includes("upstream_status"));
  } finally {
    db.close();
  }
});
