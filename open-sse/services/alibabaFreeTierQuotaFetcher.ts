/**
 * @file alibabaFreeTierQuotaFetcher.ts
 * @description Fetch Alibaba Model Studio free-tier quota from the Bailian console API.
 *
 * DashScope inference keys cannot list free-tier eligibility. The console exposes
 * `zeldaEasy.bailian-commerce.freeTrial.queryFreeTierQuotaAsyn` with per-model
 * `freeTierOnly`, `quotaStatus`, and `quotaTotal` fields.
 *
 * Auth: browser session cookie (`login_aliyunid_ticket` or full Cookie header) stored
 * on the connection as `providerSpecificData.alibabaConsoleCookie`.
 *
 * @changes
 * - [2026-07-25] [Composer] - Merge built-in text free-tier allowlist into filter context
 * - [2026-07-25] [Composer] - Propagate shared free-tier eligibility across all Alibaba free connections
 * - [2026-07-25] [Composer] - Add multimodal and audio free-quota classification and console fetch paths
 * - [2026-07-25] [Composer] - Add vision/media free-quota classification for alibabafreevision
 * - [2026-07-25] [Composer] - Add console free-tier quota fetcher for Alibaba Model Studio
 * - [2026-07-25] [Composer] - Use shared toNumberOrNull instead of local coercion helper
 */

import { getAlibabaBillingMode, isAlibabaModelStudioProvider } from "./alibabaFreeTier.ts";
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

const FREE_TIER_QUOTA_API = "zeldaEasy.bailian-commerce.freeTrial.queryFreeTierQuotaAsyn";
const FREE_TIER_QUOTA_START_API = "zeldaEasy.bailian-commerce.freeTrial.queryFreeTierQuota";
const DEFAULT_TEXT_FE_PATH = "/costing-balance/free-quota";
const DEFAULT_VISION_FE_PATH =
  process.env.ALIBABA_FREE_TIER_VISION_FE_PATH?.trim() || "/costing-balance/free-quota-image-video";
const DEFAULT_MULTIMODAL_FE_PATH =
  process.env.ALIBABA_FREE_TIER_MULTIMODAL_FE_PATH?.trim() ||
  "/costing-balance/free-quota-multimodal";
const DEFAULT_AUDIO_FE_PATH =
  process.env.ALIBABA_FREE_TIER_AUDIO_FE_PATH?.trim() || "/costing-balance/free-quota-audio";

const CONSOLE_GATEWAYS = {
  "global-sg": {
    host: "https://bailian-singapore-cs.alibabacloud.com",
    region: "ap-southeast-1",
    action: "IntlBroadScopeAspnGateway",
    product: "sfm_bailian",
  },
  "china-beijing": {
    host: "https://bailian.console.aliyun.com",
    region: "cn-beijing",
    action: "BroadScopeAspnGateway",
    product: "sfm_bailian",
  },
} as const;

export type AlibabaFreeTierQuotaEntry = {
  model: string;
  freeTierOnly: boolean;
  quotaStatus: string;
  quotaTotal?: number;
  quotaInitTotal?: number;
  quotaTotalPercentage?: number;
  quotaValidityPeriod?: number;
};

export type AlibabaFreeTierQuotaClassification = {
  capableModels: string[];
  noFreeTierModels: string[];
  drainedModels: string[];
  entries: AlibabaFreeTierQuotaEntry[];
};

export type AlibabaFreeTierQuotaSnapshot = {
  text: AlibabaFreeTierQuotaClassification;
  vision: AlibabaFreeTierQuotaClassification;
  multimodal: AlibabaFreeTierQuotaClassification;
  audio: AlibabaFreeTierQuotaClassification;
  entries: AlibabaFreeTierQuotaEntry[];
};

type AlibabaProviderRegion = keyof typeof CONSOLE_GATEWAYS;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function toTrimmedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function resolveAlibabaConsoleRegion(
  providerSpecificData: Record<string, unknown> | null | undefined
): AlibabaProviderRegion {
  const region = toTrimmedString(asRecord(providerSpecificData).region);
  return region === "china-beijing" ? "china-beijing" : "global-sg";
}

