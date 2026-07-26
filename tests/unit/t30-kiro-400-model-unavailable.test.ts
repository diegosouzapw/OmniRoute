import test from "node:test";
import assert from "node:assert/strict";

const { isModelUnavailableError, getNextFamilyFallback } =
  await import("../../open-sse/services/modelFamilyFallback.ts");

test("T30: Kiro 'improperly formed request' 400 is treated as model-unavailable", () => {
  const unavailable = isModelUnavailableError(
    400,
    "Bad Request: improperly formed request for selected model",
    "kiro"
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

test("T30: a missing Files API resource does not trigger model-family fallback", () => {
  const unavailable = isModelUnavailableError(
    404,
    "[404]: Files [file-be30851bd1614656872e725e] were not found"
  );
  assert.equal(unavailable, false);
});

test("T30: bare model IDs require an explicit provider scope", () => {
  assert.equal(getNextFamilyFallback("claude-opus-5", new Set(["claude-opus-5"])), null);
  assert.equal(
    getNextFamilyFallback("claude-opus-5", new Set(["claude-opus-5"]), "anthropic"),
    "claude-opus-4.8"
  );
});

test('T30: Kiro exact "Invalid model. Please select a different model to continue." 400 is treated as model-unavailable', () => {
  const unavailable = isModelUnavailableError(
    400,
    "Invalid model. Please select a different model to continue."
  );
  assert.equal(unavailable, true);
});

test("T30: Kiro-only malformed-request signal is not global", () => {
  assert.equal(
    isModelUnavailableError(
      400,
      "Bad Request: improperly formed request for selected model",
      "anthropic"
    ),
    false
  );
});

test("T30: capability errors do not trigger model substitution", () => {
  assert.equal(
    isModelUnavailableError(400, "This model does not support tool calling", "anthropic"),
    false
  );
});

test("T30: retired OpenAI GPT chains are not fallback policies", () => {
  assert.equal(getNextFamilyFallback("gpt-5.1", new Set(["gpt-5.1"]), "openai"), null);
});
