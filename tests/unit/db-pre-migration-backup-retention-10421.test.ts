// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This suite uses a real on-disk better-sqlite3 database because migration snapshots
// must exercise SQLite's native read-only VACUUM path. Production and CI load the native
// addon normally; see tests/unit/_helpers/betterSqlite3Availability.ts for older sandboxes.
//
// #10421 — repeated failed startups once created a fresh timestamped snapshot every time
// and pruned unrelated restore points. Migration safety now publishes a content-addressed
// snapshot once per database state, never deletes a published snapshot, and leaves retention
// to the manual/scheduled backup paths outside the migration window.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

import Database from "better-sqlite3";

import { createBetterSqliteAdapter } from "../../src/lib/db/adapters/betterSqliteAdapter.ts";

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

  fs.existsSync = ((target: unknown) => {
    if (isMigrationDir(target)) return true;
    if (Object.hasOwn(files, path.basename(String(target)))) return true;
    return originalExistsSync(target as string);
  }) as typeof fs.existsSync;
  fs.readdirSync = ((target: string, options?: unknown) => {
    if (isMigrationDir(target)) return Object.keys(files);
    return originalReaddirSync(target, options as never);
  }) as typeof fs.readdirSync;
  fs.readFileSync = ((target: unknown, options?: unknown) => {
    const fileName = path.basename(String(target));
    if (Object.hasOwn(files, fileName)) return files[fileName];
    return originalReadFileSync(target as string, options as never);
  }) as typeof fs.readFileSync;

  try {
    return fn();
  } finally {
    fs.existsSync = originalExistsSync;
    fs.readdirSync = originalReaddirSync;
    fs.readFileSync = originalReadFileSync;
  }
}

function createFileDb(sqlitePath: string) {
  return createBetterSqliteAdapter(new Database(sqlitePath));
}

function seedExistingDb(db: ReturnType<typeof createFileDb>): void {
  db.exec(`
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
    CREATE TABLE combos (id TEXT PRIMARY KEY);
    CREATE TABLE call_logs (id TEXT PRIMARY KEY);
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO provider_connections (id) VALUES ('existing-data');
    INSERT INTO _omniroute_migrations (version, name) VALUES ('001', 'initial_schema');
  `);
}

function seedSetupSkeleton(db: ReturnType<typeof createFileDb>): void {
  db.exec(`
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO provider_connections (id) VALUES ('setup-preserved-data');
    INSERT INTO _omniroute_migrations (version, name) VALUES ('001', 'initial_schema');
  `);
}

function makeTempDataDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-snapshot-"));
  fs.mkdirSync(path.join(dir, "db_backups"), { recursive: true });
  return dir;
}

function seedTraditionalBackups(backupDir: string, count: number): string[] {
  const names: string[] = [];
  for (let index = 0; index < count; index += 1) {
    const name =
      `db_2026-08-${String(index + 1).padStart(2, "0")}` + "T00-00-00-000Z_pre-migration.sqlite";
    fs.writeFileSync(path.join(backupDir, name), `seed-${index}`);
    names.push(name);
  }
  return names;
}

function listCanonicalBackups(backupDir: string): string[] {
  if (!fs.existsSync(backupDir)) return [];
  return fs
    .readdirSync(backupDir)
    .filter((name) => name.startsWith("db_") && name.endsWith(".sqlite"))
    .sort();
}

function listOwnedTempDirs(backupDir: string): string[] {
  if (!fs.existsSync(backupDir)) return [];
  return fs.readdirSync(backupDir).filter((name) => name.startsWith(".migration-snapshot-"));
}

