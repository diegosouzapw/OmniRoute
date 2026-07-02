import test from "node:test";
import assert from "node:assert/strict";

import { selectProvider } from "../../open-sse/services/autoCombo/engine.ts";
import { getSelfHealingManager } from "../../open-sse/services/autoCombo/selfHealing.ts";
import { DEFAULT_WEIGHTS } from "../../open-sse/services/autoCombo/scoring.ts";

const healer = getSelfHealingManager();
const originalRandom = Math.random;

function resetHealer() {
  healer.exclusions.clear();
  healer.incidentMode = false;
}

const baseConfig = {
  id: "auto-main",
  name: "Auto Main",
  type: "auto",
  candidatePool: [],
  weights: DEFAULT_WEIGHTS,
  explorationRate: 0,
};

test.beforeEach(() => {
  resetHealer();
  Math.random = originalRandom;
});

test.afterEach(() => {
  resetHealer();
  Math.random = originalRandom;
});

test("selectProvider infers coding intent from prompt messages when taskType is generic", () => {
  const candidates = [
    {
      provider: "codex",
      model: "gpt-5.1-codex",
      quotaRemaining: 95,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 5,
      p95LatencyMs: 120,
      latencyStdDev: 8,
      errorRate: 0.01,
      accountTier: "pro",
      quotaResetIntervalSecs: 3600,
    },
    {
      provider: "openai",
      model: "gpt-4o-mini",
      quotaRemaining: 70,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED",
      costPer1MTokens: 30,
      p95LatencyMs: 800,
      latencyStdDev: 60,
      errorRate: 0.01,
      accountTier: "pro",
      quotaResetIntervalSecs: 3600,
    },
  ];

  const result = selectProvider(baseConfig, candidates, "default", [
    {
      role: "user",
      content: "Refactor this TypeScript function and debug the code path for me.",
    },
  ]);

  assert.equal(result.provider, "codex");
  assert.equal(result.model, "gpt-5.1-codex");
  assert.equal(result.isExploration, false);
});

test("selectProvider falls back to the full candidate list when candidatePool removes everything", () => {
  const result = selectProvider(
    {
      ...baseConfig,
      candidatePool: ["missing-provider"],
    },
    [
      {
        provider: "openai",
        model: "gpt-4o",
        quotaRemaining: 80,
        quotaTotal: 100,
        circuitBreakerState: "CLOSED",
        costPer1MTokens: 8,
        p95LatencyMs: 400,
        latencyStdDev: 15,
        errorRate: 0.01,
      },
    ],
    "documentation"
  );

  assert.equal(result.provider, "openai");
  assert.deepEqual(result.excluded, []);
});

test("selectProvider excludes unhealthy providers and disables exploration in incident mode", () => {
  healer.updateIncidentMode(["OPEN", "OPEN"]);
  Math.random = () => 0;

  const result = selectProvider(
    {
      ...baseConfig,
      explorationRate: 1,
    },
    [
      {
        provider: "closed-provider",
        model: "gpt-4o",
        quotaRemaining: 90,
        quotaTotal: 100,
        circuitBreakerState: "CLOSED",
        costPer1MTokens: 6,
        p95LatencyMs: 250,
        latencyStdDev: 10,
        errorRate: 0.01,
      },
      {
        provider: "open-provider",
        model: "gpt-4o-mini",
        quotaRemaining: 90,
        quotaTotal: 100,
        circuitBreakerState: "OPEN",
        costPer1MTokens: 1,
        p95LatencyMs: 100,
        latencyStdDev: 5,
        errorRate: 0.01,
      },
    ],
    "simple"
  );

  assert.equal(result.provider, "closed-provider");
  assert.equal(result.isExploration, false);
  assert.ok(result.excluded.includes("open-provider"));
});

test("selectProvider degrades to the cheapest candidate when the selected option breaks the budget cap", () => {
  const result = selectProvider(
    {
      ...baseConfig,
      budgetCap: 0.001,
    },
    [
      {
        provider: "premium",
        model: "gpt-4o",
        quotaRemaining: 99,
        quotaTotal: 100,
        circuitBreakerState: "CLOSED",
        costPer1MTokens: 12000,
        p95LatencyMs: 100,
        latencyStdDev: 10,
        errorRate: 0.01,
        accountTier: "ultra",
        quotaResetIntervalSecs: 60,
      },
      {
        provider: "cheap",
        model: "gpt-4o-mini",
        quotaRemaining: 60,
        quotaTotal: 100,
        circuitBreakerState: "CLOSED",
        costPer1MTokens: 100,
        p95LatencyMs: 900,
        latencyStdDev: 50,
        errorRate: 0.02,
        accountTier: "free",
        quotaResetIntervalSecs: 86400,
      },
    ],
    "default"
  );

  assert.equal(result.provider, "cheap");
});
