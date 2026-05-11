import test from "node:test";
import assert from "node:assert/strict";
import {
  decodeExecServerEvent,
  iterateConnectFrames,
  wrapConnectFrame,
} from "../../open-sse/utils/cursorAgentProtobuf";

// ─── Wire-format helpers (match the encoder's primitives) ──────────────────
//
// We synthesize ExecServerMessage payloads for each variant and assert
// decodeExecServerEvent returns the right kind + extracted fields. This
// validates the decoder against the field-number contract independently of
// the encoder (which runs the same code path in different test files).

function v(n: number): Buffer {
  const out: number[] = [];
  while (n > 0x7f) {
    out.push((n & 0x7f) | 0x80);
    n >>>= 7;
  }
  out.push(n);
  return Buffer.from(out);
}
function tag(field: number, wireType: number): Buffer {
  return v((field << 3) | wireType);
}
function lenPrefixed(field: number, payload: Buffer): Buffer {
  return Buffer.concat([tag(field, 2), v(payload.length), payload]);
}
function varintField(field: number, value: number): Buffer {
  return Buffer.concat([tag(field, 0), v(value)]);
}
function stringField(field: number, value: string): Buffer {
  return lenPrefixed(field, Buffer.from(value, "utf8"));
}

// AgentServerMessage { exec_server_message (2): ExecServerMessage }
function buildAgentServerMessage(esmInner: Buffer): Buffer {
  return lenPrefixed(2, esmInner);
}

// ExecServerMessage { id (1): execMsgId, exec_id (15): execId, <variant>: bytes }
function buildExecServerMessage(
  execMsgId: number,
  execId: string,
  variantField: number,
  variantPayload: Buffer
): Buffer {
  return Buffer.concat([
    varintField(1, execMsgId),
    stringField(15, execId),
    lenPrefixed(variantField, variantPayload),
  ]);
}

test("decodeExecServerEvent returns null for unrelated AgentServerMessage", () => {
  // text_delta InteractionUpdate, no exec_server_message
  const interactionUpdate = lenPrefixed(1, lenPrefixed(1, Buffer.from("hi", "utf8")));
  const asm = lenPrefixed(1, interactionUpdate);
  assert.equal(decodeExecServerEvent(asm), null);
});

test("decodeExecServerEvent recognizes request_context (field 10)", () => {
  const variant = Buffer.alloc(0); // RequestContextArgs has no fields we care about
  const esm = buildExecServerMessage(1, "exec-rc", 10, variant);
  const asm = buildAgentServerMessage(esm);
  const event = decodeExecServerEvent(asm);
  assert.deepEqual(event, { kind: "exec_request_context", execMsgId: 1, execId: "exec-rc" });
});

test("decodeExecServerEvent recognizes read_args (field 7) with path", () => {
  const variant = stringField(1, "/etc/passwd");
  const esm = buildExecServerMessage(2, "exec-r", 7, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, {
    kind: "exec_read",
    execMsgId: 2,
    execId: "exec-r",
    path: "/etc/passwd",
  });
});

test("decodeExecServerEvent recognizes write_args (field 3)", () => {
  const variant = stringField(1, "/tmp/x");
  const esm = buildExecServerMessage(3, "exec-w", 3, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, { kind: "exec_write", execMsgId: 3, execId: "exec-w", path: "/tmp/x" });
});

test("decodeExecServerEvent recognizes delete_args (field 4)", () => {
  const variant = stringField(1, "/tmp/y");
  const esm = buildExecServerMessage(4, "exec-d", 4, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, { kind: "exec_delete", execMsgId: 4, execId: "exec-d", path: "/tmp/y" });
});

test("decodeExecServerEvent recognizes ls_args (field 8)", () => {
  const variant = stringField(1, "/home");
  const esm = buildExecServerMessage(5, "exec-l", 8, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, { kind: "exec_ls", execMsgId: 5, execId: "exec-l", path: "/home" });
});

test("decodeExecServerEvent recognizes grep_args (field 5)", () => {
  const variant = stringField(1, "pattern");
  const esm = buildExecServerMessage(6, "exec-g", 5, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, { kind: "exec_grep", execMsgId: 6, execId: "exec-g" });
});

