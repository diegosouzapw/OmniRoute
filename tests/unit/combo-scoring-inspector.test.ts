import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-scoring-inspector-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const comboMetrics = await import("../../open-sse/services/comboMetrics.ts");
const inspector = await import("../../src/lib/usage/comboScoringInspector.ts");
const route = await import("../../src/app/api/usage/combo-scoring-inspector/route.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");
const { lockModel, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

async function resetStorage() {
  comboMetrics.resetAllComboMetrics();
  clearAllModelLockouts();
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "combo-scoring-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

async function seedAutoCombo() {
  const comboInput = {
    name: "combo-scoring-auto",
    strategy: "auto",
    models: [
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "scoring-conn-fast",
        label: "Fast healthy target",
      },
      {
        kind: "model",
        providerId: "anthropic",
        model: "anthropic/claude-3-5-haiku",
        connectionId: "scoring-conn-slow",
        label: "Slow low quota target",
      },
    ],
  };
  const combo = await combosDb.createCombo(comboInput);
  const firstStep = normalizeComboStep(comboInput.models[0], {
    comboName: comboInput.name,
    index: 0,
  });
  const secondStep = normalizeComboStep(comboInput.models[1], {
    comboName: comboInput.name,
    index: 1,
  });

  for (let index = 0; index < 4; index += 1) {
    await callLogs.saveCallLog({
      id: `scoring-fast-${index}`,
      timestamp: new Date(Date.now() - index * 60_000).toISOString(),
      method: "POST",
      path: "/v1/chat/completions",
      status: 200,
      model: "openai/gpt-4o-mini",
      requestedModel: comboInput.name,
      provider: "openai",
      connectionId: "scoring-conn-fast",
      duration: 100,
      tokens: { prompt_tokens: 100, completion_tokens: 100 },
      comboName: comboInput.name,
      comboStepId: firstStep.id,
      comboExecutionKey: firstStep.id,
    });
  }

  for (let index = 0; index < 4; index += 1) {
    await callLogs.saveCallLog({
      id: `scoring-slow-${index}`,
      timestamp: new Date(Date.now() - index * 60_000).toISOString(),
      method: "POST",
      path: "/v1/chat/completions",
      status: index === 0 ? 503 : 200,
      model: "anthropic/claude-3-5-haiku",
      requestedModel: comboInput.name,
      provider: "anthropic",
      connectionId: "scoring-conn-slow",
      duration: 1_000,
      tokens: { prompt_tokens: 100, completion_tokens: 100 },
      comboName: comboInput.name,
      comboStepId: secondStep.id,
      comboExecutionKey: secondStep.id,
    });
  }

  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: "scoring-conn-fast",
    window_key: "daily",
    remaining_percentage: 90,
    is_exhausted: 0,
    next_reset_at: null,
    window_duration_ms: 86_400_000,
    raw_data: null,
  });
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "anthropic",
    connection_id: "scoring-conn-slow",
    window_key: "daily",
    remaining_percentage: 20,
    is_exhausted: 0,
    next_reset_at: null,
    window_duration_ms: 86_400_000,
    raw_data: null,
  });

  return { combo, firstStep, secondStep };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;

  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

test("scoring inspector ranks targets and explains score contributions", async () => {
  const { combo, firstStep } = await seedAutoCombo();

  const response = await inspector.buildComboScoringInspectorResponse({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
    taskType: "coding",
  });

  assert.equal(response.method, "read_only_recompute");
  assert.equal(response.combos.length, 1);
  assert.equal(response.combos[0].strategy, "auto");
  assert.equal(response.combos[0].targets.length, 2);
  assert.equal(response.combos[0].selectedExecutionKey, firstStep.id);
  assert.equal(response.combos[0].targets[0].executionKey, firstStep.id);
  assert.ok(response.combos[0].targets[0].score > response.combos[0].targets[1].score);

  const contributionSum = response.combos[0].targets[0].factors.reduce(
    (sum, factor) => sum + factor.contribution,
    0
  );
  assert.ok(Math.abs(contributionSum - response.combos[0].targets[0].score) < 0.02);
  assert.ok(response.combos[0].targets[0].factors.some((factor) => factor.key === "quota"));
  assert.ok(
    response.combos[0].targets[0].factors.some((factor) => factor.source === "combo_health")
  );
});

test("scoring inspector marks non-auto combos as explanatory recompute", async () => {
  const combo = await combosDb.createCombo({
    name: "combo-scoring-priority",
    strategy: "priority",
    models: ["openai/gpt-4o-mini"],
  });

  const response = await inspector.buildComboScoringInspectorResponse({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
  });

  assert.equal(response.combos.length, 1);
  assert.equal(
    response.combos[0].warnings.some((warning) => warning.includes("not auto")),
    true
  );
});

