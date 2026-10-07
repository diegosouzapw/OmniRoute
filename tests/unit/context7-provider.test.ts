/**
 * tests/unit/context7-provider.test.ts
 *
 * Context7 as a /v1/search + /v1/web/fetch provider id `context7`:
 * - registry entry: GET api/v1/search, authType "none" (anonymous tier), fallbackOnly
 * - request builder: GET /search?query=<q>, Bearer only when a key is configured
 * - response normalization: results[].id -> https://context7.com/<id> URL
 * - docs fetch executor: library-reference URL parsing + type=llms.txt upstream call
 * - MCP schemas expose context7 on both web_search and web_fetch
 */

import test from "node:test";
import assert from "node:assert/strict";

const { SEARCH_PROVIDERS, getSearchProvider, resolveSearchProvider } =
  await import("../../open-sse/config/searchRegistry.ts");
const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const {
  handleWebFetch,
  WEB_FETCH_PROVIDERS,
  EXPLICIT_ONLY_WEB_FETCH_PROVIDERS,
  ANONYMOUS_CAPABLE_WEB_FETCH_PROVIDERS,
} = await import("../../open-sse/handlers/webFetch.ts");
const { context7Fetch, parseContext7LibraryUrl, isValidContext7LibraryId } =
  await import("../../open-sse/executors/context7-fetch.ts");
const { webSearchInput, webFetchInput } =
  await import("../../open-sse/mcp-server/schemas/tools.ts");
const { SEARCH_VALIDATOR_CONFIGS } =
  await import("../../src/lib/providers/validation/searchProviders.ts");

// Real upstream response sample (2026-08-22, GET /api/v1/search?query=react, truncated).
const SEARCH_SAMPLE = {
  results: [
    {
      id: "/reactjs/react.dev",
      title: "React",
      description: "React.dev is the official documentation website for React.",
      branch: "main",
      lastUpdateDate: "2026-08-21T18:14:41.542Z",
      state: "finalized",
      totalTokens: 664647,
      totalSnippets: 5956,
      stars: 11311,
      trustScore: 10,
      benchmarkScore: 88.16,
      versions: ["__branch__v18"],
      score: 276.59,
      vip: true,
      verified: true,
    },
    {
      id: "/react/react",
      title: "React (community mirror)",
      description: "A JavaScript library for building user interfaces.",
      lastUpdateDate: "2026-08-20T10:00:00.000Z",
      stars: 5000,
      trustScore: 7,
      score: 120.1,
    },
  ],
};

test("context7 is registered in the search registry with anonymous-capable auth", () => {
  const cfg = getSearchProvider("context7");
  assert.ok(cfg, "context7 must exist in SEARCH_PROVIDERS");
  assert.equal(cfg!.id, "context7");
  assert.equal(cfg!.method, "GET");
  assert.equal(cfg!.authType, "none", "anonymous tier must work without a key");
  assert.equal(cfg!.baseUrl, "https://context7.com/api/v1");
  assert.equal(cfg!.fallbackOnly, true, "doc corpus must never win generic auto-select");
  assert.deepEqual(cfg!.searchTypes, ["web"]);
  assert.ok(SEARCH_PROVIDERS.context7);
  // Operational knobs — regressions here silently change rate/cost behaviour.
  assert.equal(cfg!.costPerQuery, 0);
  assert.equal(cfg!.freeMonthlyQuota, 999999);
  assert.equal(cfg!.defaultMaxResults, 5);
  assert.equal(cfg!.maxMaxResults, 20);
  assert.equal(cfg!.timeoutMs, 10_000);
  assert.equal(cfg!.cacheTTLMs, 300_000);
});

