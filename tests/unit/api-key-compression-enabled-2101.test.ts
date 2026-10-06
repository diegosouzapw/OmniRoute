import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-compression-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-key-compression-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { updateKeyPermissionsSchema } = await import("../../src/shared/validation/schemas.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("API key prompt compression defaults on and round-trips an explicit opt-out", async () => {
  const created = await apiKeysDb.createApiKey("raw-prompts", "machine1234567890");

  assert.equal((await apiKeysDb.getApiKeyById(created.id))?.compressionEnabled, true);
  assert.equal((await apiKeysDb.getApiKeyMetadata(created.key))?.compressionEnabled, true);

  assert.equal(
    await apiKeysDb.updateApiKeyPermissions(created.id, { compressionEnabled: false }),
    true
  );
  assert.equal((await apiKeysDb.getApiKeyById(created.id))?.compressionEnabled, false);
  assert.equal((await apiKeysDb.getApiKeyMetadata(created.key))?.compressionEnabled, false);

  assert.equal(
    await apiKeysDb.updateApiKeyPermissions(created.id, { compressionEnabled: true }),
    true
  );
  assert.equal((await apiKeysDb.getApiKeyMetadata(created.key))?.compressionEnabled, true);
});

test("API key update schema accepts only boolean compressionEnabled values", () => {
  assert.equal(updateKeyPermissionsSchema.safeParse({ compressionEnabled: false }).success, true);
  assert.equal(updateKeyPermissionsSchema.safeParse({ compressionEnabled: true }).success, true);
  for (const invalid of [0, 1, "false", null]) {
    assert.equal(
      updateKeyPermissionsSchema.safeParse({ compressionEnabled: invalid }).success,
      false
    );
  }
});
