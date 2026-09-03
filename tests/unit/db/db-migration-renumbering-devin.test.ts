// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs or exercises a real better-sqlite3-backed SQLite database.
// better-sqlite3 is a native addon; production and CI load it normally, but some
// sandboxes/dev boxes ship a system glibc older than the prebuilt binary requires
// ("GLIBC_2.29 not found"), so the native module fails to dlopen and any test that
// reaches better-sqlite3 directly (or asserts stdout that the load-failure warning
// would pollute) fails HERE while passing in CI. This is a known environment
// limitation, not a defect in the code under test: the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 is unavailable. See
// tests/unit/_helpers/betterSqlite3Availability.ts for a guard helper.
import assert from "node:assert/strict";
import fs, { type PathLike } from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

import Database from "better-sqlite3";

const serial = { concurrency: false };

async function importFresh(modulePath: string) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

function withMockedMigrationFs(files: Record<string, string>, fn: () => void) {
  const originalExistsSync = fs.existsSync;
  const originalReaddirSync = fs.readdirSync;
  const originalReadFileSync = fs.readFileSync;
  const isMigrationDir = (target: PathLike) =>
    String(target).replaceAll("\\", "/").endsWith("/src/lib/db/migrations") ||
    String(target).replaceAll("\\", "/").endsWith("/migrations");

  fs.existsSync = (target) => {
    const fileName = path.basename(String(target));
    if (isMigrationDir(target) || Object.hasOwn(files, fileName)) return true;
    return originalExistsSync(target);
  };
  fs.readdirSync = ((target: PathLike) => {
    if (isMigrationDir(target)) return Object.keys(files);
    return originalReaddirSync(target);
  }) as typeof fs.readdirSync;
  fs.readFileSync = ((target: PathLike, options?: { encoding?: BufferEncoding | null }) => {
    const fileName = path.basename(String(target));
    if (Object.hasOwn(files, fileName)) return files[fileName];
    return originalReadFileSync(target, options);
  }) as typeof fs.readFileSync;

  try {
    fn();
  } finally {
    fs.existsSync = originalExistsSync;
    fs.readdirSync = originalReaddirSync;
    fs.readFileSync = originalReadFileSync;
  }
}

test(
  "reconcileRenumberedMigrations moves legacy Devin Desktop marker 131→151",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = new Database(":memory:");

    try {
      db.exec(`
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "131",
        "windsurf_to_devin_desktop"
      );

      withMockedMigrationFs(
        {
          "131_proxy_subscriptions.sql": "CREATE TABLE proxy_subscriptions (id TEXT PRIMARY KEY);",
          "132_proxy_subscriptions_meta.sql":
            "CREATE TABLE proxy_subscriptions_meta (id TEXT PRIMARY KEY);",
          "135_migrate_model_capability_max_token.sql":
            "CREATE TABLE max_token_migration_ran (id TEXT PRIMARY KEY);",
          "151_windsurf_to_devin_desktop.sql":
            "CREATE TABLE devin_migration_must_not_rerun (id TEXT PRIMARY KEY);",
        },
        () => runner.runMigrations(db)
      );

      const applied = db
        .prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version")
        .all();
      assert.deepEqual(applied, [
        { version: "131", name: "proxy_subscriptions" },
        { version: "132", name: "proxy_subscriptions_meta" },
        { version: "135", name: "migrate_model_capability_max_token" },
        { version: "151", name: "windsurf_to_devin_desktop" },
      ]);
      assert.ok(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("proxy_subscriptions")
      );
      assert.ok(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("proxy_subscriptions_meta")
      );
      assert.ok(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("max_token_migration_ran")
      );
      assert.equal(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("devin_migration_must_not_rerun"),
        undefined
      );
    } finally {
      db.close();
    }
  }
);

test(
  "reconcileRenumberedMigrations frees legacy Devin Desktop slot 135 for its canonical migration",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = new Database(":memory:");

    try {
      db.exec(`
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "135",
        "windsurf_to_devin_desktop"
      );

      withMockedMigrationFs(
        {
          "135_migrate_model_capability_max_token.sql":
            "CREATE TABLE max_token_migration_ran (id TEXT PRIMARY KEY);",
          "151_windsurf_to_devin_desktop.sql":
            "CREATE TABLE devin_migration_must_not_rerun (id TEXT PRIMARY KEY);",
        },
        () => runner.runMigrations(db)
      );

      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "135", name: "migrate_model_capability_max_token" },
          { version: "151", name: "windsurf_to_devin_desktop" },
        ]
      );
      assert.ok(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("max_token_migration_ran")
      );
      assert.equal(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("devin_migration_must_not_rerun"),
        undefined
      );
    } finally {
      db.close();
    }
  }
);

