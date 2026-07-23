import { describe, test } from "node:test";
import assert from "node:assert/strict";
import type { z } from "zod";
import {
  providerSupportsCaching,
  providerHonorsOpenAIFormatCacheControl,
  resolveConnectionCacheOverride,
  shouldPreserveCacheControl,
} from "../../open-sse/utils/cacheControlPolicy.ts";
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "../../open-sse/services/compression/cachingAware.ts";
import { validateProviderSpecificData } from "../../src/shared/validation/providerSpecificData.ts";
import { normalizeProviderSpecificData } from "../../src/lib/providers/requestDefaults.ts";

// Regression for #6880: a custom/openai-compatible connection (provider id like
// `openai-compatible-chat-<uuid>`) can never match the hardcoded CACHING_PROVIDERS /
// OPENAI_FORMAT_CACHE_CONTROL_PROVIDERS name sets in cacheControlPolicy.ts, so cache
// behaviors (prompt_cache_key injection, the compression cache-aware guard, and
// cache_control passthrough) are permanently disabled for that class of connections with
// no way to opt in. This adds a per-connection `cache` capability override consulted
// first by the policy functions, defaulting to today's hardcoded-set behavior.

function collectIssues(): { ctx: z.RefinementCtx; issues: Array<{ path: (string | number)[]; message: string }> } {
  const issues: Array<{ path: (string | number)[]; message: string }> = [];
  const ctx = {
    addIssue: (issue: { path?: (string | number)[]; message: string }) => {
      issues.push({ path: issue.path ?? [], message: issue.message });
    },
  } as unknown as z.RefinementCtx;
  return { ctx, issues };
}

describe("#6880 resolveConnectionCacheOverride", () => {
  test("returns null for undefined/non-object/empty cache", () => {
    assert.equal(resolveConnectionCacheOverride(undefined), null);
    assert.equal(resolveConnectionCacheOverride(null), null);
    assert.equal(resolveConnectionCacheOverride("nope"), null);
    assert.equal(resolveConnectionCacheOverride({}), null);
    assert.equal(resolveConnectionCacheOverride({ cache: null }), null);
    assert.equal(resolveConnectionCacheOverride({ cache: [] }), null);
    assert.equal(resolveConnectionCacheOverride({ cache: {} }), null);
  });

  test("extracts valid fields and drops invalid/unknown values", () => {
    const result = resolveConnectionCacheOverride({
      cache: {
        supportsPromptCaching: true,
        cacheControlPassthrough: "openai-format",
        unknownField: "ignored",
      },
    });
    assert.deepEqual(result, {
      supportsPromptCaching: true,
      cacheControlPassthrough: "openai-format",
    });

    const invalid = resolveConnectionCacheOverride({
      cache: { supportsPromptCaching: "yes", cacheControlPassthrough: "bogus" },
    });
    assert.equal(invalid, null);
  });
});

describe("#6880 providerSupportsCaching override", () => {
  test("unblocks a custom openai-compatible connection when the override opts in", () => {
    assert.equal(
      providerSupportsCaching("openai-compatible-chat-abc123", undefined, {
        supportsPromptCaching: true,
      }),
      true
    );
  });

  test("no override -> default hardcoded-set behavior is unchanged", () => {
    assert.equal(providerSupportsCaching("openai-compatible-chat-abc123"), false);
  });

  test("explicit opt-out overrides the hardcoded set", () => {
    assert.equal(providerSupportsCaching("claude", undefined, { supportsPromptCaching: false }), false);
  });
});

describe("#6880 providerHonorsOpenAIFormatCacheControl override", () => {
  test("openai-format override enables passthrough for a non-hardcoded provider", () => {
    assert.equal(
      providerHonorsOpenAIFormatCacheControl("grok-custom", { cacheControlPassthrough: "openai-format" }),
      true
    );
  });

  test("strip override disables passthrough", () => {
    assert.equal(
      providerHonorsOpenAIFormatCacheControl("grok-custom", { cacheControlPassthrough: "strip" }),
      false
    );
  });

  test("no override -> default hardcoded-set behavior is unchanged", () => {
    assert.equal(providerHonorsOpenAIFormatCacheControl("grok-custom"), false);
    assert.equal(providerHonorsOpenAIFormatCacheControl("alibaba"), true);
  });
});

