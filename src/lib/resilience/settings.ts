import { DEFAULT_API_LIMITS, PROVIDER_PROFILES } from "@omniroute/open-sse/config/constants";

import type { JsonRecord, ResilienceSettings, ResilienceSettingsPatch } from "./settings/types";
import {
  asRecord,
  toInteger,
  resolveStreamRecoveryDefaults,
  normalizeLegacyConnectionCooldownProfile,
  normalizeRequestQueueSettings,
  normalizeConnectionCooldownProfile,
  normalizeProviderBreakerProfile,
  normalizeWaitForCooldownSettings,
  normalizeComboCooldownWaitSettings,
  normalizeQuotaShareConcurrencyLimitSettings,
  normalizeProviderCooldownSettings,
  normalizeQuotaPreflightSettings,
  normalizeStreamRecoverySettings,
} from "./settings/normalize";

// Re-export the settings shape (moved to ./settings/types) so this module's
// public API is unchanged.
export type {
  RequestQueueSettings,
  ConnectionCooldownProfileSettings,
  ProviderBreakerProfileSettings,
  WaitForCooldownSettings,
  ComboCooldownWaitSettings,
  QuotaShareConcurrencyLimitSettings,
  ProviderCooldownSettings,
  QuotaPreflightSettings,
  StreamRecoverySettings,
  ResilienceSettings,
  ResilienceSettingsPatch,
} from "./settings/types";

export const DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS = (() => {
  const parsed = Number(process.env.RATE_LIMIT_MAX_WAIT_MS || "120000");
  return Number.isFinite(parsed) && parsed > 0 ? Math.trunc(parsed) : 120000;
})();

