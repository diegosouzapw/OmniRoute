import test from "node:test";
import assert from "node:assert/strict";

test("combo routing module loads without unresolved symbols", async () => {
  const combo = await import("../../open-sse/services/combo.ts");

  assert.equal(typeof combo.filterTargetsByRequestCompatibility, "function");
  assert.equal(typeof combo.handleComboChat, "function");
});
