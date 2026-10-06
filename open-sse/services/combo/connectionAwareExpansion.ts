/**
 * Connection-aware expansion -- shared pipeline stage for all combo strategies.
 *
 * Group-A strategies (reset-aware / reset-window / headroom / quota-share) and
 * `auto` already expand targets to concrete per-connection candidates inside
 * their own ordering (applyStrategyOrdering / buildAutoCandidates). The other
 * 15 strategies ("group B": priority, weighted, round-robin, random, p2c,
 * least-used, cost-optimized, lkgp, fill-first, strict-random,
 * context-optimized, cache-optimized, context-relay, fusion, pipeline) kept a
 * provider-level view, so an exhausted multi-account provider kept getting
 * picked -- the per-target exhaustion gates in combo.ts were dead code for
 * them (target.connectionId === null).
 *
 * This module promotes the A-group expander to a shared stage, gated behind
 * the opt-in config key `connectionAwareExpansion` (combo config or settings
 * fallback, default false). When off, targets pass through byte-identical.
 *
 */

import type { ResolvedComboTarget, ComboLogger } from "./types.ts";
import { expandTargetsByQuotaAwareConnections } from "./quotaStrategies.ts";

/**
 * The 15 group-B strategies that gain per-connection awareness through this
 * stage. A-group strategies (reset-aware, reset-window, headroom, quota-share)
 * and `auto` are deliberately absent -- they expand inside their own ordering
 * and a second pass here would only burn another connection-list read
 * (idempotent but wasteful).
 */
export const CONNECTION_AWARE_EXPANSION_GROUP_B: readonly string[] = [
  "priority",
  "weighted",
  "round-robin",
  "random",
  "p2c",
  "least-used",
  "cost-optimized",
  "lkgp",
  "fill-first",
  "strict-random",
  "context-optimized",
  "cache-optimized",
  "context-relay",
  "fusion",
  "pipeline",
] as const;

const GROUP_B_SET = new Set<string>(CONNECTION_AWARE_EXPANSION_GROUP_B);

/**
 * Upper bound on per-target expansion. Bounds pool blowup when a provider has
 * many accounts: a 10-step combo over an 8-connection provider
 * stays at most 80 candidates instead of unbounded growth.
 */
export const DEFAULT_CONNECTION_AWARE_EXPANSION_MAX_PER_TARGET = 8;

export interface ExpandTargetsForAllStrategiesArgs {
  strategy: string;
  targets: ResolvedComboTarget[];
  comboName: string;
  /** Resolved combo config (cascade output) or raw combo config. */
  config: Record<string, unknown> | null | undefined;
  /** Global settings layer; consulted when the combo config layer is unset. */
  settings?: Record<string, unknown> | null | undefined;
  log: ComboLogger;
  /** API-key allowedConnections scope, intersected with the expansion. */
  apiKeyAllowedConnectionIds?: string[] | null;
  /**
   * Test-only injection point replacing the underlying expander, used to
   * exercise the fail-open path deterministically (T10). Production callers
   * leave it unset so the real expander runs.
   */
  __testExpander?: (
    targets: ResolvedComboTarget[],
    comboName: string,
    log: ComboLogger,
    apiKeyAllowedConnectionIds: string[] | null
  ) => Promise<{ expandedTargets: ResolvedComboTarget[] }>;
}

/**
 * Should the connection-aware expansion stage run for this request?
 *
 * true iff the strategy is a group-B strategy AND the resolved config (combo
 * config layer, falling back to the settings layer) enables
 * `connectionAwareExpansion`. Both layers default to false; flipping the
 * switch must never change a combo that did not ask for it.
 */
export function shouldApplyConnectionAwareExpansion(
  strategy: string,
  config: Record<string, unknown> | null | undefined,
  settings?: Record<string, unknown> | null | undefined
): boolean {
  if (!GROUP_B_SET.has(strategy)) return false;
  if (config?.connectionAwareExpansion === true) return true;
  if (config?.connectionAwareExpansion === false) return false;
  return settings?.connectionAwareExpansion === true;
}

function clampMaxPerTarget(value: unknown): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 1) {
    return DEFAULT_CONNECTION_AWARE_EXPANSION_MAX_PER_TARGET;
  }
  return Math.min(Math.floor(numeric), 64);
}

/**
 * Expand group-B targets into per-connection candidates using the A-group
 * expander. Fail-open everywhere: when anything in the expansion path throws,
 * the original targets come back untouched (spec section 3.1; the stage must never
 * take a combo down).
 */
export async function expandTargetsForAllStrategies(
  args: ExpandTargetsForAllStrategiesArgs
): Promise<ResolvedComboTarget[]> {
  const { strategy, targets, comboName, config, settings, log } = args;
  if (targets.length === 0) return targets;
  if (!shouldApplyConnectionAwareExpansion(strategy, config, settings)) return targets;

  const maxPerTarget = clampMaxPerTarget(config?.connectionAwareExpansionMaxPerTarget);

  try {
    const expander =
      args.__testExpander ??
      ((t: ResolvedComboTarget[], name: string, l: ComboLogger, allowed: string[] | null) =>
        expandTargetsByQuotaAwareConnections(t, name, l, allowed));
    const { expandedTargets } = await expander(
      targets,
      comboName,
      log,
      args.apiKeyAllowedConnectionIds ?? null
    );

    // Cap per ORIGINAL target: group entries by stepId and truncate each
    // group to maxPerTarget. (The expander preserves original order within a
    // target, so truncation keeps the first N connections in priority order.)
    const counts = new Map<string, number>();
    const capped: ResolvedComboTarget[] = [];
    for (const target of expandedTargets) {
      const key = target.stepId ?? target.executionKey;
      const seen = counts.get(key) ?? 0;
      if (seen >= maxPerTarget) continue;
      counts.set(key, seen + 1);
      capped.push(target);
    }
    return capped;
  } catch (error) {
    // Fail-open (spec section 3.1): expansion is a best-effort pre-filter, never a
    // hard dependency. Auth-layer gates remain the backstop.
    log.warn?.("COMBO", "Connection-aware expansion failed; passing targets through", {
      comboName,
      strategy,
      err: error,
    });
    return targets;
  }
}
