/**
 * Magnitude-crossover regression for the free-budget suffix
 * (`formatFreeBudget` -> `fmtTokens` in @omniroute/opencode-plugin/src/naming.ts).
 *
 * `fmtTokens` picked its unit from the raw input and then rounded with
 * `toFixed(1)`. Rounding can carry a value into the next magnitude *after* that
 * branch has been skipped, so 999_950..999_999 rendered as "1000K" rather than
 * "1M", and just under a billion rendered as "1000M" rather than "1B".
 *
 * These budgets are not always round numbers: `monthlyTokens` is derived from the
 * remote Radar feed (`tokensPerMonth`) and can be replaced wholesale by a
 * user-local override, so the crossover band is reachable with real data.
 *
 * Kept in its own file rather than added to naming.test.ts so this does not
 * collide with the coverage being added for `formatFreeBudget` in #11660.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import { formatFreeBudget } from "../src/naming.js";

/** `recurring-daily` is the shortest path from a token count to a rendered suffix. */
const daily = (monthlyTokens: number) =>
  formatFreeBudget({ freeType: "recurring-daily", monthlyTokens }).replace(" tokens/day", "");

test("fmtTokens: a rounded K value that reaches 1000 is promoted to M", () => {
  // 999_950 is the true boundary, not 999_999: toFixed(1) rounds to the nearest
  // tenth, so 999.95K is the first value that carries to "1000.0".
  assert.equal(daily(999_950), "1M");
  assert.equal(daily(999_999), "1M");
});

test("fmtTokens: a rounded M value that reaches 1000 is promoted to B", () => {
  assert.equal(daily(999_950_000), "1B");
  assert.equal(daily(999_999_999), "1B");
});

test("fmtTokens: values just below the rounding boundary keep their own unit", () => {
  // The promotion must not fire early — 999.9K still rounds to 999.9, not 1000.
  assert.equal(daily(999_949), "999.9K");
  assert.equal(daily(999_499), "999.5K");
  assert.equal(daily(999_499_999), "999.5M");
});

test("fmtTokens: ordinary magnitudes are unchanged", () => {
  assert.equal(daily(0), "0");
  assert.equal(daily(999), "999");
  assert.equal(daily(1_000), "1K");
  assert.equal(daily(1_500), "1.5K");
  assert.equal(daily(1_000_000), "1M");
  assert.equal(daily(1_500_000), "1.5M");
  assert.equal(daily(25_000_000), "25M");
  assert.equal(daily(1_234_567), "1.2M");
  assert.equal(daily(1_000_000_000), "1B");
  assert.equal(daily(2_500_000_000), "2.5B");
});

test("fmtTokens: B is the top unit, so a carry there has nowhere to go", () => {
  // Deliberately pinned: promoting past B would need a unit that does not exist,
  // so "1000B" is the intended output rather than an oversight.
  assert.equal(daily(999_999_999_999), "1000B");
});

test("formatFreeBudget: the promotion applies to every token-bearing branch", () => {
  assert.equal(
    formatFreeBudget({ freeType: "recurring-monthly", monthlyTokens: 999_999 }),
    "1M tokens/month"
  );
  assert.equal(
    formatFreeBudget({ freeType: "recurring-credit", creditTokens: 999_999 }),
    "1M credits"
  );
  assert.equal(
    formatFreeBudget({ freeType: "one-time-initial", creditTokens: 999_999 }),
    "1M credits (one-time)"
  );
});
