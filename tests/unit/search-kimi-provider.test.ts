import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-kimi-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");

/** A /v1/tools/search payload with `include_content` so `text` carries full page content. */
function kimiSearchPayload() {
  return {
    search_results: [
      {
        title: "Kimi K2 model release",
        url: "https://www.moonshot.ai/news/kimi-k2",
        snippet: "Moonshot AI announces Kimi K2.",
        text: "Full page content for the Kimi K2 release announcement.",
        date: "2026-06-01",
        site_name: "Moonshot AI",
        authority: "S",
        icon: "https://platform.kimi.ai/favicon.ico",
        mime: "text/html",
      },
      {
        title: "Kimi docs",
        url: "https://platform.kimi.ai/docs/api/tools-search",
        snippet: "",
        text: "",
        date: "2026-05-20",
        site_name: "Kimi API Open Platform",
        authority: "S",
        icon: "https://platform.kimi.ai/favicon.ico",
        mime: "text/html",
      },
    ],
  };
}

test("kimi-search is registered with the /v1/search endpoint and bearer auth", () => {
  const provider = SEARCH_PROVIDERS["kimi-search"];
  assert.ok(provider, "kimi-search must be in the search registry");
  assert.equal(provider.baseUrl, "https://api.moonshot.ai/v1/tools/search");
  assert.equal(provider.method, "POST");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.deepEqual(provider.searchTypes, ["web"]);
  assert.equal(provider.maxMaxResults, 20);
});

test("handleSearch builds a Kimi request with text_query/limit/include_content", async () => {
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
    return new Response(JSON.stringify(kimiSearchPayload()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleSearch({
      query: "  kimi   k2   release  ",
      provider: "kimi-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "kimi-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://api.moonshot.ai/v1/tools/search");
    assert.equal(captured.headers.Authorization, "Bearer kimi-key");
    assert.deepEqual(captured.body, {
      text_query: "kimi k2 release",
      limit: 5,
      include_content: true,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch normalizes Kimi results into the shared SearchResult shape", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify(kimiSearchPayload()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await handleSearch({
      query: "kimi k2",
      provider: "kimi-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "kimi-key" },
      log: null,
    });

    assert.equal(result.success, true);
    const data = result.data!;
    assert.equal(data.provider, "kimi-search");
    assert.equal(data.metrics.total_results_available, 2);

    const [first, second] = data.results;
    assert.equal(first.title, "Kimi K2 model release");
    assert.equal(first.url, "https://www.moonshot.ai/news/kimi-k2");
    assert.equal(first.display_url, "moonshot.ai/news/kimi-k2");
    assert.equal(first.position, 1);
    assert.equal(first.citation.provider, "kimi-search");
    assert.equal(first.snippet, "Moonshot AI announces Kimi K2.");
    assert.equal(first.content?.format, "text");
    assert.equal(first.content?.text, "Full page content for the Kimi K2 release announcement.");

    // Empty `text`/`snippet` fields map to null content and an empty snippet.
    assert.equal(second.snippet, "");
    assert.equal(second.content, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch returns an empty result set when Kimi finds nothing", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ search_results: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await handleSearch({
      query: "a query with no hits",
      provider: "kimi-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "kimi-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.deepEqual(result.data?.results, []);
    assert.equal(result.data?.metrics.total_results_available, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch rejects a Kimi request with no credentials before calling out", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;

  globalThis.fetch = async () => {
    called = true;
    return new Response("{}", { status: 200 });
  };

  try {
    const result = await handleSearch({
      query: "kimi",
      provider: "kimi-search",
      maxResults: 5,
      searchType: "web",
      credentials: {},
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(called, false, "must not call Kimi without a key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch surfaces an invalid Kimi key without leaking a stack trace", async () => {
  const originalFetch = globalThis.fetch;

  // Kimi answers an auth failure with an empty body and a bare 401 status.
  globalThis.fetch = async () => new Response(null, { status: 401 });

  try {
    const result = await handleSearch({
      query: "kimi",
      provider: "kimi-search",
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
