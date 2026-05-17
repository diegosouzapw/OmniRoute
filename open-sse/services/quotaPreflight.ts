/**
 * quotaPreflight.ts — Feature 04
 * Quota Preflight & Troca Proativa de Conta
 *
 * Providers register quota fetchers via registerQuotaFetcher(). The caller
 * (`src/sse/services/auth.ts::getProviderCredentialsWithQuotaPreflight`) is
 * responsible for deciding WHEN to invoke preflight — calling it adds the
 * latency of an upstream usage fetch, so it should only run when there's
 * something to enforce (per-connection overrides, per-(provider, window)
 * defaults, or the legacy `quotaPreflightEnabled` flag).
 *
 * Threshold semantics are "minimum remaining %" — matching the dashboard's
 * quota bars, which show remaining (not used). A cutoff of 10 means "stop
 * using this connection when it has 10% or less remaining."
 *
 * `isQuotaPreflightEnabled` remains exported for back-compat so the caller
 * can honor the legacy flag, but `preflightQuota` itself no longer gates on
 * it — once you invoke preflight, it runs the fetcher and evaluates.
 */

export interface PreflightQuotaResult {
  proceed: boolean;
  reason?: string;
  quotaPercent?: number;
  resetAt?: string | null;
}

export interface QuotaWindowInfo {
  percentUsed: number;
  resetAt?: string | null;
}

export interface QuotaInfo {
  used: number;
  total: number;
  /** Worst-case percentUsed across all known windows (legacy, single-signal). */
  percentUsed: number;
  resetAt?: string | null;
  /**
   * Optional per-window breakdown. When present, preflight evaluates each
   * window against its own threshold (block if ANY window has dropped to or
   * below its min-remaining cutoff) instead of using `percentUsed`. Keys are
   * window names that match the quota keys surfaced by getUsageForProvider
   * (e.g. "session", "weekly", "monthly").
   */
  windows?: Record<string, QuotaWindowInfo>;
}

export type QuotaFetcher = (
  connectionId: string,
  connection?: Record<string, unknown>
) => Promise<QuotaInfo | null>;

/**
 * Registry of named quota windows per provider. Used by the dashboard to
 * discover which inputs to render in the cutoffs modal. Providers without
 * multiple windows can skip registration — preflight falls back to the
 * single-signal `percentUsed` path in that case.
 */
const quotaWindowsRegistry = new Map<string, readonly string[]>();

export function registerQuotaWindows(provider: string, windows: readonly string[]): void {
  quotaWindowsRegistry.set(provider, [...windows]);
}

export function getQuotaWindows(provider: string): readonly string[] {
  return (
    quotaWindowsRegistry.get(provider) || quotaWindowsRegistry.get(provider.toLowerCase()) || []
  );
}

export function getAllProviderQuotaWindows(): Record<string, readonly string[]> {
  return Object.fromEntries(quotaWindowsRegistry);
}

// Thresholds use "minimum remaining %" semantics so the numbers match the
// dashboard's quota bars (which show remaining %). A cutoff of 2 means
// "block when only 2% remaining" (= 98% used). Warn fires earlier — at
// 20% remaining (= 80% used) by default.
const DEFAULT_MIN_REMAINING_PERCENT = 2;
const DEFAULT_WARN_REMAINING_PERCENT = 20;

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

export interface PreflightQuotaThresholds {
  /**
   * Resolve the minimum-remaining cutoff (0-100 integer) for a given window
   * name. The connection is blocked when its remaining quota drops to this
   * value or below — e.g. returning 10 means "stop when only 10% remaining."
   * Resolution order, low-to-high precedence:
   *   global default → per-(provider, window) default → connection override
   * Window name is `null` when the underlying fetcher only exposes a single-
   * signal `percentUsed` (legacy path).
   */
  resolveMinRemainingPercent?: (window: string | null) => number;
  /**
   * Resolve the warning threshold (0-100 integer remaining %) for a window.
   * Warn fires when remaining quota drops to this value or below — should be
   * HIGHER than the min-remaining cutoff so warnings appear before the block
   * point.
   */
  resolveWarnRemainingPercent?: (window: string | null) => number;
}

