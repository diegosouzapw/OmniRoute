import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-management-password-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const managementPassword = await import("../../src/lib/auth/managementPassword.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

async function runResetPasswordCli(password: string) {
  const child = spawn(process.execPath, [path.join(process.cwd(), "bin/reset-password.mjs")], {
    env: { ...process.env, DATA_DIR: TEST_DATA_DIR },
    stdio: ["pipe", "pipe", "pipe"],
  });

  let stdout = "";
  let stderr = "";
  let answeredPassword = false;
  let answeredConfirmation = false;

  const answerPrompts = () => {
    if (!answeredPassword && stdout.includes("Enter new password")) {
      child.stdin.write(`${password}\n`);
      answeredPassword = true;
    }
    if (answeredPassword && !answeredConfirmation && stdout.includes("Confirm new password")) {
      child.stdin.write(`${password}\n`);
      child.stdin.end();
      answeredConfirmation = true;
    }
  };

  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    stdout += chunk;
    answerPrompts();
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk;
  });

  const code = await new Promise<number | null>((resolve, reject) => {
    child.on("error", reject);
    child.on("close", resolve);
  });

  return { code, stdout, stderr };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

test("ensurePersistentManagementPasswordHash migrates INITIAL_PASSWORD into a persisted bcrypt hash", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-secret";

  const result = await managementPassword.ensurePersistentManagementPasswordHash({
    source: "test",
  });
  const settings = await settingsDb.getSettings();

  assert.equal(result.migrated, true);
  assert.equal(result.source, "env");
  assert.equal(managementPassword.isBcryptHash(settings.password), true);
  assert.notEqual(settings.password, "bootstrap-secret");
  assert.equal(
    await managementPassword.verifyManagementPassword(
      "bootstrap-secret",
      (settings as any).password
    ),
    true
  );
  assert.equal(settings.requireLogin, true);
  assert.equal(settings.setupComplete, true);
});

test("ensurePersistentManagementPasswordHash migrates legacy plaintext settings passwords", async () => {
  await settingsDb.updateSettings({
    password: "legacy-password",
    requireLogin: true,
    setupComplete: true,
  });

  const result = await managementPassword.ensurePersistentManagementPasswordHash({
    source: "test",
  });
  const settings = await settingsDb.getSettings();

  assert.equal(result.migrated, true);
  assert.equal(result.source, "stored_plaintext");
  assert.equal(managementPassword.isBcryptHash(settings.password), true);
  assert.notEqual(settings.password, "legacy-password");
  assert.equal(
    await managementPassword.verifyManagementPassword(
      "legacy-password" as any,
      (settings as any).password
    ),
    true
  );
});

test("reset-password CLI updates storage.sqlite key_value settings", async (t) => {
  core.getDbInstance();
  core.resetDbInstance();

  const result = await runResetPasswordCli("replacement-secret");
  if (
    result.code !== 0 &&
    /better-sqlite3 native binding is incompatible/i.test(result.stderr || result.stdout)
  ) {
    t.skip("better-sqlite3 native binding is incompatible with this local Node.js runtime");
    return;
  }
  assert.equal(result.code, 0, result.stderr || result.stdout);

  core.resetDbInstance();
  const settings = await settingsDb.getSettings();

  assert.equal(managementPassword.isBcryptHash(settings.password), true);
  assert.equal(
    await managementPassword.verifyManagementPassword(
      "replacement-secret",
      (settings as any).password
    ),
    true
  );
  assert.equal(settings.requireLogin, true);
  assert.equal(settings.setupComplete, true);
});
