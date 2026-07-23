import test from "node:test";
import assert from "node:assert/strict";
import { lookupPricing, estimateCost } from "../../src/mitm/inspector/pricing.ts";

test("lookupPricing - exact key gpt-4o", () => {
  const p = lookupPricing("gpt-4o");
  assert.ok(p);
  assert.equal(p.inputPerMTok, 2.50);
  assert.equal(p.outputPerMTok, 10.00);
});

test("lookupPricing - versioned claude id matches prefix", () => {
  const p = lookupPricing("claude-3-5-sonnet-20240620");
  assert.ok(p);
  assert.equal(p.inputPerMTok, 3.00);
  assert.equal(p.outputPerMTok, 15.00);
});

test("lookupPricing - unknown model returns null", () => {
  assert.equal(lookupPricing("unknown-model-xyz"), null);
});

test("lookupPricing - null model returns null", () => {
  assert.equal(lookupPricing(null), null);
});

test("lookupPricing - gpt-4o-mini matches before gpt-4o (ordering)", () => {
  const p = lookupPricing("gpt-4o-mini");
  assert.ok(p);
  assert.equal(p.inputPerMTok, 0.15);
});

test("estimateCost - gpt-4o with 1M input + 100k output = 3.50", () => {
  const cost = estimateCost("gpt-4o", 1_000_000, 100_000);
  assert.ok(cost !== null);
  // 1M * 2.50/1M + 100k * 10.00/1M = 2.50 + 1.00 = 3.50
  assert.equal(cost, 3.50);
});

test("estimateCost - null model returns null", () => {
  assert.equal(estimateCost(null, 100, 100), null);
});

test("estimateCost - both token counts null returns null", () => {
  assert.equal(estimateCost("gpt-4o", null, null), null);
});

test("estimateCost - zero tokens returns 0", () => {
  const cost = estimateCost("gpt-4o", 0, 0);
  assert.ok(cost !== null);
  assert.equal(cost, 0);
});

test("estimateCost - only tokensIn provided (tokensOut null)", () => {
  // 1000 input tokens at gpt-4o-mini $0.15/1M => 0.00015
  const cost = estimateCost("gpt-4o-mini", 1000, null);
  assert.ok(cost !== null);
  assert.equal(cost, 0.00015);
});

test("estimateCost - unknown model returns null even with tokens", () => {
  assert.equal(estimateCost("llama-99-unknown", 5000, 2000), null);
});
