/**
 * OpenRouter `:free` daily tier — $10+ lifetime purchases unlock 1000/day.
 *
 * Regression guard for the stuck-at-50 bug: `setPurchasedTier()` had zero
 * production callers, so any account with >= $10 lifetime purchases was still
 * displayed and enforced as 50/day until a 429 happened to correct it.
 * Quota fetching (`GET /api/v1/key` + `GET /api/v1/credits`, see
 * https://openrouter.ai/docs/limits) must feed `total_credits` into the
 * free-window tier, and the preflight short-circuit must not hide the signal
 * that would un-exhaust it.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  clearFreeWindowState,
  getFreeWindowStatus,
  recordFreeWindowAttempt,
  resolveAccountKey,
  setPurchasedTier,
  syncPurchasedTierFromQuota,
} from "../../open-sse/services/openrouterFreeWindow.ts";
import {
  fetchOpenrouterQuota,
  fetchOpenrouterQuotaWithFreeWindowPreflight,
  invalidateOpenrouterQuotaCache,
} from "../../open-sse/services/openrouterQuotaFetcher.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearFreeWindowState();
});

function mockQuotaFetch(totalCredits: number | null, isFreeTier = false): void {
  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/key")) {
      return new Response(
        JSON.stringify({
          data: {
            limit: null,
            limit_remaining: null,
            limit_reset: null,
            is_free_tier: isFreeTier,
          },
        }),
        { status: 200 }
      );
    }
    return new Response(JSON.stringify({ data: { total_credits: totalCredits, total_usage: 0 } }), {
      status: 200,
    });
  };
}

// ─── syncPurchasedTierFromQuota unit behavior ─────────────────────────────

test("syncPurchasedTierFromQuota: total_credits >= 10 unlocks the 1000/day tier", () => {
  const accountKey = `acct-sync-1000-${Date.now()}`;
  assert.equal(getFreeWindowStatus(accountKey).dailyLimit, 50);
  assert.equal(syncPurchasedTierFromQuota(accountKey, { totalCredits: 10 }), true);
  assert.equal(getFreeWindowStatus(accountKey).dailyLimit, 1000);
});

test("syncPurchasedTierFromQuota: total_credits < 10 keeps the 50/day tier", () => {
  const accountKey = `acct-sync-50-${Date.now()}`;
  setPurchasedTier(accountKey, true); // start unlocked to prove a downgrade applies
  assert.equal(syncPurchasedTierFromQuota(accountKey, { totalCredits: 9.99 }), true);
  assert.equal(getFreeWindowStatus(accountKey).dailyLimit, 50);
});

test("syncPurchasedTierFromQuota: missing signals leave state untouched (fail open)", () => {
  const accountKey = `acct-sync-missing-${Date.now()}`;
  assert.equal(syncPurchasedTierFromQuota(accountKey, { totalCredits: null }), false);
  assert.equal(getFreeWindowStatus(accountKey).dailyLimit, 50);

  setPurchasedTier(accountKey, true);
  // is_free_tier=false alone only means "has paid something", not ">= $10" —
  // must not touch the tier either way.
  assert.equal(
    syncPurchasedTierFromQuota(accountKey, { totalCredits: null, isFreeTier: false }),
    false
  );
  assert.equal(getFreeWindowStatus(accountKey).dailyLimit, 1000);

  assert.equal(syncPurchasedTierFromQuota(accountKey, null), false);
  assert.equal(syncPurchasedTierFromQuota(accountKey, undefined), false);
  assert.equal(getFreeWindowStatus(accountKey).dailyLimit, 1000);
});

// ─── fetchOpenrouterQuota feeds the tier ──────────────────────────────────

test("fetchOpenrouterQuota with total_credits >= 10 unlocks the 1000/day window", async () => {
  const connectionId = `openrouter-tier-1000-${Date.now()}`;
  mockQuotaFetch(25);
  const quota = await fetchOpenrouterQuota(connectionId, { apiKey: "test-key" });
  assert.ok(quota);
  const accountKey = resolveAccountKey(connectionId, { apiKey: "test-key" });
  assert.equal(getFreeWindowStatus(accountKey).dailyLimit, 1000);
  invalidateOpenrouterQuotaCache(connectionId);
});

test("fetchOpenrouterQuota with total_credits < 10 keeps the 50/day window", async () => {
  const connectionId = `openrouter-tier-50-${Date.now()}`;
  mockQuotaFetch(2);
  const quota = await fetchOpenrouterQuota(connectionId, { apiKey: "test-key" });
  assert.ok(quota);
  const accountKey = resolveAccountKey(connectionId, { apiKey: "test-key" });
  assert.equal(getFreeWindowStatus(accountKey).dailyLimit, 50);
  invalidateOpenrouterQuotaCache(connectionId);
});

// ─── Preflight trap: exhausted-at-50 refreshes to 1000 and allows ─────────

test("preflight exhausted at 50/50 refreshes to the 1000 tier and allows the request", async () => {
  const connectionId = `openrouter-preflight-unstick-${Date.now()}`;
  const connection = { apiKey: "or-test-key", requestedModel: "x-ai/grok-4-fast:free" };
  const accountKey = resolveAccountKey(connectionId, connection);

  // Exhaust the base-tier window (50/50) — the stale state that used to stick
  // until UTC midnight because the short-circuit skipped the quota fetch.
  for (let i = 0; i < 50; i++) recordFreeWindowAttempt(accountKey);
  assert.equal(getFreeWindowStatus(accountKey).dailyRemaining, 0);

  // Upstream proves >= $10 lifetime purchases.
  mockQuotaFetch(25);

  const quota = await fetchOpenrouterQuotaWithFreeWindowPreflight(connectionId, connection);

  assert.equal(
    getFreeWindowStatus(accountKey).dailyLimit,
    1000,
    "tier refresh must promote the bucket before the exhausted verdict"
  );
  assert.equal(getFreeWindowStatus(accountKey).dailyRemaining, 950);
  assert.ok(quota, "request must be allowed, not short-circuited as exhausted");
  assert.equal(quota!.limitReached, false);
  invalidateOpenrouterQuotaCache(connectionId);
});

test("preflight still short-circuits without network when quota confirms the base tier", async () => {
  const connectionId = `openrouter-preflight-still-50-${Date.now()}`;
  const connection = { apiKey: "or-test-key", requestedModel: "x-ai/grok-4-fast:free" };
  const accountKey = resolveAccountKey(connectionId, connection);

  for (let i = 0; i < 50; i++) recordFreeWindowAttempt(accountKey);
  mockQuotaFetch(2); // < $10: genuinely still 50/day

  let fetchCalls = 0;
  const innerFetch = globalThis.fetch;
  globalThis.fetch = async (...args) => {
    fetchCalls += 1;
    return (innerFetch as typeof fetch)(...args);
  };

  const quota = await fetchOpenrouterQuotaWithFreeWindowPreflight(connectionId, connection);

  assert.ok(fetchCalls > 0, "tier refresh needs the quota fetch to confirm the base tier");
  assert.ok(quota);
  assert.equal(quota!.limitReached, true, "genuinely exhausted base tier must still block");
  assert.equal(getFreeWindowStatus(accountKey).dailyLimit, 50);
  invalidateOpenrouterQuotaCache(connectionId);
});