export const DEFAULT_RESILIENCE_SETTINGS: ResilienceSettings = {
  requestQueue: {
    autoEnableApiKeyProviders: true,
    requestsPerMinute: DEFAULT_API_LIMITS.requestsPerMinute,
    minTimeBetweenRequestsMs: DEFAULT_API_LIMITS.minTimeBetweenRequests,
    concurrentRequests: DEFAULT_API_LIMITS.concurrentRequests,
    maxWaitMs: DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS,
  },
  connectionCooldown: {
    oauth: {
      baseCooldownMs: PROVIDER_PROFILES.oauth.transientCooldown,
      useUpstreamRetryHints: PROVIDER_PROFILES.oauth.rateLimitCooldown === 0,
      maxBackoffSteps: PROVIDER_PROFILES.oauth.maxBackoffLevel,
    },
    apikey: {
      baseCooldownMs: PROVIDER_PROFILES.apikey.transientCooldown,
      useUpstreamRetryHints: PROVIDER_PROFILES.apikey.rateLimitCooldown === 0,
      maxBackoffSteps: PROVIDER_PROFILES.apikey.maxBackoffLevel,
    },
  },
  providerBreaker: {
    oauth: {
      failureThreshold: PROVIDER_PROFILES.oauth.circuitBreakerThreshold,
      degradationThreshold: PROVIDER_PROFILES.oauth.degradationThreshold,
      resetTimeoutMs: PROVIDER_PROFILES.oauth.circuitBreakerReset,
    },
    apikey: {
      failureThreshold: PROVIDER_PROFILES.apikey.circuitBreakerThreshold,
      degradationThreshold: PROVIDER_PROFILES.apikey.degradationThreshold,
      resetTimeoutMs: PROVIDER_PROFILES.apikey.circuitBreakerReset,
    },
  },
  waitForCooldown: {
    enabled: true,
    maxRetries: 3,
    maxRetryWaitSec: 30,
    maxRetryWaitMs: 30000,
  },
  // Conservative defaults: wait at most 5s for a single short transient
  // cooldown, at most 2 redispatch cycles, never more than 8s total. Active only
  // for quota-share combos and only for transient (non quota_exhausted) reasons.
  comboCooldownWait: {
    enabled: true,
    maxWaitMs: 5000,
    maxAttempts: 2,
    budgetMs: 8000,
  },
  // FASE 2.1: serialize concurrent quota-share requests per connection when the
  // connection sets a max_concurrent cap, so a subscription account is not
  // flooded past its concurrency ceiling. Kill-switch only (default on); the cap
  // comes from each connection's max_concurrent.
  quotaShareConcurrencyLimit: {
    enabled: true,
  },
  providerCooldown: {
    minRetryCooldownMs: Number(process.env.PROVIDER_COOLDOWN_MIN_MS || "5000"),
    maxRetryCooldownMs: Number(process.env.PROVIDER_COOLDOWN_MAX_MS || "300000"),
    // Opt-in (default OFF): this global cross-request cooldown overlaps the
    // existing Connection Cooldown / Provider Circuit Breaker layers, so it is
    // disabled by default and must be explicitly enabled by the operator until
    // its interaction with those layers is validated in production.
    enabled: ["true", "1", "on"].includes(
      (process.env.PROVIDER_COOLDOWN_ENABLED || "").trim().toLowerCase()
    ),
  },
  quotaPreflight: {
    // Opt-in (default OFF): the auto-routing hard cutoff drops low-quota candidates
    // before scoring, overlapping the existing soft quota penalty + connection
    // cooldown, so it must be explicitly enabled by the operator until its
    // interaction with the scorer is validated in production.
    enabled: ["true", "1", "on"].includes(
      (process.env.QUOTA_PREFLIGHT_CUTOFF_ENABLED || "").trim().toLowerCase()
    ),
    // Remaining-% semantics. 2 = "stop when only 2% remaining" (= 98% used).
    // Uniform across all providers and windows; operators set per-window
    // overrides per connection via the Cutoff modal in Dashboard › Limits,
    // or per-(provider, window) globally via the providerWindowDefaults map
    // below (no factory seeds — keep behavior consistent across providers).
    defaultThresholdPercent: 2,
    warnThresholdPercent: 20,
    providerWindowDefaults: {},
  },
  streamRecovery: {
    // Opt-in (default OFF): the holdback that powers transparent early-retry adds
    // up to STREAM_RECOVERY.HOLDBACK_MS of time-to-first-token latency on every
    // streaming request, so it must be explicitly enabled by the operator.
    enabled: ["true", "1", "on"].includes(
      (process.env.STREAM_RECOVERY_ENABLED || "").trim().toLowerCase()
    ),
    // Opt-in (default OFF): mid-stream continuation re-requests after a post-commit cut.
    continueMidStream: ["true", "1", "on"].includes(
      (process.env.STREAM_RECOVERY_MIDSTREAM_ENABLED || "").trim().toLowerCase()
    ),
  },
};

