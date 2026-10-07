import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-limits-recovery-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-provider-limits-recovery-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerLimitsDb = await import("../../src/lib/db/providerLimits.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function withMockedFetch(fetchImpl: typeof fetch, fn: () => Promise<void>) {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    await fn();
  } finally {
    globalThis.fetch = previousFetch;
  }
}

async function createGlmConnectionWithTransientCooldown() {
  return providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Recovery ${Date.now()}`,
    apiKey: "glm-test-key",
    testStatus: "unavailable",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    lastError: "rate limit exceeded",
    lastErrorType: "rate_limited",
    lastErrorSource: "executor",
    errorCode: 429,
    backoffLevel: 2,
  });
}

function glmQuotaResponse() {
  // Mirrors open-sse/services/usage/glm.ts: TOKENS_LIMIT window with remaining.
  return new Response(
    JSON.stringify({
      code: 200,
      success: true,
      data: {
        planName: "max",
        limits: [
          {
            type: "TOKENS_LIMIT",
            unit: 3,
            number: 5,
            percentage: 13,
            nextResetTime: Math.floor(Date.now() / 1000) + 3 * 3600,
            models: [],
          },
        ],
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("successful GLM quota refresh clears transient rate-limit state", async () => {
  // The cooldown must already be EXPIRED for a successful refresh to clear it
  // (#11277: a rateLimitedUntil still in the future is a hard statement from
  // the error handler that persisted it — no quota poll may overrule it,
  // regardless of lastErrorType). Before #11277's fix this test used a
  // still-future rateLimitedUntil and asserted it got cleared anyway, which
  // was the same defect class as the reported bug, just a shorter window.
  const connection = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Recovery ${Date.now()}`,
    apiKey: "glm-test-key",
    testStatus: "unavailable",
    rateLimitedUntil: new Date(Date.now() - 60_000).toISOString(),
    lastError: "rate limit exceeded",
    lastErrorType: "rate_limited",
    lastErrorSource: "executor",
    errorCode: 429,
    backoffLevel: 2,
  });
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch((() => glmQuotaResponse()) as typeof fetch, async () => {
    await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
  });

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(updated.testStatus, "active", "testStatus should be reset to active");
  assert.equal(updated.rateLimitedUntil, undefined, "rateLimitedUntil should be cleared");
  assert.equal(updated.errorCode, undefined, "errorCode should be cleared");
  assert.equal(updated.lastErrorType, undefined, "lastErrorType should be cleared");
  assert.equal(updated.backoffLevel, 0, "backoffLevel should be reset to 0");
});

