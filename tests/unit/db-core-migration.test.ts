import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-core-migration-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const JSON_DB_FILE = path.join(TEST_DATA_DIR, "db.json");

const core = await import("../../src/lib/db/core.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Test 1: migrateFromJson handles empty db.json and renames it", () => {
  // Setup empty db.json
  fs.writeFileSync(JSON_DB_FILE, JSON.stringify({}));

  // Initialize db, should trigger migration
  const db = core.getDbInstance();

  assert.equal(fs.existsSync(JSON_DB_FILE), false);
  assert.equal(fs.existsSync(JSON_DB_FILE + ".empty"), true);

  core.resetDbInstance();
});

test("Test 2: migrateFromJson migrates data to SQLite successfully", () => {
  // Re-setup db.json with data
  const data = {
    providerConnections: [
      {
        id: "test-conn",
        provider: "openai",
        authType: "oauth",
        isActive: false,
        priority: 10,
        createdAt: new Date().toISOString(),
      },
    ],
    providerNodes: [
      {
        id: "test-node",
        type: "custom",
        name: "My Node",
        createdAt: new Date().toISOString(),
      },
    ],
    modelAliases: {
      alias1: "openai/gpt-4",
    },
    settings: {
      globalFallbackModel: "openai/gpt-4o",
    },
    pricing: {
      openai: { "gpt-4": { inputCost: 1 } },
    },
    customModels: {
      openai: ["gpt-4-custom"],
    },
    proxyConfig: {
      global: { enabled: true },
    },
    combos: [
      {
        id: "test-combo",
        name: "my-combo",
        models: ["openai/gpt-4"],
      },
    ],
    apiKeys: [
      {
        id: "test-key",
        name: "Key 1",
        key: "sk-omniroute-test",
        noLog: true,
      },
    ],
  };

  fs.writeFileSync(JSON_DB_FILE, JSON.stringify(data));
  // create dummy db_backups dir
  const backupDir = path.join(TEST_DATA_DIR, "db_backups");
  fs.mkdirSync(backupDir, { recursive: true });
  fs.writeFileSync(path.join(backupDir, "db-legacy.json"), JSON.stringify({}));

  const db = core.getDbInstance();

  assert.equal(fs.existsSync(JSON_DB_FILE), false);
  assert.equal(fs.existsSync(JSON_DB_FILE + ".migrated"), true);

  const pc = db.prepare("SELECT * FROM provider_connections WHERE id = 'test-conn'").get();
  assert.ok(pc);
  assert.equal((pc as any).provider, "openai");
  (assert as any).equal((pc as any).is_active, 0);

  const key = db.prepare("SELECT * FROM api_keys WHERE id = 'test-key'").get();
  assert.ok(key);
  (assert as any).equal((key as any).name, "Key 1");

  const kv = db
    .prepare("SELECT * FROM key_value WHERE namespace = 'settings' AND key = 'globalFallbackModel'")
    .get();
  assert.ok(kv);
  (assert as any).equal(JSON.parse((kv as any).value), "openai/gpt-4o");

  core.resetDbInstance();
});

test("Test 3: migrateFromJson throws error securely when JSON is corrupted", () => {
  fs.writeFileSync(JSON_DB_FILE, "{invalid-json");

  const originalError = console.error;
  let errorLogged = false;
  console.error = () => {
    errorLogged = true;
  };

  try {
    core.getDbInstance(); // should trigger migration and fail securely without crashing
    assert.ok(errorLogged);
  } finally {
    console.error = originalError;
    core.resetDbInstance();
  }
});
