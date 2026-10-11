import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-migration-gating-16035-"));
process.env.DATA_DIR = root;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(root, "plugins");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { default: Database } = await import("better-sqlite3");
const { createBetterSqliteAdapter } =
  await import("../../src/lib/db/adapters/betterSqliteAdapter.ts");
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

test.after(() => fs.rmSync(root, { recursive: true, force: true }));

function mockMigrations(t: import("node:test").TestContext) {
  const migrations: Record<string, string> = {
    "001_initial_schema.sql": "SELECT 1;",
    "002_pending.sql": "CREATE TABLE migrated (id INTEGER);",
  };
  const readdir = fs.readdirSync;
  const readFile = fs.readFileSync;
  t.mock.method(fs, "readdirSync", (target: string, options?: unknown) => {
    if (String(target).replaceAll("\\", "/").endsWith("/migrations"))
      return Object.keys(migrations);
    return readdir(target, options as never);
  });
  t.mock.method(fs, "readFileSync", (target: fs.PathOrFileDescriptor, options?: unknown) => {
    const file = path.basename(String(target));
    return Object.hasOwn(migrations, file) ? migrations[file] : readFile(target, options as never);
  });
}

for (const failDurability of [false, true]) {
  test(`migration waits for portable snapshot durability; injected fsync failure=${failDurability}`, (t) => {
    const directory = fs.mkdtempSync(path.join(root, "fixture-"));
    const db = createBetterSqliteAdapter(new Database(path.join(directory, "storage.sqlite")));
    try {
      db.exec(`
        CREATE TABLE provider_connections(id TEXT PRIMARY KEY);
        CREATE TABLE combos(id TEXT PRIMARY KEY);
        CREATE TABLE call_logs(id TEXT PRIMARY KEY);
        CREATE TABLE _omniroute_migrations(version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT DEFAULT (datetime('now')));
        INSERT INTO provider_connections VALUES ('preserved');
        INSERT INTO _omniroute_migrations(version, name) VALUES ('001', 'initial_schema');
      `);
      mockMigrations(t);
      t.mock.method(fs, "linkSync", () => {
        throw Object.assign(new Error("Termux hard-link denial"), { code: "EACCES" });
      });
      const rename = fs.renameSync;
      const fsync = fs.fsyncSync;
      let published = "";
      let syncedAfterPublish = false;
      t.mock.method(fs, "renameSync", (source: string, destination: string) => {
        assert.equal(
          db.prepare("SELECT name FROM sqlite_master WHERE name = 'migrated'").get(),
          undefined
        );
        rename(source, destination);
        published = destination;
      });
      t.mock.method(fs, "fsyncSync", (fd: number) => {
        if (published && failDurability)
          throw new Error("injected fsync failure after publication");
        fsync(fd);
        if (published) syncedAfterPublish = true;
      });
      if (failDurability) {
        assert.throws(() => runMigrations(db), /durable snapshot.*injected fsync failure/s);
        assert.equal(
          db.prepare("SELECT name FROM sqlite_master WHERE name = 'migrated'").get(),
          undefined
        );
        assert.deepEqual(db.prepare("SELECT version FROM _omniroute_migrations").all(), [
          { version: "001" },
        ]);
      } else {
        assert.equal(runMigrations(db), 1);
        assert.equal(syncedAfterPublish, true);
        assert.ok(db.prepare("SELECT name FROM sqlite_master WHERE name = 'migrated'").get());
      }
      const snapshot = new Database(path.join(published, "snapshot.sqlite"), { readonly: true });
      try {
        assert.deepEqual(snapshot.prepare("SELECT * FROM provider_connections").all(), [
          { id: "preserved" },
        ]);
        assert.equal(
          snapshot.prepare("SELECT name FROM sqlite_master WHERE name = 'migrated'").get(),
          undefined
        );
        assert.equal(snapshot.pragma("integrity_check", { simple: true }), "ok");
      } finally {
        snapshot.close();
      }
    } finally {
      db.close();
    }
  });
}
