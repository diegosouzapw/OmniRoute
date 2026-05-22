import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-route-explain-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const routeExplain = await import("../../src/lib/usage/routeExplain.ts");
const route = await import("../../src/app/api/usage/route-explain/[id]/route.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

type RouteExplainabilityResponse =
  import("../../src/lib/usage/routeExplain.ts").RouteExplainabilityResponse;

async function resetStorage() {
  clearAllModelLockouts();
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("route explainability builds a direct-route explanation from call logs", async () => {
  await callLogs.saveCallLog({
    id: "direct-route-1",
    timestamp: "2026-05-20T12:00:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4o-mini",
    requestedModel: "openai/gpt-4o-mini",
    provider: "openai",
    connectionId: "conn-openai-a",
    duration: 320,
    tokens: { input: 120, output: 45 },
    cacheSource: "upstream",
    requestType: "chat",
    sourceFormat: "openai",
    targetFormat: "openai",
  });

  const explanation = await routeExplain.explainRouteByRequestId("direct-route-1");

  assert.ok(explanation);
  assert.equal(explanation.routeType, "direct");
  assert.equal(explanation.providerSelected, "openai");
  assert.equal(explanation.modelUsed, "openai/gpt-4o-mini");
  assert.equal(explanation.selectedTarget.status, 200);
  assert.equal(explanation.decisionReplay.runtime.exact, true);
  assert.equal(explanation.decisionReplay.runtime.selectedCallLogId, "direct-route-1");
  assert.equal(explanation.decisionReplay.recompute, null);
  assert.equal(explanation.resilience?.provider.circuitBreakerState, "CLOSED");
  assert.equal(
    explanation.decision.factors.some((factor) => factor.name === "Direct routing"),
    true
  );
  assert.equal(explanation.recommendations.length > 0, true);
});

test("route explainability includes selected-target resilience reasons", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "route cooldown account",
    apiKey: "test-key",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    testStatus: "unavailable",
    lastErrorType: "rate_limit",
    errorCode: 429,
  })) as { id: string };

  await callLogs.saveCallLog({
    id: "direct-route-cooldown",
    timestamp: "2026-05-20T12:00:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4o-mini",
    requestedModel: "openai/gpt-4o-mini",
    provider: "openai",
    connectionId: connection.id,
    duration: 320,
  });

  const explanation = await routeExplain.explainRouteByRequestId("direct-route-cooldown");

  assert.ok(explanation);
  assert.equal(explanation.resilience?.targetState, "skipped");
  assert.equal(
    explanation.resilience?.skipReasons.some(
      (reason) => reason.code === "connection_cooldown" && reason.connectionId === connection.id
    ),
    true
  );
});

test("route explainability surfaces nearby combo fallback evidence", async () => {
  await callLogs.saveCallLog({
    id: "combo-failed-step",
    timestamp: "2026-05-20T12:00:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 503,
    model: "openai/gpt-4o-mini",
    requestedModel: "coding-combo",
    provider: "openai",
    connectionId: "conn-openai-a",
    duration: 900,
    tokens: { input: 100, output: 0 },
    comboName: "coding-combo",
    comboStepId: "step-openai",
    comboExecutionKey: "step-openai",
    error: "upstream unavailable",
  });
  await callLogs.saveCallLog({
    id: "combo-selected-step",
    timestamp: "2026-05-20T12:01:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "anthropic/claude-3-5-sonnet",
    requestedModel: "coding-combo",
    provider: "anthropic",
    connectionId: "conn-anthropic-a",
    duration: 450,
    tokens: { input: 100, output: 80 },
    comboName: "coding-combo",
    comboStepId: "step-anthropic",
    comboExecutionKey: "step-anthropic",
    pipelinePayloads: { clientRequest: { model: "coding-combo" } },
  });
  await callLogs.saveCallLog({
    id: "combo-distant-step",
    timestamp: "2026-05-20T13:00:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 503,
    model: "openai/gpt-4o-mini",
    requestedModel: "coding-combo",
    provider: "openai",
    connectionId: "conn-openai-a",
    duration: 800,
    tokens: { input: 100, output: 0 },
    comboName: "coding-combo",
    comboStepId: "step-openai-distant",
    comboExecutionKey: "step-openai-distant",
    error: "outside explainability window",
  });

  const explanation = await routeExplain.explainRouteByRequestId("combo-selected-step");

  assert.ok(explanation);
  assert.equal(explanation.routeType, "combo");
  assert.equal(explanation.comboUsed, "coding-combo");
  assert.equal(explanation.confidence, "high");
  assert.equal(explanation.relatedTargets.length, 2);
  assert.equal(
    explanation.relatedTargets.some((target) => target.id === "combo-distant-step"),
    false
  );
  assert.equal(explanation.fallbacksTriggered.length, 1);
  assert.equal(explanation.fallbacksTriggered[0].id, "combo-failed-step");
  assert.equal(explanation.targetStats.successRate, 100);
});

