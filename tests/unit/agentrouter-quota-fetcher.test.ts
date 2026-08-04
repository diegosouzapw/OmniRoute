import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchAgentrouterQuota,
  invalidateAgentrouterQuotaCache,
  registerAgentrouterQuotaFetcher,
  type AgentrouterQuota,
} from "../../open-sse/services/agentrouterQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import { clearQuotaMonitors } from "../../open-sse/services/quotaMonitor.ts";

interface FetchCall {
  url: string;
  headers: Record<string, string>;
}

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
});

test("fetchAgentrouterQuota returns null when credentials are missing", async () => {
  const quota = await fetchAgentrouterQuota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchAgentrouterQuota returns null when only systemAccessToken is present", async () => {
  const quota = await fetchAgentrouterQuota(`partial-${Date.now()}`, {
    providerSpecificData: { consoleApiKey: "sat-only" },
  });
  assert.equal(quota, null);
});

test("fetchAgentrouterQuota parses balance and sends the New-Api-User header", async () => {
  const connectionId = `agentrouter-${Date.now()}`;
  const calls: FetchCall[] = [];

  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url, headers: init.headers as Record<string, string> });
    return new Response(JSON.stringify({ data: { quota: 250_000 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const quota = (await fetchAgentrouterQuota(connectionId, {
    providerSpecificData: { consoleApiKey: "system-access-token", newApiUserId: "42" },
  })) as AgentrouterQuota | null;

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://agentrouter.org/api/user/self");
  assert.equal(calls[0].headers["Authorization"], "Bearer system-access-token");
  assert.equal(calls[0].headers["New-Api-User"], "42");
  assert.ok(quota);
  assert.equal(quota.rawQuota, 250_000);
  assert.equal(quota.dollarBalance, 0.5);
  assert.equal(quota.limitReached, false);
  assert.equal(quota.percentUsed, 0);

  invalidateAgentrouterQuotaCache(connectionId);
});

test("fetchAgentrouterQuota marks quota exhausted when balance is zero", async () => {
  const connectionId = `agentrouter-zero-${Date.now()}`;

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ data: { quota: 0 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const quota = (await fetchAgentrouterQuota(connectionId, {
    providerSpecificData: { consoleApiKey: "sat", newApiUserId: "7" },
  })) as AgentrouterQuota | null;

  assert.ok(quota);
  assert.equal(quota.limitReached, true);
  assert.equal(quota.percentUsed, 1);

  invalidateAgentrouterQuotaCache(connectionId);
});

test("fetchAgentrouterQuota caches results within the TTL window", async () => {
  const connectionId = `agentrouter-cache-${Date.now()}`;
  let callCount = 0;

  globalThis.fetch = (async () => {
    callCount += 1;
    return new Response(JSON.stringify({ data: { quota: 100_000 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const connection = { providerSpecificData: { consoleApiKey: "sat", newApiUserId: "1" } };
  await fetchAgentrouterQuota(connectionId, connection);
  await fetchAgentrouterQuota(connectionId, connection);

  assert.equal(callCount, 1);
  invalidateAgentrouterQuotaCache(connectionId);
});

test("fetchAgentrouterQuota evicts cache on 401", async () => {
  const connectionId = `agentrouter-401-${Date.now()}`;

  globalThis.fetch = (async () => new Response(null, { status: 401 })) as typeof fetch;

  const quota = await fetchAgentrouterQuota(connectionId, {
    providerSpecificData: { consoleApiKey: "bad-token", newApiUserId: "1" },
  });

  assert.equal(quota, null);
});

test("registerAgentrouterQuotaFetcher wires into preflightQuota", async () => {
  registerAgentrouterQuotaFetcher();

  const connectionId = `agentrouter-preflight-${Date.now()}`;

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ data: { quota: 0 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const result = await preflightQuota("agentrouter", connectionId, {
    providerSpecificData: {
      consoleApiKey: "sat",
      newApiUserId: "9",
      quotaPreflightEnabled: true,
    },
  });

  assert.equal(result.proceed, false);

  invalidateAgentrouterQuotaCache(connectionId);
});
