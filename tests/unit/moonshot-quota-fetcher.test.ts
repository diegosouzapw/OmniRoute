import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchMoonshotQuota,
  invalidateMoonshotQuotaCache,
  registerMoonshotQuotaFetcher,
  getMoonshotOpenPlatformUsage,
} from "../../open-sse/services/moonshotQuotaFetcher.ts";
import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { getQuotaFetcher } from "../../open-sse/services/quotaPreflight.ts";

const originalFetch = globalThis.fetch;
const CN = "https://api.moonshot.cn/v1";
const COMPAT = "openai-compatible-chat-e2971611-bc02-4c37-8fc5-39b8e3906fdf";

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("fetchMoonshotQuota parses available_balance > 0 as not exhausted", async () => {
  const connectionId = `ms-pos-${Date.now()}`;
  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://api.moonshot.cn/v1/users/me/balance");
    return jsonResponse({
      code: 0,
      data: { available_balance: 2.5, voucher_balance: 0, cash_balance: 2.5 },
      status: true,
    });
  };
  const q = await fetchMoonshotQuota(connectionId, {
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: CN },
  });
  assert.equal(q?.limitReached, false);
  assert.equal(q?.percentUsed, 0);
  invalidateMoonshotQuotaCache(connectionId);
});

test("fetchMoonshotQuota treats available_balance 0 as exhausted", async () => {
  const connectionId = `ms-zero-${Date.now()}`;
  globalThis.fetch = async () =>
    jsonResponse({
      code: 0,
      data: { available_balance: 0, voucher_balance: 0, cash_balance: 0 },
      status: true,
    });
  const q = await fetchMoonshotQuota(connectionId, {
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: CN },
  });
  assert.equal(q?.limitReached, true);
  invalidateMoonshotQuotaCache(connectionId);
});

test("fetchMoonshotQuota returns null on 401", async () => {
  const connectionId = `ms-401-${Date.now()}`;
  globalThis.fetch = async () => new Response(null, { status: 401 });
  const q = await fetchMoonshotQuota(connectionId, {
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: CN },
  });
  assert.equal(q, null);
});

test("getUsageForProvider on custom uuid hits Moonshot path", async () => {
  const connectionId = `ms-uuid-${Date.now()}`;
  globalThis.fetch = async () =>
    jsonResponse({
      code: 0,
      data: { available_balance: 15, voucher_balance: 15, cash_balance: 0 },
      status: true,
    });
  const usage = await getUsageForProvider({
    id: connectionId,
    provider: COMPAT,
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: CN },
  });
  assert.equal(typeof usage === "object" && usage && "message" in usage, false);
  assert.equal((usage as { plan?: string }).plan, "Kimi 开放平台（国内）");
  invalidateMoonshotQuotaCache(connectionId);
});

test("getMoonshotOpenPlatformUsage uses Open Platform plan label for .ai host", async () => {
  const connectionId = `ms-ai-${Date.now()}`;
  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://api.moonshot.ai/v1/users/me/balance");
    return jsonResponse({
      code: 0,
      data: { available_balance: 1, voucher_balance: 0, cash_balance: 1 },
      status: true,
    });
  };
  const usage = await getMoonshotOpenPlatformUsage({
    id: connectionId,
    provider: "moonshot",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.moonshot.ai/v1" },
  });
  assert.equal(usage.plan, "Kimi Open Platform");
  invalidateMoonshotQuotaCache(connectionId);
});

test("domestic Moonshot balance is labeled CNY, international USD", async () => {
  const cnId = `ms-cny-${Date.now()}`;
  globalThis.fetch = async () =>
    jsonResponse({
      code: 0,
      data: { available_balance: 15, voucher_balance: 15, cash_balance: 0 },
      status: true,
    });
  const cn = await getMoonshotOpenPlatformUsage({
    id: cnId,
    provider: COMPAT,
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: CN },
  });
  assert.equal(cn.quotas?.available?.currency, "CNY");
  invalidateMoonshotQuotaCache(cnId);

  const aiId = `ms-usd-${Date.now()}`;
  const ai = await getMoonshotOpenPlatformUsage({
    id: aiId,
    provider: "moonshot",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.moonshot.ai/v1" },
  });
  assert.equal(ai.quotas?.available?.currency, "USD");
  invalidateMoonshotQuotaCache(aiId);
});

