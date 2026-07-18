/**
 * Context requirements filtering for combo targets.
 * Applies minContextWindow, preferLargeContext, and contextFilterMode
 * from combo config to filter and sort targets by context window size.
 */

import { getModelContextLimit } from "../../../src/lib/modelCapabilities";
import type { ComboLogger, ResolvedComboTarget } from "./types.ts";

export interface ContextRequirements {
  minContextWindow?: number;
  preferLargeContext?: boolean;
  contextFilterMode?: "strict" | "lenient";
}

/**
 * Get context window size for a target model.
 * Returns null if unknown.
 */
function getTargetContextWindow(target: ResolvedComboTarget): number | null {
  const limit = getModelContextLimit(target.provider, target.modelStr);
  return typeof limit === "number" && limit > 0 ? limit : null;
}

/**
 * Apply context requirements filtering and sorting to combo targets.
 *
 * Filtering logic:
 * - If minContextWindow is set, filters out models below that threshold
 * - contextFilterMode determines handling of unknown context limits:
 *   - "strict": excludes models with unknown context limits
 *   - "lenient": includes models with unknown context limits
 *
 * Sorting logic:
 * - If preferLargeContext is true, sorts remaining targets by context size (descending)
 * - Unknown context limits sort to the end
 *
 * @param targets - Array of resolved combo targets
 * @param requirements - Context requirements from combo config
 * @param log - Combo logger for debug output
 * @returns Filtered and sorted targets array
 */
export function applyContextRequirements(
  targets: ResolvedComboTarget[],
  requirements: ContextRequirements | undefined,
  log: ComboLogger
): ResolvedComboTarget[] {
  if (!requirements || targets.length === 0) return targets;

  const { minContextWindow, preferLargeContext, contextFilterMode = "lenient" } = requirements;

  // No requirements specified
  if (!minContextWindow && !preferLargeContext) return targets;

  let filtered = targets;

  // Apply minContextWindow filtering
  if (minContextWindow && minContextWindow > 0) {
    const beforeFilterCount = filtered.length;

    filtered = filtered.filter((target) => {
      const contextWindow = getTargetContextWindow(target);

      // Unknown context limit handling
      if (contextWindow === null) {
        return contextFilterMode === "lenient";
      }

      // Known context limit - check threshold
      return contextWindow >= minContextWindow;
    });

    if (filtered.length < beforeFilterCount) {
      log.info(
        "COMBO",
        `Context requirements: filtered ${beforeFilterCount} → ${filtered.length} targets (minContextWindow: ${minContextWindow}, mode: ${contextFilterMode})`
      );
      log.debug?.(
        "COMBO",
        `Context requirements: kept models ${filtered.map((t) => t.modelStr).join(", ")}`
      );
    }
  }

  // Apply preferLargeContext sorting
  if (preferLargeContext && filtered.length > 1) {
    filtered = [...filtered].sort((a, b) => {
      const aContext = getTargetContextWindow(a) ?? 0;
      const bContext = getTargetContextWindow(b) ?? 0;
      return bContext - aContext; // Descending order
    });

    log.debug?.(
      "COMBO",
      `Context requirements: sorted by context size (descending): ${filtered
        .map((t) => {
          const ctx = getTargetContextWindow(t);
          return `${t.modelStr}(${ctx === null ? "unknown" : ctx})`;
        })
        .join(", ")}`
    );
  }

  return filtered;
}
