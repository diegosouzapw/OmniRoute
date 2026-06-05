import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-forecast-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const comboForecast = await import("../../src/lib/usage/comboForecast.ts");
const route = await import("../../src/app/api/usage/combo-forecast/route.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "combo-forecast-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

async function seedPricing() {
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-mini": {
        input: 1,
        output: 2,
        cached: 0.5,
        cache_creation: 1,
        reasoning: 2,
      },
    },
  });
}

async function seedForecastCombo() {
  const comboInput = {
    name: "combo-forecast-structured",
    strategy: "weighted",
    models: [
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "forecast-conn-a",
        label: "Forecast A",
      },
      {
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-4o-mini",
        connectionId: "forecast-conn-b",
        label: "Forecast B",
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
  return { combo, comboInput, firstStep, secondStep };
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

test("combo forecast projects cost and quota risk from combo history", async () => {
  await seedPricing();
  const { combo, comboInput, firstStep, secondStep } = await seedForecastCombo();
  const timestamp = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  await callLogs.saveCallLog({
    id: "combo-forecast-1",
    timestamp,
    status: 200,
    model: "openai/gpt-4o-mini",
    requestedModel: comboInput.name,
    provider: "openai",
    connectionId: "forecast-conn-a",
    tokens: { prompt_tokens: 1_000, completion_tokens: 500 },
    comboName: comboInput.name,
    comboStepId: firstStep.id,
    comboExecutionKey: firstStep.id,
  });
  await callLogs.saveCallLog({
    id: "combo-forecast-2",
    timestamp,
    status: 200,
    model: "openai/gpt-4o-mini",
    requestedModel: comboInput.name,
    provider: "openai",
    connectionId: "forecast-conn-b",
    tokens: { prompt_tokens: 2_000, completion_tokens: 1_000 },
    comboName: comboInput.name,
    comboStepId: secondStep.id,
    comboExecutionKey: secondStep.id,
  });

  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: "forecast-conn-a",
    window_key: "daily",
    remaining_percentage: 90,
    is_exhausted: 0,
    next_reset_at: null,
    window_duration_ms: 86_400_000,
    raw_data: null,
  });
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: "forecast-conn-a",
    window_key: "daily",
    remaining_percentage: 20,
    is_exhausted: 0,
    next_reset_at: null,
    window_duration_ms: 86_400_000,
    raw_data: null,
  });

  const forecast = await comboForecast.buildComboForecastResponse({
    range: "7d",
    horizon: "7d",
    comboId: String(combo.id),
  });

  assert.equal(forecast.combos.length, 1);
  assert.equal(forecast.combos[0].history.requests, 2);
  assert.equal(forecast.combos[0].forecast.projectedRequests, 2);
  assert.ok(forecast.combos[0].history.costUsd > 0);
  assert.equal(forecast.combos[0].dataQuality.pricingCoveragePct, 100);
  assert.equal(forecast.combos[0].targets.length, 2);
  assert.equal(forecast.combos[0].targets[0].quota.scope, "connection");
  assert.notEqual(forecast.combos[0].quotaRisk.level, "unknown");
});

test("combo forecast returns no_data confidence for combos without history", async () => {
  const { combo } = await seedForecastCombo();

  const forecast = await comboForecast.buildComboForecastResponse({
    range: "24h",
    horizon: "7d",
    comboId: String(combo.id),
  });

  assert.equal(forecast.combos.length, 1);
  assert.equal(forecast.combos[0].confidence, "no_data");
  assert.equal(forecast.combos[0].history.requests, 0);
  assert.equal(forecast.combos[0].forecast.projectedCostUsd, 0);
});

test("combo forecast API requires management auth and validates query", async () => {
  await enableManagementAuth();
  const { combo } = await seedForecastCombo();

  const unauthenticated = await route.GET(
    new Request(`http://localhost/api/usage/combo-forecast?comboId=${combo.id}`)
  );
  assert.equal(unauthenticated.status, 401);

  const invalid = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/usage/combo-forecast?range=bad")
  );
  assert.equal(invalid.status, 400);

  const missing = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/usage/combo-forecast?comboId=11111111-1111-4111-8111-111111111111"
    )
  );
  assert.equal(missing.status, 404);

  const authenticated = await route.GET(
    await makeManagementSessionRequest(
      `http://localhost/api/usage/combo-forecast?range=24h&horizon=7d&comboId=${combo.id}`
    )
  );
  assert.equal(authenticated.status, 200);
  const body = await authenticated.json();
  assert.equal(body.combos.length, 1);
});
