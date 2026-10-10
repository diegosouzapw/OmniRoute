/**
 * Combo strategy registry (rail 3.8.52 R0.4a).
 *
 * The combo pipeline used to branch on raw string comparisons of the strategy name
 * scattered across ~12 slices. Those decisions now live in a typed trait registry
 * (`open-sse/services/combo/strategyRegistry.ts`). This suite pins:
 *   1. coverage — every canonical strategy (20 public + internal `quota-share`) has an
 *      entry, and the known-symbols gate's HANDLED_COMBO_STRATEGIES is derived from it;
 *   2. the safe default — an unknown strategy resolves to the exact fall-through of the
 *      former `else` chains (prototype keys included);
 *   3. parity — for every strategy, each trait reproduces the decision the former
 *      literal comparison made. The `LEGACY_DECISIONS` table below is the pre-refactor
 *      predicates copied verbatim from the replaced call sites.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  INTERNAL_ROUTING_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
} from "../../../src/shared/constants/routingStrategies.ts";
import {
  COMBO_STRATEGY_REGISTRY,
  DEFAULT_STRATEGY_TRAITS,
  REGISTERED_COMBO_STRATEGIES,
  getStrategyTraits,
  type StrategyTraits,
} from "../../../open-sse/services/combo/strategyRegistry.ts";
import { HANDLED_COMBO_STRATEGIES } from "../../../open-sse/services/combo/strategyDispatch.ts";

const CANONICAL = [...ROUTING_STRATEGY_VALUES, ...INTERNAL_ROUTING_STRATEGY_VALUES];

/** Strings that must behave like the old `else` branch (no strategy-specific path). */
const UNKNOWN = ["", "not-a-strategy", "Priority", "constructor", "__proto__", "toString"];

/**
 * Pre-refactor decision for each trait, keyed by trait name. Each predicate is the
 * literal comparison removed from the named call site.
 */
const LEGACY_DECISIONS: { [K in keyof StrategyTraits]: (s: string) => StrategyTraits[K] } = {
  // applyStrategyOrdering.ts else-if chain + targetResolution.ts orderByStrategy (auto)
  ordering: (s) => {
    const reordering = [
      "auto",
      "lkgp",
      "strict-random",
      "random",
      "fill-first",
      "p2c",
      "least-used",
      "cost-optimized",
      "reset-aware",
      "reset-window",
      "context-optimized",
      "cache-optimized",
      "headroom",
      "quota-weighted",
      "quota-share",
    ];
    return (reordering.includes(s) ? s : "declared") as StrategyTraits["ordering"];
  },
  // dispatchPrelude.ts tryFusionDispatch / tryPipelineDispatch
  dispatchPrelude: (s) => (s === "fusion" ? "fusion" : s === "pipeline" ? "pipeline" : "none"),
  // combo.ts round-robin handler
  usesRoundRobinLoop: (s) => s === "round-robin",
  // targetResolution.ts weighted step resolution
  weightedSteps: (s) => s === "weighted",
  // executeTargetAttempt.ts / dispatchPrelude.ts sticky write-back + targetResolution sticky key
  stickyPin: (s) => (s === "weighted" ? "weighted" : s === "round-robin" ? "round-robin" : "none"),
  // dispatchPrelude.ts simpleExecuteStrategies + orderRuntimeUnits
  runtimeUnitOrder: (s) => {
    const simple = ["priority", "round-robin", "random", "strict-random", "weighted", "fill-first"];
    if (!simple.includes(s)) return "unsupported";
    if (s === "random") return "shuffle";
    if (s === "strict-random") return "deck";
    return "declared";
  },
  // runtimeUnits.ts orderUnitsForStrategy
  unitExecutionOrder: (s) =>
    s === "random" ? "shuffle" : s === "weighted" ? "weighted-pick" : "declared",
  // runtimeUnits.ts / comboAttemptLoop.ts / executeTargetGates.ts protected priority target
  honorsFallbackOnlyTargets: (s) => s === "priority",
  // targetResolution.ts applySessionStickiness respectDeclaredOrder (#15241)
  stickinessRespectsDeclaredOrder: (s) => s === "priority",
  // targetResolution.ts preScreenTargets
  preScreensTargets: (s) => s === "priority",
  // targetResolution.ts modelOrderPreservingStrategies (#8370)
  promptCacheAffinityScope: (s) =>
    ["priority", "weighted", "fill-first", "quota-share"].includes(s) ? "model" : "global",
  // promptCacheAffinity.ts shouldProtectOriginalFirst (#8370)
  protectsFirstTargetFromAffinity: (s) =>
    s === "auto" ||
    s === "quota-share" ||
    s === "weighted" ||
    s === "priority" ||
    s === "fill-first" ||
    s === "lkgp" ||
    s === "quota-weighted",
  // targetResolution.ts applyContinuityFilters cacheStrategyAffinityApplied
  cacheAffinityOwnsOrdering: (s) => s === "cache-optimized",
  // targetResolution.ts dispatchSmartPipeline
  smartPipeline: (s) => s === "auto",
  // targetResolution.ts isPromptCacheAffinityEnabled
  autoWeightsCacheAffinity: (s) => s === "auto",
  // executeTargetGates.ts quota-exhaustion cutoff (`!== "auto"`)
  appliesQuotaCutoffGate: (s) => s !== "auto",
  // targetResolution.ts in-flight slot transfer
  inflightReservation: (s) =>
    s === "quota-weighted" ? "quota-weighted" : s === "quota-share" ? "quota-share" : "none",
  // combo.ts quotaShareConcurrencyEnabled
  quotaShareConcurrencySlot: (s) => s === "quota-share",
  // comboSetup.ts relayConfig + executeTargetAttempt.ts handoff
  contextRelay: (s) => s === "context-relay",
};

