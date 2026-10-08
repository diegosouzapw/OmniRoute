import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "oauth-reauth-expiry-"));
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const persistence = await import("../../src/lib/oauth/connectionPersistence.ts");
const { checkConnection } = await import("../../src/lib/tokenHealthCheck.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(process.env.DATA_DIR!, { recursive: true, force: true });
});

test("reauth replaces stale expiry and survives the next health check without refreshing", async () => {
  const staleExpiry = new Date(Date.now() - 3600_000).toISOString();
  const connection = await db.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: false,
    testStatus: "expired",
    accessToken: "old-access",
    refreshToken: null,
    expiresAt: staleExpiry,
    tokenExpiresAt: staleExpiry,
    lastError: "Refresh token consumed",
    lastErrorType: "unrecoverable_refresh_error",
    lastErrorSource: "oauth",
    errorCode: "unrecoverable_refresh_error",
  });
  await db.updateProviderConnection(connection.id, { tokenExpiresAt: staleExpiry });
  await persistence.persistOAuthConnection(
    "codex",
    {
      accessToken: "fresh-access",
      refreshToken: "fresh-refresh",
      expiresIn: 864000,
    },
    connection.id
  );
  const reauthed = await db.getProviderConnectionById(connection.id);
  assert.equal(reauthed!.tokenExpiresAt, reauthed!.expiresAt);
  assert.equal(reauthed!.lastError ?? null, null);
  assert.equal(reauthed!.errorCode ?? null, null);
  const originalFetch = globalThis.fetch;
  let refreshCalls = 0;
  globalThis.fetch = async () => {
    refreshCalls++;
    return Response.json({ error: { code: "refresh_token_invalidated" } }, { status: 401 });
  };
  try {
    await checkConnection(reauthed);
  } finally {
    globalThis.fetch = originalFetch;
  }
  const after = await db.getProviderConnectionById(connection.id);
  assert.equal(refreshCalls, 0);
  assert.equal(after!.isActive, true);
  assert.equal(after!.testStatus, "active");
  assert.equal(after!.refreshToken, "fresh-refresh");
});

test("reauth with unknown expiry clears the previous token clock", async () => {
  const connection = await db.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    accessToken: "old",
    tokenExpiresAt: "2020-01-01T00:00:00.000Z",
    isActive: false,
  });
  await db.updateProviderConnection(connection.id, { tokenExpiresAt: "2020-01-01T00:00:00.000Z" });
  await persistence.persistOAuthConnection(
    "codex",
    { accessToken: "new", refreshToken: "new-refresh" },
    connection.id
  );
  const after = await db.getProviderConnectionById(connection.id);
  assert.equal(after!.expiresAt ?? null, null);
  assert.equal(after!.tokenExpiresAt ?? null, null);
});
