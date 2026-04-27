import test from "node:test";
import assert from "node:assert/strict";

// ═══════════════════════════════════════════════════════════════
//  Search Registry + Cache Unit Tests
//  Tests for searchRegistry, searchCache, and response normalization
// ═══════════════════════════════════════════════════════════════

const {
  SEARCH_PROVIDERS,
  getSearchProvider,
  getAllSearchProviders,
  selectProvider,
  supportsSearchType,
} = await import("../../open-sse/config/searchRegistry.ts");

const { computeCacheKey, getOrCoalesce, getCacheStats, SEARCH_CACHE_DEFAULT_TTL_MS } =
  await import("../../open-sse/services/searchCache.ts");

// ─── Registry Tests ──────────────────────────────────────────

test("SEARCH_PROVIDERS has all 10 providers", () => {
  assert.ok(SEARCH_PROVIDERS["serper-search"], "serper should exist");
  assert.ok(SEARCH_PROVIDERS["brave-search"], "brave should exist");
  assert.ok(SEARCH_PROVIDERS["perplexity-search"], "perplexity-search should exist");
  assert.ok(SEARCH_PROVIDERS["exa-search"], "exa should exist");
  assert.ok(SEARCH_PROVIDERS["tavily-search"], "tavily should exist");
  assert.ok(SEARCH_PROVIDERS["google-pse-search"], "google-pse should exist");
  assert.ok(SEARCH_PROVIDERS["linkup-search"], "linkup should exist");
  assert.ok(SEARCH_PROVIDERS["searchapi-search"], "searchapi should exist");
  assert.ok(SEARCH_PROVIDERS["youcom-search"], "youcom should exist");
  assert.ok(SEARCH_PROVIDERS["searxng-search"], "searxng should exist");
  assert.equal(Object.keys(SEARCH_PROVIDERS).length, 10);
});

test("serper-search config is correct", () => {
  const s = SEARCH_PROVIDERS["serper-search"];
  assert.equal(s.id, "serper-search");
  assert.equal(s.method, "POST");
  assert.equal(s.authHeader, "x-api-key");
  assert.equal(s.costPerQuery, 0.001);
  assert.equal(s.freeMonthlyQuota, 2500);
  assert.deepEqual(s.searchTypes, ["web", "news"]);
});

test("brave-search config is correct", () => {
  const b = SEARCH_PROVIDERS["brave-search"];
  assert.equal(b.id, "brave-search");
  assert.equal(b.method, "GET");
  assert.equal(b.authHeader, "x-subscription-token");
  assert.equal(b.costPerQuery, 0.005);
  assert.equal(b.freeMonthlyQuota, 1000);
});

test("perplexity-search config is correct", () => {
  const p = SEARCH_PROVIDERS["perplexity-search"];
  assert.equal(p.id, "perplexity-search");
  assert.equal(p.method, "POST");
  assert.equal(p.authHeader, "bearer");
  assert.equal(p.baseUrl, "https://api.perplexity.ai/search");
  assert.equal(p.costPerQuery, 0.005);
  assert.equal(p.freeMonthlyQuota, 0);
  assert.deepEqual(p.searchTypes, ["web"]);
});

test("getSearchProvider returns config for valid ID", () => {
  const config = getSearchProvider("serper-search");
  assert.ok(config);
  assert.equal(config.id, "serper-search");
});

test("getSearchProvider returns null for unknown ID", () => {
  assert.equal(getSearchProvider("unknown"), null);
});

test("tavily config is correct", () => {
  const t = SEARCH_PROVIDERS["tavily-search"];
  assert.equal(t.id, "tavily-search");
  assert.equal(t.method, "POST");
  assert.equal(t.authHeader, "bearer");
  assert.equal(t.baseUrl, "https://api.tavily.com/search");
  assert.equal(t.costPerQuery, 0.008);
  assert.equal(t.freeMonthlyQuota, 1000);
  assert.deepEqual(t.searchTypes, ["web", "news"]);
});

