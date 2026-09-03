/**
 * Unit tests for the agentic conversation tracker
 * (open-sse/services/conversationTracker.ts).
 */

import test from "node:test";
import assert from "node:assert/strict";

import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-conv-tracker-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "conversation-tracker-test-secret";

// Dynamic imports (not static) are required here: a static `import` of a module
// that reads process.env.DATA_DIR at its own top level (src/lib/db/core.ts's
// `export const DATA_DIR = ...`) is evaluated before this file's own top-level
// code runs — ESM instantiates the whole dependency graph, dependencies first,
// regardless of source-line order — so the override above would silently miss
// and the module would resolve the real host DATA_DIR instead of the temp dir.
const { extractCanonicalTurns, computeFingerprintHash, resolveConversationId, hashTurnContent } =
  await import("../../../open-sse/services/conversationTracker.ts");
const { getConversationTurnPage } = await import("../../../src/lib/db/agenticConversations.ts");

let correlationCounter = 0;
function nextCorrelationId(): string {
  correlationCounter += 1;
  return `corr-${correlationCounter}`;
}

// conversation_turn_nodes stores identity only (content_hash), never display
// text — see migration 156 and conversationTurnContent.ts. Tests that need
// to assert WHICH turns ended up on a chain compare content hashes instead
// of stored text.
function hashOfPlainTextTurn(role: "user" | "assistant" | "system" | "tool", text: string): string {
  return hashTurnContent({ role, text, blockKind: "text", toolName: null });
}

test("extractCanonicalTurns: OpenAI messages array", () => {
  const turns = extractCanonicalTurns({
    messages: [
      { role: "system", content: "be helpful" },
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello!" },
    ],
  });
  assert.deepEqual(
    turns.map((t) => t.role),
    ["system", "user", "assistant"]
  );
  assert.equal(turns[0].text, "be helpful");
});

test("extractCanonicalTurns: Responses API input array", () => {
  const turns = extractCanonicalTurns({
    input: [
      { role: "user", content: [{ type: "input_text", text: "check the file" }] },
      { type: "function_call", name: "exec", call_id: "c1", arguments: '{"command":"ls"}' },
      { type: "function_call_output", call_id: "c1", output: "ok" },
    ],
  });
  assert.equal(turns.length, 3);
  assert.equal(turns[0].role, "user");
  // Regression: content-block arrays (Responses API's `input_text`/
  // `output_text` shape) must extract their `.text`, not JSON.stringify the
  // whole block array — a raw JSON blob here directly becomes what
  // /dashboard/conversations renders as a turn's text.
  assert.equal(turns[0].text, "check the file");
  assert.equal(turns[1].role, "tool");
  // `arguments` here is already a JSON string (how OpenAI/Responses API send
  // tool-call arguments) — stringifyContent passes strings through as-is,
  // only the content-BLOCK-ARRAY case (turns[0] above) needed the fix.
  assert.equal(turns[1].text, '{"command":"ls"}');
  assert.equal(turns[2].role, "tool");
  assert.equal(turns[2].text, "ok");

  // blockKind/toolName let a consumer (the /dashboard/conversations tree)
  // build the same NormalizedBlock shape the request-detail panel already
  // builds, so tool calls/results render through the same ChatBubble/
  // MessageContent/ToolCallBlock/ToolResultBlock components everywhere.
  assert.equal(turns[0].blockKind, "text");
  assert.equal(turns[0].toolName, null);
  assert.equal(turns[1].blockKind, "tool_use");
  assert.equal(turns[1].toolName, "exec");
  assert.equal(turns[2].blockKind, "tool_result");
  assert.equal(turns[2].toolName, null);
});

test("extractCanonicalTurns: Chat Completions tool-result message (role: tool) classifies as tool_result", () => {
  const turns = extractCanonicalTurns({
    messages: [
      { role: "user", content: "what's the weather?" },
      { role: "tool", tool_call_id: "c1", content: '{"tempC":21}' },
    ],
  });
  assert.equal(turns[0].blockKind, "text");
  assert.equal(turns[1].role, "tool");
  assert.equal(turns[1].blockKind, "tool_result");
  assert.equal(turns[1].text, '{"tempC":21}');
});

test("extractCanonicalTurns: content-block arrays (Anthropic/Responses-API shape) extract text, not raw JSON", () => {
  const turns = extractCanonicalTurns({
    messages: [
      { role: "user", content: [{ type: "text", text: "hello there" }] },
      { role: "assistant", content: [{ type: "output_text", text: "hi back" }] },
    ],
  });
  assert.equal(turns[0].text, "hello there");
  assert.equal(turns[1].text, "hi back");
  assert.ok(!turns[0].text.includes("{"), "must not contain raw JSON");
  assert.ok(!turns[1].text.includes("{"), "must not contain raw JSON");
});

