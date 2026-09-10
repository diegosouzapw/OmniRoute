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