function withEnv<T>(vars: Record<string, string | undefined>, fn: () => T): T {
  const saved = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(vars)) {
    saved.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return fn();
  } finally {
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test(
  "repeated zero-progress failures reuse one content-addressed snapshot without pruning",
  serial,
  async () => {
    const dataDir = makeTempDataDir();
    const backupDir = path.join(dataDir, "db_backups");
    const db = createFileDb(path.join(dataDir, "storage.sqlite"));

    try {
      seedExistingDb(db);
      const seeded = seedTraditionalBackups(backupDir, 6);
      const { runMigrations } = await importFresh("src/lib/db/migrationRunner.ts");
      const files = {
        "001_initial_schema.sql": "SELECT 1;",
        "002_broken_probe.sql": "INSERT INTO table_that_does_not_exist VALUES (1);",
      };
      const fail = () => withMockedMigrationFs(files, () => runMigrations(db));

      assert.throws(fail, /table_that_does_not_exist/);
      const afterFirst = listCanonicalBackups(backupDir);
      const contentAddressed = afterFirst.filter((name) => name.startsWith("db_state-"));
      assert.equal(contentAddressed.length, 1);
      assert.match(contentAddressed[0]!, /^db_state-[a-f0-9]{64}_pre-migration\.sqlite$/);
      assert.equal(
        seeded.every((name) => afterFirst.includes(name)),
        true,
        "migration failure must not prune pre-existing restore points"
      );

      assert.throws(fail, /table_that_does_not_exist/);
      assert.deepEqual(
        listCanonicalBackups(backupDir),
        afterFirst,
        "an unchanged failed startup must reuse the exact content-addressed snapshot"
      );
      assert.deepEqual(listOwnedTempDirs(backupDir), []);
    } finally {
      db.close();
      fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  }
);

test(
  "an existing DB fails closed when hard-link publication is unavailable even with auto backup disabled",
  serial,
  async () => {
    const dataDir = makeTempDataDir();
    const backupDir = path.join(dataDir, "db_backups");
    const db = createFileDb(path.join(dataDir, "storage.sqlite"));
    const originalLinkSync = fs.linkSync;

    try {
      seedExistingDb(db);
      const { runMigrations } = await importFresh("src/lib/db/migrationRunner.ts");
      fs.linkSync = (() => {
        throw Object.assign(new Error("hard links unsupported by this filesystem"), {
          code: "ENOTSUP",
        });
      }) as typeof fs.linkSync;

      assert.throws(
        () =>
          withEnv({ DISABLE_SQLITE_AUTO_BACKUP: "true" }, () =>
            withMockedMigrationFs(
              {
                "001_initial_schema.sql": "SELECT 1;",
                "002_ordinary_pending.sql": "CREATE TABLE must_not_apply (id INTEGER);",
              },
              () => runMigrations(db)
            )
          ),
        /durable snapshot.*hard links unsupported.*hard links.*synchronization/is
      );
      assert.equal(
        db.prepare("SELECT name FROM sqlite_master WHERE name = 'must_not_apply'").get(),
        undefined,
        "an ordinary pending migration must not run without its mandatory snapshot"
      );
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [{ version: "001", name: "initial_schema" }]
      );
      assert.deepEqual(listCanonicalBackups(backupDir), []);
      assert.deepEqual(listOwnedTempDirs(backupDir), []);
    } finally {
      fs.linkSync = originalLinkSync;
      db.close();
      fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  }
);

test(
  "a pre-existing setup skeleton requires a snapshot even when mass-migration safety treats it as fresh",
  serial,
  async () => {
    const dataDir = makeTempDataDir();
    const backupDir = path.join(dataDir, "db_backups");
    const db = createFileDb(path.join(dataDir, "storage.sqlite"));
    const originalLinkSync = fs.linkSync;

    try {
      seedSetupSkeleton(db);
      const { runMigrations } = await importFresh("src/lib/db/migrationRunner.ts");
      fs.linkSync = (() => {
        throw Object.assign(new Error("hard links unsupported by this filesystem"), {
          code: "ENOTSUP",
        });
      }) as typeof fs.linkSync;

      assert.throws(
        () =>
          withMockedMigrationFs(
            {
              "001_initial_schema.sql": "SELECT 1;",
              "002_ordinary_pending.sql": "CREATE TABLE must_not_apply (id INTEGER);",
            },
            () =>
              runMigrations(db, {
                isNewDb: true,
                databaseExistedBeforeInitialization: true,
              })
          ),
        /durable snapshot.*hard links unsupported.*hard links.*synchronization/is
      );
      assert.equal(
        db.prepare("SELECT name FROM sqlite_master WHERE name = 'must_not_apply'").get(),
        undefined,
        "a setup-created persistent DB must not change when its safety snapshot cannot publish"
      );
      assert.deepEqual(
        db.prepare("SELECT id FROM provider_connections").all(),
        [{ id: "setup-preserved-data" }],
        "the setup-created provider state must remain untouched"
      );
      assert.deepEqual(listCanonicalBackups(backupDir), []);
      assert.deepEqual(listOwnedTempDirs(backupDir), []);
    } finally {
      fs.linkSync = originalLinkSync;
      db.close();
      fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  }
);

test(
  "successful migrations retain existing backups and do not prune inside the migration window",
  serial,
  async () => {
    const dataDir = makeTempDataDir();
    const backupDir = path.join(dataDir, "db_backups");
    const db = createFileDb(path.join(dataDir, "storage.sqlite"));

    try {
      seedExistingDb(db);
      const seeded = seedTraditionalBackups(backupDir, 6);
      const { runMigrations } = await importFresh("src/lib/db/migrationRunner.ts");

      const count = withEnv({ DB_BACKUP_MAX_FILES: "1", DB_BACKUP_RETENTION_DAYS: "0" }, () =>
        withMockedMigrationFs(
          {
            "001_initial_schema.sql": "SELECT 1;",
            "002_success.sql": "CREATE TABLE migration_success (id INTEGER);",
          },
          () => runMigrations(db)
        )
      );

      assert.equal(count, 1);
      assert.ok(
        db.prepare("SELECT name FROM sqlite_master WHERE name = 'migration_success'").get()
      );
      const after = listCanonicalBackups(backupDir);
      assert.equal(after.filter((name) => name.startsWith("db_state-")).length, 1);
      assert.equal(
        seeded.every((name) => after.includes(name)),
        true,
        "retention must remain outside the concurrent migration window"
      );
    } finally {
      db.close();
      fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  }
);

test("an already-current DB does not acquire an IMMEDIATE writer lock", serial, async () => {
  const dataDir = makeTempDataDir();
  const db = createFileDb(path.join(dataDir, "storage.sqlite"));

  try {
    seedExistingDb(db);
    const { runMigrations } = await importFresh("src/lib/db/migrationRunner.ts");
    const noWriterAdapter = {
      ...db,
      immediate: () => {
        throw new Error("unexpected IMMEDIATE writer lock");
      },
    };

    assert.equal(
      withMockedMigrationFs({ "001_initial_schema.sql": "SELECT 1;" }, () =>
        runMigrations(noWriterAdapter)
      ),
      0
    );
  } finally {
    db.close();
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
