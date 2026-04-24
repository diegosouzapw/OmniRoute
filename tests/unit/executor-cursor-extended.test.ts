import test from "node:test";
import assert from "node:assert/strict";

import { CursorExecutor } from "../../open-sse/executors/cursor.ts";
import {
  decodeMessage,
  encodeField,
  parseConnectRPCFrame,
  wrapConnectRPCFrame,
} from "../../open-sse/utils/cursorProtobuf.ts";
import {
  buildCursorHeaders,
  generateCursorChecksum,
  generateHashed64Hex,
  generateSessionId,
} from "../../open-sse/utils/cursorChecksum.ts";
import {
  getCursorVersion,
  resetCursorVersionCache,
} from "../../open-sse/utils/cursorVersionDetector.ts";

const LEN = 2;
const VARINT = 0;
const TOP_LEVEL_TOOL_CALL = 1;
const TOP_LEVEL_RESPONSE = 2;
const RESPONSE_TEXT = 1;
const TOOL_ID = 3;
const TOOL_NAME = 9;
const TOOL_RAW_ARGS = 10;
const TOOL_IS_LAST = 11;

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

function buildTextFrame(text) {
  return Buffer.from(
    wrapConnectRPCFrame(
      encodeField(TOP_LEVEL_RESPONSE, LEN, encodeField(RESPONSE_TEXT, LEN, text)),
      false
    )
  );
}

function buildCompressedTextFrame(text) {
  return Buffer.from(
    wrapConnectRPCFrame(
      encodeField(TOP_LEVEL_RESPONSE, LEN, encodeField(RESPONSE_TEXT, LEN, text)),
      true
    )
  );
}

function buildToolCallFrame({ id, name, args, isLast }) {
  return Buffer.from(
    wrapConnectRPCFrame(
      encodeField(
        TOP_LEVEL_TOOL_CALL,
        LEN,
        concatArrays(
          encodeField(TOOL_ID, LEN, id),
          encodeField(TOOL_NAME, LEN, name),
          encodeField(TOOL_RAW_ARGS, LEN, args),
          encodeField(TOOL_IS_LAST, VARINT, isLast ? 1 : 0)
        )
      ),
      false
    )
  );
}

function buildJsonErrorFrame(error) {
  return Buffer.from(wrapConnectRPCFrame(new TextEncoder().encode(JSON.stringify(error)), false));
}

test("CursorExecutor.buildUrl uses the configured Cursor endpoint", () => {
  const executor = new CursorExecutor();
  assert.equal(
    executor.buildUrl(),
    "https://api2.cursor.sh/aiserver.v1.ChatService/StreamUnifiedChatWithTools"
  );
});

test("CursorExecutor.buildHeaders strips token prefixes and derives checksum/session headers", () => {
  const executor = new CursorExecutor();
  const originalDateNow = Date.now;
  const originalDbPath = process.env.CURSOR_STATE_DB_PATH;
  // Force fallback by pointing to a non-existent DB path
  process.env.CURSOR_STATE_DB_PATH = "/nonexistent/cursor/state.vscdb";
  resetCursorVersionCache();
  Date.now = () => 1_700_000_000_000;

  try {
    const headers = executor.buildHeaders({
      accessToken: "prefix::real-token",
      providerSpecificData: { machineId: "machine-1", ghostMode: false },
    });

    const expectedVersion = getCursorVersion();

    assert.equal(headers.authorization, "Bearer real-token");
    assert.equal(headers["x-client-key"], generateHashed64Hex("real-token"));
    assert.equal(headers["x-session-id"], generateSessionId("real-token"));
    assert.equal(headers["x-cursor-checksum"], generateCursorChecksum("machine-1"));
    assert.equal(headers["x-cursor-client-version"], expectedVersion);
    assert.equal(headers["x-cursor-user-agent"], `Cursor/${expectedVersion}`);
    assert.equal(headers["user-agent"], `Cursor/${expectedVersion}`);
    assert.equal(headers["x-ghost-mode"], "false");
    assert.equal(headers["connect-protocol-version"], "1");
    assert.match(headers["x-amzn-trace-id"], /^Root=/);
    assert.ok(headers["x-request-id"]);
  } finally {
    Date.now = originalDateNow;
    if (originalDbPath === undefined) {
      delete process.env.CURSOR_STATE_DB_PATH;
    } else {
      process.env.CURSOR_STATE_DB_PATH = originalDbPath;
    }
    resetCursorVersionCache();
  }
});

