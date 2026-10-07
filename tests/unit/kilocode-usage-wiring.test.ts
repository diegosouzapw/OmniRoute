/**
 * Kilo Code usage wiring tests: provider visibility (USAGE_SUPPORTED_PROVIDERS),
 * fetcher registration (USAGE_FETCHER_PROVIDERS), dispatcher routing in
 * getUsageForProvider(), and the Dashboard quota parser (kilocode is rendered
 * through the AgentRouter/USD-credit parser so the exact dollar balance is
 * shown instead of a bare percentage).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { supportsProviderQuota } from "../../src/shared/utils/providerQuotaVisibility.ts";
import { USAGE_FETCHER_PROVIDERS, getUsageForProvider } from "../../open-sse/services/usage.ts";
import {
  findKiloPassQuotaRow,
  parseQuotaData,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockBalance(status: number, body: unknown) {
  globalThis.fetch = (async () => {
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
}

test("kilocode is registered in USAGE_SUPPORTED_PROVIDERS", () => {
  assert.equal(
    USAGE_SUPPORTED_PROVIDERS.includes("kilocode" as (typeof USAGE_SUPPORTED_PROVIDERS)[number]),
    true
  );
});

test("supportsProviderQuota('kilocode') is true", () => {
  assert.equal(supportsProviderQuota("kilocode"), true);
});

test("kilocode is registered in USAGE_FETCHER_PROVIDERS", () => {
  assert.equal(
    USAGE_FETCHER_PROVIDERS.includes("kilocode" as (typeof USAGE_FETCHER_PROVIDERS)[number]),
    true
  );
});

test("getUsageForProvider dispatches kilocode to the Kilo balance fetcher", async () => {
  mockBalance(200, { balance: 12.34 });

  const usage = (await getUsageForProvider({
    id: "conn-kilo",
    provider: "kilocode",
    accessToken: "oauth-token-123",
  })) as {
    plan?: string;
    quotas?: Record<
      string,
      { remaining?: number; currency?: string; displayName?: string; remainingPercentage?: number }
    >;
    message?: string;
  };

  assert.equal(usage.plan, "Kilo Code");
  assert.ok(usage.quotas);
  const balance = usage.quotas.balance;
  assert.ok(balance, "expected a balance quota entry");
  assert.equal(balance.remaining, 12.34);
  assert.equal(balance.currency, "USD");
  assert.equal(balance.displayName, "Balance (USD)");
  assert.equal(usage.message, undefined);
});

test("kilocode balance quota parses as USD credit row in the Dashboard parser", async () => {
  const usage = {
    plan: "Kilo Code",
    quotas: {
      balance: {
        used: 0,
        total: 0,
        remaining: 12.34,
        remainingPercentage: 100,
        resetAt: null,
        unlimited: true,
        currency: "USD",
        displayName: "Balance (USD)",
      },
    },
  };

  const rows = parseQuotaData("kilocode", usage) as Array<{
    isCredits?: boolean;
    currency?: string;
    creditCount?: number;
    remainingPercentage?: number;
  }>;

  assert.equal(rows.length, 1);
  const [row] = rows;
  assert.equal(row.isCredits, true, "renderer only formats USD when isCredits is true");
  assert.equal(row.currency, "USD", "renderer looks up CURRENCY_SYMBOLS[q.currency]");
  assert.equal(row.creditCount, 12.34, "renderer displays q.creditCount as the dollar amount");
  assert.equal(row.remainingPercentage, 100, "funded wallet must not read as exhausted");
});

test("kilocode balance + Kilo Pass quotas collapse into one meter row (balance untouched)", async () => {
  const balanceQuota = {
    used: 0,
    total: 0,
    remaining: 11.51,
    remainingPercentage: 100,
    resetAt: null,
    unlimited: true,
    currency: "USD",
    displayName: "Balance (USD)",
  };
  const baseQuota = {
    used: 0,
    total: 50,
    remaining: 50,
    remainingPercentage: 100,
    resetAt: "2026-09-15T00:00:00.000Z",
    unlimited: false,
    currency: "USD",
    displayName: "Base Credits",
  };
  const bonusQuota = {
    used: 0,
    total: 5,
    remaining: 5,
    remainingPercentage: 100,
    resetAt: null,
    unlimited: false,
    currency: "USD",
    displayName: "Bonus Credits",
  };
  const usageQuota = {
    used: 30,
    total: 55,
    remaining: 25,
    remainingPercentage: 45.45,
    resetAt: "2026-09-15T00:00:00.000Z",
    unlimited: false,
    currency: "USD",
    displayName: "Kilo Pass Usage",
  };
  const remainingQuota = {
    used: 0,
    total: 0,
    remaining: 25,
    remainingPercentage: 100,
    resetAt: "2026-09-15T00:00:00.000Z",
    unlimited: false,
    currency: "USD",
    displayName: "Pass Remaining",
  };
  const usage = {
    plan: "Kilo Code",
    quotas: {
      balance: balanceQuota,
      kiloPassBase: baseQuota,
      kiloPassBonus: bonusQuota,
      kiloPassUsage: usageQuota,
      kiloPassRemaining: remainingQuota,
    },
  };

  const rows = parseQuotaData("kilocode", usage) as Array<{
    name?: string;
    isCredits?: boolean;
    currency?: string;
    creditCount?: number;
    displayName?: string;
    unlimited?: boolean;
    kiloPass?: boolean;
    kiloPassBase?: number;
    kiloPassBonus?: number;
    kiloPassBalance?: number;
    used?: number;
    total?: number;
    remaining?: number;
    remainingPercentage?: number;
    resetAt?: string | null;
  }>;
  assert.equal(
    rows.length,
    2,
    "four raw Kilo Pass keys must collapse into one meter row; balance stays separate"
  );

  const balance = rows.find((r) => r.name === "balance");
  assert.ok(balance, "personal balance row must survive");
  assert.equal(balance?.isCredits, true);
  assert.equal(balance?.currency, "USD");
  assert.equal(balance?.creditCount, 11.51);
  assert.equal(balance?.unlimited, true);

  const pass = findKiloPassQuotaRow(rows);
  assert.ok(pass, "collapsed Kilo Pass row must be discoverable via findKiloPassQuotaRow");
  assert.equal(pass?.kiloPass, true);
  assert.equal(pass?.displayName, "Kilo Pass");
  assert.equal(pass?.currency, "USD");
  assert.equal(pass?.kiloPassBase, 50);
  assert.equal(pass?.kiloPassBonus, 5);
  assert.equal(pass?.kiloPassBalance, 11.51, "wallet balance rides along for meter footer");
  assert.equal(pass?.used, 30);
  assert.equal(pass?.total, 55, "meter total must be base + bonus");
  assert.equal(pass?.remaining, 25);
  assert.equal(pass?.remainingPercentage, (25 / 55) * 100);
  assert.equal(pass?.resetAt, "2026-09-15T00:00:00.000Z");
  assert.equal(pass?.unlimited, false);
});

test("getUsageForProvider returns Kilo Pass quotas through dispatcher", async () => {
  const subscription = {
    status: "active",
    currentPeriodBaseCreditsUsd: 50,
    currentPeriodUsageUsd: 30,
    currentPeriodBonusCreditsUsd: 5,
    nextBillingAt: "2026-09-15T00:00:00.000Z",
  };
  const json = { subscription };
  const data = { json };
  const result = { data };
  const passPayload = [{ result }];

  globalThis.fetch = (async (url: unknown) => {
    const u = String(url);
    if (u.includes("/api/profile/balance")) {
      return new Response(JSON.stringify({ balance: 11.51 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(JSON.stringify(passPayload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const usage = (await getUsageForProvider({
    id: "conn-kilo-pass",
    provider: "kilocode",
    accessToken: "oauth-token-123",
  })) as {
    plan?: string;
    quotas?: Record<string, { remaining?: number; used?: number }>;
    message?: string;
  };
  assert.equal(usage.plan, "Kilo Code");
  assert.equal(usage.message, undefined);
  assert.ok(usage.quotas);
  assert.equal(usage.quotas.balance.remaining, 11.51);
  assert.equal(usage.quotas.kiloPassBase.remaining, 50);
  assert.equal(usage.quotas.kiloPassUsage.used, 30);
  assert.equal(usage.quotas.kiloPassRemaining.remaining, 25);
});
