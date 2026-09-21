import test from "node:test";
import assert from "node:assert/strict";

import {
  buildLlmgatewayQuota,
  fetchLlmgatewayQuota,
  invalidateLlmgatewayQuotaCache,
  parseLlmgatewayKeyResponse,
  registerLlmgatewayQuotaFetcher,
  type LlmgatewayQuota,
  LLMGATEWAY_WINDOW_MONTHLY,
  LLMGATEWAY_WINDOW_PREMIUM_WEEKLY,
} from "../../open-sse/services/llmgatewayQuotaFetcher.ts";
import {
  getQuotaFetcher,
  getQuotaWindows,
  preflightQuota,
} from "../../open-sse/services/quotaPreflight.ts";
import { clearQuotaMonitors } from "../../open-sse/services/quotaMonitor.ts";
import { getLlmgatewayUsage } from "../../open-sse/services/usage/llmgateway.ts";

const originalFetch = globalThis.fetch;

const PRO_KEY_RESPONSE = {
  data: {
    label: "My coding tool",
    usage: "31.42",
    limit: null,
    devPlan: "pro",
    devPlanCreditsUsed: "25",
    devPlanCreditsLimit: "237",
    devPlanCreditsRemaining: "212.00",
    devPlanPremiumWeeklyLimit: "35.55",
    devPlanPremiumCreditsUsed: "5.00",
    devPlanPremiumWeekResetsAt: "2026-08-28T12:00:00.000Z",
  },
};

function keyResponse(overrides: Record<string, unknown>) {
  return {
    data: { ...PRO_KEY_RESPONSE.data, ...overrides },
  };
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
});

// ─── Parser ──────────────────────────────────────────────────────────────────

test("parseLlmgatewayKeyResponse parses decimal-string DevPass fields", () => {
  const fields = parseLlmgatewayKeyResponse(PRO_KEY_RESPONSE);
  assert.ok(fields);
  assert.equal(fields.devPlan, "pro");
  assert.equal(fields.monthlyUsed, 25);
  assert.equal(fields.monthlyLimit, 237);
  assert.equal(fields.monthlyRemaining, 212);
  assert.equal(fields.premiumWeeklyLimit, 35.55);
  assert.equal(fields.premiumUsed, 5);
  assert.equal(fields.premiumResetAt, "2026-08-28T12:00:00.000Z");
});

test("parseLlmgatewayKeyResponse returns null on empty/unexpected shape", () => {
  assert.equal(parseLlmgatewayKeyResponse({}), null);
  assert.equal(parseLlmgatewayKeyResponse({ data: {} }), null);
  assert.equal(parseLlmgatewayKeyResponse(null), null);
});

test("parseLlmgatewayKeyResponse defaults devPlan to none when missing", () => {
  const fields = parseLlmgatewayKeyResponse({ data: { devPlanCreditsUsed: "0" } });
  assert.ok(fields);
  assert.equal(fields.devPlan, "none");
});

test("parseLlmgatewayKeyResponse treats expired premium window as null reset", () => {
  const fields = parseLlmgatewayKeyResponse(
    keyResponse({ devPlanPremiumCreditsUsed: "0.00", devPlanPremiumWeekResetsAt: null })
  );
  assert.ok(fields);
  assert.equal(fields.premiumUsed, 0);
  assert.equal(fields.premiumResetAt, null);
});

// ─── buildLlmgatewayQuota ──────────────────────────────────────────────────────

test("buildLlmgatewayQuota returns null for pay-as-you-go keys (devPlan none)", () => {
  const fields = parseLlmgatewayKeyResponse({
    data: {
      devPlan: "none",
      devPlanCreditsUsed: "0",
      devPlanCreditsLimit: "0",
      devPlanCreditsRemaining: "0",
      devPlanPremiumWeeklyLimit: "0",
      devPlanPremiumCreditsUsed: "0",
      devPlanPremiumWeekResetsAt: null,
    },
  });
  assert.ok(fields);
  assert.equal(buildLlmgatewayQuota(fields), null);
});

