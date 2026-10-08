import { afterEach, test } from "node:test";
import assert from "node:assert/strict";

import {
  extractContext7Token,
  fetchContext7Quota,
  invalidateContext7QuotaCache,
  parseContext7RateLimitHeaders,
  registerContext7QuotaFetcher,
} from "../../open-sse/services/context7QuotaFetcher.ts";
import { getQuotaFetcher } from "../../open-sse/services/quotaPreflight.ts";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("extractContext7Token reads root and credentials shapes", () => {
  assert.equal(extractContext7Token({ apiKey: "ctx7sk-root" }), "ctx7sk-root");
  assert.equal(extractContext7Token({ credentials: { apiKey: "ctx7sk-nested" } }), "ctx7sk-nested");
  assert.equal(extractContext7Token({ accessToken: "ctx7sk-token" }), "ctx7sk-token");
  assert.equal(extractContext7Token({}), null);
});

test("parseContext7RateLimitHeaders maps ratelimit headers to QuotaInfo", () => {
  const headers = new Headers({
    "ratelimit-limit": "1000",
    "ratelimit-remaining": "985",
    "ratelimit-reset": "1790812800",
  });
  const q = parseContext7RateLimitHeaders(headers);
  assert.ok(q);
  assert.equal(q!.total, 1000);
  assert.equal(q!.remainingCredits, 985);
  assert.equal(q!.used, 15);
  assert.equal(q!.percentUsed, 15 / 1000);
  assert.equal(q!.limitReached, false);
  assert.equal(q!.resetAt, new Date(1790812800 * 1000).toISOString());
});

test("parseContext7RateLimitHeaders marks limitReached when remaining is 0", () => {
  const headers = new Headers({
    "ratelimit-limit": "1000",
    "ratelimit-remaining": "0",
    "ratelimit-reset": "60",
  });
  const q = parseContext7RateLimitHeaders(headers);
  assert.ok(q);
  assert.equal(q!.remainingCredits, 0);
  assert.equal(q!.used, 1000);
  assert.equal(q!.percentUsed, 1);
  assert.equal(q!.limitReached, true);
});

test("parseContext7RateLimitHeaders returns null when headers are missing", () => {
  assert.equal(parseContext7RateLimitHeaders(new Headers()), null);
  assert.equal(parseContext7RateLimitHeaders(new Headers({ "ratelimit-limit": "1000" })), null);
});

test("fetchContext7Quota calls GET /search?query=react with Authorization header", async () => {
  const connectionId = `ctx7-ok-${Date.now()}`;
  let calledUrl = "";
  let calledMethod = "";
  let calledAuth = "";

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calledUrl = String(input);
    calledMethod = init?.method || "GET";
    calledAuth = (init?.headers as Record<string, string>)?.Authorization || "";
    return new Response(null, {
      status: 200,
      headers: {
        "ratelimit-limit": "1000",
        "ratelimit-remaining": "800",
        "ratelimit-reset": "1790812800",
      },
    });
  }) as typeof globalThis.fetch;

  const quota = await fetchContext7Quota(connectionId, { apiKey: "ctx7sk-test-tok" });
  assert.ok(quota);
  assert.equal(calledUrl, "https://context7.com/api/v1/search?query=react");
  assert.equal(calledMethod, "GET");
  assert.equal(calledAuth, "Bearer ctx7sk-test-tok");
  assert.equal(quota!.remainingCredits, 800);
  assert.equal(quota!.limitReached, false);

  invalidateContext7QuotaCache(connectionId);
});

test("fetchContext7Quota fail-opens and caches null on 401", async () => {
  const connectionId = `ctx7-401-${Date.now()}`;
  globalThis.fetch = async () => new Response(null, { status: 401 });
  const quota = await fetchContext7Quota(connectionId, { apiKey: "mock-token" });
  assert.equal(quota, null);
  invalidateContext7QuotaCache(connectionId);
});

