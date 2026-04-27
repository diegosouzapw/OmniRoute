import test from "node:test";
import assert from "node:assert/strict";

const builderDraft = await import("../../src/lib/combos/builderDraft.ts");

test("parseQualifiedModel keeps provider prefix and the full tail model id", () => {
  assert.deepEqual(builderDraft.parseQualifiedModel("openrouter/openai/gpt-5.4"), {
    providerId: "openrouter",
    modelId: "openai/gpt-5.4",
  });
  assert.deepEqual(builderDraft.parseQualifiedModel("codex/gpt-5.3-codex"), {
    providerId: "codex",
    modelId: "gpt-5.3-codex",
  });
  assert.equal(builderDraft.parseQualifiedModel("combo-only"), null);
});

test("buildPrecisionComboModelStep preserves provider/model/account triple", () => {
  assert.deepEqual(
    builderDraft.buildPrecisionComboModelStep({
      providerId: "codex",
      modelId: "gpt-5.3-codex",
      connectionId: "conn-codex-a",
      connectionLabel: "Codex A",
      weight: 35,
    }),
    {
      kind: "model",
      providerId: "codex",
      model: "codex/gpt-5.3-codex",
      connectionId: "conn-codex-a",
      label: "Codex A",
      weight: 35,
    }
  );
});

test("buildManualComboModelStep resolves provider aliases and uses dynamic account", () => {
  assert.deepEqual(
    builderDraft.buildManualComboModelStep({
      value: "cx/gpt-5.5",
      providers: [{ providerId: "codex", alias: "cx" }],
    }),
    {
      kind: "model",
      providerId: "codex",
      model: "codex/gpt-5.5",
      weight: 0,
    }
  );

  assert.deepEqual(
    builderDraft.buildManualComboModelStep({
      value: "openrouter/openai/gpt-5.5",
      providers: [{ providerId: "openrouter", alias: "openrouter" }],
    }),
    {
      kind: "model",
      providerId: "openrouter",
      model: "openrouter/openai/gpt-5.5",
      weight: 0,
    }
  );

  assert.equal(
    builderDraft.resolveComboBuilderProviderId("foo", [{ providerId: "codex", alias: "cx" }]),
    null
  );
  assert.equal(
    builderDraft.buildManualComboModelStep({
      value: "foo/bar",
      providers: [{ providerId: "codex", alias: "cx" }],
    }),
    null
  );
  assert.equal(builderDraft.buildManualComboModelStep({ value: "gpt-5.5" }), null);
});

test("hasExactModelStepDuplicate blocks only exact provider/model/connection repeats", () => {
  const existing = [
    builderDraft.buildPrecisionComboModelStep({
      providerId: "codex",
      modelId: "gpt-5.3-codex",
      connectionId: "conn-a",
    }),
    builderDraft.buildPrecisionComboModelStep({
      providerId: "codex",
      modelId: "gpt-5.3-codex",
      connectionId: "conn-b",
    }),
    builderDraft.buildPrecisionComboModelStep({
      providerId: "codex",
      modelId: "gpt-5.3-codex",
    }),
    { kind: "combo-ref", comboName: "fallback", weight: 0 },
  ];

  assert.equal(
    builderDraft.hasExactModelStepDuplicate(
      existing,
      builderDraft.buildPrecisionComboModelStep({
        providerId: "codex",
        modelId: "gpt-5.3-codex",
        connectionId: "conn-a",
      })
    ),
    true
  );
  assert.equal(
    builderDraft.hasExactModelStepDuplicate(
      existing,
      builderDraft.buildPrecisionComboModelStep({
        providerId: "codex",
        modelId: "gpt-5.3-codex",
        connectionId: "conn-c",
      })
    ),
    false
  );
  assert.equal(
    builderDraft.hasExactModelStepDuplicate(
      existing,
      builderDraft.buildPrecisionComboModelStep({
        providerId: "codex",
        modelId: "gpt-5.3-codex",
      })
    ),
    true
  );
});