test("buildLlmgatewayQuota exposes monthly + weekly windows with correct percentUsed", () => {
  const fields = parseLlmgatewayKeyResponse(PRO_KEY_RESPONSE);
  assert.ok(fields);
  const quota = buildLlmgatewayQuota(fields);
  assert.ok(quota);
  // monthly: 25/237 ≈ 0.1055 ; premium: 5/35.55 ≈ 0.1406 → worst = premium
  assert.ok(Math.abs(quota.windows![LLMGATEWAY_WINDOW_MONTHLY].percentUsed - 25 / 237) < 1e-9);
  assert.ok(
    Math.abs(quota.windows![LLMGATEWAY_WINDOW_PREMIUM_WEEKLY].percentUsed - 5 / 35.55) < 1e-9
  );
  assert.ok(Math.abs(quota.percentUsed - 5 / 35.55) < 1e-9);
  assert.equal(quota.limitReached, false);
  assert.equal(quota.monthlyRemaining, 212);
  assert.ok(Math.abs((quota.premiumRemaining ?? 0) - (35.55 - 5)) < 1e-9);
});

test("buildLlmgatewayQuota marks limitReached when monthly credits exhausted", () => {
  const fields = parseLlmgatewayKeyResponse(
    keyResponse({
      devPlanCreditsUsed: "237",
      devPlanCreditsLimit: "237",
      devPlanCreditsRemaining: "0",
    })
  );
  assert.ok(fields);
  const quota = buildLlmgatewayQuota(fields);
  assert.ok(quota);
  assert.equal(quota.limitReached, true);
  assert.equal(quota.windows![LLMGATEWAY_WINDOW_MONTHLY].percentUsed, 1);
});

test("buildLlmgatewayQuota marks limitReached when weekly premium exhausted", () => {
  const fields = parseLlmgatewayKeyResponse(keyResponse({ devPlanPremiumCreditsUsed: "35.55" }));
  assert.ok(fields);
  const quota = buildLlmgatewayQuota(fields);
  assert.ok(quota);
  assert.equal(quota.limitReached, true);
});

// ─── fetchLlmgatewayQuota ──────────────────────────────────────────────────────

