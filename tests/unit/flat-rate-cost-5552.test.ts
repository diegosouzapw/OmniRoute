import { test } from "node:test";
import assert from "node:assert/strict";
import { isFlatRateProvider } from "../../src/lib/usage/flatRateProviders.ts";
import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";

// $1/1M input, $2/1M output → 1M+1M tokens = $1 + $2 = $3 at the metered rate.
const PRICING = { input: 1, output: 2 };
const TOKENS = { input: 1_000_000, output: 1_000_000 };

test("isFlatRateProvider: cookie-web providers are flat-rate", () => {
  for (const id of ["grok-web", "gemini-web", "claude-web", "kimi-web"]) {
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
    "claude",
    "cc",
    "opencode-go",
  ]) {
    assert.equal(isFlatRateProvider(id), true, `${id} should be flat-rate`);
  }
});

test("isFlatRateProvider: case-insensitive + trimmed", () => {
  assert.equal(isFlatRateProvider("  GROK-WEB "), true);
  assert.equal(isFlatRateProvider("MINIMAX"), true);
});

test("isFlatRateProvider: clean-room ChatGPT Web is flat-rate but its legacy alias is retired", () => {
  assert.equal(isFlatRateProvider("chatgpt-web"), true);
  assert.equal(isFlatRateProvider("cgpt-web"), false);
});

test("isFlatRateProvider: metered / cost-tracked providers are NOT flat-rate (no hidden cost)", () => {
  // codex/cx = OmniRoute actively tracks Codex token cost (Fast-tier multipliers,
  // GPT-5.x pricing) and Codex can be a metered account; byteplus = metered ModelArk;
  // minimax-cn = metered China API; glm-thinking = metered tier; anthropic = the
  // metered Anthropic API, distinct from the `claude`/`cc` Claude Code plan.
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
    computeCostFromPricing(PRICING, TOKENS, { provider: "grok-web", flatRateAsZero: true }),
    0
  );
  assert.equal(
    computeCostFromPricing(PRICING, TOKENS, { provider: "minimax", flatRateAsZero: true }),
    0
  );
  // Claude Code is billed by the Pro/Max subscription, never per token.
  assert.equal(
    computeCostFromPricing(PRICING, TOKENS, { provider: "claude", flatRateAsZero: true }),
    0
  );
});

test("computeCostFromPricing: opt-in only — flat-rate provider WITHOUT the flag still estimates", () => {
  // Proves the guard never silently changes budget/routing/per-request paths.
  assert.equal(computeCostFromPricing(PRICING, TOKENS, { provider: "grok-web" }), 3);
});

test("#11149: opencode-go is a flat-rate subscription, not metered", () => {
  // opencode-go (https://opencode.ai/go) is a $10/month flat subscription that
  // resells GLM, Kimi, Grok, DeepSeek, MiniMax, Qwen and GPT-5.x. Because it is
  // an aggregator, every call was priced at the UNDERLYING model's metered rate,
  // so the overstatement is large rather than marginal (a reported ~$13.35 for a
  // month actually billed at $10 flat). It is api-key auth, so it is not covered
  // by the dynamic WEB_COOKIE_PROVIDERS branch and needs the explicit id.
  assert.equal(isFlatRateProvider("opencode-go"), true);
  assert.equal(
    computeCostFromPricing(PRICING, TOKENS, { provider: "opencode-go", flatRateAsZero: true }),
    0
  );
  // Still opt-in: without the flag the per-request estimate is unchanged.
  assert.equal(computeCostFromPricing(PRICING, TOKENS, { provider: "opencode-go" }), 3);
});

test("#11149: sibling opencode ids keep their own billing semantics", () => {
  // Only the Go subscription is flat-rate. The keyless `opencode` provider is a
  // different id and must not be swept in by a prefix-style match.
  assert.equal(isFlatRateProvider("opencode"), false);
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
  // The metered Anthropic API keeps its real cost — only the Claude Code plan is flat-rate.
  assert.equal(
    computeCostFromPricing(PRICING, TOKENS, { provider: "anthropic", flatRateAsZero: true }),
    3
  );
});
