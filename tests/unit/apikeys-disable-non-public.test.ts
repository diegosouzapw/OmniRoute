import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-disable-non-public-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "disable-non-public-test-secret";

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

test("disableNonPublicModels: set to true via updateApiKeyPermissions, read back via getApiKeyMetadata", async () => {
  const created = await apiKeysDb.createApiKey("NonPublic Key", "machine-np-01");

  await apiKeysDb.updateApiKeyPermissions(created.id, {
    disableNonPublicModels: true,
  });
  apiKeysDb.clearApiKeyCaches();

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);

  assert.ok(metadata, "metadata should not be null");
  assert.equal(metadata.disableNonPublicModels, true, "disableNonPublicModels should be true");
});

test("disableNonPublicModels: defaults to false when not set on a new key", async () => {
  const created = await apiKeysDb.createApiKey("Default NonPublic Key", "machine-np-02");

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);

  assert.ok(metadata, "metadata should not be null");
  assert.equal(
    metadata.disableNonPublicModels,
    false,
    "disableNonPublicModels should default to false"
  );
});

test("3 columns coexist: disableNonPublicModels, allowedQuotas, streamDefaultMode all present", async () => {
  const created = await apiKeysDb.createApiKey("Coexist Key", "machine-np-03");

  await apiKeysDb.updateApiKeyPermissions(created.id, {
    disableNonPublicModels: true,
    allowedQuotas: ["pool-alpha", "pool-beta"],
    streamDefaultMode: "json",
  });
  apiKeysDb.clearApiKeyCaches();

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);

  assert.ok(metadata, "metadata should not be null");

  // Verify disableNonPublicModels
  assert.equal(metadata.disableNonPublicModels, true, "disableNonPublicModels should be true");

  // Verify allowedQuotas is still an array
  assert.ok(Array.isArray(metadata.allowedQuotas), "allowedQuotas should be an array");
  assert.deepEqual(
    metadata.allowedQuotas,
    ["pool-alpha", "pool-beta"],
    "allowedQuotas should match"
  );

  // Verify streamDefaultMode is still present
  assert.ok(
    metadata.streamDefaultMode !== undefined,
    "streamDefaultMode should be present"
  );
  assert.equal(metadata.streamDefaultMode, "json", "streamDefaultMode should be 'json'");
});

test("disableNonPublicModels: can be toggled back to false", async () => {
  const created = await apiKeysDb.createApiKey("Toggle NonPublic Key", "machine-np-04");

  await apiKeysDb.updateApiKeyPermissions(created.id, { disableNonPublicModels: true });
  apiKeysDb.clearApiKeyCaches();

  const metaTrue = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(metaTrue?.disableNonPublicModels, true, "should be true after first update");

  await apiKeysDb.updateApiKeyPermissions(created.id, { disableNonPublicModels: false });
  apiKeysDb.clearApiKeyCaches();

  const metaFalse = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.equal(metaFalse?.disableNonPublicModels, false, "should be false after second update");
});

test("disableNonPublicModels: allowedQuotas is still [] when only disableNonPublicModels is set", async () => {
  const created = await apiKeysDb.createApiKey("Separate NonPublic Key", "machine-np-05");

  await apiKeysDb.updateApiKeyPermissions(created.id, { disableNonPublicModels: true });
  apiKeysDb.clearApiKeyCaches();

  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);

  assert.ok(metadata, "metadata should not be null");
  assert.equal(metadata.disableNonPublicModels, true);
  assert.deepEqual(metadata.allowedQuotas, [], "allowedQuotas should remain empty array");
  assert.equal(metadata.streamDefaultMode, "legacy", "streamDefaultMode should remain 'legacy'");
});
