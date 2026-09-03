/**
 * tests/unit/routing-scoring-quality.test.ts
 *
 * Scoring integration of the feedback quality signal:
 *  - DEFAULT_WEIGHTS still sums to ~1.0 (validateWeights) with the new quality weight
 *  - calculateFactors defaults missing quality to neutral 1.0
 *  - calculateScore applies the quality factor
 *  - a low-quality candidate ranks below an identical high-quality one
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateFactors,
  calculateScore,
  DEFAULT_WEIGHTS,
  normalizeScoringWeights,
  validateWeights,
  type ProviderCandidate,
  type ScoringFactors,
} from "../../../open-sse/services/autoCombo/scoring.ts";

function candidate(partial: Partial<ProviderCandidate> = {}): ProviderCandidate {
  return {
    provider: "p",
    model: "m",
    quotaRemaining: 100,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 1,
    p95LatencyMs: 100,
    latencyStdDev: 10,
    errorRate: 0,
    accountTier: "standard",
    quotaResetIntervalSecs: 86400,
    ...partial,
  };
}

test("DEFAULT_WEIGHTS sums to ~1 with the new quality weight", () => {
  const sum = Object.values(DEFAULT_WEIGHTS).reduce((a, b) => a + Number(b), 0);
  assert.ok(Math.abs(sum - 1) < 1e-9, `expected sum ≈ 1, got ${sum}`);
  assert.ok(validateWeights(DEFAULT_WEIGHTS), "validateWeights must accept DEFAULT_WEIGHTS");
  assert.ok((DEFAULT_WEIGHTS.quality ?? 0) > 0, "quality weight must be > 0");
});

test("calculateFactors defaults missing quality to neutral 0.5", () => {
  const factors = calculateFactors(candidate(), [candidate()], "general", () => 0.5);
  assert.equal(factors.quality, 0.5);
});

test("calculateFactors clamps quality to [0,1]", () => {
  const low = calculateFactors(candidate({ quality: -2 }), [candidate()], "general", () => 0.5);
  assert.equal(low.quality, 0);
  const high = calculateFactors(candidate({ quality: 5 }), [candidate()], "general", () => 0.5);
  assert.equal(high.quality, 1);
});

test("calculateScore applies the quality factor", () => {
  const base: ScoringFactors = {
    quota: 0.5,
    health: 0.5,
    costInv: 0.5,
    latencyInv: 0.5,
    taskFit: 0.5,
    stability: 0.5,
    tierPriority: 0.5,
    tierAffinity: 0.5,
    specificityMatch: 0.5,
    contextAffinity: 0.5,
    resetWindowAffinity: 0.5,
    connectionDensity: 0.5,
  };
  const good = calculateScore({ ...base, quality: 1 }, DEFAULT_WEIGHTS);
  const bad = calculateScore({ ...base, quality: 0 }, DEFAULT_WEIGHTS);
  assert.ok(good > bad, "higher quality must score strictly higher");
  assert.ok(good >= 0 && good <= 1);
  assert.ok(bad >= 0 && bad <= 1);
});

test("low-quality candidate ranks below identical high-quality candidate", () => {
  const good = candidate({ provider: "p", model: "good", quality: 1 });
  const poor = candidate({ provider: "p", model: "poor", quality: 0.3 });
  const pool = [good, poor];
  const fg = calculateFactors(good, pool, "general", () => 0.5);
  const fp = calculateFactors(poor, pool, "general", () => 0.5);
  const sg = calculateScore(fg, DEFAULT_WEIGHTS);
  const sp = calculateScore(fp, DEFAULT_WEIGHTS);
  assert.ok(sg > sp, `good candidate (${sg}) must outrank poor (${sp})`);
});

test("normalizeScoringWeights keeps quality and renormalizes to 1", () => {
  const normalized = normalizeScoringWeights({ quality: 0.1 });
  const total = Object.values(normalized).reduce((s, v) => s + Number(v), 0);
  assert.ok(Math.abs(total - 1) < 1e-9);
  assert.ok((normalized.quality ?? 0) > 0);
});
