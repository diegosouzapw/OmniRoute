import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-allowed-quotas-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "allowed-quotas-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("allowedQuotas round-trips: create with pool IDs and read them back via getApiKeyMetadata", async () => {
  const created = await apiKeysDb.createApiKey("Quota Key", "machine-quota-01");

  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: ["pool-x", "pool-y"],
  });
  apiKeysDb.clearApiKeyCaches();

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);

  assert.ok(metadata, "metadata should not be null");
  assert.deepEqual(metadata.allowedQuotas, ["pool-x", "pool-y"]);
});

test("allowedQuotas defaults to [] when not set on a new key", async () => {
  const created = await apiKeysDb.createApiKey("No Quota Key", "machine-quota-02");

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);

  assert.ok(metadata, "metadata should not be null");
  assert.deepEqual(metadata.allowedQuotas, []);
});

test("allowedQuotas can be updated and cleared back to empty", async () => {
  const created = await apiKeysDb.createApiKey("Clearable Quota Key", "machine-quota-03");

  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: ["pool-a", "pool-b", "pool-c"],
  });
  apiKeysDb.clearApiKeyCaches();

  const metaFilled = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.deepEqual(metaFilled?.allowedQuotas, ["pool-a", "pool-b", "pool-c"]);

  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedQuotas: [] });
  apiKeysDb.clearApiKeyCaches();

  const metaCleared = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.deepEqual(metaCleared?.allowedQuotas, []);
});

test("allowedQuotas round-trips via getApiKeyById", async () => {
  const created = await apiKeysDb.createApiKey("ById Quota Key", "machine-quota-04");

  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: ["pool-x", "pool-y"],
  });

  const row = await apiKeysDb.getApiKeyById(created.id);

  assert.ok(row, "row should not be null");
  assert.deepEqual((row as Record<string, unknown>).allowedQuotas, ["pool-x", "pool-y"]);
});

test("allowedQuotas round-trips via getApiKeys list", async () => {
  const created = await apiKeysDb.createApiKey("List Quota Key", "machine-quota-05");

  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedQuotas: ["pool-list"],
  });

  const allKeys = await apiKeysDb.getApiKeys();
  const found = allKeys.find((k) => k.id === created.id);

  assert.ok(found, "key should appear in getApiKeys list");
  assert.deepEqual((found as Record<string, unknown>).allowedQuotas, ["pool-list"]);
});
