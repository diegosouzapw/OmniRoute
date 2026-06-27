import test from "node:test";
import assert from "node:assert/strict";
import {
  encodeToonBlock,
  wrapToon,
  decodeToon,
  TOON_FENCE_OPEN,
} from "../../../open-sse/services/compression/engines/headroom/toon.ts";

const cases: Array<{ name: string; arr: Record<string, unknown>[] }> = [
  {
    name: "homogêneo",
    arr: [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ],
  },
  {
    name: "heterogêneo",
    arr: [
      { id: 1, x: 1 },
      { id: 2, y: 2 },
    ],
  },
  {
    name: "nested",
    arr: [
      { id: 1, meta: { a: [1, 2] } },
      { id: 2, meta: { a: [3] } },
    ],
  },
  {
    name: "nullable",
    arr: [
      { id: 1, v: null },
      { id: 2, v: 5 },
    ],
  },
  {
    name: "strings especiais",
    arr: [
      { id: 1, s: 'a,b "q"\nc' },
      { id: 2, s: "plain" },
    ],
  },
];

for (const c of cases) {
  test(`toon round-trips: ${c.name}`, () => {
    const inner = encodeToonBlock(c.arr);
    assert.notEqual(inner, null, "encode deve produzir string");
    const fenced = wrapToon(inner as string);
    assert.ok(fenced.startsWith(TOON_FENCE_OPEN));
    const decoded = decodeToon(fenced);
    assert.deepEqual(decoded, c.arr);
  });
}

test("decodeToon aceita bloco sem fence", () => {
  const arr = [{ a: 1 }, { a: 2 }];
  const inner = encodeToonBlock(arr) as string;
  assert.deepEqual(decodeToon(inner), arr);
});

test("encodeToonBlock é fail-open (não lança)", () => {
  const a: Record<string, unknown> = { id: 1 };
  a["self"] = a;
  assert.doesNotThrow(() => {
    const r = encodeToonBlock([a]);
    assert.equal(r, null);
  });
});
