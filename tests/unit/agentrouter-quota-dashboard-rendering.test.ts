import test from "node:test";
import assert from "node:assert/strict";

import { getAgentrouterUsage } from "../../open-sse/services/usage/agentrouter.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockAgentrouterFetch(rawQuota: number) {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ data: { quota: rawQuota } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
}

/**
 * #10078 follow-up — the original fix wired AgentRouter's balance into
 * getUsageForProvider()/USAGE_SUPPORTED_PROVIDERS (visibility + data path), but the
 * Dashboard Quota UI *renderer* (QuotaCardExpanded under
 * src/app/(dashboard)/dashboard/usage/components/ProviderLimits/) only formats a
 * quota row as a dollar amount ("$X.XX") when the row carries `isCredits: true` +
 * `currency` + `creditCount` — fields the generic quota-parsing path
 * (parseGeneric -> normalizeQuotaEntry in quotaParsing.ts) never sets, and never
 * copies `currency` through at all. Because "agentrouter" wasn't special-cased in
 * parseProviderQuotas(), a configured balance rendered as a bare "100% left"
 * percentage (not USD), and the real dollar figure (`dollarBalance`) was only
 * exposed as a top-level `remainingUsd`/`availableUsd`/`balance` sibling field that
 * parseQuotaData() never reads (it only walks `data.quotas`).
 *
 * This test drives the real producer (getAgentrouterUsage) through the real
 * Dashboard adapter (parseQuotaData) end-to-end — the same path the Provider
 * Limits UI takes — and asserts the row the renderer actually consumes
 * (`isCredits`, `currency`, `creditCount`) instead of just the wire-shape fields
 * asserted by tests/unit/agentrouter-quota-visibility.test.ts.
 */
test("#10078: a configured AgentRouter balance renders as a USD credits row in the Dashboard Quota UI", async () => {
  const connectionId = `agentrouter-dash-configured-${Date.now()}`;
  mockAgentrouterFetch(250_000); // 250_000 / 500_000 QUOTA_PER_UNIT = $0.50

  const usage = await getAgentrouterUsage(connectionId, {
    provider: "agentrouter",
    providerSpecificData: { consoleApiKey: "system-access-token", newApiUserId: "42" },
  });

  const rows = parseQuotaData("agentrouter", usage) as Array<{
    isCredits?: boolean;
    currency?: string;
    creditCount?: number;
    remainingPercentage?: number;
  }>;

  assert.equal(rows.length, 1, `expected exactly one quota row, got: ${JSON.stringify(rows)}`);
  const [row] = rows;

  // These are exactly the fields QuotaCardExpanded.tsx branches on
  // to render a dollar-formatted amount ("$0.50") instead of a bare percentage.
  assert.equal(row.isCredits, true, "renderer only formats USD when isCredits is true");
  assert.equal(row.currency, "USD", "renderer looks up CURRENCY_SYMBOLS[q.currency]");
  assert.equal(row.creditCount, 0.5, "renderer displays q.creditCount as the dollar amount");
  assert.equal(row.remainingPercentage, 100, "a funded wallet must not read as exhausted");
});

test("#10078: an exhausted AgentRouter balance renders as exactly $0, not negative or NaN", async () => {
  const connectionId = `agentrouter-dash-exhausted-${Date.now()}`;
  mockAgentrouterFetch(0);

  const usage = await getAgentrouterUsage(connectionId, {
    provider: "agentrouter",
    providerSpecificData: { consoleApiKey: "system-access-token", newApiUserId: "42" },
  });

  const rows = parseQuotaData("agentrouter", usage) as Array<{
    isCredits?: boolean;
    currency?: string;
    creditCount?: number;
    remainingPercentage?: number;
  }>;

  assert.equal(rows.length, 1);
  const [row] = rows;

  assert.equal(row.isCredits, true);
  assert.equal(row.currency, "USD");
  assert.equal(row.creditCount, 0, "exhausted balance must render as exactly zero");
  assert.equal(Number.isFinite(row.creditCount), true, "must never render NaN");
  assert.ok((row.creditCount ?? -1) >= 0, "must never render negative");
  assert.equal(
    row.remainingPercentage,
    0,
    "exhausted wallet must read as 0% remaining (critical color)"
  );
});

test("#10078: parseQuotaData never drops a raw negative/garbage remaining as -$X — clamps to 0", () => {
  // Defends the Math.max(0, ...) clamp in both getAgentrouterUsage() and
  // parseAgentrouterQuota() against a malformed/negative upstream `remaining`.
  const data = {
    plan: "AgentRouter",
    quotas: {
      balance: {
        used: 0,
        total: 0,
        remaining: -5,
        remainingPercentage: 0,
        resetAt: null,
        unlimited: true,
        currency: "USD",
        displayName: "Wallet Balance (USD)",
      },
    },
  };

  const rows = parseQuotaData("agentrouter", data) as Array<{ creditCount?: number }>;
  assert.equal(rows.length, 1);
  assert.equal(rows[0].creditCount, 0);
});
