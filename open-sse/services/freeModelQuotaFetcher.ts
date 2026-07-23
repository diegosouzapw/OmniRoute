/**
 * freeModelQuotaFetcher.ts — FreeModel.dev Local Dual-Window Quota Tracker
 *
 * Implements QuotaFetcher for the `freemodel-dev` provider (quotaPreflight.ts + quotaMonitor.ts).
 *
 * FreeModel.dev publishes no usage API (verified per #7075 research), so tracking is
 * local-first: OmniRoute meters its own requests per **account** (connectionId — not per
 * key, not per host, since all tier hosts T0/T1/T2 drain the same upstream bucket) across
 * two rolling windows, mirroring the Codex 5h/7d window model
 * (`open-sse/services/codexUsageQuotas.ts`):
 *
 *   - window5h: rolling session starting at the first request after the previous reset
 *   - window7d: anchored at first use, resets 7 days later
 *
 * Both windows are counted in REQUESTS (no published token/dollar figures to meter
 * against). Callers record usage via `recordFreeModelRequest(accountId)`; the fetcher
 * itself is read-only and never makes a network call — this keeps preflight/dashboard
 * reads fast and avoids depending on an upstream endpoint that does not exist today.
 *
 * Server-signal correction (Retry-After / X-RateLimit-* on a 429) and an endpoint prober
 * are explicitly out of scope for this pass — see #7075's own effort estimate, which
 * recommends phasing tracker+persistence before routing/prober work. This module ships
 * the tracker + fetcher registration (phase 1); wiring `recordFreeModelRequest` into the
 * live request path is a follow-up once a hot-path integration point is chosen.
 *
 * Defaults are user-overridable via env (no published caps exist upstream):
 *   FREEMODEL_5H_REQUEST_LIMIT (default 500)
 *   FREEMODEL_7D_REQUEST_LIMIT (default 2000)
 */

import { registerQuotaFetcher, registerQuotaWindows, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";

export const FREEMODEL_WINDOW_5H = "window5h";
export const FREEMODEL_WINDOW_7D = "window7d";

const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function getRequestLimit(envVar: string, fallback: number): number {
  const raw = process.env[envVar];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

interface WindowState {
  count: number;
  windowStart: number;
}

interface AccountState {
  window5h: WindowState;
  window7d: WindowState;
}

// In-memory per-account counters. accountId = connectionId (per-account, not per-key).
const accountStates = new Map<string, AccountState>();

function freshWindow(now: number): WindowState {
  return { count: 0, windowStart: now };
}

function getOrCreateState(accountId: string, now: number): AccountState {
  let state = accountStates.get(accountId);
  if (!state) {
    state = { window5h: freshWindow(now), window7d: freshWindow(now) };
    accountStates.set(accountId, state);
  }
  return state;
}

function rollWindowIfExpired(window: WindowState, durationMs: number, now: number): WindowState {
  if (now - window.windowStart >= durationMs) {
    return freshWindow(now);
  }
  return window;
}

/**
 * Record one request against an account's dual-window counters. Call this from the
 * request-handling path once freemodel-dev hot-path wiring lands (tracked as follow-up —
 * see module docstring). Safe to call concurrently; each call is a synchronous counter
 * bump so there is no race window in single-threaded Node execution.
 */
export function recordFreeModelRequest(accountId: string): void {
  if (!accountId) return;
  const now = Date.now();
  const state = getOrCreateState(accountId, now);
  state.window5h = rollWindowIfExpired(state.window5h, FIVE_HOURS_MS, now);
  state.window7d = rollWindowIfExpired(state.window7d, SEVEN_DAYS_MS, now);
  state.window5h.count += 1;
  state.window7d.count += 1;
}

/**
 * Reset all tracked state for an account (e.g. on connection deletion/reset).
 */
export function resetFreeModelAccount(accountId: string): void {
  accountStates.delete(accountId);
}

/**
 * Clear all in-memory tracking state. Test-only utility (mirrors clearQuotaMonitors()).
 */
export function clearFreeModelQuotaState(): void {
  accountStates.clear();
}

function toWindowInfo(
  window: WindowState,
  durationMs: number,
  limit: number
): { percentUsed: number; resetAt: string | null } {
  const percentUsed = limit > 0 ? Math.min(1, window.count / limit) : 0;
  const resetAt = new Date(window.windowStart + durationMs).toISOString();
  return { percentUsed, resetAt };
}

/**
 * Read current quota state for a FreeModel connection. Purely local — never touches the
 * network. Returns null only when there is no tracked activity yet (nothing to report).
 *
 * @param connectionId - Connection ID from the DB, used as the per-account tracking key
 */
export async function fetchFreeModelQuota(connectionId: string): Promise<QuotaInfo | null> {
  const state = accountStates.get(connectionId);
  if (!state) return null;

  const now = Date.now();
  const limit5h = getRequestLimit("FREEMODEL_5H_REQUEST_LIMIT", 500);
  const limit7d = getRequestLimit("FREEMODEL_7D_REQUEST_LIMIT", 2000);

  // Reads never mutate — roll a local copy for display purposes only, so an idle
  // connection's dashboard reads reflect an elapsed window without a live request.
  const rolled5h = rollWindowIfExpired(state.window5h, FIVE_HOURS_MS, now);
  const rolled7d = rollWindowIfExpired(state.window7d, SEVEN_DAYS_MS, now);

  const window5h = toWindowInfo(rolled5h, FIVE_HOURS_MS, limit5h);
  const window7d = toWindowInfo(rolled7d, SEVEN_DAYS_MS, limit7d);

  const worstPercentUsed = Math.max(window5h.percentUsed, window7d.percentUsed);
  const dominantResetAt =
    worstPercentUsed === window5h.percentUsed ? window5h.resetAt : window7d.resetAt;

  return {
    used: Math.round(worstPercentUsed * 100),
    total: 100,
    percentUsed: worstPercentUsed,
    resetAt: dominantResetAt,
    windows: {
      [FREEMODEL_WINDOW_5H]: window5h,
      [FREEMODEL_WINDOW_7D]: window7d,
    },
  };
}

/**
 * Register the FreeModel quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chat.ts).
 */
export function registerFreeModelQuotaFetcher(): void {
  registerQuotaFetcher("freemodel-dev", fetchFreeModelQuota);
  registerMonitorFetcher("freemodel-dev", fetchFreeModelQuota);
  registerQuotaWindows("freemodel-dev", [FREEMODEL_WINDOW_5H, FREEMODEL_WINDOW_7D]);
}
