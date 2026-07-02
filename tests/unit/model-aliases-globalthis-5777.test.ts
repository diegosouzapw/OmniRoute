/**
 * #5777 follow-up — root-cause regression guard for the custom-alias store.
 *
 * The standalone production build makes webpack emit TWO copies of
 * `open-sse/services/modelDeprecation.ts`: one hydrated at startup
 * (`applyRuntimeSettings` → `setCustomAliases`) for request routing, and one used by
 * `GET /api/settings/model-aliases`. When the store was a plain module-level
 * `let _customAliases`, each copy had its own state, so the API route read an empty
 * map after restart (#5777). The store is now backed by `globalThis` so BOTH module
 * instances share one object — the same #5312 pattern used by thinkingBudget.ts /
 * backgroundTaskDetector.ts.
 *
 * These tests fail on the old plain-`let` implementation: it never touches globalThis
 * (test 1) and never reads a value another instance wrote to globalThis (test 2).
 */
import test from "node:test";
import assert from "node:assert/strict";

const GLOBAL_KEY = "__omniroute_customAliases__";
const g = globalThis as unknown as Record<string, Record<string, string> | undefined>;

const modelDeprecation = await import("../../open-sse/services/modelDeprecation.ts");

test.beforeEach(() => {
  delete g[GLOBAL_KEY];
});

test.after(() => {
  delete g[GLOBAL_KEY];
});

test("#5777: setCustomAliases writes through globalThis (store is not a per-module let)", () => {
  modelDeprecation.setCustomAliases({ "old-model": "new-model" });

  // A plain module-level `let` would never populate globalThis; the globalThis-backed
  // store does. This is what lets a second webpack module instance see the write.
  assert.deepEqual(
    g[GLOBAL_KEY],
    { "old-model": "new-model" },
    "custom aliases must live on globalThis so both webpack module graphs share them"
  );
});

test("#5777: reads reflect a value written by another module instance via globalThis", () => {
  // Simulate the OTHER webpack module instance (the startup/instrumentation graph)
  // hydrating the shared store — this module instance did NOT call setCustomAliases.
  g[GLOBAL_KEY] = { "claude-opus-4-8": "mimo/mimo-v2.5-pro" };

  // With the plain-`let` store this module's own copy would still be empty (the #5777
  // bug). With the globalThis backing the read reflects the other instance's write.
  assert.deepEqual(modelDeprecation.getCustomAliases(), {
    "claude-opus-4-8": "mimo/mimo-v2.5-pro",
  });
  assert.equal(modelDeprecation.resolveModelAlias("claude-opus-4-8"), "mimo/mimo-v2.5-pro");
  assert.equal(
    modelDeprecation.getAllAliases()["claude-opus-4-8"],
    "mimo/mimo-v2.5-pro",
    "getAllAliases must merge the globalThis-backed custom aliases over built-ins"
  );
});

test("#5777: addCustomAlias / removeCustomAlias mutate the shared globalThis store", () => {
  modelDeprecation.setCustomAliases({});
  modelDeprecation.addCustomAlias("foo", "bar");
  assert.equal(g[GLOBAL_KEY]?.foo, "bar", "addCustomAlias must mutate the globalThis store");
  assert.equal(modelDeprecation.resolveModelAlias("foo"), "bar");

  assert.equal(modelDeprecation.removeCustomAlias("foo"), true);
  assert.equal(g[GLOBAL_KEY]?.foo, undefined, "removeCustomAlias must clear it from globalThis");
  assert.equal(modelDeprecation.removeCustomAlias("missing"), false);
});
