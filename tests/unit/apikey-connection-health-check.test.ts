/**
 * Regression test: API-key-only connections must not be falsely expired.
 *
 * Bug: tokenHealthCheck.checkConnection() marked API-key-only connections
 * (e.g. gemini with just an API key, no OAuth refresh token) as
 * testStatus="expired" because it expected OAuth refresh tokens for any
 * provider in the supportsTokenRefresh set.
 *
 * Fix: connections that have an apiKey configured are skipped during OAuth
 * token validation, since they don't require refresh tokens.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-apikey-health-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { checkConnection } = await import("../../src/lib/tokenHealthCheck.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("API-key-only gemini connection is NOT marked expired by health check", async () => {
  await resetStorage();

  // Create a gemini connection with an API key but no refresh token
  const conn = await providersDb.createProviderConnection({
    provider: "gemini",
    name: "gemini-apikey-test",
    apiKey: "AIzaSyTest1234567890abcdefghijklmnop",
    isActive: true,
    testStatus: "active",
    healthCheckInterval: 60,
    // No refreshToken — this is an API-key-only connection
  });

  assert.equal(conn.testStatus, "active", "precondition: connection starts as active");

  // Run the health check
  await checkConnection(conn);

  // Re-read from DB
  const updated = await providersDb.getProviderConnectionById(conn.id);

  assert.equal(
    updated?.testStatus,
    "active",
    "API-key-only connection should remain active — not be marked expired"
  );
  assert.notEqual(
    updated?.errorCode,
    "no_refresh_token",
    "API-key-only connection should not get no_refresh_token error"
  );
});

test("gemini connection WITHOUT apiKey AND WITHOUT refreshToken IS marked expired", async () => {
  await resetStorage();

  // Create a gemini OAuth connection that lost its refresh token
  const conn = await providersDb.createProviderConnection({
    provider: "gemini",
    name: "gemini-oauth-no-refresh",
    accessToken: "ya29.expired-token",
    isActive: true,
    testStatus: "active",
    healthCheckInterval: 60,
    // No apiKey, no refreshToken — this is a broken OAuth connection
  });

  assert.equal(conn.testStatus, "active", "precondition: connection starts as active");

  // Run the health check
  await checkConnection(conn);

  // Re-read from DB
  const updated = await providersDb.getProviderConnectionById(conn.id);

  assert.equal(
    updated?.testStatus,
    "expired",
    "OAuth connection without refresh token should be marked expired"
  );
  assert.equal(
    updated?.errorCode,
    "no_refresh_token",
    "OAuth connection should get no_refresh_token error code"
  );
});

test("API-key-only antigravity connection is NOT marked expired by health check", async () => {
  await resetStorage();

  // antigravity also supports token refresh — verify the fix applies to all providers
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    name: "agy-apikey-test",
    apiKey: "sk-ant-test1234567890",
    isActive: true,
    testStatus: "active",
    healthCheckInterval: 60,
  });

  await checkConnection(conn);

  const updated = await providersDb.getProviderConnectionById(conn.id);

  assert.equal(
    updated?.testStatus,
    "active",
    "antigravity API-key-only connection should remain active"
  );
});

test("connection with both apiKey and refreshToken: refresh path is tried", async () => {
  await resetStorage();

  // Edge case: connection has both an API key and a refresh token
  // The health check tries the refresh token path first.
  // With a stale/invalid refresh token, the connection gets marked expired
  // even though an API key exists — the refresh path takes precedence.
  const conn = await providersDb.createProviderConnection({
    provider: "gemini",
    name: "gemini-dual-auth",
    apiKey: "AIzaSyTest1234567890abcdefghijklmnop",
    refreshToken: "1//old-refresh-token",
    accessToken: "ya29.expired-token",
    isActive: true,
    testStatus: "active",
    healthCheckInterval: 60,
  });

  await checkConnection(conn);

  const updated = await providersDb.getProviderConnectionById(conn.id);

  // The refresh token path is tried first. Since the refresh token is invalid,
  // the connection gets marked expired. This is expected — the operator should
  // either remove the stale refresh token or re-authenticate.
  assert.equal(
    updated?.testStatus,
    "expired",
    "dual-auth connection with stale refresh token should be expired (refresh path takes precedence)"
  );
});

test("sweep processes all connections with stagger + jitter delay", async () => {
  await resetStorage();

  // Create multiple connections; set isActive=false so checkConnection
  // returns immediately at the !conn.isActive guard without OAuth calls.
  const c1 = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "oauth",
    name: "Stagger Test 1",
    email: "t1@example.com",
    refreshToken: "test-rt",
    isActive: false,
  });
  const c2 = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "oauth",
    name: "Stagger Test 2",
    email: "t2@example.com",
    refreshToken: "test-rt",
    isActive: false,
  });
  const c3 = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "oauth",
    name: "Stagger Test 3",
    email: "t3@example.com",
    refreshToken: "test-rt",
    isActive: false,
  });

  // Clear any health-check skip config
  const origSetting = process.env.HEALTHCHECK_SKIP_PROVIDERS;
  const origJitterMin = process.env.HEALTHCHECK_JITTER_MIN_MS;
  const origJitterMax = process.env.HEALTHCHECK_JITTER_MAX_MS;
  delete process.env.HEALTHCHECK_SKIP_PROVIDERS;
  process.env.HEALTHCHECK_STAGGER_MS = "1";
  process.env.HEALTHCHECK_JITTER_MIN_MS = "100";
  process.env.HEALTHCHECK_JITTER_MAX_MS = "100"; // fixed jitter = deterministic

  try {
    // Import sweep — exported for testing from tokenHealthCheck
    const { sweep } = await import("../../src/lib/tokenHealthCheck.ts");

    const start = Date.now();
    await sweep();
    const elapsed = Date.now() - start;

    // 3 connections -> 2 gaps. Each gap waits
    // HEALTHCHECK_STAGGER_MS (1ms) + HEALTHCHECK_JITTER_MIN_MS (100ms) = 101ms.
    // Without jitter: 2 * 1ms = ~2ms. With jitter: 2 * 101ms = ~202ms.
    // The assert proves the jitter is actually applied.
    assert.ok(
      elapsed >= 190,
      `sweep took ${elapsed}ms — expected >= 190ms with jitter applied (jitter-free baseline would be ~2ms)`
    );

    // Verify all connections still exist (sweep didn't error out mid-loop)
    const reloaded1 = await providersDb.getProviderConnectionById(c1.id);
    const reloaded2 = await providersDb.getProviderConnectionById(c2.id);
    const reloaded3 = await providersDb.getProviderConnectionById(c3.id);
    assert.ok(reloaded1, "connection 1 should still exist");
    assert.ok(reloaded2, "connection 2 should still exist");
    assert.ok(reloaded3, "connection 3 should still exist");
  } finally {
    if (origSetting !== undefined) process.env.HEALTHCHECK_SKIP_PROVIDERS = origSetting;
    else delete process.env.HEALTHCHECK_SKIP_PROVIDERS;
    if (origJitterMin !== undefined) process.env.HEALTHCHECK_JITTER_MIN_MS = origJitterMin;
    else delete process.env.HEALTHCHECK_JITTER_MIN_MS;
    if (origJitterMax !== undefined) process.env.HEALTHCHECK_JITTER_MAX_MS = origJitterMax;
    else delete process.env.HEALTHCHECK_JITTER_MAX_MS;
    delete process.env.HEALTHCHECK_STAGGER_MS;
  }
});
