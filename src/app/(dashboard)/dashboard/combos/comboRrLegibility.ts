/**
 * Display-side cascade for combo round-robin sticky limit.
 * Same order as resolveComboStickyRoundRobinLimit in
 * open-sse/services/combo/rrState.ts: combo override, then
 * comboStickyRoundRobinLimit, then stickyRoundRobinLimit.
 * Kept here so the combo editor does not import the SSE expander graph.
 */

const CONNECTION_AWARE_EXPANSION_GROUP_B = new Set([
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
]);

export type StickyLimitSource = "combo" | "combo-defaults" | "global";

export type StickyLimitDescription = {
  value: number;
  source: StickyLimitSource;
};

export type ExpansionTriState = "inherit" | "on" | "off";

function isPresentLimit(value: unknown): boolean {
  return value !== undefined && value !== null && value !== "";
}

function clampStickyRoundRobinTargetLimit(value: unknown, fallback: number): number {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return fallback;
  return Math.min(Math.max(Math.floor(numericValue), 1), 1000);
}

export function describeStickyRoundRobinLimit(
  perComboLimit: unknown,
  settings: Record<string, unknown> | null | undefined
): StickyLimitDescription {
  if (isPresentLimit(perComboLimit)) {
    return { value: clampStickyRoundRobinTargetLimit(perComboLimit, 1), source: "combo" };
  }
  const comboSticky = settings?.comboStickyRoundRobinLimit;
  if (isPresentLimit(comboSticky)) {
    return { value: clampStickyRoundRobinTargetLimit(comboSticky, 1), source: "combo-defaults" };
  }
  const globalSticky = settings?.stickyRoundRobinLimit;
  return {
    value: isPresentLimit(globalSticky)
      ? clampStickyRoundRobinTargetLimit(globalSticky, 3)
      : 3,
    source: "global",
  };
}

export function stickyLimitInputValue(perComboLimit: unknown): string {
  if (!isPresentLimit(perComboLimit)) return "";
  return String(clampStickyRoundRobinTargetLimit(perComboLimit, 1));
}

export function parseStickyLimitInput(raw: string): number | undefined {
  if (!raw) return undefined;
  const numericValue = Number(raw);
  if (!Number.isFinite(numericValue)) return undefined;
  return clampStickyRoundRobinTargetLimit(numericValue, 1);
}

export function persistStickyRoundRobinLimit(
  strategy: string,
  configToSave: Record<string, unknown>,
  sourceConfig: Record<string, unknown> = configToSave
): void {
  // Leave leftovers on other strategies. sanitizeComboRuntimeConfig already
  // keeps keys it did not touch; deleting here would drop a value the operator
  // set while the combo was on round-robin, then lose it on the next save.
  if (strategy !== "round-robin") {
    return;
  }
  if (!isPresentLimit(sourceConfig.stickyRoundRobinLimit)) {
    delete configToSave.stickyRoundRobinLimit;
    return;
  }
  configToSave.stickyRoundRobinLimit = clampStickyRoundRobinTargetLimit(
    sourceConfig.stickyRoundRobinLimit,
    1
  );
}

export function isConnectionAwareExpansionStrategy(strategy: string): boolean {
  return CONNECTION_AWARE_EXPANSION_GROUP_B.has(strategy);
}

export function shouldShowPromptCacheAffinityHint(
  strategy: string,
  pinnedAccountCount: number
): boolean {
  return (strategy === "round-robin" || strategy === "weighted") && pinnedAccountCount >= 2;
}

export function triStateFromOptionalBoolean(value: unknown): ExpansionTriState {
  if (value === true) return "on";
  if (value === false) return "off";
  return "inherit";
}

export function optionalBooleanFromTriState(value: string): boolean | undefined {
  if (value === "on") return true;
  if (value === "off") return false;
  return undefined;
}

export function persistConnectionAwareExpansion(
  strategy: string,
  configToSave: Record<string, unknown>,
  sourceConfig: Record<string, unknown> = configToSave
): void {
  // Same as stickyRoundRobinLimit: do not strip a leftover when the current
  // strategy has no editor for this key. connectionAwareExpansionMaxPerTarget
  // is already left alone; keep the boolean in the same shape.
  if (!isConnectionAwareExpansionStrategy(strategy)) {
    return;
  }
  if (sourceConfig.connectionAwareExpansion === true) {
    configToSave.connectionAwareExpansion = true;
    return;
  }
  if (sourceConfig.connectionAwareExpansion === false) {
    configToSave.connectionAwareExpansion = false;
    return;
  }
  delete configToSave.connectionAwareExpansion;
}
