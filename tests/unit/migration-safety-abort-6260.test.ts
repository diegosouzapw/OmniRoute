import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import Database from "better-sqlite3";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// Regression guard for #6260:
//   1. The mass-migration safety-abort message must tell the operator how to
//      bypass the check (OMNIROUTE_MAX_PENDING_MIGRATIONS=0) — e.g. after
//      restoring a backup where the migration tracking table was wiped.
//   2. Repeated runMigrations() calls on the same over-threshold DB must throw
//      the SAME memoized MigrationSafetyAbortError instance, so downstream
//      subsystems re-opening the DB do not re-compute + re-log the full abort
//      banner 11+ times (the cascade described in the issue).

const serial = { concurrency: false };

async function importFresh(modulePath: string) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

function withMockedMigrationFs<T>(files: Record<string, string>, fn: () => T): T {
  const originalExistsSync = fs.existsSync;
  const originalReaddirSync = fs.readdirSync;
  const originalReadFileSync = fs.readFileSync;

  const isMigrationDir = (target: unknown) =>
    String(target).replaceAll("\\", "/").endsWith("/src/lib/db/migrations") ||
    String(target).replaceAll("\\", "/").endsWith("/migrations");

  fs.existsSync = ((target: fs.PathLike) => {
    if (isMigrationDir(target)) return true;
    const fileName = path.basename(String(target));
    if (Object.hasOwn(files, fileName)) return true;
    return originalExistsSync(target);
  }) as typeof fs.existsSync;

  fs.readdirSync = ((target: fs.PathLike, options?: unknown) => {
    if (isMigrationDir(target)) return Object.keys(files);
    return (originalReaddirSync as (t: fs.PathLike, o?: unknown) => unknown)(target, options);
  }) as typeof fs.readdirSync;

  fs.readFileSync = ((target: fs.PathOrFileDescriptor, options?: unknown) => {
    const fileName = path.basename(String(target));
    if (Object.hasOwn(files, fileName)) return files[fileName];
    return (originalReadFileSync as (t: fs.PathOrFileDescriptor, o?: unknown) => unknown)(
      target,
      options
    );
  }) as typeof fs.readFileSync;

  try {
    return fn();
  } finally {
    fs.existsSync = originalExistsSync;
    fs.readdirSync = originalReaddirSync;
    fs.readFileSync = originalReadFileSync;
  }
}

function withNonTestEnvironment<T>(fn: () => T): T {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalVitest = process.env.VITEST;
  const originalDisableAutoBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;
  const originalArgv = [...process.argv];

  delete process.env.NODE_ENV;
  delete process.env.VITEST;
  delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  process.argv = process.argv.filter((arg) => !arg.includes("test"));

  try {
    return fn();
  } finally {
    process.argv = originalArgv;
    if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalNodeEnv;
    if (originalVitest === undefined) delete process.env.VITEST;
    else process.env.VITEST = originalVitest;
    if (originalDisableAutoBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
    else process.env.DISABLE_SQLITE_AUTO_BACKUP = originalDisableAutoBackup;
  }
}

// Existing DB with only the migrations table + one applied row and no physical
// schema sentinel tables, so inferPhysicalSchemaBaseline() returns null and the
// abort decision depends purely on the resolved threshold.
function seedExistingDbWithoutPhysicalBaseline(db: InstanceType<typeof Database>) {
  db.exec(`
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
    "001",
    "initial_schema"
  );
}

function buildMockMigrationFiles(startVersion: number, endVersion: number, prefix: string) {
  const files: Record<string, string> = {};
  for (let version = startVersion; version <= endVersion; version++) {
    const padded = String(version).padStart(3, "0");
    const fileName = version === 1 ? "001_initial_schema.sql" : `${padded}_${prefix}_${padded}.sql`;
    files[fileName] = `CREATE TABLE ${prefix}_${padded} (id INTEGER);`;
  }
  return files;
}

function createDb() {
  return new Database(":memory:");
}

test.after(() => {
  resetDbInstance();
});

test(
  "abort message tells the operator to set OMNIROUTE_MAX_PENDING_MIGRATIONS=0 to bypass (#6260)",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();
    try {
      seedExistingDbWithoutPhysicalBaseline(db);
      let thrown: unknown;
      assert.throws(() => {
        try {
          withNonTestEnvironment(() =>
            withMockedMigrationFs(buildMockMigrationFiles(1, 60, "bypass_hint"), () =>
              runner.runMigrations(db)
            )
          );
        } catch (err) {
          thrown = err;
          throw err;
        }
      });
      const message = thrown instanceof Error ? thrown.message : String(thrown);
      assert.match(message, /OMNIROUTE_MAX_PENDING_MIGRATIONS=0/);
    } finally {
      db.close();
    }
  }
);

test(
  "two consecutive aborts on the same over-threshold DB throw the SAME memoized instance (#6260)",
  serial,
  async () => {
    const runner = await importFresh("src/lib/db/migrationRunner.ts");
    const db = createDb();
    try {
      seedExistingDbWithoutPhysicalBaseline(db);

      const runOnce = () =>
        withNonTestEnvironment(() =>
          withMockedMigrationFs(buildMockMigrationFiles(1, 60, "cascade"), () =>
            runner.runMigrations(db)
          )
        );

      let first: unknown;
      let second: unknown;
      assert.throws(() => {
        try {
          runOnce();
        } catch (err) {
          first = err;
          throw err;
        }
      });
      assert.throws(() => {
        try {
          runOnce();
        } catch (err) {
          second = err;
          throw err;
        }
      });

      assert.ok(first instanceof runner.MigrationSafetyAbortError);
      assert.ok(second instanceof runner.MigrationSafetyAbortError);
      assert.strictEqual(first, second, "cascade re-triggers must reuse the memoized instance");
    } finally {
      db.close();
    }
  }
);