test("buildCursorHeaders utility stays aligned with Cursor Composer 2 versioned headers", () => {
  const originalDbPath = process.env.CURSOR_STATE_DB_PATH;
  process.env.CURSOR_STATE_DB_PATH = "/nonexistent/cursor/state.vscdb";
  resetCursorVersionCache();

  try {
    const headers = buildCursorHeaders("prefix::real-token", "machine-1", false);
    const expectedVersion = getCursorVersion();

    assert.equal(headers.Authorization, "Bearer real-token");
    assert.equal(headers["x-cursor-client-version"], expectedVersion);
    assert.equal(headers["x-cursor-user-agent"], `Cursor/${expectedVersion}`);
    assert.equal(headers["User-Agent"], `Cursor/${expectedVersion}`);
    assert.equal(headers["x-ghost-mode"], "false");
  } finally {
    if (originalDbPath === undefined) {
      delete process.env.CURSOR_STATE_DB_PATH;
    } else {
      process.env.CURSOR_STATE_DB_PATH = originalDbPath;
    }
    resetCursorVersionCache();
  }
});

test("CursorExecutor.buildHeaders derives machineId when not provided", () => {
  const executor = new CursorExecutor();
  const headers = executor.buildHeaders({ accessToken: "real-token", providerSpecificData: {} });
  assert.ok(headers["x-cursor-checksum"], "should have a checksum header");
  assert.ok(headers["x-client-key"], "should have a client key header");
});

test("CursorExecutor.transformRequest produces a framed protobuf payload", () => {
  const executor = new CursorExecutor();
  const transformed = executor.transformRequest(
    "claude-3.5-sonnet",
    { messages: [{ role: "user", content: "Hello" }], tools: [] },
    true,
    {}
  );
  const frame = parseConnectRPCFrame(transformed);
  const fields = decodeMessage(frame.payload);

  assert.ok(transformed instanceof Uint8Array);
  assert.equal(frame.flags, 0);
  assert.equal(frame.consumed, transformed.length);
  assert.equal(fields.has(1), true);
});

test("CursorExecutor.transformProtobufToJSON aggregates text and split tool call arguments", async () => {
  const executor = new CursorExecutor();
  const body = { messages: [{ role: "user", content: "hi" }] };
  const buffer = Buffer.concat([
    buildTextFrame("Hello "),
    buildToolCallFrame({
      id: "call_1",
      name: "read_file",
      args: '{"path":',
      isLast: false,
    }),
    buildToolCallFrame({
      id: "call_1",
      name: "read_file",
      args: '"/tmp/a"}',
      isLast: true,
    }),
  ]);

  const response = executor.transformProtobufToJSON(buffer, "cursor-small", body);
  const payload = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(payload.object, "chat.completion");
  assert.equal(payload.model, "cursor-small");
  assert.equal(payload.choices[0].message.content, "Hello ");
  assert.equal(payload.choices[0].finish_reason, "tool_calls");
  assert.equal(payload.choices[0].message.tool_calls[0].function.name, "read_file");
  assert.equal(payload.choices[0].message.tool_calls[0].function.arguments, '{"path":"/tmp/a"}');
  assert.equal(payload.usage.estimated, true);
});

test("CursorExecutor.transformProtobufToJSON finalizes incomplete tool calls when the stream ends early", async () => {
  const executor = new CursorExecutor();
  const response = executor.transformProtobufToJSON(
    Buffer.concat([
      buildToolCallFrame({
        id: "call_2",
        name: "list_files",
        args: '{"path":"/tmp"}',
        isLast: false,
      }),
    ]),
    "cursor-small",
    { messages: [{ role: "user", content: "hi" }] }
  );
  const payload = (await response.json()) as any;

  assert.equal(payload.choices[0].finish_reason, "tool_calls");
  assert.equal(payload.choices[0].message.tool_calls[0].id, "call_2");
  assert.equal(payload.choices[0].message.tool_calls[0].function.name, "list_files");
});

test("CursorExecutor.transformProtobufToJSON keeps prior content when an error frame arrives after output", async () => {
  const executor = new CursorExecutor();
  const response = executor.transformProtobufToJSON(
    Buffer.concat([
      buildTextFrame("Partial answer"),
      buildJsonErrorFrame({
        error: {
          code: "resource_exhausted",
          message: "late error",
        },
      }),
    ]),
    "cursor-small",
    { messages: [{ role: "user", content: "hi" }] }
  );
  const payload = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(payload.choices[0].message.content, "Partial answer");
  assert.equal(payload.choices[0].finish_reason, "stop");
});

test("CursorExecutor.transformProtobufToJSON decompresses gzip frames", async () => {
  const executor = new CursorExecutor();
  const response = executor.transformProtobufToJSON(
    Buffer.concat([buildCompressedTextFrame("Compressed answer")]),
    "cursor-small",
    { messages: [{ role: "user", content: "hi" }] }
  );
  const payload = (await response.json()) as any;

  assert.equal(payload.choices[0].message.content, "Compressed answer");
});

