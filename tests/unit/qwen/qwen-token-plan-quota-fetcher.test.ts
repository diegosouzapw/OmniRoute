/**
 * qwen-token-plan-quota-fetcher.test.ts — Qwen Cloud / Alibaba Model Studio personal
 * Token Plan quota fetcher (issue #9603, Problema 1: quota is missing).
 *
 * Fixtures captured live (2026-08-13) from home.qwencloud.com/billing/subscription/
 * token-plan-individual — console gateway POST cs-data.qwencloud.com/data/api.json
 * (action=IntlBroadScopeAspnGateway, product=sfm_bailian), cookie-authenticated.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  QWEN_TOKEN_PLAN_WINDOW_5H,
  QWEN_TOKEN_PLAN_WINDOW_WEEKLY,
  extractQwenSecToken,
  fetchQwenTokenPlanQuota,
  invalidateQwenTokenPlanQuotaCache,
  registerQwenTokenPlanQuotaFetcher,
} from "../../../open-sse/services/qwenTokenPlanQuotaFetcher.ts";

const originalFetch = globalThis.fetch;

const RESET_MS = 1786714740000; // 2026-08-14 10:39 (captured per1WeekResetTime)

type FetchCall = { url: string; init: RequestInit | undefined };

function gatewayBody(payload: unknown, api: string): string {
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
      api,
      errorMsg: "",
    },
    httpStatusCode: "200",
    successResponse: true,
  });
}

const USAGE_PAYLOAD = { per1WeekResetTime: RESET_MS, per1WeekPercentage: 0.55 };
const QUOTA_CONFIG_PAYLOAD = {
  standard: { five_hour: 3000.0, weekly: 10000.0 },
  addon_quota: { extrabundle: 20000.0 },
  lite: { five_hour: 700.0, weekly: 2500.0 },
  pro: { five_hour: 12000.0, weekly: 40000.0 },
};
const SUBSCRIPTION_PAYLOAD = {
  instanceCode: "sfm_tokenplansolo_public_intl-sg-test",
  specCode: "pro",
  remainingDays: 24,
  startTime: 1786109803000,
  endTime: 1788796800000,
  autoRenewFlag: false,
  status: "VALID",
};

function mockGateway(
  calls: FetchCall[],
  overrides?: { usagePayload?: unknown; dashboardHtml?: string }
): void {
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });

    if (!url.includes("/data/api.json")) {
      // Dashboard HTML fetch (sec_token resolution)
      return new Response(overrides?.dashboardHtml ?? "<html>no token here</html>", {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }

    const jsonHeaders = { "content-type": "application/json" };
    if (url.includes("%2Fusage")) {
      const payload =
        overrides && "usagePayload" in overrides ? overrides.usagePayload : USAGE_PAYLOAD;
      return new Response(gatewayBody(payload, "usage"), { status: 200, headers: jsonHeaders });
    }
    if (url.includes("%2Fquota-config")) {
      return new Response(gatewayBody(QUOTA_CONFIG_PAYLOAD, "quota-config"), {
        status: 200,
        headers: jsonHeaders,
      });
    }
    if (url.includes("%2Fsubscription")) {
      return new Response(gatewayBody(SUBSCRIPTION_PAYLOAD, "subscription"), {
        status: 200,
        headers: jsonHeaders,
      });
    }
    return new Response(JSON.stringify({ code: "404" }), { status: 404, headers: jsonHeaders });
  }) as typeof globalThis.fetch;
}

test.beforeEach(() => {
  delete process.env.QWEN_CLOUD_COOKIE;
  delete process.env.QWEN_CLOUD_SEC_TOKEN;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("fetchQwenTokenPlanQuota returns null without any cookie configured", async () => {
  const calls: FetchCall[] = [];
  mockGateway(calls);

  const quota = await fetchQwenTokenPlanQuota(`qwen-nocookie-${Date.now()}`, {});

  assert.equal(quota, null);
  assert.equal(calls.length, 0);
});

test("fetchQwenTokenPlanQuota parses the captured weekly-only usage response", async () => {
  const connectionId = `qwen-weekly-${Date.now()}`;
  const calls: FetchCall[] = [];
  mockGateway(calls);

  const quota = await fetchQwenTokenPlanQuota(connectionId, {
    providerSpecificData: { qwenCloudCookie: "token=abc123; aux=1", qwenCloudSecToken: "sec-tok" },
  });

  assert.ok(quota, "expected quota, got null");
  assert.equal(quota.percentUsed, 0.55);
  assert.equal(quota.resetAt, new Date(RESET_MS).toISOString());

  const windows = (
    quota as { windows: Record<string, { percentUsed: number; resetAt: string | null }> }
  ).windows;
  assert.ok(windows[QWEN_TOKEN_PLAN_WINDOW_WEEKLY], "weekly window missing");
  assert.equal(windows[QWEN_TOKEN_PLAN_WINDOW_WEEKLY].percentUsed, 0.55);
  assert.equal(windows[QWEN_TOKEN_PLAN_WINDOW_WEEKLY].resetAt, new Date(RESET_MS).toISOString());
  // 5-hour window "Temporarily Removed" → API omits per5Hour* fields → no window
  assert.equal(windows[QWEN_TOKEN_PLAN_WINDOW_5H], undefined);

  // Tier totals resolved via subscription.specCode → quota-config.pro
  assert.equal(quota.total, 40000);
  assert.equal(quota.used, Math.round(0.55 * 40000));
  assert.equal((quota as { specCode: string | null }).specCode, "pro");

  // Request contract (captured shape)
  const usageCall = calls.find((c) => c.url.includes("%2Fusage"));
  assert.ok(usageCall, "usage gateway call missing");
  assert.equal(usageCall.init?.method, "POST");
  const headers = usageCall.init?.headers as Record<string, string>;
  assert.ok(String(headers["Cookie"] ?? headers["cookie"]).includes("token=abc123"));
  const body = String(usageCall.init?.body);
  assert.ok(body.includes("product=sfm_bailian"), "body missing product");
  assert.ok(body.includes("action=IntlBroadScopeAspnGateway"), "body missing action");
  assert.ok(body.includes("region=ap-southeast-1"), "body missing region");
  assert.ok(body.includes("sec_token=sec-tok"), "body missing sec_token");
  const params = new URLSearchParams(body).get("params");
  assert.ok(params, "body missing params");
  const parsedParams = JSON.parse(params) as {
    Api: string;
    V: string;
    Data: { commodityCode: string };
  };
  assert.equal(parsedParams.V, "1.0");
  assert.ok(parsedParams.Api.includes("/tokenplan/personal/api/v2/usage"));
  assert.equal(parsedParams.Data.commodityCode, "sfm_tokenplansolo_public_intl");

  invalidateQwenTokenPlanQuotaCache(connectionId);
});

test("fetchQwenTokenPlanQuota includes the 5-hour window when the API returns it", async () => {
  const connectionId = `qwen-5h-${Date.now()}`;
  const calls: FetchCall[] = [];
  mockGateway(calls, {
    usagePayload: {
      per1WeekResetTime: RESET_MS,
      per1WeekPercentage: 0.55,
      per5HourResetTime: RESET_MS - 3_600_000,
      per5HourPercentage: 0.7,
    },
  });

  const quota = await fetchQwenTokenPlanQuota(connectionId, {
    providerSpecificData: { qwenCloudCookie: "token=abc", qwenCloudSecToken: "sec-tok" },
  });

  assert.ok(quota, "expected quota, got null");
  const windows = (
    quota as { windows: Record<string, { percentUsed: number; resetAt: string | null }> }
  ).windows;
  assert.equal(windows[QWEN_TOKEN_PLAN_WINDOW_5H]?.percentUsed, 0.7);
  // worst window wins
  assert.equal(quota.percentUsed, 0.7);
  assert.equal(quota.resetAt, new Date(RESET_MS - 3_600_000).toISOString());

  invalidateQwenTokenPlanQuotaCache(connectionId);
});

test("fetchQwenTokenPlanQuota returns null when the console session expired", async () => {
  const connectionId = `qwen-expired-${Date.now()}`;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ code: "ConsoleNeedLogin" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof globalThis.fetch;

  const quota = await fetchQwenTokenPlanQuota(connectionId, {
    providerSpecificData: { qwenCloudCookie: "token=stale", qwenCloudSecToken: "sec-tok" },
  });

  assert.equal(quota, null);
});

test("fetchQwenTokenPlanQuota resolves sec_token from the dashboard when absent", async () => {
  const connectionId = `qwen-sectoken-${Date.now()}`;
  const calls: FetchCall[] = [];
  mockGateway(calls, {
    dashboardHtml:
      '<script>window.X = { IS_CERTIFIED: "true", SEC_TOKEN: "resolved-tok" };</script>',
  });

  const quota = await fetchQwenTokenPlanQuota(connectionId, {
    providerSpecificData: { qwenCloudCookie: "token=abc" },
  });

  assert.ok(quota, "expected quota, got null");
  const dashboardCall = calls.find((c) => !c.url.includes("/data/api.json"));
  assert.ok(dashboardCall, "dashboard fetch for sec_token missing");
  const usageCall = calls.find((c) => c.url.includes("%2Fusage"));
  assert.ok(String(usageCall?.init?.body).includes("sec_token=resolved-tok"));

  invalidateQwenTokenPlanQuotaCache(connectionId);
});

test("fetchQwenTokenPlanQuota serves the second call from cache", async () => {
  const connectionId = `qwen-cache-${Date.now()}`;
  const calls: FetchCall[] = [];
  mockGateway(calls);

  const connection = {
    providerSpecificData: { qwenCloudCookie: "token=abc", qwenCloudSecToken: "sec-tok" },
  };
  const first = await fetchQwenTokenPlanQuota(connectionId, connection);
  assert.ok(first);
  const callCountAfterFirst = calls.length;

  const second = await fetchQwenTokenPlanQuota(connectionId, connection);
  assert.ok(second);
  assert.equal(calls.length, callCountAfterFirst);

  invalidateQwenTokenPlanQuotaCache(connectionId);
});

test("extractQwenSecToken pulls SEC_TOKEN out of dashboard HTML", () => {
  assert.equal(extractQwenSecToken('foo SEC_TOKEN: "abc-123", bar'), "abc-123");
  assert.equal(extractQwenSecToken("<html>nothing</html>"), null);
});

test("registerQwenTokenPlanQuotaFetcher registers without throwing", () => {
  registerQwenTokenPlanQuotaFetcher();
});

test("qwen-cloud-token-plan and bailian-coding-plan are wired into the usage/UI lists", async () => {
  const { USAGE_FETCHER_PROVIDERS } = await import("../../../open-sse/services/usage.ts");
  const { USAGE_SUPPORTED_PROVIDERS } = await import("../../../src/shared/constants/providers.ts");

  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("qwen-cloud-token-plan"));
  assert.ok((USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("qwen-cloud-token-plan"));
  // #9603 UI gap: coding-plan connections were filtered out of /dashboard/quota
  assert.ok((USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("bailian-coding-plan"));
});
