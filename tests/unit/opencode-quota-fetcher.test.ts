import assert from "node:assert/strict";
import test from "node:test";

import {
  fetchOpencodeQuota,
  invalidateOpencodeQuotaCache,
  registerOpencodeQuotaFetcher,
} from "../../open-sse/services/opencodeQuotaFetcher.ts";
import { getQuotaFetcher, getQuotaWindows } from "../../open-sse/services/quotaPreflight.ts";
import {
  clearQuotaMonitors,
  getActiveMonitorCount,
  startQuotaMonitor,
  stopQuotaMonitor,
} from "../../open-sse/services/quotaMonitor.ts";
import { clearSessions, touchSession } from "../../open-sse/services/sessionManager.ts";

type UsageStatus = "ok" | "rate-limited";
type UsageWindow = {
  status: UsageStatus;
  percent: number;
  resetsAt: string;
};
type OfficialUsage = {
  rolling: UsageWindow;
  weekly: UsageWindow;
  monthly: UsageWindow;
};

const originalFetch = globalThis.fetch;
const RESET_ROLLING = "2026-09-01T01:02:03.000Z";
const RESET_WEEKLY = "2026-09-05T04:05:06.000Z";
const RESET_MONTHLY = "2026-09-30T07:08:09.000Z";

function healthyUsage(): OfficialUsage {
  return {
    rolling: { status: "ok", percent: 25, resetsAt: RESET_ROLLING },
    weekly: { status: "ok", percent: 50, resetsAt: RESET_WEEKLY },
    monthly: { status: "ok", percent: 10, resetsAt: RESET_MONTHLY },
  };
}

function jsonResponse(usage: unknown): Response {
  return new Response(JSON.stringify({ usage }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
  clearSessions();
});

test("fetchOpencodeQuota returns null without an API key", async () => {
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return jsonResponse(healthyUsage());
  };

  assert.equal(await fetchOpencodeQuota(`missing-${Date.now()}`), null);
  assert.equal(await fetchOpencodeQuota(`empty-${Date.now()}`, { apiKey: "" }), null);
  assert.equal(called, false);
});

test("fetchOpencodeQuota parses official usage windows as fractions and sends Bearer auth", async () => {
  const connectionId = `official-${Date.now()}`;
  let authorization: string | null = null;
  let method = "";

  globalThis.fetch = async (input, init) => {
    const request = new Request(input, init);
    authorization = request.headers.get("Authorization");
    method = request.method;
    return jsonResponse(healthyUsage());
  };

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "Bearer opencode-key" });

  assert.ok(quota);
  assert.equal(authorization, "Bearer opencode-key");
  assert.equal(method, "GET");
  assert.equal(quota.percentUsed, 0.5);
  assert.equal(quota.resetAt, RESET_WEEKLY);
  assert.equal(quota.limitReached, false);
  assert.deepEqual(quota.windows, {
    window_5h: { percentUsed: 0.25, resetAt: RESET_ROLLING },
    window_weekly: { percentUsed: 0.5, resetAt: RESET_WEEKLY },
    window_monthly: { percentUsed: 0.1, resetAt: RESET_MONTHLY },
  });
  assert.deepEqual(quota.window5h, { percentUsed: 0.25, resetAt: RESET_ROLLING });
  assert.deepEqual(quota.windowWeekly, { percentUsed: 0.5, resetAt: RESET_WEEKLY });
  assert.deepEqual(quota.windowMonthly, { percentUsed: 0.1, resetAt: RESET_MONTHLY });

  invalidateOpencodeQuotaCache(connectionId);
});

test("fetchOpencodeQuota makes a rate-limited window effectively exhausted", async () => {
  const connectionId = `rate-limited-${Date.now()}`;
  const usage = healthyUsage();
  usage.rolling = { status: "rate-limited", percent: 37, resetsAt: RESET_ROLLING };
  globalThis.fetch = async () => jsonResponse(usage);

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "opencode-key" });

  assert.ok(quota);
  assert.equal(quota.window5h.percentUsed, 1);
  assert.equal(quota.windows?.window_5h.percentUsed, 1);
  assert.equal(quota.percentUsed, 1);
  assert.equal(quota.resetAt, RESET_ROLLING);
  assert.equal(quota.limitReached, true);

  invalidateOpencodeQuotaCache(connectionId);
});

test("fetchOpencodeQuota treats an ok window at 100 percent as exhausted", async () => {
  const connectionId = `hundred-${Date.now()}`;
  const usage = healthyUsage();
  usage.monthly = { status: "ok", percent: 100, resetsAt: RESET_MONTHLY };
  globalThis.fetch = async () => jsonResponse(usage);

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "opencode-key" });

  assert.ok(quota);
  assert.equal(quota.windowMonthly.percentUsed, 1);
  assert.equal(quota.percentUsed, 1);
  assert.equal(quota.limitReached, true);

  invalidateOpencodeQuotaCache(connectionId);
});

