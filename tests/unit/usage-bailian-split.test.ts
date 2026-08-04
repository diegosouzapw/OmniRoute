// Characterization of the services/usage.ts bailian split (god-file decomposition): the Bailian
// (Alibaba Token Plan) triple-window fetcher (getBailianCodingPlanUsage) moved into
// services/usage/bailian.ts so usage.ts stays a thin dispatcher. Behavior-preserving move — this
// locks the export surface and the worst-case window selection; the full triple-window matrix
// is covered via getUsageForProvider in bailian-usage.test.ts.
import { test } from "node:test";
import assert from "node:assert/strict";

const B = await import("../../open-sse/services/usage/bailian.ts");

test("module exposes getBailianCodingPlanUsage", () => {
  assert.equal(typeof B.getBailianCodingPlanUsage, "function");
});

test("getBailianCodingPlanUsage picks the most restrictive window as the surfaced quota", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        code: "Success",
        data: {
          codingPlanInstanceInfos: [
            {
              planName: "Qwen3 Coder Next",
              codingPlanQuotaInfo: {
                per5HourUsedQuota: 60,
                per5HourTotalQuota: 100,
                per5HourQuotaNextRefreshTime: 1718304000,
                perWeekUsedQuota: 80,
                perWeekTotalQuota: 100,
                perWeekQuotaNextRefreshTime: 1718563200,
                perBillMonthUsedQuota: 40,
                perBillMonthTotalQuota: 100,
                perBillMonthQuotaNextRefreshTime: 1719772800,
              },
            },
          ],
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  try {
    const r = (await B.getBailianCodingPlanUsage("conn", "sk-test", { consoleApiKey: "ck" })) as {
      plan?: string;
      used?: number;
      total?: number;
      remaining?: number;
      remainingPercentage?: number;
      unlimited?: boolean;
    };
    assert.equal(r.plan, "Alibaba Token Plan");
    assert.equal(r.unlimited, false);
    // weekly 80% is the most restrictive → used/total = 0.8
    assert.equal(r.used! / r.total!, 0.8);
    assert.equal(r.remainingPercentage, 20);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
