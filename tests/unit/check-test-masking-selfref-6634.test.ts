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
 * tautology counters, against the REAL current source of
 * tests/unit/check-test-masking.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  countTautologies,
  countExtendedTautologies,
  evaluateMasking,
} from "../../scripts/check/check-test-masking.mjs";

const FILE = "tests/unit/check-test-masking.test.ts";
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("#6634: check-test-masking.test.ts's own tautology fixtures must not self-flag as weakening", () => {
  // Read the REAL current source from disk rather than a git ref: the Unit Tests
  // job checks out a shallow/single-ref tree with no origin/main, so `git show
  // origin/main:<file>` failed the shard before it ever exercised the masking
  // behavior under test. An empty base models the file's pre-#6404 state (no
  // fixtures), which maximizes headTaut - baseTaut — the strictest input for the
  // exclusion this test asserts.
  const baseSrc = "";
  const headSrc = fs.readFileSync(path.join(REPO_ROOT, FILE), "utf8");

  const perFile = [
    {
      file: FILE,
      baseAsserts: 0, // irrelevant to this assertion — only tautology counters matter
      headAsserts: 0,
      baseTaut: countTautologies(baseSrc),
      headTaut: countTautologies(headSrc),
      baseExtTaut: countExtendedTautologies(baseSrc),
      headExtTaut: countExtendedTautologies(headSrc),
    },
  ];

  const flags = evaluateMasking(perFile, new Set());

  assert.deepEqual(
    flags,
    [],
    "check-test-masking.test.ts's own literal tautology fixtures (added for #6404) must be " +
      "excluded from the diff-based weakening check the same way scanBareTautologies() already " +
      "excludes this file from the absolute-floor scan — otherwise the gate's own regression " +
      "test permanently self-flags as a HARD release-green failure whenever new fixtures are added."
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
