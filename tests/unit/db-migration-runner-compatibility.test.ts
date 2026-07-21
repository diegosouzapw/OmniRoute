import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import Database from "better-sqlite3";

const serial = { concurrency: false };

async function importFresh(modulePath) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

function withMockedMigrationFs(files, fn) {
  const originalExistsSync = fs.existsSync;
  const originalReaddirSync = fs.readdirSync;
  const originalReadFileSync = fs.readFileSync;

  const isMigrationDir = (target) =>
    String(target).replaceAll("\\", "/").endsWith("/src/lib/db/migrations") ||
    String(target).replaceAll("\\", "/").endsWith("/migrations");

  fs.existsSync = (target) => {
    if (files === null && isMigrationDir(target)) return false;
    if (files && isMigrationDir(target)) return true;

    const fileName = path.basename(String(target));
    if (files && Object.hasOwn(files, fileName)) return true;

    return originalExistsSync(target);
  };

  fs.readdirSync = ((target: string, options?: any) => {
    if (files && isMigrationDir(target)) {
      return Object.keys(files);
    }

    return originalReaddirSync(target, options);
  }) as any;

  fs.readFileSync = (target, options) => {
    const fileName = path.basename(String(target));
    if (files && Object.hasOwn(files, fileName)) {
      return files[fileName];
    }

    return originalReadFileSync(target, options);
  };

  try {
    return fn();
  } finally {
    fs.existsSync = originalExistsSync;
    fs.readdirSync = originalReaddirSync;
    fs.readFileSync = originalReadFileSync;
  }
}

function createDb() {
  return new Database(":memory:");
}

test(
  "renumbered fleet migrations reconcile only exact legacy names into 123-126",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const cases = [
      ["102", "fleet_nodes", "123", "fleet_nodes"],
      ["103", "fleet_config", "124", "fleet_config"],
      ["104", "scaling_policies", "125", "scaling_policies"],
      ["105", "alert_rules", "126", "alert_rules"],
    ] as const;

    for (const [legacyVersion, legacyName, currentVersion, currentName] of cases) {
      const db = createDb();
      try {
        db.exec(`
          CREATE TABLE _omniroute_migrations (
            version TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            applied_at TEXT NOT NULL DEFAULT (datetime('now'))
          );
          CREATE TABLE ${currentName} (id TEXT PRIMARY KEY);
        `);
        db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
          legacyVersion,
          legacyName
        );

        const count = withMockedMigrationFs(
          {
            [`${currentVersion}_${currentName}.sql`]: `CREATE TABLE ${currentName} (id TEXT PRIMARY KEY);`,
          },
          () => runner.runMigrations(db)
        );

        assert.equal(count, 1);
        assert.deepEqual(
          db
            .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?")
            .get(currentVersion),
          { version: currentVersion, name: currentName }
        );
      } finally {
        db.close();
      }
    }
  }
);
