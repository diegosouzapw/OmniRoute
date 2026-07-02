/**
 * Integration tests for GET /api/search/providers — extended catalog (F4).
 *
 * Tests:
 * - Returns 16 items total (13 search + 3 fetch providers).
 * - Each item carries the correct `kind` field.
 * - Status reflects actual DB credential state:
 *   - "configured"  when an active, non-rate-limited connection exists.
 *   - "missing"     when no connection exists for the provider.
 *   - "rate_limited" when all connections are rate-limited (rateLimitedUntil in future).
 * - Back-compat: `data` field is present and uses legacy shape
 *   {id, object, created, name, search_types}.
 * - Unauthenticated requests receive 401.
 * - Error responses do not leak stack traces (Hard Rule #12).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  createManagementSessionHeaders,
  TEST_MANAGEMENT_JWT_SECRET,
} from "../helpers/managementSession.ts";

// ---------------------------------------------------------------------------
// Isolated temp DB for this test suite
// ---------------------------------------------------------------------------
const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-search-providers-catalog-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-search-catalog";
// Disable dashboard password requirement by default
process.env.INITIAL_PASSWORD = "";
process.env.DASHBOARD_PASSWORD = "";
process.env.JWT_SECRET = TEST_MANAGEMENT_JWT_SECRET;

// ---------------------------------------------------------------------------
// Module imports (after env setup so DB initialises in the right dir)
// ---------------------------------------------------------------------------
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

// Import route AFTER env is configured
const route = await import("../../src/app/api/search/providers/route.ts");

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// 13 search-kind providers: serper, brave, perplexity, exa, tavily, google-pse,
// linkup, searchapi, youcom, searxng, ollama, zai + duckduckgo-free (added in the
// v3.8.27 cycle, registry open-sse/config/searchRegistry.ts).
const EXPECTED_SEARCH_COUNT = 13;
const EXPECTED_FETCH_COUNT = 3;
const EXPECTED_TOTAL = EXPECTED_SEARCH_COUNT + EXPECTED_FETCH_COUNT;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a Request with valid management session cookie. */
async function buildAuthRequest(url = "http://localhost/api/search/providers"): Promise<Request> {
  const headers = await createManagementSessionHeaders();
  return new Request(url, { method: "GET", headers });
}

/** Build an unauthenticated request. */
function buildUnauthRequest(url = "http://localhost/api/search/providers"): Request {
  return new Request(url, { method: "GET" });
}

/** Seed an active provider connection. */
async function seedActiveConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-test`,
    apiKey: `sk-test-${provider}-${Date.now()}`,
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: null,
    providerSpecificData: {},
  });
}

/** Seed a rate-limited provider connection (rateLimitedUntil in future). */
async function seedRateLimitedConnection(provider: string) {
  const future = new Date(Date.now() + 60_000).toISOString();
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-ratelimited`,
    apiKey: `sk-test-${provider}-rl-${Date.now()}`,
    isActive: false, // rate-limited connections are set inactive
    testStatus: "unavailable",
    rateLimitedUntil: future,
    providerSpecificData: {},
  });
}

/** Reset DB state between tests. */
async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// ---------------------------------------------------------------------------
// Lifecycle hooks
// ---------------------------------------------------------------------------

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("search-providers-catalog: returns 401 for unauthenticated requests when auth is required", async () => {
  // Enable auth: set a password in DB settings and INITIAL_PASSWORD so isAuthRequired() → true
  const settingsDb = await import("../../src/lib/db/settings.ts");
  await settingsDb.updateSettings({ requireLogin: true, password: "hashed-pw-test" });

  const req = buildUnauthRequest();
  const res = await route.GET(req);

  assert.equal(res.status, 401);
  const body = await res.json();
  // Hard Rule #12: error body should not leak stack traces
  const bodyStr = JSON.stringify(body);
  assert.ok(!bodyStr.includes(" at /"), "error body must not contain stack trace");
});

test("search-providers-catalog: returns 16 providers (13 search + 3 fetch)", async () => {
  const req = await buildAuthRequest();
  const res = await route.GET(req);

  assert.equal(res.status, 200);
  const body = await res.json();

  assert.ok(Array.isArray(body.providers), "`providers` array must be present");
  assert.equal(
    body.providers.length,
    EXPECTED_TOTAL,
    `Expected ${EXPECTED_TOTAL} providers, got ${body.providers.length}`
  );
});

