/**
 * Combo Configuration Resolver
 *
 * Implements 3-layer cascade: Global Defaults → Provider Overrides → Per-Combo Config
 * Most specific wins.
 */

import { MAX_TIMER_TIMEOUT_MS } from "../../src/shared/utils/runtimeTimeouts.ts";

/**
 * Maximum number of concurrent pre-screen checks (provider profile + availability)
 * when running parallel pre-screening for priority strategy combos.
 */
export const PRE_SCREEN_CONCURRENCY = 5;

const DEFAULT_COMBO_CONFIG = {
  strategy: "priority",
  maxRetries: 1,
  retryDelayMs: 2000,
  fallbackDelayMs: 0,
  concurrencyPerModel: 3, // max simultaneous requests per model (round-robin)
  queueTimeoutMs: 30000, // max wait time in semaphore queue (round-robin)
  handoffThreshold: 0.85,
  handoffModel: "",
  handoffProviders: ["codex"],
  maxMessagesForSummary: 30,
  maxComboDepth: 3,
  trackMetrics: true,
  reasoningTokenBufferEnabled: true,
  manifestRouting: false,
  // Complexity-aware auto routing (2026): when on, the auto router scores
  // candidates by how well their tier matches the request's classified
  // difficulty (feeds tierAffinity/specificityMatch). Opt-in — off by default.
  complexityAwareRouting: false,
  resetAwareSessionWeight: 0.35,
  resetAwareWeeklyWeight: 0.65,
  resetAwareTieBandPercent: 5,
  resetAwareExhaustionGuardPercent: 10,
  failoverBeforeRetry: true,
  maxSetRetries: 0,
  setRetryDelayMs: 2000,
  // Zero-latency optimizations are opt-in because some modes can race targets or
  // mutate fallback request bodies for lower tail latency.
  zeroLatencyOptimizationsEnabled: false,
  // Hedging (Speculative Execution) defaults
  hedging: false,
  hedgeDelayMs: 500,
  // Mid-Stream Fallback Compression defaults
  fallbackCompressionMode: "lite",
  fallbackCompressionThreshold: 1000,
  // Predictive TTFT Circuit Breaker defaults
  predictiveTtftMs: 0,
  // Pipeline defaults
  pipeline_enabled: false,
  task_detection: "pattern",
  max_reflection_loops: 1,
  skip_pipeline_for_tokens_under: 50,
  pipeline_fallback: "single-provider",
  resetAwareQuotaCacheTtlMs: 0,
  resetAwareQuotaCacheMaxStaleMs: 0,
  shadowRouting: {
    enabled: false,
    targets: [],
    sampleRate: 1,
    maxTargets: 2,
    timeoutMs: 30000,
  },
  evalRouting: {
    enabled: false,
    suiteIds: [],
    maxAgeHours: 720,
    minCases: 1,
    qualityWeight: 0.85,
    latencyWeight: 0.15,
    cacheTtlMs: 60000,
  },
};

const LEGACY_COMBO_RESILIENCE_KEYS = new Set([
  "timeoutMs",
  "healthCheckEnabled",
  "healthCheckTimeoutMs",
]);

type ComboConfigRecord = Record<string, unknown>;

type ComboConfigLike =
  | {
      config?: ComboConfigRecord | null;
    }
  | null
  | undefined;

type ComboSettingsLike =
  | {
      comboDefaults?: ComboConfigRecord | null;
      providerOverrides?: Record<string, ComboConfigRecord | null | undefined> | null;
    }
  | null
  | undefined;

function isRecord(value: unknown): value is ComboConfigRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizePositiveTimeoutMs(value: unknown): number {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0) return 0;
  return Math.min(Math.floor(numericValue), MAX_TIMER_TIMEOUT_MS);
}

export function resolveComboTargetTimeoutMs(
  config: Record<string, unknown> | null | undefined,
  upstreamTimeoutMs: number
): number {
  const inheritedTimeoutMs = normalizePositiveTimeoutMs(upstreamTimeoutMs);
  const configuredTimeoutMs = isRecord(config)
    ? normalizePositiveTimeoutMs(config.targetTimeoutMs)
    : 0;

  if (configuredTimeoutMs <= 0) return inheritedTimeoutMs;
  if (inheritedTimeoutMs <= 0) return configuredTimeoutMs;
  return Math.min(configuredTimeoutMs, inheritedTimeoutMs);
}

/**
 * Resolve effective config for a combo, applying cascade:
 *   DEFAULT_COMBO_CONFIG → settings.comboDefaults → settings.providerOverrides[provider] → combo.config
 *
 * @param {Object} combo - The combo object { config, ... }
 * @param {Object} settings - App settings from localDb
 * @param {string} [provider] - Optional provider to apply provider-level overrides
 * @returns {Object} Resolved config
 */
export function resolveComboConfig(
  combo: ComboConfigLike,
  settings: ComboSettingsLike,
  provider?: string | null
) {
  const global = settings?.comboDefaults || {};
  const providerOverride = provider ? settings?.providerOverrides?.[provider] || {} : {};
  const comboConfig = combo?.config || {};

  // Clean undefined values before spreading
  const clean = (obj: ComboConfigRecord) =>
    Object.fromEntries(
      Object.entries(obj).filter(
        ([key, value]) =>
          value !== undefined && value !== null && !LEGACY_COMBO_RESILIENCE_KEYS.has(key)
      )
    );

  const merged = {
    ...DEFAULT_COMBO_CONFIG,
    ...clean(global),
    ...clean(providerOverride),
    ...clean(comboConfig),
  };

  return {
    ...merged,
    shadowRouting: {
      ...DEFAULT_COMBO_CONFIG.shadowRouting,
      ...(isRecord(global.shadowRouting) ? clean(global.shadowRouting) : {}),
      ...(isRecord(providerOverride.shadowRouting) ? clean(providerOverride.shadowRouting) : {}),
      ...(isRecord(comboConfig.shadowRouting) ? clean(comboConfig.shadowRouting) : {}),
    },
    evalRouting: {
      ...DEFAULT_COMBO_CONFIG.evalRouting,
      ...(isRecord(global.evalRouting) ? clean(global.evalRouting) : {}),
      ...(isRecord(providerOverride.evalRouting) ? clean(providerOverride.evalRouting) : {}),
      ...(isRecord(comboConfig.evalRouting) ? clean(comboConfig.evalRouting) : {}),
    },
  };
}

/**
 * Get the default combo config (used when no overrides exist)
 */
export function getDefaultComboConfig() {
  return { ...DEFAULT_COMBO_CONFIG };
}
