import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createSqlJsAdapter } from "../../src/lib/db/adapters/sqljsAdapter.ts";
import { setDbInstance } from "../../src/lib/db/singleton.ts";
import { createManagedDbBackup } from "../../src/lib/db/managedBackup.ts";
import { runDbHealthCheck } from "../../src/lib/db/healthCheck.ts";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "health-sqljs-"));
process.env.DATA_DIR = dir;
process.env.OMNIROUTE_SKIP_DB_HEALTHCHECK = "1";
const core = await import("../../src/lib/db/core.ts");

for (const failOpen of [false, true]) {
  test(`sql.js snapshot retains connection state with destination failure=${failOpen}`, async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "health-sqljs-state-"));
    const db = await createSqlJsAdapter(":memory:");
    const raw = db.raw as {
      create_function(name: string, callback: () => number): void;
      prepare(sql: string): { step(): boolean; get(): unknown[]; free(): void };
    };
    const originalOpen = fs.openSync;
    try {
      db.exec("CREATE TABLE sample (id INTEGER); INSERT INTO sample VALUES (1)");
      db.pragma("temp_store=2");
      db.exec("CREATE TEMP TABLE pending (id INTEGER); INSERT INTO pending VALUES (42)");
      raw.create_function("health_marker", () => 42);
      const statement = raw.prepare("SELECT health_marker()");
      const keys = ["cache_size", "temp_store", "busy_timeout", "synchronous"];
      for (const setting of [
        "cache_size=-65536",
        "temp_store=2",
        "busy_timeout=2000",
        "synchronous=1",
      ])
        db.pragma(setting);
      const before = keys.map((key) => db.pragma(key, { simple: true }));
      if (failOpen)
        fs.openSync = () => {
          throw new Error("destination failure");
        };
      let ok: boolean;
      try {
        ok = createManagedDbBackup(db, "state", tmp);
      } finally {
        fs.openSync = originalOpen;
      }
      assert.equal(ok, !failOpen);
      assert.deepEqual(
        keys.map((key) => db.pragma(key, { simple: true })),
        before
      );
      assert.deepEqual(db.prepare("SELECT * FROM pending").all(), [{ id: 42 }]);
      assert.deepEqual(db.prepare("SELECT health_marker() AS value").get(), { value: 42 });
      assert.equal(statement.step(), true);
      assert.deepEqual(statement.get(), [42]);
      statement.free();
    } finally {
      fs.openSync = originalOpen;
      db.close();
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
}

