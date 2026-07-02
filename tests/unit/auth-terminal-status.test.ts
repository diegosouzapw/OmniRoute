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
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

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

test("getProviderCredentials can reuse a locally suppressed connection for combo live tests", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-live-test",
    isActive: true,
    testStatus: "credits_exhausted",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });

  const selected = await auth.getProviderCredentials("openai", null, null, null, {
    allowSuppressedConnections: true,
    bypassQuotaPolicy: true,
  });

  assert.ok(selected);
  assert.equal(selected.connectionId, conn.id);
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
    (conn as any).id,
    503,
    "temporary upstream error",
    "openai",
    "gpt-4.1"
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);

  const after = await providersDb.getProviderConnectionById((conn as any).id);
  assert.equal(after.testStatus, "credits_exhausted");
});

test("markAccountUnavailable marks 401 connections as expired without adding cooldown", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-expired",
    isActive: true,
    testStatus: "active",
  });

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    401,
    "unauthorized",
    "openai",
    "gpt-4.1"
  );
  const after = await providersDb.getProviderConnectionById((conn as any).id);

  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(after.testStatus, "expired");
  assert.ok(!after.rateLimitedUntil);
});

test("markAccountUnavailable marks 402 connections as credits_exhausted without adding cooldown", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-credits",
    isActive: true,
    testStatus: "active",
  });

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    402,
    "payment required",
    "openai",
    "gpt-4.1"
  );
  const after = await providersDb.getProviderConnectionById((conn as any).id);

  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(after.testStatus, "credits_exhausted");
  assert.ok(!after.rateLimitedUntil);
});

test("markAccountUnavailable treats API-key 403 as a recoverable cooldown", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    apiKey: "sk-recoverable",
    isActive: true,
    testStatus: "active",
  });

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    403,
    "forbidden",
    "glm",
    "glm-5.1"
  );
  const after = await providersDb.getProviderConnectionById((conn as any).id);

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);
  assert.equal(after.testStatus, "unavailable");
  assert.ok(after.rateLimitedUntil);
  assert.equal(after.lastErrorType ?? null, null);
});

test("markAccountUnavailable keeps Grok Web alias 403 errors mode-local", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "grok-web",
    authType: "cookie",
    apiKey: "sso=grok-cookie",
    isActive: true,
    testStatus: "active",
  });

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    403,
    "forbidden",
    "gw",
    "heavy"
  );
  const after = await providersDb.getProviderConnectionById((conn as any).id);
  const lockout = accountFallback.getModelLockoutInfo("gw", (conn as any).id, "heavy");

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);
  assert.equal(after.testStatus, "active");
  assert.equal(after.lastErrorType, "forbidden");
  assert.ok(!after.rateLimitedUntil);
  assert.equal(lockout?.reason, "forbidden");
});

test("markAccountUnavailable keeps project-route 403 errors non-terminal", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-project-route",
    isActive: true,
    testStatus: "active",
  });

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    403,
    "The service has not been used in project",
    "openai",
    "gpt-4.1"
  );
  const after = await providersDb.getProviderConnectionById((conn as any).id);

  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(after.testStatus, "active");
  assert.equal(after.lastErrorType, "project_route_error");
  assert.ok(!after.rateLimitedUntil);
});

test("markAccountUnavailable keeps oauth-invalid 401 errors non-terminal", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-oauth-invalid",
    isActive: true,
    testStatus: "active",
  });

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    401,
    "Invalid authentication credentials provided",
    "openai",
    "gpt-4.1"
  );
  const after = await providersDb.getProviderConnectionById((conn as any).id);

  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(after.testStatus, "active");
  assert.equal(after.lastErrorType, "oauth_invalid_token");
  assert.ok(!after.rateLimitedUntil);
});
