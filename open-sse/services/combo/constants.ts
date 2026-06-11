/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, and context-relay strategies
 */

import {
  checkFallbackError,
  classifyErrorText,
  formatRetryAfter,
  getRuntimeProviderProfile,
  recordProviderFailure,
  isProviderFailureCode,
  isProviderExhaustedReason,
  type ProviderProfile,
} from "../accountFallback.ts";

import { errorResponse, unavailableResponse } from "../../utils/error.ts";

import { clamp01 } from "../../utils/number.ts";

import { parseModel } from "../model.ts";

import {
  calculateFactors,
  calculateScore,
  DEFAULT_WEIGHTS,
  type ProviderCandidate,
  type ScoringWeights,
} from "../autoCombo/scoring.ts";




// Status codes that should mark round-robin target semaphores as cooling down.
export const TRANSIENT_FOR_SEMAPHORE = [429, 502, 503, 504];


// Patterns that signal all accounts for a provider are rate-limited / exhausted.
// Used to detect 503 responses from handleNoCredentials so combo can fallback.
const ALL_ACCOUNTS_RATE_LIMITED_PATTERNS = [/unavailable/i, /service temporarily unavailable/i];



export function isAllAccountsRateLimitedResponse(
  status: number,
  contentType: string | null,
  errorText: string
): boolean {
  if (status !== 503) return false;
  if (!contentType?.includes("application/json")) return false;
  return ALL_ACCOUNTS_RATE_LIMITED_PATTERNS.some((p) => p.test(errorText));
}



export const MAX_COMBO_DEPTH = 3;


export const MAX_FALLBACK_WAIT_MS = 5000;


export const MAX_GLOBAL_ATTEMPTS = 30;



export function resolveDelayMs(value: unknown, fallback: number): number {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue < 0) return fallback;
  return numericValue;
}



export function comboModelNotFoundResponse(message: string) {
  return errorResponse(404, message);
}



// Bootstrap defaults from ClawRouter benchmark (used when no local latency history exists yet)
export const DEFAULT_MODEL_P95_MS: Record<string, number> = {
  "grok-4-fast-non-reasoning": 1143,
  "grok-4-1-fast-non-reasoning": 1244,
  "gemini-2.5-flash": 1238,
  "kimi-k2.5": 1646,
  "gpt-4o-mini": 2764,
  "claude-sonnet-4.6": 4000,
  "claude-opus-4.6": 6000,
  "deepseek-chat": 2000,
};


export const MIN_HISTORY_SAMPLES = 10;


// Assumed fraction of tokens that are output when blending input+output prices
// for auto-combo cost scoring. 0.4 = 40% output, 60% input.
// Matches the example in GitHub issue #1812 (e.g. o3-like model: $3 input/$15 output).
export const OUTPUT_TOKEN_RATIO = 0.4;


export const RESET_AWARE_SESSION_WINDOW_MS = 5 * 60 * 60 * 1000;


export const RESET_AWARE_WEEKLY_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;


export const RESET_AWARE_SESSION_REMAINING_WEIGHT = 0.45;


export const RESET_AWARE_SESSION_RESET_PRESSURE_WEIGHT = 0.55;


export const RESET_AWARE_WEEKLY_REMAINING_WEIGHT = 0.25;


export const RESET_AWARE_WEEKLY_RESET_PRESSURE_WEIGHT = 0.75;


export const RESET_AWARE_CONNECTION_CACHE_TTL_MS = 30_000;


export const RESET_AWARE_QUOTA_FETCH_CONCURRENCY = 5;


export const RESET_AWARE_DEFAULTS = {
  sessionWeight: 0.35,
  weeklyWeight: 0.65,
  tieBandPercent: 5,
  exhaustionGuardPercent: 10,
};


export const RESET_WINDOW_DEFAULT_TIE_BAND_MS = 60_000;



// Quota Share soft-policy deprioritization factor (B17).
// When a candidate has quotaSoftPenalty === true, its auto-combo score is
// multiplied by this factor so over-quota-soft keys are de-prioritized
// without being fully blocked (that is done by "hard" policy).
// Override via QUOTA_SOFT_DEPRIORITIZE_FACTOR env var (range 0..1, default 0.7).
export const QUOTA_SOFT_DEPRIORITIZE_FACTOR = Number(
  process.env.QUOTA_SOFT_DEPRIORITIZE_FACTOR ?? "0.7"
);

