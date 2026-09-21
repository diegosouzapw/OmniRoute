import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";

import {
  MAX_RESULT_BYTES_PER_TOOL,
  MAX_RESULT_BYTES_TOTAL,
  serializeBoundedToolResult,
  buildFollowUpSourceBody,
} from "../../src/lib/skills/followUpTranscript.ts";
import type {
  ToolCall,
  ExecutedToolResult,
  BuildFollowUpTranscriptInput,
  BoundedToolResult,
} from "../../src/lib/skills/toolLoopTypes.ts";

type UnknownRecord = Record<string, unknown>;

const MESSAGES_REQUIRED = "buildFollowUpSourceBody requires sourceBody.messages array";
const NON_SERIALIZABLE_JSON = '{"error":"Tool result is not JSON-serializable"}';

// ─── OpenAI Chat Completions ─────────────────────────────────────────────────

function openaiInput(overrides: Partial<BuildFollowUpTranscriptInput> = {}) {
  const sourceBody = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "remember foo" },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "memory_search",
          description: "search memory",
          parameters: { type: "object", properties: { query: { type: "string" } } },
        },
      },
    ],
    tool_choice: "auto",
    stream: false,
  } as UnknownRecord;
  const previousResponse = {
    id: "chatcmpl-abc",
    object: "chat.completion",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "I will look that up.",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "memory_search", arguments: '{"query":"foo"}' },
            },
            {
              id: "call_2",
              type: "function",
              function: { name: "memory_save", arguments: '{"key":"k","value":"v"}' },
            },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
  } as UnknownRecord;
  const toolCalls: ToolCall[] = [
    { id: "call_1", name: "memory_search", arguments: { query: "foo" } },
    { id: "call_2", name: "memory_save", arguments: { key: "k", value: "v" } },
  ];
  const results: ExecutedToolResult[] = [
    { id: "call_1", name: "memory_search", result: { hits: ["a", "b"] }, replayed: false },
    { id: "call_2", name: "memory_save", result: { ok: true }, replayed: true },
  ];
  return {
    sourceBody,
    previousResponse,
    toolCalls,
    results,
    sourceFormat: "openai",
    maxResultBytes: MAX_RESULT_BYTES_PER_TOOL,
    ...overrides,
  } as BuildFollowUpTranscriptInput & {
    sourceBody: UnknownRecord;
    previousResponse: UnknownRecord;
    toolCalls: ToolCall[];
    results: ExecutedToolResult[];
  };
}

test("OpenAI: messages array required — Responses-only body throws", () => {
  const responsesBody = {
    model: "gpt-4o",
    input: [{ role: "user", content: "hi" }],
  } as UnknownRecord;
  assert.throws(
    () => buildFollowUpSourceBody(openaiInput({ sourceBody: responsesBody })),
    (err: unknown) => err instanceof Error && err.message === MESSAGES_REQUIRED
  );
  assert.throws(
    () =>
      buildFollowUpSourceBody(
        openaiInput({ sourceBody: { model: "gpt-4o", messages: "not-an-array" } as UnknownRecord })
      ),
    (err: unknown) => err instanceof Error && err.message === MESSAGES_REQUIRED
  );
});

test("OpenAI: calls/results length, duplicates and ID set mismatch all fail closed", () => {
  const missingResult = openaiInput({
    toolCalls: [
      { id: "call_1", name: "memory_search", arguments: { query: "foo" } },
      { id: "call_9", name: "client_tool", arguments: {} },
    ],
  });
  assert.throws(() => buildFollowUpSourceBody(missingResult), /matching result/);

  const extraResult = openaiInput({
    results: [
      { id: "call_1", name: "memory_search", result: { hits: ["a"] }, replayed: false },
      { id: "call_2", name: "memory_save", result: { ok: true }, replayed: false },
      { id: "call_9", name: "ghost", result: "no call", replayed: false },
    ],
  });
  assert.throws(() => buildFollowUpSourceBody(extraResult), /same length/);

  const duplicateCallId = openaiInput({
    toolCalls: [
      { id: "call_1", name: "memory_search", arguments: {} },
      { id: "call_1", name: "memory_save", arguments: {} },
    ],
  });
  assert.throws(() => buildFollowUpSourceBody(duplicateCallId), /unique tool call ids/);

  const duplicateResultId = openaiInput({
    results: [
      { id: "call_1", name: "memory_search", result: "a", replayed: false },
      { id: "call_1", name: "memory_search", result: "b", replayed: false },
    ],
  });
  assert.throws(() => buildFollowUpSourceBody(duplicateResultId), /unique tool result ids/);
});

