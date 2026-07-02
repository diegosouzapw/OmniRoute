import test from "node:test";
import assert from "node:assert/strict";

const { firecrawlFetch } = await import("../../open-sse/executors/firecrawl-fetch.ts");

// ── firecrawlFetch tests ──────────────────────────────────────────────────────

test("firecrawlFetch calls api.firecrawl.dev/v1/scrape with Bearer auth", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Record<string, string>; body: Record<string, unknown> } = {
    url: "",
    headers: {},
    body: {},
  };

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      headers: (init as RequestInit).headers as Record<string, string>,
      body: JSON.parse(String((init as RequestInit).body ?? "{}")),
    };
    return new Response(
      JSON.stringify({ data: { markdown: "# Result", links: [], metadata: { title: "Test" } } }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await firecrawlFetch({
      url: "https://example.com",
      format: "markdown",
      depth: 0,
      includeMetadata: false,
      credentials: { apiKey: "fc-test-key" },
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://api.firecrawl.dev/v1/scrape");
    assert.equal(captured.headers["Authorization"], "Bearer fc-test-key");
    assert.deepEqual(captured.body.formats, ["markdown"]);
    assert.equal(captured.body.url, "https://example.com");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("firecrawlFetch propagates 401 error without stack trace", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await firecrawlFetch({
      url: "https://example.com",
      format: "markdown",
      depth: 0,
      includeMetadata: false,
      credentials: { apiKey: "bad-key" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.ok(result.error, "should have error");
    assert.ok(!result.error.includes("at /"), "error must not contain stack trace");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("firecrawlFetch returns 401 error when no API key", async () => {
  const result = await firecrawlFetch({
    url: "https://example.com",
    format: "markdown",
    depth: 0,
    includeMetadata: false,
    credentials: {},
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.ok(!result.error?.includes("at /"));
});

test("firecrawlFetch maps 'html' format correctly", async () => {
  const originalFetch = globalThis.fetch;
  let capturedFormats: unknown;

  globalThis.fetch = async (_url, init = {}) => {
    const body = JSON.parse(String((init as RequestInit).body ?? "{}"));
    capturedFormats = body.formats;
    return new Response(JSON.stringify({ data: { html: "<html>test</html>", links: [] } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await firecrawlFetch({
      url: "https://example.com",
      format: "html",
      depth: 0,
      includeMetadata: false,
      credentials: { apiKey: "fc-key" },
    });

    assert.equal(result.success, true);
    assert.deepEqual(capturedFormats, ["html"]);
    assert.ok(result.data?.content.includes("<html>"), "should return html content");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("firecrawlFetch returns correct response shape", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        data: {
          markdown: "# Page Title\nContent here.",
          links: ["https://example.com/about", "https://example.com/contact"],
          metadata: { title: "Page Title", description: "A test page" },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await firecrawlFetch({
      url: "https://example.com",
      format: "markdown",
      depth: 0,
      includeMetadata: true,
      credentials: { apiKey: "fc-key" },
    });

    assert.equal(result.success, true);
    assert.ok(result.data, "should have data");
    assert.equal(result.data.provider, "firecrawl");
    assert.equal(result.data.url, "https://example.com");
    assert.ok(result.data.content.includes("Page Title"), "content should contain title");
    assert.ok(Array.isArray(result.data.links), "links should be array");
    assert.equal(result.data.links.length, 2);
    assert.ok(result.data.metadata?.title === "Page Title");
    assert.equal(result.data.screenshot_url, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("firecrawlFetch forwards depth and wait_for_selector", async () => {
  const originalFetch = globalThis.fetch;
  let capturedBody: Record<string, unknown> = {};

  globalThis.fetch = async (_url, init = {}) => {
    capturedBody = JSON.parse(String((init as RequestInit).body ?? "{}"));
    return new Response(JSON.stringify({ data: { markdown: "" } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    await firecrawlFetch({
      url: "https://example.com",
      format: "markdown",
      depth: 1,
      waitForSelector: "article",
      includeMetadata: false,
      credentials: { apiKey: "fc-key" },
    });

    assert.equal(capturedBody.maxDepth, 1, "should set maxDepth");
    assert.equal(capturedBody.waitFor, "article", "should set waitFor");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ── #4692 regression: includeMetadata must NOT send invalid includeTags ────────
// Firecrawl returns metadata automatically in response.data.metadata. Sending
// includeTags with non-CSS-selector values ("og:title", "description") crashed
// Firecrawl's parser with HTTP 500. The includeMetadata flag must only gate
// whether we surface metadata, never inject includeTags into the request.
test("firecrawlFetch with includeMetadata=true does not send includeTags (4692)", async () => {
  const originalFetch = globalThis.fetch;
  let capturedBody: Record<string, unknown> = {};

  globalThis.fetch = async (_url, init = {}) => {
    capturedBody = JSON.parse(String((init as RequestInit).body ?? "{}"));
    return new Response(
      JSON.stringify({
        data: { markdown: "# Result", metadata: { title: "Test", description: "Desc" } },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await firecrawlFetch({
      url: "https://example.com",
      format: "markdown",
      depth: 0,
      includeMetadata: true,
      credentials: { apiKey: "fc-test-key" },
    });

    assert.equal(result.success, true);
    assert.ok(
      !("includeTags" in capturedBody),
      "includeMetadata must not inject includeTags (Firecrawl 500)"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
