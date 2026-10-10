/**
 * quota-fetchers-connection-proxy.test.ts — quota fetchers read through the
 * connection proxy context.
 *
 * Behavioural guard: with a proxy assigned to the connection, the upstream
 * quota request runs inside the connection proxy context instead of a direct
 * fetch; failures stay visible (null) and never fall back to a direct fetch.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  connectionProxyTestOverride,
  fetchWithConnectionProxy,
  resolveConnectionProxy,
} from "../../open-sse/services/connectionProxyFetch.ts";
import { hasAmbientProxyContext } from "../../open-sse/utils/proxyFetch.ts";
import {
  fetchAgentrouterQuota,
  invalidateAgentrouterQuotaCache,
} from "../../open-sse/services/agentrouterQuotaFetcher.ts";
import {
  fetchAlibabaFreeTierQuotaEntries,
  getAlibabaConsoleCookie,
} from "../../open-sse/services/alibabaFreeTierQuotaFetcher.ts";
import {
  fetchBailianQuota,
  invalidateBailianQuotaCache,
} from "../../open-sse/services/bailianQuotaFetcher.ts";
import {
  fetchCodexQuota,
  invalidateCodexQuotaCache,
  registerCodexConnection,
  unregisterCodexConnection,
} from "../../open-sse/services/codexQuotaFetcher.ts";
import {
  fetchContext7Quota,
  invalidateContext7QuotaCache,
} from "../../open-sse/services/context7QuotaFetcher.ts";
import {
  fetchDeepseekQuota,
  invalidateDeepseekQuotaCache,
} from "../../open-sse/services/deepseekQuotaFetcher.ts";
import {
  fetchFirecrawlQuota,
  invalidateFirecrawlQuotaCache,
} from "../../open-sse/services/firecrawlQuotaFetcher.ts";
import {
  fetchGrokCliQuota,
  invalidateGrokCliQuotaCache,
} from "../../open-sse/services/grokCliQuotaFetcher.ts";
import {
  fetchGrokWebQuota,
  invalidateGrokWebQuotaCache,
} from "../../open-sse/services/grokQuotaFetcher.ts";
import {
  fetchQwenTokenPlanQuota,
  invalidateQwenTokenPlanQuotaCache,
} from "../../open-sse/services/qwenTokenPlanQuotaFetcher.ts";

// socks5 skips the TCP reachability probe in runWithProxyContext, so the mock
// fetch below never races the fast-fail path; the proxy context is still set.
const ASSIGNED_PROXY = { type: "socks5", host: "127.0.0.1", port: 9 };
const QUOTA_URL = "https://console.example/api/quota";
const originalFetch = globalThis.fetch;
const originalAuthPath = process.env.GROK_AUTH_PATH;

function quotaResponse(): Response {
  return new Response(JSON.stringify({ quota: 1 }), { status: 200 });
}

/** Route every helper resolution through the assigned proxy in fetcher cases. */
function useAssignedProxy(): void {
  connectionProxyTestOverride.resolveProxyForConnection = async () => ({
    proxy: ASSIGNED_PROXY,
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  connectionProxyTestOverride.resolveProxyForConnection = null;
  if (originalAuthPath !== undefined) {
    process.env.GROK_AUTH_PATH = originalAuthPath;
  } else {
    delete process.env.GROK_AUTH_PATH;
  }
  delete process.env.QWEN_CLOUD_COOKIE;
  delete process.env.QWEN_CLOUD_SEC_TOKEN;
});

test("routes the quota fetch through the assigned connection proxy", async () => {
  let observedInContext: boolean | null = null;
  const fetchFn = async (): Promise<Response> => {
    observedInContext = hasAmbientProxyContext();
    return quotaResponse();
  };
  const response = await fetchWithConnectionProxy("conn-proxy", QUOTA_URL, undefined, {
    resolveProxyForConnection: async () => ({ proxy: ASSIGNED_PROXY }),
    fetchFn: fetchFn as typeof globalThis.fetch,
  });
  assert.ok(response instanceof Response);
  assert.equal(observedInContext, true);
});

test("runs directly when the connection has no proxy assigned", async () => {
  let observedInContext: boolean | null = null;
  const fetchFn = async (): Promise<Response> => {
    observedInContext = hasAmbientProxyContext();
    return quotaResponse();
  };
  const response = await fetchWithConnectionProxy("conn-direct", QUOTA_URL, undefined, {
    resolveProxyForConnection: async () => ({ proxy: null }),
    fetchFn: fetchFn as typeof globalThis.fetch,
  });
  assert.ok(response instanceof Response);
  assert.equal(observedInContext, false);
});

test("reports a missing connection identifier instead of fetching directly", async () => {
  let calls = 0;
  const fetchFn = async (): Promise<Response> => {
    calls += 1;
    return quotaResponse();
  };
  const response = await fetchWithConnectionProxy("", QUOTA_URL, undefined, {
    resolveProxyForConnection: async () => ({ proxy: ASSIGNED_PROXY }),
    fetchFn: fetchFn as typeof globalThis.fetch,
  });
  assert.equal(response, null);
  assert.equal(calls, 0);
});

test("reports a proxy failure instead of retrying outside the proxy", async () => {
  let calls = 0;
  const fetchFn = async (): Promise<Response> => {
    calls += 1;
    throw new Error("proxy blocked the console domain");
  };
  const response = await fetchWithConnectionProxy("conn-blocked", QUOTA_URL, undefined, {
    resolveProxyForConnection: async () => ({ proxy: ASSIGNED_PROXY }),
    fetchFn: fetchFn as typeof globalThis.fetch,
  });
  assert.equal(response, null);
  assert.equal(calls, 1);
});

test("reports a proxy resolution failure instead of fetching directly", async () => {
  let calls = 0;
  const fetchFn = async (): Promise<Response> => {
    calls += 1;
    return quotaResponse();
  };
  const response = await fetchWithConnectionProxy("conn-unknown", QUOTA_URL, undefined, {
    resolveProxyForConnection: async () => {
      throw new Error("unknown connection");
    },
    fetchFn: fetchFn as typeof globalThis.fetch,
  });
  assert.equal(response, null);
  assert.equal(calls, 0);
});

test("resolveConnectionProxy resolves through the stored connection binding", async () => {
  const proxy = await resolveConnectionProxy("conn-proxy", {
    resolveProxyForConnection: async () => ({ proxy: ASSIGNED_PROXY }),
  });
  assert.deepEqual(proxy, ASSIGNED_PROXY);
});

test("resolveConnectionProxy returns null when no proxy is assigned", async () => {
  const proxy = await resolveConnectionProxy("conn-direct", {
    resolveProxyForConnection: async () => ({ proxy: null }),
  });
  assert.equal(proxy, null);
});

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

test("qwen token plan quota reads the dashboard and gateway inside the proxy context", async () => {
  useAssignedProxy();
  const connectionId = `qwen-proxy-${Date.now()}`;
  const contexts: boolean[] = [];
  const dashboardHtml = '<html>SEC_TOKEN: "sec-abc"</html>';
  const usagePayload = { per1WeekResetTime: 1786714740000, per1WeekPercentage: 0.55 };
  const quotaConfig = { pro: { five_hour: 12000.0, weekly: 40000.0 } };
  const subscription = { specCode: "pro" };
  const wrappedFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    contexts.push(hasAmbientProxyContext());
    const url = String(input);
    if (!url.includes("/data/api.json")) {
      return new Response(dashboardHtml, { status: 200 });
    }
    if (url.includes("%2Fusage")) {
      return new Response(gatewayBody(usagePayload, "usage"), { status: 200 });
    }
    if (url.includes("%2Fquota-config")) {
      return new Response(gatewayBody(quotaConfig, "quota-config"), { status: 200 });
    }
    return new Response(gatewayBody(subscription, "subscription"), { status: 200 });
  }) as typeof globalThis.fetch;
  try {
    const quota = await fetchQwenTokenPlanQuota(connectionId, {
      providerSpecificData: { qwenCloudCookie: "login_qwencloud_ticket=tick" },
      provider: "qwen-cloud-token-plan",
    });
    assert.ok(quota);
    assert.equal(contexts.length >= 2, true);
    assert.ok(contexts.every(Boolean));
  } finally {
    globalThis.fetch = wrappedFetch;
    invalidateQwenTokenPlanQuotaCache(connectionId);
  }
});

