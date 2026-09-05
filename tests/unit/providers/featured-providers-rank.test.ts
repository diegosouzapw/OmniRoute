// Featured-provider ordering on /dashboard/providers.
//
// The sponsor rail is explicitly ranked, not alphabetical: Kimi (founding friend)
// first, Cheaper Inference second, everything else alphabetical below them. A plain
// Set would order "Cheaper Inference" ABOVE "Kimi" alphabetically — the exact bug
// this rank map exists to prevent.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getFeaturedProviderRank,
  isFeaturedProviderId,
  SPONSOR_BRAND_COLORS,
} from "@/app/(dashboard)/dashboard/providers/featuredProviders";
import { sortProviderEntriesFeaturedFirst } from "@/app/(dashboard)/dashboard/providers/providerPageUtils";

const entry = (providerId: string, name: string) =>
  ({
    providerId,
    provider: { id: providerId, name },
    stats: { total: 0 },
    displayAuthType: "apikey" as const,
    toggleAuthType: "apikey" as const,
  }) as never;

test("Kimi family ranks 1, Cheaper Inference ranks 2", () => {
  assert.equal(getFeaturedProviderRank("moonshot"), 1);
  assert.equal(getFeaturedProviderRank("kimi-coding"), 1);
  assert.equal(getFeaturedProviderRank("kimi-web"), 1);
  assert.equal(getFeaturedProviderRank("cheaperinference"), 2);
  assert.equal(getFeaturedProviderRank("openrouter"), null);
});

test("isFeaturedProviderId still answers for every ranked provider", () => {
  assert.equal(isFeaturedProviderId("moonshot"), true);
  assert.equal(isFeaturedProviderId("cheaperinference"), true);
  assert.equal(isFeaturedProviderId("openrouter"), false);
  assert.equal(isFeaturedProviderId(null), false);
});

test("sort puts Kimi first and Cheaper Inference second despite the alphabet", () => {
  // Deliberately seeded in an order where a naive alphabetical sort fails:
  // "Anthropic" < "Cheaper Inference" < "Kimi" < "Zed".
  const sorted = sortProviderEntriesFeaturedFirst([
    entry("zed", "Zed"),
    entry("cheaperinference", "Cheaper Inference"),
    entry("anthropic", "Anthropic"),
    entry("moonshot", "Kimi"),
  ]);
  assert.deepEqual(
    sorted.map((e) => e.providerId),
    ["moonshot", "cheaperinference", "anthropic", "zed"]
  );
});

test("providers sharing a rank stay alphabetical among themselves", () => {
  const sorted = sortProviderEntriesFeaturedFirst([
    entry("kimi-web", "Kimi Web"),
    entry("moonshot", "Kimi"),
    entry("cheaperinference", "Cheaper Inference"),
  ]);
  // Both Kimi entries are rank 1 -> alphabetical between them ("Kimi" < "Kimi Web"),
  // and both still precede rank 2.
  assert.deepEqual(
    sorted.map((e) => e.providerId),
    ["moonshot", "kimi-web", "cheaperinference"]
  );
});

test("each sponsor declares a brand color used by the card accent", () => {
  assert.equal(SPONSOR_BRAND_COLORS.moonshot, "#1783FF");
  assert.equal(SPONSOR_BRAND_COLORS.cheaperinference, "#31f889");
});
