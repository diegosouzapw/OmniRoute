import assert from "node:assert/strict";
import test from "node:test";

import { getReasoningRoutingTargetEffortOptions } from "../../../src/shared/reasoning/reasoningRoutingEfforts.ts";

test("the target effort options include supported OpenAI extended tiers", () => {
  assert.deepEqual(getReasoningRoutingTargetEffortOptions("openai/gpt-5.6-sol", "medium"), [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
    "ultra",
  ]);
});

test("ordinary options and a saved unsupported extended value remain selectable", () => {
  assert.deepEqual(getReasoningRoutingTargetEffortOptions("openai/other-model", "max"), [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
  ]);
});

test("ultra remains limited to the model variants already supported by the capability rule", () => {
  assert.deepEqual(getReasoningRoutingTargetEffortOptions("codex/gpt-5.6-luna", "medium"), [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
  ]);
});

test("openai/ prefixed ids read the same Codex alias sets as the executor (#14720)", () => {
  assert.deepEqual(getReasoningRoutingTargetEffortOptions("openai/gpt-6-sol-high", "medium"), [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
    "ultra",
  ]);
});

test("github/ and opencode-zen/ prefixed luna ids offer max but not ultra (#14059)", () => {
  for (const model of ["github/gpt-5.6-luna", "opencode-zen/gpt-5.6-luna"]) {
    assert.deepEqual(getReasoningRoutingTargetEffortOptions(model, "medium"), [
      "none",
      "low",
      "medium",
      "high",
      "xhigh",
      "max",
    ]);
  }
});
