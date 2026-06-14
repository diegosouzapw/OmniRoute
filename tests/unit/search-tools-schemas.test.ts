import test from "node:test";
import assert from "node:assert/strict";
import { ZodError } from "zod";

const { SearchProviderCatalogItemSchema, SearchProviderCatalogResponseSchema, ScrapeResultSchema } =
  await import("../../src/shared/schemas/searchTools.ts");

// ── SearchProviderCatalogItemSchema ───────────────────────────────────────────

test("SearchProviderCatalogItemSchema: valid search provider parses", () => {
  const item = {
    id: "tavily",
    name: "Tavily",
    kind: "search",
    costPerQuery: 0.001,
    freeMonthlyQuota: 1000,
    searchTypes: ["web", "news"],
    status: "configured",
    configureHref: "/dashboard/providers",
  };
  const result = SearchProviderCatalogItemSchema.safeParse(item);
  assert.ok(result.success, "valid search item should parse");
  if (result.success) {
    assert.equal(result.data.kind, "search");
    assert.equal(result.data.id, "tavily");
    assert.equal(result.data.status, "configured");
  }
});

test("SearchProviderCatalogItemSchema: valid fetch provider parses", () => {
  const item = {
    id: "firecrawl",
    name: "Firecrawl",
    kind: "fetch",
    costPerQuery: 0.002,
    freeMonthlyQuota: 500,
    fetchFormats: ["markdown", "html", "links"],
    status: "configured",
    configureHref: "/dashboard/providers",
  };
  const result = SearchProviderCatalogItemSchema.safeParse(item);
  assert.ok(result.success, "valid fetch item should parse");
  if (result.success) {
    assert.equal(result.data.kind, "fetch");
    assert.deepEqual(result.data.fetchFormats, ["markdown", "html", "links"]);
  }
});

test("SearchProviderCatalogItemSchema: status 'missing' is valid", () => {
  const item = {
    id: "bing",
    name: "Bing",
    kind: "search",
    costPerQuery: 0.005,
    freeMonthlyQuota: 0,
    status: "missing",
  };
  const result = SearchProviderCatalogItemSchema.safeParse(item);
  assert.ok(result.success, "status=missing should parse");
  if (result.success) {
    // configureHref has a default value
    assert.equal(result.data.configureHref, "/dashboard/providers");
  }
});

test("SearchProviderCatalogItemSchema: status 'rate_limited' is valid", () => {
  const item = {
    id: "serper",
    name: "Serper",
    kind: "search",
    costPerQuery: 0.001,
    freeMonthlyQuota: 100,
    status: "rate_limited",
  };
  const result = SearchProviderCatalogItemSchema.safeParse(item);
  assert.ok(result.success, "status=rate_limited should parse");
});

test("SearchProviderCatalogItemSchema: invalid — kind not in enum", () => {
  const item = {
    id: "custom",
    name: "Custom",
    kind: "unknown",
    costPerQuery: 0.001,
    freeMonthlyQuota: 0,
    status: "configured",
  };
  const result = SearchProviderCatalogItemSchema.safeParse(item);
  assert.ok(!result.success, "invalid kind should fail");
  if (!result.success) {
    assert.ok(result.error instanceof ZodError);
  }
});

test("SearchProviderCatalogItemSchema: invalid — negative costPerQuery", () => {
  const item = {
    id: "test",
    name: "Test",
    kind: "search",
    costPerQuery: -0.001,
    freeMonthlyQuota: 0,
    status: "configured",
  };
  const result = SearchProviderCatalogItemSchema.safeParse(item);
  assert.ok(!result.success, "negative costPerQuery should fail");
});

test("SearchProviderCatalogItemSchema: invalid — status not in enum", () => {
  const item = {
    id: "test",
    name: "Test",
    kind: "search",
    costPerQuery: 0,
    freeMonthlyQuota: 0,
    status: "active",
  };
  const result = SearchProviderCatalogItemSchema.safeParse(item);
  assert.ok(!result.success, "invalid status should fail");
});

// ── SearchProviderCatalogResponseSchema ───────────────────────────────────────

