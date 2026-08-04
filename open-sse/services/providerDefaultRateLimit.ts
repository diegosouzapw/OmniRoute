/**
 * Provider-default sliding-window rate-limit fallback (free-claude-code port, Fase 8.2).
 *
 * Providers that do NOT send rate-limit headers never let the adaptive Bottleneck path
 * in rateLimitManager learn a reservoir, so `resolveRpm` leaves them effectively
 * un-throttled. For such a provider with a *documented* fixed cap, an operator can
 * declare a default here and a sliding window (burst-free, unlike Bottleneck's
 * fixed-window reservoir which refills in one burst every interval) enforces it
 * proactively. `nvidia` is the first (and currently only) real entry — NVIDIA NIM's
 * free tier is documented as "~40 RPM" and exposes no rate-limit headers or usage
 * API (#6846 Phase 1). Every other provider still gets zero behavior change; the
 * whole path is a no-op unless an entry (or a resolved override, see below) exists.
 *
 * Wired as a pre-schedule gate in `withRateLimit` (rateLimitManager.ts). Bottleneck
 * still applies on top — this only adds a floor for header-less providers.
 */
import { SlidingWindowLimiter, type RateLimitWindow } from "./slidingWindowLimiter.ts";

// Opt-in per-provider caps. Example shape (commented — add real entries as needed):
//   "some-headerless-provider": { requests: 60, windowMs: 60_000 },
const PROVIDER_DEFAULT_RATE_LIMITS: Record<string, RateLimitWindow> = {
  nvidia: { requests: 40, windowMs: 60_000 },
};

/** #6846 Phase 1: default per-connection concurrency cap for providers whose static
 * budget is enforced via `open-sse/services/rateLimitSemaphore.ts` (nvidia only,
 * today). Mid-point of the issue's suggested 4-8 range. */
export const PROVIDER_DEFAULT_CONCURRENCY_CAP: Record<string, number> = {
  nvidia: 6,
};

let providerDefaultOverrides: Record<string, RateLimitWindow> | null = null;
const limiter = new SlidingWindowLimiter();

/**
 * Operator-configured overrides, resolved from `ResilienceSettings.providerQuotaOverrides`
 * (see `src/lib/resilience/settings.ts`) by `rateLimitManager.ts` on init/refresh.
 * `rpm` overrides the static sliding-window budget; `concurrency` overrides the
 * default per-connection concurrency cap. A 0/missing field falls back to the
 * static default for that field.
 */
let providerQuotaOverrides: Record<string, { rpm?: number; concurrency?: number }> | null = null;

/** Test hook: override the provider-default map and clear accumulated history. */
export function __setProviderDefaultRateLimitsForTests(
  map: Record<string, RateLimitWindow> | null
): void {
  providerDefaultOverrides = map;
  limiter.reset();
}

/**
 * Set (or clear, with `null`) the operator-configured per-provider RPM/concurrency
 * overrides. Called by `rateLimitManager.ts::initializeRateLimitProtection()` and
 * `applyRequestQueueSettings()` after resolving `ResilienceSettings`.
 */
export function setProviderQuotaOverrides(
  map: Record<string, { rpm?: number; concurrency?: number }> | null
): void {
  providerQuotaOverrides = map;
}

export function getProviderDefaultRateLimit(provider: string): RateLimitWindow | undefined {
  if (!provider) return undefined;
  const rpmOverride = providerQuotaOverrides?.[provider]?.rpm;
  if (typeof rpmOverride === "number" && rpmOverride > 0) {
    return { requests: rpmOverride, windowMs: 60_000 };
  }
  return (providerDefaultOverrides ?? PROVIDER_DEFAULT_RATE_LIMITS)[provider];
}

/**
 * Resolve a provider's per-connection concurrency cap: operator override →
 * `PROVIDER_DEFAULT_CONCURRENCY_CAP[provider]` → `fallback`. Used by the nvidia
 * executor concurrency gate (`open-sse/executors/default/nvidiaConcurrencyGate.ts`).
 */
export function getProviderConcurrencyCap(provider: string, fallback: number): number {
  const override = providerQuotaOverrides?.[provider]?.concurrency;
  if (typeof override === "number" && override > 0) return override;
  const staticDefault = PROVIDER_DEFAULT_CONCURRENCY_CAP[provider];
  return typeof staticDefault === "number" && staticDefault > 0 ? staticDefault : fallback;
}

/**
 * Consume one slot from the provider's opt-in sliding-window default.
 * Returns 0 when a slot was taken (proceed) or no default is configured; otherwise the
 * ms until a slot frees, so the caller can wait and retry.
 */
export function acquireProviderDefaultSlot(provider: string, connectionId?: string | null): number {
  const cfg = getProviderDefaultRateLimit(provider);
  if (!cfg) return 0;
  const res = limiter.tryAcquire(`${provider}:${connectionId || "_"}`, cfg);
  return res.allowed ? 0 : Math.max(1, res.retryAfterMs);
}

/** Abort-aware sleep: resolves after `ms`, or rejects with AbortError if `signal` fires. */
function sleepOrAbort(ms: number, signal: AbortSignal | null): Promise<void> {
  return new Promise((resolve, reject) => {
    let onAbort: (() => void) | null = null;
    const timer = setTimeout(() => {
      if (signal && onAbort) signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    if (signal) {
      onAbort = () => {
        clearTimeout(timer);
        const reason = signal.reason;
        const err =
          reason instanceof Error
            ? reason
            : new Error(typeof reason === "string" ? reason : "The operation was aborted");
        err.name = "AbortError";
        reject(err);
      };
      signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}

/**
 * Block until the provider's opt-in sliding-window default has a free slot (or the wait
 * budget is exhausted, in which case we proceed — Bottleneck still applies). No-op when
 * the provider has no configured default. Converges: each wait frees at least one slot.
 */
export async function awaitProviderDefaultSlot(
  provider: string,
  connectionId: string | null,
  signal: AbortSignal | null,
  maxWaitMs?: number
): Promise<void> {
  const cfg = getProviderDefaultRateLimit(provider);
  if (!cfg) return;
  const budget = Math.max(cfg.windowMs, maxWaitMs && maxWaitMs > 0 ? maxWaitMs : 0);
  const start = Date.now();
  for (;;) {
    const waitMs = acquireProviderDefaultSlot(provider, connectionId);
    if (waitMs === 0) return;
    if (Date.now() - start >= budget) return; // waited the budget; let it through
    await sleepOrAbort(Math.min(waitMs, budget), signal);
  }
}
