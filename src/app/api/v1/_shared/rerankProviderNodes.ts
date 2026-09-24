/**
 * Provider-node selection for `POST /v1/rerank`.
 *
 * Mirrors `audioProviderNodes.ts`: the pure selection step takes the node rows plus an
 * explicit `allowRemote` decision so the policy is directly testable, and the thin
 * `loadRerankProviderNodes()` wrapper resolves the DB rows and the feature flag.
 *
 * Eligibility (see `@/shared/network/providerNodeHost`):
 *  - loopback nodes (localhost / 127.0.0.1 / 172.16.0.0/12) are always eligible — unchanged
 *    from the original hardcoded filter;
 *  - remote nodes (a LAN box, a Tailscale peer, a public host) are eligible only when the
 *    operator opted in via `RERANK_REMOTE_PROVIDER_NODES` (default OFF, like
 *    `AUDIO_REMOTE_PROVIDER_NODES`, #3963) AND the base URL passes the provider outbound
 *    URL policy (`getProviderOutboundGuard()`, #5066 / #9123) — so cloud-metadata hosts
 *    are never routed to, and strict `public-only` deployments never route to private hosts.
 */

import { getCachedProviderNodes } from "@/lib/db/readCache";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { isEligibleProviderNodeHost } from "@/shared/network/providerNodeHost";

/** Feature flag gating remote (non-loopback) rerank provider nodes. Default OFF. */
export const RERANK_REMOTE_NODES_FLAG = "RERANK_REMOTE_PROVIDER_NODES";

export interface RerankProviderNodeRow {
  id?: string;
  prefix?: string | null;
  baseUrl?: string | null;
  apiType?: string | null;
}

export interface DynamicRerankProvider {
  id: string;
  baseUrl: string;
  authType: "apikey";
  authHeader: "bearer";
  /** Full provider connection id for credential lookup. */
  providerId: string;
}

/**
 * Build a dynamic rerank provider from a provider_node. OpenAI-compatible backends
 * (oMLX, vLLM, Infinity, TEI behind a gateway, …) expose `/v1/rerank` under the same base
 * URL as chat/embeddings.
 */
export function buildDynamicRerankProvider(node: RerankProviderNodeRow): DynamicRerankProvider {
  if (!node.prefix || !node.baseUrl || !node.id) {
    throw new Error("Invalid provider_node: missing id, prefix or baseUrl");
  }
  // Strip trailing /v1 if present — we'll add /rerank
  let base = node.baseUrl.replace(/\/+$/, "");
  if (base.endsWith("/v1")) base = base.slice(0, -3);
  return {
    id: node.prefix,
    baseUrl: `${base}/v1/rerank`,
    authType: "apikey",
    authHeader: "bearer",
    providerId: node.id,
  };
}

/**
 * Pure selection step — no DB, no flag lookup.
 *
 * @param nodes       provider_node rows
 * @param allowRemote whether non-loopback nodes are eligible (feature-flagged)
 */
export function selectRerankProviderNodes(
  nodes: RerankProviderNodeRow[],
  { allowRemote }: { allowRemote: boolean }
): DynamicRerankProvider[] {
  const providers: DynamicRerankProvider[] = [];
  for (const node of nodes) {
    if (!node?.baseUrl) continue;
    if (!isEligibleProviderNodeHost(node.baseUrl, { allowRemote })) continue;
    try {
      providers.push(buildDynamicRerankProvider(node));
    } catch {
      // Malformed row — skip, never fail the request.
    }
  }
  return providers;
}

/** Resolve the eligible rerank provider nodes for the current request. */
export async function loadRerankProviderNodes(): Promise<DynamicRerankProvider[]> {
  let nodes: RerankProviderNodeRow[] = [];
  try {
    const rows = await getCachedProviderNodes();
    // The cached row type is not assignable to RerankProviderNodeRow, so a predicate
    // on it is a TS2677 (#13866). Narrow to a non-null object first, then project.
    nodes = (Array.isArray(rows) ? rows : [])
      .filter((n): n is NonNullable<typeof n> => n !== null && typeof n === "object")
      .map((n) => n as unknown as RerankProviderNodeRow);
  } catch {
    // Non-critical — continue with cloud providers only
    return [];
  }
  let allowRemote = false;
  try {
    allowRemote = isFeatureFlagEnabled(RERANK_REMOTE_NODES_FLAG);
  } catch {
    allowRemote = false;
  }
  return selectRerankProviderNodes(nodes, { allowRemote });
}
