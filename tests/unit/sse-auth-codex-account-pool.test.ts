import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sse-auth-codex-pool-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "sse-auth-codex-pool-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function futureIso(ms = 60_000) {
  return new Date(Date.now() + ms).toISOString();
}

async function seedCodexConnection(overrides: Record<string, unknown>) {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    apiKey: null,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
    ...overrides,
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Codex Spark preflight cooldown leaves normal models on the same parent selectable", async () => {
  const resetAt = futureIso(120_000);
  const connection = await seedCodexConnection({
    name: "codex-scoped-preflight",
    email: "codex-preflight@example.com",
    accessToken: "codex-preflight-access",
    refreshToken: "codex-preflight-refresh",
    providerSpecificData: {
      quotaPreflightEnabled: true,
    },
  });
  const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");
  quotaPreflight.registerQuotaFetcher("codex", async (_connectionId, credentials) => {
    const isSpark = String((credentials as { requestedModel?: unknown }).requestedModel).includes(
      "spark"
    );
    return {
      used: isSpark ? 100 : 20,
      total: 100,
      percentUsed: isSpark ? 1 : 0.2,
      resetAt: isSpark ? resetAt : null,
      windows: {
        session: { percentUsed: isSpark ? 1 : 0.2, resetAt: isSpark ? resetAt : null },
      },
    };
  });

  const spark = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.3-codex-spark"
  );
  const normal = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.5"
  );
  const persisted = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(spark.allRateLimited, true);
  assert.equal(normal.connectionId, connection.id);
  assert.equal(persisted.rateLimitedUntil, undefined);
  assert.equal(persisted.testStatus, "active");
  assert.equal(persisted.providerSpecificData.codexScopeRateLimitedUntil.spark, resetAt);
});

test("Codex preflight skips a blocked parent and selects a healthy sibling parent", async () => {
  const resetAt = futureIso(120_000);
  const blocked = await seedCodexConnection({
    name: "codex-preflight-blocked-parent",
    email: "codex-preflight-blocked@example.com",
    accessToken: "codex-preflight-blocked-access",
    refreshToken: "codex-preflight-blocked-refresh",
    priority: 1,
    providerSpecificData: { quotaPreflightEnabled: true },
  });
  const healthy = await seedCodexConnection({
    name: "codex-preflight-healthy-parent",
    email: "codex-preflight-healthy@example.com",
    accessToken: "codex-preflight-healthy-access",
    refreshToken: "codex-preflight-healthy-refresh",
    priority: 2,
    providerSpecificData: { quotaPreflightEnabled: true },
  });
  const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");
  const preflightCalls: string[] = [];
  quotaPreflight.registerQuotaFetcher("codex", async (connectionId) => {
    preflightCalls.push(connectionId);
    return {
      used: connectionId === blocked.id ? 100 : 20,
      total: 100,
      percentUsed: connectionId === blocked.id ? 1 : 0.2,
      resetAt: connectionId === blocked.id ? resetAt : null,
      windows: {
        session: {
          percentUsed: connectionId === blocked.id ? 1 : 0.2,
          resetAt: connectionId === blocked.id ? resetAt : null,
        },
      },
    };
  });

  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.3-codex-spark"
  );
  const blockedAfter = await providersDb.getProviderConnectionById(blocked.id);

  assert.equal(selected.connectionId, healthy.id);
  assert.deepEqual(preflightCalls, [blocked.id, healthy.id]);
  assert.equal(blockedAfter.rateLimitedUntil, undefined);
  assert.equal(blockedAfter.testStatus, "active");
  assert.equal(blockedAfter.providerSpecificData.codexScopeRateLimitedUntil.spark, resetAt);
});

test("Codex preflight returns allRateLimited only after checking every exhausted parent", async () => {
  const resetAt = futureIso(120_000);
  const first = await seedCodexConnection({
    name: "codex-preflight-exhausted-first",
    email: "codex-preflight-exhausted-first@example.com",
    accessToken: "codex-preflight-exhausted-first-access",
    refreshToken: "codex-preflight-exhausted-first-refresh",
    priority: 1,
    providerSpecificData: { quotaPreflightEnabled: true },
  });
  const second = await seedCodexConnection({
    name: "codex-preflight-exhausted-second",
    email: "codex-preflight-exhausted-second@example.com",
    accessToken: "codex-preflight-exhausted-second-access",
    refreshToken: "codex-preflight-exhausted-second-refresh",
    priority: 2,
    providerSpecificData: { quotaPreflightEnabled: true },
  });
  const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");
  const preflightCalls: string[] = [];
  quotaPreflight.registerQuotaFetcher("codex", async (connectionId) => {
    preflightCalls.push(connectionId);
    return {
      used: 100,
      total: 100,
      percentUsed: 1,
      resetAt,
      windows: { session: { percentUsed: 1, resetAt } },
    };
  });

  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.3-codex-spark"
  );
  const firstAfter = await providersDb.getProviderConnectionById(first.id);
  const secondAfter = await providersDb.getProviderConnectionById(second.id);

  assert.equal(selected.allRateLimited, true);
  assert.deepEqual(preflightCalls, [first.id, second.id]);
  for (const connection of [firstAfter, secondAfter]) {
    assert.equal(connection.rateLimitedUntil, undefined);
    assert.equal(connection.testStatus, "active");
    assert.equal(connection.providerSpecificData.codexScopeRateLimitedUntil.spark, resetAt);
  }
});

