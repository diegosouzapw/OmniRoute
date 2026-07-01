import test from "node:test";
import assert from "node:assert/strict";

import { USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { isSupportedUsageConnection } from "../../src/lib/usage/providerLimits.ts";
import {
  __clearQoderJobTokenCache,
  parseQoderJobTokenResponse,
} from "../../open-sse/services/qoderCli.ts";

const usageModule = await import("../../open-sse/services/usage.ts");
const { parseQoderUserStatusUsage } = usageModule.__testing;

// A Teams seat draws from a pooled org quota — `quota: 0` here means "pooled",
// not "exhausted", so it must render as an unlimited plan entry, not a 0-left one.
test("parseQoderUserStatusUsage maps a Teams/pooled account to an unlimited plan entry", () => {
  const { plan, quotas } = parseQoderUserStatusUsage({
    userType: "teams",
    userTag: "Teams",
    plan: "PLAN_TIER_TEAM",
    quota: 0,
    isQuotaExceeded: false,
    nextResetAt: 1784736000000,
  });

  assert.equal(plan, "Teams");
  assert.deepEqual(Object.keys(quotas), ["Plan"]);
  assert.equal(quotas.Plan.unlimited, true);
  assert.equal(quotas.Plan.remaining, 0);
  assert.match(quotas.Plan.displayName!, /Teams plan · pooled/);
  // nextResetAt (ms) must be surfaced as an ISO reset timestamp.
  assert.equal(quotas.Plan.resetAt, new Date(1784736000000).toISOString());
  // Regression: a pooled/unlimited window MUST report 100% remaining, else the
  // quota→routing conversion (which ignores `unlimited`) treats total:0 as 0%
  // and 429-blocks every request. See src/domain/quotaCache.ts.
  assert.equal(quotas.Plan.remainingPercentage, 100);
});

test("parseQoderUserStatusUsage maps an individual plan with remaining quota to a Requests entry", () => {
  const { plan, quotas } = parseQoderUserStatusUsage({
    userType: "individual",
    plan: "PLAN_TIER_PRO",
    quota: 42,
    isQuotaExceeded: false,
    nextResetAt: 1784736000000,
  });

  // No userTag → prettified from the PLAN_TIER_* enum.
  assert.equal(plan, "Pro");
  assert.deepEqual(Object.keys(quotas), ["Requests"]);
  assert.equal(quotas.Requests.remaining, 42);
  assert.equal(quotas.Requests.total, 42);
  assert.equal(quotas.Requests.unlimited, false);
});

test("parseQoderUserStatusUsage flags an exceeded quota", () => {
  const { quotas } = parseQoderUserStatusUsage({
    userType: "individual",
    plan: "PLAN_TIER_FREE",
    quota: 100,
    isQuotaExceeded: true,
    nextResetAt: 1784736000000,
  });

  assert.deepEqual(Object.keys(quotas), ["Quota"]);
  assert.equal(quotas.Quota.remaining, 0);
  assert.equal(quotas.Quota.unlimited, false);
  assert.match(quotas.Quota.displayName!, /exceeded/i);
});

test("getUsageForProvider (qoder) exchanges the PAT then reads /user/status", async () => {
  __clearQoderJobTokenCache();
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];

  // @ts-ignore — test stub
  globalThis.fetch = async (url: string, init?: Record<string, unknown>) => {
    const u = String(url);
    calls.push(u);
    if (u.includes("/jobToken/exchange")) {
      assert.deepEqual(JSON.parse(String(init?.body ?? "{}")), {
        personal_token: "pt-usage-token",
      });
      return new Response(JSON.stringify({ token: "jt-usage", expires_in: 86400 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    // /api/v3/user/status — assert the jt-* is carried, return a Teams payload.
    assert.match(u, /openapi\.qoder\.sh\/api\/v3\/user\/status/);
    assert.equal(
      String((init?.headers as Record<string, string>)?.Authorization),
      "Bearer jt-usage"
    );
    return new Response(
      JSON.stringify({
        userType: "teams",
        userTag: "Teams",
        plan: "PLAN_TIER_TEAM",
        quota: 0,
        isQuotaExceeded: false,
        nextResetAt: 1784736000000,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    const result = (await usageModule.getUsageForProvider({
      provider: "qoder",
      apiKey: "pt-usage-token",
    })) as { plan?: string; quotas?: Record<string, unknown> };

    assert.equal(result.plan, "Teams");
    assert.ok(result.quotas && Object.keys(result.quotas).length > 0);
    // The exchange must precede the usage call.
    const exchangeIdx = calls.findIndex((c) => c.includes("/jobToken/exchange"));
    const statusIdx = calls.findIndex((c) => c.includes("/user/status"));
    assert.ok(exchangeIdx >= 0 && statusIdx > exchangeIdx);
  } finally {
    globalThis.fetch = originalFetch;
    __clearQoderJobTokenCache();
  }
});

test("getUsageForProvider (qoder) without a token returns a friendly message", async () => {
  const result = (await usageModule.getUsageForProvider({ provider: "qoder" })) as {
    message?: string;
  };
  assert.match(result.message ?? "", /Personal Access Token/i);
});

test("qoder is registered for both the usage fetcher and the quota widget whitelist", () => {
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("qoder"));
  assert.ok(usageModule.USAGE_FETCHER_PROVIDERS.includes("qoder"));
});

// A PAT connection is authType "apikey"; the provider-limits sync only picks up
// apikey connections whose provider is explicitly allow-listed — guard that qoder
// is, so the quota widget actually refreshes it (regression for the sync gate).
test("a qoder PAT (apikey) connection is picked up by the provider-limits sync", () => {
  assert.equal(
    isSupportedUsageConnection({ id: "c1", provider: "qoder", authType: "apikey" }),
    true
  );
  // Sanity: an unrelated apikey provider not on the list is excluded.
  assert.equal(
    isSupportedUsageConnection({ id: "c2", provider: "some-random-provider", authType: "apikey" }),
    false
  );
});

// Guards the shared exchange contract the usage path relies on.
test("parseQoderJobTokenResponse reads the exchange token field", () => {
  const parsed = parseQoderJobTokenResponse({ token: "jt-abc", expires_in: 86400 });
  assert.equal(parsed?.jobToken, "jt-abc");
});
