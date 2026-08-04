import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-command-key-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "usage-command-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("allowUsageCommand defaults to false for new API keys", async () => {
  const created = await apiKeysDb.createApiKey("Usage Command Default", "machine-usage-01");

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  const key = await apiKeysDb.getApiKeyById(created.id);

  assert.ok(metadata);
  assert.equal(metadata.allowUsageCommand, false);
  assert.equal(key?.allowUsageCommand, false);
});

test("allowUsageCommand can be toggled through updateApiKeyPermissions", async () => {
  const created = await apiKeysDb.createApiKey("Usage Command Enabled", "machine-usage-02");

  await apiKeysDb.updateApiKeyPermissions(created.id, { allowUsageCommand: true });
  apiKeysDb.clearApiKeyCaches();

  const enabled = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(enabled?.allowUsageCommand, true);

  await apiKeysDb.updateApiKeyPermissions(created.id, { allowUsageCommand: false });
  apiKeysDb.clearApiKeyCaches();

  const disabled = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(disabled?.allowUsageCommand, false);
});
