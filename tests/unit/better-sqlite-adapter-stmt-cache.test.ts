import test from "node:test";
import assert from "node:assert/strict";
import Database from "better-sqlite3";

import { createBetterSqliteAdapter } from "../../src/lib/db/adapters/betterSqliteAdapter.ts";

// The hot request path prepares the same SQL on every call (call_logs INSERT,
// usage_history statements), and better-sqlite3 compiles a fresh statement each time.
// The adapter now caches statements by SQL text, bounded like the node:sqlite adapter.

function countingDb() {
  const db = new Database(":memory:");
  let prepares = 0;
  const original = db.prepare.bind(db);
  (db as unknown as { prepare: (sql: string) => unknown }).prepare = (sql: string) => {
    prepares += 1;
    return original(sql);
  };
  return { db, prepareCount: () => prepares };
}

test("the same SQL is compiled once and reused", () => {
  const { db, prepareCount } = countingDb();
  const adapter = createBetterSqliteAdapter(db);
  adapter.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, v TEXT)");
  const insert = "INSERT INTO t (v) VALUES (?)";
  for (let i = 0; i < 5; i++) adapter.prepare(insert).run(`v${i}`);
  const select = "SELECT v FROM t WHERE id = ?";
  assert.equal((adapter.prepare(select).get(1) as { v: string }).v, "v0");
  assert.equal((adapter.prepare(select).get(5) as { v: string }).v, "v4");
  assert.deepEqual(
    (adapter.prepare("SELECT count(*) AS n FROM t").all() as Array<{ n: number }>)[0].n,
    5
  );
  assert.equal(prepareCount(), 3);
  adapter.close();
});

test("the cache is bounded and evicts the least recently used statement", () => {
  const { db, prepareCount } = countingDb();
  const adapter = createBetterSqliteAdapter(db);
  for (let i = 0; i < 201; i++) adapter.prepare(`SELECT ${i} AS n`).get();
  assert.equal(prepareCount(), 201);
  // SELECT 0 was the oldest entry and was evicted by the 201st statement.
  adapter.prepare("SELECT 0 AS n").get();
  assert.equal(prepareCount(), 202);
  // SELECT 200 is still cached.
  adapter.prepare("SELECT 200 AS n").get();
  assert.equal(prepareCount(), 202);
  adapter.close();
});

test("a statement that fails to compile is not cached", () => {
  const { db, prepareCount } = countingDb();
  const adapter = createBetterSqliteAdapter(db);
  assert.throws(() => adapter.prepare("SELEC broken"));
  assert.throws(() => adapter.prepare("SELEC broken"));
  assert.equal(prepareCount(), 2);
  adapter.close();
});

test("cached statements still see schema changes", () => {
  const { db } = countingDb();
  const adapter = createBetterSqliteAdapter(db);
  adapter.exec("CREATE TABLE s (a INTEGER)");
  adapter.prepare("INSERT INTO s (a) VALUES (?)").run(1);
  const select = "SELECT * FROM s";
  assert.deepEqual(adapter.prepare(select).all(), [{ a: 1 }]);
  adapter.exec("ALTER TABLE s ADD COLUMN b TEXT DEFAULT 'x'");
  assert.deepEqual(adapter.prepare(select).all(), [{ a: 1, b: "x" }]);
  adapter.close();
});