test("google-pse-search config is correct", () => {
  const g = SEARCH_PROVIDERS["google-pse-search"];
  assert.equal(g.id, "google-pse-search");
  assert.equal(g.method, "GET");
  assert.equal(g.authHeader, "key");
  assert.equal(g.costPerQuery, 0.005);
  assert.equal(g.maxMaxResults, 10);
});

test("linkup-search config is correct", () => {
  const l = SEARCH_PROVIDERS["linkup-search"];
  assert.equal(l.id, "linkup-search");
  assert.equal(l.method, "POST");
  assert.equal(l.authHeader, "bearer");
  assert.deepEqual(l.searchTypes, ["web"]);
});

test("searchapi-search config is correct", () => {
  const s = SEARCH_PROVIDERS["searchapi-search"];
  assert.equal(s.id, "searchapi-search");
  assert.equal(s.method, "GET");
  assert.equal(s.authHeader, "api_key");
  assert.deepEqual(s.searchTypes, ["web", "news"]);
});

test("youcom-search config is correct", () => {
  const y = SEARCH_PROVIDERS["youcom-search"];
  assert.equal(y.id, "youcom-search");
  assert.equal(y.method, "GET");
  assert.equal(y.authHeader, "x-api-key");
  assert.equal(y.baseUrl, "https://ydc-index.io/v1/search");
  assert.equal(y.costPerQuery, 0.005);
  assert.deepEqual(y.searchTypes, ["web", "news"]);
});

test("searxng-search config is correct", () => {
  const s = SEARCH_PROVIDERS["searxng-search"];
  assert.equal(s.id, "searxng-search");
  assert.equal(s.method, "GET");
  assert.equal(s.authType, "none");
  assert.equal(s.costPerQuery, 0);
  assert.deepEqual(s.searchTypes, ["web", "news"]);
});

test("getAllSearchProviders returns flat list", () => {
  const all = getAllSearchProviders();
  assert.equal(all.length, 10);
  assert.ok(all.some((p) => p.id === "serper-search"));
  assert.ok(all.some((p) => p.id === "brave-search"));
  assert.ok(all.some((p) => p.id === "perplexity-search"));
  assert.ok(all.some((p) => p.id === "exa-search"));
  assert.ok(all.some((p) => p.id === "tavily-search"));
  assert.ok(all.some((p) => p.id === "google-pse-search"));
  assert.ok(all.some((p) => p.id === "linkup-search"));
  assert.ok(all.some((p) => p.id === "searchapi-search"));
  assert.ok(all.some((p) => p.id === "youcom-search"));
  assert.ok(all.some((p) => p.id === "searxng-search"));
  // Each entry should have id, name, searchTypes
  for (const p of all) {
    assert.ok(p.id);
    assert.ok(p.name);
    assert.ok(Array.isArray(p.searchTypes));
  }
});

test("selectProvider with explicit provider returns that provider", () => {
  const config = selectProvider("brave-search", "news");
  assert.ok(config);
  assert.equal(config.id, "brave-search");
});

test("selectProvider with unknown provider returns null", () => {
  assert.equal(selectProvider("unknown"), null);
});

test("selectProvider without argument returns cheapest provider", () => {
  const config = selectProvider();
  assert.ok(config);
  assert.equal(config.id, "searxng-search");
});

test("selectProvider filters by search type support", () => {
  const config = selectProvider(undefined, "news");
  assert.ok(config);
  assert.equal(config.id, "searxng-search");
  assert.equal(selectProvider("linkup-search", "news"), null);
});

test("supportsSearchType reflects provider capabilities", () => {
  assert.equal(supportsSearchType("linkup-search", "web"), true);
  assert.equal(supportsSearchType("linkup-search", "news"), false);
  assert.equal(supportsSearchType("searxng-search", "news"), true);
});

// ─── Cache Key Tests ─────────────────────────────────────────

