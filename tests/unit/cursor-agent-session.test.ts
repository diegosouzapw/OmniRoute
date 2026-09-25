import test from "node:test";
import assert from "node:assert/strict";
import { CursorSessionManager } from "../../open-sse/services/cursorSessionManager";
import { flattenMessages } from "../../open-sse/utils/cursorAgentProtobuf";
import { decodeFields } from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";

// ─── Test doubles for h2 ───────────────────────────────────────────────────
//
// We don't open real h2 connections in unit tests. Sessions hold opaque
// references that the manager only ever .close()s or .write()s through
// encodeExecMcpResult. A pair of stubs is enough.

type WriteCall = { kind: "write"; data: Buffer } | { kind: "close" };

function mockReq() {
  const calls: WriteCall[] = [];
  return {
    req: {
      write: (data: Buffer) => {
        calls.push({ kind: "write", data });
        return true;
      },
      close: () => {
        calls.push({ kind: "close" });
      },
    } as unknown as import("node:http2").ClientHttp2Stream,
    calls,
  };
}

function mockClient() {
  const closed = { value: false };
  return {
    client: {
      close: () => {
        closed.value = true;
      },
    } as unknown as import("node:http2").ClientHttp2Session,
    closed,
  };
}

test("a failed client write must not tell Cursor that the existing file was overwritten", () => {
  const { req, calls } = mockReq();
  const { client } = mockClient();
  const manager = new CursorSessionManager();
  const session = manager.open("write-error", client, req, new Map());
  session.pendingBuiltinExecs.set("write-1", {
    kind: "write",
    execMsgId: 4,
    execId: "exec-w",
    path: "/tmp/existing.txt",
    fileText: "replacement",
    command: "",
    workingDir: "",
    pattern: "",
  });
  assert.equal(manager.sendToolResult(session, "write-1", "File already exists", true), true);
  const frame = (calls.find((call) => call.kind === "write") as { data: Buffer }).data;
  const envelope = decodeFields(frame.subarray(5)).find((field) => field.fieldNumber === 2);
  assert.ok(envelope);
  const result = decodeFields(envelope.bytes).find((field) => field.fieldNumber === 3);
  assert.ok(result, "ExecClientMessage.write_result");
  const reply = decodeFields(result.bytes);
  assert.ok(
    reply.some((field) => field.fieldNumber === 5),
    "WriteResult.error"
  );
  assert.equal(
    reply.some((field) => field.fieldNumber === 1),
    false,
    "never report success"
  );
  manager.close(session);
});

test("OpenAI tool errors without an isError flag do not become WriteResult.success", () => {
  const { req, calls } = mockReq();
  const { client } = mockClient();
  const manager = new CursorSessionManager();
  const session = manager.open("write-error-text", client, req, new Map());
  session.pendingBuiltinExecs.set("write-2", {
    kind: "write",
    execMsgId: 5,
    execId: "exec-write",
    path: "/tmp/existing.txt",
    fileText: "replacement",
    command: "",
    workingDir: "",
    pattern: "",
  });
  assert.equal(
    manager.sendToolResult(
      session,
      "write-2",
      "Error: You must read the file before writing it.",
      false
    ),
    true
  );
  const frame = (calls.find((call) => call.kind === "write") as { data: Buffer }).data;
  const envelope = decodeFields(frame.subarray(5)).find((field) => field.fieldNumber === 2);
  assert.ok(envelope);
  const result = decodeFields(envelope.bytes).find((field) => field.fieldNumber === 3);
  assert.ok(result);
  assert.ok(decodeFields(result.bytes).some((field) => field.fieldNumber === 5));
  manager.close(session);
});

// ─── flattenMessages: Phase 6 cold-resume support ──────────────────────────

test("flattenMessages handles role:'tool' messages", () => {
  const out = flattenMessages([
    { role: "user", content: "what's the weather?" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_xyz",
          type: "function",
          function: { name: "get_weather", arguments: '{"city":"Paris"}' },
        },
      ],
    },
    { role: "tool", tool_call_id: "call_xyz", content: "sunny, 22C" },
  ]);
  assert.match(out, /User: what's the weather\?/);
  assert.match(
    out,
    /Assistant called tool get_weather \(call_xyz\) with arguments: \{"city":"Paris"\}/
  );
  assert.match(out, /Tool result \(call_xyz\): sunny, 22C/);
});

