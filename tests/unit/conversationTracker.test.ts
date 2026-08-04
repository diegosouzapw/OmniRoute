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

import {
  extractCanonicalTurns,
  computeFingerprintHash,
  hashTurnsBounded,
  resolveConversationId,
} from "../../open-sse/services/conversationTracker.ts";
import {
  findAgenticConversationsByFingerprint,
} from "../../src/lib/db/agenticConversations.ts";

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
  assert.equal(turns[1].role, "tool");
  assert.equal(turns[2].role, "tool");
});

test("extractCanonicalTurns: Responses API bare-string input", () => {
  const turns = extractCanonicalTurns({ input: "just a string" });
  assert.equal(turns.length, 1);
  assert.equal(turns[0].role, "user");
  assert.equal(turns[0].text, "just a string");
});

test("computeFingerprintHash: same inputs produce the same hash", () => {
  const turns = extractCanonicalTurns({ messages: [{ role: "user", content: "hi" }] });
  const a = computeFingerprintHash({ apiKeyId: "key1", model: "gpt-4o", turns, toolNames: [] });
  const b = computeFingerprintHash({ apiKeyId: "key1", model: "gpt-4o", turns, toolNames: [] });
  assert.equal(a, b);
});

test("computeFingerprintHash: different apiKeyId or model changes the hash", () => {
  const turns = extractCanonicalTurns({ messages: [{ role: "user", content: "hi" }] });
  const base = computeFingerprintHash({ apiKeyId: "key1", model: "gpt-4o", turns, toolNames: [] });
  const diffKey = computeFingerprintHash({
    apiKeyId: "key2",
    model: "gpt-4o",
    turns,
    toolNames: [],
  });
  const diffModel = computeFingerprintHash({
    apiKeyId: "key1",
    model: "gpt-5",
    turns,
    toolNames: [],
  });
  assert.notEqual(base, diffKey);
  assert.notEqual(base, diffModel);
});

test("resolveConversationId: exact-match continuation reuses the same id", async () => {
  const apiKeyId = "key-exact";
  const turn1 = await resolveConversationId({
    body: { model: "big-pickle", messages: [{ role: "user", content: "hi there" }] },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
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
  });

  assert.equal(turn3.conversationId, turn1.conversationId);
});

test("resolveConversationId: divergent history mints a new id despite a shared fingerprint", async () => {
  const apiKeyId = "key-divergent";

  // Establish a real 2-turn conversation: turn1 (1 msg) then turn2 (3 msgs,
  // extending turn1's history) — this brings the stored candidate up to
  // lastMessageCount=3 with a real, specific history hash.
  const turn1 = await resolveConversationId({
    body: { model: "big-pickle", messages: [{ role: "user", content: "same first message" }] },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
  });
  const turn2 = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        { role: "user", content: "same first message" },
        { role: "assistant", content: "real reply" },
        { role: "user", content: "real follow-up" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
  });
  assert.equal(turn2.conversationId, turn1.conversationId);

  // Same fingerprint inputs (model/apiKeyId/first message/no tools) and the
  // SAME message count as the established candidate, but the actual content
  // beyond the shared first message never matches turn2's real history —
  // must NOT be merged into that conversation despite the length/fingerprint
  // match, proving the prefix-hash check (not just length/fingerprint) gates
  // identity.
  const divergent = await resolveConversationId({
    body: {
      model: "big-pickle",
      messages: [
        { role: "user", content: "same first message" },
        { role: "assistant", content: "a totally different reply than what actually happened" },
        { role: "user", content: "a follow-up that never occurred in the real history" },
      ],
    },
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
  });

  assert.notEqual(divergent.conversationId, turn1.conversationId);
  assert.equal(divergent.isNewConversation, true);

  // Both conversations really do share one fingerprint bucket — proves the
  // prefix check, not just the fingerprint, is what kept them separate.
  const turns = extractCanonicalTurns({ messages: [{ role: "user", content: "same first message" }] });
  const fingerprint = computeFingerprintHash({ apiKeyId, model: "big-pickle", turns, toolNames: [] });
  const candidates = findAgenticConversationsByFingerprint(fingerprint);
  assert.ok(candidates.length >= 2);
});

test("resolveConversationId: two independent single-message requests must NOT merge, even with byte-identical content", async () => {
  // Regression: a client retrying a failed request (or two genuinely separate
  // conversations opening with the same line, e.g. "hi") both arrive as a
  // single-message request. Before this fix, a same-length request whose
  // truncated-to-candidate-length hash trivially matched (since it IS the
  // candidate, verbatim) was accepted as a "continuation" — merging two
  // unrelated single-shot requests under one conversation id. A real
  // continuation always strictly grows the history (assistant reply + more),
  // so same-length must never match.
  const apiKeyId = "key-identical-singleshot";
  const body = { model: "big-pickle", messages: [{ role: "user", content: "hi" }] };

  const first = await resolveConversationId({
    body,
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
  });
  const second = await resolveConversationId({
    body,
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
  });
  const third = await resolveConversationId({
    body,
    model: "big-pickle",
    apiKeyId,
    clientSessionIdHeader: null,
  });

  assert.notEqual(second.conversationId, first.conversationId);
  assert.notEqual(third.conversationId, first.conversationId);
  assert.notEqual(third.conversationId, second.conversationId);
  assert.equal(first.isNewConversation, true);
  assert.equal(second.isNewConversation, true);
  assert.equal(third.isNewConversation, true);
});

test("resolveConversationId: client-supplied X-Omniroute-Session-Id wins outright", async () => {
  const headerValue = "client-pinned-session-abc";
  const first = await resolveConversationId({
    body: { model: "big-pickle", messages: [{ role: "user", content: "conversation A" }] },
    model: "big-pickle",
    apiKeyId: "key-header",
    clientSessionIdHeader: headerValue,
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
  });
  assert.equal(second.conversationId, headerValue);
});

test("hashTurnsBounded: documented blind spot — a genuinely untouched middle turn is invisible", () => {
  // hashTurnsBounded only inspects: total length, the role sequence, the
  // first 2 turns, and the last 3 turns. With 8 turns, index 3 falls in
  // neither the head (0-1) nor the tail (5-7) — changing ONLY that turn's
  // text, with everything else (including the role sequence) identical,
  // must produce an identical bounded hash. This pins the accepted
  // trade-off explicitly rather than relying on it silently.
  const build = (middleText: string) => [
    { role: "user" as const, text: "start-1" },
    { role: "assistant" as const, text: "start-2" },
    { role: "assistant" as const, text: "unchanged-a" },
    { role: "assistant" as const, text: middleText },
    { role: "assistant" as const, text: "unchanged-b" },
    { role: "assistant" as const, text: "tail-1" },
    { role: "assistant" as const, text: "tail-2" },
    { role: "assistant" as const, text: "tail-3" },
  ];
  assert.equal(
    hashTurnsBounded(build("middle-A")),
    hashTurnsBounded(build("middle-B-completely-different"))
  );
});
