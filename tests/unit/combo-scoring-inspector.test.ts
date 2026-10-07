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
const comboHealthDashboard = await import("../../src/lib/usage/comboHealthDashboard.ts");
const route = await import("../../src/app/api/usage/combo-scoring-inspector/route.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");
const { lockModel, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { DEFAULT_WEIGHTS, normalizeScoringWeights } =
  await import("../../open-sse/services/autoCombo/scoring.ts");
const { MODE_PACKS } = await import("../../open-sse/services/autoCombo/modePacks.ts");
const { buildAutoCandidates } = await import("../../open-sse/services/combo.ts");
const { parseAutoConfig } = await import("../../open-sse/services/combo/autoConfig.ts");
const { resolveComboTargets } = await import("../../open-sse/services/combo/comboStructure.ts");
const { evaluateAutoCandidates } =
  await import("../../open-sse/services/combo/resolveAutoStrategy.ts");

async function resetStorage() {
  comboMetrics.resetAllComboMetrics();
  clearAllModelLockouts();
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "combo-scoring-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

async function seedAutoCombo(comboOverrides: Record<string, unknown> = {}) {
  const comboInput = {
    name: "combo-scoring-auto",
    strategy: "auto",
    ...comboOverrides,
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

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
  assert.equal(response.combos[0].weightSource, "default");
  assert.equal(response.combos[0].modePack, null);
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
  assert.ok(response.combos[0].targets[0].factors.some((factor) => factor.source === "runtime"));
});

test("scoring inspector reports mode packs over explicit auto weights", async () => {
  const combo = await combosDb.createCombo({
    name: "combo-scoring-mode-pack",
    strategy: "auto",
    models: ["openai/gpt-4o-mini"],
    config: {
      auto: {
        modePack: "ship-fast",
        weights: { ...DEFAULT_WEIGHTS },
      },
    },
  });

  const response = await inspector.buildComboScoringInspectorResponse({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
    combos: [combo],
    skipAutopilot: true,
  });

  assert.equal(response.combos.length, 1);
  assert.equal(response.combos[0].weightSource, "mode_pack");
  assert.equal(response.combos[0].modePack, "ship-fast");
  assert.deepEqual(response.combos[0].weights, MODE_PACKS["ship-fast"]);
});

test("scoring inspector reports valid explicit auto weights", async () => {
  // Shift 0.05 from costInv to latencyInv so the override stays sum-normalized no matter
  // what the DEFAULT_WEIGHTS values are (validateWeights requires sum ≈ 1.0 — the previous
  // hardcoded override only summed to 1.0 against the pre-#8940 default values).
  const explicitWeights = {
    ...DEFAULT_WEIGHTS,
    latencyInv: DEFAULT_WEIGHTS.latencyInv + 0.05,
    costInv: DEFAULT_WEIGHTS.costInv - 0.05,
  };
  const combo = await combosDb.createCombo({
    name: "combo-scoring-explicit-weights",
    strategy: "auto",
    models: ["openai/gpt-4o-mini"],
    autoConfig: { weights: explicitWeights },
  });

  const response = await inspector.buildComboScoringInspectorResponse({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
    combos: [combo],
    skipAutopilot: true,
  });

  assert.equal(response.combos.length, 1);
  assert.equal(response.combos[0].weightSource, "explicit");
  assert.equal(response.combos[0].modePack, null);
  assert.deepEqual(response.combos[0].weights, explicitWeights);
});
test("configured auto preview uses live evaluation scores and zero quota contribution", async () => {
  const weights = normalizeScoringWeights({
    ...DEFAULT_WEIGHTS,
    quota: 0,
    latencyInv: DEFAULT_WEIGHTS.latencyInv + DEFAULT_WEIGHTS.quota,
  });
  const combo = await combosDb.createCombo({
    name: "combo-scoring-live-parity",
    strategy: "auto",
    models: ["openai/gpt-4o-mini", "anthropic/claude-3-haiku"],
    autoConfig: { weights },
  });

  const response = await inspector.buildComboScoringInspectorResponse({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
    combos: [combo],
    skipAutopilot: true,
  });
  const resolvedTargets = resolveComboTargets(combo as never, [combo] as never);
  const evaluation = await evaluateAutoCandidates({
    targets: resolvedTargets,
    comboName: combo.name,
    body: {},
    taskType: "default",
    weights,
    resetWindowConfig: parseAutoConfig(combo as never, resolvedTargets).resetWindowConfig,
    buildAutoCandidates,
  });

  assert.deepEqual(
    response.combos[0].targets.map((target) => ({
      executionKey: target.executionKey,
      score: target.score,
      factors: Object.fromEntries(target.factors.map((factor) => [factor.key, factor.value])),
    })),
    evaluation.scoredTargets.map((target) => ({
      executionKey: target.target.executionKey,
      score: Number(target.score.toFixed(4)),
      factors: Object.fromEntries(
        Object.entries(target.factors).map(([key, value]) => [key, Number(value.toFixed(4))])
      ),
    }))
  );
  for (const target of response.combos[0].targets) {
    const quota = target.factors.find((factor) => factor.key === "quota");
    assert.equal(quota?.source, "runtime");
    assert.equal(quota?.weight, 0);
    assert.equal(quota?.contribution, 0);
    assert.equal(
      target.score,
      Number(target.factors.reduce((sum, factor) => sum + factor.contribution, 0).toFixed(4))
    );
  }
});

test("configured auto preview with no model steps preserves health-derived targets", async () => {
  const combo = await combosDb.createCombo({
    name: "combo-scoring-empty-auto",
    strategy: "auto",
    models: [],
  });
  const target = {
    executionKey: "health-only-target",
    stepId: "health-only-target",
    model: "openai/gpt-4o-mini",
    provider: "openai",
    connectionId: null,
    label: "Health-only target",
    requests: 1,
    successRate: 100,
    avgLatencyMs: 100,
    lastStatus: 200,
    lastUsedAt: new Date().toISOString(),
    quotaRemainingPct: 100,
    quotaIsExhausted: false,
    quotaTrend: null,
    quotaScope: "provider" as const,
  };

  const response = await inspector.buildComboScoringInspectorResponse({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
    combos: [combo],
    skipAutopilot: true,
    healthResponse: {
      timeRange: "24h",
      combos: [
        {
          comboId: String(combo.id),
          comboName: combo.name,
          strategy: "auto",
          models: [],
          cost: { totalUsd: 0, avgPerRequestUsd: 0, byModel: [] },
          quotaHealth: { providers: [], worstRemainingPct: 100 },
          usageSkew: { modelDistribution: [], giniCoefficient: 0 },
          performance: { avgLatencyMs: 100, successRate: 100, totalRequests: 1 },
          targetHealth: [target],
        },
      ],
    },
    forecastResponse: {
      asOf: new Date().toISOString(),
      timeRange: "24h",
      horizon: "7d",
      method: "linear_history",
      combos: [],
    },
  });

  assert.equal(response.combos[0].targets.length, 1);
  assert.equal(response.combos[0].targets[0].executionKey, target.executionKey);
});

test("scoring inspector normalizes partial explicit auto weights like runtime", async () => {
  const explicitWeights = {
    quota: 0.3,
    health: 0.25,
    costInv: 0.1,
    latencyInv: 0.1,
  };
  const combo = await combosDb.createCombo({
    name: "combo-scoring-partial-explicit-weights",
    strategy: "auto",
    models: ["openai/gpt-4o-mini"],
    autoConfig: { weights: explicitWeights },
  });

  const response = await inspector.buildComboScoringInspectorResponse({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
    combos: [combo],
    skipAutopilot: true,
  });

  assert.equal(response.combos[0].weightSource, "explicit");
  assert.deepEqual(response.combos[0].weights, normalizeScoringWeights(explicitWeights));
  assert.equal(response.combos[0].warnings.length, 0);
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
  // #7087: this used to assert that `options.combos` is never even READ when
  // health/forecast/skipAutopilot are all supplied (via a getter that throws on
  // access) — but that was pinning the exact bug: resolveConfiguredCombos() must
  // check `options.combos` FIRST, unconditionally, so a caller-supplied `combos`
  // array (e.g. from buildComboHealthDashboardResponse()) is never silently
  // discarded just because health/forecast/autopilot were already resolved too.
  // This test's own `options` genuinely has no `combos` (undefined), which still
  // exercises the "no combos supplied + already have health signals -> skip the
  // getCombos() DB round-trip" branch — no getter/trap needed for that.

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

// #7087 follow-up: resolveConfiguredCombos() used to unconditionally return `[]`
// whenever healthResponse + forecastResponse + (skipAutopilot || autopilotReport)
// were ALL supplied, regardless of whether options.combos was also populated. That
// is exactly the call shape comboHealthDashboard.ts::buildComboHealthDashboardResponse
// always uses (it fetches combos once, then threads combos/healthResponse/
// forecastResponse/autopilotReport into buildComboScoringInspectorResponse
// together) -- so through the real dashboard integration, `combosById`/`combosByName`
// (which resolveInspectorWeights() reads to report a combo's real configured
// modePack/weights) always came back empty, and every combo's weightSource silently
// fell back to "default" no matter what was actually configured. This test drives
// the real buildComboHealthDashboardResponse() end-to-end (not
// buildComboScoringInspectorResponse() directly, which the PR's own tests already
// covered) with a combo configured for modePack "ship-fast".
test("scoring inspector reports the configured weight source through the dashboard integration", async () => {
  const { combo } = await seedAutoCombo({
    config: { auto: { modePack: "ship-fast" } },
  });

  const dashboard = await comboHealthDashboard.buildComboHealthDashboardResponse({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
    taskType: "coding",
    combos: [combo],
  });

  assert.equal(dashboard.errors.scoring, undefined);
  assert.ok(dashboard.scoring, "expected a scoring inspector response, not null");
  assert.equal(dashboard.scoring?.combos.length, 1);
  assert.equal(
    dashboard.scoring?.combos[0].weightSource,
    "mode_pack",
    "dashboard's own combos should drive the reported weight source, not silently fall back to default"
  );
  assert.equal(dashboard.scoring?.combos[0].modePack, "ship-fast");
  assert.deepEqual(dashboard.scoring?.combos[0].weights, MODE_PACKS["ship-fast"]);
});
