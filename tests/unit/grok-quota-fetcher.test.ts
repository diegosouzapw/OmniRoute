import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  fetchGrokWebQuota,
  invalidateGrokWebQuotaCache,
  registerGrokWebQuotaFetcher,
} from "../../open-sse/services/grokQuotaFetcher.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import {
  clearQuotaMonitors,
  getActiveMonitorCount,
  startQuotaMonitor,
  stopQuotaMonitor,
} from "../../open-sse/services/quotaMonitor.ts";
import { clearSessions, touchSession } from "../../open-sse/services/sessionManager.ts";

const originalFetch = globalThis.fetch;
const originalAuthPath = process.env.GROK_AUTH_PATH;

/** Create a temporary auth.json for testing. */
function createTestAuth(
  overrides: Partial<{
    key: string;
    refresh_token: string;
    expires_at: string;
    email: string;
    oidc_issuer: string;
    oidc_client_id: string;
  }> = {},
): string {
  const dir = mkdtempSync(join(tmpdir(), "grok-auth-test-"));
  const entry = {
    key: "test-access-token",
    refresh_token: "test-refresh-token",
    expires_at: new Date(Date.now() + 3600_000).toISOString(),
    email: "test@example.com",
    auth_mode: "device_code",
    oidc_issuer: "https://auth.x.ai",
    oidc_client_id: "test-client-id",
    ...overrides,
  };
  const authFile = join(dir, "auth.json");
  writeFileSync(authFile, JSON.stringify({ "test-entry": entry }, null, 2) + "\n");
  return authFile;
}

function cleanupTestAuth(authPath: string): void {
  try {
    rmSync(authPath, { force: true });
    rmSync(join(authPath, ".."), { force: true });
  } catch {
    // best effort cleanup
  }
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalAuthPath !== undefined) {
    process.env.GROK_AUTH_PATH = originalAuthPath;
  } else {
    delete process.env.GROK_AUTH_PATH;
  }
  clearQuotaMonitors();
  clearSessions();
});

