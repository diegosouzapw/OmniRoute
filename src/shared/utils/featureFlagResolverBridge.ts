/**
 * Dependency-free bridge to the feature-flag resolver (#10692).
 *
 * Pure-data registries such as `open-sse/config/imageRegistry.ts` are reachable
 * from client bundles (media page, provider detail page), so they must never
 * statically import `@/shared/utils/featureFlags` — that module reads the SQLite
 * override table through `@/lib/db/core`. Instead, `featureFlags.ts` registers
 * its resolver here when it loads on the server (it is loaded by `@/lib/db/core`,
 * so every DB-backed request path has it), and the registries ask this bridge.
 *
 * The resolver lives on `globalThis` so duplicated module instances (route
 * bundles vs. instrumentation) still see the same registration.
 */
type FeatureFlagResolver = (key: string) => boolean;

const RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");

type ResolverStore = { [RESOLVER_KEY]?: FeatureFlagResolver };

export function registerFeatureFlagResolver(resolver: FeatureFlagResolver | null): void {
  const store = globalThis as ResolverStore;
  if (resolver) store[RESOLVER_KEY] = resolver;
  else delete store[RESOLVER_KEY];
}

function isTruthyFlagValue(value: string | undefined): boolean {
  return value === "true" || value === "1" || value === "yes";
}

/**
 * Resolve a boolean feature flag through the registered server resolver
 * (DB override > env > definition default). Without a registered resolver
 * (client bundle, or before the server resolver loaded) it falls back to the
 * environment variable only.
 */
export function resolveRegisteredFeatureFlag(key: string): boolean {
  const resolver = (globalThis as ResolverStore)[RESOLVER_KEY];
  if (resolver) return resolver(key);
  const env = typeof process !== "undefined" ? process.env?.[key] : undefined;
  return isTruthyFlagValue(env);
}
