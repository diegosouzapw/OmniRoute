import test from "node:test";
import assert from "node:assert/strict";
import { classifyCursorError } from "../../open-sse/executors/cursor/cursorErrors.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";

// #15671: Cursor ends the Connect stream with `{"error":{"code":"not_found","message":"Error"}}`
// when the account's plan does not include the requested model.
const RAW = "cursor-agent stream ended with error not_found: Error";

test("#15671: bare Cursor `not_found` end-of-stream error is a model-unavailable error, not a generic 502", () => {
  const classified = classifyCursorError(RAW);
  assert.notEqual(classified.status, 502, `got ${classified.status}: ${classified.message}`);
  assert.equal(classified.status, 404);
});

test("#15671: the status Cursor surfaces must classify as MODEL_NOT_FOUND so chatCore locks the model", () => {
  const classified = classifyCursorError(RAW);
  const errorType = classifyProviderError(
    classified.status,
    { error: { message: classified.message, type: classified.type } },
    "cursor"
  );
  assert.equal(errorType, PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);
});

test("#15671: guard — 'AI Model Not Found' out-of-usage cue keeps its existing rate_limit mapping", () => {
  assert.equal(classifyCursorError("not_found: AI Model Not Found (reset after 109h)").status, 429);
});
