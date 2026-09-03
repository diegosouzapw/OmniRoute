import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kimi-billing-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "kimi-coding-billing-test-key-32-bytes-minimum";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { getUsageForProvider } = await import("../../../open-sse/services/usage.ts");
const providerLimitsDb = await import("../../../src/lib/db/providerLimits.ts");
const { mergeProviderLimitsCacheEntry, toProviderLimitsCacheEntry } =
  await import("../../../src/lib/usage/providerLimitsCache.ts");
const { KIMI_CODE_ADDITIONAL_CREDITS_URL } = await import("../../../src/shared/utils/kimiBilling.ts");

const originalFetch = globalThis.fetch;

interface KimiUsageResult {
  plan?: string;
  message?: string;
  quotas?: Record<string, unknown>;
  billing?: {
    currency: string;
    extraCreditsMinorUnits?: number;
    monthlyUsedMinorUnits?: number;
    monthlyLimitEnabled?: boolean;
    monthlyLimitMinorUnits?: number;
    extraUsageStatus: "enabled" | "disabled" | "frozen" | "unavailable";
    additionalCreditsUrl: string;
  };
}

function successPayload(boosterWallet?: unknown) {
  return {
    user: { membership: { level: "LEVEL_ADVANCED" }, email: "must-not-be-exposed@example.invalid" },
    usage: {
      limit: "1000",
      used: "400",
      remaining: "600",
      resetTime: "2099-08-03T05:20:51Z",
    },
    limits: [
      {
        window: { duration: 300, timeUnit: "TIME_UNIT_MINUTE" },
        detail: {
          limit: "100",
          used: "81",
          remaining: "19",
          resetTime: "2099-08-01T13:38:00Z",
        },
      },
    ],
    ...(boosterWallet === undefined ? {} : { boosterWallet }),
  };
}

async function getUsage(
  payload: unknown,
  connection: {
    provider: "kimi-coding" | "kimi-coding-apikey";
    accessToken?: string;
    apiKey?: string;
  } = {
    provider: "kimi-coding-apikey",
    apiKey: "sk-kimi-fixture",
  }
): Promise<KimiUsageResult> {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  return (await getUsageForProvider({ id: "kimi-connection", ...connection })) as KimiUsageResult;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("kimi-coding exposes the official boosterWallet Extra Usage contract", async () => {
  const calls: Array<{ url: string; headers: Headers }> = [];
  globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    calls.push({ url: String(input), headers: new Headers(init.headers) });
    return new Response(
      JSON.stringify(
        successPayload({
          balance: {
            type: "BOOSTER",
            amount: "50000000000",
            amountLeft: "1234000000",
          },
          status: "STATUS_ACTIVE",
          monthlyChargeLimitEnabled: true,
          monthlyChargeLimit: { priceInCents: "5000", currency: "cny" },
          monthlyUsed: { priceInCents: 234, currency: "CNY" },
          paymentMethodId: "must-not-be-exposed",
        })
      ),
      { status: 200 }
    );
  }) as typeof fetch;

  const usage = (await getUsageForProvider({
    id: "kimi-connection",
    provider: "kimi-coding-apikey",
    apiKey: "sk-kimi-fixture",
  })) as KimiUsageResult;

  assert.equal(usage.plan, "Allegro");
  assert.deepEqual(usage.quotas, {
    code_7d: {
      displayName: "Code · 7d",
      used: 400,
      total: 1000,
      remaining: 600,
      remainingPercentage: 60,
      resetAt: "2099-08-03T05:20:51.000Z",
      unlimited: false,
    },
    code_5h: {
      displayName: "Code · 5h",
      used: 81,
      total: 100,
      remaining: 19,
      remainingPercentage: 19,
      resetAt: "2099-08-01T13:38:00.000Z",
      unlimited: false,
    },
  });
  assert.deepEqual(usage.billing, {
    currency: "CNY",
    extraCreditsMinorUnits: 1234,
    monthlyUsedMinorUnits: 234,
    monthlyLimitEnabled: true,
    monthlyLimitMinorUnits: 5000,
    extraUsageStatus: "enabled",
    additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
  });
  assert.equal(calls.length, 1, "billing must come from the existing /usages read");
  assert.equal(calls[0]?.url, "https://api.kimi.com/coding/v1/usages");
  assert.equal(calls[0]?.headers.get("x-api-key"), "sk-kimi-fixture");
  assert.equal(calls[0]?.headers.get("authorization"), null);

  const serialized = JSON.stringify(usage);
  assert.equal(serialized.includes("sk-kimi-fixture"), false);
  assert.equal(serialized.includes("must-not-be-exposed"), false);
  assert.equal(serialized.includes("paymentMethodId"), false);
});

