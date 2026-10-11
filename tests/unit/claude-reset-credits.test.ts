/**
 * Unit tests for Claude reset credits (cedar_ember banked grants & juniper_tide session reset).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  parseAllClaudeResetCredits,
  claimClaudeResetCredit,
  attemptClaudeLimitReset,
  _resetClaudeLimitResetMemo,
  CLAUDE_GRANT_RESET_PROGRAM,
  CLAUDE_LIMIT_RESET_PROGRAM,
} from "../../open-sse/services/claudeLimitReset.ts";
// Namespace import: the memo API is exercised per test, so one missing export fails one test.
import * as resetCreditMemo from "../../open-sse/services/claudeResetCreditCount.ts";
import * as resetCreditRedemption from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/useCodexResetCreditRedemption.ts";
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
// sent; the regular poller's base URL gets both keys back as null. The mock mirrors that.
const BASE_USAGE_URL = "https://api.anthropic.com/api/oauth/usage";
const RESET_CREDIT_LIST_URL =
  "https://api.anthropic.com/api/oauth/usage?at_wall=1&cedar_ember=1&skip_spend=1";
const CLAIM_URL = "https://api.anthropic.com/api/organizations/org-uuid-1/reset_rate_limits";
// The opt-in auto-reset keeps base's request shape (no cedar_ember, axios-style UA).
const AUTO_RESET_STATUS_URL = "https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1";

const LIST_BODY_WITH_CREDITS = {
  five_hour: { utilization: 100, resets_at: "2099-09-10T14:00:00Z" },
  cedar_ember: { eligible: true, grants: [{ id: "grant-a", resets_left: 2, usable_now: true }] },
  juniper_tide: { eligible: true, arm: "reset", available: true },
};
const LIST_BODY_EMPTY = {
  five_hour: { utilization: 10, resets_at: "2099-09-10T14:00:00Z" },
  cedar_ember: { eligible: true, grants: [] },
  juniper_tide: { eligible: false, arm: "control", available: false },
};

type RecordedRequest = { url: string; method: string; headers: Record<string, string> };

function mockClaudeUpstream(
  options: {
    listStatus?: number;
    listBody?: unknown;
    autoResetBody?: unknown;
    claimResult?: string;
  } = {}
) {
  const requests: RecordedRequest[] = [];
  const fetchImpl = (async (input: unknown, init?: RequestInit) => {
    const url = String(input);
    requests.push({
      url,
      method: init?.method ?? "GET",
      headers: { ...((init?.headers as Record<string, string>) ?? {}) },
    });
    if (url === BASE_USAGE_URL) {
      return Response.json({
        five_hour: { utilization: 100, resets_at: "2099-09-10T14:00:00Z" },
        seven_day: { utilization: 40, resets_at: "2099-09-16T13:00:00Z" },
        cedar_ember: null,
        juniper_tide: null,
      });
    }
    if (url === RESET_CREDIT_LIST_URL) {
      const status = options.listStatus ?? 200;
      if (status !== 200) return new Response(null, { status });
      return Response.json(options.listBody ?? LIST_BODY_WITH_CREDITS);
    }
    if (url === AUTO_RESET_STATUS_URL) {
      return Response.json(
        options.autoResetBody ?? {
          cedar_ember: null,
          juniper_tide: { eligible: true, arm: "reset", available: true },
        }
      );
    }
    if (url === CLAIM_URL) return Response.json({ result: options.claimResult ?? "reset" });
    return new Response(null, { status: 503 });
  }) as typeof fetch;
  const listCalls = () => requests.filter((r) => r.url === RESET_CREDIT_LIST_URL).length;
  return { requests, fetchImpl, listCalls };
}

/** A list request the test releases by hand, to interleave redeems and concurrent callers. */
function deferredListFetch() {
  let calls = 0;
  const releases: Array<() => void> = [];
  const fetchImpl = (async () => {
    calls += 1;
    await new Promise<void>((resolve) => releases.push(resolve));
    return Response.json(LIST_BODY_WITH_CREDITS);
  }) as typeof fetch;
  return {
    fetchImpl,
    calls: () => calls,
    releaseAll: () => releases.splice(0).forEach((r) => r()),
  };
}

test.beforeEach(() => {
  resetCreditMemo._resetClaudeResetCreditCountCache();
  _resetClaudeLimitResetMemo();
});