test("CursorExecutor.transformProtobufToSSE emits assistant chunks, tool deltas and DONE marker", async () => {
  const executor = new CursorExecutor();
  const body = { messages: [{ role: "user", content: "hi" }] };
  const buffer = Buffer.concat([
    buildTextFrame("Hello "),
    buildToolCallFrame({
      id: "call_1",
      name: "read_file",
      args: '{"path":',
      isLast: false,
    }),
    buildToolCallFrame({
      id: "call_1",
      name: "read_file",
      args: '"/tmp/a"}',
      isLast: true,
    }),
  ]);

  const response = executor.transformProtobufToSSE(buffer, "cursor-small", body);
  const text = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "text/event-stream");
  assert.match(text, /"role":"assistant","content":"Hello "/);
  assert.match(text, /"tool_calls":\[/);
  assert.match(text, /"name":"read_file"/);
  assert.match(text, /"finish_reason":"tool_calls"/);
  assert.match(text, /\[DONE\]/);
});

test("CursorExecutor.transformProtobufToSSE finalizes unterminated tool calls at stream end", async () => {
  const executor = new CursorExecutor();
  const response = executor.transformProtobufToSSE(
    Buffer.concat([
      buildToolCallFrame({
        id: "call_2",
        name: "read_file",
        args: '{"path":"/tmp/b"}',
        isLast: false,
      }),
    ]),
    "cursor-small",
    { messages: [{ role: "user", content: "hi" }] }
  );
  const text = await response.text();

  assert.match(text, /"name":"read_file"/);
  assert.match(text, /"finish_reason":"tool_calls"/);
  assert.match(text, /\[DONE\]/);
});

test("CursorExecutor.transformProtobufToSSE returns a JSON error before any content is streamed", async () => {
  const executor = new CursorExecutor();
  const response = executor.transformProtobufToSSE(
    buildJsonErrorFrame({
      error: {
        code: "resource_exhausted",
        message: "too many requests",
        details: [{ debug: { error: "LIMIT", details: { title: "Limit hit" } } }],
      },
    }),
    "cursor-small",
    { messages: [{ role: "user", content: "hi" }] }
  );
  const payload = (await response.json()) as any;

  assert.equal(response.status, 429);
  assert.equal(payload.error.type, "rate_limit_error");
  assert.equal(payload.error.message, "Limit hit");
  assert.equal(payload.error.code, "LIMIT");
});

test("CursorExecutor.transformProtobufToSSE stops gracefully when a JSON error arrives after content", async () => {
  const executor = new CursorExecutor();
  const response = executor.transformProtobufToSSE(
    Buffer.concat([
      buildTextFrame("Partial Cursor answer"),
      buildJsonErrorFrame({
        error: {
          code: "resource_exhausted",
          message: "late limit",
        },
      }),
    ]),
    "cursor-small",
    { messages: [{ role: "user", content: "hi" }] }
  );
  const text = await response.text();

  assert.equal(response.status, 200);
  assert.match(text, /Partial Cursor answer/);
  assert.match(text, /"finish_reason":"stop"/);
  assert.match(text, /\[DONE\]/);
});

test("CursorExecutor.transformProtobufToSSE emits plain content deltas after tool call chunks", async () => {
  const executor = new CursorExecutor();
  const response = executor.transformProtobufToSSE(
    Buffer.concat([
      buildToolCallFrame({
        id: "call_3",
        name: "read_file",
        args: '{"path":"/tmp/c"}',
        isLast: false,
      }),
      buildTextFrame("Follow-up text"),
    ]),
    "cursor-small",
    { messages: [{ role: "user", content: "hi" }] }
  );
  const text = await response.text();

  assert.match(text, /"name":"read_file"/);
  assert.match(text, /"delta":\{"content":"Follow-up text"\}/);
  assert.match(text, /"finish_reason":"tool_calls"/);
});

test("CursorExecutor.transformProtobufToSSE emits an empty assistant envelope for empty responses", async () => {
  const executor = new CursorExecutor();
  const response = executor.transformProtobufToSSE(Buffer.alloc(0), "cursor-small", {
    messages: [{ role: "user", content: "hi" }],
  });
  const text = await response.text();

  assert.match(text, /"role":"assistant","content":""/);
  assert.match(text, /"finish_reason":"stop"/);
  assert.match(text, /\[DONE\]/);
});

