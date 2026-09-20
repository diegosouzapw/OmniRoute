import test from "node:test";
import assert from "node:assert/strict";

const providerPageUtils =
  await import("../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts");

test("default provider view shows dedicated web-fetch providers", () => {
  const { shouldShowProviderSection } = providerPageUtils;

  assert.equal(shouldShowProviderSection("oauth", null, false), true);
  assert.equal(shouldShowProviderSection("free", null, false), false);
  assert.equal(shouldShowProviderSection("webfetch", null, false), true);
  assert.equal(shouldShowProviderSection("webfetch", "webfetch", false), true);
  assert.equal(shouldShowProviderSection("free", null, true), true);
  assert.equal(shouldShowProviderSection("oauth", null, true), false);
});

test("TinyFish is a dedicated web-fetch provider, not an LLM provider", () => {
  const { buildStaticProviderEntries, providerEntryIsToolOnly, providerEntryIsWebFetchOnly } =
    providerPageUtils;
  const apiKeyEntries = buildStaticProviderEntries("apikey", () => ({ total: 0 }));
  const tinyFish = apiKeyEntries.find((entry) => entry.providerId === "tinyfish");

  assert.ok(tinyFish);
  assert.equal(providerEntryIsToolOnly(tinyFish), true);
  assert.equal(providerEntryIsWebFetchOnly(tinyFish), true);
});

test("providers that support both search and fetch stay in Web Search by default", () => {
  const { buildStaticProviderEntries, providerEntryIsWebFetchOnly } = providerPageUtils;
  const searchEntries = buildStaticProviderEntries("search", () => ({ total: 0 }));
  const firecrawl = searchEntries.find((entry) => entry.providerId === "firecrawl");

  assert.ok(firecrawl);
  assert.equal(providerEntryIsWebFetchOnly(firecrawl), false);
});
