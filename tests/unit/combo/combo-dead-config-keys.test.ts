import test from "node:test";
import assert from "node:assert/strict";

const { DEAD_COMBO_CONFIG_KEYS, stripDeadComboConfigKeys } = await import(
  "../../../src/lib/combos/deadConfigKeys.ts"
);

test("dead keys removed, live keys kept", () => {
  const out = stripDeadComboConfigKeys({
    pipelineConcurrency: 4,
    resetAwareEnabled: true,
    resetAwareWindow: 7,
    maxComboDepth: 3,
    queueDepth: 10,
    queueTimeoutMs: 5000,
  }) as Record<string, unknown>;
  assert.deepEqual(out, { maxComboDepth: 3, queueDepth: 10, queueTimeoutMs: 5000 });
});

test("no dead keys returns original reference", () => {
  const input = { maxComboDepth: 3 };
  assert.equal(stripDeadComboConfigKeys(input), input);
});

test("null, array, non-object pass through", () => {
  assert.equal(stripDeadComboConfigKeys(null), null);
  const arr = [1, 2];
  assert.equal(stripDeadComboConfigKeys(arr), arr);
  assert.equal(stripDeadComboConfigKeys(42), 42);
});

test("exactly 3 dead keys", () => {
  assert.deepEqual([...DEAD_COMBO_CONFIG_KEYS], [
    "pipelineConcurrency",
    "resetAwareEnabled",
    "resetAwareWindow",
  ]);
});

test("dashboard keeps its UI-only keys out of the shared dead list", () => {
  for (const k of ["timeoutMs", "healthCheckEnabled", "healthCheckTimeoutMs"]) {
    assert.equal((DEAD_COMBO_CONFIG_KEYS as ReadonlyArray<string>).includes(k), false);
  }
});