test("OpenAI: appends assistant turn and tool messages, preserves tools/tool_choice/model", () => {
  const input = openaiInput();
  const sourceBodySnapshot = JSON.parse(JSON.stringify(input.sourceBody));
  const responseSnapshot = JSON.parse(JSON.stringify(input.previousResponse));

  const out = buildFollowUpSourceBody(input);

  assert.notStrictEqual(out, input.sourceBody);
  assert.deepEqual(input.sourceBody, sourceBodySnapshot);
  assert.deepEqual(input.previousResponse, responseSnapshot);

  assert.strictEqual(out.model, "gpt-4o");
  assert.deepEqual(out.tools, input.sourceBody.tools);
  assert.deepEqual(out.tool_choice, "auto");
  assert.strictEqual(out.stream, false);

  const messages = out.messages as UnknownRecord[];
  assert.strictEqual(messages.length, 5);
  assert.deepEqual(messages.slice(0, 2), input.sourceBody.messages);

  const assistant = messages[2];
  assert.strictEqual(assistant.role, "assistant");
  assert.strictEqual(assistant.content, "I will look that up.");
  assert.deepEqual(assistant.tool_calls, input.previousResponse.choices[0].message.tool_calls);

  for (let i = 0; i < input.results.length; i++) {
    const toolMessage = messages[3 + i];
    assert.strictEqual(toolMessage.role, "tool");
    assert.strictEqual(toolMessage.tool_call_id, input.results[i].id);
    assert.strictEqual(toolMessage.content, JSON.stringify(input.results[i].result));
  }
});

test("OpenAI: reconstructs assistant tool_calls from parsed calls when response carries none", () => {
  const input = openaiInput();
  (input.previousResponse.choices[0].message as UnknownRecord).tool_calls = undefined;

  const out = buildFollowUpSourceBody(input);

  const assistant = (out.messages as UnknownRecord[])[2];
  assert.deepEqual(assistant.tool_calls, [
    {
      id: "call_1",
      type: "function",
      function: { name: "memory_search", arguments: '{"query":"foo"}' },
    },
    {
      id: "call_2",
      type: "function",
      function: { name: "memory_save", arguments: '{"key":"k","value":"v"}' },
    },
  ]);
});

test("OpenAI: bounds each tool result to 32768 UTF-8 bytes and total to 65536", () => {
  const big = "x".repeat(40_000);
  const input = openaiInput({
    results: [
      { id: "call_1", name: "memory_search", result: { payload: big }, replayed: false },
      { id: "call_2", name: "memory_save", result: { payload: big }, replayed: false },
    ],
  });

  const out = buildFollowUpSourceBody(input);
  const messages = out.messages as UnknownRecord[];
  const firstContent = String(messages[3].content);
  const secondContent = String(messages[4].content);
  const firstBytes = Buffer.byteLength(firstContent, "utf8");
  const secondBytes = Buffer.byteLength(secondContent, "utf8");

  assert.strictEqual(MAX_RESULT_BYTES_PER_TOOL, 32_768);
  assert.strictEqual(MAX_RESULT_BYTES_TOTAL, 65_536);
  assert.ok(firstBytes <= MAX_RESULT_BYTES_PER_TOOL, `first ${firstBytes}`);
  assert.ok(secondBytes <= MAX_RESULT_BYTES_PER_TOOL, `second ${secondBytes}`);
  assert.ok(firstBytes + secondBytes <= MAX_RESULT_BYTES_TOTAL, "total byte bound");
  assert.ok(firstContent.includes("[TRUNCATED"));
  assert.ok(secondContent.includes("[TRUNCATED"));
});

