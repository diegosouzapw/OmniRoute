/**
 * Regression guard for the vendor-declared default reasoning effort.
 *
 * OpenRouter's /api/v1/models declares for reasoning-only models (measured on
 * `stealth/ox-alpha`): `reasoning:{mandatory:true, default_enabled:true,
 * default_effort:"max", supported_efforts:["max","high","low"]}`. Discovery
 * previously captured `supported_efforts` (#7694) but dropped `default_effort`,
 * and the OpenAI dispatch path (#6879 `applyDefaultReasoningEffort`) only ever
 * consulted static `ModelSpec.defaultReasoningEffort` + suffix aliases — so a
 * request with no reasoning field could reach a model that returns an empty
 * response without an explicit effort (`upstream_empty_response`).
 *
 * Fix: `normalizeDiscoveredModels` captures `reasoning.default_effort`
 * (canonical vocabulary, including first-class `max`) as `defaultThinkingEffort`,
 * and `applyDefaultReasoningEffort` accepts it as the lowest-priority default —
 * behind a `-{effort}` suffix alias and behind a static operator-configured
 * `ModelSpec.defaultReasoningEffort`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";
import { applyDefaultReasoningEffort } from "../../open-sse/services/defaultReasoningEffort.ts";
import { MODEL_SPECS } from "../../src/shared/constants/modelSpecs.ts";

// ---------------------------------------------------------------------------
// Discovery capture
// ---------------------------------------------------------------------------

test("maps OpenRouter reasoning.default_effort onto defaultThinkingEffort", () => {
  const [model] = normalizeDiscoveredModels([
    {
      id: "stealth/ox-alpha",
      context_length: 1048576,
      reasoning: {
        mandatory: true,
        default_enabled: true,
        default_effort: "max",
        supported_efforts: ["max", "high", "low"],
      },
    },
  ]);

  assert.equal(model.id, "stealth/ox-alpha");
  // `max` is a first-class canonical tier (#11875) and is preserved as-is.
  assert.equal(model.defaultThinkingEffort, "max");
  assert.deepEqual(model.supportedThinkingEfforts, ["max", "high", "low"]);
});

test("a canonical default_effort passes through unchanged", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/model", reasoning: { default_effort: "low" } },
  ]);
  assert.equal(model.defaultThinkingEffort, "low");
});

test("a flat defaultThinkingEffort (import format) stays authoritative over the nested shape", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/model", defaultThinkingEffort: "low", reasoning: { default_effort: "high" } },
  ]);
  assert.equal(model.defaultThinkingEffort, "low");
});

test("a malformed reasoning.default_effort degrades to unset (one bad record never fails the sync)", () => {
  const [model] = normalizeDiscoveredModels([
    { id: "vendor/model", reasoning: { default_effort: 42 } },
  ]);
  assert.equal(model.defaultThinkingEffort, undefined);
});

test("no reasoning metadata -> defaultThinkingEffort unset", () => {
  const [model] = normalizeDiscoveredModels([{ id: "vendor/model" }]);
  assert.equal(model.defaultThinkingEffort, undefined);
});

// ---------------------------------------------------------------------------
// Dispatch injection (lowest-priority default)
// ---------------------------------------------------------------------------

test("injects the vendor-declared default when no reasoning field and no other default exists", () => {
  const body = { model: "stealth/ox-alpha", messages: [] };
  const result = applyDefaultReasoningEffort(body, "stealth/ox-alpha", null, "xhigh");
  assert.equal(result.reasoning_effort, "xhigh");
});

test("a suffix-resolved effort (#7694) wins over the vendor default", () => {
  const body = { model: "stealth/ox-alpha-low", messages: [] };
  const result = applyDefaultReasoningEffort(body, "stealth/ox-alpha", "low", "xhigh");
  assert.equal(result.reasoning_effort, "low");
});

test("an explicit client reasoning_effort still wins over the vendor default", () => {
  const body = { model: "stealth/ox-alpha", messages: [], reasoning_effort: "low" };
  const result = applyDefaultReasoningEffort(body, "stealth/ox-alpha", null, "xhigh");
  assert.equal(result.reasoning_effort, "low");
});

test("no vendor default and no other default -> no injection (regression, same reference)", () => {
  const body = { model: "vendor/plain-model", messages: [] };
  const result = applyDefaultReasoningEffort(body, "vendor/plain-model", null, null);
  assert.equal(result, body);
});

test("an operator ModelSpec.defaultReasoningEffort wins over the vendor default", () => {
  const FIXTURE_MODEL_ID = "__test_vendor_default_reasoning_effort_model__";
  MODEL_SPECS[FIXTURE_MODEL_ID] = { defaultReasoningEffort: "none" };
  try {
    const body = { model: FIXTURE_MODEL_ID, messages: [] };
    const result = applyDefaultReasoningEffort(body, FIXTURE_MODEL_ID, null, "xhigh");
    assert.equal(result.reasoning_effort, "none");
  } finally {
    delete MODEL_SPECS[FIXTURE_MODEL_ID];
  }
});
