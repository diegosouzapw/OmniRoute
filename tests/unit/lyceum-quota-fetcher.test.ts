import test from "node:test";
import assert from "node:assert/strict";

import {
  buildLyceumQuota,
  fetchLyceumQuota,
  invalidateLyceumQuotaCache,
  parseLyceumCreditsResponse,
  registerLyceumQuotaFetcher,
  type LyceumQuota,
  LYCEUM_WINDOW_CREDITS,
} from "../../open-sse/services/lyceumQuotaFetcher.ts";
import {
  getQuotaFetcher,
  getQuotaWindows,
  preflightQuota,
} from "../../open-sse/services/quotaPreflight.ts";
import { clearQuotaMonitors } from "../../open-sse/services/quotaMonitor.ts";
import { getLyceumUsage } from "../../open-sse/services/usage/lyceum.ts";

const originalFetch = globalThis.fetch;

const CREDITS_RESPONSE = {
  available_credits: 50.0,
  used_credits: 10.0,
  total_credits_used: 10.0,
  remaining_credits: 40.0,
  monthly_free_credits: 20.0,
  purchased_credits: 30.0,
  signup_grant_claimed_at: null,
};

function creditsResponse(overrides: Record<string, unknown>) {
  return { ...CREDITS_RESPONSE, ...overrides };
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
});

// ─── Parser ──────────────────────────────────────────────────────────────────

test("parseLyceumCreditsResponse parses the credit balance", () => {
  const fields = parseLyceumCreditsResponse(CREDITS_RESPONSE);
  assert.ok(fields);
  assert.equal(fields.availableCredits, 50);
  assert.equal(fields.usedCredits, 10);
  assert.equal(fields.remainingCredits, 40);
  assert.equal(fields.monthlyFreeCredits, 20);
  assert.equal(fields.purchasedCredits, 30);
});

test("parseLyceumCreditsResponse returns null on unexpected shape", () => {
  assert.equal(parseLyceumCreditsResponse({}), null);
  assert.equal(parseLyceumCreditsResponse(null), null);
  assert.equal(parseLyceumCreditsResponse({ foo: "bar" }), null);
});

test("parseLyceumCreditsResponse falls back remaining to available", () => {
  const fields = parseLyceumCreditsResponse({ available_credits: 12.5, used_credits: 2 });
  assert.ok(fields);
  assert.equal(fields.remainingCredits, 12.5);
});

// ─── buildLyceumQuota ──────────────────────────────────────────────────────────

test("buildLyceumQuota exposes a credits window with correct percentUsed", () => {
  const fields = parseLyceumCreditsResponse(CREDITS_RESPONSE);
  assert.ok(fields);
  const quota = buildLyceumQuota(fields);
  // used 10, remaining 40 → total 50 → 20% used
  assert.ok(Math.abs(quota.percentUsed - 0.2) < 1e-9);
  assert.equal(quota.limitReached, false);
  assert.equal(quota.remainingCredits, 40);
  assert.ok(Math.abs(quota.windows![LYCEUM_WINDOW_CREDITS].percentUsed - 0.2) < 1e-9);
  assert.equal(quota.windows![LYCEUM_WINDOW_CREDITS].resetAt, null);
});

test("buildLyceumQuota marks limitReached when balance is zero", () => {
  const fields = parseLyceumCreditsResponse(
    creditsResponse({ available_credits: 0, used_credits: 50, remaining_credits: 0 })
  );
  assert.ok(fields);
  const quota = buildLyceumQuota(fields);
  assert.equal(quota.limitReached, true);
  assert.equal(quota.percentUsed, 1);
});

// ─── fetchLyceumQuota ──────────────────────────────────────────────────────────

