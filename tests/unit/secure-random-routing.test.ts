/**
 * Regression guard for CodeQL alert #665 (js/insecure-randomness).
 *
 * Combo target selection (weighted / random / power-of-two-choices), the credential
 * shuffle deck, and shadow-routing sampling previously used Math.random(). CodeQL flags
 * that as "insecure randomness in a security context" (a false positive — these are
 * provider load-balancing decisions, not secrets/tokens). The fix routes all of them
 * through the crypto-secure helper in src/shared/utils/secureRandom.ts.
 *
 * This test pins both halves: (1) the helper behaves as a drop-in for Math.random with
 * identical ranges, and (2) the routing-selection source files no longer call
 * Math.random() — the static guard is RED before the fix and GREEN after.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { secureRandomFloat, secureRandomInt } from "../../src/shared/utils/secureRandom.ts";
import { fisherYatesShuffle } from "../../src/shared/utils/shuffleDeck.ts";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

test("secureRandomFloat: uniform in [0, 1), high entropy", () => {
  const samples = Array.from({ length: 5000 }, () => secureRandomFloat());
  for (const v of samples) {
    assert.ok(v >= 0 && v < 1, `value out of [0,1): ${v}`);
  }
  assert.ok(new Set(samples).size > 4500, "expected near-unique draws (high entropy)");
  const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
  assert.ok(mean > 0.45 && mean < 0.55, `mean should be ~0.5, got ${mean}`);
});

test("secureRandomInt: integer in [0, n) and covers every bucket", () => {
  for (const n of [2, 3, 5, 10, 50]) {
    const seen = new Set<number>();
    for (let i = 0; i < 2000; i++) {
      const v = secureRandomInt(n);
      assert.ok(Number.isInteger(v) && v >= 0 && v < n, `n=${n} produced ${v}`);
      seen.add(v);
    }
    assert.equal(seen.size, n, `n=${n}: every index in [0,n) should appear over 2000 draws`);
  }
});

test("secureRandomInt: <= 1 mirrors Math.floor(Math.random() * {0,1}) === 0", () => {
  assert.equal(secureRandomInt(1), 0);
  assert.equal(secureRandomInt(0), 0);
  assert.equal(secureRandomInt(-7), 0);
  assert.equal(secureRandomInt(Number.NaN), 0);
});

test("fisherYatesShuffle: permutation, non-mutating, actually reorders", () => {
  const input = Object.freeze(["a", "b", "c", "d", "e", "f"]);
  const out = fisherYatesShuffle(input);
  assert.equal(out.length, input.length);
  assert.deepEqual([...out].sort(), [...input].sort(), "must be a permutation of the input");

  let reordered = 0;
  for (let i = 0; i < 100; i++) {
    if (fisherYatesShuffle(input).join() !== input.join()) reordered++;
  }
  assert.ok(reordered > 0, "shuffle should sometimes change order");
  assert.deepEqual([...input], ["a", "b", "c", "d", "e", "f"], "input array must not be mutated");
});

test("routing-selection RNG uses the crypto-secure helper, not Math.random (CodeQL #665)", () => {
  const files = [
    "open-sse/services/combo/targetSorters.ts",
    "open-sse/services/combo/shadowRouting.ts",
    "src/shared/utils/shuffleDeck.ts",
  ];
  for (const rel of files) {
    const src = readFileSync(join(repoRoot, rel), "utf8");
    assert.ok(
      !/Math\.random\s*\(/.test(src),
      `${rel} must not call Math.random() in a routing/selection context — use secureRandom* (js/insecure-randomness #665)`
    );
    assert.match(src, /secureRandom(Int|Float)/, `${rel} should use the secureRandom helper`);
  }
});
