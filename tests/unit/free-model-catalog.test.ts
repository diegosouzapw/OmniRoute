import test from "node:test";
import assert from "node:assert/strict";
import {
  FREE_MODEL_BUDGETS,
  FREE_TIER_BOOSTS,
  computeFreeModelTotals,
} from "../../open-sse/config/freeModelCatalog.ts";

const FREE_TYPES = [
  "recurring-daily",
  "recurring-monthly",
  "recurring-credit",
  "recurring-uncapped",
  "one-time-initial",
  "keyless",
  "discontinued",
];

test("FREE_MODEL_BUDGETS is a non-empty array of well-formed per-model records", () => {
  assert.ok(Array.isArray(FREE_MODEL_BUDGETS) && FREE_MODEL_BUDGETS.length >= 400);
  for (const m of FREE_MODEL_BUDGETS) {
    assert.equal(typeof m.provider, "string");
    assert.equal(typeof m.modelId, "string");
    assert.ok(Number.isInteger(m.monthlyTokens) && m.monthlyTokens >= 0);
    assert.ok(Number.isInteger(m.creditTokens) && m.creditTokens >= 0);
    assert.ok(FREE_TYPES.includes(m.freeType), `bad freeType ${m.freeType}`);
  }
});

test("computeFreeModelTotals dedupes shared pools AND per-account credits, tiers honestly", () => {
  const t = computeFreeModelTotals();
  // pool-deduped steady recurring should be in a defensible band (NOT the inflated per-model sum)
  assert.ok(
    t.steadyRecurringTokens >= 1_000_000_000 && t.steadyRecurringTokens <= 3_000_000_000,
    `steady=${t.steadyRecurringTokens}`
  );
  assert.ok(t.steadyWithRecurringCreditsTokens >= t.steadyRecurringTokens);
  assert.ok(t.firstMonthRealisticTokens >= t.steadyWithRecurringCreditsTokens);
  // one-time credits must be pool-deduped: a multi-model provider's signup credit counts once.
  const naiveOneTime = FREE_MODEL_BUDGETS.filter((m) => m.freeType === "one-time-initial").reduce(
    (s, m) => s + m.creditTokens,
    0
  );
  assert.ok(
    t.firstMonthRealisticTokens - t.steadyWithRecurringCreditsTokens < naiveOneTime,
    "one-time credits not deduped"
  );
  assert.equal(t.modelCount, FREE_MODEL_BUDGETS.length);
  assert.equal(typeof t.headline, "string");
});

test("excludeTosAvoid drops avoid-flagged models from the totals", () => {
  const all = computeFreeModelTotals();
  const clean = computeFreeModelTotals({ excludeTosAvoid: true });
  assert.ok(clean.modelCount < all.modelCount);
  assert.ok(clean.steadyRecurringTokens <= all.steadyRecurringTokens);
});

test("recurring-uncapped models are surfaced but NEVER summed into the steady headline", () => {
  const t = computeFreeModelTotals();
  // every uncapped record must carry monthlyTokens 0 (un-quantifiable, not counted)
  for (const m of FREE_MODEL_BUDGETS) {
    if (m.freeType === "recurring-uncapped")
      assert.equal(m.monthlyTokens, 0, `${m.provider}/${m.modelId} uncapped but counted`);
  }
  // uncappedProviders is the de-duped provider list and is non-empty (siliconflow, glm-cn, kilo…)
  assert.ok(Array.isArray(t.uncappedProviders) && t.uncappedProviders.length >= 3);
  for (const p of ["siliconflow", "glm-cn", "kilo-gateway"]) {
    assert.ok(t.uncappedProviders.includes(p), `expected ${p} among uncapped providers`);
  }
});

test("deposit-unlock boost is reported separately, not folded into steady", () => {
  const t = computeFreeModelTotals();
  // OpenRouter $10 -> 1000 RPD boost is live (openrouter-free pool present)
  assert.ok(t.boostMonthlyTokens >= 24_000_000, `boost=${t.boostMonthlyTokens}`);
  assert.equal(FREE_TIER_BOOSTS["openrouter-free"].provider, "openrouter");
  // the boost must NOT already be inside the steady number
  assert.ok(t.boostMonthlyTokens < t.steadyRecurringTokens);
});

test("2026-06-17 refresh: discontinued providers dropped, new free providers added", () => {
  const providers = new Set(FREE_MODEL_BUDGETS.map((m) => m.provider));
  // dead in 2026 — must be gone from the budget catalog
  for (const dead of ["chutes", "phind", "kluster", "gitlawb", "aimlapi", "theoldllm"]) {
    assert.ok(!providers.has(dead), `${dead} should be removed (discontinued)`);
  }
  // qwen-web is KEPT on purpose: only its OAuth API tier died — OmniRoute uses the cookie/web path.
  assert.ok(providers.has("qwen-web"), "qwen-web must stay (cookie path still free)");
  // discovered in the refresh — must be present
  for (const fresh of ["kilo-gateway", "opencode-zen", "glm-cn"]) {
    assert.ok(providers.has(fresh), `${fresh} should be added`);
  }
});
