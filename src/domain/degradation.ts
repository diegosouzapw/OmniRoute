/**
 * Graceful Degradation Framework
 *
 * Provides a standardized pattern for services that depend on external
 * systems (Redis, vector databases, SSH, external APIs) to degrade
 * capability instead of failing completely.
 *
 * Hierarchy: Full → Reduced → Minimal → Safe Default
 *
 * Each service wraps its external calls with withDegradation(), which
 * tries the primary path, falls back to a secondary, and ultimately
 * returns a safe default if all backends are unavailable.
 */

/** Degradation levels from best to worst */
export type DegradationLevel = "full" | "reduced" | "minimal" | "default";

/** Status report for a degraded service */
export interface DegradationStatus {
  /** Current operational level */
  level: DegradationLevel;
  /** Name of the feature/service */
  feature: string;
  /** Human-readable description of current capability */
  capability: string;
  /** Why the service is degraded (empty string if full) */
  reason: string;
  /** Timestamp of last status change */
  since: string;
}

/** Result wrapper that includes degradation info */
export interface DegradedResult<T> {
  /** The actual result (from primary, fallback, or default) */
  result: T;
  /** Degradation status */
  status: DegradationStatus;
}

// ── Global degradation registry ─────────────────────────────────────────────

const registry = new Map<string, DegradationStatus>();

/**
 * Execute an operation with graceful degradation.
 *
 * Tries the primary function first. If it fails, tries the fallback.
 * If both fail, returns the safe default. All transitions are tracked
 * in the global registry for dashboard visibility.
 *
 * @param feature - Name of the feature (e.g., "rate-limiting", "semantic-search")
 * @param primary - Primary implementation (full capability)
 * @param fallback - Fallback implementation (reduced capability)
 * @param safeDefault - Safe default value (minimal/no capability)
 * @param options - Optional configuration
 * @returns Result with degradation status
 *
 * @example
 * ```typescript
 * const { result, status } = await withDegradation(
 *   'rate-limiting',
 *   () => redisRateLimit(key, limit),       // Full: distributed
 *   () => memoryRateLimit(key, limit),       // Reduced: single-instance
 *   { allowed: true, remaining: Infinity },  // Default: permissive
 * );
 * ```
 */
export async function withDegradation<T>(
  feature: string,
  primary: () => T | Promise<T>,
  fallback: () => T | Promise<T>,
  safeDefault: T,
  options?: {
    /** Description of full capability */
    fullCapability?: string;
    /** Description of reduced capability */
    reducedCapability?: string;
    /** Description of default capability */
    defaultCapability?: string;
    /** Log function for degradation events */
    onDegrade?: (status: DegradationStatus) => void;
  }
): Promise<DegradedResult<T>> {
  const now = new Date().toISOString();

  // Try primary
  try {
    const result = await primary();
    const status: DegradationStatus = {
      level: "full",
      feature,
      capability: options?.fullCapability ?? "Full capability",
      reason: "",
      since: now,
    };
    updateRegistry(feature, status);
    return { result, status };
  } catch (primaryError) {
    // Primary failed, try fallback
    try {
      const result = await fallback();
      const status: DegradationStatus = {
        level: "reduced",
        feature,
        capability: options?.reducedCapability ?? "Reduced capability (fallback active)",
        reason: primaryError instanceof Error ? primaryError.message : String(primaryError),
        since: now,
      };
      updateRegistry(feature, status);
      options?.onDegrade?.(status);
      return { result, status };
    } catch (fallbackError) {
      // Both failed, return safe default
      const reason = [
        primaryError instanceof Error ? primaryError.message : String(primaryError),
        fallbackError instanceof Error ? fallbackError.message : String(fallbackError),
      ].join(" → ");

      const status: DegradationStatus = {
        level: "default",
        feature,
        capability: options?.defaultCapability ?? "Safe default (all backends unavailable)",
        reason,
        since: now,
      };
      updateRegistry(feature, status);
      options?.onDegrade?.(status);
      return { result: safeDefault, status };
    }
  }
}

/**
 * Synchronous version for non-async code paths.
 */
export function withDegradationSync<T>(
  feature: string,
  primary: () => T,
  fallback: () => T,
  safeDefault: T,
  options?: {
    fullCapability?: string;
    reducedCapability?: string;
    defaultCapability?: string;
    onDegrade?: (status: DegradationStatus) => void;
  }
): DegradedResult<T> {
  const now = new Date().toISOString();

  try {
    const result = primary();
    const status: DegradationStatus = {
      level: "full",
      feature,
      capability: options?.fullCapability ?? "Full capability",
      reason: "",
      since: now,
    };
    updateRegistry(feature, status);
    return { result, status };
  } catch (primaryError) {
    try {
      const result = fallback();
      const status: DegradationStatus = {
        level: "reduced",
        feature,
        capability: options?.reducedCapability ?? "Reduced capability",
        reason: primaryError instanceof Error ? primaryError.message : String(primaryError),
        since: now,
      };
      updateRegistry(feature, status);
      options?.onDegrade?.(status);
      return { result, status };
    } catch (fallbackError) {
      const status: DegradationStatus = {
        level: "default",
        feature,
        capability: options?.defaultCapability ?? "Safe default",
        reason: `${primaryError} → ${fallbackError}`,
        since: now,
      };
      updateRegistry(feature, status);
      options?.onDegrade?.(status);
      return { result: safeDefault, status };
    }
  }
}

// ── Registry management ─────────────────────────────────────────────────────

function updateRegistry(feature: string, status: DegradationStatus): void {
  const existing = registry.get(feature);
  // Only update 'since' if level actually changed
  if (existing && existing.level === status.level) {
    status.since = existing.since;
  }
  registry.set(feature, status);
}

/**
 * Get degradation status for all tracked features.
 */
export function getDegradationReport(): DegradationStatus[] {
  return Array.from(registry.values()).sort((a, b) => {
    const order: Record<DegradationLevel, number> = {
      default: 0,
      minimal: 1,
      reduced: 2,
      full: 3,
    };
    return (order[a.level] ?? 4) - (order[b.level] ?? 4);
  });
}

/**
 * Get status for a specific feature.
 */
export function getFeatureStatus(feature: string): DegradationStatus | null {
  return registry.get(feature) ?? null;
}

/**
 * Check if any feature is degraded.
 */
export function hasAnyDegradation(): boolean {
  for (const status of registry.values()) {
    if (status.level !== "full") return true;
  }
  return false;
}

/**
 * Get count of features at each degradation level.
 */
export function getDegradationSummary(): Record<DegradationLevel, number> {
  const summary: Record<DegradationLevel, number> = {
    full: 0,
    reduced: 0,
    minimal: 0,
    default: 0,
  };
  for (const status of registry.values()) {
    summary[status.level]++;
  }
  return summary;
}

/**
 * Reset the registry. Useful for testing.
 */
export function resetDegradationRegistry(): void {
  registry.clear();
}
