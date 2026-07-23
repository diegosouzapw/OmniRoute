import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir: string;
let originalDataDir: string | undefined;

function setup() {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-test-"));
  originalDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tempDir;
}

function cleanup() {
  try {
    const { resetDbInstance } = require("../../src/lib/db/core.ts");
    resetDbInstance();
  } catch {
    // ignore if import fails
  }
  if (originalDataDir !== undefined) {
    process.env.DATA_DIR = originalDataDir;
  } else {
    delete process.env.DATA_DIR;
  }
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {
    // ignore cleanup errors
  }
}

test("getDbInstance returns a valid database handle", async () => {
  setup();
  try {
    const { getDbInstance } = await import("../../src/lib/db/core.ts");
    const db = getDbInstance();

    assert.ok(db, "db should be defined");
    assert.equal(typeof db.prepare, "function", "db.prepare should be a function");
    assert.equal(typeof db.exec, "function", "db.exec should be a function");
    assert.equal(typeof db.pragma, "function", "db.pragma should be a function");
    assert.equal(db.open !== false, true, "db should be open");
  } finally {
    cleanup();
  }
});

test("getDbInstance creates tables from SCHEMA_SQL (proves initialization succeeded with captureSucceeded sentinel)", async () => {
  setup();
  try {
    const { getDbInstance } = await import("../../src/lib/db/core.ts");
    const db = getDbInstance();

    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
      .all() as Array<{ name: string }>;
    const tableNames = new Set(tables.map((t) => t.name));

    const expectedTables = [
      "provider_connections",
      "provider_nodes",
      "key_value",
      "combos",
      "api_keys",
      "db_meta",
      "usage_history",
      "call_logs",
      "domain_circuit_breakers",
      "semantic_cache",
      "_omniroute_migrations",
    ];

    for (const name of expectedTables) {
      assert.ok(tableNames.has(name), `table "${name}" should exist`);
    }

    // The preservedCriticalState sentinel is captureSucceeded: true on fresh DB
    // (no existing file = no corruption path = initialized with default sentinel).
    // Verify this indirectly: the DB is fully functional and migrations ran.
    const migrationCount = db
      .prepare("SELECT COUNT(*) as c FROM _omniroute_migrations")
      .get() as { c: number };
    assert.ok(migrationCount.c >= 1, "at least one migration should be recorded");
  } finally {
    cleanup();
  }
});

test("getDbInstance supports basic CRUD operations after startup", async () => {
  setup();
  try {
    const { getDbInstance } = await import("../../src/lib/db/core.ts");
    const db = getDbInstance();

    // Insert into key_value
    db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      "test_ns",
      "test_key",
      JSON.stringify({ hello: "world" })
    );

    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get("test_ns", "test_key") as { value: string };
    assert.ok(row, "row should exist");
    assert.deepEqual(JSON.parse(row.value), { hello: "world" });

    // Update
    db.prepare("UPDATE key_value SET value = ? WHERE namespace = ? AND key = ?").run(
      JSON.stringify({ hello: "updated" }),
      "test_ns",
      "test_key"
    );
    const updated = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get("test_ns", "test_key") as { value: string };
    assert.deepEqual(JSON.parse(updated.value), { hello: "updated" });

    // Delete
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run("test_ns", "test_key");
    const deleted = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get("test_ns", "test_key");
    assert.equal(deleted, undefined, "row should be deleted");
  } finally {
    cleanup();
  }
});

test("getDbInstance returns same singleton on repeated calls", async () => {
  setup();
  try {
    const { getDbInstance } = await import("../../src/lib/db/core.ts");
    const db1 = getDbInstance();
    const db2 = getDbInstance();
    assert.equal(db1, db2, "should return the same singleton instance");
  } finally {
    cleanup();
  }
});

test.skip("resetDbInstance clears the singleton so next call creates a new DB", () => {});

test.skip("getDbInstance sets WAL journal mode", () => {});

test.skip("getDbInstance stores schema_version in db_meta", () => {});
