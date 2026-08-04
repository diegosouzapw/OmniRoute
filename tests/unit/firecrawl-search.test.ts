/**
 * tests/unit/firecrawl-search.test.ts
 *
 * Firecrawl as a unified /v1/search + /v1/web/fetch provider id `firecrawl`:
 * - registry entry id `firecrawl` (no firecrawl-search split, no credential fallback)
 * - request builder uses Firecrawl POST /v2/search + sources web|news
 * - FIRECRAWL_BASE_URL self-host root (same env as firecrawl-fetch)
 * - response normalization for v2 buckets only (data.web / data.news)
 * - handleSearch path with mocked fetch
 */

import test from "node:test";
import assert from "node:assert/strict";

const { SEARCH_PROVIDERS, SEARCH_CREDENTIAL_FALLBACKS, getSearchProvider, selectProvider } =
  await import("../../open-sse/config/searchRegistry.ts");
const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { v1SearchSchema } = await import("../../src/shared/validation/schemas.ts");

test("firecrawl is registered and selects cleanly", () => {
  const cfg = getSearchProvider("firecrawl");
  assert.ok(cfg, "firecrawl must exist in SEARCH_PROVIDERS");
  assert.equal(cfg!.id, "firecrawl");
  assert.equal(cfg!.method, "POST");
  assert.equal(cfg!.authType, "apikey");
  assert.equal(cfg!.authHeader, "bearer");
  assert.equal(cfg!.baseUrl, "https://api.firecrawl.dev/v2/search");
  assert.equal(cfg!.costPerQuery, 0.002);
  assert.equal(cfg!.freeMonthlyQuota, 1000);
  assert.deepEqual(cfg!.searchTypes, ["web", "news"]);
  assert.equal(SEARCH_CREDENTIAL_FALLBACKS["firecrawl"], undefined);

  const selectedWeb = selectProvider("firecrawl", "web");
  assert.equal(selectedWeb?.id, "firecrawl");
  const selectedNews = selectProvider("firecrawl", "news");
  assert.equal(selectedNews?.id, "firecrawl");
});

test("dashboard resolves firecrawl under search category", async () => {
  const providerPageUtils =
    await import("../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts");
  const providers = await import("../../src/shared/constants/providers.ts");
  const info = providerPageUtils.resolveDashboardProviderInfo("firecrawl");
  assert.equal(info?.category, "search");
  assert.equal(info?.name, providers.SEARCH_PROVIDERS.firecrawl.name);
});

test("v1SearchSchema accepts firecrawl for search (unified id)", () => {
  const ok = v1SearchSchema.safeParse({ query: "q", provider: "firecrawl" });
  assert.equal(ok.success, true);
  const news = v1SearchSchema.safeParse({
    query: "q",
    provider: "firecrawl",
    search_type: "news",
  });
  assert.equal(news.success, true);
  const legacy = v1SearchSchema.safeParse({ query: "q", provider: "firecrawl-search" });
  assert.equal(legacy.success, false, "legacy firecrawl-search id is not accepted");
});