test("OpenAI: maxTotalResultBytes=20 exhausts budget, second tool message is empty and total stays <=20", () => {
  const input = openaiInput({
    results: [
      { id: "call_1", name: "memory_search", result: "a".repeat(240), replayed: false },
      { id: "call_2", name: "memory_save", result: "z".repeat(240), replayed: false },
    ],
    maxTotalResultBytes: 20,
  });

  const out = buildFollowUpSourceBody(input);
  const messages = out.messages as UnknownRecord[];
  const firstBytes = Buffer.byteLength(String(messages[3].content), "utf8");
  const secondContent = messages[4].content;

  assert.ok(firstBytes <= 20, `first ${firstBytes}`);
  assert.strictEqual(secondContent, "");
  assert.ok(firstBytes + Buffer.byteLength(String(secondContent), "utf8") <= 20);
  assert.ok(String(messages[3].content).includes("[TRUNCATED"));
});

// ─── serializeBoundedToolResult ──────────────────────────────────────────────

function assertValidUtf8(text: string): void {
  assert.strictEqual(Buffer.from(text, "utf8").toString("utf8"), text);
}

function hasLoneSurrogate(text: string): boolean {
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = text.charCodeAt(i + 1);
      if (next < 0xdc00 || next > 0xdfff) return true;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      const prev = text.charCodeAt(i - 1);
      if (prev < 0xd800 || prev > 0xdbff) return true;
    }
  }
  return false;
}

test("serializeBoundedToolResult: CJK + astral cut lands on code-point boundaries", () => {
  const raw = "你好🌍".repeat(9);
  const serialized = JSON.stringify(raw);
  const originalBytes = Buffer.byteLength(serialized, "utf8");
  const maxBytes = 50;

  const bounded = serializeBoundedToolResult(raw, maxBytes);

  assert.strictEqual(bounded.originalBytes, originalBytes);
  assert.ok(bounded.truncated);
  assert.ok(
    Buffer.byteLength(bounded.text, "utf8") <= maxBytes,
    `byte bound: ${Buffer.byteLength(bounded.text, "utf8")} <= ${maxBytes}`
  );
  assert.ok(bounded.text.includes("[TRUNCATED"), "marker present");
  const match = bounded.text.match(/\[TRUNCATED (\d+) BYTES BY OMNIROUTE\]/);
  assert.ok(match, "marker format valid");
  const droppedBytes = Number(match![1]);
  assert.ok(droppedBytes > 0, "dropped bytes > 0");
  assert.ok(droppedBytes <= originalBytes, "dropped <= original");
  assertValidUtf8(bounded.text);
  assert.ok(!hasLoneSurrogate(bounded.text), "no orphan surrogate");
});

test("serializeBoundedToolResult: marker-only UTF-8-safe prefix when maxBytes <= markerBytes, empty at 0", () => {
  const text = "你好世界🌍🌎";
  const markerOnly = serializeBoundedToolResult(text, 20);
  assert.ok(markerOnly.truncated);
  assert.strictEqual(markerOnly.text, "[TRUNCATED 22 BYTES ");
  assert.strictEqual(Buffer.byteLength(markerOnly.text, "utf8"), 20);
  assertValidUtf8(markerOnly.text);

  const empty = serializeBoundedToolResult(text, 0);
  assert.strictEqual(empty.text, "");
  assertValidUtf8(empty.text);
});

test("serializeBoundedToolResult: unfits pass through untruncated with byte counts", () => {
  const bounded = serializeBoundedToolResult({ hits: ["a"] }, 1024);
  assert.strictEqual(bounded.truncated, false);
  assert.strictEqual(bounded.text, '{"hits":["a"]}');
  assert.strictEqual(bounded.originalBytes, Buffer.byteLength('{"hits":["a"]}', "utf8"));
});

