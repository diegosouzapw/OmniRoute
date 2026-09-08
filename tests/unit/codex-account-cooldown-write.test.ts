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

type RecoveryPayload = Record<string, unknown>;
async function seedRecovery() {
  const connection = await seedCodexConnection();
  const oldReset = new Date(Date.now() + 60_000).toISOString();
  const newReset = new Date(Date.now() + 600_000).toISOString();
  const sparkReset = new Date(Date.now() + 900_000).toISOString();
  await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.6-luna-max",
    rateLimitedUntil: oldReset,
    quotaPreflightWindow: { name: "session", windowSeconds: 604800 },
  });
  await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.3-codex-spark",
    rateLimitedUntil: sparkReset,
  });
  const window = {
    used_percent: 14,
    reset_at: Date.parse(newReset) / 1000,
    limit_window_seconds: 604800,
  };
  const payload: RecoveryPayload = {
    plan_type: "pro",
    rate_limit: {
      limit_reached: false,
      primary_window: window,
      secondary_window: null,
    },
  };
  return { connection, oldReset, newReset, sparkReset, window, payload };
}

async function fetchRecovery(
  id: string,
  payload: RecoveryPayload,
  duringFetch?: () => Promise<void>
) {
  const originalFetch = globalThis.fetch;
  let requests = 0;
  globalThis.fetch = async (input) => {
    assert.equal(String(input), "https://chatgpt.com/backend-api/wham/usage");
    requests++;
    await duringFetch?.();
    return Response.json(payload);
  };
  try {
    const limits = await import("../../src/lib/usage/providerLimits.ts");
    return await limits.fetchLiveProviderLimits(id);
  } finally {
    globalThis.fetch = originalFetch;
    assert.equal(requests, 1);
  }
}

test("fresh same-scope usage after the recorded preflight window advances retires only that fallback", async () => {
  const { connection, payload, sparkReset } = await seedRecovery();
  const before = await readConnection(connection.id);
  await fetchRecovery(connection.id, payload);
  const after = await readConnection(connection.id);
  assert.deepEqual(after.providerSpecificData.codexScopeRateLimitedUntil, { spark: sparkReset });
  assert.deepEqual(after.providerSpecificData.codexScopeRateLimitSource, { spark: "fallback" });
  assert.deepEqual(
    (after.providerSpecificData as Record<string, unknown>).codexScopePreflightWindow,
    {}
  );
  for (const key of ["testStatus", "rateLimitedUntil", "errorCode", "backoffLevel"] as const)
    assert.equal(after[key], before[key]);
  assert.deepEqual(after.providerSpecificData.unrelated, before.providerSpecificData.unrelated);
  const { captureCodexScopeRecovery } =
    await import("../../src/lib/db/providers/codexAccountState.ts");
  assert.equal(captureCodexScopeRecovery(after as unknown as Record<string, unknown>), null);
});

for (const variant of ["recent429", "quota_reset", "quota_response"] as const) {
  test(`ordinary ${variant} invalidates preflight provenance and healthy usage cannot erase its block`, async () => {
    const { connection, payload, oldReset } = await seedRecovery();
    const state = await import("../../src/lib/db/providers/codexAccountState.ts");
    if (variant === "recent429")
      await codexAccount.persistCodexChildCooldown({
        connectionId: connection.id,
        model: "gpt-5.6-luna-max",
        rateLimitedUntil: oldReset,
      });
    else
      await state.updateCodexScopedQuotaState(
        connection.id,
        "codex",
        variant === "quota_reset"
          ? { rateLimitedUntil: oldReset, rateLimitSource: "quota_reset" }
          : { quotaState: { observedAt: new Date().toISOString() } }
      );
    const before = await readConnection(connection.id);
    assert.deepEqual(
      (before.providerSpecificData as Record<string, unknown>).codexScopePreflightWindow,
      {}
    );
    await fetchRecovery(connection.id, payload);
    assert.deepEqual(
      (await readConnection(connection.id)).providerSpecificData,
      before.providerSpecificData
    );
  });
}

