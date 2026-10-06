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
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      const code =
        error && typeof error === "object" && "code" in error
          ? (error as { code?: unknown }).code
          : null;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function getCreatedConnectionId(connection: { id?: unknown }): string {
  assert.equal(typeof connection.id, "string");
  return connection.id;
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

  const updated = await providersDb.getProviderConnectionById(getCreatedConnectionId(connection));
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

  const updated = await providersDb.getProviderConnectionById(getCreatedConnectionId(connection));
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

  const updated = await providersDb.getProviderConnectionById(getCreatedConnectionId(connection));
  assert.equal(updated?.testStatus, "active");
  assert.notEqual(updated?.errorCode, "no_refresh_token");
});

test("checkConnection keeps GitHub Copilot access-token-only connections active", async () => {
  await resetStorage();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        token: "verified-copilot-token",
        expires_at: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as typeof fetch;

  try {
    const connection = await providersDb.createProviderConnection({
      provider: "github",
      authType: "oauth",
      name: "GitHub Access Token Account",
      accessToken: "github-access-token",
      refreshToken: null,
      providerSpecificData: {
        copilotToken: "copilot-token",
        copilotTokenExpiresAt: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
      },
      testStatus: "active",
      isActive: true,
    });

    await tokenHealthCheck.checkConnection(connection);

    const updated = await providersDb.getProviderConnectionById(getCreatedConnectionId(connection));
    assert.equal(updated?.testStatus, "active");
    assert.notEqual(updated?.errorCode, "no_refresh_token");
    assert.ok(updated?.lastHealthCheckAt);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("checkConnection clears stale no_refresh_token state for usable GitHub Copilot connections", async () => {
  await resetStorage();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        token: "verified-copilot-token",
        expires_at: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as typeof fetch;

  try {
    const connection = await providersDb.createProviderConnection({
      provider: "github",
      authType: "oauth",
      name: "GitHub False Expired Account",
      accessToken: "github-access-token",
      refreshToken: null,
      providerSpecificData: {
        copilotToken: "copilot-token",
        copilotTokenExpiresAt: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
      },
      testStatus: "expired",
      errorCode: "no_refresh_token",
      lastError: "No refresh token available — re-authenticate this account.",
      isActive: true,
    });

    await tokenHealthCheck.checkConnection(connection);

    const updated = await providersDb.getProviderConnectionById(getCreatedConnectionId(connection));
    assert.equal(updated?.testStatus, "active");
    assert.equal(updated?.errorCode ?? null, null);
    assert.equal(updated?.lastError ?? null, null);
    assert.ok(updated?.lastHealthCheckAt);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// Boundary between #8182's terminal-skip and the retry-budget exemption that later
// widened it (`isRecoverableExpiredWithRetryBudget` in tokenHealthCheck.ts).
//
// #8182 skipped every "expired" connection to stop wasting a probe per sweep on rows
// that can never self-heal. That was too wide: a transient OAuth failure parks a healthy
// connection at "expired" and it could then never come back. The current guard therefore
// exempts an expired connection while it still has retry budget AND is not
// `account_deactivated`, so only genuinely dead accounts stay unprobed.
//
// This case used to assert the pre-exemption behaviour — that ANY non-`no_refresh_token`
// expired GitHub connection is skipped — which is no longer the policy. Both halves of
// the real boundary are pinned below instead, so the wasted-probe protection is still
// covered where it actually applies.
test("checkConnection probes an expired GitHub connection that still has retry budget", async () => {
  await resetStorage();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ message: "Bad credentials" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  try {
    const connection = await providersDb.createProviderConnection({
      provider: "github",
      authType: "oauth",
      name: "GitHub Transiently Expired Account",
      accessToken: "github-access-token",
      refreshToken: null,
      providerSpecificData: {
        copilotToken: "copilot-token",
        copilotTokenExpiresAt: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
      },
      testStatus: "expired",
      errorCode: "invalid_grant",
      lastError: "Manually invalidated by operator.",
      isActive: true,
    });

    await tokenHealthCheck.checkConnection(connection);

    const updated = await providersDb.getProviderConnectionById(getCreatedConnectionId(connection));
    assert.ok(
      updated?.lastHealthCheckAt,
      "retry budget remaining — the sweep must probe so a transient failure can self-heal"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("checkConnection still skips an expired GitHub connection whose account is deactivated (#8182)", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "GitHub Deactivated Account",
    accessToken: "github-access-token",
    refreshToken: null,
    providerSpecificData: {
      copilotToken: "copilot-token",
      copilotTokenExpiresAt: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
    },
    testStatus: "expired",
    errorCode: "invalid_grant",
    lastErrorType: "account_deactivated",
    lastError: "Account deactivated upstream.",
    isActive: true,
  });

  await tokenHealthCheck.checkConnection(connection);

  const updated = await providersDb.getProviderConnectionById(getCreatedConnectionId(connection));
  assert.equal(updated?.testStatus, "expired", "a dead account must stay terminal");
  assert.equal(updated?.errorCode, "invalid_grant");
  assert.equal(
    updated?.lastHealthCheckAt ?? null,
    null,
    "checkConnection must return early without touching the row at all"
  );
});
