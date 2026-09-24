/**
 * Refusal-cause sidecar: a refused relay is classified WITHOUT mutating
 * anything. 451 and a proven 403 carry `target_refused`; an unproven 403 is
 * `unproven`; 401/429 claim no cause. The classifier never feeds the decision
 * layer: no status write, no filter, no routing change.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyRefusalCause } = await import("../../src/lib/proxyHealth/decision.ts");

test("451 (unavailable for legal reasons) is a proven target refusal", () => {
  assert.equal(classifyRefusalCause(451), "target_refused");
  assert.equal(classifyRefusalCause(451, { geoProven: true }), "target_refused");
  assert.equal(classifyRefusalCause(451, {}), "target_refused");
});

test("403 with a proven cause is a target refusal", () => {
  assert.equal(classifyRefusalCause(403, { geoProven: true }), "target_refused");
});

test("403 without proof is unproven — never a claimed refusal", () => {
  assert.equal(classifyRefusalCause(403), "unproven");
  assert.equal(classifyRefusalCause(403, {}), "unproven");
  assert.equal(classifyRefusalCause(403, { geoProven: false }), "unproven");
});

test("401 and 429 claim no cause", () => {
  for (const status of [401, 429]) {
    assert.equal(classifyRefusalCause(status), "unclassified", `status ${status}`);
    assert.equal(classifyRefusalCause(status, { geoProven: true }), "unclassified", `status ${status}`);
  }
});

test("served and inconclusive statuses claim no cause", () => {
  for (const status of [200, 404, 500, 502]) {
    assert.equal(classifyRefusalCause(status), "unclassified", `status ${status}`);
  }
});
