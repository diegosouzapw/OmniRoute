/**
 * index.ts — Radar client public accessor.
 *
 * Thin entry point for the UI screens.  Returns the merged catalog
 * (baseline + feed overlay) when Radar is active, or the raw baseline
 * when the flag is off / no cache / corrupt cache.
 *
 * This module is the ONLY thing the screens import from `@/lib/radar`.
 * All heavy lifting (sync, verify, schema, merge) lives in sibling files.
 */

import { FREE_MODEL_BUDGETS } from "@omniroute/open-sse/config/freeModelCatalog";
import { RadarFeedSchema, type RadarFeed } from "./feedSchema";
import { applyFeed, type MergedEntry, type FeedModel } from "./applyFeed";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { getRadarCache } from "@/lib/db/radar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RadarCatalogResult {
  /** Merged catalog entries. */
  entries: MergedEntry[];
  /** Feed metadata — null when falling back to baseline. */
  meta: {
    version: string;
    tier: string;
    fetchedAt: string;
  } | null;
}

/** Injectable deps for testing. */
export interface GetRadarCatalogDeps {
  getFlag?: (key: string) => boolean;
  getCache?: () => { version: string; tier: string; payload: string; fetchedAt: string } | null;
  baseline?: MergedEntry[];
  localOverrides?: Map<string, Partial<MergedEntry>>;
  tombstones?: Set<string>;
}

// ---------------------------------------------------------------------------
// Baseline converter
// ---------------------------------------------------------------------------

/**
 * Convert the static `FreeModelBudget[]` into `MergedEntry[]` so the
 * merge function has a uniform input shape.
 */
export function baselineToMergedEntries(
  budgets: typeof FREE_MODEL_BUDGETS,
): MergedEntry[] {
  return budgets.map((b) => ({
    provider: b.provider,
    modelId: b.modelId,
    displayName: b.displayName,
    monthlyTokens: b.monthlyTokens,
    creditTokens: b.creditTokens,
    freeType: b.freeType,
    poolKey: b.poolKey ?? null,
    tos: b.tos,
    trainsOnPrompts: b.trainsOnPrompts,
    enabled: true,
    origin: "baseline" as const,
  }));
}

// ---------------------------------------------------------------------------
// getRadarCatalog
// ---------------------------------------------------------------------------

/**
 * Return the merged Radar catalog.
 *
 * Falls back to the static baseline (no overlay) when:
 *  - The `RADAR_ENABLED` flag is off.
 *  - There is no cached feed yet.
 *  - The cached payload fails defensive re-validation.
 *
 * @param deps - Injectable dependencies for testing.
 */
export function getRadarCatalog(deps: GetRadarCatalogDeps = {}): RadarCatalogResult {
  const {
    getFlag = isFeatureFlagEnabled,
    getCache: getCacheFn = getRadarCache,
    baseline: baselineInput,
    localOverrides = new Map(),
    tombstones = new Set(),
  } = deps;

  // Resolve baseline
  const baseline = baselineInput ?? baselineToMergedEntries(FREE_MODEL_BUDGETS);

  // Flag gate
  const flagOn = getFlag("RADAR_ENABLED");
  if (!flagOn) {
    return { entries: baseline, meta: null };
  }

  // Cache gate
  const cache = getCacheFn();
  if (!cache) {
    return { entries: baseline, meta: null };
  }

  // Defensive parse
  let feed: RadarFeed;
  try {
    const parsed = JSON.parse(cache.payload);
    feed = RadarFeedSchema.parse(parsed);
  } catch {
    return { entries: baseline, meta: null };
  }

  // Apply overlay
  const entries = applyFeed({
    baseline,
    feed: feed.models as FeedModel[],
    localOverrides,
    tombstones,
  });

  return {
    entries,
    meta: {
      version: cache.version,
      tier: cache.tier,
      fetchedAt: cache.fetchedAt,
    },
  };
}

// Re-export merge types for convenience
export { applyFeed, type MergedEntry, type FeedModel } from "./applyFeed";
