import test from "node:test";
import assert from "node:assert/strict";
import { convertUsageToQuotaInfo } from "../../open-sse/services/genericQuotaFetcher.ts";

test("convertUsageToQuotaInfo extracts window5h and window7d for volcengine canonical keys", () => {
  const usage = {
    plan: "Volcano Ark Coding Plan",
    quotas: {
      "session (5h)": {
        used: 40,
        total: 100,
        remainingPercentage: 60,
        resetAt: "2026-09-07T12:00:00.000Z",
      },
      "weekly (7d)": {
        used: 15,
        total: 100,
        remainingPercentage: 85,
        resetAt: "2026-09-14T00:00:00.000Z",
      },
    },
  };

  const info = convertUsageToQuotaInfo(usage, { provider: "volcengine-coding-plan" });
  assert.ok(info);
  assert.equal(info.window5h?.percentUsed, 0.4);
  assert.equal(info.window5h?.resetAt, "2026-09-07T12:00:00.000Z");
  assert.equal(info.window7d?.percentUsed, 0.15);
  assert.equal(info.window7d?.resetAt, "2026-09-14T00:00:00.000Z");
});

test("convertUsageToQuotaInfo extracts window5h and window7d from legacy fallback keys without poisoning modelWindows", () => {
  const usage = {
    plan: "Volcano Ark Agent Plan",
    quotas: {
      weekly: {
        used: 200,
        total: 1000,
        remainingPercentage: 80,
        resetAt: "2026-09-14T00:00:00.000Z",
      },
      monthly: {
        used: 500,
        total: 5000,
        remainingPercentage: 90,
        resetAt: "2026-10-01T00:00:00.000Z",
      },
    },
  };

  const info = convertUsageToQuotaInfo(usage, { provider: "volcengine-agent-plan" });
  assert.ok(info);
  // Missing 5h window must remain undefined, NOT poisoned by weekly or monthly
  assert.equal(info.window5h, undefined);
  assert.equal(info.window7d?.percentUsed, 0.2);
  assert.equal(info.window7d?.resetAt, "2026-09-14T00:00:00.000Z");
});
