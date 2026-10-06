// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs or exercises a real better-sqlite3-backed SQLite database.
// better-sqlite3 is a native addon; production and CI load it normally, but some
// sandboxes/dev boxes ship a system glibc older than the prebuilt binary requires
// ("GLIBC_2.29 not found"), so the native module fails to dlopen and any test that
// reaches better-sqlite3 directly (or asserts stdout that the load-failure warning
// would pollute) fails HERE while passing in CI. This is a known environment
// limitation, not a defect in the code under test: the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 is unavailable. See
// tests/unit/_helpers/betterSqlite3Availability.ts for a guard helper.
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
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

    const exitCode = await runSetupCommand({
      nonInteractive: true,
      password: "super-secret",
      addProvider: true,
      provider: "openai",
      providerName: "OpenAI CLI",
      apiKey: "sk-test",
      defaultModel: "gpt-4o-mini",
    });

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

    const exitCode = await runSetupCommand({ nonInteractive: true, password: "super-secret" });

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

    const exitCode = await runSetupCommand({
      nonInteractive: true,
      addProvider: true,
      provider: "openai",
      apiKey: "sk-test",
    });

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

    const exitCode = await runSetupCommand({
      nonInteractive: true,
      addProvider: true,
      provider: "openai",
      apiKey: "sk-test",
      testProvider: true,
    });

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

test("setup command reads the admin password from INITIAL_PASSWORD when --password is not set", async () => {
  const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
  await withTempEnv(async (dataDir) => {
    process.env.INITIAL_PASSWORD = "env-var-secret";

    const loggedLines: string[] = [];
    const originalConsoleLog = console.log;
    console.log = (...args: unknown[]) => {
      loggedLines.push(args.map(String).join(" "));
    };

    try {
      const { runSetupCommand } = await import("../../bin/cli/commands/setup.mjs");

      const exitCode = await runSetupCommand({ nonInteractive: true });

      assert.equal(exitCode, 0);

      const db = new Database(path.join(dataDir, "storage.sqlite"));
      const rows = db
        .prepare("SELECT key, value FROM key_value WHERE namespace = 'settings'")
        .all() as Array<{ key: string; value: string }>;
      const settings = Object.fromEntries(rows.map((row) => [row.key, JSON.parse(row.value)]));
      db.close();

      assert.equal(settings.requireLogin, true);
      assert.equal(await bcrypt.compare("env-var-secret", settings.password as string), true);

      // The raw password must never be echoed to stdout while resolving/setting it.
      assert.ok(
        !loggedLines.some((line) => line.includes("env-var-secret")),
        "INITIAL_PASSWORD value must not be logged during setup"
      );
    } finally {
      console.log = originalConsoleLog;
    }
  });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

test("setup command prioritizes an explicit --password flag over INITIAL_PASSWORD", async () => {
  const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
  await withTempEnv(async (dataDir) => {
    process.env.INITIAL_PASSWORD = "env-var-should-lose";

    const { runSetupCommand } = await import("../../bin/cli/commands/setup.mjs");

    const exitCode = await runSetupCommand({
      nonInteractive: true,
      password: "flag-should-win",
    });

    assert.equal(exitCode, 0);

    const db = new Database(path.join(dataDir, "storage.sqlite"));
    const passwordRow = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'password'")
      .get() as { value: string };
    db.close();

    const storedHash = JSON.parse(passwordRow.value) as string;
    assert.equal(await bcrypt.compare("flag-should-win", storedHash), true);
    assert.equal(await bcrypt.compare("env-var-should-lose", storedHash), false);
  });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

test("setup command does not replace an existing password from INITIAL_PASSWORD", async () => {
  const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
  await withTempEnv(async (dataDir) => {
    const { runSetupCommand } = await import("../../bin/cli/commands/setup.mjs");

    await runSetupCommand({ nonInteractive: true, password: "existing-admin-secret" });

    process.env.INITIAL_PASSWORD = "CHANGEME";
    const exitCode = await runSetupCommand({ nonInteractive: true });

    assert.equal(exitCode, 0);

    const db = new Database(path.join(dataDir, "storage.sqlite"));
    const passwordRow = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'password'")
      .get() as { value: string };
    db.close();

    const storedHash = JSON.parse(passwordRow.value) as string;
    assert.equal(await bcrypt.compare("existing-admin-secret", storedHash), true);
    assert.equal(await bcrypt.compare("CHANGEME", storedHash), false);
  });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});
