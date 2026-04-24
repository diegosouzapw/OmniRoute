import test from "node:test";
import assert from "node:assert/strict";

const intelligentRouting = await import("../../src/lib/combos/intelligentRouting.ts");

test("getStrategyCategory classifies intelligent and deterministic strategies correctly", () => {
  assert.equal(intelligentRouting.getStrategyCategory("auto"), "intelligent");
  assert.equal(intelligentRouting.getStrategyCategory("lkgp"), "intelligent");

  [
    "priority",
    "weighted",
    "round-robin",
    "context-relay",
    "random",
    "least-used",
    "cost-optimized",
    "strict-random",
    "fill-first",
    "p2c",
    "context-optimized",
  ].forEach((strategy) => {
    assert.equal(intelligentRouting.getStrategyCategory(strategy), "deterministic");
  });
});

test("filterCombosByStrategyCategory returns expected combo subsets", () => {
  const combos = [
    { id: "1", strategy: "auto" },
    { id: "2", strategy: "priority" },
    { id: "3", strategy: "lkgp" },
  ];

  assert.deepEqual(
    intelligentRouting.filterCombosByStrategyCategory(combos, "all").map((combo) => combo.id),
    ["1", "2", "3"]
  );
  assert.deepEqual(
    intelligentRouting
      .filterCombosByStrategyCategory(combos, "intelligent")
      .map((combo) => combo.id),
    ["1", "3"]
  );
  assert.deepEqual(
    intelligentRouting
      .filterCombosByStrategyCategory(combos, "deterministic")
      .map((combo) => combo.id),
    ["2"]
  );
});

test("combo strategies stay aligned between UI metadata and schema validation", async () => {
  const { ROUTING_STRATEGIES } = await import("../../src/shared/constants/routingStrategies.ts");
  const { comboStrategySchema, createComboSchema } =
    await import("../../src/shared/validation/schemas.ts");
  const strategyValues = ROUTING_STRATEGIES.map((strategy) => strategy.value);

  assert.equal(strategyValues.length, 13);
  assert.equal(new Set(strategyValues).size, 13);
  assert.equal(strategyValues.includes("auto"), true);
  assert.equal(strategyValues.includes("lkgp"), true);
  assert.equal(comboStrategySchema.options.length, 13);
  assert.equal(new Set(comboStrategySchema.options).size, 13);

  strategyValues.forEach((strategy) => {
    const parsed = createComboSchema.safeParse({
      name: `combo-${strategy}`,
      models: ["openai/gpt-4o-mini"],
      strategy,
    });
    assert.equal(parsed.success, true, `schema should accept strategy ${strategy}`);
  });

  const invalidParse = createComboSchema.safeParse({
    name: "combo-invalid",
    models: ["openai/gpt-4o-mini"],
    strategy: "not-a-strategy",
  });
  assert.equal(invalidParse.success, false);
});

test("intelligent combo selection defaults only inside the intelligent filter", () => {
  const intelligentCombos = [
    { id: "combo-auto", strategy: "auto" },
    { id: "combo-lkgp", strategy: "lkgp" },
  ];

  const resolveSelectedCombo = ({ activeFilter, selectedIntelligentComboId }) => {
    const explicitlySelectedCombo =
      intelligentCombos.find((combo) => combo.id === selectedIntelligentComboId) || null;

    if (explicitlySelectedCombo) {
      return explicitlySelectedCombo;
    }

    return activeFilter === "intelligent" ? intelligentCombos[0] : null;
  };

  assert.equal(
    resolveSelectedCombo({ activeFilter: "all", selectedIntelligentComboId: null }),
    null
  );
  assert.equal(
    resolveSelectedCombo({ activeFilter: "intelligent", selectedIntelligentComboId: null })?.id,
    "combo-auto"
  );
  assert.equal(
    resolveSelectedCombo({
      activeFilter: "all",
      selectedIntelligentComboId: "combo-lkgp",
    })?.id,
    "combo-lkgp"
  );
});

test("sidebar visibility excludes the removed auto-combo item", async () => {
  const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");
  const primarySection = sidebarVisibility.SIDEBAR_SECTIONS.find(
    (section) => section.id === "primary"
  );

  assert.equal(sidebarVisibility.HIDEABLE_SIDEBAR_ITEM_IDS.includes("auto-combo"), false);
  assert.ok(primarySection);
  assert.equal(
    primarySection.items.some((item) => item.id === "auto-combo"),
    false
  );
  assert.deepEqual(sidebarVisibility.normalizeHiddenSidebarItems(["auto-combo", "home"]), ["home"]);
});

test("intelligent routing helpers normalize config and build provider scores", () => {
  const normalizedConfig = intelligentRouting.normalizeIntelligentRoutingConfig({
    candidatePool: ["openai", "anthropic"],
    explorationRate: "0.25",
    modePack: "",
    routerStrategy: "",
    weights: { quota: 0.4 },
  });

  assert.deepEqual(normalizedConfig.candidatePool, ["openai", "anthropic"]);
  assert.equal(normalizedConfig.explorationRate, 0.25);
  assert.equal(normalizedConfig.modePack, "ship-fast");
  assert.equal(normalizedConfig.routerStrategy, "rules");
  assert.equal(normalizedConfig.weights.quota, 0.4);
  assert.equal(
    normalizedConfig.weights.health,
    intelligentRouting.DEFAULT_INTELLIGENT_WEIGHTS.health
  );

  const providerScores = intelligentRouting.buildIntelligentProviderScores({
    config: normalizedConfig,
  });

  assert.equal(providerScores.length, 2);
  assert.deepEqual(
    providerScores.map((entry) => ({
      provider: entry.provider,
      model: entry.model,
      score: entry.score,
      quotaWeight: entry.factors.quota,
    })),
    [
      { provider: "openai", model: "auto", score: 0.5, quotaWeight: 0.4 },
      { provider: "anthropic", model: "auto", score: 0.5, quotaWeight: 0.4 },
    ]
  );
});
