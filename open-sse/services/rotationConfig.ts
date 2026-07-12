/**
 * Runtime rotation configuration.
 *
 * OmniRoute's account-fallback engine (accountFallback.ts) historically rotated accounts using
 * only hardcoded constants (COOLDOWN_MS / BACKOFF_CONFIG / ERROR_RULES): every retryable error
 * cooled the account down immediately, on a fixed exponential backoff, with no operator control.
 *
 * A front-end/orchestrator (e.g. the VibeProxy desktop app) that manages the SAME set of accounts
 * needs the backend to rotate according to the operator's own rules. This module exposes those
 * rules as a runtime config, sourced from environment variables (so a supervising process can set
 * them per launch) with an optional per-connection override (read from a connection's
 * `providerSpecificData.rotationOverrides`).
 *
 * Config surface (all optional — defaults preserve the pre-existing engine behavior):
 *   - master enable                            OMNIROUTE_ROTATION_ENABLED               (default true)
 *   - rate-limit reset/cooldown seconds        OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS (0 => engine default)
 *   - per-status fallback enable               OMNIROUTE_ROTATE_ON_{429,500,502,400}    (429/500/502 default true, 400 default false)
 *   - per-status threshold (errors in window)  OMNIROUTE_ROTATE_{status}_THRESHOLD      (default 1 => immediate, current behavior)
 *   - per-status window seconds                OMNIROUTE_ROTATE_{status}_WINDOW_SECONDS (default 120)
 *
 * Everything here is a pure function or a small in-memory sliding-window counter — no DB / IO on
 * the hot path — so it is cheap to consult per request and trivially unit-testable.
 */

import { RateLimitReason } from "../config/constants.ts";
import { COOLDOWN_MS } from "../config/errorConfig.ts";

export interface RotationErrorClassConfig {
  enabled: boolean;
  /** Number of errors of this class (within the window) required before an account is rotated. */
  threshold: number;
  /** Sliding window (ms) over which errors are counted. */
  windowMs: number;
}

export interface RotationConfig {
  /** Master switch. When false, none of the configurable error classes trigger account fallback. */
  enabled: boolean;
  /** Cooldown (ms) applied to a rate-limited account when the upstream gives no explicit hint. 0 => engine default. */
  rateLimitResetMs: number;
  /** Mirror of the front-end "don't tag as rate-limited without a reset time" preference. */
  disableTagWithoutReset: boolean;
  rateLimit429: RotationErrorClassConfig;
  serverError500: RotationErrorClassConfig;
  badGateway502: RotationErrorClassConfig;
  badRequest400: RotationErrorClassConfig;
}

const GLOBAL_KEY = "__omniroute_rotation_config__";
const DEFAULT_WINDOW_MS = 120_000;

function envBool(name: string, dflt: boolean): boolean {
  const raw = process.env[name];
  if (raw === undefined || raw === null || raw === "") return dflt;
  const v = raw.trim().toLowerCase();
  if (v === "true" || v === "1" || v === "yes" || v === "on") return true;
  if (v === "false" || v === "0" || v === "no" || v === "off") return false;
  return dflt;
}

function envInt(name: string, dflt: number, min = 0): number {
  const raw = process.env[name];
  if (raw === undefined || raw === null || raw === "") return dflt;
  const n = Number.parseInt(raw.trim(), 10);
  if (!Number.isFinite(n)) return dflt;
  return Math.max(min, n);
}

function buildClass(
  enableEnv: string,
  thresholdEnv: string,
  windowEnv: string,
  enableDefault: boolean
): RotationErrorClassConfig {
  return {
    enabled: envBool(enableEnv, enableDefault),
    threshold: envInt(thresholdEnv, 1, 1),
    windowMs: envInt(windowEnv, DEFAULT_WINDOW_MS / 1000, 1) * 1000,
  };
}