test("serializeBoundedToolResult: projects undefined/Error/bigint and rejects non-JSON values", () => {
  assert.strictEqual(serializeBoundedToolResult(undefined, 1024).text, "null");
  assert.strictEqual(serializeBoundedToolResult(new Error("x"), 1024).text, '{"error":"x"}');
  assert.strictEqual(serializeBoundedToolResult(10n, 1024).text, '"10"');

  assert.strictEqual(serializeBoundedToolResult(() => undefined, 1024).text, NON_SERIALIZABLE_JSON);
  assert.strictEqual(serializeBoundedToolResult(Symbol("s"), 1024).text, NON_SERIALIZABLE_JSON);

  const cyclic: UnknownRecord = {};
  cyclic.self = cyclic;
  assert.strictEqual(serializeBoundedToolResult(cyclic, 1024).text, NON_SERIALIZABLE_JSON);
  assert.strictEqual(serializeBoundedToolResult({ a: 10n }, 1024).text, NON_SERIALIZABLE_JSON);

  const boundedResult: BoundedToolResult = serializeBoundedToolResult(10n, 1024);
  assert.deepEqual(Object.keys(boundedResult).sort(), ["originalBytes", "text", "truncated"]);
});

// ─── Task 4: Budget validation (Req 1) ─────────────────────────────────────

test("serializeBoundedToolResult: NaN budget throws RangeError", () => {
  assert.throws(() => serializeBoundedToolResult("hello", NaN), {
    name: "RangeError",
    message: /maxBytes must be a non-negative finite integer/,
  });
});

test("serializeBoundedToolResult: Infinity budget throws RangeError", () => {
  assert.throws(() => serializeBoundedToolResult("hello", Infinity), {
    name: "RangeError",
    message: /maxBytes must be a non-negative finite integer/,
  });
});

test("serializeBoundedToolResult: -Infinity budget throws RangeError", () => {
  assert.throws(() => serializeBoundedToolResult("hello", -Infinity), {
    name: "RangeError",
    message: /maxBytes must be a non-negative finite integer/,
  });
});

test("serializeBoundedToolResult: negative budget throws RangeError", () => {
  assert.throws(() => serializeBoundedToolResult("hello", -1), {
    name: "RangeError",
    message: /maxBytes must be a non-negative finite integer/,
  });
});

test("serializeBoundedToolResult: non-integer budget throws RangeError", () => {
  assert.throws(() => serializeBoundedToolResult("hello", 1.5), {
    name: "RangeError",
    message: /maxBytes must be a non-negative finite integer/,
  });
});

test("buildFollowUpSourceBody: NaN maxResultBytes throws RangeError", () => {
  const input = openaiInput({ maxResultBytes: NaN });
  assert.throws(() => buildFollowUpSourceBody(input), {
    name: "RangeError",
    message: /must be a non-negative finite integer/,
  });
});

test("buildFollowUpSourceBody: negative maxTotalResultBytes throws RangeError", () => {
  const input = openaiInput({ maxTotalResultBytes: -1 });
  assert.throws(() => buildFollowUpSourceBody(input), {
    name: "RangeError",
    message: /must be a non-negative finite integer/,
  });
});

// ─── Task 4: sourceFormat validation (Req 2) ───────────────────────────────

test("buildFollowUpSourceBody: invalid sourceFormat 'anthropic' fails closed", () => {
  const input = openaiInput({ sourceFormat: "anthropic" } as unknown as {
    sourceFormat: "openai" | "claude";
  });
  assert.throws(() => buildFollowUpSourceBody(input), /sourceFormat must be "openai" or "claude"/);
});

test("buildFollowUpSourceBody: empty sourceFormat fails closed", () => {
  const input = openaiInput({ sourceFormat: "" } as unknown as {
    sourceFormat: "openai" | "claude";
  });
  assert.throws(() => buildFollowUpSourceBody(input), /sourceFormat must be "openai" or "claude"/);
});

// ─── Task 4: calls/results name match (Req 3) ──────────────────────────────

test("calls/results name mismatch on same ID fails closed", () => {
  const input = openaiInput({
    toolCalls: [
      { id: "call_1", name: "memory_search", arguments: { query: "foo" } },
      { id: "call_2", name: "memory_save", arguments: { key: "k", value: "v" } },
    ],
    results: [
      { id: "call_1", name: "WRONG_NAME", result: { hits: ["a"] }, replayed: false },
      { id: "call_2", name: "memory_save", result: { ok: true }, replayed: false },
    ],
  });
  assert.throws(
    () => buildFollowUpSourceBody(input),
    /result name .* does not match tool call name/
  );
});

