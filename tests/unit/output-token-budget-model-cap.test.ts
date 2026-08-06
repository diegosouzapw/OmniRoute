import test from "node:test";
import assert from "node:assert/strict";

import { enforceOutputTokenBudget } from "../../open-sse/handlers/chatCore/outputTokenBudget.ts";

test("clamps max_tokens to the model output cap when the window has ample room", () => {
  const result = enforceOutputTokenBudget({ max_tokens: 128_000 }, 1_000, 200_000, 0, 64_000);

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body.max_tokens, 64_000);
  assert.deepEqual(result.adjustedFields, ["max_tokens"]);
});

test("never elevates a max_tokens already below the model output cap", () => {
  const result = enforceOutputTokenBudget({ max_tokens: 32_000 }, 1_000, 200_000, 0, 64_000);

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body.max_tokens, 32_000);
  assert.deepEqual(result.adjustedFields, []);
});

test("is byte-identical to the context-only behavior when the cap is absent", () => {
  const withoutCapArg = enforceOutputTokenBudget({ max_tokens: 12_000 }, 127_000, 128_000);
  const withUndefinedCap = enforceOutputTokenBudget(
    { max_tokens: 12_000 },
    127_000,
    128_000,
    0,
    undefined
  );
  const withNullCap = enforceOutputTokenBudget({ max_tokens: 12_000 }, 127_000, 128_000, 0, null);

  assert.deepEqual(withUndefinedCap, withoutCapArg);
  assert.deepEqual(withNullCap, withoutCapArg);
  assert.equal(withoutCapArg.ok, true);
  if (!withoutCapArg.ok) return;
  assert.equal(withoutCapArg.availableOutputTokens, 1_000);
});

test("clamps all three output-token field names to the model output cap", () => {
  const result = enforceOutputTokenBudget(
    {
      max_tokens: 128_000,
      max_completion_tokens: 128_000,
      max_output_tokens: 128_000,
    },
    1_000,
    200_000,
    0,
    64_000
  );

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body.max_tokens, 64_000);
  assert.equal(result.body.max_completion_tokens, 64_000);
  assert.equal(result.body.max_output_tokens, 64_000);
  assert.deepEqual(
    result.adjustedFields.slice().sort(),
    ["max_completion_tokens", "max_output_tokens", "max_tokens"].sort()
  );
});

test("the context window wins over the model output cap when the window is tighter", () => {
  const result = enforceOutputTokenBudget({ max_tokens: 128_000 }, 127_000, 128_000, 0, 64_000);

  assert.equal(result.ok, true);
  if (!result.ok) return;
  // availableOutputTokens (1_000) < cap (64_000): the narrower window governs the clamp.
  assert.equal(result.body.max_tokens, 1_000);
  assert.equal(result.availableOutputTokens, 1_000);
});

test("a model output cap smaller than the default output budget does not reject the request", () => {
  // Regression guard: the reject decision must stay tied to the context window only.
  // A model with a small output ceiling (e.g. 4096) paired with a larger
  // defaultOutputTokens must not turn a valid request into a 400.
  const result = enforceOutputTokenBudget({}, 1_000, 200_000, 64_000, 4_096);

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.availableOutputTokens, 199_000);
});

test("adjustedFields reflects exactly the fields the model output cap changed", () => {
  const result = enforceOutputTokenBudget(
    {
      max_tokens: 64_000,
      max_completion_tokens: 128_000,
    },
    1_000,
    200_000,
    0,
    64_000
  );

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(
    result.body.max_tokens,
    64_000,
    "already at the cap, must not be reported as adjusted"
  );
  assert.equal(result.body.max_completion_tokens, 64_000);
  assert.deepEqual(result.adjustedFields, ["max_completion_tokens"]);
});

test("a sub-token cap is treated as absent, never as a cap of zero", () => {
  // A fractional cap below 1 must not survive the positivity guard and floor to
  // an effective cap of 0 — that would clamp every field to zero and either send
  // `max_tokens: 0` upstream or bounce back through the translator default.
  const result = enforceOutputTokenBudget({ max_tokens: 8_000 }, 1_000, 200_000, 0, 0.4);

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body.max_tokens, 8_000, "sub-token cap must leave the request untouched");
  assert.deepEqual(result.adjustedFields, []);
});

test("rejects when estimated input exceeds the model input cap, even with output room", () => {
  // Input cap is input-only and independent of the (larger) total window.
  const result = enforceOutputTokenBudget(
    { max_tokens: 1_000 },
    354_000,
    372_000,
    0,
    null,
    353_400
  );

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.estimatedInputTokens, 354_000);
  assert.equal(result.maxInputTokens, 353_400);
});

test("accepts input at the model input cap without double-counting requested output", () => {
  // estimatedInput == input cap; a large requested output must not be re-counted
  // against the input-only cap (only the total window bounds input + output).
  const result = enforceOutputTokenBudget(
    { max_tokens: 128_000 },
    353_400,
    372_000,
    0,
    null,
    353_400
  );

  assert.equal(result.ok, true);
  if (!result.ok) return;
  // Output clamped to remaining window room (372000 - 353400 = 18600).
  assert.equal(result.body.max_tokens, 18_600);
});

test("input cap is fail-open when absent, null, or non-positive", () => {
  const base = enforceOutputTokenBudget({ max_tokens: 1_000 }, 100_000, 200_000, 0, null);
  const undefinedCap = enforceOutputTokenBudget(
    { max_tokens: 1_000 },
    100_000,
    200_000,
    0,
    null,
    undefined
  );
  const nullCap = enforceOutputTokenBudget({ max_tokens: 1_000 }, 100_000, 200_000, 0, null, null);
  const zeroCap = enforceOutputTokenBudget({ max_tokens: 1_000 }, 100_000, 200_000, 0, null, 0);

  assert.deepEqual(undefinedCap, base);
  assert.deepEqual(nullCap, base);
  assert.deepEqual(zeroCap, base);
  assert.equal(base.ok, true);
});

test("the total window still rejects when input fits the input cap but no output room remains", () => {
  // Input (150k) fits a 353k input cap but leaves no room in the 128k window.
  const result = enforceOutputTokenBudget(
    { max_tokens: 1_000 },
    150_000,
    128_000,
    0,
    null,
    353_400
  );

  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.maxInputTokens, undefined, "window rejection, not input-cap rejection");
});
