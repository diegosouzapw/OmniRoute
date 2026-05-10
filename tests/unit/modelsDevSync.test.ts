/**
 * Unit tests for modelsDevSync.ts
 *
 * Tests: fetch, transform (pricing + capabilities), provider mapping,
 * DB save/retrieve, and resolution order.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import {
  transformModelsDevToPricing,
  transformModelsDevToCapabilities,
  mapProviderId,
  fetchModelsDev,
} from "../../src/lib/modelsDevSync.ts";

// ─── Mock data ───────────────────────────────────────────

const MOCK_MODELS_DEV_DATA = {
  openai: {
    id: "openai",
    name: "OpenAI",
    npm: "@ai-sdk/openai",
    env: ["OPENAI_API_KEY"],
    doc: "https://platform.openai.com/docs/models",
    models: {
      "gpt-4o": {
        id: "gpt-4o",
        name: "GPT-4o",
        family: "gpt-4",
        attachment: true,
        reasoning: false,
        tool_call: true,
        structured_output: true,
        temperature: true,
        knowledge: "2024-10",
        release_date: "2024-05-13",
        last_updated: "2024-10-01",
        open_weights: false,
        cost: {
          input: 2.5,
          output: 10.0,
          cache_read: 1.25,
          cache_write: 2.5,
        },
        limit: {
          context: 128000,
          input: 128000,
          output: 16384,
        },
        modalities: {
          input: ["text", "image"],
          output: ["text"],
        },
      },
      "o3-mini": {
        id: "o3-mini",
        name: "o3-mini",
        family: "o3",
        attachment: false,
        reasoning: true,
        tool_call: true,
        structured_output: true,
        temperature: false,
        release_date: "2025-01-31",
        last_updated: "2025-01-31",
        open_weights: false,
        cost: {
          input: 1.1,
          output: 4.4,
          reasoning: 4.4,
        },
        limit: {
          context: 200000,
          output: 100000,
        },
        modalities: {
          input: ["text"],
          output: ["text"],
        },
      },
    },
  },
  anthropic: {
    id: "anthropic",
    name: "Anthropic",
    npm: "@ai-sdk/anthropic",
    env: ["ANTHROPIC_API_KEY"],
    doc: "https://docs.anthropic.com/en/docs/about-claud/models",
    models: {
      "claude-sonnet-4-20250514": {
        id: "claude-sonnet-4-20250514",
        name: "Claude Sonnet 4",
        family: "claude-4",
        attachment: true,
        reasoning: false,
        tool_call: true,
        structured_output: true,
        temperature: true,
        release_date: "2025-05-14",
        last_updated: "2025-05-14",
        open_weights: false,
        cost: {
          input: 3.0,
          output: 15.0,
          cache_read: 0.3,
          cache_write: 3.75,
        },
        limit: {
          context: 200000,
          output: 64000,
        },
        modalities: {
          input: ["text", "image"],
          output: ["text"],
        },
      },
    },
  },
  deepseek: {
    id: "deepseek",
    name: "DeepSeek",
    npm: "@ai-sdk/openai-compatible",
    api: "https://api.deepseek.com/v1",
    env: ["DEEPSEEK_API_KEY"],
    doc: "https://api-docs.deepseek.com/",
    models: {
      "deepseek-chat": {
        id: "deepseek-chat",
        name: "DeepSeek V3",
        family: "deepseek-v3",
        attachment: false,
        reasoning: false,
        tool_call: true,
        temperature: true,
        release_date: "2024-12-26",
        last_updated: "2025-01-20",
        open_weights: true,
        cost: {
          input: 0.27,
          output: 1.1,
          cache_read: 0.07,
        },
        limit: {
          context: 64000,
          output: 8192,
        },
        modalities: {
          input: ["text"],
          output: ["text"],
        },
      },
    },
  },
  "unknown-provider": {
    id: "unknown-provider",
    name: "Unknown",
    npm: "@ai-sdk/openai-compatible",
    api: "https://api.unknown.com/v1",
    env: ["UNKNOWN_API_KEY"],
    models: {
      "some-model": {
        id: "some-model",
        name: "Some Model",
        attachment: false,
        reasoning: false,
        tool_call: false,
        release_date: "2025-01-01",
        last_updated: "2025-01-01",
        open_weights: false,
        cost: {
          input: 1.0,
          output: 2.0,
        },
        limit: {
          context: 32000,
          output: 4096,
        },
        modalities: {
          input: ["text"],
          output: ["text"],
        },
      },
    },
  },
};

// ─── Tests ───────────────────────────────────────────────

describe("modelsDevSync — transformModelsDevToPricing", () => {
  it("transforms pricing data correctly for openai provider", () => {
    const pricing = transformModelsDevToPricing(MOCK_MODELS_DEV_DATA);

    // openai maps to ["openai", "cx"]
    assert.ok(pricing.openai, "openai provider should exist");
    assert.ok(pricing.openai["gpt-4o"], "gpt-4o pricing should exist");
    assert.equal(pricing.openai["gpt-4o"].input, 2.5);
    assert.equal(pricing.openai["gpt-4o"].output, 10.0);
    assert.equal(pricing.openai["gpt-4o"].cached, 1.25);
    assert.equal(pricing.openai["gpt-4o"].cache_creation, 2.5);

    // cx (Codex alias) should also have the same pricing
    assert.ok(pricing.cx, "cx provider should exist");
    assert.ok(pricing.cx["gpt-4o"], "gpt-4o pricing in cx should exist");
    assert.equal(pricing.cx["gpt-4o"].input, 2.5);
  });

  it("maps reasoning cost correctly", () => {
    const pricing = transformModelsDevToPricing(MOCK_MODELS_DEV_DATA);

    assert.ok(pricing.openai["o3-mini"], "o3-mini pricing should exist");
    assert.equal(pricing.openai["o3-mini"].input, 1.1);
    assert.equal(pricing.openai["o3-mini"].output, 4.4);
    assert.equal(pricing.openai["o3-mini"].reasoning, 4.4);
    // o3-mini has no cache_read/cache_write
    assert.equal(pricing.openai["o3-mini"].cached, undefined);
    assert.equal(pricing.openai["o3-mini"].cache_creation, undefined);
  });

  it("maps deepseek to both deepseek and if (Qoder) providers", () => {
    const pricing = transformModelsDevToPricing(MOCK_MODELS_DEV_DATA);

    assert.ok(pricing.deepseek, "deepseek provider should exist");
    assert.ok(pricing.if, "if (Qoder) provider should exist");
    assert.equal(pricing.deepseek["deepseek-chat"].input, 0.27);
    assert.equal(pricing.deepseek["deepseek-chat"].output, 1.1);
    assert.equal(pricing.deepseek["deepseek-chat"].cached, 0.07);
    // Should be same in if provider
    assert.equal(pricing.if["deepseek-chat"].input, 0.27);
  });

  it("handles unknown providers by using the models.dev ID as-is", () => {
    const pricing = transformModelsDevToPricing(MOCK_MODELS_DEV_DATA);

    assert.ok(pricing["unknown-provider"], "unknown-provider should exist");
    assert.equal(pricing["unknown-provider"]["some-model"].input, 1.0);
    assert.equal(pricing["unknown-provider"]["some-model"].output, 2.0);
  });

  it("skips models without cost data", () => {
    const dataWithNoCost = {
      testprovider: {
        id: "testprovider",
        models: {
          "no-cost-model": {
            id: "no-cost-model",
            name: "No Cost Model",
            attachment: false,
            reasoning: false,
            tool_call: false,
            release_date: "2025-01-01",
            last_updated: "2025-01-01",
            open_weights: false,
            // No cost field
            limit: { context: 4096, output: 2048 },
            modalities: { input: ["text"], output: ["text"] },
          },
        },
      },
    };
    const pricing = transformModelsDevToPricing(dataWithNoCost);
    assert.equal(pricing.testprovider, undefined, "provider without cost should not exist");
  });

  it("counts pricing entries correctly", () => {
    const pricing = transformModelsDevToPricing(MOCK_MODELS_DEV_DATA);
    const totalModels = Object.values(pricing).reduce(
      (sum, models) => sum + Object.keys(models).length,
      0
    );
    // openai: 2 models × 2 providers (openai, cx) = 4
    // anthropic: 1 model × 2 providers (anthropic, cc) = 2
    // deepseek: 1 model × 2 providers (deepseek, if) = 2
    // unknown-provider: 1 model × 1 provider = 1
    assert.equal(totalModels, 9);
  });
});

describe("modelsDevSync — transformModelsDevToCapabilities", () => {
  it("transforms capability data correctly", () => {
    const caps = transformModelsDevToCapabilities(MOCK_MODELS_DEV_DATA);

    assert.ok(caps.openai, "openai capabilities should exist");
    assert.ok(caps.openai["gpt-4o"], "gpt-4o capabilities should exist");

    const gpt4o = caps.openai["gpt-4o"];
    assert.equal(gpt4o.tool_call, true);
    assert.equal(gpt4o.reasoning, false);
    assert.equal(gpt4o.attachment, true);
    assert.equal(gpt4o.structured_output, true);
    assert.equal(gpt4o.temperature, true);
    assert.equal(gpt4o.limit_context, 128000);
    assert.equal(gpt4o.limit_output, 16384);
    assert.equal(gpt4o.status, null); // not set in mock
    assert.equal(gpt4o.family, "gpt-4");
    assert.equal(gpt4o.open_weights, false);
    assert.equal(JSON.parse(gpt4o.modalities_input).length, 2);
    assert.equal(JSON.parse(gpt4o.modalities_output).length, 1);
  });

  it("handles interleaved reasoning field", () => {
    const dataWithInterleaved = {
      testprovider: {
        id: "testprovider",
        models: {
          "reasoning-model": {
            id: "reasoning-model",
            name: "Reasoning Model",
            attachment: false,
            reasoning: true,
            tool_call: true,
            release_date: "2025-01-01",
            last_updated: "2025-01-01",
            open_weights: true,
            interleaved: { field: "reasoning_content" },
            limit: { context: 200000, output: 64000 },
            modalities: { input: ["text"], output: ["text"] },
          },
        },
      },
    };
    const caps = transformModelsDevToCapabilities(dataWithInterleaved);
    assert.equal(caps.testprovider["reasoning-model"].interleaved_field, "reasoning_content");
  });

  it("handles interleaved as boolean true", () => {
    const dataWithBoolInterleaved = {
      testprovider: {
        id: "testprovider",
        models: {
          "bool-model": {
            id: "bool-model",
            name: "Bool Model",
            attachment: false,
            reasoning: true,
            tool_call: true,
            release_date: "2025-01-01",
            last_updated: "2025-01-01",
            open_weights: false,
            interleaved: true,
            limit: { context: 100000, output: 32000 },
            modalities: { input: ["text"], output: ["text"] },
          },
        },
      },
    };
    const caps = transformModelsDevToCapabilities(dataWithBoolInterleaved);
    assert.equal(caps.testprovider["bool-model"].interleaved_field, "reasoning_content");
  });

  it("handles null/missing optional fields", () => {
    const dataWithMinimal = {
      minimal: {
        id: "minimal",
        models: {
          "minimal-model": {
            id: "minimal-model",
            name: "Minimal",
            attachment: false,
            reasoning: false,
            tool_call: false,
            release_date: "2025-01-01",
            last_updated: "2025-01-01",
            open_weights: false,
            // No cost, no interleaved, no status, no family
            limit: { context: 4096, output: 2048 },
            modalities: { input: ["text"], output: ["text"] },
          },
        },
      },
    };
    const caps = transformModelsDevToCapabilities(dataWithMinimal);
    const m = caps.minimal["minimal-model"];
    assert.equal(m.tool_call, false);
    assert.equal(m.reasoning, false);
    assert.equal(m.attachment, false);
    assert.equal(m.structured_output, null);
    assert.equal(m.temperature, null);
    assert.equal(m.knowledge_cutoff, null);
    assert.equal(m.status, null);
    assert.equal(m.family, null);
    assert.equal(m.interleaved_field, null);
    assert.equal(m.limit_context, 4096);
  });
});

describe("modelsDevSync — mapProviderId", () => {
  it("maps openai to [openai, cx]", () => {
    assert.deepEqual(mapProviderId("openai"), ["openai", "cx"]);
  });

  it("maps anthropic to [anthropic, cc]", () => {
    assert.deepEqual(mapProviderId("anthropic"), ["anthropic", "cc"]);
  });

  it("maps google to [gemini, gemini-cli]", () => {
    assert.deepEqual(mapProviderId("google"), ["gemini", "gemini-cli"]);
  });

  it("maps deepseek to [deepseek, if]", () => {
    assert.deepEqual(mapProviderId("deepseek"), ["deepseek", "if"]);
  });

  it("falls back to original ID for unmapped providers", () => {
    assert.deepEqual(mapProviderId("some-new-provider"), ["some-new-provider"]);
  });

  it("maps bedrock to [kiro, kr]", () => {
    assert.deepEqual(mapProviderId("bedrock"), ["kiro", "kr"]);
  });

  it("maps moonshot to the canonical provider plus Kimi aliases", () => {
    assert.deepEqual(mapProviderId("moonshot"), ["moonshot", "kimi", "kimi-coding", "kmc", "kmca"]);
  });

  it("maps current models.dev provider IDs used by OmniRoute-compatible providers", () => {
    assert.deepEqual(mapProviderId("github-copilot"), ["github", "gh"]);
    assert.deepEqual(mapProviderId("kilo"), ["kilocode", "kc", "kilo-gateway"]);
    assert.deepEqual(mapProviderId("kimi-for-coding"), [
      "kimi-coding",
      "kmc",
      "kimi-coding-apikey",
      "kmca",
    ]);
    assert.deepEqual(mapProviderId("fireworks-ai"), ["fireworks"]);
    assert.deepEqual(mapProviderId("togetherai"), ["together", "openrouter"]);
  });
});

describe("modelsDevSync — fetchModelsDev (live API)", () => {
  it("fetches data from models.dev API", async () => {
    const data = await fetchModelsDev();
    assert.ok(typeof data === "object", "data should be an object");

    const providerCount = Object.keys(data).length;
    assert.ok(providerCount >= 100, `should have 100+ providers, got ${providerCount}`);

    let modelCount = 0;
    for (const provider of Object.values(data)) {
      const p = provider;
      if (p.models) {
        modelCount += Object.keys(p.models).length;
      }
    }
    assert.ok(modelCount >= 4000, `should have 4000+ models, got ${modelCount}`);
  });

  it("returns cached data on second call", async () => {
    const data1 = await fetchModelsDev();
    const data2 = await fetchModelsDev();
    assert.strictEqual(data1, data2, "should return same cached reference");
  });

  it("has openai provider with gpt-4o model", async () => {
    const data = await fetchModelsDev();
    assert.ok(data.openai, "openai provider should exist");
    assert.ok(data.openai.models["gpt-4o"], "gpt-4o model should exist");
  });

  it("has anthropic provider with claude models", async () => {
    const data = await fetchModelsDev();
    assert.ok(data.anthropic, "anthropic provider should exist");
    const claudeModels = Object.keys(data.anthropic.models).filter((m) => m.includes("claude"));
    assert.ok(claudeModels.length > 0, "should have claude models");
  });
});
