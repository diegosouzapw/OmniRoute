import test from "node:test";
import assert from "node:assert/strict";

const { tinyfishFetch } = await import("../../open-sse/executors/tinyfish-fetch.ts");

// ── tinyfishFetch tests ─────────────────────────────────────────────────────

test("tinyfishFetch posts to api.fetch.tinyfish.ai with X-API-Key auth and a urls array", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; init: RequestInit } = { url: "", init: {} };

  globalThis.fetch = async (url, init = {}) => {
    captured = { url: String(url), init: init as RequestInit };
    return new Response(
      JSON.stringify({
        results: [{ url: "https://example.com", text: "# Hello from TinyFish" }],
        errors: [],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await tinyfishFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "tf-test-key" },
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://api.fetch.tinyfish.ai");
    assert.equal(captured.init.method, "POST");
    const headers = captured.init.headers as Record<string, string>;
    assert.equal(headers["X-API-Key"], "tf-test-key");
    const body = JSON.parse(String(captured.init.body));
    assert.deepEqual(body.urls, ["https://example.com"]);
    assert.equal(body.format, "markdown");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("tinyfishFetch returns 401 error when no API key", async () => {
  const result = await tinyfishFetch({
    url: "https://example.com",
    format: "markdown",
    includeMetadata: false,
    credentials: {},
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.ok(!result.error?.includes("at /"), "error must not contain stack trace");
});

test("tinyfishFetch propagates non-200 status without stack trace", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response("Forbidden", { status: 403, headers: { "content-type": "text/plain" } });

  try {
    const result = await tinyfishFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "bad-key" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 403);
    assert.ok(result.error, "should have error message");
    assert.ok(!result.error.includes("at /"), "error must not contain stack trace");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("tinyfishFetch parses results[0].text as content and includes metadata when requested", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        results: [
          {
            url: "https://example.com",
            final_url: "https://example.com/",
            title: "Example Domain",
            description: "An example page",
            text: "# Example content",
          },
        ],
        errors: [],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const result = await tinyfishFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: true,
      credentials: { apiKey: "tf-key" },
    });

    assert.equal(result.success, true);
    assert.ok(result.data, "should have data");
    assert.equal(result.data.provider, "tinyfish");
    assert.ok(result.data.content.includes("Example content"));
    assert.equal(result.data.metadata?.title, "Example Domain");
    assert.equal(result.data.metadata?.description, "An example page");
    assert.equal(result.data.screenshot_url, null);
    assert.deepEqual(result.data.links, []);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("tinyfishFetch omits metadata when includeMetadata is false", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        results: [{ url: "https://example.com", title: "Example", text: "content" }],
        errors: [],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const result = await tinyfishFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "tf-key" },
    });

    assert.equal(result.success, true);
    assert.equal(result.data?.metadata, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("tinyfishFetch maps 'html' format to the html request format", async () => {
  const originalFetch = globalThis.fetch;
  let capturedBody: Record<string, unknown> = {};

  globalThis.fetch = async (_url, init = {}) => {
    capturedBody = JSON.parse(String((init as RequestInit).body));
    return new Response(
      JSON.stringify({ results: [{ url: "https://example.com", text: "<html></html>" }] }),
      { status: 200 }
    );
  };

  try {
    await tinyfishFetch({
      url: "https://example.com",
      format: "html",
      includeMetadata: false,
      credentials: { apiKey: "tf-key" },
    });

    assert.equal(capturedBody.format, "html");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("tinyfishFetch falls back to markdown for unsupported 'links'/'screenshot' formats", async () => {
  const originalFetch = globalThis.fetch;
  let capturedBody: Record<string, unknown> = {};

  globalThis.fetch = async (_url, init = {}) => {
    capturedBody = JSON.parse(String((init as RequestInit).body));
    return new Response(
      JSON.stringify({ results: [{ url: "https://example.com", text: "content" }] }),
      { status: 200 }
    );
  };

  try {
    const result = await tinyfishFetch({
      url: "https://example.com",
      format: "links",
      includeMetadata: false,
      credentials: { apiKey: "tf-key" },
    });

    assert.equal(capturedBody.format, "markdown");
    assert.equal(result.success, true);
    assert.deepEqual(result.data?.links, []);
    assert.equal(result.data?.screenshot_url, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("tinyfishFetch returns a failure when the URL is only present in the errors[] array", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        results: [],
        errors: [{ url: "https://example.com", message: "could not reach host" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const result = await tinyfishFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "tf-key" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.ok(result.error?.includes("could not reach host"));
    assert.ok(!result.error?.includes("at /"), "error must not contain stack trace");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("tinyfishFetch maps AbortError to a 504 timeout", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    const err = new Error("aborted");
    err.name = "AbortError";
    throw err;
  };

  try {
    const result = await tinyfishFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "tf-key" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 504);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
