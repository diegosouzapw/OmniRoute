import test from "node:test";
import assert from "node:assert/strict";

const {
  SEARCH_PROVIDERS,
  getSearchProvider,
  resolveSearchProvider,
  selectProvider,
  supportsSearchType,
} = await import("../../open-sse/config/searchRegistry.ts");
const { SEARCH_VALIDATOR_CONFIGS } =
  await import("../../src/lib/providers/validation/searchProviders.ts");
const { XQUIK_SEARCH_PROVIDER_ID, buildXquikSearchRequest, extractXquikSearchHits } =
  await import("../../open-sse/handlers/search/xquikSearch.ts");
const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { v1SearchSchema } = await import("../../src/shared/validation/schemas.ts");

test("xquik-search is an explicit X-only fallback provider", () => {
  const config = getSearchProvider(XQUIK_SEARCH_PROVIDER_ID);
  assert.ok(config);
  assert.equal(config.id, "xquik-search");
  assert.equal(config.baseUrl, "https://xquik.com/api/v1/x/tweets/search");
  assert.equal(config.authHeader, "x-api-key");
  assert.equal(config.fallbackOnly, true);
  assert.deepEqual(config.searchTypes, ["x"]);
  assert.equal(supportsSearchType(config, "x"), true);
  assert.equal(supportsSearchType(config, "web"), false);
  assert.equal(selectProvider(undefined, "x")?.id, "x-search");
});

test("xquik search aliases resolve without changing the xAI provider", () => {
  assert.equal(resolveSearchProvider("xquik")?.id, "xquik-search");
  assert.equal(resolveSearchProvider("xquik_search")?.id, "xquik-search");
  assert.equal(resolveSearchProvider("x-search")?.id, "x-search");
});

test("buildXquikSearchRequest uses the published REST contract", () => {
  const config = SEARCH_PROVIDERS["xquik-search"];
  const { url, init } = buildXquikSearchRequest(config, {
    query: 'from:openai "agents sdk"',
    maxResults: 3,
    token: "xq_test_key",
  });

  const parsedUrl = new URL(url);
  assert.equal(parsedUrl.origin, "https://xquik.com");
  assert.equal(parsedUrl.pathname, "/api/v1/x/tweets/search");
  assert.equal(parsedUrl.searchParams.get("q"), 'from:openai "agents sdk"');
  assert.equal(parsedUrl.searchParams.get("queryType"), "Latest");
  assert.equal(parsedUrl.searchParams.get("limit"), "3");
  assert.equal(init.method, "GET");
  assert.deepEqual(init.headers, {
    Accept: "application/json",
    "x-api-key": "xq_test_key",
  });
});

test("extractXquikSearchHits creates canonical X citations from typed tweet rows", () => {
  const hits = extractXquikSearchHits(
    {
      tweets: [
        {
          id: "1912345678901234567",
          text: "Agents SDK update",
          createdAt: "2026-08-24T07:00:00.000Z",
          author: { username: "openai", name: "OpenAI" },
        },
        {
          id: "not-a-tweet-id",
          text: "Invalid rows must not become links",
          author: { username: "attacker", name: "Attacker" },
        },
      ],
    },
    5
  );

  assert.deepEqual(hits, [
    {
      title: "@openai",
      url: "https://x.com/openai/status/1912345678901234567",
      snippet: "Agents SDK update",
      author: "openai",
      publishedAt: "2026-08-24T07:00:00.000Z",
    },
  ]);
});

test("xquik provider validation sends its API key only in x-api-key", () => {
  const request = SEARCH_VALIDATOR_CONFIGS["xquik-search"]("xq_test_key");
  const parsedUrl = new URL(request.url);
  assert.equal(parsedUrl.pathname, "/api/v1/x/tweets/search");
  assert.equal(parsedUrl.searchParams.get("q"), "test");
  assert.equal(parsedUrl.searchParams.get("limit"), "1");
  assert.deepEqual(request.init.headers, {
    Accept: "application/json",
    "x-api-key": "xq_test_key",
  });
});

test("v1SearchSchema canonicalizes xquik aliases and forces search_type x", () => {
  for (const provider of ["xquik", "xquik_search", "xquik-search"]) {
    const parsed = v1SearchSchema.parse({
      query: "agents sdk",
      provider,
      search_type: "web",
    });
    assert.equal(parsed.provider, "xquik-search");
    assert.equal(parsed.search_type, "x");
  }
});

test("handleSearch maps Xquik tweets into the unified search response", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = (async (url, init) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response(
      JSON.stringify({
        tweets: [
          {
            id: "1912345678901234567",
            text: "Agents SDK update",
            createdAt: "2026-08-24T07:00:00.000Z",
            author: { username: "openai", name: "OpenAI" },
          },
        ],
        has_next_page: false,
        next_cursor: "",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const result = await handleSearch({
      query: "agents sdk",
      provider: "xquik-search",
      maxResults: 5,
      searchType: "x",
      credentials: { apiKey: "xq_test_key" },
      log: null,
    });

    assert.equal(result.success, true, JSON.stringify(result));
    assert.match(capturedUrl, /^https:\/\/xquik\.com\/api\/v1\/x\/tweets\/search\?/);
    assert.equal((capturedInit?.headers as Record<string, string>)["x-api-key"], "xq_test_key");
    assert.equal(result.data?.provider, "xquik-search");
    assert.equal(result.data?.results[0].title, "@openai");
    assert.equal(result.data?.results[0].url, "https://x.com/openai/status/1912345678901234567");
    assert.equal(result.data?.results[0].snippet, "Agents SDK update");
    assert.equal(result.data?.results[0].metadata?.source_type, "x");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
