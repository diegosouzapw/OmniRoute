/**
 * tests/unit/select-impacted-tests.test.ts
 *
 * TIA (Test Impact Analysis) selector — given a PR's changed files plus the
 * import-graph impact map, pick the impacted unit tests with a run-all
 * fail-safe. The `__RUN_ALL__` sentinel and `selectImpacted({changed, map})`
 * signature are load-bearing — CI wiring depends on them.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { selectImpacted } from "../../scripts/quality/select-impacted-tests.mjs";

const MAP = {
  sources: {
    "open-sse/services/combo.ts": ["tests/unit/combo-routing-engine.test.ts"],
    "src/sse/services/auth.ts": ["tests/unit/sse-auth.test.ts"],
  },
};

test("mapped source → its impacted test(s)", () => {
  const sel = selectImpacted({ changed: ["open-sse/services/combo.ts"], map: MAP });
  assert.deepEqual(sel, ["tests/unit/combo-routing-engine.test.ts"]);
});

test("changed test file → itself (always run a changed test)", () => {
  const sel = selectImpacted({ changed: ["tests/unit/sse-auth.test.ts"], map: MAP });
  assert.deepEqual(sel, ["tests/unit/sse-auth.test.ts"]);
});

test("hub file (setupPolyfill) → run all (fail-safe)", () => {
  const sel = selectImpacted({ changed: ["open-sse/utils/setupPolyfill.ts"], map: MAP });
  assert.deepEqual(sel, ["__RUN_ALL__"]);
});

test("unmapped source file → run all (fail-safe)", () => {
  const sel = selectImpacted({ changed: ["open-sse/brand-new-file.ts"], map: MAP });
  assert.deepEqual(sel, ["__RUN_ALL__"]);
});
