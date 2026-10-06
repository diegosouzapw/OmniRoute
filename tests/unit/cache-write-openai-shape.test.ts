/**
 * Regression: cache-write (cache creation) tokens were dropped whenever the usage
 * payload arrived in an OpenAI-shaped container.
 *
 * Symptom: the same Claude model shows "Cache Write: 1,911" through an
 * anthropic-compatible provider but "Cache Write: N/A" through an
 * openai-compatible `/v1/chat/completions` provider, because every consumer only
 * recognised the top-level Claude key `cache_creation_input_tokens`.
 *
 * Three shapes are produced inside this repo and none of them were read back:
 *   - `prompt_tokens_details.cache_creation_tokens`
 *     (open-sse/translator/response/claude-to-openai.ts, #2215)
 *   - `input_tokens_details.cache_write_tokens`
 *     (open-sse/vendor/codex-chatgpt-web/bridge.ts)
 *   - top-level `cache_write_tokens`
 *     (open-sse/executors/devin-desktop.ts, OpenRouter)
 *
 * A provider that genuinely has no cache-write concept (plain gpt/codex) must
 * still report `null`, NOT `0` — `null` means "not reported", `0` means
 * "reported as zero". That distinction is load-bearing for cache debugging.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  getPromptCacheCreationTokens,
  getPromptCacheCreationTokensOrNull,
} from "../../src/lib/usage/tokenAccounting.ts";
import { buildCacheUsageLogMeta } from "../../open-sse/handlers/chatCore/cacheUsageMeta.ts";
import { extractUsage, normalizeUsage } from "../../open-sse/utils/usageTracking.ts";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.ts";

describe("cache-write tokens survive OpenAI-shaped usage", () => {
  describe("tokenAccounting alias coverage", () => {
    it("reads prompt_tokens_details.cache_creation_tokens (claude-to-openai #2215 shape)", () => {
      const tokens = {
        prompt_tokens: 5000,
        completion_tokens: 100,
        prompt_tokens_details: { cached_tokens: 0, cache_creation_tokens: 1911 },
      };
      assert.equal(getPromptCacheCreationTokens(tokens), 1911);
      assert.equal(getPromptCacheCreationTokensOrNull(tokens), 1911);
    });

    it("reads input_tokens_details.cache_write_tokens (codex-chatgpt-web bridge shape)", () => {
      const tokens = {
        prompt_tokens: 5000,
        completion_tokens: 100,
        input_tokens_details: { cached_tokens: 0, cache_write_tokens: 1911 },
      };
      assert.equal(getPromptCacheCreationTokens(tokens), 1911);
      assert.equal(getPromptCacheCreationTokensOrNull(tokens), 1911);
    });

    it("reads top-level cache_write_tokens (devin-desktop / OpenRouter shape)", () => {
      const tokens = {
        prompt_tokens: 5,
        completion_tokens: 100,
        prompt_tokens_details: { cached_tokens: 0 },
        cache_write_tokens: 1911,
      };
      assert.equal(getPromptCacheCreationTokens(tokens), 1911);
      assert.equal(getPromptCacheCreationTokensOrNull(tokens), 1911);
    });

    it("reported-zero cache_write_tokens stays 0, never null", () => {
      const tokens = {
        prompt_tokens: 5,
        completion_tokens: 100,
        prompt_tokens_details: { cached_tokens: 0, cache_write_tokens: 0 },
      };
      assert.equal(getPromptCacheCreationTokensOrNull(tokens), 0);
    });

    it("plain gpt/codex usage (no cache-write concept) still returns null", () => {
      const tokens = {
        prompt_tokens: 54042,
        completion_tokens: 8000,
        prompt_tokens_details: { cached_tokens: 53221 },
        completion_tokens_details: { reasoning_tokens: 6433 },
      };
      assert.equal(
        getPromptCacheCreationTokensOrNull(tokens),
        null,
        "not reported must stay null, not 0"
      );
    });
  });

  describe("extractUsageFromResponse (non-streaming)", () => {
    it("keeps cache creation from an OpenAI-shaped body", () => {
      const usage = extractUsageFromResponse(
        {
          usage: {
            prompt_tokens: 5000,
            completion_tokens: 100,
            prompt_tokens_details: { cached_tokens: 0, cache_creation_tokens: 1911 },
          },
        },
        "openai-compatible"
      );
      assert.equal(getPromptCacheCreationTokensOrNull(usage), 1911);
    });

    it("keeps a top-level cache_write_tokens alias", () => {
      const usage = extractUsageFromResponse(
        {
          usage: {
            prompt_tokens: 5000,
            completion_tokens: 100,
            cache_write_tokens: 1911,
          },
        },
        "openai-compatible"
      );
      assert.equal(getPromptCacheCreationTokensOrNull(usage), 1911);
    });

    it("does not invent a cache-creation field when the provider omits it", () => {
      const usage = extractUsageFromResponse(
        { usage: { prompt_tokens: 10, completion_tokens: 2 } },
        "openai-compatible"
      );
      assert.equal(getPromptCacheCreationTokensOrNull(usage), null);
    });
  });

  describe("extractUsage (streaming chunk)", () => {
    it("keeps cache creation nested in prompt_tokens_details", () => {
      const usage = extractUsage({
        usage: {
          prompt_tokens: 5000,
          completion_tokens: 100,
          prompt_tokens_details: { cached_tokens: 0, cache_creation_tokens: 1911 },
        },
      });
      assert.equal(getPromptCacheCreationTokensOrNull(usage), 1911);
    });

    it("keeps cache creation from a Responses-API completed event", () => {
      const usage = extractUsage({
        type: "response.completed",
        response: {
          usage: {
            input_tokens: 5000,
            output_tokens: 100,
            input_tokens_details: { cached_tokens: 0, cache_write_tokens: 1911 },
          },
        },
      });
      assert.equal(getPromptCacheCreationTokensOrNull(usage), 1911);
    });
  });

  describe("normalizeUsage", () => {
    it("maps the cache_write_tokens alias onto the canonical key", () => {
      const normalized = normalizeUsage({
        prompt_tokens: 5000,
        completion_tokens: 100,
        cache_write_tokens: 1911,
      });
      assert.equal(normalized?.cache_creation_input_tokens, 1911);
    });

    it("does not overwrite an explicit canonical value", () => {
      const normalized = normalizeUsage({
        prompt_tokens: 5000,
        completion_tokens: 100,
        cache_creation_input_tokens: 1911,
        cache_write_tokens: 7,
      });
      assert.equal(normalized?.cache_creation_input_tokens, 1911);
    });
  });

  describe("buildCacheUsageLogMeta", () => {
    it("reports cache creation from the OpenAI-shaped nested key", () => {
      const meta = buildCacheUsageLogMeta({
        prompt_tokens: 5000,
        prompt_tokens_details: { cached_tokens: 0, cache_creation_tokens: 1911 },
      });
      assert.equal(meta?.cacheCreationTokens, 1911);
    });

    it("reports cache creation from the cache_write_tokens alias", () => {
      const meta = buildCacheUsageLogMeta({
        prompt_tokens: 5000,
        cache_write_tokens: 1911,
      });
      assert.equal(meta?.cacheCreationTokens, 1911);
    });

    it("still returns null when no cache field is present at all", () => {
      assert.equal(buildCacheUsageLogMeta({ prompt_tokens: 10, completion_tokens: 2 }), null);
    });
  });
});
