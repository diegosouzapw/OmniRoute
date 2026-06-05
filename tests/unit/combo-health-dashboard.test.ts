import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-dashboard-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const comboMetrics = await import("../../open-sse/services/comboMetrics.ts");
const dashboard = await import("../../src/lib/usage/comboHealthDashboard.ts");
const route = await import("../../src/app/api/usage/combo-health-dashboard/route.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");

async function resetStorage() {
  comboMetrics.resetAllComboMetrics();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "combo-dashboard-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

async function seedDashboardCombo() {
  const comboInput = {
    name: "combo-health-dashboard",
    strategy: "auto",
    models: [
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "dashboard-conn-a",
        label: "Dashboard A",
      },
      {
        kind: "model",
        providerId: "anthropic",
        model: "anthropic/claude-3-5-haiku",
        connectionId: "dashboard-conn-b",
        label: "Dashboard B",
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
  const timestamp = new Date(Date.now() - 60_000).toISOString();

  await callLogs.saveCallLog({
    id: "combo-dashboard-log-a",
    timestamp,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4o-mini",
    requestedModel: comboInput.name,
    provider: "openai",
    connectionId: "dashboard-conn-a",
    duration: 120,
    tokens: { prompt_tokens: 100, completion_tokens: 50 },
    comboName: comboInput.name,
    comboStepId: firstStep.id,
    comboExecutionKey: firstStep.id,
  });
  await callLogs.saveCallLog({
    id: "combo-dashboard-log-b",
    timestamp,
    method: "POST",
    path: "/v1/chat/completions",
    status: 503,
    model: "anthropic/claude-3-5-haiku",
    requestedModel: comboInput.name,
    provider: "anthropic",
    connectionId: "dashboard-conn-b",
    duration: 900,
    tokens: { prompt_tokens: 100, completion_tokens: 50 },
    comboName: comboInput.name,
    comboStepId: secondStep.id,
    comboExecutionKey: secondStep.id,
  });

  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: "dashboard-conn-a",
    window_key: "daily",
    remaining_percentage: 80,
    is_exhausted: 0,
    next_reset_at: null,
    window_duration_ms: 86_400_000,
    raw_data: null,
  });

  return { combo };
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

test("combo health dashboard builder reuses shared health and forecast inputs", async () => {
  const { combo } = await seedDashboardCombo();

  const response = await dashboard.buildComboHealthDashboardResponse({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
  });

  assert.equal(response.health.combos.length, 1);
  assert.equal(response.forecast?.combos.length, 1);
  assert.equal(response.autopilot?.summary.comboCount, 1);
  assert.equal(response.scoring?.combos.length, 1);
  assert.deepEqual(response.errors, {});
  assert.equal(response.health.combos[0].targetHealth?.length, 2);
  assert.equal(response.scoring?.combos[0].targets.length, 2);
});

test("combo health dashboard route requires auth, validates query, and returns combined data", async () => {
  await enableManagementAuth();
  const { combo } = await seedDashboardCombo();

  const unauthenticated = await route.GET(
    new Request(`http://localhost/api/usage/combo-health-dashboard?comboId=${combo.id}`)
  );
  assert.equal(unauthenticated.status, 401);

  const invalid = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/combo-health-dashboard?range=bad"
    )
  );
  assert.equal(invalid.status, 400);

  const missing = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/combo-health-dashboard?comboId=11111111-1111-4111-8111-111111111111"
    )
  );
  assert.equal(missing.status, 404);

  const authenticated = await route.GET(
    await makeManagementSessionRequest(
      `http://localhost/api/usage/combo-health-dashboard?range=24h&horizon=7d&comboId=${combo.id}`
    )
  );
  assert.equal(authenticated.status, 200);
  const body = await authenticated.json();
  assert.equal(body.health.combos.length, 1);
  assert.equal(body.forecast.combos.length, 1);
  assert.equal(body.autopilot.summary.comboCount, 1);
  assert.equal(body.scoring.combos.length, 1);
  assert.deepEqual(body.errors, {});
});