test("the regular usage poller never requests the reset-credit list and keeps the base headers", async () => {
  const { getClaudeUsage } = await import("../../open-sse/services/usage/claude.ts");
  const { getClaudeCodeVersion } = await import("../../open-sse/executors/claudeIdentity.ts");
  const upstream = mockClaudeUpstream();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = upstream.fetchImpl;
  try {
    const usage = await getClaudeUsage("poller-token");
    assert.equal(upstream.listCalls(), 0);
    const polls = upstream.requests.filter((r) => r.url === BASE_USAGE_URL);
    assert.equal(polls.length, 1);
    assert.deepEqual(polls[0].headers, {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, compress, deflate, br",
      Authorization: "Bearer poller-token",
      "Content-Type": "application/json",
      "User-Agent": `claude-code/${getClaudeCodeVersion()}`,
      "anthropic-beta": "oauth-2025-04-20",
    });
    assert.equal("bankedResetCredits" in usage, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("reset-credit list and redeem requests carry the query string and CLI headers", async () => {
  const { getClaudeCodeVersion } = await import("../../open-sse/executors/claudeIdentity.ts");
  const upstream = mockClaudeUpstream();
  const listed = await resetCreditMemo.fetchClaudeResetCreditUsage("shape-token", {
    fetchImpl: upstream.fetchImpl,
  });
  assert.equal(listed.ok, true);
  await claimClaudeResetCredit("shape-token", "org-uuid-1", {
    creditId: "grant:grant-a",
    requestId: "req-1",
    profile: "dashboard",
    fetchImpl: upstream.fetchImpl,
  });

  assert.deepEqual(
    upstream.requests.map((r) => `${r.method} ${r.url}`),
    [`GET ${RESET_CREDIT_LIST_URL}`, `POST ${CLAIM_URL}`]
  );
  const cliUa = `claude-cli/${getClaudeCodeVersion()} (external, cli)`;
  for (const request of upstream.requests) {
    assert.equal(request.headers["User-Agent"], cliUa);
    assert.equal(request.headers["x-app"], "cli");
    assert.equal(request.headers["anthropic-beta"], "oauth-2025-04-20");
  }
});

test("the dashboard count is unknown until a reset-credit list answers, then authoritative", async () => {
  const pollUsage = { quotas: { "session (5h)": { used: 100, remaining: 0, total: 100 } } };
  const gate = (usage: Record<string, unknown>) =>
    computeCanRedeemResetCredit("claude", parseQuotaData("claude", usage), {
      raw: usage,
      authType: "oauth",
    });

  const unknown = resetCreditMemo.withClaudeResetCreditCount("conn-1", pollUsage);
  assert.equal("bankedResetCredits" in unknown, false);
  assert.equal(gate(unknown), true, "an unknown count keeps the entry point visible");
  assert.equal(
    parseQuotaData("claude", unknown).some(
      (row: { isResetCredits?: boolean }) => row.isResetCredits
    ),
    false,
    "an unknown count must not render a number"
  );

  const withCredits = mockClaudeUpstream();
  await resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: withCredits.fetchImpl,
  });
  const seeded = resetCreditMemo.withClaudeResetCreditCount("conn-1", pollUsage);
  assert.equal(seeded.bankedResetCredits, 3);
  assert.equal(gate(seeded), true);

  const empty = mockClaudeUpstream({ listBody: LIST_BODY_EMPTY });
  await resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: empty.fetchImpl,
  });
  const none = resetCreditMemo.withClaudeResetCreditCount("conn-1", pollUsage);
  assert.equal(none.bankedResetCredits, 0);
  assert.equal(gate(none), false, "only an authoritative zero hides the entry point");
});

test("concurrent reset-credit list calls for one connection share a single request", async () => {
  const deferred = deferredListFetch();
  const first = resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: deferred.fetchImpl,
  });
  const second = resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: deferred.fetchImpl,
  });
  await new Promise((resolve) => setImmediate(resolve));
  deferred.releaseAll();
  const [a, b] = await Promise.all([first, second]);
  assert.equal(deferred.calls(), 1);
  assert.deepEqual(a, b);
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-1"), 3);
});

test("a list request started before a redeem cannot store the pre-redeem count", async () => {
  const deferred = deferredListFetch();
  const inFlight = resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: deferred.fetchImpl,
  });
  await new Promise((resolve) => setImmediate(resolve));
  resetCreditMemo.forgetClaudeResetCreditCount("conn-1");

  // forget() also drops the in-flight entry: a new list call starts its own request.
  const fresh = mockClaudeUpstream({ listBody: LIST_BODY_EMPTY });
  const after = resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: fresh.fetchImpl,
  });
  assert.equal((await after).ok, true);
  assert.equal(fresh.listCalls(), 1);
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-1"), 0);

  deferred.releaseAll();
  assert.equal((await inFlight).ok, true);
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-1"), 0, "stale result dropped");
});

test("a reset-credit response whose body never finishes times out", async () => {
  const hanging = (async () =>
    new Response(new ReadableStream({ start() {} }), { status: 200 })) as typeof fetch;
  const startedAt = Date.now();
  const result = await resetCreditMemo.fetchClaudeResetCreditUsage("tok", {
    fetchImpl: hanging,
    timeoutMs: 30,
  });
  assert.deepEqual(result, { ok: false, status: 0, body: null });
  assert.ok(Date.now() - startedAt < 2_000);
});

test("a count nobody refreshed within the max age becomes unknown", async () => {
  const t0 = 1_000_000;
  const upstream = mockClaudeUpstream();
  await resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: upstream.fetchImpl,
    now: t0,
  });
  const maxAge = resetCreditMemo.CLAUDE_RESET_CREDIT_COUNT_MAX_AGE_MS;
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-1", t0 + maxAge - 1), 3);
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-1", t0 + maxAge + 1), null);
  // Expired entries are deleted on read, not just hidden.
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-1", t0), null);
});

