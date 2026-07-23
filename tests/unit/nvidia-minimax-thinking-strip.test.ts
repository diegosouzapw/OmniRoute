// Regression guard: NVIDIA NIM's OpenAI-compatible wrapper (format:"openai")
// does not accept the Claude-style `thinking` body field for
// minimaxai/minimax-m2.7 and returns 400 "Unsupported parameter(s): thinking".
// Upstream #2268 / 9router#2323.
//
// Fix: paramSupport.ts STRIP_RULES drops `thinking` for provider "nvidia" +
// model matching /minimax-m2\.7/i before the request reaches the executor.

import { test } from "node:test";
import assert from "node:assert/strict";
import { stripUnsupportedParams } from "../../open-sse/translator/paramSupport.ts";

test("stripUnsupportedParams: nvidia + minimaxai/minimax-m2.7 drops thinking", () => {
  const body: Record<string, unknown> = {
    model: "minimaxai/minimax-m2.7",
    thinking: { type: "adaptive" },
    max_tokens: 512,
    temperature: 0.7,
  };
  stripUnsupportedParams("nvidia", "minimaxai/minimax-m2.7", body);
  assert.equal(body.thinking, undefined, "thinking must be stripped for NVIDIA minimax-m2.7");
  assert.equal(body.max_tokens, 512, "other params must survive");
  assert.equal(body.temperature, 0.7, "other params must survive");
  assert.equal(body.model, "minimaxai/minimax-m2.7", "model must not be touched");
});

test("stripUnsupportedParams: nvidia + z-ai/glm-5.2 drops thinking AND reasoning (port from 9router#2023)", () => {
  const body: Record<string, unknown> = {
    model: "z-ai/glm-5.2",
    thinking: { type: "adaptive" },
    reasoning: { effort: "high" },
    max_tokens: 512,
  };
  stripUnsupportedParams("nvidia", "z-ai/glm-5.2", body);
  assert.equal(body.thinking, undefined, "thinking must be stripped for NVIDIA glm-5.2");
  assert.equal(body.reasoning, undefined, "reasoning must still be stripped for NVIDIA glm-5.2");
  assert.equal(body.max_tokens, 512, "other params must survive");
});

test("stripUnsupportedParams: nvidia + other model KEEPS thinking (regression guard)", () => {
  const body: Record<string, unknown> = { thinking: { type: "adaptive" } };
  stripUnsupportedParams("nvidia", "some-other-model", body);
  assert.deepEqual(
    body.thinking,
    { type: "adaptive" },
    "unrelated NVIDIA-hosted models must not be affected"
  );
});

test("stripUnsupportedParams: non-nvidia provider KEEPS thinking for minimax-m2.7", () => {
  const body: Record<string, unknown> = { thinking: { type: "adaptive" } };
  stripUnsupportedParams("minimax", "minimax-m2.7", body);
  assert.deepEqual(
    body.thinking,
    { type: "adaptive" },
    "direct MiniMax API still supports the native thinking field"
  );
});

test("stripUnsupportedParams: nvidia + minimax-m2.7 without thinking present is a no-op", () => {
  const body: Record<string, unknown> = { max_tokens: 100 };
  stripUnsupportedParams("nvidia", "minimaxai/minimax-m2.7", body);
  assert.equal(body.max_tokens, 100);
  assert.equal("thinking" in body, false);
});
