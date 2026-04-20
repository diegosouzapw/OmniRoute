import { DEFAULT_API_LIMITS, PROVIDER_PROFILES } from "@omniroute/open-sse/config/constants";

type JsonRecord = Record<string, unknown>;
type AuthCategory = "oauth" | "apikey";

export interface RequestQueueSettings {
  autoEnableApiKeyProviders: boolean;
  requestsPerMinute: number;
  minTimeBetweenRequestsMs: number;
  concurrentRequests: number;
  maxWaitMs: number;
}

export interface ConnectionCooldownProfileSettings {
  baseCooldownMs: number;
  useUpstreamRetryHints: boolean;
  maxBackoffSteps: number;
}

export interface ProviderBreakerProfileSettings {
  failureThreshold: number;
  resetTimeoutMs: number;
}

export interface WaitForCooldownSettings {
  enabled: boolean;
  maxRetries: number;
  maxRetryWaitSec: number;
  maxRetryWaitMs: number;
}

export interface ResilienceSettings {
  requestQueue: RequestQueueSettings;
  connectionCooldown: Record<AuthCategory, ConnectionCooldownProfileSettings>;
  providerBreaker: Record<AuthCategory, ProviderBreakerProfileSettings>;
  waitForCooldown: WaitForCooldownSettings;
}

export interface ResilienceSettingsPatch {
  requestQueue?: Partial<RequestQueueSettings>;
  connectionCooldown?: Partial<Record<AuthCategory, Partial<ConnectionCooldownProfileSettings>>>;
  providerBreaker?: Partial<Record<AuthCategory, Partial<ProviderBreakerProfileSettings>>>;
  waitForCooldown?: Partial<WaitForCooldownSettings>;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toInteger(
  value: unknown,
  fallback: number,
  options: { min?: number; max?: number } = {}
): number {
  const min = options.min ?? 0;
  const max = options.max ?? Number.MAX_SAFE_INTEGER;
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.trunc(parsed)));
}

function toBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

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
      resetTimeoutMs: PROVIDER_PROFILES.oauth.circuitBreakerReset,
    },
    apikey: {
      failureThreshold: PROVIDER_PROFILES.apikey.circuitBreakerThreshold,
      resetTimeoutMs: PROVIDER_PROFILES.apikey.circuitBreakerReset,
    },
  },
  waitForCooldown: {
    enabled: true,
    maxRetries: 3,
    maxRetryWaitSec: 30,
    maxRetryWaitMs: 30000,
  },
};

function normalizeRequestQueueSettings(
  next: unknown,
  fallback: RequestQueueSettings
): RequestQueueSettings {
  const record = asRecord(next);
  const requestsPerMinute = toInteger(record.requestsPerMinute, fallback.requestsPerMinute, {
    min: 1,
    max: 1_000_000,
  });
  const minTimeBetweenRequestsMs = toInteger(
    record.minTimeBetweenRequestsMs,
    fallback.minTimeBetweenRequestsMs,
    { min: 0, max: 60 * 60 * 1000 }
  );
  const concurrentRequests = toInteger(record.concurrentRequests, fallback.concurrentRequests, {
    min: 1,
    max: 10_000,
  });
  const maxWaitMs = toInteger(record.maxWaitMs, fallback.maxWaitMs, {
    min: 1,
    max: 24 * 60 * 60 * 1000,
  });

  return {
    autoEnableApiKeyProviders: toBoolean(
      record.autoEnableApiKeyProviders,
      fallback.autoEnableApiKeyProviders
    ),
    requestsPerMinute,
    minTimeBetweenRequestsMs,
    concurrentRequests,
    maxWaitMs,
  };
}

function normalizeConnectionCooldownProfile(
  next: unknown,
  fallback: ConnectionCooldownProfileSettings
): ConnectionCooldownProfileSettings {
  const record = asRecord(next);
  return {
    baseCooldownMs: toInteger(record.baseCooldownMs, fallback.baseCooldownMs, {
      min: 0,
      max: 24 * 60 * 60 * 1000,
    }),
    useUpstreamRetryHints: toBoolean(record.useUpstreamRetryHints, fallback.useUpstreamRetryHints),
    maxBackoffSteps: toInteger(record.maxBackoffSteps, fallback.maxBackoffSteps, {
      min: 0,
      max: 32,
    }),
  };
}

function normalizeLegacyConnectionCooldownProfile(
  next: unknown,
  fallback: ConnectionCooldownProfileSettings
): ConnectionCooldownProfileSettings {
  const record = asRecord(next);
  const transientCooldown = toInteger(record.transientCooldown, fallback.baseCooldownMs, {
    min: 0,
    max: 24 * 60 * 60 * 1000,
  });
  const legacyRateLimitCooldown = toInteger(record.rateLimitCooldown, transientCooldown, {
    min: 0,
    max: 24 * 60 * 60 * 1000,
  });
  const useUpstreamRetryHints =
    typeof record.rateLimitCooldown === "number"
      ? record.rateLimitCooldown === 0
      : fallback.useUpstreamRetryHints;

  return {
    baseCooldownMs: useUpstreamRetryHints
      ? transientCooldown
      : Math.max(transientCooldown, legacyRateLimitCooldown),
    useUpstreamRetryHints,
    maxBackoffSteps: toInteger(record.maxBackoffLevel, fallback.maxBackoffSteps, {
      min: 0,
      max: 32,
    }),
  };
}

function normalizeProviderBreakerProfile(
  next: unknown,
  fallback: ProviderBreakerProfileSettings
): ProviderBreakerProfileSettings {
  const record = asRecord(next);
  return {
    failureThreshold: toInteger(record.failureThreshold, fallback.failureThreshold, {
      min: 1,
      max: 1000,
    }),
    resetTimeoutMs: toInteger(record.resetTimeoutMs, fallback.resetTimeoutMs, {
      min: 1000,
      max: 24 * 60 * 60 * 1000,
    }),
  };
}

function normalizeWaitForCooldownSettings(
  next: unknown,
  fallback: WaitForCooldownSettings
): WaitForCooldownSettings {
  const record = asRecord(next);
  const maxRetryWaitSec = toInteger(record.maxRetryWaitSec, fallback.maxRetryWaitSec, {
    min: 0,
    max: 300,
  });
  const maxRetries = toInteger(record.maxRetries, fallback.maxRetries, { min: 0, max: 10 });
  const enabled =
    toBoolean(record.enabled, fallback.enabled) && maxRetries > 0 && maxRetryWaitSec > 0;

  return {
    enabled,
    maxRetries,
    maxRetryWaitSec,
    maxRetryWaitMs: maxRetryWaitSec * 1000,
  };
}

function buildLegacyFallback(settings: JsonRecord): ResilienceSettings {
  const profiles = asRecord(settings.providerProfiles);
  const defaults = asRecord(settings.rateLimitDefaults);

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
        circuitBreakerReset: settings.providerBreaker.oauth.resetTimeoutMs,
      },
      apikey: {
        transientCooldown: settings.connectionCooldown.apikey.baseCooldownMs,
        rateLimitCooldown: settings.connectionCooldown.apikey.useUpstreamRetryHints
          ? 0
          : settings.connectionCooldown.apikey.baseCooldownMs,
        maxBackoffLevel: settings.connectionCooldown.apikey.maxBackoffSteps,
        circuitBreakerThreshold: settings.providerBreaker.apikey.failureThreshold,
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
