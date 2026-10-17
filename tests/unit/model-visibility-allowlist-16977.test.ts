import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-allowlist-16977-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const { createHiddenModelLookup } = await import("../../src/lib/hiddenModelLookup.ts");
const {
  isAdmittedByModelVisibilityAllowlist,
  isHiddenByModelVisibilityList,
} = await import("../../src/shared/utils/modelVisibility.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#16977 allowlist is opt-in, persistent, exact and fail-closed for new synced IDs", () => {
  const p = "openrouter";
  const allowed = "deepseek/deepseek-v4.1-flash";
  const renamed = "deepseek/deepseek-v4.1-flash-1017";
  assert.equal(models.getModelVisibilityAllowlist(p), null);
  assert.equal(models.getModelIsHidden(p, renamed), false);

  models.setModelVisibilityAllowlist(p, [allowed, "vendor/visible", allowed]);
  assert.deepEqual([...models.getModelVisibilityAllowlist(p)!].sort(),
    [allowed, "vendor/visible"].sort());
  assert.equal(models.getModelIsHidden(p, allowed), false);
  assert.equal(models.getModelIsHidden(p, renamed), true);
  assert.equal(models.getModelIsHidden(p, "vendor/visible-high"), false);
  assert.equal(models.getModelIsHidden(p, "vendor/unknown"), true);

  // A new/renamed model not in the allowlist cannot bypass matching by inventing a vendor path.
  const permitted = models.getModelVisibilityAllowlists();
  const lookup = createHiddenModelLookup(new Map(), [], "chat", permitted);
  assert.equal(lookup(p, allowed), false);
  assert.equal(lookup(p, renamed), true);
  assert.equal(lookup(p, "vendor/visible-low"), false);
  assert.equal(lookup(p, "vendor/unknown"), true);

  models.setModelVisibilityAllowlist(p, []);
  assert.equal(models.getModelVisibilityAllowlist(p)?.size, 0);
  assert.equal(models.getModelIsHidden(p, allowed), true);
  models.setModelVisibilityAllowlist(p, null);
  assert.equal(models.getModelVisibilityAllowlist(p), null);
  assert.equal(models.getModelIsHidden(p, renamed), false);
});

test("#16977 corrupt persisted allowlist fails closed instead of exposing new models", () => {
  const provider = "corrupt-policy-provider";
  core.getDbInstance().prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  ).run("chatModelVisibilityAllowlist", provider, "{invalid");
  assert.equal(models.getModelVisibilityAllowlist(provider)?.size, 0);
  assert.equal(models.getModelIsHidden(provider, "vendor/new"), true);
  assert.equal(models.getModelVisibilityAllowlists().get(provider)?.size, 0);
});

test("#16977 explicit hides win across custom and compat inventories, including tiers", async () => {
  const p = "huggingface";
  const base = "vendor/hidden-reasoner-16977";
  await models.addCustomModel(p, base, "Visible custom", "manual");
  await models.updateCustomModel(p, base, { isHidden: false });
  models.mergeModelCompatOverride(p, base, { isHidden: true, modality: "chat" });
  assert.equal(models.getModelIsHidden(p, base), true);
  assert.equal(models.getModelIsHidden(p, base + "-high"), true);
  const hidden = models.getHiddenModelsByProvider();
  assert.equal(hidden.get(p)?.has(base), true);

  // The chat-only policy and hidden state never affect an identically named media model.
  models.setModelVisibilityAllowlist(p, ["vendor/allowed"]);
  assert.equal(models.getModelIsHidden(p, "vendor/new", "chat"), true);
  assert.equal(models.getModelIsHidden(p, "vendor/new", "images"), false);

  const lookup = createHiddenModelLookup(hidden, [], "chat", models.getModelVisibilityAllowlists());
  assert.equal(lookup(p, base + "-high"), true);
  assert.equal(lookup(p, "vendor/allowed-high"), false);
});

test("#16977 pure policy helpers preserve raw IDs and only admit supported tier suffixes", () => {
  const allowed = new Set(["vendor/model", "other/only-exact-high"]);
  assert.equal(isAdmittedByModelVisibilityAllowlist("vendor/model-max", allowed), true);
  assert.equal(isAdmittedByModelVisibilityAllowlist("vendor/model-high", allowed), true);
  assert.equal(isAdmittedByModelVisibilityAllowlist("vendor/model-next", allowed), false);
  assert.equal(isAdmittedByModelVisibilityAllowlist("different/model", allowed), false);
  assert.equal(isAdmittedByModelVisibilityAllowlist("any", null), true);
  assert.equal(isAdmittedByModelVisibilityAllowlist("any", new Set()), false);
  assert.equal(isHiddenByModelVisibilityList("vendor/model-high", new Set(["vendor/model"])), true);
  assert.equal(isHiddenByModelVisibilityList("vendor/model", new Set(["vendor/model-high"])), false);
});
