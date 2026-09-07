import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-limits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "grok-provider-limits-test-key-32-bytes-minimum";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { getUsageForProvider, USAGE_FETCHER_PROVIDERS } =
  await import("../../open-sse/services/usage.ts");
const { __testing: grokTesting } = await import("../../open-sse/services/usage/grokCli.ts");
const providerLimitsDb = await import("../../src/lib/db/providerLimits.ts");
const { mergeProviderLimitsCacheEntry } =
  await import("../../src/lib/usage/providerLimitsCache.ts");

const originalFetch = globalThis.fetch;

interface FetchCall {
  url: string;
  init: RequestInit;
}

function response(value: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });
}

function successFixtures(
  options: {
    tier?: unknown;
    userId?: unknown;
    prepaidBalance?: Record<string, unknown> | null | undefined;
    productUsage?: unknown;
    creditUsagePercent?: number | null;
    omitCreditUsagePercent?: boolean;
    omitProductUsage?: boolean;
    currentPeriod?: Record<string, unknown> | null;
  } = {}
) {
  const tier = "tier" in options ? options.tier : "SuperGrok Heavy";
  const userId = "userId" in options ? options.userId : "canonical-user-id";
  const prepaidBalance =
    "prepaidBalance" in options ? options.prepaidBalance : ({ val: 1234 } as const);
  const productUsage =
    "productUsage" in options
      ? options.productUsage
      : [
          { product: "API", usagePercent: 12.5 },
          { product: "Grok Code", usagePercent: 44 },
        ];
  const currentPeriod =
    "currentPeriod" in options
      ? options.currentPeriod
      : {
          type: "WEEKLY",
          start: "2026-07-27T00:00:00.000Z",
          end: "2026-08-03T00:00:00.000Z",
        };

  return async (input: string | URL | Request) => {
    const url = String(input);
    if (url.endsWith("/user?include=subscription")) {
      return response({
        ...(userId === undefined ? {} : { userId }),
        ...(tier === undefined ? {} : { subscriptionTier: tier }),
        email: "must-not-be-exposed@example.invalid",
      });
    }
    if (url.endsWith("/billing?format=credits")) {
      return response({
        config: {
          ...(options.omitCreditUsagePercent
            ? {}
            : {
                creditUsagePercent:
                  "creditUsagePercent" in options ? options.creditUsagePercent : 37.25,
              }),
          ...(currentPeriod === undefined ? {} : { currentPeriod }),
          ...(options.omitProductUsage ? {} : { productUsage }),
          ...(prepaidBalance === undefined ? {} : { prepaidBalance }),
        },
      });
    }
    if (url.endsWith("/auto-topup-rule")) {
      return response({
        rule: {
          enabled: true,
          minBeforeHittingSl: { val: 500 },
          topupAmount: { val: 2000 },
          maxAmountPerMonth: { val: 10000 },
          paymentMethodId: "must-not-be-exposed",
        },
      });
    }
    return new Response(null, { status: 404 });
  };
}

interface UsageResult {
  plan?: string;
  message?: string;
  quotas?: Record<
    string,
    {
      displayName?: string;
      used: number;
      total: number;
      remaining: number;
      remainingPercentage: number;
      resetAt: string | null;
      isPercentageOnly: boolean;
    }
  >;
  billing?: {
    currency: "USD";
    extraCreditsMinorUnits?: number;
    autoTopUp: {
      available: boolean;
      enabled?: boolean;
      thresholdMinorUnits?: number;
      amountMinorUnits?: number;
      maxMonthlyMinorUnits?: number;
    };
    additionalCreditsUrl: string;
  };
}

