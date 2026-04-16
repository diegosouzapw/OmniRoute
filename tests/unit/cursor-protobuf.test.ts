import test from "node:test";
import assert from "node:assert/strict";

import {
  buildChatRequest,
  decodeMessage,
  decodeField,
  encodeField,
  encodeMcpTool,
  extractTextFromResponse,
  generateCursorBody,
  parseConnectRPCFrame,
  wrapConnectRPCFrame,
} from "../../open-sse/utils/cursorProtobuf.ts";

const LEN = 2;
const VARINT = 0;
const TOP_LEVEL_TOOL_CALL = 1;
const TOP_LEVEL_RESPONSE = 2;
const RESPONSE_TEXT = 1;
const THINKING = 25;
const THINKING_TEXT = 1;
const TOOL_ID = 3;
const TOOL_NAME = 9;
const TOOL_RAW_ARGS = 10;
const TOOL_IS_LAST_ALT = 15;
const TOOL_MCP_PARAMS = 27;
const MCP_TOOLS_LIST = 1;
const MCP_NESTED_NAME = 1;
const MCP_NESTED_PARAMS = 3;

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function concatArrays(...arrays) {
  const total = arrays.reduce((sum, array) => sum + array.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;

  for (const array of arrays) {
    result.set(array, offset);
    offset += array.length;
  }

  return result;
}

test("parseConnectRPCFrame round-trips compressed payloads", () => {
  const payload = textEncoder.encode("cursor-frame");
  const frame = wrapConnectRPCFrame(payload, true);
  const parsed = parseConnectRPCFrame(frame);

  assert.equal(parsed.flags, 1);
  assert.equal(parsed.consumed, frame.length);
  assert.equal(textDecoder.decode(parsed.payload), "cursor-frame");
});

test("parseConnectRPCFrame returns null for truncated frames", () => {
  const payload = textEncoder.encode("short");
  const frame = wrapConnectRPCFrame(payload, false);

  assert.equal(parseConnectRPCFrame(frame.slice(0, frame.length - 1)), null);
});

test("parseConnectRPCFrame keeps the raw payload when a compressed frame is not valid gzip", () => {
  const payload = textEncoder.encode("not-gzip");
  const frame = new Uint8Array(5 + payload.length);
  frame[0] = 0x01;
  frame[1] = (payload.length >> 24) & 0xff;
  frame[2] = (payload.length >> 16) & 0xff;
  frame[3] = (payload.length >> 8) & 0xff;
  frame[4] = payload.length & 0xff;
  frame.set(payload, 5);

  const parsed = parseConnectRPCFrame(frame);

  assert.equal(parsed.flags, 0x01);
  assert.equal(parsed.consumed, frame.length);
  assert.equal(textDecoder.decode(parsed.payload), "not-gzip");
});

test("decodeField handles fixed-width wire types and past-end offsets", () => {
  const buffer = Uint8Array.from([
    (1 << 3) | 1,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    (2 << 3) | 5,
    9,
    10,
    11,
    12,
  ]);

  const [field1, wire1, value1, pos1] = decodeField(buffer, 0);
  const [field2, wire2, value2, pos2] = decodeField(buffer, pos1);
  const pastEnd = decodeField(buffer, pos2);

  assert.equal(field1, 1);
  assert.equal(wire1, 1);
  assert.deepEqual([...value1], [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(field2, 2);
  assert.equal(wire2, 5);
  assert.deepEqual([...value2], [9, 10, 11, 12]);
  assert.deepEqual(pastEnd, [null, null, null, pos2]);
});

test("extractTextFromResponse reads MCP nested tool metadata and alternate last-tool flag", () => {
  const toolCallPayload = encodeField(
    TOP_LEVEL_TOOL_CALL,
    LEN,
    concatArrays(
      encodeField(TOOL_ID, LEN, "call_1"),
      encodeField(TOOL_NAME, LEN, "mcp_custom_placeholder"),
      encodeField(TOOL_RAW_ARGS, LEN, "{}"),
      encodeField(TOOL_IS_LAST_ALT, VARINT, 1),
      encodeField(
        TOOL_MCP_PARAMS,
        LEN,
        encodeField(
          MCP_TOOLS_LIST,
          LEN,
          concatArrays(
            encodeField(MCP_NESTED_NAME, LEN, "read_file"),
            encodeField(MCP_NESTED_PARAMS, LEN, '{"path":"/tmp/a"}')
          )
        )
      )
    )
  );

  const extracted = extractTextFromResponse(toolCallPayload);

  assert.equal(extracted.toolCall.id, "call_1");
  assert.equal(extracted.toolCall.function.name, "read_file");
  assert.equal(extracted.toolCall.function.arguments, '{"path":"/tmp/a"}');
  assert.equal(extracted.toolCall.isLast, true);
});

test("extractTextFromResponse falls back to raw args when MCP metadata is absent", () => {
  const toolCallPayload = encodeField(
    TOP_LEVEL_TOOL_CALL,
    LEN,
    concatArrays(
      encodeField(TOOL_ID, LEN, "call_fallback"),
      encodeField(TOOL_NAME, LEN, "read_file"),
      encodeField(TOOL_RAW_ARGS, LEN, '{"path":"/tmp/fallback"}')
    )
  );

  const extracted = extractTextFromResponse(toolCallPayload);

  assert.equal(extracted.toolCall.id, "call_fallback");
  assert.equal(extracted.toolCall.function.name, "read_file");
  assert.equal(extracted.toolCall.function.arguments, '{"path":"/tmp/fallback"}');
  assert.equal(extracted.toolCall.isLast, false);
});

test("extractTextFromResponse ignores incomplete tool call payloads", () => {
  const toolCallPayload = encodeField(
    TOP_LEVEL_TOOL_CALL,
    LEN,
    encodeField(TOOL_NAME, LEN, "read_file")
  );

  assert.deepEqual(extractTextFromResponse(toolCallPayload), {
    text: null,
    error: null,
    toolCall: null,
    thinking: null,
  });
});

test("extractTextFromResponse returns text and thinking blocks from response payloads", () => {
  const responsePayload = encodeField(
    TOP_LEVEL_RESPONSE,
    LEN,
    concatArrays(
      encodeField(RESPONSE_TEXT, LEN, "hello"),
      encodeField(THINKING, LEN, encodeField(THINKING_TEXT, LEN, "reasoning"))
    )
  );

  const extracted = extractTextFromResponse(responsePayload);

  assert.equal(extracted.text, "hello");
  assert.equal(extracted.thinking, "reasoning");
  assert.equal(extracted.toolCall, null);
});

test("generateCursorBody encodes tool metadata, message ids and high reasoning mode", () => {
  const framed = generateCursorBody(
    [
      { role: "user", content: "Hello" },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: {
              name: "mcp__repo__read_file",
              arguments: '{"path":"/tmp/a"}',
            },
          },
        ],
        tool_results: [
          {
            tool_call_id: "call_1\nmc_model_1",
            name: "mcp__repo__read_file",
            index: 1,
            raw_args: '{"path":"/tmp/a"}',
            result: "file contents",
          },
        ],
      },
    ],
    "cursor-small",
    [
      {
        function: {
          name: "read_file",
          description: "Read a file",
          parameters: { type: "object", properties: { path: { type: "string" } } },
        },
      },
    ],
    "high"
  );

  const parsed = parseConnectRPCFrame(framed);
  const topLevel = decodeMessage(parsed.payload);
  const request = decodeMessage(topLevel.get(1)[0].value);

  assert.equal(parsed.flags, 0);
  assert.equal(request.has(29), true);
  assert.equal(request.has(34), true);
  assert.equal(request.has(30), true);
  assert.equal(request.get(30).length >= 2, true);
  assert.equal(request.get(49)[0].value, 2);
});

