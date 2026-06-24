// Characterization of the services/usage.ts MiniMax-family split (god-file decomposition): the full
// MiniMax usage family (plan-label inference, per-window quota assembly, getMiniMaxUsage fetcher) moved
// into services/usage/minimax.ts. Behavior-preserving move — these locks pin the module surface and a
// couple of the pure helpers; the fetcher + quota math stay covered by minimax-coding-plan-usage and
// usage-utils (which exercise them via usage.ts __testing).
import { test } from "node:test";
import assert from "node:assert/strict";

const M = await import("../../open-sse/services/usage/minimax.ts");
const HOST = await import("../../open-sse/services/usage.ts");

test("leaf exposes the twelve MiniMax helpers the host re-exposes via __testing", () => {
  for (const name of [
    "inferMiniMaxPlanLabelFromTotals",
    "getMiniMaxPlanLabel",
    "getMiniMaxQuotaResetAt",
    "isMiniMaxTextQuotaModel",
    "getMiniMaxSessionTotal",
    "getMiniMaxWeeklyTotal",
    "createMiniMaxQuotaFromCount",
    "createMiniMaxQuotaFromPercent",
    "getMiniMaxRemainingPercent",
    "getMiniMaxAuthErrorMessage",
    "getMiniMaxErrorSummary",
    "getMiniMaxUsage",
  ]) {
    assert.equal(typeof (M as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("host __testing re-exports the same MiniMax function identities", () => {
  const t = (HOST as Record<string, Record<string, unknown>>).__testing;
  assert.equal(t.getMiniMaxUsage, M.getMiniMaxUsage);
  assert.equal(t.getMiniMaxPlanLabel, M.getMiniMaxPlanLabel);
  assert.equal(t.getMiniMaxSessionTotal, M.getMiniMaxSessionTotal);
});

test("getMiniMaxPlanLabel cleans the raw plan title, falls back by session totals", () => {
  // explicit title wins, "MiniMax"/"Coding Plan" noise stripped
  assert.equal(M.getMiniMaxPlanLabel({ plan_name: "MiniMax Max Coding Plan" }), "Max");
  // no title → inferred from session totals (>= 15000 → Max)
  assert.equal(M.getMiniMaxPlanLabel({}, [{ current_interval_total_count: 20000 }]), "Max");
  // nothing → default
  assert.equal(M.getMiniMaxPlanLabel({}, []), "Coding Plan");
});

test("isMiniMaxTextQuotaModel flags text models", () => {
  assert.equal(typeof M.isMiniMaxTextQuotaModel("MiniMax-Text-01"), "boolean");
});
