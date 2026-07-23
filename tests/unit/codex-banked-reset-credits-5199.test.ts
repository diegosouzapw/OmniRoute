/**
 * Regression test for Codex "banked reset credits" (issue #5199).
 *
 * DISPLAY ONLY: OmniRoute already calls the ChatGPT backend
 * `/backend-api/wham/usage` endpoint for quota tracking. Some eligibility-gated
 * accounts additionally expose `rate_limit_reset_credits.available_count` (a
 * count of extra rate-limit resets banked on the account) and, optionally,
 * `rate_limit_reached_type` (which window is currently blocking). This test
 * verifies:
 *   1. The field is parsed and surfaced additively when present, across both
 *      independent parsers that read this payload (codexUsageQuotas.ts used by
 *      the dashboard usage fetcher, and codexQuotaFetcher.ts used by the
 *      preflight/monitor fetcher).
 *   2. Existing quota parsing is completely unaffected when the field is
 *      absent (fail-open — no throw, no regression to session/weekly/etc).
 *
 * Redemption of banked reset credits is an unofficial, mutating upstream
 * endpoint and is explicitly OUT OF SCOPE — this only reads and surfaces data
 * already present in the existing usage-fetch response.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { buildCodexUsageQuotas } from "../../open-sse/services/codexUsageQuotas.ts";
import { getCodexUsage } from "../../open-sse/services/usage/codex.ts";
import {
  fetchCodexQuota,
  invalidateCodexQuotaCache,
  registerCodexConnection,
  unregisterCodexConnection,
} from "../../open-sse/services/codexQuotaFetcher.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

// ─── codexUsageQuotas.ts (dashboard usage-fetch path) ──────────────────────

test("buildCodexUsageQuotas surfaces bankedResetCredits when present", () => {
  const { quotas, bankedResetCredits, rateLimitReachedType } = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 10 },
      secondary_window: { used_percent: 20 },
    },
    rate_limit_reset_credits: { available_count: 3 },
    rate_limit_reached_type: { type: "secondary_window" },
  });

  assert.equal(bankedResetCredits, 3);
  assert.equal(rateLimitReachedType, "secondary_window");
  // Existing quotas remain intact.
  assert.equal(quotas.session?.used, 10);
  assert.equal(quotas.weekly?.used, 20);
});

test("buildCodexUsageQuotas tolerates camelCase field shape", () => {
  const { bankedResetCredits, rateLimitReachedType } = buildCodexUsageQuotas({
    rateLimit: { primaryWindow: { usedPercent: 5 } },
    rateLimitResetCredits: { availableCount: 7 },
    rateLimitReachedType: "primary_window",
  });

  assert.equal(bankedResetCredits, 7);
  assert.equal(rateLimitReachedType, "primary_window");
});

test("buildCodexUsageQuotas leaves bankedResetCredits undefined when absent (fail-open)", () => {
  const result = buildCodexUsageQuotas({
    rate_limit: {
      primary_window: { used_percent: 10 },
      secondary_window: { used_percent: 20 },
    },
  });

  assert.equal(result.bankedResetCredits, undefined);
  assert.equal(result.rateLimitReachedType, undefined);
  // Existing quota parsing is unaffected — no throw, no missing windows.
  assert.equal(result.quotas.session?.used, 10);
  assert.equal(result.quotas.weekly?.used, 20);
});

test("buildCodexUsageQuotas never throws on a garbage rate_limit_reset_credits shape", () => {
  assert.doesNotThrow(() => {
    const result = buildCodexUsageQuotas({
      rate_limit: { primary_window: { used_percent: 1 } },
      rate_limit_reset_credits: "not-an-object",
      rate_limit_reached_type: 12345,
    });
    assert.equal(result.bankedResetCredits, undefined);
    assert.equal(result.rateLimitReachedType, undefined);
  });
});

// ─── usage/codex.ts (getCodexUsage — full dashboard fetch) ─────────────────

test("getCodexUsage threads bankedResetCredits through additively", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        plan_type: "plus",
        rate_limit: {
          primary_window: { used_percent: 15 },
          secondary_window: { used_percent: 25 },
        },
        rate_limit_reset_credits: { available_count: 2 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const usage = await getCodexUsage("token", { workspaceId: "ws-1" });

  assert.equal((usage as any).plan, "plus");
  assert.equal((usage as any).bankedResetCredits, 2);
  assert.equal((usage as any).quotas.session.used, 15);
  assert.equal((usage as any).quotas.weekly.used, 25);
});

test("getCodexUsage omits bankedResetCredits and stays intact when absent", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        plan_type: "plus",
        rate_limit: {
          primary_window: { used_percent: 15 },
          secondary_window: { used_percent: 25 },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const usage = await getCodexUsage("token", { workspaceId: "ws-1" });

  assert.equal("bankedResetCredits" in (usage as any), false);
  assert.equal((usage as any).quotas.session.used, 15);
  assert.equal((usage as any).quotas.weekly.used, 25);
});

// ─── codexQuotaFetcher.ts (preflight/monitor path) ─────────────────────────

test("fetchCodexQuota surfaces bankedResetCredits from the dual-window parser", async () => {
  const connectionId = `codex-banked-${Date.now()}`;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        rate_limit: {
          primary_window: { used_percent: 70, reset_after_seconds: 45 },
          secondary_window: { used_percent: 20, reset_after_seconds: 300 },
        },
        rate_limit_reset_credits: { available_count: 4 },
        rate_limit_reached_type: { type: "primary_window" },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const quota = await fetchCodexQuota(connectionId, {
    accessToken: "token",
    providerSpecificData: { workspaceId: "ws" },
  });

  assert.ok(quota);
  assert.equal(quota?.bankedResetCredits, 4);
  assert.equal(quota?.rateLimitReachedType, "primary_window");
  // Existing dual-window parsing stays intact.
  assert.equal(quota?.window5h.percentUsed, 0.7);
  assert.equal(quota?.window7d.percentUsed, 0.2);

  invalidateCodexQuotaCache(connectionId);
  unregisterCodexConnection(connectionId);
});

test("fetchCodexQuota omits bankedResetCredits when the payload does not have it (fail-open)", async () => {
  const connectionId = `codex-nobanked-${Date.now()}`;

  registerCodexConnection(connectionId, { accessToken: "token" });

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        rate_limit: {
          primary_window: { used_percent: 30 },
          secondary_window: { used_percent: 10 },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  const quota = await fetchCodexQuota(connectionId);

  assert.ok(quota);
  assert.equal(quota?.bankedResetCredits, undefined);
  assert.equal(quota?.rateLimitReachedType, undefined);
  assert.equal(quota?.window5h.percentUsed, 0.3);
  assert.equal(quota?.window7d.percentUsed, 0.1);

  invalidateCodexQuotaCache(connectionId);
  unregisterCodexConnection(connectionId);
});