export function normalizeAlibabaConsoleCookie(raw: unknown): string | null {
  const value = toTrimmedString(raw);
  if (!value) return null;

  if (/login_aliyunid_ticket=/i.test(value) || value.includes(";")) {
    return value;
  }

  return `login_aliyunid_ticket=${value}`;
}

export function getAlibabaConsoleCookie(
  providerSpecificData: Record<string, unknown> | null | undefined
): string | null {
  const psd = asRecord(providerSpecificData);
  return (
    normalizeAlibabaConsoleCookie(psd.alibabaConsoleCookie) ||
    normalizeAlibabaConsoleCookie(psd.cookie) ||
    null
  );
}

export function getAlibabaConsoleSecToken(
  providerSpecificData: Record<string, unknown> | null | undefined
): string | null {
  return toTrimmedString(asRecord(providerSpecificData).alibabaConsoleSecToken);
}

export function hasAlibabaConsoleFreeTierAuth(
  providerSpecificData: Record<string, unknown> | null | undefined
): boolean {
  return getAlibabaConsoleCookie(providerSpecificData) !== null;
}

export function getAlibabaFreeTierQuotaLastSyncAt(
  providerSpecificData: Record<string, unknown> | null | undefined
): string | null {
  return toTrimmedString(asRecord(providerSpecificData).alibabaFreeTierQuotaLastSyncAt);
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
  const dataV2 = asRecord(root.data?.DataV2 ?? root.DataV2);
  const inner = asRecord(dataV2.data);
  const payloadData = asRecord(inner.data ?? inner);
  const quotas = payloadData.freeTierQuotas;

  if (!Array.isArray(quotas)) return [];
  return quotas
    .map((entry) => parseQuotaEntry(entry))
    .filter((entry): entry is AlibabaFreeTierQuotaEntry => entry !== null);
}

