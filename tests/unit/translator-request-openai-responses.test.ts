import test from "node:test";
import assert from "node:assert/strict";

// Regression coverage for the Responses -> OpenAI tool-result pairing invariant
// (every tool result must reference a call still present in the request). This
// direction is already covered: `openaiResponsesToOpenAIRequest` builds
// `allToolCallIds` from every emitted `function_call` and drops any `role:"tool"`
// message whose `tool_call_id` has no match (see the post-filter after tool
// conversion in openai-responses.ts, hardened under #2893 to also catch
// empty/missing call ids). These tests just pin that behavior down explicitly so a
// future edit to that filter trips a red here.
const { openaiResponsesToOpenAIRequest, openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

type ChatMsg = { role: string; tool_call_id?: string; content?: unknown };

test("Responses -> OpenAI: orphaned function_call_output is stripped", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
        { type: "function_call_output", call_id: "orphan_call", output: "stale result" },
      ],
    },
    false,
    {}
  ) as { messages: ChatMsg[] };

  assert.equal(
    result.messages.some((m) => m.role === "tool" && m.tool_call_id === "orphan_call"),
    false
  );
});

test("Responses -> OpenAI: matched function_call_output is preserved", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [
        { type: "function_call", call_id: "call_ok", name: "read_file", arguments: "{}" },
        { type: "function_call_output", call_id: "call_ok", output: "contents" },
      ],
    },
    false,
    {}
  ) as { messages: ChatMsg[] };

  const toolMsgs = result.messages.filter((m) => m.role === "tool");
  assert.equal(toolMsgs.length, 1);
  assert.equal(toolMsgs[0].tool_call_id, "call_ok");
});

test("Responses -> OpenAI: zero-function-call truncation strips every stale output", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [
        { type: "function_call_output", call_id: "call_a", output: "stale a" },
        { type: "function_call_output", call_id: "call_b", output: "stale b" },
        { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
      ],
    },
    false,
    {}
  ) as { messages: ChatMsg[] };

  assert.equal(
    result.messages.some((m) => m.role === "tool"),
    false
  );
  assert.equal(
    result.messages.some((m) => m.role === "user"),
    true
  );
});

test("Responses -> OpenAI: mixed matched + orphan keeps only the matched output", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [
        { type: "function_call", call_id: "call_valid", name: "fn", arguments: "{}" },
        { type: "function_call_output", call_id: "call_valid", output: "ok" },
        { type: "function_call_output", call_id: "call_orphan", output: "stale" },
      ],
    },
    false,
    {}
  ) as { messages: ChatMsg[] };

  const toolMsgs = result.messages.filter((m) => m.role === "tool");
  assert.equal(toolMsgs.length, 1);
  assert.equal(toolMsgs[0].tool_call_id, "call_valid");
});

test("OpenAI -> Responses: whitespace-padded matching call ids stay paired (not orphan-dropped)", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [
        { role: "user", content: "read the file" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: " call_1 ", type: "function", function: { name: "read_file", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: " call_1 ", content: "file contents" },
      ],
    },
    false,
    {}
  ) as { input: Array<{ type?: string; call_id?: string }> };

  const outputs = result.input.filter((i) => i.type === "function_call_output");
  const call = result.input.find((i) => i.type === "function_call");
  assert.ok(call, "a function_call is emitted");
  assert.equal(
    outputs.length,
    1,
    "the tool result must survive the orphaned-output filter despite padded ids"
  );
  assert.equal(
    outputs[0].call_id,
    call!.call_id,
    "the function_call_output call_id must equal its paired function_call id"
  );
});