describe("#6880 shouldPreserveCacheControl override", () => {
  test("preserves cache_control for a non-hardcoded provider when override opts in", () => {
    const result = shouldPreserveCacheControl({
      userAgent: "claude-code/1.0",
      isCombo: false,
      targetProvider: "openai-compatible-chat-abc123",
      targetFormat: "openai",
      connectionCacheOverride: { supportsPromptCaching: true },
    });
    assert.equal(result, true);
  });

  test("no override -> non-hardcoded provider still not preserved", () => {
    const result = shouldPreserveCacheControl({
      userAgent: "claude-code/1.0",
      isCombo: false,
      targetProvider: "openai-compatible-chat-abc123",
      targetFormat: "openai",
    });
    assert.equal(result, false);
  });
});

describe("#6880 compression cache-aware guard", () => {
  test("detectCachingContext reports isCachingProvider=true when the override opts in", () => {
    const ctx = detectCachingContext(
      { messages: [{ role: "user", content: "hi" }] },
      {
        provider: "openai-compatible-chat-xyz",
        targetFormat: "openai",
        connectionCacheOverride: { supportsPromptCaching: true },
      }
    );
    assert.equal(ctx.isCachingProvider, true);
  });

  test("detectCachingContext without override keeps default (non-caching) behavior", () => {
    const ctx = detectCachingContext(
      { messages: [{ role: "user", content: "hi" }] },
      { provider: "openai-compatible-chat-xyz", targetFormat: "openai" }
    );
    assert.equal(ctx.isCachingProvider, false);
  });

  test("getCacheAwareStrategy protects the cacheable prefix for an overridden context", () => {
    const ctx = detectCachingContext(
      { messages: [{ role: "user", content: "hi" }] },
      {
        provider: "openai-compatible-chat-xyz",
        targetFormat: "openai",
        connectionCacheOverride: { supportsPromptCaching: true },
      }
    );
    const strategy = getCacheAwareStrategy("aggressive", ctx);
    assert.equal(strategy.skipSystemPrompt, true);
    assert.equal(strategy.deterministicOnly, true);
  });
});

describe("#6880 validateProviderSpecificData cache block", () => {
  test("accepts a well-formed cache block", () => {
    const { ctx, issues } = collectIssues();
    validateProviderSpecificData(
      { cache: { supportsPromptCaching: true, cacheControlPassthrough: "openai-format" } },
      ctx
    );
    assert.deepEqual(issues, []);
  });

  test("rejects a non-object cache", () => {
    const { ctx, issues } = collectIssues();
    validateProviderSpecificData({ cache: "nope" }, ctx);
    assert.equal(issues.length, 1);
    assert.deepEqual(issues[0]?.path, ["cache"]);
  });

  test("rejects an invalid cacheControlPassthrough value", () => {
    const { ctx, issues } = collectIssues();
    validateProviderSpecificData({ cache: { cacheControlPassthrough: "bogus" } }, ctx);
    assert.equal(issues.length, 1);
    assert.deepEqual(issues[0]?.path, ["cache", "cacheControlPassthrough"]);
  });
});

describe("#6880 normalizeProviderSpecificData cache block", () => {
  test("strips an invalid cache sub-object down to nothing (key deleted)", () => {
    const normalized = normalizeProviderSpecificData("openai-compatible-chat-xyz", {
      cache: { supportsPromptCaching: "yes", cacheControlPassthrough: "bogus" },
    });
    assert.equal(normalized?.cache, undefined);
  });

  test("preserves a valid cache sub-object", () => {
    const normalized = normalizeProviderSpecificData("openai-compatible-chat-xyz", {
      cache: { supportsPromptCaching: true, cacheControlPassthrough: "openai-format", junk: 1 },
    });
    assert.deepEqual(normalized?.cache, {
      supportsPromptCaching: true,
      cacheControlPassthrough: "openai-format",
    });
  });
});
