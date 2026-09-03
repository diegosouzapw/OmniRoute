import assert from "node:assert/strict";
import test from "node:test";

import { observeCircuit, createAdaptiveCircuit } from "@/lib/resilience/adaptiveCircuit";
import { evaluateBudget } from "@/lib/usage/budgetGuard";
import { ModelPricingRegistry } from "@/lib/usage/modelPricingRegistry";
import { createUsageRecord, summarizeUsage } from "@/lib/usage/usageLedger";

test("adaptive circuit opens, probes, and closes after recovery", () => {
  const now = new Date("2026-01-01T00:00:00.000Z");
  let circuit = createAdaptiveCircuit();
  circuit = observeCircuit(circuit, "failure", {
    now,
    failureThreshold: 2,
    cooldownMs: 1000,
    reason: "timeout",
  });
  circuit = observeCircuit(circuit, "failure", {
    now: new Date(now.getTime() + 10),
    failureThreshold: 2,
    cooldownMs: 1000,
    reason: "timeout",
  });
  assert.equal(circuit.state, "open");
  circuit = observeCircuit(circuit, "probe", { now: new Date(now.getTime() + 1011) });
  assert.equal(circuit.state, "half_open");
  circuit = observeCircuit(circuit, "success", { now: new Date(now.getTime() + 1002) });
  assert.equal(circuit.state, "closed");
  assert.equal(circuit.failureCount, 0);
});

test("internal budget returns allow, warn, and deny without upstream quota claims", () => {
  const limit = {
    id: "b",
    scope: "global" as const,
    period: "daily" as const,
    limitType: "currency" as const,
    limitValue: 10,
    warningThreshold: 0.75,
    enabled: true,
  };
  assert.equal(evaluateBudget(limit, { currency: 2, tokens: 0, requests: 0 }).decision, "allow");
  assert.equal(evaluateBudget(limit, { currency: 8, tokens: 0, requests: 0 }).decision, "warn");
  assert.equal(evaluateBudget(limit, { currency: 10, tokens: 0, requests: 0 }).decision, "deny");
});

test("unknown pricing remains unknown while configured pricing is estimated", () => {
  const registry = new ModelPricingRegistry();
  assert.equal(registry.estimate("codex", "unknown", 1000, 1000), undefined);
  registry.set({
    providerId: "codex",
    modelId: "gpt-5",
    inputPricePerMillionTokens: 1,
    outputPricePerMillionTokens: 2,
    source: "admin",
  });
  assert.equal(registry.estimate("codex", "gpt-5", 1000, 1000), 0.003);
  const record = createUsageRecord(
    {
      id: "r1",
      providerId: "codex",
      modelId: "gpt-5",
      inputTokens: 100,
      outputTokens: 50,
      latencyMs: 10,
      status: "success",
      createdAt: "2026-01-01T00:00:00.000Z",
    },
    registry
  );
  assert.equal(record.totalTokens, 150);
  assert.equal(record.estimatedCostUsd, 0.0002);
  const summary = summarizeUsage([record]);
  assert.equal(summary.requests, 1);
  assert.equal(summary.successes, 1);
  assert.equal(summary.estimatedCostUsd, 0.0002);
});