test("fetchLlmgatewayQuota returns null when no API key exists", async () => {
  const quota = await fetchLlmgatewayQuota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchLlmgatewayQuota parses a live /v1/key response with Bearer auth", async () => {
  const connectionId = `llmgw-live-${Date.now()}`;
  const calls: Array<{ url: unknown; init: unknown }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(JSON.stringify(PRO_KEY_RESPONSE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  const quota = (await fetchLlmgatewayQuota(connectionId, {
    apiKey: "llmgtwy_test",
  })) as LlmgatewayQuota | null;

  assert.equal(calls.length, 1);
  assert.equal(String(calls[0].url), "https://api.llmgateway.io/v1/key");
  assert.equal(
    (calls[0].init as RequestInit).headers!["Authorization" as never],
    "Bearer llmgtwy_test"
  );
  assert.equal(quota?.devPlan, "pro");
  assert.equal(quota?.monthlyLimit, 237);

  invalidateLlmgatewayQuotaCache(connectionId);
});

test("fetchLlmgatewayQuota returns null on 401 (invalid key)", async () => {
  const connectionId = `llmgw-401-${Date.now()}`;
  globalThis.fetch = async () => new Response(null, { status: 401 });
  const quota = await fetchLlmgatewayQuota(connectionId, { apiKey: "bad" });
  assert.equal(quota, null);
});

test("fetchLlmgatewayQuota returns null on 403 (publishable/session key)", async () => {
  const connectionId = `llmgw-403-${Date.now()}`;
  globalThis.fetch = async () => new Response(null, { status: 403 });
  const quota = await fetchLlmgatewayQuota(connectionId, { apiKey: "publishable" });
  assert.equal(quota, null);
});

test("fetchLlmgatewayQuota returns null for pay-as-you-go key", async () => {
  const connectionId = `llmgw-payg-${Date.now()}`;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: {
          devPlan: "none",
          devPlanCreditsUsed: "0",
          devPlanCreditsLimit: "0",
          devPlanCreditsRemaining: "0",
          devPlanPremiumWeeklyLimit: "0",
          devPlanPremiumCreditsUsed: "0",
          devPlanPremiumWeekResetsAt: null,
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  const quota = await fetchLlmgatewayQuota(connectionId, { apiKey: "payg" });
  assert.equal(quota, null);
});

test("fetchLlmgatewayQuota caches results within TTL", async () => {
  const connectionId = `llmgw-cache-${Date.now()}`;
  const calls: number[] = [];
  globalThis.fetch = async () => {
    calls.push(1);
    return new Response(JSON.stringify(PRO_KEY_RESPONSE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  const first = await fetchLlmgatewayQuota(connectionId, { apiKey: "llmgtwy_test" });
  const second = await fetchLlmgatewayQuota(connectionId, { apiKey: "llmgtwy_test" });
  assert.equal(calls.length, 1);
  assert.deepEqual(first, second);

  invalidateLlmgatewayQuotaCache(connectionId);
  await fetchLlmgatewayQuota(connectionId, { apiKey: "llmgtwy_test" });
  assert.equal(calls.length, 2);

  invalidateLlmgatewayQuotaCache(connectionId);
});

test("fetchLlmgatewayQuota returns null on network error (fail-open)", async () => {
  const connectionId = `llmgw-net-${Date.now()}`;
  globalThis.fetch = async () => {
    throw new Error("Network error");
  };
  const quota = await fetchLlmgatewayQuota(connectionId, { apiKey: "llmgtwy_test" });
  assert.equal(quota, null);
});

// ─── Registration + preflight ──────────────────────────────────────────────────

test("registerLlmgatewayQuotaFetcher wires preflight + monitor + windows", () => {
  registerLlmgatewayQuotaFetcher();
  assert.ok(getQuotaFetcher("llmgateway"));
  const windows = getQuotaWindows("llmgateway");
  assert.deepEqual([...windows], [LLMGATEWAY_WINDOW_MONTHLY, LLMGATEWAY_WINDOW_PREMIUM_WEEKLY]);
});

test("preflight proceeds when DevPass has headroom", async () => {
  const connectionId = `llmgw-proceed-${Date.now()}`;
  registerLlmgatewayQuotaFetcher();
  globalThis.fetch = async () =>
    new Response(JSON.stringify(PRO_KEY_RESPONSE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const preflight = await preflightQuota("llmgateway", connectionId, {
    apiKey: "llmgtwy_test",
    providerSpecificData: { quotaPreflightEnabled: true },
  });
  assert.equal(preflight.proceed, true);

  invalidateLlmgatewayQuotaCache(connectionId);
});

test("preflight blocks when a DevPass window is exhausted", async () => {
  const connectionId = `llmgw-block-${Date.now()}`;
  registerLlmgatewayQuotaFetcher();
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify(
        keyResponse({
          devPlanCreditsUsed: "237",
          devPlanCreditsLimit: "237",
          devPlanCreditsRemaining: "0",
        })
      ),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const preflight = await preflightQuota("llmgateway", connectionId, {
    apiKey: "llmgtwy_test",
    providerSpecificData: { quotaPreflightEnabled: true },
  });
  assert.equal(preflight.proceed, false);
  assert.equal(preflight.reason, "quota_exhausted");

  invalidateLlmgatewayQuotaCache(connectionId);
});

// ─── Usage leaf ────────────────────────────────────────────────────────────────

test("getLlmgatewayUsage returns monthly + weekly quota rows", async () => {
  const connectionId = `llmgw-usage-${Date.now()}`;
  globalThis.fetch = async () =>
    new Response(JSON.stringify(PRO_KEY_RESPONSE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const usage = await getLlmgatewayUsage(connectionId, "llmgtwy_test");
  assert.equal(usage.plan, "LLM Gateway DevPass (Pro)");
  const monthly = usage.quotas?.[LLMGATEWAY_WINDOW_MONTHLY];
  const premium = usage.quotas?.[LLMGATEWAY_WINDOW_PREMIUM_WEEKLY];
  assert.ok(monthly);
  assert.equal(monthly.total, 237);
  assert.equal(monthly.currency, "USD");
  assert.ok(premium);
  assert.equal(premium.resetAt, "2026-08-28T12:00:00.000Z");

  invalidateLlmgatewayQuotaCache(connectionId);
});

test("getLlmgatewayUsage surfaces pay-as-you-go state without quotas", async () => {
  const connectionId = `llmgw-usage-payg-${Date.now()}`;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: {
          devPlan: "none",
          devPlanCreditsUsed: "0",
          devPlanCreditsLimit: "0",
          devPlanCreditsRemaining: "0",
          devPlanPremiumWeeklyLimit: "0",
          devPlanPremiumCreditsUsed: "0",
          devPlanPremiumWeekResetsAt: null,
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const usage = await getLlmgatewayUsage(connectionId, "payg");
  assert.equal(usage.plan, "LLM Gateway (pay-as-you-go)");
  assert.deepEqual(usage.quotas, {});
});

test("getLlmgatewayUsage returns a message when no API key given", async () => {
  const usage = await getLlmgatewayUsage(`llmgw-nokey-${Date.now()}`, "");
  assert.ok(usage.message);
  assert.equal(usage.quotas, undefined);
});
