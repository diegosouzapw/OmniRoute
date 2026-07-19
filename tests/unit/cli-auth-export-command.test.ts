import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_STORAGE_ENCRYPTION_KEY = process.env.STORAGE_ENCRYPTION_KEY;

const TEST_KEY = "test-storage-encryption-key-for-auth-export";
const PLAINTEXT_API_KEY = "sk-secret-api-key-value-12345";
const PLAINTEXT_ACCESS_TOKEN = "oauth-access-token-value-67890";

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-auth-export-"));
}

interface CapturedOutput {
  logs: string[];
  errors: string[];
}

function captureConsole(): { captured: CapturedOutput; restore: () => void } {
  const originalLog = console.log;
  const originalError = console.error;
  const captured: CapturedOutput = { logs: [], errors: [] };
  console.log = (msg?: unknown) => {
    captured.logs.push(String(msg ?? ""));
  };
  console.error = (msg?: unknown) => {
    captured.errors.push(String(msg ?? ""));
  };
  return {
    captured,
    restore: () => {
      console.log = originalLog;
      console.error = originalError;
    },
  };
}

async function withAuthExportEnv(
  fn: (dataDir: string, dbPath: string) => Promise<void>
): Promise<void> {
  const dataDir = createTempDataDir();
  const dbPath = path.join(dataDir, "storage.sqlite");
  process.env.DATA_DIR = dataDir;
  delete process.env.STORAGE_ENCRYPTION_KEY;

  try {
    new Database(dbPath).close();
    await fn(dataDir, dbPath);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });

    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

    if (ORIGINAL_STORAGE_ENCRYPTION_KEY === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
    else process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_STORAGE_ENCRYPTION_KEY;
  }
}

function seedConnection(
  dbPath: string,
  overrides: { apiKey?: string | null; accessToken?: string | null } = {}
) {
  const db = new Database(dbPath);
  const now = new Date().toISOString();
  db.prepare(
    `CREATE TABLE IF NOT EXISTS provider_connections (
      id TEXT PRIMARY KEY,
      provider TEXT NOT NULL,
      auth_type TEXT,
      name TEXT,
      email TEXT,
      priority INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      access_token TEXT,
      refresh_token TEXT,
      expires_at TEXT,
      token_expires_at TEXT,
      scope TEXT,
      project_id TEXT,
      test_status TEXT,
      error_code TEXT,
      last_error TEXT,
      last_error_at TEXT,
      last_error_type TEXT,
      last_error_source TEXT,
      backoff_level INTEGER DEFAULT 0,
      rate_limited_until TEXT,
      health_check_interval INTEGER,
      last_health_check_at TEXT,
      last_tested TEXT,
      api_key TEXT,
      id_token TEXT,
      provider_specific_data TEXT,
      expires_in INTEGER,
      display_name TEXT,
      global_priority INTEGER,
      default_model TEXT,
      token_type TEXT,
      consecutive_use_count INTEGER DEFAULT 0,
      rate_limit_protection INTEGER DEFAULT 0,
      last_used_at TEXT,
      "group" TEXT,
      max_concurrent INTEGER,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`
  ).run();

  const id = "conn-auth-export-test";
  db.prepare(
    `INSERT INTO provider_connections (id, provider, auth_type, name, api_key, access_token, created_at, updated_at)
     VALUES (@id, @provider, @authType, @name, @apiKey, @accessToken, @createdAt, @updatedAt)`
  ).run({
    id,
    provider: "openai",
    authType: "apikey",
    name: "openai",
    apiKey: overrides.apiKey === undefined ? null : overrides.apiKey,
    accessToken: overrides.accessToken === undefined ? null : overrides.accessToken,
    createdAt: now,
    updatedAt: now,
  });
  db.close();
  return id;
}

function assertNoSecretLeak(text: string, secrets: string[]) {
  for (const secret of secrets) {
    assert.ok(
      !text.includes(secret),
      `Expected output to not contain the plaintext secret value (leak found)`
    );
  }
}

test("auth export without --force never touches the DB and prints no secrets", async () => {
  await withAuthExportEnv(async (_dataDir, dbPath) => {
    seedConnection(dbPath, { apiKey: PLAINTEXT_API_KEY });
    const { runAuthExportCommand } = await import("../../bin/cli/commands/auth-export.mjs");

    const { captured, restore } = captureConsole();
    const result = await runAuthExportCommand({});
    restore();

    assert.equal(result, 0);
    const combined = [...captured.logs, ...captured.errors].join("\n");
    assertNoSecretLeak(combined, [PLAINTEXT_API_KEY]);
  });
});

