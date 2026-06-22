// tests/unit/combo/auto-quota-cutoff.test.ts
// Regression coverage for auto routing quota cutoff: hard-cutoff candidates must be
// removed before scoring/fallback so an exhausted account cannot win by latency/model fit.
import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreAutoTargets } from "../../../open-sse/services/combo/autoStrategy.ts";
import type {
  AutoProviderCandidate,
  ResolvedComboTarget,
} from "../../../open-sse/services/combo/types.ts";
import type { ScoringWeights } from "../../../open-sse/services/autoCombo/scoring.ts";

const latencyOnlyWeights: ScoringWeights = {
  quota: 0,
  health: 0,
  costInv: 0,
  latencyInv: 1,
  taskFit: 0,
  stability: 0,
  tierPriority: 0,
  tierAffinity: 0,
  specificityMatch: 0,
  contextAffinity: 0,
  resetWindowAffinity: 0,
  connectionDensity: 0,
};

function target(provider: string, model: string, connectionId: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: `${provider}-${model}-${connectionId}`,
    executionKey: `${provider}/${model}@${connectionId}`,
    modelStr: `${provider}/${model}`,
    provider,
    providerId: null,
    connectionId,
  } as ResolvedComboTarget;
}

function candidate(
  provider: string,
  model: string,
  connectionId: string,
  overrides: Partial<AutoProviderCandidate> = {}
): AutoProviderCandidate {
  return {
    provider,
    model,
    stepId: `${provider}-${model}-${connectionId}`,
    executionKey: `${provider}/${model}@${connectionId}`,
    modelStr: `${provider}/${model}`,
    connectionId,
    quotaRemaining: 100,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: 1,
    p95LatencyMs: 1000,
    latencyStdDev: 10,
    errorRate: 0,
    resetWindowAffinity: 0.5,
    connectionPoolSize: 1,
    ...overrides,
  } as AutoProviderCandidate;
}

test("auto scoring skips GLM when its 2% remaining quota hit the hard cutoff", () => {
  const targets = [target("glm", "glm-5.2", "glm-empty"), target("mcode", "mimo-auto", "mcode-ok")];
  const ranked = scoreAutoTargets(
    targets,
    [
      candidate("glm", "glm-5.2", "glm-empty", {
        quotaRemaining: 2,
        p95LatencyMs: 10,
        quotaCutoffBlocked: true,
        quotaCutoffReason: "quota_exhausted",
      }),
      candidate("mcode", "mimo-auto", "mcode-ok", {
        quotaRemaining: 100,
        p95LatencyMs: 5000,
      }),
    ],
    "coding",
    latencyOnlyWeights
  );

  assert.equal(ranked.length, 1);
  assert.equal(ranked[0]?.target.provider, "mcode");
  assert.equal(ranked[0]?.target.connectionId, "mcode-ok");
});

test("blocked quota candidates are not included in the scoring pool", () => {
  const targets = [
    target("fast", "healthy", "fast-ok"),
    target("slow", "healthy", "slow-ok"),
    target("glm", "glm-5.2", "glm-empty"),
  ];
  const ranked = scoreAutoTargets(
    targets,
    [
      candidate("fast", "healthy", "fast-ok", { p95LatencyMs: 100 }),
      candidate("slow", "healthy", "slow-ok", { p95LatencyMs: 1000 }),
      candidate("glm", "glm-5.2", "glm-empty", {
        quotaRemaining: 0,
        p95LatencyMs: 10000,
        quotaCutoffBlocked: true,
        quotaCutoffReason: "quota_exhausted",
      }),
    ],
    "coding",
    latencyOnlyWeights
  );

  assert.deepEqual(
    ranked.map((entry) => entry.target.provider),
    ["fast", "slow"]
  );
  const slowScore = ranked.find((entry) => entry.target.provider === "slow")?.score;
  assert.equal(
    slowScore,
    0,
    "the blocked GLM latency must not inflate surviving candidates' scores"
  );
});
