/**
 * Synced-model catalog `capabilities` builder (#7694).
 *
 * Extracted from catalog.ts (frozen file-size baseline — `config/quality/file-size-baseline.json`)
 * to keep the vision (#4264) and reasoning-effort-tier (#7694) flags merged into a SINGLE
 * `capabilities` object rather than two separate spreads that would silently overwrite one
 * another via object-spread order. A model can be both vision- and reasoning-capable.
 */

interface SyncedCapabilityFlags {
  supportsVision?: boolean;
  supportedThinkingEfforts?: string[];
}

function hasEffortTiers(sm: SyncedCapabilityFlags): boolean {
  return Array.isArray(sm.supportedThinkingEfforts) && sm.supportedThinkingEfforts.length > 0;
}

/** Build the `capabilities` object for a fresh synced-model catalog entry, or `undefined` when neither flag applies. */
export function buildSyncedCapabilities(
  sm: SyncedCapabilityFlags
): Record<string, boolean | string[]> | undefined {
  const effortTiers = hasEffortTiers(sm);
  if (!sm.supportsVision && !effortTiers) return undefined;
  return {
    ...(sm.supportsVision ? { vision: true } : {}),
    ...(effortTiers ? { effort_tiers: sm.supportedThinkingEfforts! } : {}),
  };
}

/**
 * Merge (not clobber) capabilities onto an already-catalogued entry so syncing a
 * vision/effort-tier flag onto a registry/combo model that already declares other
 * capabilities keeps both. Returns `undefined` when there is nothing to merge.
 */
export function mergeSyncedCapabilities(
  existing: Record<string, unknown> | undefined,
  sm: SyncedCapabilityFlags
): Record<string, unknown> | undefined {
  const effortTiers = hasEffortTiers(sm);
  if (!sm.supportsVision && !effortTiers && !existing) return undefined;
  return {
    ...(existing || {}),
    ...(sm.supportsVision ? { vision: true } : {}),
    ...(effortTiers ? { effort_tiers: sm.supportedThinkingEfforts! } : {}),
  };
}
