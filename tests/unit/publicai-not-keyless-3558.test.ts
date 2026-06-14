import test from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";

// Regression for #3558: PublicAI was catalogued with freeType:"keyless" (in the RECURRING set,
// so it surfaced as keyless-free and could be picked into the no-auth pool with no Authorization
// header). But the provider registry requires a key (authType:"apikey"), and freeTierCatalog.ts
// already excludes publicai from recurring free budgets — an internal inconsistency. PublicAI
// grants a one-time signup credit then bills, so it must NOT be "keyless".

test("#3558 PublicAI has no freeType:keyless catalog entries", () => {
  const keyless = FREE_MODEL_BUDGETS.filter(
    (b) => b.provider === "publicai" && b.freeType === "keyless"
  );
  assert.equal(keyless.length, 0, `publicai must not be keyless; found ${keyless.length}`);
});

test("#3558 PublicAI catalog entries are classified one-time-initial", () => {
  const entries = FREE_MODEL_BUDGETS.filter((b) => b.provider === "publicai");
  assert.ok(entries.length > 0, "publicai still has catalog entries");
  for (const e of entries) {
    assert.equal(e.freeType, "one-time-initial", `${e.modelId} should be one-time-initial`);
  }
});
