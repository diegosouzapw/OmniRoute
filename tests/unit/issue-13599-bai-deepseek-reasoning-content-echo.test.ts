import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// Issue #13599: follow-up requests to DeepSeek thinking-mode models served through the
// `bai` provider (api.b.ai) are rejected upstream with
//   400 The `reasoning_content` in the thinking mode must be passed back to the API
// because standard OpenAI-shaped clients do not preserve `reasoning_content` on the prior
// assistant turn when they replay conversation history. OmniRoute already has a mechanism
// for exactly this requirement (open-sse/utils/reasoningContentInjector.ts, ported from
// 9router#1480), but DefaultExecutor.transformRequest only invoked it when
// `this.provider === "kimi" || this.provider === "moonshot"` (open-sse/executors/default.ts) —
// the `bai` DeepSeek-reselling gateway was not covered, so a follow-up turn was forwarded to
// DeepSeek with no `reasoning_content` on the prior assistant message.

function priorTurnBody(model: string) {
  return {
    model,
    stream: false,
    messages: [
      { role: "user", content: "What is 2+2?" },
      // Standard OpenAI-shaped client history: the assistant turn carries only
      // `content`. It does NOT echo back `reasoning_content` from the previous
      // response, exactly like a normal ChatGPT-style client would replay it.
      { role: "assistant", content: "4" },
      { role: "user", content: "Now multiply that by 10." },
    ],
  };
}

test("DefaultExecutor injects reasoning_content for bai/deepseek follow-up turns (issue #13599)", () => {
  const executor = new DefaultExecutor("bai");
  const body = priorTurnBody("bai/deepseek-reasoner");

  const transformed = executor.transformRequest("bai/deepseek-reasoner", body, false, {
    apiKey: "sk-bai-test",
  }) as { messages: Array<Record<string, unknown>> };

  const assistantTurn = transformed.messages.find((m) => m.role === "assistant");
  assert.ok(assistantTurn, "expected an assistant message in the transformed body");

  // The injector's placeholder is a single space (matching the existing Moonshot/Kimi
  // convention in reasoningContentInjector.ts — DeepSeek only requires the field to be
  // present and non-empty, not semantically meaningful), so assert non-empty length
  // directly rather than trimming.
  assert.ok(
    typeof assistantTurn!.reasoning_content === "string" &&
      (assistantTurn!.reasoning_content as string).length > 0,
    "expected DefaultExecutor to inject a non-empty reasoning_content placeholder on the " +
      "assistant turn for a bai/deepseek thinking-mode follow-up (it did not — this is issue #13599)"
  );
});

test("DefaultExecutor does not touch non-thinking-model bai follow-up turns", () => {
  const executor = new DefaultExecutor("bai");
  const body = priorTurnBody("bai/gpt-4o-mini");

  const transformed = executor.transformRequest("bai/gpt-4o-mini", body, false, {
    apiKey: "sk-bai-test",
  }) as { messages: Array<Record<string, unknown>> };

  const assistantTurn = transformed.messages.find((m) => m.role === "assistant");
  assert.ok(assistantTurn, "expected an assistant message in the transformed body");
  assert.equal(
    "reasoning_content" in assistantTurn!,
    false,
    "a non-thinking model must not receive an injected reasoning_content field"
  );
});
