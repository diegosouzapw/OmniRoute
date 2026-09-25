/**
 * Quota Cache — shared state + #14359 healthy override (dependency-free leaf).
 *
 * Split out of `quotaCache.ts` so modules that `quotaCache.ts` itself imports
 * (transitively: `open-sse/services/usage.ts` → `usage/openrouter.ts` →
 * `openrouterQuotaFetcher.ts` → `quotaPreflight.ts`) can read the healthy
 * override without importing `quotaCache.ts` back. That back-edge closed an
 * ESM init cycle which, in the esbuild MCP bundle (async `__esm` initializers),
 * deadlocked module evaluation ("unsettled top-level await"). Keep this file
 * free of runtime imports.
 *
 * @module domain/quotaCacheState
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export interface QuotaInfo {
  remainingPercentage: number;
  resetAt: string | null;
  // #10095 — upstream explicitly told us it did NOT report this window's
  // fraction (e.g. a fresh Antigravity account or a newly-launched
  // -tiered model id Google hasn't wired quota telemetry for yet).
  // `undefined`/`true` means the value is a real, upstream-reported
  // percentage; `false` means "unknown", so callers must not treat the
  // defaulted-to-0 `remainingPercentage` as genuine exhaustion.
  fractionReported?: boolean;
  displayName?: string;
  windowSeconds?: number | null;
}

export interface QuotaCacheEntry {
  connectionId: string;
  provider: string;
  quotas: Record<string, QuotaInfo>;
  fetchedAt: number;
  exhausted: boolean;
  nextResetAt: string | null;
  windowDurationMs?: number | null; // T08: optional rolling window duration
}

// #14359 — a park is trusted at most EXHAUSTED_MAX_PARK_MS past its observation; a far weekly-window reset must not block for days.
export const EXHAUSTED_MAX_PARK_MS = 30 * 60 * 1000;

// ─── State ──────────────────────────────────────────────────────────────────
//
// #8065 — Next.js `output: "standalone"` builds can load this module from
// independent webpack chunks (e.g. the instrumentation-hook-started
// `providerLimitsSyncScheduler` write path vs an API-route/SSE-handler read
// path such as `auth.ts::evaluateQuotaLimitPolicy()`) — each gets its OWN
// top-level module state, so a bare module-scope `Map` silently splits the
// cache in two. Anchor all mutable state on `globalThis` so every chunk
// shares one instance. Mirrors the identical fix already applied for
// `src/lib/pricingSync.ts` (commit de9d748dac, #6325) and the same pattern in
// `src/lib/credentialHealth/cache.ts`.

interface QuotaCacheState {
  cache: Map<string, QuotaCacheEntry>;
  refreshingSet: Set<string>;
  // #14359 — connectionId → epoch ms the healthy override stands the predicates down; shared state per #8065.
  healthyUntil: Map<string, number>;
  refreshTimer: ReturnType<typeof setInterval> | null;
  tickRunning: boolean;
}

declare global {
  var __omnirouteQuotaCacheState: QuotaCacheState | undefined;
}

export function getQuotaCacheState(): QuotaCacheState {
  if (!globalThis.__omnirouteQuotaCacheState) {
    globalThis.__omnirouteQuotaCacheState = {
      cache: new Map(),
      refreshingSet: new Set(),
      healthyUntil: new Map(),
      refreshTimer: null,
      tickRunning: false,
    };
  }
  return globalThis.__omnirouteQuotaCacheState;
}

// ─── #14359 healthy override ────────────────────────────────────────────────

// #14359 — arm the healthy override for one park window (chat success hook).
export function markQuotaHealthy(connectionId: string): void {
  getQuotaCacheState().healthyUntil.set(connectionId, Date.now() + EXHAUSTED_MAX_PARK_MS);
}

// #14359 — clear the healthy override (a genuine 429 re-parks immediately).
export function unmarkQuotaHealthy(connectionId: string): void {
  getQuotaCacheState().healthyUntil.delete(connectionId);
}

// #14359 — true while the healthy override for this connection is armed.
export function isQuotaHealthy(connectionId: string): boolean {
  const until = getQuotaCacheState().healthyUntil.get(connectionId);
  return until !== undefined && until > Date.now();
}
