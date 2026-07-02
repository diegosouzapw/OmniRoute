import test from "node:test";
import assert from "node:assert/strict";

const { isModelUnavailableError, getNextFamilyFallback } =
  await import("../../open-sse/services/modelFamilyFallback.ts");

test("T30: Kiro 'improperly formed request' 400 is treated as model-unavailable", () => {
  const unavailable = isModelUnavailableError(
    400,
    "Bad Request: improperly formed request for selected model"
  );
  assert.equal(unavailable, true);
});

test("T30: generic 400 without model-unavailable signal is not treated as unavailable", () => {
  const unavailable = isModelUnavailableError(400, "Bad Request: malformed JSON body");
  assert.equal(unavailable, false);
});

test("T30: 404 still maps to model-unavailable", () => {
  const unavailable = isModelUnavailableError(404, "not found");
  assert.equal(unavailable, true);
});

test("T30: model family helper returns a sibling candidate when available", () => {
  const next = getNextFamilyFallback("gemini-3.1-pro-high", new Set(["gemini-3.1-pro-high"]));
  assert.equal(typeof next, "string");
  assert.notEqual(next, "gemini-3.1-pro-high");
});