test("fetchLyceumQuota returns null when no API key exists", async () => {
  const quota = await fetchLyceumQuota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchLyceumQuota calls the credits endpoint with Bearer auth", async () => {
  const connectionId = `lyceum-live-${Date.now()}`;
  const calls: Array<{ url: unknown; init: unknown }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(CREDITS_RESPONSE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  const quota = (await fetchLyceumQuota(connectionId, {
    apiKey: "lk_test",
  })) as LyceumQuota | null;

  assert.equal(calls.length, 1);
  assert.equal(
    String(calls[0].url),
    "https://api.lyceum.technology/api/v2/external/billing/credits"
  );
  assert.equal((calls[0].init as RequestInit).headers!["Authorization" as never], "Bearer lk_test");
  assert.equal(quota?.remainingCredits, 40);

  invalidateLyceumQuotaCache(connectionId);
});

test("fetchLyceumQuota returns null on 401 (invalid key)", async () => {
  const connectionId = `lyceum-401-${Date.now()}`;
  globalThis.fetch = async () => new Response(null, { status: 401 });
  const quota = await fetchLyceumQuota(connectionId, { apiKey: "bad" });
  assert.equal(quota, null);
});

test("fetchLyceumQuota returns null on 403", async () => {
  const connectionId = `lyceum-403-${Date.now()}`;
  globalThis.fetch = async () => new Response(null, { status: 403 });
  const quota = await fetchLyceumQuota(connectionId, { apiKey: "scoped" });
  assert.equal(quota, null);
});

test("fetchLyceumQuota caches results within TTL", async () => {
  const connectionId = `lyceum-cache-${Date.now()}`;
  const calls: number[] = [];
  globalThis.fetch = async () => {
    calls.push(1);
    return new Response(JSON.stringify(CREDITS_RESPONSE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  const first = await fetchLyceumQuota(connectionId, { apiKey: "lk_test" });
  const second = await fetchLyceumQuota(connectionId, { apiKey: "lk_test" });
  assert.equal(calls.length, 1);
  assert.deepEqual(first, second);

  invalidateLyceumQuotaCache(connectionId);
  await fetchLyceumQuota(connectionId, { apiKey: "lk_test" });
  assert.equal(calls.length, 2);

  invalidateLyceumQuotaCache(connectionId);
});

test("fetchLyceumQuota returns null on network error (fail-open)", async () => {
  const connectionId = `lyceum-net-${Date.now()}`;
  globalThis.fetch = async () => {
    throw new Error("Network error");
  };
  const quota = await fetchLyceumQuota(connectionId, { apiKey: "lk_test" });
  assert.equal(quota, null);
});

// ─── Registration + preflight ──────────────────────────────────────────────────

test("registerLyceumQuotaFetcher wires preflight + monitor + windows", () => {
  registerLyceumQuotaFetcher();
  assert.ok(getQuotaFetcher("lyceum"));
  assert.deepEqual([...getQuotaWindows("lyceum")], [LYCEUM_WINDOW_CREDITS]);
});

test("preflight proceeds when credit balance has headroom", async () => {
  const connectionId = `lyceum-proceed-${Date.now()}`;
  registerLyceumQuotaFetcher();
  globalThis.fetch = async () =>
    new Response(JSON.stringify(CREDITS_RESPONSE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const preflight = await preflightQuota("lyceum", connectionId, {
    apiKey: "lk_test",
    providerSpecificData: { quotaPreflightEnabled: true },
  });
  assert.equal(preflight.proceed, true);

  invalidateLyceumQuotaCache(connectionId);
});

test("preflight blocks when credit balance is exhausted", async () => {
  const connectionId = `lyceum-block-${Date.now()}`;
  registerLyceumQuotaFetcher();
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify(
        creditsResponse({ available_credits: 0, used_credits: 50, remaining_credits: 0 })
      ),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const preflight = await preflightQuota("lyceum", connectionId, {
    apiKey: "lk_test",
    providerSpecificData: { quotaPreflightEnabled: true },
  });
  assert.equal(preflight.proceed, false);
  assert.equal(preflight.reason, "quota_exhausted");

  invalidateLyceumQuotaCache(connectionId);
});

// ─── Usage leaf ────────────────────────────────────────────────────────────────

test("getLyceumUsage returns a credit-balance quota row", async () => {
  const connectionId = `lyceum-usage-${Date.now()}`;
  globalThis.fetch = async () =>
    new Response(JSON.stringify(CREDITS_RESPONSE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const usage = await getLyceumUsage(connectionId, "lk_test");
  assert.equal(usage.plan, "Lyceum (pay-as-you-go)");
  const credits = usage.quotas?.[LYCEUM_WINDOW_CREDITS];
  assert.ok(credits);
  assert.equal(credits.total, 50);
  assert.equal(credits.remaining, 40);
  assert.equal(credits.currency, "USD");

  invalidateLyceumQuotaCache(connectionId);
});

test("getLyceumUsage returns a message when no API key given", async () => {
  const usage = await getLyceumUsage(`lyceum-nokey-${Date.now()}`, "");
  assert.ok(usage.message);
  assert.equal(usage.quotas, undefined);
});
