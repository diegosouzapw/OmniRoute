// proxy_logs.upstream_status ships as migration 179. Its idempotency check lives in
// migrationRunner's version-keyed switch, so the number there must match the file: under the
// colliding "177" key the check would answer for 177_provider_connection_synced_models_at and
// skip that unrelated migration on any database whose proxy_logs already had the column
// (ensureProxyLogsColumns adds it at boot). Runs the real runner on the real SQL files.
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
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-179-"));
for (const file of [
  "177_provider_connection_synced_models_at.sql",
  "179_proxy_logs_upstream_status.sql",
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

function legacyDb(withUpstreamStatus: boolean): Database.Database {
  const db = new Database(":memory:");
  db.exec(`
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
    CREATE TABLE proxy_logs (id TEXT PRIMARY KEY${withUpstreamStatus ? ", upstream_status INTEGER" : ""});
  `);
  return db;
}

test("proxy_logs.upstream_status already added at boot: 177 still runs, 179 is skipped", () => {
  const db = legacyDb(true);
  try {
    runMigrations(db, { isNewDb: true });
    assert.ok(
      columns(db, "provider_connections").includes("synced_models_at"),
      "177_provider_connection_synced_models_at must not be skipped by the 179 idempotency check"
    );
    assert.deepEqual(ledger(db), [
      { version: "177", name: "provider_connection_synced_models_at" },
      { version: "179", name: "proxy_logs_upstream_status" },
    ]);
  } finally {
    db.close();
  }
});

test("a database without the column gets it from migration 179", () => {
  const db = legacyDb(false);
  try {
    runMigrations(db, { isNewDb: true });
    assert.ok(columns(db, "proxy_logs").includes("upstream_status"));
    assert.ok(columns(db, "provider_connections").includes("synced_models_at"));
  } finally {
    db.close();
  }
});
