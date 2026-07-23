/**
 * tests/unit/quota-saturation-anthropic-oauth.test.ts
 *
 * #1 — Real plan-window saturation for Claude/Anthropic fair-share.
 *
 * Before this change, the anthropic/claude branch of getSaturation only read
 * the per-minute REQUEST rate-limit headers (anthropic-ratelimit-requests-*),
 * which do NOT reflect the Claude Pro/Max 5h / weekly plan window. fairShare
 * was therefore nearly blind for Claude.
 *
 * This suite asserts the branch now uses the REAL plan utilization that
 * usage.ts already fetches from GET /api/oauth/usage (five_hour.utilization /
 * seven_day.utilization), window-aware:
 *   - dim.window "5h"     → five_hour.utilization  / 100
 *   - dim.window "weekly" → seven_day.utilization  / 100
 *
 * The oauth/usage path and the DB connection lookup are injected (deps seam)
 * so the test never touches the network or the DB. The 30s saturation cache is
 * cleared between asserts via _clearSaturationCache().
 */

import test from "node:test";
import assert from "node:assert/strict";

const satMod = await import("../../src/lib/quota/saturationSignals.ts");
const { getSaturation, _clearSaturationCache, __setAnthropicSaturationDepsForTests } = satMod;

// usage.ts shape: getClaudeUsage maps five_hour.utilization → quotas["session (5h)"].used
// and seven_day.utilization → quotas["weekly (7d)"].used (used = % used, 0..100).
function claudeUsageStub(fiveHourUtil: number, sevenDayUtil: number) {
  return {
    plan: "Claude Pro",
    quotas: {
      "session (5h)": {
        used: fiveHourUtil,
        total: 100,
        remaining: Math.max(0, 100 - fiveHourUtil),
        remainingPercentage: Math.max(0, 100 - fiveHourUtil),
        resetAt: null,
        unlimited: false,
      },
      "weekly (7d)": {
        used: sevenDayUtil,
        total: 100,
        remaining: Math.max(0, 100 - sevenDayUtil),
        remainingPercentage: Math.max(0, 100 - sevenDayUtil),
        resetAt: null,
        unlimited: false,
      },
    },
    extraUsage: null,
    bootstrap: null,
  };
}

const OAUTH_CONN = {
  id: "claude-conn-1",
  provider: "claude",
  authType: "oauth",
  accessToken: "fake-oauth-token",
};

test.afterEach(() => {
  // Restore real deps and clear cache so suites stay isolated.
  __setAnthropicSaturationDepsForTests(null);
  _clearSaturationCache();
});

// ─── Core: 5h window uses five_hour.utilization ──────────────────────────────

test("getSaturation(claude, 5h) → five_hour.utilization/100 (80% → 0.8)", async () => {
  _clearSaturationCache();
  __setAnthropicSaturationDepsForTests({
    loadConnection: async () => ({ ...OAUTH_CONN }),
    fetchUsage: async () => claudeUsageStub(80, 40),
  });

  const val = await getSaturation("claude-conn-1", "claude", { unit: "percent", window: "5h" });
  assert.ok(Math.abs(val - 0.8) < 1e-9, `expected ≈0.8, got ${val}`);
});

test("getSaturation(claude, weekly) → seven_day.utilization/100 (40% → 0.4)", async () => {
  _clearSaturationCache();
  __setAnthropicSaturationDepsForTests({
    loadConnection: async () => ({ ...OAUTH_CONN }),
    fetchUsage: async () => claudeUsageStub(80, 40),
  });

  const val = await getSaturation("claude-conn-1", "claude", { unit: "percent", window: "weekly" });
  assert.ok(Math.abs(val - 0.4) < 1e-9, `expected ≈0.4, got ${val}`);
});

test('provider alias "anthropic" resolves the same plan-window utilization', async () => {
  _clearSaturationCache();
  __setAnthropicSaturationDepsForTests({
    loadConnection: async () => ({ ...OAUTH_CONN }),
    fetchUsage: async () => claudeUsageStub(95, 10),
  });

  const five = await getSaturation("claude-conn-1", "anthropic", { unit: "percent", window: "5h" });
  assert.ok(Math.abs(five - 0.95) < 1e-9, `expected ≈0.95, got ${five}`);
});

// ─── Clamp ───────────────────────────────────────────────────────────────────

test("utilization > 100 is clamped to 1", async () => {
  _clearSaturationCache();
  __setAnthropicSaturationDepsForTests({
    loadConnection: async () => ({ ...OAUTH_CONN }),
    fetchUsage: async () => claudeUsageStub(140, 0),
  });

  const val = await getSaturation("claude-conn-1", "claude", { unit: "percent", window: "5h" });
  assert.equal(val, 1);
});

// ─── Fallback: API-key Claude (no OAuth token) → header path ──────────────────

test("API-key Claude (no oauth/usage windows) falls back to rate-limit header path", async () => {
  _clearSaturationCache();
  // Seed the header cache the way the response handler would.
  satMod.storeRateLimitHeaders("apikey-conn", "anthropic", {
    "anthropic-ratelimit-requests-limit": "100",
    "anthropic-ratelimit-requests-remaining": "30",
  });
  __setAnthropicSaturationDepsForTests({
    // API-key connection → no usable oauth/usage window for plan saturation.
    loadConnection: async () => ({
      id: "apikey-conn",
      provider: "claude",
      authType: "apikey",
      apiKey: "sk-ant-xxx",
    }),
    // Legacy/admin shape: no "session (5h)" / "weekly (7d)" keys.
    fetchUsage: async () => ({ message: "Claude connected. Usage details require admin access." }),
  });

  const val = await getSaturation("apikey-conn", "claude", { unit: "percent", window: "5h" });
  // used = 100 - 30 = 70 over limit 100 → 0.7 from the header fallback.
  assert.ok(Math.abs(val - 0.7) < 1e-9, `expected header-fallback ≈0.7, got ${val}`);
});

// ─── Fail-open ────────────────────────────────────────────────────────────────

test("no connection found → fails open (0), no throw", async () => {
  _clearSaturationCache();
  __setAnthropicSaturationDepsForTests({
    loadConnection: async () => null,
    fetchUsage: async () => {
      throw new Error("must not be called when no connection");
    },
  });

  const val = await getSaturation("missing-conn", "claude", { unit: "percent", window: "5h" });
  assert.equal(val, 0);
});

test("oauth/usage fetch throws → fails open (0), no throw", async () => {
  _clearSaturationCache();
  __setAnthropicSaturationDepsForTests({
    loadConnection: async () => ({ ...OAUTH_CONN }),
    fetchUsage: async () => {
      throw new Error("429 rate limited");
    },
  });

  const val = await getSaturation("claude-conn-1", "claude", { unit: "percent", window: "5h" });
  assert.equal(val, 0);
});

// ─── Cache: don't poll per request (Rule #18) ────────────────────────────────

test("second call within 30s TTL is served from cache (fetchUsage NOT re-invoked)", async () => {
  _clearSaturationCache();
  let calls = 0;
  __setAnthropicSaturationDepsForTests({
    loadConnection: async () => ({ ...OAUTH_CONN }),
    fetchUsage: async () => {
      calls += 1;
      return claudeUsageStub(80, 40);
    },
  });

  const a = await getSaturation("claude-conn-1", "claude", { unit: "percent", window: "5h" });
  const b = await getSaturation("claude-conn-1", "claude", { unit: "percent", window: "5h" });
  assert.equal(a, b);
  assert.equal(calls, 1, "oauth/usage must be fetched once, not per request");
});
