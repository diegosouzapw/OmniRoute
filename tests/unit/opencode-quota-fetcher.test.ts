import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchOpencodeQuota,
  invalidateOpencodeQuotaCache,
  registerOpencodeQuotaFetcher,
} from "../../open-sse/services/opencodeQuotaFetcher.ts";
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

// ─── null / missing credentials ──────────────────────────────────────────────

test("fetchOpencodeQuota returns null when no API key is provided", async () => {
  const quota = await fetchOpencodeQuota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchOpencodeQuota returns null when connection has empty apiKey", async () => {
  const quota = await fetchOpencodeQuota(`empty-key-${Date.now()}`, { apiKey: "" });
  assert.equal(quota, null);
});

// ─── non-200 responses (fail-open) ───────────────────────────────────────────

test("fetchOpencodeQuota returns null on 404 response", async () => {
  const connectionId = `oc-404-${Date.now()}`;

  globalThis.fetch = async () => new Response(null, { status: 404 });

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });
  assert.equal(quota, null);

  invalidateOpencodeQuotaCache(connectionId);
});

test("fetchOpencodeQuota returns null on 401 (invalid token)", async () => {
  const connectionId = `oc-401-${Date.now()}`;

  globalThis.fetch = async () => new Response(null, { status: 401 });

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "bad-key" });
  assert.equal(quota, null);
});

test("fetchOpencodeQuota returns null on 403 (forbidden)", async () => {
  const connectionId = `oc-403-${Date.now()}`;

  globalThis.fetch = async () => new Response(null, { status: 403 });

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "bad-key" });
  assert.equal(quota, null);
});

test("fetchOpencodeQuota returns null on 500 server error", async () => {
  const connectionId = `oc-500-${Date.now()}`;

  globalThis.fetch = async () => new Response(null, { status: 500 });

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });
  assert.equal(quota, null);

  invalidateOpencodeQuotaCache(connectionId);
});

test("fetchOpencodeQuota returns null on network error (fail-open)", async () => {
  const connectionId = `oc-net-${Date.now()}`;

  globalThis.fetch = async () => {
    throw new Error("Network error");
  };

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });
  assert.equal(quota, null);
});

test("fetchOpencodeQuota returns null on timeout (fail-open)", async () => {
  const connectionId = `oc-timeout-${Date.now()}`;

  globalThis.fetch = async () => {
    await new Promise<never>((_, reject) => setTimeout(reject, 100));
    throw new Error("Timeout");
  };

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });
  assert.equal(quota, null);
});

// ─── 3-window parsing ($12/5h, $30/wk, $60/mo) ───────────────────────────────

test("fetchOpencodeQuota parses three-window quota response", async () => {
  const connectionId = `oc-three-${Date.now()}`;
  const calls: { url: string; init: RequestInit }[] = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: url as string, init: init as RequestInit });
    return new Response(
      JSON.stringify({
        quota: {
          window_5h: { used: 4.0, limit: 12.0, reset_at: null },
          window_weekly: { used: 15.0, limit: 30.0, reset_at: null },
          window_monthly: { used: 20.0, limit: 60.0, reset_at: null },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });

  assert.equal(calls.length, 1);
  assert.ok(
    (calls[0].init as Record<string, unknown>)?.headers &&
      ((calls[0].init as Record<string, unknown>).headers as Record<string, unknown>)[
        "Authorization"
      ] === "Bearer test-key",
    "should send Bearer auth"
  );

  assert.ok(quota !== null, "should return a quota object");
  assert.ok(quota!.windows, "should have windows map");

  // window_5h: 4/12 = 33.3%
  assert.ok(
    Math.abs((quota!.windows!["window_5h"].percentUsed as number) - 4 / 12) < 0.001,
    "window_5h percentUsed should be ~0.333"
  );
  // window_weekly: 15/30 = 50%
  assert.ok(
    Math.abs((quota!.windows!["window_weekly"].percentUsed as number) - 0.5) < 0.001,
    "window_weekly percentUsed should be 0.5"
  );
  // window_monthly: 20/60 = 33.3%
  assert.ok(
    Math.abs((quota!.windows!["window_monthly"].percentUsed as number) - 20 / 60) < 0.001,
    "window_monthly percentUsed should be ~0.333"
  );

  // Worst-case: weekly at 50%
  assert.ok(
    Math.abs(quota!.percentUsed - 0.5) < 0.001,
    "overall percentUsed should mirror worst window"
  );

  invalidateOpencodeQuotaCache(connectionId);
});

