import test from "node:test";
import assert from "node:assert/strict";

import {
  extractResponsesWsMemoryQuery,
  injectResponsesWsMemoryInstructions,
} from "../../src/app/api/internal/codex-responses-ws/route.ts";

test("Responses WS memory query uses the latest user text and skips tool/reasoning items", () => {
  const query = extractResponsesWsMemoryQuery({
    input: [
      {
        role: "user",
        content: [{ type: "input_text", text: "old question" }],
      },
      {
        type: "reasoning",
        content: [{ type: "output_text", text: "do not retrieve from this" }],
      },
      {
        type: "function_call_output",
        output: "do not retrieve from tool output",
      },
      {
        role: "user",
        content: [
          { type: "input_text", text: "latest question" },
          { type: "input_text", text: "with detail" },
        ],
      },
    ],
    instructions: "fallback instructions",
  });

  assert.equal(query, "latest question\nwith detail");
});

test("Responses WS memory query falls back to prompt or instructions", () => {
  assert.equal(extractResponsesWsMemoryQuery({ prompt: "  prompt text  " }), "prompt text");
  assert.equal(
    extractResponsesWsMemoryQuery({ instructions: "  instruction text  " }),
    "instruction text"
  );
});

test("Responses WS memory injection prepends memory to instructions without mutating input", () => {
  const request = {
    model: "gpt-5.5",
    instructions: "follow the user request",
    input: "hello",
  };

  const result = injectResponsesWsMemoryInstructions(
    request,
    "Memory context: user prefers concise replies"
  );

  assert.notEqual(result, request);
  assert.equal(request.instructions, "follow the user request");
  assert.equal(
    result.instructions,
    "Memory context: user prefers concise replies\n\nfollow the user request"
  );
});

test("Responses WS memory injection does not duplicate an existing memory block", () => {
  const request = {
    model: "gpt-5.5",
    instructions: "Memory context: existing\n\nfollow the user request",
  };

  const result = injectResponsesWsMemoryInstructions(request, "Memory context: duplicate");

  assert.equal(result, request);
  assert.equal(result.instructions, "Memory context: existing\n\nfollow the user request");
});
