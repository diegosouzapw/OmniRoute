/**
 * quotaPreflight.ts — Feature 04
 * Quota Preflight & Troca Proativa de Conta
 *
 * Toggle: providerSpecificData.quotaPreflightEnabled (default: false)
 * Providers register quota fetchers via registerQuotaFetcher().
 * Graceful degradation when no fetcher registered.
 */

export interface PreflightQuotaResult {
  proceed: boolean;
  reason?: string;
  quotaPercent?: number;
  resetAt?: string | null;
}

export interface QuotaInfo {
  used: number;
  total: number;
  percentUsed: number;
  resetAt?: string | null;
}

export type QuotaFetcher = (
  connectionId: string,
  connection?: Record<string, unknown>
) => Promise<QuotaInfo | null>;

const EXHAUSTION_THRESHOLD = 0.98;
const WARN_THRESHOLD = 0.8;

const quotaFetcherRegistry = new Map<string, QuotaFetcher>();

export function registerQuotaFetcher(provider: string, fetcher: QuotaFetcher): void {
  quotaFetcherRegistry.set(provider, fetcher);
}

export function getQuotaFetcher(provider: string): QuotaFetcher | undefined {
  return quotaFetcherRegistry.get(provider) || quotaFetcherRegistry.get(provider.toLowerCase());
}

export function isQuotaPreflightEnabled(connection: Record<string, unknown>): boolean {
  const psd = connection?.providerSpecificData as Record<string, unknown> | undefined;
  return psd?.quotaPreflightEnabled === true;
}

export async function preflightQuota(
  provider: string,
  connectionId: string,
  connection: Record<string, unknown>
): Promise<PreflightQuotaResult> {
  if (!isQuotaPreflightEnabled(connection)) {
    return { proceed: true };
  }

  const fetcher = getQuotaFetcher(provider);
  if (!fetcher) {
    return { proceed: true };
  }

  let quota: QuotaInfo | null = null;
  try {
    quota = await fetcher(connectionId, connection);
  } catch {
    return { proceed: true };
  }

  if (!quota) {
    return { proceed: true };
  }

  const { percentUsed } = quota;

  if (percentUsed >= EXHAUSTION_THRESHOLD) {
    console.info(
      `[QuotaPreflight] ${provider}/${connectionId}: ${(percentUsed * 100).toFixed(1)}% used — switching`
    );
    return {
      proceed: false,
      reason: "quota_exhausted",
      quotaPercent: percentUsed,
      resetAt: quota.resetAt ?? null,
    };
  }

  if (percentUsed >= WARN_THRESHOLD) {
    console.warn(
      `[QuotaPreflight] ${provider}/${connectionId}: ${(percentUsed * 100).toFixed(1)}% used — approaching limit`
    );
  }

  return { proceed: true, quotaPercent: percentUsed };
}
