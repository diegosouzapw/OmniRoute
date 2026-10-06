import test from "node:test";
import assert from "node:assert/strict";

const { SEARCH_PROVIDERS, getSearchProvider, resolveSearchProvider, supportsSearchType } =
  await import("../../open-sse/config/searchRegistry.ts");
const { SEARCH_VALIDATOR_CONFIGS } =
  await import("../../src/lib/providers/validation/searchProviders.ts");
const {
  ANYSEARCH_SEARCH_PROVIDER_ID,
  AnysearchSearchEnvelopeError,
  buildAnysearchSearchRequest,
  detectAnysearchEnvelopeError,
  extractAnysearchSearchItems,
} = await import("../../open-sse/handlers/search/anysearchSearch.ts");
const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { v1SearchSchema, v1WebFetchSchema } = await import("../../src/shared/validation/schemas.ts");
const { webFetchInput } = await import("../../open-sse/mcp-server/schemas/tools.ts");

test("anysearch-search is a fallback-only web provider with the upstream 10-result cap", () => {
  const config = getSearchProvider(ANYSEARCH_SEARCH_PROVIDER_ID);
  assert.ok(config);
  assert.equal(config.id, "anysearch-search");
  assert.equal(config.baseUrl, "https://api.anysearch.com/v1/search");
  assert.equal(config.authHeader, "bearer");
  assert.equal(config.fallbackOnly, true);
  assert.equal(config.costPerQuery, 0);
  assert.deepEqual(config.searchTypes, ["web"]);
  assert.equal(config.maxMaxResults, 10);
  assert.equal(supportsSearchType(config, "web"), true);
  assert.equal(supportsSearchType(config, "news"), false);
});

test("anysearch aliases resolve to the canonical id", () => {
  assert.equal(resolveSearchProvider("anysearch")?.id, "anysearch-search");
  assert.equal(resolveSearchProvider("anysearch_search")?.id, "anysearch-search");
  assert.equal(resolveSearchProvider("anysearch-search")?.id, "anysearch-search");
});

test("buildAnysearchSearchRequest uses the published REST contract", () => {
  const config = SEARCH_PROVIDERS["anysearch-search"];
  const { url, init } = buildAnysearchSearchRequest(config, {
    query: "omniroute gateway",
    maxResults: 3,
    token: "as_sk_test",
  });
  assert.equal(url, "https://api.anysearch.com/v1/search");
  assert.equal(init.method, "POST");
  const headers = init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer as_sk_test");
  assert.deepEqual(JSON.parse(String(init.body)), { query: "omniroute gateway", max_results: 3 });
});

test("buildAnysearchSearchRequest omits auth without a token and clamps max_results to 10", () => {
  const config = SEARCH_PROVIDERS["anysearch-search"];
  const { init } = buildAnysearchSearchRequest(config, { query: "q", maxResults: 99 });
  const headers = init.headers as Record<string, string>;
  assert.equal("Authorization" in headers, false);
  assert.deepEqual(JSON.parse(String(init.body)), { query: "q", max_results: 10 });
});

test("extractAnysearchSearchItems reads enveloped and flat shapes, skipping url-less rows", () => {
  const row = (n: number) => ({
    title: `Result ${n}`,
    url: `https://example.com/${n}`,
    snippet: `Snippet ${n}`,
    date: "2026-08-20T00:00:00.000Z",
  });
  const enveloped = extractAnysearchSearchItems(
    { code: 0, message: "success", data: { results: [row(1), { title: "no url" }, row(2)] } },
    10
  );
  assert.equal(enveloped.length, 2);
  assert.equal(enveloped[0].url, "https://example.com/1");
  assert.equal(enveloped[0].publishedAt, "2026-08-20T00:00:00.000Z");
  const flat = extractAnysearchSearchItems({ results: [row(3)] }, 10);
  assert.equal(flat.length, 1);
  assert.equal(flat[0].title, "Result 3");
});

