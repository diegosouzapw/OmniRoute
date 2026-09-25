// disableNonPublicModels must accept the synced reasoning-effort catalog
// variants (#7694) that /v1/models and the combo builder already advertise
// (`<provider>/<model>-<tier>`), resolving them to the base synced model the
// same way request routing does — and only for a tier that base model declares.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dnp-effort-variant-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "dnp-effort-variant-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const learnedCaps = await import("../../open-sse/services/learnedReasoningEffortCaps.ts");

const PROVIDER = "grok-cli";
const CONNECTION = "conn-grok-1";

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

async function createRestrictedKey(extra: Record<string, unknown> = {}) {
  const created = await apiKeysDb.createApiKey("Effort Variant Key", "machine-effort-01");
  await apiKeysDb.updateApiKeyPermissions(created.id, { disableNonPublicModels: true, ...extra });
  apiKeysDb.clearApiKeyCaches();
  return created.key;
}

test.beforeEach(async () => {
  await resetStorage();
  learnedCaps.__test_resetLearnedReasoningEffortCaps();
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION, [
    { id: "grok-4.6", name: "Grok 4.6", supportedThinkingEfforts: ["low", "medium", "high"] },
    { id: "grok-4.5", name: "Grok 4.5" },
  ]);
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  learnedCaps.__test_resetLearnedReasoningEffortCaps();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("disableNonPublicModels allows a declared synced effort variant", async () => {
  const key = await createRestrictedKey();
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.6"), true);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.6-low"), true);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.6-high"), true);
});

test("disableNonPublicModels rejects an effort tier the base model does not declare", async () => {
  const key = await createRestrictedKey();
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.6-xhigh"), false);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.5-low"), false);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-9-low"), false);
});

test("disableNonPublicModels uses learned effort caps like routing does", async () => {
  learnedCaps.recordLearnedReasoningEffort(PROVIDER, "grok-4.6", ["low"]);
  const key = await createRestrictedKey();
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.6-low"), true);
  // Routing would not strip `-high` any more, so the literal id would go upstream.
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.6-high"), false);
});

test("disableNonPublicModels rejects an effort variant of a hidden base model", async () => {
  const key = await createRestrictedKey();
  modelsDb.mergeModelCompatOverride(PROVIDER, "grok-4.6", { isHidden: true });
  apiKeysDb.clearApiKeyCaches();
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.6-low"), false);
});

test("a blocked base model also blocks its effort variants", async () => {
  const key = await createRestrictedKey({ blockedModels: ["grok-cli/grok-4.6"] });
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.6"), false);
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.6-low"), false);
});

test("a literal synced id wins over the variant rule, including its own hidden flag", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, CONNECTION, [
    { id: "grok-4.6", name: "Grok 4.6", supportedThinkingEfforts: ["low"] },
    { id: "grok-4.6-low", name: "Literal low model" },
  ]);
  modelsDb.mergeModelCompatOverride(PROVIDER, "grok-4.6-low", { isHidden: true });
  const key = await createRestrictedKey();
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "grok-cli/grok-4.6-low"), false);
});

test("providers that own their suffix mechanism are not resolved as synced variants", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("codex", "conn-codex-1", [
    { id: "gpt-x", name: "GPT X", supportedThinkingEfforts: ["low"] },
  ]);
  const key = await createRestrictedKey();
  assert.equal(await apiKeysDb.isModelAllowedForKey(key, "codex/gpt-x-low"), false);
});
