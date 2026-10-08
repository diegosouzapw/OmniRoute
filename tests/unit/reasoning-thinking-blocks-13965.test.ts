/**
 * Regression test for #13965 — Claude-format `thinking` content blocks are not
 * recognised as reasoning.
 *
 * Claude-compatible upstreams served through an OpenAI-compatible node (e.g.
 * sensenova agnes-2.5-flash) return `choices[0].message.content` as an ARRAY of
 * Anthropic blocks (`{type:"thinking"}` + `{type:"text"}`) with Anthropic-style
 * usage that folds thinking into `output_tokens`. Native Claude bodies rebuilt by
 * the stream payload collector carry the same block array at the top level.
 *
 * The #6187 observation fallback only inspected a string `reasoning_content` /
 * `reasoning` field or `<think>` tags in string content, so these calls were
 * logged as "did not reason at all". The fix teaches it to walk structured
 * content arrays and exposes the observation on the call-log API, while
 * `tokens_reasoning` (what cost math reads) stays strictly usage-derived.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
import { getCallLogById, getCallLogs, saveCallLog } from "../../src/lib/usage/callLogs.ts";
import { getObservedReasoning } from "../../src/lib/usage/tokenAccounting.ts";

const THINKING = "The user wants a weather lookup, so I should call the tool first.";

test.after(() => {
  try {
    const db = getDbInstance();
    db.prepare("DELETE FROM call_logs WHERE id LIKE 'test-13965-%'").run();
  } catch {
    // best-effort cleanup
  }
  try {
    resetDbInstance();
  } catch {
    // best-effort handle release (per DB-handle hang rule)
  }
});

// ── getObservedReasoning: structured content arrays ────────────────────────

test("getObservedReasoning: OpenAI-wrapped Claude thinking block → source=content", () => {
  const observed = getObservedReasoning({
    role: "assistant",
    content: [
      { type: "thinking", thinking: THINKING },
      { type: "text", text: "Let me check the weather." },
    ],
    tool_calls: [],
  });
  assert.equal(observed.source, "content");
  assert.equal(observed.chars, THINKING.length);
});

test("getObservedReasoning: sums every thinking block in the array", () => {
  const observed = getObservedReasoning({
    content: [
      { type: "thinking", thinking: "first pass" },
      { type: "text", text: "partial answer" },
      { type: "thinking", thinking: "second pass" },
    ],
  });
  assert.equal(observed.source, "content");
  assert.equal(observed.chars, "first pass".length + "second pass".length);
});

test("getObservedReasoning: <think> tags inside a text block → source=think", () => {
  const observed = getObservedReasoning({
    content: [{ type: "text", text: "<think>inline chain of thought</think>final answer" }],
  });
  assert.equal(observed.source, "think");
  assert.equal(observed.chars, "inline chain of thought".length);
});

test("getObservedReasoning: redacted/empty thinking and plain text → no reasoning", () => {
  const observed = getObservedReasoning({
    content: [
      { type: "redacted_thinking", data: "opaque-encrypted-payload" },
      { type: "thinking", thinking: "   " },
      { type: "text", text: "just an answer" },
    ],
  });
  assert.equal(observed.source, null);
  assert.equal(observed.chars, 0);
});

// ── Persistence + API exposure ──────────────────────────────────────────────

async function readReasoningColumns(id: string) {
  return getDbInstance()
    .prepare(
      "SELECT tokens_reasoning, reasoning_source, reasoning_chars FROM call_logs WHERE id = ?"
    )
    .get(id) as {
    tokens_reasoning: number | null;
    reasoning_source: string | null;
    reasoning_chars: number | null;
  };
}

test("saveCallLog observes thinking blocks in an OpenAI-wrapped agnes response", async () => {
  const testId = `test-13965-agnes-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "agnes-2.5-flash",
    provider: "openai-compatible-chat-13965",
    duration: 100,
    // Anthropic-style usage: no reasoning field at all (the bug trigger).
    tokens: { input_tokens: 37, output_tokens: 200, cache_read_input_tokens: 256 },
    responseBody: {
      choices: [
        {
          message: {
            role: "assistant",
            content: [
              { type: "thinking", thinking: THINKING },
              { type: "text", text: "Let me check the weather." },
            ],
          },
        },
      ],
      usage: { input_tokens: 37, output_tokens: 200, cache_read_input_tokens: 256 },
    },
  });

  const row = await readReasoningColumns(testId);
  assert.ok(row, "row should exist");
  assert.equal(row.reasoning_source, "content");
  assert.equal(row.reasoning_chars, THINKING.length);
  // Usage never reported reasoning, so the cost-relevant column stays null.
  assert.equal(row.tokens_reasoning, null);

  const detail = await getCallLogById(testId);
  assert.equal(detail?.tokens.reasoning, null);
  assert.equal(detail?.reasoningSource, "content");
  assert.equal(detail?.reasoningChars, THINKING.length);

  const listed = (await getCallLogs({ model: "agnes-2.5-flash", limit: 50 })).find(
    (entry) => entry.id === testId
  );
  assert.equal(listed?.reasoningSource, "content");
  assert.equal(listed?.reasoningChars, THINKING.length);
});

test("saveCallLog observes thinking blocks in a native Claude message body", async () => {
  const testId = `test-13965-claude-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/messages",
    status: 200,
    model: "claude-sonnet-4-5",
    provider: "anthropic",
    duration: 100,
    tokens: { input_tokens: 12, output_tokens: 80 },
    // Shape produced by the Claude stream payload collector.
    responseBody: {
      id: "msg_13965",
      type: "message",
      role: "assistant",
      model: "claude-sonnet-4-5",
      content: [
        { type: "thinking", thinking: THINKING, signature: "sig" },
        { type: "text", text: "Done." },
      ],
      stop_reason: "end_turn",
      usage: { input_tokens: 12, output_tokens: 80 },
    },
  });

  const row = await readReasoningColumns(testId);
  assert.equal(row.reasoning_source, "content");
  assert.equal(row.reasoning_chars, THINKING.length);
  assert.equal(row.tokens_reasoning, null);
});

test("call-log API reports no observation for a non-reasoning response", async () => {
  const testId = `test-13965-plain-${Date.now()}`;

  await saveCallLog({
    id: testId,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "plain-13965",
    provider: "openai",
    duration: 50,
    tokens: { prompt_tokens: 5, completion_tokens: 6 },
    responseBody: { choices: [{ message: { role: "assistant", content: "hello" } }] },
  });

  const detail = await getCallLogById(testId);
  assert.equal(detail?.reasoningSource, null);
  assert.equal(detail?.reasoningChars, null);
});
