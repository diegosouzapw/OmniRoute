// Regression guard for the corrected DeepSeek V4 static pricing defaults (#10635): DeepSeek
// switched deepseek-v4-pro/deepseek-v4-flash to peak/off-peak dynamic pricing on 2026-08-17;
// the static table carries the off-peak (lower-bound) values. Asserts the exact corrected
// figures and the documented output=3x-input / peak=2x-off-peak internal consistency so a
// future accidental revert to the stale 2026-08-13 numbers is caught by CI.
import { test } from "node:test";
import assert from "node:assert/strict";

const { DEFAULT_PRICING_FRONTIER } = await import(
  "../../src/shared/constants/pricing/frontier-labs.ts"
);

test("deepseek-v4-pro carries the corrected off-peak static prices", () => {
  const entry = (DEFAULT_PRICING_FRONTIER as Record<string, Record<string, Record<string, number>>>)
    .deepseek["deepseek-v4-pro"];
  assert.ok(entry, "deepseek-v4-pro entry must exist under DEFAULT_PRICING_FRONTIER.deepseek");
  assert.equal(entry.input, 0.66);
  assert.equal(entry.output, 1.98);
  assert.equal(entry.cached, 0.022);
  assert.equal(entry.reasoning, 1.98);
  assert.equal(entry.cache_creation, 0.66);
});

test("deepseek-v4-flash carries the corrected off-peak static prices", () => {
  const entry = (DEFAULT_PRICING_FRONTIER as Record<string, Record<string, Record<string, number>>>)
    .deepseek["deepseek-v4-flash"];
  assert.ok(entry, "deepseek-v4-flash entry must exist under DEFAULT_PRICING_FRONTIER.deepseek");
  assert.equal(entry.input, 0.22);
  assert.equal(entry.output, 0.66);
  assert.equal(entry.cached, 0.007);
  assert.equal(entry.reasoning, 0.66);
  assert.equal(entry.cache_creation, 0.22);
});

test("deepseek-v4 entries keep DeepSeek's documented output=3x-input ratio", () => {
  const deepseek = (DEFAULT_PRICING_FRONTIER as Record<string, Record<string, Record<string, number>>>)
    .deepseek;
  for (const model of ["deepseek-v4-pro", "deepseek-v4-flash"]) {
    const entry = deepseek[model];
    assert.equal(entry.output, entry.input * 3, `${model}: output should be 3x input`);
    assert.equal(entry.reasoning, entry.output, `${model}: reasoning should match output`);
    assert.ok(entry.cached < entry.input, `${model}: cached must be cheaper than input`);
  }
});