function buildFromEnv(): RotationConfig {
  return {
    enabled: envBool("OMNIROUTE_ROTATION_ENABLED", true),
    rateLimitResetMs: envInt("OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS", 0, 0) * 1000,
    disableTagWithoutReset: envBool("OMNIROUTE_ROTATION_DISABLE_TAG_WITHOUT_RESET", true),
    rateLimit429: buildClass(
      "OMNIROUTE_ROTATE_ON_429",
      "OMNIROUTE_ROTATE_429_THRESHOLD",
      "OMNIROUTE_ROTATE_429_WINDOW_SECONDS",
      true
    ),
    serverError500: buildClass(
      "OMNIROUTE_ROTATE_ON_500",
      "OMNIROUTE_ROTATE_500_THRESHOLD",
      "OMNIROUTE_ROTATE_500_WINDOW_SECONDS",
      true
    ),
    badGateway502: buildClass(
      "OMNIROUTE_ROTATE_ON_502",
      "OMNIROUTE_ROTATE_502_THRESHOLD",
      "OMNIROUTE_ROTATE_502_WINDOW_SECONDS",
      true
    ),
    badRequest400: buildClass(
      "OMNIROUTE_ROTATE_ON_400",
      "OMNIROUTE_ROTATE_400_THRESHOLD",
      "OMNIROUTE_ROTATE_400_WINDOW_SECONDS",
      false
    ),
  };
}

/**
 * The global (env-derived) rotation config, parsed once and cached on `globalThis` so the Next.js
 * app-route module graph and the startup graph share one instance (same pattern as the other
 * runtime-config singletons in this codebase).
 */
export function getGlobalRotationConfig(): RotationConfig {
  const g = globalThis as Record<string, unknown>;
  let cfg = g[GLOBAL_KEY] as RotationConfig | undefined;
  if (!cfg) {
    cfg = buildFromEnv();
    g[GLOBAL_KEY] = cfg;
  }
  return cfg;
}

/** Test/reset hook: clears the cached global config so the next read re-parses env. */
export function resetGlobalRotationConfigForTest(): void {
  const g = globalThis as Record<string, unknown>;
  delete g[GLOBAL_KEY];
  clearRotationErrorCounters();
}

function coerceBool(v: unknown, dflt: boolean): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return envBoolFromString(v, dflt);
  return dflt;
}

function envBoolFromString(v: string, dflt: boolean): boolean {
  const s = v.trim().toLowerCase();
  if (s === "true" || s === "1" || s === "yes" || s === "on") return true;
  if (s === "false" || s === "0" || s === "no" || s === "off") return false;
  return dflt;
}

function coerceInt(v: unknown, dflt: number, min = 0): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number.parseInt(v, 10) : NaN;
  if (!Number.isFinite(n)) return dflt;
  return Math.max(min, Math.floor(n));
}

/**
 * Merges a connection's per-connection overrides (from
 * `providerSpecificData.rotationOverrides`) over the global env config. Any absent override key
 * inherits the global value. Returns the global config unchanged when there are no overrides.
 */
export function resolveRotationConfig(overrides?: Record<string, unknown> | null): RotationConfig {
  const base = getGlobalRotationConfig();
  if (!overrides || typeof overrides !== "object") return base;

  const cls = (
    src: RotationErrorClassConfig,
    enableKey: string,
    thrKey: string,
    winKey: string
  ): RotationErrorClassConfig => ({
    enabled: enableKey in overrides ? coerceBool(overrides[enableKey], src.enabled) : src.enabled,
    threshold: thrKey in overrides ? coerceInt(overrides[thrKey], src.threshold, 1) : src.threshold,
    windowMs:
      winKey in overrides ? coerceInt(overrides[winKey], src.windowMs / 1000, 1) * 1000 : src.windowMs,
  });

  return {
    enabled: base.enabled,
    rateLimitResetMs:
      "rateLimitResetSeconds" in overrides
        ? coerceInt(overrides.rateLimitResetSeconds, base.rateLimitResetMs / 1000, 0) * 1000
        : base.rateLimitResetMs,
    disableTagWithoutReset: base.disableTagWithoutReset,
    rateLimit429: cls(base.rateLimit429, "rotateOn429", "error429Threshold", "error429WindowSeconds"),
    serverError500: cls(base.serverError500, "rotateOn500", "error500Threshold", "error500WindowSeconds"),
    badGateway502: cls(base.badGateway502, "rotateOn502", "error502Threshold", "error502WindowSeconds"),
    badRequest400: cls(base.badRequest400, "rotateOn400", "error400Threshold", "error400WindowSeconds"),
  };
}

