/**
 * Claude Opus 4.7+/Fable 5 sampling-param strip + adaptive-only flag.
 *
 * Anthropic's Opus 4.7+ generation rejects non-default `temperature`/`top_p`/`top_k` with a
 * 400 (sampling is fixed; reasoning is steered by output_config.effort). These tests pin both
 * the registry `unsupportedParams` that drive the strip at the chatCore dispatch point and
 * the `isAdaptiveThinkingOnly` model flag — with regression guards that pre-4.7 models keep
 * accepting sampling params and manual thinking.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { getUnsupportedParams } from "../../open-sse/config/providerRegistry.ts";
import { isAdaptiveThinkingOnly } from "../../src/shared/constants/modelSpecs.ts";

const SAMPLING = ["temperature", "top_p", "top_k"];

test("claude registry strips temperature/top_p/top_k for Opus 4.7+/Fable 5", () => {
  for (const model of ["claude-opus-4-8", "claude-opus-4-7", "claude-fable-5"]) {
    const unsupported = getUnsupportedParams("claude", model);
    for (const param of SAMPLING) {
      assert.ok(
        unsupported.includes(param),
        `${model} must list ${param} as unsupported (400 on Anthropic otherwise)`
      );
    }
  }
});

test("anthropic registry (dotted ids) strips sampling params for Opus 4.7", () => {
  const unsupported = getUnsupportedParams("anthropic", "claude-opus-4.7");
  for (const param of SAMPLING) {
    assert.ok(unsupported.includes(param), `claude-opus-4.7 must list ${param} as unsupported`);
  }
});

test("pre-4.7 Claude models still accept sampling params (regression guard)", () => {
  for (const [provider, model] of [
    ["claude", "claude-opus-4-6"],
    ["claude", "claude-opus-4-5-20251101"],
    ["claude", "claude-sonnet-4-5-20250929"],
    ["claude", "claude-haiku-4-5-20251001"],
    ["anthropic", "claude-opus-4.6"],
  ] as const) {
    const unsupported = getUnsupportedParams(provider, model);
    for (const param of SAMPLING) {
      assert.ok(
        !unsupported.includes(param),
        `${provider}/${model} must NOT strip ${param} — it still accepts sampling`
      );
    }
  }
});

test("isAdaptiveThinkingOnly is true only for Opus 4.7+/Fable 5", () => {
  for (const model of ["claude-opus-4-8", "claude-opus-4-7", "claude-fable-5"]) {
    assert.equal(isAdaptiveThinkingOnly(model), true, `${model} is adaptive-only`);
  }
  for (const model of [
    "claude-opus-4-6",
    "claude-opus-4-5-20251101",
    "claude-sonnet-4-6",
    "claude-haiku-4-5-20251001",
  ]) {
    assert.equal(isAdaptiveThinkingOnly(model), false, `${model} still supports manual thinking`);
  }
  assert.equal(isAdaptiveThinkingOnly(null), false);
  assert.equal(isAdaptiveThinkingOnly(""), false);
});

test("isAdaptiveThinkingOnly resolves Bedrock/dated aliases", () => {
  assert.equal(isAdaptiveThinkingOnly("anthropic.claude-opus-4-8"), true);
});
