/**
 * @file alibabaFreeTier.ts
 * @description Alibaba Model Studio free-tier drain detection, billing mode, and persisted model lockouts.
 *
 * @changes
 * - [2026-07-25] [Composer] - Delegate free-eligible filtering to probe-based discovery module
 * - [2026-07-24] [Composer] - Add free-vs-paid billing mode and permanent free-tier model drain handling
 */

import { isModelLocked, lockModel } from "./accountFallback.ts";

export type AlibabaBillingMode = "free" | "paid";

type AlibabaConnectionLike = {
  id: string;
  providerSpecificData?: Record<string, unknown> | null;
};

/** ~10 years — free-tier drains are permanent until the operator clears connection state. */
export const ALIBABA_FREE_DRAINED_LOCK_MS = 10 * 365 * 24 * 60 * 60 * 1000;

const ALIBABA_FREE_QUOTA_EXHAUSTED_PATTERNS = [
  /\bfree quota has been exhausted\b/i,
  /\bfree tier of the model has been exhausted\b/i,
  /\buse free tier only\b/i,
] as const;

const ALIBABA_MODEL_STUDIO_PROVIDER_IDS = new Set(["alibaba", "alibaba-cn", "ali"]);

export {
  filterAlibabaFreeEligibleModels,
  isAlibabaFreeTierCapableModel,
} from "./alibabaFreeTierDiscovery.ts";

export {
  filterAlibabaFreeVisionEligibleModels,
  filterAlibabaFreeMultimodalEligibleModels,
  filterAlibabaFreeAudioEligibleModels,
  isAlibabaFreeTierVisionCapableModel,
  isAlibabaFreeTierMultimodalCapableModel,
  isAlibabaFreeTierAudioCapableModel,
} from "./alibabaFreeTierQuotaFetcher.ts";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function isAlibabaModelStudioProvider(provider: string | null | undefined): boolean {
  if (!provider) return false;
  const normalized = provider.toLowerCase();
  return ALIBABA_MODEL_STUDIO_PROVIDER_IDS.has(normalized);
}

export function isAlibabaFreeQuotaExhaustedError(errorText: string): boolean {
  const text = String(errorText || "");
  if (!text) return false;
  return ALIBABA_FREE_QUOTA_EXHAUSTED_PATTERNS.some((pattern) => pattern.test(text));
}

export function getAlibabaBillingMode(
  providerSpecificData: Record<string, unknown> | null | undefined
): AlibabaBillingMode {
  const raw = asRecord(providerSpecificData).alibabaBillingMode;
  return raw === "free" ? "free" : "paid";
}

export function getAlibabaFreeDrainedModels(
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  const raw = asRecord(providerSpecificData).alibabaFreeDrainedModels;
  if (!Array.isArray(raw)) return [];
  return raw.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}

export function isAlibabaModelFreeDrained(
  provider: string | null | undefined,
  providerSpecificData: Record<string, unknown> | null | undefined,
  model: string | null | undefined
): boolean {
  if (!isAlibabaModelStudioProvider(provider) || !model) return false;
  return getAlibabaFreeDrainedModels(providerSpecificData).includes(model);
}

export function mergeAlibabaFreeDrainedModels(
  providerSpecificData: Record<string, unknown> | null | undefined,
  model: string
): Record<string, unknown> {
  const base = asRecord(providerSpecificData);
  const existing = new Set(getAlibabaFreeDrainedModels(base));
  existing.add(model);
  return {
    ...base,
    alibabaFreeDrainedModels: [...existing],
  };
}

export function shouldUseLiveAlibabaFreeModelDiscovery(
  providerSpecificData: Record<string, unknown> | null | undefined
): boolean {
  return getAlibabaBillingMode(providerSpecificData) === "free";
}

export function filterAlibabaFreeTierModels(
  modelIds: readonly string[],
  providerSpecificData: Record<string, unknown> | null | undefined
): string[] {
  const drained = new Set(getAlibabaFreeDrainedModels(providerSpecificData));
  return modelIds.filter((id) => !drained.has(id));
}

export function rehydrateAlibabaFreeDrainedModelLocks(
  provider: string,
  connectionId: string,
  providerSpecificData: Record<string, unknown> | null | undefined
): void {
  if (
    !isAlibabaModelStudioProvider(provider) ||
    getAlibabaBillingMode(providerSpecificData) !== "free"
  ) {
    return;
  }
  for (const model of getAlibabaFreeDrainedModels(providerSpecificData)) {
    if (!isModelLocked(provider, connectionId, model)) {
      lockModel(
        provider,
        connectionId,
        model,
        "free_quota_exhausted",
        ALIBABA_FREE_DRAINED_LOCK_MS
      );
    }
  }
}

export async function isAlibabaFreeTierModelRoutable(
  provider: string,
  connectionId: string,
  model: string
): Promise<boolean> {
  if (!isAlibabaModelStudioProvider(provider) || !model) return true;
  if (isModelLocked(provider, connectionId, model)) return false;
  try {
    const { getProviderConnections } = await import("../../src/lib/db/providers.ts");
    const { buildAlibabaFreeTierFilterContext, isAlibabaFreeTierCapableModel } =
      await import("./alibabaFreeTierDiscovery.ts");
    const connections = await getProviderConnections({ provider });
    const connection = connections.find((entry) => entry.id === connectionId);
    if (!connection) return true;
    const providerSpecificData = connection.providerSpecificData as Record<string, unknown>;
    rehydrateAlibabaFreeDrainedModelLocks(provider, connectionId, providerSpecificData);
    if (getAlibabaBillingMode(providerSpecificData) === "free") {
      const filterContext = buildAlibabaFreeTierFilterContext(
        connections as unknown as readonly AlibabaConnectionLike[],
        connectionId
      );
      if (!isAlibabaFreeTierCapableModel(model, filterContext)) return false;
    }
    return !isAlibabaModelFreeDrained(provider, providerSpecificData, model);
  } catch {
    return !isModelLocked(provider, connectionId, model);
  }
}
