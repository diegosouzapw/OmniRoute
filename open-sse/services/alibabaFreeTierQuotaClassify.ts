/**
 * @file alibabaFreeTierQuotaClassify.ts
 * @description Parsing + classification + eligibility-filtering logic for Alibaba Model
 * Studio free-tier quota entries. Extracted from alibabaFreeTierQuotaFetcher.ts (which
 * exceeded the file-size cap) to isolate the pure parsing/classification helpers from
 * the HTTP/console-fetch flow. Behavior is unchanged.
 */

import { getAlibabaBillingMode } from "./alibabaFreeTier.ts";
import {
  getAlibabaBuiltinFreeTierTextCapableModels,
  getAlibabaBuiltinNoFreeTierTextModels,
} from "./alibabaFreeTierAllowlist.ts";
import { toNumberOrNull } from "@/shared/utils/numeric";
import {
  isDashscopeAudioModelId,
  isDashscopeMultimodalModelId,
  isDashscopeTextModelId,
  isDashscopeVisionModelId,
} from "./dashscopeTextModels.ts";
import {
  asRecord,
  getAlibabaFreeTierQuotaLastSyncAt,
  isAlibabaLiveQuotaSyncAt,
  normalizeModelIdList,
  toTrimmedString,
  type AlibabaFreeTierQuotaClassification,
  type AlibabaFreeTierQuotaEntry,
} from "./alibabaFreeTierQuotaTypes.ts";

export function isAlibabaQuotaValidityExpired(
  entry: AlibabaFreeTierQuotaEntry,
  nowMs: number = Date.now()
): boolean {
  if (
    typeof entry.quotaValidityPeriod !== "number" ||
    !Number.isFinite(entry.quotaValidityPeriod)
  ) {
    return false;
  }
  return entry.quotaValidityPeriod < nowMs;
}

function parseQuotaEntry(value: unknown): AlibabaFreeTierQuotaEntry | null {
  const record = asRecord(value);
  const model = toTrimmedString(record.model);
  if (!model) return null;

  return {
    model,
    freeTierOnly: record.freeTierOnly === true,
    quotaStatus: toTrimmedString(record.quotaStatus) || "UNKNOWN",
    quotaTotal: toNumberOrNull(record.quotaTotal) ?? undefined,
    quotaInitTotal: toNumberOrNull(record.quotaInitTotal) ?? undefined,
    quotaTotalPercentage: toNumberOrNull(record.quotaTotalPercentage) ?? undefined,
    quotaValidityPeriod: toNumberOrNull(record.quotaValidityPeriod) ?? undefined,
  };
}

export function parseAlibabaFreeTierQuotaEntries(payload: unknown): AlibabaFreeTierQuotaEntry[] {
  const root = asRecord(payload);
  const dataV2 = asRecord(asRecord(root.data).DataV2 ?? root.DataV2);
  const inner = asRecord(dataV2.data);
  const payloadData = asRecord(inner.data ?? inner);
  const quotas = payloadData.freeTierQuotas;

  if (!Array.isArray(quotas)) return [];
  return quotas
    .map((entry) => parseQuotaEntry(entry))
    .filter((entry): entry is AlibabaFreeTierQuotaEntry => entry !== null);
}

export function classifyAlibabaFreeTierQuotaEntry(
  entry: AlibabaFreeTierQuotaEntry,
  nowMs: number = Date.now()
): "available" | "capable_unknown" | "drained" | "not_capable" {
  if (isAlibabaQuotaValidityExpired(entry, nowMs)) {
    return "not_capable";
  }

  if (!entry.freeTierOnly) {
    return "not_capable";
  }

  if (entry.quotaStatus === "VALID") {
    if (typeof entry.quotaTotal === "number") {
      return entry.quotaTotal > 0 ? "available" : "drained";
    }
    return "capable_unknown";
  }

  if (entry.quotaStatus === "UNKNOWN") {
    return "capable_unknown";
  }

  return "not_capable";
}

