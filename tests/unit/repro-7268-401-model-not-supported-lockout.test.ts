/**
 * TDD repro/regression test for issue #7268 — "Model X is not supported"
 * 401 responses never lock the model out.
 *
 * Root cause: classifyProviderError() only inspects the response body for
 * status codes 400/403/404 to detect a model-unavailable signal. For status
 * 401 it only checks isOAuthInvalidToken()/isAccountDeactivated() and falls
 * through to a generic UNAUTHORIZED classification — even when the body
 * literally says "Model X is not supported". Because chatCore.ts only calls
 * lockModel(..., "model_not_found", ...) on the MODEL_NOT_FOUND branch, the
 * broken model is never locked out and auto-combo keeps re-selecting it.
 *
 * Expected (correct) behavior: a 401 whose body matches a model-unavailable
 * fragment (e.g. "<model> is not supported") classifies as MODEL_NOT_FOUND,
 * the same way a 404 always does.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { classifyProviderError, PROVIDER_ERROR_TYPES } = await import(
  "../../open-sse/services/errorClassifier.ts"
);
const { isModelUnavailableError } = await import(
  "../../open-sse/services/modelFamilyFallback.ts"
);

test("#7268: classifyProviderError(401, 'Model X is not supported') classifies as MODEL_NOT_FOUND", () => {
  const classified = classifyProviderError(401, { error: "Model minimax-m3-free is not supported" });
  assert.equal(classified, PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);
});

test("#7268: classifyProviderError(401, 'Model X is not supported') for a different model name", () => {
  const classified = classifyProviderError(401, { error: "Model qwen3.6-plus-free is not supported" });
  assert.equal(classified, PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);
});

test("#7268: a genuine 401 auth error (no model-unavailable wording) stays UNAUTHORIZED", () => {
  const classified = classifyProviderError(401, { error: "Invalid API key provided" });
  assert.equal(classified, PROVIDER_ERROR_TYPES.UNAUTHORIZED);
});

test("#7268: isModelUnavailableError() recognizes the literal '<model> is not supported' phrase", () => {
  assert.equal(
    isModelUnavailableError(400, "Model minimax-m3-free is not supported"),
    true
  );
});