test("scoring inspector skipAutopilot avoids rebuilding autopilot report", async () => {
  const options: Parameters<typeof inspector.buildComboScoringInspectorResponse>[0] = {
    range: "24h",
    horizon: "7d",
    healthResponse: {
      timeRange: "24h",
      combos: [
        {
          comboId: "combo-skip-autopilot",
          comboName: "combo-skip-autopilot",
          strategy: "auto",
          models: [],
          cost: { totalUsd: 0, avgPerRequestUsd: 0, byModel: [] },
          quotaHealth: { providers: [], worstRemainingPct: 0 },
          usageSkew: { modelDistribution: [], giniCoefficient: 0 },
          performance: { avgLatencyMs: 0, successRate: 0, totalRequests: 0 },
          targetHealth: [],
        },
      ],
    },
    forecastResponse: {
      asOf: "2024-01-01T00:00:00.000Z",
      timeRange: "24h",
      horizon: "7d",
      method: "linear_history",
      combos: [
        {
          comboId: "combo-skip-autopilot",
          comboName: "combo-skip-autopilot",
          strategy: "auto",
          targets: [],
          history: {
            requests: 0,
            inputTokens: 0,
            outputTokens: 0,
            cacheReadTokens: 0,
            cacheCreationTokens: 0,
            reasoningTokens: 0,
            totalTokens: 0,
            costUsd: 0,
            avgDailyCostUsd: 0,
            daysWithTraffic: 0,
            windowDays: 1,
          },
          forecast: {
            projectedRequests: 0,
            projectedTokens: 0,
            projectedCostUsd: 0,
          },
          quotaRisk: {
            level: "unknown",
            projectedWorstRemainingPct: null,
            timeToExhaustDays: null,
            worstTargetExecutionKey: null,
          },
          confidence: "no_data",
          dataQuality: {
            pricingCoveragePct: 0,
            quotaCoverage: "none",
            notes: [],
          },
        },
      ],
    },
    skipAutopilot: true,
  };
  Object.defineProperty(options, "combos", {
    get() {
      throw new Error("autopilot should not read combos when skipped");
    },
  });

  const response = await inspector.buildComboScoringInspectorResponse(options);

  assert.equal(response.combos.length, 1);
  assert.equal(
    response.combos[0].warnings.includes("Combo has no inspectable execution targets."),
    true
  );
});

test("scoring inspector includes resilience skip reasons for cooldowns and model lockouts", async () => {
  const cooldownConnection = (await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "cooldown account",
    apiKey: "test-key",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    testStatus: "unavailable",
    lastErrorType: "rate_limit",
    errorCode: 429,
  })) as { id: string };
  const lockedConnection = (await providersDb.createProviderConnection({
    provider: "github",
    authType: "apikey",
    name: "locked account",
    apiKey: "test-key",
  })) as { id: string };
  lockModel("github", lockedConnection.id, "github/gpt-4o", "rate_limited", 60_000);

  const response = await inspector.buildComboScoringInspectorResponse({
    range: "24h",
    horizon: "7d",
    skipAutopilot: true,
    healthResponse: {
      timeRange: "24h",
      combos: [
        {
          comboId: "combo-resilience",
          comboName: "combo-resilience",
          strategy: "auto",
          models: [],
          cost: { totalUsd: 0, avgPerRequestUsd: 0, byModel: [] },
          quotaHealth: { providers: [], worstRemainingPct: 0 },
          usageSkew: { modelDistribution: [], giniCoefficient: 0 },
          performance: { avgLatencyMs: 0, successRate: 0, totalRequests: 0 },
          targetHealth: [
            {
              executionKey: "openai-cooldown",
              stepId: "openai-cooldown",
              model: "openai/gpt-4o-mini",
              provider: "openai",
              connectionId: cooldownConnection.id,
              label: "Cooldown target",
              requests: 0,
              successRate: 0,
              avgLatencyMs: 0,
              lastStatus: null,
              lastUsedAt: null,
              quotaRemainingPct: null,
              quotaIsExhausted: null,
              quotaTrend: null,
              quotaScope: "connection",
            },
            {
              executionKey: "github-lockout",
              stepId: "github-lockout",
              model: "github/gpt-4o",
              provider: "github",
              connectionId: lockedConnection.id,
              label: "Locked target",
              requests: 0,
              successRate: 0,
              avgLatencyMs: 0,
              lastStatus: null,
              lastUsedAt: null,
              quotaRemainingPct: null,
              quotaIsExhausted: null,
              quotaTrend: null,
              quotaScope: "connection",
            },
          ],
        },
      ],
    },
    forecastResponse: {
      asOf: "2026-05-22T00:00:00.000Z",
      timeRange: "24h",
      horizon: "7d",
      method: "linear_history",
      combos: [],
    },
  });

  const targets = response.combos[0].targets;
  const cooldownTarget = targets.find((target) => target.executionKey === "openai-cooldown");
  const lockoutTarget = targets.find((target) => target.executionKey === "github-lockout");

  assert.equal(cooldownTarget?.signals.resilience.targetState, "skipped");
  assert.equal(
    cooldownTarget?.signals.resilience.skipReasons.some(
      (reason) => reason.code === "connection_cooldown" && reason.retryAfterMs! > 0
    ),
    true
  );
  assert.equal(lockoutTarget?.signals.resilience.targetState, "skipped");
  assert.equal(
    lockoutTarget?.signals.resilience.skipReasons.some((reason) => reason.code === "model_lockout"),
    true
  );
});

test("scoring inspector route requires auth, validates query, and returns 404", async () => {
  await enableManagementAuth();
  const { combo } = await seedAutoCombo();

  const unauthenticated = await route.GET(
    new Request(`http://localhost/api/usage/combo-scoring-inspector?comboId=${combo.id}`)
  );
  assert.equal(unauthenticated.status, 401);

  const invalid = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/combo-scoring-inspector?range=bad"
    )
  );
  assert.equal(invalid.status, 400);

  const missing = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/combo-scoring-inspector?comboId=11111111-1111-4111-8111-111111111111"
    )
  );
  assert.equal(missing.status, 404);

  const authenticated = await route.GET(
    await makeManagementSessionRequest(
      `http://localhost/api/usage/combo-scoring-inspector?range=24h&horizon=7d&taskType=coding&comboId=${combo.id}`
    )
  );
  assert.equal(authenticated.status, 200);
  const body = await authenticated.json();
  assert.equal(body.method, "read_only_recompute");
  assert.equal(body.combos.length, 1);
  assert.equal(body.combos[0].targets.length, 2);
});
