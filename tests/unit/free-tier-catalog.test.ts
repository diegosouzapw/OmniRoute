import test from "node:test";
import assert from "node:assert/strict";
import {
  FREE_TIER_BUDGETS,
  FREE_TIER_TOS,
  computeFreeTierTotals,
} from "../../open-sse/config/freeTierCatalog.ts";

test("FREE_TIER_BUDGETS holds positive integer monthly-token budgets", () => {
  // 2026-09-02 re-audit: gemini + ollama-cloud left (no published cap), nara joined;
  // #12591 then dropped cerebras (one-time credit) → 17 legacy keys.
  assert.ok(Object.keys(FREE_TIER_BUDGETS).length >= 17);
  for (const [id, tokens] of Object.entries(FREE_TIER_BUDGETS)) {
    assert.ok(Number.isInteger(tokens) && tokens > 0, `${id} must be a positive integer`);
  }
  assert.equal(FREE_TIER_BUDGETS.mistral, 1_000_000_000);
  assert.equal(FREE_TIER_BUDGETS["cloudflare-ai"], 122_000_000);
  // #11773: Cerebras is a one-time $5 signup credit, not a recurring monthly grant.
  assert.equal(FREE_TIER_BUDGETS.cerebras, undefined);
  // LongCat is excluded from this recurring-monthly catalog: its free tier is a
  // one-time 10M-token signup grant (not recurring), so it must not appear here.
  assert.equal(FREE_TIER_BUDGETS.longcat, undefined);
});

test("FREE_TIER_TOS marks proxy-prohibited providers as avoid", () => {
  for (const id of ["kiro", "amazon-q", "blackbox", "fireworks"]) {
    assert.equal(FREE_TIER_TOS[id], "avoid", `${id} must be flagged avoid`);
  }
});

test("computeFreeTierTotals sums the documented budgets", () => {
  const t = computeFreeTierTotals();
  // 2026-09-02 re-audit: gemini + ollama-cloud left the legacy map (no published cap),
  // nara joined, groq → 30M; #12591 dropped cerebras → 17 providers, legacy sum 1,475,025,000.
  assert.equal(t.providerCount, 17);
  assert.ok(t.documentedMonthlyTokens >= 1_425_000_000);
  assert.ok(t.documentedMonthlyTokens <= 1_525_000_000);
  assert.equal(typeof t.headline, "string");
  // 2026-09-02 re-audit + #12591 (cerebras dropped): headline reads "over 1.48B …".
  assert.match(t.headline, /1\.4/);
});

test("computeFreeTierTotals can exclude ToS-avoid providers", () => {
  const all = computeFreeTierTotals();
  const clean = computeFreeTierTotals({ excludeTosAvoid: true });
  assert.equal(all.documentedMonthlyTokens - clean.documentedMonthlyTokens, 25_000);
  // 2026-09-02 re-audit + #12591: 17 legacy providers, minus kiro (ToS avoid) → 16.
  assert.equal(clean.providerCount, 16);
});
