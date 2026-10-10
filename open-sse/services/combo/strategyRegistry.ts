// open-sse/services/combo/strategyRegistry.ts
// Internal registry of per-strategy dispatch traits (rail 3.8.52 R0.4a).
//
// Every strategy-specific branch in the combo pipeline used to compare the raw strategy
// string against a literal. Those decisions now live here, as data: each call site asks
// `getStrategyTraits(strategy).<trait>` instead. Adding a strategy means adding one entry
// below — TypeScript rejects the table while any canonical strategy is missing.
//
// This module is deliberately dependency-free (type-only imports) so every combo slice can
// import it without creating an import cycle with strategyDispatch.ts, which imports the
// ordering/dispatch leaves for the known-symbols gate.
//
// Internal on purpose: the public plugin extension point is planned for v4.

import type { AnyRoutingStrategyValue } from "../../../src/shared/constants/routingStrategies.ts";

/**
 * Pre-dispatch target-ordering stage. `declared` keeps the resolved order; `auto` is
 * handled by `resolveAutoStrategyOrder`; every other kind names one orderer in
 * `applyStrategyOrdering.ts`.
 */
export type StrategyOrderingKind =
  | "declared"
  | "auto"
  | "lkgp"
  | "strict-random"
  | "random"
  | "fill-first"
  | "p2c"
  | "least-used"
  | "cost-optimized"
  | "reset-aware"
  | "reset-window"
  | "context-optimized"
  | "cache-optimized"
  | "headroom"
  | "quota-weighted"
  | "quota-share";

export interface StrategyTraits {
  /** Target-ordering stage run before continuity filters (applyStrategyOrdering / auto). */
  ordering: StrategyOrderingKind;
  /** Dedicated dispatch prelude that replaces the common target pipeline. */
  dispatchPrelude: "none" | "fusion" | "pipeline";
  /** New turns are routed to the specialised round-robin handler (roundRobinCombo.ts). */
  usesRoundRobinLoop: boolean;
  /** Targets come from weighted step resolution (eligibility, weighted draw, exhaustion 503). */
  weightedSteps: boolean;
  /** Persistent winner pin written back after a success (weighted / round-robin stickiness). */
  stickyPin: "none" | "weighted" | "round-robin";
  /**
   * Execute-mode runtime units (nested combo refs): `unsupported` skips the runtime-unit
   * dispatch; otherwise the pre-execution reorder applied to the unit list.
   */
  runtimeUnitOrder: "unsupported" | "declared" | "shuffle" | "deck";
  /** Unit reorder inside executeRuntimeUnitCombo (keyed by the unit execution strategy). */
  unitExecutionOrder: "declared" | "shuffle" | "weighted-pick";
  /** `fallbackOnlyOnQuotaExhaustion` targets are protected (only tried on quota exhaustion). */
  honorsFallbackOnlyTargets: boolean;
  /** Session stickiness must not reorder the operator-declared failover order (#15241). */
  stickinessRespectsDeclaredOrder: boolean;
  /** Parallel provider-profile / availability pre-screen before the attempt loop. */
  preScreensTargets: boolean;
  /** Prompt-cache affinity scope: `model` preserves operator model order (#8370). */
  promptCacheAffinityScope: "model" | "global";
  /** Strategy-selected first target is re-pinned ahead of a cache-affinity reorder (#8370). */
  protectsFirstTargetFromAffinity: boolean;
  /** Cache-affinity ordering outranks session stickiness / eval routing when it applied. */
  cacheAffinityOwnsOrdering: boolean;
  /** Smart / pipeline-enabled combos may route through the multi-stage pipeline. */
  smartPipeline: boolean;
  /** Prompt-cache affinity is skipped when the auto scorer already weights cacheAffinity. */
  autoWeightsCacheAffinity: boolean;
  /** Per-target quota-exhaustion cutoff gate runs before each attempt. */
  appliesQuotaCutoffGate: boolean;
  /** In-flight slot reserved at selection and transferred when [0] moves. */
  inflightReservation: "none" | "quota-share" | "quota-weighted";
  /** Per-connection concurrency slot acquired around the whole quota-share dispatch. */
  quotaShareConcurrencySlot: boolean;
  /** Context-relay handoff config + post-success handoff generation. */
  contextRelay: boolean;
}

/**
 * Traits of a strategy that takes no strategy-specific branch — also the safe answer
 * for an unknown strategy string (identical to the `else` fall-through of the former
 * `strategy === "..."` chains).
 */
