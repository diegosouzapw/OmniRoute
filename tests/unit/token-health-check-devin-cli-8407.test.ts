// #8407: devin-cli local CLI connections must not be force-expired by health check sweep
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
