import test from "node:test";
import assert from "node:assert/strict";
import { renderStructuredTable } from "../../../open-sse/services/compression/engines/rtk/renderers/structuredTable.ts";

const det = {
  type: "kubectl",
  command: "kubectl get pods -o json",
  confidence: 1,
  category: "cloud",
  matchedPatterns: [],
};

test("homogeneous JSON array ⇒ minimal table", () => {
  const input = JSON.stringify([
    { name: "pod-a", status: "Running", restarts: 0 },
    { name: "pod-b", status: "Pending", restarts: 2 },
  ]);
  const r = renderStructuredTable(input, det);
  assert.equal(r.changed, true);
  assert.ok(r.text.includes("name"));
  assert.ok(r.text.includes("pod-a"));
  assert.ok(r.text.includes("Pending"));
  assert.ok(!r.text.includes('"status":')); // não é mais JSON
});

test("malformed JSON ⇒ no-op", () => {
  assert.equal(renderStructuredTable("{not json", det).changed, false);
});

test("single object (not array) ⇒ no-op", () => {
  assert.equal(renderStructuredTable('{"name":"x"}', det).changed, false);
});
