import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { buildOpenAiCompatibleRegistryEntry } from "../../open-sse/config/providers/shared.ts";
import type { RegistryEntry } from "../../open-sse/config/providers/shared.ts";

// ── buildOpenAiCompatibleRegistryEntry ──────────────────────────────────────

describe("buildOpenAiCompatibleRegistryEntry", () => {
  it("returns all default fields when only id is provided", () => {
    const entry = buildOpenAiCompatibleRegistryEntry({ id: "my-provider" });
    assert.equal(entry.id, "my-provider");
    assert.equal(entry.format, "openai");
    assert.equal(entry.executor, "default");
    assert.equal(entry.authType, "apikey");
    assert.equal(entry.authHeader, "bearer");
  });

  it("includes baseUrl when provided", () => {
    const entry = buildOpenAiCompatibleRegistryEntry({
      id: "my-provider",
      baseUrl: "https://api.example.com/v1",
    });
    assert.equal(entry.baseUrl, "https://api.example.com/v1");
    assert.equal(entry.format, "openai");
    assert.equal(entry.executor, "default");
  });

  it("includes models array when provided", () => {
    const models = [
      { id: "gpt-4", name: "GPT-4" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    ];
    const entry = buildOpenAiCompatibleRegistryEntry({
      id: "my-provider",
      models,
    });
    assert.deepEqual(entry.models, models);
    assert.equal(entry.models.length, 2);
  });

  it("overrides default authHeader when custom value is provided", () => {
    const entry = buildOpenAiCompatibleRegistryEntry({
      id: "my-provider",
      authHeader: "x-api-key",
    } as Parameters<typeof buildOpenAiCompatibleRegistryEntry>[0]);
    assert.equal(entry.authHeader, "x-api-key");
    // Other defaults still present
    assert.equal(entry.format, "openai");
    assert.equal(entry.executor, "default");
    assert.equal(entry.authType, "apikey");
  });

  it("overrides default executor when custom value is provided", () => {
    const entry = buildOpenAiCompatibleRegistryEntry({
      id: "my-provider",
      executor: "opencode",
    });
    assert.equal(entry.executor, "opencode");
    // Other defaults still present
    assert.equal(entry.format, "openai");
    assert.equal(entry.authType, "apikey");
    assert.equal(entry.authHeader, "bearer");
  });

  it("includes passthroughModels when set to true", () => {
    const entry = buildOpenAiCompatibleRegistryEntry({
      id: "my-provider",
      passthroughModels: true,
    });
    assert.equal(entry.passthroughModels, true);
    assert.equal(entry.format, "openai");
  });

  it("allows combining multiple overrides", () => {
    const entry = buildOpenAiCompatibleRegistryEntry({
      id: "multi",
      baseUrl: "https://multi.api.com",
      executor: "cursor",
      authHeader: "x-token",
      passthroughModels: true,
      timeoutMs: 30_000,
    });
    assert.equal(entry.id, "multi");
    assert.equal(entry.baseUrl, "https://multi.api.com");
    assert.equal(entry.executor, "cursor");
    assert.equal(entry.authHeader, "x-token");
    assert.equal(entry.passthroughModels, true);
    assert.equal(entry.timeoutMs, 30_000);
    assert.equal(entry.format, "openai");
    assert.equal(entry.authType, "apikey");
  });

  it("returns a RegistryEntry-compatible object", () => {
    const entry: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
      id: "type-check",
    });
    // Verify the type is assignable (compile-time) and runtime shape is correct
    assert.equal(typeof entry.id, "string");
    assert.equal(typeof entry.format, "string");
    assert.equal(typeof entry.executor, "string");
    assert.equal(typeof entry.authType, "string");
    assert.equal(typeof entry.authHeader, "string");
  });
});
