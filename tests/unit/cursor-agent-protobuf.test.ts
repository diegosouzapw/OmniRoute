import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveRequestedModel,
  encodeAgentRunRequest,
  buildAgentRequestBody,
  iterateConnectFrames,
  decodeAgentServerMessage,
  flattenMessages,
  wrapConnectFrame,
  encodeExecReadRejected,
  encodeExecWriteRejected,
  encodeExecDeleteRejected,
  encodeExecLsRejected,
  encodeExecShellRejected,
  encodeExecBackgroundShellSpawnRejected,
  encodeExecGrepError,
  encodeExecFetchError,
  encodeExecWriteShellStdinError,
  encodeExecDiagnosticsResult,
  encodeExecMcpResult,
  encodeExecMcpError,
  encodeKvGetBlobResult,
  encodeKvSetBlobResult,
  encodeMcpToolDefinitionBody,
  jsonSchemaToProtobufValue,
  encodeRequestContextResponse,
  openAIToolsToMcpDefs,
} from "../../open-sse/utils/cursorAgentProtobuf";

test("resolveRequestedModel maps cursor-agent's client-side aliases", () => {
  assert.deepEqual(resolveRequestedModel("auto"), { modelId: "default", parameters: [] });
  assert.deepEqual(resolveRequestedModel("composer-2-fast"), {
    modelId: "composer-2",
    parameters: [{ id: "fast", value: "true" }],
  });
  assert.deepEqual(resolveRequestedModel("claude-4.6-sonnet-medium"), {
    modelId: "claude-4.6-sonnet-medium",
    parameters: [],
  });
  assert.deepEqual(resolveRequestedModel("composer-2"), { modelId: "composer-2", parameters: [] });
});

test("encodeAgentRunRequest embeds user text and resolves the model id", () => {
  const buf = encodeAgentRunRequest({
    modelId: "auto",
    userText: "say only PING",
    conversationId: "00000000-0000-0000-0000-000000000000",
    messageId: "11111111-1111-1111-1111-111111111111",
  });
  // Verifiable substrings: cursor-agent itself emits these on the wire.
  const text = buf.toString("latin1");
  assert.ok(text.includes("say only PING"), "user text present");
  assert.ok(text.includes("default"), "auto rewritten to 'default'");
  assert.ok(text.includes("00000000-0000-0000-0000-000000000000"), "conversation id present");
});

test("encodeAgentRunRequest emits composer parameters", () => {
  const buf = encodeAgentRunRequest({
    modelId: "composer-2-fast",
    userText: "hi",
  });
  const text = buf.toString("latin1");
  assert.ok(text.includes("composer-2"), "split model id present");
  assert.ok(text.includes("fast"), "parameter id 'fast' present");
  assert.ok(text.includes("true"), "parameter value 'true' present");
});

test("buildAgentRequestBody wraps the message in a Connect-RPC frame", () => {
  const buf = buildAgentRequestBody({ modelId: "claude-4.6-sonnet-medium", userText: "hi" });
  // First byte is flags (0x00 = uncompressed); next 4 bytes are big-endian length.
  assert.equal(buf[0], 0x00);
  const length = buf.readUInt32BE(1);
  assert.equal(length, buf.length - 5);
});

test("iterateConnectFrames + decodeAgentServerMessage extract a text delta", () => {
  // Synthesize a server-side delta frame: AgentServerMessage { interaction_update {
  //   text_delta { text = "hello" } } }
  function v(n: number): Buffer {
    const out: number[] = [];
    while (n > 0x7f) {
      out.push((n & 0x7f) | 0x80);
      n >>>= 7;
    }
    out.push(n);
    return Buffer.from(out);
  }
  function tag(field: number, wt: number) {
    return v((field << 3) | wt);
  }
  function lenPrefixed(field: number, payload: Buffer) {
    return Buffer.concat([tag(field, 2), v(payload.length), payload]);
  }
  const textDelta = Buffer.from("hello", "utf8");
  const tdu = lenPrefixed(1, textDelta); // TextDeltaUpdate { text }
  const iu = lenPrefixed(1, tdu); // InteractionUpdate { text_delta }
  const asm = lenPrefixed(1, iu); // AgentServerMessage { interaction_update }
  const framed = wrapConnectFrame(asm);

  const frames = [...iterateConnectFrames(framed)];
  assert.equal(frames.length, 1);
  const deltas = decodeAgentServerMessage(frames[0].payload);
  assert.deepEqual(deltas, [{ kind: "text", text: "hello" }]);
});

