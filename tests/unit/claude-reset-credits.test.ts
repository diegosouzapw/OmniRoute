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
  fetchClaudeResetCreditUsage,
} from "../../open-sse/services/claudeLimitReset.ts";
import {
  CLAUDE_RESET_CREDIT_COUNT_TTL_MS,
  _resetClaudeResetCreditCountCache,
  forgetClaudeResetCreditCount,
  getClaudeResetCreditCount,
  rememberClaudeResetCreditCount,
} from "../../open-sse/services/claudeResetCreditCount.ts";
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

// Upstream only fills `cedar_ember` / `juniper_tide` when the reset-credit query string is
// sent; the regular poller's base URL gets both keys back as null. The mock mirrors that so
// the dashboard gate is exercised against what the regular poller really receives.
const BASE_USAGE_URL = "https://api.anthropic.com/api/oauth/usage";
const RESET_CREDIT_LIST_URL =
  "https://api.anthropic.com/api/oauth/usage?at_wall=1&cedar_ember=1&skip_spend=1";

type RecordedRequest = { url: string; headers: Record<string, string> };

function mockClaudeUpstream(listStatus = 200) {
  const requests: RecordedRequest[] = [];
  const fetchImpl = (async (input: unknown, init?: RequestInit) => {
    const url = String(input);
    requests.push({ url, headers: { ...((init?.headers as Record<string, string>) ?? {}) } });
    if (url === BASE_USAGE_URL) {
      return Response.json({
        five_hour: { utilization: 100, resets_at: "2099-09-10T14:00:00Z" },
        seven_day: { utilization: 40, resets_at: "2099-09-16T13:00:00Z" },
        cedar_ember: null,
        juniper_tide: null,
      });
    }
    if (url === RESET_CREDIT_LIST_URL) {
      if (listStatus !== 200) return new Response(null, { status: listStatus });
      return Response.json({
        five_hour: { utilization: 100, resets_at: "2099-09-10T14:00:00Z" },
        cedar_ember: {
          eligible: true,
          grants: [{ id: "grant-a", resets_left: 2, usable_now: true }],
        },
        juniper_tide: { eligible: true, arm: "reset", available: true },
      });
    }
    return new Response(null, { status: 503 });
  }) as typeof fetch;
  return { requests, fetchImpl };
}

test("Claude reset credits reach the dashboard gate while the regular poller keeps the base URL", async () => {
  const { getClaudeUsage } = await import("../../open-sse/services/usage/claude.ts");
  const { getClaudeCodeVersion } = await import("../../open-sse/executors/claudeIdentity.ts");
  const { requests, fetchImpl } = mockClaudeUpstream();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    const usage = await getClaudeUsage("poller-gate-token");
    const rows = parseQuotaData("claude", usage);
    assert.equal(computeCanRedeemResetCredit("claude", rows), true);
    assert.equal(usage.bankedResetCredits, 3);

    const poll = requests.find((r) => r.url === BASE_USAGE_URL);
    assert.ok(poll, "regular usage poll must hit the base URL");
    assert.equal(poll.headers["User-Agent"], `claude-code/${getClaudeCodeVersion()}`);
    assert.equal("x-app" in poll.headers, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("reset-credit list and redeem requests carry the query string and CLI headers", async () => {
  const { getClaudeCodeVersion } = await import("../../open-sse/executors/claudeIdentity.ts");
  const { requests, fetchImpl } = mockClaudeUpstream();
  const listed = await fetchClaudeResetCreditUsage("shape-token", { fetchImpl });
  assert.equal(listed.ok, true);
  const claimRequests: RecordedRequest[] = [];
  await claimClaudeResetCredit("shape-token", "org-uuid-1", {
    creditId: "grant:grant-a",
    requestId: "req-1",
    fetchImpl: (async (input: unknown, init?: RequestInit) => {
      claimRequests.push({ url: String(input), headers: init?.headers as Record<string, string> });
      return Response.json({ result: "reset" });
    }) as typeof fetch,
  });

  const cliUa = `claude-cli/${getClaudeCodeVersion()} (external, cli)`;
  assert.deepEqual(
    requests.map((r) => r.url),
    [RESET_CREDIT_LIST_URL]
  );
  for (const request of [requests[0], claimRequests[0]]) {
    assert.equal(request.headers["User-Agent"], cliUa);
    assert.equal(request.headers["x-app"], "cli");
    assert.equal(request.headers["anthropic-beta"], "oauth-2025-04-20");
  }
});

test("the reset-credit list is fetched once per TTL, not on every usage refresh", async () => {
  const { getClaudeUsage } = await import("../../open-sse/services/usage/claude.ts");
  const { requests, fetchImpl } = mockClaudeUpstream();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    const first = await getClaudeUsage("ttl-token");
    const second = await getClaudeUsage("ttl-token");
    assert.equal(first.bankedResetCredits, 3);
    assert.equal(second.bankedResetCredits, 3);
    assert.equal(requests.filter((r) => r.url === BASE_USAGE_URL).length, 2);
    assert.equal(requests.filter((r) => r.url === RESET_CREDIT_LIST_URL).length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a failing reset-credit list leaves the regular usage poll intact and omits the count", async () => {
  const { getClaudeUsage } = await import("../../open-sse/services/usage/claude.ts");
  const { fetchImpl } = mockClaudeUpstream(503);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    const usage = await getClaudeUsage("list-down-token");
    assert.equal(usage.quotas["session (5h)"].used, 100);
    assert.equal("bankedResetCredits" in usage, false);
    const rows = parseQuotaData("claude", usage);
    assert.equal(computeCanRedeemResetCredit("claude", rows), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("reset-credit count serves the last known value through a failed refresh", async () => {
  _resetClaudeResetCreditCountCache();
  const ok = mockClaudeUpstream();
  const down = mockClaudeUpstream(429);
  const t0 = 1_000_000;
  assert.equal(await getClaudeResetCreditCount("tok", { now: t0, fetchImpl: ok.fetchImpl }), 3);
  const afterTtl = t0 + CLAUDE_RESET_CREDIT_COUNT_TTL_MS + 1;
  assert.equal(
    await getClaudeResetCreditCount("tok", { now: afterTtl, fetchImpl: down.fetchImpl }),
    3
  );
  // Inside the failure back-off no further list request is made.
  await getClaudeResetCreditCount("tok", { now: afterTtl + 1_000, fetchImpl: down.fetchImpl });
  assert.equal(down.requests.length, 1);
  // A token that never succeeded stays unknown rather than a fake zero.
  assert.equal(
    await getClaudeResetCreditCount("fresh", { now: t0, fetchImpl: down.fetchImpl }),
    null
  );
});

test("redeem invalidates the count and the dashboard list re-seeds it", async () => {
  _resetClaudeResetCreditCountCache();
  const first = mockClaudeUpstream();
  const t0 = 2_000_000;
  assert.equal(await getClaudeResetCreditCount("tok", { now: t0, fetchImpl: first.fetchImpl }), 3);

  forgetClaudeResetCreditCount("tok");
  const second = mockClaudeUpstream();
  await getClaudeResetCreditCount("tok", { now: t0 + 1_000, fetchImpl: second.fetchImpl });
  assert.equal(second.requests.length, 1, "a redeemed credit must not be served from the memo");

  rememberClaudeResetCreditCount("tok", { cedar_ember: { grants: [] }, juniper_tide: null }, t0);
  const third = mockClaudeUpstream();
  assert.equal(
    await getClaudeResetCreditCount("tok", { now: t0 + 2_000, fetchImpl: third.fetchImpl }),
    0
  );
  assert.equal(third.requests.length, 0);
});
