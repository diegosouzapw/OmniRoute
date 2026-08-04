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
