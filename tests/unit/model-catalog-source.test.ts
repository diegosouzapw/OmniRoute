import test from "node:test";
import assert from "node:assert/strict";

const { getModelCatalogSourceLabel, normalizeModelCatalogSource } =
  await import("../../src/shared/utils/modelCatalogSearch.ts");

test("model catalog source normalizes synced import variants consistently", () => {
  assert.equal(normalizeModelCatalogSource("api-sync"), "api-sync");
  assert.equal(normalizeModelCatalogSource("auto-sync"), "api-sync");
  assert.equal(normalizeModelCatalogSource("imported"), "api-sync");
  assert.equal(getModelCatalogSourceLabel("auto-sync"), "Synced");
  assert.equal(getModelCatalogSourceLabel("imported"), "Synced");
});
