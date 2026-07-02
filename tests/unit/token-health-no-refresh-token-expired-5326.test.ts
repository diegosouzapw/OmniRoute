import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hc-no-refresh-5326-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const tokenHealthCheck = await import("../../src/lib/tokenHealthCheck.ts");

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

// Regression for #5326: a refresh-CAPABLE provider (antigravity) with NO refresh
// token used to be silently skipped by the sweep (`if (!conn.refreshToken) return`),
// leaving the row at testStatus="active" while the dashboard badge showed a
// confusing cosmetic "Token Expired". The sweep must surface reality as a terminal
// "expired" status so the row reflects that it genuinely needs re-auth.
test("checkConnection marks refresh-capable provider with no refresh token as expired (#5326)", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "Antigravity No-Refresh Account",
    email: "antigravity-no-refresh@example.com",
    accessToken: "access-token-only",
    refreshToken: null,
    testStatus: "active",
    isActive: true,
  });

  await tokenHealthCheck.checkConnection(connection);

  const updated = await providersDb.getProviderConnectionById((connection as any).id);
  assert.equal(updated?.testStatus, "expired");
  assert.equal(updated?.errorCode, "no_refresh_token");
  assert.ok(updated?.lastHealthCheckAt);
});

// A connection WITH a refresh token must NOT be force-expired by this branch. Use a
// far-future known expiry so the sweep returns before attempting any network refresh,
// isolating the behavior of the no-refresh-token branch.
test("checkConnection leaves a connection WITH a refresh token untouched (#5326)", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "Antigravity Healthy Account",
    email: "antigravity-healthy@example.com",
    accessToken: "access-token",
    refreshToken: "refresh-token-present",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    testStatus: "active",
    isActive: true,
  });

  await tokenHealthCheck.checkConnection(connection);

  const updated = await providersDb.getProviderConnectionById((connection as any).id);
  assert.equal(updated?.testStatus, "active");
  assert.notEqual(updated?.errorCode, "no_refresh_token");
});

// A provider that does NOT support token refresh must be left untouched even with no
// refresh token (it never had one to lose, and is not "expired" — just non-refreshing).
test("checkConnection leaves a non-refresh provider with no refresh token untouched (#5326)", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "custom-no-refresh-support-5326", // not in supportsTokenRefresh + no tokenUrl/refreshUrl
    authType: "oauth",
    name: "Non-refresh Provider Account",
    email: "non-refresh@example.com",
    accessToken: "access-token-only",
    refreshToken: null,
    testStatus: "active",
    isActive: true,
  });

  await tokenHealthCheck.checkConnection(connection);

  const updated = await providersDb.getProviderConnectionById((connection as any).id);
  assert.equal(updated?.testStatus, "active");
  assert.notEqual(updated?.errorCode, "no_refresh_token");
});