test("decodeExecServerEvent recognizes diagnostics_args (field 9)", () => {
  const esm = buildExecServerMessage(7, "exec-diag", 9, Buffer.alloc(0));
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, { kind: "exec_diagnostics", execMsgId: 7, execId: "exec-diag" });
});

test("decodeExecServerEvent recognizes shell_args (field 2) with command + working_dir", () => {
  const variant = Buffer.concat([stringField(1, "ls -la"), stringField(2, "/tmp")]);
  const esm = buildExecServerMessage(8, "exec-s", 2, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, {
    kind: "exec_shell",
    execMsgId: 8,
    execId: "exec-s",
    command: "ls -la",
    workingDir: "/tmp",
  });
});

test("decodeExecServerEvent recognizes shell_stream_args (field 14)", () => {
  const variant = Buffer.concat([stringField(1, "tail -f x"), stringField(2, "/var/log")]);
  const esm = buildExecServerMessage(9, "exec-ss", 14, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, {
    kind: "exec_shell_stream",
    execMsgId: 9,
    execId: "exec-ss",
    command: "tail -f x",
    workingDir: "/var/log",
  });
});

test("decodeExecServerEvent recognizes background_shell_spawn (field 16)", () => {
  const variant = Buffer.concat([stringField(1, "node server"), stringField(2, "/app")]);
  const esm = buildExecServerMessage(10, "exec-bg", 16, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, {
    kind: "exec_bg_shell",
    execMsgId: 10,
    execId: "exec-bg",
    command: "node server",
    workingDir: "/app",
  });
});

test("decodeExecServerEvent recognizes fetch_args (field 20) with url", () => {
  const variant = stringField(1, "https://example.com/x");
  const esm = buildExecServerMessage(11, "exec-f", 20, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, {
    kind: "exec_fetch",
    execMsgId: 11,
    execId: "exec-f",
    url: "https://example.com/x",
  });
});

test("decodeExecServerEvent recognizes write_shell_stdin_args (field 23)", () => {
  const esm = buildExecServerMessage(12, "exec-stdin", 23, Buffer.alloc(0));
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, { kind: "exec_write_shell_stdin", execMsgId: 12, execId: "exec-stdin" });
});

test("decodeExecServerEvent recognizes mcp_args (field 11) with name + tool_call_id", () => {
  // McpArgs { name (1): "foo", tool_call_id (3): "call_x" }
  const variant = Buffer.concat([stringField(1, "get_weather"), stringField(3, "call_abc123")]);
  const esm = buildExecServerMessage(13, "exec-mcp", 11, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  assert.deepEqual(event, {
    kind: "exec_mcp",
    execMsgId: 13,
    execId: "exec-mcp",
    toolName: "get_weather",
    toolCallId: "call_abc123",
    args: {},
  });
});

test("decodeExecServerEvent prefers tool_name (field 5) over name (field 1)", () => {
  // McpArgs { name: "old", tool_name: "new", tool_call_id: "x" }
  const variant = Buffer.concat([
    stringField(1, "old_alias"),
    stringField(3, "call_y"),
    stringField(5, "canonical_name"),
  ]);
  const esm = buildExecServerMessage(14, "exec-mcp2", 11, variant);
  const event = decodeExecServerEvent(buildAgentServerMessage(esm));
  if (event?.kind !== "exec_mcp") throw new Error("expected exec_mcp");
  assert.equal(event.toolName, "canonical_name");
});

// ─── Wire-tap regression: real Connect-RPC frame round-trips ───────────────

test("decodeExecServerEvent works through a Connect-RPC frame", () => {
  const variant = stringField(1, "/etc/shadow");
  const esm = buildExecServerMessage(99, "exec-real", 7, variant);
  const asm = buildAgentServerMessage(esm);
  const framed = wrapConnectFrame(asm);
  const frames = [...iterateConnectFrames(framed)];
  assert.equal(frames.length, 1);
  const event = decodeExecServerEvent(frames[0].payload);
  assert.deepEqual(event, {
    kind: "exec_read",
    execMsgId: 99,
    execId: "exec-real",
    path: "/etc/shadow",
  });
});