test("sql.js snapshot filename collision cannot unlink an unrelated database", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "health-sqljs-collision-"));
  const owner = await createSqlJsAdapter(":memory:");
  const random = Math.random;
  let other: Awaited<ReturnType<typeof createSqlJsAdapter>> | undefined;
  try {
    owner.exec("CREATE TABLE sample(id INTEGER); INSERT INTO sample VALUES(42)");
    Math.random = () => 0.125;
    other = await createSqlJsAdapter(":memory:");
    other.exec("CREATE TABLE keep(id INTEGER); INSERT INTO keep VALUES(99)");
    assert.equal(createManagedDbBackup(owner, "collision", tmp), false);
    assert.deepEqual(owner.prepare("SELECT * FROM sample").all(), [{ id: 42 }]);
    const image = (other.raw as { export(): Uint8Array }).export();
    assert.ok(image.length > 0, "colliding database file must still exist");
    assert.deepEqual(other.prepare("SELECT * FROM keep").all(), [{ id: 99 }]);
    assert.deepEqual(fs.readdirSync(tmp), []);
  } finally {
    Math.random = random;
    other?.close();
    owner.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

for (const mode of ["transaction", "cursor", "query-only"]) {
  test(`sql.js snapshot refuses ${mode} without disturbing owner`, async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "health-sqljs-busy-"));
    const db = await createSqlJsAdapter(":memory:");
    const raw = db.raw as {
      prepare(sql: string): { step(): boolean; get(): unknown[]; free(): void };
    };
    let cursor: ReturnType<typeof raw.prepare> | undefined;
    try {
      db.exec("CREATE TABLE sample(id INTEGER); INSERT INTO sample VALUES(1),(2)");
      if (mode === "transaction") db.exec("BEGIN; INSERT INTO sample VALUES(3)");
      if (mode === "cursor") {
        cursor = raw.prepare("SELECT id FROM sample ORDER BY id");
        assert.ok(cursor.step());
      }
      if (mode === "query-only") db.pragma("query_only=ON");
      assert.equal(createManagedDbBackup(db, mode, tmp), false);
      assert.deepEqual(fs.readdirSync(tmp), []);
      if (mode === "transaction") {
        assert.deepEqual(db.prepare("SELECT id FROM sample WHERE id=3").all(), [{ id: 3 }]);
        db.exec("ROLLBACK");
      }
      if (cursor) {
        assert.ok(cursor.step());
        assert.deepEqual(cursor.get(), [2]);
      }
      if (mode === "query-only") assert.equal(db.pragma("query_only", { simple: true }), 1);
    } finally {
      cursor?.free();
      db.close();
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
}

test("managed sql.js repair preserves a reopenable pre-repair host snapshot", async () => {
  const db = await createSqlJsAdapter(path.join(dir, "storage.sqlite"));
  db.exec(
    "CREATE TABLE db_meta (key TEXT PRIMARY KEY, value TEXT); INSERT INTO db_meta VALUES ('schema_version','0')"
  );
  setDbInstance(db);
  try {
    const result = await core.runManagedDbHealthCheck({ autoRepair: true });
    assert.equal(result.backupCreated, true);
    assert.equal(result.repairedCount, 1);
    assert.equal((db.prepare("SELECT value FROM db_meta").get() as { value: string }).value, "1");
    const backups = fs.readdirSync(path.join(dir, "db_backups"));
    assert.equal(backups.length, 1);
    const restored = await createSqlJsAdapter(path.join(dir, "db_backups", backups[0]));
    try {
      assert.equal(
        (restored.prepare("SELECT value FROM db_meta").get() as { value: string }).value,
        "0"
      );
      assert.equal(restored.pragma("integrity_check", { simple: true }), "ok");
    } finally {
      restored.close();
    }
  } finally {
    core.closeDbInstance();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("sql.js memory snapshots include unpersisted data and backup errors block repair", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "health-sqljs-memory-"));
  const db = await createSqlJsAdapter(":memory:");
  db.exec(
    "CREATE TABLE db_meta (key TEXT PRIMARY KEY, value TEXT); INSERT INTO db_meta VALUES ('schema_version','0')"
  );
  try {
    const blocked = path.join(tmp, "not-a-directory");
    fs.writeFileSync(blocked, "blocked");
    assert.throws(
      () =>
        runDbHealthCheck(db, {
          autoRepair: true,
          createBackupBeforeRepair: () => createManagedDbBackup(db, "repair", blocked),
        }),
      /backup creation failed/
    );
    assert.equal((db.prepare("SELECT value FROM db_meta").get() as { value: string }).value, "0");
    const originalFsync = fs.fsyncSync;
    fs.fsyncSync = () => {
      throw new Error("disk sync failed");
    };
    try {
      assert.throws(
        () =>
          runDbHealthCheck(db, {
            autoRepair: true,
            createBackupBeforeRepair: () => createManagedDbBackup(db, "sync-failure", tmp),
          }),
        /backup creation failed/
      );
      assert.deepEqual(fs.readdirSync(tmp), ["not-a-directory"]);
      assert.equal((db.prepare("SELECT value FROM db_meta").get() as { value: string }).value, "0");
    } finally {
      fs.fsyncSync = originalFsync;
    }
    assert.equal(createManagedDbBackup(db, "memory", tmp), true);
    const file = fs.readdirSync(tmp).find((x) => x.endsWith(".sqlite"));
    assert.ok(file);
    const restored = await createSqlJsAdapter(path.join(tmp, file));
    try {
      assert.equal(
        (restored.prepare("SELECT value FROM db_meta").get() as { value: string }).value,
        "0"
      );
    } finally {
      restored.close();
    }
  } finally {
    db.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
