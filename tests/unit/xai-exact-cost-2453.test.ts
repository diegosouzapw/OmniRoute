/**
 * xAI exact provider-reported cost passthrough (port of decolua/9router#2453,
 * capability A — @ryanngit).
 *
 * xAI's chat-completions `usage` object reports the exact billed cost of a
 * request via `cost_in_usd_ticks`. Per the official docs
 * (https://docs.x.ai/developers/cost-tracking and the API reference's usage
 * schema): "TICKS_IN_USD_CENT: i64 = 100_000_000" ⇒ 10_000_000_000 (1e10)
 * ticks per USD. Example given in the docs: 37756000 ticks ≈ $0.0038.
 *
 * NOTE: the upstream PR used a /1e12 divisor (100x under-report) — this port
 * uses the doc-verified /1e10 divisor instead.
 *
 * OmniRoute previously always estimated cost from token counts × static
 * pricing, discarding this exact figure. This test proves calculateCost()/
 * computeCostFromPricing() now trust the exact figure when present, and
 * still fall back to the token-based estimate when it is absent (control).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { calculateCost, computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.ts";
import { extractUsage, normalizeUsage } from "../../open-sse/utils/usageTracking.ts";

// $1/1M input, $2/1M output → 1M+1M tokens would estimate to $3 at the
// metered rate. Chosen so the exact-cost value (~$0.0038) is unmistakably
// NOT the token-based estimate — proves the early return actually fires.
const PRICING = { input: 1, output: 2 };
const TOKENS_1M_EACH = { input: 1_000_000, output: 1_000_000 };

// Doc example: 37756000 ticks ≈ $0.0038 (docs.x.ai/developers/cost-tracking).
const DOC_EXAMPLE_TICKS = 37_756_000;
const DOC_EXAMPLE_USD = 0.0037756; // 37756000 / 1e10, exact

test("computeCostFromPricing: xAI exact cost_in_usd_ticks overrides the token-based estimate", () => {
  const cost = computeCostFromPricing(PRICING, {
    ...TOKENS_1M_EACH,
    cost_in_usd_ticks: DOC_EXAMPLE_TICKS,
  });
  assert.ok(
    Math.abs(cost - DOC_EXAMPLE_USD) < 1e-9,
    `expected ${DOC_EXAMPLE_USD}, got ${cost}`
  );
  assert.notEqual(cost, 3, "must not fall back to the $3 token-based estimate");
});

test("computeCostFromPricing: xAI exact cost works even with no pricing record at all", () => {
  const cost = computeCostFromPricing(null, {
    ...TOKENS_1M_EACH,
    cost_in_usd_ticks: DOC_EXAMPLE_TICKS,
  });
  assert.ok(Math.abs(cost - DOC_EXAMPLE_USD) < 1e-9);
});

test("computeCostFromPricing CONTROL: no cost_in_usd_ticks still falls back to the token-based estimate", () => {
  assert.equal(computeCostFromPricing(PRICING, TOKENS_1M_EACH), 3);
});

test("calculateCost: xAI exact cost_in_usd_ticks overrides whatever the token-based estimate would be", async () => {
  // Baseline: the token-based estimate calculateCost would otherwise compute
  // for this provider/model/token-count (whatever xai/grok-4.3's local
  // pricing table says — not hardcoded here, so this test doesn't break if
  // pricing data changes).
  const baseline = await calculateCost("xai", "grok-4.3", { input: 500, output: 500 });

  const cost = await calculateCost("xai", "grok-4.3", {
    input: 500,
    output: 500,
    cost_in_usd_ticks: DOC_EXAMPLE_TICKS,
  });

  assert.ok(Math.abs(cost - DOC_EXAMPLE_USD) < 1e-9, `expected ${DOC_EXAMPLE_USD}, got ${cost}`);
  assert.notEqual(cost, baseline, "exact cost must override the token-based estimate");
});

test("calculateCost CONTROL: no cost_in_usd_ticks still falls back to the token-based estimate (unchanged)", async () => {
  const before = await calculateCost("xai", "grok-4.3", { input: 500, output: 500 });
  const after = await calculateCost("xai", "grok-4.3", { input: 500, output: 500 });
  assert.equal(after, before, "identical calls without the exact field must stay deterministic");
  assert.notEqual(after, DOC_EXAMPLE_USD, "must not coincidentally match the exact-cost value");
});

test("normalizeUsage: passes through a finite cost_in_usd_ticks", () => {
  const normalized = normalizeUsage({ prompt_tokens: 10, cost_in_usd_ticks: DOC_EXAMPLE_TICKS });
  assert.equal(normalized.cost_in_usd_ticks, DOC_EXAMPLE_TICKS);
});

test("normalizeUsage: drops a non-finite cost_in_usd_ticks", () => {
  const normalized = normalizeUsage({ prompt_tokens: 10, cost_in_usd_ticks: "not-a-number" });
  assert.equal(normalized.cost_in_usd_ticks, undefined);
});

test("extractUsageFromResponse: xAI OpenAI-shaped usage carries cost_in_usd_ticks through", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        prompt_tokens: 12,
        completion_tokens: 8,
        cost_in_usd_ticks: DOC_EXAMPLE_TICKS,
      },
    },
    "xai"
  );
  assert.equal(usage.cost_in_usd_ticks, DOC_EXAMPLE_TICKS);
});

test("extractUsageFromResponse CONTROL: non-xAI OpenAI usage without the field stays unchanged (no stray key)", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        prompt_tokens: 12,
        completion_tokens: 8,
        prompt_tokens_details: { cached_tokens: 3 },
        completion_tokens_details: { reasoning_tokens: 2 },
      },
    },
    "openai"
  );
  assert.deepEqual(usage, {
    prompt_tokens: 12,
    completion_tokens: 8,
    cached_tokens: 3,
    reasoning_tokens: 2,
  });
  assert.ok(!("cost_in_usd_ticks" in usage), "must not add a stray undefined key");
});

test("extractUsage (streaming): xAI OpenAI-format chunk carries cost_in_usd_ticks through", () => {
  const usage = extractUsage({
    usage: {
      prompt_tokens: 12,
      completion_tokens: 8,
      cost_in_usd_ticks: DOC_EXAMPLE_TICKS,
    },
  });
  assert.equal(usage.cost_in_usd_ticks, DOC_EXAMPLE_TICKS);
});
