/**
 * #16977: hiding a base model must hide every variant generated from it.
 * The builder's exact-ID gate already hides base IDs; generated tier IDs must
 * not bypass that decision. Slash-containing vendor IDs remain untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hidden-efforts-16977-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#16977 synced hidden base never generates visible effort variants", async () => {
  const connection = await providers.createProviderConnection({
    provider: "huggingface", authType: "apikey",
    name: "hidden-efforts-16977", apiKey: "test-huggingface-16977",
    isActive: true, testStatus: "active",
  });
  const hiddenBase = "vendor/hidden-reasoner-16977";
  const visibleBase = "vendor/visible-reasoner-16977";
  await models.replaceSyncedAvailableModelsForConnection("huggingface", connection.id, [
    { id: hiddenBase, name: "Hidden reasoner", supportedThinkingEfforts: ["low", "medium", "high"],
      supportedEndpoints: ["chat"], inputTokenLimit: 32768 },
    { id: visibleBase, name: "Visible reasoner", supportedThinkingEfforts: ["low", "medium"],
      supportedEndpoints: ["chat"], inputTokenLimit: 65536 },
  ]);

  const getIds = async () => {
    const payload = await getComboBuilderOptions();
    const provider = payload.providers.find((item) => item.providerId === "huggingface");
    assert.ok(provider);
    return provider.models.map((model) => model.id);
  };

  const before = await getIds();
  assert.ok(before.includes(hiddenBase));
  assert.ok(before.includes(`${hiddenBase}-high`));

  models.mergeModelCompatOverride("huggingface", hiddenBase, { isHidden: true });
  const after = await getIds();
  for (const id of [hiddenBase, `${hiddenBase}-low`, `${hiddenBase}-medium`, `${hiddenBase}-high`]) {
    assert.ok(!after.includes(id), `hidden base or derived tier leaked into combo builder: ${id}`);
  }
  for (const id of [visibleBase, `${visibleBase}-low`, `${visibleBase}-medium`]) {
    assert.ok(after.includes(id), `unrelated visible model disappeared: ${id}`);
  }

  // Replacing the synced catalog with the same model identity must not
  // resurrect the hidden base or its tiers.
  await models.replaceSyncedAvailableModelsForConnection("huggingface", connection.id, [
    { id: hiddenBase, name: "Updated hidden reasoner",
      supportedThinkingEfforts: ["low", "medium", "high"], supportedEndpoints: ["chat"] },
    { id: visibleBase, name: "Updated visible reasoner",
      supportedThinkingEfforts: ["low", "medium"], supportedEndpoints: ["chat"] },
  ]);
  const resynced = await getIds();
  assert.ok(!resynced.includes(hiddenBase));
  assert.ok(!resynced.includes(`${hiddenBase}-high`));
  assert.ok(resynced.includes(`${visibleBase}-medium`));

  // An explicitly hidden variant of a visible base also stays hidden.
  models.mergeModelCompatOverride("huggingface", `${visibleBase}-medium`, { isHidden: true });
  const withHiddenVariant = await getIds();
  assert.ok(withHiddenVariant.includes(visibleBase));
  assert.ok(withHiddenVariant.includes(`${visibleBase}-low`));
  assert.ok(!withHiddenVariant.includes(`${visibleBase}-medium`));
});

test("#16977 static registry effort tiers inherit base visibility too", async () => {
  await providers.createProviderConnection({
    provider: "deepseek", authType: "apikey",
    name: "hidden-registry-16977", apiKey: "test-deepseek-16977",
    isActive: true, testStatus: "active",
  });

  const getIds = async () => {
    const payload = await getComboBuilderOptions();
    const provider = payload.providers.find((item) => item.providerId === "deepseek");
    assert.ok(provider);
    return provider.models.map((model) => model.id);
  };
  const before = await getIds();
  assert.ok(before.includes("deepseek-v4-flash-high"));
  assert.ok(before.includes("deepseek-v4-pro-high"));

  models.mergeModelCompatOverride("deepseek", "deepseek-v4-flash", { isHidden: true });
  const after = await getIds();
  for (const id of ["deepseek-v4-flash", "deepseek-v4-flash-none",
    "deepseek-v4-flash-low", "deepseek-v4-flash-high", "deepseek-v4-flash-max"]) {
    assert.ok(!after.includes(id), `hidden registry model leaked: ${id}`);
  }
  assert.ok(after.includes("deepseek-v4-pro"));
  assert.ok(after.includes("deepseek-v4-pro-high"));
});

test("#16977 only the explicitly allowed model survives catalog resync in precision builder", async () => {
  const providerId = "huggingface";
  const connection = await providers.createProviderConnection({
    provider: providerId, authType: "apikey", name: "allowlist-precision-16977",
    apiKey: "test-allowlist-16977", isActive: true, testStatus: "active",
  });
  const allowed = "vendor/only-this-16977";
  const rejected = "vendor/brand-new-synced-16977";
  try {
    await models.replaceSyncedAvailableModelsForConnection(providerId, connection.id, [
      { id: allowed, name: "Selected model", supportedThinkingEfforts: ["low", "high"] },
    ]);
    models.setModelVisibilityAllowlist(providerId, [allowed]);
    let view = await getComboBuilderOptions();
    let selected = view.providers.find((item) => item.providerId === providerId)?.models ?? [];
    assert.ok(selected.some((model) => model.id === allowed));
    assert.ok(selected.some((model) => model.id === `${allowed}-high`));

    // Catalog changes must not turn an unrecognized raw ID into an admitted one.
    await models.replaceSyncedAvailableModelsForConnection(providerId, connection.id, [
      { id: allowed, name: "Selected model", supportedThinkingEfforts: ["low", "high"] },
      { id: rejected, name: "Newly synchronized renamed model",
        supportedThinkingEfforts: ["low", "high"] },
    ]);
    view = await getComboBuilderOptions();
    selected = view.providers.find((item) => item.providerId === providerId)?.models ?? [];
    assert.ok(selected.some((model) => model.id === allowed));
    assert.ok(selected.some((model) => model.id === `${allowed}-low`));
    assert.ok(!selected.some((model) => model.id === rejected));
    assert.ok(!selected.some((model) => model.id === `${rejected}-high`));

    models.setModelVisibilityAllowlist(providerId, []);
    view = await getComboBuilderOptions();
    selected = view.providers.find((item) => item.providerId === providerId)?.models ?? [];
    assert.equal(selected.length, 0, "an explicit empty policy hides every model");
  } finally {
    models.setModelVisibilityAllowlist(providerId, null);
  }
});
