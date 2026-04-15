import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");

test("handleSearch builds Serper web requests and normalizes organic results", async () => {
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
        organic: [
          {
            title: "Latest AI",
            link: "https://www.example.com/news?id=1",
            snippet: "Top story",
            date: "2026-04-05",
          },
          {
            title: "Second",
            link: "https://docs.example.com/page",
            description: "Fallback description",
          },
        ],
        searchParameters: { totalResults: 20 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "  latest   ai  ",
      provider: "serper-search",
      maxResults: 3,
      searchType: "web",
      country: "US",
      language: "en",
      credentials: { apiKey: "serper-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://google.serper.dev/search");
    assert.equal(captured.headers["X-API-Key"], "serper-key");
    assert.deepEqual(captured.body, {
      q: "latest ai",
      num: 3,
      gl: "us",
      hl: "en",
    });
    assert.equal(result.data.provider, "serper-search");
    assert.equal(result.data.query, "latest ai");
    assert.equal(result.data.results[0].display_url, "example.com/news");
    assert.equal(result.data.results[0].citation.provider, "serper-search");
    assert.equal(result.data.metrics.total_results_available, 20);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch builds Brave news requests and normalizes favicon metadata", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl;
  let capturedHeaders;

  globalThis.fetch = async (url, init = {}) => {
    capturedUrl = String(url);
    capturedHeaders = init.headers;

    return new Response(
      JSON.stringify({
        results: [
          {
            title: "Brave item",
            url: "https://news.example.com/story",
            description: "Breaking news",
            age: "2026-04-05",
            meta_url: { favicon: "https://news.example.com/favicon.ico" },
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "market update",
      provider: "brave-search",
      maxResults: 1,
      searchType: "news",
      country: "BR",
      language: "pt",
      credentials: { apiKey: "brave-key" },
      log: null,
    });

    const url = new URL(capturedUrl);
    assert.equal(url.origin + url.pathname, "https://api.search.brave.com/res/v1/news/search");
    assert.equal(url.searchParams.get("q"), "market update");
    assert.equal(url.searchParams.get("count"), "1");
    assert.equal(url.searchParams.get("country"), "BR");
    assert.equal(url.searchParams.get("search_lang"), "pt");
    assert.equal(capturedHeaders["X-Subscription-Token"], "brave-key");
    assert.equal(result.success, true);
    assert.equal(result.data.results[0].favicon_url, "https://news.example.com/favicon.ico");
    assert.equal(result.data.results[0].published_at, "2026-04-05");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch builds Perplexity requests, forwards filters, and enforces maxResults", async () => {
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
          { title: "One", url: "https://one.example.com", snippet: "First", date: "2026-04-05" },
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
      domainFilter: ["example.com", "-spam.com"],
      credentials: { apiKey: "perplexity-key" },
      log: null,
    });

    assert.equal(captured.url, "https://api.perplexity.ai/search");
    assert.equal(captured.headers.Authorization, "Bearer perplexity-key");
    assert.deepEqual(captured.body, {
      query: "ai agents",
      max_results: 1,
      country: "US",
      search_language_filter: ["en"],
      search_domain_filter: ["example.com", "-spam.com"],
    });
    assert.equal(result.success, true);
    assert.equal(result.data.results.length, 1);
    assert.equal(result.data.usage.queries_used, 1);
    assert.equal(result.data.usage.search_cost_usd, 0.005);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch builds Exa requests with include/exclude domains and preserves rich result fields", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, init = {}) => {
    captured = JSON.parse(String(init.body || "{}"));

    return new Response(
      JSON.stringify({
        results: [
          {
            title: "Exa result",
            url: "https://exa.example.com/page",
            highlights: ["Highlighted snippet"],
            score: 1.2,
            publishedDate: "2026-04-04",
            favicon: "https://exa.example.com/favicon.ico",
            author: "Author",
            image: "https://exa.example.com/image.png",
            text: "Full document text",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "agentic workflows",
      provider: "exa-search",
      maxResults: 5,
      searchType: "news",
      domainFilter: ["allowed.com", "-blocked.com"],
      credentials: { apiKey: "exa-key" },
      log: null,
    });

    assert.deepEqual(captured, {
      query: "agentic workflows",
      numResults: 5,
      type: "auto",
      text: true,
      highlights: true,
      includeDomains: ["allowed.com"],
      excludeDomains: ["blocked.com"],
      category: "news",
    });
    assert.equal(result.success, true);
    assert.equal(result.data.results[0].snippet, "Highlighted snippet");
    assert.equal(result.data.results[0].score, 1);
    assert.equal(result.data.results[0].content.text, "Full document text");
    assert.equal(result.data.results[0].metadata.author, "Author");
    assert.equal(result.data.results[0].metadata.image_url, "https://exa.example.com/image.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch builds Tavily requests with topic and raw content normalization", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (_url, init = {}) => {
    captured = JSON.parse(String(init.body || "{}"));

    return new Response(
      JSON.stringify({
        results: [
          {
            title: "Tavily result",
            url: "https://tavily.example.com/page",
            content: "Summary",
            score: 0.7,
            published_date: "2026-04-03",
            raw_content: "Long form content",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "policy changes",
      provider: "tavily-search",
      maxResults: 2,
      searchType: "news",
      country: "us",
      domainFilter: ["good.com", "-bad.com"],
      credentials: { apiKey: "tavily-key" },
      log: null,
    });

    assert.deepEqual(captured, {
      query: "policy changes",
      max_results: 2,
      topic: "news",
      include_domains: ["good.com"],
      exclude_domains: ["bad.com"],
      country: "us",
    });
    assert.equal(result.success, true);
    assert.equal(result.data.results[0].snippet, "Summary");
    assert.equal(result.data.results[0].content.text, "Long form content");
    assert.equal(result.data.results[0].citation.rank, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch rejects queries with invalid control characters", async () => {
  const result = await handleSearch({
    query: "bad\u0000query",
    provider: "serper-search",
    maxResults: 5,
    searchType: "web",
    credentials: { apiKey: "x" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(result.error, "Query contains invalid control characters");
});

test("handleSearch rejects queries that become empty after normalization", async () => {
  const result = await handleSearch({
    query: "   \n\t   ",
    provider: "serper-search",
    maxResults: 5,
    searchType: "web",
    credentials: { apiKey: "x" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(result.error, "Query is empty after normalization");
});

test("handleSearch rejects unknown providers", async () => {
  const result = await handleSearch({
    query: "hello",
    provider: "unknown-search",
    maxResults: 5,
    searchType: "web",
    credentials: { apiKey: "x" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(result.error, "Unknown search provider: unknown-search");
});

test("handleSearch requires credentials for the configured provider", async () => {
  const result = await handleSearch({
    query: "hello",
    provider: "serper-search",
    maxResults: 5,
    searchType: "web",
    credentials: {},
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(result.error, "No credentials for search provider: serper-search");
});

test("handleSearch fails over to the alternate provider on retriable upstream errors", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url) => {
    calls.push(String(url));

    if (String(url).startsWith("https://google.serper.dev/")) {
      return new Response("upstream broken", { status: 500 });
    }

    return new Response(
      JSON.stringify({
        web: {
          results: [
            {
              title: "Fallback result",
              url: "https://fallback.example.com",
              description: "Recovered",
            },
          ],
          totalCount: 1,
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "fallback test",
      provider: "serper-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "serper-key" },
      alternateProvider: "brave-search",
      alternateCredentials: { apiKey: "brave-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.deepEqual(calls, [
      "https://google.serper.dev/search",
      "https://api.search.brave.com/res/v1/web/search?q=fallback+test&count=5",
    ]);
    assert.equal(result.data.provider, "brave-search");
    assert.equal(result.data.results[0].title, "Fallback result");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch does not fail over on non-retriable upstream errors", async () => {
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount += 1;
    return new Response("unauthorized", { status: 401 });
  };

  try {
    const result = await handleSearch({
      query: "no failover",
      provider: "serper-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "serper-key" },
      alternateProvider: "brave-search",
      alternateCredentials: { apiKey: "brave-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(result.error, "Search provider serper-search returned 401");
    assert.equal(callCount, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
