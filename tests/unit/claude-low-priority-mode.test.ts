/**
 * Claude OAuth lower-priority lane — pure state machine (open-sse/services/claudeLowPriority.ts).
 *
 * Mirrors the Claude Code 2.1.263 /low-priority contract: the lane is accepted only on a
 * 5-hour wall 429 that carries `anthropic-ratelimit-unified-slow-offer: treatment`, is
 * opt-in per connection, sends `anthropic-usage-limit: slow` only while active, waits on
 * slot_busy/529 inside slow-max-wait, and ends on terminal verdicts / window rollover.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  CLAUDE_LOW_PRIORITY_DEFAULTS,
  _resetClaudeLowPriorityState,
  createClaudeLowPriorityWait,
  getClaudeLowPrioritySnapshot,
  handleClaudeUsageLimitResponse,
  isClaudeLowPriorityActive,
  observeClaudeLowPriorityResponse,
  parseClaudeSlowOffer,
  parseClaudeSlowStatus,
  readClaudeUsageLimitConfig,
  resolveClaudeUsageLimitKey,
  tryActivateClaudeLowPriority,
} from "../../open-sse/services/claudeLowPriority.ts";

const NOW = 1_800_000_000_000; // fixed clock (ms)
const RESET_AT = Math.floor(NOW / 1000) + 3600; // 5h window resets in one hour

function wall429Headers(extra: Record<string, string> = {}): Record<string, string> {
  return {
    "anthropic-ratelimit-unified-status": "rejected",
    "anthropic-ratelimit-unified-reset": String(RESET_AT),
    "anthropic-ratelimit-unified-representative-claim": "five_hour",
    "anthropic-ratelimit-unified-slow-offer": "treatment",
    "anthropic-ratelimit-unified-slow-retry-after": "20",
    "anthropic-ratelimit-unified-slow-max-wait": "1200",
    ...extra,
  };
}

const BOTH_ON = { lowPriorityMode: true, autoLimitReset: false };
const OFF = { lowPriorityMode: false, autoLimitReset: false };

test.beforeEach(() => _resetClaudeLowPriorityState());

test("readClaudeUsageLimitConfig: both opt-ins default to off and only accept real booleans", () => {
  assert.deepEqual(readClaudeUsageLimitConfig(undefined), OFF);
  assert.deepEqual(readClaudeUsageLimitConfig({}), OFF);
  assert.deepEqual(readClaudeUsageLimitConfig({ lowPriorityMode: "true" }), OFF);
  assert.deepEqual(readClaudeUsageLimitConfig({ lowPriorityMode: true, autoLimitReset: true }), {
    lowPriorityMode: true,
    autoLimitReset: true,
  });
});

test("resolveClaudeUsageLimitKey prefers the connection id over the token", () => {
  assert.equal(resolveClaudeUsageLimitKey({ connectionId: "c1", accessToken: "t" }), "c1");
  assert.equal(resolveClaudeUsageLimitKey({ accessToken: "sk-ant-oat-x" }), "sk-ant-oat-x");
  assert.equal(resolveClaudeUsageLimitKey({}), "anon");
});

test("header parsers accept Headers objects and plain records (case-insensitive)", () => {
  const h = new Headers({ "Anthropic-Ratelimit-Unified-Slow-Offer": "treatment" });
  assert.equal(parseClaudeSlowOffer(h), "treatment");
  assert.equal(
    parseClaudeSlowOffer({ "Anthropic-Ratelimit-Unified-Slow-Offer": "control" }),
    "control"
  );
  assert.equal(
    parseClaudeSlowOffer({ "anthropic-ratelimit-unified-slow-offer": "bogus" }),
    undefined
  );
  assert.equal(
    parseClaudeSlowStatus({ "anthropic-ratelimit-unified-slow-status": "slot_busy" }),
    "slot_busy"
  );
  assert.equal(
    parseClaudeSlowStatus({ "anthropic-ratelimit-unified-slow-status": "???" }),
    "unrecognized"
  );
  assert.equal(parseClaudeSlowStatus({}), undefined);
});

test("lane is idle until the first wall 429: no header before the limit is hit", () => {
  assert.equal(isClaudeLowPriorityActive("c1", NOW), false);
  assert.equal(getClaudeLowPrioritySnapshot("c1", NOW).active, false);
});

test("activation requires the treatment offer AND a future reset", () => {
  assert.equal(
    tryActivateClaudeLowPriority(
      "c1",
      wall429Headers({ "anthropic-ratelimit-unified-slow-offer": "control" }),
      NOW
    ),
    false
  );
  assert.equal(
    tryActivateClaudeLowPriority("c1", { "anthropic-ratelimit-unified-status": "rejected" }, NOW),
    false
  );
  assert.equal(
    tryActivateClaudeLowPriority(
      "c1",
      wall429Headers({ "anthropic-ratelimit-unified-reset": String(Math.floor(NOW / 1000) - 5) }),
      NOW
    ),
    false
  );
  assert.equal(tryActivateClaudeLowPriority("c1", wall429Headers(), NOW), true);
  assert.equal(isClaudeLowPriorityActive("c1", NOW), true);
  // Re-activating an active lane is a no-op.
  assert.equal(tryActivateClaudeLowPriority("c1", wall429Headers(), NOW), false);
  const snap = getClaudeLowPrioritySnapshot("c1", NOW);
  assert.equal(snap.resetsAtSeconds, RESET_AT);
  assert.equal(snap.retryAfterMs, 20_000);
  assert.equal(snap.maxWaitMs, 1_200_000);
});

test("retry-after / max-wait hints are clamped to Claude Code's bounds", () => {
  tryActivateClaudeLowPriority(
    "c1",
    wall429Headers({
      "anthropic-ratelimit-unified-slow-retry-after": "1", // below 5s floor
      "anthropic-ratelimit-unified-slow-max-wait": "999999", // above 6h ceiling
    }),
    NOW
  );
  const snap = getClaudeLowPrioritySnapshot("c1", NOW);
  assert.equal(snap.retryAfterMs, CLAUDE_LOW_PRIORITY_DEFAULTS.retryAfterMinMs);
  assert.equal(snap.maxWaitMs, CLAUDE_LOW_PRIORITY_DEFAULTS.maxWaitMaxMs);
});

test("lane expires lazily 60s after the announced reset", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const justBefore = RESET_AT * 1000 + CLAUDE_LOW_PRIORITY_DEFAULTS.resetGraceMs - 1;
  assert.equal(isClaudeLowPriorityActive("c1", justBefore), true);
  assert.equal(isClaudeLowPriorityActive("c1", justBefore + 1), false);
});

test("handle: idle + wall 429 + opt-in → accept offer and retry immediately (no cooldown)", async () => {
  const wait = createClaudeLowPriorityWait();
  const decision = await handleClaudeUsageLimitResponse({
    key: "c1",
    config: BOTH_ON,
    response: { status: 429, headers: wall429Headers() },
    wait,
    now: NOW,
  });
  assert.deepEqual(decision, { kind: "retry", delayMs: 0, via: "low-priority-accepted" });
  assert.equal(isClaudeLowPriorityActive("c1", NOW), true);
});

test("handle: opt-out connection ignores the offer (429 flows to the normal cooldown path)", async () => {
  const decision = await handleClaudeUsageLimitResponse({
    key: "c1",
    config: OFF,
    response: { status: 429, headers: wall429Headers() },
    wait: createClaudeLowPriorityWait(),
    now: NOW,
  });
  assert.deepEqual(decision, { kind: "none" });
  assert.equal(isClaudeLowPriorityActive("c1", NOW), false);
});

test("handle: a burst 429 without unified wall headers is not the usage wall", async () => {
  const decision = await handleClaudeUsageLimitResponse({
    key: "c1",
    config: BOTH_ON,
    response: { status: 429, headers: { "retry-after": "3" } },
    wait: createClaudeLowPriorityWait(),
    now: NOW,
  });
  assert.deepEqual(decision, { kind: "none" });
});

test("handle: limit-reset is tried before the slow lane and wins when it succeeds", async () => {
  let claims = 0;
  const decision = await handleClaudeUsageLimitResponse({
    key: "c1",
    config: { lowPriorityMode: true, autoLimitReset: true },
    response: { status: 429, headers: wall429Headers() },
    wait: createClaudeLowPriorityWait(),
    claimLimitReset: async () => {
      claims++;
      return true;
    },
    now: NOW,
  });
  assert.equal(claims, 1);
  assert.deepEqual(decision, { kind: "retry", delayMs: 0, via: "limit-reset" });
  assert.equal(isClaudeLowPriorityActive("c1", NOW), false, "full-speed reset → no slow lane");
});

test("handle: failed limit-reset falls back to the slow lane; a throwing claim is contained", async () => {
  const d1 = await handleClaudeUsageLimitResponse({
    key: "c1",
    config: { lowPriorityMode: true, autoLimitReset: true },
    response: { status: 429, headers: wall429Headers() },
    wait: createClaudeLowPriorityWait(),
    claimLimitReset: async () => false,
    now: NOW,
  });
  assert.deepEqual(d1, { kind: "retry", delayMs: 0, via: "low-priority-accepted" });
  _resetClaudeLowPriorityState();
  const d2 = await handleClaudeUsageLimitResponse({
    key: "c1",
    config: { lowPriorityMode: true, autoLimitReset: true },
    response: { status: 429, headers: wall429Headers() },
    wait: createClaudeLowPriorityWait(),
    claimLimitReset: async () => {
      throw new Error("network");
    },
    now: NOW,
  });
  assert.deepEqual(d2, { kind: "retry", delayMs: 0, via: "low-priority-accepted" });
});

test("handle: limit-reset is skipped when the wall blames a non-5h window", async () => {
  let claims = 0;
  await handleClaudeUsageLimitResponse({
    key: "c1",
    config: { lowPriorityMode: false, autoLimitReset: true },
    response: {
      status: 429,
      headers: wall429Headers({ "anthropic-ratelimit-unified-representative-claim": "seven_day" }),
    },
    wait: createClaudeLowPriorityWait(),
    claimLimitReset: async () => {
      claims++;
      return true;
    },
    now: NOW,
  });
  assert.equal(claims, 0);
});

test("active: 2xx with slow-status active/not_needed keeps the lane and counts requests", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const wait = createClaudeLowPriorityWait();
  assert.deepEqual(
    observeClaudeLowPriorityResponse(
      "c1",
      { status: 200, headers: { "anthropic-ratelimit-unified-slow-status": "active" } },
      wait,
      NOW + 1000
    ),
    { kind: "none" }
  );
  assert.deepEqual(
    observeClaudeLowPriorityResponse(
      "c1",
      { status: 200, headers: { "anthropic-ratelimit-unified-slow-status": "not_needed" } },
      wait,
      NOW + 2000
    ),
    { kind: "none" }
  );
  const snap = getClaudeLowPrioritySnapshot("c1", NOW + 2000);
  assert.equal(snap.active, true);
  assert.equal(snap.requestsServed, 1);
  assert.equal(snap.requestsServedStandard, 1);
});

test("active: slot_busy 429 → jittered retry-after wait, same account, until max-wait then cool-off", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const wait = createClaudeLowPriorityWait();
  const busy = { status: 429, headers: { "anthropic-ratelimit-unified-slow-status": "slot_busy" } };

  const d1 = observeClaudeLowPriorityResponse("c1", busy, wait, NOW, () => 0.5); // jitter factor 1.0
  assert.deepEqual(d1, { kind: "retry", delayMs: 20_000, via: "slot-busy" });
  const d2 = observeClaudeLowPriorityResponse("c1", busy, wait, NOW + 20_000, () => 1); // +30%
  assert.deepEqual(d2, { kind: "retry", delayMs: 26_000, via: "slot-busy" });
  assert.equal(wait.current?.attempts, 2);

  // Past slow-max-wait (20 min) → give up: lane ends, 10-minute cool-off blocks re-acceptance.
  const late = NOW + CLAUDE_LOW_PRIORITY_DEFAULTS.maxWaitMs;
  const d3 = observeClaudeLowPriorityResponse("c1", busy, wait, late);
  assert.deepEqual(d3, { kind: "ended", reason: "max_wait" });
  assert.equal(isClaudeLowPriorityActive("c1", late), false);
  assert.equal(
    tryActivateClaudeLowPriority(
      "c1",
      wall429Headers({
        "anthropic-ratelimit-unified-reset": String(Math.floor(late / 1000) + 3600),
      }),
      late + 1000
    ),
    false
  );
  assert.equal(
    tryActivateClaudeLowPriority(
      "c1",
      wall429Headers({
        "anthropic-ratelimit-unified-reset": String(Math.floor(late / 1000) + 3600),
      }),
      late + CLAUDE_LOW_PRIORITY_DEFAULTS.cooloffMs
    ),
    true
  );
});

test("active: 529 while the lane is active is a capacity wait, not a failure", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const wait = createClaudeLowPriorityWait();
  const d = observeClaudeLowPriorityResponse(
    "c1",
    { status: 529, headers: {} },
    wait,
    NOW,
    () => 0.5
  );
  assert.deepEqual(d, { kind: "retry", delayMs: 20_000, via: "capacity-busy" });
});

test("active: terminal verdicts end the lane and let the 429 reach the cooldown path", () => {
  for (const [status, reason] of [
    ["weekly_limit", "weekly"],
    ["budget_exhausted", "budget"],
    ["off", "off"],
    ["ineligible", "ineligible"],
  ] as const) {
    _resetClaudeLowPriorityState();
    tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
    const d = observeClaudeLowPriorityResponse(
      "c1",
      { status: 429, headers: { "anthropic-ratelimit-unified-slow-status": status } },
      createClaudeLowPriorityWait(),
      NOW
    );
    assert.deepEqual(d, { kind: "ended", reason }, status);
    assert.equal(isClaudeLowPriorityActive("c1", NOW), false, status);
  }
});

test("active: ineligible + overage-in-use ends as extra_usage on a 429 too, not plain ineligible", () => {
  // The wall verdict normally arrives ON the 429, so the overage takeover must win over
  // the generic `ineligible` mapping there — extra_usage is the state the rest of the
  // codebase keys on (src/lib/providers/claudeExtraUsage.ts).
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const d = observeClaudeLowPriorityResponse(
    "c1",
    {
      status: 429,
      headers: {
        "anthropic-ratelimit-unified-slow-status": "ineligible",
        "anthropic-ratelimit-unified-overage-in-use": "true",
      },
    },
    createClaudeLowPriorityWait(),
    NOW
  );
  assert.deepEqual(d, { kind: "ended", reason: "extra_usage" });
  assert.equal(isClaudeLowPriorityActive("c1", NOW), false);
});

test("active: overage-in-use false or absent keeps the plain ineligible verdict", () => {
  for (const extra of [{}, { "anthropic-ratelimit-unified-overage-in-use": "false" }]) {
    _resetClaudeLowPriorityState();
    tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
    const d = observeClaudeLowPriorityResponse(
      "c1",
      {
        status: 429,
        headers: { "anthropic-ratelimit-unified-slow-status": "ineligible", ...extra },
      },
      createClaudeLowPriorityWait(),
      NOW
    );
    assert.deepEqual(d, { kind: "ended", reason: "ineligible" });
  }
});

test("active: waitCeilingMs caps the wait so the caller's own timeout cannot abort it mid-sleep", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW); // retry-after 20s, max-wait 20min
  const wait = createClaudeLowPriorityWait();
  const busy = { status: 429, headers: { "anthropic-ratelimit-unified-slow-status": "slot_busy" } };

  // Ceiling below the server's retry-after: the sleep is clamped to what is left.
  const d1 = observeClaudeLowPriorityResponse("c1", busy, wait, NOW, () => 0.5, 8_000);
  assert.deepEqual(d1, { kind: "retry", delayMs: 8_000, via: "slot-busy" });

  // Ceiling reached → graceful max_wait end (+ cool-off), never a mid-sleep abort.
  const d2 = observeClaudeLowPriorityResponse("c1", busy, wait, NOW + 8_000, () => 0.5, 8_000);
  assert.deepEqual(d2, { kind: "ended", reason: "max_wait" });
  assert.equal(isClaudeLowPriorityActive("c1", NOW + 8_000), false);

  // A ceiling of 0 (budget already spent) gives up immediately instead of sleeping.
  _resetClaudeLowPriorityState();
  tryActivateClaudeLowPriority("c2", wall429Headers(), NOW);
  const d3 = observeClaudeLowPriorityResponse(
    "c2",
    busy,
    createClaudeLowPriorityWait(),
    NOW,
    () => 0.5,
    0
  );
  assert.deepEqual(d3, { kind: "ended", reason: "max_wait" });
});

test("active: no ceiling keeps the server-announced max-wait semantics", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const wait = createClaudeLowPriorityWait();
  const busy = { status: 429, headers: { "anthropic-ratelimit-unified-slow-status": "slot_busy" } };
  assert.deepEqual(
    observeClaudeLowPriorityResponse("c1", busy, wait, NOW, () => 0.5),
    {
      kind: "retry",
      delayMs: 20_000,
      via: "slot-busy",
    }
  );
});

test("active: budget_exhausted remembers the spent budget until its announced reset", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const budgetReset = Math.floor(NOW / 1000) + 2 * 86_400;
  observeClaudeLowPriorityResponse(
    "c1",
    {
      status: 429,
      headers: {
        "anthropic-ratelimit-unified-slow-status": "budget_exhausted",
        "anthropic-ratelimit-unified-slow-budget-reset": String(budgetReset),
      },
    },
    createClaudeLowPriorityWait(),
    NOW
  );
  assert.equal(getClaudeLowPrioritySnapshot("c1", NOW).budgetSpentUntilSeconds, budgetReset);
  const fresh = wall429Headers({ "anthropic-ratelimit-unified-reset": String(budgetReset + 3600) });
  assert.equal(
    tryActivateClaudeLowPriority("c1", fresh, NOW + 60_000),
    false,
    "budget spent → no re-accept"
  );
  assert.equal(tryActivateClaudeLowPriority("c1", fresh, budgetReset * 1000 + 1), true);
});

test("active: a 429 wall verdict without slow status (weekly window closed) ends the lane", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const d = observeClaudeLowPriorityResponse(
    "c1",
    {
      status: 429,
      headers: {
        "anthropic-ratelimit-unified-status": "rejected",
        "anthropic-ratelimit-unified-representative-claim": "seven_day",
      },
    },
    createClaudeLowPriorityWait(),
    NOW
  );
  assert.deepEqual(d, { kind: "ended", reason: "wall" });
});

test("active: a plain 429 without unified headers is left to the generic retry path", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const d = observeClaudeLowPriorityResponse(
    "c1",
    { status: 429, headers: {} },
    createClaudeLowPriorityWait(),
    NOW
  );
  assert.deepEqual(d, { kind: "none" });
  assert.equal(isClaudeLowPriorityActive("c1", NOW), true);
});

test("active: 5h window rollover announced on a 2xx ends the lane (header dropped next request)", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const d = observeClaudeLowPriorityResponse(
    "c1",
    { status: 200, headers: { "anthropic-ratelimit-unified-5h-reset": String(RESET_AT + 60) } },
    createClaudeLowPriorityWait(),
    NOW
  );
  assert.deepEqual(d, { kind: "ended", reason: "reset" });
  assert.equal(isClaudeLowPriorityActive("c1", NOW), false);
});

test("active: ineligible + overage-in-use → extra usage now covers the wall, lane ends", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const d = observeClaudeLowPriorityResponse(
    "c1",
    {
      status: 200,
      headers: {
        "anthropic-ratelimit-unified-slow-status": "ineligible",
        "anthropic-ratelimit-unified-overage-in-use": "true",
      },
    },
    createClaudeLowPriorityWait(),
    NOW
  );
  assert.deepEqual(d, { kind: "ended", reason: "extra_usage" });
});

test("raced activation: a header-less sibling's wall 429 joins the lane instead of ending it", async () => {
  // Request A activated the lane; request B was built while the lane was idle (no header)
  // and now comes back with the same wall 429 — it must NOT be read as a lane verdict.
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  const wait = createClaudeLowPriorityWait();
  const d = await handleClaudeUsageLimitResponse({
    key: "c1",
    config: BOTH_ON,
    response: { status: 429, headers: wall429Headers() },
    wait,
    sentSlow: false,
    now: NOW + 10,
  });
  assert.deepEqual(d, { kind: "retry", delayMs: 0, via: "low-priority-accepted" });
  assert.equal(isClaudeLowPriorityActive("c1", NOW + 10), true, "lane survives the sibling 429");

  // A header-less 2xx while active is not lane telemetry either.
  const d2 = await handleClaudeUsageLimitResponse({
    key: "c1",
    config: BOTH_ON,
    response: { status: 200, headers: { "anthropic-ratelimit-unified-slow-status": "active" } },
    wait,
    sentSlow: false,
    now: NOW + 20,
  });
  assert.deepEqual(d2, { kind: "none" });
  assert.equal(getClaudeLowPrioritySnapshot("c1", NOW + 20).requestsServed, 0);

  // With the header sent (default), the same wall 429 without a slow verdict IS a wall → end.
  const d3 = await handleClaudeUsageLimitResponse({
    key: "c1",
    config: BOTH_ON,
    response: { status: 429, headers: wall429Headers() },
    wait,
    sentSlow: true,
    now: NOW + 30,
  });
  assert.deepEqual(d3, { kind: "ended", reason: "wall" });
});

test("state is per connection", () => {
  tryActivateClaudeLowPriority("c1", wall429Headers(), NOW);
  assert.equal(isClaudeLowPriorityActive("c1", NOW), true);
  assert.equal(isClaudeLowPriorityActive("c2", NOW), false);
});
