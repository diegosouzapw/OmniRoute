import test from "node:test";
import assert from "node:assert/strict";
import {
  CursorSessionManager,
  type CursorSession,
} from "../../open-sse/services/cursorSessionManager";
import { flattenMessages } from "../../open-sse/utils/cursorAgentProtobuf";

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

test("CursorSessionManager.sendToolResult returns false when openAIToolCallId not pending", () => {
  const m = new CursorSessionManager();
  const { req } = mockReq();
  const { client } = mockClient();
  const session = m.open("conv-7", client, req, new Map());
  const ok = m.sendToolResult(session, "unknown_id", "x", false);
  assert.equal(ok, false);
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
