import test from "node:test";
import assert from "node:assert/strict";
import {
  parseHiddenModelsByProvider,
  parseModelVisibilityAllowlists,
  isProviderModelHidden,
  buildNodeAliasModels,
} from "../../src/shared/components/modelSelectModalHelpers.ts";

test("#16977 both picker sources honor the same allowlist and explicit hidden bases", () => {
  const hidden = parseHiddenModelsByProvider({
    openrouter: ["vendor/blocked"],
    node1: ["vendor/blocked"],
  });
  const allow = parseModelVisibilityAllowlists({
    openrouter: ["vendor/chosen"],
    node1: ["vendor/chosen"],
    empty: [],
  });
  assert.equal(isProviderModelHidden(hidden, "openrouter", "vendor/chosen", allow), false);
  assert.equal(isProviderModelHidden(hidden, "openrouter", "vendor/chosen-high", allow), false);
  assert.equal(isProviderModelHidden(hidden, "openrouter", "vendor/new-synced", allow), true);
  assert.equal(isProviderModelHidden(hidden, "openrouter", "vendor/blocked-high", allow), true);
  assert.equal(isProviderModelHidden(hidden, "empty", "vendor/anything", allow), true);
  assert.equal(isProviderModelHidden(hidden, "unconfigured", "vendor/anything", allow), false);

  const alias = buildNodeAliasModels({ friendly: "node1/vendor/chosen" }, "node1", "custom-prefix");
  assert.deepEqual(alias.map((item) => item.id), ["vendor/chosen"]);
  assert.deepEqual(alias.map((item) => item.value), ["custom-prefix/vendor/chosen"]);
  assert.equal(isProviderModelHidden(hidden, "node1", alias[0].id, allow), false);
});

test("#16977 malformed policy payload is ignored; empty persisted list is not", () => {
  assert.equal(parseModelVisibilityAllowlists({ a: "x", b: [1], c: null }).size, 0);
  const parsed = parseModelVisibilityAllowlists({ provider: [] });
  assert.equal(parsed.has("provider"), true);
  assert.equal(isProviderModelHidden(new Map(), "provider", "any", parsed), true);
});