test("extractCanonicalTurns: Responses API bare-string input", () => {
  const turns = extractCanonicalTurns({ input: "just a string" });
  assert.equal(turns.length, 1);
  assert.equal(turns[0].role, "user");
  assert.equal(turns[0].text, "just a string");
});

test("computeFingerprintHash: same inputs produce the same hash", () => {
  const a = computeFingerprintHash({ apiKeyId: "key1", model: "gpt-4o", toolNames: [] });
  const b = computeFingerprintHash({ apiKeyId: "key1", model: "gpt-4o", toolNames: [] });
  assert.equal(a, b);
});

test("computeFingerprintHash: different apiKeyId or model changes the hash", () => {
  const base = computeFingerprintHash({ apiKeyId: "key1", model: "gpt-4o", toolNames: [] });
  const diffKey = computeFingerprintHash({ apiKeyId: "key2", model: "gpt-4o", toolNames: [] });
  const diffModel = computeFingerprintHash({ apiKeyId: "key1", model: "gpt-5", toolNames: [] });
  assert.notEqual(base, diffKey);
  assert.notEqual(base, diffModel);
});

test("computeFingerprintHash: identical apiKeyId/model/toolNames produce the same hash regardless of message content", () => {
  // The whole point of the fix: real OpenClaw traffic rotates its earliest
  // turns out of a sliding context window, so the bucket key must not
  // depend on message text at all — actual identity is decided later by the
  // turn-chain walk (real content overlap), not by this coarse bucket.
  const a = computeFingerprintHash({ apiKeyId: "key1", model: "gpt-4o", toolNames: ["exec"] });
  const b = computeFingerprintHash({ apiKeyId: "key1", model: "gpt-4o", toolNames: ["exec"] });
  assert.equal(a, b);
});

test("resolveConversationId: exact-match continuation reuses the same id", async () => {
  const apiKeyId = "key-exact";
  const turn1 = await resolveConversationId({
    body: { model: "big-pickle", messages: [{ role: "user", content: "hi there" }] },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });
  assert.equal(turn1.isNewConversation, true);

  const turn2 = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        { role: "user", content: "hi there" },
        { role: "assistant", content: "hello!" },
        { role: "user", content: "tell me more" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });
  assert.equal(turn2.conversationId, turn1.conversationId);
  assert.equal(turn2.isNewConversation, false);
});

test("resolveConversationId: prefix-match continuation across a longer history", async () => {
  const apiKeyId = "key-prefix";
  const turn1 = await resolveConversationId({
    body: { model: "big-pickle", messages: [{ role: "user", content: "prefix test start" }] },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });

  // Turn 3 resends the full history including turn 2's exchange — still a
  // continuation of turn 1's conversation even though it's grown further.
  const turn3 = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        { role: "user", content: "prefix test start" },
        { role: "assistant", content: "ack" },
        { role: "tool", content: "tool result" },
        { role: "assistant", content: "done" },
        { role: "user", content: "and one more thing" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });

  assert.equal(turn3.conversationId, turn1.conversationId);
});

