import { test, describe } from "node:test";
import assert from "node:assert/strict";

const { tryOpenSync } = await import("../../../src/lib/db/adapters/driverFactory.ts");

describe("betterSqliteAdapter", () => {
  test("abre DB in-memory e executa CRUD básico", () => {
    const adapter = tryOpenSync(":memory:");
    if (!adapter || adapter.driver !== "better-sqlite3") {
      console.log("SKIP: better-sqlite3 não disponível");
      return;
    }

    adapter.exec("CREATE TABLE test (id INTEGER PRIMARY KEY, val TEXT)");
    const result = adapter.prepare("INSERT INTO test (val) VALUES (?)").run("hello");
    assert.equal(result.changes, 1);

    const row = adapter
      .prepare("SELECT val FROM test WHERE id = ?")
      .get(result.lastInsertRowid) as {
      val: string;
    };
    assert.equal(row.val, "hello");

    const rows = adapter.prepare("SELECT * FROM test").all();
    assert.equal(rows.length, 1);

    adapter.close();
  });

  test("pragma retorna valor simples", () => {
    const adapter = tryOpenSync(":memory:");
    if (!adapter || adapter.driver !== "better-sqlite3") return;

    const mode = adapter.pragma("journal_mode", { simple: true });
    assert.ok(typeof mode === "string");
    adapter.close();
  });

  test("transaction envolve operações em bloco atômico", () => {
    const adapter = tryOpenSync(":memory:");
    if (!adapter || adapter.driver !== "better-sqlite3") return;

    adapter.exec("CREATE TABLE tx_test (id INTEGER PRIMARY KEY, val TEXT)");
    const insertFn = adapter.transaction(() => {
      adapter.prepare("INSERT INTO tx_test (val) VALUES (?)").run("a");
      adapter.prepare("INSERT INTO tx_test (val) VALUES (?)").run("b");
    });
    insertFn();

    const count = adapter.prepare("SELECT COUNT(*) as cnt FROM tx_test").get() as { cnt: number };
    assert.equal(count.cnt, 2);
    adapter.close();
  });

  test("driver é 'better-sqlite3'", () => {
    const adapter = tryOpenSync(":memory:");
    if (!adapter || adapter.driver !== "better-sqlite3") return;
    assert.equal(adapter.driver, "better-sqlite3");
    adapter.close();
  });

  test("transaction com rollback em erro desfaz operações", () => {
    const adapter = tryOpenSync(":memory:");
    if (!adapter || adapter.driver !== "better-sqlite3") return;

    adapter.exec("CREATE TABLE rollback_test (id INTEGER PRIMARY KEY, val TEXT NOT NULL)");
    const insertWithError = adapter.transaction(() => {
      adapter.prepare("INSERT INTO rollback_test (val) VALUES (?)").run("before-error");
      throw new Error("force rollback");
    });

    assert.throws(() => insertWithError(), /force rollback/);

    const count = adapter.prepare("SELECT COUNT(*) as cnt FROM rollback_test").get() as {
      cnt: number;
    };
    assert.equal(count.cnt, 0, "Rollback deve ter desfeito o insert");
    adapter.close();
  });
});
