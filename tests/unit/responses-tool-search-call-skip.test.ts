import { test } from "node:test";
import assert from "node:assert/strict";
import { translateRequest } from "../../open-sse/translator/index.js";

/**
 * Responses API emit `tool_search_call` (and later `tool_search_result`) items
 * when the model uses Codex's dynamic tool-search optimization. They are
 * metadata-only — there is no Chat Completions representation. Without an
 * explicit skip in the Responses→Chat translator, the input loop throws
 * `Unsupported Responses API feature: input item type 'tool_search_call' ...`
 * and breaks the whole server. See logs: when Codex leaves
 * `input:[{type:"tool_search_call", ...}]` in a follow-up round, every
 * subsequent /v1/responses returns 400 until the user manually clears history.
 */
test("tool_search_call input item is silently skipped (not 400)", () => {
  const body = {
    model: "test-model",
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
      { type: "tool_search_call", tool_search_query: "ctx tools", count: 3 },
    ],
    stream: false,
  };
  let result;
  assert.doesNotThrow(() => {
    result = translateRequest("openai-responses", "openai", "test-model", body, false);
  }, "tool_search_call must not throw");
  assert.ok(result && typeof result === "object");
  // message remains, not dropped
  const messages = (result as { messages?: unknown }).messages as
    Array<{ role?: string; content?: unknown }> | undefined;
  assert.ok(Array.isArray(messages));
  assert.equal(messages.length, 1, "only the user message should remain");
  assert.equal(messages[0].role, "user");
});

test("tool_search_result input item is silently skipped", () => {
  const body = {
    model: "test-model",
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "yo" }] },
      {
        type: "tool_search_result",
        tool_search_query: "ctx tools",
        matched: ["ctx_search", "ctx_insight"],
      },
    ],
    stream: false,
  };
  let result;
  assert.doesNotThrow(() => {
    result = translateRequest("openai-responses", "openai", "test-model", body, false);
  }, "tool_search_result must not throw");
  const messages = (result as { messages?: unknown }).messages as
    Array<{ role?: string }> | undefined;
  assert.ok(Array.isArray(messages));
  assert.equal(messages.length, 1);
  assert.equal(messages[0].role, "user");
});

test("multiple tool_search_call items interspersed with messages are skipped in order", () => {
  const body = {
    model: "test-model",
    input: [
      { type: "tool_search_call", q: "first" },
      { type: "message", role: "user", content: [{ type: "input_text", text: "a" }] },
      { type: "tool_search_call", q: "mid" },
      { type: "tool_search_call", q: "second mid" },
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "b" }] },
    ],
    stream: false,
  };
  let result;
  assert.doesNotThrow(() => {
    result = translateRequest("openai-responses", "openai", "test-model", body, false);
  });
  const messages = (result as { messages?: unknown }).messages as
    Array<{ role?: string; content?: unknown }> | undefined;
  assert.ok(Array.isArray(messages));
  assert.equal(messages.length, 2, "only the two real messages survive");
  assert.deepEqual(
    messages.map((m) => m.role),
    ["user", "assistant"]
  );
});