export const DEFAULT_STRATEGY_TRAITS: Readonly<StrategyTraits> = Object.freeze({
  ordering: "declared",
  dispatchPrelude: "none",
  usesRoundRobinLoop: false,
  weightedSteps: false,
  stickyPin: "none",
  runtimeUnitOrder: "unsupported",
  unitExecutionOrder: "declared",
  honorsFallbackOnlyTargets: false,
  stickinessRespectsDeclaredOrder: false,
  preScreensTargets: false,
  promptCacheAffinityScope: "global",
  protectsFirstTargetFromAffinity: false,
  cacheAffinityOwnsOrdering: false,
  smartPipeline: false,
  autoWeightsCacheAffinity: false,
  appliesQuotaCutoffGate: true,
  inflightReservation: "none",
  quotaShareConcurrencySlot: false,
  contextRelay: false,
});

type StrategyTraitOverrides = Partial<StrategyTraits> & Pick<StrategyTraits, "ordering">;

/**
 * Per-strategy deviations from {@link DEFAULT_STRATEGY_TRAITS}. Keyed by every canonical
 * strategy (public + internal) — a missing key is a compile error.
 */
const STRATEGY_TRAIT_OVERRIDES: Record<AnyRoutingStrategyValue, StrategyTraitOverrides> = {
  priority: {
    ordering: "declared",
    runtimeUnitOrder: "declared",
    honorsFallbackOnlyTargets: true,
    stickinessRespectsDeclaredOrder: true,
    preScreensTargets: true,
    promptCacheAffinityScope: "model",
    protectsFirstTargetFromAffinity: true,
  },
  weighted: {
    ordering: "declared",
    weightedSteps: true,
    stickyPin: "weighted",
    runtimeUnitOrder: "declared",
    unitExecutionOrder: "weighted-pick",
    promptCacheAffinityScope: "model",
    protectsFirstTargetFromAffinity: true,
  },
  "round-robin": {
    ordering: "declared",
    usesRoundRobinLoop: true,
    stickyPin: "round-robin",
    runtimeUnitOrder: "declared",
  },
  "context-relay": { ordering: "declared", contextRelay: true },
  "fill-first": {
    ordering: "fill-first",
    runtimeUnitOrder: "declared",
    promptCacheAffinityScope: "model",
    protectsFirstTargetFromAffinity: true,
  },
  p2c: { ordering: "p2c" },
  random: { ordering: "random", runtimeUnitOrder: "shuffle", unitExecutionOrder: "shuffle" },
  "least-used": { ordering: "least-used" },
  "cost-optimized": { ordering: "cost-optimized" },
  "reset-aware": { ordering: "reset-aware" },
  "reset-window": { ordering: "reset-window" },
  headroom: { ordering: "headroom" },
  "quota-weighted": {
    ordering: "quota-weighted",
    protectsFirstTargetFromAffinity: true,
    inflightReservation: "quota-weighted",
  },
  "strict-random": { ordering: "strict-random", runtimeUnitOrder: "deck" },
  auto: {
    ordering: "auto",
    protectsFirstTargetFromAffinity: true,
    smartPipeline: true,
    autoWeightsCacheAffinity: true,
    appliesQuotaCutoffGate: false,
  },
  lkgp: { ordering: "lkgp", protectsFirstTargetFromAffinity: true },
  "context-optimized": { ordering: "context-optimized" },
  "cache-optimized": { ordering: "cache-optimized", cacheAffinityOwnsOrdering: true },
  fusion: { ordering: "declared", dispatchPrelude: "fusion" },
  pipeline: { ordering: "declared", dispatchPrelude: "pipeline" },
  "quota-share": {
    ordering: "quota-share",
    promptCacheAffinityScope: "model",
    protectsFirstTargetFromAffinity: true,
    inflightReservation: "quota-share",
    quotaShareConcurrencySlot: true,
  },
};

/** Fully-resolved traits for every canonical strategy (defaults + overrides). */
export const COMBO_STRATEGY_REGISTRY: Readonly<Record<AnyRoutingStrategyValue, StrategyTraits>> =
  Object.freeze(
    Object.fromEntries(
      Object.entries(STRATEGY_TRAIT_OVERRIDES).map(([strategy, overrides]) => [
        strategy,
        Object.freeze({ ...DEFAULT_STRATEGY_TRAITS, ...overrides }),
      ])
    ) as Record<AnyRoutingStrategyValue, StrategyTraits>
  );

/** Canonical strategies that have a registry entry (public + internal). */
export const REGISTERED_COMBO_STRATEGIES = Object.freeze(
  Object.keys(COMBO_STRATEGY_REGISTRY) as AnyRoutingStrategyValue[]
);

/**
 * Traits for `strategy`. Unknown strings (and inherited object keys such as
 * `constructor`) resolve to {@link DEFAULT_STRATEGY_TRAITS}.
 */
export function getStrategyTraits(strategy: string | null | undefined): Readonly<StrategyTraits> {
  if (typeof strategy === "string" && Object.hasOwn(COMBO_STRATEGY_REGISTRY, strategy)) {
    return COMBO_STRATEGY_REGISTRY[strategy as AnyRoutingStrategyValue];
  }
  return DEFAULT_STRATEGY_TRAITS;
}
