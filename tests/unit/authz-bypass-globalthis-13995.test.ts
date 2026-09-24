/**
 * #13995 follow-up — root-cause regression guard for the authz-bypass snapshot.
 *
 * The standalone production build makes webpack emit MULTIPLE copies of
 * `src/lib/config/runtimeSettings.ts`: one hydrated at startup
 * (`applyRuntimeSettings` → `applyAuthzBypassSection`) and a separate one used by
 * the route-guard hot path in another route's bundle (`getAuthzBypassSnapshot`).
 * When the store was a plain module-level `let currentAuthzBypass`, each copy had
 * its own state, so a manage-scope-configured bypass prefix written by the
 * settings-PATCH bundle was invisible to the route-guard bundle (#13995) — the
 * exact previously-fixed defect class documented for
 * open-sse/services/systemPrompt.ts (#2470) and
 * open-sse/services/modelDeprecation.ts (#5777).
 *
 * These tests fail on the old plain-`let` implementation: it never touches
 * globalThis (test 1) and never reads a value another module instance wrote
 * to globalThis (test 2). They pass once the snapshot is backed by globalThis,
 * matching the #2470/#5777 pattern.
 */
import test from "node:test";
import assert from "node:assert/strict";

const GLOBAL_KEY = "__omniroute_authzBypass_config__";
const g = globalThis as unknown as Record<
  string,
  { enabled: boolean; prefixes: string[] } | undefined
>;

const runtimeSettings = await import("../../src/lib/config/runtimeSettings.ts");

test.beforeEach(() => {
  delete g[GLOBAL_KEY];
  runtimeSettings.resetRuntimeSettingsStateForTests();
});

test.after(() => {
  delete g[GLOBAL_KEY];
  runtimeSettings.resetRuntimeSettingsStateForTests();
});

test("#13995: applying an authzBypass section writes through globalThis (store is not a per-module let)", async () => {
  await runtimeSettings.applyRuntimeSettings(
    // Minimal settings shape — applyRuntimeSettings/normalizeAuthzBypass reads these
    // fields off it (see src/lib/config/runtimeSettings.ts::normalizeAuthzBypass).
    {
      localOnlyManageScopeBypassEnabled: true,
      localOnlyManageScopeBypassPrefixes: ["/api/mcp/", "/api/resilience/connections"],
    },
    { force: true }
  );

  // A plain module-level `let` would never populate globalThis; the globalThis-backed
  // store does. This is what lets a second webpack module instance see the write.
  assert.ok(g[GLOBAL_KEY], "authzBypass snapshot must live on globalThis, not a module-local let");
  assert.deepEqual(g[GLOBAL_KEY]?.prefixes, ["/api/mcp/", "/api/resilience/connections"]);
});

test("#13995: getAuthzBypassSnapshot reflects a value written by another module instance via globalThis", () => {
  // Simulate the OTHER webpack module instance (e.g. the settings-PATCH route bundle)
  // hydrating the shared store — THIS module instance did NOT call applyRuntimeSettings.
  g[GLOBAL_KEY] = { enabled: true, prefixes: ["/api/mcp/", "/api/resilience/connections"] };

  // With the plain-`let` store this module's own copy would still be the cold-boot
  // default (the #13995 bug: the manage-scope-configured prefix never reaches the
  // route-guard bundle). With the globalThis backing, the read reflects the other
  // instance's write.
  const snapshot = runtimeSettings.getAuthzBypassSnapshot();
  assert.deepEqual(snapshot, {
    enabled: true,
    prefixes: ["/api/mcp/", "/api/resilience/connections"],
  });
});
