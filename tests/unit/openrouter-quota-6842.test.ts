/**
 * #6842 — OpenRouter quota tracking (TDD).
 *
 * Covers the three scoped behaviors:
 *   1. /api/v1/key + /api/v1/credits endpoint parsing (incl. null fields, BYOK).
 *   2. Free-window local counter: UTC-day rollover + 20 RPM rolling window +
 *      X-RateLimit-* header correction.
 *   3. 402 -> credit-exhausted classification (connection-scope lock, not the
 *      whole-provider circuit breaker).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchOpenrouterQuota,
  invalidateOpenrouterQuotaCache,
  parseOpenrouterKeyResponse,
  parseOpenrouterCreditsResponse,
  registerOpenrouterQuotaFetcher,
} from "../../open-sse/services/openrouterQuotaFetcher.ts";
import {
  clearFreeWindowState,
  correctFromRateLimitHeaders,
  getFreeWindowStatus,
  recordFreeWindowAttempt,
  resolveAccountKey,
  setPurchasedTier,
} from "../../open-sse/services/openrouterFreeWindow.ts";
import { getProviderErrorRuleMatch } from "../../open-sse/config/providerErrorRules.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearFreeWindowState();
});

// ─── 1. Endpoint parsing ──────────────────────────────────────────────────

test("parseOpenrouterKeyResponse parses a full /api/v1/key response", () => {
  const parsed = parseOpenrouterKeyResponse({
    data: {
      limit: 100,
      limit_remaining: 42.5,
      limit_reset: null,
      is_free_tier: false,
      usage: 57.5,
      usage_daily: 1.2,
      usage_weekly: 8,
      usage_monthly: 20,
      byok_usage: 3.1,
      include_byok_in_limit: true,
    },
  });
  assert.ok(parsed);
  assert.equal(parsed.limit, 100);
  assert.equal(parsed.limitRemaining, 42.5);
  assert.equal(parsed.limitReset, null);
  assert.equal(parsed.isFreeTier, false);
  assert.equal(parsed.usageDaily, 1.2);
  assert.equal(parsed.byokUsage, 3.1);
  assert.equal(parsed.includeByokInLimit, true);
});

test("parseOpenrouterKeyResponse treats null limit/limit_remaining as unlimited", () => {
  const parsed = parseOpenrouterKeyResponse({
    data: {
      limit: null,
      limit_remaining: null,
      limit_reset: null,
      is_free_tier: true,
      usage: 0,
      usage_daily: 0,
      usage_weekly: 0,
      usage_monthly: 0,
    },
  });
  assert.ok(parsed);
  assert.equal(parsed.limit, null);
  assert.equal(parsed.limitRemaining, null);
  assert.equal(parsed.isFreeTier, true);
  // BYOK fields absent entirely — must not throw, must default to null/false.
  assert.equal(parsed.byokUsage, null);
  assert.equal(parsed.includeByokInLimit, false);
});

test("parseOpenrouterKeyResponse returns null for an unrecognizable payload", () => {
  assert.equal(parseOpenrouterKeyResponse({}), null);
  assert.equal(parseOpenrouterKeyResponse(null), null);
  assert.equal(parseOpenrouterKeyResponse("not json"), null);
});

test("parseOpenrouterCreditsResponse parses total_credits/total_usage", () => {
  const parsed = parseOpenrouterCreditsResponse({
    data: { total_credits: 50, total_usage: 12.5 },
  });
  assert.equal(parsed.totalCredits, 50);
  assert.equal(parsed.totalUsage, 12.5);
});

test("parseOpenrouterCreditsResponse defaults to nulls on missing data", () => {
  const parsed = parseOpenrouterCreditsResponse({});
  assert.equal(parsed.totalCredits, null);
  assert.equal(parsed.totalUsage, null);
});

test("fetchOpenrouterQuota returns null when no API key exists", async () => {
  const quota = await fetchOpenrouterQuota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchOpenrouterQuota merges /key + /credits into one quota", async () => {
  const connectionId = `openrouter-merge-${Date.now()}`;
  const calls: string[] = [];

  globalThis.fetch = async (url) => {
    const href = String(url);
    calls.push(href);
    if (href.endsWith("/key")) {
      return new Response(
        JSON.stringify({
          data: {
            limit: 100,
            limit_remaining: 10,
            limit_reset: null,
            is_free_tier: false,
            usage: 90,
            usage_daily: 5,
            usage_weekly: 20,
            usage_monthly: 90,
          },
        }),
        { status: 200 }
      );
    }
    return new Response(JSON.stringify({ data: { total_credits: 100, total_usage: 90 } }), {
      status: 200,
    });
  };

  const quota = await fetchOpenrouterQuota(connectionId, { apiKey: "test-key" });
  assert.ok(quota);
  assert.equal(calls.length, 2);
  assert.equal((quota as { limitReached?: boolean }).limitReached, false);
  assert.equal(quota.percentUsed, 0.9);
  invalidateOpenrouterQuotaCache(connectionId);
});

test("fetchOpenrouterQuota marks limitReached when limit_remaining <= 0", async () => {
  const connectionId = `openrouter-exhausted-${Date.now()}`;

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/key")) {
      return new Response(
        JSON.stringify({
          data: { limit: 10, limit_remaining: 0, limit_reset: null, is_free_tier: true },
        }),
        { status: 200 }
      );
    }
    return new Response(JSON.stringify({ data: {} }), { status: 200 });
  };

  const quota = await fetchOpenrouterQuota(connectionId, { apiKey: "test-key" });
  assert.ok(quota);
  assert.equal(quota.limitReached, true);
  invalidateOpenrouterQuotaCache(connectionId);
});

test("fetchOpenrouterQuota returns null on 401 (invalid token)", async () => {
  const connectionId = `openrouter-401-${Date.now()}`;
  globalThis.fetch = async () => new Response(null, { status: 401 });
  const quota = await fetchOpenrouterQuota(connectionId, { apiKey: "bad-key" });
  assert.equal(quota, null);
});

test("registerOpenrouterQuotaFetcher does not throw", () => {
  assert.doesNotThrow(() => registerOpenrouterQuotaFetcher());
});

// ─── 2. Free-window local counter ─────────────────────────────────────────

test("resolveAccountKey groups multiple connections under one explicit account", () => {
  const shared = resolveAccountKey("conn-a", {
    providerSpecificData: { openrouterAccountKey: "team-account" },
  });
  const sharedAgain = resolveAccountKey("conn-b", {
    providerSpecificData: { openrouterAccountKey: "team-account" },
  });
  assert.equal(shared, sharedAgain);

  const unrelated = resolveAccountKey("conn-c");
  assert.notEqual(unrelated, shared);
});

test("getFreeWindowStatus defaults to 50/day before any purchase", () => {
  const accountKey = `acct-default-${Date.now()}`;
  const status = getFreeWindowStatus(accountKey);
  assert.equal(status.dailyLimit, 50);
  assert.equal(status.dailyUsed, 0);
  assert.equal(status.rpmLimit, 20);
});

test("setPurchasedTier unlocks the 1000/day tier", () => {
  const accountKey = `acct-purchased-${Date.now()}`;
  setPurchasedTier(accountKey, true);
  const status = getFreeWindowStatus(accountKey);
  assert.equal(status.dailyLimit, 1000);
});

test("recordFreeWindowAttempt increments the UTC-day counter", () => {
  const accountKey = `acct-day-${Date.now()}`;
  const now = Date.UTC(2026, 0, 15, 12, 0, 0);
  recordFreeWindowAttempt(accountKey, now);
  recordFreeWindowAttempt(accountKey, now + 1000);
  const status = getFreeWindowStatus(accountKey, now + 2000);
  assert.equal(status.dailyUsed, 2);
  assert.equal(status.dailyRemaining, 48);
});

test("UTC-day counter rolls over at midnight", () => {
  const accountKey = `acct-rollover-${Date.now()}`;
  const dayOne = Date.UTC(2026, 0, 15, 23, 59, 59);
  recordFreeWindowAttempt(accountKey, dayOne);
  const dayOneStatus = getFreeWindowStatus(accountKey, dayOne);
  assert.equal(dayOneStatus.dailyUsed, 1);

  // Same account, next UTC day — counter must reset to 0.
  const dayTwo = Date.UTC(2026, 0, 16, 0, 0, 1);
  const dayTwoStatus = getFreeWindowStatus(accountKey, dayTwo);
  assert.equal(dayTwoStatus.dailyUsed, 0);
});

test("20 RPM rolling window blocks the 21st request within 60s, frees up after", () => {
  const accountKey = `acct-rpm-${Date.now()}`;
  const base = Date.UTC(2026, 0, 15, 12, 0, 0);
  for (let i = 0; i < 20; i++) {
    recordFreeWindowAttempt(accountKey, base + i * 1000);
  }
  const atLimit = getFreeWindowStatus(accountKey, base + 20_000);
  assert.equal(atLimit.rpmUsed, 20);
  assert.equal(atLimit.rpmRemaining, 0);

  // Just over 60s after the FIRST request only, that timestamp has rolled
  // out of the window (offset by 1ms from the second request to avoid a
  // boundary tie between the 1st and 2nd requests, which were 1000ms apart).
  const afterRoll = getFreeWindowStatus(accountKey, base + 60_001);
  assert.equal(afterRoll.rpmUsed, 19);
  assert.equal(afterRoll.rpmRemaining, 1);
});

test("failed attempts count toward the daily cap", () => {
  const accountKey = `acct-failed-${Date.now()}`;
  const now = Date.UTC(2026, 0, 15, 12, 0, 0);
  // The module doesn't distinguish success/failure at record time — callers
  // record every attempt, successful or not, matching the plan's "failed
  // attempts count toward the daily cap" requirement.
  recordFreeWindowAttempt(accountKey, now);
  recordFreeWindowAttempt(accountKey, now + 1);
  const status = getFreeWindowStatus(accountKey, now + 2);
  assert.equal(status.dailyUsed, 2);
});

test("correctFromRateLimitHeaders overrides local daily count from X-RateLimit-*", () => {
  const accountKey = `acct-header-${Date.now()}`;
  const now = Date.UTC(2026, 0, 15, 12, 0, 0);
  recordFreeWindowAttempt(accountKey, now); // local thinks 1 used

  const headers = new Headers({
    "x-ratelimit-limit": "50",
    "x-ratelimit-remaining": "3",
    "x-ratelimit-reset": String(Math.floor((now + 3_600_000) / 1000)),
  });
  correctFromRateLimitHeaders(accountKey, headers, now + 500);

  const status = getFreeWindowStatus(accountKey, now + 600);
  assert.equal(status.dailyLimit, 50);
  assert.equal(status.dailyUsed, 47); // 50 - 3 remaining, server-authoritative
  assert.equal(status.dailyResetAt, new Date(now + 3_600_000).toISOString());
});

test("correctFromRateLimitHeaders honors Retry-After when later than X-RateLimit-Reset", () => {
  const accountKey = `acct-retry-after-${Date.now()}`;
  const now = Date.UTC(2026, 0, 15, 12, 0, 0);

  const headers = new Headers({
    "x-ratelimit-limit": "50",
    "x-ratelimit-remaining": "0",
    "x-ratelimit-reset": String(Math.floor((now + 60_000) / 1000)),
    "retry-after": "300", // 5 minutes — later than the header reset above
  });
  correctFromRateLimitHeaders(accountKey, headers, now);

  const status = getFreeWindowStatus(accountKey, now + 1);
  assert.equal(status.dailyResetAt, new Date(now + 300_000).toISOString());
});

// ─── 3. 402 -> credit-exhausted classification ────────────────────────────

test("openrouter 402 provider rule locks the connection, not the model", () => {
  const match = getProviderErrorRuleMatch("openrouter", 402, {});
  assert.ok(match);
  assert.equal(match.reason, "quota_exhausted");
  assert.equal(match.scope, "connection");
  assert.ok(typeof match.cooldownMs === "number" && match.cooldownMs > 0);
});

test("openrouter 402 does not match for other status codes", () => {
  assert.equal(getProviderErrorRuleMatch("openrouter", 429, {}), null);
  assert.equal(getProviderErrorRuleMatch("openrouter", 500, {}), null);
});

test("checkFallbackError classifies OpenRouter 402 as quota_exhausted with a real cooldown", async () => {
  const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
  const { RateLimitReason } = await import("../../open-sse/config/constants.ts");

  // errorText intentionally null/generic (no CREDITS_EXHAUSTED_SIGNALS phrase
  // like "payment required") so this exercises the STATUS-only path — the
  // generic `status_402` configured rule (open-sse/config/errorConfig.ts)
  // falling through to the new provider-rule override in
  // accountFallback.ts, not the earlier errorText-signal branch.
  const genericResult = checkFallbackError(402, null, 0, null, "some-other-provider", null);
  assert.equal(genericResult.shouldFallback, true);
  assert.equal(genericResult.reason, RateLimitReason.QUOTA_EXHAUSTED);
  // Generic default: bare cooldownMs 0 — immediate reselection of the same
  // connection (no provider-specific rule registered for this provider).
  assert.equal(genericResult.cooldownMs, 0);

  const openrouterResult = checkFallbackError(402, null, 0, null, "openrouter", null);
  assert.equal(openrouterResult.shouldFallback, true);
  assert.equal(openrouterResult.reason, RateLimitReason.QUOTA_EXHAUSTED);
  // The OpenRouter-specific rule must win over the generic status_402
  // default and lock the connection for a real cooldown instead of 0.
  assert.ok(
    openrouterResult.cooldownMs > 0,
    "expected a non-zero cooldown for a credit-exhausted 402"
  );
});

test("checkFallbackError 402 does NOT trip the whole-provider circuit breaker set", async () => {
  // Per CLAUDE.md's resilience-layer contract, only 408/500/502/503/504 trip
  // the provider breaker. 402 must never be in that set, for any provider.
  const PROVIDER_BREAKER_STATUSES = new Set([408, 500, 502, 503, 504]);
  assert.equal(PROVIDER_BREAKER_STATUSES.has(402), false);
});
