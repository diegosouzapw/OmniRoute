import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_STORAGE_ENCRYPTION_KEY = process.env.STORAGE_ENCRYPTION_KEY;
const ORIGINAL_FETCH = globalThis.fetch;

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-providers-"));
}

async function withProvidersEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;
  delete process.env.STORAGE_ENCRYPTION_KEY;
  globalThis.fetch = ORIGINAL_FETCH;

  try {
    await fn(dataDir);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
    globalThis.fetch = ORIGINAL_FETCH;

    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

    if (ORIGINAL_STORAGE_ENCRYPTION_KEY === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
    else process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_STORAGE_ENCRYPTION_KEY;
  }
}

async function createProvider(dataDir: string) {
  const { ensureProviderSchema, upsertApiKeyProviderConnection } =
    await import("../../bin/cli/provider-store.mjs");
  const db = new Database(path.join(dataDir, "storage.sqlite"));
  ensureProviderSchema(db);
  const connection = upsertApiKeyProviderConnection(db, {
    provider: "openai",
    name: "OpenAI CLI",
    apiKey: "sk-test",
  });
  db.close();
  return connection;
}

test("providers list succeeds with configured providers", async () => {
  await withProvidersEnv(async (dataDir) => {
    await createProvider(dataDir);
    const { runProvidersCommand } = await import("../../bin/cli/commands/providers.mjs");

    const exitCode = await runProvidersCommand(["list", "--json"]);

    assert.equal(exitCode, 0);
  });
});

test("providers available lists supported provider catalog", async () => {
  await withProvidersEnv(async () => {
    const { runProvidersCommand } = await import("../../bin/cli/commands/providers.mjs");
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args: unknown[]) => {
      logs.push(args.join(" "));
    };

    try {
      const exitCode = await runProvidersCommand(["available", "--json", "--search", "openai"]);
      assert.equal(exitCode, 0);
    } finally {
      console.log = originalLog;
    }

    const result = JSON.parse(logs.join("\n")) as {
      providers: Array<{ id: string; category: string }>;
    };
    assert.ok(result.providers.some((provider) => provider.id === "openai"));
    assert.ok(result.providers.some((provider) => provider.category === "api-key"));
  });
});

test("providers test updates provider status from upstream result", async () => {
  await withProvidersEnv(async (dataDir) => {
    await createProvider(dataDir);
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })) as typeof fetch;

    const { runProvidersCommand } = await import("../../bin/cli/commands/providers.mjs");
    const exitCode = await runProvidersCommand(["test", "OpenAI CLI"]);

    assert.equal(exitCode, 0);

    const db = new Database(path.join(dataDir, "storage.sqlite"));
    const row = db.prepare("SELECT test_status, last_error FROM provider_connections").get() as {
      test_status: string;
      last_error: string | null;
    };
    db.close();

    assert.equal(row.test_status, "active");
    assert.equal(row.last_error, null);
  });
});

test("providers validate fails encrypted API keys without storage key", async () => {
  await withProvidersEnv(async (dataDir) => {
    const db = new Database(path.join(dataDir, "storage.sqlite"));
    db.prepare(
      `CREATE TABLE provider_connections (
        id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        auth_type TEXT,
        name TEXT,
        api_key TEXT,
        is_active INTEGER,
        priority INTEGER,
        created_at TEXT,
        updated_at TEXT
      )`
    ).run();
    db.prepare(
      `INSERT INTO provider_connections
        (id, provider, auth_type, name, api_key, is_active, priority, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 1, 1, ?, ?)`
    ).run(
      "conn-1",
      "openai",
      "apikey",
      "Encrypted OpenAI",
      "enc:v1:00112233445566778899aabbccddeeff:00:00112233445566778899aabbccddeeff",
      new Date().toISOString(),
      new Date().toISOString()
    );
    db.close();

    const { runProvidersCommand } = await import("../../bin/cli/commands/providers.mjs");
    const exitCode = await runProvidersCommand(["validate", "--json"]);

    assert.equal(exitCode, 1);
  });
});
