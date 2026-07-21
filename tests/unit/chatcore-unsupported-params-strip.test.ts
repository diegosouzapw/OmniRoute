// tests/unit/chatcore-unsupported-params-strip.test.ts
// Extracted from handleChatCore (chatCore god-file decomposition).
import { test } from "node:test";
import assert from "node:assert/strict";
import { stripUnsupportedParams } from "../../open-sse/handlers/chatCore/unsupportedParamsStrip.ts";

test("strips each unsupported param present on the body", () => {
  const body: Record<string, unknown> = { model: "x", tools: [{ x: 1 }], tool_choice: "auto" };
  const result = stripUnsupportedParams(body, ["tools", "tool_choice", "parallel_tool_calls"]);
  assert.deepEqual(result.strippedParams, ["tools", "tool_choice"]);
  assert.equal(Object.hasOwn(body, "tools"), false);
  assert.equal(Object.hasOwn(body, "tool_choice"), false);
  assert.equal(body.model, "x");
});

test("no-op when the body has none of the unsupported params", () => {
  const body: Record<string, unknown> = { model: "x", messages: [] };
  const result = stripUnsupportedParams(body, ["tools", "tool_choice"]);
  assert.deepEqual(result.strippedParams, []);
  assert.deepEqual(body, { model: "x", messages: [] });
});

// Live incident: AI Horde 500'd on real combo traffic even after tools/tool_choice
// were stripped from the live request, because prior-turn tool_calls/tool-result
// messages were still in the history — a raw completion backend chokes on those
// message shapes regardless of whether live `tools` is present.
test("flattens tool_calls/tool-result messages in history when tools was stripped", () => {
  const body: Record<string, unknown> = {
    model: "aphrodite/TheDrummer/Behemoth-X-123B-v2.1",
    tools: [{ type: "function", function: { name: "exec" } }],
    messages: [
      { role: "user", content: "run the script" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_1", type: "function", function: { name: "exec", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "call_1", content: "output here" },
      { role: "user", content: "what happened?" },
    ],
  };

  const result = stripUnsupportedParams(body, ["tools", "tool_choice", "parallel_tool_calls"]);
  assert.deepEqual(result.strippedParams, ["tools"]);

  const messages = body.messages as Array<Record<string, unknown>>;
  assert.equal(messages.length, 4);
  // No message may keep role:"tool" or an assistant tool_calls array — that's
  // exactly the shape AI Horde's backend 500'd on.
  for (const m of messages) {
    assert.notEqual(m.role, "tool");
    assert.equal(m.tool_calls, undefined);
  }
  assert.equal(messages[0].content, "run the script");
  assert.ok(String(messages[1].content).includes("Called tools: exec"));
  assert.ok(String(messages[2].content).includes("Tool result: output here"));
  assert.equal(messages[3].content, "what happened?");
});

// Live incident, round 2: the FIRST live reproduction happened to include a
// live `tools` array alongside the stale history, which masked this gap. A
// second live request had NO `tools` param at all — just the leftover
// tool_calls/tool-result messages — and still 500'd, because the flattening
// was gated on "tools" having actually been present-and-stripped THIS
// request, not on whether the model supports tool calling at all. A model
// that can't do tool calling can't do it regardless of whether this
// particular request happens to carry a live `tools` array.
test("flattens tool history even when the CURRENT request has no live tools param at all", () => {
  const body: Record<string, unknown> = {
    model: "aphrodite/TheDrummer/Behemoth-X-123B-v2.1",
    // no `tools` key on this request — only stale history from before failover
    messages: [
      { role: "user", content: "run the script" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_1", type: "function", function: { name: "exec", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "call_1", content: "output here" },
      { role: "user", content: "what happened?" },
    ],
  };

  stripUnsupportedParams(body, ["tools", "tool_choice", "parallel_tool_calls"]);

  const messages = body.messages as Array<Record<string, unknown>>;
  for (const m of messages) {
    assert.notEqual(m.role, "tool");
    assert.equal(m.tool_calls, undefined);
  }
});

test("does not touch messages when tools was NOT among the unsupported/stripped params", () => {
  const originalMessages = [
    { role: "user", content: "hi" },
    { role: "assistant", content: null, tool_calls: [{ id: "c1", function: { name: "x" } }] },
  ];
  const body: Record<string, unknown> = {
    model: "x",
    temperature: 2,
    messages: originalMessages,
  };
  stripUnsupportedParams(body, ["temperature"]);
  // messages array must be untouched (same reference, tool_calls survives) —
  // this model DOES support tools, only temperature was unsupported.
  assert.equal(body.messages, originalMessages);
});