test("agentrouter quota reads inside the proxy context", async () => {
  useAssignedProxy();
  const connectionId = `agentrouter-proxy-${Date.now()}`;
  let observed: boolean | null = null;
  const wrappedFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    observed = hasAmbientProxyContext();
    return new Response(JSON.stringify({ data: { quota: 250_000 } }), { status: 200 });
  }) as typeof globalThis.fetch;
  try {
    const quota = await fetchAgentrouterQuota(connectionId, {
      providerSpecificData: { consoleApiKey: "system-access-token", newApiUserId: "42" },
    });
    assert.ok(quota);
    assert.equal(observed, true);
  } finally {
    globalThis.fetch = wrappedFetch;
    invalidateAgentrouterQuotaCache(connectionId);
  }
});

test("alibaba free tier quota reads inside the proxy context", async () => {
  useAssignedProxy();
  const cookie = getAlibabaConsoleCookie({ alibabaConsoleCookie: "login_aliyunid_ticket=tick" });
  assert.ok(cookie);
  const wrappedFetch = globalThis.fetch;
  const contexts: boolean[] = [];
  globalThis.fetch = (async () => {
    contexts.push(hasAmbientProxyContext());
    return new Response(
      JSON.stringify({
        code: "200",
        data: {
          DataV2: {
            data: {
              data: {
                freeTierQuotas: [{ model: "qwen3-plus", freeTierOnly: true, quotaStatus: "VALID" }],
              },
            },
          },
        },
      }),
      { status: 200 }
    );
  }) as typeof globalThis.fetch;
  try {
    const entries = await fetchAlibabaFreeTierQuotaEntries(
      { alibabaConsoleCookie: "login_aliyunid_ticket=tick" },
      `alibaba-proxy-${Date.now()}`
    );
    assert.ok(entries);
    assert.ok(contexts.length >= 1);
    assert.ok(contexts.every(Boolean));
  } finally {
    globalThis.fetch = wrappedFetch;
  }
});

