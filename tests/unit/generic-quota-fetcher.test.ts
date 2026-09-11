import test from "node:test";
import assert from "node:assert/strict";

const genericModule = await import("../../open-sse/services/genericQuotaFetcher.ts");
const preflightModule = await import("../../open-sse/services/quotaPreflight.ts");

const {
  convertUsageToQuotaInfo,
  fetchGenericQuota,
  invalidateGenericQuotaCache,
  invalidateGenericQuotaCacheOnStatus,
  registerGenericQuotaFetchers,
  __setGenericUsageFetcherForTests,
  __agePendingForceRefreshForTests,
  __agePendingForceRefreshMissForTests,
  __resetGenericQuotaFetcherForTests,
} = genericModule;
const { getQuotaFetcher } = preflightModule;

function usageShape(remainingPercentage: number) {
  return {
    quotas: {
      "gemini-3-flash": {
        remainingPercentage,
        fractionReported: true,
        resetAt: "2026-09-01T20:00:00Z",
      },
      gemini_models_weekly: {
        remainingPercentage,
        fractionReported: true,
        resetAt: "2026-09-07T00:00:00Z",
      },
    },
  };
}

test("convertUsageToQuotaInfo returns null on null/undefined input", () => {
  assert.equal(convertUsageToQuotaInfo(null), null);
  assert.equal(convertUsageToQuotaInfo(undefined), null);
});

test("convertUsageToQuotaInfo returns null when only an error message is present", () => {
  // Auth-expired-style response from getUsageForProvider — fail open.
  assert.equal(convertUsageToQuotaInfo({ message: "auth expired" }), null);
});

test("convertUsageToQuotaInfo maps remainingPercentage into per-window percentUsed", () => {
  const result = convertUsageToQuotaInfo({
    quotas: {
      session: { remainingPercentage: 30, resetAt: "2026-05-14T20:00:00Z" },
      weekly: { remainingPercentage: 10, resetAt: "2026-05-21T00:00:00Z" },
    },
  });
  assert.ok(result);
  assert.deepEqual(result!.windows, {
    session: { percentUsed: 0.7, resetAt: "2026-05-14T20:00:00Z" },
    weekly: { percentUsed: 0.9, resetAt: "2026-05-21T00:00:00Z" },
  });
  // Worst-case percentUsed mirrors what the legacy single-signal field needs.
  assert.equal(result!.percentUsed, 0.9);
  // Reset time should track the worst-case window so preflight can surface it.
  assert.equal(result!.resetAt, "2026-05-21T00:00:00Z");
});

test("convertUsageToQuotaInfo falls back to used/total when remainingPercentage is absent", () => {
  const result = convertUsageToQuotaInfo({
    quotas: { session: { used: 45, total: 100, resetAt: null } },
  });
  assert.ok(result);
  assert.equal(result!.windows!.session.percentUsed, 0.45);
});

test("convertUsageToQuotaInfo skips unlimited and unmeasurable windows", () => {
  const result = convertUsageToQuotaInfo({
    quotas: {
      session: { remainingPercentage: 50, resetAt: null },
      // No percentage and no used/total → skipped.
      unknown_shape: { resetAt: null },
      // Unlimited windows are intentionally ignored — preflight can't block on them.
      unlimited_credits: { unlimited: true, remainingPercentage: 99 },
    },
  });
  assert.ok(result);
  assert.deepEqual(Object.keys(result!.windows || {}), ["session"]);
});

test("convertUsageToQuotaInfo returns null when no windows are measurable", () => {
  const result = convertUsageToQuotaInfo({
    quotas: { unlimited_thing: { unlimited: true } },
  });
  assert.equal(result, null);
});

test("convertUsageToQuotaInfo clamps remainingPercentage outside 0-100", () => {
  const result = convertUsageToQuotaInfo({
    quotas: {
      a: { remainingPercentage: 150, resetAt: null }, // clamped to 100 → 0% used
      b: { remainingPercentage: -10, resetAt: null }, // clamped to 0 → 100% used
    },
  });
  assert.ok(result);
  assert.equal(result!.windows!.a.percentUsed, 0);
  assert.equal(result!.windows!.b.percentUsed, 1);
});

