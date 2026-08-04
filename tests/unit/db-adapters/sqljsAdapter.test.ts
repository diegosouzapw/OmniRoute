import { test, describe } from "node:test";
import assert from "node:assert/strict";

const { createSqlJsAdapter } = await import("../../../src/lib/db/adapters/sqljsAdapter.ts");

describe("sqljsAdapter", () => {
  test("abre DB in-memory e executa CRUD básico", async () => {
    const adapter = await createSqlJsAdapter(":memory:");

    adapter.exec("CREATE TABLE test (id INTEGER PRIMARY KEY, val TEXT)");
    const result = adapter.prepare("INSERT INTO test (val) VALUES (?)").run("hello");
    assert.equal(result.changes, 1);

    const row = adapter
      .prepare("SELECT val FROM test WHERE id = ?")
      .get(result.lastInsertRowid) as { val: string };
    assert.equal(row.val, "hello");

    const rows = adapter.prepare("SELECT * FROM test").all();
    assert.equal(rows.length, 1);

    adapter.close();
  });

  test("driver é 'sql.js'", async () => {
    const adapter = await createSqlJsAdapter(":memory:");
    assert.equal(adapter.driver, "sql.js");
    adapter.close();
  });

  test("pragma retorna valor", async () => {
    const adapter = await createSqlJsAdapter(":memory:");
    const mode = adapter.pragma("journal_mode", { simple: true });
    assert.ok(mode !== null && mode !== undefined);
    adapter.close();
  });

  test("transaction é atômica — rollback em erro", async () => {
    const adapter = await createSqlJsAdapter(":memory:");
    adapter.exec("CREATE TABLE tx_test (id INTEGER PRIMARY KEY, val TEXT NOT NULL)");

    const insert = adapter.transaction(() => {
      adapter.prepare("INSERT INTO tx_test (val) VALUES (?)").run("ok");
      throw new Error("rollback!");
    });

    assert.throws(() => insert(), /rollback/);

    const count = adapter.prepare("SELECT COUNT(*) as cnt FROM tx_test").get() as { cnt: number };
    assert.equal(count.cnt, 0, "Rollback deve ter desfeito o insert");
    adapter.close();
  });

  test("transaction confirma quando não lança erro", async () => {
    const adapter = await createSqlJsAdapter(":memory:");
    adapter.exec("CREATE TABLE commit_test (id INTEGER PRIMARY KEY, val TEXT)");

    const insert = adapter.transaction(() => {
      adapter.prepare("INSERT INTO commit_test (val) VALUES (?)").run("committed");
    });
    insert();

    const count = adapter.prepare("SELECT COUNT(*) as cnt FROM commit_test").get() as {
      cnt: number;
    };
    assert.equal(count.cnt, 1);
    adapter.close();
  });

  test("escreve em arquivo e relê corretamente", async (t) => {
    const os = await import("node:os");
    const path = await import("node:path");
    const fs = await import("node:fs");

    const tmpFile = path.join(os.tmpdir(), `sqljs_test_${Date.now()}.sqlite`);
    t.after(() => {
      try {
        fs.unlinkSync(tmpFile);
      } catch {}
    });

    const writer = await createSqlJsAdapter(tmpFile);
    writer.exec("CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT)");
    writer.prepare("INSERT INTO items (name) VALUES (?)").run("test-value");
    writer.close();

    const reader = await createSqlJsAdapter(tmpFile);
    const row = reader.prepare("SELECT name FROM items WHERE id = 1").get() as { name: string };
    assert.equal(row.name, "test-value");
    reader.close();
  });

  // #6802: named-parameter object binds ("... WHERE is_active = @isActive"
  // called as .all({ isActive: 1 })) must work the same way they do against
  // better-sqlite3, instead of throwing sql.js's own
  // "Wrong API use : tried to bind a value of an unknown type (...)." error.
  describe("named-parameter object bind (#6802)", () => {
    test("all() with a single named-params object mirrors getProviderConnections", async () => {
      const adapter = await createSqlJsAdapter(":memory:");
      adapter.exec(
        "CREATE TABLE provider_connections (id INTEGER PRIMARY KEY, provider TEXT, is_active INTEGER)"
      );
      adapter
        .prepare("INSERT INTO provider_connections (provider, is_active) VALUES (?, ?)")
        .run("glm", 1);
      adapter
        .prepare("INSERT INTO provider_connections (provider, is_active) VALUES (?, ?)")
        .run("openai", 0);

      const sql =
        "SELECT * FROM provider_connections WHERE is_active = @isActive ORDER BY id ASC";
      const rows = adapter.prepare(sql).all({ isActive: 1 }) as Array<{ provider: string }>;

      assert.equal(rows.length, 1, "expected exactly 1 active provider connection");
      assert.equal(rows[0].provider, "glm");
      adapter.close();
    });

    test("get() with a single named-params object resolves the row", async () => {
      const adapter = await createSqlJsAdapter(":memory:");
      adapter.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, val TEXT)");
      adapter.prepare("INSERT INTO t (val) VALUES (?)").run("named-get");

      const row = adapter.prepare("SELECT val FROM t WHERE id = @id").get({ id: 1 }) as {
        val: string;
      };
      assert.equal(row.val, "named-get");
      adapter.close();
    });

    test("run() with a single named-params object binds correctly", async () => {
      const adapter = await createSqlJsAdapter(":memory:");
      adapter.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, val TEXT)");
      const result = adapter
        .prepare("INSERT INTO t (val) VALUES (@val)")
        .run({ val: "named-run" });
      assert.equal(result.changes, 1);

      const row = adapter
        .prepare("SELECT val FROM t WHERE id = ?")
        .get(result.lastInsertRowid) as { val: string };
      assert.equal(row.val, "named-run");
      adapter.close();
    });

    test("supports :name and $name sigils in addition to @name", async () => {
      const adapter = await createSqlJsAdapter(":memory:");
      adapter.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, val TEXT)");
      adapter.prepare("INSERT INTO t (val) VALUES (?)").run("colon-sigil");
      adapter.prepare("INSERT INTO t (val) VALUES (?)").run("dollar-sigil");

      const colonRow = adapter.prepare("SELECT val FROM t WHERE val = :val").get({
        val: "colon-sigil",
      }) as { val: string };
      assert.equal(colonRow.val, "colon-sigil");

      const dollarRow = adapter.prepare("SELECT val FROM t WHERE val = $val").get({
        val: "dollar-sigil",
      }) as { val: string };
      assert.equal(dollarRow.val, "dollar-sigil");
      adapter.close();
    });

    test("existing positional-array binding still works unchanged", async () => {
      const adapter = await createSqlJsAdapter(":memory:");
      adapter.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, a TEXT, b TEXT)");
      const result = adapter.prepare("INSERT INTO t (a, b) VALUES (?, ?)").run("x", "y");
      assert.equal(result.changes, 1);

      const row = adapter
        .prepare("SELECT a, b FROM t WHERE id = ?")
        .get(result.lastInsertRowid) as { a: string; b: string };
      assert.equal(row.a, "x");
      assert.equal(row.b, "y");
      adapter.close();
    });
  });
});
