import test from "node:test";
import assert from "node:assert/strict";
import {
  parseHiddenModelsByProvider,
  isProviderModelHidden,
} from "../../src/shared/components/modelSelectModalHelpers.ts";

// Regression guard for #9203: the Combo "Add model" picker must hide every
// model source (system, fallback, passthrough alias, node alias, custom,
// auto-fetched) that the operator flagged hidden. The API serializes the DB's
// unified map as `Record<providerId, string[]>`; these helpers normalize it
// and answer per-provider lookups on the raw model id (before prefixing), so
// the component can apply one filter rule across all sources.

test("parseHiddenModelsByProvider: normalizes a valid response into a map", () => {
  const raw = {
    openai: ["gpt-hidden-1", "gpt-hidden-2"],
    claude: ["claude-sonnet-4-6"],
  };
  const parsed = parseHiddenModelsByProvider(raw);

  assert.deepEqual([...parsed.get("openai")!], ["gpt-hidden-1", "gpt-hidden-2"]);
  assert.deepEqual([...parsed.get("claude")!], ["claude-sonnet-4-6"]);
  assert.equal(parsed.has("anthropic"), false);
});

test("parseHiddenModelsByProvider: drops non-string model ids and empty entries", () => {
  const raw = {
    openai: ["valid", 42, null, "", { id: "obj" }],
    empty: [],
    claude: undefined,
  };
  const parsed = parseHiddenModelsByProvider(raw);

  assert.deepEqual([...parsed.get("openai")!], ["valid"]);
  assert.equal(parsed.has("empty"), false);
  assert.equal(parsed.has("claude"), false);
});

test("parseHiddenModelsByProvider: tolerates missing / null / malformed payloads", () => {
  assert.equal(parseHiddenModelsByProvider(undefined).size, 0);
  assert.equal(parseHiddenModelsByProvider(null).size, 0);
  assert.equal(parseHiddenModelsByProvider("nope").size, 0);
  assert.equal(parseHiddenModelsByProvider(["array"]).size, 0);
  assert.equal(parseHiddenModelsByProvider(42).size, 0);
});

test("isProviderModelHidden: matches on the raw model id per provider", () => {
  const parsed = parseHiddenModelsByProvider({
    openai: ["gpt-hidden"],
    claude: ["claude-sonnet-4-6"],
  });

  assert.equal(isProviderModelHidden(parsed, "openai", "gpt-hidden"), true);
  assert.equal(isProviderModelHidden(parsed, "claude", "claude-sonnet-4-6"), true);
  // Visible / different-provider / unknown ids are not hidden.
  assert.equal(isProviderModelHidden(parsed, "openai", "gpt-visible"), false);
  assert.equal(isProviderModelHidden(parsed, "claude", "gpt-hidden"), false);
  assert.equal(isProviderModelHidden(parsed, "unknown", "gpt-hidden"), false);
});

test("isProviderModelHidden: empty map and malformed inputs are never hidden", () => {
  const empty = new Map<string, Set<string>>();
  assert.equal(isProviderModelHidden(empty, "openai", "anything"), false);
  assert.equal(isProviderModelHidden(empty, "openai", ""), false);
  assert.equal(isProviderModelHidden(empty, "", "x"), false);
});
