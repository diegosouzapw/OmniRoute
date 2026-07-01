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