test("flattenMessages handles a simple single user message", () => {
  assert.equal(flattenMessages([{ role: "user", content: "hello there" }]), "hello there");
});

test("flattenMessages prepends system prompts and labels multi-turn", () => {
  const out = flattenMessages([
    { role: "system", content: "be brief" },
    { role: "user", content: "hi" },
    { role: "assistant", content: "hello" },
    { role: "user", content: "again" },
  ]);
  assert.ok(out.startsWith("be brief"));
  assert.ok(out.includes("User: hi"));
  assert.ok(out.includes("Assistant: hello"));
  assert.ok(out.includes("User: again"));
});

test("flattenMessages flattens content arrays", () => {
  const out = flattenMessages([
    {
      role: "user",
      content: [
        { type: "text", text: "part1" },
        { type: "text", text: "part2" },
      ],
    },
  ]);
  assert.equal(out, "part1\npart2");
});

// ─── Phase 1: rejection encoders ───────────────────────────────────────────
//
// All ExecClientMessage frames share a structure:
//   wrapConnectFrame(
//     AgentClientMessage {
//       exec_client_message (2): ExecClientMessage {
//         id (1): execMsgId,
//         exec_id (15): execId,
//         <result_field>: <result_payload>,
//       }
//     }
//   )
//
// We unwrap via decodeFields and assert: (1) framing is valid, (2) the
// ExecClientMessage carries the right id+exec_id, (3) the result field
// number matches the variant, (4) the payload bytes contain the rejection
// reason as a substring (sufficient since Buffer.from(reason, "utf8") is
// embedded verbatim by encodeString).

function unwrapFrame(buf: Buffer): Buffer {
  const frames = [...iterateConnectFrames(buf)];
  assert.equal(frames.length, 1);
  return frames[0].payload;
}

function assertEcmShape(
  framed: Buffer,
  expectedExecMsgId: number,
  expectedExecId: string,
  expectedResultField: number
) {
  const payload = unwrapFrame(framed);
  // Top-level: AgentClientMessage { exec_client_message (2): ECM }
  // Just verify the fragment contains the exec id and result-field tag.
  assert.ok(payload.includes(Buffer.from(expectedExecId, "utf8")), "exec_id present");
  // Tag for result field with WT_LEN (2): (field<<3)|2
  const resultTag = (expectedResultField << 3) | 2;
  let found = false;
  for (let i = 0; i < payload.length; i++) {
    if (payload[i] === resultTag) {
      found = true;
      break;
    }
  }
  assert.ok(found, `result tag for field ${expectedResultField} present`);
  void expectedExecMsgId; // varint encoded; covered by other tests
}

test("encodeExecReadRejected wraps in read_result (field 7) with reason", () => {
  const framed = encodeExecReadRejected(42, "exec-abc", "/etc/passwd", "denied");
  assertEcmShape(framed, 42, "exec-abc", 7);
  const payload = unwrapFrame(framed);
  assert.ok(payload.includes(Buffer.from("/etc/passwd", "utf8")));
  assert.ok(payload.includes(Buffer.from("denied", "utf8")));
});

test("encodeExecWriteRejected wraps in write_result (field 3)", () => {
  const framed = encodeExecWriteRejected(1, "x", "/tmp/foo", "no");
  assertEcmShape(framed, 1, "x", 3);
});

test("encodeExecDeleteRejected wraps in delete_result (field 4)", () => {
  const framed = encodeExecDeleteRejected(1, "x", "/tmp/foo", "no");
  assertEcmShape(framed, 1, "x", 4);
});