for (const mutation of [
  "missingFlag",
  "stringFlag",
  "exhaustedFlag",
  "missingUsed",
  "stringUsed",
  "negativeUsed",
  "missingReset",
  "missingDuration",
  "missingSecondary",
  "missingPrimary",
  "bothNull",
  "secondExhausted",
  "sameReset",
  "differentDuration",
] as const) {
  test(`uncertain or nonadvanced raw quota ${mutation} preserves the scoped refusal`, async () => {
    const { connection, payload, window, oldReset } = await seedRecovery();
    const rate = payload.rate_limit as Record<string, unknown>;
    if (mutation === "missingFlag") delete rate.limit_reached;
    if (mutation === "stringFlag") rate.limit_reached = "false";
    if (mutation === "exhaustedFlag") rate.limit_reached = true;
    if (mutation === "missingUsed") delete (window as Partial<typeof window>).used_percent;
    if (mutation === "stringUsed") (window as Record<string, unknown>).used_percent = "14";
    if (mutation === "negativeUsed") window.used_percent = -1;
    if (mutation === "missingReset") delete (window as Partial<typeof window>).reset_at;
    if (mutation === "missingDuration")
      delete (window as Partial<typeof window>).limit_window_seconds;
    if (mutation === "missingSecondary") delete rate.secondary_window;
    if (mutation === "missingPrimary") delete rate.primary_window;
    if (mutation === "bothNull") rate.primary_window = null;
    if (mutation === "secondExhausted") rate.secondary_window = { ...window, used_percent: 100 };
    if (mutation === "sameReset") window.reset_at = Date.parse(oldReset) / 1000;
    if (mutation === "differentDuration") window.limit_window_seconds = 18000;
    const before = await readConnection(connection.id);
    await fetchRecovery(connection.id, payload);
    const after = await readConnection(connection.id);
    assert.deepEqual(after.providerSpecificData, before.providerSpecificData);
  });
}

test("a healthy unchanged second window and review/Spark siblings do not prevent normal-window recovery", async () => {
  const { connection, payload, window, oldReset, sparkReset } = await seedRecovery();
  (payload.rate_limit as Record<string, unknown>).secondary_window = {
    ...window,
    limit_window_seconds: 18000,
    reset_at: Date.parse(oldReset) / 1000,
  };
  payload.code_review_rate_limit = { limit_reached: true };
  payload.additional_rate_limits = [
    { limit_name: "GPT-5.3-Codex-Spark", rate_limit: { limit_reached: true } },
  ];
  await fetchRecovery(connection.id, payload);
  assert.deepEqual(
    (await readConnection(connection.id)).providerSpecificData.codexScopeRateLimitedUntil,
    { spark: sparkReset }
  );
});

for (const level of ["connection", "provider", "global"] as const) {
  test(`${level} effective remaining-quota cutoff still blocks recovery`, async () => {
    const { connection, payload } = await seedRecovery();
    if (level === "connection")
      await providersDb.updateProviderConnection(connection.id, {
        quotaWindowThresholds: { session: 90 },
      });
    else {
      const { updateSettings } = await import("../../src/lib/db/settings.ts");
      await updateSettings({
        resilienceSettings: {
          quotaPreflight:
            level === "provider"
              ? { providerWindowDefaults: { codex: { session: 90 } } }
              : { defaultThresholdPercent: 90 },
        },
      });
    }
    const before = await readConnection(connection.id);
    await fetchRecovery(connection.id, payload);
    assert.deepEqual(
      (await readConnection(connection.id)).providerSpecificData,
      before.providerSpecificData
    );
  });
}

for (const mutation of ["credentials", "policy", "sameUntil429"] as const) {
  test(`concurrent ${mutation} changes defeat the captured row/policy CAS`, async () => {
    const { connection, payload, oldReset } = await seedRecovery();
    await fetchRecovery(connection.id, payload, async () => {
      if (mutation === "credentials")
        await providersDb.updateProviderConnection(connection.id, {
          accessToken: "changed-test-token",
        });
      if (mutation === "policy") {
        const { updateSettings } = await import("../../src/lib/db/settings.ts");
        await updateSettings({
          resilienceSettings: { quotaPreflight: { defaultThresholdPercent: 3 } },
        });
      }
      if (mutation === "sameUntil429")
        await codexAccount.persistCodexChildCooldown({
          connectionId: connection.id,
          model: "gpt-5.6-luna-max",
          rateLimitedUntil: oldReset,
        });
    });
    assert.equal(
      (await readConnection(connection.id)).providerSpecificData.codexScopeRateLimitedUntil.codex,
      oldReset
    );
  });
}

test("expired observations and display-only quota objects cannot authorize recovery", async () => {
  const { connection, payload, oldReset } = await seedRecovery();
  const state = await import("../../src/lib/db/providers/codexAccountState.ts");
  const evidence = await import("../../open-sse/services/usage/codexRecoveryEvidence.ts");
  const observed = state.captureCodexScopeRecovery(
    await providersDb.getProviderConnectionById(connection.id)
  );
  assert.ok(observed);
  assert.equal(
    evidence.getCodexRecoveryEvidence({ limitReached: false, quotas: { session: { used: 0 } } }),
    null
  );
  assert.equal(state.reconcileCodexScopeRecovery(observed, null), false);
  const usage = {};
  evidence.retainCodexRecoveryEvidence(payload, usage);
  assert.equal(
    state.reconcileCodexScopeRecovery(
      { ...observed, startedAt: observed.startedAt - 31_000 },
      evidence.getCodexRecoveryEvidence(usage)
    ),
    false
  );
  assert.equal(
    (await readConnection(connection.id)).providerSpecificData.codexScopeRateLimitedUntil.codex,
    oldReset
  );
});

