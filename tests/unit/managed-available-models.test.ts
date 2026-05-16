import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-managed-available-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const localDb = await import("../../src/lib/localDb.ts");
const { compatibleProviderSupportsModelImport, getCompatibleFallbackModels } =
  await import("../../src/lib/providers/managedAvailableModels.ts");
const {
  deleteManagedAvailableModelAliases,
  deleteManagedAvailableModelAliasesForProvider,
  syncManagedAvailableModelAliases,
} = await import("../../src/lib/providerModels/managedAvailableModels.ts");
const { getModelsByProviderId } = await import("../../src/shared/constants/models.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("CC compatible fallback models mirror the OAuth Claude Code registry list", () => {
  assert.deepEqual(
    getCompatibleFallbackModels("anthropic-compatible-cc-demo"),
    getModelsByProviderId("claude")
  );
});

test("CC compatible providers disable remote model import", () => {
  assert.equal(compatibleProviderSupportsModelImport("anthropic-compatible-cc-demo"), false);
});

test("OpenRouter keeps imported fallback models as its managed list source", () => {
  const fallbackModels = [{ id: "openai/gpt-5" }, { id: "anthropic/claude-sonnet-4-6" }];
  assert.deepEqual(getCompatibleFallbackModels("openrouter", fallbackModels), fallbackModels);
});

test("hidden managed models do not create aliases during sync", async () => {
  modelsDb.mergeModelCompatOverride("openrouter", "hidden/model", { isHidden: true });

  const result = await syncManagedAvailableModelAliases("openrouter", ["hidden/model"]);
  const aliases = await localDb.getModelAliases();

  assert.deepEqual(result.assignedAliases, []);
  assert.deepEqual(aliases, {});
});

test("deleteManagedAvailableModelAliases removes only aliases matching target full models", async () => {
  await localDb.setModelAlias("target", "openrouter/xiaomi/mimo-v2.5-pro");
  await localDb.setModelAlias("same-provider-other-model", "openrouter/xiaomi/mimo-v2.5-max");
  await localDb.setModelAlias("other-provider", "openai/xiaomi/mimo-v2.5-pro");

  const removed = await deleteManagedAvailableModelAliases("openrouter", ["xiaomi/mimo-v2.5-pro"]);
  const aliases = await localDb.getModelAliases();

  assert.deepEqual(removed, ["target"]);
  assert.equal(aliases.target, undefined);
  assert.equal(aliases["same-provider-other-model"], "openrouter/xiaomi/mimo-v2.5-max");
  assert.equal(aliases["other-provider"], "openai/xiaomi/mimo-v2.5-pro");
});

test("deleteManagedAvailableModelAliasesForProvider removes provider-scoped aliases only", async () => {
  await localDb.setModelAlias("router-a", "openrouter/provider/model-a");
  await localDb.setModelAlias("router-b", "openrouter/provider/model-b");
  await localDb.setModelAlias("openai-a", "openai/provider/model-a");
  await localDb.setModelAlias("bare", "model-a");

  const removed = await deleteManagedAvailableModelAliasesForProvider("openrouter");
  const aliases = await localDb.getModelAliases();

  assert.deepEqual(new Set(removed), new Set(["router-a", "router-b"]));
  assert.equal(aliases["router-a"], undefined);
  assert.equal(aliases["router-b"], undefined);
  assert.equal(aliases["openai-a"], "openai/provider/model-a");
  assert.equal(aliases.bare, "model-a");
});

test("unhidden managed models receive a fresh alias when sync reruns", async () => {
  modelsDb.mergeModelCompatOverride("openrouter", "vendor/model", { isHidden: true });
  await syncManagedAvailableModelAliases("openrouter", ["vendor/model"]);

  modelsDb.mergeModelCompatOverride("openrouter", "vendor/model", { isHidden: false });
  const result = await syncManagedAvailableModelAliases("openrouter", ["vendor/model"]);
  const aliases = await localDb.getModelAliases();

  assert.deepEqual(result.assignedAliases, ["model"]);
  assert.equal(aliases.model, "openrouter/vendor/model");
});

test("managed alias helpers are no-ops for non-managed providers", async () => {
  await localDb.setModelAlias("manual", "claude/custom-model");

  const removedOne = await deleteManagedAvailableModelAliases("claude", ["custom-model"]);
  const removedAll = await deleteManagedAvailableModelAliasesForProvider("claude");
  const syncResult = await syncManagedAvailableModelAliases("claude", ["custom-model"]);
  const aliases = await localDb.getModelAliases();

  assert.deepEqual(removedOne, []);
  assert.deepEqual(removedAll, []);
  assert.deepEqual(syncResult.assignedAliases, []);
  assert.deepEqual(syncResult.removedAliases, []);
  assert.equal(aliases.manual, "claude/custom-model");
});