test("anysearch provider validation posts a Bearer probe with max_results 1", () => {
  const request = SEARCH_VALIDATOR_CONFIGS["anysearch-search"]("as_sk_test");
  assert.equal(request.url, "https://api.anysearch.com/v1/search");
  assert.equal(request.init.method, "POST");
  const headers = request.init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer as_sk_test");
  assert.deepEqual(JSON.parse(String(request.init.body)), { query: "test", max_results: 1 });
});

test("v1SearchSchema canonicalizes anysearch aliases without forcing a search_type", () => {
  for (const provider of ["anysearch", "anysearch_search", "anysearch-search"]) {
    const parsed = v1SearchSchema.parse({ query: "agents sdk", provider, search_type: "web" });
    assert.equal(parsed.provider, "anysearch-search");
    assert.equal(parsed.search_type, "web");
  }
});

test("REST and MCP web-fetch schemas both accept explicit anysearch-search selection", () => {
  const request = { url: "https://example.com", provider: "anysearch-search" } as const;
  assert.equal(v1WebFetchSchema.parse(request).provider, "anysearch-search");
  assert.equal(webFetchInput.parse(request).provider, "anysearch-search");
});

test("handleSearch maps AnySearch results into the unified search response", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response(
      JSON.stringify({
        code: 0,
        message: "success",
        data: {
          results: [
            {
              title: "OmniRoute",
              url: "https://github.com/diegosouzapw/OmniRoute",
              snippet: "AI gateway for multi-provider LLM",
              date: "2026-08-23T00:00:00.000Z",
            },
          ],
        },
        request_id: "b0b0b0b0-0000-4000-8000-000000000000",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const result = await handleSearch({
      query: "omniroute",
      provider: "anysearch-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "as_sk_test" },
      log: null,
    });

    assert.equal(result.success, true, JSON.stringify(result));
    assert.equal(capturedUrl, "https://api.anysearch.com/v1/search");
    const headers = (capturedInit?.headers ?? {}) as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer as_sk_test");
    assert.equal(result.data?.provider, "anysearch-search");
    assert.equal(result.data?.results[0].title, "OmniRoute");
    assert.equal(result.data?.results[0].url, "https://github.com/diegosouzapw/OmniRoute");
    assert.equal(result.data?.results[0].snippet, "AI gateway for multi-provider LLM");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("detectAnysearchEnvelopeError flags non-zero envelope codes and quota signals", async () => {
  assert.equal(detectAnysearchEnvelopeError({ code: 0, message: "success" }), null);
  assert.equal(detectAnysearchEnvelopeError({ results: [] }), null);
  const quotaErr = detectAnysearchEnvelopeError({
    code: -1,
    error_code: "RATE_LIMIT",
    message: "daily quota exceeded",
  });
  assert.ok(quotaErr instanceof AnysearchSearchEnvelopeError);
  assert.equal(quotaErr?.quota, true);
  const genericErr = detectAnysearchEnvelopeError({ code: -1, message: "upstream blew up" });
  assert.ok(genericErr instanceof AnysearchSearchEnvelopeError);
  assert.equal(genericErr?.quota, false);
});

test("handleSearch maps an exhausted-quota envelope to 402 and other envelope errors to 502", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = (async () =>
      new Response(
        JSON.stringify({ code: -1, error_code: "RATE_LIMIT", message: "daily quota exceeded" }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      )) as typeof fetch;
    const quotaResult = await handleSearch({
      query: "omniroute",
      provider: "anysearch-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "as_sk_test" },
      log: null,
    });
    assert.equal(quotaResult.success, false);
    assert.equal(quotaResult.status, 402, JSON.stringify(quotaResult));

    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ code: -1, message: "internal error" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })) as typeof fetch;
    const genericResult = await handleSearch({
      query: "omniroute",
      provider: "anysearch-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "as_sk_test" },
      log: null,
    });
    assert.equal(genericResult.success, false);
    assert.equal(genericResult.status, 502, JSON.stringify(genericResult));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
