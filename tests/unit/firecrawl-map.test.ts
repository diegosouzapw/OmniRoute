import test from "node:test";
import assert from "node:assert/strict";

const { firecrawlMap } = await import("../../open-sse/executors/firecrawl-map.ts");

test("Firecrawl Map sends options to v2 with the selected provider key", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url?: string; headers?: Record<string, string>; body?: unknown } = {};
  globalThis.fetch = async (url, init) => {
    captured = {
      url: String(url),
      headers: init?.headers as Record<string, string>,
      body: JSON.parse(String(init?.body)),
    };
    return Response.json({ success: true, links: [{ url: "https://example.com/about" }] });
  };

  try {
    const result = await firecrawlMap(
      { url: "https://example.com", limit: 25, sitemap: "only" },
      { apiKey: "fc-test-key" }
    );
    assert.equal(result.status, 200);
    assert.deepEqual(result.data, {
      success: true,
      links: [{ url: "https://example.com/about" }],
    });
    assert.equal(captured.url, "https://api.firecrawl.dev/v2/map");
    assert.equal(captured.headers?.Authorization, "Bearer fc-test-key");
    assert.deepEqual(captured.body, {
      url: "https://example.com",
      limit: 25,
      sitemap: "only",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Firecrawl Map keeps upstream quota status and sanitizes connection errors", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () =>
      Response.json({ error: "Insufficient credits" }, { status: 402 });
    const quota = await firecrawlMap(
      { url: "https://example.com", limit: 1 },
      { apiKey: "fc-key" }
    );
    assert.equal(quota.status, 402);

    globalThis.fetch = async () => {
      throw new Error("at /private/path failed");
    };
    const failed = await firecrawlMap(
      { url: "https://example.com", limit: 1 },
      { apiKey: "fc-key" }
    );
    assert.equal(failed.status, 502);
    assert.ok(!JSON.stringify(failed.data).includes("at /private/path"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
