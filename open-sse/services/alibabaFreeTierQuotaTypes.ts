/**
 * @file alibabaFreeTierQuotaTypes.ts
 * @description Shared types + small primitive helpers for the Alibaba free-tier quota
 * fetcher/classifier split (extracted from alibabaFreeTierQuotaFetcher.ts to keep that
 * file under the file-size cap; behavior is unchanged).
 */

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

export function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function toTrimmedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function normalizeModelIdList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}

export function getAlibabaFreeTierQuotaLastSyncAt(
  providerSpecificData: Record<string, unknown> | null | undefined
): string | null {
  return toTrimmedString(asRecord(providerSpecificData).alibabaFreeTierQuotaLastSyncAt);
}

/** True when the connection has a live console/API quota snapshot (not builtin fallback). */
export function isAlibabaLiveQuotaSyncAt(syncAt: string | null | undefined): boolean {
  if (!syncAt || syncAt === "builtin-allowlist") return false;
  return Number.isFinite(Date.parse(syncAt));
}
