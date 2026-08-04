// tests/unit/chatcore-claude-upstream-messages.test.ts
// Characterization of extractSystemMessagesToBody / normalizeClaudeUpstreamMessages — the Claude
// upstream-message transforms extracted from handleChatCore (chatCore god-file decomposition,
// #3501). Locks: system/developer role lifting into top-level `system` (string/array/none merge
// shapes), empty-text-block dropping, tool_result collapse vs preserve, file/document inlining, and
// unsupported-part dropping (with the debug log).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  extractSystemMessagesToBody,
  normalizeClaudeUpstreamMessages,
} from "../../open-sse/handlers/chatCore/claudeUpstreamMessages.ts";

test("extractSystemMessagesToBody lifts system/developer roles into top-level system", () => {
  const payload: Record<string, unknown> = {
    messages: [
      { role: "system", content: "be terse" },
      { role: "developer", content: "use json" },
      { role: "user", content: "hi" },
    ],
  };
  extractSystemMessagesToBody(payload);
  assert.deepEqual(payload.system, [
    { type: "text", text: "be terse" },
    { type: "text", text: "use json" },
  ]);
  assert.deepEqual(payload.messages, [{ role: "user", content: "hi" }]);
});

test("extractSystemMessagesToBody prepends an existing string system", () => {
  const payload: Record<string, unknown> = {
    system: "base",
    messages: [{ role: "system", content: "extra" }],
  };
  extractSystemMessagesToBody(payload);
  assert.deepEqual(payload.system, [
    { type: "text", text: "base" },
    { type: "text", text: "extra" },
  ]);
});

test("extractSystemMessagesToBody is a no-op without system messages or a messages array", () => {
  const p1: Record<string, unknown> = { messages: [{ role: "user", content: "hi" }] };
  extractSystemMessagesToBody(p1);
  assert.equal(p1.system, undefined);
  const p2: Record<string, unknown> = { messages: "nope" };
  extractSystemMessagesToBody(p2);
  assert.equal(p2.system, undefined);
});

test("normalizeClaudeUpstreamMessages drops empty text blocks", () => {
  const payload: Record<string, unknown> = {
    messages: [
      { role: "user", content: [{ type: "text", text: "" }, { type: "text", text: "keep" }] },
    ],
  };
  normalizeClaudeUpstreamMessages(payload);
  const msg = (payload.messages as Record<string, unknown>[])[0];
  assert.deepEqual(msg.content, [{ type: "text", text: "keep" }]);
});

test("normalizeClaudeUpstreamMessages collapses tool_result to text by default", () => {
  const payload: Record<string, unknown> = {
    messages: [
      { role: "user", content: [{ type: "tool_result", tool_use_id: "t1", content: "out" }] },
    ],
  };
  normalizeClaudeUpstreamMessages(payload);
  const msg = (payload.messages as Record<string, unknown>[])[0];
  assert.deepEqual(msg.content, [{ type: "text", text: "[Tool Result: t1]\nout" }]);
});

test("normalizeClaudeUpstreamMessages preserves tool_result when asked", () => {
  const payload: Record<string, unknown> = {
    messages: [
      { role: "user", content: [{ type: "tool_result", tool_use_id: "t1", content: "out" }] },
    ],
  };
  normalizeClaudeUpstreamMessages(payload, { preserveToolResultBlocks: true });
  const msg = (payload.messages as Record<string, unknown>[])[0];
  assert.deepEqual(msg.content, [{ type: "tool_result", tool_use_id: "t1", content: "out" }]);
});

test("normalizeClaudeUpstreamMessages inlines a file block without url/data as text", () => {
  const payload: Record<string, unknown> = {
    messages: [
      {
        role: "user",
        content: [{ type: "file", file: { name: "notes.txt", content: "hello" } }],
      },
    ],
  };
  normalizeClaudeUpstreamMessages(payload);
  const msg = (payload.messages as Record<string, unknown>[])[0];
  assert.deepEqual(msg.content, [{ type: "text", text: "[notes.txt]\nhello" }]);
});

test("normalizeClaudeUpstreamMessages drops unsupported parts and logs via the bound logger", () => {
  const logged: string[] = [];
  const log = { debug: (_tag: string, msg: string) => logged.push(msg) };
  const payload: Record<string, unknown> = {
    messages: [{ role: "user", content: [{ type: "thinking", text: "x" }] }],
  };
  normalizeClaudeUpstreamMessages(payload, undefined, log);
  const msg = (payload.messages as Record<string, unknown>[])[0];
  assert.deepEqual(msg.content, []);
  assert.equal(logged.length, 1);
  assert.match(logged[0], /Dropped unsupported content part type="thinking"/);
});
