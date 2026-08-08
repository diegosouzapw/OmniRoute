import assert from "node:assert/strict";
import fs, { type PathLike } from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

import Database from "better-sqlite3";

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

test("legacy retired-provider purge marker 137 moves to 143 and frees release migration 137", async () => {
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
      "137",
      "retired_provider_purge"
    );

    withMockedMigrationFs(
      {
        "137_auto_restart_adopted.sql":
          "CREATE TABLE auto_restart_migration_ran (id TEXT PRIMARY KEY);",
        "143_retired_provider_purge.sql":
          "CREATE TABLE retired_provider_purge_must_not_rerun (id TEXT PRIMARY KEY);",
      },
      () => runner.runMigrations(db)
    );

    assert.deepEqual(
      db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
      [
        { version: "137", name: "auto_restart_adopted" },
        { version: "143", name: "retired_provider_purge" },
      ]
    );
    assert.ok(
      db
        .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get("auto_restart_migration_ran")
    );
    assert.equal(
      db
        .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get("retired_provider_purge_must_not_rerun"),
      undefined
    );
  } finally {
    db.close();
  }
});

test("legacy retired-provider purge marker 141 moves to 143 and frees modality bridge 141", async () => {
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
      "141",
      "retired_provider_purge"
    );

    withMockedMigrationFs(
      {
        "141_modality_bridge_settings.sql":
          "CREATE TABLE modality_bridge_settings_ran (id TEXT PRIMARY KEY);",
        "143_retired_provider_purge.sql":
          "CREATE TABLE retired_provider_purge_must_not_rerun (id TEXT PRIMARY KEY);",
      },
      () => runner.runMigrations(db)
    );

    assert.deepEqual(
      db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
      [
        { version: "141", name: "modality_bridge_settings" },
        { version: "143", name: "retired_provider_purge" },
      ]
    );
    assert.ok(
      db
        .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get("modality_bridge_settings_ran")
    );
    assert.equal(
      db
        .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get("retired_provider_purge_must_not_rerun"),
      undefined
    );
  } finally {
    db.close();
  }
});

test("legacy retired-provider purge marker 142 moves to 143 and frees Radar referrals 142", async () => {
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
      "142",
      "retired_provider_purge"
    );

    withMockedMigrationFs(
      {
        "142_radar_referrals_cache.sql":
          "CREATE TABLE radar_referrals_cache_ran (id TEXT PRIMARY KEY);",
        "143_retired_provider_purge.sql":
          "CREATE TABLE retired_provider_purge_must_not_rerun (id TEXT PRIMARY KEY);",
      },
      () => runner.runMigrations(db)
    );

    assert.deepEqual(
      db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
      [
        { version: "142", name: "radar_referrals_cache" },
        { version: "143", name: "retired_provider_purge" },
      ]
    );
    assert.ok(
      db
        .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get("radar_referrals_cache_ran")
    );
    assert.equal(
      db
        .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?")
        .get("retired_provider_purge_must_not_rerun"),
      undefined
    );
  } finally {
    db.close();
  }
});
