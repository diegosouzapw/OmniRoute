import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateResponseValidation,
} from "../../../open-sse/services/combo/responseValidation.ts";

type JsonRecord = Record<string, unknown>;

const minimumContent = { minContentLength: 1 };

function chatCall(overrides: JsonRecord = {}): JsonRecord {
  return {
    id: "call-chat",
    type: "function",
    function: { name: "read_file", arguments: "{}" },
    ...overrides,
  };
}

function chatToolTurn(toolCalls: readonly unknown[] = [chatCall()], finishReason: unknown = "tool_calls"): JsonRecord {
  return {
    choices: [{
      finish_reason: finishReason,
      message: { role: "assistant", content: null, tool_calls: toolCalls },
    }],
  };
}

function anthropicTool(overrides: JsonRecord = {}): JsonRecord {
  return {
    type: "message",
    role: "assistant",
    stop_reason: "tool_use",
    content: [{ type: "tool_use", id: "tool-anthropic", name: "read_file", input: {} }],
    ...overrides,
  };
}

function responsesTool(overrides: JsonRecord = {}): JsonRecord {
  return {
    object: "response",
    status: "completed",
    output: [{
      type: "function_call",
      id: "fc-response",
      call_id: "call-response",
      name: "read_file",
      arguments: "{}",
      status: "completed",
    }],
    ...overrides,
  };
}

test("complete non-streaming tool calls bypass only minContentLength", () => {
  for (const [name, body] of [
    ["Chat", chatToolTurn()],
    ["Anthropic", anthropicTool()],
    ["Responses", responsesTool()],
  ] as const) {
    assert.equal(evaluateResponseValidation(body, minimumContent).valid, true, name);
    assert.equal(evaluateResponseValidation(body, { minContentLength: 10_000 }).valid, true, name);
  }
});

test("malformed, incomplete, duplicate, result, and streaming shapes keep minimum-text rejection", () => {
  const malformed = [
    chatToolTurn([]),
    chatToolTurn([chatCall({ id: " " })]),
    chatToolTurn([chatCall({ function: { name: "bad/name", arguments: "{}" } })]),
    chatToolTurn([chatCall({ function: { name: "read_file", arguments: "[]" } })]),
    chatToolTurn([chatCall(), chatCall()]),
    chatToolTurn([chatCall({ type: "tool_result" })]),
    chatToolTurn([chatCall()], "stop"),
    anthropicTool({ role: "user" }),
    anthropicTool({ stop_reason: "end_turn" }),
    anthropicTool({ content: [{ type: "tool_use", id: "tool-anthropic", name: "read_file", input: [] }] }),
    { type: "content_block_start", content_block: { type: "tool_use", id: "tool-stream", name: "read_file", input: {} } },
    { choices: [{ delta: { tool_calls: [chatCall()] } }] },
    responsesTool({ status: "in_progress" }),
    responsesTool({ output: [{ type: "function_call_output", call_id: "call-response", output: "result" }] }),
  ];

  for (const body of malformed) {
    assert.equal(evaluateResponseValidation(body, minimumContent).valid, false);
  }
});

test("tool-only completion retains required, forbidden, and JSON-path predicates", () => {
  const chat = chatToolTurn();
  assert.equal(
    evaluateResponseValidation(chat, { ...minimumContent, requiredSubstrings: ["must appear"] }).valid,
    false,
  );
  assert.equal(
    evaluateResponseValidation(chat, {
      ...minimumContent,
      jsonPathPredicates: [{ path: "choices[0].message.content", condition: "nonEmpty" }],
    }).valid,
    false,
  );

  const anthropicWithText = anthropicTool({
    content: [
      { type: "tool_use", id: "tool-anthropic", name: "read_file", input: {} },
      { type: "text", text: "FORBIDDEN" },
    ],
  });
  const forbidden = evaluateResponseValidation(anthropicWithText, {
    ...minimumContent,
    forbiddenSubstrings: ["FORBIDDEN"],
  });
  assert.equal(forbidden.valid, false);
  assert.match(forbidden.reason ?? "", /forbidden substring/);
});

test("function name bounds and legacy prose remain unchanged", () => {
  const validName = "x".repeat(128);
  assert.equal(
    evaluateResponseValidation(chatToolTurn([
      chatCall({ function: { name: validName, arguments: "{}" } }),
    ]), minimumContent).valid,
    true,
  );
  assert.equal(
    evaluateResponseValidation(chatToolTurn([
      chatCall({ function: { name: validName + "x", arguments: "{}" } }),
    ]), minimumContent).valid,
    false,
  );
  assert.equal(
    evaluateResponseValidation({ choices: [{ message: { content: "short" } }] }, { minContentLength: 10 }).valid,
    false,
  );
});
