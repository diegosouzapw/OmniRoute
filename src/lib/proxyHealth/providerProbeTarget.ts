/**
 * Resolve a per-provider reachability target for a proxy, instead of the generic PR #8411
 * probe target every proxy shares today (#8411 follow-up to the precedent set by #10420).
 *
 * A proxy is assigned to a provider, never to a specific connection, so only providers with a
 * stable, connection-independent target qualify: one `providerRegistry` entry carrying a
 * singular `baseUrl` (or `testKeyBaseUrl`). Providers with only `baseUrls[]` (array — a custom
 * `urlBuilder`, e.g. antigravity) or whose real target lives in a connection's
 * `providerSpecificData.baseUrl` (self-hosted) are not eligible: there is no single answer for
 * "the" target of such a provider, so they fall back to the generic probe.
 */

import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { normalizeBaseUrl, addModelsSuffix } from "@/lib/providers/validation/urlHelpers";
import { getProxyWhereUsed } from "@/lib/db/proxies";

type ProbeEnv = Record<string, string | undefined>;

/** Kill switch: `false` skips provider resolution entirely, restoring pre-PR behavior. */
export function isProviderTargetEnabled(env: ProbeEnv = process.env): boolean {
  return env.PROXY_HEALTH_USE_PROVIDER_TARGET !== "false";
}

/**
 * PURE: is `baseUrl` safe to probe blindly with `GET {baseUrl}/models`? `https://` only — no
 * registry entry uses plain `http://` today, and this probe carries no credential, so there is
 * no reason to widen the surface. No query string: a probe targets a sibling path, and a query
 * string on the base is a sign this isn't a plain host to append to (same guard as
 * `resolveWebCookieProbe`, `src/lib/providers/validation/webCookie.ts`).
 */
export function isProbeSafeBaseUrl(baseUrl: string): boolean {
  const normalized = normalizeBaseUrl(baseUrl);
  return Boolean(normalized) && /^https:\/\//i.test(normalized) && !normalized.includes("?");
}

/**
 * PURE: the `GET /models` URL for `providerId`, or null if it has no connection-independent
 * target.
 */
export function resolveEligibleProviderUrl(providerId: string): string | null {
  const entry = getRegistryEntry(providerId);
  if (!entry) return null;

  const baseUrl = normalizeBaseUrl(entry.testKeyBaseUrl || entry.baseUrl || "");
  if (!isProbeSafeBaseUrl(baseUrl)) return null;

  const modelsUrl = addModelsSuffix(baseUrl);
  return modelsUrl || null;
}

/**
 * Resolve the probe target for `proxyId` from its provider-scope assignments. `getProxyWhereUsed`
 * orders rows by `scope, scope_id` — alphabetically by provider id, not by assignment order —
 * so with several eligible providers assigned, the alphabetically-first one wins. First eligible
 * provider in that order, ineligible ones skipped. Returns null (generic target applies) when
 * the switch is off, the proxy has no provider assignment, none of its assigned providers are
 * eligible, or resolution itself fails for any reason — target resolution must never be the
 * reason a proxy silently drops out of a sweep or a "Test All" run.
 *
 * Only the registry-backed `proxy_assignments` table is read (`getProxyWhereUsed`). The legacy
 * per-provider proxy config (`/api/settings/proxy?level=provider&id=...`) has no proxy→provider
 * reverse lookup — building one would be new machinery, not reuse. A legacy-only assignment
 * degrades safely to the generic target, same as no assignment at all.
 */
export async function resolveProviderProbeTarget(
  proxyId: string,
  env: ProbeEnv = process.env
): Promise<string | null> {
  if (!isProviderTargetEnabled(env)) return null;

  try {
    const { assignments } = await getProxyWhereUsed(proxyId);
    for (const assignment of assignments) {
      if (assignment.scope !== "provider" || !assignment.scopeId) continue;
      const url = resolveEligibleProviderUrl(assignment.scopeId);
      if (url) return url;
    }
    return null;
  } catch {
    // Same contract as "no eligible provider": fall back rather than let a resolution error
    // propagate into testOneProxy/testSingleProxy, which would silently drop the proxy from
    // Promise.allSettled results instead of testing it against the generic target.
    return null;
  }
}
