import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

// Mock fetch for health checks
const originalFetch = global.fetch;

describe("MLX Provider Registry Entries", () => {
  beforeEach(() => {
    global.fetch = async () => ({ ok: false, status: 500 });
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should have mlx-gemma registry entry with correct configuration", async () => {
    const entry = getRegistryEntry("mlx-gemma");

    assert.ok(entry, "mlx-gemma should be registered");
    assert.equal(entry?.id, "mlx-gemma");
    assert.equal(entry?.alias, "mlx-gemma");
    assert.equal(entry?.format, "openai");
    assert.equal(entry?.executor, "default"); // Uses default executor for OpenAI-compatible
    assert.equal(entry?.baseUrl, "http://localhost:11435/v1");
    assert.equal(entry?.modelsUrl, "http://localhost:11435/v1/models");
    assert.equal(entry?.passthroughModels, false);
    assert.ok(entry?.models?.length === 1);
    assert.equal(entry?.models?.[0]?.id, "mlx-community/gemma-4-26B-A4B-it-qat-q4_0-mlx-aligned");
    assert.equal(entry?.models?.[0]?.toolCalling, true);
    assert.equal(entry?.models?.[0]?.contextLength, 8192);
  });

  it("should have mlx-qwen registry entry with correct configuration", async () => {
    const entry = getRegistryEntry("mlx-qwen");

    assert.ok(entry, "mlx-qwen should be registered");
    assert.equal(entry?.id, "mlx-qwen");
    assert.equal(entry?.alias, "mlx-qwen");
    assert.equal(entry?.format, "openai");
    assert.equal(entry?.executor, "default");
    assert.equal(entry?.baseUrl, "http://localhost:11436/v1");
    assert.equal(entry?.modelsUrl, "http://localhost:11436/v1/models");
    assert.equal(entry?.passthroughModels, false);
    assert.ok(entry?.models?.length === 1);
    assert.equal(entry?.models?.[0]?.id, "maglun/Qwen3.8-27B-MLX-Mixed-3.80bpw");
    assert.equal(entry?.models?.[0]?.toolCalling, true);
    assert.equal(entry?.models?.[0]?.contextLength, 8192);
  });

  it("should have both MLX providers in registered providers list", async () => {
    const { getRegisteredProviders } = await import("../../open-sse/config/providerRegistry.ts");
    const providers = getRegisteredProviders();
    assert.ok(providers.includes("mlx-gemma"));
    assert.ok(providers.includes("mlx-qwen"));
  });
});
