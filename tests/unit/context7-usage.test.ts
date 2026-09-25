import test from "node:test";
import assert from "node:assert/strict";

import { getContext7Usage } from "../../open-sse/services/usage/context7.ts";
import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { isSupportedUsageConnection } from "../../src/lib/usage/providerLimits.ts";
import { invalidateContext7QuotaCache } from "../../open-sse/services/context7QuotaFetcher.ts";

const originalFetch = globalThis.fetch;

function context7RateLimitResponse(limit: number, remaining: number, reset?: string) {
  return new Response(null, {
    status: 200,
    headers: {
      "ratelimit-limit": String(limit),
      "ratelimit-remaining": String(remaining),
      ...(reset ? { "ratelimit-reset": reset } : {}),
    },
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("getContext7Usage returns error message when no connectionId", async () => {
  const res = await getContext7Usage("");
  assert.match((res as { message: string }).message, /connection id unavailable/);
});

test("getContext7Usage returns standardized PlanQuota shape when quota fetched", async () => {
  const connectionId = `ctx7-ok-${Date.now()}`;
  globalThis.fetch = async () => context7RateLimitResponse(1000, 850);

  const usage = (await getContext7Usage(connectionId, "ctx7sk-tok")) as Record<string, unknown>;
  assert.ok(usage);
  assert.equal(usage.plan, "Context7 · Search Tier");
  assert.equal(usage.remainingCredits, 850);
  assert.equal(usage.planCredits, 1000);
  const quotas = usage.quotas as Record<string, Record<string, unknown>>;
  assert.equal(quotas.monthly.used, 150);
  assert.equal(quotas.monthly.total, 1000);
  assert.equal(quotas.monthly.remaining, 850);
  assert.equal(usage.limitReached, false);

  invalidateContext7QuotaCache(connectionId);
});

test("getContext7Usage handles exhausted tier", async () => {
  const connectionId = `ctx7-zero-${Date.now()}`;
  globalThis.fetch = async () => context7RateLimitResponse(1000, 0);

  const usage = (await getContext7Usage(connectionId, "ctx7sk-tok")) as Record<string, unknown>;
  assert.ok(usage);
  assert.equal(usage.remainingCredits, 0);
  const quotas = usage.quotas as Record<string, Record<string, unknown>>;
  assert.equal(quotas.monthly.used, 1000);
  assert.equal(quotas.monthly.total, 1000);
  assert.equal(quotas.monthly.remaining, 0);
  assert.equal(usage.limitReached, true);

  invalidateContext7QuotaCache(connectionId);
});

test("getUsageForProvider dispatches context7 to getContext7Usage", async () => {
  const connectionId = `ctx7-dispatch-${Date.now()}`;
  globalThis.fetch = async () => context7RateLimitResponse(500, 400);

  const u = (await getUsageForProvider({
    provider: "context7",
    id: connectionId,
    apiKey: "ctx7sk-tok",
  })) as Record<string, unknown>;
  assert.ok(u);
  assert.equal(u.plan, "Context7 · Search Tier");
  assert.equal(u.remainingCredits, 400);

  invalidateContext7QuotaCache(connectionId);
});

test("isSupportedUsageConnection allows context7", () => {
  assert.equal(
    isSupportedUsageConnection({ id: "c1", provider: "context7", authType: "apikey" }),
    true
  );
});
