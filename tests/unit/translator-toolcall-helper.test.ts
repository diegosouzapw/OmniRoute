import test from "node:test";
import assert from "node:assert/strict";

// Ports decolua/9router#2237: 9router already had helpers for half of the tool
// call/result pairing invariant in this file — ensureToolCallIds (well-formed ids)
// and fixMissingToolResponses (every call has a result). This adds the reverse
// invariant: every tool RESULT must have a matching tool CALL, stripping orphans
// left behind when client-side history truncation/compaction drops the assistant
// turn that issued the call but keeps the stale result. Strict upstream APIs
// reject the whole request with a 400 when an orphan is forwarded.
const { stripOrphanedToolResults } = await import(
  "../../open-sse/translator/helpers/toolCallHelper.ts"
);

test("stripOrphanedToolResults: matched OpenAI tool_calls + role:tool preserved", () => {
  const body = {
    messages: [
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "call_1", type: "function", function: { name: "foo", arguments: "{}" } }],
      },
      { role: "tool", tool_call_id: "call_1", content: "result" },
      { role: "user", content: "next" },
    ],
  };
  const out = stripOrphanedToolResults(body);
  assert.equal(out.messages.length, 3);
  assert.equal(out.messages[1].role, "tool");
  assert.equal(out.messages[1].tool_call_id, "call_1");
});

test("stripOrphanedToolResults: orphan role:tool stripped", () => {
  const body = {
    messages: [
      { role: "user", content: "start" },
      { role: "tool", tool_call_id: "orphan_call", content: "stale" },
      { role: "user", content: "continue" },
    ],
  };
  const out = stripOrphanedToolResults(body);
  assert.equal(out.messages.some((m: { role: string }) => m.role === "tool"), false);
  assert.equal(out.messages.length, 2);
});

test("stripOrphanedToolResults: zero-call truncation strips all stale results", () => {
  const body = {
    messages: [
      { role: "tool", tool_call_id: "call_a", content: "stale a" },
      { role: "tool", tool_call_id: "call_b", content: "stale b" },
      { role: "user", content: "continue" },
    ],
  };
  const out = stripOrphanedToolResults(body);
  assert.equal(out.messages.length, 1);
  assert.equal(out.messages[0].role, "user");
});

test("stripOrphanedToolResults: Claude-shaped tool_use/tool_result matched preserved", () => {
  const body = {
    messages: [
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "tu_1", name: "ls", input: {} }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "tu_1", content: "a.ts" }],
      },
    ],
  };
  const out = stripOrphanedToolResults(body);
  const userMsg = out.messages[1] as { content: { type: string; tool_use_id?: string }[] };
  assert.equal(userMsg.content.length, 1);
  assert.equal(userMsg.content[0].tool_use_id, "tu_1");
});

test("stripOrphanedToolResults: Claude-shaped orphan stripped from mixed content while text remains", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "orphan_tu", content: "stale output" },
          { type: "text", text: "please continue" },
        ],
      },
    ],
  };
  const out = stripOrphanedToolResults(body);
  const userMsg = out.messages[0] as { content: { type: string }[] };
  assert.equal(userMsg.content.length, 1);
  assert.equal(userMsg.content[0].type, "text");
});

test("stripOrphanedToolResults: user message with only orphan tool_result dropped", () => {
  const body = {
    messages: [
      { role: "user", content: "start" },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "orphan_tu", content: "stale" }],
      },
      { role: "user", content: "end" },
    ],
  };
  const out = stripOrphanedToolResults(body);
  assert.equal(out.messages.length, 2);
  assert.equal(out.messages[0].content, "start");
  assert.equal(out.messages[1].content, "end");
});

test("stripOrphanedToolResults: no-op keeps same body reference", () => {
  const body = {
    messages: [
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello" },
    ],
  };
  const out = stripOrphanedToolResults(body);
  assert.equal(out, body);
  assert.equal(out.messages, body.messages);
});

test("stripOrphanedToolResults: mixed matched+orphan — matched kept, orphan stripped", () => {
  const body = {
    messages: [
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "call_valid", type: "function", function: { name: "fn", arguments: "{}" } }],
      },
      { role: "tool", tool_call_id: "call_valid", content: "ok" },
      { role: "tool", tool_call_id: "call_orphan", content: "stale" },
      { role: "user", content: "done" },
    ],
  };
  const out = stripOrphanedToolResults(body);
  const toolMsgs = out.messages.filter((m: { role: string }) => m.role === "tool");
  assert.equal(toolMsgs.length, 1);
  assert.equal((toolMsgs[0] as { tool_call_id: string }).tool_call_id, "call_valid");
});

test("stripOrphanedToolResults: body without messages array is a no-op", () => {
  const body = { foo: "bar" };
  const out = stripOrphanedToolResults(body as unknown as { messages?: unknown[] });
  assert.equal(out, body);
});
