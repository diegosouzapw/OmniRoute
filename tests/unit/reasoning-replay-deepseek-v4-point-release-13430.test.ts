import test from "node:test";
import assert from "node:assert/strict";

import {
  isDeepSeekReasoningModel,
  requiresReasoningReplay,
} from "../../open-sse/services/reasoningCache.ts";

// #13430: DeepSeek point releases (v4.1-flash, v4.2-pro, …) need the same
// reasoning_content replay as v4-flash/v4-pro, and Command Code routes DeepSeek.

test("#13430 DeepSeek V4 point releases are recognized as reasoning models", () => {
  for (const model of [
    "deepseek-v4.1-flash",
    "deepseek/deepseek-v4-2-pro",
    "deepseek-v4.1-flash-free",
  ]) {
    assert.equal(
      isDeepSeekReasoningModel({ provider: "x", model, thinkingEnabled: true }),
      true,
      model
    );
    assert.equal(requiresReasoningReplay({ provider: "openrouter", model }), true, model);
  }
});

test("#13430 original V4 ids still match and unrelated ids do not", () => {
  assert.equal(
    isDeepSeekReasoningModel({ provider: "x", model: "deepseek-v4-flash", thinkingEnabled: true }),
    true
  );
  assert.equal(
    isDeepSeekReasoningModel({ provider: "x", model: "deepseek-v4x-flash", thinkingEnabled: true }),
    false
  );
});

test("#13430 command-code requires reasoning replay", () => {
  assert.equal(requiresReasoningReplay({ provider: "command-code", model: "any-model" }), true);
});
