/**
 * db/settings/noAuthProxyFallback.ts
 *
 * #6272 — no-auth providers (mimocode, opencode, ...) are dispatched with a single
 * hardcoded, provider-agnostic connectionId ("noauth" — SYNTHETIC_NOAUTH_CONNECTION_ID
 * in src/sse/services/auth.ts). No `provider_connections` row ever has id="noauth", so
 * `resolveProxyForConnection()` in ../settings.ts can never populate `connectionRecord`
 * for these providers, and its provider-level proxy lookup (Steps 6/8) only runs when
 * `connectionRecord` is present — a proxy assigned via Settings -> Providers -> mimocode
 * (or any other no-auth provider) was therefore silently unreachable.
 *
 * This is a best-effort fallback invoked only when `connectionRecord` could not be
 * found: it scans the known no-auth provider ids for a configured provider-level
 * proxy (registry first, then legacy `proxyConfig.providers`) and returns the first
 * match. It intentionally does not try to disambiguate which no-auth provider issued
 * the request (the shared connectionId carries no such information) — in practice at
 * most one no-auth provider has a provider-level proxy assigned at a time.
 */
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import { resolveProxyForScopeFromRegistry } from "../proxies";
import type { JsonRecord } from "./shared";

type ProxyValue = JsonRecord | string | null;
export type NoAuthProxyResolutionResult = {
  proxy: ProxyValue;
  level: string;
  levelId: string | null;
  source?: string;
};
type LegacyProviderProxyMap = Record<string, ProxyValue> | undefined | null;

// Mirrors settings.ts's withFamilyDefault: legacy proxyConfig entries predate the
// IPv6-only `family` directive, so default it to "auto" when missing.
function withFamilyDefault(value: ProxyValue): ProxyValue {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as JsonRecord;
    if (typeof record.family === "string") return record;
    return { ...record, family: "auto" };
  }
  return value;
}

async function resolveOneNoAuthProviderProxy(
  providerId: string,
  legacyProviders: LegacyProviderProxyMap
): Promise<NoAuthProxyResolutionResult | null> {
  const registryProvider = await resolveProxyForScopeFromRegistry("provider", providerId);
  if (registryProvider?.proxy) return registryProvider as NoAuthProxyResolutionResult;

  const legacyProxy = legacyProviders?.[providerId];
  if (legacyProxy) {
    return { proxy: withFamilyDefault(legacyProxy), level: "provider", levelId: providerId };
  }
  return null;
}

export async function resolveNoAuthSharedProviderProxy(
  legacyProviders: LegacyProviderProxyMap,
  providerId?: string
): Promise<NoAuthProxyResolutionResult | null> {
  if (providerId) return resolveOneNoAuthProviderProxy(providerId, legacyProviders);
  for (const providerId of Object.keys(NOAUTH_PROVIDERS)) {
    const resolved = await resolveOneNoAuthProviderProxy(providerId, legacyProviders);
    if (resolved) return resolved;
  }
  return null;
}
