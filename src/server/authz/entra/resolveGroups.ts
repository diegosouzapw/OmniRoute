/**
 * Entra security group → OmniRoute key group resolution.
 */

import * as log from "@/sse/utils/logger";
import { type EntraConfig, GRAPH_HOST } from "./config";
import type { EntraIdentity } from "./verifyToken";

export interface GroupResolutionSuccess {
  ok: true;
  keyGroupIds: string[];
  usedDefault: boolean;
}

export interface GroupResolutionFailure {
  ok: false;
  status: number;
  code: string;
  message: string;
}

export type GroupResolutionResult = GroupResolutionSuccess | GroupResolutionFailure;

const GRAPH_CACHE_TTL_MS = 5 * 60 * 1000;
const GRAPH_TIMEOUT_MS = 10_000;

interface GraphCacheEntry {
  groups: string[];
  expiresAt: number;
}

const graphGroupsCache = new Map<string, GraphCacheEntry>();

export function resetEntraGroupCache(): void {
  graphGroupsCache.clear();
}

/**
 * Not cached across calls: the per-user result already is, so this runs at most
 * once per cache miss, and holding an app-level Graph token in memory for its
 * full hour is a worse tradeoff than re-minting one.
 */
async function getGraphAppToken(config: EntraConfig): Promise<string | null> {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: config.clientId,
    client_secret: config.graphClientSecret,
    scope: `${GRAPH_HOST}/.default`,
  });

  try {
    const response = await fetch(`${config.authorityHost}/${config.tenantId}/oauth2/v2.0/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: AbortSignal.timeout(GRAPH_TIMEOUT_MS),
    });
    if (!response.ok) {
      log.error("ENTRA_SSO", "Graph client-credentials token request failed", {
        status: response.status,
      });
      return null;
    }
    const data: unknown = await response.json();
    if (!data || typeof data !== "object") return null;
    const token = (data as Record<string, unknown>).access_token;
    return typeof token === "string" && token.length > 0 ? token : null;
  } catch (error) {
    log.error("ENTRA_SSO", "Graph client-credentials token request errored", { error });
    return null;
  }
}

async function fetchGroupsFromGraph(oid: string, config: EntraConfig): Promise<string[] | null> {
  const cached = graphGroupsCache.get(oid);
  if (cached && cached.expiresAt > Date.now()) return cached.groups;

  const appToken = await getGraphAppToken(config);
  if (!appToken) return null;

  try {
    const response = await fetch(
      `${GRAPH_HOST}/v1.0/users/${encodeURIComponent(oid)}/getMemberGroups`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${appToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ securityEnabledOnly: true }),
        signal: AbortSignal.timeout(GRAPH_TIMEOUT_MS),
      }
    );
    if (!response.ok) {
      log.error("ENTRA_SSO", "Graph getMemberGroups failed", { status: response.status });
      return null;
    }
    const data: unknown = await response.json();
    if (!data || typeof data !== "object") return null;
    const value = (data as Record<string, unknown>).value;
    if (!Array.isArray(value)) return null;

    const groups = value.filter(
      (entry): entry is string => typeof entry === "string" && entry.length > 0
    );
    graphGroupsCache.set(oid, { groups, expiresAt: Date.now() + GRAPH_CACHE_TTL_MS });
    return groups;
  } catch (error) {
    log.error("ENTRA_SSO", "Graph getMemberGroups errored", { error });
    return null;
  }
}

function mapToKeyGroups(groupIds: string[], config: EntraConfig): string[] {
  if (groupIds.length === 0) return [];
  const wanted = new Set(groupIds.map((id) => id.toLowerCase()));
  const keyGroupIds = new Set<string>();
  for (const mapping of config.groupMappings) {
    if (wanted.has(mapping.groupId.toLowerCase())) keyGroupIds.add(mapping.keyGroupId);
  }
  return [...keyGroupIds];
}

/**
 * A user whose token hit claim overage is never treated as group-less: without
 * the Graph fallback we genuinely do not know their membership, and granting
 * them the default key group would hand an unintended policy to whoever is in
 * the most groups — typically long-tenured staff with the broadest access.
 */
export async function resolveKeyGroups(
  identity: EntraIdentity,
  config: EntraConfig
): Promise<GroupResolutionResult> {
  let groupIds = identity.groups;

  if (identity.hasGroupOverage) {
    if (!config.graphFallbackEnabled) {
      return {
        ok: false,
        status: 403,
        code: "AUTH_SSO_GROUP_OVERAGE",
        message:
          "Your account belongs to too many groups for them to fit in the token. " +
          "Ask an administrator to enable the Microsoft Graph group fallback.",
      };
    }

    const fromGraph = await fetchGroupsFromGraph(identity.oid, config);
    if (fromGraph === null) {
      return {
        ok: false,
        status: 503,
        code: "AUTH_SSO_GRAPH_UNAVAILABLE",
        message: "Could not resolve group membership from Microsoft Graph",
      };
    }
    groupIds = fromGraph;
  }

  const keyGroupIds = mapToKeyGroups(groupIds, config);
  if (keyGroupIds.length > 0) {
    return { ok: true, keyGroupIds, usedDefault: false };
  }

  if (config.defaultKeyGroupId) {
    return { ok: true, keyGroupIds: [config.defaultKeyGroupId], usedDefault: true };
  }

  return {
    ok: false,
    status: 403,
    code: "AUTH_SSO_NO_GROUP",
    message: "Your account is not a member of any group authorized for this gateway",
  };
}
