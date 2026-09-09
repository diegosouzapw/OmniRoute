import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_URL = process.env.OMNIROUTE_TEST_DATABASE_URL;
const skip = TEST_URL
  ? false
  : "set OMNIROUTE_TEST_DATABASE_URL=postgres://... to run the PostgreSQL adapter tests";

const { createPostgresAdapter } = await import("../../../src/lib/db/adapters/postgresAdapter.ts");
const { resolvePostgresConfig } = await import("../../../src/lib/db/postgresConfig.ts");
const { tryOpenSync } = await import("../../../src/lib/db/adapters/driverFactory.ts");
const { importSqliteIntoPostgres } = await import("../../../src/lib/db/postgresImport.ts");
type Adapter = ReturnType<typeof createPostgresAdapter>;

function openAdapter(schema: string): Adapter {
  const config = resolvePostgresConfig({
    OMNIROUTE_DATABASE_URL: TEST_URL,
    OMNIROUTE_DATABASE_SCHEMA: schema,
  } as NodeJS.ProcessEnv);
  if (!config) throw new Error("invalid test database url");
  return createPostgresAdapter(config, { resetSchema: true });
}

describe("postgresAdapter", { skip }, () => {
  let db: Adapter;

  before(() => {
    db = openAdapter("omniroute_adapter_test");
    db.exec(`
      CREATE TABLE IF NOT EXISTS key_value (
        namespace TEXT NOT NULL,
        key TEXT NOT NULL,
        value TEXT,
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        PRIMARY KEY (namespace, key)
      );
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        enabled BOOLEAN DEFAULT 1,
        payload TEXT
      );
      CREATE TRIGGER IF NOT EXISTS trg_items AFTER INSERT ON items WHEN NEW.name = 'boom'
      BEGIN UPDATE items SET enabled = 0 WHERE id = NEW.id; END;
    `);
  });

  after(() => {
    db?.close();
  });

  test("Driver_ReportsPostgresAndRedactsPassword", () => {
    assert.equal(db.driver, "postgres");
    const password = new URL(TEST_URL as string).password;
    if (password) assert.ok(!db.name.includes(`:${password}@`), db.name);
    assert.ok(db.name.includes(":***@"), db.name);
  });

  test("InsertOrReplace_UpdatesExistingRow", () => {
    const stmt = db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
    );
    stmt.run("settings", "a", "1");
    stmt.run("settings", "a", "2");
    const rows = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .all("settings", "a") as Array<{ value: string }>;
    assert.deepEqual(rows, [{ value: "2" }]);
  });

  test("Insert_ReturnsLastInsertRowidAndChanges", () => {
    const result = db
      .prepare("INSERT INTO items (name, payload) VALUES (@name, @payload)")
      .run({ name: "Alpha", payload: JSON.stringify({ n: 5 }) });
    assert.equal(result.changes, 1);
    assert.ok(Number(result.lastInsertRowid) > 0);
    const row = db.prepare("SELECT name FROM items WHERE id = ?").get(result.lastInsertRowid) as {
      name: string;
    };
    assert.equal(row.name, "Alpha");
  });

  test("Trigger_FiresWithWhenClause", () => {
    const result = db.prepare("INSERT INTO items (name) VALUES (?)").run("boom");
    const row = db
      .prepare("SELECT enabled FROM items WHERE id = ?")
      .get(result.lastInsertRowid) as { enabled: number };
    assert.equal(row.enabled, 0);
  });

  test("Transaction_RollsBackOnThrow", () => {
    const before = (db.prepare("SELECT COUNT(*) AS c FROM items").get() as { c: number }).c;
    const tx = db.transaction(() => {
      db.prepare("INSERT INTO items (name) VALUES ('tx')").run();
      throw new Error("abort");
    });
    assert.throws(() => tx(), /abort/);
    const afterCount = (db.prepare("SELECT COUNT(*) AS c FROM items").get() as { c: number }).c;
    assert.equal(afterCount, before);
    assert.equal(db.inTransaction, false);
  });

  test("Transaction_SurvivesFailedStatementInside", () => {
    const value = db.transaction(() => {
      assert.throws(
        () => db.prepare("SELECT * FROM does_not_exist").get(),
        /no such table: does_not_exist/
      );
      return (db.prepare("SELECT 1 AS ok").get() as { ok: number }).ok;
    })();
    assert.equal(value, 1);
  });

  test("Pragma_TableInfoAndJournalMode_AreEmulated", () => {
    const columns = db.prepare("PRAGMA table_info(items)").all() as Array<{
      name: string;
      type: string;
      pk: number;
    }>;
    assert.deepEqual(
      columns.map((c) => c.name),
      ["id", "name", "enabled", "payload"]
    );
    assert.equal(columns[0].pk, 1);
    assert.equal(columns[0].type, "INTEGER");
    assert.equal(db.pragma("journal_mode", { simple: true }), "wal");
    assert.deepEqual(db.pragma("quick_check"), [{ quick_check: "ok" }]);
  });

  test("SqliteMaster_ListsTablesAndTriggers", () => {
    const table = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
      .get("items") as { name: string };
    assert.equal(table.name, "items");
    const trigger = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'trigger' AND name = ?")
      .get("trg_items") as { name: string };
    assert.equal(trigger.name, "trg_items");
  });

  test("JsonAndDateHelpers_ReturnSqliteShapedValues", () => {
    const row = db
      .prepare(
        "SELECT json_extract(payload, '$.n') AS n, json_valid(payload) AS valid, datetime('now') AS now, typeof(id) AS t FROM items WHERE name = 'Alpha'"
      )
      .get() as { n: string; valid: number; now: string; t: string };
    assert.equal(row.n, "5");
    assert.equal(row.valid, 1);
    assert.match(row.now, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    assert.equal(row.t, "integer");
  });

  test("VirtualTable_ReportsNoSuchModule", () => {
    assert.throws(
      () => db.exec("CREATE VIRTUAL TABLE probe USING fts5(content)"),
      /no such module: fts5/
    );
  });

  test("ConcurrentOpen_OnFreshSchema_AllProcessesBootstrap", async () => {
    const schema = "omniroute_adapter_race";
    const { Client } = await import("pg");
    const admin = new Client({ connectionString: TEST_URL });
    await admin.connect();
    try {
      await admin.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
    } finally {
      await admin.end();
    }
    const script = [
      `const { createPostgresAdapter } = await import(${JSON.stringify(
        new URL("../../../src/lib/db/adapters/postgresAdapter.ts", import.meta.url).href
      )});`,
      `const { resolvePostgresConfig } = await import(${JSON.stringify(
        new URL("../../../src/lib/db/postgresConfig.ts", import.meta.url).href
      )});`,
      `const config = resolvePostgresConfig({ OMNIROUTE_DATABASE_URL: ${JSON.stringify(TEST_URL)}, OMNIROUTE_DATABASE_SCHEMA: ${JSON.stringify(schema)} });`,
      "const adapter = createPostgresAdapter(config);",
      "adapter.exec('CREATE TABLE IF NOT EXISTS race_probe (id INTEGER PRIMARY KEY AUTOINCREMENT, pid INTEGER)');",
      "adapter.prepare('INSERT INTO race_probe (pid) VALUES (?)').run(process.pid);",
      "adapter.close();",
    ].join("\n");
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pg-race-"));
    const scriptPath = path.join(dir, "race-child.mts");
    fs.writeFileSync(scriptPath, script);
    const runs = await Promise.all(
      [1, 2, 3].map(
        () =>
          new Promise<{ code: number | null; stderr: string }>((resolve) => {
            const child = spawn(process.execPath, ["--import", "tsx/esm", scriptPath], {
              stdio: ["ignore", "ignore", "pipe"],
            });
            let stderr = "";
            child.stderr.on("data", (chunk) => (stderr += String(chunk)));
            child.on("close", (code) => resolve({ code, stderr }));
          })
      )
    );
    fs.rmSync(dir, { recursive: true, force: true });
    for (const run of runs) assert.equal(run.code, 0, run.stderr);
    const probeConfig = resolvePostgresConfig({
      OMNIROUTE_DATABASE_URL: TEST_URL,
      OMNIROUTE_DATABASE_SCHEMA: schema,
    } as NodeJS.ProcessEnv);
    if (!probeConfig) throw new Error("invalid test database url");
    const probe = createPostgresAdapter(probeConfig);
    try {
      const rows = probe.prepare("SELECT COUNT(*) AS c FROM race_probe").get() as { c: number };
      assert.equal(rows.c, 3);
    } finally {
      probe.close();
    }
  });

  test("Import_CopiesSqliteRowsAndVerifiesCounts", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pg-import-"));
    const sqliteFile = path.join(dir, "storage.sqlite");
    const source = tryOpenSync(sqliteFile);
    if (!source) throw new Error("no sqlite driver available");
    source.exec(`
      CREATE TABLE key_value (namespace TEXT NOT NULL, key TEXT NOT NULL, value TEXT, updated_at TEXT NOT NULL DEFAULT (datetime('now')), legacy_only TEXT, PRIMARY KEY (namespace, key));
      CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, enabled BOOLEAN DEFAULT 1, payload TEXT);
      CREATE TABLE db_meta (key TEXT PRIMARY KEY, value TEXT);
      INSERT INTO key_value (namespace, key, value, legacy_only) VALUES ('import', 'k1', 'v1', 'x'), ('import', 'k2', 'v2', 'y');
      INSERT INTO items (id, name) VALUES (100, 'from-sqlite'), (101, 'from-sqlite-2');
    `);
    source.close();
    db.exec("CREATE TABLE IF NOT EXISTS db_meta (key TEXT PRIMARY KEY, value TEXT)");
    const report = importSqliteIntoPostgres(db, sqliteFile, { log: () => {} });
    const kv = report.tables.find((t) => t.table === "key_value");
    assert.equal(kv?.importedRows, 2);
    assert.deepEqual(kv?.skippedColumns, []);
    const kvColumns = (
      db.prepare("PRAGMA table_info(key_value)").all() as Array<{ name: string }>
    ).map((c) => c.name);
    assert.ok(kvColumns.includes("legacy_only"), kvColumns.join(","));
    const legacy = db.prepare("SELECT legacy_only FROM key_value WHERE key = 'k1'").get() as {
      legacy_only: string;
    };
    assert.equal(legacy.legacy_only, "x");
    const items = report.tables.find((t) => t.table === "items");
    assert.equal(items?.importedRows, 2);
    const next = db.prepare("INSERT INTO items (name) VALUES ('after-import')").run();
    assert.ok(Number(next.lastInsertRowid) > 101, String(next.lastInsertRowid));
    const again = importSqliteIntoPostgres(db, sqliteFile, { log: () => {} });
    assert.equal(again.tables.find((t) => t.table === "items")?.importedRows, 0);
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