async function getUsage(fetchImpl: typeof fetch): Promise<UsageResult> {
  globalThis.fetch = fetchImpl;
  return (await getUsageForProvider({
    id: "connection-id",
    provider: "grok-cli",
    accessToken: "fixture-access-token",
  })) as UsageResult;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("grok-cli fetches the fixed read-only surfaces with the full Grok client profile", async () => {
  const calls: FetchCall[] = [];
  const fixtureFetch = successFixtures();
  const usage = await getUsage((async (input: string | URL | Request, init: RequestInit = {}) => {
    calls.push({ url: String(input), init });
    return fixtureFetch(input);
  }) as typeof fetch);

  assert.equal(usage.plan, "SuperGrok Heavy");
  assert.deepEqual(usage.quotas?.weekly, {
    used: 37.25,
    total: 100,
    remaining: 62.75,
    remainingPercentage: 62.75,
    resetAt: "2026-08-03T00:00:00.000Z",
    isPercentageOnly: true,
  });
  assert.deepEqual(usage.quotas?.product_api, {
    displayName: "API",
    used: 12.5,
    total: 100,
    remaining: 87.5,
    remainingPercentage: 87.5,
    resetAt: "2026-08-03T00:00:00.000Z",
    isPercentageOnly: true,
  });
  assert.deepEqual(usage.billing, {
    currency: "USD",
    extraCreditsMinorUnits: 1234,
    autoTopUp: {
      available: true,
      enabled: true,
      thresholdMinorUnits: 500,
      amountMinorUnits: 2000,
      maxMonthlyMinorUnits: 10000,
    },
    additionalCreditsUrl: "https://grok.com/build?_s=usage",
  });

  assert.deepEqual(
    calls.map((call) => call.url),
    [
      "https://cli-chat-proxy.grok.com/v1/user?include=subscription",
      "https://cli-chat-proxy.grok.com/v1/billing?format=credits",
      "https://cli-chat-proxy.grok.com/v1/auto-topup-rule",
    ]
  );
  for (const { init } of calls) {
    assert.equal(init.method, "GET");
    assert.equal(init.redirect, "error");
    assert.equal(init.body, undefined);
    assert.ok(init.signal instanceof AbortSignal);
    const headers = new Headers(init.headers);
    assert.equal(headers.get("accept"), "application/json");
    assert.equal(headers.get("authorization"), "Bearer fixture-access-token");
    assert.equal(headers.get("x-xai-token-auth"), "xai-grok-cli");
    assert.ok(headers.get("user-agent"));
    assert.ok(headers.get("x-grok-client-version"));
    assert.ok(headers.get("x-grok-client-identifier"));
    assert.equal(headers.get("x-grok-client-mode"), "headless");
  }
  assert.equal(new Headers(calls[0].init.headers).has("x-userid"), false);
  assert.equal(new Headers(calls[2].init.headers).get("x-userid"), "canonical-user-id");
  assert.deepEqual(grokTesting.networkPolicy, {
    method: "GET",
    redirect: "error",
    timeoutMs: 10_000,
    maxResponseBytes: 256 * 1024,
  });

  const serialized = JSON.stringify(usage);
  for (const sensitive of [
    "fixture-access-token",
    "canonical-user-id",
    "must-not-be-exposed@example.invalid",
    "paymentMethodId",
  ]) {
    assert.equal(serialized.includes(sensitive), false);
  }
});

test("grok-cli preserves unknown and missing values without fabricating billing state", async () => {
  for (const tier of [undefined, null, "", "   "]) {
    const usage = await getUsage(successFixtures({ tier }) as typeof fetch);
    assert.equal(usage.plan, undefined);
  }
  const future = await getUsage(
    successFixtures({ tier: "Future Experimental Tier" }) as typeof fetch
  );
  assert.equal(future.plan, "Future Experimental Tier");

  const missing = await getUsage(successFixtures({ prepaidBalance: undefined }) as typeof fetch);
  assert.ok(missing.billing);
  assert.equal("extraCreditsMinorUnits" in missing.billing, false);

  const explicitZero = await getUsage(
    successFixtures({ prepaidBalance: { val: 0 } }) as typeof fetch
  );
  assert.equal(explicitZero.billing?.extraCreditsMinorUnits, 0);

  const calls: string[] = [];
  const withoutUserId = successFixtures({ userId: undefined });
  const noIdentity = await getUsage((async (input: string | URL | Request) => {
    calls.push(String(input));
    return withoutUserId(input);
  }) as typeof fetch);
  assert.ok(calls.some((url) => url.endsWith("/billing?format=credits")));
  assert.equal(
    calls.some((url) => url.endsWith("/auto-topup-rule")),
    false
  );
  assert.deepEqual(noIdentity.billing?.autoTopUp, { available: false });
});

test("official Cent wrappers distinguish omission and normalize signed minor units", async () => {
  for (const [prepaidBalance, expected] of [
    [undefined, undefined],
    [{}, 0],
    [{ val: 0 }, 0],
    [{ val: 1234 }, 1234],
    [{ val: -1234 }, 1234],
  ] as const) {
    const usage = await getUsage(successFixtures({ prepaidBalance }) as typeof fetch);
    assert.equal(usage.billing?.extraCreditsMinorUnits, expected);
  }

  for (const [amount, expected] of [
    [undefined, undefined],
    [{}, 0],
    [{ val: 0 }, 0],
    [{ val: 1234 }, 1234],
    [{ val: -1234 }, 1234],
  ] as const) {
    const fixture = successFixtures();
    const usage = await getUsage((async (input: string | URL | Request) => {
      const url = String(input);
      if (!url.endsWith("/auto-topup-rule")) return fixture(input);
      return response({
        rule: {
          enabled: true,
          ...(amount === undefined
            ? {}
            : {
                minBeforeHittingSl: amount,
                topupAmount: amount,
                maxAmountPerMonth: amount,
              }),
        },
      });
    }) as typeof fetch);
    assert.equal(usage.billing?.autoTopUp.thresholdMinorUnits, expected);
    assert.equal(usage.billing?.autoTopUp.amountMinorUnits, expected);
    assert.equal(usage.billing?.autoTopUp.maxMonthlyMinorUnits, expected);
  }
});

test("auto top-up distinguishes disabled rules from unavailable responses", async () => {
  for (const rule of [{}, { enabled: false }]) {
    const fixture = successFixtures();
    const usage = await getUsage((async (input: string | URL | Request) =>
      String(input).endsWith("/auto-topup-rule")
        ? response({ rule })
        : fixture(input)) as typeof fetch);
    assert.deepEqual(usage.billing?.autoTopUp, { available: true, enabled: false });
  }

  for (const payload of [
    {},
    { rule: null },
    { rule: "malformed" },
    { rule: { enabled: "malformed" } },
  ]) {
    const fixture = successFixtures();
    const usage = await getUsage((async (input: string | URL | Request) =>
      String(input).endsWith("/auto-topup-rule")
        ? response(payload)
        : fixture(input)) as typeof fetch);
    assert.deepEqual(usage.billing?.autoTopUp, { available: false });
  }

  const fixture = successFixtures();
  const failed = await getUsage((async (input: string | URL | Request) =>
    String(input).endsWith("/auto-topup-rule")
      ? new Response(null, { status: 500 })
      : fixture(input)) as typeof fetch);
  assert.deepEqual(failed.billing?.autoTopUp, { available: false });
});

test("empty tiers retain the canonical user id for the auto-topup request", async () => {
  for (const tier of [undefined, null, "", "   "]) {
    const calls: FetchCall[] = [];
    const fixture = successFixtures({ tier, userId: " canonical-user-id " });
    const usage = await getUsage((async (input: string | URL | Request, init: RequestInit = {}) => {
      calls.push({ url: String(input), init });
      return fixture(input);
    }) as typeof fetch);

    assert.equal(usage.plan, undefined);
    const autoTopUpCall = calls.find((call) => call.url.endsWith("/auto-topup-rule"));
    assert.ok(autoTopUpCall);
    assert.equal(new Headers(autoTopUpCall.init.headers).get("x-userid"), "canonical-user-id");
  }
});

test("Provider Limits cache merges last-known-good Grok auto top-up independently", () => {
  const fetchedAt = "2026-08-02T00:00:00.000Z";
  for (const previousAutoTopUp of [
    { available: true, enabled: true, amountMinorUnits: 2000 },
    { available: true, enabled: false },
  ] as const) {
    const previous = {
      quotas: null,
      plan: "Previous Tier",
      message: null,
      fetchedAt: "2026-08-01T00:00:00.000Z",
      billing: {
        currency: "USD" as const,
        extraCreditsMinorUnits: 100,
        autoTopUp: previousAutoTopUp,
        additionalCreditsUrl: "https://grok.com/build?_s=usage" as const,
      },
    };
    const next = {
      quotas: { weekly: { remainingPercentage: 80 } },
      plan: "New Tier",
      message: null,
      fetchedAt,
      billing: {
        currency: "USD" as const,
        extraCreditsMinorUnits: 250,
        autoTopUp: { available: false },
        additionalCreditsUrl: "https://grok.com/build?_s=usage" as const,
      },
    };

    assert.deepEqual(mergeProviderLimitsCacheEntry("grok-cli", next, previous), {
      ...next,
      billing: { ...next.billing, autoTopUp: previousAutoTopUp },
    });
  }
});

test("Provider Limits overall failure preservation accepts billing-only previous data", () => {
  const previous = {
    quotas: null,
    plan: "Previous Tier",
    message: null,
    fetchedAt: "2026-08-01T00:00:00.000Z",
    billing: {
      currency: "USD" as const,
      autoTopUp: { available: true, enabled: false },
      additionalCreditsUrl: "https://grok.com/build?_s=usage" as const,
    },
  };
  const failure = {
    quotas: null,
    plan: null,
    message: "Grok Build billing status unavailable",
    fetchedAt: "2026-08-02T00:00:00.000Z",
  };
  assert.equal(mergeProviderLimitsCacheEntry("grok-cli", failure, previous), previous);
  assert.equal(
    mergeProviderLimitsCacheEntry("grok-cli", failure, {
      ...previous,
      quotas: {},
      billing: undefined,
    }),
    failure
  );
});

test("grok-cli keeps valid fields across sparse partial failures and bounded malformed responses", async () => {
  const partial = await getUsage(
    successFixtures({
      productUsage: [
        { product: "GrokBuild", usagePercent: 25 },
        { product: "PRODUCT_GROK_BUILD", usagePercent: 50 },
        { product: "Future Product", usagePercent: 10 },
        { product: "Future Product", usagePercent: 20 },
        { product: "invalid", usagePercent: "secret-invalid-value" },
      ],
      prepaidBalance: { val: -1 },
    }) as typeof fetch
  );
  assert.equal(partial.quotas?.weekly.remainingPercentage, 62.75);
  assert.equal(partial.quotas?.product_grok_build.displayName, "Grok Build");
  assert.equal(partial.quotas?.product_grok_build.remainingPercentage, 75);
  assert.equal(partial.quotas?.product_grok_build_2.displayName, "Grok Build");
  assert.equal(partial.quotas?.product_grok_build_2.remainingPercentage, 50);
  assert.equal(partial.quotas?.product_future_product.displayName, "Future Product");
  assert.equal(partial.quotas?.product_future_product_2.displayName, "Future Product");
  assert.equal(partial.quotas?.product_invalid, undefined);
  assert.equal(partial.billing?.extraCreditsMinorUnits, 1);

  const sensitive = "token-secret canonical-user-id secret@example.invalid raw-body";
  for (const status of [401, 403, 429, 500]) {
    const usage = await getUsage((async () => new Response(sensitive, { status })) as typeof fetch);
    const serialized = JSON.stringify(usage);
    assert.equal(usage.quotas, undefined);
    assert.equal(serialized.includes(sensitive), false);
    assert.equal(serialized.includes("fixture-access-token"), false);
  }

  const invalid = await getUsage(
    (async () => new Response("{invalid", { status: 200 })) as typeof fetch
  );
  assert.equal(invalid.quotas, undefined);

  const oversized = await getUsage(
    (async () =>
      new Response(JSON.stringify({ padding: "x".repeat(300_000) }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })) as typeof fetch
  );
  assert.equal(oversized.quotas, undefined);
});

test("Provider Limits cache persists only the public Grok billing contract", () => {
  const cached = providerLimitsDb.setProviderLimitsCache("grok-connection", {
    quotas: { weekly: { remainingPercentage: 62.75 } },
    plan: "Future Experimental Tier",
    message: null,
    fetchedAt: "2026-08-02T00:00:00.000Z",
    source: "manual",
    billing: {
      currency: "USD",
      extraCreditsMinorUnits: 0,
      autoTopUp: {
        available: true,
        enabled: true,
        amountMinorUnits: 2000,
      },
      additionalCreditsUrl: "https://grok.com/build?_s=usage",
      rawBody: "secret",
      userId: "secret",
    } as unknown as NonNullable<
      Parameters<typeof providerLimitsDb.setProviderLimitsCache>[1]["billing"]
    >,
  });

  assert.deepEqual(cached.billing, {
    currency: "USD",
    extraCreditsMinorUnits: 0,
    autoTopUp: { available: true, enabled: true, amountMinorUnits: 2000 },
    additionalCreditsUrl: "https://grok.com/build?_s=usage",
  });
  assert.deepEqual(providerLimitsDb.getProviderLimitsCache("grok-connection"), cached);
  assert.equal(JSON.stringify(cached).includes("secret"), false);
});

test("grok-cli is registered on the public Provider Limits usage seam", () => {
  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("grok-cli"));
});

