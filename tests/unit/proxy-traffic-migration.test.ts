import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { DatabaseSync } from "node:sqlite";
import { createNodeSqliteAdapterFromDatabase } from "../../src/lib/db/adapters/nodeSqliteShared.ts";

fs.mkdirSync(path.resolve("_artifacts"), { recursive: true });
const fixtureDir = fs.mkdtempSync(path.resolve("_artifacts/traffic-migration-"));
const originalEnv = { ...process.env };
for (const key of Object.keys(process.env)) delete process.env[key];
for (const key of ["PATH", "SystemRoot", "WINDIR", "COMSPEC", "PATHEXT", "NODE_TEST_CONTEXT"]) {
  if (originalEnv[key]) process.env[key] = originalEnv[key];
}
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA", "TEMP", "TMP"]) {
  process.env[key] = fixtureDir;
}
for (const key of ["SQLITE_FILE", "OMNIROUTE_SQLITE_FILE"]) {
  process.env[key] = path.join(fixtureDir, "isolated.sqlite");
}
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = "1";
process.env.OMNIROUTE_PLUGINS_DIR = path.join(fixtureDir, "plugins");
process.env.OMNIROUTE_MIGRATIONS_DIR = fixtureDir;

const sql = fs.readFileSync(
  new URL("../../src/lib/db/migrations/206_proxy_payload_traffic.sql", import.meta.url),
  "utf8"
);
fs.writeFileSync(path.join(fixtureDir, "206_proxy_payload_traffic.sql"), sql, "utf8");
// All state paths are isolated before loading the real migration orchestrator.
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const { hasLedgerRepairCandidates, reconcileRenumberedMigrations } =
  await import("../../src/lib/db/migrationRunner/schemaState.ts");

test(
  "retired-slot opt-in does not relax other renames or rewrite unknown source history",
  { timeout: 1000 },
  () => {
    const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
    try {
      db.exec(`CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY, name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO _omniroute_migrations (version, name) VALUES
        ('028', 'compression_settings'), ('207', 'unknown_history');`);
      const files = [
        { version: "034", name: "compression_settings", path: "unused.sql" },
        { version: "206", name: "proxy_payload_traffic", path: "unused.sql" },
      ];
      const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
      assert.equal(hasLedgerRepairCandidates(db, files), false);
      assert.equal(reconcileRenumberedMigrations(db, files), false);
      assert.deepEqual(
        db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
        before
      );
    } finally {
      db.close();
    }
  }
);

test.after(() => {
  fs.rmSync(fixtureDir, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});

test(
  "traffic migration upgrades fresh and published ledgers without losing counters",
  { timeout: 3000 },
  () => {
    for (const versions of [[], ["207"], ["206"], ["206", "207"]]) {
      const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
      try {
        db.exec(`CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY, name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );`);
        if (versions.length) {
          db.exec(sql);
          db.exec(`INSERT INTO proxy_payload_traffic
          (route_key, route_kind, upload_bytes, download_bytes, attempts, started_at, updated_at)
          VALUES ('direct', 'direct', 6, 13, 2, 'fixture-start', 'fixture-update');`);
        }
        for (const version of versions) {
          db.prepare(
            "INSERT INTO _omniroute_migrations (version, name, applied_at) VALUES (?, ?, ?)"
          ).run(version, "proxy_payload_traffic", "fixture-applied");
        }
        assert.equal(runMigrations(db, { isNewDb: true }), versions.length ? 0 : 1);
        assert.deepEqual(
          db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
          [{ version: "206", name: "proxy_payload_traffic" }],
          `canonical ledger after ${versions.join(",") || "fresh"} startup`
        );
        if (versions.length) {
          assert.deepEqual(db.prepare("SELECT * FROM proxy_payload_traffic").all(), [
            {
              route_key: "direct",
              proxy_id: null,
              route_kind: "direct",
              upload_bytes: 6,
              download_bytes: 13,
              attempts: 2,
              known_upload_attempts: 0,
              completed_downloads: 0,
              failed_attempts: 0,
              cancelled_downloads: 0,
              errored_downloads: 0,
              started_at: "fixture-start",
              updated_at: "fixture-update",
            },
          ]);
          assert.equal(
            (
              db.prepare("SELECT applied_at FROM _omniroute_migrations").get() as {
                applied_at: string;
              }
            ).applied_at,
            "fixture-applied"
          );
        }
        assert.equal(runMigrations(db, { isNewDb: true }), 0, "repeated startup must be a no-op");
      } finally {
        db.close();
      }
    }
  }
);

test(
  "an occupied canonical slot fails without rewriting unknown history or traffic rows",
  { timeout: 1000 },
  () => {
    const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
    try {
      db.exec(sql);
      db.exec(`CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO _omniroute_migrations (version, name) VALUES
      ('206', 'unrelated_migration'), ('207', 'proxy_payload_traffic');
    INSERT INTO proxy_payload_traffic (route_key, route_kind, attempts, started_at, updated_at)
      VALUES ('direct', 'direct', 9, 'start', 'update');`);
      const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
      assert.throws(() => runMigrations(db, { isNewDb: true }), /target version 206 is occupied/);
      assert.deepEqual(
        db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
        before
      );
      assert.equal(
        (db.prepare("SELECT attempts FROM proxy_payload_traffic").get() as { attempts: number })
          .attempts,
        9
      );
    } finally {
      db.close();
    }
  }
);
