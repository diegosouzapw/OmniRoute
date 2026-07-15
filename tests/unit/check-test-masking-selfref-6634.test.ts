/**
 * Regression test for issue #6634 ("release/v3.8.47 branch not green — nightly
 * release-green found HARD failures"). The nightly's "Test-masking
 * (weakened-assert guard)" HARD failure was a SELF-REFERENTIAL false positive:
 * tests/unit/check-test-masking.test.ts legitimately embeds tautology-pattern
 * string literals (e.g. `expect(true).toBe(true);`, `assert.equal(1, 1);`) as
 * FIXTURES to exercise countBareTautologies()/scanBareTautologies() — the same
 * literal text that the diff-based subcheck (evaluateMasking(), fed by
 * countTautologies()/countExtendedTautologies()) treated as "new tautologies in
 * the file itself" because those counters are dumb regex scans of raw source
 * text, blind to "this is inside a fixture string, not real assertion code".
 *
 * scanBareTautologies() already special-cases this exact file
 * (`if (file.endsWith("check-test-masking.test.ts")) continue;` in
 * scripts/check/check-test-masking.mjs) for precisely this reason — this test
 * asserts evaluateMasking() now applies the same exclusion for its diff-based
 * tautology counters using deterministic synthetic base/head counter inputs,
 * without depending on Git history or remote refs.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { evaluateMasking } from "../../scripts/check/check-test-masking.mjs";

test("#6634: check-test-masking.test.ts's own tautology fixtures must not self-flag as weakening", () => {
  const perFile = [
    {
      file: "tests/unit/check-test-masking.test.ts",
      baseAsserts: 0,
      headAsserts: 0,
      baseTaut: 0,
      headTaut: 1,
      baseExtTaut: 0,
      headExtTaut: 1,
    },
  ];

  const flags = evaluateMasking(perFile, new Set());

  assert.deepEqual(
    flags,
    [],
    "check-test-masking.test.ts's exclusion must not depend on Git history or remote refs."
  );
});

test("#6634: unrelated files still get flagged for genuinely new tautologies (guard is file-scoped, not global)", () => {
  const perFile = [
    {
      file: "tests/unit/some-other-file.test.ts",
      baseAsserts: 5,
      headAsserts: 5,
      baseTaut: 0,
      headTaut: 1,
      baseExtTaut: 0,
      headExtTaut: 1,
    },
  ];

  const flags = evaluateMasking(perFile, new Set());

  assert.equal(flags.length, 2, "a non-fixture file must still trip both tautology signals");
  assert.match(flags[0], /nova\(s\) 1 tautologia\(s\) assert\.ok\(true\)/);
  assert.match(flags[1], /nova\(s\) 1 tautologia\(s\) estendida/);
});
