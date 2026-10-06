/**
 * Regression tests for the #7847-class pre-routing stall caused by the
 * conversation-tracker reconnect walk
 * (open-sse/services/conversationTracker.ts).
 *
 * findReconnectMatch evaluates every (start turn × duplicate anchor) pair and
 * walks the chain forward, computing an HMAC per step. On long coding-agent
 * histories (1000+ turns, heavily duplicated tool outputs) that walk is
 * O(starts × anchors × walkLength) with the turn's FULL text re-hashed at
 * every step — measured on production traffic as a 10-130 s synchronous
 * block on the request path (chat.ts resolves the conversation id in the
 * validate phase, before routing). These tests pin the two properties that
 * keep it bounded:
 *
 *   1. The walk charges a step budget and never exceeds it (pure, no DB).
 *   2. A duplicate-heavy long-history resolve completes in bounded wall time
 *      (DB-backed end-to-end through resolveConversationId).
 */

import test from "node:test";
import assert from "node:assert/strict";

import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-conv-7847-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "conversation-7847-test-secret";

// Dynamic imports: modules reading DATA_DIR at top level must evaluate after
// the override above (see conversationTracker.test.ts for the full rationale).
const tracker = await import("../../open-sse/services/conversationTracker.ts");
const { findReconnectMatch, resolveConversationId, hashTurnContent, DEFAULT_RECONNECT_MAX_STEPS } =
  tracker as {
    findReconnectMatch: typeof tracker.findReconnectMatch;
    resolveConversationId: typeof tracker.resolveConversationId;
    hashTurnContent: typeof tracker.hashTurnContent;
    DEFAULT_RECONNECT_MAX_STEPS: number;
  };
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  try {
    resetDbInstance();
  } catch {
    /* DB may already be closed */
  }
});

function turn(role: "user" | "assistant" | "tool", text: string) {
  return { role, text, blockKind: "text" as const, toolName: null };
}

test("findReconnectMatch is exported and enforces a step budget", () => {
  assert.equal(typeof findReconnectMatch, "function", "findReconnectMatch must be exported");
  assert.ok(
    DEFAULT_RECONNECT_MAX_STEPS > 0 && DEFAULT_RECONNECT_MAX_STEPS <= 500_000,
    "default budget must be a sane bounded constant"
  );

  // Adversarial shape: many turns, all with the same text ("ok" tool outputs),
  // and an index whose content-hash bucket holds many duplicate anchors —
  // each (start, anchor) pair invites a forward walk.
  const N = 400;
  const chainTurns = Array.from({ length: N }, (_, i) => turn(i % 2 === 0 ? "user" : "tool", "ok"));
  const okHash = hashTurnContent(turn("user", "ok"));
  const anchors = Array.from({ length: 40 }, (_, i) => `anchor-${i}`);
  const nodeIds = new Set<string>(anchors);
  const parentsWithChildren = new Set<string>();
  const index = {
    nodeIds,
    byContentHash: new Map([[okHash, anchors]]),
    parentsWithChildren,
  };

  const { stepsUsed } = findReconnectMatch(chainTurns, index, { maxSteps: 50 });
  assert.ok(stepsUsed <= 50, `budget must cap work (used ${stepsUsed})`);
});

test("findReconnectMatch: budget exhaustion degrades to no-match, never a wrong attach", () => {
  // A genuine 3-turn continuation that WOULD match with enough budget —
  // with maxSteps too small to verify even one step, the walker must return
  // no match (resolveConversationId then mints a new conversation) rather
  // than attaching to an unverified anchor.
  const t0 = turn("user", "hello");
  const t1 = turn("assistant", "hi");
  const t2 = turn("user", "do the thing");
  const h0 = hashTurnContent(t0);
  const h1 = hashTurnContent(t1);
  const h2 = hashTurnContent(t2);

  // Build a real 3-node chain: n1 -> n2 -> n3.
  const ids = (["", "n1", "n2", "n3"] as const).slice(0);
  const chain = (parent: string, hash: string) => `node:${parent}:${hash.slice(0, 8)}`;
  const n1 = chain("root", h0);
  const n2 = chain(n1, h1);
  const n3 = chain(n2, h2);

  const index = {
    nodeIds: new Set([n1, n2, n3]),
    byContentHash: new Map([
      [h0, [n1]],
      [h1, [n2]],
      [h2, [n3]],
    ]),
    parentsWithChildren: new Set([n1, n2]),
  };
  void ids;

  const full = findReconnectMatch([t0, t1, t2], index);
  assert.ok(full.match, "with the default budget the 3-turn continuation matches");
  assert.equal(full.match?.matchEndIndex, 3);

  const starved = findReconnectMatch([t0, t1, t2], index, { maxSteps: 0 });
  assert.equal(starved.match, null, "a zero budget must yield no match, not an unverified one");
});

test("resolveConversationId: duplicate-heavy long history resolves in bounded time (#7847)", async () => {
  // Shape mirrors production coding-agent traffic: ~800 turns where every
  // other turn is a byte-identical short tool output (the duplicate-anchor
  // amplifier the tracker's own docs describe) and the rest are large
  // file-content turns. The second request edits every large turn (a
  // cache-warm rewrite clients really do), so every duplicate start turn has
  // hundreds of stale anchors to walk past before giving up.
  const N = 800;
  const pad = "x".repeat(40 * 1024);
  const messages: Array<Record<string, unknown>> = [{ role: "system", content: "sys" }];
  for (let i = 0; i < N; i++) {
    if (i % 2 === 0) {
      messages.push({ role: "tool", tool_call_id: `c${i}`, content: "ok" });
    } else {
      messages.push({ role: "user", content: `file ${i}\n${pad}` });
    }
  }
  const body1 = { model: "big-pickle-7847", messages };
  const body2 = {
    model: "big-pickle-7847",
    messages: [
      messages[0],
      ...messages
        .slice(1)
        .map((m, idx) =>
          idx % 2 === 1
            ? { ...(m as object), content: `${(m as { content: string }).content} v2` }
            : m
        ),
    ],
  };

  const apiKeyId = "key-7847";
  const first = await resolveConversationId({
    body: body1,
    model: "big-pickle-7847",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: "corr-7847-1",
  });
  assert.equal(first.isNewConversation, true);

  const startedAt = Date.now();
  const second = await resolveConversationId({
    body: body2,
    model: "big-pickle-7847",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: "corr-7847-2",
  });
  const elapsedMs = Date.now() - startedAt;

  // Before the bound: ~10 s+ of synchronous HMAC work on this exact shape.
  // After: the walk is budget-capped and turn hashes are memoized, so the
  // whole resolve stays in the tens-of-milliseconds range. 2 s leaves ample
  // headroom for slow CI while still failing hard on a regression.
  assert.ok(
    elapsedMs < 2_000,
    `duplicate-heavy resolve took ${elapsedMs}ms (budget/memoization regression)`
  );

  // Editing every large turn diverges from the recorded chain — the tracker
  // must mint a new conversation for it, never attach to the stale one.
  assert.equal(second.isNewConversation, true);
  assert.notEqual(second.conversationId, first.conversationId);
});