test("flattenMessages handles assistant with text + tool_calls in same message", () => {
  const out = flattenMessages([
    { role: "user", content: "do x" },
    {
      role: "assistant",
      content: "Let me check.",
      tool_calls: [
        {
          id: "c1",
          type: "function",
          function: { name: "check", arguments: "{}" },
        },
      ],
    },
    { role: "tool", tool_call_id: "c1", content: "result" },
  ]);
  assert.match(out, /Assistant: Let me check\./);
  assert.match(out, /Assistant called tool check \(c1\) with arguments: \{\}/);
  assert.match(out, /Tool result \(c1\): result/);
});

test("flattenMessages handles parallel tool_calls", () => {
  const out = flattenMessages([
    { role: "user", content: "check both" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        { id: "c1", type: "function", function: { name: "tool_a", arguments: "{}" } },
        { id: "c2", type: "function", function: { name: "tool_b", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: "c1", content: "result_a" },
    { role: "tool", tool_call_id: "c2", content: "result_b" },
  ]);
  assert.match(out, /tool_a \(c1\)/);
  assert.match(out, /tool_b \(c2\)/);
  assert.match(out, /Tool result \(c1\): result_a/);
  assert.match(out, /Tool result \(c2\): result_b/);
});

test("flattenMessages keeps single-user fast path unchanged when no tool_calls", () => {
  const out = flattenMessages([{ role: "user", content: "hi" }]);
  assert.equal(out, "hi");
});

// ─── CursorSessionManager lifecycle ────────────────────────────────────────

test("CursorSessionManager.open registers a session under conversation_id", () => {
  const m = new CursorSessionManager();
  const { req } = mockReq();
  const { client } = mockClient();
  const session = m.open("conv-1", client, req, new Map());
  assert.equal(m.size(), 1);
  assert.ok(m.has("conv-1"));
  assert.equal(session.conversationId, "conv-1");
  assert.equal(session.state, "running");
});

test("CursorSessionManager.acquire returns undefined when no session", () => {
  const m = new CursorSessionManager();
  assert.equal(m.acquire("nope"), undefined);
});

test("CursorSessionManager.acquire returns undefined when session is still running", () => {
  const m = new CursorSessionManager();
  const { req } = mockReq();
  const { client } = mockClient();
  m.open("conv-2", client, req, new Map());
  // open() leaves state="running"; acquire requires "awaiting_tool_result"
  assert.equal(m.acquire("conv-2"), undefined);
});

test("CursorSessionManager.acquire returns the session after release(awaiting_tool_result)", () => {
  const m = new CursorSessionManager();
  const { req } = mockReq();
  const { client } = mockClient();
  const opened = m.open("conv-3", client, req, new Map());
  m.release(opened, "awaiting_tool_result");
  const acquired = m.acquire("conv-3");
  assert.equal(acquired, opened);
  assert.equal(acquired?.state, "running");
});

test("CursorSessionManager release(awaiting_tool_result) actively evicts after TTL", async () => {
  const m = new CursorSessionManager({ idleTtlMs: 20 });
  const { req } = mockReq();
  const { client, closed } = mockClient();
  const session = m.open("conv-ttl", client, req, new Map());
  m.release(session, "awaiting_tool_result");

  await new Promise((resolve) => setTimeout(resolve, 50));

  assert.equal(m.size(), 0);
  assert.ok(closed.value);
});

test("CursorSessionManager enforces a maximum retained session count", () => {
  const m = new CursorSessionManager({ maxSessions: 1 });
  const firstReq = mockReq();
  const firstClient = mockClient();
  m.open("conv-max-1", firstClient.client, firstReq.req, new Map());
  const secondReq = mockReq();
  const secondClient = mockClient();
  m.open("conv-max-2", secondClient.client, secondReq.req, new Map());

  assert.equal(m.size(), 1);
  assert.equal(m.has("conv-max-1"), false);
  assert.equal(m.has("conv-max-2"), true);
  assert.ok(firstClient.closed.value);
});

test("CursorSessionManager.release(idle) closes the session", () => {
  const m = new CursorSessionManager();
  const { req, calls } = mockReq();
  const { client, closed } = mockClient();
  const session = m.open("conv-4", client, req, new Map());
  m.release(session, "idle");
  assert.equal(m.size(), 0);
  assert.ok(closed.value);
  assert.ok(calls.some((c) => c.kind === "close"));
});

test("CursorSessionManager.acquire evicts expired sessions", () => {
  const m = new CursorSessionManager({ idleTtlMs: 10 });
  const { req } = mockReq();
  const { client, closed } = mockClient();
  const session = m.open("conv-5", client, req, new Map());
  m.release(session, "awaiting_tool_result");
  // Manually backdate lastActivityTs to simulate idle.
  session.lastActivityTs = Date.now() - 1000;
  const acquired = m.acquire("conv-5");
  assert.equal(acquired, undefined);
  assert.equal(m.size(), 0);
  assert.ok(closed.value);
});

test("CursorSessionManager.sendToolResult writes ExecMcpResult on the session's req", () => {
  const m = new CursorSessionManager();
  const { req, calls } = mockReq();
  const { client } = mockClient();
  const session = m.open("conv-6", client, req, new Map());
  session.pendingToolCalls.set("call_x", {
    execMsgId: 1,
    execId: "exec-1",
    toolName: "get_weather",
  });
  const ok = m.sendToolResult(session, "call_x", "sunny", false);
  assert.equal(ok, true);
  // Verify a write happened
  const writes = calls.filter((c) => c.kind === "write");
  assert.equal(writes.length, 1);
  // The write should be a Connect-RPC frame containing "sunny" and "exec-1"
  const data = (writes[0] as { kind: "write"; data: Buffer }).data;
  assert.ok(data.includes(Buffer.from("sunny", "utf8")));
  assert.ok(data.includes(Buffer.from("exec-1", "utf8")));
  // Pending tool call was consumed
  assert.equal(session.pendingToolCalls.has("call_x"), false);
});

test("shell_stream follow-up sends stream events and closes the exec stream", () => {
  const manager = new CursorSessionManager();
  const { req, calls } = mockReq();
  const { client } = mockClient();
  const session = manager.open("conv-shell-stream", client, req, new Map());
  session.pendingBuiltinExecs.set("call_shell", {
    execMsgId: 9,
    execId: "exec-shell",
    kind: "shell_stream",
    path: "",
    command: "pwd",
    workingDir: "/tmp",
    fileText: "",
    pattern: "",
  });

  assert.equal(manager.sendToolResult(session, "call_shell", "/tmp\n", false), true);
  const written = calls.filter(
    (call): call is Extract<WriteCall, { kind: "write" }> => call.kind === "write"
  );
  assert.equal(written.length, 1);
  const data = written[0].data;
  const messages: Buffer[] = [];
  for (let offset = 0; offset < data.length;) {
    const length = data.readUInt32BE(offset + 1);
    messages.push(data.subarray(offset + 5, offset + 5 + length));
    offset += 5 + length;
  }
  assert.equal(messages.length, 4, "start, stdout, exit, stream_close");
  for (const [index, variant] of [4, 1, 3].entries()) {
    const exec = decodeFields(messages[index]).find((field) => field.fieldNumber === 2);
    assert.ok(exec, "AgentClientMessage.exec_client_message");
    const fields = decodeFields(exec.bytes);
    assert.equal(fields.find((field) => field.fieldNumber === 1)?.varint, 9n);
    assert.equal(fields.find((field) => field.fieldNumber === 15)?.bytes.toString(), "exec-shell");
    assert.equal(
      fields.some((field) => field.fieldNumber === 2),
      false,
      "not shell_result"
    );
    const shellStream = fields.find((field) => field.fieldNumber === 14);
    assert.ok(shellStream, "ExecClientMessage.shell_stream");
    assert.ok(decodeFields(shellStream.bytes).some((field) => field.fieldNumber === variant));
  }
  assert.ok(messages[1].includes(Buffer.from("/tmp\n")));
  const control = decodeFields(messages[3]).find((field) => field.fieldNumber === 5);
  assert.ok(control, "AgentClientMessage.exec_client_control_message");
  assert.equal(session.pendingBuiltinExecs.has("call_shell"), false);
  manager.close(session);
});

test("a multipart tool result is forwarded as file contents instead of an empty read", () => {
  const manager = new CursorSessionManager();
  const { req, calls } = mockReq();
  const { client } = mockClient();
  const session = manager.open("conv-multipart", client, req, new Map());
  session.pendingBuiltinExecs.set("call_read", {
    execMsgId: 3,
    execId: "exec-read",
    kind: "read",
    path: "/tmp/snake.c",
    command: "",
    workingDir: "",
    fileText: "",
    pattern: "",
  });
  assert.equal(
    manager.sendToolResult(
      session,
      "call_read",
      [{ type: "text", text: "int main(void) {}" }],
      false
    ),
    true
  );
  const sent = calls.find(
    (call): call is Extract<WriteCall, { kind: "write" }> => call.kind === "write"
  );
  assert.ok(sent);
  assert.ok(sent.data.includes(Buffer.from("int main(void) {}")));
  manager.close(session);
});

test("a bridged web fetch returns FetchResult.success rather than a shell result", () => {
  const manager = new CursorSessionManager();
  const { req, calls } = mockReq();
  const { client } = mockClient();
  const session = manager.open("conv-fetch", client, req, new Map());
  session.pendingBuiltinExecs.set("call_fetch", {
    execMsgId: 5,
    execId: "exec-fetch",
    kind: "fetch",
    path: "",
    command: "",
    workingDir: "",
    fileText: "",
    pattern: "",
    url: "https://example.com/docs",
  });
  assert.equal(manager.sendToolResult(session, "call_fetch", "Article text", false), true);
  const written = calls.find(
    (call): call is Extract<WriteCall, { kind: "write" }> => call.kind === "write"
  );
  assert.ok(written);
  const ecm = decodeFields(
    decodeFields(written.data.subarray(5)).find((field) => field.fieldNumber === 2)!.bytes
  );
  const result = ecm.find((field) => field.fieldNumber === 20);
  assert.ok(result, "ExecClientMessage.fetch_result");
  const success = decodeFields(result.bytes).find((field) => field.fieldNumber === 1);
  assert.ok(success, "FetchResult.success");
  const fields = decodeFields(success.bytes);
  assert.equal(
    fields.find((field) => field.fieldNumber === 1)?.bytes.toString(),
    "https://example.com/docs"
  );
  assert.equal(fields.find((field) => field.fieldNumber === 2)?.bytes.toString(), "Article text");
  manager.close(session);
});

test("CursorSessionManager.sendToolResult returns false when openAIToolCallId not pending", () => {
  const m = new CursorSessionManager();
  const { req } = mockReq();
  const { client } = mockClient();
  const session = m.open("conv-7", client, req, new Map());
  const ok = m.sendToolResult(session, "unknown_id", "x", false);
  assert.equal(ok, false);
});

test("CursorSessionManager.close clears unanswered pendingToolCalls", () => {
  const m = new CursorSessionManager();
  const { req } = mockReq();
  const { client } = mockClient();
  const session = m.open("conv-clear", client, req, new Map());
  session.pendingToolCalls.set("call_unanswered", {
    execMsgId: 1,
    execId: "exec-1",
    toolName: "get_weather",
  });
  m.close(session);
  // close() drops the unanswered mapping so it isn't pinned on the dead session.
  assert.equal(session.pendingToolCalls.size, 0);
  assert.equal(m.size(), 0);
});

// ─── findByToolCallIds — content-based session matching ────────────────────
//
// These tests validate the fix for #9029: when the client does not provide
// conversation_id, every turn gets a random UUID and acquire() fails. The
// fallback findByToolCallIds matches by tool_call_id content instead.

test("CursorSessionManager.findByToolCallIds finds an awaiting session by tool call ID", () => {
  const m = new CursorSessionManager();
  const { req } = mockReq();
  const { client } = mockClient();
  const session = m.open("conv-find", client, req, new Map());
  session.pendingToolCalls.set("call_abc", {
    execMsgId: 1,
    execId: "exec-1",
    toolName: "get_weather",
  });
  m.release(session, "awaiting_tool_result");

  const found = m.findByToolCallIds(["call_abc", "call_other"]);
  assert.equal(found, session);
  // Must transition to "running" (same as acquire() does)
  assert.equal(found?.state, "running");
});

test("CursorSessionManager.findByToolCallIds returns undefined when no IDs match", () => {
  const m = new CursorSessionManager();
  const { req } = mockReq();
  const { client } = mockClient();
  const session = m.open("conv-nomatch", client, req, new Map());
  session.pendingToolCalls.set("call_xyz", {
    execMsgId: 1,
    execId: "exec-1",
    toolName: "tool",
  });
  m.release(session, "awaiting_tool_result");

  const found = m.findByToolCallIds(["call_nonexistent"]);
  assert.equal(found, undefined);
});

test("CursorSessionManager.findByToolCallIds returns undefined for running session", () => {
  const m = new CursorSessionManager();
  const { req } = mockReq();
  const { client } = mockClient();
  const session = m.open("conv-running", client, req, new Map());
  session.pendingToolCalls.set("call_abc", {
    execMsgId: 1,
    execId: "exec-1",
    toolName: "tool",
  });
  // NOT released, so state is still "running" — not eligible

  const found = m.findByToolCallIds(["call_abc"]);
  assert.equal(found, undefined);
});

test("findByToolCallIds matches session even when acquire fails due to different conversation_id (#9029)", () => {
  const m = new CursorSessionManager();

  // Turn 1: session opens with conv-a and releases awaiting tool result
  const r1 = mockReq();
  const c1 = mockClient();
  const s1 = m.open("conv-a", c1.client, r1.req, new Map());
  s1.pendingToolCalls.set("call_p1", {
    execMsgId: 1,
    execId: "exec-1",
    toolName: "tool_a",
  });
  m.release(s1, "awaiting_tool_result");

  // Turn 2: client sends tool result with a DIFFERENT conversation_id
  // (random UUID because OpenAI client doesn't provide conversation_id).
  // acquire() fails — this is the bug.
  const acquired = m.acquire("random-uuid-xyz");
  assert.equal(acquired, undefined, "acquire with different ID must return undefined (the bug)");

  // findByToolCallIds finds the session by tool_call_id content matching
  const found = m.findByToolCallIds(["call_p1"]);
  assert.equal(found, s1, "findByToolCallIds must find session by tool call ID");
  assert.equal(found.state, "running", "found session must transition to running");
});

test("findByToolCallIds matches first matching session across multiple sessions", () => {
  const m = new CursorSessionManager();

  const r1 = mockReq();
  const c1 = mockClient();
  const s1 = m.open("conv-1", c1.client, r1.req, new Map());
  s1.pendingToolCalls.set("call_1", { execMsgId: 1, execId: "e1", toolName: "t1" });
  m.release(s1, "awaiting_tool_result");

  const r2 = mockReq();
  const c2 = mockClient();
  const s2 = m.open("conv-2", c2.client, r2.req, new Map());
  s2.pendingToolCalls.set("call_2", { execMsgId: 2, execId: "e2", toolName: "t2" });
  m.release(s2, "awaiting_tool_result");

  // Should find conv-1 first because it has "call_1"
  const found = m.findByToolCallIds(["call_1", "call_2"]);
  assert.equal(found, s1);
  // conv-2 session should still be available
  const found2 = m.findByToolCallIds(["call_2"]);
  assert.equal(found2, s2);
});

test("CursorSessionManager.open replaces an existing session for the same conversation", () => {
  const m = new CursorSessionManager();
  const r1 = mockReq();
  const c1 = mockClient();
  const session1 = m.open("conv-8", c1.client, r1.req, new Map());
  m.release(session1, "awaiting_tool_result");
  const r2 = mockReq();
  const c2 = mockClient();
  const session2 = m.open("conv-8", c2.client, r2.req, new Map());
  // First session's client should be closed
  assert.ok(c1.closed.value);
  // Map only has one session; the new one
  assert.equal(m.size(), 1);
  assert.equal(m.acquire("conv-8"), undefined); // session2 is "running"
  void session2;
});