test("booster fixed-point values follow the official Kimi CLI cent conversion", async () => {
  for (const [amountLeft, expected] of [
    [0, 0],
    [1, 1],
    [999_999, 1],
    [1_000_000, 1],
    [1_499_999, 1],
    [1_500_000, 2],
    [1_234_000_000, 1234],
  ] as const) {
    const usage = await getUsage(
      successPayload({
        balance: { type: "BOOSTER", amount: 50_000_000, amountLeft },
        monthlyChargeLimitEnabled: false,
      })
    );
    assert.equal(usage.billing?.extraCreditsMinorUnits, expected);
  }
});

test("missing and invalid booster wallets do not fabricate a balance", async () => {
  for (const boosterWallet of [
    undefined,
    {},
    { balance: { type: "OTHER", amount: 50_000_000, amountLeft: 25_000_000 } },
    { balance: { type: "BOOSTER" }, status: "STATUS_UNKNOWN" },
    { balance: { type: "BOOSTER" }, allowTopup: false },
    { balance: { type: "BOOSTER" }, allowTopup: true },
  ]) {
    const usage = await getUsage(successPayload(boosterWallet));
    assert.deepEqual(usage.billing, {
      currency: "USD",
      extraUsageStatus: "unavailable",
      additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
    });
  }

  const productionDisabled = await getUsage(
    successPayload({
      status: "STATUS_DISABLED",
      allowTopup: true,
      balance: { type: "BOOSTER", unit: "UNIT_CURRENCY" },
      monthlyChargeLimit: { priceInCents: 10000, currency: "CNY" },
      monthlyUsed: { priceInCents: 0, currency: "CNY" },
    })
  );
  assert.deepEqual(productionDisabled.billing, {
    currency: "CNY",
    extraCreditsMinorUnits: 0,
    monthlyUsedMinorUnits: 0,
    monthlyLimitEnabled: false,
    monthlyLimitMinorUnits: 10000,
    extraUsageStatus: "disabled",
    additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
  });
});

test("count quotas derive missing used or remaining and preserve every window", async () => {
  const usage = await getUsage({
    user: { membership: { level: "LEVEL_ADVANCED" } },
    usage: { limit: "100", remaining: "84", resetTime: "2099-08-26T00:38:00Z" },
    limits: [
      {
        window: { duration: 300, timeUnit: "TIME_UNIT_MINUTE" },
        detail: { limit: "100", used: "81", resetTime: "2099-08-19T05:38:00Z" },
      },
      {
        window: { duration: 7, timeUnit: "TIME_UNIT_DAY" },
        detail: { limit: "200", used: "40", remaining: "160" },
      },
      {
        window: { duration: 300, timeUnit: "TIME_UNIT_MINUTE" },
        detail: { limit: "50", remaining: "25" },
      },
    ],
  });

  assert.deepEqual(usage.quotas, {
    code_7d: {
      displayName: "Code · 7d",
      used: 16,
      total: 100,
      remaining: 84,
      remainingPercentage: 84,
      resetAt: "2099-08-26T00:38:00.000Z",
      unlimited: false,
    },
    code_5h: {
      displayName: "Code · 5h",
      used: 81,
      total: 100,
      remaining: 19,
      remainingPercentage: 19,
      resetAt: "2099-08-19T05:38:00.000Z",
      unlimited: false,
    },
    code_7d_2: {
      displayName: "Code · 7d",
      used: 40,
      total: 200,
      remaining: 160,
      remainingPercentage: 80,
      resetAt: null,
      unlimited: false,
    },
    code_5h_2: {
      displayName: "Code · 5h",
      used: 25,
      total: 50,
      remaining: 25,
      remainingPercentage: 50,
      resetAt: null,
      unlimited: false,
    },
  });
});

test("currency precedence and monthly-cap fields match the official parser", async () => {
  const fromLimit = await getUsage(
    successPayload({
      balance: { type: "BOOSTER", amount: 50_000_000, amountLeft: 10_000_000 },
      monthlyChargeLimitEnabled: true,
      monthlyChargeLimit: { priceInCents: 5000, currency: "CNY" },
      monthlyUsed: { priceInCents: 10, currency: "USD" },
    })
  );
  assert.equal(fromLimit.billing?.currency, "CNY");

  const fromUsed = await getUsage(
    successPayload({
      balance: { type: "BOOSTER", amount: 50_000_000, amountLeft: 10_000_000 },
      monthlyChargeLimitEnabled: false,
      monthlyUsed: { priceInCents: "0", currency: "cny" },
    })
  );
  assert.deepEqual(fromUsed.billing, {
    currency: "CNY",
    extraCreditsMinorUnits: 10,
    monthlyUsedMinorUnits: 0,
    monthlyLimitEnabled: false,
    monthlyLimitMinorUnits: 0,
    extraUsageStatus: "unavailable",
    additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
  });

  const fallback = await getUsage(
    successPayload({
      balance: { type: "BOOSTER", amount: 50_000_000, amountLeft: 10_000_000 },
    })
  );
  assert.equal(fallback.billing?.currency, "USD");
});

