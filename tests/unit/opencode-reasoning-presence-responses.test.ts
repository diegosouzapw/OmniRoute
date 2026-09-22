import test from "node:test";
import assert from "node:assert/strict";

// Dynamic import is the established convention in this suite (loader stack +
// polyfills; see 9303-recovery-hint-all-targets-skipped.test.ts).
const { openaiToOpenAIResponsesRequest } = await import(
  "../../open-sse/translator/request/openai-responses/toResponses.ts"
);
const { NON_ANTHROPIC_THINKING_PLACEHOLDER } = await import(
  "../../open-sse/utils/reasoningPlaceholder.ts"
);

test("responses transport: internal reasoning sentinel is emitted as a reasoning_text item", () => {
  const body = {
    model: "deepseek-v4-flash-max",
    messages: [
      { role: "user", content: "question" },
      {
        role: "assistant",
        tool_calls: [{ id: "call_1", type: "function", function: { name: "f", arguments: "{}" } }],
        // Replay cache missed: only the internal sentinel is available.
        reasoning_content: NON_ANTHROPIC_THINKING_PLACEHOLDER,
      },
      { role: "tool", tool_call_id: "call_1", content: "result" },
    ],
  };
  const out = openaiToOpenAIResponsesRequest("deepseek-v4-flash-max", body, true, {
    _explicitReasoningReplay: true,
  }) as { input: Array<{ type: string; content?: Array<{ type: string; text?: string }> }> };

  const reasoningItems = out.input.filter(
    (item) => item.type === "reasoning" && item.content?.[0]?.type === "reasoning_text"
  );
  assert.equal(
    reasoningItems.length,
    1,
    "the sentinel-carrying assistant turn must produce exactly one reasoning item " +
      "(opencode thinking-mode contract: history without reasoning_text 400s)"
  );
  assert.equal(reasoningItems[0].content?.[0]?.text, NON_ANTHROPIC_THINKING_PLACEHOLDER);
});

test("responses transport: assistant turns with real reasoning keep their text", () => {
  const body = {
    model: "deepseek-v4-flash-max",
    messages: [
      {
        role: "assistant",
        content: "answer",
        reasoning_content: "Because 2+2=4.",
      },
    ],
  };
  const out = openaiToOpenAIResponsesRequest("deepseek-v4-flash-max", body, true, null) as {
    input: Array<{ type: string; content?: Array<{ type: string; text?: string }> }>;
  };
  const reasoningItems = out.input.filter((item) => item.type === "reasoning");
  assert.equal(reasoningItems.length, 1);
  assert.equal(reasoningItems[0].content?.[0]?.text, "Because 2+2=4.");
});
