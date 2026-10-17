import test from "node:test";
import assert from "node:assert/strict";
import { getConnectionScopedEffortTiers, getThinkingCapabilityFields } from "../../src/app/api/v1/models/catalogHelpers.ts";

// An empty registry list is a declaration that the model has no effort tiers.
// Synced tiers must not fill it, or the catalog advertises variants the
// executor rejects. An absent list still falls through to the synced tiers.
test("an empty effort list blocks synced tiers in the catalog", () => {
  const declared = getThinkingCapabilityFields(
    "glm",
    "glm-5",
    true,
    [],
    false,
    ["low", "medium", "high"]
  );
  assert.equal(declared.supportsThinking, true);
  assert.equal("effort_tiers" in declared, false);

  const absent = getThinkingCapabilityFields(
    "anthropic",
    "claude-haiku-5-5",
    true,
    undefined,
    false,
    ["low", "medium", "high", "xhigh", "max"]
  );
  assert.deepEqual(absent.effort_tiers, ["low", "medium", "high", "xhigh", "max"]);
});

// A connection that declares an empty effort list must stay empty. The
// fallback list is for connections that declare nothing, not for ones that
// declare no tiers.
test("a connection with an empty effort list does not take the fallback", () => {
  const modelsByConnection = {
    empty: [{ id: "glm-5", supportsThinking: true, supportedThinkingEfforts: [] }],
  };
  assert.deepEqual(
    getConnectionScopedEffortTiers("glm-5", {}, ["empty"], modelsByConnection, undefined, ["low", "high"]),
    []
  );
});
