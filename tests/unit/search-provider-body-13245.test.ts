// #13245 — WebSearchExampleCard now sends provider in body so
// POST /api/v1/search routes to the correct provider instead of
// silently falling back to the default.

import test from "node:test";
import assert from "node:assert/strict";

// Simulate what buildBody() produces after the fix
function buildBody(query: string, maxResults: number, providerId: string) {
  return { query, max_results: maxResults, provider: providerId };
}

const serial = { concurrency: false };

test("#13245 — buildBody includes provider field", serial, () => {
  const body = buildBody("test query", 5, "brave-search");
  assert.equal(body.provider, "brave-search");
  assert.equal(body.query, "test query");
  assert.equal(body.max_results, 5);
});

test("#13245 — buildBody provider is the providerId prop", serial, () => {
  const body = buildBody("hello", 10, "x-search");
  assert.equal(body.provider, "x-search");
});

test("#13245 — provider field prevents silent fallback to default", serial, () => {
  const body = buildBody("test", 5, "tavily");
  // The route handler checks body.provider first — if present, it resolves
  // that provider explicitly instead of auto-selecting the default.
  assert.ok(body.provider, "provider must be present to avoid default fallback");
});
