import test from "node:test";
import assert from "node:assert/strict";

const { jinaReaderFetch } = await import("../../open-sse/executors/jina-reader-fetch.ts");

// ── jinaReaderFetch tests ─────────────────────────────────────────────────────

test("jinaReaderFetch calls r.jina.ai/{url} with Bearer auth", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Record<string, string> } = { url: "", headers: {} };

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      headers: (init as RequestInit).headers as Record<string, string>,
    };
    return new Response("# Hello from Jina", {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  };

  try {
    const result = await jinaReaderFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "jina-test-key" },
    });

    assert.equal(result.success, true);
    assert.ok(
      captured.url.startsWith("https://r.jina.ai/"),
      `URL should start with https://r.jina.ai/, got: ${captured.url}`
    );
    assert.ok(
      captured.url.includes(encodeURIComponent("https://example.com")),
      "URL should include encoded target URL"
    );
    assert.equal(captured.headers["Authorization"], "Bearer jina-test-key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("jinaReaderFetch returns 401 error when no API key", async () => {
  const result = await jinaReaderFetch({
    url: "https://example.com",
    format: "markdown",
    includeMetadata: false,
    credentials: {},
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.ok(!result.error?.includes("at /"), "error must not contain stack trace");
});

test("jinaReaderFetch propagates non-200 status without stack trace", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    return new Response("Forbidden", {
      status: 403,
      headers: { "content-type": "text/plain" },
    });
  };

  try {
    const result = await jinaReaderFetch({
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

test("jinaReaderFetch parses JSON response with data.content", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        data: {
          content: "# Parsed content",
          title: "Title from JSON",
          description: "A description",
          links: ["https://example.com/a", "https://example.com/b"],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await jinaReaderFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: true,
      credentials: { apiKey: "jina-key" },
    });

    assert.equal(result.success, true);
    assert.ok(result.data, "should have data");
    assert.equal(result.data.provider, "jina-reader");
    assert.ok(result.data.content.includes("Parsed content"), "content should be parsed");
    assert.ok(result.data.metadata?.title === "Title from JSON", "metadata title should be set");
    assert.equal(result.data.screenshot_url, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("jinaReaderFetch falls back to plain text when response is not JSON", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    return new Response("Plain text content from Jina", {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  };

  try {
    const result = await jinaReaderFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "jina-key" },
    });

    assert.equal(result.success, true);
    assert.ok(
      result.data?.content.includes("Plain text content"),
      "should include plain text content"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("jinaReaderFetch sets X-Return-Format header to html for html format", async () => {
  const originalFetch = globalThis.fetch;
  let capturedHeaders: Record<string, string> = {};

  globalThis.fetch = async (_url, init = {}) => {
    capturedHeaders = (init as RequestInit).headers as Record<string, string>;
    return new Response("<html>content</html>", {
      status: 200,
      headers: { "content-type": "text/html" },
    });
  };

  try {
    await jinaReaderFetch({
      url: "https://example.com",
      format: "html",
      includeMetadata: false,
      credentials: { apiKey: "jina-key" },
    });

    assert.equal(capturedHeaders["X-Return-Format"], "html");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
