import test from "node:test";
import assert from "node:assert/strict";
import { buildKiroUsageResult } from "@omniroute/open-sse/services/usage.ts";

// Regression for #3506: a Kiro connection (e.g. via AWS IAM) whose GetUsageLimits response has
// no usageBreakdownList produced `{ plan, quotas: {} }`, which the dashboard renders as a blank
// quota card (the empty state) with no explanation. It must instead return an informative
// `{ message }`, which the card surfaces via the connection-level message path. Accounts that DO
// return a breakdown still get normalized quotas.

test("#3506 empty usageBreakdownList returns an informative message, not empty quotas", () => {
  const result = buildKiroUsageResult({ subscriptionInfo: { subscriptionTitle: "Kiro Pro" } });
  assert.ok("message" in result, "must return a message when there is no breakdown");
  assert.ok(!("quotas" in result), "must NOT return an empty quotas object (renders blank)");
  assert.match((result as { message: string }).message, /no usage breakdown/i);
});

test("#3506 a real usageBreakdownList yields normalized quotas", () => {
  const result = buildKiroUsageResult({
    subscriptionInfo: { subscriptionTitle: "Kiro Pro" },
    nextDateReset: "2026-07-01T00:00:00Z",
    usageBreakdownList: [
      { resourceType: "AGENTIC_REQUEST", currentUsageWithPrecision: 30, usageLimitWithPrecision: 100 },
    ],
  });
  assert.ok("quotas" in result, "must return quotas when a breakdown is present");
  const r = result as { plan: string; quotas: Record<string, { used: number; total: number; remaining: number }> };
  assert.equal(r.plan, "Kiro Pro");
  assert.equal(r.quotas.agentic_request.used, 30);
  assert.equal(r.quotas.agentic_request.total, 100);
  assert.equal(r.quotas.agentic_request.remaining, 70);
});

test("#3506 freeTrialInfo adds a _freetrial quota entry", () => {
  const result = buildKiroUsageResult({
    usageBreakdownList: [
      {
        resourceType: "AGENTIC_REQUEST",
        currentUsageWithPrecision: 5,
        usageLimitWithPrecision: 50,
        freeTrialInfo: { currentUsageWithPrecision: 2, usageLimitWithPrecision: 10 },
      },
    ],
  });
  const r = result as { quotas: Record<string, { used: number; total: number }> };
  assert.equal(r.quotas.agentic_request_freetrial.used, 2);
  assert.equal(r.quotas.agentic_request_freetrial.total, 10);
});
