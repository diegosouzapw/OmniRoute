import test from "node:test";
import assert from "node:assert/strict";
import { FREE_MODEL_BUDGETS, computeFreeModelTotals } from "../../open-sse/config/freeModelCatalog.ts";

test("FREE_MODEL_BUDGETS is a non-empty array of well-formed per-model records", () => {
  assert.ok(Array.isArray(FREE_MODEL_BUDGETS) && FREE_MODEL_BUDGETS.length >= 400);
  for (const m of FREE_MODEL_BUDGETS) {
    assert.equal(typeof m.provider, "string");
    assert.equal(typeof m.modelId, "string");
    assert.ok(Number.isInteger(m.monthlyTokens) && m.monthlyTokens >= 0);
    assert.ok(Number.isInteger(m.creditTokens) && m.creditTokens >= 0);
    assert.ok(["recurring-daily","recurring-monthly","recurring-credit","one-time-initial","keyless","discontinued"].includes(m.freeType));
  }
});

test("computeFreeModelTotals dedupes shared pools AND per-account credits, tiers honestly", () => {
  const t = computeFreeModelTotals();
  // pool-deduped steady recurring should be in a defensible band (NOT the inflated per-model sum)
  assert.ok(t.steadyRecurringTokens >= 1_000_000_000 && t.steadyRecurringTokens <= 4_000_000_000, `steady=${t.steadyRecurringTokens}`);
  assert.ok(t.steadyWithRecurringCreditsTokens >= t.steadyRecurringTokens);
  assert.ok(t.firstMonthRealisticTokens >= t.steadyWithRecurringCreditsTokens);
  // one-time credits must be pool-deduped: a multi-model provider's signup credit counts once.
  // (Sanity: first-month delta over steady must be far below the naive per-model credit sum.)
  const naiveOneTime = FREE_MODEL_BUDGETS.filter(m=>m.freeType==="one-time-initial").reduce((s,m)=>s+m.creditTokens,0);
  assert.ok(t.firstMonthRealisticTokens - t.steadyWithRecurringCreditsTokens < naiveOneTime, "one-time credits not deduped");
  assert.equal(t.modelCount, FREE_MODEL_BUDGETS.length);
  assert.equal(typeof t.headline, "string");
});

test("excludeTosAvoid drops avoid-flagged models from the totals", () => {
  const all = computeFreeModelTotals();
  const clean = computeFreeModelTotals({ excludeTosAvoid: true });
  assert.ok(clean.modelCount < all.modelCount);
  assert.ok(clean.steadyRecurringTokens <= all.steadyRecurringTokens);
});
