import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-search-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(
  provider: string,
  overrides: {
    apiKey?: string | null;
    authType?: string;
    providerSpecificData?: Record<string, unknown>;
  } = {}
) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey ?? "test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("v1 search GET lists all search providers", async () => {
  const response = await searchRoute.GET();
  const body = (await response.json()) as any;
  const ids = body.data.map((item: { id: string }) => item.id);

  assert.equal(response.status, 200);
  assert.equal(body.object, "list");
  assert.equal(body.data.length, 20);
  assert.deepEqual(ids, [
    "serper-search",
    "brave-search",
    "perplexity-search",
    "exa-search",
    "tavily-search",
    "nimble-search",
    "firecrawl",
    "google-pse-search",
    "linkup-search",
    "searchapi-search",
    "youcom-search",
    "searxng-search",
    "ollama-search",
    "zai-search",
    "jina-search",
    "context7",
    "duckduckgo-free",
    "x-search",
    "xquik-search",
    "anysearch-search",
  ]);
});

test("v1 search POST uses stored Linkup credentials and returns normalized results", async () => {
  await seedConnection("linkup-search", { apiKey: "linkup-key" });

  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = async (url, init = {}) => {
    capturedUrl = String(url);
    capturedInit = init;

    return new Response(
      JSON.stringify({
        results: [
          {
            name: "Linkup result",
            url: "https://example.com/article",
            content: "Linkup snippet",
            type: "web",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const response = await searchRoute.POST(
      new Request("http://localhost/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "omniroute linkup",
          provider: "linkup-search",
          max_results: 1,
          search_type: "web",
        }),
      })
    );
    const body = (await response.json()) as any;

    assert.equal(response.status, 200);
    assert.equal(capturedUrl, "https://api.linkup.so/v1/search");
    assert.equal(
      (capturedInit?.headers as Record<string, string>).Authorization,
      "Bearer linkup-key"
    );
    assert.equal(body.provider, "linkup-search");
    assert.equal(body.query, "omniroute linkup");
    assert.equal(body.results.length, 1);
    assert.equal(body.results[0].title, "Linkup result");
    assert.equal(body.results[0].snippet, "Linkup snippet");
    assert.equal(body.results[0].citation.provider, "linkup-search");
    assert.equal(body.cached, false);
    assert.equal(body.usage.queries_used, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("v1 search POST uses firecrawl credentials for unified firecrawl search", async () => {
  await seedConnection("firecrawl", { apiKey: "fc-route-key" });

  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = async (url, init = {}) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          web: [
            {
              title: "Firecrawl route hit",
              url: "https://example.com/fc",
              description: "From firecrawl via /v1/search",
            },
          ],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const response = await searchRoute.POST(
      new Request("http://localhost/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "omniroute firecrawl",
          provider: "firecrawl",
          max_results: 3,
          search_type: "web",
        }),
      })
    );
    const body = (await response.json()) as {
      provider: string;
      results: Array<{ title: string; snippet: string }>;
      usage: { queries_used: number };
    };

    assert.equal(response.status, 200);
    assert.equal(capturedUrl, "https://api.firecrawl.dev/v2/search");
    assert.equal(
      (capturedInit?.headers as Record<string, string>).Authorization,
      "Bearer fc-route-key"
    );
    const requestBody = JSON.parse(String(capturedInit?.body || "{}"));
    assert.equal(requestBody.query, "omniroute firecrawl");
    assert.equal(requestBody.limit, 3);
    assert.deepEqual(requestBody.sources, ["web"]);
    assert.equal(body.provider, "firecrawl");
    assert.equal(body.results.length, 1);
    assert.equal(body.results[0].title, "Firecrawl route hit");
    assert.equal(body.results[0].snippet, "From firecrawl via /v1/search");
    assert.equal(body.usage.queries_used, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("v1 search POST uses stored You.com credentials and returns unified news results", async () => {
  await seedConnection("youcom-search", { apiKey: "you-key" });

  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = async (url, init = {}) => {
    capturedUrl = String(url);
    capturedInit = init;

    return new Response(
      JSON.stringify({
        results: {
          web: [],
          news: [
            {
              title: "You.com news result",
              description: "Breaking update",
              page_age: "2026-04-23T12:00:00Z",
              url: "https://news.example.com/you",
              thumbnail_url: "https://news.example.com/thumb.png",
            },
          ],
        },
        metadata: { search_uuid: "uuid-1", latency: 0.42 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const response = await searchRoute.POST(
      new Request("http://localhost/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "latest ai regulation",
          provider: "youcom-search",
          max_results: 1,
          search_type: "news",
          time_range: "week",
          content: { full_page: true, format: "markdown" },
        }),
      })
    );
    const body = (await response.json()) as any;
    const url = new URL(capturedUrl);

    assert.equal(response.status, 200);
    assert.equal(url.origin + url.pathname, "https://ydc-index.io/v1/search");
    assert.equal(url.searchParams.get("query"), "latest ai regulation");
    assert.equal(url.searchParams.get("count"), "1");
    assert.equal(url.searchParams.get("freshness"), "week");
    assert.equal(url.searchParams.get("livecrawl"), "news");
    assert.equal(url.searchParams.get("livecrawl_formats"), "markdown");
    assert.equal((capturedInit?.headers as Record<string, string>)["X-API-Key"], "you-key");
    assert.equal(body.provider, "youcom-search");
    assert.equal(body.results.length, 1);
    assert.equal(body.results[0].title, "You.com news result");
    assert.equal(body.results[0].snippet, "Breaking update");
    assert.equal(body.results[0].citation.provider, "youcom-search");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("v1 search POST accepts authless SearXNG with provider_options baseUrl", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";

  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response(
      JSON.stringify({
        results: [
          {
            title: "SearXNG result",
            url: "https://searx.example/result",
            content: "Self-hosted response",
            engines: ["duckduckgo"],
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const response = await searchRoute.POST(
      new Request("http://localhost/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "self hosted meta search",
          provider: "searxng-search",
          search_type: "news",
          provider_options: {
            baseUrl: "http://127.0.0.1:9090/custom-search",
          },
        }),
      })
    );
    const body = (await response.json()) as any;

    assert.equal(response.status, 200);
    assert.equal(
      capturedUrl,
      "http://127.0.0.1:9090/custom-search/search?q=self+hosted+meta+search&format=json&categories=news"
    );
    assert.equal(body.provider, "searxng-search");
    assert.equal(body.results[0].title, "SearXNG result");
    assert.equal(body.results[0].citation.provider, "searxng-search");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("v1 search POST rejects authless SearXNG on the unconfigured catalog default base URL (#10976)", async () => {
  // #10976/#10981 (already merged on this base): the catalog-default
  // localhost:8888 always fails in Docker/K8s, so it's now skipped unless a
  // request/connection baseUrl override resolves it to a real URL. This
  // replaces the older "default URL is attempted as-is" expectation.
  const originalFetch = globalThis.fetch;
  let fetchCalled = false;

  globalThis.fetch = async (url) => {
    fetchCalled = true;
    return new Response(
      JSON.stringify({
        results: [
          {
            title: "Default SearXNG result",
            url: "https://searx.example/default",
            content: "Default self-hosted response",
            engines: ["duckduckgo"],
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const response = await searchRoute.POST(
      new Request("http://localhost/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "default self hosted meta search",
          provider: "searxng-search",
          search_type: "web",
        }),
      })
    );
    const body = (await response.json()) as any;

    assert.equal(response.status, 503);
    assert.equal(fetchCalled, false);
    assert.match(String(body.error?.message ?? body.error ?? ""), /catalog default/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("v1 search POST preserves stored SearXNG baseUrl for authless providers", async () => {
  await seedConnection("searxng-search", {
    apiKey: null,
    authType: "none",
    providerSpecificData: {
      baseUrl: "http://127.0.0.1:9090/custom-search",
    },
  });

  const originalFetch = globalThis.fetch;
  let capturedUrl = "";

  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response(
      JSON.stringify({
        results: [
          {
            title: "Stored SearXNG result",
            url: "https://searx.example/stored",
            content: "Stored self-hosted response",
            engines: ["duckduckgo"],
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const response = await searchRoute.POST(
      new Request("http://localhost/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "stored self hosted meta search",
          provider: "searxng-search",
          search_type: "web",
        }),
      })
    );
    const body = (await response.json()) as any;

    assert.equal(response.status, 200);
    assert.equal(
      capturedUrl,
      "http://127.0.0.1:9090/custom-search/search?q=stored+self+hosted+meta+search&format=json&categories=general"
    );
    assert.equal(body.provider, "searxng-search");
    assert.equal(body.results[0].title, "Stored SearXNG result");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("v1 search POST falls back to duckduckgo-free when no provider is configured (#11097)", async () => {
  // Contract changed by PR #11097 ("fix(search): fall back to duckduckgo-free when
  // no search provider is configured"): zero-credential /v1/search no longer returns
  // 400 — it promotes the fallback-only duckduckgo-free provider so out-of-the-box
  // search works. This test pins the NEW contract.
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";

  // DuckDuckGo lite HTML shape: result link + snippet cell (see
  // open-sse/services/freeWebSearch.ts parseDuckDuckGoLite).
  const liteHtml = `<html><body>
    <a href="https://example.com/auto-result" class='result-link'>Auto-selected DuckDuckGo result</a>
    <td class='result-snippet'>Fallback free search snippet</td>
  </body></html>`;

  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response(liteHtml, { status: 200, headers: { "content-type": "text/html" } });
  };

  try {
    const response = await searchRoute.POST(
      new Request("http://localhost/api/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: "auto select self hosted search",
          search_type: "web",
        }),
      })
    );
    const body = (await response.json()) as any;

    assert.equal(response.status, 200);
    assert.equal(
      capturedUrl,
      "https://lite.duckduckgo.com/lite/",
      "the fallback must call the DuckDuckGo lite endpoint"
    );
    assert.equal(body.provider, "duckduckgo-free");
    assert.equal(body.results[0].title, "Auto-selected DuckDuckGo result");
    assert.equal(body.results[0].url, "https://example.com/auto-result");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
