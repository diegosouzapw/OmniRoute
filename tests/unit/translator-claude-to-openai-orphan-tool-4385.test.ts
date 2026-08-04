import test from "node:test";
import assert from "node:assert/strict";

// #4385: routing a Claude-protocol conversation (e.g. via /v1/messages) to an
// OpenAI-compatible provider (command-code, custom openai-compatible) returned
// 502 "Messages with role 'tool' must be a response to a preceding message with
// 'tool_calls'". Cause: claudeToOpenAIRequest emits a role:"tool" message for every
// Claude tool_result block, but never drops an ORPHAN one whose tool_call_id has no
// matching assistant.tool_calls (e.g. when history truncation / compression removed
// the assistant turn but kept the tool_result). OpenAI-compatible upstreams reject it.
// This mirrors the orphan filter already on the Responses->Chat path (#2893).

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");

type Msg = { role: string; tool_call_id?: string; tool_calls?: { id?: string }[] };

test("#4385 drops an orphan tool_result with no preceding assistant tool_call", () => {
  const result = claudeToOpenAIRequest(
    "deepseek/deepseek-v4-pro",
    {
      messages: [
        { role: "user", content: "start the task" },
        {
          role: "user",
          content: [
            // orphan: the assistant turn that issued tool_use "orphan_tu" was dropped
            { type: "tool_result", tool_use_id: "orphan_tu", content: "stale output" },
            { type: "text", text: "please continue" },
          ],
        },
      ],
    },
    false
  );

  const toolMsgs = (result.messages as Msg[]).filter((m) => m.role === "tool");
  assert.equal(toolMsgs.length, 0, "orphan role:'tool' must be filtered out");
  // The user's accompanying text is preserved.
  const userTexts = (result.messages as Msg[]).filter((m) => m.role === "user");
  assert.equal(userTexts.length, 2);
});

test("#4385 preserves a tool_result paired with its assistant tool_call", () => {
  const result = claudeToOpenAIRequest(
    "deepseek/deepseek-v4-pro",
    {
      messages: [
        { role: "user", content: "list files" },
        { role: "assistant", content: [{ type: "tool_use", id: "tu_1", name: "ls", input: {} }] },
        { role: "user", content: [{ type: "tool_result", tool_use_id: "tu_1", content: "a.ts" }] },
      ],
    },
    false
  );

  const toolMsgs = (result.messages as Msg[]).filter((m) => m.role === "tool");
  assert.equal(toolMsgs.length, 1);
  assert.equal(toolMsgs[0].tool_call_id, "tu_1");
  // The assistant.tool_calls is still present and precedes the tool message.
  const assistantIdx = (result.messages as Msg[]).findIndex(
    (m) => m.role === "assistant" && Array.isArray(m.tool_calls)
  );
  const toolIdx = (result.messages as Msg[]).findIndex((m) => m.role === "tool");
  assert.ok(assistantIdx >= 0 && assistantIdx < toolIdx);
});

test("#4385 keeps valid tool_results and drops orphans in the same user turn", () => {
  const result = claudeToOpenAIRequest(
    "deepseek/deepseek-v4-pro",
    {
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "tu_valid", name: "fn", input: {} }],
        },
        {
          role: "user",
          content: [
            { type: "tool_result", tool_use_id: "tu_valid", content: "ok" },
            { type: "tool_result", tool_use_id: "tu_orphan", content: "stale" },
            { type: "text", text: "done" },
          ],
        },
      ],
    },
    false
  );

  const toolMsgs = (result.messages as Msg[]).filter((m) => m.role === "tool");
  assert.equal(toolMsgs.length, 1);
  assert.equal(toolMsgs[0].tool_call_id, "tu_valid");
});

// #4714: regression (v3.8.26+) — Claude Code issues parallel tool_use in one
// assistant turn but their tool_result blocks arrive across SEPARATE user turns
// with interleaved text. The translator emitted each role:"tool" message in the
// position of its originating user turn, so a later tool_result ended up AFTER a
// user message instead of adjacent to its assistant.tool_calls. The #4385 orphan
// filter kept it (the id DID match an assistant tool_call) but never re-ordered
// it, so OpenAI-compatible upstreams (deepseek, etc.) still rejected the request
// with 400 "Messages with role 'tool' must be a response to a preceding message
// with 'tool_calls'". fixMissingToolResponses also injected a bogus
// "[No response received]" placeholder for the not-yet-adjacent tool_call.

// Helper: every role:"tool" must be immediately preceded by an assistant carrying
// the matching tool_call id (or another tool message in the same group).
function assertToolOrdering(messages: Msg[]) {
  let activeIds: Set<string> | null = null;
  for (const m of messages) {
    if (m.role === "assistant" && Array.isArray(m.tool_calls)) {
      activeIds = new Set(m.tool_calls.map((t) => String(t.id)));
    } else if (m.role === "tool") {
      assert.ok(
        activeIds && activeIds.has(String(m.tool_call_id)),
        `role:'tool' ${m.tool_call_id} is not preceded by a matching assistant tool_calls`
      );
    } else {
      activeIds = null;
    }
  }
}

test("#4714 regroups parallel tool_results split across user turns next to their assistant", () => {
  const result = claudeToOpenAIRequest(
    "deepseek/deepseek-v4-flash-free",
    {
      messages: [
        { role: "user", content: "do two things" },
        {
          role: "assistant",
          content: [
            { type: "text", text: "calling tools" },
            { type: "tool_use", id: "callA", name: "toolA", input: { x: 1 } },
            { type: "tool_use", id: "callB", name: "toolB", input: { y: 2 } },
          ],
        },
        {
          role: "user",
          content: [
            { type: "tool_result", tool_use_id: "callA", content: "result A" },
            { type: "text", text: "and here's more context" },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "callB", content: "result B" }],
        },
      ],
    },
    false
  );

  const messages = result.messages as Msg[];
  // No upstream-rejecting ordering violations.
  assertToolOrdering(messages);

  // Both real tool results survive, adjacent to the assistant, in tool_calls order.
  const assistantIdx = messages.findIndex(
    (m) => m.role === "assistant" && Array.isArray(m.tool_calls)
  );
  assert.equal((messages[assistantIdx + 1] as Msg).tool_call_id, "callA");
  assert.equal((messages[assistantIdx + 2] as Msg).tool_call_id, "callB");

  // The real "result B" must NOT have been replaced by a placeholder.
  const toolB = messages.find((m) => m.role === "tool" && m.tool_call_id === "callB") as
    | (Msg & { content?: string })
    | undefined;
  assert.ok(toolB);
  assert.notEqual(toolB.content, "[No response received]");
  // Exactly one tool message per call id (no duplicate placeholder + real result).
  assert.equal(messages.filter((m) => m.role === "tool" && m.tool_call_id === "callB").length, 1);
});

test("#4714 still inserts a placeholder for a genuinely unanswered parallel tool_call", () => {
  const result = claudeToOpenAIRequest(
    "deepseek/deepseek-v4-flash-free",
    {
      messages: [
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: "ansA", name: "toolA", input: {} },
            { type: "tool_use", id: "noAns", name: "toolB", input: {} },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "ansA", content: "ok" }],
        },
      ],
    },
    false
  );

  const messages = result.messages as Msg[];
  assertToolOrdering(messages);
  const placeholder = messages.find((m) => m.role === "tool" && m.tool_call_id === "noAns") as
    | (Msg & { content?: string })
    | undefined;
  assert.ok(placeholder, "missing tool_call must still get a placeholder response");
  assert.equal(placeholder.content, "[No response received]");
});
