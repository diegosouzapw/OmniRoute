/**
 * #13448 rework — the per-model opt-in path (`ModelSpec.defaultReasoningEffort:
 * "auto"`) was unreachable through the real, type-checked catalog: the field's
 * type union was `"none" | "low" | "medium" | "high"`, so no operator config in
 * providerRegistry.ts (or a fixture like this one) could ever assign `"auto"`
 * without a type error. `open-sse/services/adaptiveEffort.ts`'s priority #3 and
 * `adaptiveEffortWiring.ts`'s `modelDefaultAuto` branch were only ever exercised
 * by tests that constructed the post-injection body literal directly
 * (`{ reasoning_effort: "auto" }`), bypassing the type entirely.
 *
 * These tests exercise the REAL two-function pipeline end to end, starting
 * from a typed `MODEL_SPECS` entry (no `as any`, no literal shortcut):
 *   MODEL_SPECS[id].defaultReasoningEffort === "auto"
 *     -> applyDefaultReasoningEffort() injects the literal "auto"
 *     -> wireAdaptiveEffort() recognizes it as an opt-in marker and resolves
 *        it to a concrete low/medium/high (OpenAI dispatch only, #13448 rework
 *        -- see adaptive-effort-wiring.test.ts for the targetFormat gate).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { applyDefaultReasoningEffort } from "../../open-sse/services/defaultReasoningEffort.ts";
import { wireAdaptiveEffort } from "../../open-sse/handlers/chatCore/adaptiveEffortWiring.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { MODEL_SPECS, type ModelSpec } from "../../src/shared/constants/modelSpecs.ts";

const FIXTURE_MODEL_ID = "__test_13448_model_default_auto__";

// Typed assignment through the real ModelSpec union -- this line alone would
// be a TypeScript error on the pristine tip (`Type '"auto"' is not assignable
// to type '"none" | "low" | "medium" | "high"'`), which is exactly the
// unreachability defect: verify with `npm run -s typecheck:core`.
const fixtureSpec: ModelSpec = { defaultReasoningEffort: "auto" };

test.before(() => {
  MODEL_SPECS[FIXTURE_MODEL_ID] = fixtureSpec;
});

test.after(() => {
  delete MODEL_SPECS[FIXTURE_MODEL_ID];
});

const HEAVY = "x".repeat(20000);
const trivialMsgs = [{ role: "user", content: "list the files" }];
const heavyMsgs = [{ role: "user", content: HEAVY }];

test("a real ModelSpec.defaultReasoningEffort:'auto' entry is injected as the literal marker", () => {
  const body = { model: FIXTURE_MODEL_ID, messages: [] };
  const result = applyDefaultReasoningEffort(body, FIXTURE_MODEL_ID);
  assert.equal(result.reasoning_effort, "auto");
});

test("end to end: the typed model-default 'auto' resolves to a concrete low level on OpenAI dispatch", () => {
  const rawBody = { model: FIXTURE_MODEL_ID, messages: trivialMsgs };
  const afterDefault = applyDefaultReasoningEffort(rawBody, FIXTURE_MODEL_ID);
  const wired = wireAdaptiveEffort(afterDefault, {
    rawBody,
    headerEffort: null,
    targetFormat: FORMATS.OPENAI,
  });
  assert.notEqual(wired.reasoning_effort, "auto");
  assert.equal(wired.reasoning_effort, "low");
});

test("end to end: the typed model-default 'auto' resolves to 'high' on a heavy turn", () => {
  const rawBody = { model: FIXTURE_MODEL_ID, messages: heavyMsgs };
  const afterDefault = applyDefaultReasoningEffort(rawBody, FIXTURE_MODEL_ID);
  const wired = wireAdaptiveEffort(afterDefault, {
    rawBody,
    headerEffort: null,
    targetFormat: FORMATS.OPENAI,
  });
  assert.equal(wired.reasoning_effort, "high");
});

test("end to end: an explicit client reasoning_effort still wins over the typed model default", () => {
  const rawBody = { model: FIXTURE_MODEL_ID, messages: heavyMsgs, reasoning_effort: "medium" };
  const afterDefault = applyDefaultReasoningEffort(rawBody, FIXTURE_MODEL_ID);
  assert.equal(afterDefault.reasoning_effort, "medium", "no-op: explicit field already present");
  const wired = wireAdaptiveEffort(afterDefault, {
    rawBody,
    headerEffort: null,
    targetFormat: FORMATS.OPENAI,
  });
  assert.equal(wired.reasoning_effort, "medium");
});

test("end to end: on a non-OpenAI target the typed model-default marker is left as literal 'auto' (never resolved, never forwarded resolved)", () => {
  const rawBody = { model: FIXTURE_MODEL_ID, messages: heavyMsgs };
  const afterDefault = applyDefaultReasoningEffort(rawBody, FIXTURE_MODEL_ID);
  const wired = wireAdaptiveEffort(afterDefault, {
    rawBody,
    headerEffort: null,
    targetFormat: FORMATS.CLAUDE,
  });
  assert.equal(wired, afterDefault, "same reference: wireAdaptiveEffort must no-op off OpenAI");
  assert.equal(wired.reasoning_effort, "auto");
});
