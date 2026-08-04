import test from "node:test";
import assert from "node:assert/strict";
import { buildKiroUsageResult } from "@omniroute/open-sse/services/usage.ts";

type KiroQuotaResult = {
  plan: string;
  quotas: Record<
    string,
    {
      used: number;
      total: number;
      remaining: number;
      remainingPercentage?: number;
      unlimited: boolean;
    }
  >;
};

function exhaustedKiroUsage(overrides: Record<string, unknown> = {}) {
  return {
    subscriptionInfo: { subscriptionTitle: "Kiro Pro" },
    usageBreakdownList: [
      {
        resourceType: "AGENTIC_REQUEST",
        currentUsageWithPrecision: 100,
        usageLimitWithPrecision: 100,
        freeTrialInfo: {
          currentUsageWithPrecision: 25,
          usageLimitWithPrecision: 25,
        },
      },
    ],
    ...overrides,
  };
}

test("#4469 Kiro overageStatus ENABLED keeps exhausted base quota routable", () => {
  const result = buildKiroUsageResult(
    exhaustedKiroUsage({
      overageConfiguration: { overageStatus: "ENABLED" },
    })
  ) as KiroQuotaResult;

  assert.equal(result.quotas.agentic_request.remaining, 0);
  assert.equal(result.quotas.agentic_request.remainingPercentage, 100);
  assert.equal(result.quotas.agentic_request.unlimited, true);
  assert.equal(result.quotas.agentic_request_freetrial.remainingPercentage, 100);
  assert.equal(result.quotas.agentic_request_freetrial.unlimited, true);
});

test("#4469 Kiro top-level overageEnabled keeps exhausted base quota routable", () => {
  const result = buildKiroUsageResult(
    exhaustedKiroUsage({
      overageEnabled: true,
    })
  ) as KiroQuotaResult;

  assert.equal(result.quotas.agentic_request.remainingPercentage, 100);
  assert.equal(result.quotas.agentic_request.unlimited, true);
});

test("#4469 Kiro disabled overage preserves exhausted quota signal", () => {
  const result = buildKiroUsageResult(
    exhaustedKiroUsage({
      overageConfiguration: { overageStatus: "DISABLED" },
      overageEnabled: false,
    })
  ) as KiroQuotaResult;

  assert.equal(result.quotas.agentic_request.remaining, 0);
  assert.equal(result.quotas.agentic_request.remainingPercentage, undefined);
  assert.equal(result.quotas.agentic_request.unlimited, false);
  assert.equal(result.quotas.agentic_request_freetrial.unlimited, false);
});