test("buildChatRequest normalizes mixed assistant tool payloads without duplicating matching tool-result messages", () => {
  const requestFrame = buildChatRequest(
    [
      { role: "user", content: "Hello" },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: {
              name: "mcp__repo__read_file",
              arguments: '{"path":"/tmp/a"}',
            },
          },
        ],
        tool_results: [
          {
            tool_call_id: "call_1\nmc_model_1",
            name: "mcp__repo__read_file",
            index: 1,
            raw_args: '{"path":"/tmp/a"}',
            result: "file contents",
          },
        ],
      },
      {
        role: "assistant",
        content: "",
        tool_results: [
          {
            tool_call_id: "call_1\nmc_model_1",
            name: "mcp__repo__read_file",
            index: 1,
            raw_args: '{"path":"/tmp/a"}',
            result: "file contents",
          },
        ],
      },
    ],
    "cursor-small",
    [
      {
        name: "read_file",
        description: "Read a file",
      },
    ],
    "medium"
  );
  const topLevel = decodeMessage(requestFrame);
  const request = decodeMessage(topLevel.get(1)[0].value);

  assert.equal(request.get(1).length, 3);
  assert.equal(request.get(27)[0].value, 1);
  assert.equal(request.get(48)[0].value, 0);
  assert.equal(request.get(49)[0].value, 1);
  assert.equal(request.has(29), true);
  assert.equal(request.has(34), true);
});

test("encodeMcpTool keeps the custom server field even when name and schema are missing", () => {
  const encoded = encodeMcpTool({ description: "" });
  const decoded = decodeMessage(encoded);

  assert.equal(decoded.has(1), false);
  assert.equal(decoded.has(2), false);
  assert.equal(decoded.has(3), false);
  assert.equal(textDecoder.decode(decoded.get(4)[0].value), "custom");
});