test("resolveConversationId: an edited/duplicated mid-history turn mints its own independent conversation (2026-08-06 redesign — no forking)", async () => {
  // The scenario that originally motivated the hash-chain rewrite, and now
  // motivates the no-forking redesign: OpenClaw-style cache-aware context
  // injection edits turn `c` to `c'` and duplicates turn `i` with an
  // injected variant `i'` ahead of it, between two otherwise-related
  // requests:
  //   request 1: a b c  d e f g h i
  //   request 2: a b c' d e f g h i' i j k
  // `a`/`b` are byte-identical, but every OmniRoute conversation is a single
  // straight line — it never forks. So request 2 must become its OWN
  // independent conversation (not request1's), with its OWN complete chain
  // (a b c' d e f g h i' i j k), and request1's chain must stay untouched.
  const apiKeyId = "key-fork";
  const request1 = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        { role: "user", content: "a" },
        { role: "assistant", content: "b" },
        { role: "user", content: "c" },
        { role: "assistant", content: "d" },
        { role: "user", content: "e" },
        { role: "assistant", content: "f" },
        { role: "user", content: "g" },
        { role: "assistant", content: "h" },
        { role: "user", content: "i" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });
  assert.equal(request1.isNewConversation, true);

  const request2 = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        { role: "user", content: "a" },
        { role: "assistant", content: "b" },
        { role: "user", content: "c'" },
        { role: "assistant", content: "d" },
        { role: "user", content: "e" },
        { role: "assistant", content: "f" },
        { role: "user", content: "g" },
        { role: "assistant", content: "h" },
        { role: "user", content: "i'" },
        { role: "assistant", content: "i" },
        { role: "user", content: "j" },
        { role: "assistant", content: "k" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });

  // A distinct, brand-new conversation — not request1's.
  assert.notEqual(request2.conversationId, request1.conversationId);
  assert.equal(request2.isNewConversation, true);

  // request1's chain is completely untouched: still exactly its own 9 turns.
  const tree1 = getConversationTurnPage(request1.conversationId, { limit: 500 }).nodes;
  assert.equal(tree1.length, 9);
  assert.deepEqual(
    tree1.map((n) => n.contentHash).sort(),
    [
      hashOfPlainTextTurn("user", "a"),
      hashOfPlainTextTurn("assistant", "b"),
      hashOfPlainTextTurn("user", "c"),
      hashOfPlainTextTurn("assistant", "d"),
      hashOfPlainTextTurn("user", "e"),
      hashOfPlainTextTurn("assistant", "f"),
      hashOfPlainTextTurn("user", "g"),
      hashOfPlainTextTurn("assistant", "h"),
      hashOfPlainTextTurn("user", "i"),
    ].sort()
  );

  // request2's chain is its own complete, independent 12-turn history —
  // including its OWN copies of "a" and "b" (different node ids than
  // request1's, since each conversation's chain hashing is scoped to its
  // own conversation id), not references into request1's chain.
  const tree2 = getConversationTurnPage(request2.conversationId, { limit: 500 }).nodes;
  assert.equal(tree2.length, 12);
  assert.deepEqual(
    tree2.map((n) => n.contentHash).sort(),
    [
      hashOfPlainTextTurn("user", "a"),
      hashOfPlainTextTurn("assistant", "b"),
      hashOfPlainTextTurn("user", "c'"),
      hashOfPlainTextTurn("assistant", "d"),
      hashOfPlainTextTurn("user", "e"),
      hashOfPlainTextTurn("assistant", "f"),
      hashOfPlainTextTurn("user", "g"),
      hashOfPlainTextTurn("assistant", "h"),
      hashOfPlainTextTurn("user", "i'"),
      hashOfPlainTextTurn("assistant", "i"),
      hashOfPlainTextTurn("user", "j"),
      hashOfPlainTextTurn("assistant", "k"),
    ].sort()
  );

  const ids1 = new Set(tree1.map((n) => n.id));
  const ids2 = new Set(tree2.map((n) => n.id));
  for (const id of ids2) {
    assert.ok(!ids1.has(id), "the two conversations must not share any node ids");
  }

  // A repeat of request2's exact history continues request2 (not a THIRD
  // conversation) — the redesign doesn't mint a new id on every retry of an
  // already-diverged chain.
  const request2Retry = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        { role: "user", content: "a" },
        { role: "assistant", content: "b" },
        { role: "user", content: "c'" },
        { role: "assistant", content: "d" },
        { role: "user", content: "e" },
        { role: "assistant", content: "f" },
        { role: "user", content: "g" },
        { role: "assistant", content: "h" },
        { role: "user", content: "i'" },
        { role: "assistant", content: "i" },
        { role: "user", content: "j" },
        { role: "assistant", content: "k" },
        { role: "user", content: "l" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });
  assert.equal(request2Retry.conversationId, request2.conversationId);
  assert.equal(request2Retry.isNewConversation, false);
});