test("convertUsageToQuotaInfo ignores a window whose fraction was not reported by upstream (#6295)", () => {
  // Antigravity sets fractionReported:false and defaults remainingPercentage
  // to 0 when a model's usage fraction isn't returned upstream. That must
  // NOT be treated as "100% used" — the window should be skipped entirely.
  const result = convertUsageToQuotaInfo({
    quotas: {
      unreported_model: { remainingPercentage: 0, fractionReported: false, resetAt: null },
    },
  });
  assert.equal(result, null);
});

test("convertUsageToQuotaInfo does not let an unreported window inflate worstPercent (#6295)", () => {
  const result = convertUsageToQuotaInfo({
    quotas: {
      reported_low: { remainingPercentage: 80, fractionReported: true, resetAt: null },
      unreported_model: { remainingPercentage: 0, fractionReported: false, resetAt: null },
    },
  });
  assert.ok(result);
  assert.deepEqual(Object.keys(result!.windows || {}), ["reported_low"]);
  assert.equal(result!.percentUsed, 0.2);
  assert.equal(result!.limitReached, false);
});

test("registerGenericQuotaFetchers registers Claude, GLM, and OpenCode Go via the generic adapter", () => {
  registerGenericQuotaFetchers();
  // Claude has no bespoke fetcher → should be registered.
  assert.ok(getQuotaFetcher("claude"), "claude should be registered");
  assert.ok(getQuotaFetcher("glm"), "glm should be registered");
  assert.ok(getQuotaFetcher("zai"), "zai should be registered");
  assert.ok(getQuotaFetcher("opencode-go"), "opencode-go should be registered");
  // Codex has its own dedicated fetcher (registered by codexQuotaFetcher.ts,
  // not by the generic registrar) — the generic registrar skips it. We can't
  // assert "codex" here without first calling registerCodexQuotaFetcher,
  // which would couple this test to chat.ts startup wiring. The skip list
  // semantics are exercised by the source code review.
});

test.afterEach(() => {
  __setGenericUsageFetcherForTests(null);
  __resetGenericQuotaFetcherForTests();
});

test("fetchGenericQuota caches a hit inside the 60s window", async () => {
  const connectionId = `agy-cache-${Date.now()}`;
  const calls: Array<{ forceRefresh?: boolean }> = [];
  __setGenericUsageFetcherForTests(async (_conn, options) => {
    calls.push({ forceRefresh: options?.forceRefresh });
    return usageShape(80);
  });

  const connection = { provider: "agy", id: connectionId };
  const first = await fetchGenericQuota(connectionId, connection);
  const second = await fetchGenericQuota(connectionId, connection);

  assert.equal(calls.length, 1, "second fetch must reuse the generic cache");
  assert.equal(first?.percentUsed, 0.2);
  assert.deepEqual(second, first);
  invalidateGenericQuotaCache("agy", connectionId);
});

test("invalidateGenericQuotaCache makes the next fetch bypass provider-inner usage caches", async () => {
  const connectionId = `agy-invalidate-${Date.now()}`;
  const calls: Array<{ forceRefresh?: boolean }> = [];
  let remaining = 80;
  __setGenericUsageFetcherForTests(async (_conn, options) => {
    calls.push({ forceRefresh: options?.forceRefresh });
    return usageShape(remaining);
  });

  const connection = { provider: "agy", id: connectionId };
  const first = await fetchGenericQuota(connectionId, connection);
  assert.equal(first?.percentUsed, 0.2);
  assert.equal(calls[0]?.forceRefresh, undefined);

  remaining = 0;
  invalidateGenericQuotaCache("agy", connectionId);
  const second = await fetchGenericQuota(connectionId, connection);

  assert.equal(calls.length, 2, "invalidate must drop the 60s generic cache");
  assert.equal(
    calls[1]?.forceRefresh,
    true,
    "agy retrieveUserQuota / weekly caches are 60s–5min; invalidate must force-refresh or the recache is stale"
  );
  assert.equal(second?.percentUsed, 1);
  invalidateGenericQuotaCache("agy", connectionId);
});