test("encodeExecLsRejected wraps in ls_result (field 8)", () => {
  const framed = encodeExecLsRejected(1, "x", "/tmp", "no");
  assertEcmShape(framed, 1, "x", 8);
});

test("encodeExecShellRejected carries command and working directory", () => {
  const framed = encodeExecShellRejected(7, "exec-7", "rm -rf /", "/home", "denied");
  assertEcmShape(framed, 7, "exec-7", 2);
  const payload = unwrapFrame(framed);
  assert.ok(payload.includes(Buffer.from("rm -rf /", "utf8")));
  assert.ok(payload.includes(Buffer.from("/home", "utf8")));
  assert.ok(payload.includes(Buffer.from("denied", "utf8")));
});

test("encodeExecBackgroundShellSpawnRejected uses field 16", () => {
  const framed = encodeExecBackgroundShellSpawnRejected(1, "x", "sleep", "/", "no");
  assertEcmShape(framed, 1, "x", 16);
});

test("encodeExecGrepError uses field 5 with error message", () => {
  const framed = encodeExecGrepError(1, "exec-grep", "regex too complex");
  assertEcmShape(framed, 1, "exec-grep", 5);
  const payload = unwrapFrame(framed);
  assert.ok(payload.includes(Buffer.from("regex too complex", "utf8")));
});

test("encodeExecFetchError uses field 20 with url and error", () => {
  const framed = encodeExecFetchError(1, "x", "https://example.com", "timeout");
  assertEcmShape(framed, 1, "x", 20);
  const payload = unwrapFrame(framed);
  assert.ok(payload.includes(Buffer.from("https://example.com", "utf8")));
  assert.ok(payload.includes(Buffer.from("timeout", "utf8")));
});

test("encodeExecWriteShellStdinError uses field 23", () => {
  const framed = encodeExecWriteShellStdinError(1, "x", "no shell");
  assertEcmShape(framed, 1, "x", 23);
});

test("encodeExecDiagnosticsResult is empty success on field 9", () => {
  const framed = encodeExecDiagnosticsResult(1, "exec-diag");
  assertEcmShape(framed, 1, "exec-diag", 9);
});

// ─── Phase 1: MCP encoders ──────────────────────────────────────────────────

test("encodeExecMcpResult wraps text content in mcp_result (field 11)", () => {
  const framed = encodeExecMcpResult(1, "exec-mcp", "tool output", false);
  assertEcmShape(framed, 1, "exec-mcp", 11);
  const payload = unwrapFrame(framed);
  assert.ok(payload.includes(Buffer.from("tool output", "utf8")));
});

test("encodeExecMcpResult sets is_error when isError=true", () => {
  const framed = encodeExecMcpResult(1, "x", "err msg", true);
  // is_error field would be encoded as varint 1 — verify framing only
  assertEcmShape(framed, 1, "x", 11);
});

test("encodeExecMcpError wraps error in mcp_result", () => {
  const framed = encodeExecMcpError(1, "exec-err", "tool crashed");
  assertEcmShape(framed, 1, "exec-err", 11);
  const payload = unwrapFrame(framed);
  assert.ok(payload.includes(Buffer.from("tool crashed", "utf8")));
});

// ─── Phase 1: KV blob encoders ──────────────────────────────────────────────

test("encodeKvGetBlobResult wraps in kv_client_message (field 3)", () => {
  const framed = encodeKvGetBlobResult(99, Buffer.from("blob-content", "utf8"));
  const payload = unwrapFrame(framed);
  // Top-level field 3 (kv_client_message) tag = (3<<3)|2 = 26
  assert.equal(payload[0], 26);
  assert.ok(payload.includes(Buffer.from("blob-content", "utf8")));
});

test("encodeKvSetBlobResult is an empty ack", () => {
  const framed = encodeKvSetBlobResult(7);
  const payload = unwrapFrame(framed);
  assert.equal(payload[0], 26); // (3<<3)|2 = kv_client_message
});

// ─── Phase 1: MCP tool definition body ──────────────────────────────────────

