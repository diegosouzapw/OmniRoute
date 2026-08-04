import test from "node:test";
import assert from "node:assert/strict";

// TinyFish Fetch API added as a webFetch-kind provider (docs.tinyfish.ai/fetch-api).
// These tests pin the validator dispatch (tinyfish -> POST api.fetch.tinyfish.ai with
// X-API-Key auth) and the auth-failure mapping, mirroring the firecrawl/jina-reader
// coverage in provider-validation-webfetch-4401.test.ts.

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function headerValue(init: RequestInit | undefined, name: string): string | undefined {
  const headers = (init?.headers || {}) as Record<string, string>;
  return headers[name];
}

test("tinyfish validator probes api.fetch.tinyfish.ai with X-API-Key auth and accepts a 200", async () => {
  const calls: { url: string; init: RequestInit }[] = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return new Response(JSON.stringify({ results: [{}], errors: [] }), { status: 200 });
  };

  const result = await validateProviderApiKey({ provider: "tinyfish", apiKey: "tf-test-key" });

  assert.equal(result.valid, true);
  assert.equal(result.unsupported ?? false, false);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /^https:\/\/api\.fetch\.tinyfish\.ai\/?$/);
  assert.equal(calls[0].init.method, "POST");
  assert.equal(headerValue(calls[0].init, "X-API-Key"), "tf-test-key");
});

test("tinyfish validator maps 401/403 to an invalid-key error", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });

  const result = await validateProviderApiKey({ provider: "tinyfish", apiKey: "bad" });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});
