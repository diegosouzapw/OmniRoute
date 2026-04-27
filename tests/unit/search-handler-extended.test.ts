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

test("handleSearch builds Google PSE requests with key/cx query params and normalizes items", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl;

  globalThis.fetch = async (url) => {
    capturedUrl = String(url);

    return new Response(
      JSON.stringify({
        items: [
          {
            title: "Programmable result",
            link: "https://google.example.com/page",
            snippet: "Google snippet",
            pagemap: {
              cse_image: [{ src: "https://google.example.com/image.png" }],
            },
          },
        ],
        searchInformation: { totalResults: "42" },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "google custom search",
      provider: "google-pse-search",
      maxResults: 3,
      searchType: "web",
      country: "US",
      language: "en",
      credentials: { apiKey: "google-key", providerSpecificData: { cx: "engine-id" } },
      log: null,
    });

    const url = new URL(capturedUrl);
    assert.equal(url.origin + url.pathname, "https://www.googleapis.com/customsearch/v1");
    assert.equal(url.searchParams.get("key"), "google-key");
    assert.equal(url.searchParams.get("cx"), "engine-id");
    assert.equal(url.searchParams.get("q"), "google custom search");
    assert.equal(url.searchParams.get("num"), "3");
    assert.equal(result.success, true);
    assert.equal(result.data.results[0].metadata.image_url, "https://google.example.com/image.png");
    assert.equal(result.data.metrics.total_results_available, 42);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch builds Linkup requests and normalizes searchResults payload", async () => {
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
          {
            name: "Linkup result",
            url: "https://linkup.example.com/page",
            content: "Retrieved content",
            type: "web",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "linkup test",
      provider: "linkup-search",
      maxResults: 4,
      searchType: "web",
      domainFilter: ["example.com", "-blocked.com"],
      credentials: { apiKey: "linkup-key" },
      log: null,
    });

    assert.equal(captured.url, "https://api.linkup.so/v1/search");
    assert.equal(captured.headers.Authorization, "Bearer linkup-key");
    assert.deepEqual(captured.body, {
      q: "linkup test",
      depth: "standard",
      outputType: "searchResults",
      maxResults: 4,
      includeDomains: ["example.com"],
      excludeDomains: ["blocked.com"],
    });
    assert.equal(result.success, true);
    assert.equal(result.data.results[0].title, "Linkup result");
    assert.equal(result.data.results[0].content.text, "Retrieved content");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch builds SearchAPI requests and normalizes organic results", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl;

  globalThis.fetch = async (url) => {
    capturedUrl = String(url);

    return new Response(
      JSON.stringify({
        search_information: { total_results: 18 },
        organic_results: [
          {
            title: "SearchAPI result",
            link: "https://searchapi.example.com/page",
            snippet: "SearchAPI snippet",
            date: "2026-04-06",
            source: "SearchAPI Source",
            thumbnail: "https://searchapi.example.com/thumb.png",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "searchapi query",
      provider: "searchapi-search",
      maxResults: 2,
      searchType: "news",
      country: "US",
      language: "en",
      credentials: { apiKey: "searchapi-key" },
      log: null,
    });

    const url = new URL(capturedUrl);
    assert.equal(url.origin + url.pathname, "https://www.searchapi.io/api/v1/search");
    assert.equal(url.searchParams.get("engine"), "google_news");
    assert.equal(url.searchParams.get("api_key"), "searchapi-key");
    assert.equal(url.searchParams.get("gl"), "us");
    assert.equal(url.searchParams.get("hl"), "en");
    assert.equal(result.success, true);
    assert.equal(result.data.results[0].metadata.author, "SearchAPI Source");
    assert.equal(
      result.data.results[0].metadata.image_url,
      "https://searchapi.example.com/thumb.png"
    );
    assert.equal(result.data.metrics.total_results_available, 18);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch builds You.com requests with livecrawl and normalizes unified response sections", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl;
  let capturedHeaders;

  globalThis.fetch = async (url, init = {}) => {
    capturedUrl = String(url);
    capturedHeaders = init.headers;

    return new Response(
      JSON.stringify({
        results: {
          web: [
            {
              title: "You.com result",
              url: "https://you.example.com/page",
              description: "Fallback description",
              snippets: ["Primary snippet"],
              page_age: "2026-04-23T10:00:00Z",
              favicon_url: "https://you.example.com/favicon.ico",
              thumbnail_url: "https://you.example.com/thumb.png",
              markdown: "# Full page markdown",
            },
          ],
          news: [],
        },
        metadata: { search_uuid: "uuid-1", latency: 0.5 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "you search",
      provider: "youcom-search",
      maxResults: 2,
      searchType: "web",
      country: "US",
      language: "en",
      timeRange: "week",
      offset: 4,
      domainFilter: ["docs.you.com"],
      contentOptions: { full_page: true, format: "markdown" },
      credentials: { apiKey: "you-key" },
      log: null,
    });

    const url = new URL(capturedUrl);
    assert.equal(url.origin + url.pathname, "https://ydc-index.io/v1/search");
    assert.equal(url.searchParams.get("query"), "you search");
    assert.equal(url.searchParams.get("count"), "2");
    assert.equal(url.searchParams.get("freshness"), "week");
    assert.equal(url.searchParams.get("offset"), "2");
    assert.equal(url.searchParams.get("country"), "US");
    assert.equal(url.searchParams.get("language"), "en");
    assert.equal(url.searchParams.get("include_domains"), "docs.you.com");
    assert.equal(url.searchParams.get("livecrawl"), "web");
    assert.equal(url.searchParams.get("livecrawl_formats"), "markdown");
    assert.equal(capturedHeaders["X-API-Key"], "you-key");
    assert.equal(result.success, true);
    assert.equal(result.data.provider, "youcom-search");
    assert.equal(result.data.results[0].snippet, "Primary snippet");
    assert.equal(result.data.results[0].content?.format, "markdown");
    assert.equal(result.data.results[0].content?.text, "# Full page markdown");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch builds SearXNG requests with custom baseUrl and no apiKey", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl;

  globalThis.fetch = async (url) => {
    capturedUrl = String(url);

    return new Response(
      JSON.stringify({
        results: [
          {
            title: "SearXNG result",
            url: "https://searx.example.com/page",
            content: "Metasearch snippet",
            publishedDate: "2026-04-07",
            engines: ["duckduckgo", "brave"],
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "privacy search",
      provider: "searxng-search",
      maxResults: 5,
      searchType: "news",
      language: "pt-BR",
      credentials: {
        providerSpecificData: { baseUrl: "http://localhost:9999" },
      },
      log: null,
    });

    const url = new URL(capturedUrl);
    assert.equal(url.origin + url.pathname, "http://localhost:9999/search");
    assert.equal(url.searchParams.get("format"), "json");
    assert.equal(url.searchParams.get("categories"), "news");
    assert.equal(url.searchParams.get("language"), "pt-BR");
    assert.equal(result.success, true);
    assert.equal(result.data.provider, "searxng-search");
    assert.equal(result.data.results[0].metadata.source_type, "duckduckgo, brave");
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
