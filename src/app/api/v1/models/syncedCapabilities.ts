/**
 * Synced-model catalog `capabilities` builder (#7694).
 *
 * Extracted from catalog.ts (frozen file-size baseline — `config/quality/file-size-baseline.json`)
 * to keep the vision (#4264) and reasoning-effort-tier (#7694) flags merged into a SINGLE
 * `capabilities` object rather than two separate spreads that would silently overwrite one
 * another via object-spread order. A model can be both vision- and reasoning-capable.
 *
 * effort_tiers loop (2026-08-23): a runtime-learned accepted set (#11232,
 * learnedReasoningEffortCaps) REPLACES the synced `supportedThinkingEfforts`
 * when one exists — the proven contract beats the advertised one. Lookup is
 * model-scoped: executors record under connection ids while this module sees
 * provider ids, so an exact provider:model key would always miss.
 *
 * Kimi and GLM keep their existing suffix mechanisms. Kimi K3 base models
 * may expose their native tiers without generating synthetic suffix entries.
 * Codex discovery advertises wire efforts from upstream metadata; generated
 * variants drop effort_tiers to prevent clients from appending a second suffix.
 */
// Use the same canonical alias as catalogModelPolicy.ts (l.1) — a relative path from
// src/app/api/v1/models/ to open-sse/ would need 5 `../` and silently breaks under
// refactors. (Confirmed convention: grep "from \"@omniroute/open-sse" src/app/api/v1/models/)
import { getCodexWireEfforts } from "@/shared/reasoning/codexEfforts";
import { getLearnedReasoningEffortForModel } from "@omniroute/open-sse/services/learnedReasoningEffortCaps.ts";
import { isSkippedEffortProvider } from "@omniroute/open-sse/utils/syncedEffortVariants.ts";
import {
  getRegistryModelThinkingEfforts,
  getRegistryThinkingEfforts,
} from "@omniroute/open-sse/config/providerRegistry.ts";

interface SyncedCapabilityFlags {
  id?: string;
  supportsThinking?: boolean;
  supportsVision?: boolean;
  supportedThinkingEfforts?: string[];
}

// Model-id pattern for the Kimi K3 family (#12299): the kmca catalog syncs
// `k3`/`k3-256k` (and prefixed forms such as `kmca/k3`). Same shape the
// executor/translator layers use to recognize K3 elsewhere
// (reasoningContentInjector.ts::K3_AUTHENTIC_REASONING_PATTERN).
const KIMI_K3_MODEL_ID_PATTERN = /(?:^|\/)(?:kimi-)?k3(?:$|-)/i;

/**
 * #12299: only Kimi K3's synced BASE entries are exempt from the
 * `isSkippedEffortProvider` exclusion. Model-scoped, never provider-wide —
 * the exemption requires a kimi-owned provider AND a K3 model id, so GLM
 * and non-K3 kimi models keep the exclusion contract from #7694.
 */
function isExemptKimiK3BaseModel(sm: SyncedCapabilityFlags, ownedBy: string): boolean {
  return (
    ownedBy.startsWith("kimi") && typeof sm.id === "string" && KIMI_K3_MODEL_ID_PATTERN.test(sm.id)
  );
}

function effectiveEffortTiers(sm: SyncedCapabilityFlags, ownedBy: string): string[] | undefined {
  // Preserve the dedicated Kimi/GLM suffix policies.
  if (isSkippedEffortProvider(ownedBy) && !isExemptKimiK3BaseModel(sm, ownedBy)) return undefined;
  if (ownedBy === "codex") {
    const efforts = getCodexWireEfforts(sm.supportedThinkingEfforts || []);
    return efforts.length > 0 ? efforts : undefined;
  }
  const learned = sm.id ? getLearnedReasoningEffortForModel(sm.id) : null;
  const synced =
    Array.isArray(sm.supportedThinkingEfforts) && sm.supportedThinkingEfforts.length > 0
      ? sm.supportedThinkingEfforts
      : null;
  const explicit = sm.id ? getRegistryModelThinkingEfforts(ownedBy, sm.id) : undefined;
  if (explicit) {
    const observed = learned ? [...learned] : synced;
    const narrowed = observed
      ? explicit.filter((effort) => observed.includes(effort))
      : [...explicit];
    return narrowed.length > 0 ? narrowed : undefined;
  }
  if (learned) return [...learned];
  if (synced) return synced;
  if (!sm.supportsThinking || !sm.id) return undefined;
  const registryEfforts = getRegistryThinkingEfforts(ownedBy, sm.id);
  return registryEfforts && registryEfforts.length > 0 ? [...registryEfforts] : undefined;
}

/** Build the `capabilities` object for a fresh synced-model catalog entry, or `undefined` when neither flag applies. */
export function buildSyncedCapabilities(
  sm: SyncedCapabilityFlags,
  ownedBy: string
): Record<string, boolean | string[]> | undefined {
  const tiers = effectiveEffortTiers(sm, ownedBy);
  if (!sm.supportsVision && !tiers) return undefined;
  return {
    ...(sm.supportsVision ? { vision: true } : {}),
    ...(tiers ? { effort_tiers: tiers } : {}),
  };
}

/**
 * Merge (not clobber) capabilities onto an already-catalogued entry so syncing a
 * vision/effort-tier flag onto a registry/combo model that already declares other
 * capabilities keeps both. Returns `undefined` when there is nothing to merge.
 */
export function mergeSyncedCapabilities(
  existing: Record<string, unknown> | undefined,
  sm: SyncedCapabilityFlags,
  ownedBy: string
): Record<string, unknown> | undefined {
  const tiers = effectiveEffortTiers(sm, ownedBy);
  if (!sm.supportsVision && !tiers && !existing) return undefined;
  return {
    ...(existing || {}),
    ...(sm.supportsVision ? { vision: true } : {}),
    ...(tiers ? { effort_tiers: tiers } : {}),
  };
}
