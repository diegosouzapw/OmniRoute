// tests/unit/build/check-circular-deps.test.ts
// TDD test for the parseDpdmOutput function in check-circular-deps.mjs.
// Validates JSON parsing logic without executing dpdm (which is slow and
// requires network-resolved node_modules at test time).
import test from "node:test";
import assert from "node:assert/strict";
import { parseDpdmOutput } from "../../../scripts/check/check-circular-deps.mjs";

test("parseDpdmOutput: empty circulars array returns count 0", () => {
  const result = parseDpdmOutput(JSON.stringify({ circulars: [], tree: {}, entries: [] }));
  assert.equal(result.count, 0);
  assert.deepEqual(result.circulars, []);
});

test("parseDpdmOutput: counts each circular path as one entry", () => {
  const synthetic = {
    entries: ["src/a.ts", "src/b.ts"],
    tree: {},
    circulars: [
      ["src/a.ts", "src/b.ts"],
      ["src/b.ts", "src/a.ts"],
      ["src/c.ts", "src/d.ts", "src/c.ts"],
    ],
  };
  const result = parseDpdmOutput(JSON.stringify(synthetic));
  assert.equal(result.count, 3);
  assert.equal(result.circulars.length, 3);
});

test("parseDpdmOutput: preserves circular path arrays", () => {
  const path1 = ["src/lib/db/core.ts", "src/lib/db/settings.ts"];
  const path2 = ["open-sse/handlers/chatCore.ts", "open-sse/services/combo.ts"];
  const result = parseDpdmOutput(JSON.stringify({ circulars: [path1, path2] }));
  assert.equal(result.count, 2);
  assert.deepEqual(result.circulars[0], path1);
  assert.deepEqual(result.circulars[1], path2);
});

test("parseDpdmOutput: missing circulars key returns count 0", () => {
  // dpdm omits circulars when there are none in some versions
  const result = parseDpdmOutput(JSON.stringify({ entries: [], tree: {} }));
  assert.equal(result.count, 0);
  assert.deepEqual(result.circulars, []);
});

test("parseDpdmOutput: null circulars treated as empty", () => {
  // defensive: dpdm could theoretically return null
  const result = parseDpdmOutput(JSON.stringify({ circulars: null }));
  assert.equal(result.count, 0);
  assert.deepEqual(result.circulars, []);
});

test("parseDpdmOutput: throws on invalid JSON", () => {
  assert.throws(() => parseDpdmOutput("not-json{{{"), /dpdm JSON parse failed/);
});

test("parseDpdmOutput: large synthetic output counts correctly", () => {
  const circulars = Array.from({ length: 89 }, (_, i) => [
    `src/lib/module${i}.ts`,
    `src/lib/dep${i}.ts`,
  ]);
  const result = parseDpdmOutput(JSON.stringify({ circulars }));
  assert.equal(result.count, 89);
});
