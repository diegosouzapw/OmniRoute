import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-cooldown-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-cooldown-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const codexAccount = await import("../../open-sse/services/codexAccount/index.ts");
const codexFailover = await import("../../open-sse/handlers/chatCore/codexFailover.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

interface SeededConnection {
  id: string;
  testStatus?: unknown;
  rateLimitedUntil?: unknown;
  lastError?: unknown;
  errorCode?: unknown;
  backoffLevel?: unknown;
  providerSpecificData: Record<string, unknown>;
}

interface PersistedConnection extends SeededConnection {
  providerSpecificData: {
    codexScopeRateLimitedUntil: Record<string, unknown>;
    codexScopeRateLimitSource?: unknown;
    codexQuotaStateByScope?: unknown;
    codexQuotaState?: unknown;
    codexExhaustedWindowByScope?: unknown;
    unrelated?: unknown;
  };
}

async function seedCodexConnection(): Promise<SeededConnection> {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-cooldown-writer",
    email: "codex-cooldown@example.com",
    apiKey: null,
    accessToken: "codex-cooldown-access",
    refreshToken: "codex-cooldown-refresh",
    providerSpecificData: {
      unrelated: { retained: true },
    },
  }) as unknown as Promise<SeededConnection>;
}

async function readConnection(id: string): Promise<PersistedConnection> {
  const connection = await providersDb.getProviderConnectionById(id);
  assert.ok(connection);
  return connection as unknown as PersistedConnection;
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("persisting Codex and Spark child cooldowns retains sibling and unrelated state", async () => {
  const connection = await seedCodexConnection();
  const codexUntil = new Date(Date.now() + 60_000).toISOString();
  const sparkUntil = new Date(Date.now() + 120_000).toISOString();
  const parentBefore = await readConnection(connection.id);

  await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.5",
    rateLimitedUntil: codexUntil,
  });
  const result = await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.3-codex-spark",
    rateLimitedUntil: sparkUntil,
  });
  const persisted = await readConnection(connection.id);

  assert.deepEqual(result.providerSpecificData.codexScopeRateLimitedUntil, {
    codex: codexUntil,
    spark: sparkUntil,
  });
  assert.deepEqual(persisted.providerSpecificData.codexScopeRateLimitedUntil, {
    codex: codexUntil,
    spark: sparkUntil,
  });
  assert.deepEqual(persisted.providerSpecificData.unrelated, { retained: true });
  assert.equal(persisted.testStatus, parentBefore.testStatus);
  assert.equal(persisted.rateLimitedUntil, parentBefore.rateLimitedUntil);
  assert.equal(persisted.errorCode, parentBefore.errorCode);
  assert.equal(persisted.backoffLevel, parentBefore.backoffLevel);
});

test("chatCore failover mirrors persisted child state into the failed credential snapshot", async () => {
  const connection = await seedCodexConnection();
  const parentBefore = await readConnection(connection.id);
  const sparkUntil = new Date(Date.now() + 120_000).toISOString();
  const credentials = {
    connectionId: connection.id,
    providerSpecificData: connection.providerSpecificData,
  };

  await codexFailover.markCodexScopeRateLimited({
    failedConnectionId: connection.id,
    model: "gpt-5.3-codex-spark",
    rateLimitedUntil: sparkUntil,
    credentials,
  });
  const persisted = await readConnection(connection.id);

  assert.equal(persisted.testStatus, parentBefore.testStatus);
  assert.equal(persisted.rateLimitedUntil, parentBefore.rateLimitedUntil);
  assert.equal(persisted.lastError, parentBefore.lastError);
  assert.equal(persisted.errorCode, parentBefore.errorCode);
  assert.equal(persisted.backoffLevel, parentBefore.backoffLevel);
  assert.equal(persisted.providerSpecificData.codexScopeRateLimitedUntil.spark, sparkUntil);
  assert.deepEqual(credentials.providerSpecificData, persisted.providerSpecificData);
});

function quotaHeaders(resetAt5h: string, resetAt7d: string, weeklyUsage = "10") {
  return {
    "x-codex-5h-usage": "95",
    "x-codex-5h-limit": "100",
    "x-codex-5h-reset-at": resetAt5h,
    "x-codex-7d-usage": weeklyUsage,
    "x-codex-7d-limit": "100",
    "x-codex-7d-reset-at": resetAt7d,
  };
}

test("Codex and Spark quota responses retain independent scoped snapshots across restart", async () => {
  const connection = await seedCodexConnection();
  const codexReset5h = new Date(Date.now() + 60_000).toISOString();
  const codexReset7d = new Date(Date.now() + 600_000).toISOString();
  const sparkReset5h = new Date(Date.now() + 120_000).toISOString();
  const sparkReset7d = new Date(Date.now() + 1_200_000).toISOString();

  await codexAccount.persistCodexChildQuotaResponse({
    connectionId: connection.id,
    model: "gpt-5.5",
    headers: quotaHeaders(codexReset5h, codexReset7d),
    status: 200,
  });
  await codexAccount.persistCodexChildQuotaResponse({
    connectionId: connection.id,
    model: "gpt-5.3-codex-spark",
    headers: quotaHeaders(sparkReset5h, sparkReset7d),
    status: 200,
  });

  core.resetDbInstance();
  const persisted = await readConnection(connection.id);
  const byScope = persisted.providerSpecificData.codexQuotaStateByScope as Record<
    string,
    Record<string, unknown>
  >;

  assert.equal(byScope.codex.resetAt5h, codexReset5h);
  assert.equal(byScope.spark.resetAt5h, sparkReset5h);
  assert.equal(
    (persisted.providerSpecificData.codexQuotaState as Record<string, unknown>).scope,
    "spark"
  );
  assert.deepEqual(persisted.providerSpecificData.unrelated, { retained: true });
});

