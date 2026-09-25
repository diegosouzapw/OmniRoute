import { getFeatureFlagOverride } from "@/lib/db/featureFlags";
import {
  FEATURE_FLAG_DEFINITIONS,
  type FeatureFlagDefinition,
} from "@/shared/constants/featureFlagDefinitions";

/**
 * Resolve the effective value of a feature flag.
 * Priority: DB override > process.env > definition.defaultValue
 */
export function resolveFeatureFlag(key: string): string {
  const dbOverride = getFeatureFlagOverride(key);
  if (dbOverride !== undefined) return dbOverride;

  const envValue = process.env[key];
  if (envValue !== undefined && envValue !== "") return envValue;

  const definition = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === key);
  return definition?.defaultValue ?? "false";
}

/**
 * Check if a boolean feature flag is enabled.
 * Treats "true", "1", "yes" as enabled.
 */
export function isFeatureFlagEnabled(key: string): boolean {
  const value = resolveFeatureFlag(key);
  return value === "true" || value === "1" || value === "yes";
}

/**
 * Resolve all feature flags with their effective values and sources.
 */
export function resolveAllFeatureFlags(): Array<{
  key: string;
  effectiveValue: string;
  source: "db" | "env" | "default";
  definition: FeatureFlagDefinition;
}> {
  return FEATURE_FLAG_DEFINITIONS.map((definition) => {
    const dbOverride = getFeatureFlagOverride(definition.key);
    if (dbOverride !== undefined) {
      return { key: definition.key, effectiveValue: dbOverride, source: "db", definition };
    }
    const envValue = process.env[definition.key];
    if (envValue !== undefined && envValue !== "") {
      return { key: definition.key, effectiveValue: envValue, source: "env", definition };
    }
    return {
      key: definition.key,
      effectiveValue: definition.defaultValue,
      source: "default",
      definition,
    };
  });
}

// Backward-compatible wrappers
export function isRequireApiKeyEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("REQUIRE_API_KEY");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve REQUIRE_API_KEY, defaulting to required:",
      error instanceof Error ? error.message : error
    );
    return true;
  }
}

export function isCcCompatibleProviderEnabled(): boolean {
  return isFeatureFlagEnabled("ENABLE_CC_COMPATIBLE_PROVIDER");
}

/**
 * Context-window checks are fail-safe: an unavailable flag store must never
 * silently disable local request bounds.
 */
export function areContextWindowChecksDisabled(): boolean {
  try {
    return isFeatureFlagEnabled("DISABLE_CONTEXT_WINDOW_CHECKS");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve DISABLE_CONTEXT_WINDOW_CHECKS, keeping checks enabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

export function isApiKeyRevealEnabledFlag(): boolean {
  try {
    return isFeatureFlagEnabled("ALLOW_API_KEY_REVEAL");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve ALLOW_API_KEY_REVEAL, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

let lastResolvedMcpScopeEnforcement: boolean | undefined;

/**
 * MCP tool-call scope enforcement. Resolved per call so the Feature Flags toggle
 * (requiresRestart: false) applies without a restart. An unavailable flag store must never
 * silently drop the gate, so a failed read keeps the last value that did resolve, and falls
 * back to the environment variable the gate used before only if none ever did.
 */
export function isMcpScopeEnforcementEnabled(): boolean {
  try {
    lastResolvedMcpScopeEnforcement = isFeatureFlagEnabled("OMNIROUTE_MCP_ENFORCE_SCOPES");
    return lastResolvedMcpScopeEnforcement;
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve OMNIROUTE_MCP_ENFORCE_SCOPES, keeping the last known value:",
      error instanceof Error ? error.message : error
    );
    return lastResolvedMcpScopeEnforcement ?? process.env.OMNIROUTE_MCP_ENFORCE_SCOPES === "true";
  }
}

export function isModelCatalogNamesEnabled(): boolean {
  return isFeatureFlagEnabled("MODEL_CATALOG_INCLUDE_NAMES");
}

export type ModelsCatalogPrefixMode = "dual" | "alias" | "canonical";

export function getModelsCatalogPrefixMode(): ModelsCatalogPrefixMode {
  const value = resolveFeatureFlag("MODELS_CATALOG_PREFIX_MODE");
  if (value === "alias" || value === "canonical") return value;
  return "dual";
}

/**
 * No-thinking gateway alias master switch (`no-think/<provider>/<model>`).
 *
 * Fail-safe on: an unreadable flag store must not silently strip catalog
 * variants a client already has configured, nor stop suppressing reasoning for
 * a `no-think/…` id that was selected precisely to disable thinking. Matches the
 * definition default (`"true"`), so the only way the feature turns off is an
 * explicit operator override.
 */
export function isNoThinkingAliasEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("NO_THINKING_ALIAS_ENABLED");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve NO_THINKING_ALIAS_ENABLED, defaulting to enabled:",
      error instanceof Error ? error.message : error
    );
    return true;
  }
}

export function isDisableThinkingLevelVariantsEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

export function isArenaEloSyncEnabled(): boolean {
  return isFeatureFlagEnabled("ARENA_ELO_SYNC_ENABLED");
}

export function isControlPlaneProxyDirectFallbackEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

export function isNetworkRotationSharedEgressGuardEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("NETWORK_ROTATION_SHARED_EGRESS_GUARD");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve NETWORK_ROTATION_SHARED_EGRESS_GUARD, defaulting to enabled:",
      error instanceof Error ? error.message : error
    );
    return true;
  }
}