function buildLegacyFallback(settings: JsonRecord): ResilienceSettings {
  const profiles = asRecord(settings.providerProfiles);
  const defaults = asRecord(settings.rateLimitDefaults);
  const streamRecoveryDefaults = resolveStreamRecoveryDefaults();

  const oauthLegacy = asRecord(profiles.oauth);
  const apikeyLegacy = asRecord(profiles.apikey);

  const waitMaxRetrySec = toInteger(
    settings.maxRetryIntervalSec,
    DEFAULT_RESILIENCE_SETTINGS.waitForCooldown.maxRetryWaitSec,
    { min: 0, max: 300 }
  );
  const waitMaxRetries = toInteger(
    settings.requestRetry,
    DEFAULT_RESILIENCE_SETTINGS.waitForCooldown.maxRetries,
    { min: 0, max: 10 }
  );

  return {
    requestQueue: {
      autoEnableApiKeyProviders: DEFAULT_RESILIENCE_SETTINGS.requestQueue.autoEnableApiKeyProviders,
      requestsPerMinute: toInteger(
        defaults.requestsPerMinute,
        DEFAULT_RESILIENCE_SETTINGS.requestQueue.requestsPerMinute,
        { min: 1, max: 1_000_000 }
      ),
      minTimeBetweenRequestsMs: toInteger(
        defaults.minTimeBetweenRequests,
        DEFAULT_RESILIENCE_SETTINGS.requestQueue.minTimeBetweenRequestsMs,
        { min: 0, max: 60 * 60 * 1000 }
      ),
      concurrentRequests: toInteger(
        defaults.concurrentRequests,
        DEFAULT_RESILIENCE_SETTINGS.requestQueue.concurrentRequests,
        { min: 1, max: 10_000 }
      ),
      maxWaitMs: DEFAULT_RESILIENCE_SETTINGS.requestQueue.maxWaitMs,
    },
    connectionCooldown: {
      oauth: normalizeLegacyConnectionCooldownProfile(
        oauthLegacy,
        DEFAULT_RESILIENCE_SETTINGS.connectionCooldown.oauth
      ),
      apikey: normalizeLegacyConnectionCooldownProfile(
        apikeyLegacy,
        DEFAULT_RESILIENCE_SETTINGS.connectionCooldown.apikey
      ),
    },
    providerBreaker: {
      oauth: {
        failureThreshold: toInteger(
          oauthLegacy.circuitBreakerThreshold,
          DEFAULT_RESILIENCE_SETTINGS.providerBreaker.oauth.failureThreshold,
          { min: 1, max: 1000 }
        ),
        degradationThreshold:
          DEFAULT_RESILIENCE_SETTINGS.providerBreaker.oauth.degradationThreshold,
        resetTimeoutMs: toInteger(
          oauthLegacy.circuitBreakerReset,
          DEFAULT_RESILIENCE_SETTINGS.providerBreaker.oauth.resetTimeoutMs,
          { min: 1000, max: 24 * 60 * 60 * 1000 }
        ),
      },
      apikey: {
        failureThreshold: toInteger(
          apikeyLegacy.circuitBreakerThreshold,
          DEFAULT_RESILIENCE_SETTINGS.providerBreaker.apikey.failureThreshold,
          { min: 1, max: 1000 }
        ),
        degradationThreshold:
          DEFAULT_RESILIENCE_SETTINGS.providerBreaker.apikey.degradationThreshold,
        resetTimeoutMs: toInteger(
          apikeyLegacy.circuitBreakerReset,
          DEFAULT_RESILIENCE_SETTINGS.providerBreaker.apikey.resetTimeoutMs,
          { min: 1000, max: 24 * 60 * 60 * 1000 }
        ),
      },
    },
    waitForCooldown: {
      enabled: waitMaxRetries > 0 && waitMaxRetrySec > 0,
      maxRetries: waitMaxRetries,
      maxRetryWaitSec: waitMaxRetrySec,
      maxRetryWaitMs: waitMaxRetrySec * 1000,
    },
    comboCooldownWait: DEFAULT_RESILIENCE_SETTINGS.comboCooldownWait,
    quotaShareConcurrencyLimit: DEFAULT_RESILIENCE_SETTINGS.quotaShareConcurrencyLimit,
    providerCooldown: DEFAULT_RESILIENCE_SETTINGS.providerCooldown,
    quotaPreflight: DEFAULT_RESILIENCE_SETTINGS.quotaPreflight,
    streamRecovery: streamRecoveryDefaults,
  };
}

export function resolveResilienceSettings(
  settings: Record<string, unknown> | null | undefined
): ResilienceSettings {
  const record = asRecord(settings);
  const current = asRecord(record.resilienceSettings);
  const fallback = buildLegacyFallback(record);

  return {
    requestQueue: normalizeRequestQueueSettings(current.requestQueue, fallback.requestQueue),
    connectionCooldown: {
      oauth: normalizeConnectionCooldownProfile(
        asRecord(current.connectionCooldown).oauth,
        fallback.connectionCooldown.oauth
      ),
      apikey: normalizeConnectionCooldownProfile(
        asRecord(current.connectionCooldown).apikey,
        fallback.connectionCooldown.apikey
      ),
    },
    providerBreaker: {
      oauth: normalizeProviderBreakerProfile(
        asRecord(current.providerBreaker).oauth,
        fallback.providerBreaker.oauth
      ),
      apikey: normalizeProviderBreakerProfile(
        asRecord(current.providerBreaker).apikey,
        fallback.providerBreaker.apikey
      ),
    },
    waitForCooldown: normalizeWaitForCooldownSettings(
      current.waitForCooldown,
      fallback.waitForCooldown
    ),
    comboCooldownWait: normalizeComboCooldownWaitSettings(
      current.comboCooldownWait,
      fallback.comboCooldownWait
    ),
    quotaShareConcurrencyLimit: normalizeQuotaShareConcurrencyLimitSettings(
      current.quotaShareConcurrencyLimit,
      fallback.quotaShareConcurrencyLimit
    ),
    providerCooldown: normalizeProviderCooldownSettings(
      current.providerCooldown,
      fallback.providerCooldown
    ),
    quotaPreflight: normalizeQuotaPreflightSettings(
      current.quotaPreflight,
      fallback.quotaPreflight
    ),
    streamRecovery: normalizeStreamRecoverySettings(
      current.streamRecovery,
      fallback.streamRecovery
    ),
  };
}