test("getProviderCredentials reports cooldown only from the forced Codex parent", async () => {
  const earlierRetryAfter = futureIso(60_000);
  const forcedRetryAfter = futureIso(120_000);
  await seedCodexConnection({
    name: "codex-earlier-spark-cooldown",
    email: "codex-earlier@example.com",
    accessToken: "codex-earlier-access",
    refreshToken: "codex-earlier-refresh",
    providerSpecificData: {
      codexScopeRateLimitedUntil: { spark: earlierRetryAfter },
    },
  });
  const forced = await seedCodexConnection({
    name: "codex-forced-spark-cooldown",
    email: "codex-forced@example.com",
    accessToken: "codex-forced-access",
    refreshToken: "codex-forced-refresh",
    providerSpecificData: {
      codexScopeRateLimitedUntil: { spark: forcedRetryAfter },
    },
  });

  const selected = await auth.getProviderCredentials("codex", null, null, "codex-spark-mini", {
    forcedConnectionId: forced.id,
  });

  assert.equal(selected.allRateLimited, true);
  assert.equal(selected.connectionsCount, 1);
  assert.equal(selected.retryAfter, forcedRetryAfter);
});

test("Codex parent authentication failures block both virtual children without child rows", async () => {
  const connection = await seedCodexConnection({
    name: "codex-parent-auth-failure",
    email: "codex-parent-auth-failure@example.com",
    accessToken: "codex-parent-auth-access",
    refreshToken: "codex-parent-auth-refresh",
  });

  const unavailable = await auth.markAccountUnavailable(
    connection.id,
    401,
    "invalid authentication token",
    "codex",
    "gpt-5.3-codex-spark"
  );
  const spark = await auth.getProviderCredentials("codex", null, null, "gpt-5.3-codex-spark");
  const normal = await auth.getProviderCredentials("codex", null, null, "gpt-5.5");
  const inventory = await providersDb.getProviderConnections({ provider: "codex" });

  assert.equal(unavailable.shouldFallback, true);
  assert.equal(spark, null);
  assert.equal(normal, null);
  assert.deepEqual(
    inventory.map((item) => item.id),
    [connection.id]
  );
});

test("markAccountUnavailable stores Codex scope-specific cooldowns without a global rate limit", async () => {
  const connection = await seedCodexConnection({
    name: "codex-scope",
    email: "codex@example.com",
    accessToken: "codex-access",
    refreshToken: "codex-refresh",
  });
  const parentBefore = await providersDb.getProviderConnectionById(connection.id);

  const result = await auth.markAccountUnavailable(
    connection.id,
    429,
    "quota reached",
    "codex",
    "codex-spark-mini"
  );
  const updated = await providersDb.getProviderConnectionById(connection.id);
  const selected = await auth.getProviderCredentials("codex", null, null, "codex-spark-mini");
  const normalSelected = await auth.getProviderCredentials("codex", null, null, "gpt-5.3-codex");

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);
  assert.equal(updated.testStatus, parentBefore.testStatus);
  assert.equal(updated.rateLimitedUntil, parentBefore.rateLimitedUntil);
  assert.equal(updated.lastError, parentBefore.lastError);
  assert.equal(updated.errorCode, parentBefore.errorCode);
  assert.equal(updated.backoffLevel, parentBefore.backoffLevel);
  assert.ok(updated.providerSpecificData.codexScopeRateLimitedUntil.spark);
  assert.equal(selected.allRateLimited, true);
  assert.equal(normalSelected.connectionId, connection.id);
});

test("markAccountUnavailable keeps model-less Codex 429 state off the parent", async () => {
  const connection = await seedCodexConnection({
    name: "codex-model-less-429",
    email: "codex-model-less@example.com",
    accessToken: "codex-model-less-access",
    refreshToken: "codex-model-less-refresh",
  });
  const parentBefore = await providersDb.getProviderConnectionById(connection.id);

  const result = await auth.markAccountUnavailable(
    connection.id,
    429,
    "quota reached without model metadata",
    "codex",
    null
  );
  const updated = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);
  assert.equal(updated.testStatus, parentBefore.testStatus);
  assert.equal(updated.rateLimitedUntil, parentBefore.rateLimitedUntil);
  assert.equal(updated.lastError, parentBefore.lastError);
  assert.equal(updated.errorCode, parentBefore.errorCode);
  assert.equal(updated.backoffLevel, parentBefore.backoffLevel);
  assert.deepEqual(updated.providerSpecificData, parentBefore.providerSpecificData);
});
