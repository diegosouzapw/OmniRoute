import { test, describe } from "node:test";
import assert from "node:assert/strict";

const { tryOpenSync, openDatabaseAsync, preInitSqlJs, getSqlJsAdapter } =
  await import("../../../src/lib/db/adapters/driverFactory.ts");

describe("driverFactory", () => {
  test("tryOpenSync retorna adapter síncrono ou null", () => {
    const adapter = tryOpenSync(":memory:");
    if (adapter) {
      assert.ok(["better-sqlite3", "node:sqlite"].includes(adapter.driver));
      adapter.exec("CREATE TABLE t (v TEXT)");
      adapter.prepare("INSERT INTO t VALUES (?)").run("ok");
      const row = adapter.prepare("SELECT v FROM t").get() as { v: string };
      assert.equal(row.v, "ok");
      adapter.close();
    } else {
      assert.equal(adapter, null);
    }
  });

  test("openDatabaseAsync sempre retorna um adapter válido", async () => {
    const adapter = await openDatabaseAsync(":memory:");
    assert.ok(["better-sqlite3", "node:sqlite", "sql.js"].includes(adapter.driver));

    adapter.exec("CREATE TABLE t (v TEXT)");
    adapter.prepare("INSERT INTO t VALUES (?)").run("ok");
    const row = adapter.prepare("SELECT v FROM t").get() as { v: string };
    assert.equal(row.v, "ok");
    adapter.close();
  });

  test("preInitSqlJs cacheia o adapter por filePath", async () => {
    const path = `sqljs_cache_test_${Date.now()}`;
    const adapter1 = await preInitSqlJs(path);
    const adapter2 = await preInitSqlJs(path);
    assert.equal(adapter1, adapter2, "Deve retornar o mesmo adapter cacheado");
    adapter1.close();
  });

  test("getSqlJsAdapter retorna null para path não inicializado", () => {
    const unique = `not_initialized_${Date.now()}`;
    assert.equal(getSqlJsAdapter(unique), null);
  });

  test("getSqlJsAdapter retorna adapter após preInitSqlJs", async () => {
    const path = `sqljs_get_test_${Date.now()}`;
    await preInitSqlJs(path);
    const adapter = getSqlJsAdapter(path);
    assert.ok(adapter !== null);
    assert.equal(adapter!.driver, "sql.js");
    adapter!.close();
  });

  test("openDatabaseAsync suporta operações CRUD completas", async (t) => {
    const os = await import("node:os");
    const path = await import("node:path");
    const fs = await import("node:fs");

    const tmpFile = path.join(os.tmpdir(), `driver_crud_${Date.now()}.sqlite`);
    t.after(() => {
      try {
        fs.unlinkSync(tmpFile);
      } catch {}
    });

    const adapter = await openDatabaseAsync(tmpFile);

    adapter.exec("CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT, qty INTEGER)");

    const r1 = adapter.prepare("INSERT INTO items (name, qty) VALUES (?, ?)").run("apple", 5);
    const r2 = adapter.prepare("INSERT INTO items (name, qty) VALUES (?, ?)").run("banana", 3);
    assert.equal(r1.changes, 1);
    assert.equal(r2.changes, 1);

    const rows = adapter.prepare("SELECT * FROM items ORDER BY id").all() as Array<{
      id: number;
      name: string;
      qty: number;
    }>;
    assert.equal(rows.length, 2);
    assert.equal(rows[0].name, "apple");
    assert.equal(rows[1].name, "banana");

    adapter.close();
  });

  test("cross-driver: escreve com adapter sync, relê com sql.js", async (t) => {
    const os = await import("node:os");
    const path = await import("node:path");
    const fs = await import("node:fs");

    const tmpFile = path.join(os.tmpdir(), `cross_driver_${Date.now()}.sqlite`);
    t.after(() => {
      try {
        fs.unlinkSync(tmpFile);
      } catch {}
    });

    const syncAdapter = tryOpenSync(tmpFile);
    if (!syncAdapter) {
      console.log("SKIP: nenhum driver síncrono disponível para cross-driver test");
      return;
    }
    syncAdapter.exec("CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT)");
    syncAdapter.prepare("INSERT INTO items (name) VALUES (?)").run("cross-test");
    syncAdapter.close();

    const { createSqlJsAdapter } = await import("../../../src/lib/db/adapters/sqljsAdapter.ts");
    const reader = await createSqlJsAdapter(tmpFile);
    const row = reader.prepare("SELECT name FROM items WHERE id = 1").get() as { name: string };
    assert.equal(row.name, "cross-test");
    reader.close();
  });
});
