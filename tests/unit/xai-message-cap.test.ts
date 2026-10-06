import test from "node:test";
import assert from "node:assert/strict";

import {
  XAI_CHAT_HISTORY_LIMIT,
  capXaiChatMessages,
  capXaiRequestHistory,
  capXaiResponsesInput,
  repairXaiResponsesInput,
} from "../../open-sse/services/xaiMessageCap.ts";
import { XaiExecutor } from "../../open-sse/executors/xai.ts";

const credentials = { apiKey: "test-key" };

function chatTurn(i: number) {
  return [
    { role: "user", content: `u${i}` },
    { role: "assistant", content: `a${i}` },
  ];
}

test("XAI_CHAT_HISTORY_LIMIT matches the upstream 413", () => {
  assert.equal(XAI_CHAT_HISTORY_LIMIT, 800);
});

test("capXaiChatMessages is a no-op at or under the limit", () => {
  const messages = [
    { role: "system", content: "sys" },
    ...Array.from({ length: 400 }, (_, i) => chatTurn(i)).flat(),
  ];
  assert.equal(messages.length, 801);
  const under = messages.slice(0, 800);
  assert.equal(capXaiChatMessages(under), under);
  assert.equal(capXaiChatMessages(under).length, 800);
});

test("capXaiChatMessages keeps system plus the newest tail", () => {
  const messages = [
    { role: "system", content: "sys" },
    ...Array.from({ length: 450 }, (_, i) => chatTurn(i)).flat(),
  ];
  assert.ok(messages.length > 800);
  const capped = capXaiChatMessages(messages);
  assert.ok(capped.length <= 800);
  assert.equal(capped[0].role, "system");
  assert.equal(capped[0].content, "sys");
  assert.equal(capped[capped.length - 1].content, "a449");
  assert.equal(capped[capped.length - 2].content, "u449");
  assert.equal(
    capped.some((m) => m.content === "u0"),
    false
  );
});

test("capXaiChatMessages drops a tool_result whose tool_use was cut", () => {
  const messages = [
    { role: "system", content: "sys" },
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: "old", type: "function", function: { name: "search" } }],
    },
    { role: "tool", tool_call_id: "old", content: "stale" },
    ...Array.from({ length: 420 }, (_, i) => chatTurn(i)).flat(),
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: "kept", type: "function", function: { name: "read" } }],
    },
    { role: "tool", tool_call_id: "kept", content: "file" },
    { role: "user", content: "go" },
  ];
  const capped = capXaiChatMessages(messages);
  assert.ok(capped.length <= 800);
  const toolIds = capped.filter((m) => m.role === "tool").map((m) => m.tool_call_id);
  assert.deepEqual(toolIds, ["kept"]);
});

test("repairXaiResponsesInput drops orphaned function_call_output", () => {
  const items = [
    { type: "function_call_output", call_id: "missing", output: "nope" },
    { role: "user", content: [{ type: "input_text", text: "hi" }] },
    { type: "function_call", call_id: "ok", name: "read", arguments: "{}" },
    { type: "function_call_output", call_id: "ok", output: "file" },
  ];
  const repaired = repairXaiResponsesInput(items);
  assert.equal(
    repaired.some((item) => item.call_id === "missing"),
    false
  );
  assert.equal(repaired.length, 3);
});

test("repairXaiResponsesInput keeps a trailing in-flight function_call", () => {
  const items = [
    { role: "user", content: [{ type: "input_text", text: "hi" }] },
    { type: "function_call", call_id: "pending", name: "read", arguments: "{}" },
  ];
  assert.deepEqual(repairXaiResponsesInput(items), items);
});

test("capXaiResponsesInput keeps the newest 800 items and repairs the cut", () => {
  const input = [];
  for (let i = 0; i < 500; i++) {
    input.push({ role: "user", content: [{ type: "input_text", text: `u${i}` }] });
    input.push({ type: "function_call", call_id: `c${i}`, name: "t", arguments: "{}" });
    input.push({ type: "function_call_output", call_id: `c${i}`, output: `o${i}` });
  }
  assert.ok(input.length > 800);
  const capped = capXaiResponsesInput(input);
  assert.ok(capped.length <= 800);
  assert.equal(capped[capped.length - 1].output, "o499");
  const outputs = capped.filter((item) => item.type === "function_call_output");
  const calls = new Set(
    capped.filter((item) => item.type === "function_call").map((item) => item.call_id)
  );
  for (const item of outputs) {
    assert.ok(calls.has(item.call_id), `output ${item.call_id} has no matching call`);
  }
});

test("capXaiRequestHistory is a no-op when both arrays already fit", () => {
  const body = {
    model: "grok-4.3",
    messages: [{ role: "user", content: "hi" }],
  };
  assert.equal(capXaiRequestHistory(body), body);
  assert.equal("input" in capXaiRequestHistory(body), false);
});

test("capXaiRequestHistory caps messages and input independently", () => {
  const messages = Array.from({ length: 801 }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: String(i),
  }));
  const input = Array.from({ length: 801 }, (_, i) => ({
    role: "user",
    content: [{ type: "input_text", text: String(i) }],
  }));
  const out = capXaiRequestHistory({ model: "grok-4.3", messages, input });
  assert.ok((out.messages as unknown[]).length <= 800);
  assert.ok((out.input as unknown[]).length <= 800);
  assert.equal((out.messages as { content: string }[]).at(-1)?.content, "800");
  assert.equal((out.input as { content: { text: string }[] }[]).at(-1)?.content[0].text, "800");
});

test("XaiExecutor caps Chat Completions history before grok-4.3 leaves the executor", () => {
  const executor = new XaiExecutor();
  const messages = [
    { role: "system", content: "sys" },
    ...Array.from({ length: 450 }, (_, i) => chatTurn(i)).flat(),
  ];
  const out = executor.transformRequest(
    "grok-4.3",
    { model: "grok-4.3", messages },
    false,
    credentials
  ) as Record<string, unknown>;
  assert.ok(Array.isArray(out.messages));
  assert.ok((out.messages as unknown[]).length <= 800);
  assert.equal((out.messages as { content: string }[])[0].content, "sys");
  assert.equal((out.messages as { content: string }[]).at(-1)?.content, "a449");
});

test("XaiExecutor caps Responses input after expanding a long chat history", () => {
  const executor = new XaiExecutor();
  const messages = [];
  for (let i = 0; i < 300; i++) {
    messages.push({ role: "user", content: `u${i}` });
    messages.push({
      role: "assistant",
      content: null,
      tool_calls: [
        { id: `c${i}a`, type: "function", function: { name: "a", arguments: "{}" } },
        { id: `c${i}b`, type: "function", function: { name: "b", arguments: "{}" } },
      ],
    });
    messages.push({ role: "tool", tool_call_id: `c${i}a`, content: "ra" });
    messages.push({ role: "tool", tool_call_id: `c${i}b`, content: "rb" });
  }
  // 300 turns × (1 user + 2 function_call + 2 function_call_output) = 1500 input items
  const out = executor.transformRequest(
    "grok-4.6",
    { model: "grok-4.6", messages },
    false,
    credentials
  ) as Record<string, unknown>;
  assert.equal(out.messages, undefined);
  assert.ok(Array.isArray(out.input));
  assert.ok((out.input as unknown[]).length <= 800);
  const last = (out.input as { type?: string; call_id?: string }[]).at(-1);
  assert.equal(last?.type, "function_call_output");
  assert.equal(last?.call_id, "c299b");
});
