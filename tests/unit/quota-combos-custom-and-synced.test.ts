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

async function createTestConnection(provider: string, name: string) {
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `test-${name}`,
  });
  return String(connection.id);
}

async function waitForCombo(name: string, exists: boolean) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const combo = await combosDb.getComboByName(name);
    if (Boolean(combo) === exists) return combo;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.fail(`Expected ${name} to ${exists ? "exist" : "be removed"}`);
}

test("synced models target only the connection that reported them", async () => {
  const provider = "quota-test-provider";
  const first = await createTestConnection(provider, "first");
  const second = await createTestConnection(provider, "second");
  const outside = await createTestConnection(provider, "outside");
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, first, [{ id: "first-only" }]);
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, second, [
    { id: "second-only" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, outside, [
    { id: "outside-only" },
  ]);
  const pool = poolsDb.createPool({
    connectionId: first,
    connectionIds: [first, second],
    name: "Scoped models",
  });
  await syncQuotaCombos(pool.id);
  for (const [model, connectionId] of [
    ["first-only", first],
    ["second-only", second],
  ]) {
    const combo = await combosDb.getComboByName(quotaModelName("GroupDemo", provider, model));
    assert.ok(combo);
    assert.deepEqual(
      (combo.models as Array<{ connectionId: string }>).map((step) => step.connectionId),
      [connectionId]
    );
  }
  assert.equal(
    Boolean(await combosDb.getComboByName(quotaModelName("GroupDemo", provider, "outside-only"))),
    false
  );
});

test("removing the last custom model prunes a provider without registry models", async () => {
  const provider = "quota-test-provider";
  const connectionId = await createTestConnection(provider, "custom");
  poolsDb.createPool({ connectionId, name: "Custom models" });
  await modelsDb.addCustomModel(provider, "custom-only");
  const name = quotaModelName("GroupDemo", provider, "custom-only");
  await waitForCombo(name, true);
  await modelsDb.removeCustomModel(provider, "custom-only");
  await waitForCombo(name, false);
});

for (const operation of ["remove", "delete-connection", "prune"] as const) {
  test(`${operation} automatically removes stale synced quota models`, async () => {
    const provider = "glm";
    const connectionId = await createTestConnection(provider, operation);
    poolsDb.createPool({ connectionId, name: "Synced models" });
    await modelsDb.replaceSyncedAvailableModelsForConnection(provider, connectionId, [
      { id: "synced-only" },
    ]);
    const name = quotaModelName("GroupDemo", provider, "synced-only");
    await waitForCombo(name, true);
    if (operation === "remove") await modelsDb.removeSyncedAvailableModel(provider, "synced-only");
    if (operation === "delete-connection")
      await modelsDb.deleteSyncedAvailableModelsForConnection(provider, connectionId);
    if (operation === "prune")
      await modelsDb.pruneStaleSyncedAvailableModelsForProvider(provider, ["other-connection"]);
    await waitForCombo(name, false);
  });
}