test("computeCacheKey is deterministic", () => {
  const k1 = computeCacheKey("hello world", "auto", "web", 5);
  const k2 = computeCacheKey("hello world", "auto", "web", 5);
  assert.equal(k1, k2);
});

test("computeCacheKey normalizes query (case, whitespace)", () => {
  const k1 = computeCacheKey("Hello  World", "auto", "web", 5);
  const k2 = computeCacheKey("hello world", "auto", "web", 5);
  assert.equal(k1, k2);
});

test("computeCacheKey differs by provider", () => {
  const k1 = computeCacheKey("test", "serper", "web", 5);
  const k2 = computeCacheKey("test", "brave", "web", 5);
  assert.notEqual(k1, k2);
});

test("computeCacheKey differs by search_type", () => {
  const k1 = computeCacheKey("test", "auto", "web", 5);
  const k2 = computeCacheKey("test", "auto", "news", 5);
  assert.notEqual(k1, k2);
});

test("computeCacheKey differs by max_results", () => {
  const k1 = computeCacheKey("test", "auto", "web", 5);
  const k2 = computeCacheKey("test", "auto", "web", 10);
  assert.notEqual(k1, k2);
});

// ─── Cache + Coalescing Tests ────────────────────────────────

test("getOrCoalesce caches and returns on second call", async () => {
  let callCount = 0;
  const key = "test-cache-hit-" + Date.now();

  const r1 = await getOrCoalesce(key, 60_000, async () => {
    callCount++;
    return { value: 42 };
  });
  assert.equal(r1.cached, false);
  assert.deepEqual(r1.data, { value: 42 });

  const r2 = await getOrCoalesce(key, 60_000, async () => {
    callCount++;
    return { value: 99 };
  });
  assert.equal(r2.cached, true);
  assert.deepEqual(r2.data, { value: 42 }); // original value, not 99
  assert.equal(callCount, 1); // fetchFn called only once
});

test("getOrCoalesce coalesces concurrent requests", async () => {
  let callCount = 0;
  const key = "test-coalesce-" + Date.now();

  const fetchFn = async () => {
    callCount++;
    await new Promise((r) => setTimeout(r, 50)); // simulate async
    return { value: "coalesced" };
  };

  // Launch 3 concurrent requests with the same key
  const [r1, r2, r3] = await Promise.all([
    getOrCoalesce(key, 60_000, fetchFn),
    getOrCoalesce(key, 60_000, fetchFn),
    getOrCoalesce(key, 60_000, fetchFn),
  ]);

  assert.equal(callCount, 1); // Only one fetch executed
  assert.deepEqual(r1.data, { value: "coalesced" });
  assert.deepEqual(r2.data, { value: "coalesced" });
  assert.deepEqual(r3.data, { value: "coalesced" });
});

test("getOrCoalesce respects TTL=0 (no caching)", async () => {
  let callCount = 0;
  const key = "test-no-cache-" + Date.now();

  await getOrCoalesce(key, 0, async () => {
    callCount++;
    return { value: 1 };
  });
  await getOrCoalesce(key, 0, async () => {
    callCount++;
    return { value: 2 };
  });

  assert.equal(callCount, 2); // Both calls executed
});

test("getCacheStats returns valid stats", () => {
  const stats = getCacheStats();
  assert.equal(typeof stats.size, "number");
  assert.equal(typeof stats.hits, "number");
  assert.equal(typeof stats.misses, "number");
});

test("SEARCH_CACHE_DEFAULT_TTL_MS is positive", () => {
  assert.ok(SEARCH_CACHE_DEFAULT_TTL_MS > 0);
});

// ─── Validation Schema Tests ────────────────────────────────

test("v1SearchSchema validates correct input", async () => {
  const { v1SearchSchema } = await import("../../src/shared/validation/schemas.ts");

  const result = v1SearchSchema.safeParse({
    query: "test query",
    provider: "serper-search",
    max_results: 10,
    search_type: "web",
  });
  assert.ok(result.success);
  assert.equal(result.data.query, "test query");
  assert.equal(result.data.provider, "serper-search");
  assert.equal(result.data.max_results, 10);
});

