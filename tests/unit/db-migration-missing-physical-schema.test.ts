// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs a real better-sqlite3 database. Production and CI load the
// native addon normally; see tests/unit/_helpers/betterSqlite3Availability.ts for
// the documented fallback context on older sandboxes.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

import Database from "better-sqlite3";

const isIsolatedChild = process.env.OMNIROUTE_DB_MIGRATION_SAFETY_CHILD === "1";

if (!isIsolatedChild) {
  test("historical migration repair scenarios pass in an isolated process", () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-schema-repair-data-"));
    const migrationsDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "omniroute-schema-repair-migrations-")
    );

    try {
      const childEnv = {
        ...process.env,
        DATA_DIR: dataDir,
        OMNIROUTE_DB_MIGRATION_SAFETY_CHILD: "1",
        OMNIROUTE_MAX_PENDING_MIGRATIONS: "",
        OMNIROUTE_MIGRATIONS_DIR: migrationsDir,
      };
      // Node's test runner exports this only to the current test worker. Passing it into
      // another `node --test` process makes Node classify the nested file as recursive and
      // skip every subtest while returning exit 0 — a dangerous false green.
      delete childEnv.NODE_TEST_CONTEXT;

      const result = spawnSync(
        process.execPath,
        ["--import", "tsx/esm", "--test", fileURLToPath(import.meta.url)],
        {
          cwd: process.cwd(),
          encoding: "utf8",
          env: childEnv,
        }
      );

      assert.equal(
        result.status,
        0,
        `isolated migration regressions failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`
      );
      assert.match(result.stdout, /\btests 13\b/, "the isolated child must execute all subtests");
      assert.match(result.stdout, /\bpass 13\b/, "the isolated child must pass all subtests");
    } finally {
      fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });
} else {
  const dataDir = process.env.DATA_DIR;
  const migrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
  assert.ok(dataDir, "isolated child requires an explicit DATA_DIR");
  assert.ok(migrationsDir, "isolated child requires an explicit migrations directory");
  const discoveryMigrationSql = fs.readFileSync(
    path.resolve("src/lib/db/migrations/074_discovery_results.sql"),
    "utf8"
  );

  fs.writeFileSync(
    path.join(migrationsDir, "074_discovery_results.sql"),
    discoveryMigrationSql,
    "utf8"
  );
  fs.writeFileSync(
    path.join(migrationsDir, "081_inspector_custom_hosts.sql"),
    `
    CREATE TABLE IF NOT EXISTS inspector_custom_hosts (
      host TEXT PRIMARY KEY,
      enabled INTEGER NOT NULL DEFAULT 1
    );
    CREATE INDEX IF NOT EXISTS idx_inspector_custom_hosts_enabled
      ON inspector_custom_hosts(enabled);
  `,
    "utf8"
  );
  fs.writeFileSync(
    path.join(migrationsDir, "151_windsurf_to_devin_desktop.sql"),
    "UPDATE discovery_results SET provider_id = 'devin-desktop' WHERE provider_id = 'windsurf';",
    "utf8"
  );
  fs.writeFileSync(
    path.join(migrationsDir, "152_remove_puter_provider.sql"),
    "DELETE FROM discovery_results WHERE provider_id = 'puter';",
    "utf8"
  );

  const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

  function listPreMigrationBackups(): string[] {
    const backupDir = path.join(dataDir, "db_backups");
    if (!fs.existsSync(backupDir)) return [];
    return fs
      .readdirSync(backupDir)
      .filter((name) => name.endsWith("_pre-migration.sqlite"))
      .sort();
  }

  function withNonTestEnvironment<T>(fn: () => T): T {
    const previousNodeEnv = process.env.NODE_ENV;
    const previousVitest = process.env.VITEST;
    const previousArgv = [...process.argv];
    const previousExecArgv = [...process.execArgv];

    delete process.env.NODE_ENV;
    delete process.env.VITEST;
    process.argv = process.argv.filter((arg) => !arg.includes("test"));
    process.execArgv = process.execArgv.filter((arg) => !arg.includes("test"));

    try {
      return fn();
    } finally {
      process.argv = previousArgv;
      process.execArgv = previousExecArgv;
      if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
      else process.env.NODE_ENV = previousNodeEnv;
      if (previousVitest === undefined) delete process.env.VITEST;
      else process.env.VITEST = previousVitest;
    }
  }

  test.after(() => {
    // The parent owns both explicit temp directories and removes them after this
    // process exits. Keeping ownership there also covers child startup failures.
  });

  test("runner repairs the 074 inspector collision before migrations 151 and 152", () => {
    const db = new Database(":memory:");

    try {
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE TABLE inspector_custom_hosts (
        host TEXT PRIMARY KEY,
        enabled INTEGER NOT NULL DEFAULT 1
      );
      INSERT INTO inspector_custom_hosts (host, enabled)
      VALUES ('api.example.test', 1);
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('074', 'inspector_custom_hosts');
    `);

      assert.equal(
        db
          .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'discovery_results'"
          )
          .get(),
        undefined,
        "precondition: the collided 074 marker hides the missing discovery_results table"
      );

      assert.equal(runMigrations(db as never), 3);

      assert.ok(
        db
          .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'discovery_results'"
          )
          .get(),
        "074 must be replayed before migrations 151 and 152 reference discovery_results"
      );
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "074", name: "discovery_results" },
          { version: "081", name: "inspector_custom_hosts" },
          { version: "151", name: "windsurf_to_devin_desktop" },
          { version: "152", name: "remove_puter_provider" },
        ]
      );
      assert.deepEqual(
        db.prepare("SELECT host, enabled FROM inspector_custom_hosts").get(),
        { host: "api.example.test", enabled: 1 },
        "re-homing the inspector marker to 081 must preserve the existing table data"
      );
      assert.equal(runMigrations(db as never), 0, "the repaired state must be idempotent");
    } finally {
      db.close();
    }
  });

  test("runner rehomes a collided 074 inspector marker even when both tables exist", () => {
    const db = new Database(":memory:");

    try {
      db.exec(discoveryMigrationSql);
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE TABLE inspector_custom_hosts (
        host TEXT PRIMARY KEY,
        enabled INTEGER NOT NULL DEFAULT 1
      );
      INSERT INTO inspector_custom_hosts (host, enabled)
      VALUES ('api.example.test', 1);
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('074', 'inspector_custom_hosts');
    `);

      assert.equal(runMigrations(db as never), 3);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "074", name: "discovery_results" },
          { version: "081", name: "inspector_custom_hosts" },
          { version: "151", name: "windsurf_to_devin_desktop" },
          { version: "152", name: "remove_puter_provider" },
        ],
        "the old 074 name must not remain as a permanent CRITICAL mismatch"
      );
      assert.deepEqual(db.prepare("SELECT host FROM inspector_custom_hosts").get(), {
        host: "api.example.test",
      });
    } finally {
      db.close();
    }
  });

  test("runner rebuilds both collided tables when neither physical table survived", () => {
    const db = new Database(":memory:");

    try {
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('074', 'inspector_custom_hosts');
    `);

      assert.equal(runMigrations(db as never), 4);
      assert.ok(
        db
          .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'discovery_results'"
          )
          .get(),
        "the canonical 074 table must be restored"
      );
      assert.ok(
        db
          .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'inspector_custom_hosts'"
          )
          .get(),
        "the rehomed 081 marker must not hide a missing inspector table"
      );
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "074", name: "discovery_results" },
          { version: "081", name: "inspector_custom_hosts" },
          { version: "151", name: "windsurf_to_devin_desktop" },
          { version: "152", name: "remove_puter_provider" },
        ]
      );
    } finally {
      db.close();
    }
  });

  test("runner atomically replays 081 when its marker exists without the inspector table", () => {
    const db = new Database(":memory:");

    try {
      db.exec(discoveryMigrationSql);
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('074', 'discovery_results');
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('081', 'inspector_custom_hosts');
    `);

      assert.equal(runMigrations(db as never), 3);
      assert.ok(
        db
          .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'inspector_custom_hosts'"
          )
          .get(),
        "a valid 081 marker must be replayed when its physical table is absent"
      );
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "074", name: "discovery_results" },
          { version: "081", name: "inspector_custom_hosts" },
          { version: "151", name: "windsurf_to_devin_desktop" },
          { version: "152", name: "remove_puter_provider" },
        ]
      );
    } finally {
      db.close();
    }
  });

  test("runner fails closed when target 081 has unknown provenance", () => {
    const db = new Database(":memory:");

    try {
      db.exec(`
      CREATE TABLE inspector_custom_hosts (
        host TEXT PRIMARY KEY,
        enabled INTEGER NOT NULL DEFAULT 1
      );
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('074', 'inspector_custom_hosts');
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('081', 'unknown_historical_migration');
    `);

      assert.throws(
        () => runMigrations(db as never),
        /target version 081 is occupied by unknown migration/i
      );
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "074", name: "inspector_custom_hosts" },
          { version: "081", name: "unknown_historical_migration" },
        ],
        "a target collision must preserve both provenance records"
      );
    } finally {
      db.close();
    }
  });

  test("runner rejects an unknown 074 marker even when all later migrations are marked", () => {
    const db = new Database(":memory:");

    try {
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('074', 'unknown_historical_migration');
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('081', 'inspector_custom_hosts');
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('151', 'windsurf_to_devin_desktop');
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('152', 'remove_puter_provider');
    `);

      assert.throws(
        () => runMigrations(db as never),
        /required table "discovery_results" is missing.*unknown migration/i,
        "unknown provenance must fail closed instead of being silently rewritten"
      );
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "074", name: "unknown_historical_migration" },
          { version: "081", name: "inspector_custom_hosts" },
          { version: "151", name: "windsurf_to_devin_desktop" },
          { version: "152", name: "remove_puter_provider" },
        ]
      );
    } finally {
      db.close();
    }
  });

  test("runner backs up an existing DB before reopening its only applied marker", () => {
    const sqlitePath = path.join(dataDir, "only-marker.sqlite");
    const db = new Database(sqlitePath);
    const previousDisableBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;

    try {
      delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      db.exec(`
      CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO provider_connections (id) VALUES ('existing-data');
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('074', 'discovery_results');
    `);

      assert.equal(runMigrations(db as never), 4);

      const backupDir = path.join(dataDir, "db_backups");
      const backups = fs
        .readdirSync(backupDir)
        .filter((name) => name.endsWith("_pre-migration.sqlite"));
      assert.equal(
        backups.length,
        1,
        "removing the only marker must not make an existing DB look fresh and skip its snapshot"
      );
    } finally {
      db.close();
      if (previousDisableBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      else process.env.DISABLE_SQLITE_AUTO_BACKUP = previousDisableBackup;
    }
  });

  test("snapshot publication never deletes a raced final path", () => {
    const sqlitePath = path.join(dataDir, "snapshot-publish-race.sqlite");
    const db = new Database(sqlitePath);
    const previousDisableBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;
    const originalLinkSync = fs.linkSync;
    let racedFinalPath: string | null = null;

    try {
      delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      db.exec(`
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        INSERT INTO _omniroute_migrations (version, name)
        VALUES ('074', 'discovery_results');
      `);

      fs.linkSync = ((_existingPath: fs.PathLike, newPath: fs.PathLike) => {
        racedFinalPath = String(newPath);
        fs.writeFileSync(racedFinalPath, "third-party-sentinel");
        throw Object.assign(new Error("destination already exists"), { code: "EEXIST" });
      }) as typeof fs.linkSync;

      assert.throws(
        () => runMigrations(db as never),
        /without a durable snapshot/,
        "a raced final name must fail closed before atomic replay"
      );
      assert.ok(racedFinalPath);
      assert.equal(
        fs.readFileSync(racedFinalPath, "utf8"),
        "third-party-sentinel",
        "snapshot failure cleanup must never unlink another actor's final path"
      );
      assert.deepEqual(db.prepare("SELECT version, name FROM _omniroute_migrations").all(), [
        { version: "074", name: "discovery_results" },
      ]);
    } finally {
      fs.linkSync = originalLinkSync;
      if (racedFinalPath && fs.existsSync(racedFinalPath)) fs.unlinkSync(racedFinalPath);
      db.close();
      if (previousDisableBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      else process.env.DISABLE_SQLITE_AUTO_BACKUP = previousDisableBackup;
    }
  });

  test("snapshot publication fails closed when hard links are unsupported", () => {
    const sqlitePath = path.join(dataDir, "snapshot-publish-fallback.sqlite");
    const db = new Database(sqlitePath);
    const previousDisableBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;
    const originalLinkSync = fs.linkSync;
    const backupsBefore = listPreMigrationBackups();

    try {
      delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      db.exec(`
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        INSERT INTO _omniroute_migrations (version, name)
        VALUES ('074', 'discovery_results');
      `);
      fs.linkSync = (() => {
        throw Object.assign(new Error("hard links unsupported"), { code: "ENOTSUP" });
      }) as typeof fs.linkSync;

      assert.throws(
        () => runMigrations(db as never),
        /durable snapshot.*hard links unsupported.*hard links.*synchronization/is
      );
      assert.deepEqual(db.prepare("SELECT version, name FROM _omniroute_migrations").all(), [
        { version: "074", name: "discovery_results" },
      ]);
      assert.equal(
        db
          .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'discovery_results'"
          )
          .get(),
        undefined
      );
      assert.deepEqual(listPreMigrationBackups(), backupsBefore);
    } finally {
      fs.linkSync = originalLinkSync;
      db.close();
      if (previousDisableBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      else process.env.DISABLE_SQLITE_AUTO_BACKUP = previousDisableBackup;
    }
  });

  test("an only-marker repair cannot disarm the mass-migration barrier on retry", () => {
    const sqlitePath = path.join(dataDir, "only-marker-mass-safety.sqlite");
    const db = new Database(sqlitePath);
    const previousDisableBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;
    const previousMaxPending = process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;

    try {
      process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
      process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = "1";
      db.exec(`
      CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
      CREATE TABLE inspector_custom_hosts (
        host TEXT PRIMARY KEY,
        enabled INTEGER NOT NULL DEFAULT 1
      );
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO provider_connections (id) VALUES ('existing-data');
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('074', 'inspector_custom_hosts');
    `);

      const runOnce = () => withNonTestEnvironment(() => runMigrations(db as never));
      const backupsBefore = listPreMigrationBackups();

      assert.throws(runOnce, /threshold is 1/i);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations").all(),
        [{ version: "074", name: "inspector_custom_hosts" }],
        "an abort must restore the marker that was rehomed to calculate the real pending set"
      );
      const afterFirstAbort = listPreMigrationBackups();
      const created = afterFirstAbort.filter((name) => !backupsBefore.includes(name));
      assert.equal(created.length, 1, "the first abort must retain one restore point");
      assert.match(created[0]!, /^db_state-[a-f0-9]{64}_pre-migration\.sqlite$/);

      assert.throws(runOnce, /threshold is 1/i);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations").all(),
        [{ version: "074", name: "inspector_custom_hosts" }],
        "the second startup must hit the same barrier instead of treating the DB as fresh"
      );
      assert.deepEqual(
        listPreMigrationBackups(),
        afterFirstAbort,
        "the identical retry must reuse the first content-addressed snapshot"
      );
    } finally {
      db.close();
      if (previousDisableBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      else process.env.DISABLE_SQLITE_AUTO_BACKUP = previousDisableBackup;
      if (previousMaxPending === undefined) delete process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
      else process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = previousMaxPending;
    }
  });

  test("a failed atomic 074 replay restores its marker and does not churn snapshots", () => {
    const sqlitePath = path.join(dataDir, "failed-atomic-replay.sqlite");
    const db = new Database(sqlitePath);
    const previousDisableBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;

    try {
      delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('074', 'discovery_results');
      CREATE TRIGGER block_migration_ledger_replay
      BEFORE INSERT ON _omniroute_migrations
      WHEN NEW.version = '074'
      BEGIN
        SELECT RAISE(ABORT, 'ledger replay blocked');
      END;
    `);

      const runOnce = () => runMigrations(db as never);
      const backupsBefore = listPreMigrationBackups();

      assert.throws(runOnce, /ledger replay blocked/);
      assert.deepEqual(db.prepare("SELECT version, name FROM _omniroute_migrations").all(), [
        { version: "074", name: "discovery_results" },
      ]);
      assert.equal(
        db
          .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'discovery_results'"
          )
          .get(),
        undefined,
        "the table creation and marker replacement must roll back together"
      );
      const afterFirstFailure = listPreMigrationBackups();
      const created = afterFirstFailure.filter((name) => !backupsBefore.includes(name));
      assert.equal(created.length, 1, "the first failed replay must retain one restore point");
      assert.match(created[0]!, /^db_state-[a-f0-9]{64}_pre-migration\.sqlite$/);

      assert.throws(runOnce, /ledger replay blocked/);
      assert.deepEqual(
        listPreMigrationBackups(),
        afterFirstFailure,
        "the identical failed replay must reuse its content-addressed restore point"
      );
    } finally {
      db.close();
      if (previousDisableBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      else process.env.DISABLE_SQLITE_AUTO_BACKUP = previousDisableBackup;
    }
  });

  test("sql.js rolls ledger repairs back when the mass-migration barrier aborts", async () => {
    const sqlitePath = path.join(dataDir, "sqljs-mass-safety.sqlite");
    const { createSqlJsAdapter } = await import("../../src/lib/db/adapters/sqljsAdapter.ts");
    const db = await createSqlJsAdapter(sqlitePath);
    const previousMaxPending = process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
    const backupsBefore = listPreMigrationBackups();

    try {
      process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = "1";
      db.exec(`
        CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
        CREATE TABLE inspector_custom_hosts (
          host TEXT PRIMARY KEY,
          enabled INTEGER NOT NULL DEFAULT 1
        );
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        INSERT INTO provider_connections (id) VALUES ('existing-data');
        INSERT INTO inspector_custom_hosts (host) VALUES ('api.example.test');
        INSERT INTO _omniroute_migrations (version, name)
        VALUES ('074', 'inspector_custom_hosts');
      `);

      const runOnce = () => withNonTestEnvironment(() => runMigrations(db));
      const expectedLedger = [{ version: "074", name: "inspector_custom_hosts" }];

      assert.throws(runOnce, /threshold is 1/i);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        expectedLedger,
        "sql.js must roll the compatibility repair back with the safety savepoint"
      );
      const afterFirstAbort = listPreMigrationBackups();
      const created = afterFirstAbort.filter((name) => !backupsBefore.includes(name));
      assert.equal(created.length, 1, "the first sql.js abort must retain one host snapshot");
      assert.match(created[0]!, /^db_state-[a-f0-9]{64}_pre-migration\.sqlite$/);

      assert.throws(runOnce, /threshold is 1/i);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        expectedLedger,
        "a retry must see the same original ledger rather than committed repair residue"
      );
      assert.deepEqual(
        listPreMigrationBackups(),
        afterFirstAbort,
        "the identical sql.js abort must reuse its content-addressed snapshot"
      );
    } finally {
      db.close();
      if (previousMaxPending === undefined) delete process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
      else process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = previousMaxPending;
    }
  });

  test("sql.js exports a real host snapshot before replaying 074", async () => {
    const sqlitePath = path.join(dataDir, "sqljs-physical-replay.sqlite");
    const { createSqlJsAdapter } = await import("../../src/lib/db/adapters/sqljsAdapter.ts");
    const db = await createSqlJsAdapter(sqlitePath);
    const previousDisableBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;
    const backupsBefore = listPreMigrationBackups();

    try {
      delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      db.exec(`
      PRAGMA user_version = 42;
      PRAGMA application_id = 1337;
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO _omniroute_migrations (version, name)
      VALUES ('074', 'discovery_results');
      CREATE TRIGGER block_sqljs_ledger_replay
      BEFORE INSERT ON _omniroute_migrations
      WHEN NEW.version = '074'
      BEGIN
        SELECT RAISE(ABORT, 'sqljs ledger replay blocked');
      END;
    `);

      assert.throws(() => runMigrations(db), /sqljs ledger replay blocked/);
      assert.deepEqual(db.prepare("SELECT version, name FROM _omniroute_migrations").all(), [
        { version: "074", name: "discovery_results" },
      ]);
      assert.equal(
        db
          .prepare(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'discovery_results'"
          )
          .get(),
        undefined,
        "sql.js must roll back the table and marker replacement together"
      );
      const afterFirstFailure = listPreMigrationBackups();
      const firstCreated = afterFirstFailure.filter((name) => !backupsBefore.includes(name));
      assert.equal(firstCreated.length, 1, "sql.js must retain one host restore point");

      assert.throws(() => runMigrations(db), /sqljs ledger replay blocked/);
      assert.deepEqual(
        listPreMigrationBackups(),
        afterFirstFailure,
        "the identical sql.js failure must reuse its content-addressed snapshot"
      );

      db.exec("DROP TRIGGER block_sqljs_ledger_replay");
      assert.equal(runMigrations(db), 4);

      const created = listPreMigrationBackups().filter((name) => !backupsBefore.includes(name));
      assert.equal(
        created.length,
        2,
        `dropping the trigger changes the DB state and must create a second snapshot: ${created}`
      );

      const snapshot = new Database(path.join(dataDir, "db_backups", created[0]!), {
        readonly: true,
      });
      try {
        assert.equal(snapshot.pragma("integrity_check", { simple: true }), "ok");
        assert.equal(snapshot.pragma("user_version", { simple: true }), 42);
        assert.equal(snapshot.pragma("application_id", { simple: true }), 1337);
        const snapshotBytes = fs.readFileSync(path.join(dataDir, "db_backups", created[0]!));
        assert.equal(snapshotBytes.readUInt32BE(24), 1);
        assert.equal(
          snapshotBytes.readUInt32BE(92),
          snapshotBytes.readUInt32BE(24),
          "the normalized SQLite change counter and version-valid-for fields must agree"
        );
        assert.deepEqual(
          snapshot.prepare("SELECT version, name FROM _omniroute_migrations").all(),
          [{ version: "074", name: "discovery_results" }]
        );
        assert.equal(
          snapshot
            .prepare(
              "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'discovery_results'"
            )
            .get(),
          undefined,
          "the snapshot must contain the complete pre-replay image"
        );
      } finally {
        snapshot.close();
      }

      const { listDbBackups } = await import("../../src/lib/db/backup.ts");
      const listed = await listDbBackups();
      assert.equal(
        listed.find((backup) => backup.id === created[0])?.reason,
        "pre-migration",
        "the content address must not change the public backup reason"
      );

      db.close();
      const reopened = await createSqlJsAdapter(sqlitePath);
      try {
        assert.deepEqual(
          reopened
            .prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version")
            .all(),
          [
            { version: "074", name: "discovery_results" },
            { version: "081", name: "inspector_custom_hosts" },
            { version: "151", name: "windsurf_to_devin_desktop" },
            { version: "152", name: "remove_puter_provider" },
          ]
        );
        assert.ok(
          reopened
            .prepare(
              "SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_discovery_results_provider'"
            )
            .get()
        );
        assert.ok(
          reopened
            .prepare(
              "SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_discovery_results_status'"
            )
            .get()
        );
      } finally {
        reopened.close();
      }
    } finally {
      if (db.open) db.close();
      if (previousDisableBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
      else process.env.DISABLE_SQLITE_AUTO_BACKUP = previousDisableBackup;
    }
  });
}
