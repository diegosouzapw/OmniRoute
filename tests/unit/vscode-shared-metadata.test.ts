import assert from "node:assert/strict";
import test from "node:test";

const familyFirstModelIds =
  await import("../../src/app/api/v1/vscode/[token]/familyFirstModelIds.ts");
const rawFamilyFirstModelIds =
  await import("../../src/app/api/v1/vscode/raw/[token]/familyFirstModelIds.ts");
const serviceTierVariants =
  await import("../../src/app/api/v1/vscode/[token]/serviceTierVariants.ts");
const rawServiceTierVariants =
  await import("../../src/app/api/v1/vscode/raw/[token]/serviceTierVariants.ts");
const reasoningMetadata = await import("../../src/app/api/v1/vscode/[token]/reasoningMetadata.ts");
const rawReasoningMetadata =
  await import("../../src/app/api/v1/vscode/raw/[token]/reasoningMetadata.ts");

test("vscode raw and tokenized family-first helpers share behavior", () => {
  assert.equal(
    familyFirstModelIds.resolveFamilyFirstPublishedModelId(
      "gpt-5.6-sol__provider_cx__tier_priority"
    ),
    "cx/gpt-5.6-sol__tier_priority"
  );
  assert.deepEqual(
    rawFamilyFirstModelIds.getFamilyFirstModelCandidates(
      "cx/gpt-5.6-sol__tier_flex",
      "gpt-5.6-sol"
    ),
    familyFirstModelIds.getFamilyFirstModelCandidates("cx/gpt-5.6-sol__tier_flex", "gpt-5.6-sol")
  );
});

test("vscode raw and tokenized service tier helpers share behavior", () => {
  const tokenizedPayload = serviceTierVariants.resolveVscodeServiceTierRequest({
    model: "gpt-5.6-sol__provider_cx__tier_flex",
  });
  const rawPayload = rawServiceTierVariants.resolveVscodeServiceTierRequest({
    model: "gpt-5.6-sol__provider_cx__tier_flex",
  });

  assert.deepEqual(rawPayload, tokenizedPayload);
  assert.deepEqual(
    serviceTierVariants.expandVscodeServiceTierModels([
      { id: "cx/gpt-5.6-sol", name: "cx/gpt-5.6-sol", owned_by: "codex" },
    ]),
    rawServiceTierVariants.expandVscodeServiceTierModels([
      { id: "cx/gpt-5.6-sol", name: "cx/gpt-5.6-sol", owned_by: "codex" },
    ])
  );
});

test("vscode raw and tokenized reasoning helpers share behavior", () => {
  const reasoningModel = {
    id: "openai/gpt-5-high",
    owned_by: "openai",
    capabilities: { reasoning: true },
  };
  const supportedValues = reasoningMetadata.getReasoningEffortValues(reasoningModel);

  assert.deepEqual(supportedValues, rawReasoningMetadata.getReasoningEffortValues(reasoningModel));
  assert.equal(
    reasoningMetadata.inferSelectedReasoningEffort(reasoningModel, supportedValues),
    "high"
  );
  assert.deepEqual(
    reasoningMetadata.buildReasoningConfigSchema(["none", "high"], "high"),
    rawReasoningMetadata.buildReasoningConfigSchema(["none", "high"], "high")
  );
});

test("vscode reasoning metadata supports GPT-5.6 Max and Ultra without splitting legacy slugs", () => {
  const sol = {
    id: "cx/gpt-5.6-sol",
    owned_by: "codex",
    capabilities: { reasoning: true },
  };
  const terra = {
    id: "cx/gpt-5.6-terra",
    owned_by: "codex",
    capabilities: { reasoning: true },
  };
  const luna = {
    id: "cx/gpt-5.6-luna",
    owned_by: "codex",
    capabilities: { reasoning: true },
  };

  assert.deepEqual(reasoningMetadata.getReasoningEffortValues(sol), [
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
    "ultra",
  ]);
  assert.deepEqual(reasoningMetadata.getReasoningEffortValues(terra), [
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
    "ultra",
  ]);
  assert.deepEqual(reasoningMetadata.getReasoningEffortValues(luna), [
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
  ]);
  assert.equal(reasoningMetadata.getDefaultReasoningEffort(sol), "low");
  assert.equal(reasoningMetadata.getDefaultReasoningEffort(terra), "medium");
  assert.equal(reasoningMetadata.getDefaultReasoningEffort(luna), "medium");
  assert.equal(
    reasoningMetadata.inferSelectedReasoningEffort(
      { ...sol, id: "cx/gpt-5.6-sol-ultra" },
      reasoningMetadata.getReasoningEffortValues(sol)
    ),
    "ultra"
  );
  assert.equal(
    reasoningMetadata.getReasoningVariantBaseModelId("cx/gpt-5.6-sol-max"),
    "cx/gpt-5.6-sol"
  );
  assert.equal(
    reasoningMetadata.getReasoningVariantBaseModelId("cx/gpt-5.1-codex-max"),
    "cx/gpt-5.1-codex-max"
  );
});
