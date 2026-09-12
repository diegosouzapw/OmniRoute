import assert from "node:assert/strict";
import test from "node:test";
import { mergeProviderModelListing } from "../../src/lib/providers/mergeProviderModelListing.ts";

const input = {
  providerId: "nvidia",
  registryModels: [
    { id: "retired", name: "Retired model" },
    { id: "live", name: "Live model", supportsVision: true },
  ],
  syncedModels: [{ id: "live", contextWindow: 128000 }],
  customModels: [
    { id: "retired-import", source: "imported" },
    { id: "manual", name: "My endpoint", source: "custom" },
    { id: "live", name: "My live model", supportsVision: false },
  ],
};

test("authoritative catalog removes retired built-ins and legacy imports, retaining manual overlays", () => {
  const models = mergeProviderModelListing({ ...input, syncedCatalogAuthoritative: true });
  assert.deepEqual(
    models.map((m) => m.id),
    ["live", "manual"]
  );
  assert.equal(models[0].contextWindow, 128000);
  assert.equal(models[0].supportsVision, false);
  assert.equal(models[0].name, "My live model");
  assert.equal(
    models.some((m) => m.id.startsWith("auto")),
    false
  );
});

test("partial or unconfirmed catalogs retain static coverage", () => {
  for (const flag of [false, undefined]) {
    const ids = mergeProviderModelListing({ ...input, syncedCatalogAuthoritative: flag }).map(
      (m) => m.id
    );
    assert.ok(ids.includes("retired"));
    assert.ok(ids.includes("retired-import"));
    assert.ok(ids.includes("manual"));
  }
});

test("a new successful catalog removes only models absent from the active union", () => {
  const ids = mergeProviderModelListing({
    ...input,
    syncedCatalogAuthoritative: true,
    syncedModels: [{ id: "other-connection" }],
    customModels: [{ id: "manual", source: "custom" }],
  }).map((m) => m.id);
  assert.deepEqual(ids, ["other-connection", "manual"]);
});

test("confirmed empty catalog preserves custom models without inventing Cursor auto rows", () => {
  const ids = mergeProviderModelListing({
    ...input,
    providerId: "cursor",
    syncedCatalogAuthoritative: true,
    syncedModels: [],
    customModels: [{ id: "manual", source: "custom" }],
  }).map((m) => m.id);
  assert.deepEqual(ids, ["manual"]);
});

test("explicit non-authoritative state overrides Cursor's legacy implicit exclusivity", () => {
  const ids = mergeProviderModelListing({
    ...input,
    providerId: "cursor",
    syncedCatalogAuthoritative: false,
  }).map((m) => m.id);
  assert.ok(ids.includes("retired"));
});
