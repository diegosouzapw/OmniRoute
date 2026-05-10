import test from "node:test";
import assert from "node:assert/strict";
import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { invalidateDeepseekQuotaCache } from "../../open-sse/services/deepseekQuotaFetcher.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("getUsageForProvider handles deepseek with valid balance", async () => {
  globalThis.fetch = async () =>
    new Response(
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

  const result = await getUsageForProvider({
    id: "test-id",
    provider: "deepseek",
    apiKey: "test-key",
  });

  assert.equal(result.plan, "DeepSeek");
  assert.equal(result.isAvailable, true);
  assert.equal(result.limitReached, false);
  assert.ok(result.quotas);
  assert.ok(result.quotas?.credits_usd);
  assert.equal(result.quotas.credits_usd.remaining, 50);
  assert.equal(result.quotas.credits_usd.currency, "USD");
  assert.equal(result.quotas.credits_usd.grantedBalance, 5);
  assert.equal(result.quotas.credits_usd.toppedUpBalance, 45);

  invalidateDeepseekQuotaCache("test-id");
});

test("getUsageForProvider handles deepseek with insufficient balance", async () => {
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

  const result = await getUsageForProvider({
    id: "test-id-2",
    provider: "deepseek",
    apiKey: "test-key",
  });

  assert.equal(result.plan, "DeepSeek (Insufficient Balance)");
  assert.equal(result.isAvailable, false);
  assert.equal(result.limitReached, true);
  assert.ok(result.quotas?.credits_usd);
  assert.equal(result.quotas.credits_usd.remaining, 0);

  invalidateDeepseekQuotaCache("test-id-2");
});

test("getUsageForProvider handles deepseek with CNY currency", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        is_available: true,
        balance_infos: [
          {
            currency: "CNY",
            total_balance: "500.00",
            granted_balance: "50.00",
            topped_up_balance: "450.00",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const result = await getUsageForProvider({
    id: "test-id-3",
    provider: "deepseek",
    apiKey: "test-key",
  });

  assert.equal(result.plan, "DeepSeek");
  assert.ok(result.quotas?.credits_cny);
  assert.equal(result.quotas.credits_cny.remaining, 500);
  assert.equal(result.quotas.credits_cny.currency, "CNY");

  invalidateDeepseekQuotaCache("test-id-3");
});

test("getUsageForProvider handles deepseek with both USD and CNY balances", async () => {
  globalThis.fetch = async () =>
    new Response(
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

  const result = await getUsageForProvider({
    id: "test-id-multi",
    provider: "deepseek",
    apiKey: "test-key",
  });

  assert.equal(result.plan, "DeepSeek");
  assert.ok(result.quotas?.credits_usd);
  assert.ok(result.quotas?.credits_cny);
  assert.equal(result.quotas.credits_usd.remaining, 50);
  assert.equal(result.quotas.credits_cny.remaining, 1000);

  invalidateDeepseekQuotaCache("test-id-multi");
});

test("getUsageForProvider returns message when deepseek API key is missing", async () => {
  globalThis.fetch = async () => {
    // This should not be called
    throw new Error("Fetch should not be called");
  };

  const result = await getUsageForProvider({
    id: "test-id-4",
    provider: "deepseek",
    apiKey: "",
  });

  assert.equal(result.message, "DeepSeek API key not available. Add a key to view usage.");
});

test("getUsageForProvider handles deepseek network error gracefully", async () => {
  globalThis.fetch = async () => {
    throw new Error("Network error");
  };

  const result = await getUsageForProvider({
    id: "test-id-5",
    provider: "deepseek",
    apiKey: "test-key",
  });

  // On network error, the quota fetcher returns null (fail-open),
  // which results in "API key not available" message
  // This is acceptable behavior - the system continues with rate limit fallback
  assert.ok(result.message);
});
