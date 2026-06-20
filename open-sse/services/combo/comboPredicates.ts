/**
 * Pure combo predicates + tuning constants extracted from combo.ts.
 *
 * Side-effect-free helpers and the combo-loop tuning constants moved out of the
 * combo.ts god-file (Quality Gate v2 / Fase 9). Logic unchanged; the public
 * predicates are re-exported from combo.ts for backward compatibility.
 */

import { isProviderFailureCode } from "../accountFallback.ts";
import { errorResponse } from "../../utils/error.ts";
import { parseModel } from "../model.ts";
import type { ResolvedComboTarget } from "./types.ts";

// Status codes that should mark round-robin target semaphores as cooling down.
export const TRANSIENT_FOR_SEMAPHORE = [429, 502, 503, 504];
// Patterns that signal all accounts for a provider are rate-limited / exhausted.
// Used to detect 503 responses from handleNoCredentials so combo can fallback.
export const ALL_ACCOUNTS_RATE_LIMITED_PATTERNS = [
  /unavailable/i,
  /service temporarily unavailable/i,
];

export function isAllAccountsRateLimitedResponse(
  status: number,
  contentType: string | null,
  errorText: string
): boolean {
  if (status !== 503) return false;
  if (!contentType?.includes("application/json")) return false;
  return ALL_ACCOUNTS_RATE_LIMITED_PATTERNS.some((p) => p.test(errorText));
}

// #1731v2 guard: a provider circuit-breaker-open response (503 + `X-OmniRoute-Provider-Breaker`
// header / `provider_circuit_open` error code, see providerCircuitOpenResponse) is an OmniRoute
// resilience signal, NOT a per-connection upstream failure. It must keep being treated as an
// ordinary target failure (try the next target, including same-provider ones) — so it must NOT
// poison exhaustedConnections/exhaustedProviders, otherwise remaining same-provider targets get
// wrongly skipped while the breaker is open.
export function isProviderCircuitOpenResult(
  result: { headers?: Headers | null; status?: number },
  errorText: string
): boolean {
  const breakerHeader = result.headers?.get?.("x-omniroute-provider-breaker");
  if (typeof breakerHeader === "string" && breakerHeader.toLowerCase() === "open") return true;
  return /provider_circuit_open/i.test(errorText);
}

/**
 * Skip reason for a combo target already known-exhausted THIS request, or null if it is not.
 *
 * De-duplicates the byte-identical #1731 / #1731v2 pre-dispatch skip checks that BOTH combo
 * dispatchers run per target (handleComboChat's speculative loop and handleRoundRobinCombo's
 * rotation): a target whose `provider:connectionId` pair already had a connection-level error
 * (`exhaustedConnections`), or whose provider already signaled full quota exhaustion
 * (`exhaustedProviders`), is skipped for the rest of the request. Returns the log message the
 * caller emits with its OWN tag ("COMBO" / "COMBO-RR"); each caller keeps its own control flow
 * (return null vs continue) and its own fallbackCount bookkeeping.
 */
export function getExhaustedTargetSkipReason(
  target: ResolvedComboTarget,
  exhaustedProviders: ReadonlySet<string>,
  exhaustedConnections: ReadonlySet<string>
): string | null {
  const { provider, modelStr, connectionId } = target;
  // #1731v2: skip targets whose provider:connection pair had a connection-level error.
  if (provider && connectionId) {
    if (exhaustedConnections.has(`${provider}:${connectionId}`)) {
      return `Skipping ${modelStr} — connection ${connectionId} for provider ${provider} had connection error (#1731v2)`;
    }
  }
  // #1731: skip targets from a provider that already signaled full quota exhaustion this request.
  if (provider && exhaustedProviders.has(provider)) {
    return `Skipping ${modelStr} — provider ${provider} marked exhausted this request (#1731)`;
  }
  return null;
}

export const MAX_COMBO_DEPTH = 3;
// Absolute safety ceiling for operator-configured nesting depth. config.maxComboDepth
// can raise the default (3) up to this cap, or lower it, but never above — runaway
// nested-combo expansion is a real DoS/perf risk.
export const MAX_COMBO_DEPTH_HARD_CAP = 10;
export const MAX_FALLBACK_WAIT_MS = 5000;
export const MAX_GLOBAL_ATTEMPTS = 30;

