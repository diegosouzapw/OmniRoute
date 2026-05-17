import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_STORAGE_ENCRYPTION_KEY = process.env.STORAGE_ENCRYPTION_KEY;
const ORIGINAL_FETCH = globalThis.fetch;

interface ProviderConnectionRow {
  provider: string;
  auth_type: string;
  name: string;
  api_key: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface CountRow {
  count: number;
}

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-keys-"));
}

async function withCliKeysEnv(fn: (dataDir: string, dbPath: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  const dbPath = path.join(dataDir, "storage.sqlite");
  process.env.DATA_DIR = dataDir;
  delete process.env.STORAGE_ENCRYPTION_KEY;
  globalThis.fetch = (async () => {
    throw new Error("server offline");
  }) as typeof fetch;

  const originalLog = console.log;
  console.log = () => {};

  try {
    new Database(dbPath).close();
    await fn(dataDir, dbPath);
  } finally {
    console.log = originalLog;
    globalThis.fetch = ORIGINAL_FETCH;
    fs.rmSync(dataDir, { recursive: true, force: true });

    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

    if (ORIGINAL_STORAGE_ENCRYPTION_KEY === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
    else process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_STORAGE_ENCRYPTION_KEY;
  }
}

test("keys add writes provider_connection row to DB when server is offline", async () => {
  await withCliKeysEnv(async (_dataDir, dbPath) => {
    const { runKeysAddCommand } = await import("../../bin/cli/commands/keys.mjs");

    const result = await runKeysAddCommand("openai", "sk-test-cli-key", {});
    assert.equal(result, 0);

    const db = new Database(dbPath);
    const row = db
      .prepare(
        "SELECT provider, auth_type, name, api_key, is_active, created_at, updated_at FROM provider_connections WHERE provider = ?"
      )
      .get("openai") as ProviderConnectionRow | undefined;
    db.close();

    assert.ok(row, "row should exist");
    assert.equal(row.provider, "openai");
    assert.equal(row.auth_type, "apikey");
    assert.equal(row.name, "openai");
    assert.equal(row.is_active, 1);
    assert.ok(row.created_at);
    assert.ok(row.updated_at);
  });
});

test("keys list returns 0 and shows no keys on empty DB", async () => {
  await withCliKeysEnv(async () => {
    const { runKeysListCommand } = await import("../../bin/cli/commands/keys.mjs");
    const result = await runKeysListCommand({});
    assert.equal(result, 0);
  });
});

test("keys list --json returns structured output", async () => {
  await withCliKeysEnv(async () => {
    const { runKeysAddCommand, runKeysListCommand } =
      await import("../../bin/cli/commands/keys.mjs");

    await runKeysAddCommand("openai", "sk-list-json-test", {});

    const lines: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => lines.push(msg);
    const result = await runKeysListCommand({ json: true });
    console.log = originalLog;

    assert.equal(result, 0);
    const parsed = JSON.parse(lines.join("\n"));
    assert.ok(Array.isArray(parsed.keys));
    assert.equal(parsed.keys.length, 1);
    assert.equal(parsed.keys[0].provider, "openai");
  });
});

test("keys remove deletes the provider_connection row", async () => {
  await withCliKeysEnv(async (_dataDir, dbPath) => {
    const { runKeysAddCommand, runKeysRemoveCommand } =
      await import("../../bin/cli/commands/keys.mjs");

    await runKeysAddCommand("openai", "sk-remove-test", {});

    const result = await runKeysRemoveCommand("openai", { yes: true });
    assert.equal(result, 0);

    const db = new Database(dbPath);
    const countRow = db
      .prepare("SELECT COUNT(*) AS count FROM provider_connections WHERE provider = ?")
      .get("openai") as CountRow;
    db.close();

    assert.equal(countRow.count, 0);
  });
});

test("keys add fails gracefully with missing API key argument", async () => {
  await withCliKeysEnv(async () => {
    const { runKeysAddCommand } = await import("../../bin/cli/commands/keys.mjs");

    const originalError = console.error;
    console.error = () => {};
    const result = await runKeysAddCommand("openai", undefined as unknown as string, {});
    console.error = originalError;

    assert.equal(result, 1);
  });
});
