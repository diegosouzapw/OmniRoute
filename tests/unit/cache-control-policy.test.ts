import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  isClaudeCodeClient,
  providerSupportsCaching,
  isDeterministicStrategy,
  shouldPreserveCacheControl,
  trackCacheMetrics,
  updateCacheTokenMetrics,
} from "../../open-sse/utils/cacheControlPolicy.ts";

describe("Cache Control Policy", () => {
  describe("isClaudeCodeClient", () => {
    test("detects claude-code user agent", () => {
      assert.equal(isClaudeCodeClient("claude-code/0.1.0"), true);
      assert.equal(isClaudeCodeClient("claude_code/0.1.0"), true);
      assert.equal(isClaudeCodeClient("Anthropic CLI/1.0"), true);
      assert.equal(isClaudeCodeClient("claude-cli/2.1.113 (external, sdk-cli)"), true);
    });

    test("rejects non-Claude clients", () => {
      assert.equal(isClaudeCodeClient("curl/7.68.0"), false);
      assert.equal(isClaudeCodeClient("OpenAI/1.0"), false);
      assert.equal(isClaudeCodeClient(null), false);
      assert.equal(isClaudeCodeClient(undefined), false);
      assert.equal(isClaudeCodeClient(""), false);
    });

    test("is case-insensitive", () => {
      assert.equal(isClaudeCodeClient("Claude-Code/0.1.0"), true);
      assert.equal(isClaudeCodeClient("CLAUDE-CODE/0.1.0"), true);
    });
  });

  describe("providerSupportsCaching", () => {
    test("detects caching providers", () => {
      assert.equal(providerSupportsCaching("claude"), true);
      assert.equal(providerSupportsCaching("anthropic"), true);
      assert.equal(providerSupportsCaching("zai"), true);
      assert.equal(providerSupportsCaching("deepseek"), true);
      // #3088 — Xiaomi MiMo supports prompt caching; cache_control breakpoints
      // sent by Claude Code (via cc-switch) must be preserved, not stripped.
      assert.equal(providerSupportsCaching("xiaomi-mimo"), true);
      // #3955 — OpenAI / Codex / Azure-OpenAI use automatic prefix caching.
      assert.equal(providerSupportsCaching("openai"), true);
      assert.equal(providerSupportsCaching("codex"), true);
      assert.equal(providerSupportsCaching("azure"), true);
    });

    test("rejects non-caching providers", () => {
      assert.equal(providerSupportsCaching("gemini"), false);
      assert.equal(providerSupportsCaching("unknown"), false);
      assert.equal(providerSupportsCaching(null), false);
      assert.equal(providerSupportsCaching(undefined), false);
    });

    test("is case-insensitive", () => {
      assert.equal(providerSupportsCaching("Claude"), true);
      assert.equal(providerSupportsCaching("ANTHROPIC"), true);
      assert.equal(providerSupportsCaching("Xiaomi-MiMo"), true);
    });

    // #3088 — regression: a Claude Code client routed to xiaomi-mimo must keep
    // its client-side cache_control breakpoints so Xiaomi's API sees cache hints.
    test("preserves client cache_control for xiaomi-mimo single model", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-cli/2.1.113 (external, sdk-cli)",
          isCombo: false,
          targetProvider: "xiaomi-mimo",
        }),
        true
      );
    });
  });

  describe("isDeterministicStrategy", () => {
    test("identifies deterministic strategies", () => {
      assert.equal(isDeterministicStrategy("priority"), true);
      assert.equal(isDeterministicStrategy("cost-optimized"), true);
    });

    test("identifies non-deterministic strategies", () => {
      assert.equal(isDeterministicStrategy("weighted"), false);
      assert.equal(isDeterministicStrategy("round-robin"), false);
      assert.equal(isDeterministicStrategy("random"), false);
      assert.equal(isDeterministicStrategy("fill-first"), false);
      assert.equal(isDeterministicStrategy("p2c"), false);
      assert.equal(isDeterministicStrategy("least-used"), false);
      assert.equal(isDeterministicStrategy("strict-random"), false);
    });

    test("handles null/undefined", () => {
      assert.equal(isDeterministicStrategy(null), false);
      assert.equal(isDeterministicStrategy(undefined), false);
    });
  });

  describe("shouldPreserveCacheControl", () => {
    test("preserves for single model + Claude client + caching provider", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: false,
          targetProvider: "claude",
        }),
        true
      );
    });

    test("preserves for combo with priority strategy + Claude client + caching provider", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "priority",
          targetProvider: "claude",
        }),
        true
      );
    });

    test("preserves for combo with cost-optimized strategy + Claude client + caching provider", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "cost-optimized",
          targetProvider: "anthropic",
        }),
        true
      );
    });

    test("rejects non-Claude clients", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "curl/7.68.0",
          isCombo: false,
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects non-caching providers", () => {
      // gemini has no prompt caching (openai/codex now do, per #3955).
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: false,
          targetProvider: "gemini",
        }),
        false
      );
    });

    // Client cache_control markers are preserved for EVERY combo strategy, not
    // only the "deterministic" ones. Rewriting a caching-aware client's markers
    // never beats preserving them: on a stable target the client's breakpoints
    // advance deterministically turn-over-turn (the proxy heuristic recomputes
    // positions and thrashes the provider prompt cache — observed in production
    // as ~200k cache_write per turn on qtSd/ quota-share combos), and on a
    // target switch both approaches miss equally.
    for (const strategy of [
      "weighted",
      "round-robin",
      "random",
      "fill-first",
      "p2c",
      "least-used",
      "strict-random",
      "quota-share",
    ]) {
      test(`preserves for combo with ${strategy} strategy (markers win over routing strategy)`, () => {
        assert.equal(
          shouldPreserveCacheControl({
            userAgent: "claude-code/0.1.0",
            isCombo: true,
            comboStrategy: strategy as Parameters<
              typeof shouldPreserveCacheControl
            >[0]["comboStrategy"],
            targetProvider: "claude",
          }),
          true
        );
      });
    }

    test("preserves for combo with null strategy (strategy is irrelevant to preservation)", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: null,
          targetProvider: "claude",
        }),
        true
      );
    });

    test("still rejects combo when the provider does not support caching", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: true,
          comboStrategy: "quota-share",
          targetProvider: "gemini",
        }),
        false
      );
    });

    test("still rejects combo for non-caching-aware clients", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "curl/7.68.0",
          isCombo: true,
          comboStrategy: "quota-share",
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects when userAgent is null", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: null,
          isCombo: false,
          targetProvider: "claude",
        }),
        false
      );
    });

    test("rejects when targetProvider is null", () => {
      assert.equal(
        shouldPreserveCacheControl({
          userAgent: "claude-code/0.1.0",
          isCombo: false,
          targetProvider: null,
        }),
        false
      );
    });

    describe("settings override", () => {
      test("alwaysPreserveClientCache=always overrides auto detection", () => {
        assert.equal(
          shouldPreserveCacheControl({
            userAgent: "curl/7.68.0", // non-Claude client
            isCombo: false,
            targetProvider: "claude",
            settings: { alwaysPreserveClientCache: "always" },
          }),
          true
        );
      });

      test("alwaysPreserveClientCache=never overrides auto detection", () => {
        assert.equal(
          shouldPreserveCacheControl({
            userAgent: "claude-code/0.1.0", // Claude client
            isCombo: false,
            targetProvider: "claude",
            settings: { alwaysPreserveClientCache: "never" },
          }),
          false
        );
      });

      test("alwaysPreserveClientCache=auto uses automatic detection", () => {
        // Should preserve for Claude client + caching provider
        assert.equal(
          shouldPreserveCacheControl({
            userAgent: "claude-code/0.1.0",
            isCombo: false,
            targetProvider: "claude",
            settings: { alwaysPreserveClientCache: "auto" },
          }),
          true
        );

        // Should NOT preserve for non-Claude client
        assert.equal(
          shouldPreserveCacheControl({
            userAgent: "curl/7.68.0",
            isCombo: false,
            targetProvider: "claude",
            settings: { alwaysPreserveClientCache: "auto" },
          }),
          false
        );
      });

      test("undefined settings uses automatic detection", () => {
        assert.equal(
          shouldPreserveCacheControl({
            userAgent: "claude-code/0.1.0",
            isCombo: false,
            targetProvider: "claude",
            settings: undefined,
          }),
          true
        );
      });
    });
  });

  describe("trackCacheMetrics", () => {
    test("initializes empty metrics", () => {
      const result = trackCacheMetrics({
        preserved: true,
        provider: "claude",
        strategy: "priority",
        metrics: undefined,
        inputTokens: 1000,
        cachedTokens: 500,
        cacheCreationTokens: 200,
      });

      assert.equal(result.totalRequests, 1);
      assert.equal(result.requestsWithCacheControl, 1);
      assert.equal(result.totalInputTokens, 1000);
      assert.equal(result.totalCachedTokens, 500);
      assert.equal(result.totalCacheCreationTokens, 200);
      assert.equal(result.tokensSaved, 500);
    });

    test("increments total requests without cache control", () => {
      const metrics = {
        totalRequests: 10,
        requestsWithCacheControl: 5,
        totalInputTokens: 5000,
        totalCachedTokens: 2000,
        totalCacheCreationTokens: 1000,
        tokensSaved: 2000,
        estimatedCostSaved: 0.5,
        byProvider: {},
        byStrategy: {},
        lastUpdated: new Date().toISOString(),
      };

      const result = trackCacheMetrics({
        preserved: false,
        provider: "claude",
        strategy: null,
        metrics,
        inputTokens: 500,
        cachedTokens: 0,
        cacheCreationTokens: 0,
      });

      assert.equal(result.totalRequests, 11);
      assert.equal(result.requestsWithCacheControl, 5); // unchanged
      assert.equal(result.totalInputTokens, 5500);
    });

    test("tracks requests with cache control preserved", () => {
      const metrics = {
        totalRequests: 0,
        requestsWithCacheControl: 0,
        totalInputTokens: 0,
        totalCachedTokens: 0,
        totalCacheCreationTokens: 0,
        tokensSaved: 0,
        estimatedCostSaved: 0,
        byProvider: {},
        byStrategy: {},
        lastUpdated: new Date().toISOString(),
      };

      const result = trackCacheMetrics({
        preserved: true,
        provider: "claude",
        strategy: "priority",
        metrics,
        inputTokens: 1000,
        cachedTokens: 400,
        cacheCreationTokens: 100,
      });

      assert.equal(result.totalRequests, 1);
      assert.equal(result.requestsWithCacheControl, 1);
      assert.equal(result.byProvider.claude.requests, 1);
      assert.equal(result.byProvider.claude.inputTokens, 1000);
      assert.equal(result.byProvider.claude.cachedTokens, 400);
      assert.equal(result.byProvider.claude.cacheCreationTokens, 100);
      assert.equal(result.byStrategy.priority.requests, 1);
    });

    test("tracks by provider", () => {
      const metrics = {
        totalRequests: 0,
        requestsWithCacheControl: 0,
        totalInputTokens: 0,
        totalCachedTokens: 0,
        totalCacheCreationTokens: 0,
        tokensSaved: 0,
        estimatedCostSaved: 0,
        byProvider: {},
        byStrategy: {},
        lastUpdated: new Date().toISOString(),
      };

      let result = trackCacheMetrics({
        preserved: true,
        provider: "claude",
        strategy: null,
        metrics,
        inputTokens: 1000,
        cachedTokens: 300,
        cacheCreationTokens: 100,
      });

      result = trackCacheMetrics({
        preserved: true,
        provider: "zai",
        strategy: null,
        metrics: result,
        inputTokens: 800,
        cachedTokens: 200,
        cacheCreationTokens: 50,
      });

      assert.equal(result.byProvider.claude.requests, 1);
      assert.equal(result.byProvider.claude.inputTokens, 1000);
      assert.equal(result.byProvider.claude.cachedTokens, 300);
      assert.equal(result.byProvider.zai.requests, 1);
      assert.equal(result.byProvider.zai.inputTokens, 800);
      assert.equal(result.byProvider.zai.cachedTokens, 200);
    });

    test("tracks by strategy", () => {
      const metrics = {
        totalRequests: 0,
        requestsWithCacheControl: 0,
        totalInputTokens: 0,
        totalCachedTokens: 0,
        totalCacheCreationTokens: 0,
        tokensSaved: 0,
        estimatedCostSaved: 0,
        byProvider: {},
        byStrategy: {},
        lastUpdated: new Date().toISOString(),
      };

      let result = trackCacheMetrics({
        preserved: true,
        provider: "claude",
        strategy: "priority",
        metrics,
        inputTokens: 1000,
        cachedTokens: 300,
        cacheCreationTokens: 100,
      });

      result = trackCacheMetrics({
        preserved: true,
        provider: "claude",
        strategy: "cost-optimized",
        metrics: result,
        inputTokens: 800,
        cachedTokens: 200,
        cacheCreationTokens: 50,
      });

      assert.equal(result.byStrategy.priority.requests, 1);
      assert.equal(result.byStrategy.priority.cachedTokens, 300);
      assert.equal(result.byStrategy["cost-optimized"].requests, 1);
      assert.equal(result.byStrategy["cost-optimized"].cachedTokens, 200);
    });
  });

  describe("updateCacheTokenMetrics", () => {
    test("updates token counts", () => {
      const metrics = {
        totalRequests: 10,
        requestsWithCacheControl: 5,
        totalInputTokens: 5000,
        totalCachedTokens: 2000,
        totalCacheCreationTokens: 1000,
        tokensSaved: 2000,
        estimatedCostSaved: 0.5,
        byProvider: {
          claude: {
            requests: 3,
            inputTokens: 3000,
            cachedTokens: 1200,
            cacheCreationTokens: 600,
          },
        },
        byStrategy: {
          priority: {
            requests: 4,
            inputTokens: 4000,
            cachedTokens: 1600,
            cacheCreationTokens: 800,
          },
        },
        lastUpdated: new Date().toISOString(),
      };

      const result = updateCacheTokenMetrics({
        metrics,
        provider: "claude",
        strategy: "priority",
        inputTokens: 1000,
        cachedTokens: 400,
        cacheCreationTokens: 200,
        costSaved: 0.02,
      });

      assert.equal(result.totalInputTokens, 6000);
      assert.equal(result.totalCachedTokens, 2400);
      assert.equal(result.totalCacheCreationTokens, 1200);
      assert.equal(result.tokensSaved, 2400);
      assert.equal(result.estimatedCostSaved, 0.52);
    });

    test("updates provider breakdown", () => {
      const metrics = {
        totalRequests: 10,
        requestsWithCacheControl: 5,
        totalInputTokens: 5000,
        totalCachedTokens: 2000,
        totalCacheCreationTokens: 1000,
        tokensSaved: 2000,
        estimatedCostSaved: 0.5,
        byProvider: {
          claude: {
            requests: 3,
            inputTokens: 3000,
            cachedTokens: 1200,
            cacheCreationTokens: 600,
          },
        },
        byStrategy: {},
        lastUpdated: new Date().toISOString(),
      };

      const result = updateCacheTokenMetrics({
        metrics,
        provider: "claude",
        strategy: null,
        inputTokens: 500,
        cachedTokens: 200,
        cacheCreationTokens: 100,
      });

      assert.equal(result.byProvider.claude.inputTokens, 3500);
      assert.equal(result.byProvider.claude.cachedTokens, 1400);
      assert.equal(result.byProvider.claude.cacheCreationTokens, 700);
    });

    test("updates strategy breakdown", () => {
      const metrics = {
        totalRequests: 10,
        requestsWithCacheControl: 5,
        totalInputTokens: 5000,
        totalCachedTokens: 2000,
        totalCacheCreationTokens: 1000,
        tokensSaved: 2000,
        estimatedCostSaved: 0.5,
        byProvider: {},
        byStrategy: {
          priority: {
            requests: 4,
            inputTokens: 4000,
            cachedTokens: 1600,
            cacheCreationTokens: 800,
          },
        },
        lastUpdated: new Date().toISOString(),
      };

      const result = updateCacheTokenMetrics({
        metrics,
        provider: "claude",
        strategy: "priority",
        inputTokens: 500,
        cachedTokens: 200,
        cacheCreationTokens: 100,
      });

      assert.equal(result.byStrategy.priority.inputTokens, 4500);
      assert.equal(result.byStrategy.priority.cachedTokens, 1800);
      assert.equal(result.byStrategy.priority.cacheCreationTokens, 900);
    });
  });
});
