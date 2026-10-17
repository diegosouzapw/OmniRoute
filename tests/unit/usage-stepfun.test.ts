/**
 * StepFun usage fetcher (account balance quota).
 *
 * Verifies:
 *   - GET {base}/v1/accounts is fetched with the Bearer key and parsed into a
 *     credits-style quota entry (remaining balance, granted/topped-up split)
 *   - providerSpecificData.baseUrl selects the platform: api.stepfun.ai → USD,
 *     default api.stepfun.com → CNY
 *   - a /chat/completions suffix on the override is normalized away
 *   - zero balance reports limitReached without breaking the quotas shape
 *   - 401 and missing-key paths return messages instead of throwing
 *   - "stepfun" is registered in USAGE_FETCHER_PROVIDERS so the generic quota
 *     fetcher / provider-plugin manifest wire it up
 */
import test from "node:test";
import assert from "node:assert/strict";
import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage/fetcherProviders.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../open-sse/services/usage/supportedProviders.ts";
import { isSupportedUsageConnection } from "../../src/lib/usage/providerLimits.ts";
import {
  getStepfunUsage,
  resolveStepfunAccountsUrl,
  inferStepfunCurrency,
} from "../../open-sse/services/usage/stepfun.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("stepfun is registered as a usage-fetcher provider", () => {
  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("stepfun"));
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("stepfun"));
});

test("stepfun apikey connections pass the Provider Limits gate", () => {
  assert.equal(
    isSupportedUsageConnection({ id: "c1", provider: "stepfun", authType: "apikey" }),
    true
  );
});

test("resolveStepfunAccountsUrl normalizes base-url overrides", () => {
  assert.equal(
    resolveStepfunAccountsUrl({ baseUrl: "https://api.stepfun.ai/v1" }),
    "https://api.stepfun.ai/v1/accounts"
  );
  assert.equal(
    resolveStepfunAccountsUrl({ baseUrl: "https://api.stepfun.ai/v1/chat/completions" }),
    "https://api.stepfun.ai/v1/accounts"
  );
  assert.equal(
    resolveStepfunAccountsUrl({ baseUrl: "https://api.stepfun.ai/" }),
    "https://api.stepfun.ai/v1/accounts"
  );
  assert.equal(resolveStepfunAccountsUrl(undefined), "https://api.stepfun.com/v1/accounts");
  assert.equal(resolveStepfunAccountsUrl({}), "https://api.stepfun.com/v1/accounts");
});

test("inferStepfunCurrency maps the international host to USD", () => {
  assert.equal(inferStepfunCurrency("https://api.stepfun.ai/v1/accounts"), "USD");
  assert.equal(inferStepfunCurrency("https://api.stepfun.com/v1/accounts"), "CNY");
});

test("getUsageForProvider handles stepfun international balance via base-url override", async () => {
  let fetchedUrl = "";
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    fetchedUrl = String(input);
    return new Response(
      JSON.stringify({
        object: "account",
        type: "prepaid",
        balance: 5.0,
        total_cash_balance: 0.0,
        total_voucher_balance: 5.0,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const result = (await getUsageForProvider({
    id: "stepfun-test-1",
    provider: "stepfun",
    apiKey: "test-key",
    providerSpecificData: { baseUrl: "https://api.stepfun.ai/v1" },
  })) as {
    plan: string;
    isAvailable: boolean;
    limitReached: boolean;
    quotas: Record<string, Record<string, unknown>>;
  };

  assert.equal(fetchedUrl, "https://api.stepfun.ai/v1/accounts");
  assert.equal(result.plan, "StepFun");
  assert.equal(result.isAvailable, true);
  assert.equal(result.limitReached, false);
  assert.ok(result.quotas.credits_usd);
  assert.equal(result.quotas.credits_usd.remaining, 5);
  assert.equal(result.quotas.credits_usd.currency, "USD");
  assert.equal(result.quotas.credits_usd.grantedBalance, 5);
  assert.equal(result.quotas.credits_usd.toppedUpBalance, 0);
  assert.equal(result.quotas.credits_usd.unlimited, true);
});

test("stepfun defaults to the China platform and CNY display", async () => {
  let fetchedUrl = "";
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    fetchedUrl = String(input);
    return new Response(
      JSON.stringify({
        object: "account",
        type: "prepaid",
        balance: 120.5,
        total_cash_balance: 100.0,
        total_voucher_balance: 20.5,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const result = (await getStepfunUsage("test-key")) as {
    quotas: Record<string, Record<string, unknown>>;
  };

  assert.equal(fetchedUrl, "https://api.stepfun.com/v1/accounts");
  assert.ok(result.quotas.credits_cny);
  assert.equal(result.quotas.credits_cny.remaining, 120.5);
  assert.equal(result.quotas.credits_cny.currency, "CNY");
  assert.equal(result.quotas.credits_cny.toppedUpBalance, 100);
  assert.equal(result.quotas.credits_cny.grantedBalance, 20.5);
});

test("zero balance reports insufficient balance", async () => {
  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        object: "account",
        type: "prepaid",
        balance: 0,
        total_cash_balance: 0,
        total_voucher_balance: 0,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as typeof fetch;

  const result = (await getUsageForProvider({
    id: "stepfun-test-2",
    provider: "stepfun",
    apiKey: "test-key",
  })) as { plan: string; isAvailable: boolean; limitReached: boolean };

  assert.equal(result.plan, "StepFun (Insufficient Balance)");
  assert.equal(result.isAvailable, false);
  assert.equal(result.limitReached, true);
});

test("invalid key returns a message instead of throwing", async () => {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: { message: "Invalid API key" } }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;

  const result = (await getUsageForProvider({
    id: "stepfun-test-3",
    provider: "stepfun",
    apiKey: "bad-key",
  })) as { message?: string };

  assert.match(result.message ?? "", /Invalid StepFun API key/);
});

test("missing key returns the add-a-key message", async () => {
  const result = (await getUsageForProvider({
    id: "stepfun-test-4",
    provider: "stepfun",
  })) as { message?: string };

  assert.match(result.message ?? "", /Add a key/);
});
