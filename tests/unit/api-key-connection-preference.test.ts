import assert from "node:assert/strict";
import test from "node:test";

import { pickPreferredConnection } from "../../src/sse/services/connectionPreference";

const A = { id: "a", label: "A" };
const B = { id: "b", label: "B" };
const C = { id: "c", label: "C" };

test("picks the first preferred connection that is still eligible", () => {
  assert.equal(pickPreferredConnection([A, B, C], ["b", "a"])?.id, "b");
  assert.equal(pickPreferredConnection([A, C], ["b", "a"])?.id, "a");
});

test("cannot resurrect a preferred connection removed by health/access gates", () => {
  assert.equal(pickPreferredConnection([C], ["b", "a"]), undefined);
});

test("empty preference keeps legacy selection path untouched", () => {
  assert.equal(pickPreferredConnection([A, B], []), undefined);
  assert.equal(pickPreferredConnection([A, B], null), undefined);
});
