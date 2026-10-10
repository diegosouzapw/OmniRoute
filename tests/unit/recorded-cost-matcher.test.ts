import test from "node:test";
import assert from "node:assert/strict";
import {
  RecordedCostMatcher,
  type RecordedCostRow,
} from "../../src/lib/usage/recordedCostMatcher.ts";

const tolerance = 30000;
const row = (rowId: number, timestamp: number): RecordedCostRow => ({
  rowId,
  timestamp,
  apiKeyId: "synthetic",
  cost: rowId / 100,
});

// Reference implementation of the previous nearest-unused scan, kept only as
// an oracle on small fixtures. Never use it for the scalability test below.
function reference(rows: RecordedCostRow[], timestamp: number, used: Set<number>) {
  if (!Number.isFinite(timestamp)) return null;
  let best: RecordedCostRow | null = null;
  let delta = Infinity;
  for (const candidate of rows) {
    if (used.has(candidate.rowId)) continue;
    const distance = Math.abs(candidate.timestamp - timestamp);
    if (distance <= tolerance && distance < delta) {
      best = candidate;
      delta = distance;
    }
  }
  if (best) used.add(best.rowId);
  return best;
}

test("nearest matching preserves timestamp/row-ID ties and consumes each row once", async () => {
  const rows = [row(1, 0), row(2, 0), row(3, 20000), row(4, 20000)];
  const matcher = await RecordedCostMatcher.create(rows);
  assert.equal(matcher.takeClosest(10000, tolerance)?.rowId, 1);
  assert.equal(matcher.takeClosest(10000, tolerance)?.rowId, 2);
  assert.equal(matcher.takeClosest(10000, tolerance)?.rowId, 3);
  assert.equal(matcher.takeClosest(20000, tolerance)?.rowId, 4);
  assert.equal(matcher.takeClosest(20000, tolerance), null);
});

test("invalid timestamps and misses do not consume candidates; tolerance is inclusive", async () => {
  const matcher = await RecordedCostMatcher.create([row(1, 0), row(2, 90000)]);
  assert.equal(matcher.takeClosest(NaN, tolerance), null);
  assert.equal(matcher.takeClosest(Infinity, tolerance), null);
  assert.equal(matcher.takeClosest(45000, tolerance), null);
  assert.equal(matcher.takeClosest(-30001, tolerance), null);
  assert.equal(matcher.takeClosest(-30000, tolerance)?.rowId, 1);
  assert.equal(matcher.takeClosest(120000, tolerance)?.rowId, 2);
  const empty = await RecordedCostMatcher.create([]);
  assert.equal(empty.takeClosest(0, tolerance), null);
});

test("indexed matching agrees with the previous scan for deterministic shuffled requests", async () => {
  let seed = 8675309;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed;
  };
  for (let fixture = 0; fixture < 20; fixture++) {
    const rows = Array.from({ length: 200 }, (_, i) => row(i + 1, (random() % 50) * 10000)).sort(
      (a, b) => a.timestamp - b.timestamp || a.rowId - b.rowId
    );
    const matcher = await RecordedCostMatcher.create(rows);
    const used = new Set<number>();
    for (let i = 0; i < 300; i++) {
      const timestamp = (random() % 65) * 10000 - 50000;
      assert.deepEqual(matcher.takeClosest(timestamp, tolerance), reference(rows, timestamp, used));
    }
  }
});

for (const dense of [false, true]) {
  test(`large ${dense ? "duplicate-time" : "chronological"} histories use logarithmic candidate access`, async () => {
    const count = 16384;
    let accesses = 0;
    const rows = new Proxy(
      Array.from({ length: count }, (_, i) => row(i + 1, dense ? 0 : i * 60000)),
      {
        get(target, key, receiver) {
          if (typeof key === "string" && /^\d+$/.test(key)) accesses++;
          return Reflect.get(target, key, receiver);
        },
      }
    );
    const matcher = await RecordedCostMatcher.create(rows);
    for (let i = 0; i < count; i++) {
      assert.equal(matcher.takeClosest(dense ? 1 : i * 60000, tolerance)?.rowId, i + 1);
    }
    assert.ok(accesses < count * 100, `unexpected candidate access count: ${accesses}`);
  });
}

test("index construction yields across multiple event-loop turns", async () => {
  let ticks = 0;
  let done = false;
  const tick = () => {
    if (!done) {
      ticks++;
      setImmediate(tick);
    }
  };
  setImmediate(tick);
  try {
    await RecordedCostMatcher.create(Array.from({ length: 4096 }, (_, i) => row(i, i)));
    assert.ok(ticks > 2, "index construction must not monopolize the loop");
  } finally {
    done = true;
  }
});
