import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-nimble-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { NIMBLE_CLIENT_SOURCE, NIMBLE_CLIENT_SOURCE_HEADER } =
  await import("../../open-sse/config/nimble.ts");

/** A `lite`-depth /v1/search payload: `description` carries the snippet, `content` is empty. */
function nimbleSearchPayload() {
  return {
    total_results: 2,
    request_id: "00000000-0000-0000-0000-000000000000",
    results: [
      {
        title: "Nimble — real-time web data",
        url: "https://www.nimbleway.com/product?ref=1",
        description: "Structured web data for AI applications.",
        content: "",
        metadata: { position: 1, entity_type: "SearchResult", country: "US", locale: "en" },
      },
      {
        title: "Nimble docs",
        url: "https://docs.nimbleway.com/",
        description: "",
        content: "Full page body captured at a deeper search depth.",
        metadata: { position: 2, entity_type: "SearchResult", country: "US", locale: "en" },
      },
    ],
  };
}

test("nimble-search is registered with the /v1/search endpoint and bearer auth", () => {
  const provider = SEARCH_PROVIDERS["nimble-search"];
  assert.ok(provider, "nimble-search must be in the search registry");
  assert.equal(provider.baseUrl, "https://sdk.nimbleway.com/v1/search");
  assert.equal(provider.method, "POST");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.deepEqual(provider.searchTypes, ["web", "news"]);
});

test("handleSearch builds a Nimble request with the omniroute client-source header", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Record<string, string>; body: Record<string, unknown> } = {
    url: "",
    headers: {},
    body: {},
  };

  globalThis.fetch = async (url, init = {}) => {
    const request = init as RequestInit;
    captured = {
      url: String(url),
      headers: request.headers as Record<string, string>,
      body: JSON.parse(String(request.body || "{}")),
    };
    return new Response(JSON.stringify(nimbleSearchPayload()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleSearch({
      query: "  nimble   web  data  ",
      provider: "nimble-search",
      maxResults: 2,
      searchType: "web",
      country: "us",
      language: "en",
      timeRange: "month",
      domainFilter: ["nimbleway.com", "-spam.example"],
      credentials: { apiKey: "nimble-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://sdk.nimbleway.com/v1/search");
    assert.equal(captured.headers.Authorization, "Bearer nimble-key");
    assert.equal(captured.headers[NIMBLE_CLIENT_SOURCE_HEADER], NIMBLE_CLIENT_SOURCE);
    assert.equal(captured.headers[NIMBLE_CLIENT_SOURCE_HEADER], "omniroute");

    assert.deepEqual(captured.body, {
      query: "nimble web data",
      max_results: 2,
      search_depth: "lite",
      output_format: "plain_text",
      focus: "general",
      country: "US",
      locale: "en",
      time_range: "month",
      include_domains: ["nimbleway.com"],
      exclude_domains: ["spam.example"],
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch maps search_type=news onto the Nimble news focus", async () => {
  const originalFetch = globalThis.fetch;
  let body: Record<string, unknown> = {};

  globalThis.fetch = async (_url, init = {}) => {
    body = JSON.parse(String((init as RequestInit).body || "{}"));
    return new Response(JSON.stringify(nimbleSearchPayload()), { status: 200 });
  };

  try {
    await handleSearch({
      query: "nimble",
      provider: "nimble-search",
      maxResults: 5,
      searchType: "news",
      credentials: { apiKey: "nimble-key" },
      log: null,
    });

    assert.equal(body.focus, "news");
    // Regression guard: `focus` must stay a scalar. Sending an array makes Nimble
    // read it as a list of Web Search Agent subagents and reject the call with 422.
    assert.equal(Array.isArray(body.focus), false, "focus must not be an array");
    // Optional locale/date filters stay off the wire when the caller omits them.
    assert.equal("country" in body, false);
    assert.equal("time_range" in body, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch normalizes Nimble results into the shared SearchResult shape", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify(nimbleSearchPayload()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await handleSearch({
      query: "nimble",
      provider: "nimble-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "nimble-key" },
      log: null,
    });

    assert.equal(result.success, true);
    const data = result.data!;
    assert.equal(data.provider, "nimble-search");
    assert.equal(data.metrics.total_results_available, 2);

    const [first, second] = data.results;
    assert.equal(first.title, "Nimble — real-time web data");
    assert.equal(first.url, "https://www.nimbleway.com/product?ref=1");
    assert.equal(first.display_url, "nimbleway.com/product");
    assert.equal(first.position, 1);
    assert.equal(first.citation.provider, "nimble-search");
    assert.equal(first.citation.rank, 1);
    // `lite` depth: the snippet comes from `description`, and there is no full text.
    assert.equal(first.snippet, "Structured web data for AI applications.");
    assert.equal(first.content, null);

    // Deeper depths populate `content`; it becomes both the snippet fallback and full text.
    assert.equal(second.snippet, "Full page body captured at a deeper search depth.");
    assert.equal(second.content?.format, "text");
    assert.equal(second.content?.text, "Full page body captured at a deeper search depth.");
    assert.equal(
      second.content?.length,
      "Full page body captured at a deeper search depth.".length
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch returns an empty result set when Nimble finds nothing", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ total_results: 0, results: [], request_id: "x" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await handleSearch({
      query: "a query with no hits",
      provider: "nimble-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "nimble-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.deepEqual(result.data?.results, []);
    assert.equal(result.data?.metrics.total_results_available, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch rejects a Nimble request with no credentials before calling out", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;

  globalThis.fetch = async () => {
    called = true;
    return new Response("{}", { status: 200 });
  };

  try {
    const result = await handleSearch({
      query: "nimble",
      provider: "nimble-search",
      maxResults: 5,
      searchType: "web",
      credentials: {},
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(called, false, "must not call Nimble without a key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch surfaces an invalid Nimble key without leaking a stack trace", async () => {
  const originalFetch = globalThis.fetch;

  // Nimble answers an auth failure with a plain-text body, not JSON.
  globalThis.fetch = async () =>
    new Response("unauthorized: bearer token validation failed", {
      status: 401,
      headers: { "content-type": "text/plain" },
    });

  try {
    const result = await handleSearch({
      query: "nimble",
      provider: "nimble-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "bad-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.ok(result.error, "should carry an error message");
    assert.ok(!result.error!.includes("at /"), "error must not contain a stack trace");
    assert.ok(!result.error!.includes("bad-key"), "error must not echo the API key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch propagates a Nimble rate-limit response as 429", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ message: "Too Many Requests" }), {
      status: 429,
      headers: { "content-type": "application/json", "retry-after": "30" },
    });

  try {
    const result = await handleSearch({
      query: "nimble",
      provider: "nimble-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "nimble-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 429);
    assert.ok(!result.error?.includes("at /"), "error must not contain a stack trace");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch maps a Nimble timeout to 504", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    const err = new Error("aborted");
    err.name = "AbortError";
    throw err;
  };

  try {
    const result = await handleSearch({
      query: "nimble",
      provider: "nimble-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "nimble-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 504);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
