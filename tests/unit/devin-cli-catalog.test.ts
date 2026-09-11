import assert from "node:assert/strict";
import test from "node:test";

import { devin_cliProvider } from "../../open-sse/config/providers/registry/devin-cli/index.ts";
import { devin_cli_agenticProvider } from "../../open-sse/config/providers/registry/devin-cli-agentic/index.ts";
import { devin_desktopProvider } from "../../open-sse/config/providers/registry/devin-desktop/index.ts";
import { DEVIN_MODEL_CATALOG } from "../../open-sse/config/providers/registry/devin/catalog.ts";
import { DEVIN_MODEL_PRICING } from "../../src/shared/constants/pricing/devin.ts";
import { DEFAULT_PRICING, getPricingForModel } from "../../src/shared/constants/pricing.ts";

const catalogIds = DEVIN_MODEL_CATALOG.map((model) => model.id);

test("Devin transports expose the same curated catalog without duplicate ids", () => {
  assert.equal(devin_cliProvider.models, DEVIN_MODEL_CATALOG);
  assert.equal(devin_desktopProvider.models, DEVIN_MODEL_CATALOG);
  assert.deepEqual(
    devin_cli_agenticProvider.models.map((model) => model.id),
    catalogIds
  );
  assert.equal(catalogIds.length, 110);
  assert.equal(new Set(catalogIds).size, catalogIds.length);
  assert.ok(catalogIds.every((id) => !id.toLowerCase().includes("byok")));
});

test("Devin catalog contains only the operator-selected model families", () => {
  const required = [
    "claude-fable-5-1-max",
    "claude-opus-5-max-fast",
    "claude-opus-4-8-max-fast",
    "claude-sonnet-5-max",
    "claude-sonnet-4-6-thinking-1m",
    "MODEL_PRIVATE_11",
    "gpt-5-6-sol-max-priority",
    "gpt-5-6-terra-max-priority",
    "gpt-5-6-luna-max-priority",
    "kimi-k3-max",
    "kimi-k2-7",
    "glm-5-3-max",
    "glm-5-3-flash-max",
    "swe-1-7",
    "swe-1-7-lightning",
    "adaptive",
    "grok-4-6-xhigh",
    "inkling-max",
    "deepseek-v4-flash-max",
    "nemotron-3-ultra-high",
    "gemini-3-7-flash-high",
    "gemini-3-1-pro-high",
    "deepseek-v4-pro-max",
  ];

  for (const id of required) {
    assert.ok(catalogIds.includes(id), `expected selected Devin model id: ${id}`);
  }

  for (const id of [
    "claude-5-fable-max",
    "claude-opus-4-7-max",
    "gpt-5-5-high",
    "gemini-3-6-flash-high",
    "grok-4-5-high",
    "deepseek-v4",
    "nemotron-3-ultra-nvfp4",
    "swe-1-6-fast",
  ]) {
    assert.equal(catalogIds.includes(id), false, `unselected Devin model must stay absent: ${id}`);
  }
});

test("Devin catalog keeps higher-quality choices first", () => {
  assert.deepEqual(catalogIds.slice(0, 5), [
    "claude-fable-5-1-max",
    "claude-fable-5-1-xhigh",
    "claude-fable-5-1-high",
    "claude-fable-5-1-medium",
    "claude-fable-5-1-low",
  ]);
  assert.deepEqual(catalogIds.slice(5, 9), [
    "claude-opus-5-max-fast",
    "claude-opus-5-max",
    "claude-opus-5-xhigh-fast",
    "claude-opus-5-xhigh",
  ]);
});

test("every curated Devin model has an exact live provider price", () => {
  assert.deepEqual(new Set(Object.keys(DEVIN_MODEL_PRICING)), new Set(catalogIds));

  for (const provider of ["devin-cli", "dv", "devin-desktop", "devin-cli-agentic", "dva"]) {
    for (const id of catalogIds) {
      assert.ok(getPricingForModel(provider, id), `missing ${provider}/${id} pricing`);
    }
  }
});

test("Devin pricing remains provider-bound and preserves fast-tier rates", () => {
  assert.notEqual(DEFAULT_PRICING["devin-cli"], DEFAULT_PRICING.anthropic);
  assert.deepEqual(getPricingForModel("devin-cli", "claude-sonnet-5-max"), {
    input: 2,
    cached: 0.2,
    output: 10,
  });
  assert.deepEqual(getPricingForModel("anthropic", "claude-sonnet-5"), {
    input: 3,
    output: 15,
    cached: 1.5,
    reasoning: 22.5,
    cache_creation: 3,
  });
  assert.deepEqual(getPricingForModel("devin-cli", "gpt-5-6-sol-max-priority"), {
    input: 8,
    cached: 0.8,
    output: 40,
  });
});

test("Devin catalog carries the live output limits for representative models", () => {
  const models = new Map(DEVIN_MODEL_CATALOG.map((entry) => [entry.id, entry]));

  assert.equal(models.get("claude-fable-5-1-max")?.maxOutputTokens, 128_000);
  assert.equal(models.get("MODEL_PRIVATE_11")?.maxOutputTokens, 64_000);
  assert.equal(models.get("kimi-k2-7")?.maxOutputTokens, 16_000);
  assert.equal(models.get("grok-4-6-xhigh")?.maxOutputTokens, 100_000);
  assert.equal(models.get("gemini-3-7-flash-high")?.maxOutputTokens, 65_535);
});
