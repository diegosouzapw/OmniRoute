/**
 * DeepSeek V4 exposes a native `max` reasoning tier that the canonical vocabulary erases.
 *
 * Per https://api-docs.deepseek.com/api/create-chat-completion the accepted
 * `reasoning_effort` values are `low`, `high` and `max`, the default is `high`, and
 * **`medium` / `xhigh` are both mapped to `high`** upstream. (The live API's 400 on an
 * invalid value enumerates the full accepted set:
 * `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`.)
 *
 * OmniRoute's canonical vocabulary is `none|low|medium|high|xhigh|max` (#11875).
 * `max` is a first-class value so DeepSeek's native top tier is reachable through
 * the canonical `effort` field instead of collapsing onto `xhigh` (which DeepSeek
 * then maps back down to `high`).
 *
 * Guards: A = `max` survives for native DeepSeek models; B = `max` stays canonical
 * for every other provider (sanitizer maps per-upstream later); C = routed DeepSeek
 * namespaces (openrouter/oc) are NOT treated as native; D = an explicit client
 * `reasoning_effort` still wins; E = catalog effort-tier extension is idempotent.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  normalizeReasoningRequest,
  normalizeEffort,
  isDeepSeekNativeMaxModel,
  extendDeepSeekEffortValues,
  CANONICAL_EFFORT_VALUES,
} = await import("../../src/shared/reasoning/effortStandardization.ts");

test("A: canonical effort `max` survives for native DeepSeek V4 models", () => {
  for (const model of [
    "ds/deepseek-v4-pro",
    "ds/deepseek-v4-flash",
    "deepseek/deepseek-v4-pro",
    "deepseek/deepseek-v4-flash",
  ]) {
    const out = normalizeReasoningRequest({ model, effort: "max" }) as Record<string, unknown>;
    assert.equal(
      out.reasoning_effort,
      "max",
      `${model} must reach DeepSeek's native max tier, not the down-mapped xhigh`
    );
    assert.deepEqual((out.reasoning as Record<string, unknown>).effort, "max");
  }
});

test("A2: the provider can also be supplied explicitly (model id without prefix)", () => {
  const out = normalizeReasoningRequest(
    { model: "deepseek-v4-pro", effort: "max" },
    "deepseek"
  ) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, "max");
});

test("B: `max` is a first-class canonical value for every other provider", () => {
  for (const model of ["openai/gpt-5", "anthropic/claude-opus-4-8", "z-ai/glm-5.2"]) {
    const out = normalizeReasoningRequest({ model, effort: "max" }) as Record<string, unknown>;
    assert.equal(out.reasoning_effort, "max", `${model} must keep native max`);
  }
  assert.deepEqual([...CANONICAL_EFFORT_VALUES], ["none", "low", "medium", "high", "xhigh", "max"]);
  assert.equal(normalizeEffort("max"), "max");
  assert.equal(normalizeEffort("extra"), "xhigh");
});

test("C: routed DeepSeek namespaces are not treated as the native provider", () => {
  // These terminate at a different upstream whose effort vocabulary we do not control.
  for (const model of ["openrouter/deepseek/deepseek-v4-flash-0731", "oc/deepseek-v4-flash-free"]) {
    assert.equal(isDeepSeekNativeMaxModel(null, model), false, `${model} is not native`);
    const out = normalizeReasoningRequest({ model, effort: "max" }) as Record<string, unknown>;
    assert.equal(out.reasoning_effort, "max");
  }
});

test("D: an explicit client reasoning_effort still wins over canonical effort", () => {
  const out = normalizeReasoningRequest({
    model: "ds/deepseek-v4-flash",
    effort: "max",
    reasoning_effort: "low",
  }) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, "low", "explicit client intent must be preserved");
});

test("E: catalog effort tiers advertise `max` for native DeepSeek models only", () => {
  const base = [...CANONICAL_EFFORT_VALUES];

  const deepseekTiers = extendDeepSeekEffortValues("deepseek", "deepseek-v4-pro", base);
  assert.ok(deepseekTiers.includes("max"), "native DeepSeek must advertise the max tier");

  const otherTiers = extendDeepSeekEffortValues("openai", "gpt-5", base);
  assert.deepEqual(otherTiers, base, "other providers must be untouched");

  // Idempotent: never duplicate an already-present tier.
  const twice = extendDeepSeekEffortValues("ds", "deepseek-v4-flash", deepseekTiers);
  assert.equal(twice.filter((t) => t === "max").length, 1);
});