test("a still-future rateLimitedUntil is not cleared by a successful quota refresh, regardless of lastErrorType (#11277)", async () => {
  const stillFutureRateLimitedUntil = new Date(Date.now() + 60_000).toISOString();
  const connection = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Still Cooling ${Date.now()}`,
    apiKey: "glm-test-key",
    testStatus: "unavailable",
    rateLimitedUntil: stillFutureRateLimitedUntil,
    lastError: "rate limit exceeded",
    lastErrorType: "rate_limited",
    lastErrorSource: "executor",
    errorCode: 429,
    backoffLevel: 2,
  });
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch((() => glmQuotaResponse()) as typeof fetch, async () => {
    await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
  });

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(
    updated.testStatus,
    "unavailable",
    "an active cooldown must stay locked even though the quota fetch succeeded"
  );
  assert.equal(updated.rateLimitedUntil, stillFutureRateLimitedUntil);
});

async function createGlmConnectionWithStatus(status: string) {
  return providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "GLM " + status + " " + Date.now(),
    apiKey: "glm-test-key",
    testStatus: status,
    lastError: "permanent failure",
    lastErrorType: "permanent",
    errorCode: 403,
    backoffLevel: 1,
  });
}

test("successful quota refresh does not clear terminal credits_exhausted status", async () => {
  const connection = await createGlmConnectionWithStatus("credits_exhausted");
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch((() => glmQuotaResponse()) as typeof fetch, async () => {
    await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
  });

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(updated.testStatus, "credits_exhausted");
  assert.equal(updated.lastErrorType, "permanent");
});

test("successful quota refresh does not clear terminal banned status", async () => {
  const connection = await createGlmConnectionWithStatus("banned");
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch((() => glmQuotaResponse()) as typeof fetch, async () => {
    await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
  });

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(updated.testStatus, "banned");
});

test("successful quota refresh does not clear terminal expired status", async () => {
  const connection = await createGlmConnectionWithStatus("expired");
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch((() => glmQuotaResponse()) as typeof fetch, async () => {
    await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
  });

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(updated.testStatus, "expired");
});

test("Codex stale quota fallback preserves banked reset credits", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: `Codex Banked Credits ${Date.now()}`,
    accessToken: "codex-access-token",
    refreshToken: "codex-refresh-token",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });
  const connectionId = (connection as { id: string }).id;

  providerLimitsDb.setProviderLimitsCache(connectionId, {
    quotas: { session: { used: 10, total: 100, remainingPercentage: 90 } },
    plan: "pro",
    message: null,
    fetchedAt: "2026-01-01T00:00:00.000Z",
    source: "scheduled",
    bankedResetCredits: 2,
  });

  await withMockedFetch(
    (() => new Response("server unavailable", { status: 500 })) as typeof fetch,
    async () => {
      const result = await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");

      assert.equal(result.usage._stale, true);
      assert.equal(result.usage.bankedResetCredits, 2);
      assert.deepEqual(result.usage.quotas, {
        session: { used: 10, total: 100, remainingPercentage: 90 },
      });
    }
  );
});

test("error-only quota response does not clear transient state", async () => {
  const connection = await createGlmConnectionWithTransientCooldown();
  const connectionId = (connection as { id: string }).id;

  await withMockedFetch(
    (() =>
      new Response(JSON.stringify({ message: "GLM quota API error (429)" }), {
        status: 429,
        headers: { "content-type": "application/json" },
      })) as typeof fetch,
    async () => {
      // The live GLM usage path throws on a 429 (it does not return an error
      // envelope), so the fetch rejects. The transient-state assertions below then
      // confirm the throw happened BEFORE maybeClearRecoveredQuotaState — i.e. an
      // errored refresh never clears the connection's cooldown.
      await assert.rejects(
        () => providerLimits.fetchAndPersistProviderLimits(connectionId, "manual"),
        /429/
      );
    }
  );

  const updated = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(updated.testStatus, "unavailable", "transient state should not be cleared on error");
  assert.equal(updated.lastErrorType, "rate_limited");
});

test("partial quota refresh does not clear a quota cooldown before its reset", async () => {
  const resetAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  const created = await providersDb.createProviderConnection({
    provider: "kimi-coding",
    authType: "oauth",
    accessToken: "kimi-access-token",
    refreshToken: "kimi-refresh-token",
    testStatus: "unavailable",
    isActive: true,
    lastError: "usage limit reached",
    lastErrorType: "quota_exhausted",
    errorCode: 403,
    rateLimitedUntil: resetAt,
    backoffLevel: 1,
  });
  const connectionId = (created as { id: string }).id;
  const connection = await providersDb.getProviderConnectionById(connectionId);

  await providerLimits.maybeClearRecoveredQuotaState(connection, {
    quotas: {
      Ratelimit: { remainingPercentage: 0 },
      Weekly: { remainingPercentage: 62 },
    },
  });
  const after = await providersDb.getProviderConnectionById(connectionId);

  assert.equal(after.testStatus, "unavailable");
  assert.equal(after.lastErrorType, "quota_exhausted");
  assert.equal(after.rateLimitedUntil, resetAt);
});

test("Claude subscription quota recovery clears synthetic cooldown once the real window resets", async () => {
  // Reproduces the reported deadlock: a Claude subscription 429 persists a synthetic
  // 1h rateLimitedUntil (SUBSCRIPTION_QUOTA_COOLDOWN_MS, no parseable upstream reset).
  // The scheduled poller later fetches the REAL quota windows and finds the session
  // window has already reset with quota available — the connection must clear even
  // though the synthetic rateLimitedUntil is still in the future.
  const syntheticRateLimitedUntil = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const created = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    accessToken: "claude-access-token",
    refreshToken: "claude-refresh-token",
    testStatus: "unavailable",
    isActive: true,
    lastError: "usage limit reached",
    lastErrorType: "quota_exhausted",
    errorCode: 429,
    rateLimitedUntil: syntheticRateLimitedUntil,
    backoffLevel: 1,
  });
  const connectionId = (created as { id: string }).id;
  const connection = await providersDb.getProviderConnectionById(connectionId);

  const realResetInThePast = new Date(Date.now() - 60 * 1000).toISOString();
  const result = await providerLimits.maybeClearRecoveredQuotaState(connection, {
    quotas: {
      "session (5h)": { remaining: 87, remainingPercentage: 87, resetAt: realResetInThePast },
      "weekly (7d)": { remaining: 62, remainingPercentage: 62, resetAt: realResetInThePast },
    },
  });

  assert.equal(result.testStatus, "active", "returned snapshot should be cleared");
  assert.equal(result.rateLimitedUntil, null, "returned snapshot should drop rateLimitedUntil");
  assert.equal(result.lastErrorType, null, "returned snapshot should drop lastErrorType");

  const after = await providersDb.getProviderConnectionById(connectionId);
  assert.equal(after.testStatus, "active", "Sonnet/Opus connection should be usable again");
  assert.equal(after.rateLimitedUntil, undefined, "synthetic cooldown must be cleared");
  assert.equal(after.lastErrorType, undefined, "quota_exhausted marker must be cleared");
  assert.equal(after.backoffLevel, 0, "backoff level should reset to 0");
});

// ─── syntheticCooldownOutlivedByRealWindows override contract ───────────────
// The override that un-locks the synthetic Claude cooldown above is a real
// resilience-semantics change; these tests pair with it explicitly
// (fails-before: every case here ran red on CI run 32786966560 shard 7/8
// before the override existed / would go red if the gate were unconditional).
test("syntheticCooldownOutlivedByRealWindows accepts replenished windows with an elapsed reset", () => {
  const now = Date.now();
  const ok = providerLimits.syntheticCooldownOutlivedByRealWindows(
    {
      quotas: {
        session: { remaining: 87, resetAt: new Date(now - 60_000).toISOString() },
        weekly: {
          remaining: 62,
          remainingPercentage: 62,
          resetAt: new Date(now - 60_000).toISOString(),
        },
      },
    },
    now
  );
  assert.equal(ok, true, "positive live-window evidence must authorize the override");
});

test("syntheticCooldownOutlivedByRealWindows refuses windows without any reset evidence", () => {
  const now = Date.now();
  // Unknown-reset window: remaining > 0 but no parseable resetAt — matches the
  // kimi-coding partial-refresh semantics (never authorize on unknown state).
  const refused = providerLimits.syntheticCooldownOutlivedByRealWindows(
    { quotas: { Ratelimit: { remaining: 100 }, Weekly: { remaining: 62 } } },
    now
  );
  assert.equal(refused, false, "unknown-reset windows must not authorize an override");
});

test("override does not unlock executor-sourced rate limits (#11277)", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `Executor RL ${Date.now()}`,
    apiKey: "glm-exec-key",
    testStatus: "unavailable",
    isActive: true,
    lastError: "429 too many requests",
    lastErrorType: "rate_limited",
    lastErrorSource: "executor",
    errorCode: 429,
    rateLimitedUntil: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    backoffLevel: 2,
  });
  const connection = await providersDb.getProviderConnectionById((created as { id: string }).id);

  const result = await providerLimits.maybeClearRecoveredQuotaState(connection, {
    quotas: {
      tokens: { remaining: 90, resetAt: new Date(Date.now() - 60_000).toISOString() },
    },
  });

  assert.equal(result.testStatus, "unavailable", "executor 429 lockout must stay hard");
  assert.ok(result.rateLimitedUntil, "future rateLimitedUntil must be preserved (#11277)");
});

test("override does not unlock extra_usage policy blocks", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    accessToken: "tok-extra-usage-refusal",
    refreshToken: "refresh-extra-usage-refusal",
    testStatus: "unavailable",
    isActive: true,
    lastError: "extra usage limit",
    lastErrorType: "quota_exhausted",
    lastErrorSource: "extra_usage",
    errorCode: 429,
    rateLimitedUntil: new Date(Date.now() + 5 * 60_000).toISOString(),
    backoffLevel: 1,
  });
  const connection = await providersDb.getProviderConnectionById((created as { id: string }).id);

  const result = await providerLimits.maybeClearRecoveredQuotaState(connection, {
    quotas: {
      session: { remaining: 80, resetAt: new Date(Date.now() - 60_000).toISOString() },
      weekly: { remaining: 70, resetAt: new Date(Date.now() - 60_000).toISOString() },
    },
  });

  assert.equal(result.testStatus, "unavailable", "extra_usage blocks are never synthetic");
  assert.ok(result.rateLimitedUntil, "extra_usage cooldown must be preserved");
});

test("override does not unlock when a quota window lacks reset evidence", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    accessToken: "tok-unknown-reset-refusal",
    refreshToken: "refresh-unknown-reset-refusal",
    testStatus: "unavailable",
    isActive: true,
    lastError: "usage limit reached",
    lastErrorType: "quota_exhausted",
    errorCode: 429,
    rateLimitedUntil: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    backoffLevel: 1,
  });
  const connection = await providersDb.getProviderConnectionById((created as { id: string }).id);

  // One window carries no resetAt at all — the override must refuse.
  const result = await providerLimits.maybeClearRecoveredQuotaState(connection, {
    quotas: {
      session: { remaining: 87, resetAt: new Date(Date.now() - 60_000).toISOString() },
      weekly: { remaining: 62 },
    },
  });

  assert.equal(result.testStatus, "unavailable", "unknown-reset window keeps the lock");
});

test("Claude subscription quota still exhausted keeps the connection locked (no real recovery yet)", async () => {
  // Inverse of the above: the real session window is still exhausted with no parseable
  // reset (mirrors the existing kimi-coding test's semantics) — must stay locked even
  // though other windows (e.g. weekly) show remaining quota.
  const syntheticRateLimitedUntil = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const created = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    accessToken: "claude-access-token",
    refreshToken: "claude-refresh-token",
    testStatus: "unavailable",
    isActive: true,
    lastError: "usage limit reached",
    lastErrorType: "quota_exhausted",
    errorCode: 429,
    rateLimitedUntil: syntheticRateLimitedUntil,
    backoffLevel: 1,
  });
  const connectionId = (created as { id: string }).id;
  const connection = await providersDb.getProviderConnectionById(connectionId);

  const result = await providerLimits.maybeClearRecoveredQuotaState(connection, {
    quotas: {
      "session (5h)": { remaining: 0, remainingPercentage: 0 },
      "weekly (7d)": { remaining: 62, remainingPercentage: 62 },
    },
  });

  assert.equal(result.testStatus, "unavailable", "still-exhausted session window must stay locked");

  const after = await providersDb.getProviderConnectionById(connectionId);
  assert.equal(after.testStatus, "unavailable");
  assert.equal(after.lastErrorType, "quota_exhausted");
  assert.equal(after.rateLimitedUntil, syntheticRateLimitedUntil);
});

test("rate_limit_exceeded cooldown is not cleared early by an unrelated quota window looking usable (#11277)", async () => {
  // Reproduces #11277: a connection-scoped cooldown persisted with
  // lastErrorType "rate_limit_exceeded" (RateLimitReason.RATE_LIMIT_EXCEEDED)
  // and a long rateLimitedUntil (derived from an upstream reset hint — the
  // reported production case was ~146h) must NOT be cleared just because the
  // next scheduled quota sync reports hasUsableQuota()===true from some
  // unrelated window. Before the fix, only lastErrorType==="quota_exhausted"
  // reached the rateLimitedUntil guard, so every other reason (including
  // rate_limit_exceeded) skipped straight to clearRecoveredProviderState(),
  // producing a self-restart/burn loop on a multi-day cooldown.
  const farFutureRateLimitedUntil = new Date(Date.now() + 146 * 60 * 60 * 1000).toISOString();
  const created = await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "apikey",
    name: `OpenCode RateLimitExceeded ${Date.now()}`,
    apiKey: "opencode-test-key",
    testStatus: "unavailable",
    isActive: true,
    lastError: "Account quota exhausted (opencode)",
    lastErrorType: "rate_limit_exceeded",
    errorCode: 429,
    rateLimitedUntil: farFutureRateLimitedUntil,
    backoffLevel: 1,
  });
  const connectionId = (created as { id: string }).id;
  const connection = await providersDb.getProviderConnectionById(connectionId);

  // No `quotas` object at all (degraded/partial fetch shape) — this is the
  // exact shape that, pre-fix, fell straight through to hasTransientState
  // and cleared the cooldown for any lastErrorType other than quota_exhausted.
  const result = await providerLimits.maybeClearRecoveredQuotaState(connection, {
    quotas: { unrelated: { unlimited: true } },
  });

  assert.equal(
    result.testStatus,
    "unavailable",
    "an active rate_limit_exceeded cooldown must stay locked"
  );

  const after = await providersDb.getProviderConnectionById(connectionId);
  assert.equal(after.testStatus, "unavailable");
  assert.equal(after.lastErrorType, "rate_limit_exceeded");
  assert.equal(after.rateLimitedUntil, farFutureRateLimitedUntil);
});

test("CAS primitive clears when expected state matches", async () => {
  const created = await createGlmConnectionWithTransientCooldown();
  const connectionId = (created as { id: string }).id;
  const before = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;

  const applied = await providersDb.clearConnectionErrorIfUnchanged(connectionId, {
    testStatus: (before.testStatus as string) ?? null,
    lastErrorAt: (before.lastErrorAt as string) ?? null,
    rateLimitedUntil: (before.rateLimitedUntil as string) ?? null,
  });

  assert.equal(applied, true, "CAS UPDATE should apply when expected state matches");
  const after = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(after.testStatus, "active");
  assert.equal(after.rateLimitedUntil, undefined);
  assert.equal(after.backoffLevel, 0);
});

test("CAS primitive aborts when state changed concurrently", async () => {
  const created = await createGlmConnectionWithTransientCooldown();
  const connectionId = (created as { id: string }).id;
  const before = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;

  // Simulate a concurrent markAccountUnavailable writing a fresh error state.
  const newLastErrorAt = new Date(Date.now() + 1000).toISOString();
  const newRateLimitedUntil = new Date(Date.now() + 120_000).toISOString();
  await providersDb.updateProviderConnection(connectionId, {
    lastErrorAt: newLastErrorAt,
    rateLimitedUntil: newRateLimitedUntil,
    lastError: "fresh 429",
    errorCode: 429,
    backoffLevel: 3,
  });

  const applied = await providersDb.clearConnectionErrorIfUnchanged(connectionId, {
    testStatus: (before.testStatus as string) ?? null,
    lastErrorAt: (before.lastErrorAt as string) ?? null,
    rateLimitedUntil: (before.rateLimitedUntil as string) ?? null,
  });

  assert.equal(applied, false, "CAS UPDATE should abort when state changed");
  const after = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(after.testStatus, "unavailable", "fresh mark should be preserved");
  assert.equal(after.backoffLevel, 3, "fresh backoff level should be preserved");
  assert.equal(after.lastError, "fresh 429");
});

test("quota recovery path does NOT overwrite a concurrent mark (TOCTOU closed)", async () => {
  const created = await createGlmConnectionWithTransientCooldown();
  const connectionId = (created as { id: string }).id;
  const snapshotBeforeClear = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  const expectedLastErrorAt = (snapshotBeforeClear.lastErrorAt as string) ?? null;

  // Mock fetch so that DURING the quota fetch (between read and clear), a
  // concurrent mark writes a fresh error state. This deterministically
  // reproduces the TOCTOU window the CAS primitive is meant to close.
  const concurrentMarkFetch = (() => {
    // Simulate concurrent markAccountUnavailable writing fresh state.
    providersDb.updateProviderConnection(connectionId, {
      lastErrorAt: new Date(Date.now() + 1000).toISOString(),
      rateLimitedUntil: new Date(Date.now() + 120_000).toISOString(),
      lastError: "fresh concurrent 429",
      errorCode: 429,
      backoffLevel: 3,
    });
    return glmQuotaResponse();
  }) as typeof fetch;

  await withMockedFetch(concurrentMarkFetch, async () => {
    await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
  });

  const after = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  // Recovery should have aborted (CAS miss) — fresh mark must survive.
  assert.notEqual(
    after.lastErrorAt,
    expectedLastErrorAt,
    "fresh lastErrorAt must not be overwritten by recovery clear"
  );
  assert.equal(after.testStatus, "unavailable", "fresh testStatus must survive");
  assert.equal(after.backoffLevel, 3, "fresh backoff level must survive");
  assert.equal(after.lastError, "fresh concurrent 429");
});

function claudeUsageResponseWithQueuedExtraUsage() {
  // Session/weekly windows are fully recovered (low utilization, future reset)
  // but extra_usage.queued stays true — the two states are orthogonal upstream.
  return new Response(
    JSON.stringify({
      tier: "pro",
      five_hour: {
        utilization: 5,
        resets_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      },
      seven_day: {
        utilization: 10,
        resets_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      extra_usage: { queued: true },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function claudeBootstrapResponseForExtraUsageTest() {
  return new Response(
    JSON.stringify({
      oauth_account: {
        account_uuid: "account-uuid-extra-usage-test",
        account_email: "claude-extra-usage@example.test",
        organization_uuid: "org-uuid-extra-usage-test",
        organization_name: "Extra Usage Test Org",
        organization_type: "pro",
        organization_rate_limit_tier: "pro",
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test("Claude extra-usage block stays locked through the real sync chain when recovered quota windows coexist with extraUsage.queued=true", async () => {
  // Walks the REAL call order inside fetchLiveProviderLimitsWithOptions:
  //   syncClaudeExtraUsageStateIfNeeded  → re-asserts the extra-usage block
  //   maybeClearRecoveredQuotaState      → must NOT undo it just because the
  //                                        session/weekly quota windows look
  //                                        recovered in the same fetch.
  const created = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: `Claude Extra Usage ${Date.now()} ${Math.random()}`,
    email: `claude-extra-usage-${Date.now()}@example.test`,
    accessToken: "claude-access-token",
    refreshToken: "claude-refresh-token",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    testStatus: "unavailable",
    isActive: true,
    lastError: "Claude extra usage was detected and blocked by this connection policy.",
    lastErrorType: "quota_exhausted",
    lastErrorSource: "extra_usage",
    errorCode: 429,
    rateLimitedUntil: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    backoffLevel: 1,
    // blockExtraUsage defaults to enabled (policy is opt-out via `=== false`).
    providerSpecificData: {},
  });
  const connectionId = (created as { id: string }).id;

  await withMockedFetch(
    (async (url) => {
      const urlText = String(url);
      if (urlText.includes("/api/claude_cli/bootstrap")) {
        return claudeBootstrapResponseForExtraUsageTest();
      }
      return claudeUsageResponseWithQueuedExtraUsage();
    }) as typeof fetch,
    async () => {
      const result = await providerLimits.fetchAndPersistProviderLimits(connectionId, "manual");
      assert.equal(
        result.connection.testStatus,
        "unavailable",
        "returned snapshot must stay blocked"
      );
      assert.equal(result.connection.lastErrorSource, "extra_usage");
    }
  );

  const after = (await providersDb.getProviderConnectionById(connectionId)) as Record<
    string,
    unknown
  >;
  assert.equal(after.testStatus, "unavailable", "connection must remain unavailable");
  assert.equal(after.lastErrorType, "quota_exhausted");
  assert.equal(
    after.lastErrorSource,
    "extra_usage",
    "extra_usage marker must survive the general recovery-clearing logic"
  );
});