// ─── Task 4: OpenAI previous response tool_call match (Req 4) ───────────────

test("OpenAI: partial tool_calls in previous response fails closed (missing call)", () => {
  const input = openaiInput();
  // Only include call_1 in the previous response, omit call_2
  (input.previousResponse.choices[0].message as UnknownRecord).tool_calls = [
    {
      id: "call_1",
      type: "function",
      function: { name: "memory_search", arguments: '{"query":"foo"}' },
    },
  ];
  assert.throws(
    () => buildFollowUpSourceBody(input),
    /previous response tool_calls must contain exactly one match per call ID/
  );
});

test("OpenAI: duplicate tool_calls for same ID in previous response fails closed", () => {
  const input = openaiInput();
  // Duplicate call_1 in the previous response
  (input.previousResponse.choices[0].message as UnknownRecord).tool_calls = [
    {
      id: "call_1",
      type: "function",
      function: { name: "memory_search", arguments: '{"query":"foo"}' },
    },
    {
      id: "call_1",
      type: "function",
      function: { name: "memory_search", arguments: '{"query":"foo"}' },
    },
    {
      id: "call_2",
      type: "function",
      function: { name: "memory_save", arguments: '{"key":"k","value":"v"}' },
    },
  ];
  assert.throws(
    () => buildFollowUpSourceBody(input),
    /previous response tool_calls must contain exactly one match per call ID/
  );
});

test("OpenAI: mismatched name in previous response tool_call fails closed", () => {
  const input = openaiInput();
  // call_1 has a different name in the previous response
  (input.previousResponse.choices[0].message as UnknownRecord).tool_calls = [
    {
      id: "call_1",
      type: "function",
      function: { name: "WRONG_NAME", arguments: '{"query":"foo"}' },
    },
    {
      id: "call_2",
      type: "function",
      function: { name: "memory_save", arguments: '{"key":"k","value":"v"}' },
    },
  ];
  assert.throws(
    () => buildFollowUpSourceBody(input),
    /previous response tool_call .* name .* does not match/
  );
});

// ─── Task 4: Claude previousResponse tool_use match (Req 5) ─────────────────

test("Claude: partial tool_use blocks in previous response fails closed", () => {
  const input = claudeInput();
  // Only include toolu_1, omit toolu_2
  (input.previousResponse as UnknownRecord).content = [
    { type: "text", text: "Let me look." },
    { type: "tool_use", id: "toolu_1", name: "memory_search", input: { query: "foo" } },
  ];
  assert.throws(
    () => buildFollowUpSourceBody(input),
    /previous response content must contain exactly one tool_use match per call ID/
  );
});

test("Claude: duplicate tool_use blocks for same ID in previous response fails closed", () => {
  const input = claudeInput();
  // Duplicate toolu_1
  (input.previousResponse as UnknownRecord).content = [
    { type: "text", text: "Let me look." },
    { type: "tool_use", id: "toolu_1", name: "memory_search", input: { query: "foo" } },
    { type: "tool_use", id: "toolu_1", name: "memory_search", input: { query: "foo" } },
    { type: "tool_use", id: "toolu_2", name: "memory_save", input: { key: "k" } },
  ];
  assert.throws(
    () => buildFollowUpSourceBody(input),
    /previous response content must contain exactly one tool_use match per call ID/
  );
});

test("Claude: mismatched name in previous response tool_use fails closed", () => {
  const input = claudeInput();
  // toolu_1 has a different name
  (input.previousResponse as UnknownRecord).content = [
    { type: "text", text: "Let me look." },
    { type: "tool_use", id: "toolu_1", name: "WRONG_NAME", input: { query: "foo" } },
    { type: "tool_use", id: "toolu_2", name: "memory_save", input: { key: "k" } },
  ];
  assert.throws(
    () => buildFollowUpSourceBody(input),
    /previous response tool_use .* name .* does not match/
  );
});

// ─── Claude Messages ─────────────────────────────────────────────────────────

