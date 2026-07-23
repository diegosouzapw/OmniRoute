import test from "node:test";
import assert from "node:assert/strict";

import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx";

interface QuotaRow {
  name: string;
  isCredits?: boolean;
  remainingPercentage?: number;
}

// Reproduces issue #6806: Claude Code "raven_enterprise" plan usage response has an
// empty `quotas: {}` (no five_hour/seven_day utilization fields returned by Anthropic
// for this plan) but a fully populated, 100%-exhausted `extraUsage` block. The UI must
// not fall back to "No quota data" when extraUsage has real, usable data.
test("#6806: parseQuotaData surfaces Claude extraUsage credits when quotas object is empty", () => {
  const data = {
    plan: "default_raven_enterprise",
    quotas: {},
    extraUsage: {
      is_enabled: true,
      monthly_limit: 120000,
      used_credits: 120015,
      utilization: 100,
      currency: "USD",
      decimal_places: 2,
      disabled_reason: null,
      daily: null,
      weekly: null,
    },
    bootstrap: {
      account_uuid: "redacted",
      account_email: "redacted",
      organization_uuid: "redacted",
      organization_name: "redacted",
      organization_type: "claude_enterprise",
      organization_rate_limit_tier: "default_raven_enterprise",
    },
  };

  const parsed = parseQuotaData("claude", data);

  assert.ok(
    parsed.length > 0,
    `expected at least one quota row derived from extraUsage, got empty array: ${JSON.stringify(parsed)}`
  );

  const creditRow = parsed.find((row: QuotaRow) => row.isCredits);
  assert.ok(creditRow, "expected a credits-style quota row derived from extraUsage");
  assert.equal(creditRow.remainingPercentage, 0, "utilization 100% means 0% remaining");
});

test("#6806: parseQuotaData still surfaces extraUsage credits when quotas is also populated", () => {
  const data = {
    plan: "pro",
    quotas: {
      "session (5h)": { used: 10, total: 100, remainingPercentage: 90, resetAt: null },
    },
    extraUsage: {
      is_enabled: true,
      monthly_limit: 5000,
      used_credits: 1000,
      utilization: 20,
      currency: "USD",
      decimal_places: 2,
      disabled_reason: null,
      daily: null,
      weekly: null,
    },
  };

  const parsed = parseQuotaData("claude", data);

  assert.equal(parsed.length, 2, `expected session quota + credits row, got: ${JSON.stringify(parsed)}`);
  const creditRow = parsed.find((row: QuotaRow) => row.isCredits);
  assert.ok(creditRow, "expected a credits-style quota row derived from extraUsage");
  assert.equal(creditRow.remainingPercentage, 80, "utilization 20% means 80% remaining");
});

test("#6806: parseQuotaData does not add a credits row when extraUsage is disabled", () => {
  const data = {
    plan: "pro",
    quotas: {
      "session (5h)": { used: 10, total: 100, remainingPercentage: 90, resetAt: null },
    },
    extraUsage: {
      is_enabled: false,
      monthly_limit: 5000,
      used_credits: 0,
      utilization: 0,
    },
  };

  const parsed = parseQuotaData("claude", data);

  assert.equal(parsed.length, 1, `expected only the session quota, got: ${JSON.stringify(parsed)}`);
  assert.equal(parsed.some((row: QuotaRow) => row.isCredits), false);
});
