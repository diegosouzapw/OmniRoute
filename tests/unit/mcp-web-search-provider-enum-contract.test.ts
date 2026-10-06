// #10209 — contract test: the MCP `omniroute_web_search` `provider` enum is now
// generated dynamically from the search registry (`getActiveSearchProviders`).
// This pins the invariant that the dynamic enum does not silently break the Zod
// schema exposed to MCP clients (or the tool's scope), regardless of future
// registry additions/removals or `disabled` flags. If the registry drifts, this
// test turns red before any client sees a broken/widened contract.
import test from "node:test";
import assert from "node:assert/strict";

const { getActiveSearchProviders } = await import("../../open-sse/mcp-server/schemas/providerEnums.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { webSearchInput, webSearchTool } = await import("../../open-sse/mcp-server/schemas/tools.ts");

// The provider set the tool historically exposed to MCP clients (the hardcoded
// enum this PR replaced). Every one of these MUST keep parsing so existing
// clients are never broken by the dynamic enum.
const LEGACY_CONTRACT_PROVIDERS = [
  "serper-search",
  "brave-search",
  "perplexity-search",
  "exa-search",
  "tavily-search",
  "google-pse-search",
  "linkup-search",
  "searchapi-search",
  "searxng-search",
] as const;

function activeRegistryIds(): string[] {
  return Object.values(SEARCH_PROVIDERS)
    .filter((p) => !p.disabled)
    .map((p) => p.id)
    .sort();
}

test("getActiveSearchProviders() is a non-empty tuple of active registry providers", () => {
  const active = getActiveSearchProviders();
  assert.ok(Array.isArray(active), "should return an array (Zod enum tuple)");
  assert.ok(active.length > 0, "dynamic enum must never be empty");
  assert.deepEqual([...active].sort(), activeRegistryIds());
});

test("web_search inputSchema provider enum equals the active provider set", () => {
  const shape = webSearchInput.shape as { provider: { unwrap: () => unknown } };
  const providerManager = shape.provider; // ZodOptional around the ZodEnum
  const unwrapped = providerManager.unwrap() as { options: string[] };
  const options = unwrapped.options;
  assert.ok(Array.isArray(options), "provider field should be an enum");
  assert.ok(options.length > 0, "provider enum should have at least one value");
  assert.deepEqual([...options].sort(), activeRegistryIds());
});

test("dynamic enum is a superset of the legacy contract (existing clients not broken)", () => {
  for (const id of LEGACY_CONTRACT_PROVIDERS) {
    const result = webSearchInput.safeParse({ query: "test", provider: id });
    assert.ok(result.success, `legacy provider "${id}" must still parse`);
  }
  // Every active registry provider must also be selectable by an MCP client.
  for (const id of activeRegistryIds()) {
    const result = webSearchInput.safeParse({ query: "test", provider: id });
    assert.ok(result.success, `active registry provider "${id}" must parse`);
  }
});

test("unknown provider values are rejected (contract stays tight)", () => {
  const result = webSearchInput.safeParse({ query: "test", provider: "no-such-search-provider" });
  assert.equal(result.success, false);
});

test("tool registration + scope are unaffected by the dynamic enum", () => {
  assert.equal(webSearchTool.name, "omniroute_web_search");
  assert.equal(webSearchTool.inputSchema, webSearchInput);
  assert.ok(webSearchTool.scopes.includes("execute:search"), "web search tool scope must be retained");
});