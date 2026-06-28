import test from "node:test";
import assert from "node:assert/strict";
import {
  FREE_TIER_BUDGETS,
  FREE_TIER_TOS,
  computeFreeTierTotals,
} from "../../open-sse/config/freeTierCatalog.ts";

test("FREE_TIER_BUDGETS holds positive integer monthly-token budgets", () => {
  assert.ok(Object.keys(FREE_TIER_BUDGETS).length >= 20);
  for (const [id, tokens] of Object.entries(FREE_TIER_BUDGETS)) {
    assert.ok(Number.isInteger(tokens) && tokens > 0, `${id} must be a positive integer`);
  }
  assert.equal(FREE_TIER_BUDGETS.mistral, 1_000_000_000);
  assert.equal(FREE_TIER_BUDGETS.longcat, 150_000_000);
  assert.equal(FREE_TIER_BUDGETS["cloudflare-ai"], 122_000_000);
  assert.equal(FREE_TIER_BUDGETS.cerebras, 30_000_000);
});

test("FREE_TIER_TOS marks proxy-prohibited providers as avoid", () => {
  for (const id of ["kiro", "amazon-q", "blackbox", "fireworks"]) {
    assert.equal(FREE_TIER_TOS[id], "avoid", `${id} must be flagged avoid`);
  }
});

test("computeFreeTierTotals sums the documented budgets", () => {
  const t = computeFreeTierTotals();
  assert.equal(t.providerCount, 22);
  assert.ok(t.documentedMonthlyTokens >= 1_500_000_000);
  assert.ok(t.documentedMonthlyTokens <= 1_600_000_000);
  assert.equal(typeof t.headline, "string");
  assert.match(t.headline, /1\.5/);
});

test("computeFreeTierTotals can exclude ToS-avoid providers", () => {
  const all = computeFreeTierTotals();
  const clean = computeFreeTierTotals({ excludeTosAvoid: true });
  assert.equal(all.documentedMonthlyTokens - clean.documentedMonthlyTokens, 25_000);
  assert.equal(clean.providerCount, 21);
});