test("resolveConversationId: continuation is detected even when the system prompt is regenerated every turn (dynamic CLI boilerplate)", async () => {
  // Real coding-agent CLIs (Claude Code, opencode, etc.) commonly regenerate
  // the system prompt on EVERY request with live context (timestamp, cwd,
  // git status...). The chain must exclude the system message entirely, or
  // that volatility alone breaks continuation detection for real traffic —
  // every turn would mint a brand new conversation id, even though
  // apiKeyId/model/toolNames and the actual user/assistant history are
  // unchanged. Discovered live on a real deployment (#9315 follow-up): 28
  // consecutive requests from one growing session, each with turn_count=1.
  const apiKeyId = "key-volatile-system";
  const dynamicSystem = (n: number) =>
    `You are an agent. Current time: 2026-08-04T12:0${n}:00Z. cwd: /home/user/project`;

  const turn1 = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        { role: "system", content: dynamicSystem(0) },
        { role: "user", content: "please fix the bug in foo.ts" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });
  assert.equal(turn1.isNewConversation, true);

  const turn2 = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        // System prompt regenerated with a DIFFERENT timestamp — everything
        // else (apiKeyId, model, tool set, actual conversation content) is
        // identical/growing normally.
        { role: "system", content: dynamicSystem(1) },
        { role: "user", content: "please fix the bug in foo.ts" },
        { role: "assistant", content: "Sure, I'll look at it." },
        { role: "user", content: "thanks, also check bar.ts" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });

  assert.equal(
    turn2.conversationId,
    turn1.conversationId,
    "expected turn2 to be recognized as a continuation despite the regenerated system prompt"
  );
  assert.equal(turn2.isNewConversation, false);

  // The regenerated system prompt must never appear as a chain node.
  const tree = getConversationTurnPage(turn1.conversationId, { limit: 500 }).nodes;
  for (const node of tree) {
    assert.notEqual(node.role, "system");
  }
});

