import test from "node:test";
import assert from "node:assert/strict";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.ts";
import { extractUsage } from "../../open-sse/utils/usageTracking.ts";
import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";

test("reasoning tokens are not billed twice when reasoning matches the output price", () => {
  const cost = computeCostFromPricing(
    { input: 1, output: 10, reasoning: 10 },
    { prompt_tokens: 0, completion_tokens: 1_000, reasoning_tokens: 500 }
  );

  assert.equal(cost, 0.01);
});

test("reasoning tokens add only the declared premium above the output price", () => {
  const cost = computeCostFromPricing(
    { input: 1, output: 10, reasoning: 22 },
    { prompt_tokens: 0, completion_tokens: 1_000, reasoning_tokens: 500 }
  );

  assert.equal(cost, 0.016);
});

test("reasoning tokens add no cost when the model declares no reasoning price", () => {
  const cost = computeCostFromPricing(
    { input: 1, output: 10 },
    { prompt_tokens: 0, completion_tokens: 1_000, reasoning_tokens: 500 }
  );

  assert.equal(cost, 0.01);
});

test("streaming Gemini usage includes thoughts in completion tokens", () => {
  const usage = extractUsage({
    usageMetadata: {
      promptTokenCount: 100,
      candidatesTokenCount: 40,
      thoughtsTokenCount: 10,
      totalTokenCount: 150,
    },
  });

  assert.equal(usage.completion_tokens, 50);
  assert.equal(usage.reasoning_tokens, 10);
});

test("non-streaming Gemini usage includes thoughts in completion tokens", () => {
  const usage = extractUsageFromResponse(
    {
      usageMetadata: {
        promptTokenCount: 100,
        candidatesTokenCount: 40,
        thoughtsTokenCount: 10,
      },
    },
    "gemini"
  );

  assert.equal(usage.completion_tokens, 50);
  assert.equal(usage.reasoning_tokens, 10);
});

test("Gemini usage normalization preserves candidate and thought pricing", () => {
  const usage = extractUsage({
    usageMetadata: {
      promptTokenCount: 100,
      candidatesTokenCount: 40,
      thoughtsTokenCount: 10,
      totalTokenCount: 150,
    },
  });

  const cost = computeCostFromPricing({ input: 1, output: 4, reasoning: 10 }, usage);

  const expected = (100 * 1 + 40 * 4 + 10 * 10) / 1_000_000;
  assert.ok(Math.abs(cost - expected) < 1e-12);
});
