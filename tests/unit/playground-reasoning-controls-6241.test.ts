import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveReasoningControls,
  buildReasoningRequestFields,
  type ReasoningControlSpec,
} from "../../src/app/(dashboard)/dashboard/playground/components/reasoningControls.ts";
import { CANONICAL_EFFORT_VALUES } from "../../src/shared/reasoning/effortStandardization.ts";

// #6241: the Playground effort selector + thinking toggle read a model's `supportsThinking` /
// `effort_tiers` capability flags to decide which controls to render, and the request-body
// builder must fold `effort`/`thinking` onto the body ONLY when set AND supported.

test("resolveReasoningControls: hidden when caps missing / not supported", () => {
  assert.deepEqual(resolveReasoningControls(undefined), { show: false, effortOptions: [] });
  assert.deepEqual(resolveReasoningControls(null), { show: false, effortOptions: [] });
  assert.deepEqual(resolveReasoningControls({ supportsThinking: false }), {
    show: false,
    effortOptions: [],
  });
  // `thinking` alone (back-compat flag) without an explicit supportsThinking must stay hidden.
  assert.deepEqual(resolveReasoningControls({} as never), { show: false, effortOptions: [] });
});

test("resolveReasoningControls: shows model's effort_tiers when supported", () => {
  const spec = resolveReasoningControls({
    supportsThinking: true,
    effort_tiers: ["low", "medium", "high"],
  });
  assert.equal(spec.show, true);
  assert.deepEqual(spec.effortOptions, ["low", "medium", "high"]);
});

test("resolveReasoningControls: falls back to canonical values when tiers absent/empty", () => {
  const canonical = [...CANONICAL_EFFORT_VALUES];
  assert.deepEqual(resolveReasoningControls({ supportsThinking: true }).effortOptions, canonical);
  assert.deepEqual(
    resolveReasoningControls({ supportsThinking: true, effort_tiers: [] }).effortOptions,
    canonical
  );
  // Non-array / dirty tiers → fallback + only string members kept.
  assert.deepEqual(
    resolveReasoningControls({ supportsThinking: true, effort_tiers: "nope" as never })
      .effortOptions,
    canonical
  );
  assert.deepEqual(
    resolveReasoningControls({
      supportsThinking: true,
      effort_tiers: ["low", 3, "", "high"] as never,
    }).effortOptions,
    ["low", "high"]
  );
});

const SUPPORTED: ReasoningControlSpec = {
  show: true,
  effortOptions: ["low", "medium", "high", "xhigh"],
};
const HIDDEN: ReasoningControlSpec = { show: false, effortOptions: [] };

test("buildReasoningRequestFields: emits nothing when model does not support thinking", () => {
  assert.deepEqual(buildReasoningRequestFields({ effort: "high", thinking: true }, HIDDEN), {});
});

test("buildReasoningRequestFields: includes effort only when set and in the offered tiers", () => {
  assert.deepEqual(buildReasoningRequestFields({ effort: "high" }, SUPPORTED), { effort: "high" });
  // Unset effort ("" / undefined) is left off the body.
  assert.deepEqual(buildReasoningRequestFields({ effort: "" }, SUPPORTED), {});
  assert.deepEqual(buildReasoningRequestFields({}, SUPPORTED), {});
  // An effort value not in the model's tiers is dropped.
  assert.deepEqual(buildReasoningRequestFields({ effort: "bogus" }, SUPPORTED), {});
});

test("buildReasoningRequestFields: includes thinking only when toggled on", () => {
  assert.deepEqual(buildReasoningRequestFields({ thinking: true }, SUPPORTED), { thinking: true });
  assert.deepEqual(buildReasoningRequestFields({ thinking: false }, SUPPORTED), {});
});

test("buildReasoningRequestFields: emits both when both set and supported", () => {
  assert.deepEqual(buildReasoningRequestFields({ effort: "xhigh", thinking: true }, SUPPORTED), {
    effort: "xhigh",
    thinking: true,
  });
});
