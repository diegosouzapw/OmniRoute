/**
 * Regression test for #6220 (follow-up) — the tool-exchange feedback fix
 * (gitlab-tool-result-feedback-6220) taught the GitLab Duo executor to serialize the
 * FULL multi-turn conversation into the code_suggestions prompt so the model sees the
 * tool result. But GitLab's AI-Gateway `code_suggestions` endpoint is a single-file
 * `generation` API with a `small_file` validation guard: once the folded history grew
 * large, `transformRequest` sent an oversized `content_above_cursor` AND duplicated the
 * whole thing into `user_instruction`, and the gateway rejected turn-N with
 * `422 {"detail":"Validation error"}` (tokens 0/0, pre-inference).
 *
 * Fix: BOUND the serialized tool-exchange prompt — keep system + latest user message +
 * the most-recent tool round, cap oversized tool results, and stop duplicating the full
 * prompt into `user_instruction` (it now carries only the short latest user message).
 * The most-recent tool result must still be present so the model keeps its observation.
 *
 * The upstream 422→200 clearing is VPS-only (Hard Rule #18); this unit test covers the
 * bounding logic (char/length caps + tool-result presence), which is the root cause.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { GitlabExecutor, buildPrompt } from "../../open-sse/executors/gitlab.ts";

// A tool result large enough to blow the small_file generation contract if unbounded.
const HUGE_TOOL_RESULT =
  "TOOLRESULT_START " + "x".repeat(60_000) + " TOOLRESULT_END";

function buildLongToolConversation() {
  const messages: Array<Record<string, unknown>> = [
    { role: "system", content: "You are a helpful coding assistant." },
    { role: "user", content: "List the files and summarize the repo." },
  ];
  // ≥10 messages: several assistant tool_calls + tool results folded back.
  for (let i = 0; i < 5; i++) {
    messages.push({
      role: "assistant",
      content: "",
      tool_calls: [
        {
          id: `call_${i}`,
          type: "function",
          function: { name: "read_file", arguments: `{"path":"file_${i}.ts"}` },
        },
      ],
    });
    messages.push({
      role: "tool",
      tool_call_id: `call_${i}`,
      name: "read_file",
      content: i === 4 ? HUGE_TOOL_RESULT : `contents of file_${i}`,
    });
  }
  return messages;
}

test("buildPrompt: long tool-exchange history is bounded (char cap) [#6220]", () => {
  const messages = buildLongToolConversation();
  const prompt = buildPrompt(messages);
  // Sane bound for the small_file generation contract.
  assert.ok(
    prompt.length < 30_000,
    `bounded prompt should stay under 30k chars, got ${prompt.length}`
  );
  // The most-recent tool result must still be present (its head survives the cap).
  assert.match(prompt, /TOOLRESULT_START/);
});

test("transformRequest: content_above_cursor and user_instruction are both bounded [#6220]", () => {
  const executor = new GitlabExecutor("gitlab-duo");
  const messages = buildLongToolConversation();
  const out = executor.transformRequest(
    "gitlab-duo/model",
    { messages },
    false,
    {} as never
  ) as Record<string, unknown>;

  const currentFile = out.current_file as Record<string, unknown>;
  const contentAbove = String(currentFile.content_above_cursor || "");
  const userInstruction = String(out.user_instruction || "");

  // content_above_cursor carries the (bounded) folded history + the tool observation.
  assert.ok(
    contentAbove.length < 30_000,
    `content_above_cursor should be bounded, got ${contentAbove.length}`
  );
  assert.match(contentAbove, /TOOLRESULT_START/);

  // user_instruction must NOT duplicate the whole huge prompt — the duplication was the
  // likely offending 422 field. It carries only the short latest user message.
  assert.ok(
    userInstruction.length < 5_000,
    `user_instruction should be short (not the full prompt), got ${userInstruction.length}`
  );
  assert.match(userInstruction, /summarize the repo/);
});