test("findNextSuggestedConnectionId advances to the next unused connection for the same model", () => {
  const existing = [
    builderDraft.buildPrecisionComboModelStep({
      providerId: "codex",
      modelId: "gpt-5.3-codex",
      connectionId: "conn-a",
    }),
    builderDraft.buildPrecisionComboModelStep({
      providerId: "codex",
      modelId: "gpt-5.3-codex",
      connectionId: "conn-b",
    }),
  ];

  assert.equal(
    builderDraft.findNextSuggestedConnectionId(existing, "codex", "gpt-5.3-codex", [
      { id: "conn-a" },
      { id: "conn-b" },
      { id: "conn-c" },
    ]),
    "conn-c"
  );
  assert.equal(
    builderDraft.findNextSuggestedConnectionId(existing, "codex", "gpt-5.3-codex", [
      { id: "conn-a" },
      { id: "conn-b" },
    ]),
    builderDraft.COMBO_BUILDER_AUTO_CONNECTION
  );
});

test("combo builder stage helpers expose completion state and linear navigation", () => {
  assert.deepEqual(
    builderDraft.getComboBuilderStageChecks({
      name: "codex-stack",
      nameError: "",
      modelsCount: 2,
      hasInvalidWeightedTotal: false,
      hasCostOptimizedWithoutPricing: false,
    }),
    {
      basics: true,
      steps: true,
      strategy: true,
      review: false,
    }
  );

  assert.deepEqual(
    builderDraft.getComboBuilderStageChecks({
      name: "",
      nameError: "Required",
      modelsCount: 0,
      hasInvalidWeightedTotal: true,
      hasCostOptimizedWithoutPricing: false,
    }),
    {
      basics: false,
      steps: false,
      strategy: false,
      review: false,
    }
  );

  assert.equal(builderDraft.getNextComboBuilderStage("basics"), "steps");
  assert.equal(builderDraft.getNextComboBuilderStage("steps"), "strategy");
  assert.equal(builderDraft.getNextComboBuilderStage("strategy"), "review");
  assert.equal(builderDraft.getNextComboBuilderStage("review"), "review");
  assert.equal(builderDraft.getPreviousComboBuilderStage("review"), "strategy");
  assert.equal(builderDraft.getPreviousComboBuilderStage("basics"), "basics");
  assert.deepEqual(builderDraft.getComboBuilderStages({ strategy: "priority" }), [
    "basics",
    "steps",
    "strategy",
    "review",
  ]);
  assert.deepEqual(builderDraft.getComboBuilderStages({ strategy: "auto" }), [
    "basics",
    "steps",
    "strategy",
    "intelligent",
    "review",
  ]);
  assert.equal(
    builderDraft.getNextComboBuilderStage("strategy", { strategy: "auto" }),
    "intelligent"
  );
  assert.equal(
    builderDraft.getPreviousComboBuilderStage("review", { strategy: "auto" }),
    "intelligent"
  );

  const checks = builderDraft.getComboBuilderStageChecks({
    name: "codex-stack",
    nameError: "",
    modelsCount: 1,
    hasInvalidWeightedTotal: true,
    hasCostOptimizedWithoutPricing: false,
  });

  assert.equal(builderDraft.canAccessComboBuilderStage("basics", checks), true);
  assert.equal(builderDraft.canAccessComboBuilderStage("steps", checks), true);
  assert.equal(builderDraft.canAccessComboBuilderStage("strategy", checks), true);
  assert.equal(builderDraft.canAccessComboBuilderStage("review", checks), true);
  assert.equal(
    builderDraft.canAccessComboBuilderStage("intelligent", checks, { strategy: "auto" }),
    false
  );

  const lockedChecks = builderDraft.getComboBuilderStageChecks({
    name: "",
    nameError: "Required",
    modelsCount: 0,
    hasInvalidWeightedTotal: false,
    hasCostOptimizedWithoutPricing: false,
  });

  assert.equal(builderDraft.canAccessComboBuilderStage("steps", lockedChecks), false);
  assert.equal(builderDraft.canAccessComboBuilderStage("strategy", lockedChecks), false);
  assert.equal(builderDraft.canAccessComboBuilderStage("review", lockedChecks), false);
});

test("intelligent builder stage is accessible only after strategy checks pass", () => {
  const readyChecks = builderDraft.getComboBuilderStageChecks({
    name: "auto-stack",
    nameError: "",
    modelsCount: 2,
    hasInvalidWeightedTotal: false,
    hasCostOptimizedWithoutPricing: false,
  });

  assert.equal(
    builderDraft.canAccessComboBuilderStage("intelligent", readyChecks, { strategy: "auto" }),
    true
  );
  assert.equal(builderDraft.isIntelligentBuilderStrategy("auto"), true);
  assert.equal(builderDraft.isIntelligentBuilderStrategy("lkgp"), true);
  assert.equal(builderDraft.isIntelligentBuilderStrategy("priority"), false);
});
