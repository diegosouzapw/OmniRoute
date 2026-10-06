import test from "node:test";
import assert from "node:assert/strict";

import {
  resetEmptyAutoPoolWarnStateForTests,
  warnEmptyAutoPoolOnce,
} from "../../open-sse/services/autoCombo/virtualFactory.ts";

test("warnEmptyAutoPoolOnce emits at most once per label per process", () => {
  resetEmptyAutoPoolWarnStateForTests();
  const t0 = 1_700_000_000_000;
  assert.equal(warnEmptyAutoPoolOnce("auto/zai", "empty", t0), true);
  assert.equal(warnEmptyAutoPoolOnce("auto/zai", "empty", t0 + 1), false);
  assert.equal(warnEmptyAutoPoolOnce("auto/zai", "empty", t0 + 60_000), false);
  assert.equal(warnEmptyAutoPoolOnce("auto/zai", "empty", t0 + 3_600_000), false);
  assert.equal(warnEmptyAutoPoolOnce("auto/other", "empty", t0 + 1), true);
});

test("resetEmptyAutoPoolWarnStateForTests allows a later warn (emptiness reappeared)", () => {
  resetEmptyAutoPoolWarnStateForTests();
  assert.equal(warnEmptyAutoPoolOnce("auto/zai", "empty"), true);
  resetEmptyAutoPoolWarnStateForTests();
  assert.equal(warnEmptyAutoPoolOnce("auto/zai", "empty"), true);
});
