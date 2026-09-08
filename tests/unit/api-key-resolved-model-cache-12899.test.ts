/**
 * #12899 — cache bypass must use a setting-dependent resolved target even
 * when the caller supplied a friendly alias as the requested model.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-resolved-model-cache-12899-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "resolved-model-cache-12899";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

async function resetStorage() {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("resolved setting-dependent Claude target never reuses a friendly-alias permission cache entry", async () => {
  const key = await apiKeys.createApiKey("Resolved Claude cache", "machine-12899");
  await apiKeys.updateApiKeyPermissions(key.id, {
    modelAccessMode: "restricted",
    allowedModels: ["cc/*"],
  });

  await settingsDb.updateSettings({
    preferClaudeCodeForUnprefixedClaudeModels: true,
  });
  assert.equal(
    await apiKeys.isModelAllowedForKey(key.key, "friendly-alias", "claude-fable-5"),
    true
  );

  // A settings refresh can update the active snapshot before the catalog cache
  // generation changes. The resolved target, not only the friendly request
  // alias, must therefore opt out of the short permission cache.
  const cachedSettings = await readCache.getCachedSettings();
  const previousPreference = cachedSettings.preferClaudeCodeForUnprefixedClaudeModels;
  cachedSettings.preferClaudeCodeForUnprefixedClaudeModels = false;
  try {
    assert.equal(
      await apiKeys.isModelAllowedForKey(key.key, "friendly-alias", "claude-fable-5"),
      false
    );
  } finally {
    cachedSettings.preferClaudeCodeForUnprefixedClaudeModels = previousPreference;
  }
});
