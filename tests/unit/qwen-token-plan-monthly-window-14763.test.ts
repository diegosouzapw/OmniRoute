/**
 * qwen-token-plan-monthly-window-repro.test.ts — TDD repro probe for issue #14763.
 *
 * QwenCloud has moved the personal Token Plan quota from 5-hour/weekly sliding windows
 * to a single Monthly Quota. This test mocks the console gateway `usage` and
 * `quota-config` endpoints with a monthly-only payload (no per5HourPercentage /
 * per1WeekPercentage fields at all — mirroring the reporter's screenshot) and asserts
 * that fetchQwenTokenPlanQuota() still returns a usable quota.
 *
 * On current (pre-fix) code this is expected to FAIL: parseUsageWindows() only knows
 * about the 5-hour/weekly field prefixes, so windowEntries.length === 0 and
 * fetchQwenTokenPlanQuota() returns null — which is exactly the reported dashboard
 * symptom (no usable remaining-quota figure).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchQwenTokenPlanQuota,
  invalidateQwenTokenPlanQuotaCache,
  registerQwenTokenPlanQuotaFetcher,
} from "../../open-sse/services/qwenTokenPlanQuotaFetcher.ts";

const originalFetch = globalThis.fetch;

// Captured-shape stand-in per the issue report: a monthly-only usage payload (no
// per5Hour*/per1Week* fields at all — QwenCloud's dashboard shows only a Monthly Quota
// card now). Exact upstream field name is unconfirmed by the reporter, so this probe
// tries the most likely candidate name from the issue's "Proposed Fix" section.
const RESET_MS = Date.parse("2026-10-18T17:00:00.000Z");
const USAGE_PAYLOAD = { perBillMonthResetTime: RESET_MS, perBillMonthPercentage: 0.068 }; // 93.2% remaining → 6.8% used
const QUOTA_CONFIG_PAYLOAD = {
  standard: { monthly: 45000.0 },
};
const SUBSCRIPTION_PAYLOAD = {
  instanceCode: "sfm_tokenplansolo_public_intl-sg-test",
  specCode: "standard",
  remainingDays: 24,
  status: "VALID",
};

function gatewayBody(payload: unknown): string {
  return JSON.stringify({
    code: "200",
    data: {
      DataV2: {
        ret: ["SUCCESS::ok"],
        data: { msg: "Success.", code: "SUCCESS", data: payload, success: true },
      },
      success: true,
      httpStatus: 200,
      errorCode: "",
      errorMsg: "",
    },
    httpStatusCode: "200",
    successResponse: true,
  });
}

function mockGateway(): void {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (!url.includes("/data/api.json")) {
      return new Response("<html>no token here</html>", {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }
    const jsonHeaders = { "content-type": "application/json" };
    if (url.includes("%2Fusage")) {
      return new Response(gatewayBody(USAGE_PAYLOAD), { status: 200, headers: jsonHeaders });
    }
    if (url.includes("%2Fquota-config")) {
      return new Response(gatewayBody(QUOTA_CONFIG_PAYLOAD), { status: 200, headers: jsonHeaders });
    }
    if (url.includes("%2Fsubscription")) {
      return new Response(gatewayBody(SUBSCRIPTION_PAYLOAD), { status: 200, headers: jsonHeaders });
    }
    return new Response(gatewayBody({}), { status: 200, headers: jsonHeaders });
  }) as typeof fetch;
}

test.after(() => {
  globalThis.fetch = originalFetch;
});

test("fetchQwenTokenPlanQuota returns a usable quota for a monthly-only usage payload (issue #14763)", async () => {
  registerQwenTokenPlanQuotaFetcher();
  invalidateQwenTokenPlanQuotaCache("conn-14763");
  mockGateway();

  const quota = await fetchQwenTokenPlanQuota("conn-14763", {
    providerSpecificData: { qwenCloudCookie: "login_qwencloud_ticket=abc; other=1" },
    provider: "qwen-cloud-token-plan",
  });

  // Reported bug: this comes back null because parseUsageWindows() only recognizes
  // per5HourPercentage/per1WeekPercentage — a monthly-only payload yields zero windows.
  assert.notEqual(quota, null, "expected a non-null quota for a monthly-only usage payload");
  assert.ok(
    quota && quota.total === 45000,
    `expected total to be resolved from the monthly tier limit (45000), got ${quota?.total}`
  );
});

test("monthly window is registered and legacy 5h/weekly payloads keep their weekly total (issue #14763)", async () => {
  const { QWEN_TOKEN_PLAN_WINDOW_MONTHLY } =
    await import("../../open-sse/services/qwenTokenPlanQuotaFetcher.ts");
  assert.equal(QWEN_TOKEN_PLAN_WINDOW_MONTHLY, "window_monthly");

  registerQwenTokenPlanQuotaFetcher();
  invalidateQwenTokenPlanQuotaCache("conn-14763-legacy");
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    const h = { "content-type": "application/json" };
    if (!url.includes("/data/api.json")) return new Response("<html></html>", { status: 200 });
    if (url.includes("%2Fusage"))
      return new Response(gatewayBody({ per1WeekPercentage: 0.5, per1WeekResetTime: RESET_MS }), {
        status: 200,
        headers: h,
      });
    if (url.includes("%2Fquota-config"))
      return new Response(gatewayBody({ standard: { weekly: 1000, monthly: 45000 } }), {
        status: 200,
        headers: h,
      });
    if (url.includes("%2Fsubscription"))
      return new Response(gatewayBody(SUBSCRIPTION_PAYLOAD), { status: 200, headers: h });
    return new Response(gatewayBody({}), { status: 200, headers: h });
  }) as typeof fetch;

  const quota = await fetchQwenTokenPlanQuota("conn-14763-legacy", {
    providerSpecificData: { qwenCloudCookie: "login_qwencloud_ticket=abc" },
    provider: "qwen-cloud-token-plan",
  });
  assert.equal(quota?.total, 1000);
});
