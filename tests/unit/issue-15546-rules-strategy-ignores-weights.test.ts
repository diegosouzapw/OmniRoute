import test from "node:test";
import assert from "node:assert/strict";

import { getStrategy } from "../../open-sse/services/autoCombo/routerStrategy.ts";
import { MODE_PACKS } from "../../open-sse/services/autoCombo/modePacks.ts";
import type {
  ProviderCandidate,
  ScoringWeights,
} from "../../open-sse/services/autoCombo/scoring.ts";

const base = {
  quotaRemaining: 90,
  quotaTotal: 100,
  circuitBreakerState: "CLOSED" as const,
  latencyStdDev: 50,
  errorRate: 0,
};

// cheap-but-slow vs expensive-but-fast: default weights favour cost over latency.
const pool: ProviderCandidate[] = [
  { ...base, provider: "cheapco", model: "cheap-slow", costPer1MTokens: 0.1, p95LatencyMs: 5000 },
  { ...base, provider: "fastco", model: "pricey-fast", costPer1MTokens: 20, p95LatencyMs: 100 },
] as ProviderCandidate[];

const latencyOnly = {
  ...Object.fromEntries(Object.keys(MODE_PACKS["ship-fast"]).map((k) => [k, 0])),
  latencyInv: 1,
} as ScoringWeights;

test("sanity: ScoreStrategy honours context.weights", () => {
  const d = getStrategy("score").select(pool, {
    taskType: "default",
    weights: latencyOnly,
    explorationRate: 0,
  });
  assert.equal(d.provider, "fastco");
});

test("RulesStrategy honours context.weights (lkgpEnabled=false)", () => {
  const d = getStrategy("lkgp").select(pool, {
    taskType: "default",
    weights: latencyOnly,
    lkgpEnabled: false,
  });
  assert.equal(d.strategy, "rules");
  assert.equal(d.provider, "fastco", `weights ignored: picked ${d.provider} (${d.reason})`);
});

test("RulesStrategy honours context.weights (LKGP enabled but no last-known-good)", () => {
  const d = getStrategy("lkgp").select(pool, { taskType: "default", weights: latencyOnly });
  assert.equal(d.provider, "fastco", `weights ignored: picked ${d.provider} (${d.reason})`);
});

test("RulesStrategy keeps default weights when none supplied", () => {
  const d = getStrategy("rules").select(pool, { taskType: "default" });
  assert.equal(d.provider, "cheapco");
});
