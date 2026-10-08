import test from "node:test";
import assert from "node:assert/strict";

import {
  extractJinaToken,
  fetchJinaQuota,
  invalidateJinaQuotaCache,
  parseJinaCreditUsage,
  registerJinaQuotaFetcher,
} from "../../open-sse/services/jinaQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function jinaBalanceResponse(balance: number, status = 200, code = 200): Response {
  return new Response(
    JSON.stringify({
      code,
      data: {
        user_id: "usr-jina-test",
        wallet: {
          total_balance: balance,
          trial_balance: 0,
          recharge_balance: 0,
        },
      },
    }),
    { status, headers: { "content-type": "application/json" } }
  );
}

const KEY_FIELD = "apiKey";

test("extractJinaToken reads root and credentials shapes", () => {
  assert.equal(extractJinaToken(undefined), null);
  assert.equal(extractJinaToken({}), null);
  assert.equal(extractJinaToken({ [KEY_FIELD]: "jina-token-val" }), "jina-token-val");
  assert.equal(
    extractJinaToken({ credentials: { [KEY_FIELD]: "nested-jina-token" } }),
    "nested-jina-token"
  );
});

test("parseJinaCreditUsage maps wallet balance to remainingCredits", () => {
  const q = parseJinaCreditUsage({
    code: 200,
    data: {
      user_id: "u1",
      wallet: {
        total_balance: 9850000,
        trial_balance: 0,
        recharge_balance: 0,
      },
    },
  });
  assert.ok(q);
  assert.equal(q!.remainingCredits, 9850000);
  assert.equal(q!.total, 9850000);
  assert.equal(q!.used, 0);
  assert.equal(q!.percentUsed, 0);
  assert.equal(q!.limitReached, false);
});

test("parseJinaCreditUsage marks limitReached when total_balance is 0", () => {
  const q = parseJinaCreditUsage({
    code: 200,
    data: {
      user_id: "u2",
      wallet: {
        total_balance: 0,
        trial_balance: 0,
        recharge_balance: 0,
      },
    },
  });
  assert.ok(q);
  assert.equal(q!.remainingCredits, 0);
  assert.equal(q!.limitReached, true);
  assert.equal(q!.percentUsed, 1);
});

test("parseJinaCreditUsage returns null on non-200 code or invalid shape", () => {
  assert.equal(parseJinaCreditUsage(null), null);
  assert.equal(parseJinaCreditUsage({ code: 401 }), null);
  assert.equal(parseJinaCreditUsage({ code: 200, data: {} }), null);
});

test("parseJinaCreditUsage accepts top-level wallet response without code field", () => {
  const q = parseJinaCreditUsage({
    user_id: "usr-jina-test",
    wallet: {
      total_balance: 5000000,
      trial_balance: 0,
      recharge_balance: 0,
    },
  });
  assert.ok(q);
  assert.equal(q!.remainingCredits, 5000000);
  assert.equal(q!.total, 5000000);
  assert.equal(q!.used, 0);
  assert.equal(q!.percentUsed, 0);
  assert.equal(q!.limitReached, false);
});

test("parseJinaCreditUsage returns null when top-level wallet total_balance is negative", () => {
  const q = parseJinaCreditUsage({
    user_id: "usr-jina-test",
    wallet: {
      total_balance: -50,
      trial_balance: 0,
      recharge_balance: 0,
    },
  });
  assert.equal(q, null);
});

test("fetchJinaQuota returns null when no API key", async () => {
  const connectionId = `jina-missing-${Date.now()}`;
  const quota = await fetchJinaQuota(connectionId, {});
  assert.equal(quota, null);
  invalidateJinaQuotaCache(connectionId);
});

