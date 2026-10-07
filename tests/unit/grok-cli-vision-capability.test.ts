import test from "node:test";
import assert from "node:assert/strict";

// Grok Build (grok-cli) declared no vision flag, so `grok-4.6` resolved to
// supportsVision=null and any combo containing it sent images through the vision
// bridge instead of to the model. Probe (Responses `input_image`, bridge disabled):
// grok-4.6 named three stripe colours correctly; grok-4.5 answered wrong colours for
// the same image, so only grok-4.6 is declared.

const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");

test("Grok Build grok-4.6 is vision capable", () => {
  const caps = getResolvedModelCapabilities({ provider: "grok-cli", model: "grok-4.6" });
  assert.equal(caps.supportsVision, true);
});

test("Grok Build grok-4.5 is not declared vision capable", () => {
  const caps = getResolvedModelCapabilities({ provider: "grok-cli", model: "grok-4.5" });
  assert.notEqual(caps.supportsVision, true);
});