test("fetchContext7Quota reads ratelimit headers on HTTP 400 response", async () => {
  const connectionId = `ctx7-400-${Date.now()}`;
  globalThis.fetch = async () =>
    new Response(null, {
      status: 400,
      headers: {
        "ratelimit-limit": "200",
        "ratelimit-remaining": "198",
        "ratelimit-reset": "60",
      },
    });

  const quota = await fetchContext7Quota(connectionId, { apiKey: "mock-token" });
  assert.ok(quota);
  assert.equal(quota!.total, 200);
  assert.equal(quota!.remainingCredits, 198);
  assert.equal(quota!.limitReached, false);

  invalidateContext7QuotaCache(connectionId);
});

test("fetchContext7Quota caches null on 500 responses to prevent storming", async () => {
  const connectionId = `ctx7-500-${Date.now()}`;
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount++;
    return new Response("Internal Error", { status: 500 });
  };

  const q1 = await fetchContext7Quota(connectionId, { apiKey: "mock-token" });
  const q2 = await fetchContext7Quota(connectionId, { apiKey: "mock-token" });
  assert.equal(q1, null);
  assert.equal(q2, null);
  assert.equal(fetchCount, 1);

  invalidateContext7QuotaCache(connectionId);
});

test("fetchContext7Quota caches positive results for 60s", async () => {
  const connectionId = `ctx7-cache-${Date.now()}`;
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount++;
    return new Response(null, {
      status: 200,
      headers: {
        "ratelimit-limit": "500",
        "ratelimit-remaining": "450",
      },
    });
  };

  const q1 = await fetchContext7Quota(connectionId, { apiKey: "mock-token" });
  const q2 = await fetchContext7Quota(connectionId, { apiKey: "mock-token" });
  assert.ok(q1);
  assert.ok(q2);
  assert.equal(q1!.remainingCredits, 450);
  assert.equal(q2!.remainingCredits, 450);
  assert.equal(fetchCount, 1);

  invalidateContext7QuotaCache(connectionId);
});

test("registerContext7QuotaFetcher registers context7 for preflight", async () => {
  registerContext7QuotaFetcher();
  const fetcher = getQuotaFetcher("context7");
  assert.ok(fetcher, "context7 must be registered in quotaPreflight");

  const connectionId = `ctx7-preflight-${Date.now()}`;
  globalThis.fetch = async () =>
    new Response(null, {
      status: 200,
      headers: {
        "ratelimit-limit": "100",
        "ratelimit-remaining": "0",
      },
    });

  const res = await fetcher(connectionId, { apiKey: "mock-token" });
  assert.ok(res);
  assert.equal((res as { limitReached: boolean }).limitReached, true);

  invalidateContext7QuotaCache(connectionId);
});

test("fetchContext7Quota does not probe upstream without a key (no anonymous limit misattribution)", async () => {
  const connectionId = `ctx7-nokey-${Date.now()}`;
  let fetchCount = 0;
  globalThis.fetch = (async () => {
    fetchCount++;
    return new Response(null, {
      status: 200,
      headers: { "ratelimit-limit": "60", "ratelimit-remaining": "59" },
    });
  }) as typeof globalThis.fetch;

  const quota = await fetchContext7Quota(connectionId, {});
  assert.equal(quota, null);
  assert.equal(fetchCount, 0);

  invalidateContext7QuotaCache(connectionId);
});

test("fetchContext7Quota bounds the probe with an abort signal", async () => {
  const connectionId = `ctx7-timeout-${Date.now()}`;
  let signal: AbortSignal | null | undefined;
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    signal = init?.signal;
    return new Response(null, {
      status: 200,
      headers: { "ratelimit-limit": "100", "ratelimit-remaining": "90" },
    });
  }) as typeof globalThis.fetch;

  await fetchContext7Quota(connectionId, { apiKey: "mock-token" });
  assert.ok(signal instanceof AbortSignal, "probe must carry an AbortSignal timeout");

  invalidateContext7QuotaCache(connectionId);
});
