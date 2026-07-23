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
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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
