import { describe, test } from "node:test";
import assert from "node:assert/strict";

import {
  buildComboSpecs,
  collectActiveProviderIds,
  collectComboModelsForProvider,
  collectFreeModels,
  generatePaxComboPlan,
} from "../../scripts/generate-pax-combos.mjs";

describe("generate pax combos", () => {
  test("collects only active unique providers", () => {
    const providers = collectActiveProviderIds([
      { provider: "openrouter", isActive: true },
      { provider: "openrouter", isActive: true },
      { provider: "anthropic", isActive: false },
      { provider: "gemini", isActive: true },
    ]);

    assert.deepEqual(providers, ["openrouter", "gemini"]);
  });

  test("dedupes built-in and custom models with provider alias prefix", () => {
    const models = collectComboModelsForProvider({
      providerId: "anthropic",
      builtInModels: [{ id: "claude-sonnet-4-6" }, { id: "claude-opus-4-6" }],
      customModels: [
        { id: "claude-opus-4-6" },
        { id: "claude-haiku-x" },
        { id: "anthropic/already-full" },
      ],
    });

    assert.deepEqual(models, [
      "anthropic/already-full",
      "anthropic/claude-haiku-x",
      "anthropic/claude-opus-4-6",
      "anthropic/claude-sonnet-4-6",
    ]);
  });

  test("builds per-provider combos and pax-all", () => {
    const { providerCombos, allCombo } = buildComboSpecs(
      [
        { provider: "anthropic", isActive: true },
        { provider: "openrouter", isActive: true },
        { provider: "gemini", isActive: false },
      ],
      {
        anthropic: [{ id: "claude-extra" }],
        openrouter: [{ id: "openai/gpt-4.1" }],
      }
    );

    assert.deepEqual(
      providerCombos.map((combo) => combo.name),
      ["pax-anthropic", "pax-openrouter"]
    );
    assert.ok(
      providerCombos
        .find((combo) => combo.name === "pax-anthropic")
        ?.models.includes("anthropic/claude-extra")
    );
    assert.ok(
      providerCombos
        .find((combo) => combo.name === "pax-openrouter")
        ?.models.includes("openrouter/openai/gpt-4.1")
    );
    assert.deepEqual(allCombo.name, "pax-all");
    assert.ok(allCombo.models.includes("anthropic/claude-extra"));
    assert.ok(allCombo.models.includes("openrouter/openai/gpt-4.1"));
  });

  test("collects only free-tagged models", () => {
    const models = collectFreeModels([
      "openrouter/deepseek/deepseek-r1:free",
      "openrouter/meta-llama/llama-3.3:free",
      "openrouter/meta-llama/llama-3.3:free",
      "anthropic/claude-sonnet-4-6",
    ]);

    assert.deepEqual(models, [
      "openrouter/deepseek/deepseek-r1:free",
      "openrouter/meta-llama/llama-3.3:free",
    ]);
  });

  test("builds execution plan including pax-all and pax-free", () => {
    const plan = generatePaxComboPlan(
      [
        { provider: "anthropic", isActive: true },
        { provider: "openrouter", isActive: true },
      ],
      {
        anthropic: [{ id: "claude-extra" }],
        openrouter: [{ id: "meta-llama/llama-3.3:free" }],
      }
    );

    assert.deepEqual(
      plan.map((entry) => entry.name),
      ["pax-anthropic", "pax-openrouter", "pax-all", "pax-free"]
    );
    assert.ok(plan[2].models.includes("openrouter/meta-llama/llama-3.3:free"));
    assert.deepEqual(plan[3].models, ["openrouter/meta-llama/llama-3.3:free"]);
  });
});
