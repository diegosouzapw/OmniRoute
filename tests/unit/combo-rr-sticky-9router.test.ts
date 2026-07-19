import test from "node:test";
import assert from "node:assert/strict";
import { resolveComboStickyRoundRobinLimit } from "../../open-sse/services/combo/rrState.ts";

test("resolveComboStickyRoundRobinLimit prefers per-combo, then comboSticky, then account sticky", () => {
  const settings = { stickyRoundRobinLimit: 3, comboStickyRoundRobinLimit: 2 };
  assert.equal(resolveComboStickyRoundRobinLimit(5, settings), 5);
  assert.equal(resolveComboStickyRoundRobinLimit(undefined, settings), 2);
  assert.equal(
    resolveComboStickyRoundRobinLimit(undefined, { stickyRoundRobinLimit: 7 }),
    7
  );
});