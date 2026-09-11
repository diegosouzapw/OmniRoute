/**
 * End-to-end wiring of the Claude OAuth lower-priority lane and the session-limit reset
 * through `BaseExecutor.execute()` (mirrors the fetch-capture pattern of
 * context-editing-executor-injection.test.ts).
 *
 * Proves, on the real outbound request:
 *   - no `anthropic-usage-limit` header before the account hits its 5-hour wall;
 *   - on the wall 429 (slow-offer: treatment) with `lowPriorityMode` on, the executor
 *     retries the SAME account with `anthropic-usage-limit: slow` and returns the 200 —
 *     chatCore never sees the 429, so the connection is not cooled down;
 *   - later requests on that connection carry the header from the first attempt;
 *   - an opt-out connection surfaces the 429 untouched, header never sent;
 *   - with `autoLimitReset` on, the wall triggers status + claim and retries at full speed.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { _resetClaudeLowPriorityState } from "../../open-sse/services/claudeLowPriority.ts";
import {
  CLAUDE_LIMIT_RESET_STATUS_URL,
  _resetClaudeLimitResetMemo,
} from "../../open-sse/services/claudeLimitReset.ts";

type Captured = { url: string; headers: Record<string, string> };

const NOW_S = Math.floor(Date.now() / 1000);

function wall429(extra: Record<string, string> = {}): Response {
  return new Response(
    JSON.stringify({ type: "error", error: { type: "rate_limit_error", message: "usage limit" } }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "anthropic-ratelimit-unified-status": "rejected",
        "anthropic-ratelimit-unified-reset": String(NOW_S + 3600),
        "anthropic-ratelimit-unified-representative-claim": "five_hour",
        "anthropic-ratelimit-unified-slow-offer": "treatment",
        "anthropic-ratelimit-unified-slow-retry-after": "20",
        "anthropic-ratelimit-unified-slow-max-wait": "1200",
        ...extra,
      },
    }
  );
}

function ok(headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify({ id: "msg_1", type: "message", content: [] }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

/**
 * Sequenced fetch mock: `/v1/messages` POSTs consume `messages` in order; any other URL
 * (identity bootstrap, usage/status, reset claim) is answered by `others` or an empty 200.
 */
