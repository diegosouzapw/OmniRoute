import test from "node:test";
import assert from "node:assert/strict";

import {
  extractXaiOauthAccessToken,
  fetchXaiOauthQuota,
  invalidateXaiOauthQuotaCache,
  registerXaiOauthQuotaFetcher,
} from "../../open-sse/services/xaiOauthQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import { clearQuotaMonitors } from "../../open-sse/services/quotaMonitor.ts";
import { clearSessions } from "../../open-sse/services/sessionManager.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
  clearSessions();
});

function billingResponse(creditUsagePercent: number, endIso?: string) {
  return new Response(
    JSON.stringify({
      config: {
        creditUsagePercent,
        currentPeriod: {
          type: "WEEKLY",
          start: "2026-07-17T06:34:33.775Z",
          end: endIso || "2026-07-28T01:47:00.000Z",
        },
        productUsage: [{ product: "Api", usagePercent: creditUsagePercent }],
        isUnifiedBillingUser: true,
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test("extractXaiOauthAccessToken reads root and credentials shapes", () => {
  assert.equal(extractXaiOauthAccessToken(undefined), null);
  assert.equal(extractXaiOauthAccessToken({}), null);
  assert.equal(extractXaiOauthAccessToken({ accessToken: "  root-token  " }), "root-token");
  assert.equal(
    extractXaiOauthAccessToken({ credentials: { accessToken: "nested-token" } }),
    "nested-token"
  );
});

test("fetchXaiOauthQuota returns null when no access token", async () => {
  const connectionId = `xao-missing-${Date.now()}`;
  const quota = await fetchXaiOauthQuota(connectionId, {});
  assert.equal(quota, null);
  invalidateXaiOauthQuotaCache(connectionId);
});

test("fetchXaiOauthQuota calls billing with Bearer token and maps percent used", async () => {
  const connectionId = `xao-billing-${Date.now()}`;
  const calls: Array<{ url: string; init?: RequestInit }> = [];

  globalThis.fetch = async (url, init) => {
    const urlStr = typeof url === "string" ? url : String(url);
    calls.push({ url: urlStr, init });
    if (urlStr.includes("billing")) {
      return billingResponse(3.0);
    }
    return new Response("not found", { status: 404 });
  };

  const quota = await fetchXaiOauthQuota(connectionId, {
    accessToken: "xai-oauth-access",
  });

  assert.notEqual(quota, null, "expected non-null quota");
  assert.equal(quota!.percentUsed, 0.03, "3% used → 0.03 fraction");
  assert.equal(quota!.used, 3);
  assert.equal(quota!.total, 100);
  assert.ok(quota!.resetAt?.includes("2026-07-28"), "resetAt from currentPeriod.end");
  assert.ok(quota!.windows?.weekly, "weekly window present");
  assert.equal(quota!.windows!.weekly.percentUsed, 0.03);

  const billingCall = calls.find((c) => c.url.includes("billing"));
  assert.ok(billingCall, "billing call made");
  const headers = billingCall!.init?.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer xai-oauth-access");
  assert.equal(headers["x-grok-client-mode"], "cli");

  invalidateXaiOauthQuotaCache(connectionId);
});

test("fetchXaiOauthQuota fail-opens on 401", async () => {
  const connectionId = `xao-401-${Date.now()}`;
  globalThis.fetch = async () => new Response("Unauthorized", { status: 401 });

  const quota = await fetchXaiOauthQuota(connectionId, { accessToken: "dead-token" });
  assert.equal(quota, null);
  invalidateXaiOauthQuotaCache(connectionId);
});

test("fetchXaiOauthQuota caches results for 60s", async () => {
  const connectionId = `xao-cache-${Date.now()}`;
  let fetchCount = 0;

  globalThis.fetch = async (url) => {
    const urlStr = typeof url === "string" ? url : String(url);
    if (urlStr.includes("billing")) {
      fetchCount += 1;
      return billingResponse(15.5);
    }
    return new Response("not found", { status: 404 });
  };

  const q1 = await fetchXaiOauthQuota(connectionId, { accessToken: "tok" });
  assert.equal(fetchCount, 1);
  const q2 = await fetchXaiOauthQuota(connectionId, { accessToken: "tok" });
  assert.equal(fetchCount, 1, "second call uses cache");
  assert.equal(q1!.percentUsed, q2!.percentUsed);
  assert.equal(q1!.percentUsed, 0.155);

  invalidateXaiOauthQuotaCache(connectionId);
});

test("registerXaiOauthQuotaFetcher registers xai-oauth for preflight", async () => {
  registerXaiOauthQuotaFetcher();

  globalThis.fetch = async (url) => {
    const urlStr = typeof url === "string" ? url : String(url);
    if (urlStr.includes("billing")) {
      return billingResponse(10);
    }
    return new Response("not found", { status: 404 });
  };

  const connectionId = `xao-reg-${Date.now()}`;
  const result = await preflightQuota("xai-oauth", connectionId, {
    provider: "xai-oauth",
    id: connectionId,
    accessToken: "tok",
  });
  assert.equal(result.proceed, true, "preflight proceeds with headroom");

  invalidateXaiOauthQuotaCache(connectionId);
});
