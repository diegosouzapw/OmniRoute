import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";
import { sanitizeProviderBillingStatus } from "@/shared/utils/providerBilling";
import { GROK_BUILD_ADDITIONAL_CREDITS_URL } from "@/shared/utils/grokBilling";
import { parseCodexPaidCredits } from "@/lib/providers/codexPaidCredits";

const GROK_CLI_PROVIDER = "grok-cli";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function hasUsableCachedData(cache: ProviderLimitsCacheEntry | null | undefined): boolean {
  return Boolean(cache?.billing || (cache?.quotas && Object.keys(cache.quotas).length > 0));
}

export function toProviderLimitsCacheEntry(
  usage: JsonRecord,
  source: string,
  fetchedAt = new Date().toISOString()
): ProviderLimitsCacheEntry {
  const bankedResetCredits = Number(usage.bankedResetCredits);
  return {
    quotas: isRecord(usage.quotas) ? usage.quotas : null,
    plan: usage.plan ?? null,
    message: typeof usage.message === "string" ? usage.message : null,
    fetchedAt,
    source,
    bankedResetCredits: Number.isFinite(bankedResetCredits) ? bankedResetCredits : undefined,
    paidCredits: parseCodexPaidCredits(usage.paidCredits),
    billing: sanitizeProviderBillingStatus(usage.billing),
  };
}

export function mergeProviderLimitsCacheEntry(
  provider: string,
  next: ProviderLimitsCacheEntry,
  previous: ProviderLimitsCacheEntry | null | undefined
): ProviderLimitsCacheEntry {
  if (!previous) return next;

  if (!next.quotas && next.message && hasUsableCachedData(previous)) {
    return previous;
  }

  if (provider !== GROK_CLI_PROVIDER) return next;

  const nextBilling = next.billing;
  const previousBilling = previous.billing;
  if (
    !nextBilling ||
    nextBilling.additionalCreditsUrl !== GROK_BUILD_ADDITIONAL_CREDITS_URL ||
    nextBilling.autoTopUp.available ||
    !previousBilling ||
    previousBilling.additionalCreditsUrl !== GROK_BUILD_ADDITIONAL_CREDITS_URL
  )
    return next;

  return {
    ...next,
    billing: {
      ...nextBilling,
      autoTopUp: previousBilling.autoTopUp,
    },
  };
}