test("search-providers-catalog: correct count of search and fetch kinds", async () => {
  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  const searchItems = body.providers.filter((p: { kind: string }) => p.kind === "search");
  const fetchItems = body.providers.filter((p: { kind: string }) => p.kind === "fetch");

  assert.equal(
    searchItems.length,
    EXPECTED_SEARCH_COUNT,
    `Expected ${EXPECTED_SEARCH_COUNT} search-kind items, got ${searchItems.length}`
  );
  assert.equal(
    fetchItems.length,
    EXPECTED_FETCH_COUNT,
    `Expected ${EXPECTED_FETCH_COUNT} fetch-kind items, got ${fetchItems.length}`
  );
});

test("search-providers-catalog: every item has a valid kind value", async () => {
  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  for (const item of body.providers) {
    assert.ok(
      item.kind === "search" || item.kind === "fetch",
      `item.kind must be 'search' or 'fetch', got '${item.kind}' for id=${item.id}`
    );
  }
});

test("search-providers-catalog: status=missing when no DB credentials exist", async () => {
  // No connections seeded — all providers should be "missing"
  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  for (const item of body.providers) {
    assert.equal(
      item.status,
      "missing",
      `provider ${item.id} should be 'missing', got '${item.status}'`
    );
  }
});

test("search-providers-catalog: status=configured when active credentials seeded", async () => {
  // Seed an active connection for serper-search
  await seedActiveConnection("serper-search");

  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  const serper = body.providers.find((p: { id: string }) => p.id === "serper-search");
  assert.ok(serper, "serper-search must be in response");
  assert.equal(
    serper.status,
    "configured",
    `serper-search should be 'configured' after seeding active credentials`
  );

  // Other providers (no creds) should still be "missing"
  const missingItems = body.providers.filter(
    (p: { id: string; status: string }) => p.id !== "serper-search" && p.id !== "perplexity-search"
  );
  for (const item of missingItems) {
    assert.equal(item.status, "missing", `${item.id} should be 'missing'`);
  }
});

test("search-providers-catalog: status=rate_limited when all connections are rate-limited", async () => {
  // Seed a rate-limited connection for brave-search (no active connections)
  await seedRateLimitedConnection("brave-search");

  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  const brave = body.providers.find((p: { id: string }) => p.id === "brave-search");
  assert.ok(brave, "brave-search must be in response");
  assert.equal(
    brave.status,
    "rate_limited",
    `brave-search should be 'rate_limited' when all connections have future rateLimitedUntil`
  );
});

test("search-providers-catalog: mixed status across providers", async () => {
  // serper → configured, brave → rate_limited, rest → missing
  await seedActiveConnection("serper-search");
  await seedRateLimitedConnection("brave-search");

  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  const serper = body.providers.find((p: { id: string }) => p.id === "serper-search");
  assert.equal(serper?.status, "configured", "serper-search should be configured");

  const brave = body.providers.find((p: { id: string }) => p.id === "brave-search");
  assert.equal(brave?.status, "rate_limited", "brave-search should be rate_limited");

  const exa = body.providers.find((p: { id: string }) => p.id === "exa-search");
  assert.equal(exa?.status, "missing", "exa-search should be missing");
});

test("search-providers-catalog: back-compat data field has legacy shape", async () => {
  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  // Legacy shape: { id, object, created, name, search_types }
  assert.ok(Array.isArray(body.data), "`data` array must be present for back-compat");
  assert.equal(
    body.data.length,
    EXPECTED_TOTAL,
    "data array should have same length as providers"
  );

  for (const item of body.data) {
    assert.ok(typeof item.id === "string", "data item must have id");
    assert.equal(item.object, "search_provider", "data item object must be 'search_provider'");
    assert.ok(typeof item.created === "number", "data item must have numeric created timestamp");
    assert.ok(typeof item.name === "string", "data item must have name");
    assert.ok(Array.isArray(item.search_types), "data item must have search_types array");
  }
});

