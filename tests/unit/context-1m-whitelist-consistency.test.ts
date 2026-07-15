import test from "node:test";
import assert from "node:assert/strict";

const { modelSupportsContext1mBeta } =
  await import("../../open-sse/services/claudeCodeCompatible.ts");
const { claudeProvider } = await import("../../open-sse/config/providers/registry/claude/index.ts");

const CONTEXT_1M_THRESHOLD = 200000;

// Models from the claude registry with contextLength > 200000.
const claudeModelsOver200k = claudeProvider.models
  .filter((m) => (m.contextLength ?? claudeProvider.defaultContextLength) > CONTEXT_1M_THRESHOLD)
  .map((m) => m.id);

test("every claude registry model with contextLength > 200k is in CONTEXT_1M_SUPPORTED_MODELS", () => {
  const missing = claudeModelsOver200k.filter((id) => !modelSupportsContext1mBeta(id));
  assert.deepEqual(
    missing,
    [],
    `These models have contextLength > 200k but are missing from CONTEXT_1M_SUPPORTED_MODELS: ${missing.join(", ")}`
  );
});

test("every CONTEXT_1M_SUPPORTED_MODELS entry has contextLength > 200k in claude registry", () => {
  const knownModels = new Map(
    claudeProvider.models.map((m) => [m.id, m.contextLength ?? claudeProvider.defaultContextLength])
  );

  // Only check models that actually exist in the claude registry.
  // Some whitelist entries (e.g. future models) may not be in the registry yet.
  for (const [id, ctxLen] of knownModels) {
    if (modelSupportsContext1mBeta(id)) {
      assert.ok(
        ctxLen > CONTEXT_1M_THRESHOLD,
        `Model ${id} is in CONTEXT_1M_SUPPORTED_MODELS but has contextLength ${ctxLen} (expected > ${CONTEXT_1M_THRESHOLD})`
      );
    }
  }
});