test("auth export with --force but no STORAGE_ENCRYPTION_KEY fails without leaking anything", async () => {
  await withAuthExportEnv(async (_dataDir, dbPath) => {
    seedConnection(dbPath, { apiKey: PLAINTEXT_API_KEY });
    const { runAuthExportCommand } = await import("../../bin/cli/commands/auth-export.mjs");

    const { captured, restore } = captureConsole();
    const result = await runAuthExportCommand({ force: true, format: "json" });
    restore();

    assert.equal(result, 1);
    const combined = [...captured.logs, ...captured.errors].join("\n");
    assertNoSecretLeak(combined, [PLAINTEXT_API_KEY]);
    assert.ok(combined.length > 0, "expected a clear error message");
  });
});

test("auth export --format json decrypts and returns plaintext values for --id filter", async () => {
  await withAuthExportEnv(async (_dataDir, dbPath) => {
    process.env.STORAGE_ENCRYPTION_KEY = TEST_KEY;
    const { encryptCredential } = await import("../../bin/cli/encryption.mjs");
    const id = seedConnection(dbPath, {
      apiKey: encryptCredential(PLAINTEXT_API_KEY),
      accessToken: encryptCredential(PLAINTEXT_ACCESS_TOKEN),
    });

    const { runAuthExportCommand } = await import("../../bin/cli/commands/auth-export.mjs");
    const { captured, restore } = captureConsole();
    const result = await runAuthExportCommand({ id, force: true, format: "json" });
    restore();

    assert.equal(result, 0);
    const parsed = JSON.parse(captured.logs.join("\n"));
    assert.equal(parsed.length, 1);
    assert.equal(parsed[0].apiKey, PLAINTEXT_API_KEY);
    assert.equal(parsed[0].accessToken, PLAINTEXT_ACCESS_TOKEN);
    assert.equal(parsed[0].apiKeyDecryptFailed, false);
    assert.equal(parsed[0].accessTokenDecryptFailed, false);
  });
});

test("auth export tolerates malformed ciphertext in one field via a boolean flag, never the raw error", async () => {
  await withAuthExportEnv(async (_dataDir, dbPath) => {
    process.env.STORAGE_ENCRYPTION_KEY = TEST_KEY;
    const { encryptCredential } = await import("../../bin/cli/encryption.mjs");
    const id = seedConnection(dbPath, {
      apiKey: "enc:v1:garbage:not:valid",
      accessToken: encryptCredential(PLAINTEXT_ACCESS_TOKEN),
    });

    const { runAuthExportCommand } = await import("../../bin/cli/commands/auth-export.mjs");
    const { captured, restore } = captureConsole();
    const result = await runAuthExportCommand({ id, force: true, format: "json" });
    restore();

    assert.equal(result, 0);
    const parsed = JSON.parse(captured.logs.join("\n"));
    assert.equal(parsed[0].apiKey, null);
    assert.equal(parsed[0].apiKeyDecryptFailed, true);
    // sibling field still exports correctly despite the malformed one
    assert.equal(parsed[0].accessToken, PLAINTEXT_ACCESS_TOKEN);
    assert.equal(parsed[0].accessTokenDecryptFailed, false);
  });
});

test("auth export --format env emits OMNIROUTE_<PROVIDER>_<FIELD>=<value> lines", async () => {
  await withAuthExportEnv(async (_dataDir, dbPath) => {
    process.env.STORAGE_ENCRYPTION_KEY = TEST_KEY;
    const { encryptCredential } = await import("../../bin/cli/encryption.mjs");
    const id = seedConnection(dbPath, { apiKey: encryptCredential(PLAINTEXT_API_KEY) });

    const { runAuthExportCommand } = await import("../../bin/cli/commands/auth-export.mjs");
    const { captured, restore } = captureConsole();
    const result = await runAuthExportCommand({ id, force: true, format: "env" });
    restore();

    assert.equal(result, 0);
    const output = captured.logs.join("\n");
    assert.match(output, new RegExp(`OMNIROUTE_OPENAI_API_KEY=${PLAINTEXT_API_KEY}`));
  });
});

