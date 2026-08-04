import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-perplexity-search-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");

test("Perplexity Search forwards validated provider options and locale filters", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      headers: init.headers,
      body: JSON.parse(String(init.body || "{}")),
    };
    return new Response(
      JSON.stringify({
        results: [
          { title: "One", url: "https://one.example.com", snippet: "First" },
          { title: "Two", url: "https://two.example.com", snippet: "Second" },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "ai agents",
      provider: "perplexity-search",
      maxResults: 1,
      searchType: "web",
      country: "US",
      language: "en",
      timeRange: "week",
      domainFilter: ["example.com"],
      providerOptions: {
        max_tokens: 4000,
        max_tokens_per_page: 1000,
        search_language_filter: ["EN", "ko"],
        last_updated_after_filter: "06/01/2026",
        search_before_date_filter: "07/01/2026",
      },
      credentials: { apiKey: "perplexity-key" },
      log: null,
    });

    assert.equal(captured.url, "https://api.perplexity.ai/search");
    assert.equal(captured.headers.Authorization, "Bearer perplexity-key");
    assert.deepEqual(captured.body, {
      query: "ai agents",
      max_results: 1,
      country: "US",
      search_language_filter: ["en", "ko"],
      search_domain_filter: ["example.com"],
      search_recency_filter: "week",
      max_tokens: 4000,
      max_tokens_per_page: 1000,
      last_updated_after_filter: "06/01/2026",
      search_before_date_filter: "07/01/2026",
    });
    assert.equal(result.success, true);
    assert.equal(result.data.results.length, 1);
    assert.equal(result.data.usage.queries_used, 1);
    assert.equal(result.data.usage.search_cost_usd, 0.005);

    const localeResult = await handleSearch({
      query: "localized search",
      provider: "perplexity-search",
      maxResults: 1,
      searchType: "web",
      language: "en-US",
      credentials: { apiKey: "perplexity-key" },
      log: null,
    });
    assert.equal(localeResult.success, true);
    assert.deepEqual(captured.body.search_language_filter, ["en"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Perplexity Search rejects mixed domain allowlist and denylist filters", async () => {
  const result = await handleSearch({
    query: "ai agents",
    provider: "perplexity-search",
    maxResults: 5,
    searchType: "web",
    domainFilter: ["example.com", "-spam.com"],
    credentials: { apiKey: "perplexity-key" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /either include_domains or exclude_domains/);
});
