// Devin CLI and Devin Desktop use CLI-owned/import-only credentials. Neither provider
// should be treated as refresh-capable, so the health sweep must not force-expire
// connections that legitimately have no refresh token.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hc-devin-cli-8407-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const tokenHealthCheck = await import("../../src/lib/tokenHealthCheck.ts");
const { supportsTokenRefresh } = await import("../../open-sse/services/tokenRefresh.ts");

async function resetStorage() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function getCreatedConnectionId(connection: { id?: unknown }): string {
  assert.equal(typeof connection.id, "string");
  return connection.id as string;
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("supportsTokenRefresh excludes import-only Devin providers", () => {
  assert.equal(
    supportsTokenRefresh("devin-cli"),
    false,
    "devin-cli is local import-token / CLI-owned — not refresh-capable"
  );
  assert.equal(
    supportsTokenRefresh("devin-desktop"),
    false,
    "devin-desktop accepts an imported API key — not a refreshable OAuth token"
  );
});

test("checkConnection leaves a devin-cli connection with no refresh token untouched (#8407)", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "devin-cli",
    authType: "oauth",
    name: "Devin CLI Local Account",
    accessToken: "local-cli-access-token",
    refreshToken: null,
    testStatus: "active",
    isActive: true,
  });

  await tokenHealthCheck.checkConnection(connection);

  const updated = await providersDb.getProviderConnectionById(getCreatedConnectionId(connection));
  assert.equal(updated?.testStatus, "active", "devin-cli testStatus must remain active");
  assert.notEqual(
    updated?.errorCode,
    "no_refresh_token",
    "devin-cli must not be marked no_refresh_token"
  );
});

test("checkConnection leaves an import-only devin-desktop connection active (#8228)", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "devin-desktop",
    authType: "oauth",
    name: "Devin Desktop Imported Account",
    accessToken: "imported-desktop-access-token",
    refreshToken: null,
    tokenExpiresAt: null,
    apiKey: null,
    testStatus: "active",
    isActive: true,
  });

  await tokenHealthCheck.checkConnection(connection);

  const updated = await providersDb.getProviderConnectionById(getCreatedConnectionId(connection));
  assert.equal(updated?.testStatus, "active", "devin-desktop testStatus must remain active");
  assert.notEqual(
    updated?.errorCode,
    "no_refresh_token",
    "import-only devin-desktop must not be marked no_refresh_token"
  );
});