test("registry covers every canonical strategy (20 public + quota-share) and nothing else", () => {
  assert.equal(CANONICAL.length, 21);
  assert.deepEqual([...REGISTERED_COMBO_STRATEGIES].sort(), [...CANONICAL].sort());
  for (const strategy of CANONICAL) {
    assert.ok(Object.hasOwn(COMBO_STRATEGY_REGISTRY, strategy), `missing ${strategy}`);
    assert.notEqual(getStrategyTraits(strategy), DEFAULT_STRATEGY_TRAITS);
  }
});

test("HANDLED_COMBO_STRATEGIES (known-symbols gate input) is derived from the registry", () => {
  assert.deepEqual([...HANDLED_COMBO_STRATEGIES], [...REGISTERED_COMBO_STRATEGIES]);
});

test("every registry entry defines every trait", () => {
  const traitKeys = Object.keys(DEFAULT_STRATEGY_TRAITS).sort();
  assert.deepEqual(Object.keys(LEGACY_DECISIONS).sort(), traitKeys);
  for (const strategy of CANONICAL) {
    assert.deepEqual(Object.keys(getStrategyTraits(strategy)).sort(), traitKeys, strategy);
  }
});

test("unknown strategies resolve to the safe default (old `else` fall-through)", () => {
  for (const strategy of [...UNKNOWN, null, undefined]) {
    assert.equal(getStrategyTraits(strategy), DEFAULT_STRATEGY_TRAITS, String(strategy));
  }
  assert.equal(DEFAULT_STRATEGY_TRAITS.ordering, "declared");
  assert.equal(DEFAULT_STRATEGY_TRAITS.runtimeUnitOrder, "unsupported");
  assert.equal(DEFAULT_STRATEGY_TRAITS.appliesQuotaCutoffGate, true);
});

test("registry entries are frozen", () => {
  assert.ok(Object.isFrozen(COMBO_STRATEGY_REGISTRY));
  assert.ok(Object.isFrozen(DEFAULT_STRATEGY_TRAITS));
  for (const strategy of CANONICAL) assert.ok(Object.isFrozen(getStrategyTraits(strategy)));
});

test("parity: each trait reproduces the pre-refactor decision for every strategy", () => {
  for (const strategy of [...CANONICAL, ...UNKNOWN]) {
    const traits = getStrategyTraits(strategy);
    for (const [trait, legacy] of Object.entries(LEGACY_DECISIONS)) {
      assert.equal(
        traits[trait as keyof StrategyTraits],
        (legacy as (s: string) => unknown)(strategy),
        `${strategy}.${trait}`
      );
    }
  }
});