test("SuperGrokPro omitted creditUsagePercent still yields a weekly quota bar", async () => {
  const usage = await getUsage(
    successFixtures({
      tier: "SuperGrokPro",
      omitCreditUsagePercent: true,
      omitProductUsage: true,
      prepaidBalance: { val: 0 },
    }) as typeof fetch
  );

  assert.equal(usage.plan, "SuperGrokPro");
  assert.deepEqual(usage.quotas?.weekly, {
    used: 0,
    total: 100,
    remaining: 100,
    remainingPercentage: 100,
    resetAt: "2026-08-03T00:00:00.000Z",
    isPercentageOnly: true,
  });
  assert.equal(usage.message, undefined);
});

test("SuperGrokPro explicit null creditUsagePercent still yields a weekly quota bar", async () => {
  const usage = await getUsage(
    successFixtures({
      tier: "SuperGrokPro",
      creditUsagePercent: null,
      omitProductUsage: true,
      prepaidBalance: { val: 0 },
    }) as typeof fetch
  );

  assert.equal(usage.plan, "SuperGrokPro");
  assert.deepEqual(usage.quotas?.weekly, {
    used: 0,
    total: 100,
    remaining: 100,
    remainingPercentage: 100,
    resetAt: "2026-08-03T00:00:00.000Z",
    isPercentageOnly: true,
  });
});

test("SuperGrokPro omitted currentPeriod still yields a weekly bar with null resetAt", async () => {
  const usage = await getUsage(
    successFixtures({
      tier: "SuperGrokPro",
      omitCreditUsagePercent: true,
      omitProductUsage: true,
      currentPeriod: null,
      prepaidBalance: { val: 0 },
    }) as typeof fetch
  );

  assert.equal(usage.plan, "SuperGrokPro");
  assert.deepEqual(usage.quotas?.weekly, {
    used: 0,
    total: 100,
    remaining: 100,
    remainingPercentage: 100,
    resetAt: null,
    isPercentageOnly: true,
  });
});
