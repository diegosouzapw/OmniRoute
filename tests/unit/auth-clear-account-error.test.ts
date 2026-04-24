import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-clear-"));
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

test("clearAccountError clears stale provider error metadata after recovery", async () => {
  await resetStorage();

  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "recover@example.com",
    accessToken: "access",
    refreshToken: "refresh",
    testStatus: "active",
    lastError: null,
    lastErrorType: "token_refresh_failed",
    lastErrorSource: "oauth",
    errorCode: "refresh_failed",
    rateLimitedUntil: null,
    backoffLevel: 2,
  });

  const credentials = await auth.getProviderCredentials("codex");
  assert.equal(credentials.connectionId, created.id);
  assert.equal(credentials.errorCode, "refresh_failed");
  assert.equal(credentials.lastErrorType, "token_refresh_failed");
  assert.equal(credentials.lastErrorSource, "oauth");
  await auth.clearAccountError((created as any).id, credentials);

  const updated = await providersDb.getProviderConnectionById((created as any).id);
  assert.equal(updated.testStatus, "active");
  assert.equal(updated.lastError, undefined);
  assert.equal(updated.lastErrorType, undefined);
  assert.equal(updated.lastErrorSource, undefined);
  assert.equal(updated.errorCode, undefined);
  assert.equal(updated.rateLimitedUntil, undefined);
  assert.equal(updated.backoffLevel, 0);
});

test("clearAccountError is a no-op when the connection is already clean", async () => {
  await resetStorage();

  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "already-clean",
    apiKey: "sk-clean",
    testStatus: "active",
  });

  await auth.clearAccountError((created as any).id, {
    connectionId: created.id,
    testStatus: "active",
    lastError: null,
    rateLimitedUntil: null,
    errorCode: null,
    lastErrorType: null,
    lastErrorSource: null,
  });

  const updated = await providersDb.getProviderConnectionById((created as any).id);
  assert.equal(updated.testStatus, "active");
  assert.equal(updated.backoffLevel, 0);
  assert.equal(updated.lastError, undefined);
});

test("clearRecoveredProviderState ignores empty payloads and clears recoverable connections", async () => {
  await resetStorage();

  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "recover-state@example.com",
    accessToken: "access",
    refreshToken: "refresh",
    testStatus: "unavailable",
    lastError: "temporary failure",
    lastErrorType: "transient",
    lastErrorSource: "executor",
    errorCode: 503,
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    backoffLevel: 2,
  });

  await auth.clearRecoveredProviderState(null);
  await auth.clearRecoveredProviderState({});
  await auth.clearRecoveredProviderState({
    connectionId: created.id,
    testStatus: "unavailable",
    lastError: "temporary failure",
    lastErrorType: "transient",
    lastErrorSource: "executor",
    errorCode: 503,
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });

  const updated = await providersDb.getProviderConnectionById((created as any).id);
  assert.equal(updated.testStatus, "active");
  assert.equal(updated.lastError, undefined);
  assert.equal(updated.lastErrorType, undefined);
  assert.equal(updated.lastErrorSource, undefined);
  assert.equal(updated.errorCode, undefined);
  assert.equal(updated.rateLimitedUntil, undefined);
  assert.equal(updated.backoffLevel, 0);
});

test("getProviderCredentials resolves provider aliases to canonical DB records", async () => {
  await resetStorage();

  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "alias@example.com",
    accessToken: "access",
    refreshToken: "refresh",
    testStatus: "active",
  });

  const credentials = await auth.getProviderCredentials("cx");
  assert.equal(credentials.connectionId, created.id);
});
