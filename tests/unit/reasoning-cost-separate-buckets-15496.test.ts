import test from "node:test";
import assert from "node:assert/strict";
import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";

test("#15496 separate reasoning bucket (reasoning > completion) is priced, not negative/zero", () => {
  const cost = computeCostFromPricing(
    { input: 0.75, output: 3.75, reasoning: 0 },
    { prompt_tokens: 100, completion_tokens: 4, reasoning_tokens: 40 }
  );
  assert.ok(Math.abs(cost - 0.00009) < 1e-12, `got ${cost}`);
});

test("#15496 cost is never negative for a priced completion", () => {
  const cost = computeCostFromPricing(
    { input: 0.75, output: 3.75, reasoning: 0 },
    { prompt_tokens: 100, completion_tokens: 4, reasoning_tokens: 40 }
  );
  assert.ok(cost >= 0, `negative cost ${cost}`);
});

test("#15496 inclusive shape still priced correctly (regression guard)", () => {
  const cost = computeCostFromPricing(
    { input: 1, output: 10, reasoning: 22 },
    { prompt_tokens: 0, completion_tokens: 1_000, reasoning_tokens: 500 }
  );
  assert.equal(cost, 0.016);
});
