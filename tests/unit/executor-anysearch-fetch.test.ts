import test from "node:test";
import assert from "node:assert/strict";

const { anysearchFetch } = await import("../../open-sse/executors/anysearch-fetch.ts");

test("anysearchFetch posts a strict { url } body with optional Bearer auth", async () => {
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
        data: { url: "https://example.com", title: "Example", content: "page text" },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const result = await anysearchFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: true,
      credentials: { apiKey: "as_sk_test" },
    });
    assert.equal(capturedUrl, "https://api.anysearch.com/v1/extract");
    assert.deepEqual(JSON.parse(String(capturedInit?.body)), { url: "https://example.com" });
    const headers = (capturedInit?.headers ?? {}) as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer as_sk_test");
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.provider, "anysearch-search");
      assert.equal(result.data.content, "page text");
      assert.equal(result.data.metadata?.title, "Example");
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("anysearchFetch works keyless (anonymous tier) and maps envelope failures", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        code: 0,
        message: "success",
        data: { url: "https://example.com", content: "anon" },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as typeof fetch;
  try {
    const result = await anysearchFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: {},
    });
    assert.equal(result.success, true);
    if (result.success) assert.equal(result.data.content, "anon");
  } finally {
    globalThis.fetch = originalFetch;
  }

  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({ code: -1, error_code: "extract_failed", message: "extract failed" }),
      { status: 200, headers: { "content-type": "application/json" } }
    )) as typeof fetch;
  try {
    const result = await anysearchFetch({
      url: "https://example.com/bad",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "as_sk_test" },
    });
    assert.equal(result.success, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