test("invalidateGenericQuotaCacheOnStatus drops cache on 429 and ignores 200", async () => {
  const connectionId = `agy-429-${Date.now()}`;
  const calls: Array<{ forceRefresh?: boolean }> = [];
  __setGenericUsageFetcherForTests(async (_conn, options) => {
    calls.push({ forceRefresh: options?.forceRefresh });
    return usageShape(50);
  });

  const connection = { provider: "agy", id: connectionId };
  await fetchGenericQuota(connectionId, connection);
  assert.equal(calls.length, 1);

  invalidateGenericQuotaCacheOnStatus({
    provider: "agy",
    connectionId,
    status: 200,
    isolateProbe: false,
  });
  await fetchGenericQuota(connectionId, connection);
  assert.equal(calls.length, 1, "200 must not drop the generic quota cache");

  const dropped429 = invalidateGenericQuotaCacheOnStatus({
    provider: "agy",
    connectionId,
    status: 429,
    isolateProbe: false,
  });
  assert.equal(dropped429, true);
  await fetchGenericQuota(connectionId, connection);
  assert.equal(calls.length, 2, "429 must drop the generic quota cache");
  assert.equal(calls[1]?.forceRefresh, true);

  invalidateGenericQuotaCacheOnStatus({
    provider: "agy",
    connectionId,
    status: 429,
    isolateProbe: true,
  });
  await fetchGenericQuota(connectionId, connection);
  assert.equal(calls.length, 2, "probe-origin 429 must not touch routing caches");

  assert.doesNotThrow(() =>
    invalidateGenericQuotaCacheOnStatus({
      provider: "agy",
      connectionId: null,
      status: 429,
      isolateProbe: false,
    })
  );
  invalidateGenericQuotaCache("agy", connectionId);
});

test("invalidateGenericQuotaCacheOnStatus trims to the same key fetchGenericQuota uses", async () => {
  const connectionId = `agy-trim-${Date.now()}`;
  const calls: Array<{ forceRefresh?: boolean }> = [];
  __setGenericUsageFetcherForTests(async (_conn, options) => {
    calls.push({ forceRefresh: options?.forceRefresh });
    return usageShape(40);
  });

  const connection = { provider: "agy", id: connectionId };
  await fetchGenericQuota(`  ${connectionId}  `, connection);
  assert.equal(calls.length, 1);

  const dropped = invalidateGenericQuotaCacheOnStatus({
    provider: "  agy  ",
    connectionId: `  ${connectionId}  `,
    status: 429,
    isolateProbe: false,
  });
  assert.equal(dropped, true);

  await fetchGenericQuota(connectionId, { provider: "agy", id: connectionId });
  assert.equal(calls.length, 2, "padded 429 key must drop the unpadded wrapper cache");
  assert.equal(calls[1]?.forceRefresh, true);
  invalidateGenericQuotaCache("agy", connectionId);
});

test("convert-null after invalidate keeps forceRefresh until a measurable quota recaches", async () => {
  const connectionId = `agy-null-${Date.now()}`;
  const calls: Array<{ forceRefresh?: boolean }> = [];
  let n = 0;
  __setGenericUsageFetcherForTests(async (_conn, options) => {
    calls.push({ forceRefresh: options?.forceRefresh });
    n += 1;
    if (n === 1) return usageShape(80);
    if (n === 2) return { message: "auth expired" };
    return usageShape(10);
  });

  const connection = { provider: "agy", id: connectionId };
  await fetchGenericQuota(connectionId, connection);
  invalidateGenericQuotaCache("agy", connectionId);

  const second = await fetchGenericQuota(connectionId, connection);
  assert.equal(second, null);
  assert.equal(calls[1]?.forceRefresh, true);

  await fetchGenericQuota(connectionId, connection);
  assert.equal(calls.length, 2, "convert-null must not hammer usage inside 60s");

  __agePendingForceRefreshMissForTests("agy", connectionId, 60_000 + 1);
  const fourth = await fetchGenericQuota(connectionId, connection);
  assert.equal(calls.length, 3);
  assert.equal(calls[2]?.forceRefresh, true, "convert-null must not drop the force-refresh flag");
  assert.equal(fourth?.percentUsed, 0.9);
  invalidateGenericQuotaCache("agy", connectionId);
});