test("fetchJinaQuota calls /fe_user with query param api_key", async () => {
  const connectionId = `jina-live-${Date.now()}`;
  const calls: Array<{ url: string; init?: RequestInit }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return jinaBalanceResponse(5000000);
  };

  const quota = await fetchJinaQuota(connectionId, { [KEY_FIELD]: "jina-tok" });
  assert.ok(quota);
  assert.equal(quota!.remainingCredits, 5000000);
  assert.equal(quota!.limitReached, false);

  assert.equal(calls.length, 1);
  assert.match(
    calls[0].url,
    /https:\/\/dash\.jina\.ai\/api\/v1\/api_key\/fe_user\?api_key=jina-tok/
  );

  invalidateJinaQuotaCache(connectionId);
});

test("fetchJinaQuota fail-opens and caches null on 401", async () => {
  const connectionId = `jina-401-${Date.now()}`;
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount++;
    return new Response("Unauthorized", { status: 401 });
  };
  const q1 = await fetchJinaQuota(connectionId, { [KEY_FIELD]: "bad-tok" });
  const q2 = await fetchJinaQuota(connectionId, { [KEY_FIELD]: "bad-tok" });
  assert.equal(q1, null);
  assert.equal(q2, null);
  assert.equal(fetchCount, 1);
  invalidateJinaQuotaCache(connectionId);
});

test("fetchJinaQuota caches null on 500 responses to prevent storming", async () => {
  const connectionId = `jina-500-${Date.now()}`;
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount++;
    return new Response("Server Error", { status: 500 });
  };
  const q1 = await fetchJinaQuota(connectionId, { [KEY_FIELD]: "tok" });
  const q2 = await fetchJinaQuota(connectionId, { [KEY_FIELD]: "tok" });
  assert.equal(fetchCount, 1);
  assert.equal(q1, null);
  assert.equal(q2, null);
  invalidateJinaQuotaCache(connectionId);
});

test("fetchJinaQuota caches positive results for 60s", async () => {
  const connectionId = `jina-cached-${Date.now()}`;
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount++;
    return jinaBalanceResponse(100000);
  };

  const q1 = await fetchJinaQuota(connectionId, { [KEY_FIELD]: "tok" });
  const q2 = await fetchJinaQuota(connectionId, { [KEY_FIELD]: "tok" });
  assert.equal(fetchCount, 1);
  assert.deepEqual(q1, q2);

  invalidateJinaQuotaCache(connectionId);
});

test("registerJinaQuotaFetcher registers all Jina provider aliases for preflight", async () => {
  registerJinaQuotaFetcher();

  globalThis.fetch = async () => jinaBalanceResponse(0);

  const aliases = ["jina-search", "jina", "jina-ai", "jina-reader"];
  for (const alias of aliases) {
    const connId = `jina-test-${alias}-${Date.now()}`;
    const res = await preflightQuota(alias, connId, {
      id: connId,
      provider: alias,
      [KEY_FIELD]: "tok",
    });
    assert.equal(res.proceed, false, `expected proceed=false for ${alias} with 0 balance`);
    invalidateJinaQuotaCache(connId);
  }
});

test("fetchJinaQuota bounds the balance probe with an abort signal", async () => {
  const connectionId = `jina-timeout-${Date.now()}`;
  let signal: AbortSignal | null | undefined;
  globalThis.fetch = (async (_url: RequestInfo | URL, init?: RequestInit) => {
    signal = init?.signal;
    return jinaBalanceResponse(1000);
  }) as typeof globalThis.fetch;

  await fetchJinaQuota(connectionId, { apiKey: "jina-timeout-key" });
  assert.ok(signal instanceof AbortSignal, "probe must carry an AbortSignal timeout");

  invalidateJinaQuotaCache(connectionId);
});

test("fetchJinaQuota never surfaces the credential-bearing URL when fetch rejects", async () => {
  const connectionId = `jina-reject-${Date.now()}`;
  const secret = "jina_secret_should_not_leak";
  globalThis.fetch = (async (url: RequestInfo | URL) => {
    throw new Error(`request to ${String(url)} failed`);
  }) as typeof globalThis.fetch;

  const quota = await fetchJinaQuota(connectionId, { apiKey: secret });
  assert.equal(quota, null);
  assert.ok(!JSON.stringify(quota ?? {}).includes(secret));

  invalidateJinaQuotaCache(connectionId);
});
