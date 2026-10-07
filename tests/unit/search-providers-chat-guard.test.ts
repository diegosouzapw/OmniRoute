// Probe for issue #10274 -- "Search providers (tavily/exa/firecrawl) leak API keys to
// api.openai.com when used as chat/combo targets".
//
// Search-only providers (tavily-search, exa-search, firecrawl, serper-search, ...) exist
// ONLY in SEARCH_PROVIDERS (open-sse/config/searchRegistry.ts) + the /v1/search catalog;
// they have no chat REGISTRY entry and no specialized executor. Routing one of them as a
// chat-completions target (e.g. a round-robin combo with targets "tavily-search/web")
// therefore fell through to DefaultExecutor's `PROVIDERS[provider] || PROVIDERS.openai`
// fallback, which forwarded the user's real search API key to https://api.openai.com
// (observed as `[401] Incorrect API key provided: tvly-...` from OpenAI, not from Tavily).
// This probe proves the executor-level root cause directly and pins the guard: getExecutor()
// must throw a clear, sanitized 400 for every search provider instead of silently inheriting
// OpenAI's base URL/config. The guard set is DERIVED from SEARCH_PROVIDERS so adding a new
// search provider without updating the guard fails this test.
import test from "node:test";
import assert from "node:assert/strict";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { SEARCH_PROVIDERS } from "../../open-sse/config/searchRegistry.ts";

const SEARCH_PROVIDER_IDS = Object.keys(SEARCH_PROVIDERS);

test("#10274: no search provider has a specialized chat executor", () => {
  for (const id of SEARCH_PROVIDER_IDS) {
    assert.equal(
      hasSpecializedExecutor(id),
      false,
      `search provider '${id}' must not have a specialized chat executor`
    );
  }
});

test("#10274: a chat-completion request routed to a search provider must not silently hit OpenAI's endpoint", async () => {
  // Desired behavior: search providers (registered only in SEARCH_PROVIDERS, never in the
  // chat REGISTRY) must not silently resolve to OpenAI's chat/completions endpoint when
  // routed through the normal chat-completions executor path. getExecutor() must throw a
  // clear, sanitized error for this set instead of falling through to DefaultExecutor's
  // `PROVIDERS.openai` fallback (which produced the "Incorrect API key provided: tvly-..."
  // OpenAI error the reporter saw for genuine Tavily/Exa/Firecrawl keys). Before the fix,
  // getExecutor("tavily-search") returned a working executor whose buildUrl() resolved to
  // OpenAI's endpoint -- this assertion FAILS on unfixed release/v3.8.50 code because no
  // error is thrown at all.
  for (const id of SEARCH_PROVIDER_IDS) {
    await assert.rejects(
      getExecutor(id),
      (err: Error & { status?: number }) => {
        assert.match(err.message, /search provider/i);
        assert.match(err.message, /does not support chat completions/i);
        assert.match(err.message, /\/v1\/search/i);
        assert.equal(err.status, 400);
        return true;
      },
      `search provider '${id}' must raise a clear error instead of inheriting OpenAI's base URL/config`
    );
  }
});