test("route explainability replays why a combo target was selected", async () => {
  const comboInput = {
    name: "route-replay-auto",
    strategy: "auto",
    models: [
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "route-replay-fast",
        label: "Fast target",
      },
      {
        kind: "model",
        providerId: "anthropic",
        model: "anthropic/claude-3-haiku",
        connectionId: "route-replay-slow",
        label: "Slow target",
      },
    ],
  };
  await combosDb.createCombo(comboInput);
  const fastStep = normalizeComboStep(comboInput.models[0], {
    comboName: comboInput.name,
    index: 0,
  });
  const slowStep = normalizeComboStep(comboInput.models[1], {
    comboName: comboInput.name,
    index: 1,
  });

  await callLogs.saveCallLog({
    id: "route-replay-selected",
    timestamp: new Date().toISOString(),
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4o-mini",
    requestedModel: comboInput.name,
    provider: "openai",
    connectionId: "route-replay-fast",
    duration: 120,
    tokens: { prompt_tokens: 100, completion_tokens: 50 },
    comboName: comboInput.name,
    comboStepId: fastStep.id,
    comboExecutionKey: fastStep.id,
  });
  await callLogs.saveCallLog({
    id: "route-replay-related",
    timestamp: new Date().toISOString(),
    method: "POST",
    path: "/v1/chat/completions",
    status: 503,
    model: "anthropic/claude-3-haiku",
    requestedModel: comboInput.name,
    provider: "anthropic",
    connectionId: "route-replay-slow",
    duration: 2_000,
    tokens: { prompt_tokens: 100, completion_tokens: 0 },
    comboName: comboInput.name,
    comboStepId: slowStep.id,
    comboExecutionKey: slowStep.id,
  });

  const explanation = await routeExplain.explainRouteByRequestId("route-replay-selected");

  assert.ok(explanation);
  assert.equal(explanation.decisionReplay.runtime.source, "call_logs");
  assert.equal(explanation.decisionReplay.recompute?.method, "read_only_recompute");
  assert.equal(explanation.decisionReplay.recompute?.exactRuntimeReplay, false);
  assert.equal(explanation.decisionReplay.recompute?.runtimeSelectedRank, 1);
  assert.equal(explanation.decisionReplay.recompute?.alignment, "matches_recomputed_top_target");
  assert.equal(
    explanation.decisionReplay.recompute?.candidates.some(
      (candidate) => candidate.executionKey === fastStep.id && candidate.isRuntimeSelected
    ),
    true
  );
});

test("route explainability warns when replay recomputes a non-auto combo", async () => {
  const comboInput = {
    name: "route-replay-priority",
    strategy: "priority",
    models: ["openai/gpt-4o-mini"],
  };
  await combosDb.createCombo(comboInput);
  const step = normalizeComboStep(comboInput.models[0], {
    comboName: comboInput.name,
    index: 0,
  });

  await callLogs.saveCallLog({
    id: "route-replay-priority-selected",
    timestamp: new Date().toISOString(),
    status: 200,
    model: "openai/gpt-4o-mini",
    requestedModel: comboInput.name,
    provider: "openai",
    duration: 200,
    comboName: comboInput.name,
    comboStepId: step.id,
    comboExecutionKey: step.id,
  });

  const explanation = await routeExplain.explainRouteByRequestId("route-replay-priority-selected");

  assert.ok(explanation);
  assert.equal(explanation.decisionReplay.recompute?.strategy, "priority");
  assert.equal(
    explanation.decisionReplay.recompute?.warnings.some((warning) => warning.includes("not auto")),
    true
  );
});

test("route explainability API returns a routing decision document", async () => {
  await callLogs.saveCallLog({
    id: "api-route-1",
    timestamp: "2026-05-20T12:02:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4o-mini",
    requestedModel: "openai/gpt-4o-mini",
    provider: "openai",
    duration: 120,
  });

  const response = await route.GET(
    new Request("http://localhost/api/usage/route-explain/api-route-1"),
    {
      params: Promise.resolve({ id: "api-route-1" }),
    }
  );
  const body = (await response.json()) as RouteExplainabilityResponse;

  assert.equal(response.status, 200);
  assert.equal(body.requestId, "api-route-1");
  assert.equal(body.decision.providerSelected, "openai");
  assert.equal(Array.isArray(body.decision.factors), true);
});
