import test from "node:test";
import assert from "node:assert/strict";

const builderDraft = await import("../../src/lib/combos/builderDraft.ts");

test("combo builder draft public surface excludes removed target accessor", () => {
  assert.equal(Object.hasOwn(builderDraft, "getComboDraftTarget"), false);
  assert.equal(typeof builderDraft.buildPrecisionComboModelStep, "function");
  assert.equal(typeof builderDraft.buildManualComboModelStep, "function");
});

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

// --- Combo builder "global model search" mode (#8285) ---------------------

const GLOBAL_SEARCH_PROVIDERS = [
  {
    providerId: "anthropic",
    displayName: "Anthropic",
    connectionCount: 2,
    connections: [{ id: "conn-a" }, { id: "conn-b" }],
    models: [
      { id: "claude-opus-4", name: "Claude Opus 4" },
      { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5" },
    ],
  },
  {
    providerId: "deepseek",
    displayName: "DeepSeek",
    connectionCount: 1,
    connections: [{ id: "conn-c" }],
    models: [{ id: "deepseek-chat", name: "DeepSeek Chat" }],
  },
  // No providerId — must be skipped, not throw.
  { providerId: "", displayName: "Broken", models: [{ id: "x", name: "X" }] },
];

test("buildGlobalModelList flattens provider/model pairs and skips entries without a providerId", () => {
  const list = builderDraft.buildGlobalModelList(GLOBAL_SEARCH_PROVIDERS);

  assert.equal(list.length, 3);
  assert.deepEqual(
    list.map((entry) => `${entry.providerId}/${entry.modelId}`),
    ["anthropic/claude-opus-4", "anthropic/claude-sonnet-4.5", "deepseek/deepseek-chat"]
  );

  const opusEntry = list[0];
  assert.equal(opusEntry.providerName, "Anthropic");
  assert.equal(opusEntry.modelName, "Claude Opus 4");
  assert.equal(opusEntry.connectionCount, 2);
  assert.deepEqual(opusEntry.step, {
    kind: "model",
    providerId: "anthropic",
    model: "anthropic/claude-opus-4",
    weight: 0,
  });
});

test("buildGlobalModelList tolerates missing models/providers arrays", () => {
  assert.deepEqual(builderDraft.buildGlobalModelList(undefined), []);
  assert.deepEqual(builderDraft.buildGlobalModelList([{ providerId: "codex" }]), []);
});

test("filterGlobalModelList matches provider and model name/id case-insensitively", () => {
  const list = builderDraft.buildGlobalModelList(GLOBAL_SEARCH_PROVIDERS);

  const byModelName = builderDraft.filterGlobalModelList(list, "OPUS");
  assert.deepEqual(
    byModelName.map((e) => e.modelId),
    ["claude-opus-4"]
  );

  const byProviderId = builderDraft.filterGlobalModelList(list, "deepseek");
  assert.deepEqual(
    byProviderId.map((e) => e.modelId),
    ["deepseek-chat"]
  );

  assert.equal(builderDraft.filterGlobalModelList(list, "   ").length, 3);
  assert.equal(builderDraft.filterGlobalModelList(list, "").length, 3);
  assert.equal(builderDraft.filterGlobalModelList(list, "nonexistent-model").length, 0);
});

test("addGlobalModelStep appends a new step and skips an exact provider/model/account duplicate", () => {
  const list = builderDraft.buildGlobalModelList(GLOBAL_SEARCH_PROVIDERS);
  const opusStep = list[0].step;

  const afterFirstAdd = builderDraft.addGlobalModelStep([], opusStep);
  assert.equal(afterFirstAdd.length, 1);
  assert.deepEqual(afterFirstAdd[0], opusStep);

  const afterDuplicateAdd = builderDraft.addGlobalModelStep(afterFirstAdd, opusStep);
  assert.equal(afterDuplicateAdd, afterFirstAdd, "duplicate add must return the same array reference");
  assert.equal(afterDuplicateAdd.length, 1);
});

test("addAllGlobalSearchMatches adds every non-duplicate match once, de-duping within the same batch", () => {
  const list = builderDraft.buildGlobalModelList(GLOBAL_SEARCH_PROVIDERS);
  const allMatches = builderDraft.filterGlobalModelList(list, "");

  const added = builderDraft.addAllGlobalSearchMatches([], allMatches);
  assert.equal(added.length, 3);

  // Re-running against a combo that already has one of the three models only
  // adds the two remaining ones.
  const existing = [list[0].step];
  const addedRemaining = builderDraft.addAllGlobalSearchMatches(existing, allMatches);
  assert.equal(addedRemaining.length, 3);
  assert.deepEqual(addedRemaining[0], list[0].step);

  // A batch that resolves to the exact same step twice (duplicate search
  // matches) must still only add it once.
  const duplicateBatch = [list[1], list[1]];
  const afterDuplicateBatch = builderDraft.addAllGlobalSearchMatches([], duplicateBatch);
  assert.equal(afterDuplicateBatch.length, 1);
});

test("addAllGlobalSearchMatches returns the original array reference when nothing new to add", () => {
  const list = builderDraft.buildGlobalModelList(GLOBAL_SEARCH_PROVIDERS);
  const existing = list.map((entry) => entry.step);

  const result = builderDraft.addAllGlobalSearchMatches(existing, list);
  assert.equal(result, existing);
});