/**
 * Proxy refusal memory (#13578): pools and account rotation skip a proxy that just failed.
 * Opt-in; an unreadable flag store keeps the plain selection.
 */
export function isProxySkipRecentlyFailedEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("PROXY_SKIP_RECENTLY_FAILED");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve PROXY_SKIP_RECENTLY_FAILED, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * Rotation attribution (skipped-account log lines, per-account rotation state,
 * masked serving-account id and request correlation on proxy log entries).
 * Opt-in; an unreadable flag store keeps it hidden (fail-safe off).
 */
export function isRotationAttributionEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("ROTATION_ATTRIBUTION");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve ROTATION_ATTRIBUTION, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * Pool egress observation panel (#13581): read-only dashboard line under a proxy pool.
 * Opt-in; an unreadable flag store keeps it hidden.
 */
export function isPoolEgressObservationEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("PROXY_POOL_EGRESS_OBSERVATION");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve PROXY_POOL_EGRESS_OBSERVATION, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * Proxy health sweep (#13608): a target-refused probe resets the consecutive-failure streak.
 * Opt-in; an unreadable flag store keeps the neutral policy (#10654).
 */
export function isProxyHealthBlockedResetsStreakEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("PROXY_HEALTH_BLOCKED_RESETS_STREAK");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve PROXY_HEALTH_BLOCKED_RESETS_STREAK, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * OpenCode Responses first-byte stall rotation (#13484). Opt-in: when off, the stream
 * readiness timeout stays the only bound on a stalled Responses stream.
 * Fail closed: an unreadable flag store keeps the pre-flag behavior (disabled).
 */
export function isOpencodeResponsesStallRotationEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("OPENCODE_RESPONSES_STALL_ROTATION");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve OPENCODE_RESPONSES_STALL_ROTATION, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * OpenCode user_blocked 403/451 bounded rotation (#13498). Opt-in: when off, the refusal is
 * returned unchanged exactly as before.
 * Fail closed: an unreadable flag store keeps the pre-flag behavior (disabled).
 */
export function isOpencodeUserBlockedRotationEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("OPENCODE_USER_BLOCKED_ROTATION");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve OPENCODE_USER_BLOCKED_ROTATION, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * OpenCode transient-failure failover pause (#13615). Opt-in: when off, failover to the next
 * account stays immediate exactly as before.
 * Fail closed: an unreadable flag store keeps the pre-flag behavior (disabled).
 */
export function isOpencodeTransientFailoverBackoffEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("OPENCODE_TRANSIENT_FAILOVER_BACKOFF");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve OPENCODE_TRANSIENT_FAILOVER_BACKOFF, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * Mistral bare-401 bounded soft lockout (#13609). Opt-in: when off, a bare Mistral 401 parks
 * the connection as expired exactly as before.
 * Fail closed: an unreadable flag store keeps the pre-flag behavior (disabled).
 */
export function isMistralAmbiguous401SoftLockoutEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * OpenCode classified-429 early stop (#13657). Opt-in: when off, every 429 rotates to the
 * next account exactly as before.
 * Fail closed: an unreadable flag store keeps the pre-flag behavior (disabled).
 */
export function isOpencodeRateLimited429EarlyStopEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("OPENCODE_RATE_LIMITED_429_EARLY_STOP");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve OPENCODE_RATE_LIMITED_429_EARLY_STOP, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * Antigravity account lease (re-land of #10011). Opt-in: when off, Antigravity
 * account selection and the dispatch path behave exactly as before — no
 * reservation is taken and no POOL_BUSY response can be produced.
 * Fail closed: an unreadable flag store keeps the pre-flag behavior (disabled).
 */
export function isAntigravityAccountLeaseEnabled(
  reader: (key: string) => boolean = isFeatureFlagEnabled
): boolean {
  try {
    return reader("ANTIGRAVITY_ACCOUNT_LEASE_ENABLED");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve ANTIGRAVITY_ACCOUNT_LEASE_ENABLED, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * OpenCode 429 park-and-resume. Opt-in: when off, every 429 rotates to the
 * next account exactly as before.
 * Fail closed: an unreadable flag store keeps the pre-flag behavior (disabled).
 */
export function isOpencodeParkAndResumeEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("OPENCODE_PARK_AND_RESUME");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve OPENCODE_PARK_AND_RESUME, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * Stream readiness stall retry. Opt-in: when off, a stalled first body fails
 * the request without a retry. Fail closed: an unreadable flag store keeps
 * the pre-flag behavior (disabled).
 */
export function isStreamReadinessStallRetryEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("STREAM_READINESS_STALL_RETRY");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve STREAM_READINESS_STALL_RETRY, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

export function isServerOwnedToolLoopEnabled(
  reader: (key: string) => boolean = isFeatureFlagEnabled
): boolean {
  try {
    return reader("SERVER_OWNED_TOOL_LOOP_ENABLED");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve SERVER_OWNED_TOOL_LOOP_ENABLED, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/**
 * DB startup health check deferral (#13717). Opt-in: off keeps the pre-existing
 * behavior of blocking getDbInstance() on the startup integrity check, so a
 * corrupt database is still caught before the server serves its first request.
 * Fail closed: an unreadable flag store keeps the pre-flag (blocking) behavior.
 */
export function isDbHealthcheckStartupDeferredEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED");
  } catch (error) {
    console.error(
      "[featureFlags] Failed to resolve DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}
