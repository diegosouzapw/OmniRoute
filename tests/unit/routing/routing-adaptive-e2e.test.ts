/**
 * tests/unit/routing-adaptive-e2e.test.ts
 *
 * Deterministic end-to-end adaptive routing test (Phases 5 + 13).
 *
 * Exercises the REAL production routing path: the routing-event quality tracker
 * → auto-combo scoring (`scoreAutoTargets` from open-sse/services/combo/autoStrategy.ts),
 * which is what an "auto" combo uses to pick its preferred provider/model.
 *
 * Scenarios verified:
 *  1. Healthy provider A outranks/ties backup B.
 *  2. Degradation injected into A (sustained 5xx) → A's score falls below B → B preferred.
 *  3. Recovery injected into A (sustained successes) → A's score recovers → A preferred again.
 *  4. A cold provider C is neutral — it neither dominates nor is unfairly penalized.
 *  5. One isolated failure does not overturn a healthy provider.
 *
 * The whole loop is deterministic: no network, no DB, only the real tracker +
 * the real scorer.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  resetQualityTracker,
  recordQualityEvent,
} from "../../../open-sse/services/routing/quality.ts";
import { qualityScoreFor } from "../../../open-sse/services/routing/index.ts";
import { scoreAutoTargets } from "../../../open-sse/services/combo/autoStrategy.ts";
import { DEFAULT_WEIGHTS } from "../../../open-sse/services/autoCombo/scoring.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";
import type { AutoProviderCandidate } from "../../../open-sse/services/combo/types.ts";

function target(provider: string, model: string, weight = 1): ResolvedComboTarget {
  const modelStr = `${provider}/${model}`;
  return {
    kind: "model",
    stepId: modelStr,
    executionKey: modelStr,
    modelStr,
    provider,
    providerId: provider,
    connectionId: null,
    weight,
    label: null,
  };
}

function candidate(
  target: ResolvedComboTarget,
  quality: number,
  extra: Partial<AutoProviderCandidate> = {}
): AutoProviderCandidate {
  return {
    stepId: target.stepId,
    executionKey: target.executionKey,
    modelStr: target.modelStr,
    provider: target.provider,
    model: target.modelStr.split("/")[1],
    quotaRemaining: 100,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 1,
    p95LatencyMs: 100,
    latencyStdDev: 10,
    errorRate: 0,
    accountTier: "standard",
    quotaResetIntervalSecs: 86400,
    contextAffinity: 0.5,
    sessionAvailability: 1,
    resetWindowAffinity: 0.5,
    connectionPoolSize: 1,
    connectionId: null,
    quality,
    ...extra,
  };
}

function record(
  provider: string,
  model: string,
  partial: Partial<Parameters<typeof recordQualityEvent>[0]> = {}
): void {
  recordQualityEvent({
    provider,
    model,
    outcome: "success",
    status: 200,
    latencyMs: 100,
    finishReason: "stop",
    outputTokens: 5,
    ...partial,
  });
}

function bestProvider(targets: ReturnType<typeof scoreAutoTargets>): string {
  return targets[0].target.provider;
}

/** Derive the bare model id from a "provider/model" modelStr. */
function modelOf(t: ResolvedComboTarget): string {
  return t.modelStr.slice(t.provider.length + 1);
}

/** Score a set of providers using their live quality-tracker signal. */
function scoreProviders(
  ts: ResolvedComboTarget[],
  weights = DEFAULT_WEIGHTS
): ReturnType<typeof scoreAutoTargets> {
  return scoreAutoTargets(
    ts,
    ts.map((t) => candidate(t, qualityScoreFor(t.provider, modelOf(t)))),
    "general",
    weights
  );
}

test("healthy provider A is preferred over backup B, cold C stays neutral", () => {
  resetQualityTracker();
  // Warm A to high confidence with solid success.
  for (let i = 0; i < 100; i++) record("a", "m");
  // B warm but mildly degraded.
  for (let i = 0; i < 100; i++)
    record("b", "m", {
      outcome: i % 5 === 0 ? "error" : "success",
      status: i % 5 === 0 ? 500 : 200,
    });

  const a = target("a", "m");
  const b = target("b", "m");
  const c = target("c", "m");
  const scored = scoreProviders([a, b, c]);

  assert.equal(bestProvider(scored), "a", "healthy A must be the top pick");
  // Cold C must not be top (neutral 0.5 quality vs A's high quality).
  assert.notEqual(bestProvider(scored), "c", "cold provider must not dominate");
  // C's quality must be exactly neutral.
  assert.equal(qualityScoreFor("c", "m"), 0.5);
});

test("degradation injected into A flips preference to B; recovery flips it back", () => {
  resetQualityTracker();
  // Phase 0: A and B are otherwise identical; both healthy. A is preferred via
  // stable tie-break, and quality is the only differentiator.
  for (let i = 0; i < 100; i++) record("a", "m");
  for (let i = 0; i < 100; i++) record("b", "m");

  const a = target("a", "m");
  const b = target("b", "m");
  const score = () => scoreProviders([a, b]);

  const initial = score();
  assert.equal(bestProvider(initial), "a", "initially A is preferred (tie-break on equal quality)");

  // Phase 1: degrade A — sustained 5xx. A's quality collapses to ~0, so B
  // (identical but healthy) becomes preferred. Gradual: the EWMA smooths the drop.
  for (let i = 0; i < 60; i++) record("a", "m", { outcome: "error", status: 500 });
  const during = score();
  assert.equal(
    bestProvider(during),
    "b",
    "sustained degradation must flip preference to B (gradual, not instant)"
  );
  const qualityA = qualityScoreFor("a", "m");
  assert.ok(qualityA < 0.5, `A quality degraded below neutral, got ${qualityA}`);

  // Phase 2: recover A — sustained successes. Quality recovers and A's
  // preference is restored.
  for (let i = 0; i < 200; i++) record("a", "m");
  const after = score();
  assert.equal(bestProvider(after), "a", "recovery must restore A's preference");

  // Phase 3: one isolated failure must not destroy A — its quality stays healthy
  // (well above neutral), it just falls marginally behind the now-equally-tied B.
  record("a", "m", { outcome: "error", status: 500 });
  const qualityAfterBlip = qualityScoreFor("a", "m");
  assert.ok(
    qualityAfterBlip > 0.7,
    `one isolated failure must not destroy A's quality, got ${qualityAfterBlip}`
  );
  const afterBlip = score();
  const aEntry = afterBlip.find((s) => s.target.provider === "a");
  const bEntry = afterBlip.find((s) => s.target.provider === "b");
  assert.ok(
    Math.abs(aEntry!.score - bEntry!.score) < 0.02,
    "A must remain competitive after one isolated failure (not destroyed)"
  );
});

test("a provider with insufficient evidence does not dominate from optimistic init", () => {
  resetQualityTracker();
  // Solid warm provider.
  for (let i = 0; i < 200; i++) record("solid", "m");
  // Lucky cold provider: 7 flawless successes.
  for (let i = 0; i < 7; i++) record("lucky", "m");

  const s = target("solid", "m");
  const l = target("lucky", "m");
  const scored = scoreProviders([s, l]);
  assert.equal(bestProvider(scored), "solid", "solid warm provider must beat a lucky cold one");
});