function bailianQuotaBody(used5h: number, usedWeekly: number): string {
  return JSON.stringify({
    code: "Success",
    data: {
      codingPlanInstanceInfos: [
        {
          planName: "Qwen3 Coder Next",
          codingPlanQuotaInfo: {
            per5HourUsedQuota: used5h,
            per5HourTotalQuota: 100,
            per5HourQuotaNextRefreshTime: 1718304000,
            perWeekUsedQuota: usedWeekly,
            perWeekTotalQuota: 100,
            perWeekQuotaNextRefreshTime: 1718563200,
            perBillMonthUsedQuota: 15,
            perBillMonthTotalQuota: 100,
            perBillMonthQuotaNextRefreshTime: 1719772800,
          },
        },
      ],
    },
  });
}

test("bailian quota retries the fallback host inside the proxy context", async () => {
  useAssignedProxy();
  const connectionId = `bailian-proxy-${Date.now()}`;
  const contexts: boolean[] = [];
  const wrappedFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    contexts.push(hasAmbientProxyContext());
    if (calls === 1) {
      return new Response(JSON.stringify({ code: "ConsoleNeedLogin" }), { status: 200 });
    }
    return new Response(bailianQuotaBody(30, 45), { status: 200 });
  }) as typeof globalThis.fetch;
  try {
    const quota = await fetchBailianQuota(connectionId, { apiKey: "test-key" });
    assert.equal(calls, 2);
    assert.ok(contexts.length === 2);
    assert.ok(contexts.every(Boolean));
    assert.equal(quota?.percentUsed, 0.45);
  } finally {
    globalThis.fetch = wrappedFetch;
    invalidateBailianQuotaCache(connectionId);
  }
});

