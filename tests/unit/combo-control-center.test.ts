import test from "node:test";
import assert from "node:assert/strict";

import {
  extractComboRuntimeConfig,
  getComboControlCenterTargets,
  getResolvedComboControlCenterTargets,
  summarizeComboControlCenter,
} from "../../src/lib/combos/controlCenter.ts";

test("getComboControlCenterTargets normalizes legacy, structured and nested combo targets", () => {
  const targets = getComboControlCenterTargets(
    {
      name: "coding-fast",
      models: [
        "openai/gpt-4.1-mini",
        {
          id: "claude-primary",
          kind: "model",
          providerId: "anthropic",
          model: "claude-3-7-sonnet",
          connectionId: "conn-1234567890",
          weight: 80,
          label: "Primary Claude",
          tags: ["coding"],
        },
        {
          id: "fallback-combo",
          kind: "combo-ref",
          comboName: "cheap-fallback",
          weight: 20,
        },
      ],
    },
    {
      targetHealth: [
        {
          stepId: "claude-primary",
          model: "anthropic/claude-3-7-sonnet",
          provider: "anthropic",
          requests: 12,
          successRate: 100,
          avgLatencyMs: 850,
        },
      ],
    }
  );

  assert.equal(targets.length, 3);
  assert.equal(targets[0].kind, "model");
  assert.equal(targets[0].provider, "openai");
  assert.equal(targets[1].label, "Primary Claude");
  assert.equal(targets[1].connectionId, "conn-1234567890");
  assert.equal(targets[1].health?.requests, 12);
  assert.deepEqual(targets[1].tags, ["coding"]);
  assert.equal(targets[2].kind, "combo-ref");
  assert.equal(targets[2].label, "Combo → cheap-fallback");
});

test("summarizeComboControlCenter combines health and runtime metrics", () => {
  const summary = summarizeComboControlCenter(
    {
      name: "prod-combo",
      strategy: "weighted",
      isActive: true,
      models: ["openai/gpt-4.1", "anthropic/claude-sonnet"],
    },
    {
      totalRequests: 20,
      successRate: 90,
      avgLatencyMs: 1200,
      fallbackRate: 15,
    },
    {
      performance: {
        totalRequests: 10,
        successRate: 0.9,
        avgLatencyMs: 900,
      },
      quotaHealth: {
        worstRemainingPct: 18,
        providers: [
          { provider: "openai", remainingPct: 18, isExhausted: false, trend: "declining" },
          { provider: "anthropic", remainingPct: 80, isExhausted: false, trend: "stable" },
        ],
      },
      usageSkew: { giniCoefficient: 0.2, modelDistribution: [] },
      targetHealth: [
        { model: "openai/gpt-4.1", provider: "openai" },
        { model: "anthropic/claude-sonnet", provider: "anthropic" },
      ],
    }
  );

  assert.equal(summary.strategy, "weighted");
  assert.equal(summary.targetCount, 2);
  assert.equal(summary.providerCount, 2);
  assert.equal(summary.totalRequests, 10);
  assert.equal(summary.successRate, 90);
  assert.equal(summary.avgLatencyMs, 900);
  assert.equal(summary.fallbackRate, 15);
  assert.equal(summary.worstQuotaRemainingPct, 18);
  assert.equal(summary.healthState, "warning");
  assert.ok(summary.healthReasons.includes("Success rate below target"));
  assert.ok(summary.healthReasons.includes("Elevated fallback rate"));
  assert.ok(summary.healthReasons.includes("Quota is getting low"));
});

test("summarizeComboControlCenter marks exhausted quota as critical", () => {
  const summary = summarizeComboControlCenter(
    { name: "quota-risk", models: ["openai/gpt-4.1"] },
    null,
    {
      performance: { totalRequests: 5, successRate: 1, avgLatencyMs: 300 },
      quotaHealth: {
        worstRemainingPct: 0,
        providers: [{ provider: "openai", remainingPct: 0, isExhausted: true, trend: "declining" }],
      },
    }
  );

  assert.equal(summary.healthState, "critical");
  assert.ok(summary.healthReasons.includes("At least one quota is exhausted"));
});

test("resolved targets and runtime config helpers are defensive", () => {
  assert.deepEqual(getResolvedComboControlCenterTargets(null), []);
  assert.deepEqual(extractComboRuntimeConfig({ config: null }), {});
  assert.deepEqual(extractComboRuntimeConfig({ config: { maxRetries: 2 } }), { maxRetries: 2 });
});
