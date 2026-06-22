import test from "node:test";
import assert from "node:assert/strict";

import {
  parseBailianQuotaResponse,
  registerBailianCodingPlanQuotaFetcher,
  BAILIAN_QUOTA_WINDOWS,
} from "../../open-sse/services/bailianQuotaFetcher.ts";
import { getQuotaWindows } from "../../open-sse/services/quotaPreflight.ts";

// #4594 — Bailian exposed 5h/weekly/monthly windows internally but never surfaced
// them through the shared `quota.windows` contract nor registered them via
// registerQuotaWindows, so per-window preflight cutoffs and the dashboard window
// catalog could not see them. These tests pin both halves of the contract.

function quotaResponse() {
  return {
    code: "Success",
    data: {
      codingPlanInstanceInfos: [
        {
          codingPlanQuotaInfo: {
            per5HourUsedQuota: 60,
            per5HourTotalQuota: 100,
            per5HourQuotaNextRefreshTime: 1_900_000_000,
            perWeekUsedQuota: 20,
            perWeekTotalQuota: 100,
            perWeekQuotaNextRefreshTime: 1_900_100_000,
            perBillMonthUsedQuota: 10,
            perBillMonthTotalQuota: 100,
            perBillMonthQuotaNextRefreshTime: 1_900_200_000,
          },
        },
      ],
    },
  };
}

test("parseBailianQuotaResponse surfaces a windows map keyed by 5h/weekly/monthly", () => {
  const quota = parseBailianQuotaResponse(quotaResponse());
  assert.ok(quota);
  assert.ok(quota.windows, "expected a windows map");
  assert.deepEqual(Object.keys(quota.windows).sort(), [...BAILIAN_QUOTA_WINDOWS].sort());

  // window values mirror the legacy per-window fields
  assert.equal(quota.windows["5h"].percentUsed, 0.6);
  assert.equal(quota.windows["weekly"].percentUsed, 0.2);
  assert.equal(quota.windows["monthly"].percentUsed, 0.1);
  assert.equal(quota.windows["5h"].resetAt, quota.window5h.resetAt);
});

test("legacy per-window fields are preserved alongside the windows map", () => {
  const quota = parseBailianQuotaResponse(quotaResponse());
  assert.ok(quota);
  assert.equal(quota.window5h.percentUsed, 0.6);
  assert.equal(quota.windowWeekly.percentUsed, 0.2);
  assert.equal(quota.windowMonthly.percentUsed, 0.1);
  // worst-case percentUsed unchanged
  assert.equal(quota.percentUsed, 0.6);
});

test("registerBailianCodingPlanQuotaFetcher registers the named windows", () => {
  registerBailianCodingPlanQuotaFetcher();
  assert.deepEqual([...getQuotaWindows("bailian-coding-plan")].sort(), [...BAILIAN_QUOTA_WINDOWS].sort());
});