test("v1SearchSchema rejects empty query", async () => {
  const { v1SearchSchema } = await import("../../src/shared/validation/schemas.ts");

  const result = v1SearchSchema.safeParse({ query: "" });
  assert.ok(!result.success);
});

test("v1SearchSchema rejects query over 500 chars", async () => {
  const { v1SearchSchema } = await import("../../src/shared/validation/schemas.ts");

  const result = v1SearchSchema.safeParse({ query: "a".repeat(501) });
  assert.ok(!result.success);
});

test("v1SearchSchema rejects invalid provider", async () => {
  const { v1SearchSchema } = await import("../../src/shared/validation/schemas.ts");

  const result = v1SearchSchema.safeParse({ query: "test", provider: "google" });
  assert.ok(!result.success);
});

test("v1SearchSchema accepts tavily provider", async () => {
  const { v1SearchSchema } = await import("../../src/shared/validation/schemas.ts");

  const result = v1SearchSchema.safeParse({ query: "test", provider: "tavily-search" });
  assert.ok(result.success);
  assert.equal(result.data.provider, "tavily-search");
});

test("v1SearchSchema accepts new search providers", async () => {
  const { v1SearchSchema } = await import("../../src/shared/validation/schemas.ts");

  const providers = [
    "google-pse-search",
    "linkup-search",
    "searchapi-search",
    "youcom-search",
    "searxng-search",
  ] as const;

  for (const provider of providers) {
    const result = v1SearchSchema.safeParse({ query: "test", provider });
    assert.equal(result.success, true, `${provider} should be accepted`);
  }
});

test("createProviderSchema allows SearXNG without apiKey", async () => {
  const { createProviderSchema } = await import("../../src/shared/validation/schemas.ts");

  const result = createProviderSchema.safeParse({
    provider: "searxng-search",
    name: "Local SearXNG",
    providerSpecificData: { baseUrl: "http://localhost:8888/search" },
  });

  assert.equal(result.success, true);
});

test("createProviderSchema requires cx for Google PSE", async () => {
  const { createProviderSchema } = await import("../../src/shared/validation/schemas.ts");

  const missingCx = createProviderSchema.safeParse({
    provider: "google-pse-search",
    apiKey: "google-key",
    name: "Google PSE",
  });
  assert.equal(missingCx.success, false);

  const valid = createProviderSchema.safeParse({
    provider: "google-pse-search",
    apiKey: "google-key",
    name: "Google PSE",
    providerSpecificData: { cx: "engine-id" },
  });
  assert.equal(valid.success, true);
});

test("validateProviderApiKeySchema requires cx for Google PSE", async () => {
  const { validateProviderApiKeySchema } = await import("../../src/shared/validation/schemas.ts");

  const missingCx = validateProviderApiKeySchema.safeParse({
    provider: "google-pse-search",
    apiKey: "google-key",
  });
  assert.equal(missingCx.success, false);

  const valid = validateProviderApiKeySchema.safeParse({
    provider: "google-pse-search",
    apiKey: "google-key",
    cx: "engine-id",
  });
  assert.equal(valid.success, true);
});

test("v1SearchSchema applies defaults", async () => {
  const { v1SearchSchema } = await import("../../src/shared/validation/schemas.ts");

  const result = v1SearchSchema.safeParse({ query: "test" });
  assert.ok(result.success);
  assert.equal(result.data.max_results, 5);
  assert.equal(result.data.search_type, "web");
  assert.equal(result.data.provider, undefined);
});

test("v1SearchSchema allows unknown fields (forward compat)", async () => {
  const { v1SearchSchema } = await import("../../src/shared/validation/schemas.ts");

  const result = v1SearchSchema.safeParse({
    query: "test",
    future_field: true,
  });
  assert.ok(result.success);
});
