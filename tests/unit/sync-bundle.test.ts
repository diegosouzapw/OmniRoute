import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sync-bundle-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-sync-bundle-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const syncBundle = await import("../../src/lib/sync/bundle.ts");

function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_API_KEY_SECRET === undefined) {
    delete process.env.API_KEY_SECRET;
  } else {
    process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  }
});

test("config sync bundle is deterministic, strips auth settings, and ignores volatile fields", async () => {
  await settingsDb.updateSettings({
    theme: "midnight",
    requireLogin: true,
    password: "hashed-password",
    cloudEnabled: true,
  });
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Primary OpenAI",
    apiKey: "sk-live-secret",
    defaultModel: "gpt-4o-mini",
    providerSpecificData: { region: "us" },
  });
  await modelsDb.setModelAlias("smart-default", "openai/gpt-4o-mini");
  await combosDb.createCombo({
    name: "primary",
    models: ["openai/gpt-4o-mini"],
    strategy: "priority",
  });
  await apiKeysDb.createApiKey("Desktop", "machine-sync-1");

  const first = await syncBundle.buildConfigSyncEnvelope();
  const second = await syncBundle.buildConfigSyncEnvelope();

  assert.equal(first.version, second.version);
  assert.deepEqual(first.bundle, second.bundle);
  assert.equal(first.bundle.settings.password, undefined);
  assert.equal(first.bundle.settings.requireLogin, undefined);
  assert.equal(first.bundle.settings.cloudEnabled, undefined);
  assert.equal(first.bundle.providerConnections[0].apiKey, "sk-live-secret");
  assert.equal(first.bundle.modelAliases["smart-default"], "openai/gpt-4o-mini");

  await providersDb.updateProviderConnection((connection as any).id, {
    lastError: "temporary upstream failure",
    lastErrorAt: "2026-04-14T12:00:00.000Z",
    rateLimitedUntil: "2026-04-14T12:30:00.000Z",
  });

  const afterVolatileChange = await syncBundle.buildConfigSyncEnvelope();
  assert.equal(afterVolatileChange.version, first.version);

  await providersDb.updateProviderConnection((connection as any).id, {
    defaultModel: "gpt-4.1-mini",
  });

  const afterConfigChange = await syncBundle.buildConfigSyncEnvelope();
  assert.notEqual(afterConfigChange.version, first.version);
  assert.equal(afterConfigChange.bundle.providerConnections[0].defaultModel, "gpt-4.1-mini");
});
