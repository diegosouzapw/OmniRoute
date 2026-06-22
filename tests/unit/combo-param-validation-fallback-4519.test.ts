import test from "node:test";
import assert from "node:assert/strict";

// #4519 — allow combo fallback on context-overflow / param-validation 400s and
// preserve upstream error semantics. Three regression guards:
//   1. accountFallback.checkFallbackError classifies param-validation 400s as
//      fallback-worthy with zero cooldown.
//   2. combo guard predicates (isContextOverflow400 / isParamValidation400) let
//      those 400s fall through to the next target instead of short-circuiting.
//   3. openai-responses.normalizeUpstreamFailure keeps context_length_exceeded as
//      400 and rate-limit as 429 (instead of rewriting everything to 502).

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { isContextOverflow400, isParamValidation400 } =
  await import("../../open-sse/services/combo.ts");
const { normalizeUpstreamFailure } =
  await import("../../open-sse/translator/response/openai-responses.ts");

test("#4519 checkFallbackError treats per-model max_tokens 400 as fallback-worthy with zero cooldown", () => {
  const res = checkFallbackError(
    400,
    "The max_tokens parameter is illegal.：限制数值范围[1,131072]"
  );
  assert.equal(res.shouldFallback, true);
  assert.equal(res.cooldownMs, 0);
});

test("#4519 combo guard: context-overflow and param-validation 400 texts are recognized", () => {
  assert.equal(isContextOverflow400("This model's context_length_exceeded for the input"), true);
  assert.equal(isContextOverflow400("your input exceeds the allowed size"), true);
  assert.equal(isParamValidation400("max_tokens must be in range [1,131072]"), true);
  assert.equal(isParamValidation400("The parameter is illegal"), true);
});

test("#4519 combo guard: a genuinely body-specific 400 is NOT classified as overflow/param", () => {
  const malformed = "Invalid JSON: unexpected token at position 12";
  assert.equal(isContextOverflow400(malformed), false);
  assert.equal(isParamValidation400(malformed), false);
});

test("#4519 normalizeUpstreamFailure preserves context_length_exceeded as 400", () => {
  const out = normalizeUpstreamFailure({
    error: { code: "context_length_exceeded", message: "too long" },
  });
  assert.equal(out.status, 400);
  assert.equal(out.type, "invalid_request_error");
});

test("#4519 normalizeUpstreamFailure keeps rate-limit as 429 and unknown as 502", () => {
  const rl = normalizeUpstreamFailure({
    error: { code: "rate_limit_exceeded", message: "slow down" },
  });
  assert.equal(rl.status, 429);
  assert.equal(rl.type, "rate_limit_error");

  const unknown = normalizeUpstreamFailure({ error: { code: "weird_error", message: "boom" } });
  assert.equal(unknown.status, 502);
});
