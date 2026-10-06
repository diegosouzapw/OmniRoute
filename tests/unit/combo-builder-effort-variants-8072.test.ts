/**
 * #8072 — the Combo Builder model picker did not expose the `<model>-<tier>`
 * reasoning-effort variants that the catalog/Playground already surface for
 * synced models declaring `supportedThinkingEfforts` (#7694). PR #8165 wired
 * `buildModelOptions()` (src/lib/combos/builderOptions.ts) to run the shared
 * `appendSyncedEffortVariants` utility and add the resulting variant ids.
 *
 * Regression guard for a baseId-derivation bug found in that wiring:
 * `appendSyncedEffortVariants` sets a variant's own `root` field to
 * `${baseRoot}-${tier}` (still tier-suffixed — see
 * open-sse/utils/syncedEffortVariants.ts), not the true base model id. Deriving
 * `baseId` from `variant.root` therefore never matches an entry in `modelMap`,
 * so every effort variant silently fell back to bare defaults instead of
 * inheriting contextLength/outputTokenLimit/supportedEndpoints/supportsThinking
 * from its base model. This test seeds a synced model with
 * `supportedThinkingEfforts` via `replaceSyncedAvailableModelsForConnection`,
 * calls `getComboBuilderOptions()`, and asserts both that the variant ids
 * appear and that they inherit the base entry's metadata.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-effort-8072-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelDiscovery = await import("../../src/lib/providerModels/modelDiscovery.ts");
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#8072 buildModelOptions: synced <model>-<tier> effort variants appear in the Combo Builder picker and inherit the base model's metadata", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "huggingface",
    authType: "apikey",
    name: "huggingface-8072-effort",
    apiKey: "huggingface-key-8072",
    isActive: true,
    testStatus: "active",
  });

  const BASE_MODEL_ID = "some-org/reasoning-model-8072";

  await modelsDb.replaceSyncedAvailableModelsForConnection("huggingface", connection.id, [
    {
      id: BASE_MODEL_ID,
      name: "Reasoning Model 8072",
      supportedThinkingEfforts: ["low", "medium", "high"],
      supportedEndpoints: ["chat"],
      inputTokenLimit: 131072,
      outputTokenLimit: 8192,
      supportsThinking: true,
    },
  ]);

  const payload = await getComboBuilderOptions();
  const provider = payload.providers.find((p) => p.providerId === "huggingface");
  assert.ok(provider, "huggingface provider must appear in the combo builder output");

  const base = provider!.models.find((m) => m.id === BASE_MODEL_ID);
  assert.ok(base, "base synced model must appear in the provider's models list");

  for (const tier of ["low", "medium", "high"]) {
    const variantId = `${BASE_MODEL_ID}-${tier}`;
    const variant = provider!.models.find((m) => m.id === variantId);
    assert.ok(variant, `expected a "${variantId}" effort-variant entry in the model picker`);

    // The bug: baseId was derived from `variant.root` (tier-suffixed), which never
    // matched the base entry in modelMap, so these fields silently fell back to
    // null/undefined instead of being inherited from the base model.
    assert.equal(
      variant!.contextLength,
      base!.contextLength,
      `${variantId} must inherit contextLength from the base model`
    );
    assert.equal(
      variant!.outputTokenLimit,
      base!.outputTokenLimit,
      `${variantId} must inherit outputTokenLimit from the base model`
    );
    assert.deepEqual(
      variant!.supportedEndpoints,
      base!.supportedEndpoints,
      `${variantId} must inherit supportedEndpoints from the base model`
    );
    assert.equal(
      variant!.supportsThinking,
      base!.supportsThinking,
      `${variantId} must inherit supportsThinking from the base model`
    );
  }
});

test("#9485 static DeepSeek effort aliases appear when synced rows omit supportedThinkingEfforts", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "deepseek",
    authType: "apikey",
    name: "deepseek-9485-effort",
    apiKey: "deepseek-key-9485",
    isActive: true,
    testStatus: "active",
  });

  const flashId = "deepseek-v4-flash";
  const proId = "deepseek-v4-pro";
  const syncedMetadata = {
    supportedEndpoints: ["chat"],
    inputTokenLimit: 65536,
    outputTokenLimit: 16384,
    supportsThinking: true,
  };

  await modelsDb.replaceSyncedAvailableModelsForConnection("deepseek", connection.id, [
    { id: flashId, name: "Synced DeepSeek V4 Flash", ...syncedMetadata },
    { id: proId, name: "Synced DeepSeek V4 Pro", ...syncedMetadata },
  ]);

  const payload = await getComboBuilderOptions();
  const provider = payload.providers.find((p) => p.providerId === "deepseek");
  assert.ok(provider, "deepseek provider must appear in the combo builder output");

  const baseModels = new Map(
    [flashId, proId].map((id) => {
      const base = provider!.models.find((model) => model.id === id);
      assert.ok(base, `${id} base model must appear in the provider's models list`);
      return [id, base!];
    })
  );

  const expectedAliases = new Set([
    `${flashId}-none`,
    `${flashId}-low`,
    `${flashId}-high`,
    `${flashId}-max`,
    `${proId}-none`,
    `${proId}-low`,
    `${proId}-high`,
    `${proId}-max`,
  ]);
  const deepSeekAliases = new Set(
    provider!.models
      .map((model) => model.id)
      .filter((id) => id.startsWith(`${flashId}-`) || id.startsWith(`${proId}-`))
  );
  assert.deepEqual(deepSeekAliases, expectedAliases);
  assert.equal(
    provider!.models.some((model) => model.id === `${proId}-medium`),
    false
  );

  for (const aliasId of expectedAliases) {
    const baseId = aliasId.startsWith(`${flashId}-`) ? flashId : proId;
    const base = baseModels.get(baseId)!;
    const alias = provider!.models.find((model) => model.id === aliasId);
    assert.ok(alias, `${aliasId} effort alias must appear in the model picker`);
    assert.equal(alias!.source, base.source, `${aliasId} must preserve the base source`);
    assert.equal(alias!.contextLength, base.contextLength);
    assert.equal(alias!.outputTokenLimit, base.outputTokenLimit);
    assert.deepEqual(alias!.supportedEndpoints, base.supportedEndpoints);
    assert.equal(alias!.supportsThinking, base.supportsThinking);
  }
});
test("#9485 Crof synced effort aliases appear exactly in the Combo Builder picker", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "crof",
    authType: "apikey",
    name: "crof-9485-effort",
    apiKey: "crof-key-9485",
    isActive: true,
    testStatus: "active",
  });
  const modelId = "crof-combo-reasoning-model";

  await modelDiscovery.persistDiscoveredModels("crof", connection.id, [
    { id: modelId, name: "Crof Combo Reasoning Model", reasoning_effort: true },
  ]);

  const payload = await getComboBuilderOptions();
  const provider = payload.providers.find((p) => p.providerId === "crof");
  assert.ok(provider, "crof provider must appear in the combo builder output");

  const expectedAliases = new Set([
    `${modelId}-none`,
    `${modelId}-low`,
    `${modelId}-medium`,
    `${modelId}-high`,
    `${modelId}-max`,
  ]);
  const actualAliases = new Set(
    provider!.models.map((model) => model.id).filter((id) => id.startsWith(`${modelId}-`))
  );
  assert.deepEqual(actualAliases, expectedAliases);
});

test("Command Code static reasoning models expose all documented effort suffixes", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "command-code",
    authType: "apikey",
    name: "command-code-efforts",
    apiKey: "command-code-key",
    isActive: true,
    testStatus: "active",
  });
  assert.ok(connection);

  const payload = await getComboBuilderOptions();
  const provider = payload.providers.find((entry) => entry.providerId === "command-code");
  assert.ok(provider, "command-code provider must appear in the combo builder output");

  const reasoningModels = [
    "claude-opus-4-7",
    "claude-opus-4-6",
    "claude-sonnet-4-6",
    "claude-haiku-4-5-20251001",
    "gpt-5.5",
    "gpt-5.4",
    "gpt-5.4-mini",
    "gpt-5.3-codex",
    "deepseek/deepseek-v4-pro",
    "deepseek/deepseek-v4-flash",
    "moonshotai/Kimi-K2.6",
    "moonshotai/Kimi-K2.5",
    "zai-org/GLM-5.1",
    "zai-org/GLM-5",
    "MiniMaxAI/MiniMax-M2.7",
    "MiniMaxAI/MiniMax-M2.5",
    "Qwen/Qwen3.6-Max-Preview",
    "Qwen/Qwen3.6-Plus",
  ];
  const effortTiers = ["low", "medium", "high", "xhigh", "max"];
  for (const baseId of reasoningModels) {
    const base = provider!.models.find((model) => model.id === baseId);
    assert.ok(base, `${baseId} base model must appear in the model picker`);
    for (const effort of effortTiers) {
      const alias = provider!.models.find((model) => model.id === `${baseId}-${effort}`);
      assert.ok(alias, `${baseId}-${effort} must appear in the model picker`);
      assert.equal(alias!.contextLength, base!.contextLength);
      assert.equal(alias!.outputTokenLimit, base!.outputTokenLimit);
      assert.equal(alias!.supportsThinking, true);
    }
  }
});
