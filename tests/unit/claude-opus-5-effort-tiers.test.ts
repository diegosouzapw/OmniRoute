import assert from "node:assert/strict";
import { test } from "node:test";
import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { getRegistryModelThinkingEfforts } from "../../open-sse/config/providerRegistry.ts";
import { splitSyncedEffortSuffix } from "../../open-sse/services/model.ts";
import { getThinkingCapabilityFields } from "../../src/app/api/v1/models/catalogHelpers.ts";

const OPUS_5 = "claude-opus-5";
const EFFORTS = ["low", "medium", "high", "xhigh", "max"];

test("claude registry advertises opus 5 reasoning tiers", () => {
  const model = getModelsByProviderId("claude").find((entry) => entry.id === OPUS_5);
  assert.ok(model, "claude-opus-5 must stay a seeded Claude Code model");
  assert.deepEqual(model.supportedThinkingEfforts, EFFORTS);
  assert.equal(model.supportsReasoning, true);
  assert.equal(model.supportsXHighEffort, true);
});

test("claude registry effort lookup resolves opus 5 -high", () => {
  const efforts = getRegistryModelThinkingEfforts("claude", OPUS_5);
  assert.deepEqual(efforts, EFFORTS);
  const split = splitSyncedEffortSuffix(`${OPUS_5}-high`, efforts);
  assert.equal(split.baseModel, OPUS_5);
  assert.equal(split.effort, "high");
});

test("catalog emits effort_tiers for opus 5 even with the canonical fallback skipped", () => {
  // catalog.ts passes skipCanonicalEffortFallback=true for static registry models,
  // so the tiers must come from the registry entry itself — pull them through the
  // same lookup the catalog uses instead of handing the helper a literal array.
  const declared = getRegistryModelThinkingEfforts("claude", OPUS_5);
  const fields = getThinkingCapabilityFields("claude", OPUS_5, true, declared, true);
  assert.deepEqual(fields.effort_tiers, EFFORTS);
});

test("catalog emits no effort_tiers when the registry entry declares none (fallback skipped)", () => {
  // claude-sonnet-4-5-20250929 carries no supportedThinkingEfforts in the registry;
  // with the canonical fallback skipped the helper must not synthesize tiers for it.
  const declared = getRegistryModelThinkingEfforts("claude", "claude-sonnet-4-5-20250929");
  assert.equal(declared, undefined);
  const fields = getThinkingCapabilityFields(
    "claude",
    "claude-sonnet-4-5-20250929",
    true,
    declared,
    true
  );
  assert.equal("effort_tiers" in fields, false);
});