test("SearchProviderCatalogResponseSchema: valid response with multiple providers", () => {
  const response = {
    providers: [
      {
        id: "tavily",
        name: "Tavily",
        kind: "search",
        costPerQuery: 0.001,
        freeMonthlyQuota: 1000,
        status: "configured",
      },
      {
        id: "firecrawl",
        name: "Firecrawl",
        kind: "fetch",
        costPerQuery: 0.002,
        freeMonthlyQuota: 500,
        status: "configured",
      },
    ],
  };
  const result = SearchProviderCatalogResponseSchema.safeParse(response);
  assert.ok(result.success, "valid response should parse");
  if (result.success) {
    assert.equal(result.data.providers.length, 2);
    assert.equal(result.data.providers[0].kind, "search");
    assert.equal(result.data.providers[1].kind, "fetch");
  }
});

test("SearchProviderCatalogResponseSchema: empty providers array is valid", () => {
  const result = SearchProviderCatalogResponseSchema.safeParse({ providers: [] });
  assert.ok(result.success, "empty providers array should parse");
});

test("SearchProviderCatalogResponseSchema: invalid — providers not array", () => {
  const result = SearchProviderCatalogResponseSchema.safeParse({ providers: "not-array" });
  assert.ok(!result.success, "non-array providers should fail");
});

// ── ScrapeResultSchema ────────────────────────────────────────────────────────

test("ScrapeResultSchema: valid scrape result parses", () => {
  const result_data = {
    provider: "firecrawl",
    url: "https://example.com",
    content: "# Hello\n\nThis is the content.",
    links: ["https://example.com/page1", "https://example.com/page2"],
    metadata: {
      title: "Example Domain",
      description: "An example page.",
    },
    screenshot_url: null,
  };
  const result = ScrapeResultSchema.safeParse(result_data);
  assert.ok(result.success, "valid scrape result should parse");
  if (result.success) {
    assert.equal(result.data.provider, "firecrawl");
    assert.equal(result.data.links.length, 2);
    assert.equal(result.data.metadata?.title, "Example Domain");
  }
});

test("ScrapeResultSchema: null metadata is valid", () => {
  const result_data = {
    provider: "jina-reader",
    url: "https://example.com",
    content: "Content here.",
    links: [],
    metadata: null,
    screenshot_url: null,
  };
  const result = ScrapeResultSchema.safeParse(result_data);
  assert.ok(result.success, "null metadata should parse");
});

test("ScrapeResultSchema: with screenshot_url as string", () => {
  const result_data = {
    provider: "firecrawl",
    url: "https://example.com",
    content: "Content.",
    links: [],
    metadata: { title: null, description: null },
    screenshot_url: "https://screenshots.example.com/abc123.png",
  };
  const result = ScrapeResultSchema.safeParse(result_data);
  assert.ok(result.success, "screenshot_url as string should parse");
  if (result.success) {
    assert.equal(result.data.screenshot_url, "https://screenshots.example.com/abc123.png");
  }
});

test("ScrapeResultSchema: null metadata title/description is valid", () => {
  const result_data = {
    provider: "tavily-search",
    url: "https://example.com",
    content: "Content.",
    links: [],
    metadata: { title: null, description: null },
    screenshot_url: null,
  };
  const result = ScrapeResultSchema.safeParse(result_data);
  assert.ok(result.success, "null title/description in metadata should parse");
});

test("ScrapeResultSchema: invalid — missing required fields", () => {
  const result = ScrapeResultSchema.safeParse({ provider: "firecrawl" });
  assert.ok(!result.success, "missing required fields should fail");
  if (!result.success) {
    assert.ok(result.error instanceof ZodError);
  }
});

test("ScrapeResultSchema: invalid — links must be array of strings", () => {
  const result = ScrapeResultSchema.safeParse({
    provider: "firecrawl",
    url: "https://example.com",
    content: "Content.",
    links: [42, 43], // non-strings
    metadata: null,
    screenshot_url: null,
  });
  assert.ok(!result.success, "non-string links should fail");
});