export function classifyAlibabaFreeTierQuotaEntry(
  entry: AlibabaFreeTierQuotaEntry
): "available" | "capable_unknown" | "drained" | "not_capable" {
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
  entry: AlibabaFreeTierQuotaEntry
): "available" | "drained" | "not_capable" {
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

export function mergeAlibabaFreeTierQuotaClassification(
  providerSpecificData: Record<string, unknown> | null | undefined,
  snapshot: AlibabaFreeTierQuotaSnapshot
): Record<string, unknown> {
  const base = asRecord(providerSpecificData);

  const coalesceList = (snapshotList: readonly string[], existingKey: string): string[] =>
    snapshotList.length > 0 ? [...snapshotList] : normalizeModelIdList(base[existingKey]);

  return {
    ...base,
    alibabaFreeTierCapableModels: coalesceList(
      snapshot.text.capableModels,
      "alibabaFreeTierCapableModels"
    ),
    alibabaNoFreeTierModels: coalesceList(
      snapshot.text.noFreeTierModels,
      "alibabaNoFreeTierModels"
    ),
    alibabaFreeDrainedModels: coalesceList(snapshot.text.drainedModels, "alibabaFreeDrainedModels"),
    alibabaFreeTierVisionCapableModels: coalesceList(
      snapshot.vision.capableModels,
      "alibabaFreeTierVisionCapableModels"
    ),
    alibabaNoFreeTierVisionModels: coalesceList(
      snapshot.vision.noFreeTierModels,
      "alibabaNoFreeTierVisionModels"
    ),
    alibabaFreeTierVisionDrainedModels: coalesceList(
      snapshot.vision.drainedModels,
      "alibabaFreeTierVisionDrainedModels"
    ),
    alibabaFreeTierMultimodalCapableModels: coalesceList(
      snapshot.multimodal.capableModels,
      "alibabaFreeTierMultimodalCapableModels"
    ),
    alibabaNoFreeTierMultimodalModels: coalesceList(
      snapshot.multimodal.noFreeTierModels,
      "alibabaNoFreeTierMultimodalModels"
    ),
    alibabaFreeTierMultimodalDrainedModels: coalesceList(
      snapshot.multimodal.drainedModels,
      "alibabaFreeTierMultimodalDrainedModels"
    ),
    alibabaFreeTierAudioCapableModels: coalesceList(
      snapshot.audio.capableModels,
      "alibabaFreeTierAudioCapableModels"
    ),
    alibabaNoFreeTierAudioModels: coalesceList(
      snapshot.audio.noFreeTierModels,
      "alibabaNoFreeTierAudioModels"
    ),
    alibabaFreeTierAudioDrainedModels: coalesceList(
      snapshot.audio.drainedModels,
      "alibabaFreeTierAudioDrainedModels"
    ),
    alibabaFreeTierQuotaEntries: snapshot.entries,
    alibabaFreeTierVisionQuotaEntries: snapshot.vision.entries,
    alibabaFreeTierMultimodalQuotaEntries: snapshot.multimodal.entries,
    alibabaFreeTierAudioQuotaEntries: snapshot.audio.entries,
    alibabaFreeTierQuotaLastSyncAt: new Date().toISOString(),
    alibabaFreeTierDiscoverySource: "console-quota-api",
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

export async function propagateAlibabaFreeTierEligibilityToSiblings(
  provider: string,
  sourceConnectionId: string,
  mergedPsd: Record<string, unknown>
): Promise<void> {
  const shared = extractAlibabaSharedFreeTierEligibility(mergedPsd);
  if (!shared.alibabaFreeTierQuotaLastSyncAt) return;

  const { getProviderConnections, updateProviderConnection } =
    await import("../../src/lib/db/providers.ts");
  const connections = await getProviderConnections({ provider });

  for (const connection of connections) {
    if (connection.id === sourceConnectionId) continue;
    if (getAlibabaBillingMode(connection.providerSpecificData) !== "free") continue;

    const updated = applyAlibabaSharedFreeTierEligibility(
      asRecord(connection.providerSpecificData),
      shared
    );
    await updateProviderConnection(connection.id, { providerSpecificData: updated });
  }
}

type AlibabaConnectionLike = {
  id: string;
  providerSpecificData?: Record<string, unknown> | null;
};

type AlibabaFreeTierEligibilityFields = {
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

  const merged: Record<string, unknown> = {
    alibabaBillingMode: "free",
    alibabaFreeTierCapableModels: unionModelIdLists([
      eligibility.capable,
      getAlibabaBuiltinFreeTierTextCapableModels(),
    ]),
    alibabaNoFreeTierModels: unionModelIdLists([
      eligibility.noFreeTier,
      getAlibabaBuiltinNoFreeTierTextModels(),
    ]),
    alibabaFreeDrainedModels: normalizeModelIdList(targetPsd.alibabaFreeDrainedModels),
  };

  if (eligibility.hasQuotaSync || getAlibabaBuiltinFreeTierTextCapableModels().length > 0) {
    merged.alibabaFreeTierQuotaLastSyncAt =
      eligibility.quotaSyncAt ||
      getAlibabaFreeTierQuotaLastSyncAt(targetPsd) ||
      "builtin-allowlist";
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

function normalizeModelIdList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
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

function buildGatewayUrl(region: AlibabaProviderRegion, api: string): string {
  const gateway = CONSOLE_GATEWAYS[region];
  const params = new URLSearchParams({
    action: gateway.action,
    product: gateway.product,
    api,
    _v: "undefined",
  });
  return `${gateway.host}/data/api.json?${params.toString()}`;
}

function buildCornerstoneParam(
  region: AlibabaProviderRegion,
  fePath: string = DEFAULT_TEXT_FE_PATH
): Record<string, unknown> {
  const gateway = CONSOLE_GATEWAYS[region];
  const normalizedPath = fePath.startsWith("/") ? fePath : `/${fePath}`;
  return {
    feTraceId: crypto.randomUUID(),
    feURL: `https://modelstudio.console.alibabacloud.com/${gateway.region}?tab=costing-balance#${normalizedPath}`,
    protocol: "V2",
    console: "ONE_CONSOLE",
    productCode: "p_efm",
    switchAgent: 416572,
    switchUserType: 3,
    domain: "modelstudio.console.alibabacloud.com",
    consoleSite: "MODELSTUDIO_ALBABACLOUD",
    userNickName: "",
    userPrincipalName: "",
    xsp_lang: "en-US",
  };
}

function buildRequestBody(
  region: AlibabaProviderRegion,
  api: string,
  taskId?: string | null,
  fePath: string = DEFAULT_TEXT_FE_PATH
): URLSearchParams {
  const gateway = CONSOLE_GATEWAYS[region];
  const request: Record<string, unknown> = {};
  if (taskId) {
    request.queryFreeTierQuotaRequest = { taskId };
  } else {
    request.queryFreeTierQuotaRequest = {};
  }
  request.cornerstoneParam = buildCornerstoneParam(region, fePath);

  const body = new URLSearchParams({
    params: JSON.stringify({
      Api: api,
      V: "1.0",
      Data: request,
    }),
    region: gateway.region,
  });

  return body;
}

async function postConsoleFreeTierQuota(
  region: AlibabaProviderRegion,
  api: string,
  cookie: string,
  secToken: string | null,
  taskId?: string | null,
  fePath: string = DEFAULT_TEXT_FE_PATH
): Promise<unknown> {
  const body = buildRequestBody(region, api, taskId, fePath);
  if (secToken) {
    body.set("sec_token", secToken);
  }

  const response = await fetch(buildGatewayUrl(region, api), {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookie,
      Origin: "https://modelstudio.console.alibabacloud.com",
      Referer: "https://modelstudio.console.alibabacloud.com/",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
    },
    body: body.toString(),
    signal: AbortSignal.timeout(15_000),
  });

  return response.json();
}

function extractTaskId(payload: unknown): string | null {
  const root = asRecord(payload);
  const dataV2 = asRecord(root.data?.DataV2 ?? root.DataV2);
  const inner = asRecord(dataV2.data);
  const payloadData = asRecord(inner.data ?? inner);
  return toTrimmedString(payloadData.taskId);
}

function hasQuotaPayload(payload: unknown): boolean {
  return parseAlibabaFreeTierQuotaEntries(payload).length > 0;
}

async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAlibabaFreeTierQuotaEntriesForPath(
  providerSpecificData: Record<string, unknown> | null | undefined,
  fePath: string
): Promise<AlibabaFreeTierQuotaEntry[] | null> {
  const cookie = getAlibabaConsoleCookie(providerSpecificData);
  if (!cookie) return null;

  const region = resolveAlibabaConsoleRegion(providerSpecificData);
  const secToken = getAlibabaConsoleSecToken(providerSpecificData);

  let payload = await postConsoleFreeTierQuota(
    region,
    FREE_TIER_QUOTA_START_API,
    cookie,
    secToken,
    null,
    fePath
  );

  if (!hasQuotaPayload(payload)) {
    payload = await postConsoleFreeTierQuota(
      region,
      FREE_TIER_QUOTA_API,
      cookie,
      secToken,
      null,
      fePath
    );
  }

  if (!hasQuotaPayload(payload)) {
    const taskId = extractTaskId(payload);
    if (!taskId) return null;

    for (let attempt = 0; attempt < 8; attempt += 1) {
      if (attempt > 0) {
        await delay(400);
      }
      payload = await postConsoleFreeTierQuota(
        region,
        FREE_TIER_QUOTA_API,
        cookie,
        secToken,
        taskId,
        fePath
      );
      if (hasQuotaPayload(payload)) break;
    }
  }

  const entries = parseAlibabaFreeTierQuotaEntries(payload);
  return entries.length > 0 ? entries : null;
}

export async function fetchAlibabaFreeTierQuotaEntries(
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<AlibabaFreeTierQuotaEntry[] | null> {
  return fetchAlibabaFreeTierQuotaEntriesForPath(providerSpecificData, DEFAULT_TEXT_FE_PATH);
}

export async function fetchAlibabaFreeTierVisionQuotaEntries(
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<AlibabaFreeTierQuotaEntry[] | null> {
  return fetchAlibabaFreeTierQuotaEntriesForPath(providerSpecificData, DEFAULT_VISION_FE_PATH);
}

export async function fetchAlibabaFreeTierMultimodalQuotaEntries(
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<AlibabaFreeTierQuotaEntry[] | null> {
  return fetchAlibabaFreeTierQuotaEntriesForPath(providerSpecificData, DEFAULT_MULTIMODAL_FE_PATH);
}

export async function fetchAlibabaFreeTierAudioQuotaEntries(
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<AlibabaFreeTierQuotaEntry[] | null> {
  return fetchAlibabaFreeTierQuotaEntriesForPath(providerSpecificData, DEFAULT_AUDIO_FE_PATH);
}

function mergeUniqueQuotaEntries(
  ...entryGroups: Array<readonly AlibabaFreeTierQuotaEntry[]>
): AlibabaFreeTierQuotaEntry[] {
  const merged: AlibabaFreeTierQuotaEntry[] = [];
  const seen = new Set<string>();
  for (const group of entryGroups) {
    for (const entry of group) {
      if (seen.has(entry.model)) continue;
      seen.add(entry.model);
      merged.push(entry);
    }
  }
  return merged;
}

export async function buildAlibabaFreeTierQuotaSnapshot(
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<AlibabaFreeTierQuotaSnapshot | null> {
  const textEntries = await fetchAlibabaFreeTierQuotaEntries(providerSpecificData);
  if (!textEntries) return null;

  const visionEntries =
    (await fetchAlibabaFreeTierVisionQuotaEntries(providerSpecificData)) || textEntries;
  const multimodalEntries =
    (await fetchAlibabaFreeTierMultimodalQuotaEntries(providerSpecificData)) || textEntries;
  const audioEntries =
    (await fetchAlibabaFreeTierAudioQuotaEntries(providerSpecificData)) || textEntries;

  const text = classifyAlibabaFreeTierQuotaEntries(textEntries, { textOnly: true });
  const vision = classifyAlibabaVisionFreeTierQuotaEntries(visionEntries);
  const multimodal = classifyAlibabaMultimodalFreeTierQuotaEntries(multimodalEntries);
  const audio = classifyAlibabaAudioFreeTierQuotaEntries(audioEntries);

  return {
    text,
    vision,
    multimodal,
    audio,
    entries: mergeUniqueQuotaEntries(textEntries, visionEntries, multimodalEntries, audioEntries),
  };
}

export async function refreshAlibabaFreeTierQuotaClassification(
  provider: string,
  providerSpecificData: Record<string, unknown> | null | undefined
): Promise<Record<string, unknown> | null> {
  if (
    !isAlibabaModelStudioProvider(provider) ||
    getAlibabaBillingMode(providerSpecificData) !== "free"
  ) {
    return null;
  }
  if (!hasAlibabaConsoleFreeTierAuth(providerSpecificData)) {
    return null;
  }

  const snapshot = await buildAlibabaFreeTierQuotaSnapshot(providerSpecificData);
  if (!snapshot) return null;

  return mergeAlibabaFreeTierQuotaClassification(providerSpecificData, snapshot);
}

type QuotaConnection = {
  id: string;
  providerSpecificData?: Record<string, unknown> | null;
};

export function scheduleAlibabaFreeTierQuotaRefresh(
  provider: string,
  connection: QuotaConnection
): void {
  if (!hasAlibabaConsoleFreeTierAuth(connection.providerSpecificData)) return;

  void (async () => {
    try {
      const merged = await refreshAlibabaFreeTierQuotaClassification(
        provider,
        connection.providerSpecificData
      );
      if (!merged) return;
      const { updateProviderConnection } = await import("../../src/lib/db/providers.ts");
      await updateProviderConnection(connection.id, { providerSpecificData: merged });
      await propagateAlibabaFreeTierEligibilityToSiblings(provider, connection.id, merged);
    } catch (error) {
      console.warn("[alibaba-free-tier] console quota refresh failed", {
        connectionId: connection.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  })();
}
