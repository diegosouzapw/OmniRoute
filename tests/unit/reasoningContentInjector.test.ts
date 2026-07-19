import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  isThinkingMessageModel,
  injectReasoningContentForThinkingModel,
} from "../../open-sse/utils/reasoningContentInjector.ts";

describe("reasoningContentInjector — xiaomi-tokenplan mimo family (9router#1321)", () => {
  it("recognizes xiaomi-tokenplan/mimo-v2.5-pro as a thinking-mode model", () => {
    assert.equal(isThinkingMessageModel("xiaomi-tokenplan/mimo-v2.5-pro"), true);
  });

  it("recognizes bare mimo model ids as thinking-mode models", () => {
    assert.equal(isThinkingMessageModel("mimo-v2.5-pro"), true);
  });

  it("still recognizes the existing thinking-mode families (deepseek/kimi/k2/minimax)", () => {
    assert.equal(isThinkingMessageModel("deepseek-v4-flash"), true);
    assert.equal(isThinkingMessageModel("kimi-k2"), true);
    assert.equal(isThinkingMessageModel("minimax-m2"), true);
  });

  it("does not flag unrelated model ids", () => {
    assert.equal(isThinkingMessageModel("gpt-4o"), false);
  });

  it("injects a reasoning_content placeholder for assistant messages when routed to mimo", () => {
    const body = {
      model: "xiaomi-tokenplan/mimo-v2.5-pro",
      messages: [
        { role: "user", content: "hi" },
        { role: "assistant", content: "hello" },
      ],
    };

    // Simulate the executor gate: only inject when the model is a thinking model.
    assert.equal(isThinkingMessageModel(body.model), true);

    const result = injectReasoningContentForThinkingModel(body) as typeof body;
    const assistantMsg = result.messages[1] as Record<string, unknown>;
    assert.equal(assistantMsg.reasoning_content, " ");
  });
});
