// Regression: stealth/ox-alpha (Stealth Ox Alpha, free 0/0 pricing, 1M context) must
// stay in the openrouter free roster — the /v1/models synced-row filter drops
// pricing metadata, so roster presence is what keeps this model visible under
// hidePaidModels (see #6328).
import { test } from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";

test("openrouter free roster includes stealth/ox-alpha", () => {
  const entry = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === "openrouter" && m.modelId === "stealth/ox-alpha"
  );
  assert.ok(entry, "stealth/ox-alpha must be in the openrouter free roster");
  assert.equal(entry!.poolKey, "openrouter-free");
  assert.equal(entry!.monthlyTokens, 0, "must not inflate the shared free-pool budget");
});
