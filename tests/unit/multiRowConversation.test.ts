/**
 * Unit tests for src/mitm/inspector/multiRowConversation.ts — the delta
 * algorithm that reconstructs a chronological, per-row-tagged transcript
 * across every call_logs row of one agentic conversation.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { buildMultiRowConversation } from "../../src/mitm/inspector/multiRowConversation.ts";

test("buildMultiRowConversation: 3-row conversation with a tool call in the middle", () => {
  const rows = [
    {
      id: "A",
      timestamp: "2026-01-01T10:00:00.000Z",
      requestBody: { messages: [{ role: "user", content: "user1" }] },
      responseBody: { choices: [{ message: { role: "assistant", content: "assistant1" } }] },
    },
    {
      id: "B",
      timestamp: "2026-01-01T10:01:00.000Z",
      requestBody: {
        messages: [
          { role: "user", content: "user1" },
          { role: "assistant", content: "assistant1" },
          { role: "tool", content: "tool_result1" },
          { role: "user", content: "user2" },
        ],
      },
      responseBody: { choices: [{ message: { role: "assistant", content: "assistant2" } }] },
    },
    {
      id: "C",
      timestamp: "2026-01-01T10:02:00.000Z",
      requestBody: {
        messages: [
          { role: "user", content: "user1" },
          { role: "assistant", content: "assistant1" },
          { role: "tool", content: "tool_result1" },
          { role: "user", content: "user2" },
          { role: "assistant", content: "assistant2" },
        ],
      },
      responseBody: { choices: [{ message: { role: "assistant", content: "assistant3" } }] },
    },
  ];

  const turns = buildMultiRowConversation(rows);

  // Row A contributes: user1, assistant1
  // Row B contributes: tool_result1, user2, assistant2 (new request turns + its own response)
  // Row C contributes: assistant3 only (no new request turns — request already
  // equals the running total after row B)
  assert.deepEqual(
    turns.map((t) => ({ sourceCallLogId: t.sourceCallLogId, role: t.role })),
    [
      { sourceCallLogId: "A", role: "user" },
      { sourceCallLogId: "A", role: "assistant" },
      { sourceCallLogId: "B", role: "tool" },
      { sourceCallLogId: "B", role: "user" },
      { sourceCallLogId: "B", role: "assistant" },
      { sourceCallLogId: "C", role: "assistant" },
    ]
  );

  // Every turn carries the ISO timestamp of its own originating row.
  assert.equal(turns[0].timestamp, "2026-01-01T10:00:00.000Z");
  assert.equal(turns[2].timestamp, "2026-01-01T10:01:00.000Z");
  assert.equal(turns[5].timestamp, "2026-01-01T10:02:00.000Z");
});

test("buildMultiRowConversation: single-row conversation", () => {
  const rows = [
    {
      id: "solo",
      timestamp: "2026-01-01T10:00:00.000Z",
      requestBody: { messages: [{ role: "user", content: "hi" }] },
      responseBody: { choices: [{ message: { role: "assistant", content: "hello" } }] },
    },
  ];

  const turns = buildMultiRowConversation(rows);
  assert.equal(turns.length, 2);
  assert.equal(turns[0].role, "user");
  assert.equal(turns[0].sourceCallLogId, "solo");
  assert.equal(turns[1].role, "assistant");
  assert.equal(turns[1].sourceCallLogId, "solo");
});

test("buildMultiRowConversation: a later row that is NOT a superset (malformed/adversarial) clamps instead of throwing", () => {
  const rows = [
    {
      id: "A",
      timestamp: "2026-01-01T10:00:00.000Z",
      requestBody: {
        messages: [
          { role: "user", content: "user1" },
          { role: "assistant", content: "assistant1" },
          { role: "user", content: "user2" },
        ],
      },
      responseBody: { choices: [{ message: { role: "assistant", content: "assistant2" } }] },
    },
    {
      // Shorter request than row A's total (4) despite sharing the same
      // conversation id somehow — should never happen given
      // resolveConversationId's strict-growth guarantee, but must not throw
      // or produce a negative-length slice.
      id: "B",
      timestamp: "2026-01-01T10:01:00.000Z",
      requestBody: { messages: [{ role: "user", content: "user1" }] },
      responseBody: { choices: [{ message: { role: "assistant", content: "assistant3" } }] },
    },
  ];

  assert.doesNotThrow(() => buildMultiRowConversation(rows));
  const turns = buildMultiRowConversation(rows);
  // Row B's own response is still included; it just contributes no new
  // request turns since it's shorter than what's already been seen.
  assert.ok(turns.some((t) => t.sourceCallLogId === "B"));
});

test("buildMultiRowConversation: empty rows array returns an empty transcript", () => {
  assert.deepEqual(buildMultiRowConversation([]), []);
});

test("buildMultiRowConversation: a truncated request body (>8KB, dropped by truncateForLog) shows a placeholder instead of silently only the response", () => {
  // Live bug: a request with a long real history (332 messages) got its
  // requestBody replaced by open-sse/handlers/chatCore/logTruncation.ts's
  // truncateForLog() with a bare {_truncated, _originalBytes, messageCount,
  // ...} summary once it crossed ~8KB — which is the norm, not the
  // exception, for any conversation with real substance. Before this fix,
  // buildRequestTurns() found nothing to parse and the transcript silently
  // rendered only that row's own response — looking exactly like "just the
  // last line" of what was actually a long chain.
  const rows = [
    {
      id: "big",
      timestamp: "2026-01-01T10:00:00.000Z",
      requestBody: {
        _truncated: true,
        _originalBytes: 263193,
        model: "big-pickle",
        stream: true,
        messageCount: 332,
      },
      responseBody: { choices: [{ message: { role: "assistant", content: "final reply" } }] },
    },
  ];

  const turns = buildMultiRowConversation(rows);
  assert.equal(turns.length, 2, "expected a placeholder turn plus the response turn");
  assert.equal(turns[0].role, "system");
  assert.equal(turns[0].sourceCallLogId, "big");
  assert.match(turns[0].blocks[0].type === "text" ? turns[0].blocks[0].text : "", /332/);
  assert.equal(turns[1].role, "assistant");
});

test("buildMultiRowConversation: a truncated row's messageCount keeps a LATER real row's delta bookkeeping correct", () => {
  const rows = [
    {
      id: "big",
      timestamp: "2026-01-01T10:00:00.000Z",
      requestBody: {
        _truncated: true,
        _originalBytes: 263193,
        messageCount: 5,
      },
      responseBody: { choices: [{ message: { role: "assistant", content: "reply1" } }] },
    },
    {
      // Real history: the 5 earlier (unrecoverable) messages + reply1 (6) +
      // one genuinely new user turn (7 total). Only that new turn + this
      // row's own response should render — not the 5 unrecoverable messages
      // re-counted as "new" just because their content was never seen.
      id: "next",
      timestamp: "2026-01-01T10:01:00.000Z",
      requestBody: {
        messages: [
          { role: "user", content: "m1" },
          { role: "assistant", content: "m2" },
          { role: "user", content: "m3" },
          { role: "assistant", content: "m4" },
          { role: "user", content: "m5" },
          { role: "assistant", content: "reply1" },
          { role: "user", content: "one more thing" },
        ],
      },
      responseBody: { choices: [{ message: { role: "assistant", content: "reply2" } }] },
    },
  ];

  const turns = buildMultiRowConversation(rows);
  const nextRowTurns = turns.filter((t) => t.sourceCallLogId === "next");
  assert.equal(
    nextRowTurns.length,
    2,
    `expected exactly the one new user turn + this row's response, got: ${JSON.stringify(nextRowTurns)}`
  );
  assert.equal(nextRowTurns[0].role, "user");
  assert.equal(
    nextRowTurns[0].blocks[0].type === "text" ? nextRowTurns[0].blocks[0].text : "",
    "one more thing"
  );
  assert.equal(nextRowTurns[1].role, "assistant");
});
