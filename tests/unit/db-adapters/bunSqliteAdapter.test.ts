import { test } from "node:test";
import assert from "node:assert/strict";

import { createBunSqliteAdapter } from "../../../src/lib/db/adapters/bunSqliteAdapter.ts";

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
    (adapter.prepare("SELECT name FROM items WHERE name = :name").get({ name: "named" }) as {
      name: string;
    }).name,
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
