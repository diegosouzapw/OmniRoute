/**
 * Entra ID access-token verification for the client API (/v1/*).
 */

import { createRemoteJWKSet, decodeProtectedHeader, jwtVerify, type JWTPayload } from "jose";
import { type EntraConfig, entraIssuer, entraJwksUri } from "./config";

export interface EntraIdentity {
  oid: string;
  tid: string;
  upn: string;
  displayName: string;
  groups: string[];
  /**
   * Entra omitted `groups` because the user is in >150 of them. The caller must
   * resolve the real membership or fail closed — it must NOT read this as
   * "the user has no groups".
   */
  hasGroupOverage: boolean;
  expiresAt: number;
}

export interface EntraVerifyFailure {
  ok: false;
  status: number;
  code: string;
  message: string;
}

export type EntraVerifyResult = { ok: true; identity: EntraIdentity } | EntraVerifyFailure;

const jwksClientsCache: Record<string, ReturnType<typeof createRemoteJWKSet>> = {};

function getJwksClient(jwksUri: string) {
  let client = jwksClientsCache[jwksUri];
  if (!client) {
    client = createRemoteJWKSet(new URL(jwksUri));
    jwksClientsCache[jwksUri] = client;
  }
  return client;
}

export function resetEntraJwksCache(): void {
  for (const key of Object.keys(jwksClientsCache)) delete jwksClientsCache[key];
}

/**
 * Cheap structural pre-filter — this is what keeps static API keys free.
 * `sk-{machineId}-{keyId}-{crc}` can never be three base64url segments, and
 * requiring RS*+kid additionally excludes OmniRoute's own HS256 tokens (the
 * dashboard session cookie, the cursor-cli passthrough).
 */
export function looksLikeEntraJwt(token: string): boolean {
  if (!token || typeof token !== "string") return false;
  const segments = token.split(".");
  if (segments.length !== 3) return false;
  if (segments.some((segment) => segment.length === 0)) return false;

  try {
    const header = decodeProtectedHeader(token);
    const alg = typeof header.alg === "string" ? header.alg : "";
    return alg.startsWith("RS") && typeof header.kid === "string" && header.kid.length > 0;
  } catch {
    return false;
  }
}

function claimString(payload: JWTPayload, name: string): string {
  const value = (payload as Record<string, unknown>)[name];
  return typeof value === "string" ? value : "";
}

function claimStringArray(payload: JWTPayload, name: string): string[] {
  const value = (payload as Record<string, unknown>)[name];
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}

/** A missing `groups` claim is ambiguous; `_claim_names` is the explicit signal. */
function detectGroupOverage(payload: JWTPayload): boolean {
  const claimNames = (payload as Record<string, unknown>)._claim_names;
  if (!claimNames || typeof claimNames !== "object") return false;
  return "groups" in (claimNames as Record<string, unknown>);
}

function errorCodeOf(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") return code;
  }
  return "";
}

/**
 * Transport failures must be 503, not 401: a JWKS fetch that times out means we
 * could not verify, not that the caller is unauthorized. Returning 401 there
 * tells every developer their login broke during an Entra blip.
 */
function classifyVerifyError(error: unknown): EntraVerifyFailure {
  const code = errorCodeOf(error);

  if (code === "ERR_JWKS_TIMEOUT" || code === "ERR_JWKS_MULTIPLE_MATCHING_KEYS") {
    return {
      ok: false,
      status: 503,
      code: "AUTH_SSO_UNAVAILABLE",
      message: "Identity provider unavailable — could not verify the token",
    };
  }

  if (code === "ERR_JWT_EXPIRED") {
    return { ok: false, status: 401, code: "AUTH_SSO_EXPIRED", message: "SSO token expired" };
  }

  if (code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" || code === "ERR_JWKS_NO_MATCHING_KEY") {
    return {
      ok: false,
      status: 401,
      code: "AUTH_SSO_INVALID",
      message: "SSO token signature is not valid",
    };
  }

  if (code === "ERR_JWT_CLAIM_VALIDATION_FAILED") {
    return {
      ok: false,
      status: 401,
      code: "AUTH_SSO_CLAIM",
      message: "SSO token was issued for a different issuer or audience",
    };
  }

  if (error instanceof TypeError) {
    return {
      ok: false,
      status: 503,
      code: "AUTH_SSO_UNAVAILABLE",
      message: "Identity provider unreachable — could not verify the token",
    };
  }

  return { ok: false, status: 401, code: "AUTH_SSO_INVALID", message: "SSO token is not valid" };
}

/**
 * The explicit `tid` check is not redundant with `aud`: a multi-tenant app
 * registration mints tokens carrying our audience for other tenants' users too.
 * Pinning `tid` is what makes this a single-tenant gate.
 */
export async function verifyEntraToken(
  token: string,
  config: EntraConfig
): Promise<EntraVerifyResult> {
  if (!config.enabled) {
    return {
      ok: false,
      status: 401,
      code: "AUTH_SSO_DISABLED",
      message: "SSO is not configured on this server",
    };
  }

  let payload: JWTPayload;
  try {
    const jwks = getJwksClient(entraJwksUri(config.tenantId, config.authorityHost));
    ({ payload } = await jwtVerify(token, jwks, {
      issuer: entraIssuer(config.tenantId, config.authorityHost),
      audience: config.audience,
      clockTolerance: 60,
    }));
  } catch (error) {
    return classifyVerifyError(error);
  }

  const tid = claimString(payload, "tid");
  if (tid !== config.tenantId) {
    return {
      ok: false,
      status: 401,
      code: "AUTH_SSO_TENANT",
      message: "SSO token was issued by a different tenant",
    };
  }

  const oid = claimString(payload, "oid");
  if (!oid) {
    return {
      ok: false,
      status: 401,
      code: "AUTH_SSO_NO_SUBJECT",
      message: "SSO token carries no object id",
    };
  }

  return {
    ok: true,
    identity: {
      oid,
      tid,
      upn:
        claimString(payload, "preferred_username") ||
        claimString(payload, "upn") ||
        claimString(payload, "email"),
      displayName: claimString(payload, "name"),
      groups: claimStringArray(payload, "groups"),
      hasGroupOverage: detectGroupOverage(payload),
      expiresAt: typeof payload.exp === "number" ? payload.exp : 0,
    },
  };
}