export function mergeResilienceSettings(
  current: ResilienceSettings,
  updates: ResilienceSettingsPatch
): ResilienceSettings {
  return {
    requestQueue: normalizeRequestQueueSettings(updates.requestQueue, current.requestQueue),
    connectionCooldown: {
      oauth: normalizeConnectionCooldownProfile(
        updates.connectionCooldown?.oauth,
        current.connectionCooldown.oauth
      ),
      apikey: normalizeConnectionCooldownProfile(
        updates.connectionCooldown?.apikey,
        current.connectionCooldown.apikey
      ),
    },
    providerBreaker: {
      oauth: normalizeProviderBreakerProfile(
        updates.providerBreaker?.oauth,
        current.providerBreaker.oauth
      ),
      apikey: normalizeProviderBreakerProfile(
        updates.providerBreaker?.apikey,
        current.providerBreaker.apikey
      ),
    },
    waitForCooldown: normalizeWaitForCooldownSettings(
      updates.waitForCooldown,
      current.waitForCooldown
    ),
    comboCooldownWait: normalizeComboCooldownWaitSettings(
      updates.comboCooldownWait,
      current.comboCooldownWait
    ),
    quotaShareConcurrencyLimit: normalizeQuotaShareConcurrencyLimitSettings(
      updates.quotaShareConcurrencyLimit,
      current.quotaShareConcurrencyLimit
    ),
    providerCooldown: normalizeProviderCooldownSettings(
      updates.providerCooldown,
      current.providerCooldown
    ),
    quotaPreflight: normalizeQuotaPreflightSettings(updates.quotaPreflight, current.quotaPreflight),
    streamRecovery: normalizeStreamRecoverySettings(updates.streamRecovery, current.streamRecovery),
  };
}

export function buildLegacyResilienceCompat(settings: ResilienceSettings) {
  return {
    profiles: {
      oauth: {
        transientCooldown: settings.connectionCooldown.oauth.baseCooldownMs,
        rateLimitCooldown: settings.connectionCooldown.oauth.useUpstreamRetryHints
          ? 0
          : settings.connectionCooldown.oauth.baseCooldownMs,
        maxBackoffLevel: settings.connectionCooldown.oauth.maxBackoffSteps,
        circuitBreakerThreshold: settings.providerBreaker.oauth.failureThreshold,
        degradationThreshold: settings.providerBreaker.oauth.degradationThreshold,
        circuitBreakerReset: settings.providerBreaker.oauth.resetTimeoutMs,
      },
      apikey: {
        transientCooldown: settings.connectionCooldown.apikey.baseCooldownMs,
        rateLimitCooldown: settings.connectionCooldown.apikey.useUpstreamRetryHints
          ? 0
          : settings.connectionCooldown.apikey.baseCooldownMs,
        maxBackoffLevel: settings.connectionCooldown.apikey.maxBackoffSteps,
        circuitBreakerThreshold: settings.providerBreaker.apikey.failureThreshold,
        degradationThreshold: settings.providerBreaker.apikey.degradationThreshold,
        circuitBreakerReset: settings.providerBreaker.apikey.resetTimeoutMs,
      },
    },
    defaults: {
      requestsPerMinute: settings.requestQueue.requestsPerMinute,
      minTimeBetweenRequests: settings.requestQueue.minTimeBetweenRequestsMs,
      concurrentRequests: settings.requestQueue.concurrentRequests,
    },
  };
}