function claudeInput(overrides: Partial<BuildFollowUpTranscriptInput> = {}) {
  const sourceBody = {
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    stream: true,
    messages: [{ role: "user", content: "remember foo" }],
    tools: [
      {
        name: "memory_search",
        description: "search memory",
        input_schema: { type: "object", properties: { query: { type: "string" } } },
      },
    ],
  } as UnknownRecord;
  const previousResponse = {
    id: "msg_1",
    type: "message",
    role: "assistant",
    content: [
      { type: "text", text: "Let me look." },
      { type: "tool_use", id: "toolu_1", name: "memory_search", input: { query: "foo" } },
      { type: "tool_use", id: "toolu_2", name: "memory_save", input: { key: "k" } },
    ],
    stop_reason: "tool_use",
  } as UnknownRecord;
  const toolCalls: ToolCall[] = [
    { id: "toolu_1", name: "memory_search", arguments: { query: "foo" } },
    { id: "toolu_2", name: "memory_save", arguments: { key: "k" } },
  ];
  const results: ExecutedToolResult[] = [
    { id: "toolu_1", name: "memory_search", result: { hits: ["a"] }, replayed: false },
    { id: "toolu_2", name: "memory_save", result: { stored: true }, replayed: true },
  ];
  return {
    sourceBody,
    previousResponse,
    toolCalls,
    results,
    sourceFormat: "claude",
    maxResultBytes: MAX_RESULT_BYTES_PER_TOOL,
    ...overrides,
  } as BuildFollowUpTranscriptInput & {
    sourceBody: UnknownRecord;
    previousResponse: UnknownRecord;
    toolCalls: ToolCall[];
    results: ExecutedToolResult[];
  };
}

test("Claude: appends assistant tool_use turn, then a separate user tool_result message", () => {
  const input = claudeInput();
  const sourceBodySnapshot = JSON.parse(JSON.stringify(input.sourceBody));

  const out = buildFollowUpSourceBody(input);

  assert.notStrictEqual(out, input.sourceBody);
  assert.deepEqual(input.sourceBody, sourceBodySnapshot);
  assert.strictEqual(out.stream, true, "stream is not forced for Claude bodies");

  const messages = out.messages as UnknownRecord[];
  assert.strictEqual(messages.length, 3);
  assert.deepEqual(messages[0], input.sourceBody.messages[0]);

  const assistant = messages[1];
  assert.strictEqual(assistant.role, "assistant");
  const assistantBlocks = assistant.content as UnknownRecord[];
  assert.strictEqual(assistantBlocks.length, 3, "text + 2 tool_use blocks preserved");
  assert.strictEqual(assistantBlocks[0].type, "text");
  assert.strictEqual(assistantBlocks[0].text, "Let me look.");
  assert.ok(assistantBlocks.slice(1).every((block) => block.type === "tool_use"));
  assert.deepEqual(
    assistantBlocks.slice(1),
    input.previousResponse.content.filter((block: UnknownRecord) => block.type === "tool_use")
  );

  const user = messages[2];
  assert.strictEqual(user.role, "user");
  const resultBlocks = user.content as UnknownRecord[];
  assert.strictEqual(resultBlocks.length, 2);
  assert.ok(resultBlocks.every((block) => block.type === "tool_result"));
  assert.deepEqual(
    resultBlocks.map((block) => block.tool_use_id),
    ["toolu_1", "toolu_2"]
  );
  assert.strictEqual(resultBlocks[0].content, JSON.stringify({ hits: ["a"] }));
  assert.strictEqual(resultBlocks[1].content, JSON.stringify({ stored: true }));

  assert.deepEqual(out.tools, input.sourceBody.tools);
});

// ─── Task 4 Fix R1: Claude text/thinking block preservation ─────────────────