test("actual Codex quota parsing and preflight preserve the blocking window identity through persistence", async () => {
  const { connection, oldReset } = await seedRecovery();
  const { fetchCodexQuota } = await import("../../open-sse/services/codexQuotaFetcher.ts");
  const { registerQuotaFetcher, preflightQuota } =
    await import("../../open-sse/services/quotaPreflight.ts");
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    Response.json({
      rate_limit: {
        limit_reached: false,
        primary_window: {
          used_percent: 95,
          reset_at: Date.parse(oldReset) / 1000,
          limit_window_seconds: 604800,
        },
        secondary_window: null,
      },
    });
  let quota;
  try {
    quota = await fetchCodexQuota(connection.id, {
      accessToken: "test-token",
      requestedModel: "gpt-5.6-luna-max",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.ok(quota);
  registerQuotaFetcher("codex-recovery-test", async () => quota);
  const blocked = await preflightQuota(
    "codex-recovery-test",
    connection.id,
    {},
    {
      resolveMinRemainingPercent: () => 10,
    }
  );
  assert.equal(blocked.proceed, false);
  assert.equal(blocked.resetAt, oldReset);
  assert.deepEqual(blocked.blockingWindow, { name: "session", windowSeconds: 604800 });
  await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.6-luna-max",
    rateLimitedUntil: oldReset,
    quotaPreflightWindow: blocked.blockingWindow,
  });
  const data = (await readConnection(connection.id)).providerSpecificData as Record<
    string,
    unknown
  >;
  assert.deepEqual((data.codexScopePreflightWindow as Record<string, unknown>).codex, {
    name: "session",
    windowSeconds: 604800,
    resetAt: oldReset,
  });
});

test("connection cutoff takes precedence over restrictive provider/global defaults", async () => {
  const { connection, payload, sparkReset } = await seedRecovery();
  const { updateSettings } = await import("../../src/lib/db/settings.ts");
  await updateSettings({
    resilienceSettings: {
      quotaPreflight: {
        defaultThresholdPercent: 95,
        providerWindowDefaults: { codex: { session: 90 } },
      },
    },
  });
  await providersDb.updateProviderConnection(connection.id, {
    quotaWindowThresholds: { session: 10 },
  });
  await fetchRecovery(connection.id, payload);
  assert.deepEqual(
    (await readConnection(connection.id)).providerSpecificData.codexScopeRateLimitedUntil,
    { spark: sparkReset }
  );
});

test("new preflight persistence cannot reclassify a still authoritative quota reset", async () => {
  const { connection, payload, oldReset } = await seedRecovery();
  const { updateCodexScopedQuotaState } =
    await import("../../src/lib/db/providers/codexAccountState.ts");
  await updateCodexScopedQuotaState(connection.id, "codex", {
    rateLimitedUntil: oldReset,
    rateLimitSource: "quota_reset",
  });
  await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.6-luna-max",
    rateLimitedUntil: oldReset,
    quotaPreflightWindow: { name: "session", windowSeconds: 604800 },
  });
  const before = await readConnection(connection.id);
  assert.deepEqual(
    (before.providerSpecificData as Record<string, unknown>).codexScopePreflightWindow,
    {}
  );
  await fetchRecovery(connection.id, payload);
  assert.deepEqual(
    (await readConnection(connection.id)).providerSpecificData,
    before.providerSpecificData
  );
});

