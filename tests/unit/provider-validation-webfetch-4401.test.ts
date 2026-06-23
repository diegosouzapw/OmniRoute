import test from "node:test";
import assert from "node:assert/strict";

// #4401: Firecrawl and Jina Reader were added as webFetch providers in #2645 with
// their own executors, but no API-key validator was registered — so adding an account
// through the dashboard failed with "Provider validation not supported". These tests
// pin the validator dispatch (firecrawl → POST api.firecrawl.dev/v1/scrape with Bearer;
// jina-reader → GET r.jina.ai/<url> with Bearer) and the auth-failure mapping.

const { validateProviderApiKey } = await import("../../src/lib/providers/validation/index.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function headerValue(init: RequestInit | undefined, name: string): string | undefined {
  const headers = (init?.headers || {}) as Record<string, string>;
  return headers[name];
}

test("#4401 firecrawl validator probes the scrape endpoint with Bearer auth and accepts a 200", async () => {
  const calls: { url: string; init: RequestInit }[] = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify({ success: true, data: {} }), { status: 200 });
  };

  const result = await validateProviderApiKey({ provider: "firecrawl", apiKey: "fc-test-key" });

  assert.equal(result.valid, true);
  assert.equal(result.unsupported ?? false, false);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.firecrawl.dev/v1/scrape");
  assert.equal(calls[0].init.method, "POST");
  assert.equal(headerValue(calls[0].init, "Authorization"), "Bearer fc-test-key");
});

test("#4401 jina-reader validator probes r.jina.ai with Bearer auth and accepts a 200", async () => {
  const calls: { url: string; init: RequestInit }[] = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return new Response("# Example\n", { status: 200 });
  };

  const result = await validateProviderApiKey({ provider: "jina-reader", apiKey: "jina-test-key" });

  assert.equal(result.valid, true);
  assert.equal(result.unsupported ?? false, false);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /^https:\/\/r\.jina\.ai\//);
  assert.equal(headerValue(calls[0].init, "Authorization"), "Bearer jina-test-key");
});

test("#4401 webFetch validators map 401/403 to an invalid-key error, not 'not supported'", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });

  const firecrawl = await validateProviderApiKey({ provider: "firecrawl", apiKey: "bad" });
  const jina = await validateProviderApiKey({ provider: "jina-reader", apiKey: "bad" });

  assert.equal(firecrawl.valid, false);
  assert.equal(firecrawl.error, "Invalid API key");
  assert.equal(jina.valid, false);
  assert.equal(jina.error, "Invalid API key");
});
