// #8407: devin-cli must not be treated as refresh-capable, so the health sweep
// never force-expires local CLI connections that legitimately have no refresh token.
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
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function getCreatedConnectionId(connection: { id?: unknown }): string {
  assert.equal(typeof connection.id, "string");
  return connection.id as string;
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("supportsTokenRefresh excludes devin-cli (#8407)", () => {
  // Root fix: drop "devin-cli" from the explicit set so the health sweep's
  // supportsTokenRefresh=false guard applies (same idea as not listing a
  // non-refresh local-CLI provider). windsurf stays refresh-capable.
  assert.equal(
    supportsTokenRefresh("devin-cli"),
    false,
    "devin-cli is local import-token / CLI-owned — not refresh-capable"
  );
  assert.equal(supportsTokenRefresh("windsurf"), true);
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
  assert.notEqual(updated?.errorCode, "no_refresh_token", "devin-cli must not be marked no_refresh_token");
});
