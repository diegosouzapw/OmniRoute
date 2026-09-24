/**
 * Unit tests for Claude reset credits (cedar_ember banked grants & juniper_tide session reset).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  parseAllClaudeResetCredits,
  claimClaudeResetCredit,
  CLAUDE_GRANT_RESET_PROGRAM,
  CLAUDE_LIMIT_RESET_PROGRAM,
} from "../../open-sse/services/claudeLimitReset.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx";
import {
  canProviderRedeemResetCredit,
  getResetCreditEndpoint,
  computeCanRedeemResetCredit,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx";
import {
  getResetCreditWindowTitle,
  getResetCreditConfirmation,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/CodexResetCreditsModal.tsx";

test("parseAllClaudeResetCredits returns empty list when neither cedar_ember nor juniper_tide present", () => {
  const result = parseAllClaudeResetCredits({});
  assert.deepEqual(result, { credits: [], availableCount: 0 });
});

test("parseAllClaudeResetCredits extracts cedar_ember grants", () => {
  const usageBody = {
    cedar_ember: {
      eligible: true,
      at_limit: true,
      grants: [
        {
          id: "grant_abc123",
          label: "Bonus Reset Card",
          resets_total: 2,
          resets_left: 2,
          starts_at: "2026-09-20T00:00:00Z",
          ends_at: "2026-10-01T00:00:00Z",
          clears: ["five_hour", "seven_day"],
          usable_now: true,
        },
        {
          id: "grant_exhausted",
          label: "Used Grant",
          resets_total: 1,
          resets_left: 0,
          usable_now: false,
        },
      ],
    },
  };

  const result = parseAllClaudeResetCredits(usageBody);
  assert.equal(result.credits.length, 1);
  assert.equal(result.availableCount, 2);
  assert.deepEqual(result.credits[0], {
    id: "grant_abc123",
    selectionToken: "grant:grant_abc123",
    resetType: "GRANT",
    status: "available",
    grantedAt: "2026-09-20T00:00:00Z",
    expiresAt: "2026-10-01T00:00:00Z",
    title: "Bonus Reset Card",
    description: "Clears: five_hour, seven_day (2 resets left)",
    resetsLeft: 2,
    usableNow: true,
  });
});

test("parseAllClaudeResetCredits extracts juniper_tide session reset when available", () => {
  const usageBody = {
    juniper_tide: {
      eligible: true,
      in_experiment: true,
      arm: "reset",
      available: true,
      weekly_resets_at: "2026-09-28T00:00:00Z",
    },
  };

  const result = parseAllClaudeResetCredits(usageBody);
  assert.equal(result.credits.length, 1);
  assert.equal(result.availableCount, 1);
  assert.deepEqual(result.credits[0], {
    id: "session_reset",
    selectionToken: "session_reset",
    resetType: "SESSION",
    status: "available",
    expiresAt: "2026-09-28T00:00:00Z",
    title: "Weekly Session Reset",
    description: "5-hour session wall reset (once per week)",
    resetsLeft: 1,
    usableNow: true,
  });
});

test("claimClaudeResetCredit sends cedar_ember payload for grant tokens", async () => {
  let capturedUrl = "";
  let capturedBody: Record<string, unknown> | null = null;

  const mockFetch = (async (url: string, init: RequestInit) => {
    capturedUrl = url;
    capturedBody = JSON.parse(String(init.body)) as Record<string, unknown>;
    return new Response(JSON.stringify({ result: "reset", resets_left: 1 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  const claim = await claimClaudeResetCredit("sk-ant-test", "org-uuid-1", {
    creditId: "grant:grant_abc123",
    requestId: "req-123",
    fetchImpl: mockFetch,
  });

  assert.equal(claim.result, "reset");
  assert.equal(
    capturedUrl,
    "https://api.anthropic.com/api/organizations/org-uuid-1/reset_rate_limits"
  );
  assert.deepEqual(capturedBody, {
    program: CLAUDE_GRANT_RESET_PROGRAM,
    grant_id: "grant_abc123",
    request_id: "req-123",
  });
});

test("claimClaudeResetCredit sends juniper_tide payload for session_reset", async () => {
  let capturedBody: Record<string, unknown> | null = null;

  const mockFetch = (async (_url: string, init: RequestInit) => {
    capturedBody = JSON.parse(String(init.body)) as Record<string, unknown>;
    return new Response(JSON.stringify({ result: "reset" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  const claim = await claimClaudeResetCredit("sk-ant-test", "org-uuid-1", {
    creditId: "session_reset",
    fetchImpl: mockFetch,
  });

  assert.equal(claim.result, "reset");
  assert.deepEqual(capturedBody, {
    program: CLAUDE_LIMIT_RESET_PROGRAM,
  });
});

test("UI helpers recognise claude as a reset credit provider", () => {
  assert.equal(canProviderRedeemResetCredit("claude"), true);
  assert.equal(getResetCreditEndpoint("claude"), "/api/usage/codex-reset-credit");

  const quotasWithCredits = [
    { name: "session (5h)", used: 100, remainingPercentage: 0 },
    { name: "banked_reset_credits", isResetCredits: true, creditCount: 2, remaining: 2 },
  ];
  assert.equal(computeCanRedeemResetCredit("claude", quotasWithCredits), true);

  const quotasWithoutCredits = [{ name: "session (5h)", used: 100, remainingPercentage: 0 }];
  assert.equal(computeCanRedeemResetCredit("claude", quotasWithoutCredits), false);
});

test("parseQuotaData parses Claude bankedResetCredits into a reset-credit quota row", () => {
  const quotas = parseQuotaData("claude", {
    quotas: {
      "session (5h)": { used: 100, remaining: 0, total: 100 },
    },
    bankedResetCredits: 3,
  });

  const resetRow = quotas.find((q: { isResetCredits?: boolean }) => q.isResetCredits) as {
    creditCount?: number;
    remaining?: number;
  };
  assert.ok(resetRow, "must find banked_reset_credits quota row");
  assert.equal(resetRow.creditCount, 3);
  assert.equal(resetRow.remaining, 3);
});

test("CodexResetCreditsModal helpers format Claude credits appropriately", () => {
  const dummyTr = (_k: string, fallback: string) => fallback;
  const title = getResetCreditWindowTitle(
    "claude",
    { selectionToken: "grant:1", title: "Special Reset" },
    dummyTr
  );
  assert.equal(title, "Special Reset");

  const defaultTitle = getResetCreditWindowTitle("claude", { selectionToken: "grant:1" }, dummyTr);
  assert.equal(defaultTitle, "Claude limit reset");

  const confirmText = getResetCreditConfirmation("claude", undefined, dummyTr);
  assert.match(confirmText, /Claude usage limits/);
});
