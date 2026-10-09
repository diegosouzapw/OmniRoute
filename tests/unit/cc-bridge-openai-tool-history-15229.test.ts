/**
 * #15229 — OpenAI tool-call history must survive the CC bridge.
 *
 * An OpenAI-format request routed to an anthropic-compatible node in `cc`
 * compat mode skips translateRequest and is rebuilt by
 * `buildClaudeCodeCompatibleRequest`. Its OpenAI-shape converter only accepted
 * `user`/`assistant` roles and reduced assistant turns to plain text, so the
 * assistant `tool_calls` turn AND the `role:"tool"` result were both dropped —
 * the upstream saw turn 2 identical to turn 1 and re-emitted the same
 * `tool_use` forever (a silent, 200-OK non-converging tool loop). Mirrors
 * #13971/#13972, which fixed the Claude-shape→OpenAI direction.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { buildClaudeCodeCompatibleRequest } =
  await import("../../open-sse/services/claudeCodeCompatible.ts");

const TOOLS = [
  {
    type: "function",
    function: {
      name: "probe",
      description: "probe",
      parameters: { type: "object", properties: { q: { type: "string" } }, required: ["q"] },
    },
  },
];

const TURN1_MESSAGES = [{ role: "user", content: "Run probe with q=alpha." }];

const ASSISTANT_TOOL_CALLS = {
  role: "assistant",
  content: null,
  tool_calls: [
    {
      id: "call_stub_1",
      type: "function",
      function: { name: "probe", arguments: '{"q":"alpha"}' },
    },
  ],
};

const TOOL_RESULT = {
  role: "tool",
  tool_call_id: "call_stub_1",
  content: "UNIQUE_MARKER_9090",
};

function build(messages: unknown[]) {
  return buildClaudeCodeCompatibleRequest({
    sourceBody: { messages, tools: TOOLS },
    normalizedBody: { messages, tools: TOOLS },
    claudeBody: null,
    model: "claude-stub",
  });
}

test("#15229: a two-turn OpenAI tool loop reaches the CC bridge with full history", () => {
  const body = build([...TURN1_MESSAGES, ASSISTANT_TOOL_CALLS, TOOL_RESULT]);

  assert.equal(body.messages.length, 3, "user + assistant(tool_use) + user(tool_result)");

  const [user, assistant, toolTurn] = body.messages as Array<{
    role: string;
    content: Array<Record<string, unknown>>;
  }>;
  assert.equal(user.role, "user");

  assert.equal(assistant.role, "assistant");
  const toolUse = assistant.content.find((b) => b.type === "tool_use") as
    Record<string, unknown> | undefined;
  assert.ok(toolUse, "assistant turn must carry its tool_use block");
  assert.equal(toolUse.name, "probe");
  assert.deepEqual(toolUse.input, { q: "alpha" });
  assert.ok(typeof toolUse.id === "string" && toolUse.id.length > 0);

  assert.equal(toolTurn.role, "user", "the tool result becomes a user tool_result turn");
  const toolResult = toolTurn.content.find((b) => b.type === "tool_result") as
    Record<string, unknown> | undefined;
  assert.ok(toolResult, "tool result must survive");
  assert.equal(toolResult.tool_use_id, toolUse.id, "result id pairs with the tool_use id");
  assert.ok(JSON.stringify(toolResult.content).includes("UNIQUE_MARKER_9090"));

  assert.notEqual(body.messages[body.messages.length - 1]!.role, "assistant");
});

test("#15229: a mid-list tool_use turn is not dropped by the trailing-assistant trim", () => {
  const body = build([...TURN1_MESSAGES, ASSISTANT_TOOL_CALLS, TOOL_RESULT]);
  const roles = (body.messages as Array<{ role: string }>).map((m) => m.role);
  assert.ok(roles.includes("assistant"), "assistant tool_use history must survive");
});

test("#15229: turn 1 without tool history keeps its legacy shape (no regression)", () => {
  const body = build(TURN1_MESSAGES);
  assert.equal(body.messages.length, 1);
  assert.equal(body.messages[0]!.role, "user");
});

test("#15229: a trailing assistant text prefill is still trimmed (behavior preserved)", () => {
  const body = build([
    { role: "user", content: "hi" },
    { role: "assistant", content: "pref" },
  ]);
  assert.equal(body.messages.length, 1);
  assert.equal(body.messages[0]!.role, "user");
});

test("#15229: orphan tool results without a matching tool_call are skipped, not fabricated", () => {
  const body = build([{ role: "tool", tool_call_id: "", content: "no pairing id" }]);
  // No usable user/assistant content at all → same fallback shape as before.
  assert.ok(Array.isArray(body.messages));
  assert.equal(
    (body.messages as Array<{ role: string }>).some((m) => m.role === "assistant"),
    false
  );
});
