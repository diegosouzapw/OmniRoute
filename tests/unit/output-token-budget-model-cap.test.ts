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
