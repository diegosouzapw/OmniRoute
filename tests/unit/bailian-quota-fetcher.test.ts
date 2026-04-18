import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchBailianQuota,
  invalidateBailianQuotaCache,
  registerBailianCodingPlanQuotaFetcher,
} from "../../open-sse/services/bailianQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import {
  clearQuotaMonitors,
  getActiveMonitorCount,
  startQuotaMonitor,
  stopQuotaMonitor,
} from "../../open-sse/services/quotaMonitor.ts";
import { clearSessions, touchSession } from "../../open-sse/services/sessionManager.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
  clearSessions();
});

test("fetchBailianQuota returns null when no registered credentials exist", async () => {
  const quota: any = await fetchBailianQuota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchBailianQuota uses apiKey when consoleApiKey is absent", async () => {
  const connectionId = `bailian-inline-${Date.now()}`;
  const calls: any[] = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        code: "Success",
        data: {
          codingPlanInstanceInfos: [
            {
              planName: "Qwen3 Coder Next",
              codingPlanQuotaInfo: {
                per5HourUsedQuota: 50,
                per5HourTotalQuota: 100,
                per5HourQuotaNextRefreshTime: 1718304000,
                perWeekUsedQuota: 30,
                perWeekTotalQuota: 100,
                perWeekQuotaNextRefreshTime: 1718563200,
                perBillMonthUsedQuota: 20,
                perBillMonthTotalQuota: 100,
                perBillMonthQuotaNextRefreshTime: 1719772800,
              },
            },
          ],
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "test-api-key",
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].init.headers["Authorization"], "Bearer test-api-key");
  assert.equal(quota?.percentUsed, 0.5);

  invalidateBailianQuotaCache(connectionId);
});

test("fetchBailianQuota uses apiKey when consoleApiKey is empty string", async () => {
  const connectionId = `bailian-empty-console-${Date.now()}`;
  const calls: any[] = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        code: "Success",
        data: {
          codingPlanInstanceInfos: [
            {
              planName: "Qwen3 Coder Next",
              codingPlanQuotaInfo: {
                per5HourUsedQuota: 40,
                per5HourTotalQuota: 100,
                per5HourQuotaNextRefreshTime: 1718304000,
                perWeekUsedQuota: 60,
                perWeekTotalQuota: 100,
                perWeekQuotaNextRefreshTime: 1718563200,
                perBillMonthUsedQuota: 25,
                perBillMonthTotalQuota: 100,
                perBillMonthQuotaNextRefreshTime: 1719772800,
              },
            },
          ],
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "fallback-key",
    providerSpecificData: {
      consoleApiKey: "",
    },
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].init.headers["Authorization"], "Bearer fallback-key");
  assert.equal(quota?.percentUsed, 0.6);

  invalidateBailianQuotaCache(connectionId);
});

test("fetchBailianQuota prefers consoleApiKey when present", async () => {
  const connectionId = `bailian-console-key-${Date.now()}`;
  const calls: any[] = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        code: "Success",
        data: {
          codingPlanInstanceInfos: [
            {
              planName: "Qwen3 Coder Next",
              codingPlanQuotaInfo: {
                per5HourUsedQuota: 70,
                per5HourTotalQuota: 100,
                per5HourQuotaNextRefreshTime: 1718304000,
                perWeekUsedQuota: 50,
                perWeekTotalQuota: 100,
                perWeekQuotaNextRefreshTime: 1718563200,
                perBillMonthUsedQuota: 30,
                perBillMonthTotalQuota: 100,
                perBillMonthQuotaNextRefreshTime: 1719772800,
              },
            },
          ],
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "regular-key",
    providerSpecificData: {
      consoleApiKey: "ck-test",
    },
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].init.headers["Authorization"], "Bearer ck-test");
  assert.equal(quota?.percentUsed, 0.7);

  invalidateBailianQuotaCache(connectionId);
});

