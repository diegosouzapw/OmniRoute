/**
 * #16977 — hiding a base model must also remove its GENERATED effort variants
 * from the combo builder. Before this fix the synced/registry expansion read
 * the original unfiltered arrays: the hidden base was rejected by the exact-id
 * check, but each generated tier (`base-high`, `base-low`, …) was checked under
 * its own suffixed id and survived — so hidden models kept "coming back" as
 * effort variants and openrouter-sized catalogs stayed flooded.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-hiddenbase-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { mergeModelCompatOverride } = await import("../../src/lib/db/models/compat.ts");
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROVIDER = "opencode";

test("hidden base model: neither the base nor its generated effort variants appear", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, "conn-16977", [
    {
      id: "zzz-base-16977",
      name: "Base 16977",
      supportedEndpoints: ["chat"],
      supportedThinkingEfforts: ["low", "high"],
    },
  ] as never);

  const before = (await getComboBuilderOptions()).providers
    .flatMap((p) => p.models)
    .filter((m) => m.id.includes("16977"))
    .map((m) => m.id);
  assert.ok(before.includes("zzz-base-16977"), "base must be listed before hiding");
  assert.ok(
    before.includes("zzz-base-16977-high"),
    "generated high variant must be listed before hiding"
  );
  assert.ok(
    before.includes("zzz-base-16977-low"),
    "generated low variant must be listed before hiding"
  );

  // Same store the provider-models PATCH route writes when a custom row
  // doesn't exist (synced-only model).
  mergeModelCompatOverride(PROVIDER, "zzz-base-16977", { isHidden: true, modality: "chat" });

  const after = (await getComboBuilderOptions()).providers
    .flatMap((p) => p.models)
    .filter((m) => m.id.includes("16977"))
    .map((m) => m.id);
  assert.equal(
    after.length,
    0,
    `hidden base and its variants must all disappear, got: ${JSON.stringify(after)}`
  );
});

test("visibility of one model does not leak into an unrelated model's variants", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, "conn-16977-b", [
    {
      id: "zzz-keep-16977",
      name: "Keep 16977",
      supportedEndpoints: ["chat"],
      supportedThinkingEfforts: ["high"],
    },
  ] as never);
  mergeModelCompatOverride(PROVIDER, "zzz-other-16977", { isHidden: true, modality: "chat" });

  const ids = (await getComboBuilderOptions()).providers
    .flatMap((p) => p.models)
    .filter((m) => m.id.includes("16977"))
    .map((m) => m.id);
  assert.ok(ids.includes("zzz-keep-16977"));
  assert.ok(ids.includes("zzz-keep-16977-high"), "unrelated visible base keeps its variants");
});
