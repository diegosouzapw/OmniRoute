import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-autopilot-"));
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
const comboAutopilot = await import("../../src/lib/monitoring/comboHealthAutopilot.ts");
const route = await import("../../src/app/api/usage/combo-health-autopilot/route.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");

async function resetStorage() {
  comboMetrics.resetAllComboMetrics();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "combo-autopilot-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

async function seedDegradedCombo() {
  const comboInput = {
    name: "combo-autopilot-degraded",
    strategy: "priority",
    models: [
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "combo-autopilot-conn-a",
        label: "Autopilot A",
      },
      {
        kind: "model",
        providerId: "anthropic",
        model: "anthropic/claude-3-5-haiku",
        connectionId: "combo-autopilot-conn-b",
        label: "Autopilot B",
      },
    ],
  };
  const combo = await combosDb.createCombo(comboInput);
  const firstStep = normalizeComboStep(comboInput.models[0], {
    comboName: comboInput.name,
    index: 0,
  });

  for (let index = 0; index < 5; index += 1) {
    await callLogs.saveCallLog({
      id: `combo-autopilot-log-${index}`,
      timestamp: new Date(Date.now() - index * 60_000).toISOString(),
      method: "POST",
      path: "/v1/chat/completions",
      status: 503,
      model: "openai/gpt-4o-mini",
      requestedModel: comboInput.name,
      provider: "openai",
      connectionId: "combo-autopilot-conn-a",
      duration: 500,
      comboName: comboInput.name,
      comboStepId: firstStep.id,
      comboExecutionKey: firstStep.id,
      error: "upstream unavailable",
    });
  }

  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: "combo-autopilot-conn-a",
    window_key: "daily",
    remaining_percentage: 3,
    is_exhausted: 0,
    next_reset_at: null,
    window_duration_ms: 86_400_000,
    raw_data: null,
  });

  return { combo, comboInput, firstStep };
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

test("combo health autopilot reports degraded combo issues and manual actions", async () => {
  const { combo } = await seedDegradedCombo();

  const report = await comboAutopilot.buildComboHealthAutopilotReport({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
    includeHealthy: true,
  });

  assert.equal(report.summary.comboCount, 1);
  assert.equal(report.status, "critical");
  assert.equal(report.combos.length, 1);
  assert.equal(report.combos[0].state, "down");
  assert.ok(report.combos[0].score < 100);

  const issueKinds = new Set(report.combos[0].issues.map((issue) => issue.kind));
  assert.equal(issueKinds.has("combo_low_success_rate"), true);
  assert.equal(issueKinds.has("target_low_success_rate"), true);
  assert.equal(issueKinds.has("target_last_error"), true);
  assert.equal(issueKinds.has("target_low_quota"), true);
  assert.ok(report.combos[0].issues.some((issue) => issue.actions.length > 0));
});

test("combo health autopilot supports report-only mode without actions", async () => {
  const { combo } = await seedDegradedCombo();

  const report = await comboAutopilot.buildComboHealthAutopilotReport({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
    includeHealthy: true,
    includeActions: false,
  });

  assert.equal(report.combos.length, 1);
  assert.ok(report.combos[0].issues.length > 0);
  assert.equal(
    report.combos[0].issues.every((issue) => issue.actions.length === 0),
    true
  );
});

test("combo health autopilot route requires auth, validates query, and returns 404", async () => {
  await enableManagementAuth();
  const { combo } = await seedDegradedCombo();

  const unauthenticated = await route.GET(
    new Request(`http://localhost/api/usage/combo-health-autopilot?comboId=${combo.id}`)
  );
  assert.equal(unauthenticated.status, 401);

  const invalid = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/combo-health-autopilot?range=bad"
    )
  );
  assert.equal(invalid.status, 400);

  const missing = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/combo-health-autopilot?comboId=11111111-1111-4111-8111-111111111111"
    )
  );
  assert.equal(missing.status, 404);

  const authenticated = await route.GET(
    await makeManagementSessionRequest(
      `http://localhost/api/usage/combo-health-autopilot?range=24h&horizon=7d&includeActions=false&comboId=${combo.id}`
    )
  );
  assert.equal(authenticated.status, 200);
  const body = await authenticated.json();
  assert.equal(body.summary.comboCount, 1);
  assert.equal(
    body.combos[0].issues.every((issue: { actions: unknown[] }) => issue.actions.length === 0),
    true
  );
});