export function classifyAlibabaVisionFreeTierQuotaEntry(
  entry: AlibabaFreeTierQuotaEntry,
  nowMs: number = Date.now()
): "available" | "drained" | "not_capable" {
  if (isAlibabaQuotaValidityExpired(entry, nowMs)) {
    return "not_capable";
  }

  if (!isDashscopeVisionModelId(entry.model)) {
    return "not_capable";
  }

  if (entry.quotaStatus === "VALID") {
    if (typeof entry.quotaTotal === "number") {
      return entry.quotaTotal > 0 ? "available" : "drained";
    }
    if (typeof entry.quotaInitTotal === "number") {
      return entry.quotaInitTotal > 0 ? "available" : "drained";
    }
    return "not_capable";
  }

  return "not_capable";
}

export function classifyAlibabaVisionFreeTierQuotaEntries(
  entries: readonly AlibabaFreeTierQuotaEntry[]
): AlibabaFreeTierQuotaClassification {
  return classifyAlibabaFreeTierQuotaEntriesByModelFilter(entries, isDashscopeVisionModelId, {
    useVisionRules: true,
  });
}

function classifyAlibabaFreeTierQuotaEntriesByModelFilter(
  entries: readonly AlibabaFreeTierQuotaEntry[],
  modelFilter: (modelId: string) => boolean,
  options: { useVisionRules?: boolean } = {}
): AlibabaFreeTierQuotaClassification {
  const capableModels: string[] = [];
  const noFreeTierModels: string[] = [];
  const drainedModels: string[] = [];

  for (const entry of entries) {
    if (!modelFilter(entry.model)) continue;

    const verdict = options.useVisionRules
      ? classifyAlibabaVisionFreeTierQuotaEntry(entry)
      : classifyAlibabaFreeTierQuotaEntry(entry);

    switch (verdict) {
      case "available":
        capableModels.push(entry.model);
        break;
      case "capable_unknown":
        capableModels.push(entry.model);
        break;
      case "drained":
        if (options.useVisionRules) {
          drainedModels.push(entry.model);
        } else {
          capableModels.push(entry.model);
          drainedModels.push(entry.model);
        }
        break;
      case "not_capable":
        noFreeTierModels.push(entry.model);
        break;
      default:
        break;
    }
  }

  return {
    capableModels: [...new Set(capableModels)],
    noFreeTierModels: [...new Set(noFreeTierModels)],
    drainedModels: [...new Set(drainedModels)],
    entries: entries.filter((entry) => modelFilter(entry.model)),
  };
}

export function classifyAlibabaMultimodalFreeTierQuotaEntries(
  entries: readonly AlibabaFreeTierQuotaEntry[]
): AlibabaFreeTierQuotaClassification {
  return classifyAlibabaFreeTierQuotaEntriesByModelFilter(entries, isDashscopeMultimodalModelId);
}

export function classifyAlibabaAudioFreeTierQuotaEntries(
  entries: readonly AlibabaFreeTierQuotaEntry[]
): AlibabaFreeTierQuotaClassification {
  return classifyAlibabaFreeTierQuotaEntriesByModelFilter(entries, isDashscopeAudioModelId);
}

export function classifyAlibabaFreeTierQuotaEntries(
  entries: readonly AlibabaFreeTierQuotaEntry[],
  options: { textOnly?: boolean } = {}
): AlibabaFreeTierQuotaClassification {
  const capableModels: string[] = [];
  const noFreeTierModels: string[] = [];
  const drainedModels: string[] = [];

  for (const entry of entries) {
    if (options.textOnly && !isDashscopeTextModelId(entry.model)) continue;

    const verdict = classifyAlibabaFreeTierQuotaEntry(entry);
    switch (verdict) {
      case "available":
      case "capable_unknown":
        capableModels.push(entry.model);
        break;
      case "drained":
        capableModels.push(entry.model);
        drainedModels.push(entry.model);
        break;
      case "not_capable":
        noFreeTierModels.push(entry.model);
        break;
      default:
        break;
    }
  }

  return {
    capableModels: [...new Set(capableModels)],
    noFreeTierModels: [...new Set(noFreeTierModels)],
    drainedModels: [...new Set(drainedModels)],
    entries: [...entries],
  };
}