test("fetchBailianQuota parses triple-window and returns percentUsed = max(5h%, weekly%, monthly%)", async () => {
  const connectionId = `bailian-triple-${Date.now()}`;
  const calls: any[] = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
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
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  assert.equal(calls.length, 1);
  assert.equal(quota?.percentUsed, 0.8);
  assert.equal(quota?.window5h?.percentUsed, 0.6);
  assert.equal(quota?.windowWeekly?.percentUsed, 0.8);
  assert.equal(quota?.windowMonthly?.percentUsed, 0.4);

  invalidateBailianQuotaCache(connectionId);
});

test("fetchBailianQuota retries with China host on ConsoleNeedLogin", async () => {
  const connectionId = `bailian-retry-${Date.now()}`;
  const calls: any[] = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });

    if (calls.length === 1) {
      return new Response(
        JSON.stringify({
          code: "ConsoleNeedLogin",
          message: "Login required",
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        code: "Success",
        data: {
          codingPlanInstanceInfos: [
            {
              planName: "Qwen3 Coder Next",
              codingPlanQuotaInfo: {
                per5HourUsedQuota: 30,
                per5HourTotalQuota: 100,
                per5HourQuotaNextRefreshTime: 1718304000,
                perWeekUsedQuota: 45,
                perWeekTotalQuota: 100,
                perWeekQuotaNextRefreshTime: 1718563200,
                perBillMonthUsedQuota: 15,
                perBillMonthTotalQuota: 100,
                perBillMonthQuotaNextRefreshTime: 1719772800,
              },
            },
          ],
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  assert.equal(calls.length, 2);
  assert.equal(new URL(calls[0].url).hostname, "modelstudio.console.alibabacloud.com");
  assert.equal(new URL(calls[1].url).hostname, "bailian.console.aliyun.com");
  assert.equal(quota?.percentUsed, 0.45);

  invalidateBailianQuotaCache(connectionId);
});

test("fetchBailianQuota does not retry more than once on ConsoleNeedLogin", async () => {
  const connectionId = `bailian-no-retry-${Date.now()}`;
  const calls: any[] = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        code: "ConsoleNeedLogin",
        message: "Login required",
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  assert.equal(calls.length, 2);
  assert.equal(quota, null);

  invalidateBailianQuotaCache(connectionId);
});

test("fetchBailianQuota returns null on network error", async () => {
  const connectionId = `bailian-network-error-${Date.now()}`;

  globalThis.fetch = async () => {
    throw new Error("Network error");
  };

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  assert.equal(quota, null);
});

test("fetchBailianQuota returns null when response has no codingPlanQuotaInfo", async () => {
  const connectionId = `bailian-empty-${Date.now()}`;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        code: "Success",
        data: {
          codingPlanInstanceInfos: [
            {
              planName: "Qwen3 Coder Next",
            },
          ],
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  assert.equal(quota, null);
});
test("fetchBailianQuota caches results within TTL", async () => {
  const connectionId = `bailian-cache-${Date.now()}`;
  const calls: any[] = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        code: "Success",
        data: {
          codingPlanInstanceInfos: [
            {
              planName: "Qwen3 Coder Next",
              codingPlanQuotaInfo: {
                per5HourUsedQuota: 25,
                per5HourTotalQuota: 100,
                per5HourQuotaNextRefreshTime: 1718304000,
                perWeekUsedQuota: 35,
                perWeekTotalQuota: 100,
                perWeekQuotaNextRefreshTime: 1718563200,
                perBillMonthUsedQuota: 10,
                perBillMonthTotalQuota: 100,
                perBillMonthQuotaNextRefreshTime: 1719772800,
              },
            },
          ],
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const first = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  const second = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  assert.equal(calls.length, 1);
  assert.deepEqual(first, second);

  invalidateBailianQuotaCache(connectionId);

  const third = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  assert.equal(calls.length, 2);
});

test("ALIBABA_CODING_PLAN_HOST env var overrides default host", async () => {
  const connectionId = `bailian-env-host-${Date.now()}`;
  const calls: any[] = [];
  const originalEnv = process.env.ALIBABA_CODING_PLAN_HOST;

  process.env.ALIBABA_CODING_PLAN_HOST = "custom.bailian.aliyun.com";

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        code: "Success",
        data: {
          codingPlanInstanceInfos: [
            {
              planName: "Qwen3 Coder Next",
              codingPlanQuotaInfo: {
                per5HourUsedQuota: 20,
                per5HourTotalQuota: 100,
                per5HourQuotaNextRefreshTime: 1718304000,
                perWeekUsedQuota: 55,
                perWeekTotalQuota: 100,
                perWeekQuotaNextRefreshTime: 1718563200,
                perBillMonthUsedQuota: 5,
                perBillMonthTotalQuota: 100,
                perBillMonthQuotaNextRefreshTime: 1719772800,
              },
            },
          ],
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  assert.equal(calls.length, 1);
  assert.equal(new URL(calls[0].url).hostname, "custom.bailian.aliyun.com");
  assert.equal(quota?.percentUsed, 0.55);

  process.env.ALIBABA_CODING_PLAN_HOST = originalEnv;
  invalidateBailianQuotaCache(connectionId);
});

test("ALIBABA_CODING_PLAN_QUOTA_URL env var overrides full URL", async () => {
  const connectionId = `bailian-env-url-${Date.now()}`;
  const calls: any[] = [];
  const originalEnv = process.env.ALIBABA_CODING_PLAN_QUOTA_URL;

  process.env.ALIBABA_CODING_PLAN_QUOTA_URL = "https://override.example.com/api/v1/quota";

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        code: "Success",
        data: {
          codingPlanInstanceInfos: [
            {
              planName: "Qwen3 Coder Next",
              codingPlanQuotaInfo: {
                per5HourUsedQuota: 10,
                per5HourTotalQuota: 100,
                per5HourQuotaNextRefreshTime: 1718304000,
                perWeekUsedQuota: 20,
                perWeekTotalQuota: 100,
                perWeekQuotaNextRefreshTime: 1718563200,
                perBillMonthUsedQuota: 5,
                perBillMonthTotalQuota: 100,
                perBillMonthQuotaNextRefreshTime: 1719772800,
              },
            },
          ],
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  assert.equal(calls.length, 1);
  assert.equal(new URL(calls[0].url).hostname, "override.example.com");
  assert.equal(quota?.percentUsed, 0.2);

  process.env.ALIBABA_CODING_PLAN_QUOTA_URL = originalEnv;
  invalidateBailianQuotaCache(connectionId);
});

test("registerBailianCodingPlanQuotaFetcher exposes Bailian quota to preflight and monitor flows", async () => {
  const connectionId = `bailian-preflight-${Date.now()}`;

  registerBailianCodingPlanQuotaFetcher();

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        code: "Success",
        data: {
          codingPlanInstanceInfos: [
            {
              planName: "Qwen3 Coder Next",
              codingPlanQuotaInfo: {
                per5HourUsedQuota: 98,
                per5HourTotalQuota: 100,
                per5HourQuotaNextRefreshTime: 1718304000,
                perWeekUsedQuota: 90,
                perWeekTotalQuota: 100,
                perWeekQuotaNextRefreshTime: 1718563200,
                perBillMonthUsedQuota: 50,
                perBillMonthTotalQuota: 100,
                perBillMonthQuotaNextRefreshTime: 1719772800,
              },
            },
          ],
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

  const preflight = await preflightQuota("bailian-coding-plan", connectionId, {
    apiKey: "test-key",
    providerSpecificData: { quotaPreflightEnabled: true },
  });

  touchSession("session-bailian", connectionId);
  startQuotaMonitor("session-bailian", "bailian-coding-plan", connectionId, {
    providerSpecificData: { quotaMonitorEnabled: true },
  });

  assert.equal(preflight.proceed, false);
  assert.equal(preflight.reason, "quota_exhausted");
  assert.equal(getActiveMonitorCount(), 1);

  stopQuotaMonitor("session-bailian");
  assert.equal(getActiveMonitorCount(), 0);
});

test("fetchBailianQuota returns null on malformed JSON response", async () => {
  const connectionId = `bailian-malformed-json-${Date.now()}`;

  globalThis.fetch = async () =>
    new Response("not valid json{{{", {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const quota: any = await fetchBailianQuota(connectionId, {
    apiKey: "test-key",
  });

  assert.equal(quota, null);

  invalidateBailianQuotaCache(connectionId);
});
