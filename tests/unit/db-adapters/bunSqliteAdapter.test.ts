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

test("loadSqliteRuntime prioritizes bun:sqlite under Bun without loading better-sqlite3", async (t) => {
  if (!process.versions.bun) {
    t.skip("bun:sqlite is only available under Bun");
    return;
  }

  const { loadSqliteRuntime } = await import("../../../bin/cli/runtime/sqliteRuntime.mjs");
  const runtime = await loadSqliteRuntime();
  assert.equal(runtime.driver.kind, "bun-sqlite");
  assert.equal(runtime.source, "bun-sqlite");
});

test("bun:sqlite adapter get() maps the driver's no-row null to undefined", () => {
  // bun:sqlite returns null when no row matches; better-sqlite3, node:sqlite and sql.js
  // return undefined, and call sites written against that contract (for example
  // `get(...) !== undefined` in the exclusive-lease check) break on null.
  const rows = new Map([["c1", { id: "c1", state: "ACTIVE" }]]);
  const db = {
    query() {
      return {
        run() {
          return { changes: 0, lastInsertRowid: 0 };
        },
        get(id: string) {
          return rows.get(id) ?? null;
        },
        all() {
          return [];
        },
      };
    },
    exec() {},
    transaction() {
      throw new Error("transaction should not be called");
    },
    close() {},
  } as unknown as BunSqliteDatabaseLike;

  const adapter = createBunSqliteAdapter(db, ":memory:");
  const select = adapter.prepare("SELECT id, state FROM leases WHERE id = ?");

  assert.equal(select.get("missing"), undefined);
  assert.deepEqual(select.get("c1"), { id: "c1", state: "ACTIVE" });
});

test("bun:sqlite adapter get() returns undefined, not null, when no row matches", async (t) => {
  if (!process.versions.bun) {
    t.skip("bun:sqlite is only available under Bun");
    return;
  }

  const { Database } = await import("bun:sqlite");
  const adapter = createBunSqliteAdapter(new Database(":memory:"), ":memory:");
  t.after(() => adapter.close());

  adapter.exec("CREATE TABLE leases (connection_id TEXT PRIMARY KEY, state TEXT)");
  const select = adapter.prepare("SELECT state FROM leases WHERE connection_id = ?");

  assert.equal(select.get("absent"), undefined);

  adapter.prepare("INSERT INTO leases (connection_id, state) VALUES (?, ?)").run("c1", "ACTIVE");
  assert.equal((select.get("c1") as { state: string }).state, "ACTIVE");
});
