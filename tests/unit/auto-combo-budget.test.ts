// tests/unit/auto-combo-budget.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import { selectProvider } from "../../open-sse/services/autoCombo/engine.ts";
import { getSelfHealingManager } from "../../open-sse/services/autoCombo/selfHealing.ts";
import { DEFAULT_WEIGHTS } from "../../open-sse/services/autoCombo/scoring.ts";

const healer = getSelfHealingManager();
test.beforeEach(() => {
  healer.exclusions.clear();
  healer.incidentMode = false;
});

function config(over: Record<string, unknown> = {}) {
  return {
    id: "budget-probe",
    name: "Budget Probe",
    type: "auto",
    candidatePool: [],
    weights: DEFAULT_WEIGHTS,
    explorationRate: 0,
    ...over,
  } as never;
}

function cand(provider: string, model: string, cost: number) {
  return {
    provider,
    model,
    quotaRemaining: 95,
    quotaTotal: 100,
    circuitBreakerState: "CLOSED",
    costPer1MTokens: cost,
    p95LatencyMs: 120,
    latencyStdDev: 8,
  } as never;
}

test("default budget math is unchanged without the new field", () => {
  const c = [cand("openai", "gpt-4o", 5)];
  const r = selectProvider(config({ budgetCap: 1 }), c);
  assert.equal(r.provider, "openai"); // (5/1M)*1000 = $0.005 < $1
});

test("32k estimated tokens enforce a 32x tighter budget", () => {
  const c = [cand("openai", "gpt-4o", 5)];
  // (5/1M)*32000 = $0.16 — exceeds a $0.01 cap only when tokens are honored.
  // Message verified: "No candidate fits within the configured budget cap…" (engine.ts:59-62).
  assert.throws(
    () =>
      selectProvider(
        config({ budgetCap: 0.01, budgetFallback: "strict", estimatedInputTokens: 32000 }),
        c
      ),
    /budget cap/i
  );
});