/** Maps an HTTP status to its configured error class (or null for statuses this config doesn't gate). */
export function classForStatus(status: number, cfg: RotationConfig): RotationErrorClassConfig | null {
  if (status === 429) return cfg.rateLimit429;
  if (status === 502) return cfg.badGateway502;
  if (status >= 500 && status < 600) return cfg.serverError500;
  if (status === 400) return cfg.badRequest400;
  return null; // 401/402/403/404/… are not gated by this config
}

/**
 * True when the operator config should BLOCK account fallback for this status.
 *
 * This is RESTRICTIVE and applies only to the default-enabled classes (429 / 502 / other 5xx):
 * when the operator disables one, fallback for it is blocked (the error returns to the client
 * instead of rotating). 400 is NEVER restrictively blocked here — it is handled additively by
 * {@link shouldForceFallbackFor400}, so the engine's existing 400 behavior (a 400 carrying
 * rate-limit/quota text still falls over; a plain malformed 400 does not) is fully preserved.
 * Statuses this config does not gate (401/403/404/…) are never blocked.
 */
export function isFallbackBlockedForStatus(status: number, cfg: RotationConfig): boolean {
  const c = classForStatus(status, cfg);
  if (c === null) return false; // ungated statuses: engine default
  if (c === cfg.badRequest400) return false; // 400 is additive, never restrictively blocked
  if (!cfg.enabled) return true; // master off blocks the gated 429/500/502 classes
  return !c.enabled; // per-class disable
}

/** True when the operator opted IN to rotating on a 400 (bad request) — off by default. */
export function shouldForceFallbackFor400(status: number, cfg: RotationConfig): boolean {
  return status === 400 && cfg.enabled && cfg.badRequest400.enabled;
}

/** Rate-limit cooldown override (ms) or null to use the engine default. */
export function rateLimitCooldownOverrideMs(cfg: RotationConfig): number | null {
  return cfg.rateLimitResetMs > 0 ? cfg.rateLimitResetMs : null;
}

// ── Sliding-window per-key error counter (for threshold-based fallback) ──────────────────────

const COUNTER_KEY = "__omniroute_rotation_counters__";

function counters(): Map<string, number[]> {
  const g = globalThis as Record<string, unknown>;
  let m = g[COUNTER_KEY] as Map<string, number[]> | undefined;
  if (!m) {
    m = new Map<string, number[]>();
    g[COUNTER_KEY] = m;
  }
  return m;
}

export function clearRotationErrorCounters(): void {
  counters().clear();
}

/**
 * Records an error for (key, status) and returns true when the number of errors within the class
 * window reaches the configured threshold (i.e. the account should now be rotated). When the
 * threshold is 1 (default) this returns true on the first error — preserving the engine's
 * historical "rotate immediately" behavior. `nowMs` is injectable for tests.
 */
export function recordErrorAndCheckThreshold(
  key: string,
  status: number,
  cfg: RotationConfig,
  nowMs: number = Date.now()
): boolean {
  const cls = classForStatus(status, cfg);
  if (cls === null) return true; // not gated => defer to engine (treat as immediate)
  if (cls.threshold <= 1) return true; // immediate rotation (historical behavior)

  const bucketKey = `${key}::${status}`;
  const list = counters().get(bucketKey) ?? [];
  const windowStart = nowMs - cls.windowMs;
  const pruned = list.filter((ts) => ts >= windowStart);
  pruned.push(nowMs);
  counters().set(bucketKey, pruned);

  if (pruned.length >= cls.threshold) {
    counters().delete(bucketKey); // reset after reaching the threshold
    return true;
  }
  return false;
}

// ── accountFallback.ts integration helpers ──────────────────────────────────────────────────
// These encapsulate the "runtime rotation config" glue that `checkFallbackError` /
// `applyErrorState` (open-sse/services/accountFallback.ts, a size-frozen file) consult before
// falling back to their own hardcoded heuristics. Keeping the glue here (rather than inline in
// accountFallback.ts) keeps that file's line budget stable as this config surface grows.

export interface RotationGateDecision {
  shouldFallback: boolean;
  cooldownMs: number;
  baseCooldownMs?: number;
  newBackoffLevel?: number;
  reason?: string;
}

