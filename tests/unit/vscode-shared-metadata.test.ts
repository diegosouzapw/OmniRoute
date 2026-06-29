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
    familyFirstModelIds.resolveFamilyFirstPublishedModelId("gpt-5.4__provider_cx__tier_priority"),
    "cx/gpt-5.4__tier_priority"
  );
  assert.deepEqual(
    rawFamilyFirstModelIds.getFamilyFirstModelCandidates("cx/gpt-5.4__tier_flex", "gpt-5.4"),
    familyFirstModelIds.getFamilyFirstModelCandidates("cx/gpt-5.4__tier_flex", "gpt-5.4")
  );
});

test("vscode raw and tokenized service tier helpers share behavior", () => {
  const tokenizedPayload = serviceTierVariants.resolveVscodeServiceTierRequest({
    model: "gpt-5.4__provider_cx__tier_flex",
  });
  const rawPayload = rawServiceTierVariants.resolveVscodeServiceTierRequest({
    model: "gpt-5.4__provider_cx__tier_flex",
  });

  assert.deepEqual(rawPayload, tokenizedPayload);
  assert.deepEqual(
    serviceTierVariants.expandVscodeServiceTierModels([
      { id: "cx/gpt-5.4", name: "cx/gpt-5.4", owned_by: "codex" },
    ]),
    rawServiceTierVariants.expandVscodeServiceTierModels([
      { id: "cx/gpt-5.4", name: "cx/gpt-5.4", owned_by: "codex" },
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
