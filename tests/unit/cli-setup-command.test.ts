import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import bcrypt from "bcryptjs";
import Database from "better-sqlite3";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_STORAGE_ENCRYPTION_KEY = process.env.STORAGE_ENCRYPTION_KEY;
const ORIGINAL_FETCH = globalThis.fetch;

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-setup-"));
}

async function withTempEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;
  delete process.env.STORAGE_ENCRYPTION_KEY;

  try {
    await fn(dataDir);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
    if (ORIGINAL_DATA_DIR === undefined) {
      delete process.env.DATA_DIR;
    } else {
      process.env.DATA_DIR = ORIGINAL_DATA_DIR;
    }
    if (ORIGINAL_STORAGE_ENCRYPTION_KEY === undefined) {
      delete process.env.STORAGE_ENCRYPTION_KEY;
    } else {
      process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_STORAGE_ENCRYPTION_KEY;
    }
    globalThis.fetch = ORIGINAL_FETCH;
  }
}

test("setup command writes password, setup state, and provider in non-interactive mode", async () => {
  await withTempEnv(async (dataDir) => {
    const { runSetupCommand } = await import("../../bin/cli/commands/setup.mjs");

    const exitCode = await runSetupCommand([
      "--non-interactive",
      "--password",
      "super-secret",
      "--add-provider",
      "--provider",
      "openai",
      "--provider-name",
      "OpenAI CLI",
      "--api-key",
      "sk-test",
      "--default-model",
      "gpt-4o-mini",
    ]);

    assert.equal(exitCode, 0);

    const db = new Database(path.join(dataDir, "storage.sqlite"));
    const rows = db
      .prepare("SELECT key, value FROM key_value WHERE namespace = 'settings'")
      .all() as Array<{ key: string; value: string }>;
    const settings = Object.fromEntries(rows.map((row) => [row.key, JSON.parse(row.value)]));

    assert.equal(settings.setupComplete, true);
    assert.equal(settings.requireLogin, true);
    assert.equal(await bcrypt.compare("super-secret", settings.password as string), true);

    const provider = db.prepare("SELECT * FROM provider_connections").get() as {
      provider: string;
      auth_type: string;
      name: string;
      api_key: string;
      default_model: string;
      is_active: number;
    };
    db.close();

    assert.equal(provider.provider, "openai");
    assert.equal(provider.auth_type, "apikey");
    assert.equal(provider.name, "OpenAI CLI");
    assert.equal(provider.api_key, "sk-test");
    assert.equal(provider.default_model, "gpt-4o-mini");
    assert.equal(provider.is_active, 1);
  });
});

test("setup command can mark onboarding complete without provider in non-interactive mode", async () => {
  await withTempEnv(async (dataDir) => {
    const { runSetupCommand } = await import("../../bin/cli/commands/setup.mjs");

    const exitCode = await runSetupCommand(["--non-interactive", "--password", "super-secret"]);

    assert.equal(exitCode, 0);

    const db = new Database(path.join(dataDir, "storage.sqlite"));
    const setupComplete = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'setupComplete'")
      .get() as { value: string };
    const providerCount = db
      .prepare("SELECT COUNT(*) as count FROM provider_connections")
      .get() as { count: number };
    db.close();

    assert.equal(JSON.parse(setupComplete.value), true);
    assert.equal(providerCount.count, 0);
  });
});

test("setup command disables login when no password is configured", async () => {
  await withTempEnv(async (dataDir) => {
    const { runSetupCommand } = await import("../../bin/cli/commands/setup.mjs");

    const exitCode = await runSetupCommand([
      "--non-interactive",
      "--add-provider",
      "--provider",
      "openai",
      "--api-key",
      "sk-test",
    ]);

    assert.equal(exitCode, 0);

    const db = new Database(path.join(dataDir, "storage.sqlite"));
    const requireLogin = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'requireLogin'")
      .get() as { value: string };
    db.close();

    assert.equal(JSON.parse(requireLogin.value), false);
  });
});

test("setup command can test provider and persist active status", async () => {
  await withTempEnv(async (dataDir) => {
    const calls: string[] = [];
    globalThis.fetch = (async (url: URL | RequestInfo) => {
      calls.push(String(url));
      return new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    const { runSetupCommand } = await import("../../bin/cli/commands/setup.mjs");

    const exitCode = await runSetupCommand([
      "--non-interactive",
      "--add-provider",
      "--provider",
      "openai",
      "--api-key",
      "sk-test",
      "--test-provider",
    ]);

    assert.equal(exitCode, 0);
    assert.equal(calls.length, 1);
    assert.equal(calls[0], "https://api.openai.com/v1/models");

    const db = new Database(path.join(dataDir, "storage.sqlite"));
    const provider = db.prepare("SELECT * FROM provider_connections").get() as {
      test_status: string;
      last_tested: string;
      last_error: string | null;
    };
    db.close();

    assert.equal(provider.test_status, "active");
    assert.ok(provider.last_tested);
    assert.equal(provider.last_error, null);
  });
});
