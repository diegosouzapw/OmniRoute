/**
 * tests/unit/observability/costCalculator.test.ts
 *
 * Static pricing table + cost-USD calculator. Covers:
 *   - GPT-4o input/output split
 *   - Claude Sonnet 4 / Gemini Pro 1.5
 *   - Unknown model → FALLBACK_RATE_PER_1K
 *   - Zero tokens → 0 cost
 *   - Large token count math (100k / 50k)
 *   - Negative / non-finite token rejection
 *   - Currency conversion (USD canonical, EUR → USD)
 */

import test from "node:test";
import assert from "node:assert/strict";

const {
  calculateCostUsd,
  lookupPricing,
  convertCurrency,
  EXCHANGE_RATES,
  MODEL_PRICING,
  FALLBACK_RATE_PER_1K,
  CostCalculationError,
} = await import("../../../src/lib/observability/costCalculator.ts");

test("GPT-4o input + output cost matches the pricing table", () => {
  const cost = calculateCostUsd({ provider: "openai", model: "gpt-4o", inputTokens: 1000, outputTokens: 500 });
  // 1000 * 0.0025/1k = 0.0025; 500 * 0.01/1k = 0.005; total = 0.0075
  assert.equal(cost, 0.0075);
});

test("Claude Sonnet 4 cost uses the canonical Anthropic row", () => {
  const cost = calculateCostUsd({
    provider: "anthropic",
    model: "claude-sonnet-4",
    inputTokens: 2000,
    outputTokens: 1000,
  });
  // 2000 * 0.003/1k = 0.006; 1000 * 0.015/1k = 0.015; total = 0.021
  assert.equal(cost, 0.021);
});

test("Gemini Pro 1.5 cost uses the Google row", () => {
  const cost = calculateCostUsd({
    provider: "google",
    model: "gemini-1.5-pro",
    inputTokens: 4000,
    outputTokens: 2000,
  });
  // 4000 * 0.00125/1k = 0.005; 2000 * 0.005/1k = 0.01; total = 0.015
  assert.equal(cost, 0.015);
});

test("Unknown model falls back to FALLBACK_RATE_PER_1K (both directions)", () => {
  const cost = calculateCostUsd({
    provider: "openai",
    model: "gpt-99-ultra-mythical",
    inputTokens: 1000,
    outputTokens: 1000,
  });
  // 1000 * 0.01/1k + 1000 * 0.01/1k = 0.02
  assert.equal(cost, 0.02);
});

test("Zero tokens returns 0 cost", () => {
  const cost = calculateCostUsd({ provider: "openai", model: "gpt-4o", inputTokens: 0, outputTokens: 0 });
  assert.equal(cost, 0);
});

test("Large token count math (100k input + 50k output on GPT-4o)", () => {
  const cost = calculateCostUsd({ provider: "openai", model: "gpt-4o", inputTokens: 100_000, outputTokens: 50_000 });
  // 100k * 0.0025 = 0.25; 50k * 0.01 = 0.5; total = 0.75
  assert.equal(cost, 0.75);
});

test("Negative inputTokens throws CostCalculationError", () => {
  assert.throws(
    () => calculateCostUsd({ provider: "openai", model: "gpt-4o", inputTokens: -10, outputTokens: 10 }),
    CostCalculationError
  );
});

test("Negative outputTokens throws CostCalculationError", () => {
  assert.throws(
    () => calculateCostUsd({ provider: "openai", model: "gpt-4o", inputTokens: 10, outputTokens: -5 }),
    CostCalculationError
  );
});

test("Non-finite tokens throw", () => {
  assert.throws(
    () => calculateCostUsd({ provider: "openai", model: "gpt-4o", inputTokens: Infinity, outputTokens: 0 }),
    CostCalculationError
  );
  assert.throws(
    () => calculateCostUsd({ provider: "openai", model: "gpt-4o", inputTokens: 0, outputTokens: NaN }),
    CostCalculationError
  );
});

test("Empty provider or model throws", () => {
  assert.throws(
    () => calculateCostUsd({ provider: "", model: "gpt-4o", inputTokens: 0, outputTokens: 0 }),
    CostCalculationError
  );
  assert.throws(
    () => calculateCostUsd({ provider: "openai", model: "", inputTokens: 0, outputTokens: 0 }),
    CostCalculationError
  );
});

test("convertCurrency: USD canonical (no conversion)", () => {
  assert.equal(convertCurrency(1.0, "USD"), 1.0);
});

test("convertCurrency: EUR → USD uses EXCHANGE_RATES", () => {
  // EUR rate is 0.92 (1 USD = 0.92 EUR → 1 EUR ≈ 1.087 USD).
  const expected = 1 / EXCHANGE_RATES.EUR;
  assert.equal(convertCurrency(1.0, "EUR"), expected);
});

test("convertCurrency: unknown currency returns undefined", () => {
  assert.equal(convertCurrency(1.0, "XYZ"), undefined);
});

test("lookupPricing returns the canonical row for known models", () => {
  const row = lookupPricing("openai", "gpt-4o");
  assert.equal(row.inputPer1kTokens, 0.0025);
  assert.equal(row.outputPer1kTokens, 0.01);
});

test("lookupPricing returns the fallback row for unknown (provider, model)", () => {
  const row = lookupPricing("unknown", "mystery");
  assert.equal(row.inputPer1kTokens, FALLBACK_RATE_PER_1K);
  assert.equal(row.outputPer1kTokens, FALLBACK_RATE_PER_1K);
});

test("MODEL_PRICING table contains at least one row per provider family", () => {
  const providers = new Set(MODEL_PRICING.map((r) => r.provider));
  assert.ok(providers.has("openai"));
  assert.ok(providers.has("anthropic"));
  assert.ok(providers.has("google"));
});