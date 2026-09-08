import test from "node:test";
import assert from "node:assert/strict";

import { getMoonshotOpenPlatformUsage } from "../../open-sse/services/moonshotQuotaFetcher.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";
import { getQuotaRemainingPercentage } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx";

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

/**
 * Moonshot Open Platform returns three absolute-balance buckets. The dashboard
 * used to paint voucher/cash as 100% leftover even when available_balance is 0,
 * because remainingPercentage was hardcoded and parseGeneric never marked the
 * rows as credits (so the card showed a percentage, not ¥0.00).
 */
test("empty Moonshot buckets render as 0% leftover, not a fake 100% voucher/cash bar", async () => {
  const connectionId = `ms-dash-empty-${Date.now()}`;
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
  const rows = parseQuotaData(COMPAT, usage) as Array<{
    name?: string;
    isCredits?: boolean;
    remainingPercentage?: number;
    creditCount?: number;
    currency?: string;
  }>;

  const byName = Object.fromEntries(rows.map((row) => [row.name, row]));
  for (const name of ["available", "voucher", "cash"] as const) {
    const row = byName[name];
    assert.ok(row, `missing ${name} row: ${JSON.stringify(rows)}`);
    assert.equal(row.isCredits, true, `${name} must render as a currency row`);
    assert.equal(row.currency, "CNY");
    assert.equal(row.creditCount, 0);
    assert.equal(row.remainingPercentage, 0);
    assert.equal(getQuotaRemainingPercentage(row), 0);
  }
});

test("Moonshot parse path requires available AND voucher AND cash together", () => {
  const steal = parseQuotaData("agentrouter", {
    quotas: {
      available: { remaining: 7, remainingPercentage: 70, currency: "USD" },
      voucher: { remaining: 1, remainingPercentage: 10, currency: "USD" },
    },
  }) as Array<{ name?: string; isCredits?: boolean; remainingPercentage?: number }>;
  const byName = Object.fromEntries(steal.map((row) => [row.name, row]));
  assert.equal(byName.available?.isCredits, undefined);
  assert.equal(byName.voucher?.isCredits, undefined);

  const full = parseQuotaData("agentrouter", {
    quotas: {
      available: { remaining: 0, remainingPercentage: 0, currency: "CNY" },
      voucher: { remaining: 0, remainingPercentage: 0, currency: "CNY" },
      cash: { remaining: 0, remainingPercentage: 0, currency: "CNY" },
    },
  }) as Array<{ name?: string; isCredits?: boolean; remainingPercentage?: number }>;
  const fullByName = Object.fromEntries(full.map((row) => [row.name, row]));
  assert.equal(fullByName.available?.isCredits, true);
  assert.equal(fullByName.voucher?.isCredits, true);
  assert.equal(fullByName.cash?.isCredits, true);
  assert.equal(fullByName.available?.remainingPercentage, 0);
});
