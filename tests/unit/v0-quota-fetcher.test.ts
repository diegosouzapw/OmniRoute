import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchV0Quota,
  invalidateV0QuotaCache,
  registerV0QuotaFetcher,
  V0_WINDOW_CREDITS,
  V0_WINDOW_DAILY_OPS,
  type V0Quota,
} from "../../open-sse/services/v0QuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import { clearQuotaMonitors } from "../../open-sse/services/quotaMonitor.ts";

interface FetchCall {
  url: string;
}

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
});

test("fetchV0Quota returns null when no API key exists", async () => {
  const quota = await fetchV0Quota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchV0Quota parses both billing and rate-limit windows", async () => {
  const connectionId = `v0-${Date.now()}`;
  const calls: FetchCall[] = [];

  globalThis.fetch = (async (url: string) => {
    calls.push({ url });
    if (url.endsWith("/v1/user/billing")) {
      return new Response(
        JSON.stringify({
          billingType: "credit",
          data: { remaining: 20, limit: 100, reset: "2026-08-01T00:00:00.000Z" },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ remaining: 900, limit: 1000, reset: "2026-07-18T00:00:00.000Z" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const quota = (await fetchV0Quota(connectionId, { apiKey: "v0-key" })) as V0Quota | null;

  assert.equal(calls.length, 2);
  assert.ok(quota);
  assert.equal(quota.billingType, "credit");
  assert.equal(quota.windows[V0_WINDOW_CREDITS].percentUsed, 0.8);
  assert.equal(quota.windows[V0_WINDOW_DAILY_OPS].percentUsed, 0.1);
  // Worst-case window (credits, 80% used) drives the top-level percentUsed.
  assert.equal(quota.percentUsed, 0.8);

  invalidateV0QuotaCache(connectionId);
});

test("fetchV0Quota degrades to unknown billingType without misparsing", async () => {
  const connectionId = `v0-unknown-${Date.now()}`;

  globalThis.fetch = (async (url: string) => {
    if (url.endsWith("/v1/user/billing")) {
      return new Response(JSON.stringify({ someNewShape: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({ remaining: 500, limit: 1000, reset: "2026-07-18T00:00:00.000Z" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const quota = (await fetchV0Quota(connectionId, { apiKey: "v0-key" })) as V0Quota | null;

  assert.ok(quota);
  // Billing window was unparseable — only the daily-ops window is present.
  assert.equal(quota.windows[V0_WINDOW_CREDITS], undefined);
  assert.equal(quota.windows[V0_WINDOW_DAILY_OPS].percentUsed, 0.5);

  invalidateV0QuotaCache(connectionId);
});

test("fetchV0Quota evicts cache on 401 from either endpoint", async () => {
  const connectionId = `v0-401-${Date.now()}`;

  globalThis.fetch = (async (url: string) => {
    if (url.endsWith("/v1/user/billing")) {
      return new Response(null, { status: 401 });
    }
    return new Response(JSON.stringify({ remaining: 500, limit: 1000 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const quota = await fetchV0Quota(connectionId, { apiKey: "bad-key" });
  assert.equal(quota, null);
});

test("fetchV0Quota caches results within the TTL window", async () => {
  const connectionId = `v0-cache-${Date.now()}`;
  let callCount = 0;

  globalThis.fetch = (async () => {
    callCount += 1;
    return new Response(JSON.stringify({ remaining: 500, limit: 1000 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  await fetchV0Quota(connectionId, { apiKey: "v0-key" });
  await fetchV0Quota(connectionId, { apiKey: "v0-key" });

  // 2 calls per fetch (billing + rate-limits) x 1 fetch (2nd hit cache) = 2
  assert.equal(callCount, 2);
  invalidateV0QuotaCache(connectionId);
});

test("registerV0QuotaFetcher wires into preflightQuota and registers windows", async () => {
  registerV0QuotaFetcher();

  const connectionId = `v0-preflight-${Date.now()}`;

  globalThis.fetch = (async (url: string) => {
    if (url.endsWith("/v1/user/billing")) {
      return new Response(
        JSON.stringify({ billingType: "credit", data: { remaining: 0, limit: 100 } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ remaining: 1000, limit: 1000 }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const result = await preflightQuota("v0-vercel", connectionId, {
    apiKey: "v0-key",
    providerSpecificData: { quotaPreflightEnabled: true },
  });

  assert.equal(result.proceed, false);

  invalidateV0QuotaCache(connectionId);
});
