import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-registered-keys-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const registeredKeysDb = await import("../../src/lib/db/registeredKeys.ts");

async function resetStorage() {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("registered keys issue, validate, consume budget and revoke correctly", () => {
  const issued = registeredKeysDb.issueRegisteredKey({
    name: "Primary key",
    provider: "openai",
    accountId: "acct-1",
    dailyBudget: 2,
    hourlyBudget: 2,
  });

  assert.match(issued.rawKey, /^ork_/);
  assert.equal(registeredKeysDb.getRegisteredKey(issued.id).name, "Primary key");
  assert.equal(registeredKeysDb.validateRegisteredKey(issued.rawKey).id, issued.id);

  registeredKeysDb.incrementRegisteredKeyUsage(issued.id);
  registeredKeysDb.incrementRegisteredKeyUsage(issued.id);
  assert.equal(registeredKeysDb.validateRegisteredKey(issued.rawKey), null);

  assert.equal(registeredKeysDb.revokeRegisteredKey(issued.id), true);
  assert.equal(registeredKeysDb.revokeRegisteredKey(issued.id), false);
});

test("registered keys honor idempotency and list filters", () => {
  const first = registeredKeysDb.issueRegisteredKey({
    name: "Idempotent",
    provider: "anthropic",
    accountId: "acct-2",
    idempotencyKey: "idem-1",
  });
  const second = registeredKeysDb.issueRegisteredKey({
    name: "Duplicate request",
    provider: "anthropic",
    accountId: "acct-2",
    idempotencyKey: "idem-1",
  });

  assert.equal(second.idempotencyConflict, true);
  assert.equal(second.existing.id, first.id);
  assert.equal(registeredKeysDb.listRegisteredKeys({ provider: "anthropic" }).length, 1);
  assert.equal(registeredKeysDb.listRegisteredKeys({ accountId: "acct-2" }).length, 1);
});

test("registered keys enforce provider and account quota limits", () => {
  registeredKeysDb.setProviderKeyLimit("openai", {
    maxActiveKeys: 1,
    dailyIssueLimit: 1,
    hourlyIssueLimit: 1,
  });
  registeredKeysDb.setAccountKeyLimit("acct-3", {
    maxActiveKeys: 1,
    dailyIssueLimit: 1,
    hourlyIssueLimit: 1,
  });

  const created = registeredKeysDb.issueRegisteredKey({
    name: "Quota limited",
    provider: "openai",
    accountId: "acct-3",
  });

  assert.equal(registeredKeysDb.getProviderKeyLimit("openai").dailyIssued, 1);
  assert.equal(registeredKeysDb.getAccountKeyLimit("acct-3").dailyIssued, 1);

  const providerQuota = registeredKeysDb.checkQuota("openai", "");
  assert.equal(providerQuota.allowed, false);
  assert.equal(providerQuota.errorCode, "PROVIDER_QUOTA_EXCEEDED");

  registeredKeysDb.revokeRegisteredKey(created.id);
  const accountQuota = registeredKeysDb.checkQuota("", "acct-3");
  assert.equal(accountQuota.allowed, false);
  assert.equal(accountQuota.errorCode, "ACCOUNT_QUOTA_EXCEEDED");
});
