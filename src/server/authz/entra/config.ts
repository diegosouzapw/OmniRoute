/**
 * Entra ID SSO configuration for the client API (/v1/*).
 *
 * Separate from the dashboard's `oidc*` settings on purpose: those gate the
 * browser admin login with an `id_token` audienced to the client_id, while this
 * gates /v1/* with an access token audienced to a custom API scope. Sharing one
 * config would force each to accept the other's tokens.
 * See docs/security/ENTRA_SSO.md.
 */

import { getCachedSettings } from "@/lib/db/readCache";

/** Commercial cloud. Sovereign clouds override it via `entraAuthorityHost`. */
export const ENTRA_LOGIN_HOST = "https://login.microsoftonline.com";
export const GRAPH_HOST = "https://graph.microsoft.com";

function isLoopbackAuthority(url: URL): boolean {
  return url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]";
}

/**
 * Normalize an operator-supplied authority, falling back to the commercial
 * cloud. Plain http is refused except on loopback: the authority determines
 * which keys sign the tokens we trust, so downgrading it over the network would
 * let anyone on the path mint accepted identities.
 */
export function resolveAuthorityHost(raw: unknown): string {
  const candidate = typeof raw === "string" ? raw.trim().replace(/\/+$/, "") : "";
  if (!candidate) return ENTRA_LOGIN_HOST;

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return ENTRA_LOGIN_HOST;
  }

  if (url.protocol === "https:") return candidate;
  if (url.protocol === "http:" && isLoopbackAuthority(url)) return candidate;
  return ENTRA_LOGIN_HOST;
}

export interface EntraGroupMapping {
  groupId: string;
  keyGroupId: string;
}

export interface EntraConfig {
  enabled: boolean;
  /** Authority origin (commercial cloud by default; sovereign clouds differ). */
  authorityHost: string;
  tenantId: string;
  clientId: string;
  audience: string;
  groupMappings: EntraGroupMapping[];
  defaultKeyGroupId: string | null;
  graphFallbackEnabled: boolean;
  graphClientSecret: string;
}

export function entraIssuer(tenantId: string, authorityHost = ENTRA_LOGIN_HOST): string {
  return `${authorityHost}/${tenantId}/v2.0`;
}

export function entraJwksUri(tenantId: string, authorityHost = ENTRA_LOGIN_HOST): string {
  return `${authorityHost}/${tenantId}/discovery/v2.0/keys`;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asGroupMappings(value: unknown): EntraGroupMapping[] {
  if (!Array.isArray(value)) return [];
  const mappings: EntraGroupMapping[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const groupId = asString((entry as Record<string, unknown>).groupId);
    const keyGroupId = asString((entry as Record<string, unknown>).keyGroupId);
    if (groupId && keyGroupId) mappings.push({ groupId, keyGroupId });
  }
  return mappings;
}

/**
 * Whether the SSO branch should claim a request at all.
 *
 * Checked before the auth policy treats a JWT-shaped bearer as SSO, so that
 * with SSO off a client presenting its own unrelated JWT (VS Code Copilot sends
 * one even when the OmniRoute key travels in the URL path) keeps the exact
 * pre-SSO behavior instead of being hard-rejected.
 */
export async function isEntraSsoEnabled(): Promise<boolean> {
  try {
    return (await getEntraConfig()).enabled;
  } catch {
    // If we cannot tell whether SSO is on, do not claim the bearer: falling
    // through leaves the pre-SSO behavior intact rather than 500-ing auth.
    return false;
  }
}

/**
 * `enabled` requires every field needed to verify a token, not just the master
 * switch: a half-configured tenant must fall through to the API-key path that
 * still works rather than reject tokens it cannot validate.
 */
export async function getEntraConfig(): Promise<EntraConfig> {
  const settings = await getCachedSettings();

  const tenantId = asString(settings.entraTenantId);
  const audience = asString(settings.entraApiAudience);
  const defaultKeyGroupId = asString(settings.entraDefaultKeyGroupId);

  return {
    enabled: settings.entraSsoEnabled === true && tenantId !== "" && audience !== "",
    authorityHost: resolveAuthorityHost(settings.entraAuthorityHost),
    tenantId,
    clientId: asString(settings.entraClientId),
    audience,
    groupMappings: asGroupMappings(settings.entraGroupMappings),
    defaultKeyGroupId: defaultKeyGroupId === "" ? null : defaultKeyGroupId,
    graphFallbackEnabled: settings.entraGraphFallbackEnabled === true,
    graphClientSecret: asString(settings.entraGraphClientSecret),
  };
}
