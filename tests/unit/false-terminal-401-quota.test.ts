import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-false-terminal-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("401 credits-exhausted body is credits_exhausted, not expired", async () => {
  await resetStorage();
  const conn = await providersDb.createProviderConnection({
    provider: "chutes",
    authType: "apikey",
    apiKey: "sk-chutes-live",
    isActive: true,
    testStatus: "active",
  });
  const connId = String(conn.id);
  await auth.markAccountUnavailable(
    connId,
    401,
    "[chutes] All 3 connection(s) credits exhausted — please reconnect in the dashboard",
    "chutes",
    "moonshotai/Kimi-K3-TEE"
  );
  const after = await providersDb.getProviderConnectionById(connId);
  assert.equal(after.testStatus, "credits_exhausted");
  assert.notEqual(after.testStatus, "expired");
});

test("billing-cycle quota 403 stays unavailable until the cached reset", async () => {
  await resetStorage();
  const quotaCache = await import("../../src/domain/quotaCache.ts");
  const conn = await providersDb.createProviderConnection({
    provider: "kimi-coding",
    authType: "oauth",
    accessToken: "kimi-access-token",
    refreshToken: "kimi-refresh-token",
    isActive: true,
    testStatus: "active",
  });
  const connId = String(conn.id);
  const resetAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  quotaCache.setQuotaCache(connId, "kimi-coding", {
    Ratelimit: { remainingPercentage: 0, resetAt },
    Weekly: {
      remainingPercentage: 62,
      resetAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  });
  const result = await auth.markAccountUnavailable(
    connId,
    403,
    "You've reached your usage limit for this billing cycle. Your quota will be refreshed in the next cycle.",
    "kimi-coding",
    "kimi-for-coding"
  );
  const after = await providersDb.getProviderConnectionById(connId);
  assert.equal(result.shouldFallback, true);
  assert.ok(Math.abs(result.cooldownMs - 30 * 60 * 1000) < 2_000);
  assert.equal(after.testStatus, "unavailable");
  assert.notEqual(after.testStatus, "credits_exhausted");
  assert.equal(after.lastErrorType, "quota_exhausted");
  quotaCache.__clearForTests();
});

test("401 with a still-valid access token does not expire the connection", async () => {
  await resetStorage();
  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    accessToken: "sk-ant-fresh",
    refreshToken: "rt-fresh",
    isActive: true,
    testStatus: "active",
    tokenExpiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  });
  const connId = String(conn.id);
  await auth.markAccountUnavailable(connId, 401, "unauthorized", "claude", "claude-opus-4-8");
  const after = await providersDb.getProviderConnectionById(connId);
  assert.notEqual(after.testStatus, "expired");
  assert.equal(after.isActive, true);
});