test(
  "reconcileRenumberedMigrations frees legacy Devin Desktop slot 136 for Radar",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = new Database(":memory:");

    try {
      db.exec(`
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "136",
        "windsurf_to_devin_desktop"
      );

      withMockedMigrationFs(
        {
          "136_radar_cache_settings.sql":
            "CREATE TABLE radar_cache_settings_ran (id TEXT PRIMARY KEY);",
          "151_windsurf_to_devin_desktop.sql":
            "CREATE TABLE devin_migration_must_not_rerun (id TEXT PRIMARY KEY);",
        },
        () => runner.runMigrations(db)
      );

      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "136", name: "radar_cache_settings" },
          { version: "151", name: "windsurf_to_devin_desktop" },
        ]
      );
      assert.ok(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("radar_cache_settings_ran")
      );
      assert.equal(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("devin_migration_must_not_rerun"),
        undefined
      );
    } finally {
      db.close();
    }
  }
);

test(
  "reconcileRenumberedMigrations frees legacy Devin Desktop slot 139 for CCR",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = new Database(":memory:");

    try {
      db.exec(`
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "139",
        "windsurf_to_devin_desktop"
      );

      withMockedMigrationFs(
        {
          "139_ccr_blocks.sql": "CREATE TABLE ccr_blocks_migration_ran (id TEXT PRIMARY KEY);",
          "151_windsurf_to_devin_desktop.sql":
            "CREATE TABLE devin_migration_must_not_rerun (id TEXT PRIMARY KEY);",
        },
        () => runner.runMigrations(db)
      );

      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "139", name: "ccr_blocks" },
          { version: "151", name: "windsurf_to_devin_desktop" },
        ]
      );
      assert.ok(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("ccr_blocks_migration_ran")
      );
      assert.equal(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("devin_migration_must_not_rerun"),
        undefined
      );
    } finally {
      db.close();
    }
  }
);

test(
  "reconcileRenumberedMigrations frees published Devin Desktop slot 140 for release",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = new Database(":memory:");

    try {
      db.exec(`
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "140",
        "windsurf_to_devin_desktop"
      );

      withMockedMigrationFs(
        {
          "140_connection_runtime_state.sql":
            "CREATE TABLE connection_runtime_state_ran (id TEXT PRIMARY KEY);",
          "151_windsurf_to_devin_desktop.sql":
            "CREATE TABLE devin_migration_must_not_rerun (id TEXT PRIMARY KEY);",
        },
        () => runner.runMigrations(db)
      );

      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "140", name: "connection_runtime_state" },
          { version: "151", name: "windsurf_to_devin_desktop" },
        ]
      );
      assert.ok(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("connection_runtime_state_ran")
      );
      assert.equal(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("devin_migration_must_not_rerun"),
        undefined
      );
    } finally {
      db.close();
    }
  }
);

test(
  "reconcileRenumberedMigrations frees published Devin Desktop slot 143 for retired purge",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = new Database(":memory:");

    try {
      db.exec(`
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
      `);
      db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
        "143",
        "windsurf_to_devin_desktop"
      );

      withMockedMigrationFs(
        {
          "143_retired_provider_purge.sql":
            "CREATE TABLE retired_provider_purge_ran (id TEXT PRIMARY KEY);",
          "151_windsurf_to_devin_desktop.sql":
            "CREATE TABLE devin_migration_must_not_rerun (id TEXT PRIMARY KEY);",
        },
        () => runner.runMigrations(db)
      );

      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "143", name: "retired_provider_purge" },
          { version: "151", name: "windsurf_to_devin_desktop" },
        ]
      );
      assert.ok(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("retired_provider_purge_ran")
      );
      assert.equal(
        db
          .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
          .get("devin_migration_must_not_rerun"),
        undefined
      );
    } finally {
      db.close();
    }
  }
);
