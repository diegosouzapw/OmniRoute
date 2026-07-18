/**
 * resilience/settings/normalize — coercion + per-section normalizers (pure).
 *
 * Extracted verbatim from resilience/settings.ts. Pure functions: no DB, no
 * module state. Depends only on the feature-flag resolver and the settings
 * types. The host imports these for its resolve/merge/legacy orchestration.
 *
 * @module lib/resilience/settings/normalize
 */

import { resolveFeatureFlag } from "@/shared/utils/featureFlags";
import type {
  JsonRecord,
  RequestQueueSettings,
  ConnectionCooldownProfileSettings,
  ProviderBreakerProfileSettings,
  WaitForCooldownSettings,
  ComboCooldownWaitSettings,
  QuotaShareConcurrencyLimitSettings,
  ProviderCooldownSettings,
  QuotaPreflightSettings,
  StreamRecoverySettings,
} from "./types";

export function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function toInteger(
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

export function toBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

export function parseFeatureFlagBoolean(value: string, fallback: boolean): boolean {
  const normalized = value.trim().toLowerCase();
  if (normalized === "true" || normalized === "1" || normalized === "yes" || normalized === "on") {
    return true;
  }
  if (normalized === "false" || normalized === "0" || normalized === "no" || normalized === "off") {
    return false;
  }
  return fallback;
}

export function resolveBooleanFeatureFlag(key: string, fallback: boolean): boolean {
  try {
    return parseFeatureFlagBoolean(resolveFeatureFlag(key), fallback);
  } catch (error) {
    const envValue = process.env[key];
    if (typeof envValue === "string" && envValue.trim() !== "") {
      return parseFeatureFlagBoolean(envValue, fallback);
    }
    console.error(
      `[resilience] Failed to resolve ${key}, falling back to ${String(fallback)}:`,
      error instanceof Error ? error.message : error
    );
    return fallback;
  }
}

export function resolveStreamRecoveryDefaults(): StreamRecoverySettings {
  return {
    enabled: resolveBooleanFeatureFlag("STREAM_RECOVERY_ENABLED", false),
    continueMidStream: resolveBooleanFeatureFlag("STREAM_RECOVERY_MIDSTREAM_ENABLED", false),
  };
}

export function normalizeRequestQueueSettings(
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
  const maxQueueDepth = toInteger(record.maxQueueDepth, fallback.maxQueueDepth, {
    min: 0,
    max: 100_000,
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
    maxQueueDepth,
  };
}

export function normalizeConnectionCooldownProfile(
  next: unknown,
  fallback: ConnectionCooldownProfileSettings
): ConnectionCooldownProfileSettings {
  const record = asRecord(next);
  // useUpstream429BreakerHints uses a 3-state input contract:
  //   - boolean  → user override, store as-is
  //   - null     → explicit unset sentinel, drop key so the per-provider
  //                default in `providerHints.ts` resolves at runtime
  //   - omitted  → leave existing fallback value unchanged (partial-merge)
  // Never coerce via `toBoolean(value, fallback)` because that would
  // collapse the unset state.
  const hasHintsKey = Object.prototype.hasOwnProperty.call(record, "useUpstream429BreakerHints");
  const rawHints = record.useUpstream429BreakerHints;
  let useUpstream429BreakerHints: boolean | undefined;
  if (!hasHintsKey) {
    useUpstream429BreakerHints = fallback.useUpstream429BreakerHints;
  } else if (rawHints === null) {
    useUpstream429BreakerHints = undefined;
  } else if (typeof rawHints === "boolean") {
    useUpstream429BreakerHints = rawHints;
  } else {
    useUpstream429BreakerHints = fallback.useUpstream429BreakerHints;
  }
  const out: ConnectionCooldownProfileSettings = {
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
  // Only attach the key when defined — preserves omission across round-trips.
  if (useUpstream429BreakerHints !== undefined) {
    out.useUpstream429BreakerHints = useUpstream429BreakerHints;
  }
  return out;
}

export function normalizeLegacyConnectionCooldownProfile(
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

export function normalizeProviderBreakerProfile(
  next: unknown,
  fallback: ProviderBreakerProfileSettings
): ProviderBreakerProfileSettings {
  const record = asRecord(next);
  const failureThreshold = toInteger(record.failureThreshold, fallback.failureThreshold, {
    min: 1,
    max: 1000,
  });
  const degradationThreshold = Math.min(
    toInteger(record.degradationThreshold, fallback.degradationThreshold, {
      min: 1,
      max: 1000,
    }),
    failureThreshold <= 1 ? 1 : failureThreshold - 1
  );

  return {
    failureThreshold,
    degradationThreshold,
    resetTimeoutMs: toInteger(record.resetTimeoutMs, fallback.resetTimeoutMs, {
      min: 1000,
      max: 24 * 60 * 60 * 1000,
    }),
  };
}

export function normalizeProviderWindowDefaults(
  next: unknown,
  fallback: Record<string, Record<string, number>>
): Record<string, Record<string, number>> {
  // Accept either an explicit object or fall back. Drop providers/windows
  // whose values are not a valid 0-100 integer so a malformed setting can't
  // accidentally disable cutoffs entirely.
  const rawProviders = asRecord(next ?? fallback);
  const out: Record<string, Record<string, number>> = {};
  for (const [provider, windows] of Object.entries(rawProviders)) {
    if (!provider || typeof windows !== "object" || windows === null) continue;
    const windowMap: Record<string, number> = {};
    for (const [windowName, percent] of Object.entries(windows as Record<string, unknown>)) {
      if (!windowName) continue;
      const parsed =
        typeof percent === "number"
          ? percent
          : typeof percent === "string" && percent.trim() !== ""
            ? Number(percent)
            : NaN;
      if (Number.isFinite(parsed)) {
        const clamped = Math.min(100, Math.max(0, Math.trunc(parsed)));
        windowMap[windowName] = clamped;
      }
    }
    if (Object.keys(windowMap).length > 0) {
      out[provider] = windowMap;
    }
  }
  return out;
}

export function normalizeQuotaPreflightSettings(
  next: unknown,
  fallback: QuotaPreflightSettings
): QuotaPreflightSettings {
  const record = asRecord(next);
  // Remaining-% semantics: cutoff is the lowest acceptable remaining %, warn
  // is the higher "you're getting close" remaining %. So warn MUST be greater
  // than cutoff — otherwise the warn log would only fire after the request
  // is already blocked.
  const defaultThresholdPercent = toInteger(
    record.defaultThresholdPercent,
    fallback.defaultThresholdPercent,
    { min: 0, max: 99 }
  );
  const warnRaw = toInteger(record.warnThresholdPercent, fallback.warnThresholdPercent, {
    min: 0,
    max: 100,
  });
  const warnThresholdPercent =
    warnRaw <= defaultThresholdPercent ? Math.min(100, defaultThresholdPercent + 1) : warnRaw;
  const providerWindowDefaults = normalizeProviderWindowDefaults(
    record.providerWindowDefaults,
    fallback.providerWindowDefaults
  );
  const enabled = typeof record.enabled === "boolean" ? record.enabled : fallback.enabled;
  return { enabled, defaultThresholdPercent, warnThresholdPercent, providerWindowDefaults };
}

export function normalizeWaitForCooldownSettings(
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

export function normalizeComboCooldownWaitSettings(
  next: unknown,
  fallback: ComboCooldownWaitSettings
): ComboCooldownWaitSettings {
  const record = asRecord(next);
  // Hard ceiling of 30s on a single wait — this layer only ever exists for
  // SHORT transient cooldowns; anything longer should fall through to the
  // existing 429 crystallization (and the cross-request cooldown layers).
  const maxWaitMs = toInteger(record.maxWaitMs, fallback.maxWaitMs, { min: 0, max: 30000 });
  const maxAttempts = toInteger(record.maxAttempts, fallback.maxAttempts, { min: 0, max: 10 });
  // Budget can never be smaller than a single wait, otherwise no wait could
  // ever fire; floor it at maxWaitMs.
  const budgetMs = toInteger(record.budgetMs, fallback.budgetMs, {
    min: maxWaitMs,
    max: 5 * 60 * 1000,
  });
  const enabled = toBoolean(record.enabled, fallback.enabled) && maxWaitMs > 0 && maxAttempts > 0;

  return { enabled, maxWaitMs, maxAttempts, budgetMs };
}

export function normalizeQuotaShareConcurrencyLimitSettings(
  next: unknown,
  fallback: QuotaShareConcurrencyLimitSettings
): QuotaShareConcurrencyLimitSettings {
  const record = asRecord(next);
  return { enabled: toBoolean(record.enabled, fallback.enabled) };
}

export function normalizeProviderCooldownSettings(
  next: unknown,
  fallback: ProviderCooldownSettings
): ProviderCooldownSettings {
  const record = asRecord(next);
  const enabled = toBoolean(record.enabled, fallback.enabled);
  const minRetryCooldownMs = toInteger(record.minRetryCooldownMs, fallback.minRetryCooldownMs, {
    min: 0,
    max: 60 * 60 * 1000,
  });
  const maxRetryCooldownMs = toInteger(record.maxRetryCooldownMs, fallback.maxRetryCooldownMs, {
    min: minRetryCooldownMs,
    max: 24 * 60 * 60 * 1000,
  });

  return { enabled, minRetryCooldownMs, maxRetryCooldownMs };
}

export function normalizeStreamRecoverySettings(
  next: unknown,
  fallback: StreamRecoverySettings
): StreamRecoverySettings {
  const record = asRecord(next);
  return {
    enabled: toBoolean(record.enabled, fallback.enabled),
    continueMidStream: toBoolean(record.continueMidStream, fallback.continueMidStream),
  };
}
