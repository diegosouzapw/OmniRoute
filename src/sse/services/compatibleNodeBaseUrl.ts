/**
 * #13452: self-heal a `*-compatible-*` connection whose `providerSpecificData`
 * never received the write-time `baseUrl` copy (`POST /api/providers`'s
 * hydration branch, or the `PUT /api/provider-nodes/{id}` backfill loop are
 * the only two places that stamp it). A connection created any other way —
 * a direct DB insert, a row that predates the hydration logic, or a race
 * with node update/deletion — has no `providerSpecificData.baseUrl` at all
 * and, left unfixed, `DefaultExecutor.buildUrl()`/`BaseExecutor.buildUrl()`
 * silently defaulted to the REAL OpenAI/Anthropic API, shipping the
 * connection's own stored credential there as a Bearer/x-api-key token.
 *
 * Extracted out of `auth.ts` into its own module (`file-size-baseline.json`
 * freezes `auth.ts`'s line count).
 *
 * @module sse/services/compatibleNodeBaseUrl
 */

import { getCachedProviderNodes } from "@/lib/db/readCache";
import { selectProviderNodeForConnection } from "@/lib/db/providerNodeSelect";
import { isCompatibleProviderConnectionId } from "@/shared/utils/compatibleProviderId";
import { resolveAccountProxiesFromRegistry } from "./noAuthProxyResolution";

type JsonRecord = Record<string, unknown>;

/**
 * Composes both boundary-hydration steps a persisted connection's
 * `providerSpecificData` needs before it becomes request-ready credentials:
 * Proxy Pool by-id references (moved here from `auth.ts` verbatim — was
 * `hydrateAccountProxyReferences`), then the `*-compatible-*` baseUrl
 * self-heal below. Keep inline/legacy `accountProxies` entries untouched and
 * only incur a proxy-registry lookup when at least one by-id reference is
 * present.
 */
export async function hydrateConnectionProviderSpecificData(connection: {
  provider: string;
  providerSpecificData: JsonRecord;
}): Promise<JsonRecord> {
  const { providerSpecificData } = connection;
  const entries = providerSpecificData.accountProxies;
  const containsProxyReference =
    Array.isArray(entries) &&
    entries.some((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) return false;
      const proxyId = (entry as Record<string, unknown>).proxyId;
      return typeof proxyId === "string" && proxyId.trim().length > 0;
    });
  const proxyHydrated = containsProxyReference
    ? { ...providerSpecificData, accountProxies: await resolveAccountProxiesFromRegistry(entries) }
    : providerSpecificData;
  return hydrateCompatibleNodeBaseUrl(connection.provider, proxyHydrated);
}

/**
 * Re-joins `provider_nodes` (via the existing 5s-TTL cache, so this is not
 * an extra DB read on the hot path) and stamps the same fields the write-time
 * hydration branch stamps. Returns `providerSpecificData` unchanged when the
 * connection is not a compatible-node connection, already carries a
 * `baseUrl`, or no matching node can be resolved (the executor's fail-loud
 * fallback then reports the true "node missing" condition instead of
 * silently routing to a public third party).
 */
async function hydrateCompatibleNodeBaseUrl(
  provider: string,
  providerSpecificData: JsonRecord
): Promise<JsonRecord> {
  if (typeof providerSpecificData.baseUrl === "string" && providerSpecificData.baseUrl) {
    return providerSpecificData;
  }
  if (!isCompatibleProviderConnectionId(provider)) return providerSpecificData;

  try {
    const nodes = (await getCachedProviderNodes()) as JsonRecord[];
    const node = selectProviderNodeForConnection(provider, nodes);
    if (!node || typeof node.baseUrl !== "string" || !node.baseUrl) return providerSpecificData;

    return {
      ...providerSpecificData,
      prefix: providerSpecificData.prefix ?? node.prefix,
      apiType: providerSpecificData.apiType ?? node.apiType,
      baseUrl: node.baseUrl,
      nodeName: providerSpecificData.nodeName ?? node.name,
      ...(node.chatPath && !providerSpecificData.chatPath ? { chatPath: node.chatPath } : {}),
      ...(node.modelsPath && !providerSpecificData.modelsPath
        ? { modelsPath: node.modelsPath }
        : {}),
      ...(node.customHeaders && !providerSpecificData.customHeaders
        ? { customHeaders: node.customHeaders }
        : {}),
    };
  } catch {
    // Best-effort self-heal only — a transient DB/cache read failure must
    // not throw here; the executor's own fail-loud fallback is the backstop.
    return providerSpecificData;
  }
}