function unionModelIdLists(lists: readonly (readonly string[])[]): string[] {
  return [...new Set(lists.flat())];
}

/** Eligibility is account-agnostic; only drained/quota exhaustion is per-connection. */
const ALIBABA_SHARED_FREE_TIER_ELIGIBILITY_KEYS = [
  "alibabaFreeTierCapableModels",
  "alibabaNoFreeTierModels",
  "alibabaFreeTierVisionCapableModels",
  "alibabaNoFreeTierVisionModels",
  "alibabaFreeTierMultimodalCapableModels",
  "alibabaNoFreeTierMultimodalModels",
  "alibabaFreeTierAudioCapableModels",
  "alibabaNoFreeTierAudioModels",
  "alibabaFreeTierQuotaEntries",
  "alibabaFreeTierVisionQuotaEntries",
  "alibabaFreeTierMultimodalQuotaEntries",
  "alibabaFreeTierAudioQuotaEntries",
  "alibabaFreeTierQuotaLastSyncAt",
  "alibabaFreeTierDiscoverySource",
] as const;

export function extractAlibabaSharedFreeTierEligibility(
  providerSpecificData: Record<string, unknown>
): Record<string, unknown> {
  const source = asRecord(providerSpecificData);
  const shared: Record<string, unknown> = {};
  for (const key of ALIBABA_SHARED_FREE_TIER_ELIGIBILITY_KEYS) {
    if (source[key] !== undefined) {
      shared[key] = source[key];
    }
  }
  return shared;
}

export function applyAlibabaSharedFreeTierEligibility(
  targetPsd: Record<string, unknown>,
  shared: Record<string, unknown>
): Record<string, unknown> {
  return { ...targetPsd, ...shared };
}

export type AlibabaConnectionLike = {
  id: string;
  providerSpecificData?: Record<string, unknown> | null;
};

export type AlibabaFreeTierEligibilityFields = {
  capableKey: string;
  noFreeTierKey: string;
  drainedKey: string;
};

export function pickCanonicalAlibabaFreeTierConnection(
  connections: readonly AlibabaConnectionLike[],
  fields: AlibabaFreeTierEligibilityFields
): AlibabaConnectionLike | undefined {
  const freeConnections = connections.filter(
    (connection) => getAlibabaBillingMode(connection.providerSpecificData) === "free"
  );
  const synced = freeConnections.filter((connection) =>
    Boolean(getAlibabaFreeTierQuotaLastSyncAt(connection.providerSpecificData))
  );
  if (synced.length === 0) return undefined;

  const withEligibility = synced.filter((connection) => {
    const psd = asRecord(connection.providerSpecificData);
    const capable = normalizeModelIdList(psd[fields.capableKey]);
    const blocked = normalizeModelIdList(psd[fields.noFreeTierKey]);
    return capable.length > 0 || blocked.length > 0;
  });

  const pool = withEligibility.length > 0 ? withEligibility : synced;
  return pool.reduce<AlibabaConnectionLike | undefined>((best, current) => {
    if (!best) return current;
    const bestTime = getAlibabaFreeTierQuotaLastSyncAt(best.providerSpecificData) || "";
    const currentTime = getAlibabaFreeTierQuotaLastSyncAt(current.providerSpecificData) || "";
    return currentTime.localeCompare(bestTime) > 0 ? current : best;
  }, undefined);
}

