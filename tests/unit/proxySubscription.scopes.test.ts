import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/proxySubscription/scopes.ts");
const { resolveTargetScopes } = mod;

test("global mode binds the global scope", () => {
  assert.deepEqual(resolveTargetScopes({ mode: "global" }), [{ scope: "global", scopeId: null }]);
});

test("rule mode with providers binds one provider scope per selected provider", () => {
  assert.deepEqual(
    resolveTargetScopes({ mode: "rule", ruleProviders: ["provA", "provB"] }),
    [
      { scope: "provider", scopeId: "provA" },
      { scope: "provider", scopeId: "provB" },
    ]
  );
});

test("rule mode with no providers falls back to the global scope", () => {
  assert.deepEqual(
    resolveTargetScopes({ mode: "rule", ruleProviders: [] }),
    [{ scope: "global", scopeId: null }]
  );
  assert.deepEqual(
    resolveTargetScopes({ mode: "rule", ruleProviders: null }),
    [{ scope: "global", scopeId: null }]
  );
});
