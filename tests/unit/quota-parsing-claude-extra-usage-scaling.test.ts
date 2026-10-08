import test from "node:test";
import assert from "node:assert/strict";

import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";

type Row = {
  isCredits?: boolean;
  remaining: number;
  used: number;
  total: number;
  creditCount: number;
  currency?: string;
};

function creditsRow(extraUsage: Record<string, unknown>): Row {
  const rows = parseQuotaData("claude", { quotas: {}, extraUsage }) as Row[];
  const row = rows.find((r) => r.isCredits);
  assert.ok(row);
  return row;
}

// #15635: Anthropic returns extra_usage amounts in minor units; decimal_places says how many.
test("#15635: extra_usage amounts are scaled by 10 ** decimal_places", () => {
  const row = creditsRow({
    is_enabled: true,
    monthly_limit: 6000,
    used_credits: 1500,
    utilization: 25,
    currency: "SGD",
    decimal_places: 2,
  });
  assert.equal(row.currency, "SGD");
  assert.equal(row.total, 60);
  assert.equal(row.used, 15);
  assert.equal(row.remaining, 45);
  assert.equal(row.creditCount, 45);
});

test("#15635: #6806 enterprise payload scales and clamps remaining at 0", () => {
  const row = creditsRow({
    is_enabled: true,
    monthly_limit: 120000,
    used_credits: 120015,
    decimal_places: 2,
  });
  assert.equal(row.total, 1200);
  assert.equal(row.used, 1200.15);
  assert.equal(row.remaining, 0);
});

test("#15635: missing or invalid decimal_places keeps amounts unscaled", () => {
  for (const decimal_places of [undefined, -1, 2.5, 99, "x"]) {
    const row = creditsRow({
      is_enabled: true,
      monthly_limit: 6000,
      used_credits: 0,
      currency: "USD",
      decimal_places,
    });
    assert.equal(row.total, 6000);
  }
});
