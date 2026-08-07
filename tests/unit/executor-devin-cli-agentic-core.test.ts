import test from "node:test";
import assert from "node:assert/strict";

import { buildClaudeSseFrames } from "../../open-sse/executors/devin-agentic/anthropicResponse.ts";
import {
  MAX_TOOL_RESULT_CHARS,
  serializeAnthropicForDevin,
} from "../../open-sse/executors/devin-agentic/serializer.ts";
import { parseDevinToolRequest } from "../../open-sse/executors/devin-agentic/toolParser.ts";

const readTool = {
  name: "Read",
  description: "Read a file",
  input_schema: {
    type: "object",
    required: ["file_path"],
    additionalProperties: false,
    properties: {
      file_path: { type: "string" },
    },
  },
};

test("devin agentic serializer preserves Anthropic tool history and schemas", () => {
  const prompt = serializeAnthropicForDevin({
    system: [{ type: "text", text: "Follow CLAUDE.md" }],
    tools: [readTool],
    messages: [
      { role: "user", content: [{ type: "text", text: "Inspect the file" }] },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu_1", name: "Read", input: { file_path: "a.ts" } }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_1", content: "export {}" }],
      },
    ],
  });

  assert.match(prompt.text, /\[System\]\nFollow CLAUDE\.md/);
  assert.match(prompt.text, /\[Tool\] Read/);
  assert.match(prompt.text, /Do not execute tools inside Devin/);
  assert.match(prompt.text, /\[Assistant Tool Use\]/);
  assert.match(prompt.text, /\[Tool Result\]/);
  assert.equal(prompt.tools[0].name, "Read");
  assert.match(prompt.idSeed, /^[a-f0-9]{24}$/);
});

test("devin agentic serializer preserves tool choice and validates tool-result association", () => {
  const prompt = serializeAnthropicForDevin({
    tools: [readTool],
    tool_choice: { type: "tool", name: "Read" },
    messages: [{ role: "user", content: "Read it" }],
  });
  assert.match(prompt.text, /Call exactly this tool: Read/);
  assert.throws(
    () =>
      serializeAnthropicForDevin({
        tools: [readTool],
        messages: [
          {
            role: "user",
            content: [{ type: "tool_result", tool_use_id: "toolu_missing", content: "nope" }],
          },
        ],
      }),
    /unknown tool_use id/
  );
});

test("devin agentic serializer marks bounded tool-result truncation explicitly", () => {
  const prompt = serializeAnthropicForDevin({
    tools: [readTool],
    messages: [
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu_big", name: "Read", input: { file_path: "a" } }],
      },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_big",
            content: "x".repeat(MAX_TOOL_RESULT_CHARS + 9),
          },
        ],
      },
    ],
  });
  assert.match(prompt.text, /\[TRUNCATED 9 CHARACTERS BY OMNIROUTE\]/);
});

test("devin agentic serializer rejects images explicitly", () => {
  assert.throws(
    () =>
      serializeAnthropicForDevin({
        messages: [{ role: "user", content: [{ type: "image", source: { type: "base64" } }] }],
      }),
    /image blocks are not supported/
  );
});

test("devin agentic parser validates known tool and arguments", () => {
  const parsed = parseDevinToolRequest(
    '<tool>{"name":"Read","arguments":{"file_path":"src/index.ts"}}</tool>',
    [readTool],
    "request-a"
  );

  assert.equal(parsed?.name, "Read");
  assert.deepEqual(parsed?.input, { file_path: "src/index.ts" });
  assert.match(parsed?.id || "", /^tool_devin_/);
});

test("devin agentic tool ids are stable per request and distinct across turns", () => {
  const text = '<tool>{"name":"Read","arguments":{"file_path":"src/index.ts"}}</tool>';
  const first = parseDevinToolRequest(text, [readTool], "request-a");
  const retry = parseDevinToolRequest(text, [readTool], "request-a");
  const laterTurn = parseDevinToolRequest(text, [readTool], "request-b");
  assert.equal(first?.id, retry?.id);
  assert.notEqual(first?.id, laterTurn?.id);
});

test("devin agentic parser rejects unknown tools and invalid arguments", () => {
  assert.throws(
    () => parseDevinToolRequest('<tool>{"name":"Write","arguments":{}}</tool>', [readTool]),
    /unknown tool/
  );
  assert.throws(
    () => parseDevinToolRequest('<tool>{"name":"Read","arguments":{}}</tool>', [readTool]),
    /file_path is required/
  );
  assert.throws(
    () =>
      parseDevinToolRequest(
        '<tool>{"name":"Read","arguments":{"file_path":"a","extra":true}}</tool>',
        [readTool]
      ),
    /extra is not allowed/
  );
});

test("devin agentic parser leaves narrative text as text, not a tool", () => {
  assert.equal(parseDevinToolRequest("I read the file and it passes.", [readTool]), null);
});

test("devin agentic parser rejects mixed narrative and tool action", () => {
  assert.throws(
    () =>
      parseDevinToolRequest(
        'I will read it. <tool>{"name":"Read","arguments":{"file_path":"a.ts"}}</tool>',
        [readTool]
      ),
    /standalone tool envelope/
  );
});

test("devin agentic SSE renders Anthropic tool lifecycle", () => {
  const sse = buildClaudeSseFrames({
    id: "msg_1",
    type: "message",
    role: "assistant",
    model: "swe-1-7",
    content: [{ type: "tool_use", id: "tool_devin_1", name: "Read", input: { file_path: "a.ts" } }],
    stop_reason: "tool_use",
    stop_sequence: null,
    usage: { input_tokens: 10, output_tokens: 2 },
  });

  assert.match(sse, /event: message_start/);
  assert.match(sse, /event: content_block_start/);
  assert.match(sse, /input_json_delta/);
  assert.match(sse, /event: message_delta/);
  assert.match(sse, /"stop_reason":"tool_use"/);
  assert.match(sse, /event: message_stop/);
});
