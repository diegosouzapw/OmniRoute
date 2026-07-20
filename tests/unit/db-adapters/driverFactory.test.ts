import { test, describe } from "node:test";
import assert from "node:assert/strict";

const { tryOpenSync, openDatabaseAsync, preInitSqlJs, getSqlJsAdapter } =
  await import("../../../src/lib/db/adapters/driverFactory.ts");

describe("driverFactory", () => {
  test("tryOpenSync retorna adapter síncrono ou null", () => {
    const adapter = tryOpenSync(":memory:");
    if (adapter) {
      assert.ok(["better-sqlite3", "node:sqlite", "bun:sqlite"].includes(adapter.driver));
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
    assert.ok(["better-sqlite3", "node:sqlite", "bun:sqlite", "sql.js"].includes(adapter.driver));

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

  // #6628 (remaining gap): concurrent preInitSqlJs() calls for the same
  // filePath must share ONE in-flight load instead of each caller
  // independently fs.readFileSync + WASM-decoding the whole file — the
  // thundering-herd amplifier of the OOM condition #6632 already partly
  // fixed (restore-cycle-breaker + OOM early-abort), left un-implemented by
  // the reporter's own proposed promise-sharing fix.
  test("preInitSqlJs shares one in-flight load across concurrent callers", async (t) => {
    const os = await import("node:os");
    const path = await import("node:path");
    // The dynamic-import namespace object is read-only; grab the mutable CJS
    // `.default` (== module.exports) so readFileSync can be monkeypatched.
    const fsNs = await import("node:fs");
    const fs = fsNs.default;

    const tmpFile = path.join(os.tmpdir(), `sqljs_race_${Date.now()}.sqlite`);
    fs.writeFileSync(tmpFile, Buffer.alloc(1024 * 1024, 1));
    t.after(() => {
      try {
        fs.unlinkSync(tmpFile);
      } catch {}
    });

    let readCountForTarget = 0;
    const originalReadFileSync = fs.readFileSync;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fs as any).readFileSync = (...args: Parameters<typeof fs.readFileSync>) => {
      if (args[0] === tmpFile) readCountForTarget += 1;
      return originalReadFileSync(...args);
    };
    t.after(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fs as any).readFileSync = originalReadFileSync;
    });

    const [a, b, c] = await Promise.all([
      preInitSqlJs(tmpFile),
      preInitSqlJs(tmpFile),
      preInitSqlJs(tmpFile),
    ]);

    assert.equal(
      readCountForTarget,
      1,
      `expected exactly 1 shared full-file read for 3 concurrent preInitSqlJs() calls, got ${readCountForTarget}`
    );
    assert.equal(a, b, "concurrent callers must resolve to the SAME adapter instance");
    assert.equal(b, c, "concurrent callers must resolve to the SAME adapter instance");
    a.close();
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
