/**
 * tests/unit/quota-combos-custom-and-synced.test.ts
 *
 * Verifies that syncQuotaCombos mints qtSd/ combos for custom models and
 * synced available models, not only hardcoded REGISTRY entries.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-custom-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { syncQuotaCombos } = await import("../../src/lib/quota/quotaCombos.ts");
const { quotaModelName } = await import("../../src/lib/quota/quotaModelNaming.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

async function resetStorage() {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR))
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("syncQuotaCombos generates qtSd/ combos for custom models added to a provider", async () => {
  const provider = "codex";
  const customModelId = "gpt-6-astra";

  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "codex-test",
    apiKey: "sk-codex-test",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "Codex Quota Pool" });

  // Add custom model
  await modelsDb.addCustomModel(provider, customModelId, "GPT-6 Astra");

  // Sync quota combos
  await syncQuotaCombos(pool.id);

  const expectedName = quotaModelName("GroupDemo", provider, customModelId);
  const combo = await combosDb.getComboByName(expectedName);
  assert.ok(combo, `combo "${expectedName}" must exist for custom model`);
  assert.equal(combo.strategy, "quota-share");
  const models = combo.models as Array<{ model: string }>;
  assert.equal(models[0]?.model, `${provider}/${customModelId}`);
});

test("syncQuotaCombos generates qtSd/ combos for synced models added to a connection", async () => {
  const provider = "openrouter";
  const syncedModelId = "deepseek/deepseek-r1-distill";

  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "openrouter-test",
    apiKey: "sk-openrouter-test",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "OpenRouter Pool" });

  // Add synced model for this connection
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, connId, [
    { id: syncedModelId, name: "DeepSeek R1 Distill" },
  ]);

  // Sync quota combos
  await syncQuotaCombos(pool.id);

  const expectedName = quotaModelName("GroupDemo", provider, syncedModelId);
  const combo = await combosDb.getComboByName(expectedName);
  assert.ok(combo, `combo "${expectedName}" must exist for synced model`);
  assert.equal(combo.strategy, "quota-share");
});
