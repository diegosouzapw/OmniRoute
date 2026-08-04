import { test } from "node:test";
import assert from "node:assert/strict";
import { isFlatRateProvider } from "../../src/lib/usage/flatRateProviders.ts";
import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";

// $1/1M input, $2/1M output → 1M+1M tokens = $1 + $2 = $3 at the metered rate.
const PRICING = { input: 1, output: 2 };
const TOKENS = { input: 1_000_000, output: 1_000_000 };

test("isFlatRateProvider: cookie-web providers are flat-rate", () => {
  for (const id of ["chatgpt-web", "grok-web", "gemini-web", "claude-web", "kimi-web"]) {
    assert.equal(isFlatRateProvider(id), true, `${id} should be flat-rate`);
  }
});

test("isFlatRateProvider: dedicated subscription / coding-plan providers are flat-rate", () => {
  for (const id of [
    "minimax",
    "kimi-coding",
    "kimi-coding-apikey",
    "xiaomi-mimo",
    "bailian-coding-plan",
    "qwen-cloud-token-plan",
    "glm",
    "glm-cn",
  ]) {
    assert.equal(isFlatRateProvider(id), true, `${id} should be flat-rate`);
  }
});

test("isFlatRateProvider: case-insensitive + trimmed", () => {
  assert.equal(isFlatRateProvider("  CHATGPT-WEB "), true);
  assert.equal(isFlatRateProvider("MINIMAX"), true);
});

test("isFlatRateProvider: metered / cost-tracked providers are NOT flat-rate (no hidden cost)", () => {
  // codex/cx = OmniRoute actively tracks Codex token cost (Fast-tier multipliers,
  // GPT-5.x pricing) and Codex can be a metered account; byteplus = metered ModelArk;
  // minimax-cn = metered China API; glm-thinking = metered tier.
  for (const id of [
    "openai",
    "anthropic",
    "gemini",
    "codex",
    "cx",
    "byteplus",
    "minimax-cn",
    "glm-thinking",
    "qwen-cloud",
  ]) {
    assert.equal(isFlatRateProvider(id), false, `${id} should NOT be flat-rate`);
  }
});

test("isFlatRateProvider: empty / nullish is not flat-rate", () => {
  assert.equal(isFlatRateProvider(""), false);
  assert.equal(isFlatRateProvider("   "), false);
  assert.equal(isFlatRateProvider(null), false);
  assert.equal(isFlatRateProvider(undefined), false);
});

test("computeCostFromPricing: flat-rate provider with flatRateAsZero → $0", () => {
  assert.equal(
    computeCostFromPricing(PRICING, TOKENS, { provider: "chatgpt-web", flatRateAsZero: true }),
    0
  );
  assert.equal(
    computeCostFromPricing(PRICING, TOKENS, { provider: "minimax", flatRateAsZero: true }),
    0
  );
});

test("computeCostFromPricing: opt-in only — flat-rate provider WITHOUT the flag still estimates", () => {
  // Proves the guard never silently changes budget/routing/per-request paths.
  assert.equal(computeCostFromPricing(PRICING, TOKENS, { provider: "chatgpt-web" }), 3);
});

test("computeCostFromPricing: metered provider with the flag still estimates", () => {
  assert.equal(
    computeCostFromPricing(PRICING, TOKENS, { provider: "openai", flatRateAsZero: true }),
    3
  );
  // byteplus is metered despite being a subscription-ish gateway — must NOT be zeroed.
  assert.equal(
    computeCostFromPricing(PRICING, TOKENS, { provider: "byteplus", flatRateAsZero: true }),
    3
  );
});
