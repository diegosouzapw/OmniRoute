/**
 * tests/unit/combo-headroom-ranking.test.ts
 *
 * Coverage for the PURE headroom-ranking helper
 * (open-sse/services/combo/headroomRanking.ts).
 *
 * headroom = 1 − max(util_5h, util_7d). Candidates with MORE free capacity
 * (higher headroom) rank first. Saturation is INJECTED (no network), so the
 * helper is fully deterministic / unit-testable. Ties preserve input order
 * (stable sort).
 *
 * Technique borrowed from the `dario` project: prefer the connection with the
 * most headroom instead of reactively filling one until it 429s.
 */

import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/combo/headroomRanking.ts");
const { computeHeadroom, rankByHeadroom } = mod;

// ─── computeHeadroom (scalar) ────────────────────────────────────────────────

test("computeHeadroom: 1 − max(util5h, util7d)", () => {
  // weekly is the binding (higher util) dimension here
  assert.equal(computeHeadroom({ util5h: 0.2, util7d: 0.7 }), 1 - 0.7);
  // 5h is the binding dimension here
  assert.equal(computeHeadroom({ util5h: 0.9, util7d: 0.1 }), 1 - 0.9);
});

test("computeHeadroom: clamps utilization into [0,1] and never returns <0 or >1", () => {
  // over-saturated upstream (util > 1) → headroom floored at 0
  assert.equal(computeHeadroom({ util5h: 1.4, util7d: 0 }), 0);
  // negative noise → treated as 0 util → full headroom
  assert.equal(computeHeadroom({ util5h: -0.3, util7d: -0.1 }), 1);
});

test("computeHeadroom: missing / non-finite dimensions are treated as 0 util (generous)", () => {
  // fail-open: unknown saturation must not penalize a connection
  assert.equal(computeHeadroom({}), 1);
  assert.equal(computeHeadroom({ util5h: Number.NaN, util7d: undefined }), 1);
  assert.equal(computeHeadroom({ util5h: 0.5 }), 0.5);
});

// ─── rankByHeadroom (ordering) ───────────────────────────────────────────────

const keyOf = (c: { id: string }) => c.id;

test("rankByHeadroom: higher headroom (more free) first — A busy(0.8) vs B free(0.2)", () => {
  const candidates = [{ id: "A" }, { id: "B" }];
  const sat = new Map([
    ["A", { util5h: 0.8, util7d: 0.1 }],
    ["B", { util5h: 0.2, util7d: 0.1 }],
  ]);
  const ranked = rankByHeadroom(candidates, sat, keyOf);
  assert.deepEqual(
    ranked.map((c) => c.id),
    ["B", "A"]
  );
});

test("rankByHeadroom: uses max(5h,7d) — B's high weekly sinks it below A", () => {
  const candidates = [{ id: "A" }, { id: "B" }];
  const sat = new Map([
    ["A", { util5h: 0.5, util7d: 0.5 }], // headroom 0.5
    ["B", { util5h: 0.1, util7d: 0.95 }], // headroom 0.05 (weekly binds)
  ]);
  const ranked = rankByHeadroom(candidates, sat, keyOf);
  assert.deepEqual(
    ranked.map((c) => c.id),
    ["A", "B"]
  );
});

test("rankByHeadroom: tie → stable (preserves original input order)", () => {
  const candidates = [{ id: "X" }, { id: "Y" }, { id: "Z" }];
  const sat = new Map([
    ["X", { util5h: 0.3, util7d: 0.3 }],
    ["Y", { util5h: 0.3, util7d: 0.3 }],
    ["Z", { util5h: 0.3, util7d: 0.3 }],
  ]);
  const ranked = rankByHeadroom(candidates, sat, keyOf);
  assert.deepEqual(
    ranked.map((c) => c.id),
    ["X", "Y", "Z"]
  );
});

test("rankByHeadroom: partial tie keeps stable order within the tied band", () => {
  // A and C both headroom 0.7; B headroom 0.2. Expect A, C (input order), then B.
  const candidates = [{ id: "A" }, { id: "B" }, { id: "C" }];
  const sat = new Map([
    ["A", { util5h: 0.3, util7d: 0.0 }], // 0.7
    ["B", { util5h: 0.8, util7d: 0.0 }], // 0.2
    ["C", { util5h: 0.3, util7d: 0.0 }], // 0.7
  ]);
  const ranked = rankByHeadroom(candidates, sat, keyOf);
  assert.deepEqual(
    ranked.map((c) => c.id),
    ["A", "C", "B"]
  );
});

test("rankByHeadroom: missing saturation entry → treated as full headroom (fail-open, ranks first)", () => {
  const candidates = [{ id: "known" }, { id: "unknown" }];
  const sat = new Map([
    ["known", { util5h: 0.6, util7d: 0.6 }], // headroom 0.4
    // "unknown" absent → headroom 1.0 → should rank first
  ]);
  const ranked = rankByHeadroom(candidates, sat, keyOf);
  assert.deepEqual(
    ranked.map((c) => c.id),
    ["unknown", "known"]
  );
});

test("rankByHeadroom: does not mutate the input array", () => {
  const candidates = [{ id: "A" }, { id: "B" }];
  const original = [...candidates];
  const sat = new Map([
    ["A", { util5h: 0.9, util7d: 0.9 }],
    ["B", { util5h: 0.1, util7d: 0.1 }],
  ]);
  rankByHeadroom(candidates, sat, keyOf);
  assert.deepEqual(candidates, original, "input array order must be unchanged");
});

test("rankByHeadroom: empty / single candidate is a no-op", () => {
  assert.deepEqual(rankByHeadroom([], new Map(), keyOf), []);
  const one = [{ id: "solo" }];
  assert.deepEqual(rankByHeadroom(one, new Map(), keyOf), one);
});
