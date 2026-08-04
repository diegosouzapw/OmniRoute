import test from "node:test";
import assert from "node:assert/strict";

const { firecrawlFetch } = await import("../../open-sse/executors/firecrawl-fetch.ts");

// ── #2253 (decolua/9router): self-hosted Firecrawl support ────────────────────
// FIRECRAWL_BASE_URL lets operators point the executor at a self-hosted instance.
// The API key stays required for the default cloud endpoint, but becomes optional
// once a custom base URL is configured (self-hosted instances usually run with no
// auth in front of them).

function withEnv(vars: Record<string, string | undefined>, fn: () => Promise<void>) {
  const original: Record<string, string | undefined> = {};
  for (const key of Object.keys(vars)) {
    original[key] = process.env[key];
  }
  for (const [key, value] of Object.entries(vars)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return fn().finally(() => {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
}

test("firecrawlFetch routes to FIRECRAWL_BASE_URL when set", async () => {
  await withEnv({ FIRECRAWL_BASE_URL: "http://127.0.0.1:3002" }, async () => {
    const originalFetch = globalThis.fetch;
    let capturedUrl = "";

    globalThis.fetch = async (url) => {
      capturedUrl = String(url);
      return new Response(JSON.stringify({ data: { markdown: "# Self-hosted" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };

    try {
      const result = await firecrawlFetch({
        url: "https://example.com",
        format: "markdown",
        depth: 0,
        includeMetadata: false,
        credentials: { apiKey: "any-key" },
      });

      assert.equal(result.success, true);
      assert.equal(capturedUrl, "http://127.0.0.1:3002/v1/scrape");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

test("firecrawlFetch allows missing apiKey when FIRECRAWL_BASE_URL is custom", async () => {
  await withEnv({ FIRECRAWL_BASE_URL: "http://127.0.0.1:3002" }, async () => {
    const originalFetch = globalThis.fetch;
    let capturedHeaders: Record<string, string> = {};

    globalThis.fetch = async (_url, init = {}) => {
      capturedHeaders = (init as RequestInit).headers as Record<string, string>;
      return new Response(JSON.stringify({ data: { markdown: "# Self-hosted" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };

    try {
      const result = await firecrawlFetch({
        url: "https://example.com",
        format: "markdown",
        depth: 0,
        includeMetadata: false,
        credentials: {},
      });

      assert.equal(result.success, true, "custom base URL must not require an API key");
      assert.equal(
        capturedHeaders["Authorization"],
        undefined,
        "no Authorization header should be sent without an apiKey"
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

test("firecrawlFetch still requires apiKey against the default cloud base URL", async () => {
  await withEnv({ FIRECRAWL_BASE_URL: undefined }, async () => {
    const result = await firecrawlFetch({
      url: "https://example.com",
      format: "markdown",
      depth: 0,
      includeMetadata: false,
      credentials: {},
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.ok(!result.error?.includes("at /"), "error must not contain stack trace");
  });
});

test("firecrawlFetch honors FIRECRAWL_TIMEOUT_MS override", async () => {
  await withEnv(
    { FIRECRAWL_BASE_URL: "http://127.0.0.1:3002", FIRECRAWL_TIMEOUT_MS: "5" },
    async () => {
      const originalFetch = globalThis.fetch;

      globalThis.fetch = async (_url, init = {}) => {
        const signal = (init as RequestInit).signal;
        return new Promise((resolve, reject) => {
          const timer = setTimeout(
            () =>
              resolve(
                new Response(JSON.stringify({ data: { markdown: "late" } }), {
                  status: 200,
                  headers: { "content-type": "application/json" },
                })
              ),
            50
          );
          signal?.addEventListener("abort", () => {
            clearTimeout(timer);
            reject(new DOMException("Aborted", "AbortError"));
          });
        });
      };

      try {
        const result = await firecrawlFetch({
          url: "https://example.com",
          format: "markdown",
          depth: 0,
          includeMetadata: false,
          credentials: {},
        });

        assert.equal(result.success, false);
        assert.equal(result.status, 504);
      } finally {
        globalThis.fetch = originalFetch;
      }
    }
  );
});