test("exhausted available_balance does not leave voucher/cash at 100%", async () => {
  const connectionId = `ms-empty-pct-${Date.now()}`;
  globalThis.fetch = async () =>
    jsonResponse({
      code: 0,
      data: { available_balance: 0, voucher_balance: 0, cash_balance: 0 },
      status: true,
    });
  const usage = await getMoonshotOpenPlatformUsage({
    id: connectionId,
    provider: COMPAT,
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: CN },
  });
  assert.equal(usage.quotas?.available?.remaining, 0);
  assert.equal(usage.quotas?.available?.remainingPercentage, 0);
  assert.equal(usage.quotas?.voucher?.remaining, 0);
  assert.equal(usage.quotas?.voucher?.remainingPercentage, 0);
  assert.equal(usage.quotas?.cash?.remaining, 0);
  assert.equal(usage.quotas?.cash?.remainingPercentage, 0);
  invalidateMoonshotQuotaCache(connectionId);
});

test("voucher leftover is 100% only when that bucket still has money", async () => {
  const connectionId = `ms-voucher-left-${Date.now()}`;
  globalThis.fetch = async () =>
    jsonResponse({
      code: 0,
      data: { available_balance: 0, voucher_balance: 5, cash_balance: 0 },
      status: true,
    });
  const usage = await getMoonshotOpenPlatformUsage({
    id: connectionId,
    provider: COMPAT,
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: CN },
  });
  assert.equal(usage.quotas?.available?.remainingPercentage, 0);
  assert.equal(usage.quotas?.voucher?.remainingPercentage, 100);
  assert.equal(usage.quotas?.cash?.remainingPercentage, 0);
  invalidateMoonshotQuotaCache(connectionId);
});

test("limitReached is derived from availableBalance, so remaining>0 cannot coexist with it", async () => {
  const connectionId = `ms-limit-eq-${Date.now()}`;
  globalThis.fetch = async () =>
    jsonResponse({
      code: 0,
      data: { available_balance: 2.5, voucher_balance: 0, cash_balance: 2.5 },
      status: true,
    });
  const usage = await getMoonshotOpenPlatformUsage({
    id: connectionId,
    provider: COMPAT,
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: CN },
  });
  assert.equal(usage.limitReached, false);
  assert.equal(usage.quotas?.available?.remaining, 2.5);
  assert.equal(usage.quotas?.available?.remainingPercentage, 100);
  invalidateMoonshotQuotaCache(connectionId);
});

test("registerMoonshotQuotaFetcher wires moonshot and kimi ids", () => {
  registerMoonshotQuotaFetcher();
  assert.equal(typeof getQuotaFetcher("moonshot"), "function");
  assert.equal(typeof getQuotaFetcher("kimi"), "function");
});

test("openai-compatible node with Kimi Coding baseUrl reads /usages", async () => {
  const calls: string[] = [];
  globalThis.fetch = (async (url: unknown) => {
    calls.push(String(url));
    return jsonResponse({
      usage: {
        limit: "100",
        used: "15",
        remaining: "85",
        resetTime: "2099-09-25T02:24:04Z",
      },
    });
  }) as typeof fetch;

  const usage = await getUsageForProvider({
    id: "compat-coding",
    provider: COMPAT,
    apiKey: "sk-coding-key",
    providerSpecificData: { baseUrl: "https://api.kimi.com/coding/v1" },
  });

  assert.deepEqual(calls, ["https://api.kimi.com/coding/v1/usages"]);
  assert.equal((usage as { plan?: string }).plan, "Kimi Coding");
});