for (const intervening of ["genuine429", "newerPreflight"] as const) {
  test(`late public-auth preflight cannot overwrite an intervening ${intervening}`, async () => {
    const connection = await seedCodexConnection();
    await providersDb.updateProviderConnection(connection.id, {
      providerSpecificData: { quotaPreflightEnabled: true },
    });
    const { registerQuotaFetcher } = await import("../../open-sse/services/quotaPreflight.ts");
    const { getProviderCredentialsWithQuotaPreflight } =
      await import("../../src/sse/services/auth.ts");
    const oldReset = Date.now() + 60_000;
    const currentReset = intervening === "newerPreflight" ? oldReset + 600_000 : oldReset;
    const currentIso = new Date(currentReset).toISOString();
    let calls = 0;
    let currentMetadata: unknown;
    registerQuotaFetcher("codex", async () => {
      calls++;
      await codexAccount.persistCodexChildCooldown({
        connectionId: connection.id,
        model: "gpt-5.6-luna-max",
        rateLimitedUntil: currentIso,
        ...(intervening === "newerPreflight"
          ? { quotaPreflightWindow: { name: "session", windowSeconds: 18000 } }
          : {}),
      });
      currentMetadata = (await readConnection(connection.id)).providerSpecificData;
      return {
        used: 100,
        total: 100,
        percentUsed: 1,
        resetAt: new Date(oldReset).toISOString(),
        windows: {
          session: {
            percentUsed: 1,
            resetAt: new Date(oldReset).toISOString(),
            windowSeconds: 18000,
          },
        },
      };
    });
    const result = await getProviderCredentialsWithQuotaPreflight(
      "codex",
      null,
      null,
      "gpt-5.6-luna-max"
    );
    assert.equal(result.allRateLimited, true);
    assert.equal(calls, 1);
    assert.deepEqual((await readConnection(connection.id)).providerSpecificData, currentMetadata);
    await fetchRecovery(connection.id, {
      rate_limit: {
        limit_reached: false,
        primary_window: {
          used_percent: 10,
          reset_at: (oldReset + 600_000) / 1000,
          limit_window_seconds: 18000,
        },
        secondary_window: null,
      },
    });
    assert.equal(
      (await readConnection(connection.id)).providerSpecificData.codexScopeRateLimitedUntil.codex,
      currentIso
    );
  });
}

for (const malformed of ["not-a-date", null, 12, { unknown: true }] as const) {
  test(`late preflight preserves malformed scoped deadline ${JSON.stringify(malformed)} without a row write`, async () => {
    const connection = await seedCodexConnection();
    await providersDb.updateProviderConnection(connection.id, {
      providerSpecificData: {
        codexScopeRateLimitedUntil: { codex: malformed },
        codexScopeRateLimitSource: { codex: "fallback" },
        unrelated: { keep: true },
      },
    });
    const before = core
      .getDbInstance()
      .prepare("SELECT * FROM provider_connections WHERE id = ?")
      .get(connection.id);
    await codexAccount.persistCodexChildCooldown({
      connectionId: connection.id,
      model: "gpt-5.6-luna-max",
      rateLimitedUntil: new Date(Date.now() + 600_000).toISOString(),
      quotaPreflightWindow: { name: "session", windowSeconds: 18000 },
    });
    assert.deepEqual(
      core
        .getDbInstance()
        .prepare("SELECT * FROM provider_connections WHERE id = ?")
        .get(connection.id),
      before
    );
  });
}

test("validly expired scoped refusal permits fresh preflight provenance", async () => {
  const connection = await seedCodexConnection();
  await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.6-luna-max",
    rateLimitedUntil: new Date(Date.now() - 60_000).toISOString(),
  });
  const until = new Date(Date.now() + 600_000).toISOString();
  await codexAccount.persistCodexChildCooldown({
    connectionId: connection.id,
    model: "gpt-5.6-luna-max",
    rateLimitedUntil: until,
    quotaPreflightWindow: { name: "session", windowSeconds: 18000 },
  });
  const after = await readConnection(connection.id);
  assert.equal(after.providerSpecificData.codexScopeRateLimitedUntil.codex, until);
  assert.deepEqual(
    (
      (after.providerSpecificData as Record<string, unknown>).codexScopePreflightWindow as Record<
        string,
        unknown
      >
    ).codex,
    { name: "session", windowSeconds: 18000, resetAt: until }
  );
});

for (const malformedMap of [null, [], "unknown"] as const) {
  test(`preflight preserves an unknown scope map ${JSON.stringify(malformedMap)}`, async () => {
    const connection = await seedCodexConnection();
    await providersDb.updateProviderConnection(connection.id, {
      providerSpecificData: { codexScopeRateLimitedUntil: malformedMap, unrelated: { keep: true } },
    });
    const before = core
      .getDbInstance()
      .prepare("SELECT * FROM provider_connections WHERE id = ?")
      .get(connection.id);
    await codexAccount.persistCodexChildCooldown({
      connectionId: connection.id,
      model: "gpt-5.6-luna-max",
      rateLimitedUntil: new Date(Date.now() + 600_000).toISOString(),
      quotaPreflightWindow: { name: "session", windowSeconds: 18000 },
    });
    assert.deepEqual(
      core
        .getDbInstance()
        .prepare("SELECT * FROM provider_connections WHERE id = ?")
        .get(connection.id),
      before
    );
  });
}