test("fetchOpencodeQuota parses reset_at timestamps in windows", async () => {
  const connectionId = `oc-reset-${Date.now()}`;
  const futureTs = Math.floor((Date.now() + 3_600_000) / 1000); // +1h unix seconds

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        quota: {
          window_5h: { used: 10.0, limit: 12.0, reset_at: futureTs },
          window_weekly: { used: 28.0, limit: 30.0, reset_at: null },
          window_monthly: { used: 55.0, limit: 60.0, reset_at: null },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });

  assert.ok(quota !== null);
  // window_5h reset_at should be an ISO string
  const resetAt5h = quota!.windows?.["window_5h"]?.resetAt;
  assert.ok(typeof resetAt5h === "string", "window_5h resetAt should be an ISO string");
  assert.ok(new Date(resetAt5h as string).getTime() > Date.now(), "resetAt should be in the future");

  invalidateOpencodeQuotaCache(connectionId);
});

test("fetchOpencodeQuota sets limitReached when any window is exhausted", async () => {
  const connectionId = `oc-exhausted-${Date.now()}`;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        quota: {
          window_5h: { used: 12.0, limit: 12.0, reset_at: null },
          window_weekly: { used: 5.0, limit: 30.0, reset_at: null },
          window_monthly: { used: 10.0, limit: 60.0, reset_at: null },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });

  assert.ok(quota !== null);
  // window_5h is 100% used → worst-case
  assert.ok(Math.abs(quota!.percentUsed - 1.0) < 0.001, "percentUsed should be 1.0 when exhausted");
  assert.equal((quota as any).limitReached, true, "limitReached should be true");

  invalidateOpencodeQuotaCache(connectionId);
});

test("fetchOpencodeQuota returns null when quota object is absent from response", async () => {
  const connectionId = `oc-no-quota-${Date.now()}`;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ message: "ok" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  const quota = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });
  assert.equal(quota, null);

  invalidateOpencodeQuotaCache(connectionId);
});

// ─── caching ─────────────────────────────────────────────────────────────────

test("fetchOpencodeQuota caches results within TTL (second call is a no-op)", async () => {
  const connectionId = `oc-cache-${Date.now()}`;
  let calls = 0;

  globalThis.fetch = async () => {
    calls++;
    return new Response(
      JSON.stringify({
        quota: {
          window_5h: { used: 2.0, limit: 12.0, reset_at: null },
          window_weekly: { used: 10.0, limit: 30.0, reset_at: null },
          window_monthly: { used: 20.0, limit: 60.0, reset_at: null },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const first = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });
  const second = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });

  assert.equal(calls, 1, "should only hit the network once");
  assert.deepEqual(first, second, "cached result should be identical");

  invalidateOpencodeQuotaCache(connectionId);

  const third = await fetchOpencodeQuota(connectionId, { apiKey: "test-key" });
  assert.equal(calls, 2, "should re-fetch after cache invalidation");
  assert.ok(third !== null);

  invalidateOpencodeQuotaCache(connectionId);
});

// ─── registration + preflight integration ────────────────────────────────────

test("registerOpencodeQuotaFetcher exposes opencode-go quota to preflight system", async () => {
  const connectionId = `oc-preflight-${Date.now()}`;

  registerOpencodeQuotaFetcher();

  // Fully exhausted 5h window — preflight should block
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        quota: {
          window_5h: { used: 12.0, limit: 12.0, reset_at: null },
          window_weekly: { used: 5.0, limit: 30.0, reset_at: null },
          window_monthly: { used: 10.0, limit: 60.0, reset_at: null },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const preflight = await preflightQuota("opencode-go", connectionId, {
    apiKey: "test-key",
    providerSpecificData: { quotaPreflightEnabled: true },
  });

  assert.equal(preflight.proceed, false, "preflight should block when window is exhausted");
  assert.equal(preflight.reason, "quota_exhausted");

  invalidateOpencodeQuotaCache(connectionId);
});

test("registerOpencodeQuotaFetcher also covers opencode and opencode-zen providers", async () => {
  registerOpencodeQuotaFetcher();

  const { getQuotaFetcher } = await import("../../open-sse/services/quotaPreflight.ts");

  assert.ok(getQuotaFetcher("opencode-go"), "opencode-go should be registered");
  assert.ok(getQuotaFetcher("opencode"), "opencode should be registered");
  assert.ok(getQuotaFetcher("opencode-zen"), "opencode-zen should be registered");
});

test("registerOpencodeQuotaFetcher registers opencode-go in quotaMonitor system", async () => {
  const connectionId = `oc-monitor-${Date.now()}`;

  registerOpencodeQuotaFetcher();

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        quota: {
          window_5h: { used: 11.0, limit: 12.0, reset_at: null },
          window_weekly: { used: 29.0, limit: 30.0, reset_at: null },
          window_monthly: { used: 58.0, limit: 60.0, reset_at: null },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  touchSession("session-oc", connectionId);
  startQuotaMonitor("session-oc", "opencode-go", connectionId, {
    providerSpecificData: { quotaMonitorEnabled: true },
  });

  assert.equal(getActiveMonitorCount(), 1);

  stopQuotaMonitor("session-oc");
  assert.equal(getActiveMonitorCount(), 0);

  invalidateOpencodeQuotaCache(connectionId);
});
