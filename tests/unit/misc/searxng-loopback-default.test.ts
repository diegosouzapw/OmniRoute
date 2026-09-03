import assert from "node:assert/strict";
import test from "node:test";

import {
  SEARCH_PROVIDERS,
  isUnconfiguredLoopbackSearchProvider,
} from "../../../open-sse/config/searchRegistry.ts";

test("catalog searxng-search default is an unconfigured loopback URL", () => {
  const searxng = SEARCH_PROVIDERS["searxng-search"];
  assert.ok(searxng);
  assert.equal(isUnconfiguredLoopbackSearchProvider(searxng), true);
});

test("overridden SearXNG URL is not skipped", () => {
  const searxng = SEARCH_PROVIDERS["searxng-search"];
  assert.equal(
    isUnconfiguredLoopbackSearchProvider({
      ...searxng,
      baseUrl: "http://searxng.inference.svc/search",
    }),
    false
  );
});

test("other fallback providers are not treated as unconfigured loopback", () => {
  assert.equal(isUnconfiguredLoopbackSearchProvider(SEARCH_PROVIDERS["duckduckgo-free"]), false);
  assert.equal(isUnconfiguredLoopbackSearchProvider(SEARCH_PROVIDERS["brave-search"]), false);
  assert.equal(isUnconfiguredLoopbackSearchProvider(null), false);
});
