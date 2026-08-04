/**
 * tests/unit/complexity-aware-scoring-wiring.test.ts
 *
 * Proves the 2026 complexity-aware wiring: feeding a tier/complexity hint into
 * scoreAutoTargets makes the tierAffinity / specificityMatch factors live
 * (they were a constant 0.5 because the hint was never passed — audit Bug #4),
 * while a null hint keeps the default behavior byte-for-byte.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { scoreAutoTargets } from "../../open-sse/services/combo.ts";
import { DEFAULT_WEIGHTS } from "../../open-sse/services/autoCombo/scoring.ts";
import type { RoutingHint } from "../../open-sse/services/manifestAdapter.ts";

function target() {
  return {
    kind: "model",
    provider: "openai",
    model: "gpt-4o-mini",
    modelStr: "openai/gpt-4o-mini",
    executionKey: "k1",
    stepId: "s1",
  } as unknown as Parameters<typeof scoreAutoTargets>[0][number];
}

function candidate() {
  return {
    executionKey: "k1",
    provider: "openai",
    model: "gpt-4o-mini",
    modelStr: "openai/gpt-4o-mini",
    quotaRemaining: 100,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 1,
    p95LatencyMs: 100,
    latencyStdDev: 10,
    errorRate: 0,
    accountTier: "standard",
    quotaResetIntervalSecs: 86400,
  } as unknown as Parameters<typeof scoreAutoTargets>[1][number];
}

test("scoreAutoTargets — a tier/complexity hint moves the score off tier-neutral", () => {
  const withoutHint = scoreAutoTargets([target()], [candidate()], "default", DEFAULT_WEIGHTS);
  const hint = {
    recommendedMinTier: "premium",
    specificity: { score: 80 },
  } as unknown as RoutingHint;
  const withHint = scoreAutoTargets([target()], [candidate()], "default", DEFAULT_WEIGHTS, hint);

  assert.equal(withoutHint.length, 1);
  assert.equal(withHint.length, 1);
  assert.notEqual(
    withHint[0].score,
    withoutHint[0].score,
    "feeding a tier hint must change tierAffinity/specificityMatch (was constant 0.5)"
  );
});

test("scoreAutoTargets — a null hint is identical to no hint (backward compatible)", () => {
  const a = scoreAutoTargets([target()], [candidate()], "default", DEFAULT_WEIGHTS);
  const b = scoreAutoTargets([target()], [candidate()], "default", DEFAULT_WEIGHTS, null);
  assert.equal(a[0].score, b[0].score, "null hint must equal no hint (default behavior unchanged)");
});