test("search-providers-catalog: fetch providers have correct metadata", async () => {
  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  const fetchProviders = body.providers.filter((p: { kind: string }) => p.kind === "fetch");
  const ids = fetchProviders.map((p: { id: string }) => p.id);
  assert.ok(ids.includes("firecrawl"), "firecrawl must be present");
  assert.ok(ids.includes("jina-reader"), "jina-reader must be present");
  assert.ok(ids.includes("tavily-search"), "tavily-search must be present");

  const firecrawl = fetchProviders.find((p: { id: string }) => p.id === "firecrawl");
  assert.equal(firecrawl.name, "Firecrawl");
  assert.equal(firecrawl.costPerQuery, 0.002);
  assert.equal(firecrawl.freeMonthlyQuota, 500);
  assert.ok(Array.isArray(firecrawl.fetchFormats), "fetchFormats must be an array");
  assert.ok(
    firecrawl.fetchFormats.includes("markdown"),
    "firecrawl fetchFormats must include markdown"
  );
  assert.ok(
    firecrawl.fetchFormats.includes("screenshot"),
    "firecrawl fetchFormats must include screenshot"
  );

  const jina = fetchProviders.find((p: { id: string }) => p.id === "jina-reader");
  assert.equal(jina.name, "Jina Reader");
  assert.equal(jina.costPerQuery, 0.0005);
  assert.ok(jina.fetchFormats.includes("text"), "jina fetchFormats must include text");

  const tavily = fetchProviders.find((p: { id: string }) => p.id === "tavily-search");
  assert.equal(tavily.name, "Tavily Extract");
  assert.equal(tavily.costPerQuery, 0.001);
});

test("search-providers-catalog: search providers have correct fields", async () => {
  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  const searchProviders = body.providers.filter((p: { kind: string }) => p.kind === "search");
  for (const item of searchProviders) {
    assert.ok(typeof item.id === "string", "search item must have id");
    assert.ok(typeof item.name === "string", "search item must have name");
    assert.ok(typeof item.costPerQuery === "number", "search item must have costPerQuery");
    assert.ok(
      typeof item.freeMonthlyQuota === "number",
      "search item must have freeMonthlyQuota"
    );
    assert.ok(Array.isArray(item.searchTypes), "search item must have searchTypes array");
    assert.equal(
      item.configureHref,
      "/dashboard/providers",
      "configureHref must be /dashboard/providers"
    );
  }

  // Spot check: serper-search
  const serper = searchProviders.find((p: { id: string }) => p.id === "serper-search");
  assert.ok(serper, "serper-search must be in search providers");
  assert.ok(serper.searchTypes.includes("web"), "serper must support web search");
  assert.equal(serper.kind, "search");
});

test("search-providers-catalog: response validates against SearchProviderCatalogResponseSchema", async () => {
  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  const { SearchProviderCatalogResponseSchema } = await import(
    "../../src/shared/schemas/searchTools.ts"
  );

  const result = SearchProviderCatalogResponseSchema.safeParse({ providers: body.providers });
  assert.ok(
    result.success,
    `Schema validation failed: ${(result as { error?: { message: string } }).error?.message ?? "unknown"}`
  );
});

test("search-providers-catalog: fetch providers have configureHref set", async () => {
  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  const fetchProviders = body.providers.filter((p: { kind: string }) => p.kind === "fetch");
  for (const item of fetchProviders) {
    assert.equal(
      item.configureHref,
      "/dashboard/providers",
      `fetch provider ${item.id} must have configureHref='/dashboard/providers'`
    );
  }
});

test("search-providers-catalog: perplexity-search uses credential fallback", async () => {
  // perplexity-search can use perplexity (chat) credentials as fallback
  // Seed the fallback provider "perplexity" (not "perplexity-search")
  await seedActiveConnection("perplexity");

  const req = await buildAuthRequest();
  const res = await route.GET(req);
  const body = await res.json();

  const perplexity = body.providers.find((p: { id: string }) => p.id === "perplexity-search");
  assert.ok(perplexity, "perplexity-search must be in response");
  assert.equal(
    perplexity.status,
    "configured",
    "perplexity-search should be 'configured' via fallback to perplexity credentials"
  );
});
