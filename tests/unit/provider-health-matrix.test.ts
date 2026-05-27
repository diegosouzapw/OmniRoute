import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-health-matrix-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const matrix = await import("../../src/lib/monitoring/providerHealthMatrix.ts");
const route = await import("../../src/app/api/providers/health-matrix/route.ts");
const accountFallback = await import("@omniroute/open-sse/services/accountFallback");

const PROVIDER = "matrix-test-provider";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  for (const lockout of accountFallback.getAllModelLockouts()) {
    if (lockout.provider === PROVIDER) {
      accountFallback.clearModelLock(lockout.provider, lockout.connectionId, lockout.model);
    }
  }
  accountFallback.clearProviderFailure(PROVIDER);
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "matrix-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
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
});

test("provider health matrix combines connections, synced models, logs and lockouts", async () => {
  const connection = (await providersDb.createProviderConnection({
    id: "matrix-connection",
    provider: PROVIDER,
    authType: "apikey",
    name: "matrix-key",
    apiKey: "test-key",
    isActive: true,
    testStatus: "unavailable",
    lastErrorType: "upstream_rate_limited",
    errorCode: "429",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  })) as Record<string, unknown>;
  const connectionId = String(connection.id);

  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, connectionId, [
    { id: "matrix-model", name: "Matrix Model" },
    { id: "matrix-locked-model", name: "Matrix Locked Model" },
  ]);
  const startedAt = Date.now();
  await callLogs.saveCallLog({
    id: "matrix-log-ok",
    timestamp: new Date(startedAt).toISOString(),
    status: 200,
    provider: PROVIDER,
    connectionId,
    model: "matrix-model",
    duration: 120,
  });
  await callLogs.saveCallLog({
    id: "matrix-log-error",
    timestamp: new Date(startedAt + 1_000).toISOString(),
    status: 503,
    provider: PROVIDER,
    connectionId,
    model: "matrix-model",
    duration: 240,
    error: "upstream unavailable",
  });
  accountFallback.lockModel(
    PROVIDER,
    connectionId,
    "matrix-locked-model",
    "quota_exhausted",
    60_000,
    {}
  );

  const report = await matrix.buildProviderHealthMatrix({
    provider: PROVIDER,
    range: "24h",
    includeHealthy: true,
  });

  assert.equal(report.summary.providerCount, 1);
  assert.equal(report.summary.connectionCount, 1);
  assert.equal(report.summary.modelCount, 2);
  assert.ok(report.summary.issueCount >= 2);

  const provider = report.providers[0];
  assert.equal(provider.provider, PROVIDER);
  assert.equal(provider.state, "degraded");
  assert.equal(provider.connections.cooldown, 1);
  assert.equal(provider.modelLockoutCount, 1);
  assert.equal(provider.requests, 2);
  assert.equal(provider.successRate, 50);

  const account = provider.accounts[0];
  assert.equal(account.state, "degraded");
  assert.equal(account.lastErrorType, "upstream_rate_limited");
  assert.ok(account.cooldownRemainingMs > 0);

  const model = account.models.find((candidate) => candidate.model === "matrix-model");
  assert.ok(model);
  assert.equal(model.requests, 2);
  assert.equal(model.status, "error");
  assert.equal(model.successRate, 50);

  const locked = account.models.find((candidate) => candidate.model === "matrix-locked-model");
  assert.ok(locked);
  assert.equal(locked.status, "locked");
  assert.equal(locked.lockoutReason, "quota_exhausted");
});

test("provider health matrix treats recovered models as degraded instead of error", async () => {
  const connection = (await providersDb.createProviderConnection({
    id: "matrix-recovered-connection",
    provider: PROVIDER,
    authType: "apikey",
    name: "matrix-key",
    apiKey: "test-key",
    isActive: true,
  })) as Record<string, unknown>;
  const connectionId = String(connection.id);
  const startedAt = Date.now();

  await callLogs.saveCallLog({
    id: "matrix-recovered-error",
    timestamp: new Date(startedAt).toISOString(),
    status: 503,
    provider: PROVIDER,
    connectionId,
    model: "matrix-recovered-model",
    duration: 240,
    error: "upstream unavailable",
  });
  await callLogs.saveCallLog({
    id: "matrix-recovered-ok",
    timestamp: new Date(startedAt + 1_000).toISOString(),
    status: 200,
    provider: PROVIDER,
    connectionId,
    model: "matrix-recovered-model",
    duration: 120,
  });

  const report = await matrix.buildProviderHealthMatrix({
    provider: PROVIDER,
    range: "24h",
    includeHealthy: true,
  });
  const model = report.providers[0]?.accounts[0]?.models.find(
    (candidate) => candidate.model === "matrix-recovered-model"
  );

  assert.ok(model);
  assert.equal(model.lastStatus, 200);
  assert.equal(model.lastErrorStatus, 503);
  assert.equal(model.successRate, 50);
  assert.equal(model.status, "degraded");
});

test("provider health matrix route requires management auth", async () => {
  await enableManagementAuth();
  await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "matrix-key",
    apiKey: "test-key",
    isActive: true,
  });

  const unauthenticated = await route.GET(
    new Request("http://localhost/api/providers/health-matrix?includeHealthy=true")
  );
  assert.equal(unauthenticated.status, 401);

  const authenticated = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/providers/health-matrix?includeHealthy=true"
    )
  );
  assert.equal(authenticated.status, 200);
  const body = await authenticated.json();
  assert.equal(body.summary.connectionCount, 1);
});

test("provider health matrix route rejects invalid query parameters", async () => {
  await enableManagementAuth();

  const invalidRange = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/providers/health-matrix?range=forever&includeHealthy=true"
    )
  );
  assert.equal(invalidRange.status, 400);

  const invalidBoolean = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/providers/health-matrix?range=24h&includeHealthy=yes"
    )
  );
  assert.equal(invalidBoolean.status, 400);
});
