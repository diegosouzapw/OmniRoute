/**
 * Cursor's agent protocol drifted in three ways that together broke tool
 * calling: tool-carrying turns hung until the stream safety timeout and
 * returned 502, and when they did not hang the model reported the OmniRoute
 * MCP namespace as unavailable and fell back to Cursor's built-in tools.
 *
 * The field numbers asserted here are not guesses — they are taken from the
 * Cursor Agent CLI's own embedded `agent.v1` schema:
 *
 *   ExecServerMessage  { 1 id, 15 exec_id, 19 span_context,
 *                        10 request_context_args, 36 mcp_state_exec_args, … }
 *   McpStateExecArgs   { 1 server_identifiers, 2 kick_only }
 *   McpStateExecResult { 1 success }
 *   McpStateSuccess    { 1 servers }
 *   McpStateServer     { 1 server_name, 2 server_identifier, 5 tools, 7 status }
 *   RequestContext     { 2 rules, 7 tools, … }
 *
 * The byte sequences are verbatim captures from a live CURSOR_DUMP_FILE run
 * against grok-4.7.
 */
import assert from "node:assert/strict";
import test from "node:test";

import {
  decodeExecServerEvent,
  encodeMcpStateResponse,
  encodeRequestContextResponse,
  openAIToolsToMcpDefs,
} from "../../open-sse/utils/cursorAgentProtobuf.ts";
import { decodeFields } from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";

/** Wrap an ExecServerMessage body as AgentServerMessage.exec_server_message (field 2). */
function asAgentServerMessage(execServerMessageHex: string): Buffer {
  const body = Buffer.from(execServerMessageHex, "hex");
  const header = Buffer.from([0x12]); // field 2, wire type 2
  const length: number[] = [];
  let remaining = body.length;
  do {
    let byte = remaining & 0x7f;
    remaining >>>= 7;
    if (remaining > 0) byte |= 0x80;
    length.push(byte);
  } while (remaining > 0);
  return Buffer.concat([header, Buffer.from(length), body]);
}

// request_context_args (field 10) + span_context (field 19). No exec_id.
const REQUEST_CONTEXT_FRAME = asAgentServerMessage(
  "5226122461376562303666642d343537332d343133632d626233652d62333035373838623435333" +
    "99a01360a2038663336663434656635393661643337333137343034393738653161333839351210" +
    "653339363764333436626462353966351800b80300"
);

// mcp_state_exec_args (field 36) = { server_identifiers: ["omniroute"] }.
const MCP_STATE_FRAME = asAgentServerMessage(
  "08019a01360a20386633366634346566353936616433373331373430343937386531613338393512" +
    "10396237306231383332613662383164321800a2020b0a096f6d6e69726f757465b80300"
);

test("span_context (field 19) is not mistaken for the event variant", () => {
  const event = decodeExecServerEvent(MCP_STATE_FRAME);

  assert.ok(
    event,
    "the mcp_state request must decode — returning null is what left the turn hanging until the safety timeout"
  );
  assert.equal(
    event.kind,
    "exec_mcp_state",
    "field 19 carries an OpenTelemetry span context, not a payload variant"
  );
});

test("mcp_state_exec_args exposes server_identifiers as a repeated string", () => {
  const event = decodeExecServerEvent(MCP_STATE_FRAME);

  assert.ok(event);
  assert.equal(event.execMsgId, 1);
  assert.deepEqual((event as { serverIdentifiers?: string[] }).serverIdentifiers, ["omniroute"]);
});

test("frames without an exec_id decode to an empty one and are correlated by id", () => {
  const event = decodeExecServerEvent(REQUEST_CONTEXT_FRAME);

  assert.ok(event);
  assert.equal(event.kind, "exec_request_context");
  assert.equal(
    event.execId,
    "",
    "exec_id is field 15 only; request_context does not carry one, so the reply is matched on id"
  );
});

test("the mcp_state reply declares one server carrying the tools on field 5", () => {
  const frame = encodeMcpStateResponse(7, "", "omniroute", [
    {
      name: "bash",
      description: "Run a command",
      inputSchemaBytes: Buffer.from([0x00]),
      providerIdentifier: "omniroute",
      toolName: "bash",
    },
  ]);

  const body = frame.subarray(5); // strip the connect envelope
  assert.equal(frame.readUInt32BE(1), body.length);

  const ecm = decodeFields(
    decodeFields(body).find((field) => field.fieldNumber === 2)!.bytes // exec_client_message
  );
  assert.equal(ecm.find((f) => f.fieldNumber === 1)?.varint, 7n, "ExecClientMessage.id");

  const result = ecm.find((f) => f.fieldNumber === 36);
  assert.ok(result, "mcp_state_exec_result must mirror the request's field 36");

  const success = decodeFields(result.bytes).find((f) => f.fieldNumber === 1);
  assert.ok(success, "McpStateExecResult.success");

  const servers = decodeFields(success.bytes).filter((f) => f.fieldNumber === 1);
  assert.equal(servers.length, 1, "McpStateSuccess.servers");

  const server = decodeFields(servers[0].bytes);
  assert.equal(server.find((f) => f.fieldNumber === 1)?.bytes.toString("utf8"), "omniroute");
  assert.equal(server.find((f) => f.fieldNumber === 2)?.bytes.toString("utf8"), "omniroute");
  const tools = server.filter((f) => f.fieldNumber === 5);
  assert.equal(tools.length, 1, "McpStateServer.tools is field 5");
  assert.match(tools[0].bytes.toString("utf8"), /bash/);
  assert.equal(server.find((f) => f.fieldNumber === 7)?.bytes.toString("utf8"), "ready");
});

