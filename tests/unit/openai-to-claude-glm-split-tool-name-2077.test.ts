import test from "node:test";
import assert from "node:assert/strict";

import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";

// Regression guard for GLM 5.2 (and similar OpenAI-compatible upstreams) that stream a
// tool call's `id` and `function.name` across SEPARATE SSE delta chunks. The Claude SSE
// protocol cannot patch a `content_block_start` after it is emitted, so the translator
// must DEFER `content_block_start` until the tool name has arrived. Previously the block
// was emitted immediately on the id-only chunk with an empty name, and the later
// name-only chunk was silently dropped — Claude Code then rejected the tool_use with
// "No such tool available:" / empty tool name. Ported from decolua/9router#2077.

function createState() {
  return { toolCalls: new Map() };
}

function flatten(items) {
  return items.flatMap((item) => item || []);
}

test("#2077: GLM streams tool id then name in separate chunks — content_block_start carries the real name", () => {
  const state = createState();

  // Chunk 1: id only, no function.name yet (GLM 5.2 behavior).
  const c1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-glm",
      model: "glm/glm-5.2",
      choices: [
        { index: 0, delta: { tool_calls: [{ index: 0, id: "call_glm_1", type: "function" }] }, finish_reason: null },
      ],
    },
    state
  );
  // Chunk 2: function.name only, no id, no arguments.
  const c2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-glm",
      model: "glm/glm-5.2",
      choices: [
        { index: 0, delta: { tool_calls: [{ index: 0, function: { name: "get_weather" } }] }, finish_reason: null },
      ],
    },
    state
  );
  // Chunk 3: arguments.
  const c3 = openaiToClaudeResponse(
    {
      id: "chatcmpl-glm",
      model: "glm/glm-5.2",
      choices: [
        {
          index: 0,
          delta: { tool_calls: [{ index: 0, function: { arguments: '{"city":"SP"}' } }] },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const cEnd = openaiToClaudeResponse(
    {
      id: "chatcmpl-glm",
      model: "glm/glm-5.2",
      choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
    },
    state
  );

  const events = flatten([c1, c2, c3, cEnd]);
  const starts = events.filter((e) => e?.type === "content_block_start" && e.content_block?.type === "tool_use");

  assert.equal(starts.length, 1, "exactly one tool_use content_block_start");
  assert.equal(starts[0].content_block.name, "get_weather", "tool name must be captured (not empty)");
  assert.equal(starts[0].content_block.id, "call_glm_1", "tool id preserved");

  // Arguments must still be delivered (the name-only chunk must not swallow them).
  const argDeltas = events
    .filter((e) => e?.type === "content_block_delta" && e.delta?.type === "input_json_delta")
    .map((e) => e.delta.partial_json)
    .join("");
  assert.equal(argDeltas, '{"city":"SP"}');
});

test("#2077 no-regression: id+name+arguments in one chunk still emits a single named start", () => {
  const state = createState();
  const c1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-x",
      model: "openai/gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              { index: 0, id: "call_1", type: "function", function: { name: "search", arguments: '{"q":"hi"}' } },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const cEnd = openaiToClaudeResponse(
    { id: "chatcmpl-x", model: "openai/gpt-4", choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }] },
    state
  );
  const events = flatten([c1, cEnd]);
  const starts = events.filter((e) => e?.type === "content_block_start" && e.content_block?.type === "tool_use");
  assert.equal(starts.length, 1);
  assert.equal(starts[0].content_block.name, "search");
  assert.equal(starts[0].content_block.id, "call_1");
  const args = events
    .filter((e) => e?.type === "content_block_delta" && e.delta?.type === "input_json_delta")
    .map((e) => e.delta.partial_json)
    .join("");
  assert.equal(args, '{"q":"hi"}');
});
