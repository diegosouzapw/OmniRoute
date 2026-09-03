import { test } from "node:test";
import assert from "node:assert/strict";

import { SEARCH_PROVIDERS } from "@omniroute/open-sse/config/searchRegistry.ts";
import { getStaticModelsForProvider } from "@/lib/providers/staticModels";

const EXCLUDED_FROM_ISSUE = new Set(["duckduckgo-free"]);

const AFFECTED_PER_ISSUE = [
  "serper-search",
  "brave-search",
  "perplexity-search",
  "exa-search",
  "tavily-search",
  "google-pse-search",
  "youcom-search",
  "searxng-search",
  "zai-search",
];

test("#7529 — every SEARCH_PROVIDERS id should have a static model catalog (RED until fixed)", () => {
  const searchProviderIds = Object.keys(SEARCH_PROVIDERS).filter(
    (id) => !EXCLUDED_FROM_ISSUE.has(id)
  );

  for (const id of AFFECTED_PER_ISSUE) {
    assert.ok(searchProviderIds.includes(id), `expected ${id} to still be present in SEARCH_PROVIDERS`);
  }

  const missing: string[] = [];
  for (const id of searchProviderIds) {
    const catalog = getStaticModelsForProvider(id);
    if (!catalog || catalog.length === 0) missing.push(id);
  }

  assert.deepEqual(
    missing.sort(),
    [],
    `search providers with NO static model catalog (will 400 "does not support models listing" on import): ${missing.join(", ")}`
  );
});

test("#7529 — a brand-new SEARCH_PROVIDERS entry with no literal STATIC_MODEL_PROVIDERS override still gets a usable catalog derived from searchTypes (generalized fix, not whack-a-mole)", () => {
  // serper-search has no dedicated STATIC_MODEL_PROVIDERS["serper-search"] entry —
  // this proves the fallback path (derived from SEARCH_PROVIDERS[id].searchTypes)
  // is what supplies its catalog, not a one-off literal added for this issue.
  const config = SEARCH_PROVIDERS["serper-search"];
  const catalog = getStaticModelsForProvider("serper-search");
  assert.ok(catalog && catalog.length > 0, "expected a static catalog for serper-search");
  const catalogIds = new Set((catalog ?? []).map((model) => model.id));
  for (const searchType of config.searchTypes) {
    assert.ok(
      catalogIds.has(searchType),
      `expected the generalized catalog for serper-search to include its declared searchType "${searchType}"`
    );
  }
});
