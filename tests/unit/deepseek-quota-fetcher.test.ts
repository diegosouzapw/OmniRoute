import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchDeepseekQuota,
  invalidateDeepseekQuotaCache,
  registerDeepseekQuotaFetcher,
} from "../../open-sse/services/deepseekQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import {
  clearQuotaMonitors,
  getActiveMonitorCount,
  startQuotaMonitor,
  stopQuotaMonitor,
} from "../../open-sse/services/quotaMonitor.ts";
import { clearSessions, touchSession } from "../../open-sse/services/sessionManager.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
  clearSessions();
});

test("fetchDeepseekQuota returns null when no API key exists", async () => {
  const quota = await fetchDeepseekQuota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchDeepseekQuota returns null when usage endpoint returns 404", async () => {
  const connectionId = `deepseek-404-${Date.now()}`;

  globalThis.fetch = async () => {
    return new Response(null, { status: 404 });
  };

  const quota = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });
  assert.equal(quota, null);

  invalidateDeepseekQuotaCache(connectionId);
});

test("fetchDeepseekQuota returns null on 401/403 (invalid token)", async () => {
  const connectionId = `deepseek-auth-${Date.now()}`;

  globalThis.fetch = async () => {
    return new Response(null, { status: 401 });
  };

  const quota = await fetchDeepseekQuota(connectionId, { apiKey: "invalid-key" });
  assert.equal(quota, null);
});

test("fetchDeepseekQuota parses USD balance-based quota response", async () => {
  const connectionId = `deepseek-usd-${Date.now()}`;
  const calls = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        is_available: true,
        balance_infos: [
          {
            currency: "USD",
            total_balance: "50.00",
            granted_balance: "5.00",
            topped_up_balance: "45.00",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const quota = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].init.headers.Authorization, "Bearer test-key");
  assert.equal(quota?.percentUsed, 0);
  assert.equal(quota?.limitReached, false);
  assert.equal((quota as any)?.balances?.[0]?.currency, "USD");
  assert.equal((quota as any)?.balances?.[0]?.balance, 50);

  invalidateDeepseekQuotaCache(connectionId);
});

test("fetchDeepseekQuota parses CNY balance response", async () => {
  const connectionId = `deepseek-cny-${Date.now()}`;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        is_available: true,
        balance_infos: [
          {
            currency: "CNY",
            total_balance: "100.00",
            granted_balance: "0.00",
            topped_up_balance: "100.00",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const quota = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });

  assert.equal(quota?.percentUsed, 0);
  assert.equal((quota as any)?.balances?.[0]?.currency, "CNY");
  assert.equal((quota as any)?.balances?.[0]?.balance, 100);

  invalidateDeepseekQuotaCache(connectionId);
});

test("fetchDeepseekQuota parses both USD and CNY when both available", async () => {
  const connectionId = `deepseek-multi-${Date.now()}`;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        is_available: true,
        balance_infos: [
          {
            currency: "CNY",
            total_balance: "1000.00",
            granted_balance: "0.00",
            topped_up_balance: "1000.00",
          },
          {
            currency: "USD",
            total_balance: "50.00",
            granted_balance: "5.00",
            topped_up_balance: "45.00",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const quota = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });

  // Both currencies should be present in balances array
  assert.equal((quota as any)?.balances?.length, 2);
  const currencies = (quota as any)?.balances?.map((b: any) => b.currency);
  assert.ok(currencies.includes("USD"));
  assert.ok(currencies.includes("CNY"));

  invalidateDeepseekQuotaCache(connectionId);
});

test("fetchDeepseekQuota marks exhausted when is_available is false", async () => {
  const connectionId = `deepseek-exhausted-${Date.now()}`;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        is_available: false,
        balance_infos: [
          {
            currency: "USD",
            total_balance: "0.00",
            granted_balance: "0.00",
            topped_up_balance: "0.00",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const quota = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });

  assert.equal(quota?.limitReached, true);
  assert.equal(quota?.percentUsed, 1);
  assert.equal((quota as any)?.isAvailable, false);

  invalidateDeepseekQuotaCache(connectionId);
});

test("fetchDeepseekQuota marks exhausted when balance is zero", async () => {
  const connectionId = `deepseek-zero-${Date.now()}`;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        is_available: true,
        balance_infos: [
          {
            currency: "USD",
            total_balance: "0.00",
            granted_balance: "0.00",
            topped_up_balance: "0.00",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const quota = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });

  assert.equal(quota?.limitReached, true);
  assert.equal(quota?.percentUsed, 1);

  invalidateDeepseekQuotaCache(connectionId);
});

test("fetchDeepseekQuota caches results within TTL", async () => {
  const connectionId = `deepseek-cache-${Date.now()}`;
  const calls = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        is_available: true,
        balance_infos: [
          {
            currency: "USD",
            total_balance: "75.00",
            granted_balance: "5.00",
            topped_up_balance: "70.00",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const first = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });
  const second = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });

  assert.equal(calls.length, 1);
  assert.deepEqual(first, second);

  invalidateDeepseekQuotaCache(connectionId);

  const third = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });
  assert.equal(calls.length, 2);
});

test("fetchDeepseekQuota returns null on network error (fail-open)", async () => {
  const connectionId = `deepseek-network-${Date.now()}`;

  globalThis.fetch = async () => {
    throw new Error("Network error");
  };

  const quota = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });
  assert.equal(quota, null);
});

test("fetchDeepseekQuota returns null on timeout (fail-open)", async () => {
  const connectionId = `deepseek-timeout-${Date.now()}`;

  globalThis.fetch = async () => {
    await new Promise((_, reject) => setTimeout(reject, 100));
    throw new Error("Timeout");
  };

  const quota = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });
  assert.equal(quota, null);
});

test("registerDeepseekQuotaFetcher exposes DeepSeek quota to preflight", async () => {
  const connectionId = `deepseek-preflight-${Date.now()}`;

  registerDeepseekQuotaFetcher();

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        is_available: true,
        balance_infos: [
          {
            currency: "USD",
            total_balance: "100.00",
            granted_balance: "0.00",
            topped_up_balance: "100.00",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const preflight = await preflightQuota("deepseek", connectionId, {
    apiKey: "test-key",
    providerSpecificData: { quotaPreflightEnabled: true },
  });

  // DeepSeek with positive balance should proceed
  assert.equal(preflight.proceed, true);
});

test("registerDeepseekQuotaFetcher blocks when balance exhausted", async () => {
  const connectionId = `deepseek-block-${Date.now()}`;

  registerDeepseekQuotaFetcher();

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        is_available: false,
        balance_infos: [
          {
            currency: "USD",
            total_balance: "0.00",
            granted_balance: "0.00",
            topped_up_balance: "0.00",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const preflight = await preflightQuota("deepseek", connectionId, {
    apiKey: "test-key",
    providerSpecificData: { quotaPreflightEnabled: true },
  });

  // DeepSeek with exhausted balance should block
  assert.equal(preflight.proceed, false);

  invalidateDeepseekQuotaCache(connectionId);
});
