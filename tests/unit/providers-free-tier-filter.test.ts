import assert from "node:assert/strict";
import test from "node:test";

import {
  getStaticProviderCatalogGroup,
  type ProviderCatalogMetadata,
  type StaticProviderCatalogCategory,
} from "@/lib/providers/catalog";

const CATALOG_CATEGORIES = [
  "no-auth",
  "oauth",
  "web-cookie",
  "local",
  "search",
  "audio",
  "upstream-proxy",
  "apikey",
  "cloud-agent",
] as const satisfies readonly StaticProviderCatalogCategory[];

type CategoryFilter = "all" | "free" | StaticProviderCatalogCategory;

interface ProviderFilterEntry {
  providerId: string;
  provider: ProviderCatalogMetadata;
  category: StaticProviderCatalogCategory;
}

function providerHasFree(entry: ProviderFilterEntry): boolean {
  return entry.provider.hasFree === true;
}

function dedupeByProviderId(entries: ProviderFilterEntry[]): ProviderFilterEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.providerId)) return false;
    seen.add(entry.providerId);
    return true;
  });
}

function buildCatalogEntries(): ProviderFilterEntry[] {
  return CATALOG_CATEGORIES.flatMap((category) => {
    const group = getStaticProviderCatalogGroup(category);
    return Object.entries(group.providers).map(([providerId, provider]) => ({
      providerId,
      provider,
      category,
    }));
  });
}

function filterByCategory(
  entries: ProviderFilterEntry[],
  category: CategoryFilter
): ProviderFilterEntry[] {
  if (category === "all") return dedupeByProviderId(entries);
  if (category === "free") return dedupeByProviderId(entries.filter(providerHasFree));
  return dedupeByProviderId(entries.filter((entry) => entry.category === category));
}

function searchEntries(entries: ProviderFilterEntry[], query: string): ProviderFilterEntry[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return dedupeByProviderId(entries);

  return dedupeByProviderId(
    entries.filter((entry) => {
      const name = entry.provider.name.toLowerCase();
      const id = entry.providerId.toLowerCase();
      return name.includes(normalizedQuery) || id.includes(normalizedQuery);
    })
  );
}

function countByCategory(entries: ProviderFilterEntry[]) {
  return {
    all: filterByCategory(entries, "all").length,
    free: filterByCategory(entries, "free").length,
    oauth: filterByCategory(entries, "oauth").length,
    apikey: filterByCategory(entries, "apikey").length,
    webcookie: filterByCategory(entries, "web-cookie").length,
    search: filterByCategory(entries, "search").length,
    audio: filterByCategory(entries, "audio").length,
    local: filterByCategory(entries, "local").length,
    noauth: filterByCategory(entries, "no-auth").length,
    upstreamProxy: filterByCategory(entries, "upstream-proxy").length,
    cloudAgent: filterByCategory(entries, "cloud-agent").length,
  };
}

test('filterByCategory("free") returns every hasFree provider across native categories', () => {
  const entries = buildCatalogEntries();
  const expectedIds = dedupeByProviderId(entries.filter(providerHasFree)).map(
    (entry) => entry.providerId
  );
  const actualIds = filterByCategory(entries, "free").map((entry) => entry.providerId);

  assert.deepEqual(actualIds.sort(), expectedIds.sort());
  assert.ok(actualIds.length >= 60);
});

test('filterByCategory("apikey") keeps OpenRouter in API Key and Free', () => {
  const entries = buildCatalogEntries();
  const apiKeyIds = filterByCategory(entries, "apikey").map((entry) => entry.providerId);
  const freeIds = filterByCategory(entries, "free").map((entry) => entry.providerId);

  assert.ok(apiKeyIds.includes("openrouter"));
  assert.ok(freeIds.includes("openrouter"));
});

test("OAuth providers with hasFree=true appear in OAuth and Free Tier filters", () => {
  const entries = buildCatalogEntries();
  const oauthIds = filterByCategory(entries, "oauth").map((entry) => entry.providerId);
  const freeIds = filterByCategory(entries, "free").map((entry) => entry.providerId);

  assert.ok(oauthIds.includes("qoder"));
  assert.ok(freeIds.includes("qoder"));
});
test("summaryStats.free counts the aggregate overlap without subtracting native categories", () => {
  const entries = buildCatalogEntries();
  const summaryStats = countByCategory(entries);
  const nativeCategoryTotal =
    summaryStats.oauth +
    summaryStats.apikey +
    summaryStats.webcookie +
    summaryStats.search +
    summaryStats.audio +
    summaryStats.local +
    summaryStats.noauth +
    summaryStats.upstreamProxy +
    summaryStats.cloudAgent;

  assert.ok(summaryStats.free >= 60);
  assert.ok(nativeCategoryTotal + summaryStats.free > summaryStats.all);

  for (const category of CATALOG_CATEGORIES) {
    const overlapCount = filterByCategory(entries, category).filter(providerHasFree).length;
    if (overlapCount > 0) {
      assert.ok(summaryStats.free >= overlapCount);
    }
  }
});

test("search results dedupe symbolic Free entries by provider id", () => {
  const entries = buildCatalogEntries();
  const entriesWithSymbolicFreeGroup = [...entries, ...filterByCategory(entries, "free")];
  const results = searchEntries(entriesWithSymbolicFreeGroup, "open");
  const ids = results.map((entry) => entry.providerId);
  const uniqueIds = new Set(ids);

  assert.equal(ids.length, uniqueIds.size);
  assert.equal(ids.filter((id) => id === "openrouter").length, 1);
});

test("providers with hasFree undefined are treated as non-free", () => {
  const entries: ProviderFilterEntry[] = [
    {
      providerId: "paid-only",
      provider: {
        id: "paid-only",
        name: "Paid Only",
        color: "#111827",
      },
      category: "apikey",
    },
    {
      providerId: "free-provider",
      provider: {
        id: "free-provider",
        name: "Free Provider",
        color: "#10B981",
        hasFree: true,
      },
      category: "oauth",
    },
  ];
  const freeIds = filterByCategory(entries, "free").map((entry) => entry.providerId);

  assert.deepEqual(freeIds, ["free-provider"]);
});
