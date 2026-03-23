import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-terminal-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("getProviderCredentials skips credits_exhausted connections", async () => {
  await resetStorage();

  const exhausted = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-exhausted",
    isActive: true,
    testStatus: "credits_exhausted",
  });

  const healthy = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-healthy",
    isActive: true,
    testStatus: "active",
  });

  const selected = await auth.getProviderCredentials("openai");
  assert.ok(selected);
  assert.equal(selected.connectionId, healthy.id);
  assert.notEqual(selected.connectionId, exhausted.id);
});

test("getProviderCredentials returns null when all active connections are terminal", async () => {
  await resetStorage();

  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-only-exhausted",
    isActive: true,
    testStatus: "credits_exhausted",
  });

  const selected = await auth.getProviderCredentials("openai");
  assert.equal(selected, null);
});

test("markAccountUnavailable does not overwrite terminal status", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-terminal",
    isActive: true,
    testStatus: "credits_exhausted",
    lastError: "insufficient_quota",
  });

  const result = await auth.markAccountUnavailable(
    conn.id,
    503,
    "temporary upstream error",
    "openai",
    "gpt-4.1"
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after.testStatus, "credits_exhausted");
});
