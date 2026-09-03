import test from "node:test";
import assert from "node:assert/strict";
import { sortCatalogModelsProviderGrouped } from "../../../src/app/api/v1/models/catalogOrder.ts";

test("combo pinning: combos move to front regardless of input or registry order", () => {
  // Combos are at input positions 1 and 3, and "combo" is not a registry key
  // (would rank Infinity/unknown without pinning). Asserting they land first
  // proves pinning overrides both input order and registry precedence.
  const input = [
    { id: "openai/gpt-4", owned_by: "openai" },
    { id: "auto/smart", owned_by: "combo" },
    { id: "anthropic/claude", owned_by: "anthropic" },
    { id: "auto/cheap", owned_by: "combo" },
  ];
  const out = sortCatalogModelsProviderGrouped(input);
  assert.deepEqual(
    out.map((m) => m.id),
    ["auto/smart", "auto/cheap", "openai/gpt-4", "anthropic/claude"]
  );
});

test("canonical owned_by grouping: oc prefix with opencode owned_by stays contiguous", () => {
  const input = [
    { id: "oc/kimi-k2", owned_by: "opencode" },
    { id: "openai/gpt-4", owned_by: "openai" },
    { id: "oc/glm-5", owned_by: "opencode" },
    { id: "openai/gpt-5", owned_by: "openai" },
  ];
  const out = sortCatalogModelsProviderGrouped(input);
  const keys = out.map((m) => m.owned_by);
  assert.equal(keys.lastIndexOf("opencode") - keys.indexOf("opencode"), 1);
  assert.equal(keys.lastIndexOf("openai") - keys.indexOf("openai"), 1);
});

test("registry precedence over code-unit: qoder before agy (both oauth)", () => {
  // oauth.ts key order: qoder (idx 3) before agy (idx 4); code-unit: agy < qoder.
  const input = [
    { id: "agy/gemini", owned_by: "agy" },
    { id: "qoder/model", owned_by: "qoder" },
  ];
  const out = sortCatalogModelsProviderGrouped(input);
  assert.deepEqual(
    out.map((m) => m.owned_by),
    ["qoder", "agy"]
  );
});

test("registry precedence over code-unit: zed (oauth) before openai (apikey)", () => {
  // oauth tier precedes apikey tier; code-unit: openai < zed.
  const input = [
    { id: "openai/gpt-4", owned_by: "openai" },
    { id: "zed/model", owned_by: "zed" },
  ];
  const out = sortCatalogModelsProviderGrouped(input);
  assert.deepEqual(
    out.map((m) => m.owned_by),
    ["zed", "openai"]
  );
});

test("unknown providers: deterministic code-unit order", () => {
  const input = [
    { id: "zzz-unknown/m1", owned_by: "zzz-unknown" },
    { id: "Zed-unknown/m2", owned_by: "Zed-unknown" },
    { id: "aaa-unknown/m3", owned_by: "aaa-unknown" },
    { id: "9nine-unknown/m4", owned_by: "9nine-unknown" },
  ];
  const out = sortCatalogModelsProviderGrouped(input);
  // Code-unit: '9'(0x39) < 'Z'(0x5A) < 'a'(0x61) < 'z'(0x7A).
  assert.deepEqual(
    out.map((m) => m.owned_by),
    ["9nine-unknown", "Zed-unknown", "aaa-unknown", "zzz-unknown"]
  );
});

test("malformed rows: fallback to id-prefix, exact ordered sequence", () => {
  // Empty id ("") is legal by the Record<string, unknown> type; group key ""
  // sorts first among unknown fallbacks by code unit. Covers missing owned_by,
  // empty owned_by, slashless id, and empty id, plus stability within a group.
  const input = [
    { id: "openai/gpt-4", owned_by: "openai" }, // registry group
    { id: "weird/model", owned_by: "" }, // empty owned_by → prefix "weird"
    { id: "slashless", owned_by: "" }, // empty owned_by, no slash → "slashless"
    { id: "openai/gpt-5", owned_by: "openai" }, // registry group
    { id: "weird/model2" }, // missing owned_by → prefix "weird"
    { id: "", owned_by: "" }, // empty id → group key ""
  ];
  const out = sortCatalogModelsProviderGrouped(input);
  // openai (finite registry rank) first in input order; then unknown fallbacks
  // by code-unit of group key: "" < "slashless" < "weird"; stable within "weird".
  assert.deepEqual(
    out.map((m) => m.id),
    ["openai/gpt-4", "openai/gpt-5", "", "slashless", "weird/model", "weird/model2"]
  );
});

test("stability: equal-ID twins preserve input order", () => {
  const input = [
    { id: "openai/gpt-4", owned_by: "openai", subtype: "chat" },
    { id: "openai/gpt-4", owned_by: "openai", subtype: "speech" },
    { id: "openai/gpt-3.5", owned_by: "openai" },
  ];
  const out = sortCatalogModelsProviderGrouped(input);
  assert.equal(out[0].subtype, "chat");
  assert.equal(out[1].subtype, "speech");
  assert.equal(out[2].id, "openai/gpt-3.5");
});

test("non-mutation: input array and elements untouched", () => {
  const input = [
    { id: "openai/gpt-4", owned_by: "openai" },
    { id: "anthropic/claude", owned_by: "anthropic" },
  ];
  const snapshot = JSON.parse(JSON.stringify(input));
  const out = sortCatalogModelsProviderGrouped(input);
  assert.deepEqual(input, snapshot);
  assert.notEqual(out, input);
  assert.equal(out.length, input.length);
});

test("no drops or dupes: every row present exactly once", () => {
  const input = [
    { id: "openai/gpt-4", owned_by: "openai" },
    { id: "auto/x", owned_by: "combo" },
    { id: "anthropic/claude", owned_by: "anthropic" },
    { id: "weird/m", owned_by: "" },
    { id: "openai/gpt-5", owned_by: "openai" },
  ];
  const out = sortCatalogModelsProviderGrouped(input);
  assert.equal(out.length, input.length);
  assert.deepEqual(out.map((m) => m.id).sort(), input.map((m) => m.id).sort());
});