test("in-flight fetch must not drop a concurrent 429 force-refresh", async () => {
  const connectionId = `agy-race-${Date.now()}`;
  let release: (value?: unknown) => void = () => {};
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  const calls: Array<{ forceRefresh?: boolean }> = [];
  let n = 0;
  __setGenericUsageFetcherForTests(async (_conn, options) => {
    calls.push({ forceRefresh: options?.forceRefresh });
    n += 1;
    if (n === 1) {
      await gate;
      return usageShape(80);
    }
    return usageShape(10);
  });

  const connection = { provider: "agy", id: connectionId };
  const inflight = fetchGenericQuota(connectionId, connection);
  await Promise.resolve();
  invalidateGenericQuotaCache("agy", connectionId);
  release();
  const first = await inflight;
  assert.equal(first?.percentUsed, 0.2);

  const second = await fetchGenericQuota(connectionId, connection);
  assert.equal(calls.length, 2, "concurrent 429 must not let the in-flight recache wipe force-refresh");
  assert.equal(calls[1]?.forceRefresh, true);
  assert.equal(second?.percentUsed, 0.9);
  invalidateGenericQuotaCache("agy", connectionId);
});

test("expired pending force-refresh does not bypass the 60s wrapper cache", async () => {
  const connectionId = `agy-expire-${Date.now()}`;
  const calls: Array<{ forceRefresh?: boolean }> = [];
  __setGenericUsageFetcherForTests(async (_conn, options) => {
    calls.push({ forceRefresh: options?.forceRefresh });
    return usageShape(80);
  });

  const connection = { provider: "agy", id: connectionId };
  await fetchGenericQuota(connectionId, connection);
  invalidateGenericQuotaCache("agy", connectionId);
  __agePendingForceRefreshForTests("agy", connectionId, 5 * 60_000 + 1);

  await fetchGenericQuota(connectionId, connection);
  assert.equal(calls.length, 2, "wrapper cache was dropped; fetch still happens");
  assert.equal(
    calls[1]?.forceRefresh,
    undefined,
    "expired force-refresh must not pass forceRefresh after inner caches have aged out"
  );
  invalidateGenericQuotaCache("agy", connectionId);
});

test("stamp expiry during in-flight fetch still writes the wrapper cache", async () => {
  const connectionId = `agy-stamp-expire-${Date.now()}`;
  let release: (value?: unknown) => void = () => {};
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  const calls: Array<{ forceRefresh?: boolean }> = [];
  let n = 0;
  __setGenericUsageFetcherForTests(async (_conn, options) => {
    calls.push({ forceRefresh: options?.forceRefresh });
    n += 1;
    if (n === 1) return usageShape(50);
    await gate;
    return usageShape(80);
  });

  const connection = { provider: "agy", id: connectionId };
  await fetchGenericQuota(connectionId, connection);
  invalidateGenericQuotaCache("agy", connectionId);

  const inflight = fetchGenericQuota(connectionId, connection);
  await Promise.resolve();
  __agePendingForceRefreshForTests("agy", connectionId, 5 * 60_000 + 1);
  release();
  await inflight;

  await fetchGenericQuota(connectionId, connection);
  assert.equal(calls.length, 2, "expired stamp during await is not a 429; cache the result");
  invalidateGenericQuotaCache("agy", connectionId);
});
