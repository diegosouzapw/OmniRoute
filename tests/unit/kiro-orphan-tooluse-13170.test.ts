import test from "node:test";
import assert from "node:assert/strict";

const { buildKiroPayload } = await import("../../open-sse/translator/request/openai-to-kiro.ts");

const CREDENTIALS = {
  accessToken: "test-token",
  profileArn: "arn:aws:codewhisperer:us-east-1:000000000000:profile/TEST",
  region: "us-east-1",
};

function build(messages) {
  return buildKiroPayload(
    "claude-sonnet-4.5",
    { model: "claude-sonnet-4.5", messages },
    false,
    CREDENTIALS
  );
}

/**
 * Collect every toolUseId advertised by assistant turns and every toolUseId
 * answered by a toolResult, across history plus currentMessage.
 *
 * Bedrock rejects a transcript where an assistant turn advertises a toolUse
 * that is never answered ("Expected toolResult blocks"), so every advertised
 * id must have a matching answered id.
 */
function collectToolIds(payload) {
  const history = payload?.conversationState?.history ?? [];
  const advertised = [];
  const answered = [];

  for (const entry of history) {
    const toolUses = entry?.assistantResponseMessage?.toolUses;
    if (Array.isArray(toolUses)) {
      for (const use of toolUses) advertised.push(use.toolUseId ?? use.id);
    }
    const toolResults = entry?.userInputMessage?.userInputMessageContext?.toolResults;
    if (Array.isArray(toolResults)) {
      for (const result of toolResults) answered.push(result.toolUseId);
    }
  }

  const currentResults =
    payload?.conversationState?.currentMessage?.userInputMessage?.userInputMessageContext
      ?.toolResults;
  if (Array.isArray(currentResults)) {
    for (const result of currentResults) answered.push(result.toolUseId);
  }

  return { advertised, answered };
}

// --- RED: a tool_use with no matching tool_result anywhere must be dropped --

test("kiro #13170: an orphaned parallel tool_call (no tool_result ever) is stripped, its sibling survives", () => {
  const payload = build([
    { role: "user", content: "run two commands" },
    {
      role: "assistant",
      content: "",
      tool_calls: [
        { id: "call_A", type: "function", function: { name: "terminal", arguments: "{}" } },
        { id: "call_B", type: "function", function: { name: "terminal", arguments: "{}" } },
      ],
    },
    // call_B's result is missing -- e.g. lost client-side, never recorded.
    { role: "tool", tool_call_id: "call_A", content: "1" },
    { role: "user", content: "now say hi" },
  ]);

  const { advertised, answered } = collectToolIds(payload);
  assert.deepEqual(advertised, ["call_A"], "call_B must not be advertised without a result");
  assert.deepEqual(answered, ["call_A"]);
});

test("kiro #13170: an assistant turn where every tool_call is orphaned drops toolUses entirely", () => {
  const payload = build([
    { role: "user", content: "go" },
    {
      role: "assistant",
      content: "",
      tool_calls: [{ id: "call_A", type: "function", function: { name: "terminal", arguments: "{}" } }],
    },
    // No tool result anywhere for call_A.
    { role: "user", content: "thanks" },
  ]);

  const { advertised } = collectToolIds(payload);
  assert.deepEqual(advertised, []);

  const history = payload?.conversationState?.history ?? [];
  const assistantTurn = history.find((entry) => entry?.assistantResponseMessage);
  assert.ok(assistantTurn, "the assistant turn itself must survive (only toolUses is stripped)");
  assert.ok(
    !("toolUses" in assistantTurn.assistantResponseMessage),
    "toolUses must be removed entirely, not left as an empty array"
  );
});

// --- Regression: a still-in-flight trailing tool_call is not stripped ------

test("kiro #13170: a trailing (in-flight) tool_call with no result yet is preserved", () => {
  const payload = build([
    { role: "user", content: "go" },
    {
      role: "assistant",
      content: "",
      tool_calls: [{ id: "call_A", type: "function", function: { name: "terminal", arguments: "{}" } }],
    },
  ]);

  // The trailing assistant message becomes currentMessage, not a history
  // entry with toolUses -- so there is nothing to strip in this shape. This
  // test pins that a single trailing assistant turn is not corrupted by the
  // new filter.
  const current = payload?.conversationState?.currentMessage;
  assert.ok(current, "currentMessage must be present");
});

// --- Characterization: fully-answered parallel calls must keep working ----

test("kiro #13170: fully-answered parallel tool_calls are unaffected", () => {
  const payload = build([
    { role: "user", content: "run two commands" },
    {
      role: "assistant",
      content: "",
      tool_calls: [
        { id: "call_A", type: "function", function: { name: "terminal", arguments: "{}" } },
        { id: "call_B", type: "function", function: { name: "terminal", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: "call_A", content: "1" },
    { role: "tool", tool_call_id: "call_B", content: "2" },
    { role: "user", content: "thanks" },
  ]);

  const { advertised, answered } = collectToolIds(payload);
  assert.deepEqual(advertised.sort(), ["call_A", "call_B"]);
  assert.deepEqual(answered.sort(), ["call_A", "call_B"]);
});

test("kiro #13170: assistant text is preserved on an ordinary non-tool transcript", () => {
  const payload = build([
    { role: "user", content: "hi" },
    { role: "assistant", content: "PLAIN_REPLY" },
    { role: "user", content: "again" },
  ]);

  const history = payload?.conversationState?.history ?? [];
  const assistantContents = history
    .filter((entry) => entry?.assistantResponseMessage)
    .map((entry) => entry.assistantResponseMessage.content);
  assert.ok(assistantContents.some((c) => String(c).includes("PLAIN_REPLY")));
});