test("CursorExecutor.transformProtobufToSSE converts JSON error frames into rate-limit responses", async () => {
  const executor = new CursorExecutor();
  const response = executor.transformProtobufToSSE(
    buildJsonErrorFrame({
      error: {
        code: "resource_exhausted",
        message: "rate limited",
        details: [{ debug: { error: "LIMIT", details: { title: "Limit", detail: "Slow down" } } }],
      },
    }),
    "cursor-small",
    { messages: [{ role: "user", content: "hi" }] }
  );
  const payload = (await response.json()) as any;

  assert.equal(response.status, 429);
  assert.equal(payload.error.type, "rate_limit_error");
  assert.equal(payload.error.message, "Limit");
  assert.equal(payload.error.code, "LIMIT");
});

test("CursorExecutor.execute returns transformed JSON for non-stream responses", async () => {
  const executor = new CursorExecutor();
  const body = { messages: [{ role: "user", content: "hi" }] };
  const responseBuffer = Buffer.concat([buildTextFrame("Hello from Cursor")]);
  executor.makeHttp2Request = async () => ({
    status: 200,
    headers: {},
    body: responseBuffer,
  });
  executor.makeFetchRequest = executor.makeHttp2Request;

  const result = await executor.execute({
    model: "cursor-small",
    body,
    stream: false,
    credentials: {
      accessToken: "token",
      providerSpecificData: { machineId: "machine-1" },
    },
  });
  const payload = (await result.response.json()) as any;

  assert.equal(
    result.url,
    "https://api2.cursor.sh/aiserver.v1.ChatService/StreamUnifiedChatWithTools"
  );
  assert.equal(result.transformedBody, body);
  assert.equal(result.headers.authorization, "Bearer token");
  assert.equal(payload.object, "chat.completion");
  assert.equal(payload.choices[0].message.content, "Hello from Cursor");
  assert.equal(payload.choices[0].finish_reason, "stop");
});

test("CursorExecutor.execute returns transformed SSE for stream responses", async () => {
  const executor = new CursorExecutor();
  const body = { messages: [{ role: "user", content: "hi" }] };
  const responseBuffer = Buffer.concat([buildTextFrame("Hello stream")]);
  executor.makeHttp2Request = async () => ({
    status: 200,
    headers: {},
    body: responseBuffer,
  });
  executor.makeFetchRequest = executor.makeHttp2Request;

  const result = await executor.execute({
    model: "cursor-small",
    body,
    stream: true,
    credentials: {
      accessToken: "token",
      providerSpecificData: { machineId: "machine-1" },
    },
  });
  const text = await result.response.text();

  assert.equal(result.response.status, 200);
  assert.match(text, /"content":"Hello stream"/);
  assert.match(text, /\[DONE\]/);
});

test("CursorExecutor.execute maps non-200 upstream responses to OpenAI-style errors", async () => {
  const executor = new CursorExecutor();
  const body = { messages: [{ role: "user", content: "hi" }] };
  executor.makeHttp2Request = async () => ({
    status: 403,
    headers: {},
    body: Buffer.from("denied"),
  });
  executor.makeFetchRequest = executor.makeHttp2Request;

  const result = await executor.execute({
    model: "cursor-small",
    body,
    stream: false,
    credentials: {
      accessToken: "token",
      providerSpecificData: { machineId: "machine-1" },
    },
  });
  const payload = (await result.response.json()) as any;

  assert.equal(result.response.status, 403);
  assert.equal(payload.error.type, "invalid_request_error");
  assert.match(payload.error.message, /\[403\]: denied/);
});

test("CursorExecutor.execute maps transport failures to connection_error and refreshCredentials returns null", async () => {
  const executor = new CursorExecutor();
  executor.makeHttp2Request = async () => {
    throw new Error("socket hang up");
  };
  executor.makeFetchRequest = executor.makeHttp2Request;

  const result = await executor.execute({
    model: "cursor-small",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: {
      accessToken: "token",
      providerSpecificData: { machineId: "machine-1" },
    },
  });
  const payload = (await result.response.json()) as any;

  assert.equal(result.response.status, 500);
  assert.equal(payload.error.type, "connection_error");
  assert.equal(payload.error.message, "socket hang up");
  assert.equal(await executor.refreshCredentials(), null);
});

test("CursorExecutor.transformProtobufToSSE finalizes un-terminated tools when stream abruptly cuts before isLast", async () => {
  const executor = new CursorExecutor();

  // Send a tool call but never close it
  const response = executor.transformProtobufToSSE(
    Buffer.concat([
      buildToolCallFrame({
        id: "call_abrupt",
        name: "write_file",
        args: '{"content":"partial"',
        isLast: false,
      }),
    ]),
    "cursor-small",
    { messages: [{ role: "user", content: "hi" }] }
  );

  const text = await response.text();
  assert.match(text, /"name":"write_file"/);
  assert.match(text, /"finish_reason":"tool_calls"/);
  assert.match(text, /\[DONE\]/);
});
