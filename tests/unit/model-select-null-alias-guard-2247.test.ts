import test from "node:test";
import assert from "node:assert/strict";
import { buildNodeAliasModels } from "../../src/shared/components/modelSelectModalHelpers.ts";

// Regression guard for port of decolua/9router#2247 (wahyuzero).
//
// In ModelSelectModal, the custom-provider ("node") branch built its alias
// model list with a raw `Object.entries(modelAliases).filter(([, fullModel])
// => fullModel.startsWith(...))`. When `modelAliases` contains a null or
// undefined value (e.g. a stale/partial entry persisted to settings),
// `.startsWith` is called on a non-string and throws a TypeError, crashing
// the modal when opening Create Combo for a custom provider node. The fix
// mirrors the sibling passthrough-alias guard (buildPassthroughAliasModels,
// decolua/9router#485) by requiring `typeof fullModel === "string"` before
// calling `.startsWith`.

test("buildNodeAliasModels: skips null/undefined alias values instead of throwing", () => {
  const modelAliases = {
    a: "prov/x",
    b: null,
    c: undefined,
  } as unknown as Record<string, string>;

  assert.doesNotThrow(() => buildNodeAliasModels(modelAliases, "prov", "prov"));

  const result = buildNodeAliasModels(modelAliases, "prov", "prov");
  assert.deepEqual(result, [{ id: "x", name: "a", value: "prov/x", source: "alias" }]);
});

test("buildNodeAliasModels: strips providerId prefix and rewrites value with nodePrefix", () => {
  const modelAliases = {
    "GPT 4o": "openai-compatible-chat-uuid/gpt-4o",
    Sonnet: "anthropic/claude-3-5-sonnet",
  };

  const result = buildNodeAliasModels(modelAliases, "openai-compatible-chat-uuid", "my-node");

  assert.deepEqual(result, [
    { id: "gpt-4o", name: "GPT 4o", value: "my-node/gpt-4o", source: "alias" },
  ]);
});

test("buildNodeAliasModels: tolerates empty / malformed maps", () => {
  assert.deepEqual(buildNodeAliasModels({}, "prov", "prov"), []);
  assert.deepEqual(
    buildNodeAliasModels({ x: undefined as unknown as string }, "prov", "prov"),
    []
  );
});
