import test from "node:test";
import assert from "node:assert/strict";

import { enforceOutputTokenBudget } from "../../open-sse/handlers/chatCore/outputTokenBudget.ts";

test("rejects a prompt that cannot leave one output token", () => {
  const result = enforceOutputTokenBudget({ max_tokens: 8192 }, 527_058, 128_000);

  assert.deepEqual(result, {
    ok: false,
    estimatedInputTokens: 527_058,
    contextLimit: 128_000,
  });
});

test("caps a positive output budget to the target's remaining context", () => {
  const input = { messages: [], max_tokens: 12_000 };
  const result = enforceOutputTokenBudget(input, 127_000, 128_000);

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body.max_tokens, 1_000);
  assert.equal(input.max_tokens, 12_000, "must not mutate the shared combo request body");
});

test("removes non-positive numeric output limits before upstream dispatch", () => {
  const result = enforceOutputTokenBudget(
    { max_tokens: -398_464, max_completion_tokens: 0 },
    1_000,
    128_000
  );

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal("max_tokens" in result.body, false);
  assert.equal("max_completion_tokens" in result.body, false);
});

test("caps max_output_tokens to the target's remaining context", () => {
  const result = enforceOutputTokenBudget({ max_output_tokens: 12_000 }, 127_000, 128_000);

  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body.max_output_tokens, 1_000);
});

test("accepts a missing request body when output budget remains", () => {
  const result = enforceOutputTokenBudget(null, 1_000, 128_000);

  assert.deepEqual(result, {
    ok: true,
    body: {},
    availableOutputTokens: 127_000,
    adjustedFields: [],
  });
});

test("rejects when a Claude target's default output budget does not fit", () => {
  const result = enforceOutputTokenBudget({}, 70_000, 128_000, 64_000);

  assert.deepEqual(result, {
    ok: false,
    estimatedInputTokens: 70_000,
    contextLimit: 128_000,
  });
});
