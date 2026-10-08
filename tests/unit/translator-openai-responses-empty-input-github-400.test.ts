import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

/**
 * GitHub Copilot /responses rejects a body that has neither a non-empty `input`
 * nor a previous_response_id (nor prompt/conversation):
 *   400 One of "input" or "previous_response_id" or 'prompt' or 'conversation'
 *       must be provided.
 *
 * The reverse direction (Responses→Chat) already injects a placeholder for
 * empty input[] (9router#419 / openai-responses.ts). This suite pins the
 * chat→Responses direction so system-only / fully-filtered conversations never
 * ship an empty `input` without a continuity field.
 */

function hasContinuity(body: Record<string, unknown>): boolean {
  const input = body.input;
  const inputOk = Array.isArray(input) && input.length > 0;
  const hasId =
    typeof body.previous_response_id === "string" && body.previous_response_id.length > 0;
  const hasConversation =
    typeof body.conversation_id === "string" && body.conversation_id.length > 0;
  const hasPrompt = typeof body.prompt === "string" && body.prompt.length > 0;
  return inputOk || hasId || hasConversation || hasPrompt;
}

test("chat→Responses: system-only messages inject a placeholder input item", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.5",
    { messages: [{ role: "system", content: "You are helpful." }] },
    true,
    null
  ) as Record<string, unknown>;

  assert.ok(hasContinuity(result), "body must carry non-empty input or a continuity field");
  assert.equal(result.instructions, "You are helpful.");
  const input = result.input as Array<Record<string, unknown>>;
  assert.ok(input.length > 0, "system-only must not leave input:[]");
  assert.equal(input[0].role, "user");
});

test("chat→Responses: empty messages array still ships continuity", () => {
  const result = openaiToOpenAIResponsesRequest("gpt-5.5", { messages: [] }, true, null) as Record<
    string,
    unknown
  >;
  assert.ok(hasContinuity(result), "empty messages must not produce input:[] with no id");
});

test("chat→Responses: orphan-only tool results that filter to empty still ship continuity", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.5",
    {
      messages: [
        { role: "system", content: "Rules" },
        { role: "tool", tool_call_id: "call_orphan_x", content: "stale" },
      ],
    },
    true,
    null
  ) as Record<string, unknown>;

  assert.ok(hasContinuity(result), "orphan-filtered empty input must not ship bare input:[]");
});

test("chat→Responses: empty input + previous_response_id keeps the id (no placeholder needed)", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-5.5",
    {
      messages: [{ role: "system", content: "Rules" }],
      previous_response_id: "resp_prev_abc",
    },
    true,
    null
  ) as Record<string, unknown>;

  assert.equal(result.previous_response_id, "resp_prev_abc");
  assert.ok(hasContinuity(result));
  // Continuation delta should not gain a spurious user turn when the id is present.
  assert.deepEqual(result.input, []);
});
