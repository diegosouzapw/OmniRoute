import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-health-matrix-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const callLogs = await import("../../../src/lib/usage/callLogs.ts");
const matrix = await import("../../../src/lib/monitoring/providerHealthMatrix.ts");
const route = await import("../../../src/app/api/providers/health-matrix/route.ts");
const accountFallback = await import("@omniroute/open-sse/services/accountFallback");

const PROVIDER = "matrix-test-provider";
const ALIAS_PROVIDER = "nous";
const CANONICAL_ALIAS_PROVIDER = "nous-research";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  for (const lockout of accountFallback.getAllModelLockouts()) {
    if (lockout.provider === PROVIDER) {
      accountFallback.clearModelLock(lockout.provider, lockout.connectionId, lockout.model);
    }
  }
  accountFallback.clearProviderFailure(PROVIDER);
  accountFallback.clearProviderFailure(ALIAS_PROVIDER);
  accountFallback.clearProviderFailure(CANONICAL_ALIAS_PROVIDER);
  for (const lockout of accountFallback.getAllModelLockouts()) {
    if (lockout.provider === ALIAS_PROVIDER || lockout.provider === CANONICAL_ALIAS_PROVIDER) {
      accountFallback.clearModelLock(lockout.provider, lockout.connectionId, lockout.model);
    }
  }
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

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

test("provider health matrix collapses alias-keyed signals into one canonical provider", async () => {
  const connection = (await providersDb.createProviderConnection({
    id: "matrix-nous-connection",
    provider: CANONICAL_ALIAS_PROVIDER,
    authType: "apikey",
    name: "nous-key",
    apiKey: "test-key",
    isActive: true,
  })) as Record<string, unknown>;
  const connectionId = String(connection.id);

  accountFallback.lockModel(
    ALIAS_PROVIDER,
    connectionId,
    "nous-locked-model",
    "quota_exhausted",
    60_000,
    {}
  );
  accountFallback.recordProviderFailure(ALIAS_PROVIDER, undefined, undefined, {
    failureThreshold: 1,
    resetTimeoutMs: 60_000,
  });

  const report = await matrix.buildProviderHealthMatrix({ includeHealthy: true, range: "24h" });
  const canonicalRows = report.providers.filter(
    (provider) => provider.provider === CANONICAL_ALIAS_PROVIDER
  );

  assert.equal(canonicalRows.length, 1, "the canonical provider must have exactly one health row");
  assert.equal(
    report.providers.some((provider) => provider.provider === ALIAS_PROVIDER),
    false,
    "the alias must not create a duplicate provider row"
  );

  const provider = canonicalRows[0];
  assert.equal(provider.connections.total, 1);
  assert.equal(provider.circuitBreaker?.state, "OPEN");
  assert.equal(provider.modelLockoutCount, 1);
  assert.equal(provider.accounts[0]?.models[0]?.model, "nous-locked-model");
  assert.equal(provider.accounts[0]?.models[0]?.isLockedOut, true);

  const filteredByAlias = await matrix.buildProviderHealthMatrix({
    provider: ALIAS_PROVIDER,
    includeHealthy: true,
    range: "24h",
  });
  assert.equal(filteredByAlias.providers.length, 1);
  assert.equal(filteredByAlias.providers[0]?.provider, CANONICAL_ALIAS_PROVIDER);
  assert.equal(filteredByAlias.providers[0]?.connections.total, 1);
  assert.equal(filteredByAlias.providers[0]?.circuitBreaker?.state, "OPEN");
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
