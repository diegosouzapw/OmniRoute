import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { transformToOmniRoute } from "../../src/lib/pricingSync.ts";

// ─── transformToOmniRoute ────────────────────────────────

describe("transformToOmniRoute", () => {
  test("converts LiteLLM per-token pricing to OmniRoute per-million format", () => {
    const raw = {
      "openai/gpt-4o": {
        input_cost_per_token: 0.0000025,
        output_cost_per_token: 0.00001,
        litellm_provider: "openai",
        mode: "chat",
      },
    };

    const result = transformToOmniRoute(raw);

    assert.ok(result.openai, "Should have openai provider");
    assert.ok(result.openai["gpt-4o"], "Should have gpt-4o model");
    assert.strictEqual(result.openai["gpt-4o"].input, 2.5);
    assert.strictEqual(result.openai["gpt-4o"].output, 10);
  });

  test("maps anthropic provider to cc alias", () => {
    const raw = {
      "anthropic/claude-sonnet-4-20250514": {
        input_cost_per_token: 0.000003,
        output_cost_per_token: 0.000015,
        litellm_provider: "anthropic",
        mode: "chat",
      },
    };

    const result = transformToOmniRoute(raw);

    assert.ok(result.cc, "Should map to cc alias");
    assert.ok(result.cc["claude-sonnet-4-20250514"]);
    assert.strictEqual(result.cc["claude-sonnet-4-20250514"].input, 3);
    assert.strictEqual(result.cc["claude-sonnet-4-20250514"].output, 15);
  });

  test("maps vertex_ai provider to gemini and gemini-cli aliases", () => {
    const raw = {
      "vertex_ai/gemini-2.5-flash": {
        input_cost_per_token: 0.0000003,
        output_cost_per_token: 0.0000025,
        litellm_provider: "vertex_ai",
        mode: "chat",
      },
    };

    const result = transformToOmniRoute(raw);

    assert.ok(result.gemini, "Should map to gemini alias");
    assert.ok(result["gemini-cli"], "Should map to gemini-cli alias");
    assert.strictEqual(result.gemini["gemini-2.5-flash"].input, 0.3);
    assert.strictEqual(result["gemini-cli"]["gemini-2.5-flash"].input, 0.3);
  });

  test("skips non-chat models (embedding, image, audio)", () => {
    const raw = {
      "openai/text-embedding-3-small": {
        input_cost_per_token: 0.00000002,
        output_cost_per_token: 0,
        litellm_provider: "openai",
        mode: "embedding",
      },
      "openai/dall-e-3": {
        input_cost_per_token: 0,
        output_cost_per_token: 0,
        litellm_provider: "openai",
        mode: "image_generation",
      },
    };

    const result = transformToOmniRoute(raw);

    // openai key should not exist since all models were filtered
    const openaiModels = result.openai || {};
    assert.strictEqual(Object.keys(openaiModels).length, 0, "Should skip non-chat models");
  });

  test("includes cache pricing when available", () => {
    const raw = {
      "anthropic/claude-sonnet-4-20250514": {
        input_cost_per_token: 0.000003,
        output_cost_per_token: 0.000015,
        cache_read_input_token_cost: 0.0000003,
        cache_creation_input_token_cost: 0.00000375,
        litellm_provider: "anthropic",
        mode: "chat",
      },
    };

    const result = transformToOmniRoute(raw);

    const model = result.anthropic["claude-sonnet-4-20250514"];
    assert.ok(model, "Should have model");
    assert.strictEqual(model.cached, 0.3);
    assert.strictEqual(model.cache_creation, 3.75);
  });

  test("handles models without explicit mode (treated as chat)", () => {
    const raw = {
      "deepseek/deepseek-chat": {
        input_cost_per_token: 0.00000014,
        output_cost_per_token: 0.00000028,
        litellm_provider: "deepseek",
      },
    };

    const result = transformToOmniRoute(raw);

    // deepseek maps to "if" alias
    assert.ok(result.if, "Should map deepseek to if alias");
    assert.ok(result.if["deepseek-chat"]);
  });

  test("skips entries without input cost", () => {
    const raw = {
      "unknown/model": {
        litellm_provider: "unknown",
        mode: "chat",
      },
    };

    const result = transformToOmniRoute(raw);
    const unknownModels = result.unknown || {};
    assert.strictEqual(Object.keys(unknownModels).length, 0);
  });

  test("handles zero-cost (free) models", () => {
    const raw = {
      "groq/llama-3.3-70b-versatile": {
        input_cost_per_token: 0,
        output_cost_per_token: 0,
        litellm_provider: "groq",
        mode: "chat",
      },
    };

    const result = transformToOmniRoute(raw);

    assert.ok(result.groq, "Should have groq provider");
    assert.strictEqual(result.groq["llama-3.3-70b-versatile"].input, 0);
    assert.strictEqual(result.groq["llama-3.3-70b-versatile"].output, 0);
  });

  test("uses litellm_provider as-is for unmapped providers", () => {
    const raw = {
      "newprovider/some-model": {
        input_cost_per_token: 0.000001,
        output_cost_per_token: 0.000002,
        litellm_provider: "newprovider",
        mode: "chat",
      },
    };

    const result = transformToOmniRoute(raw);

    assert.ok(result.newprovider, "Should use litellm_provider as-is");
    assert.ok(result.newprovider["some-model"]);
  });

  test("strips provider prefix from model key", () => {
    const raw = {
      "openai/gpt-4o-mini": {
        input_cost_per_token: 0.00000015,
        output_cost_per_token: 0.0000006,
        litellm_provider: "openai",
        mode: "chat",
      },
    };

    const result = transformToOmniRoute(raw);

    assert.ok(result.openai["gpt-4o-mini"], "Should strip openai/ prefix");
    assert.strictEqual(result.openai["gpt-4o-mini"].input, 0.15);
  });

  test("rounds pricing to 3 decimal places", () => {
    const raw = {
      "test/model": {
        input_cost_per_token: 0.00000033333,
        output_cost_per_token: 0.00000066666,
        litellm_provider: "openai",
        mode: "chat",
      },
    };

    const result = transformToOmniRoute(raw);

    // 0.00000033333 * 1e6 = 0.33333 → rounded to 0.333
    assert.strictEqual(result.openai.model.input, 0.333);
    assert.strictEqual(result.openai.model.output, 0.667);
  });
});

// ─── Merge precedence ────────────────────────────────────

describe("pricing merge precedence", () => {
  test("user overrides > synced > defaults conceptual order", () => {
    // This test validates the conceptual model.
    // The actual merge is tested via integration with settings.ts.
    // Here we verify transform doesn't lose data needed for merge.
    const raw = {
      "openai/gpt-4o": {
        input_cost_per_token: 0.0000025,
        output_cost_per_token: 0.00001,
        litellm_provider: "openai",
        mode: "chat",
      },
    };

    const synced = transformToOmniRoute(raw);
    const userOverride = { openai: { "gpt-4o": { input: 999 } } };

    // Simulate merge: synced then user
    const merged = { ...synced.openai["gpt-4o"], ...userOverride.openai["gpt-4o"] };

    assert.strictEqual(merged.input, 999, "User override should win");
    assert.strictEqual(merged.output, 10, "Non-overridden fields from synced should remain");
  });
});
