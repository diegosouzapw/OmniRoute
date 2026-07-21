import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  createBunSqliteAdapter,
  type BunSqliteDatabaseLike,
} from "../../../src/lib/db/adapters/bunSqliteAdapter.ts";

test("bun:sqlite adapter supports CRUD, pragmas, transactions, and close", async (t) => {
  if (!process.versions.bun) {
    t.skip("bun:sqlite is only available under Bun");
    return;
  }

  const { Database } = await import("bun:sqlite");
  const adapter = createBunSqliteAdapter(new Database(":memory:"), ":memory:");
  t.after(() => adapter.close());

  adapter.exec("CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT)");
  const result = adapter.prepare("INSERT INTO items (name) VALUES (?)").run("bun");
  assert.equal(result.changes, 1);
  assert.equal((adapter.prepare("SELECT name FROM items").get() as { name: string }).name, "bun");
  assert.equal(adapter.driver, "bun:sqlite");
  assert.equal(adapter.pragma("user_version", { simple: true }), 0);

  adapter.prepare("INSERT INTO items (name) VALUES (@name)").run({ name: "named" });
  assert.equal(
    (
      adapter.prepare("SELECT name FROM items WHERE name = :name").get({ name: "named" }) as {
        name: string;
      }
    ).name,
    "named"
  );

  adapter.transaction(() => {
    adapter.prepare("INSERT INTO items (name) VALUES (?)").run("transaction");
  })();
  assert.equal(adapter.prepare("SELECT COUNT(*) AS count FROM items").get().count, 3);
  assert.equal(adapter.open, true);
  adapter.close();
  assert.equal(adapter.open, false);
});

test("bun:sqlite adapter backs up on-disk databases without serializing them", async (t) => {
  const sourcePath = path.join(os.tmpdir(), `bun-sqlite-source-${Date.now()}.sqlite`);
  const destinationPath = path.join(os.tmpdir(), `bun-sqlite-destination-${Date.now()}.sqlite`);
  const sourceContents = "sqlite fixture";
  const execCalls: string[] = [];
  fs.writeFileSync(sourcePath, sourceContents);
  t.after(() => {
    for (const filePath of [sourcePath, destinationPath]) {
      try {
        fs.unlinkSync(filePath);
      } catch {}
    }
  });

  const db = {
    query() {
      throw new Error("query should not be called during backup");
    },
    exec(sql: string) {
      execCalls.push(sql);
    },
    transaction() {
      throw new Error("transaction should not be called during backup");
    },
    close() {},
    serialize() {
      throw new Error("serialize must not be called for an on-disk backup");
    },
  } as unknown as BunSqliteDatabaseLike;

  const adapter = createBunSqliteAdapter(db, sourcePath);
  await adapter.backup(destinationPath);

  assert.deepEqual(execCalls, ["PRAGMA wal_checkpoint(TRUNCATE)"]);
  assert.equal(fs.readFileSync(destinationPath, "utf8"), sourceContents);
});
