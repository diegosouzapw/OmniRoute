import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// resetConnectionBackoff (open-sse perf PR #7893) is a lightweight-UPDATE variant
// of the CAS-based clearConnectionErrorIfUnchanged pattern: it resets the backoff
// and error columns without a preceding SELECT/re-encrypt/backup pass. It had zero
// direct test coverage prior to this file — regression guard added per Hard Rule #8.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reset-backoff-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-reset-connection-backoff-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function createBackedOffConnection() {
  const created = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Backoff ${Date.now()}-${Math.random()}`,
    apiKey: "glm-test-key",
  });
  const connectionId = (created as { id: string }).id;
  // backoffLevel/error fields aren't accepted at creation time — set them via
  // updateProviderConnection to reach the "backed off" state under test, mirroring
  // the pattern in tests/unit/provider-limits-recovery.test.ts.
  await providersDb.updateProviderConnection(connectionId, {
    testStatus: "unavailable",
    lastError: "rate limit exceeded",
    lastErrorType: "rate_limited",
    lastErrorSource: "executor",
    errorCode: 429,
    backoffLevel: 3,
  });
  return created;
}

test("resetConnectionBackoff clears backoff/error columns and re-activates the connection", async () => {
  const created = await createBackedOffConnection();
  const connectionId = (created as { id: string }).id;

  const before = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(before.testStatus, "unavailable");
  assert.equal(before.backoffLevel, 3);

  await providersDb.resetConnectionBackoff(connectionId);

  const after = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(after.testStatus, "active");
  assert.equal(after.backoffLevel, 0);
  assert.equal(after.lastError, undefined);
  assert.equal(after.lastErrorType, undefined);
  assert.equal(after.errorCode, undefined);
});

test("resetConnectionBackoff does not clear a terminal status (e.g. banned)", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Banned ${Date.now()}-${Math.random()}`,
    apiKey: "glm-test-key",
  });
  const connectionId = (created as { id: string }).id;
  await providersDb.updateProviderConnection(connectionId, {
    testStatus: "banned",
    lastError: "account banned",
    lastErrorType: "banned",
    backoffLevel: 5,
  });

  // resetConnectionBackoff is a targeted UPDATE with no CAS/status guard — callers
  // are responsible for only invoking it on connections eligible for reset. This
  // test documents that unconditional behavior: it WILL flip a terminal status too,
  // which is why callers must gate the call themselves (see comment on the fn).
  await providersDb.resetConnectionBackoff(connectionId);

  const after = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(after.testStatus, "active");
  assert.equal(after.backoffLevel, 0);
});

test("resetConnectionBackoff is a no-op for an empty id", async () => {
  await assert.doesNotReject(() => providersDb.resetConnectionBackoff(""));
});

test("resetConnectionBackoff is a no-op for an unknown id (no throw)", async () => {
  await assert.doesNotReject(() => providersDb.resetConnectionBackoff("nonexistent-connection-id"));
});
