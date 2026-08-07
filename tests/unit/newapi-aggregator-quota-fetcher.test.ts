import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchNewApiAggregatorQuota,
  invalidateNewApiAggregatorQuotaCache,
  isNewApiAggregatorBalanceConnection,
  type NewApiAggregatorQuota,
} from "../../open-sse/services/newApiAggregatorQuotaFetcher.ts";

interface FetchCall {
  url: string;
  headers: Record<string, string>;
}

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("fetchNewApiAggregatorQuota returns null when credentials are missing", async () => {
  const quota = await fetchNewApiAggregatorQuota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchNewApiAggregatorQuota returns null when only systemAccessToken is present", async () => {
  const quota = await fetchNewApiAggregatorQuota(`partial-${Date.now()}`, {
    providerSpecificData: {
      consoleApiKey: "sat-only",
      newApiAggregatorBalance: true,
    },
  });
  assert.equal(quota, null);
});

test("fetchNewApiAggregatorQuota returns null when newApiAggregatorBalance is not true", async () => {
  const connectionId = `no-flag-${Date.now()}`;
  const calls: FetchCall[] = [];

  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url, headers: init.headers as Record<string, string> });
    return new Response(JSON.stringify({ data: { quota: 250_000 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  // Without the flag, the fetcher should not fire
  const quota = await fetchNewApiAggregatorQuota(connectionId, {
    providerSpecificData: {
      consoleApiKey: "system-access-token",
      newApiUserId: "42",
    },
  });

  assert.equal(quota, null);
  assert.equal(calls.length, 0);
});

test("fetchNewApiAggregatorQuota parses balance, sends correct headers, strips /v1 from baseUrl", async () => {
  const connectionId = `agg-strip-${Date.now()}`;
  const calls: FetchCall[] = [];

  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url, headers: init.headers as Record<string, string> });
    return new Response(JSON.stringify({ data: { quota: 250_000 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const quota = (await fetchNewApiAggregatorQuota(connectionId, {
    providerSpecificData: {
      consoleApiKey: "system-access-token",
      newApiUserId: "42",
      newApiAggregatorBalance: true,
      baseUrl: "https://my-newapi.example.com/v1",
    },
  })) as NewApiAggregatorQuota | null;

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://my-newapi.example.com/api/user/self");
  assert.equal(calls[0].headers["Authorization"], "Bearer system-access-token");
  assert.equal(calls[0].headers["New-Api-User"], "42");
  assert.ok(quota);
  assert.equal(quota.rawQuota, 250_000);
  assert.equal(quota.dollarBalance, 0.5);
  assert.equal(quota.limitReached, false);
  assert.equal(quota.percentUsed, 0);

  invalidateNewApiAggregatorQuotaCache(connectionId);
});

test("fetchNewApiAggregatorQuota works with baseUrl without /v1", async () => {
  const connectionId = `agg-nov1-${Date.now()}`;
  const calls: FetchCall[] = [];

  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url, headers: init.headers as Record<string, string> });
    return new Response(JSON.stringify({ data: { quota: 500_000 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const quota = (await fetchNewApiAggregatorQuota(connectionId, {
    providerSpecificData: {
      consoleApiKey: "sat",
      newApiUserId: "1",
      newApiAggregatorBalance: true,
      baseUrl: "https://my-newapi.example.com",
    },
  })) as NewApiAggregatorQuota | null;

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://my-newapi.example.com/api/user/self");
  assert.ok(quota);
  assert.equal(quota.dollarBalance, 1);

  invalidateNewApiAggregatorQuotaCache(connectionId);
});

test("fetchNewApiAggregatorQuota marks quota exhausted when balance is zero", async () => {
  const connectionId = `agg-zero-${Date.now()}`;

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ data: { quota: 0 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const quota = (await fetchNewApiAggregatorQuota(connectionId, {
    providerSpecificData: {
      consoleApiKey: "sat",
      newApiUserId: "7",
      newApiAggregatorBalance: true,
      baseUrl: "https://my-newapi.example.com",
    },
  })) as NewApiAggregatorQuota | null;

  assert.ok(quota);
  assert.equal(quota.limitReached, true);
  assert.equal(quota.percentUsed, 1);

  invalidateNewApiAggregatorQuotaCache(connectionId);
});

test("fetchNewApiAggregatorQuota honors custom quotaPerUnit override", async () => {
  const connectionId = `agg-custom-unit-${Date.now()}`;

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ data: { quota: 100 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const quota = (await fetchNewApiAggregatorQuota(connectionId, {
    providerSpecificData: {
      consoleApiKey: "sat",
      newApiUserId: "1",
      newApiAggregatorBalance: true,
      baseUrl: "https://my-newapi.example.com",
      quotaPerUnit: 100,
    },
  })) as NewApiAggregatorQuota | null;

  assert.ok(quota);
  assert.equal(quota.rawQuota, 100);
  assert.equal(quota.dollarBalance, 1);

  invalidateNewApiAggregatorQuotaCache(connectionId);
});

test("fetchNewApiAggregatorQuota falls back to default 500000 when quotaPerUnit is invalid", async () => {
  const connectionId = `agg-invalid-unit-${Date.now()}`;

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ data: { quota: 500_000 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const quota = (await fetchNewApiAggregatorQuota(connectionId, {
    providerSpecificData: {
      consoleApiKey: "sat",
      newApiUserId: "1",
      newApiAggregatorBalance: true,
      baseUrl: "https://my-newapi.example.com",
      quotaPerUnit: 0, // invalid
    },
  })) as NewApiAggregatorQuota | null;

  assert.ok(quota);
  assert.equal(quota.dollarBalance, 1); // 500000 / 500000 = 1

  invalidateNewApiAggregatorQuotaCache(connectionId);
});

test("fetchNewApiAggregatorQuota caches results within the TTL window", async () => {
  const connectionId = `agg-cache-${Date.now()}`;
  let callCount = 0;

  globalThis.fetch = (async () => {
    callCount += 1;
    return new Response(JSON.stringify({ data: { quota: 100_000 } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const connection = {
    providerSpecificData: {
      consoleApiKey: "sat",
      newApiUserId: "1",
      newApiAggregatorBalance: true,
      baseUrl: "https://my-newapi.example.com",
    },
  };
  await fetchNewApiAggregatorQuota(connectionId, connection);
  await fetchNewApiAggregatorQuota(connectionId, connection);

  assert.equal(callCount, 1);
  invalidateNewApiAggregatorQuotaCache(connectionId);
});

test("fetchNewApiAggregatorQuota evicts cache on 401/403", async () => {
  const connectionId = `agg-401-${Date.now()}`;

  globalThis.fetch = (async () => new Response(null, { status: 401 })) as typeof fetch;

  const quota = await fetchNewApiAggregatorQuota(connectionId, {
    providerSpecificData: {
      consoleApiKey: "bad-token",
      newApiUserId: "1",
      newApiAggregatorBalance: true,
      baseUrl: "https://my-newapi.example.com",
    },
  });

  assert.equal(quota, null);
});

test("fetchNewApiAggregatorQuota returns null when baseUrl is missing", async () => {
  const connectionId = `agg-nobaseurl-${Date.now()}`;

  const quota = await fetchNewApiAggregatorQuota(connectionId, {
    providerSpecificData: {
      consoleApiKey: "sat",
      newApiUserId: "1",
      newApiAggregatorBalance: true,
      // baseUrl intentionally omitted
    },
  });

  assert.equal(quota, null);
});

test("isNewApiAggregatorBalanceConnection detects aggregator flag", () => {
  assert.equal(
    isNewApiAggregatorBalanceConnection({
      providerSpecificData: { newApiAggregatorBalance: true },
    }),
    true
  );
  assert.equal(
    isNewApiAggregatorBalanceConnection({
      providerSpecificData: { newApiAggregatorBalance: false },
    }),
    false
  );
  assert.equal(
    isNewApiAggregatorBalanceConnection({
      providerSpecificData: {},
    }),
    false
  );
  assert.equal(isNewApiAggregatorBalanceConnection({}), false);
  assert.equal(isNewApiAggregatorBalanceConnection(), false);
});
