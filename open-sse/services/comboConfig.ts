/**
 * Combo Configuration Resolver
 *
 * Implements 3-layer cascade: Global Defaults → Provider Overrides → Per-Combo Config
 * Most specific wins.
 */

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
  manifestRouting: false,
  resetAwareSessionWeight: 0.35,
  resetAwareWeeklyWeight: 0.65,
  resetAwareTieBandPercent: 5,
  resetAwareExhaustionGuardPercent: 10,
  failoverBeforeRetry: true,
  maxSetRetries: 0,
  setRetryDelayMs: 2000,
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