test("handleSearch firecrawl hits /v2/search with sources web and normalizes data.web", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = async (url, init) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          web: [
            {
              url: "https://example.com/a",
              title: "Alpha",
              description: "First hit",
            },
            {
              url: "https://example.com/b",
              title: "Beta",
              description: "Second hit",
            },
          ],
          news: [
            {
              url: "https://news.example/ignored-on-web",
              title: "Ignored",
              snippet: "news bucket must not leak into web",
            },
          ],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "omniroute search",
      provider: "firecrawl",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "fc-test-key" },
      log: null,
    });

    assert.equal(result.success, true, `expected success, got ${JSON.stringify(result)}`);
    assert.equal(capturedUrl, "https://api.firecrawl.dev/v2/search");
    const headers = capturedInit?.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer fc-test-key");
    const body = JSON.parse(String(capturedInit?.body || "{}"));
    assert.equal(body.query, "omniroute search");
    assert.equal(body.limit, 5);
    assert.deepEqual(body.sources, ["web"]);

    assert.ok(result.data?.results?.length === 2);
    assert.equal(result.data!.results[0].title, "Alpha");
    assert.equal(result.data!.results[0].url, "https://example.com/a");
    assert.equal(result.data!.results[0].snippet, "First hit");
    assert.equal(result.data!.provider, "firecrawl");
    assert.equal(result.data!.usage.search_cost_usd, 0.002);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch firecrawl maps search_type news to sources news", async () => {
  const originalFetch = globalThis.fetch;
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = async (_url, init) => {
    capturedInit = init;
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          news: [
            {
              title: "Breaking",
              url: "https://news.example/story",
              snippet: "Headline blurb",
              date: "2026-07-01T12:00:00Z",
              imageUrl: "https://news.example/img.png",
            },
          ],
          web: [
            {
              url: "https://web.example/ignored-on-news",
              title: "Web only",
              description: "must not leak into news",
            },
          ],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "latest ai",
      provider: "firecrawl",
      maxResults: 3,
      searchType: "news",
      timeRange: "week",
      country: "US",
      language: "en",
      domainFilter: ["reuters.com", "-example.com"],
      credentials: { apiKey: "fc-news-key" },
      log: null,
    });

    assert.equal(result.success, true, JSON.stringify(result));
    const body = JSON.parse(String(capturedInit?.body || "{}"));
    assert.deepEqual(body.sources, ["news"]);
    assert.equal(body.tbs, "qdr:w");
    assert.equal(body.country, "us");
    assert.equal(body.lang, "en");
    assert.deepEqual(body.includeDomains, ["reuters.com"]);
    assert.deepEqual(body.excludeDomains, ["example.com"]);

    assert.equal(result.data!.results.length, 1);
    assert.equal(result.data!.results[0].title, "Breaking");
    assert.equal(result.data!.results[0].url, "https://news.example/story");
    assert.equal(result.data!.results[0].snippet, "Headline blurb");
    assert.equal(result.data!.results[0].published_at, "2026-07-01T12:00:00Z");
    assert.equal(result.data!.results[0].metadata?.image_url, "https://news.example/img.png");
    assert.equal(result.data!.results[0].metadata?.source_type, "news");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch firecrawl honors FIRECRAWL_BASE_URL self-host root", async () => {
  const originalFetch = globalThis.fetch;
  const prev = process.env.FIRECRAWL_BASE_URL;
  process.env.FIRECRAWL_BASE_URL = "http://127.0.0.1:3002";
  let capturedUrl = "";

  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response(
      JSON.stringify({
        data: { web: [{ url: "https://local.test", title: "Local", description: "ok" }] },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleSearch({
      query: "selfhost",
      provider: "firecrawl",
      maxResults: 3,
      searchType: "web",
      credentials: { apiKey: "optional-selfhost" },
      log: null,
    });

    assert.equal(result.success, true, JSON.stringify(result));
    assert.equal(capturedUrl, "http://127.0.0.1:3002/v2/search");
    assert.equal(result.data!.results[0].title, "Local");
  } finally {
    globalThis.fetch = originalFetch;
    if (prev === undefined) delete process.env.FIRECRAWL_BASE_URL;
    else process.env.FIRECRAWL_BASE_URL = prev;
  }
});

test("handleSearch firecrawl ignores legacy v1 envelopes", async () => {
  const originalFetch = globalThis.fetch;
  let call = 0;

  globalThis.fetch = async () => {
    call += 1;
    if (call === 1) {
      return new Response(
        JSON.stringify({
          data: [{ url: "https://d.example", title: "D", description: "from data array" }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (call === 2) {
      return new Response(
        JSON.stringify({
          results: [{ url: "https://r.example", title: "R", snippet: "from results" }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        web: [{ url: "https://w.example", title: "W", description: "from web" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const fromData = await handleSearch({
      query: "data-shape",
      provider: "firecrawl",
      maxResults: 1,
      searchType: "web",
      credentials: { apiKey: "fc-key" },
      log: null,
    });
    assert.equal(fromData.success, true, JSON.stringify(fromData));
    assert.equal(fromData.data!.results.length, 0);

    const fromResults = await handleSearch({
      query: "results-shape",
      provider: "firecrawl",
      maxResults: 1,
      searchType: "web",
      credentials: { apiKey: "fc-key" },
      log: null,
    });
    assert.equal(fromResults.success, true, JSON.stringify(fromResults));
    assert.equal(fromResults.data!.results.length, 0);

    const fromWeb = await handleSearch({
      query: "web-shape",
      provider: "firecrawl",
      maxResults: 1,
      searchType: "web",
      credentials: { apiKey: "fc-key" },
      log: null,
    });
    assert.equal(fromWeb.success, true, JSON.stringify(fromWeb));
    assert.equal(fromWeb.data!.results.length, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("SEARCH_PROVIDERS still exposes duckduckgo-free as fallbackOnly", () => {
  assert.equal(SEARCH_PROVIDERS["duckduckgo-free"].fallbackOnly, true);
});
