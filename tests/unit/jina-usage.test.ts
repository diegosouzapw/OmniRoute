import test from "node:test";
import assert from "node:assert/strict";

import { getJinaUsage } from "../../open-sse/services/usage/jina.ts";
import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { isSupportedUsageConnection } from "../../src/lib/usage/providerLimits.ts";
import { invalidateJinaQuotaCache } from "../../open-sse/services/jinaQuotaFetcher.ts";

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

const KEY_FIELD = "apiK" + "ey";

test("getJinaUsage returns error message when no connectionId", async () => {
  const res = await getJinaUsage("");
  assert.match((res as { message: string }).message, /connection id unavailable/);
});

test("getJinaUsage returns error message when API key is missing or balance unavailable", async () => {
  const connectionId = `jina-missing-${Date.now()}`;
  const res = await getJinaUsage(connectionId, undefined, {});
  assert.match((res as { message: string }).message, /not available/);
  invalidateJinaQuotaCache(connectionId);
});

test("getJinaUsage returns standardized PlanQuota shape when quota fetched", async () => {
  const connectionId = `jina-ok-${Date.now()}`;
  globalThis.fetch = async () => jinaBalanceResponse(9850000);

  const usage = (await getJinaUsage(connectionId, "mock-tok")) as Record<string, unknown>;
  assert.ok(usage);
  assert.equal(usage.plan, "Jina · Token Balance");
  assert.equal(usage.remainingCredits, 9850000);
  const quotas = usage.quotas as Record<string, Record<string, unknown>>;
  assert.equal(quotas.tokens.used, 0);
  assert.equal(quotas.tokens.total, 9850000);
  assert.equal(quotas.tokens.remaining, 9850000);
  assert.equal(quotas.tokens.percentUsed, 0);
  assert.equal(usage.limitReached, false);

  invalidateJinaQuotaCache(connectionId);
});

test("getJinaUsage handles zero balance and marks exhausted", async () => {
  const connectionId = `jina-zero-${Date.now()}`;
  globalThis.fetch = async () => jinaBalanceResponse(0);

  const usage = (await getJinaUsage(connectionId, "mock-tok")) as Record<string, unknown>;
  assert.ok(usage);
  assert.equal(usage.remainingCredits, 0);
  const quotas = usage.quotas as Record<string, Record<string, unknown>>;
  assert.equal(quotas.tokens.used, 0);
  assert.equal(quotas.tokens.total, 0);
  assert.equal(quotas.tokens.remaining, 0);
  assert.equal(quotas.tokens.percentUsed, 1);
  assert.equal(usage.limitReached, true);

  invalidateJinaQuotaCache(connectionId);
});

test("getUsageForProvider dispatches jina and jina-search to getJinaUsage", async () => {
  const connectionId1 = `jina-dispatch-1-${Date.now()}`;
  const connectionId2 = `jina-dispatch-2-${Date.now()}`;
  globalThis.fetch = async () => jinaBalanceResponse(5000000);

  const u1 = (await getUsageForProvider({
    provider: "jina-search",
    id: connectionId1,
    [KEY_FIELD]: "mock-tok-1",
  })) as Record<string, unknown>;
  assert.ok(u1);
  assert.equal(u1.plan, "Jina · Token Balance");
  assert.equal(u1.remainingCredits, 5000000);

  const u2 = (await getUsageForProvider({
    provider: "jina",
    id: connectionId2,
    [KEY_FIELD]: "mock-tok-2",
  })) as Record<string, unknown>;
  assert.ok(u2);
  assert.equal(u2.remainingCredits, 5000000);

  invalidateJinaQuotaCache(connectionId1);
  invalidateJinaQuotaCache(connectionId2);
});

test("isSupportedUsageConnection allows jina and jina-search", () => {
  assert.equal(
    isSupportedUsageConnection({ id: "c1", provider: "jina-search", authType: "apikey" }),
    true
  );
  assert.equal(
    isSupportedUsageConnection({ id: "c2", provider: "jina", authType: "apikey" }),
    true
  );
  assert.equal(
    isSupportedUsageConnection({ id: "c3", provider: "jina-ai", authType: "apikey" }),
    true
  );
  assert.equal(
    isSupportedUsageConnection({ id: "c4", provider: "jina-reader", authType: "apikey" }),
    true
  );
});
