import { getFeatureFlagOverride } from "@/lib/db/featureFlags";
import { FEATURE_FLAG_DEFINITIONS, type FeatureFlagDefinition } from "@/shared/constants/featureFlagDefinitions";

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
    return { key: definition.key, effectiveValue: definition.defaultValue, source: "default", definition };
  });
}

// Backward-compatible wrappers
export function isCcCompatibleProviderEnabled(): boolean {
  return isFeatureFlagEnabled("ENABLE_CC_COMPATIBLE_PROVIDER");
}
