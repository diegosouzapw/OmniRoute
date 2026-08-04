// Characterization of the services/usage.ts deepseek split (god-file decomposition): the DeepSeek
// balance fetcher (getDeepseekUsage) moved into services/usage/deepseek.ts so usage.ts stays a
// thin dispatcher. Behavior-preserving move — this locks the export surface and the
// credits-style shaping; the full balance matrix is covered via getUsageForProvider in
// usage-service-deepseek.test.ts.
import { test } from "node:test";
import assert from "node:assert/strict";

const D = await import("../../open-sse/services/usage/deepseek.ts");

test("module exposes getDeepseekUsage", () => {
  assert.equal(typeof D.getDeepseekUsage, "function");
});

test("getDeepseekUsage surfaces USD + CNY balances as unlimited credits entries", async () => {
  const originalFetch = globalThis.fetch;
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
  try {
    const r = (await D.getDeepseekUsage("conn-multi", "k")) as {
      plan?: string;
      quotas?: Record<string, { remaining: number; currency: string; unlimited: boolean }>;
    };
    assert.equal(r.plan, "DeepSeek");
    assert.equal(r.quotas?.credits_usd.remaining, 50);
    assert.equal(r.quotas?.credits_usd.currency, "USD");
    assert.equal(r.quotas?.credits_cny.remaining, 1000);
    assert.equal(r.quotas?.credits_usd.unlimited, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getDeepseekUsage labels the plan '(Insufficient Balance)' when is_available is false", async () => {
  const originalFetch = globalThis.fetch;
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
  try {
    const r = (await D.getDeepseekUsage("conn-empty", "k")) as {
      plan?: string;
      isAvailable?: boolean;
      limitReached?: boolean;
    };
    assert.equal(r.plan, "DeepSeek (Insufficient Balance)");
    assert.equal(r.isAvailable, false);
    assert.equal(r.limitReached, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