function resolveAlibabaFreeTierEligibilityLists(
  connections: readonly AlibabaConnectionLike[],
  fields: AlibabaFreeTierEligibilityFields
): { capable: string[]; noFreeTier: string[]; hasQuotaSync: boolean; quotaSyncAt?: string } {
  const freeConnections = connections.filter(
    (connection) => getAlibabaBillingMode(connection.providerSpecificData) === "free"
  );
  const hasQuotaSync = freeConnections.some((connection) =>
    Boolean(getAlibabaFreeTierQuotaLastSyncAt(connection.providerSpecificData))
  );
  const canonical = pickCanonicalAlibabaFreeTierConnection(freeConnections, fields);

  if (canonical) {
    const psd = asRecord(canonical.providerSpecificData);
    return {
      capable: normalizeModelIdList(psd[fields.capableKey]),
      noFreeTier: normalizeModelIdList(psd[fields.noFreeTierKey]),
      hasQuotaSync,
      quotaSyncAt: getAlibabaFreeTierQuotaLastSyncAt(psd) || "provider-canonical",
    };
  }

  return {
    capable: unionModelIdLists(
      freeConnections.map((connection) =>
        normalizeModelIdList(asRecord(connection.providerSpecificData)[fields.capableKey])
      )
    ),
    noFreeTier: unionModelIdLists(
      freeConnections.map((connection) =>
        normalizeModelIdList(asRecord(connection.providerSpecificData)[fields.noFreeTierKey])
      )
    ),
    hasQuotaSync,
  };
}

function buildAlibabaCategoryFilterContext(
  connections: readonly AlibabaConnectionLike[],
  connectionId: string,
  fields: {
    capableKey: string;
    noFreeTierKey: string;
    drainedKey: string;
  }
): Record<string, unknown> {
  const freeConnections = connections.filter(
    (connection) => getAlibabaBillingMode(connection.providerSpecificData) === "free"
  );
  const target = freeConnections.find((connection) => connection.id === connectionId);
  const targetPsd = asRecord(target?.providerSpecificData);
  const eligibility = resolveAlibabaFreeTierEligibilityLists(freeConnections, fields);

  const merged: Record<string, unknown> = {
    alibabaBillingMode: "free",
    [fields.capableKey]: eligibility.capable,
    [fields.noFreeTierKey]: eligibility.noFreeTier,
    [fields.drainedKey]: normalizeModelIdList(targetPsd[fields.drainedKey]),
  };

  if (eligibility.hasQuotaSync) {
    merged.alibabaFreeTierQuotaLastSyncAt =
      eligibility.quotaSyncAt || getAlibabaFreeTierQuotaLastSyncAt(targetPsd) || "provider-merged";
  }

  return merged;
}

export function buildAlibabaFreeVisionFilterContext(
  connections: readonly AlibabaConnectionLike[],
  connectionId: string
): Record<string, unknown> {
  return buildAlibabaCategoryFilterContext(connections, connectionId, {
    capableKey: "alibabaFreeTierVisionCapableModels",
    noFreeTierKey: "alibabaNoFreeTierVisionModels",
    drainedKey: "alibabaFreeTierVisionDrainedModels",
  });
}

export function buildAlibabaFreeMultimodalFilterContext(
  connections: readonly AlibabaConnectionLike[],
  connectionId: string
): Record<string, unknown> {
  return buildAlibabaCategoryFilterContext(connections, connectionId, {
    capableKey: "alibabaFreeTierMultimodalCapableModels",
    noFreeTierKey: "alibabaNoFreeTierMultimodalModels",
    drainedKey: "alibabaFreeTierMultimodalDrainedModels",
  });
}

export function buildAlibabaFreeAudioFilterContext(
  connections: readonly AlibabaConnectionLike[],
  connectionId: string
): Record<string, unknown> {
  return buildAlibabaCategoryFilterContext(connections, connectionId, {
    capableKey: "alibabaFreeTierAudioCapableModels",
    noFreeTierKey: "alibabaNoFreeTierAudioModels",
    drainedKey: "alibabaFreeTierAudioDrainedModels",
  });
}

const ALIBABA_TEXT_ELIGIBILITY_FIELDS: AlibabaFreeTierEligibilityFields = {
  capableKey: "alibabaFreeTierCapableModels",
  noFreeTierKey: "alibabaNoFreeTierModels",
  drainedKey: "alibabaFreeDrainedModels",
};