test("concurrent Codex and Spark quota responses retain both scoped snapshots", async () => {
  const connection = await seedCodexConnection();
  const codexReset5h = new Date(Date.now() + 60_000).toISOString();
  const sparkReset5h = new Date(Date.now() + 120_000).toISOString();
  const reset7d = new Date(Date.now() + 600_000).toISOString();

  await Promise.all([
    codexAccount.persistCodexChildQuotaResponse({
      connectionId: connection.id,
      model: "gpt-5.5",
      headers: quotaHeaders(codexReset5h, reset7d),
      status: 200,
    }),
    codexAccount.persistCodexChildQuotaResponse({
      connectionId: connection.id,
      model: "gpt-5.3-codex-spark",
      headers: quotaHeaders(sparkReset5h, reset7d),
      status: 200,
    }),
  ]);
  const persisted = await readConnection(connection.id);
  const byScope = persisted.providerSpecificData.codexQuotaStateByScope as Record<
    string,
    Record<string, unknown>
  >;

  assert.equal(byScope.codex.resetAt5h, codexReset5h);
  assert.equal(byScope.spark.resetAt5h, sparkReset5h);
});

test("header-derived exhausted reset survives fallback cooldown persistence", async () => {
  const connection = await seedCodexConnection();
  const exactReset5h = new Date(Date.now() + 30_000).toISOString();
  const reset7d = new Date(Date.now() + 600_000).toISOString();
  const fallbackUntil = new Date(Date.now() + 60_000).toISOString();

  await codexAccount.persistCodexChildQuotaResponse({
    connectionId: connection.id,
    model: "gpt-5.5",
    headers: quotaHeaders(exactReset5h, reset7d),
    status: 429,
  });
  await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.5",
    rateLimitedUntil: fallbackUntil,
  });
  const persisted = await readConnection(connection.id);

  assert.equal(persisted.providerSpecificData.codexScopeRateLimitedUntil.codex, exactReset5h);
  assert.equal(
    (persisted.providerSpecificData.codexExhaustedWindowByScope as Record<string, unknown>).codex,
    "5h"
  );
  assert.equal(
    (persisted.providerSpecificData.codexScopeRateLimitSource as Record<string, unknown>).codex,
    "quota_reset"
  );
});

test("a successful quota observation clears earlier exhaustion for only that child", async () => {
  const connection = await seedCodexConnection();
  const futureReset5h = new Date(Date.now() + 60_000).toISOString();
  const futureReset7d = new Date(Date.now() + 600_000).toISOString();

  await codexAccount.persistCodexChildQuotaResponse({
    connectionId: connection.id,
    model: "gpt-5.5",
    headers: quotaHeaders(futureReset5h, futureReset7d),
    status: 429,
  });
  await codexAccount.persistCodexChildQuotaResponse({
    connectionId: connection.id,
    model: "gpt-5.3-codex-spark",
    headers: quotaHeaders(futureReset5h, futureReset7d),
    status: 429,
  });
  await codexAccount.persistCodexChildQuotaResponse({
    connectionId: connection.id,
    model: "gpt-5.5",
    headers: quotaHeaders(futureReset5h, futureReset7d),
    status: 200,
  });

  const persisted = await readConnection(connection.id);
  const exhaustedByScope = persisted.providerSpecificData.codexExhaustedWindowByScope as Record<
    string,
    unknown
  >;

  assert.equal(exhaustedByScope.codex, undefined);
  assert.equal(exhaustedByScope.spark, "5h");
});

test("a newer fallback supersedes an expired authoritative reset", async () => {
  const connection = await seedCodexConnection();
  const expiredReset = new Date(Date.now() - 60_000).toISOString();
  const fallbackUntil = new Date(Date.now() + 60_000).toISOString();
  await providersDb.updateCodexScopedQuotaState(connection.id, "codex", {
    rateLimitedUntil: expiredReset,
    rateLimitSource: "quota_reset",
  });

  await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.5",
    rateLimitedUntil: fallbackUntil,
  });
  const persisted = await readConnection(connection.id);

  assert.equal(persisted.providerSpecificData.codexScopeRateLimitedUntil.codex, fallbackUntil);
  assert.equal(
    (persisted.providerSpecificData.codexScopeRateLimitSource as Record<string, unknown>).codex,
    "fallback"
  );
});

test("concurrent Codex and Spark child cooldown writes retain both scopes", async () => {
  const connection = await seedCodexConnection();
  const codexUntil = new Date(Date.now() + 60_000).toISOString();
  const sparkUntil = new Date(Date.now() + 120_000).toISOString();

  await Promise.all([
    codexAccount.persistCodexChildCooldown({
      connectionId: connection.id,
      model: "gpt-5.5",
      rateLimitedUntil: codexUntil,
    }),
    codexAccount.persistCodexChildCooldown({
      connectionId: connection.id,
      model: "gpt-5.3-codex-spark",
      rateLimitedUntil: sparkUntil,
    }),
  ]);
  const persisted = await readConnection(connection.id);

  assert.deepEqual(persisted.providerSpecificData.codexScopeRateLimitedUntil, {
    codex: codexUntil,
    spark: sparkUntil,
  });
  assert.deepEqual(persisted.providerSpecificData.unrelated, { retained: true });
});
