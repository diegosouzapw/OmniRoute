/**
 * Unit tests for open-sse/services/compression/cachingAware.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "../../../open-sse/services/compression/cachingAware.ts";

describe("detectCachingContext", () => {
  it("returns hasCacheControl=true when body has cache_control", () => {
    const ctx = detectCachingContext({ cache_control: { type: "ephemeral" } });
    assert.equal(ctx.hasCacheControl, true);
  });

  it("returns hasCacheControl=false when body has no cache_control", () => {
    const ctx = detectCachingContext({ model: "anthropic/claude-3" });
    assert.equal(ctx.hasCacheControl, false);
  });

  it("extracts anthropic provider from model string", () => {
    const ctx = detectCachingContext({ model: "anthropic/claude-3-sonnet" });
    assert.equal(ctx.provider, "anthropic");
    assert.equal(ctx.isCachingProvider, true);
  });

  it("extracts openai provider from model string", () => {
    const ctx = detectCachingContext({ model: "openai/gpt-4o" });
    assert.equal(ctx.provider, "openai");
    assert.equal(ctx.isCachingProvider, false);
  });

  it("extracts google provider from model string", () => {
    const ctx = detectCachingContext({ model: "google/gemini-pro" });
    assert.equal(ctx.provider, "google");
    assert.equal(ctx.isCachingProvider, false);
  });

  it("keeps provider prefix and applies the shared caching policy", () => {
    const ctx = detectCachingContext({ model: "deepseek/deepseek-chat" });
    assert.equal(ctx.provider, "deepseek");
    assert.equal(ctx.isCachingProvider, true);
  });

  it("handles null/undefined body gracefully", () => {
    const ctx = detectCachingContext(null);
    assert.equal(ctx.hasCacheControl, false);
    assert.equal(ctx.provider, null);
    assert.equal(ctx.isCachingProvider, false);
  });

  it("handles empty object body", () => {
    const ctx = detectCachingContext({});
    assert.equal(ctx.hasCacheControl, false);
    assert.equal(ctx.provider, null);
    assert.equal(ctx.isCachingProvider, false);
  });

  it("detects cache_control in Claude message content blocks", () => {
    const ctx = detectCachingContext(
      {
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: "cached", cache_control: { type: "ephemeral" } }],
          },
        ],
      },
      { provider: "anthropic", targetFormat: "claude" }
    );

    assert.equal(ctx.hasCacheControl, true);
    assert.equal(ctx.provider, "anthropic");
    assert.equal(ctx.targetFormat, "claude");
    assert.equal(ctx.isCachingProvider, true);
  });

  it("detects cache_control in Claude tools", () => {
    const ctx = detectCachingContext(
      {
        tools: [{ name: "lookup", cache_control: { type: "ephemeral" } }],
      },
      { provider: "qwen", targetFormat: "claude" }
    );

    assert.equal(ctx.hasCacheControl, true);
    assert.equal(ctx.isCachingProvider, true);
  });

  it("prefers explicit provider context over the body model prefix", () => {
    const ctx = detectCachingContext(
      { model: "openai/gpt-4o", cache_control: { type: "ephemeral" } },
      { provider: "anthropic", targetFormat: "claude", model: "claude-3-5-sonnet" }
    );

    assert.equal(ctx.provider, "anthropic");
    assert.equal(ctx.isCachingProvider, true);
  });
});

describe("getCacheAwareStrategy", () => {
  it("downgrades aggressive to standard for caching provider with cache_control", () => {
    const ctx = { hasCacheControl: true, provider: "anthropic", isCachingProvider: true };
    const result = getCacheAwareStrategy("aggressive", ctx);
    assert.equal(result.strategy, "standard");
    assert.equal(result.skipSystemPrompt, true);
    assert.equal(result.deterministicOnly, true);
  });

  it("downgrades ultra to standard for caching provider with cache_control", () => {
    const ctx = { hasCacheControl: true, provider: "openai", isCachingProvider: true };
    const result = getCacheAwareStrategy("ultra", ctx);
    assert.equal(result.strategy, "standard");
    assert.equal(result.skipSystemPrompt, true);
    assert.equal(result.deterministicOnly, true);
  });

  it("keeps standard strategy unchanged for caching provider with cache_control", () => {
    const ctx = { hasCacheControl: true, provider: "anthropic", isCachingProvider: true };
    const result = getCacheAwareStrategy("standard", ctx);
    assert.equal(result.strategy, "standard");
    assert.equal(result.skipSystemPrompt, true);
    assert.equal(result.deterministicOnly, true);
  });

  it("keeps strategy unchanged for non-caching provider", () => {
    const ctx = { hasCacheControl: true, provider: "deepseek", isCachingProvider: false };
    const result = getCacheAwareStrategy("aggressive", ctx);
    assert.equal(result.strategy, "aggressive");
    assert.equal(result.skipSystemPrompt, false);
    assert.equal(result.deterministicOnly, false);
  });

  it("keeps strategy unchanged when no cache_control even for caching provider", () => {
    const ctx = { hasCacheControl: false, provider: "anthropic", isCachingProvider: true };
    const result = getCacheAwareStrategy("aggressive", ctx);
    assert.equal(result.strategy, "aggressive");
    assert.equal(result.skipSystemPrompt, false);
    assert.equal(result.deterministicOnly, false);
  });

  it("returns none strategy unchanged", () => {
    const ctx = { hasCacheControl: false, provider: null, isCachingProvider: false };
    const result = getCacheAwareStrategy("none", ctx);
    assert.equal(result.strategy, "none");
    assert.equal(result.skipSystemPrompt, false);
    assert.equal(result.deterministicOnly, false);
  });
});
