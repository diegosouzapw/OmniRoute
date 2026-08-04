import test from "node:test";
import assert from "node:assert/strict";
import { parseComboProxyAssignmentIds } from "../../src/app/(dashboard)/dashboard/combos/useComboProxyAssignments.ts";

test("#7149: parseComboProxyAssignmentIds extracts scopeIds from valid combo assignments", () => {
  const data = {
    items: [
      { scopeId: "combo-1", proxyId: "proxy-1", scope: "combo" },
      { scopeId: "combo-2", proxyId: "proxy-2", scope: "combo" },
    ],
  };
  assert.deepEqual(parseComboProxyAssignmentIds(data), ["combo-1", "combo-2"]);
});

test("#7149: parseComboProxyAssignmentIds drops entries missing scopeId or proxyId", () => {
  const data = {
    items: [
      { scopeId: "combo-1", proxyId: "proxy-1" },
      { scopeId: "combo-2", proxyId: null },
      { scopeId: null, proxyId: "proxy-3" },
      {},
    ],
  };
  assert.deepEqual(parseComboProxyAssignmentIds(data), ["combo-1"]);
});

test("#7149: parseComboProxyAssignmentIds returns [] for missing/malformed items", () => {
  assert.deepEqual(parseComboProxyAssignmentIds(null), []);
  assert.deepEqual(parseComboProxyAssignmentIds(undefined), []);
  assert.deepEqual(parseComboProxyAssignmentIds({}), []);
  assert.deepEqual(parseComboProxyAssignmentIds({ items: "not-an-array" }), []);
});
