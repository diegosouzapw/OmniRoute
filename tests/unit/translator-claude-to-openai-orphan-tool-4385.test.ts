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

const { claudeToOpenAIRequest } = await import(
  "../../open-sse/translator/request/claude-to-openai.ts"
);

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
