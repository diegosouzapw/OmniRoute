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

test("legacy keys command writes and removes provider_connections with the real schema", async () => {
  await withCliKeysEnv(async (_dataDir, dbPath) => {
    const { runSubcommand } = await import("../../bin/cli-commands.mjs");

    await runSubcommand("keys", ["add", "openai", "sk-test-cli-key"]);

    let db = new Database(dbPath);
    let row = db
      .prepare(
        "SELECT provider, auth_type, name, api_key, is_active, created_at, updated_at FROM provider_connections WHERE provider = ?"
      )
      .get("openai") as ProviderConnectionRow | undefined;
    db.close();

    assert.ok(row);
    assert.equal(row.provider, "openai");
    assert.equal(row.auth_type, "apikey");
    assert.equal(row.name, "openai");
    assert.equal(row.api_key, "sk-test-cli-key");
    assert.equal(row.is_active, 1);
    assert.ok(row.created_at);
    assert.ok(row.updated_at);

    await runSubcommand("keys", ["list"]);
    await runSubcommand("keys", ["remove", "openai"]);

    db = new Database(dbPath);
    const countRow = db
      .prepare("SELECT COUNT(*) AS count FROM provider_connections WHERE provider = ?")
      .get("openai") as CountRow;
    db.close();

    assert.equal(countRow.count, 0);
  });
});
