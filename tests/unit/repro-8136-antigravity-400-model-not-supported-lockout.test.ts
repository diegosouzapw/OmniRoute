import test from "node:test";
import assert from "node:assert/strict";
const { classifyProviderError, PROVIDER_ERROR_TYPES } = await import(
  "../../open-sse/services/errorClassifier.ts"
);

test("#8136: classifyProviderError(400, Antigravity 'model is not supported' body) returns MODEL_NOT_FOUND", () => {
  const body = {
    error: {
      code: 400,
      message: "The model gemini-3.1-pro-low is not supported for this project.",
      status: "INVALID_ARGUMENT",
    },
  };
  const classified = classifyProviderError(400, body, "antigravity");
  assert.equal(
    classified,
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND,
    `expected MODEL_NOT_FOUND, got ${JSON.stringify(classified)}`
  );
});

test("#8136: same phrasing at 401 still works (regression guard for #7268)", () => {
  const body = { error: { message: "The model gemini-3.1-pro-low is not supported for this project." } };
  assert.equal(classifyProviderError(401, body, "antigravity"), PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);
});

test("#8136: plain 400 context-overflow still classifies as CONTEXT_OVERFLOW, not MODEL_NOT_FOUND", () => {
  const body = {
    error: {
      message: "This model's maximum context length is 128000 tokens. Please reduce the length of the messages.",
    },
  };
  assert.equal(
    classifyProviderError(400, body, "antigravity"),
    PROVIDER_ERROR_TYPES.CONTEXT_OVERFLOW
  );
});

test("#8136: a generic 400 bad-request body (no model-unavailable phrasing) is not reclassified as MODEL_NOT_FOUND", () => {
  const body = { error: { message: "Invalid request: missing required field 'messages'." } };
  assert.equal(classifyProviderError(400, body, "antigravity"), null);
});
