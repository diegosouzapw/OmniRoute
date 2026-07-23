import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { lptAssign, weightItems } from "../../scripts/quality/balance-e2e-shards.mjs";

// WS4.1 (v3.8.49 quality plan) — the E2E matrix skew was 14× (24m47s vs 1m47s)
// because Playwright --shard distributes by count, not duration. These tests pin
// the LPT packing invariants; the hard one is COMPLETENESS (a lost spec would
// silently hollow the suite — the CLI self-checks it and falls back to --shard).

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("lptAssign puts the heaviest item alone before doubling up lighter shards", () => {
  const shards = lptAssign(
    [
      { file: "huge.spec.ts", weight: 100 },
      { file: "a.spec.ts", weight: 30 },
      { file: "b.spec.ts", weight: 30 },
      { file: "c.spec.ts", weight: 30 },
    ],
    2
  );
  assert.deepEqual(shards[0].files, ["huge.spec.ts"]);
  assert.deepEqual(shards[1].files, ["a.spec.ts", "b.spec.ts", "c.spec.ts"]);
  assert.equal(shards[0].total, 100);
  assert.equal(shards[1].total, 90);
});

test("lptAssign is deterministic on equal weights (filename tiebreak)", () => {
  const items = [
    { file: "b.spec.ts", weight: 10 },
    { file: "a.spec.ts", weight: 10 },
  ];
  const s1 = lptAssign(items, 2);
  const s2 = lptAssign([...items].reverse(), 2);
  assert.deepEqual(s1, s2);
});

test("completeness: every file lands in exactly one shard", () => {
  const items = Array.from({ length: 37 }, (_, i) => ({
    file: `f${String(i).padStart(2, "0")}.spec.ts`,
    weight: (i * 7) % 40,
  }));
  const shards = lptAssign(items, 9);
  const union = shards.flatMap((s) => s.files).sort();
  assert.deepEqual(union, items.map((i) => i.file).sort());
});

test("weightItems gives unknown/new specs the median weight, not an extreme", () => {
  const items = weightItems(["new.spec.ts", "big.spec.ts", "small.spec.ts"], {
    _meta: "x",
    "big.spec.ts": 600,
    "small.spec.ts": 20,
    "other.spec.ts": 100,
  });
  const byFile = Object.fromEntries(items.map((i) => [i.file, i.weight]));
  assert.equal(byFile["big.spec.ts"], 600);
  assert.equal(byFile["small.spec.ts"], 20);
  assert.equal(byFile["new.spec.ts"], 100); // median of [20,100,600]
});

test("the committed timings seed covers every current e2e spec (no drift)", () => {
  const timings = JSON.parse(
    fs.readFileSync(path.join(ROOT, "config", "quality", "e2e-timings.json"), "utf8")
  );
  const specs = fs
    .readdirSync(path.join(ROOT, "tests", "e2e"))
    .filter((f) => f.endsWith(".spec.ts"));
  const missing = specs.filter((f) => !(f in timings));
  // Missing entries are tolerated at runtime (median fallback) — this assert keeps
  // the seed honest so balance quality does not silently rot as specs are added.
  assert.deepEqual(missing, [], `add to config/quality/e2e-timings.json: ${missing.join(", ")}`);
});
