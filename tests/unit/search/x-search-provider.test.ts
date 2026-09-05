import test from "node:test";
import assert from "node:assert/strict";

const {
  SEARCH_PROVIDERS,
  SEARCH_CREDENTIAL_FALLBACKS,
  getSearchProvider,
  selectProvider,
  supportsSearchType,
  getSearchCredentialFallbacks,
} = await import("../../../open-sse/config/searchRegistry.ts");

const { buildXSearchRequest, extractXSearchHits, titleFromXUrl, X_SEARCH_PROVIDER_ID } =
  await import("../../../open-sse/handlers/search/xSearch.ts");

const { handleSearch } = await import("../../../open-sse/handlers/search.ts");
const { v1SearchSchema } = await import("../../../src/shared/validation/schemas.ts");

test("x-search is registered for search_type x only", () => {
  const cfg = getSearchProvider(X_SEARCH_PROVIDER_ID);
  assert.ok(cfg);
  assert.equal(cfg!.id, "x-search");
  assert.equal(cfg!.baseUrl, "https://api.x.ai/v1/responses");
  assert.deepEqual(cfg!.searchTypes, ["x"]);
  assert.equal(supportsSearchType(cfg, "x"), true);
  assert.equal(supportsSearchType(cfg, "web"), false);
  assert.equal(supportsSearchType(cfg, "news"), false);
});

test("auto-select for web never picks x-search", () => {
  const picked = selectProvider(undefined, "web");
  assert.ok(picked);
  assert.notEqual(picked!.id, "x-search");
});

test("auto-select without searchType defaults to web and skips x-search", () => {
  const picked = selectProvider();
  assert.ok(picked);
  assert.notEqual(picked!.id, "x-search");
});

test("auto-select for search_type x picks x-search", () => {
  const picked = selectProvider(undefined, "x");
  assert.ok(picked);
  assert.equal(picked!.id, "x-search");
});

test("explicit x-search + search_type x is selected", () => {
  const picked = selectProvider("x-search", "x");
  assert.ok(picked);
  assert.equal(picked!.id, "x-search");
});

test("explicit x-search + search_type web is rejected", () => {
  assert.equal(selectProvider("x-search", "web"), null);
});

test("x-search reuses SuperGrok / xAI credentials", () => {
  assert.deepEqual(getSearchCredentialFallbacks("x-search"), ["xai-oauth", "xao", "xai"]);
  assert.deepEqual(getSearchCredentialFallbacks("perplexity-search"), ["perplexity"]);
  assert.equal("x-search" in SEARCH_CREDENTIAL_FALLBACKS, true);
});

test("titleFromXUrl extracts handle from status URLs", () => {
  assert.equal(titleFromXUrl("https://x.com/xai/status/123"), "@xai");
  assert.equal(titleFromXUrl("https://twitter.com/elonmusk/status/1"), "@elonmusk");
});

test("extractXSearchHits prefers x.com citations", () => {
  const hits = extractXSearchHits(
    {
      citations: ["https://example.com/blog", "https://x.com/xai/status/99"],
      output_text: "People are talking about SuperGrok on X.",
    },
    "SuperGrok",
    5
  );
  assert.equal(hits.length, 1);
  assert.equal(hits[0].url, "https://x.com/xai/status/99");
  assert.equal(hits[0].title, "@xai");
  assert.match(hits[0].snippet, /SuperGrok/);
});

test("extractXSearchHits walks Responses output annotations", () => {
  const hits = extractXSearchHits(
    {
      output: [
        {
          type: "message",
          content: [
            {
              type: "output_text",
              text: "Latest from xAI.",
              annotations: [{ type: "url_citation", url: "https://x.com/xai/status/42" }],
            },
          ],
        },
      ],
    },
    "xAI",
    5
  );
  assert.equal(hits[0].url, "https://x.com/xai/status/42");
  assert.equal(hits[0].snippet, "Latest from xAI.");
});

test("buildXSearchRequest posts native x_search to api.x.ai", () => {
  const cfg = SEARCH_PROVIDERS["x-search"];
  const { url, init } = buildXSearchRequest(cfg, {
    query: "SuperGrok from handle xai",
    maxResults: 5,
    token: "sg-test",
    timeRange: "week",
    domainFilter: ["xai", "@grok"],
  });
  assert.equal(url, "https://api.x.ai/v1/responses");
  const headers = init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer sg-test");
  const body = JSON.parse(String(init.body));
  assert.equal(body.model, "grok-4.6");
  assert.equal(body.stream, false);
  assert.equal(body.input, "SuperGrok from handle xai");
  assert.equal(body.tools[0].type, "x_search");
  assert.equal(typeof body.tools[0].from_date, "string");
  assert.deepEqual(body.tools[0].allowed_x_handles, ["xai", "grok"]);
});

test("v1SearchSchema accepts x-search and search_type x", () => {
  const parsed = v1SearchSchema.parse({
    query: "SuperGrok",
    provider: "x-search",
    search_type: "x",
  });
  assert.equal(parsed.provider, "x-search");
  assert.equal(parsed.search_type, "x");
});

test("v1SearchSchema coerces x_search alias and forces search_type x", () => {
  const parsed = v1SearchSchema.parse({
    query: "SuperGrok",
    provider: "x_search",
    search_type: "web",
  });
  assert.equal(parsed.provider, "x-search");
  assert.equal(parsed.search_type, "x");
});

test("handleSearch x-search maps xAI citations into search results", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = (async (url, init) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response(
      JSON.stringify({
        output_text: "Cited SuperGrok discussion.",
        citations: ["https://x.com/xai/status/7"],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const result = await handleSearch({
      query: "SuperGrok",
      provider: "x-search",
      maxResults: 5,
      searchType: "x",
      credentials: { apiKey: "xai-oauth-token" },
      log: null,
    });
    assert.equal(result.success, true, JSON.stringify(result));
    assert.equal(capturedUrl, "https://api.x.ai/v1/responses");
    const body = JSON.parse(String(capturedInit?.body || "{}"));
    assert.equal(body.tools[0].type, "x_search");
    assert.equal(result.data!.provider, "x-search");
    assert.equal(result.data!.results[0].url, "https://x.com/xai/status/7");
    assert.equal(result.data!.results[0].title, "@xai");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