function resolveOrDefault(
  resolver: ((window: string | null) => number) | undefined,
  window: string | null,
  fallbackPercent: number
): number {
  if (!resolver) return fallbackPercent;
  const raw = resolver(window);
  if (typeof raw === "number" && Number.isFinite(raw) && raw >= 0 && raw <= 100) {
    return raw;
  }
  return fallbackPercent;
}

function remainingPercentFrom(percentUsed: number): number {
  return Math.max(0, (1 - percentUsed) * 100);
}

export async function preflightQuota(
  provider: string,
  connectionId: string,
  connection: Record<string, unknown>,
  thresholds?: PreflightQuotaThresholds
): Promise<PreflightQuotaResult> {
  // No legacy enable-flag gate here — the caller decides when to invoke us
  // (see file-level docstring). When there's no fetcher we proceed silently.
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

  // Per-window evaluation — only when the fetcher surfaces a windows map.
  // We block as soon as ANY single window's remaining quota drops to its
  // configured cutoff or below; warnings are logged independently per window.
  if (quota.windows && Object.keys(quota.windows).length > 0) {
    let worstUsedPercent = 0;
    let worstWindow: string | null = null;
    let worstResetAt: string | null = null;
    for (const [windowName, windowInfo] of Object.entries(quota.windows)) {
      const minRemainingPercent = resolveOrDefault(
        thresholds?.resolveMinRemainingPercent,
        windowName,
        DEFAULT_MIN_REMAINING_PERCENT
      );
      const warnRemainingPercent = resolveOrDefault(
        thresholds?.resolveWarnRemainingPercent,
        windowName,
        DEFAULT_WARN_REMAINING_PERCENT
      );
      const remainingPercent = remainingPercentFrom(windowInfo.percentUsed);

      if (remainingPercent <= minRemainingPercent) {
        // Track the most-depleted blocking window so the response can name it.
        if (windowInfo.percentUsed > worstUsedPercent) {
          worstUsedPercent = windowInfo.percentUsed;
          worstWindow = windowName;
          worstResetAt = windowInfo.resetAt ?? null;
        } else if (worstWindow === null) {
          worstWindow = windowName;
          worstResetAt = windowInfo.resetAt ?? null;
        }
      } else if (remainingPercent <= warnRemainingPercent) {
        console.warn(
          `[QuotaPreflight] ${provider}/${connectionId} ${windowName}: ${remainingPercent.toFixed(1)}% remaining — approaching cutoff`
        );
      }
    }

    if (worstWindow !== null) {
      const worstRemaining = remainingPercentFrom(worstUsedPercent);
      console.info(
        `[QuotaPreflight] ${provider}/${connectionId} ${worstWindow}: ${worstRemaining.toFixed(1)}% remaining — switching`
      );
      return {
        proceed: false,
        reason: "quota_exhausted",
        quotaPercent: worstUsedPercent,
        resetAt: worstResetAt,
      };
    }

    return { proceed: true, quotaPercent: quota.percentUsed };
  }

  // Legacy single-signal path for fetchers that don't expose per-window data.
  const minRemainingPercent = resolveOrDefault(
    thresholds?.resolveMinRemainingPercent,
    null,
    DEFAULT_MIN_REMAINING_PERCENT
  );
  const warnRemainingPercent = resolveOrDefault(
    thresholds?.resolveWarnRemainingPercent,
    null,
    DEFAULT_WARN_REMAINING_PERCENT
  );

  const { percentUsed } = quota;
  const remainingPercent = remainingPercentFrom(percentUsed);

  if (remainingPercent <= minRemainingPercent) {
    console.info(
      `[QuotaPreflight] ${provider}/${connectionId}: ${remainingPercent.toFixed(1)}% remaining — switching (cutoff ${minRemainingPercent}%)`
    );
    return {
      proceed: false,
      reason: "quota_exhausted",
      quotaPercent: percentUsed,
      resetAt: quota.resetAt ?? null,
    };
  }

  if (remainingPercent <= warnRemainingPercent) {
    console.warn(
      `[QuotaPreflight] ${provider}/${connectionId}: ${remainingPercent.toFixed(1)}% remaining — approaching cutoff`
    );
  }

  return { proceed: true, quotaPercent: percentUsed };
}