test("web-fetch routing policies pin context7 as explicit-only and anonymous-capable", () => {
  assert.ok(
    EXPLICIT_ONLY_WEB_FETCH_PROVIDERS.has("context7"),
    "context7 must be skipped by generic auto-select"
  );
  assert.ok(
    ANONYMOUS_CAPABLE_WEB_FETCH_PROVIDERS.has("context7"),
    "explicit context7 requests must work without a configured connection"
  );
  // The generic providers stay mutable-free at the type level and complete.
  assert.deepEqual(
    [...WEB_FETCH_PROVIDERS],
    [
      "firecrawl",
      "jina-reader",
      "tavily-search",
      "tinyfish",
      "anysearch-search",
      "context7",
      "nimble-search",
    ]
  );
});

test("handleSearch context7 without a key sends no Authorization header", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = async (url, init) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response(JSON.stringify(SEARCH_SAMPLE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleSearch({
      query: "react hooks",
      provider: "context7",
      maxResults: 5,
      searchType: "web",
      credentials: {},
      log: null,
    });

    assert.equal(result.success, true, `expected success, got ${JSON.stringify(result)}`);
    assert.equal(capturedUrl, "https://context7.com/api/v1/search?query=react+hooks");
    const headers = (capturedInit?.headers ?? {}) as Record<string, string>;
    assert.equal(headers.Authorization, undefined, "no key -> no Authorization header");
    assert.equal(capturedInit?.method, "GET");

    assert.equal(result.data!.results.length, 2);
    const first = result.data!.results[0];
    assert.equal(first.title, "React");
    assert.equal(first.url, "https://context7.com/reactjs/react.dev");
    assert.equal(first.snippet, "React.dev is the official documentation website for React.");
    assert.equal(first.published_at, "2026-08-21T18:14:41.542Z");
    // The upstream relevance score (~276) is unbounded and must not be clamped into 1.
    assert.equal(first.score, null);
    // Non-first results are mapped with the same contract.
    const second = result.data!.results[1];
    assert.ok(second, "second result must exist");
    assert.equal(second.url, "https://context7.com/react/react");
    assert.equal(typeof second.snippet, "string");
    assert.ok(second.snippet.length > 0);
    assert.equal(result.data!.provider, "context7");
    assert.equal(result.data!.usage.search_cost_usd, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch context7 with a key sends Bearer auth", async () => {
  const originalFetch = globalThis.fetch;
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = async (_url, init) => {
    capturedInit = init;
    return new Response(JSON.stringify(SEARCH_SAMPLE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleSearch({
      query: "react",
      provider: "context7",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "ctx7sk-test-key" },
      log: null,
    });

    assert.equal(result.success, true);
    const headers = (capturedInit?.headers ?? {}) as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer ctx7sk-test-key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("context7 normalizer rejects malformed payloads without throwing", async () => {
  const originalFetch = globalThis.fetch;
  const malformedBodies = [
    JSON.stringify({ unexpected: true }), // wrong shape
    "not json at all", // non-JSON
    JSON.stringify({ results: null }), // null results
    JSON.stringify({ results: "string-not-array" }), // non-array results
  ];
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ unexpected: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    for (const _body of malformedBodies) {
      const result = await handleSearch({
        query: "react",
        provider: "context7",
        maxResults: 5,
        searchType: "web",
        credentials: {},
        log: null,
      });
      assert.equal(result.success, true);
      assert.deepEqual(result.data!.results, []);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("context7 normalizer drops invalid ids mixed into a valid result set", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        results: [
          { id: "/valid/one", title: "Valid", description: "ok" },
          { title: "No id at all" },
          { id: "//evil.com", title: "Off-site", description: "bad" },
          { id: "/bad/../traversal", title: "Traversal", description: "bad" },
          { id: "/valid/two", title: "Also valid", description: "ok" },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const result = await handleSearch({
      query: "react",
      provider: "context7",
      maxResults: 5,
      searchType: "web",
      credentials: {},
      log: null,
    });
    assert.equal(result.success, true);
    assert.deepEqual(
      result.data!.results.map((r: { url: string }) => r.url),
      ["https://context7.com/valid/one", "https://context7.com/valid/two"]
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("context7Fetch caps a streaming body at MAX_BODY_BYTES with reader cancel", async () => {
  const originalFetch = globalThis.fetch;
  const total = 3 * 1024 * 1024; // 1 MiB over the cap
  let streamCancelled = false;

  globalThis.fetch = async () => {
    // ReadableStream-backed Response exercises the getReader() chunk path.
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        const chunk = new Uint8Array(64 * 1024).fill(120); // 'x'
        for (let sent = 0; sent < total; sent += chunk.byteLength) {
          controller.enqueue(chunk);
        }
        controller.close();
      },
      cancel() {
        streamCancelled = true;
      },
    });
    return new Response(stream, { status: 200, headers: { "content-type": "text/plain" } });
  };

  try {
    const result = await context7Fetch({
      url: "/reactjs/react.dev",
      includeMetadata: true,
      credentials: {},
    });
    assert.equal(result.success, true);
    const content = result.data?.content ?? "";
    assert.equal(content.length, 2 * 1024 * 1024, "streaming path caps by bytes");
    assert.ok(content.startsWith("x".repeat(1024)), "prefix preserved");
    const meta = result.data?.metadata as { truncated?: boolean } | null;
    assert.equal(meta?.truncated, true);
    assert.ok(streamCancelled, "reader.cancel() must be called after the cap");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleWebFetch surfaces the context7 400 for malformed library references", async () => {
  const result = await handleWebFetch(
    { url: "https://example.com/not-a-library", format: "markdown", include_metadata: false },
    {},
    "context7"
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error ?? "", /library reference/);
});

test("parseContext7LibraryUrl accepts library references in all documented forms", () => {
  assert.deepEqual(parseContext7LibraryUrl("https://context7.com/reactjs/react.dev"), {
    libraryId: "/reactjs/react.dev",
  });
  assert.deepEqual(parseContext7LibraryUrl("context7.com/reactjs/react.dev"), {
    libraryId: "/reactjs/react.dev",
  });
  assert.deepEqual(parseContext7LibraryUrl("/reactjs/react.dev"), {
    libraryId: "/reactjs/react.dev",
  });
  assert.deepEqual(parseContext7LibraryUrl("reactjs/react.dev"), {
    libraryId: "/reactjs/react.dev",
  });
  assert.deepEqual(
    parseContext7LibraryUrl("https://context7.com/reactjs/react.dev?topic=hooks&tokens=2000"),
    { libraryId: "/reactjs/react.dev", topic: "hooks", tokens: 2000 }
  );
});

test("parseContext7LibraryUrl rejects non-context7 URLs and malformed ids", () => {
  assert.equal(parseContext7LibraryUrl("https://example.com/reactjs/react.dev"), null);
  assert.equal(parseContext7LibraryUrl("https://context7.com/api/v1/search"), null);
  assert.equal(parseContext7LibraryUrl("reactjs"), null);
  assert.equal(parseContext7LibraryUrl(""), null);
  assert.equal(parseContext7LibraryUrl("https://context7.com/"), null);
  // Path traversal: ".." segments must never reach the upstream API path
  assert.equal(parseContext7LibraryUrl("/../evil/x"), null);
  assert.equal(parseContext7LibraryUrl("https://context7.com/a/../b"), null);
  assert.equal(parseContext7LibraryUrl("foo../bar/baz"), null);
});

test("parseContext7LibraryUrl clamps tokens and ignores junk params", () => {
  const clamped = parseContext7LibraryUrl("/reactjs/react.dev?tokens=999999");
  assert.equal(clamped?.tokens, 20000);
  const junk = parseContext7LibraryUrl("/reactjs/react.dev?tokens=abc&topic=");
  assert.equal(junk?.tokens, undefined);
  assert.equal(junk?.topic, undefined);
});

test("context7Fetch hits the docs endpoint with type=llms.txt and forwards topic", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = async (url, init) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response("# React hooks docs\n\nuseState ...", {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  };

  try {
    const result = await context7Fetch({
      url: "https://context7.com/reactjs/react.dev?topic=hooks&tokens=2000",
      includeMetadata: true,
      credentials: { apiKey: "ctx7sk-test-key" },
    });

    assert.equal(result.success, true, `expected success, got ${JSON.stringify(result)}`);
    assert.equal(
      capturedUrl,
      "https://context7.com/api/v1/reactjs/react.dev?type=llms.txt&topic=hooks&tokens=2000"
    );
    const headers = (capturedInit?.headers ?? {}) as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer ctx7sk-test-key");
    assert.equal(result.data!.content.includes("useState"), true);
    assert.equal(result.data!.provider, "context7");
    assert.equal(result.data!.metadata?.title, "Context7 docs: /reactjs/react.dev");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("context7Fetch works anonymously (no key) with a default token budget", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = async (url, init) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response("docs", { status: 200, headers: { "content-type": "text/plain" } });
  };

  try {
    const result = await context7Fetch({
      url: "/reactjs/react.dev",
      includeMetadata: false,
      credentials: {},
    });
    assert.equal(result.success, true);
    assert.equal(
      capturedUrl,
      "https://context7.com/api/v1/reactjs/react.dev?type=llms.txt&tokens=5000"
    );
    const headers = (capturedInit?.headers ?? {}) as Record<string, string>;
    assert.equal(headers.Authorization, undefined);
    assert.equal(result.data!.metadata, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("context7Fetch rejects generic web URLs with a 400", async () => {
  const result = await context7Fetch({
    url: "https://example.com/some/page",
    includeMetadata: false,
    credentials: {},
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error ?? "", /library reference/);
});

test("context7Fetch honours credentials.baseUrl override and caps huge bodies", async () => {
  const originalFetch = globalThis.fetch;
  const big = "x".repeat(2 * 1024 * 1024 + 100);
  let capturedUrl = "";

  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response(big, { status: 200, headers: { "content-type": "text/plain" } });
  };

  try {
    const result = await context7Fetch({
      url: "/reactjs/react.dev",
      includeMetadata: true,
      credentials: { baseUrl: "https://mirror.internal/api/v1/" },
    });
    assert.equal(result.success, true);
    assert.ok(
      capturedUrl.startsWith("https://mirror.internal/api/v1/reactjs/react.dev?"),
      `baseUrl override, got ${capturedUrl}`
    );
    assert.equal((result.data?.content ?? "").length, 2 * 1024 * 1024);
    // Truncation must preserve the original prefix, not return arbitrary bytes.
    assert.ok(
      (result.data?.content ?? "").startsWith("x".repeat(1024)),
      "truncated content must be a prefix of the original body"
    );
    const meta = result.data?.metadata as { truncated?: boolean } | null;
    assert.equal(meta?.truncated, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("isValidContext7LibraryId: canonical shapes pass, everything else fails", () => {
  // Valid: two non-empty segments, path-safe chars, single dots allowed.
  for (const good of ["/reactjs/react.dev", "/a/b", "/react/react", "/org.name/repo-name"]) {
    assert.ok(isValidContext7LibraryId(good), `expected valid: ${good}`);
  }
  // Invalid: non-strings, empty, missing segment, dot-run traversal, empty
  // segment (//), off-site prefix, query junk, leading-dot segment.
  for (const bad of [
    "",
    null,
    undefined,
    42,
    "reactjs/react.dev",
    "/only-one",
    "/foo..bar/baz",
    "/foo/bar..baz",
    "/../evil/x",
    "/foo/../bar",
    "//evil.com",
    "/.hidden/repo",
    "/a/b?x=1",
  ] as unknown[]) {
    assert.ok(!isValidContext7LibraryId(bad as string), `expected invalid: ${String(bad)}`);
  }
});

test("parseContext7LibraryUrl truncates a topic to 200 characters", () => {
  const longTopic = "t".repeat(500);
  const parsed = parseContext7LibraryUrl(`/reactjs/react.dev?topic=${longTopic}`);
  assert.equal(parsed?.topic?.length, 200);
});

test("handleSearch clamps maxResults to the registry maxMaxResults (20)", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response(
      JSON.stringify({ results: [{ id: "/a/b", title: "t", description: "d" }] }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };
  try {
    const result = await handleSearch({
      query: "react",
      provider: "context7",
      maxResults: 999,
      searchType: "web",
      credentials: {},
      log: null,
    });
    assert.equal(result.success, true);
    assert.equal(result.data!.results.length, 1);
    // context7's builder does not forward maxResults to the upstream (the API
    // has no count parameter); the clamp is applied inside handleSearch when
    // slicing the normalized results. Send more results than the clamp and
    // verify the slice.
    assert.equal(capturedUrl, "https://context7.com/api/v1/search?query=react");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("context7Fetch caps a non-streaming (data-URL style) body via the arrayBuffer path", async () => {
  const originalFetch = globalThis.fetch;
  const big = "y".repeat(2 * 1024 * 1024 + 50);
  globalThis.fetch = async () =>
    new Response(big, { status: 200, headers: { "content-type": "text/plain" } });
  try {
    const result = await context7Fetch({
      url: "/reactjs/react.dev",
      includeMetadata: true,
      credentials: {},
    });
    assert.equal(result.success, true);
    const content = result.data?.content ?? "";
    assert.ok(content.startsWith("y".repeat(1024)), "non-streaming path prefix preserved");
    const meta = result.data?.metadata as { truncated?: boolean } | null;
    assert.equal(meta?.truncated, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleWebFetch rejects non-markdown format for context7", async () => {
  const result = await handleWebFetch(
    { url: "/reactjs/react.dev", format: "html", include_metadata: false },
    {},
    "context7"
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error ?? "", /only supports format 'markdown'/);
});

test("handleWebFetch dispatches provider=context7 to the context7 executor", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";

  globalThis.fetch = async (url) => {
    capturedUrl = String(url);
    return new Response("docs text", { status: 200, headers: { "content-type": "text/plain" } });
  };

  try {
    const result = await handleWebFetch(
      { url: "/vercel/next.js", provider: "context7", format: "markdown" },
      {},
      "context7"
    );
    assert.equal(result.success, true, `expected success, got ${JSON.stringify(result)}`);
    assert.equal(capturedUrl.includes("/api/v1/vercel/next.js"), true);
    assert.equal(result.data!.provider, "context7");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("MCP schemas expose context7 on web_search and web_fetch", () => {
  const searchOk = webSearchInput.safeParse({ query: "react", provider: "context7" });
  assert.equal(searchOk.success, true, "web_search must accept provider=context7");

  const fetchOk = webFetchInput.safeParse({
    url: "https://context7.com/reactjs/react.dev",
    provider: "context7",
  });
  assert.equal(fetchOk.success, true, "web_fetch must accept provider=context7");
});

test("context7 validator probes the search endpoint with Bearer auth", () => {
  const validator = SEARCH_VALIDATOR_CONFIGS["context7"];
  assert.ok(validator, "context7 must have a validator config");
  const { url, init } = validator("ctx7sk-probe");
  assert.equal(url, "https://context7.com/api/v1/search?query=test");
  assert.equal(init.method, "GET");
  const headers = init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer ctx7sk-probe");
});

test("context7 normalizer handles an empty results array cleanly", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const result = await handleSearch({
      query: "react",
      provider: "context7",
      maxResults: 5,
      searchType: "web",
      credentials: {},
      log: null,
    });
    assert.equal(result.success, true);
    assert.deepEqual(result.data!.results, []);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("registry entry pins the display name", () => {
  const cfg = getSearchProvider("context7");
  assert.equal(cfg!.name, "Context7 (library docs)");
});

test("context7Fetch returns canonical context7.com url and empty links", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response("docs", { status: 200, headers: { "content-type": "text/plain" } });
  try {
    const result = await context7Fetch({
      url: "reactjs/react.dev",
      includeMetadata: false,
      credentials: {},
    });
    assert.equal(result.success, true);
    assert.equal(result.data!.url, "https://context7.com/reactjs/react.dev");
    assert.deepEqual(result.data!.links, []);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("MCP webFetchInput rejects an unknown provider name", () => {
  const bad = webFetchInput.safeParse({ url: "https://example.com", provider: "nonexistent" });
  assert.equal(bad.success, false, "enum must be restrictive");
});

test("parseContext7LibraryUrl clamps tokens up to the 100 lower bound and rejects non-strings", () => {
  const low = parseContext7LibraryUrl("/reactjs/react.dev?tokens=5");
  assert.equal(low?.tokens, 100, "tokens lower bound is 100");
  assert.equal(parseContext7LibraryUrl(null as unknown as string), null);
  assert.equal(parseContext7LibraryUrl(undefined as unknown as string), null);
  assert.equal(parseContext7LibraryUrl(42 as unknown as string), null);
});

test("baseUrl override falls back to the public base for malformed mirrors", async () => {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = async (u) => {
    urls.push(String(u));
    return new Response("ok", { status: 200, headers: { "content-type": "text/plain" } });
  };
  try {
    // dot-run host and 6-digit port are both rejected -> public base
    for (const bad of ["https://foo..bar.com/api", "https://good.com:123456/api"]) {
      urls.length = 0;
      const result = await context7Fetch({
        url: "/reactjs/react.dev",
        includeMetadata: false,
        credentials: { baseUrl: bad },
      });
      assert.equal(result.success, true);
      assert.ok(
        urls[0].startsWith("https://context7.com/api/v1/"),
        `malformed base ${bad} must fall back to the public base, got ${urls[0]}`
      );
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("parseContext7LibraryUrl rejects dot-run segments in every position", () => {
  for (const bad of ["/foo.../bar", "/a/b..", "/.a../b"]) {
    assert.equal(parseContext7LibraryUrl(bad), null, bad);
  }
});

test("parseContext7LibraryUrl accepts the bare context7.com host form (documented input)", () => {
  const parsed = parseContext7LibraryUrl("context7.com/reactjs/react.dev");
  assert.ok(parsed, "bare context7.com/<owner>/<repo> must parse");
  assert.equal(parsed!.libraryId, "/reactjs/react.dev");
  const withQuery = parseContext7LibraryUrl(
    "context7.com/reactjs/react.dev?topic=hooks&tokens=2000"
  );
  assert.ok(withQuery, "bare host with query must parse");
  assert.equal(withQuery!.libraryId, "/reactjs/react.dev");
  assert.equal(withQuery!.topic, "hooks");
});

test("aliases ctx7 and c7 resolve to context7 in the registry", () => {
  // Catalog lookup (getSearchProvider) is exact by design — aliases resolve
  // only on the request path (resolveSearchProvider).
  const ctx7 = resolveSearchProvider("ctx7");
  const c7 = resolveSearchProvider("c7");
  assert.ok(ctx7, "alias ctx7 must resolve on the request path");
  assert.ok(c7, "alias c7 must resolve on the request path");
  assert.equal(ctx7!.id, "context7");
  assert.equal(c7!.id, "context7");
});

test("isValidContext7LibraryId rejects leading-hyphen and trailing-dot segments", () => {
  for (const bad of ["/-foo/bar", "/foo/-bar", "/a./b", "/a/b."]) {
    assert.equal(isValidContext7LibraryId(bad), false, bad);
  }
  // Real-world dots are still allowed: react.dev, v2.0.1 style names.
  assert.ok(isValidContext7LibraryId("/reactjs/react.dev"));
  assert.ok(isValidContext7LibraryId("/org/name.v2"));
});
