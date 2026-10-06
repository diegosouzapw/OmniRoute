import { test } from "node:test";
import assert from "node:assert/strict";

import { estimateChatTokenCost, estimateStringTokens } from "../../src/lib/quota/tokenEstimator";

test("estimateStringTokens: chars/4 heuristic", () => {
  assert.equal(estimateStringTokens(""), 0);
  assert.equal(estimateStringTokens("abcd"), 1);
  assert.equal(estimateStringTokens("abcdefgh"), 2);
});

test("estimateChatTokenCost: sums message content strings", () => {
  const cost = estimateChatTokenCost({
    messages: [
      { role: "user", content: "Hello world, this is a test message" },
      { role: "assistant", content: "A shorter reply" },
    ],
  });
  assert.ok(cost.inputTokens > 0);
  // total = input × 1.1 (over-provision) + output budget
  assert.equal(cost.totalTokens, Math.ceil(cost.inputTokens * 1.1) + cost.outputTokens);
});

test("estimateChatTokenCost: includes system prompt", () => {
  const withoutSystem = estimateChatTokenCost({
    messages: [{ role: "user", content: "hi there" }],
  });
  const withSystem = estimateChatTokenCost({
    system: "You are a helpful assistant with a fairly long system prompt to count",
    messages: [{ role: "user", content: "hi there" }],
  });
  assert.ok(withSystem.inputTokens > withoutSystem.inputTokens);
});

test("estimateChatTokenCost: honors max_tokens as output budget", () => {
  const cost = estimateChatTokenCost({
    messages: [{ role: "user", content: "hi" }],
    max_tokens: 2000,
  });
  assert.equal(cost.outputTokens, 2000);
});

test("estimateChatTokenCost: honors max_completion_tokens (Responses API)", () => {
  const cost = estimateChatTokenCost({
    messages: [{ role: "user", content: "hi" }],
    max_completion_tokens: 500,
  });
  assert.equal(cost.outputTokens, 500);
});

test("estimateChatTokenCost: defaults output allowance when unset", () => {
  const cost = estimateChatTokenCost({ messages: [{ role: "user", content: "hi" }] });
  assert.equal(cost.outputTokens, 1024);
});

test("estimateChatTokenCost: handles multimodal content arrays", () => {
  const cost = estimateChatTokenCost({
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe this image" },
          { type: "image_url", image_url: { url: "data:image/png;base64,xxx" } },
        ],
      },
    ],
  });
  assert.ok(cost.inputTokens > 0);
});

test("estimateChatTokenCost: handles Responses API input array", () => {
  const cost = estimateChatTokenCost({
    input: [{ role: "user", text: "What is the capital of France" }],
  });
  assert.ok(cost.inputTokens > 0);
});

test("estimateChatTokenCost: never throws on malformed bodies", () => {
  for (const bad of [null, undefined, {}, { messages: "nope" }, { messages: [null, 42] }]) {
    const cost = estimateChatTokenCost(bad as Record<string, unknown>);
    assert.ok(cost.totalTokens >= 0);
  }
});
