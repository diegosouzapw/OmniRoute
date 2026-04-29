import test from "node:test";
import assert from "node:assert/strict";

const { getModelCatalogSourceLabel, normalizeModelCatalogSource } =
  await import("../../src/shared/utils/modelCatalogSearch.ts");

test("model catalog source normalizes synced import variants consistently", () => {
  assert.equal(normalizeModelCatalogSource("api-sync"), "imported");
  assert.equal(normalizeModelCatalogSource("imported"), "imported");
  assert.equal(normalizeModelCatalogSource("auto-sync"), "imported");
  assert.equal(getModelCatalogSourceLabel("auto-sync"), "Imported");
  assert.equal(getModelCatalogSourceLabel("imported"), "Imported");
});
