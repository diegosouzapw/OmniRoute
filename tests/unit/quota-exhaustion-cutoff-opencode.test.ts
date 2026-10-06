import assert from "node:assert/strict";
import test from "node:test";

import {
  fetchOpencodeQuota,
  invalidateOpencodeQuotaCache,
  registerOpencodeQuotaFetcher,
} from "../../open-sse/services/opencodeQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";

type UsageStatus = "ok" | "rate-limited";
type WindowName = "rolling" | "weekly" | "monthly";
type UsageWindow = {
  status: UsageStatus;
  percent: number;
  resetsAt: string;
};
type OfficialUsage = Record<WindowName, UsageWindow>;
type ExhaustionCase = {
  window: WindowName;
  status: UsageStatus;
  percent: number;
  label: string;
};

const originalFetch = globalThis.fetch;
const resetAt: Record<WindowName, string> = {
  rolling: "2026-09-01T01:02:03.000Z",
  weekly: "2026-09-05T04:05:06.000Z",
  monthly: "2026-09-30T07:08:09.000Z",
};

function usageWith(window: WindowName, status: UsageStatus, percent: number): OfficialUsage {
  const usage: OfficialUsage = {
    rolling: { status: "ok", percent: 10, resetsAt: resetAt.rolling },
    weekly: { status: "ok", percent: 10, resetsAt: resetAt.weekly },
    monthly: { status: "ok", percent: 10, resetsAt: resetAt.monthly },
  };
  usage[window] = { status, percent, resetsAt: resetAt[window] };
  return usage;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

const exhaustionCases: ExhaustionCase[] = [
  { window: "rolling", status: "ok", percent: 100, label: "exhausted rolling" },
  { window: "weekly", status: "ok", percent: 100, label: "exhausted weekly" },
  { window: "monthly", status: "ok", percent: 100, label: "exhausted monthly" },
  {
    window: "rolling",
    status: "rate-limited",
    percent: 10,
    label: "rate-limited rolling",
  },
  {
    window: "weekly",
    status: "rate-limited",
    percent: 10,
    label: "rate-limited weekly",
  },
  {
    window: "monthly",
    status: "rate-limited",
    percent: 10,
    label: "rate-limited monthly",
  },
];

for (const exhaustion of exhaustionCases) {
  test(`OpenCode Go preflight blocks an ${exhaustion.label} window`, async () => {
    const connectionId = `preflight-${exhaustion.window}-${exhaustion.status}-${Date.now()}`;
    const usage = usageWith(exhaustion.window, exhaustion.status, exhaustion.percent);
    if (exhaustion.status === "rate-limited") {
      for (const window of ["rolling", "weekly", "monthly"] as const) {
        if (window !== exhaustion.window) usage[window].percent = 90;
      }
    }
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          usage,
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    registerOpencodeQuotaFetcher();

    try {
      const decision = await preflightQuota("opencode-go", connectionId, {
        apiKey: "opencode-key",
        providerSpecificData: { quotaPreflightEnabled: true },
      });

      assert.equal(decision.proceed, false);
      assert.equal(decision.reason, "quota_exhausted");
      assert.equal(decision.quotaPercent, 1);
      assert.equal(decision.resetAt, resetAt[exhaustion.window]);
    } finally {
      invalidateOpencodeQuotaCache(connectionId);
    }
  });
}

test("OpenCode Go preflight proceeds when every official usage window is healthy", async () => {
  const connectionId = `preflight-healthy-${Date.now()}`;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ usage: usageWith("rolling", "ok", 25) }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  registerOpencodeQuotaFetcher();

  try {
    const quota = await fetchOpencodeQuota(connectionId, { apiKey: "opencode-key" });
    assert.ok(quota);
    assert.equal(quota.limitReached, false);

    const decision = await preflightQuota("opencode-go", connectionId, {
      apiKey: "opencode-key",
      providerSpecificData: { quotaPreflightEnabled: true },
    });
    assert.equal(decision.proceed, true);
    assert.equal(decision.quotaPercent, 0.25);
  } finally {
    invalidateOpencodeQuotaCache(connectionId);
  }
});
