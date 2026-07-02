import test from "node:test";
import assert from "node:assert/strict";

import {
  getModelCatalogSourceLabel,
  matchesModelCatalogQuery,
  normalizeModelCatalogSource,
} from "../../src/shared/utils/modelCatalogSearch.ts";

test("model catalog source normalization groups manual and synced rows separately", () => {
  assert.equal(normalizeModelCatalogSource("manual"), "custom");
  assert.equal(normalizeModelCatalogSource("imported"), "imported");
  assert.equal(normalizeModelCatalogSource("api-sync"), "imported");
  assert.equal(normalizeModelCatalogSource("fallback"), "fallback");
  assert.equal(normalizeModelCatalogSource("alias"), "alias");
  assert.equal(normalizeModelCatalogSource(undefined), "system");
});

test("model catalog source labels stay user-facing", () => {
  assert.equal(getModelCatalogSourceLabel("system"), "Built-in");
  assert.equal(getModelCatalogSourceLabel("custom"), "Custom");
  assert.equal(getModelCatalogSourceLabel("imported"), "Imported");
  assert.equal(getModelCatalogSourceLabel("fallback"), "Fallback");
  assert.equal(getModelCatalogSourceLabel("alias"), "Alias");
});

test("model catalog query matches id, display name, alias and source label", () => {
  const target = {
    modelId: "qwen/qwen3-coder-480b-a35b-instruct",
    modelName: "Qwen3 Coder 480B",
    alias: "best-qwen",
    source: "imported",
  };

  assert.equal(matchesModelCatalogQuery("", target), true);
  assert.equal(matchesModelCatalogQuery("coder-480b", target), true);
  assert.equal(matchesModelCatalogQuery("best-qwen", target), true);
  assert.equal(matchesModelCatalogQuery("synced", target), true);
  assert.equal(matchesModelCatalogQuery("built-in", target), false);
});