test("codex quota reads inside the proxy context", async () => {
  useAssignedProxy();
  const connectionId = `codex-proxy-${Date.now()}`;
  registerCodexConnection(connectionId, { accessToken: "access-token" });
  let observed: boolean | null = null;
  const wrappedFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    observed = hasAmbientProxyContext();
    return new Response(
      JSON.stringify({
        rate_limit: {
          primary_window: { used_percent: 80, reset_after_seconds: 60 },
          secondary_window: { used_percent: 40, reset_after_seconds: 120 },
        },
      }),
      { status: 200 }
    );
  }) as typeof globalThis.fetch;
  try {
    const quota = await fetchCodexQuota(connectionId);
    assert.ok(quota);
    assert.equal(observed, true);
  } finally {
    globalThis.fetch = wrappedFetch;
    invalidateCodexQuotaCache(connectionId);
    unregisterCodexConnection(connectionId);
  }
});

test("context7 quota reads inside the proxy context", async () => {
  useAssignedProxy();
  const connectionId = `ctx7-proxy-${Date.now()}`;
  let observed: boolean | null = null;
  const wrappedFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    observed = hasAmbientProxyContext();
    return new Response(null, {
      status: 200,
      headers: {
        "ratelimit-limit": "1000",
        "ratelimit-remaining": "800",
        "ratelimit-reset": "1790812800",
      },
    });
  }) as typeof globalThis.fetch;
  try {
    const quota = await fetchContext7Quota(connectionId, { apiKey: "ctx7sk-test-tok" });
    assert.ok(quota);
    assert.equal(observed, true);
  } finally {
    globalThis.fetch = wrappedFetch;
    invalidateContext7QuotaCache(connectionId);
  }
});

test("deepseek quota reads inside the proxy context", async () => {
  useAssignedProxy();
  const connectionId = `deepseek-proxy-${Date.now()}`;
  let observed: boolean | null = null;
  const wrappedFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    observed = hasAmbientProxyContext();
    return new Response(
      JSON.stringify({ balance_infos: [{ currency: "USD", total_balance: "10.00" }] }),
      { status: 200 }
    );
  }) as typeof globalThis.fetch;
  try {
    const quota = await fetchDeepseekQuota(connectionId, { apiKey: "test-key" });
    assert.ok(quota);
    assert.equal(observed, true);
  } finally {
    globalThis.fetch = wrappedFetch;
    invalidateDeepseekQuotaCache(connectionId);
  }
});

test("firecrawl quota reads inside the proxy context", async () => {
  useAssignedProxy();
  const connectionId = `fc-proxy-${Date.now()}`;
  let observed: boolean | null = null;
  const wrappedFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    observed = hasAmbientProxyContext();
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          remainingCredits: 700,
          planCredits: 1000,
          billingPeriodEnd: "2026-07-31T23:59:59Z",
        },
      }),
      { status: 200 }
    );
  }) as typeof globalThis.fetch;
  try {
    const quota = await fetchFirecrawlQuota(connectionId, { apiKey: "fc-test-key" });
    assert.ok(quota);
    assert.equal(observed, true);
  } finally {
    globalThis.fetch = wrappedFetch;
    invalidateFirecrawlQuotaCache(connectionId);
  }
});

function encodeVarint(value: number): Buffer {
  const bytes: number[] = [];
  let v = BigInt(value);
  do {
    let byte = Number(v & 0x7fn);
    v >>= 7n;
    if (v !== 0n) byte |= 0x80;
    bytes.push(byte);
  } while (v !== 0n);
  return Buffer.from(bytes);
}

function encodeTag(fieldNumber: number, wireType: number): Buffer {
  return encodeVarint((fieldNumber << 3) | wireType);
}

function encodeFixed32Field(fieldNumber: number, value: number): Buffer {
  const body = Buffer.alloc(4);
  body.writeFloatLE(value, 0);
  return Buffer.concat([encodeTag(fieldNumber, 5), body]);
}

