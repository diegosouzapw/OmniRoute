import test from "node:test";
import assert from "node:assert/strict";

const { SEARCH_PROVIDERS, selectProvider } =
  await import("../../open-sse/config/searchRegistry.ts");

test("searxng-search has fallbackOnly: true (fix #9543)", () => {
  const s = SEARCH_PROVIDERS["searxng-search"];
  assert.ok(s);
  assert.equal(s.authType, "none");
  assert.equal(s.costPerQuery, 0);
  assert.equal(s.fallbackOnly, true);
});

test("selectProvider does NOT auto-select searxng-search (fix #9543)", () => {
  const auto = selectProvider();
  assert.ok(auto);
  assert.notEqual(auto.id, "searxng-search");
});

test("duckduckgo-free IS correctly fallbackOnly (design reference)", () => {
  const d = SEARCH_PROVIDERS["duckduckgo-free"];
  assert.equal(d.fallbackOnly, true);
});

test("selectProvider with explicit searxng-search still works", () => {
  const explicit = selectProvider("searxng-search", "web");
  assert.ok(explicit);
  assert.equal(explicit.id, "searxng-search");
});
