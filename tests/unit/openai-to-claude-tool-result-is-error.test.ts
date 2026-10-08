import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

// Regression: Zed's hosted proxy (cloud.zed.dev/completions) strictly requires
// `is_error` on every Anthropic tool_result block and rejects the request with
// `400: failed to parse Anthropic request: missing field is_error` when it is
// absent. OpenAI tool messages carry no such flag, so the translator must
// always emit a boolean (default false).
function collectToolResults(translated) {
  const out = [];
  for (const msg of translated.messages ?? []) {
    for (const block of msg.content ?? []) {
      if (block?.type === "tool_result") out.push(block);
    }
  }
  return out;
}

test("openaiToClaudeRequest: role=tool message emits is_error:false", () => {
  const translated = openaiToClaudeRequest(
    "claude-sonnet-5-5",
    {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "read", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "file contents" },
      ],
    },
    false
  );

  const results = collectToolResults(translated);
  assert.equal(results.length, 1);
  assert.equal(results[0].tool_use_id, "call_1");
  assert.equal(results[0].is_error, false);
});

test("openaiToClaudeRequest: user tool_result part without is_error defaults to false", () => {
  const translated = openaiToClaudeRequest(
    "claude-sonnet-5-5",
    {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            { id: "call_2", type: "function", function: { name: "read", arguments: "{}" } },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "call_2", content: "ok" }],
        },
      ],
    },
    false
  );

  const results = collectToolResults(translated);
  assert.equal(results.length, 1);
  assert.equal(results[0].is_error, false);
});

test("openaiToClaudeRequest: explicit is_error:true is preserved", () => {
  const translated = openaiToClaudeRequest(
    "claude-sonnet-5-5",
    {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            { id: "call_3", type: "function", function: { name: "read", arguments: "{}" } },
            { id: "call_4", type: "function", function: { name: "read", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_3", content: "boom", is_error: true },
        {
          role: "user",
          content: [
            { type: "tool_result", tool_use_id: "call_4", content: "boom", is_error: true },
          ],
        },
      ],
    },
    false
  );

  const results = collectToolResults(translated);
  assert.equal(results.length, 2);
  for (const r of results) assert.equal(r.is_error, true);
});
