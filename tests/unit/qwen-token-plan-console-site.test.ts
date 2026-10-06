/**
 * qwen-token-plan-console-site.test.ts — the personal Token Plan is sold through TWO
 * consoles that share one backend, and the gateway validates the session against the
 * console declared in the request. Sending the Alibaba console cookie with the
 * QwenCloud console identity returns:
 *
 *   {"errorCode":"BailianGateway.Login.NotLogined"}
 *
 * Verified live (2026-08-14) against both consoles: switching only consoleSite/domain/
 * Origin/Referer (same cookie) turns that error into a real usage payload.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  resolveConsoleSite,
  fetchQwenTokenPlanQuota,
  invalidateQwenTokenPlanQuotaCache,
} from "../../open-sse/services/qwenTokenPlanQuotaFetcher.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("an Alibaba console cookie resolves to the Model Studio console", () => {
  const site = resolveConsoleSite("cna=x; login_aliyunid_ticket=abc; aui=1", undefined);
  assert.equal(site.consoleSite, "ALIYUN");
  assert.equal(site.domain, "modelstudio.console.alibabacloud.com");
  assert.equal(new URL(site.gatewayHost).hostname, "bailian-singapore-cs.alibabacloud.com");
  assert.equal(new URL(site.origin).hostname, "modelstudio.console.alibabacloud.com");
});

test("a QwenCloud console cookie resolves to the QwenCloud console", () => {
  const site = resolveConsoleSite("cna=x; login_qwencloud_ticket=abc", undefined);
  assert.equal(site.consoleSite, "QWENCLOUD");
  assert.equal(site.domain, "home.qwencloud.com");
  assert.equal(new URL(site.gatewayHost).hostname, "cs-data.qwencloud.com");
});

test("the provider decides when the cookie carries no console marker", () => {
  assert.equal(resolveConsoleSite("session=opaque", "bailian-coding-plan").consoleSite, "ALIYUN");
  assert.equal(
    resolveConsoleSite("session=opaque", "qwen-cloud-token-plan").consoleSite,
    "QWENCLOUD"
  );
  // Unknown provider + unmarked cookie keeps the QwenCloud default.
  assert.equal(resolveConsoleSite("session=opaque", undefined).consoleSite, "QWENCLOUD");
});

test("fetch sends the Alibaba console identity for an aliyun cookie", async () => {
  const connectionId = `console-site-${Date.now()}`;
  const calls: { url: string; init?: RequestInit }[] = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    const body = {
      code: "200",
      data: {
        DataV2: {
          data: {
            code: "SUCCESS",
            success: true,
            data: url.includes("%2Fusage")
              ? { per1WeekPercentage: 0.32, per1WeekResetTime: 1787254140000 }
              : url.includes("%2Fsubscription")
                ? { specCode: "pro" }
                : { pro: { five_hour: 12000, weekly: 40000 } },
          },
        },
        success: true,
      },
      httpStatusCode: "200",
    };
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof globalThis.fetch;

  const quota = await fetchQwenTokenPlanQuota(connectionId, {
    provider: "bailian-coding-plan",
    providerSpecificData: {
      qwenCloudCookie: "cna=x; login_aliyunid_ticket=abc",
      qwenCloudSecToken: "tok",
    },
  });

  assert.ok(quota, "expected quota");
  assert.equal(quota.percentUsed, 0.32);

  const usageCall = calls.find((c) => c.url.includes("%2Fusage"));
  assert.ok(usageCall, "usage call missing");
  assert.equal(
    new URL(usageCall.url).hostname,
    "bailian-singapore-cs.alibabacloud.com",
    `wrong gateway host: ${usageCall.url}`
  );
  const headers = usageCall.init?.headers as Record<string, string>;
  assert.equal(new URL(String(headers.Referer)).hostname, "modelstudio.console.alibabacloud.com");
  const params = JSON.parse(
    new URLSearchParams(String(usageCall.init?.body)).get("params") ?? "{}"
  );
  assert.equal(params.Data.cornerstoneParam.consoleSite, "ALIYUN");
  assert.equal(params.Data.cornerstoneParam.domain, "modelstudio.console.alibabacloud.com");

  invalidateQwenTokenPlanQuotaCache(connectionId);
});

test("bailian-coding-plan points at the Token Plan endpoint, not the Coding Plan one", async () => {
  const { bailian_coding_planProvider } =
    await import("../../open-sse/config/providers/registry/bailian-coding-plan/index.ts");
  // The catalog entry is named "Alibaba Token Plan" and links to token-plan-overview;
  // coding-intl.dashscope.aliyuncs.com only accepts Coding Plan keys (401 otherwise).
  assert.equal(
    bailian_coding_planProvider.baseUrl,
    "https://token-plan.ap-southeast-1.maas.aliyuncs.com/apps/anthropic/v1"
  );
});