test("throttled or failing lists keep the last count; other 4xx make it unknown", async () => {
  const seed = mockClaudeUpstream();
  await resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: seed.fetchImpl,
  });
  for (const status of [429, 503]) {
    await resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
      fetchImpl: mockClaudeUpstream({ listStatus: status }).fetchImpl,
    });
    assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-1"), 3, `kept after ${status}`);
  }
  await resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: mockClaudeUpstream({ listStatus: 403 }).fetchImpl,
  });
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-1"), null);
});

test("the opt-in auto-reset keeps base's request shape and never seeds the count", async () => {
  const { getClaudeCodeVersion } = await import("../../open-sse/executors/claudeIdentity.ts");
  const baseHeaders = (token: string) => ({
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": `claude-code/${getClaudeCodeVersion()}`,
    "anthropic-beta": "oauth-2025-04-20",
  });

  // A count the dashboard list seeded earlier must be forgotten by the auto-claim.
  const upstream = mockClaudeUpstream();
  await resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-a", "tok-a", {
    fetchImpl: upstream.fetchImpl,
  });
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-a"), 3);
  const claimed = await attemptClaudeLimitReset({
    key: "conn-a",
    connectionId: "conn-a",
    accessToken: "tok-a",
    providerSpecificData: { organizationUUID: "org-uuid-1" },
    fetchImpl: upstream.fetchImpl,
  });
  assert.equal(claimed.outcome, "reset");
  assert.deepEqual(
    upstream.requests.slice(1).map(({ url, method, headers }) => ({ url, method, headers })),
    [
      { url: AUTO_RESET_STATUS_URL, method: "GET", headers: baseHeaders("tok-a") },
      { url: CLAIM_URL, method: "POST", headers: baseHeaders("tok-a") },
    ]
  );
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-a"), null);

  // A status read that is not followed by a claim leaves the count untouched (unknown).
  const notOffered = mockClaudeUpstream({
    autoResetBody: {
      cedar_ember: { grants: [{ id: "grant-b", resets_left: 4 }] },
      juniper_tide: { eligible: false, arm: "control" },
    },
  });
  const skipped = await attemptClaudeLimitReset({
    key: "conn-b",
    connectionId: "conn-b",
    accessToken: "tok-b",
    providerSpecificData: { organizationUUID: "org-uuid-1" },
    fetchImpl: notOffered.fetchImpl,
  });
  assert.equal(skipped.outcome, "not_offered");
  assert.equal(notOffered.listCalls(), 0);
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-b"), null);
});

test("the auto-reset never joins an in-flight dashboard list request", async () => {
  const deferred = deferredListFetch();
  const listing = resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: deferred.fetchImpl,
  });
  const upstream = mockClaudeUpstream({
    autoResetBody: { juniper_tide: { eligible: false, arm: "control" } },
  });
  const attempt = await attemptClaudeLimitReset({
    key: "conn-1",
    connectionId: "conn-1",
    accessToken: "tok",
    fetchImpl: upstream.fetchImpl,
  });
  assert.equal(attempt.outcome, "not_offered", "resolved while the list is still pending");
  assert.deepEqual(
    upstream.requests.map((r) => r.url),
    [AUTO_RESET_STATUS_URL]
  );
  deferred.releaseAll();
  await listing;
  assert.equal(deferred.calls(), 1);
});

test("a forgotten in-flight list stays rejected even after many other forgets", async () => {
  const deferred = deferredListFetch();
  const inFlight = resetCreditMemo.fetchAndSeedClaudeResetCreditUsage("conn-1", "tok", {
    fetchImpl: deferred.fetchImpl,
  });
  await new Promise((resolve) => setImmediate(resolve));
  resetCreditMemo.forgetClaudeResetCreditCount("conn-1");
  for (let i = 0; i < 10_050; i += 1) resetCreditMemo.forgetClaudeResetCreditCount(`other-${i}`);
  deferred.releaseAll();
  await inFlight;
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount("conn-1"), null);
});

test("the Claude entry point hides only after an authoritative empty list", () => {
  const oauth = (raw: Record<string, unknown>) => ({ raw, authType: "oauth" });
  assert.equal(computeCanRedeemResetCredit("claude", [], oauth({})), true);
  assert.equal(computeCanRedeemResetCredit("claude", [], oauth({ bankedResetCredits: 0 })), false);
  assert.equal(computeCanRedeemResetCredit("claude", [], { raw: {}, authType: "apikey" }), false);
  assert.equal(computeCanRedeemResetCredit("codex", [], oauth({})), false);

  const entry = { quotas: [{ name: "session (5h)", used: 10 }], raw: { quotas: {} } };
  const listedEmpty = resetCreditRedemption.applyEmptyResetCreditList(entry);
  assert.equal(listedEmpty.raw.bankedResetCredits, 0);
  assert.equal(
    computeCanRedeemResetCredit("claude", listedEmpty.quotas, oauth(listedEmpty.raw)),
    false
  );

  // A committed redeem on an unknown count must not invent a zero.
  const fallback = resetCreditRedemption.applyCommittedResetCreditFallback(entry);
  assert.equal("bankedResetCredits" in fallback.raw, false);
});
