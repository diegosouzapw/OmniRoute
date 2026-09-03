import test from "node:test";
import assert from "node:assert/strict";

import {
  HEALTHZ_SLOW_LAG_MS,
  formatHealthzLagWarning,
  observeHealthzEventLoopLag,
  resetHealthzLagWarnStateForTests,
  shouldWarnHealthzLag,
} from "../../../src/lib/healthzLag.ts";

test("shouldWarnHealthzLag ignores sub-threshold lag", () => {
  resetHealthzLagWarnStateForTests();
  assert.equal(shouldWarnHealthzLag(0), false);
  assert.equal(shouldWarnHealthzLag(HEALTHZ_SLOW_LAG_MS - 1), false);
});

test("shouldWarnHealthzLag fires once then debounce", () => {
  resetHealthzLagWarnStateForTests();
  const t0 = 1_700_000_000_000;
  assert.equal(shouldWarnHealthzLag(3748, t0), true);
  assert.equal(shouldWarnHealthzLag(3748, t0 + 1000), false);
  assert.equal(shouldWarnHealthzLag(3748, t0 + 10_000), true);
});

test("observeHealthzEventLoopLag logs when injected lag is high", () => {
  resetHealthzLagWarnStateForTests();
  const messages: string[] = [];
  assert.equal(observeHealthzEventLoopLag((m) => messages.push(m), 12), false);
  assert.equal(messages.length, 0);
  assert.equal(observeHealthzEventLoopLag((m) => messages.push(m), 3748), true);
  assert.equal(messages[0], `[HEALTHZ] ${formatHealthzLagWarning(3748)}`);
  assert.match(messages[0], /3748ms/);
  assert.match(messages[0], /not healthy/);
});
