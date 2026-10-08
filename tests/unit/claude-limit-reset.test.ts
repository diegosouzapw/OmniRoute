/**
 * Claude OAuth once-a-week session-limit reset (open-sse/services/claudeLimitReset.ts).
 *
 * Wire contract captured from Claude Code 2.1.263 (`/limit-reset`, program `juniper_tide`):
 * status via GET /api/oauth/usage?at_wall=1&skip_spend=1 → body.juniper_tide, claim via
 * POST /api/organizations/{org}/reset_rate_limits { program: "juniper_tide" }.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  CLAUDE_LIMIT_RESET_RECENT_WINDOW_MS,
  CLAUDE_LIMIT_RESET_RETRY_BACKOFF_MS,
  CLAUDE_LIMIT_RESET_STATUS_URL,
  _resetClaudeLimitResetMemo,
  attemptClaudeLimitReset,
  claudeLimitResetClaimUrl,
  parseClaudeLimitResetClaim,
  parseClaudeLimitResetStatus,
} from "../../open-sse/services/claudeLimitReset.ts";

const NOW = 1_800_000_000_000;
const TOKEN = "sk-ant-oat-test-token";

type Call = { url: string; method: string; headers: Record<string, string>; body: unknown };

function mockFetch(routes: Record<string, () => Response | Promise<Response>>): {
  calls: Call[];
  fetchImpl: typeof fetch;
} {
  const calls: Call[] = [];
  const fetchImpl = (async (input: unknown, init: RequestInit = {}) => {
    const url = String(input);
    calls.push({
      url,
      method: init.method ?? "GET",
      headers: (init.headers as Record<string, string>) ?? {},
      body: init.body ? JSON.parse(String(init.body)) : undefined,
    });
    const route = Object.entries(routes).find(([prefix]) => url.startsWith(prefix));
    if (!route) throw new Error(`unexpected fetch ${url}`);
    return route[1]();
  }) as typeof fetch;
  return { calls, fetchImpl };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const CLAIM_PREFIX = "https://api.anthropic.com/api/organizations/";

test.beforeEach(() => _resetClaudeLimitResetMemo());

test("parseClaudeLimitResetStatus reads the juniper_tide block and tolerates absence", () => {
  assert.equal(parseClaudeLimitResetStatus({}), null);
  assert.equal(
    parseClaudeLimitResetStatus({ juniper_tide: { arm: "reset" } }),
    null,
    "eligible is required"
  );
  assert.deepEqual(
    parseClaudeLimitResetStatus({
      juniper_tide: {
        eligible: true,
        in_experiment: true,
        arm: "reset",
        available: true,
        next_available_at: null,
        weekly_resets_at: "2026-09-14T00:00:00Z",
        resets_per_week: 1,
      },
    }),
    {
      eligible: true,
      ineligibleReason: null,
      inExperiment: true,
      arm: "reset",
      available: true,
      nextAvailableAt: null,
      weeklyResetsAt: "2026-09-14T00:00:00Z",
      resetsPerWeek: 1,
    }
  );
  assert.equal(
    parseClaudeLimitResetStatus({
      juniper_tide: { eligible: false, ineligible_reason: "tier", arm: "bogus" },
    })?.arm,
    null
  );
});

test("parseClaudeLimitResetClaim maps unknown results to unavailable", () => {
  assert.deepEqual(
    parseClaudeLimitResetClaim({ result: "reset", next_available_at: "2026-09-15T00:00:00Z" }),
    {
      result: "reset",
      nextAvailableAt: "2026-09-15T00:00:00Z",
      weeklyResetsAt: null,
    }
  );
  assert.equal(parseClaudeLimitResetClaim({ result: "???" }).result, "unavailable");
  assert.equal(parseClaudeLimitResetClaim(null).result, "unavailable");
});

test("claim URL encodes the organization UUID", () => {
  assert.equal(
    claudeLimitResetClaimUrl("org 1"),
    "https://api.anthropic.com/api/organizations/org%201/reset_rate_limits"
  );
});

test("attempt: available → claims with program juniper_tide, OAuth bearer, then memoises the week", async () => {
  const { calls, fetchImpl } = mockFetch({
    [CLAUDE_LIMIT_RESET_STATUS_URL]: () =>
      json({
        juniper_tide: { eligible: true, in_experiment: true, arm: "reset", available: true },
      }),
    [CLAIM_PREFIX]: () => json({ result: "reset", next_available_at: "2026-09-15T00:00:00Z" }),
  });

  const first = await attemptClaudeLimitReset({
    key: "c1",
    accessToken: TOKEN,
    providerSpecificData: { organizationUUID: "org-uuid-1" },
    now: NOW,
    fetchImpl,
  });
  assert.deepEqual(first, {
    reset: true,
    outcome: "reset",
    nextAvailableAt: "2026-09-15T00:00:00Z",
  });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].method, "GET");
  assert.equal(calls[0].url, CLAUDE_LIMIT_RESET_STATUS_URL);
  assert.equal(calls[0].headers.Authorization, `Bearer ${TOKEN}`);
  assert.equal(calls[0].headers["anthropic-beta"], "oauth-2025-04-20");
  assert.equal(calls[1].method, "POST");
  assert.equal(calls[1].url, claudeLimitResetClaimUrl("org-uuid-1"));
  assert.deepEqual(calls[1].body, { program: "juniper_tide" });

  // Same wall again → memo skip, no network.
  const second = await attemptClaudeLimitReset({
    key: "c1",
    accessToken: TOKEN,
    now: NOW + 60_000,
    fetchImpl,
  });
  assert.deepEqual(second, { reset: false, outcome: "memo_skip", nextAvailableAt: null });
  assert.equal(calls.length, 2);
});

test("attempt: not offered (already used this week) → no claim, memo until next_available_at", async () => {
  const nextAt = new Date(NOW + 3 * 86_400_000).toISOString();
  const { calls, fetchImpl } = mockFetch({
    [CLAUDE_LIMIT_RESET_STATUS_URL]: () =>
      json({
        juniper_tide: { eligible: true, arm: "reset", available: false, next_available_at: nextAt },
      }),
  });
  const r = await attemptClaudeLimitReset({ key: "c1", accessToken: TOKEN, now: NOW, fetchImpl });
  assert.deepEqual(r, { reset: false, outcome: "not_offered", nextAvailableAt: nextAt });
  assert.equal(calls.length, 1);
  // Still skipped right before next_available_at, re-queried right after.
  assert.equal(
    (
      await attemptClaudeLimitReset({
        key: "c1",
        accessToken: TOKEN,
        now: NOW + 3 * 86_400_000 - 1,
        fetchImpl,
      })
    ).outcome,
    "memo_skip"
  );
  assert.equal(
    (
      await attemptClaudeLimitReset({
        key: "c1",
        accessToken: TOKEN,
        now: NOW + 3 * 86_400_000 + 1,
        fetchImpl,
      })
    ).outcome,
    "not_offered"
  );
});

test("attempt: control arm / not eligible never claims", async () => {
  const { calls, fetchImpl } = mockFetch({
    [CLAUDE_LIMIT_RESET_STATUS_URL]: () =>
      json({ juniper_tide: { eligible: true, arm: "control", available: true } }),
  });
  const r = await attemptClaudeLimitReset({ key: "c1", accessToken: TOKEN, now: NOW, fetchImpl });
  assert.equal(r.outcome, "not_offered");
  assert.equal(calls.length, 1);
});

test("attempt: status endpoint failure backs off 15 minutes", async () => {
  const { calls, fetchImpl } = mockFetch({
    [CLAUDE_LIMIT_RESET_STATUS_URL]: () => json({ error: "nope" }, 500),
  });
  assert.equal(
    (await attemptClaudeLimitReset({ key: "c1", accessToken: TOKEN, now: NOW, fetchImpl })).outcome,
    "no_status"
  );
  assert.equal(
    (
      await attemptClaudeLimitReset({
        key: "c1",
        accessToken: TOKEN,
        now: NOW + CLAUDE_LIMIT_RESET_RETRY_BACKOFF_MS - 1,
        fetchImpl,
      })
    ).outcome,
    "memo_skip"
  );
  assert.equal(
    (
      await attemptClaudeLimitReset({
        key: "c1",
        accessToken: TOKEN,
        now: NOW + CLAUDE_LIMIT_RESET_RETRY_BACKOFF_MS,
        fetchImpl,
      })
    ).outcome,
    "no_status"
  );
  assert.equal(calls.length, 2);
});

test("attempt: claim already_used → not reset, memo for a week", async () => {
  const { fetchImpl } = mockFetch({
    [CLAUDE_LIMIT_RESET_STATUS_URL]: () =>
      json({ juniper_tide: { eligible: true, arm: "reset", available: true } }),
    [CLAIM_PREFIX]: () => json({ result: "already_used" }),
  });
  const r = await attemptClaudeLimitReset({
    key: "c1",
    accessToken: TOKEN,
    providerSpecificData: { organizationUUID: "org-1" },
    now: NOW,
    fetchImpl,
  });
  assert.deepEqual(r, { reset: false, outcome: "already_used", nextAvailableAt: null });
  assert.equal(
    (
      await attemptClaudeLimitReset({
        key: "c1",
        accessToken: TOKEN,
        now: NOW + 6 * 86_400_000,
        fetchImpl,
      })
    ).outcome,
    "memo_skip"
  );
});

test("attempt: claim 401/403 → auth_error, 429 → rate_limited (both non-fatal)", async () => {
  for (const [status, outcome] of [
    [401, "auth_error"],
    [403, "auth_error"],
    [429, "rate_limited"],
  ] as const) {
    _resetClaudeLimitResetMemo();
    const { fetchImpl } = mockFetch({
      [CLAUDE_LIMIT_RESET_STATUS_URL]: () =>
        json({ juniper_tide: { eligible: true, arm: "reset", available: true } }),
      [CLAIM_PREFIX]: () => json({}, status),
    });
    const r = await attemptClaudeLimitReset({
      key: "c1",
      accessToken: TOKEN,
      providerSpecificData: { organizationUUID: "org-1" },
      now: NOW,
      fetchImpl,
    });
    assert.equal(r.reset, false, String(status));
    assert.equal(r.outcome, outcome, String(status));
  }
});

test("attempt: concurrent wall hits share one status+claim round trip (no duplicate POST)", async () => {
  const { calls, fetchImpl } = mockFetch({
    [CLAUDE_LIMIT_RESET_STATUS_URL]: () =>
      json({ juniper_tide: { eligible: true, arm: "reset", available: true } }),
    [CLAIM_PREFIX]: () => json({ result: "reset", next_available_at: "2026-09-15T00:00:00Z" }),
  });
  const opts = {
    key: "c1",
    accessToken: TOKEN,
    providerSpecificData: { organizationUUID: "org-1" },
    now: NOW,
    fetchImpl,
  };
  const [a, b, c] = await Promise.all([
    attemptClaudeLimitReset(opts),
    attemptClaudeLimitReset(opts),
    attemptClaudeLimitReset(opts),
  ]);
  assert.equal(a.reset, true);
  assert.deepEqual(b, a);
  assert.deepEqual(c, a);
  assert.equal(calls.filter((x) => x.method === "POST").length, 1, "exactly one claim");
  assert.equal(calls.length, 2);
});

test("attempt: right after a granted reset, a stale sibling wall is answered reset:true without network", async () => {
  const { calls, fetchImpl } = mockFetch({
    [CLAUDE_LIMIT_RESET_STATUS_URL]: () =>
      json({ juniper_tide: { eligible: true, arm: "reset", available: true } }),
    [CLAIM_PREFIX]: () => json({ result: "reset" }),
  });
  const base = {
    key: "c1",
    accessToken: TOKEN,
    providerSpecificData: { organizationUUID: "org-1" },
    fetchImpl,
  };
  assert.equal((await attemptClaudeLimitReset({ ...base, now: NOW })).outcome, "reset");
  const sibling = await attemptClaudeLimitReset({ ...base, now: NOW + 5_000 });
  assert.deepEqual(sibling, { reset: true, outcome: "recent_reset", nextAvailableAt: null });
  assert.equal(calls.length, 2, "no extra network for the sibling");
  // Past the recent-reset window the weekly memo takes over (the reset is spent).
  assert.equal(
    (await attemptClaudeLimitReset({ ...base, now: NOW + CLAUDE_LIMIT_RESET_RECENT_WINDOW_MS + 1 }))
      .outcome,
    "memo_skip"
  );
});

test("attempt: not_limited (window already reset server-side) counts as reset → retry at full speed", async () => {
  const { fetchImpl } = mockFetch({
    [CLAUDE_LIMIT_RESET_STATUS_URL]: () =>
      json({ juniper_tide: { eligible: true, arm: "reset", available: true } }),
    [CLAIM_PREFIX]: () => json({ result: "not_limited" }),
  });
  const r = await attemptClaudeLimitReset({
    key: "c1",
    accessToken: TOKEN,
    providerSpecificData: { organization_uuid: "org-snake" },
    now: NOW,
    fetchImpl,
  });
  assert.equal(r.reset, true);
  assert.equal(r.outcome, "not_limited");
});
