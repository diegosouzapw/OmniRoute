// Regression: open-sse/translator/request/gemini-to-openai.ts — a Gemini `content`
// whose `parts` array holds a `functionResponse` co-located with other parts
// (another functionCall, or trailing text) used to be dropped past the first
// functionResponse, because convertGeminiContent() early-returns the tool message
// on the first `functionResponse` part it finds. Gemini clients legitimately send
// functionResponse alongside functionCall (multi-tool turns) or text (a user
// follow-up next to a tool result). The fix pre-splits such contents so every
// co-located part is preserved (tool results emitted first to keep ordering).
//
// Tested against the exported geminiToOpenAIRequest — the function registered as
// the GEMINI→OPENAI request translator (translateRequest routes through it after
// its normalize pipeline, which strips *orphaned* tool results; a real multi-turn
// conversation carries the matching functionCall so the co-located parts reach this
// function intact). This mirrors OmniRoute's translator-gemini-to-openai.test.ts.
import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIRequest } = await import(
  "../../open-sse/translator/request/gemini-to-openai.ts"
);

test("preserves a functionCall co-located with a functionResponse in the same content", () => {
  const body = {
    contents: [
      {
        role: "model",
        parts: [
          { functionCall: { id: "call_a", name: "tool_a", args: {} } },
          { functionResponse: { id: "call_b", name: "tool_b", response: { result: "b done" } } },
        ],
      },
    ],
  };
  const result = geminiToOpenAIRequest("gemini-pro", body, false);
  const toolMsg = result.messages.find((m) => m.role === "tool");
  const assistantMsg = result.messages.find((m) => m.role === "assistant" && m.tool_calls);
  assert.ok(toolMsg, "tool result must be preserved");
  assert.ok(assistantMsg, "co-located functionCall must be preserved");
  assert.equal(assistantMsg.tool_calls[0].function.name, "tool_a");
});

test("preserves multiple functionResponses in the same content", () => {
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { functionResponse: { id: "call_a", name: "tool_a", response: { result: "a done" } } },
          { functionResponse: { id: "call_b", name: "tool_b", response: { result: "b done" } } },
        ],
      },
    ],
  };
  const result = geminiToOpenAIRequest("gemini-pro", body, false);
  const toolMsgs = result.messages.filter((m) => m.role === "tool");
  assert.equal(toolMsgs.length, 2);
  assert.deepEqual(
    toolMsgs.map((m) => m.tool_call_id).sort(),
    ["call_a", "call_b"]
  );
});

test("preserves text co-located with a functionResponse, keeping the original turn role", () => {
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { functionResponse: { id: "call_a", name: "tool_a", response: { result: "a done" } } },
          { text: "also please summarize" },
        ],
      },
    ],
  };
  const result = geminiToOpenAIRequest("gemini-pro", body, false);
  const toolMsg = result.messages.find((m) => m.role === "tool");
  const userMsg = result.messages.find(
    (m) => m.role === "user" && m.content === "also please summarize"
  );
  const asstWithText = result.messages.find(
    (m) => m.role === "assistant" && m.content === "also please summarize"
  );
  assert.ok(toolMsg, "tool result must be preserved");
  assert.ok(userMsg, "co-located text must be preserved with role:user");
  assert.ok(!asstWithText, "co-located user text must NOT be attributed to assistant");
});

test("still works for a functionResponse alone (no regression)", () => {
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { functionResponse: { id: "call_a", name: "tool_a", response: { result: "a done" } } },
        ],
      },
    ],
  };
  const result = geminiToOpenAIRequest("gemini-pro", body, false);
  const toolMsgs = result.messages.filter((m) => m.role === "tool");
  assert.equal(toolMsgs.length, 1);
  assert.equal(toolMsgs[0].tool_call_id, "call_a");
});