test("auth export --out writes the file with 0600 permissions (even if it pre-existed looser)", async (t) => {
  if (process.platform === "win32") {
    t.skip("POSIX file-mode assertion does not apply on Windows");
    return;
  }

  await withAuthExportEnv(async (dataDir, dbPath) => {
    process.env.STORAGE_ENCRYPTION_KEY = TEST_KEY;
    const { encryptCredential } = await import("../../bin/cli/encryption.mjs");
    const id = seedConnection(dbPath, { apiKey: encryptCredential(PLAINTEXT_API_KEY) });

    const outFile = path.join(dataDir, "export.json");
    fs.writeFileSync(outFile, "", { mode: 0o644 });

    const { runAuthExportCommand } = await import("../../bin/cli/commands/auth-export.mjs");
    const { restore } = captureConsole();
    const result = await runAuthExportCommand({ id, force: true, format: "json", out: outFile });
    restore();

    assert.equal(result, 0);
    const mode = fs.statSync(outFile).mode & 0o777;
    assert.equal(mode, 0o600);
    const content = fs.readFileSync(outFile, "utf8");
    assert.ok(content.includes(PLAINTEXT_API_KEY));
  });
});

test("auth export --id not found returns 1 and error message never echoes a decrypted value", async () => {
  await withAuthExportEnv(async (_dataDir, dbPath) => {
    process.env.STORAGE_ENCRYPTION_KEY = TEST_KEY;
    const { encryptCredential } = await import("../../bin/cli/encryption.mjs");
    seedConnection(dbPath, { apiKey: encryptCredential(PLAINTEXT_API_KEY) });

    const { runAuthExportCommand } = await import("../../bin/cli/commands/auth-export.mjs");
    const { captured, restore } = captureConsole();
    const result = await runAuthExportCommand({
      id: "does-not-exist",
      force: true,
      format: "json",
    });
    restore();

    assert.equal(result, 1);
    const combined = [...captured.logs, ...captured.errors].join("\n");
    assert.ok(combined.includes("does-not-exist"));
    assertNoSecretLeak(combined, [PLAINTEXT_API_KEY]);
  });
});

test("security regression: no plaintext secret ever leaks into stdout/stderr/error text across all paths", async () => {
  await withAuthExportEnv(async (_dataDir, dbPath) => {
    process.env.STORAGE_ENCRYPTION_KEY = TEST_KEY;
    const { encryptCredential } = await import("../../bin/cli/encryption.mjs");
    const id = seedConnection(dbPath, {
      apiKey: encryptCredential(PLAINTEXT_API_KEY),
      accessToken: "enc:v1:corrupted:ciphertext:tag",
    });

    const { runAuthExportCommand } = await import("../../bin/cli/commands/auth-export.mjs");

    // 1) dry run (no --force)
    let capture = captureConsole();
    await runAuthExportCommand({});
    capture.restore();
    const dryRunText = [...capture.captured.logs, ...capture.captured.errors].join("\n");

    // 2) missing key path
    const savedKey = process.env.STORAGE_ENCRYPTION_KEY;
    delete process.env.STORAGE_ENCRYPTION_KEY;
    capture = captureConsole();
    await runAuthExportCommand({ force: true });
    capture.restore();
    const missingKeyText = [...capture.captured.logs, ...capture.captured.errors].join("\n");
    process.env.STORAGE_ENCRYPTION_KEY = savedKey;

    // 3) successful export with one malformed field (accessToken)
    capture = captureConsole();
    await runAuthExportCommand({ id, force: true, format: "json" });
    capture.restore();
    const exportText = capture.captured.logs.join("\n");

    // The accessToken value never decrypts (malformed), and its plaintext counterpart
    // was never generated — so the only plaintext that legitimately appears anywhere
    // is PLAINTEXT_API_KEY inside the successful export JSON payload itself. Error/log
    // text from the dry-run and missing-key paths must never contain it.
    assertNoSecretLeak(dryRunText, [PLAINTEXT_API_KEY]);
    assertNoSecretLeak(missingKeyText, [PLAINTEXT_API_KEY]);

    const parsed = JSON.parse(exportText);
    assert.equal(parsed[0].accessTokenDecryptFailed, true);
    assert.equal(parsed[0].accessToken, null);
    // the malformed raw ciphertext string itself must never appear verbatim in any
    // error-labeled part of the output (it only appears as the data value, which is
    // expected — but there must be no separate "error: <ciphertext>" style leak)
    assert.ok(!exportText.includes("Malformed encrypted provider credential."));
  });
});