test("Claude: assistant content preserves original text blocks in original order", () => {
  const input = claudeInput();
  const out = buildFollowUpSourceBody(input);
  const messages = out.messages as UnknownRecord[];
  const assistant = messages[1];
  const assistantBlocks = assistant.content as UnknownRecord[];
  // Must include the text block (index 0) AND the two tool_use blocks
  assert.strictEqual(assistantBlocks.length, 3, "should have text + 2 tool_use blocks");
  assert.strictEqual(assistantBlocks[0].type, "text");
  assert.strictEqual(assistantBlocks[0].text, "Let me look.");
  assert.strictEqual(assistantBlocks[1].type, "tool_use");
  assert.strictEqual(assistantBlocks[1].id, "toolu_1");
  assert.strictEqual(assistantBlocks[2].type, "tool_use");
  assert.strictEqual(assistantBlocks[2].id, "toolu_2");
});

test("Claude: assistant content preserves thinking blocks alongside tool_use", () => {
  const input = claudeInput();
  (input.previousResponse as UnknownRecord).content = [
    { type: "thinking", thinking: "Let me reason about this.", signature: "sig_1" },
    { type: "text", text: "I'll search now." },
    { type: "tool_use", id: "toolu_1", name: "memory_search", input: { query: "foo" } },
    { type: "tool_use", id: "toolu_2", name: "memory_save", input: { key: "k" } },
  ];
  const out = buildFollowUpSourceBody(input);
  const messages = out.messages as UnknownRecord[];
  const assistantBlocks = messages[1].content as UnknownRecord[];
  assert.strictEqual(assistantBlocks.length, 4, "should have thinking + text + 2 tool_use");
  assert.strictEqual(assistantBlocks[0].type, "thinking");
  assert.strictEqual(assistantBlocks[0].thinking, "Let me reason about this.");
  assert.strictEqual(assistantBlocks[1].type, "text");
  assert.strictEqual(assistantBlocks[1].text, "I'll search now.");
  assert.strictEqual(assistantBlocks[2].type, "tool_use");
  assert.strictEqual(assistantBlocks[3].type, "tool_use");
});

test("Claude: assistant content filters unmatched tool_use but keeps text", () => {
  const input = claudeInput();
  (input.previousResponse as UnknownRecord).content = [
    { type: "text", text: "Looking..." },
    { type: "tool_use", id: "toolu_1", name: "memory_search", input: { query: "foo" } },
    { type: "tool_use", id: "toolu_UNMATCHED", name: "other_tool", input: {} },
    { type: "tool_use", id: "toolu_2", name: "memory_save", input: { key: "k" } },
  ];
  const out = buildFollowUpSourceBody(input);
  const messages = out.messages as UnknownRecord[];
  const assistantBlocks = messages[1].content as UnknownRecord[];
  // text preserved, unmatched tool_use filtered out, matched tool_use kept
  assert.strictEqual(assistantBlocks.length, 3);
  assert.strictEqual(assistantBlocks[0].type, "text");
  assert.strictEqual(assistantBlocks[1].id, "toolu_1");
  assert.strictEqual(assistantBlocks[2].id, "toolu_2");
});

test("Claude: strips text after first tool_use but preserves later thinking blocks", () => {
  const input = claudeInput();
  (input.previousResponse as UnknownRecord).content = [
    { type: "text", text: "before" },
    { type: "tool_use", id: "toolu_1", name: "memory_search", input: { query: "foo" } },
    { type: "text", text: "after — must be stripped" },
    { type: "thinking", thinking: "signed thought", signature: "sig_after" },
    { type: "tool_use", id: "toolu_2", name: "memory_save", input: { key: "k" } },
  ];

  const out = buildFollowUpSourceBody(input);
  const assistantBlocks = (out.messages as UnknownRecord[])[1].content as UnknownRecord[];
  assert.deepEqual(
    assistantBlocks.map((block) => block.type),
    ["text", "tool_use", "thinking", "tool_use"]
  );
  assert.equal(
    assistantBlocks.some(
      (block) => block.type === "text" && block.text === "after — must be stripped"
    ),
    false
  );
});

test("Claude: mismatched IDs fail closed even when response content would filter them", () => {
  const input = claudeInput({
    toolCalls: [
      { id: "toolu_1", name: "memory_search", arguments: { query: "foo" } },
      { id: "toolu_9", name: "client_tool", arguments: {} },
    ],
  });
  assert.throws(() => buildFollowUpSourceBody(input), /matching result/);
});