function encodeLengthDelimited(fieldNumber: number, body: Buffer): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, 2), encodeVarint(body.length), body]);
}

function encodeTimestampField(fieldNumber: number, seconds: number, nanos: number): Buffer {
  const parts: Buffer[] = [];
  if (seconds !== 0) {
    parts.push(Buffer.concat([encodeTag(1, 0), encodeVarint(seconds)]));
  }
  if (nanos !== 0) {
    parts.push(Buffer.concat([encodeTag(2, 0), encodeVarint(nanos)]));
  }
  return encodeLengthDelimited(fieldNumber, Buffer.concat(parts));
}

/** Framed gRPC-web GetGrokCreditsConfig response (same wire shape as the grok-cli test). */
function grokCreditsFrame(usageRatio: number): ArrayBuffer {
  const creditsInfo = Buffer.concat([
    encodeFixed32Field(1, usageRatio),
    encodeTimestampField(5, 1784825940, 867850000),
  ]);
  const topMessage = encodeLengthDelimited(1, creditsInfo);
  const header = Buffer.alloc(5);
  header[0] = 0x00;
  header.writeUInt32BE(topMessage.length, 1);
  const framed = Buffer.concat([header, topMessage]);
  return framed.buffer.slice(framed.byteOffset, framed.byteOffset + framed.byteLength);
}

test("grok cli quota reads inside the proxy context", async () => {
  useAssignedProxy();
  const connectionId = `grok-cli-proxy-${Date.now()}`;
  let observed: boolean | null = null;
  const wrappedFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    observed = hasAmbientProxyContext();
    return new Response(grokCreditsFrame(0.3), { status: 200 });
  }) as typeof globalThis.fetch;
  try {
    const quota = await fetchGrokCliQuota(connectionId, {
      credentials: { accessToken: "grok-token" },
    });
    assert.ok(quota);
    assert.equal(observed, true);
  } finally {
    globalThis.fetch = wrappedFetch;
    invalidateGrokCliQuotaCache(connectionId);
  }
});

function createGrokAuthFile(): string {
  const dir = mkdtempSync(join(tmpdir(), "grok-auth-proxy-test-"));
  const entry = {
    key: "test-access-token",
    refresh_token: "test-refresh-token",
    expires_at: new Date(Date.now() + 3600_000).toISOString(),
    email: "test@example.com",
    auth_mode: "device_code",
    oidc_issuer: "https://auth.x.ai",
    oidc_client_id: "test-client-id",
  };
  const authFile = join(dir, "auth.json");
  writeFileSync(authFile, JSON.stringify({ "test-entry": entry }, null, 2) + "\n");
  return authFile;
}

test("grok web billing reads inside the proxy context", async () => {
  useAssignedProxy();
  const authFile = createGrokAuthFile();
  process.env.GROK_AUTH_PATH = authFile;
  const connectionId = `grok-proxy-${Date.now()}`;
  const contexts: boolean[] = [];
  const wrappedFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    contexts.push(hasAmbientProxyContext());
    const urlStr = String(input);
    if (urlStr.includes("billing")) {
      return new Response(
        JSON.stringify({
          config: {
            creditUsagePercent: 15.3,
            currentPeriod: { type: "WEEKLY", end: "2026-07-24T06:34:33.775Z" },
            productUsage: [{ product: "Api", usagePercent: 15 }],
            onDemandCap: { val: 0 },
            onDemandUsed: { val: 0 },
            prepaidBalance: { val: 0 },
          },
        }),
        { status: 200 }
      );
    }
    return new Response("not found", { status: 404 });
  }) as typeof globalThis.fetch;
  try {
    const quota = await fetchGrokWebQuota(connectionId);
    assert.ok(quota);
    assert.ok(contexts.length >= 1);
    assert.ok(contexts.every(Boolean));
  } finally {
    globalThis.fetch = wrappedFetch;
    invalidateGrokWebQuotaCache(connectionId);
    try {
      rmSync(authFile, { force: true });
      rmSync(join(authFile, ".."), { force: true });
    } catch {
      // best effort cleanup
    }
  }
});