/**
 * Evaluates the runtime rotation config gate for a given status BEFORE the engine's own error
 * classification runs. Returns a decision that should short-circuit `checkFallbackError`
 * (block fallback, hold pending threshold/window, or force-fallback an opted-in 400), or `null`
 * when the engine should proceed with its normal heuristics.
 */
export function evaluateRotationGate(
  status: number,
  rotationCfg: RotationConfig,
  rotationKey?: string | null
): RotationGateDecision | null {
  if (isFallbackBlockedForStatus(status, rotationCfg)) {
    return { shouldFallback: false, cooldownMs: 0, reason: RateLimitReason.UNKNOWN };
  }
  if (
    rotationKey &&
    classForStatus(status, rotationCfg) &&
    !recordErrorAndCheckThreshold(rotationKey, status, rotationCfg)
  ) {
    return { shouldFallback: false, cooldownMs: 0, reason: RateLimitReason.UNKNOWN };
  }
  if (shouldForceFallbackFor400(status, rotationCfg)) {
    const overrideMs = rateLimitCooldownOverrideMs(rotationCfg);
    const cooldownMs = overrideMs ?? COOLDOWN_MS.rateLimit;
    return {
      shouldFallback: true,
      cooldownMs,
      baseCooldownMs: cooldownMs,
      newBackoffLevel: 0,
      reason: RateLimitReason.RATE_LIMIT_EXCEEDED,
    };
  }
  return null;
}

export interface RotationRateLimitFallback {
  shouldFallback: true;
  cooldownMs: number;
  baseCooldownMs: number;
  newBackoffLevel: 0;
  usedUpstreamRetryHint: false;
  reason: string;
}

/**
 * Operator-configured rate-limit cooldown override (no upstream retry hint available). Applies
 * only to the rate-limit reason so 5xx / capacity errors keep their scaled exponential backoff.
 * Returns `null` when the reason isn't rate-limit or no override is configured, in which case
 * the caller should fall through to its own scaled-backoff calculation.
 */
export function rotationRateLimitFallback(
  reason: string,
  rotationCfg: RotationConfig
): RotationRateLimitFallback | null {
  if (reason !== RateLimitReason.RATE_LIMIT_EXCEEDED) return null;
  const overrideMs = rateLimitCooldownOverrideMs(rotationCfg);
  if (overrideMs === null) return null;
  return {
    shouldFallback: true,
    cooldownMs: overrideMs,
    baseCooldownMs: overrideMs,
    newBackoffLevel: 0,
    usedUpstreamRetryHint: false,
    reason,
  };
}

/** Combines extractRotationContext + resolveRotationConfig + evaluateRotationGate for an account. */
export function gateFor(status: number, account?: unknown): RotationGateDecision | null {
  const { rotationOverrides, rotationKey } = extractRotationContext(account);
  return evaluateRotationGate(status, resolveRotationConfig(rotationOverrides), rotationKey);
}

/** Combines extractRotationContext + resolveRotationConfig + rotationRateLimitFallback for an account. */
export function overrideFor(reason: string, account?: unknown): RotationRateLimitFallback | null {
  const { rotationOverrides } = extractRotationContext(account);
  return rotationRateLimitFallback(reason, resolveRotationConfig(rotationOverrides));
}

/**
 * Extracts a connection's per-connection rotation overrides and rotation key from its account
 * state (`providerSpecificData.rotationOverrides` and `id`). Both are optional — absent =>
 * global env config / count-immediately. `account` is typed `unknown` here because callers pass
 * a generic `AccountState`-shaped value; this only does structural checks, no behavior change.
 */
export function extractRotationContext(account: unknown): {
  rotationOverrides: Record<string, unknown> | null;
  rotationKey: string | null;
} {
  const rec = account && typeof account === "object" ? (account as Record<string, unknown>) : null;
  const psd = rec ? rec["providerSpecificData"] : undefined;
  const rotationOverrides =
    psd &&
    typeof psd === "object" &&
    (psd as Record<string, unknown>).rotationOverrides &&
    typeof (psd as Record<string, unknown>).rotationOverrides === "object"
      ? ((psd as Record<string, unknown>).rotationOverrides as Record<string, unknown>)
      : null;
  const id = rec ? rec["id"] : undefined;
  const rotationKey = typeof id === "string" && id.length > 0 ? id : null;
  return { rotationOverrides, rotationKey };
}
