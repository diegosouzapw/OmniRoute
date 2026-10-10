/**
 * Entra SSO request evaluation: verify → resolve groups → provision shadow key.
 *
 * The resolution cache is what makes this viable at organization scale.
 * Verifying a signature is cheap once jose holds the JWKS, but re-resolving
 * groups and reconciling key_group_members on every request would mean a SQLite
 * write per prompt per user. Caching the verdict by token hash collapses that
 * to roughly once per user per apiKeyHelper refresh.
 */

import { createHash } from "node:crypto";
import * as log from "@/sse/utils/logger";
import { getSsoShadowSecret, provisionSsoIdentity } from "@/lib/db/ssoIdentities";
import { getEntraConfig } from "./config";
import { resolveKeyGroups } from "./resolveGroups";
import { looksLikeEntraJwt, verifyEntraToken } from "./verifyToken";

export interface SsoAuthSuccess {
  ok: true;
  oid: string;
  upn: string;
  secret: string;
}

export interface SsoAuthFailure {
  ok: false;
  status: number;
  code: string;
  message: string;
}

export type SsoAuthResult = SsoAuthSuccess | SsoAuthFailure;

const RESOLUTION_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_ENTRIES = 5000;

interface CacheEntry {
  oid: string;
  upn: string;
  secret: string;
  expiresAt: number;
}

const resolutionCache = new Map<string, CacheEntry>();

export function resetSsoResolutionCache(): void {
  resolutionCache.clear();
}

function hashToken(token: string): string {
  // Cache key, not a password hash — the input is a signed JWT. Hashing keeps
  // raw bearer tokens from sitting in memory as Map keys.
  return createHash("sha256").update(token).digest("hex"); // nosemgrep: insufficient-password-hash
}

function pruneCache(): void {
  const now = Date.now();
  for (const [key, entry] of resolutionCache) {
    if (entry.expiresAt <= now) resolutionCache.delete(key);
  }
  while (resolutionCache.size > MAX_CACHE_ENTRIES) {
    const oldest = resolutionCache.keys().next();
    if (oldest.done) break;
    resolutionCache.delete(oldest.value);
  }
}

export function invalidateSsoResolution(oid: string): void {
  for (const [key, entry] of resolutionCache) {
    if (entry.oid === oid) resolutionCache.delete(key);
  }
}

export { looksLikeEntraJwt };

/**
 * Every failure path is closed — the caller must not fall through to the
 * API-key path. A token that presented itself as an Entra JWT and did not
 * verify is an authentication failure, not an unknown API key.
 */
export async function evaluateSsoAuth(token: string): Promise<SsoAuthResult> {
  const config = await getEntraConfig();
  if (!config.enabled) {
    return {
      ok: false,
      status: 401,
      code: "AUTH_SSO_DISABLED",
      message: "SSO is not configured on this server",
    };
  }

  const cacheKey = hashToken(token);
  const cached = resolutionCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    // Re-read rather than trusting the cached secret: it goes null the moment
    // the shadow key is deactivated, so disabling a user takes effect on the
    // next request instead of after the cache TTL.
    const secret = getSsoShadowSecret(cached.oid);
    if (!secret) {
      resolutionCache.delete(cacheKey);
      return {
        ok: false,
        status: 403,
        code: "AUTH_SSO_DEACTIVATED",
        message: "This SSO identity has been deactivated on the gateway",
      };
    }
    return { ok: true, oid: cached.oid, upn: cached.upn, secret };
  }

  const verified = await verifyEntraToken(token, config);
  if (!verified.ok) return verified;

  const groups = await resolveKeyGroups(verified.identity, config);
  if (!groups.ok) return groups;

  let secret: string | null;
  try {
    secret = await provisionSsoIdentity({
      oid: verified.identity.oid,
      tenantId: verified.identity.tid,
      upn: verified.identity.upn,
      displayName: verified.identity.displayName,
      keyGroupIds: groups.keyGroupIds,
    });
  } catch (error) {
    log.error("ENTRA_SSO", "Failed to provision shadow key for SSO user", {
      oid: verified.identity.oid,
      error,
    });
    return {
      ok: false,
      status: 503,
      code: "AUTH_SSO_PROVISION_FAILED",
      message: "Could not provision gateway access for this identity",
    };
  }

  if (!secret) {
    return {
      ok: false,
      status: 403,
      code: "AUTH_SSO_DEACTIVATED",
      message: "This SSO identity has been deactivated on the gateway",
    };
  }

  // Never cache past the token's own expiry, or an expired token would keep
  // authenticating for the remainder of the TTL.
  const tokenExpiryMs = verified.identity.expiresAt * 1000;
  const expiresAt = Math.min(Date.now() + RESOLUTION_TTL_MS, tokenExpiryMs || Infinity);

  resolutionCache.set(cacheKey, {
    oid: verified.identity.oid,
    upn: verified.identity.upn,
    secret,
    expiresAt,
  });
  pruneCache();

  return { ok: true, oid: verified.identity.oid, upn: verified.identity.upn, secret };
}