test("the request_context reply puts tools on RequestContext.tools (field 7), not rules (2)", () => {
  const frame = encodeRequestContextResponse(3, "", [
    {
      name: "bash",
      description: "Run a command",
      inputSchemaBytes: Buffer.from([0x00]),
      providerIdentifier: "omniroute",
      toolName: "bash",
    },
  ]);

  const body = frame.subarray(5);
  const ecm = decodeFields(decodeFields(body).find((f) => f.fieldNumber === 2)!.bytes);
  const requestContext = decodeFields(
    decodeFields(
      decodeFields(ecm.find((f) => f.fieldNumber === 10)!.bytes).find((f) => f.fieldNumber === 1)!
        .bytes // RequestContextResult.success
    ).find((f) => f.fieldNumber === 1)!.bytes // RequestContextSuccess.request_context
  );

  assert.equal(
    requestContext.filter((f) => f.fieldNumber === 2).length,
    0,
    "field 2 is `rules` — tools sent there never reach the model's catalog"
  );
  const tools = requestContext.filter((f) => f.fieldNumber === 7);
  assert.equal(tools.length, 1, "RequestContext.tools is field 7");
  assert.match(tools[0].bytes.toString("utf8"), /bash/);
});

/**
 * Built-in tool execs (shell/read/…) DO carry exec_id on field 15, and their
 * result must echo it. Live `shell_stream_args` capture (command "dir").
 */
test("a built-in shell exec keeps its field-15 exec_id", () => {
  const frame = asAgentServerMessage(
    "080372f0010a0364697218b0ea01225563616c6c2d34373763663931382d356366642d346639342d61343062" +
      "2d3664336363653338376434372d320a66635f65373036613531622d646534322d396166352d613766622d36" +
      "37356566306231386631325f302a03646972420c120a0a036469721a0364697250c0b80268027080b899297a" +
      "1f4c6973742063757272656e74206469726563746f727920636f6e74656e7473880101aa0124366663656132" +
      "66622d356438382d343964632d393834652d626136373966376530326430ba012439313661643137642d6631" +
      "36392d343433392d613632662d3231346531373232666439307a2435623665613733662d613364392d346166" +
      "662d613830342d3162393037363462633434329a01360a206437626461323766383937626630626639343130" +
      "6337393532656237303036371210373764313565336666323436373265371800b80301"
  );

  const event = decodeExecServerEvent(frame);
  assert.ok(event, "shell_stream_args must decode");
  assert.equal(event.kind, "exec_shell_stream");
  assert.equal(event.execId, "5b6ea73f-a3d9-4aff-a804-1b90764bc442");
});

/**
 * Cursor always drives MCP through its own meta tools (GetDynamicTools /
 * CallDynamicTool). The catalogue those return is built from
 * RequestContext.mcp_meta_tool_options.mcp_descriptors — declaring the tools on
 * RequestContext.tools alone leaves the namespace empty, and the model reports
 * it as unavailable and uses Cursor's built-ins instead.
 */
test("the request_context ack advertises the tools as an MCP descriptor", () => {
  const frame = encodeRequestContextResponse(3, "", [
    {
      name: "bash",
      description: "Run a command",
      inputSchemaBytes: Buffer.from([0x00]),
      providerIdentifier: "omniroute",
      toolName: "bash",
    },
  ]);

  const ecm = decodeFields(decodeFields(frame.subarray(5)).find((f) => f.fieldNumber === 2)!.bytes);
  const requestContext = decodeFields(
    decodeFields(
      decodeFields(ecm.find((f) => f.fieldNumber === 10)!.bytes).find((f) => f.fieldNumber === 1)!
        .bytes
    ).find((f) => f.fieldNumber === 1)!.bytes
  );

  const metaOptions = requestContext.find((f) => f.fieldNumber === 34);
  assert.ok(metaOptions, "RequestContext.mcp_meta_tool_options");

  const meta = decodeFields(metaOptions.bytes);
  assert.equal(meta.find((f) => f.fieldNumber === 1)?.varint, 1n, "McpMetaToolOptions.enabled");

  const descriptor = decodeFields(meta.find((f) => f.fieldNumber === 2)!.bytes);
  assert.equal(descriptor.find((f) => f.fieldNumber === 1)?.bytes.toString("utf8"), "omniroute");
  assert.equal(descriptor.find((f) => f.fieldNumber === 2)?.bytes.toString("utf8"), "omniroute");

  const descriptorTools = descriptor.filter((f) => f.fieldNumber === 5);
  assert.equal(descriptorTools.length, 1, "McpDescriptor.tools is field 5");
  assert.equal(
    decodeFields(descriptorTools[0].bytes)
      .find((f) => f.fieldNumber === 1)
      ?.bytes.toString("utf8"),
    "bash",
    "McpToolDescriptor.tool_name"
  );
});

/**
 * Chat Completions nests a tool under `function`; the Responses API keeps it
 * flat. Reading only the nested shape produced nameless tools for every
 * /v1/responses request — Cursor accepted the frame and exposed an uncallable
 * namespace, so the model never invoked anything.
 */
test("tool definitions are read from both the nested and the flat (Responses) shape", () => {
  const defs = openAIToolsToMcpDefs([
    {
      type: "function",
      function: { name: "nested_tool", description: "n", parameters: { type: "object" } },
    },
    {
      type: "function",
      name: "flat_tool",
      description: "f",
      parameters: { type: "object" },
    },
    { type: "function", name: "   " },
  ] as never);

  assert.deepEqual(
    defs.map((d) => d.name),
    ["nested_tool", "flat_tool"],
    "both shapes resolve; a nameless tool is dropped rather than shipped uncallable"
  );
  assert.equal(defs[1].toolName, "flat_tool");
});