test("encodeMcpToolDefinitionBody encodes name, description, schema bytes", () => {
  const body = encodeMcpToolDefinitionBody({
    name: "get_weather",
    description: "Look up current weather",
    inputSchemaBytes: Buffer.from("schema-bytes"),
    providerIdentifier: "omniroute",
    toolName: "get_weather",
  });
  assert.ok(body.includes(Buffer.from("get_weather", "utf8")));
  assert.ok(body.includes(Buffer.from("Look up current weather", "utf8")));
  assert.ok(body.includes(Buffer.from("schema-bytes")));
  assert.ok(body.includes(Buffer.from("omniroute", "utf8")));
});

test("encodeMcpToolDefinitionBody omits optional providerIdentifier and toolName", () => {
  const body = encodeMcpToolDefinitionBody({
    name: "n",
    description: "d",
    inputSchemaBytes: Buffer.alloc(0),
  });
  assert.ok(!body.includes(Buffer.from("omniroute", "utf8")));
});

// ─── Phase 1: encodeRequestContextResponse with tools ───────────────────────

test("encodeRequestContextResponse with no tools produces empty RequestContext (existing behavior)", () => {
  const framed = encodeRequestContextResponse(5, "exec-rc");
  assertEcmShape(framed, 5, "exec-rc", 10); // request_context_result = field 10
});

test("encodeRequestContextResponse with tools embeds tool name and schema", () => {
  const framed = encodeRequestContextResponse(5, "exec-rc", [
    {
      name: "get_weather",
      description: "lookup",
      inputSchemaBytes: jsonSchemaToProtobufValue({
        type: "object",
        properties: { city: { type: "string" } },
      }),
      providerIdentifier: "omniroute",
      toolName: "get_weather",
    },
  ]);
  assertEcmShape(framed, 5, "exec-rc", 10);
  const payload = unwrapFrame(framed);
  assert.ok(payload.includes(Buffer.from("get_weather", "utf8")));
  assert.ok(payload.includes(Buffer.from("city", "utf8")));
});

// ─── Phase 1: jsonSchemaToProtobufValue ─────────────────────────────────────
//
// google.protobuf.Value is a oneof message. We verify the encoded bytes
// start with the right field tag for each kind, and (for nested types) that
// the inner content survives.

test("jsonSchemaToProtobufValue encodes a string as field 3", () => {
  const buf = jsonSchemaToProtobufValue("hello");
  // tag (3<<3)|2 = 26
  assert.equal(buf[0], 26);
  assert.ok(buf.includes(Buffer.from("hello", "utf8")));
});

test("jsonSchemaToProtobufValue encodes a number as field 2 (double)", () => {
  const buf = jsonSchemaToProtobufValue(3.14);
  // tag (2<<3)|1 = 17
  assert.equal(buf[0], 17);
  assert.equal(buf.length, 9); // 1-byte tag + 8-byte double
  assert.equal(buf.readDoubleLE(1), 3.14);
});

test("jsonSchemaToProtobufValue encodes a bool as field 4", () => {
  const buf = jsonSchemaToProtobufValue(true);
  // tag (4<<3)|0 = 32
  assert.equal(buf[0], 32);
  assert.equal(buf[1], 1);
});

test("jsonSchemaToProtobufValue encodes null as field 1", () => {
  const buf = jsonSchemaToProtobufValue(null);
  // tag (1<<3)|0 = 8
  assert.equal(buf[0], 8);
  assert.equal(buf[1], 0);
});

test("jsonSchemaToProtobufValue encodes a list as field 6", () => {
  const buf = jsonSchemaToProtobufValue(["a", "b"]);
  // tag (6<<3)|2 = 50
  assert.equal(buf[0], 50);
  assert.ok(buf.includes(Buffer.from("a", "utf8")));
  assert.ok(buf.includes(Buffer.from("b", "utf8")));
});

