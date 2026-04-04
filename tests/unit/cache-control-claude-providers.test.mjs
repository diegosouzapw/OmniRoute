import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  providerSupportsCaching,
  shouldPreserveCacheControl,
} from "../../open-sse/utils/cacheControlPolicy.ts";

describe("Cache Control Policy - Claude Protocol Providers", () => {
  test("providerSupportsCaching returns true for Claude-format providers", () => {
    // Known caching providers
    assert.equal(providerSupportsCaching("claude", "claude"), true);
    assert.equal(providerSupportsCaching("anthropic", "claude"), true);
    assert.equal(providerSupportsCaching("zai", "claude"), true);
    assert.equal(providerSupportsCaching("qwen", "openai"), true);
    assert.equal(providerSupportsCaching("deepseek", "openai"), true);

    // Claude-protocol providers NOT in CACHING_PROVIDERS set
    // These should be detected via targetFormat
    assert.equal(providerSupportsCaching("bailian-coding-plan", "claude"), true);
    assert.equal(providerSupportsCaching("glm", "claude"), true);
    assert.equal(providerSupportsCaching("minimax", "claude"), true);
    assert.equal(providerSupportsCaching("minimax-cn", "claude"), true);
    assert.equal(providerSupportsCaching("kimi-coding", "claude"), true);
    assert.equal(providerSupportsCaching("alicode", "claude"), true);

    // Non-Claude providers without caching support
    assert.equal(providerSupportsCaching("openai", "openai"), false);
    assert.equal(providerSupportsCaching("gemini", "gemini"), false);
  });

  test("shouldPreserveCacheControl preserves for Claude-format providers with Claude Code client", () => {
    const claudeCodeUA = "Claude-Code/1.0.0";

    // Claude-protocol providers should preserve cache_control
    assert.equal(
      shouldPreserveCacheControl({
        userAgent: claudeCodeUA,
        isCombo: false,
        targetProvider: "bailian-coding-plan",
        targetFormat: "claude",
        settings: { alwaysPreserveClientCache: "auto" },
      }),
      true
    );

    assert.equal(
      shouldPreserveCacheControl({
        userAgent: claudeCodeUA,
        isCombo: false,
        targetProvider: "glm",
        targetFormat: "claude",
        settings: { alwaysPreserveClientCache: "auto" },
      }),
      true
    );

    assert.equal(
      shouldPreserveCacheControl({
        userAgent: claudeCodeUA,
        isCombo: false,
        targetProvider: "zai",
        targetFormat: "claude",
        settings: { alwaysPreserveClientCache: "auto" },
      }),
      true
    );

    assert.equal(
      shouldPreserveCacheControl({
        userAgent: claudeCodeUA,
        isCombo: false,
        targetProvider: "minimax",
        targetFormat: "claude",
        settings: { alwaysPreserveClientCache: "auto" },
      }),
      true
    );
  });

  test("shouldPreserveCacheControl respects user override 'always'", () => {
    const regularUA = "Mozilla/5.0";

    // Even with non-Claude Code client, 'always' should preserve
    assert.equal(
      shouldPreserveCacheControl({
        userAgent: regularUA,
        isCombo: false,
        targetProvider: "bailian-coding-plan",
        targetFormat: "claude",
        settings: { alwaysPreserveClientCache: "always" },
      }),
      true
    );
  });

  test("shouldPreserveCacheControl respects user override 'never'", () => {
    const claudeCodeUA = "Claude-Code/1.0.0";

    // Even with Claude Code client, 'never' should not preserve
    assert.equal(
      shouldPreserveCacheControl({
        userAgent: claudeCodeUA,
        isCombo: false,
        targetProvider: "bailian-coding-plan",
        targetFormat: "claude",
        settings: { alwaysPreserveClientCache: "never" },
      }),
      false
    );
  });

  test("shouldPreserveCacheControl does not preserve for non-Claude Code clients in auto mode", () => {
    const regularUA = "Mozilla/5.0";

    assert.equal(
      shouldPreserveCacheControl({
        userAgent: regularUA,
        isCombo: false,
        targetProvider: "bailian-coding-plan",
        targetFormat: "claude",
        settings: { alwaysPreserveClientCache: "auto" },
      }),
      false
    );
  });

  test("shouldPreserveCacheControl does not preserve for non-Claude format providers", () => {
    const claudeCodeUA = "Claude-Code/1.0.0";

    assert.equal(
      shouldPreserveCacheControl({
        userAgent: claudeCodeUA,
        isCombo: false,
        targetProvider: "openai",
        targetFormat: "openai",
        settings: { alwaysPreserveClientCache: "auto" },
      }),
      false
    );
  });

  test("shouldPreserveCacheControl treats CC-compatible providers like other Claude providers in auto mode", () => {
    const claudeCodeUA = "Claude-Code/1.0.0";

    assert.equal(
      shouldPreserveCacheControl({
        userAgent: claudeCodeUA,
        isCombo: false,
        targetProvider: "anthropic-compatible-cc-cm",
        targetFormat: "claude",
        settings: { alwaysPreserveClientCache: "auto" },
      }),
      true
    );
  });
});
