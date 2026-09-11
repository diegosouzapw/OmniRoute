import assert from "node:assert/strict";
import { test } from "node:test";

import { normalizeSyncedAvailableModels } from "@/lib/db/models/synced";
import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";

test("normalizeDiscoveredModels records only free evidence present in discovery payloads", () => {
  const models = normalizeDiscoveredModels(
    [
      { id: "declared-free", isFree: true },
      { id: "zero-priced", pricing: { prompt: "0", completion: 0 } },
      { id: "rotating-model:free" },
      { id: "blank-price", pricing: { prompt: "", completion: "" } },
      { id: "paid", pricing: { prompt: "1", completion: "2" } },
    ],
    "example-provider"
  );
  const byId = new Map(models.map((model) => [model.id, model]));

  assert.equal(byId.get("declared-free")?.isFree, true);
  assert.equal(byId.get("zero-priced")?.isFree, true);
  assert.equal(byId.get("rotating-model:free")?.isFree, true);
  assert.equal(byId.get("blank-price")?.isFree, undefined);
  assert.equal(byId.get("paid")?.isFree, undefined);
});

test("normalizeSyncedAvailableModels preserves discovery free metadata", () => {
  const [model] = normalizeSyncedAvailableModels([
    { id: "live-free", name: "Live Free", source: "imported", isFree: true },
  ]);

  assert.equal(model?.isFree, true);
});