test("resolveConversationId: continuation is detected even when the earliest turns rotate out of a sliding context window (live OpenClaw traffic pattern)", async () => {
  // Discovered live on a real deployment: OpenClaw drops/summarizes the
  // EARLIEST turns as a session grows (to bound context size), so the
  // request's first non-system turn is a DIFFERENT piece of text on every
  // single request — not just an edited/duplicated turn somewhere in the
  // middle (that's the fork scenario above), but the very first turn the
  // fingerprint bucket used to anchor on. If the bucket depends on that text
  // at all, findAgenticConversationsByFingerprint returns zero candidates
  // and the turn-chain match never even runs — the conversation looks
  // "new" forever, the exact symptom this whole test file guards against.
  const apiKeyId = "key-sliding-window";
  const toolNames = ["exec"];

  const turn1 = await resolveConversationId({
    body: {
      model: "big-pickle",
      tools: [{ name: "exec" }],
      messages: [
        { role: "user", content: "turn-A-oldest" },
        { role: "assistant", content: "turn-B" },
        { role: "user", content: "turn-C-shared-tail" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });
  assert.equal(turn1.isNewConversation, true);

  // Turn 2: the oldest turns ("turn-A-oldest", "turn-B") are gone, replaced
  // by an unrelated summary — only "turn-C-shared-tail" onward survived.
  const turn2 = await resolveConversationId({
    body: {
      model: "big-pickle",
      tools: [{ name: "exec" }],
      messages: [
        { role: "user", content: "[context summary, unrelated to turn-A/turn-B text]" },
        { role: "user", content: "turn-C-shared-tail" },
        { role: "assistant", content: "turn-D" },
        { role: "user", content: "turn-E" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });

  assert.equal(
    turn2.conversationId,
    turn1.conversationId,
    "expected turn2 to be recognized as a continuation despite the first turn's text changing entirely"
  );
  assert.equal(turn2.isNewConversation, false);

  // Confirmed via the fingerprint itself: identical apiKeyId/model/toolNames
  // (the only inputs to computeFingerprintHash now) despite completely
  // different message content between the two requests.
  const fp1 = computeFingerprintHash({ apiKeyId, model: "big-pickle", toolNames });
  const fp2 = computeFingerprintHash({ apiKeyId, model: "big-pickle", toolNames });
  assert.equal(fp1, fp2);
});

test("resolveConversationId: continuation is detected even when the reconnect turn's content is duplicated earlier in the chain (tool-polling loop)", async () => {
  // Discovered live: real agentic traffic (a tool-polling loop, "ack"/"poll"
  // repeated many times — one real conversation had 28 byte-identical copies
  // of a single turn) leaves MANY existing nodes sharing the same content
  // hash. When a sliding context window means the new request's earliest
  // retained turn is one of these repeated turns, findReconnectMatch must
  // not just grab whichever occurrence happens to be tried first (the
  // oldest, per SQLite's insertion-order return) — that stale occurrence's
  // recorded next-turn differs from the new content, so it looks like a
  // divergence even though the TRUE tail occurrence (no recorded child yet)
  // would extend cleanly. This is what made a real conversation mint a
  // brand-new copy of its entire history on every single request instead of
  // ever reconnecting (2026-08-06).
  const apiKeyId = "key-dup-content";

  const turn1 = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        { role: "user", content: "start" },
        { role: "assistant", content: "a1" },
        { role: "user", content: "ack" },
        { role: "assistant", content: "poll" },
        { role: "user", content: "ack" },
        { role: "assistant", content: "poll" },
        { role: "user", content: "ack" },
        { role: "assistant", content: "poll" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });
  assert.equal(turn1.isNewConversation, true);

  // Sliding window: only the last "ack"/"poll" pair survived, followed by
  // genuinely new content. "ack" and "poll" each match 3 existing nodes.
  const turn2 = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        { role: "user", content: "ack" },
        { role: "assistant", content: "poll" },
        { role: "user", content: "brand new turn" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });

  assert.equal(
    turn2.conversationId,
    turn1.conversationId,
    "expected turn2 to reconnect to turn1's conversation via the TRUE tail occurrence of the repeated ack/poll turns, not mint a new one"
  );
  assert.equal(turn2.isNewConversation, false);

  const tree = getConversationTurnPage(turn1.conversationId, { limit: 500 }).nodes;
  assert.equal(
    tree.length,
    9,
    "the new turn should be appended, not a whole new duplicate history"
  );
  assert.ok(tree.some((n) => n.contentHash === hashOfPlainTextTurn("user", "brand new turn")));
});

test("resolveConversationId: different api keys never merge, even with byte-identical content", async () => {
  // Fingerprint isolation (apiKeyId is part of computeFingerprintHash) is
  // the actual multi-tenant boundary — must hold regardless of the turn
  // chain's own content-addressing.
  const body = { model: "big-pickle", messages: [{ role: "user", content: "hi" }] };

  const first = await resolveConversationId({
    body,
    model: "big-pickle",
    apiKeyId: "key-tenant-a",
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });
  const second = await resolveConversationId({
    body,
    model: "big-pickle",
    apiKeyId: "key-tenant-b",
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });

  assert.notEqual(second.conversationId, first.conversationId);

  const fingerprintA = computeFingerprintHash({
    apiKeyId: "key-tenant-a",
    model: "big-pickle",
    toolNames: [],
  });
  const fingerprintB = computeFingerprintHash({
    apiKeyId: "key-tenant-b",
    model: "big-pickle",
    toolNames: [],
  });
  assert.notEqual(fingerprintA, fingerprintB);
});

test("resolveConversationId: a byte-identical repeat of a single-turn request continues the same conversation", async () => {
  // Content-addressed nodes mean a byte-identical opener from the SAME
  // apiKey/model (a client retry, or a genuinely separate session that also
  // just says "hi") fully matches the existing 1-turn chain — nothing
  // diverges (there's no turn afterward to disagree on yet), so this is a
  // real continuation, not a fork candidate at all.
  const apiKeyId = "key-repeated-singleshot";
  const body = { model: "big-pickle", messages: [{ role: "user", content: "hi" }] };

  const first = await resolveConversationId({
    body,
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });
  const second = await resolveConversationId({
    body,
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
    correlationId: nextCorrelationId(),
  });

  assert.equal(first.isNewConversation, true);
  assert.equal(second.conversationId, first.conversationId);
  assert.equal(second.isNewConversation, false);

  const tree = getConversationTurnPage(first.conversationId, { limit: 500 }).nodes;
  assert.equal(tree.length, 1);
});

test("resolveConversationId: client-supplied X-Omniroute-Session-Id wins outright", async () => {
  const headerValue = "client-pinned-session-abc";
  const first = await resolveConversationId({
    body: { model: "big-pickle", messages: [{ role: "user", content: "conversation A" }] },
    model: "big-pickle",
    apiKeyId: "key-header",
    clientSessionIdHeader: headerValue,
    correlationId: nextCorrelationId(),
  });
  assert.equal(first.conversationId, headerValue);

  // A second, otherwise-unrelated conversation sending the SAME header value
  // merges under that one id — the header is authoritative, no heuristic
  // check runs at all.
  const second = await resolveConversationId({
    body: { model: "gpt-4o", messages: [{ role: "user", content: "conversation B, unrelated" }] },
    model: "gpt-4o",
    apiKeyId: "key-header-2",
    clientSessionIdHeader: headerValue,
    correlationId: nextCorrelationId(),
  });
  assert.equal(second.conversationId, headerValue);
});

// The old 8000-char text_preview truncation (and the JSON-validity-after-
// truncation concern it required) no longer applies: conversation_turn_nodes
// stores identity only, never turn text (migration 156) — display content is
// always resolved fresh, full and untruncated, from the call-log artifact
// (see conversationTurnContent.test.ts).