test("both Kimi auth modes receive billing without additional requests", async () => {
  const calls: Array<{ headers: Headers }> = [];
  globalThis.fetch = (async (_input: string | URL | Request, init: RequestInit = {}) => {
    calls.push({ headers: new Headers(init.headers) });
    return new Response(JSON.stringify(successPayload()), { status: 200 });
  }) as typeof fetch;

  await getUsageForProvider({
    id: "kimi-api-key",
    provider: "kimi-coding-apikey",
    apiKey: "sk-kimi-key",
  });
  await getUsageForProvider({
    id: "kimi-oauth",
    provider: "kimi-coding",
    accessToken: "oauth-token",
    providerSpecificData: {
      deviceId: "123456781234123412341234567890ab",
      deviceName: "host",
      deviceModel: "model",
      osVersion: "os",
    },
  });

  assert.equal(calls.length, 2);
  assert.equal(calls[0]?.headers.get("x-api-key"), "sk-kimi-key");
  assert.equal(calls[1]?.headers.get("authorization"), "Bearer oauth-token");
  assert.equal(calls[1]?.headers.get("x-api-key"), null);
});

test("Kimi usage failures do not expose or synthesize billing", async () => {
  const sensitive = "secret-upstream-body";
  globalThis.fetch = (async () => new Response(sensitive, { status: 500 })) as typeof fetch;
  const usage = (await getUsageForProvider({
    id: "kimi-connection",
    provider: "kimi-coding-apikey",
    apiKey: "sk-kimi-secret",
  })) as KimiUsageResult;

  assert.equal(usage.billing, undefined);
  assert.ok(usage.message);
  assert.equal(JSON.stringify(usage).includes("sk-kimi-secret"), false);
});

test("Provider Limits sanitizes and persists only the public Kimi billing contract", () => {
  const rawBilling = {
    currency: "cny",
    extraCreditsMinorUnits: 0,
    monthlyUsedMinorUnits: 125,
    monthlyLimitEnabled: true,
    monthlyLimitMinorUnits: 5000,
    extraUsageStatus: "disabled",
    paymentMethodId: "secret",
    additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
    rawBody: "secret",
  };
  const cacheEntry = toProviderLimitsCacheEntry(
    { quotas: { code_7d: { remainingPercentage: 60 } }, billing: rawBilling },
    "manual",
    "2026-08-19T00:00:00.000Z"
  );

  assert.deepEqual(cacheEntry.billing, {
    currency: "CNY",
    extraCreditsMinorUnits: 0,
    monthlyUsedMinorUnits: 125,
    monthlyLimitEnabled: true,
    monthlyLimitMinorUnits: 5000,
    extraUsageStatus: "disabled",
    additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
  });
  assert.equal(JSON.stringify(cacheEntry).includes("secret"), false);

  const stored = providerLimitsDb.setProviderLimitsCache("kimi-connection", {
    ...cacheEntry,
    billing: rawBilling as unknown as NonNullable<typeof cacheEntry.billing>,
  });
  assert.deepEqual(stored.billing, cacheEntry.billing);
  assert.deepEqual(
    providerLimitsDb.getProviderLimitsCache("kimi-connection")?.billing,
    stored.billing
  );
  assert.equal(JSON.stringify(stored).includes("secret"), false);
});

test("message-only Kimi failures preserve last-known-good billing", () => {
  const previous = {
    quotas: null,
    plan: "Allegro",
    message: null,
    fetchedAt: "2026-08-18T00:00:00.000Z",
    billing: {
      currency: "CNY",
      extraCreditsMinorUnits: 2500,
      extraUsageStatus: "unavailable" as const,
      additionalCreditsUrl: KIMI_CODE_ADDITIONAL_CREDITS_URL,
    },
  };
  const failure = {
    quotas: null,
    plan: "Kimi Coding",
    message: "Kimi Coding connected. API Error 500",
    fetchedAt: "2026-08-19T00:00:00.000Z",
  };

  assert.equal(mergeProviderLimitsCacheEntry("kimi-coding", failure, previous), previous);
  assert.equal(mergeProviderLimitsCacheEntry("kimi-coding-apikey", failure, previous), previous);
});