test("fetchGrokWebQuota returns null when no auth.json exists", async () => {
  // Point to a nonexistent path
  process.env.GROK_AUTH_PATH = "/nonexistent/grok/auth.json";
  const quota = await fetchGrokWebQuota(`missing-auth-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchGrokWebQuota reads auth and calls billing endpoint", async () => {
  const authFile = createTestAuth();
  process.env.GROK_AUTH_PATH = authFile;

  const connectionId = `grok-test-${Date.now()}`;
  const calls: Array<{ url: string; init: RequestInit }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: typeof url === "string" ? url : "stringified", init });
    const urlStr = typeof url === "string" ? url : "";
    // OIDC discovery
    if (urlStr.includes(".well-known/openid-configuration")) {
      return new Response(
        JSON.stringify({ token_endpoint: "https://auth.x.ai/oauth2/token" }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }
    // Billing endpoint
    if (urlStr.includes("billing")) {
      return new Response(
        JSON.stringify({
          config: {
            creditUsagePercent: 15.3,
            currentPeriod: {
              type: "WEEKLY",
              start: "2026-07-17T06:34:33.775Z",
              end: "2026-07-24T06:34:33.775Z",
            },
            productUsage: [
              { product: "Api", usagePercent: 15 },
              { product: "GrokBuild", usagePercent: 0 },
            ],
            onDemandCap: { val: 0 },
            onDemandUsed: { val: 0 },
            prepaidBalance: { val: 0 },
            isUnifiedBillingUser: true,
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }
    return new Response("not found", { status: 404 });
  };

  const quota = await fetchGrokWebQuota(connectionId);

  assert.notEqual(quota, null, "expected non-null quota");
  assert.equal(quota.percentUsed, 0.153, "15.3% → 0.153");
  assert.equal(quota.used, 15, "used = 15");
  assert.equal(quota.total, 100, "total = 100");
  assert.ok(quota.resetAt?.includes("2026-07-24"), "resetAt matches period end");
  assert.ok(quota.windows?.weekly, "weekly window present");
  assert.equal(quota.windows.weekly.percentUsed, 0.153);

  // Verify the billing call had proper headers
  const billingCall = calls.find((c) => (c.url as string).includes("billing"));
  assert.ok(billingCall, "billing call made");
  const headers = billingCall.init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer test-access-token");
  assert.equal(headers["x-grok-client-mode"], "cli");

  invalidateGrokWebQuotaCache(connectionId);
  cleanupTestAuth(authFile);
});

test("fetchGrokWebQuota refreshes token on 401 and retries", async () => {
  const authFile = createTestAuth();
  process.env.GROK_AUTH_PATH = authFile;

  const connectionId = `grok-refresh-${Date.now()}`;
  let callCount = 0;
  let tokenRefreshCount = 0;

  globalThis.fetch = async (url, init) => {
    const urlStr = typeof url === "string" ? url : "";

    // OIDC discovery
    if (urlStr.includes(".well-known/openid-configuration")) {
      return new Response(
        JSON.stringify({ token_endpoint: "https://auth.x.ai/oauth2/token" }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }

    // Token refresh
    if (urlStr.includes("oauth2/token")) {
      tokenRefreshCount++;
      return new Response(
        JSON.stringify({
          access_token: "refreshed-access-token",
          refresh_token: "new-refresh-token",
          expires_in: 3600,
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }

    // Billing: first call returns 401 (triggers refresh), second call succeeds
    if (urlStr.includes("billing")) {
      callCount++;
      if (callCount === 1) {
        return new Response("Unauthorized", { status: 401 });
      }
      return new Response(
        JSON.stringify({
          config: {
            creditUsagePercent: 42,
            currentPeriod: {
              type: "WEEKLY",
              end: new Date(Date.now() + 7 * 24 * 3600_000).toISOString(),
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }

    return new Response("not found", { status: 404 });
  };

  const quota = await fetchGrokWebQuota(connectionId);

  assert.notEqual(quota, null, "expected quota after refresh");
  assert.equal(quota.percentUsed, 0.42, "42% after refresh");
  assert.equal(tokenRefreshCount, 1, "token was refreshed once");
  assert.equal(callCount, 2, "billing called twice (first fails, second succeeds)");

  invalidateGrokWebQuotaCache(connectionId);
  cleanupTestAuth(authFile);
});

test("fetchGrokWebQuota caches results for 60s", async () => {
  const authFile = createTestAuth();
  process.env.GROK_AUTH_PATH = authFile;

  const connectionId = `grok-cache-${Date.now()}`;
  let fetchCount = 0;

  globalThis.fetch = async (url, init) => {
    const urlStr = typeof url === "string" ? url : "";
    if (urlStr.includes("billing")) {
      fetchCount++;
      return new Response(
        JSON.stringify({
          config: {
            creditUsagePercent: 30,
            currentPeriod: { type: "WEEKLY", end: new Date(Date.now() + 7 * 24 * 3600_000).toISOString() },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }
    if (urlStr.includes(".well-known")) {
      return new Response(
        JSON.stringify({ token_endpoint: "https://auth.x.ai/oauth2/token" }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }
    return new Response("not found", { status: 404 });
  };

  // First call — should fetch
  const q1 = await fetchGrokWebQuota(connectionId);
  assert.equal(fetchCount, 1, "first call hits API");

  // Second call — should use cache
  const q2 = await fetchGrokWebQuota(connectionId);
  assert.equal(fetchCount, 1, "second call uses cache");
  assert.equal(q1.percentUsed, q2.percentUsed);

  invalidateGrokWebQuotaCache(connectionId);
  cleanupTestAuth(authFile);
});

test("registerGrokWebQuotaFetcher registers the fetcher for grok-web", async () => {
  registerGrokWebQuotaFetcher();

  // preflightQuota should find the registered fetcher and call it
  // Point auth to a test file so it returns something
  const authFile = createTestAuth();
  process.env.GROK_AUTH_PATH = authFile;

  globalThis.fetch = async (url, init) => {
    const urlStr = typeof url === "string" ? url : "";
    if (urlStr.includes(".well-known")) {
      return new Response(
        JSON.stringify({ token_endpoint: "https://auth.x.ai/oauth2/token" }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }
    if (urlStr.includes("billing")) {
      return new Response(
        JSON.stringify({
          config: {
            creditUsagePercent: 50,
            currentPeriod: { type: "WEEKLY", end: new Date(Date.now() + 7 * 24 * 3600_000).toISOString() },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      );
    }
    return new Response("not found", { status: 404 });
  };

  const connectionId = `grok-reg-test-${Date.now()}`;
  const result = await preflightQuota("grok-web", connectionId, {
    provider: "grok-web",
    id: connectionId,
  });
  assert.equal(result.proceed, true, "preflight should proceed with headroom");

  cleanupTestAuth(authFile);
});