/**
 * Clamp an operator-configured combo nesting depth (config.maxComboDepth) to a
 * safe integer in [1, MAX_COMBO_DEPTH_HARD_CAP]. Anything non-numeric, < 1, or
 * NaN falls back to the default MAX_COMBO_DEPTH so a bad config never disables
 * nesting or blows past the safety ceiling.
 */
export function clampComboDepth(value: unknown): number {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 1) return MAX_COMBO_DEPTH;
  return Math.min(n, MAX_COMBO_DEPTH_HARD_CAP);
}

/** Minimum recorded requests before the predictive-TTFT breaker trusts the average. */
export const PREDICTIVE_TTFT_MIN_SAMPLES = 5;

/**
 * Predictive-TTFT circuit-breaker decision: skip a target whose recent average
 * latency — measured over a statistically meaningful sample — exceeds the
 * configured ceiling, so the combo fails over before paying a slow first byte.
 * Returns false when disabled (ceiling <= 0), when there is no metric, or when
 * the sample is too small to trust.
 */
export function shouldSkipForPredictedTtft(
  metric: { requests?: number; avgLatencyMs?: number } | null | undefined,
  predictiveTtftMs: number
): boolean {
  if (!metric || !(predictiveTtftMs > 0)) return false;
  return (
    (metric.requests ?? 0) >= PREDICTIVE_TTFT_MIN_SAMPLES &&
    (metric.avgLatencyMs ?? 0) > predictiveTtftMs
  );
}

/**
 * Decide whether a failed combo target should record a whole-provider circuit-breaker
 * failure (#1731 / #2743 gap-d). This is the consumer side of `skipProviderBreaker`:
 *
 * - Stream-readiness failures (pre-flight zombie/ping probes) never count as provider
 *   failures — they are a connection-readiness signal, not an upstream outage.
 * - Only provider-level failure codes (408/429/5xx — see `isProviderFailureCode`) count.
 * - When the next combo target is on the SAME provider, don't trip the provider breaker:
 *   a different model on that provider may still succeed.
 * - G-02 / #2743: when the fallback result carries `skipProviderBreaker` (an embedded
 *   service supervisor outage signalled via `X-Omni-Fallback-Hint: connection_cooldown`)
 *   apply connection cooldown ONLY — never trip the whole-provider breaker.
 *
 * Pure predicate so the breaker decision is unit-testable without the full combo harness.
 */
export function shouldRecordProviderBreakerFailure(args: {
  isStreamReadinessFailure: boolean;
  status: number;
  sameProviderNext: boolean;
  skipProviderBreaker?: boolean;
}): boolean {
  return (
    !args.isStreamReadinessFailure &&
    isProviderFailureCode(args.status) &&
    !args.sameProviderNext &&
    !args.skipProviderBreaker
  );
}

export function resolveDelayMs(value: unknown, fallback: number): number {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0) return fallback;
  return numericValue;
}

export function comboModelNotFoundResponse(message: string) {
  return errorResponse(404, message);
}

export function getTargetProvider(modelStr: string, providerId?: string | null): string {
  const parsed = parseModel(modelStr);
  return providerId || parsed.provider || parsed.providerAlias || "unknown";
}

export function isStreamReadinessFailureErrorBody(errorBody: unknown): boolean {
  if (!errorBody || typeof errorBody !== "object") return false;
  const error = (errorBody as Record<string, unknown>).error;
  if (!error || typeof error !== "object") return false;
  const code = (error as Record<string, unknown>).code;
  return code === "STREAM_READINESS_TIMEOUT" || code === "STREAM_EARLY_EOF";
}

/**
 * A local per-API-key token-limit breach surfaces as a 429 tagged with
 * errorCode "TOKEN_LIMIT_EXCEEDED" (see chatCore.ts Tier 2 early return). This
 * is NOT an upstream rate limit, so the combo loop must not cool the shared
 * account/provider, must not add it to transientRateLimitedProviders, and must
 * not retry it transiently — it propagates to the client as a terminal 429.
 */
export function isTokenLimitBreachErrorBody(errorBody: unknown): boolean {
  if (!errorBody || typeof errorBody !== "object") return false;
  const error = (errorBody as Record<string, unknown>).error;
  if (!error || typeof error !== "object") return false;
  return (error as Record<string, unknown>).code === "TOKEN_LIMIT_EXCEEDED";
}

export function toRecordedTarget(target: ResolvedComboTarget) {
  return {
    executionKey: target.executionKey,
    stepId: target.stepId,
    provider: target.provider,
    providerId: target.providerId,
    connectionId: target.connectionId,
    label: target.label,
  };
}