test("moonshot connection with Kimi Coding baseUrl reads /usages, not Open Platform balance", async () => {
  const calls: string[] = [];
  globalThis.fetch = (async (url: unknown) => {
    calls.push(String(url));
    return jsonResponse({
      usage: {
        limit: "100",
        used: "15",
        remaining: "85",
        resetTime: "2099-09-25T02:24:04Z",
      },
    });
  }) as typeof fetch;

  const usage = await getUsageForProvider({
    id: "kimi-coding-on-moonshot",
    provider: "moonshot",
    apiKey: "sk-coding-key",
    providerSpecificData: { baseUrl: "https://api.kimi.com/coding/v1" },
  });

  assert.deepEqual(calls, ["https://api.kimi.com/coding/v1/usages"]);
  assert.equal((usage as { plan?: string }).plan, "Kimi Coding");
  assert.equal(
    (usage as { quotas?: Record<string, { remainingPercentage?: number }> }).quotas?.code_7d
      ?.remainingPercentage,
    85
  );
});

test("Kimi Coding preflight caches a miss for the 60s TTL and does not refetch", async () => {
  const connectionId = `coding-miss-${Date.now()}`;
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return jsonResponse({ plan: "Kimi Coding" }, 500);
  }) as typeof fetch;

  const conn = {
    provider: "moonshot",
    apiKey: "sk-coding-key",
    providerSpecificData: { baseUrl: "https://api.kimi.com/coding/v1" },
  };
  const first = await fetchMoonshotQuota(connectionId, conn);
  const second = await fetchMoonshotQuota(connectionId, conn);
  assert.equal(first, null);
  assert.equal(second, null);
  assert.equal(calls, 1);
  invalidateMoonshotQuotaCache(connectionId);
});

test("registered moonshot quota fetcher uses Coding /usages for kimi.com/coding baseUrl", async () => {
  registerMoonshotQuotaFetcher();
  const calls: string[] = [];
  globalThis.fetch = (async (url: unknown) => {
    calls.push(String(url));
    return jsonResponse({
      usage: {
        limit: "100",
        used: "15",
        remaining: "85",
        resetTime: "2099-09-25T02:24:04Z",
      },
    });
  }) as typeof fetch;

  const fetcher = getQuotaFetcher("moonshot");
  assert.equal(typeof fetcher, "function");
  const quota = await fetcher!("coding-on-moonshot", {
    provider: "moonshot",
    apiKey: "sk-coding-key",
    providerSpecificData: { baseUrl: "https://api.kimi.com/coding/v1" },
  });

  assert.deepEqual(calls, ["https://api.kimi.com/coding/v1/usages"]);
  assert.ok(quota);
  assert.equal(quota!.windows?.code_7d?.percentUsed, 0.15);
  assert.equal(quota!.window7d?.percentUsed, 0.15);
});

test("registerMoonshotFetchersForNodes registers custom node id and prefix", async () => {
  const { registerMoonshotFetchersForNodes } =
    await import("../../open-sse/services/moonshotQuotaFetcher.ts");
  const uuid = "openai-compatible-chat-e2971611-bc02-4c37-8fc5-39b8e3906fdf";
  registerMoonshotFetchersForNodes([
    { id: uuid, prefix: "mnative", baseUrl: CN },
    { id: "other", prefix: "oc-prod", baseUrl: "https://api.openai.com/v1" },
  ]);
  assert.equal(typeof getQuotaFetcher(uuid), "function");
  assert.equal(typeof getQuotaFetcher("mnative"), "function");
  assert.equal(getQuotaFetcher("oc-prod"), undefined);
});

test("registerMoonshotFetchersForNodes still wires a kimi.com/coding node", async () => {
  const { registerMoonshotFetchersForNodes } =
    await import("../../open-sse/services/moonshotQuotaFetcher.ts");
  registerMoonshotFetchersForNodes([
    {
      id: "coding-node",
      prefix: "kcode",
      baseUrl: "https://api.kimi.com/coding/v1",
    },
  ]);
  assert.equal(typeof getQuotaFetcher("coding-node"), "function");
  assert.equal(typeof getQuotaFetcher("kcode"), "function");
});