export function buildAlibabaFreeTierTextFilterContext(
  connections: readonly AlibabaConnectionLike[],
  connectionId: string
): Record<string, unknown> {
  const freeConnections = connections.filter(
    (connection) => getAlibabaBillingMode(connection.providerSpecificData) === "free"
  );
  const target = freeConnections.find((connection) => connection.id === connectionId);
  const targetPsd = asRecord(target?.providerSpecificData);
  const eligibility = resolveAlibabaFreeTierEligibilityLists(
    freeConnections,
    ALIBABA_TEXT_ELIGIBILITY_FIELDS
  );

  const useBuiltinFallback =
    !eligibility.hasQuotaSync || !isAlibabaLiveQuotaSyncAt(eligibility.quotaSyncAt ?? null);

  const merged: Record<string, unknown> = {
    alibabaBillingMode: "free",
    alibabaFreeTierCapableModels: useBuiltinFallback
      ? unionModelIdLists([eligibility.capable, getAlibabaBuiltinFreeTierTextCapableModels()])
      : eligibility.capable,
    alibabaNoFreeTierModels: useBuiltinFallback
      ? unionModelIdLists([eligibility.noFreeTier, getAlibabaBuiltinNoFreeTierTextModels()])
      : eligibility.noFreeTier,
    alibabaFreeDrainedModels: normalizeModelIdList(targetPsd.alibabaFreeDrainedModels),
  };

  const syncAt =
    eligibility.quotaSyncAt ||
    getAlibabaFreeTierQuotaLastSyncAt(targetPsd) ||
    (useBuiltinFallback ? "builtin-allowlist" : null);
  if (syncAt) {
    merged.alibabaFreeTierQuotaLastSyncAt = syncAt;
  }

  return merged;
}

export function getAlibabaFreeTierVisionCapableModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return normalizeModelIdList(asRecord(providerSpecificData).alibabaFreeTierVisionCapableModels);
}

export function getAlibabaFreeTierVisionDrainedModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return normalizeModelIdList(asRecord(providerSpecificData).alibabaFreeTierVisionDrainedModels);
}

export function getAlibabaNoFreeTierVisionModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return normalizeModelIdList(asRecord(providerSpecificData).alibabaNoFreeTierVisionModels);
}

export function isAlibabaFreeTierVisionCapableModel(
  modelId: string,
  providerSpecificData: Record<string, unknown> | null | undefined
): boolean {
  const noFreeTier = new Set(getAlibabaNoFreeTierVisionModels(providerSpecificData));
  if (noFreeTier.has(modelId)) return false;

  const drained = new Set(getAlibabaFreeTierVisionDrainedModels(providerSpecificData));
  if (drained.has(modelId)) return false;

  const capable = new Set(getAlibabaFreeTierVisionCapableModels(providerSpecificData));
  if (capable.has(modelId)) return true;

  if (getAlibabaFreeTierQuotaLastSyncAt(providerSpecificData)) {
    return false;
  }

  return isDashscopeVisionModelId(modelId);
}

export function filterAlibabaFreeVisionEligibleModels(
  modelIds: readonly string[],
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return filterAlibabaFreeCategoryEligibleModels(
    modelIds,
    providerSpecificData,
    isDashscopeVisionModelId,
    getAlibabaFreeTierVisionCapableModels,
    getAlibabaFreeTierVisionDrainedModels,
    getAlibabaNoFreeTierVisionModels
  );
}

function getAlibabaFreeTierMultimodalCapableModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return normalizeModelIdList(
    asRecord(providerSpecificData).alibabaFreeTierMultimodalCapableModels
  );
}

function getAlibabaFreeTierMultimodalDrainedModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return normalizeModelIdList(
    asRecord(providerSpecificData).alibabaFreeTierMultimodalDrainedModels
  );
}

function getAlibabaNoFreeTierMultimodalModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return normalizeModelIdList(asRecord(providerSpecificData).alibabaNoFreeTierMultimodalModels);
}

function getAlibabaFreeTierAudioCapableModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return normalizeModelIdList(asRecord(providerSpecificData).alibabaFreeTierAudioCapableModels);
}

function getAlibabaFreeTierAudioDrainedModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return normalizeModelIdList(asRecord(providerSpecificData).alibabaFreeTierAudioDrainedModels);
}

function getAlibabaNoFreeTierAudioModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return normalizeModelIdList(asRecord(providerSpecificData).alibabaNoFreeTierAudioModels);
}

function filterAlibabaFreeCategoryEligibleModels(
  modelIds: readonly string[],
  providerSpecificData: Record<string, unknown> | null | undefined,
  modelTypeCheck: (modelId: string) => boolean,
  getCapable: (psd: Record<string, unknown> | null | undefined) => string[],
  getDrained: (psd: Record<string, unknown> | null | undefined) => string[],
  getNoFreeTier: (psd: Record<string, unknown> | null | undefined) => string[]
): string[] {
  const drained = new Set(getDrained(providerSpecificData));
  return modelIds.filter((id) => {
    if (!modelTypeCheck(id)) return false;
    if (drained.has(id)) return false;
    return isAlibabaFreeCategoryCapableModel(
      id,
      providerSpecificData,
      modelTypeCheck,
      getCapable,
      getDrained,
      getNoFreeTier
    );
  });
}

function isAlibabaFreeCategoryCapableModel(
  modelId: string,
  providerSpecificData: Record<string, unknown> | null | undefined,
  modelTypeCheck: (modelId: string) => boolean,
  getCapable: (psd: Record<string, unknown> | null | undefined) => string[],
  getDrained: (psd: Record<string, unknown> | null | undefined) => string[],
  getNoFreeTier: (psd: Record<string, unknown> | null | undefined) => string[]
): boolean {
  const noFreeTier = new Set(getNoFreeTier(providerSpecificData));
  if (noFreeTier.has(modelId)) return false;

  const drained = new Set(getDrained(providerSpecificData));
  if (drained.has(modelId)) return false;

  const capable = new Set(getCapable(providerSpecificData));
  if (capable.has(modelId)) return true;

  if (getAlibabaFreeTierQuotaLastSyncAt(providerSpecificData)) {
    return false;
  }

  return modelTypeCheck(modelId);
}

export function isAlibabaFreeTierMultimodalCapableModel(
  modelId: string,
  providerSpecificData: Record<string, unknown> | null | undefined
): boolean {
  return isAlibabaFreeCategoryCapableModel(
    modelId,
    providerSpecificData,
    isDashscopeMultimodalModelId,
    getAlibabaFreeTierMultimodalCapableModels,
    getAlibabaFreeTierMultimodalDrainedModels,
    getAlibabaNoFreeTierMultimodalModels
  );
}

export function isAlibabaFreeTierAudioCapableModel(
  modelId: string,
  providerSpecificData: Record<string, unknown> | null | undefined
): boolean {
  return isAlibabaFreeCategoryCapableModel(
    modelId,
    providerSpecificData,
    isDashscopeAudioModelId,
    getAlibabaFreeTierAudioCapableModels,
    getAlibabaFreeTierAudioDrainedModels,
    getAlibabaNoFreeTierAudioModels
  );
}

export function filterAlibabaFreeMultimodalEligibleModels(
  modelIds: readonly string[],
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return filterAlibabaFreeCategoryEligibleModels(
    modelIds,
    providerSpecificData,
    isDashscopeMultimodalModelId,
    getAlibabaFreeTierMultimodalCapableModels,
    getAlibabaFreeTierMultimodalDrainedModels,
    getAlibabaNoFreeTierMultimodalModels
  );
}

export function filterAlibabaFreeAudioEligibleModels(
  modelIds: readonly string[],
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  return filterAlibabaFreeCategoryEligibleModels(
    modelIds,
    providerSpecificData,
    isDashscopeAudioModelId,
    getAlibabaFreeTierAudioCapableModels,
    getAlibabaFreeTierAudioDrainedModels,
    getAlibabaNoFreeTierAudioModels
  );
}
