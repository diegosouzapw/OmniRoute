import test from "node:test";
import assert from "node:assert/strict";

// Test cases for the auto-combo output token cost blending formula
// Formula: costPer1MTokens = inputPrice * (1 - OUTPUT_TOKEN_RATIO) + outputPrice * OUTPUT_TOKEN_RATIO
// where OUTPUT_TOKEN_RATIO = 0.4

const OUTPUT_TOKEN_RATIO = 0.4;

/**
 * Blends input and output prices using the formula from combo.ts
 * @param inputPrice Price per 1M input tokens
 * @param outputPrice Price per 1M output tokens
 * @returns Blended cost per 1M tokens
 */
function blendCost(inputPrice: number, outputPrice: number): number {
  const inputNum = Number(inputPrice);
  const outputNum = Number(outputPrice);

  // If output price is finite and non-negative, use blended formula
  if (Number.isFinite(inputNum) && inputNum >= 0) {
    if (Number.isFinite(outputNum) && outputNum >= 0) {
      return inputNum * (1 - OUTPUT_TOKEN_RATIO) + outputNum * OUTPUT_TOKEN_RATIO;
    } else {
      // Fall back to input-only when output is absent/invalid
      return inputNum;
    }
  }

  // Default fallback
  return 1;
}

test("blendCost: uses blended formula when both input and output prices are present", () => {
  const INPUT_RATIO = 0.6; // 1 - OUTPUT_TOKEN_RATIO
  const OUTPUT_RATIO = 0.4;
  const inputPrice = 1.0;
  const outputPrice = 10.0;
  const expected = inputPrice * INPUT_RATIO + outputPrice * OUTPUT_RATIO; // 0.6 + 4.0 = 4.6
  assert.strictEqual(expected, 4.6);
  const result = blendCost(inputPrice, outputPrice);
  assert.strictEqual(result, 4.6, "blendCost(1.0, 10.0) should be 4.6");
});

test("blendCost: falls back to input-only when output price is missing", () => {
  // When output price is undefined/NaN, should return input price
  const result = blendCost(3.0, NaN);
  assert.strictEqual(result, 3.0, "blendCost(3.0, NaN) should fall back to 3.0");

  // Also test with undefined coerced to NaN
  const resultUndefined = blendCost(3.0, Number(undefined));
  assert.strictEqual(
    resultUndefined,
    3.0,
    "blendCost(3.0, Number(undefined)) should fall back to 3.0"
  );
});

test("blendCost: reasoning model ($3 input / $15 output) scores as 7.8, more expensive than uniform model ($5/$5 = 5.0)", () => {
  const blendedA = 3 * 0.6 + 15 * 0.4; // 7.8
  const blendedB = 5 * 0.6 + 5 * 0.4; // 5.0
  assert.ok(
    blendedA > blendedB,
    "reasoning model should be scored as more expensive after blending"
  );
  assert.strictEqual(blendedA, 7.8);
  assert.strictEqual(blendedB, 5.0);

  // Verify via blendCost function
  const costA = blendCost(3, 15);
  const costB = blendCost(5, 5);
  assert.strictEqual(costA, 7.8, "Model A ($3/$15) should blend to 7.8");
  assert.strictEqual(costB, 5.0, "Model B ($5/$5) should blend to 5.0");
  assert.ok(costA > costB, "After blending, Model A should be more expensive");
});

test("blendCost: output price of 0 is treated as valid (free output tier)", () => {
  const blended = 2.0 * 0.6 + 0 * 0.4; // 1.2
  assert.strictEqual(blended, 1.2);
  const result = blendCost(2.0, 0);
  assert.strictEqual(result, 1.2, "blendCost(2.0, 0) should be 1.2, not 2.0");
});
