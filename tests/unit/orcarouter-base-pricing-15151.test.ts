import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-orca-pricing-15151-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
assert.equal(process.env.DATA_DIR, dataDir);
const { calculateCostDetailed } = await import("../../src/lib/usage/costCalculator.ts");
const pricingDb = await import("../../src/lib/db/settings/pricing.ts");
const { orcarouterProvider } =
  await import("../../open-sse/config/providers/registry/orcarouter/index.ts");

// Source: https://www.orcarouter.ai/models/<id> (USD, checked 2026-10-08).
// Charges below are base-rate estimates for 100k input + 10k output tokens;
// they do not assert GPT's >272k tier or DeepSeek's timed multipliers.
const baseCharges = [
  ["openai/gpt-5.5", 0.8, 0.575],
  ["anthropic/claude-opus-4.8", 0.75, 0.525],
  ["grok/grok-4.3", 0.15, 0.0975],
  ["deepseek/deepseek-v4-pro", 0.0858, 0.0539],
  ["minimax/minimax-m2.7", 0.042, 0.03],
  ["qwen/qwen3.7-max", 0.1625, 0.1125],
  ["google/gemini-3.6-flash", 0.1125, 0.07875],
] as const;

function near(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 1e-10, `expected ${expected}, got ${actual}`);
}

for (const [model, regular, cached] of baseCharges) {
  test(`${model} has a nonzero Orca base estimate, including its published cache-read rate`, async () => {
    const result = await calculateCostDetailed("orcarouter", model, {
      input: 100000,
      output: 10000,
    });
    assert.equal(result.priced, true);
    near(result.costUsd, regular);
    const withCache = await calculateCostDetailed("orcarouter", model, {
      input: 100000,
      cacheRead: 50000,
      output: 10000,
    });
    assert.equal(withCache.priced, true);
    near(withCache.costUsd, cached);
  });
}

test("all fixed Orca registry routes are covered without assigning a fixed price to auto", async () => {
  const pricedIds = new Set(baseCharges.map(([model]) => String(model)));
  for (const model of orcarouterProvider.models) {
    if (model.id !== "orcarouter/auto") assert.ok(pricedIds.has(model.id), model.id);
  }
  for (const model of ["orcarouter/auto", "auto", "unknown/unpublished-model"]) {
    assert.deepEqual(
      await calculateCostDetailed("orcarouter", model, { input: 100000, output: 10000 }),
      { costUsd: 0, priced: false }
    );
  }
});

test("published cache-write rates are used only for the providers that declare them", async () => {
  for (const [model, price] of [
    ["anthropic/claude-opus-4.8", 6.25],
    ["minimax/minimax-m2.7", 0.375],
    ["qwen/qwen3.7-max", 1.563],
  ] as const) {
    const result = await calculateCostDetailed("orcarouter", model, {
      input: 100000,
      cacheCreation: 100000,
    });
    assert.equal(result.priced, true);
    near(result.costUsd, price / 10);
  }
  const gemini = await pricingDb.getPricingForModel("orcarouter", "google/gemini-3.6-flash");
  assert.equal(gemini?.cache_creation, undefined, "do not publish an unverified Gemini write rate");
});

test("an operator pricing override still wins over the new Orca defaults", async () => {
  await pricingDb.updatePricing({ orcarouter: { "openai/gpt-5.5": { input: 2, output: 3 } } });
  const result = await calculateCostDetailed("orcarouter", "openai/gpt-5.5", {
    input: 100000,
    output: 10000,
  });
  assert.equal(result.priced, true);
  near(result.costUsd, 0.23);
});
