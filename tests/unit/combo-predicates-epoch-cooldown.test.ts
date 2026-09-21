/**
 * Regression: `hasFutureRateLimitUntil` parses with `new Date(String(value))`
 * alone, so a numeric-epoch string from the TEXT `rate_limited_until` column
 * (e.g. a `${Date.now()}.0`-shaped value, cf. #3954) yields NaN and the
 * still-cooling connection is never skipped (fail-open → guaranteed upstream
 * 429). `formatRetryAfter` has the same blind spot and renders
 * "reset after NaNs".
 */
import { test } from "node:test";
import assert from "node:assert/strict";

const { hasFutureRateLimitUntil } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const { formatRetryAfter } = await import("../../open-sse/services/accountFallback.ts");

const HOUR = 3_600_000;

test("hasFutureRateLimitUntil: future numeric-epoch string is future", () => {
  assert.equal(hasFutureRateLimitUntil(`${Date.now() + HOUR}.0`), true);
});

test("hasFutureRateLimitUntil: future numeric epoch number is future", () => {
  assert.equal(hasFutureRateLimitUntil(Date.now() + HOUR), true);
});

test("hasFutureRateLimitUntil: past numeric-epoch string is not future", () => {
  assert.equal(hasFutureRateLimitUntil(String(Date.now() - HOUR)), false);
});

test("hasFutureRateLimitUntil: future ISO string is future (unchanged)", () => {
  assert.equal(hasFutureRateLimitUntil(new Date(Date.now() + HOUR).toISOString()), true);
});

test("hasFutureRateLimitUntil: empty/null/undefined/blank is not future (unchanged)", () => {
  assert.equal(hasFutureRateLimitUntil(""), false);
  assert.equal(hasFutureRateLimitUntil(null), false);
  assert.equal(hasFutureRateLimitUntil(undefined), false);
  assert.equal(hasFutureRateLimitUntil("   "), false);
});

test("hasFutureRateLimitUntil: garbage is not future (unchanged)", () => {
  assert.equal(hasFutureRateLimitUntil("abc"), false);
});

test("hasFutureRateLimitUntil: non-string values never throw (narrowing)", () => {
  assert.equal(hasFutureRateLimitUntil(true), false);
  assert.equal(hasFutureRateLimitUntil({}), false);
  assert.equal(hasFutureRateLimitUntil([]), false);
});

test("formatRetryAfter: future numeric-epoch string renders a duration", () => {
  const rendered = formatRetryAfter(`${Date.now() + HOUR}.0`);
  assert.match(rendered, /^reset after \d/);
  assert.doesNotMatch(rendered, /NaN/);
});

test("formatRetryAfter: past numeric-epoch string renders reset after 0s", () => {
  assert.equal(formatRetryAfter(String(Date.now() - HOUR)), "reset after 0s");
});

test("formatRetryAfter: garbage renders empty (unknown, not expired)", () => {
  assert.equal(formatRetryAfter("abc"), "");
});