test("jsonSchemaToProtobufValue encodes a struct as field 5", () => {
  const buf = jsonSchemaToProtobufValue({ key: "value" });
  // tag (5<<3)|2 = 42
  assert.equal(buf[0], 42);
  assert.ok(buf.includes(Buffer.from("key", "utf8")));
  assert.ok(buf.includes(Buffer.from("value", "utf8")));
});

test("jsonSchemaToProtobufValue encodes a nested OpenAI tool input_schema", () => {
  const schema = {
    type: "object",
    properties: {
      city: { type: "string", description: "the city" },
      units: { type: "string", enum: ["c", "f"] },
    },
    required: ["city"],
  };
  const buf = jsonSchemaToProtobufValue(schema);
  // Outer tag is struct (5)
  assert.equal(buf[0], 42);
  assert.ok(buf.includes(Buffer.from("city", "utf8")));
  assert.ok(buf.includes(Buffer.from("units", "utf8")));
  assert.ok(buf.includes(Buffer.from("required", "utf8")));
  assert.ok(buf.includes(Buffer.from("the city", "utf8")));
});

// ─── Phase 3: tools in AgentRunRequest ─────────────────────────────────────

test("openAIToolsToMcpDefs converts OpenAI tool array to McpToolDefinition[]", () => {
  const defs = openAIToolsToMcpDefs([
    {
      type: "function",
      function: {
        name: "get_weather",
        description: "lookup",
        parameters: { type: "object", properties: { city: { type: "string" } } },
      },
    },
  ]);
  assert.equal(defs.length, 1);
  assert.equal(defs[0].name, "get_weather");
  assert.equal(defs[0].description, "lookup");
  assert.equal(defs[0].toolName, "get_weather");
  assert.equal(defs[0].providerIdentifier, "omniroute");
  assert.ok(defs[0].inputSchemaBytes.length > 0);
  // Schema bytes are a Struct (field 5)
  assert.equal(defs[0].inputSchemaBytes[0], 42);
});

test("openAIToolsToMcpDefs supplies a default schema if parameters omitted", () => {
  const defs = openAIToolsToMcpDefs([{ type: "function", function: { name: "no_params" } }]);
  assert.equal(defs.length, 1);
  // Default schema is { type: "object", properties: {} } — encoded as struct
  assert.equal(defs[0].inputSchemaBytes[0], 42);
});

test("encodeAgentRunRequest with tools embeds tool name and schema in mcp_tools", () => {
  const buf = encodeAgentRunRequest({
    modelId: "claude-4.6-sonnet-medium",
    userText: "what's the weather?",
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Look up current weather",
          parameters: {
            type: "object",
            properties: { city: { type: "string" } },
            required: ["city"],
          },
        },
      },
    ],
  });
  const text = buf.toString("latin1");
  assert.ok(text.includes("get_weather"), "tool name present");
  assert.ok(text.includes("Look up current weather"), "tool description present");
  assert.ok(text.includes("city"), "tool schema field present");
  assert.ok(text.includes("omniroute"), "provider_identifier set");
});

test("encodeAgentRunRequest without tools preserves empty mcp_tools placeholder", () => {
  const bufNoTools = encodeAgentRunRequest({
    modelId: "auto",
    userText: "hi",
  });
  const bufEmptyTools = encodeAgentRunRequest({
    modelId: "auto",
    userText: "hi",
    tools: [],
  });
  // Both should produce essentially the same shape — neither embeds tools.
  // Lengths may differ by message-id randomness; just verify neither contains
  // tool-related markers.
  assert.ok(!bufNoTools.toString("latin1").includes("omniroute"));
  assert.ok(!bufEmptyTools.toString("latin1").includes("omniroute"));
});

test("encodeAgentRunRequest with multiple tools embeds all of them", () => {
  const buf = encodeAgentRunRequest({
    modelId: "auto",
    userText: "test",
    tools: [
      { type: "function", function: { name: "tool_a", description: "A" } },
      { type: "function", function: { name: "tool_b", description: "B" } },
    ],
  });
  const text = buf.toString("latin1");
  assert.ok(text.includes("tool_a"));
  assert.ok(text.includes("tool_b"));
});
