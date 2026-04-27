import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-health-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const comboMetrics = await import("../../open-sse/services/comboMetrics.ts");
const route = await import("../../src/app/api/usage/combo-health/route.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");

async function resetStorage() {
  comboMetrics.resetAllComboMetrics();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  comboMetrics.resetAllComboMetrics();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("combo health route exposes step-level target health for structured combos", async () => {
  const comboInput = {
    name: "combo-health-structured",
    strategy: "priority",
    models: [
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "conn-openai-a",
        label: "Account A",
      },
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "conn-openai-b",
        label: "Account B",
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

  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: "conn-openai-a",
    window_key: "daily",
    remaining_percentage: 60,
    is_exhausted: 0,
    next_reset_at: null,
    window_duration_ms: 86_400_000,
    raw_data: null,
  });
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: "conn-openai-b",
    window_key: "daily",
    remaining_percentage: 85,
    is_exhausted: 0,
    next_reset_at: null,
    window_duration_ms: 86_400_000,
    raw_data: null,
  });

  comboMetrics.recordComboRequest(comboInput.name, "openai/gpt-4o-mini", {
    success: false,
    latencyMs: 240,
    strategy: "priority",
    target: {
      executionKey: firstStep.id,
      stepId: firstStep.id,
      provider: "openai",
      connectionId: "conn-openai-a",
      label: "Account A",
    },
  });
  comboMetrics.recordComboRequest(comboInput.name, "openai/gpt-4o-mini", {
    success: true,
    latencyMs: 120,
    strategy: "priority",
    target: {
      executionKey: secondStep.id,
      stepId: secondStep.id,
      provider: "openai",
      connectionId: "conn-openai-b",
      label: "Account B",
    },
  });

  const response = await route.GET(
    new Request(`http://localhost/api/usage/combo-health?range=24h&comboId=${combo.id}`)
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.combos.length, 1);
  assert.deepEqual(body.combos[0].models, ["openai/gpt-4o-mini", "openai/gpt-4o-mini"]);
  assert.equal(body.combos[0].targetHealth.length, 2);
  assert.deepEqual(
    body.combos[0].targetHealth.map((entry) => ({
      executionKey: entry.executionKey,
      connectionId: entry.connectionId,
      label: entry.label,
      requests: entry.requests,
      successRate: entry.successRate,
      quotaRemainingPct: entry.quotaRemainingPct,
      quotaScope: entry.quotaScope,
    })),
    [
      {
        executionKey: firstStep.id,
        connectionId: "conn-openai-a",
        label: "Account A",
        requests: 1,
        successRate: 0,
        quotaRemainingPct: 60,
        quotaScope: "connection",
      },
      {
        executionKey: secondStep.id,
        connectionId: "conn-openai-b",
        label: "Account B",
        requests: 1,
        successRate: 100,
        quotaRemainingPct: 85,
        quotaScope: "connection",
      },
    ]
  );
});

test("combo health route prefers historical call log target metrics over volatile runtime memory", async () => {
  const comboInput = {
    name: "combo-health-history",
    strategy: "priority",
    models: [
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "conn-openai-a",
        label: "Account A",
      },
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "conn-openai-b",
        label: "Account B",
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
  const firstTimestamp = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const secondTimestamp = new Date(Date.now() - 4 * 60 * 1000).toISOString();

  await callLogs.saveCallLog({
    id: "combo-history-1",
    timestamp: firstTimestamp,
    method: "POST",
    path: "/v1/chat/completions",
    status: 503,
    model: "openai/gpt-4o-mini",
    requestedModel: comboInput.name,
    provider: "openai",
    connectionId: "conn-openai-a",
    duration: 240,
    comboName: comboInput.name,
    comboStepId: firstStep.id,
    comboExecutionKey: firstStep.id,
    error: "first account unavailable",
  });
  await callLogs.saveCallLog({
    id: "combo-history-2",
    timestamp: secondTimestamp,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4o-mini",
    requestedModel: comboInput.name,
    provider: "openai",
    connectionId: "conn-openai-b",
    duration: 120,
    comboName: comboInput.name,
    comboStepId: secondStep.id,
    comboExecutionKey: secondStep.id,
  });

  comboMetrics.recordComboRequest(comboInput.name, "openai/gpt-4o-mini", {
    success: true,
    latencyMs: 10,
    strategy: "priority",
    target: {
      executionKey: firstStep.id,
      stepId: firstStep.id,
      provider: "openai",
      connectionId: "conn-openai-a",
      label: "Account A",
    },
  });

  const response = await route.GET(
    new Request(`http://localhost/api/usage/combo-health?range=24h&comboId=${combo.id}`)
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.combos.length, 1);
  assert.deepEqual(
    body.combos[0].targetHealth.map((entry) => ({
      executionKey: entry.executionKey,
      requests: entry.requests,
      successRate: entry.successRate,
      avgLatencyMs: entry.avgLatencyMs,
      lastStatus: entry.lastStatus,
    })),
    [
      {
        executionKey: firstStep.id,
        requests: 1,
        successRate: 0,
        avgLatencyMs: 240,
        lastStatus: "error",
      },
      {
        executionKey: secondStep.id,
        requests: 1,
        successRate: 100,
        avgLatencyMs: 120,
        lastStatus: "ok",
      },
    ]
  );
});
