// Tests for validateWebCookieProvider fallback when no registry entry exists.
// Covers providers like lmarena, gemini-business, poe-web, venice-web and v0-vercel-web
// that are listed in WEB_COOKIE_PROVIDERS but have no entry in providerRegistry.ts.
//
// These providers only expose a marketing website URL (WEB_COOKIE_PROVIDERS[id].website),
// not a real API host. Probing `${website}/models` does not reliably signal session
// validity — live verification showed most of these hosts return redirects or SPA 200s
// regardless of cookie validity, which would silently report an expired/garbage cookie as
// "OK". Until each provider has a verified, side-effect-free auth probe against its real
// API host, validateWebCookieProvider reports `unsupported: true` for this fallback case
// instead of a false "valid" — and does so WITHOUT making any network probe.

import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

const fetchCalls: Array<{ url: string; headers: Record<string, string> }> = [];

test.beforeEach(() => {
  fetchCalls.length = 0;
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    const headers: Record<string, string> = {};
    if (init?.headers) {
      if (init.headers instanceof Headers) {
        init.headers.forEach((v, k) => {
          headers[k] = v;
        });
      } else if (Array.isArray(init.headers)) {
        for (const [k, v] of init.headers) headers[k] = v;
      } else {
        Object.assign(headers, init.headers);
      }
    }
    fetchCalls.push({ url: String(url), headers });
    // If this mock is ever hit for a no-registry-entry provider, the test will fail on
    // the `fetchCalls.length` assertion below — this response is never meant to be read.
    return new Response("", { status: 404 });
  }) as typeof fetch;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

// ── lmarena (#6280: gained a REAL providerRegistry entry — left the fallback class) ──
// Before #6280 lmarena had no registry entry, so this suite asserted the unsupported
// fallback. The Arena modernization added a real registry entry (registry/lmarena/),
// so validateWebCookieProvider now takes the probe path (directHttpsRequest against the
// registry baseUrl — which deliberately bypasses this suite's fetch mock, so the probe
// itself cannot be unit-asserted here). What this suite still guards for lmarena: its
// classification out of the no-registry fallback.

test("lmarena has a registry entry — no longer the no-registry unsupported fallback", async () => {
  const { getRegistryEntry } = await import("@omniroute/open-sse/config/providerRegistry.ts");
  const entry = getRegistryEntry("lmarena");
  assert.ok(entry, "lmarena must have a providerRegistry entry (#6280 Arena modernization)");
  assert.ok(entry.baseUrl, "the probe path requires a real baseUrl on the registry entry");
});

test("lmarena validation rejects empty cookie before checking support", async () => {
  const result = await validateProviderApiKey({
    provider: "lmarena",
    apiKey: "",
  });
  assert.strictEqual(result.valid, false);
  assert.match(result.error, /api key required|cookie/i);
  assert.equal(fetchCalls.length, 0);
});

// ── gemini-business (no registry entry, falls back to WEB_COOKIE_PROVIDERS) ──

test("gemini-business validation is unsupported and makes no network call", async () => {
  const result = await validateProviderApiKey({
    provider: "gemini-business",
    apiKey: "test-gemini-cookie",
  });
  assert.strictEqual(result.valid, false);
  assert.equal(result.unsupported, true);
  assert.equal(fetchCalls.length, 0);
});

// ── remaining WEB_COOKIE_PROVIDERS-only providers (no registry entry) ──
// NOTE: doubao-web and zenmux-free are intentionally NOT covered here — unlike when this
// fix was proposed, both now carry a providerRegistry.ts entry (added independently of
// this PR), so they no longer exercise the no-registry-entry fallback branch this test
// file targets; they go through the pre-existing entry-based probe instead, which is out
// of scope for this fix.

for (const provider of ["poe-web", "venice-web", "v0-vercel-web"]) {
  test(`${provider} validation is unsupported and makes no network call`, async () => {
    const result = await validateProviderApiKey({
      provider,
      apiKey: "some-cookie-value",
    });
    assert.strictEqual(result.valid, false);
    assert.equal(result.unsupported, true);
    assert.equal(fetchCalls.length, 0);
  });
}

// ── generic fallback guard ──

test("unknown web-cookie provider without registry returns unsupported", async () => {
  const result = await validateProviderApiKey({
    provider: "fake-web",
    apiKey: "some-key",
  });
  assert.strictEqual(result.valid, false);
  assert.equal(result.unsupported, true);
});