test("fetchOpencodeQuota fails open on non-200, network, and invalid JSON responses", async (t) => {
  await t.test("non-200", async () => {
    const connectionId = `non-200-${Date.now()}`;
    globalThis.fetch = async () => new Response("unavailable", { status: 503 });
    assert.equal(await fetchOpencodeQuota(connectionId, { apiKey: "opencode-key" }), null);
    invalidateOpencodeQuotaCache(connectionId);
  });

  await t.test("network error", async () => {
    const connectionId = `network-${Date.now()}`;
    globalThis.fetch = async () => {
      throw new Error("network offline");
    };
    assert.equal(await fetchOpencodeQuota(connectionId, { apiKey: "opencode-key" }), null);
    invalidateOpencodeQuotaCache(connectionId);
  });

  await t.test("invalid JSON", async () => {
    const connectionId = `invalid-json-${Date.now()}`;
    globalThis.fetch = async () =>
      new Response("<html>not json</html>", {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    assert.equal(await fetchOpencodeQuota(connectionId, { apiKey: "opencode-key" }), null);
    invalidateOpencodeQuotaCache(connectionId);
  });
});

test("fetchOpencodeQuota rejects malformed official usage windows", async (t) => {
  const malformedBodies: Array<{ name: string; usage: unknown }> = [
    {
      name: "unknown status",
      usage: {
        ...healthyUsage(),
        rolling: {
          status: "paused",
          percent: 25,
          resetsAt: RESET_ROLLING,
        },
      },
    },
    {
      name: "out-of-range percent",
      usage: {
        ...healthyUsage(),
        weekly: { status: "ok", percent: 101, resetsAt: RESET_WEEKLY },
      },
    },
    {
      name: "invalid reset timestamp",
      usage: {
        ...healthyUsage(),
        monthly: { status: "ok", percent: 10, resetsAt: "not-a-date" },
      },
    },
  ];

  for (const malformed of malformedBodies) {
    await t.test(malformed.name, async () => {
      const connectionId = `malformed-${malformed.name}-${Date.now()}`;
      globalThis.fetch = async () => jsonResponse(malformed.usage);
      assert.equal(await fetchOpencodeQuota(connectionId, { apiKey: "opencode-key" }), null);
      invalidateOpencodeQuotaCache(connectionId);
    });
  }
});

test("fetchOpencodeQuota caches for 60 seconds but not across API key changes", async () => {
  const connectionId = `cache-${Date.now()}`;
  const originalNow = Date.now;
  let now = originalNow();
  let calls = 0;
  const authorizations: Array<string | null> = [];
  Date.now = () => now;
  globalThis.fetch = async (input, init) => {
    calls += 1;
    authorizations.push(new Request(input, init).headers.get("Authorization"));
    const usage = healthyUsage();
    usage.weekly.percent = calls === 1 ? 50 : calls === 2 ? 75 : 80;
    return jsonResponse(usage);
  };

  try {
    const first = await fetchOpencodeQuota(connectionId, { apiKey: "first-key" });
    now += 59_999;
    const cached = await fetchOpencodeQuota(connectionId, { apiKey: "first-key" });
    assert.equal(calls, 1);
    assert.deepEqual(cached, first);

    const changedKey = await fetchOpencodeQuota(connectionId, { apiKey: "second-key" });
    assert.ok(changedKey);
    assert.equal(calls, 2);
    assert.equal(changedKey.percentUsed, 0.75);
    assert.deepEqual(authorizations, ["Bearer first-key", "Bearer second-key"]);

    now += 59_999;
    const secondKeyCached = await fetchOpencodeQuota(connectionId, { apiKey: "second-key" });
    assert.equal(calls, 2);
    assert.deepEqual(secondKeyCached, changedKey);

    now += 1;
    const refreshed = await fetchOpencodeQuota(connectionId, { apiKey: "second-key" });
    assert.ok(refreshed);
    assert.equal(calls, 3);
    assert.equal(refreshed.percentUsed, 0.8);
  } finally {
    Date.now = originalNow;
    invalidateOpencodeQuotaCache(connectionId);
  }
});

test("registerOpencodeQuotaFetcher registers every OpenCode provider and quota window", () => {
  registerOpencodeQuotaFetcher();

  for (const provider of ["opencode-go", "opencode", "opencode-zen"]) {
    assert.equal(getQuotaFetcher(provider), fetchOpencodeQuota);
    assert.deepEqual(getQuotaWindows(provider), ["window_5h", "window_weekly", "window_monthly"]);
  }
});

test("registerOpencodeQuotaFetcher keeps OpenCode Go quota monitoring available", () => {
  const sessionId = `session-${Date.now()}`;
  const connectionId = `monitor-${Date.now()}`;
  registerOpencodeQuotaFetcher();
  touchSession(sessionId, connectionId);

  startQuotaMonitor(sessionId, "opencode-go", connectionId, {
    apiKey: "opencode-key",
    providerSpecificData: { quotaMonitorEnabled: true },
  });
  assert.equal(getActiveMonitorCount(), 1);

  stopQuotaMonitor(sessionId);
  assert.equal(getActiveMonitorCount(), 0);
});