function mockFetch(
  messages: Array<() => Response>,
  others: Record<string, () => Response> = {}
): { calls: Captured[]; restore: () => void } {
  const calls: Captured[] = [];
  const original = globalThis.fetch;
  let i = 0;
  globalThis.fetch = (async (input: unknown, init: RequestInit = {}) => {
    const url = String(input);
    const headers = { ...((init.headers as Record<string, string>) ?? {}) };
    if (url.includes("/v1/messages")) {
      calls.push({ url, headers });
      const next = messages[Math.min(i, messages.length - 1)];
      i++;
      return next();
    }
    const route = Object.entries(others).find(([prefix]) => url.startsWith(prefix));
    if (route) return route[1]();
    return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;
  return { calls, restore: () => void (globalThis.fetch = original) };
}

function lower(headers: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
}

function run(
  connectionId: string,
  providerSpecificData: Record<string, unknown>,
  contextEditingEnabled = false
) {
  return new DefaultExecutor("claude").execute({
    model: "claude-opus-4-8",
    body: { model: "claude-opus-4-8", messages: [{ role: "user", content: "hi" }], max_tokens: 8 },
    stream: false,
    credentials: {
      connectionId,
      accessToken: `sk-ant-oat-${connectionId}`,
      providerSpecificData,
    },
    clientHeaders: { "user-agent": "Cursor/1.0" },
    contextEditing: { enabled: contextEditingEnabled },
    // Combo-style: the generic 2×2s intra-URL 429 retry is skipped so the test only
    // exercises the lane's own retry (which runs regardless of this flag).
    skipUpstreamRetry: true,
  });
}

test.beforeEach(() => {
  _resetClaudeLowPriorityState();
  _resetClaudeLimitResetMemo();
});

test("wall 429 + lowPriorityMode → same-account retry with anthropic-usage-limit: slow, 200 returned", async () => {
  const { calls, restore } = mockFetch([
    () => wall429(),
    () => ok({ "anthropic-ratelimit-unified-slow-status": "active" }),
  ]);
  try {
    const result = await run("conn-lowpri", { lowPriorityMode: true });
    assert.equal(result.response.status, 200, "the intercepted 429 never reaches chatCore");
    assert.equal(calls.length, 2);
    assert.equal(
      lower(calls[0].headers)["anthropic-usage-limit"],
      undefined,
      "not sent before the wall"
    );
    assert.equal(lower(calls[1].headers)["anthropic-usage-limit"], "slow", "sent on the retry");
    assert.equal(lower(calls[1].headers)["anthropic-dispatch-id"], undefined);

    // Next request on the same connection rides the lane from its first attempt.
    const again = await run("conn-lowpri", { lowPriorityMode: true });
    assert.equal(again.response.status, 200);
    assert.equal(calls.length, 3);
    assert.equal(lower(calls[2].headers)["anthropic-usage-limit"], "slow");
  } finally {
    restore();
  }
});

test("wall 429 without the opt-in → 429 surfaced untouched, header never sent", async () => {
  const { calls, restore } = mockFetch([() => wall429(), () => ok()]);
  try {
    const result = await run("conn-optout", {});
    assert.equal(result.response.status, 429);
    assert.equal(calls.length, 1);
    assert.equal(lower(calls[0].headers)["anthropic-usage-limit"], undefined);
  } finally {
    restore();
  }
});

test("control arm offer is not accepted even with the opt-in", async () => {
  const { calls, restore } = mockFetch([
    () => wall429({ "anthropic-ratelimit-unified-slow-offer": "control" }),
    () => ok(),
  ]);
  try {
    const result = await run("conn-control", { lowPriorityMode: true });
    assert.equal(result.response.status, 429);
    assert.equal(calls.length, 1);
  } finally {
    restore();
  }
});

test("lane state is per connection: another account still sees its own wall", async () => {
  const { calls, restore } = mockFetch([() => wall429(), () => ok(), () => wall429(), () => ok()]);
  try {
    await run("conn-a", { lowPriorityMode: true });
    assert.equal(calls.length, 2);
    // conn-b: first attempt has no header (idle), hits the wall, accepts, retries.
    const b = await run("conn-b", { lowPriorityMode: true });
    assert.equal(b.response.status, 200);
    assert.equal(lower(calls[2].headers)["anthropic-usage-limit"], undefined);
    assert.equal(lower(calls[3].headers)["anthropic-usage-limit"], "slow");
  } finally {
    restore();
  }
});

test("a wall 429 that only surfaces after a 400-driven intra-attempt retry is still intercepted", async () => {
  // The context-editing 400 fallback re-fetches the same URL and REPLACES `response`.
  // The usage-wall check must classify that final response, otherwise the offer is missed
  // and the 429 reaches chatCore, cooling the connection down — the exact opposite of
  // what lowPriorityMode is for.
  const badRequest = () =>
    new Response(JSON.stringify({ error: { message: "context_management not supported" } }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  const { calls, restore } = mockFetch([
    badRequest, // 1st: 400 → context-editing fallback re-fetches
    () => wall429(), // 2nd: the wall shows up only here
    () => ok({ "anthropic-ratelimit-unified-slow-status": "active" }), // 3rd: lane retry
  ]);
  try {
    const result = await run("conn-400-then-wall", { lowPriorityMode: true }, true);
    assert.equal(result.response.status, 200, "the late wall 429 was intercepted, not surfaced");
    assert.equal(calls.length, 3);
    assert.equal(lower(calls[1].headers)["anthropic-usage-limit"], undefined);
    assert.equal(lower(calls[2].headers)["anthropic-usage-limit"], "slow");
  } finally {
    restore();
  }
});

test("wall 429 + autoLimitReset → status + claim, then full-speed retry without the slow header", async () => {
  const claimUrl = "https://api.anthropic.com/api/organizations/org-uuid-1/reset_rate_limits";
  const hits: string[] = [];
  const { calls, restore } = mockFetch([() => wall429(), () => ok()], {
    [CLAUDE_LIMIT_RESET_STATUS_URL]: () => {
      hits.push("status");
      return new Response(
        JSON.stringify({
          juniper_tide: { eligible: true, in_experiment: true, arm: "reset", available: true },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    },
    [claimUrl]: () => {
      hits.push("claim");
      return new Response(JSON.stringify({ result: "reset", next_available_at: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  });
  try {
    const result = await run("conn-reset", {
      autoLimitReset: true,
      organizationUUID: "org-uuid-1",
    });
    assert.equal(result.response.status, 200);
    assert.deepEqual(hits, ["status", "claim"]);
    assert.equal(calls.length, 2);
    assert.equal(
      lower(calls[1].headers)["anthropic-usage-limit"],
      undefined,
      "full speed, no slow lane"
    );
  } finally {
    restore();
  }
});
