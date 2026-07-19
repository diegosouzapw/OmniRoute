/**
 * Grok Build OAuth Provider — Browser PKCE Flow + Import Token Flow
 *
 * Two ways to connect, merged under one provider entry (#7013):
 *   - Browser login: PKCE authorization-code flow against auth.x.ai, reusing
 *     the same public client id as the sibling xai-oauth provider (see
 *     grok-cli-oauth.ts / GROK_BUILD_OAUTH_CONFIG). Recommended, one click.
 *   - Import token: user pastes the entire auth.json from ~/.grok/auth.json
 *     or just the JWT access token string. Kept as a fallback for headless /
 *     remote installs where a loopback callback can't be reached.
 * Both paths converge on mapTokens() below and support automatic refresh
 * using the refresh_token (open-sse token-refresh reads config.tokenUrl
 * generically, independent of which flow acquired the tokens).
 *
 * Note: the device-code flow introduced by #7358 ("align with official Grok
 * Build client") is intentionally NOT wired into this provider's flowType —
 * DEVICE_CODE_PROVIDERS/PKCE dispatch (OAuthModal.tsx, route.ts) route
 * grok-cli through the browser/import paths below instead. GROK_CLI_CONFIG
 * (device-code endpoints) is kept only for the preferredScope key lookup in
 * extractTokenAndRefresh() when parsing a pasted auth.json.
 */

import { GROK_BUILD_OAUTH_ISSUER } from "@omniroute/open-sse/config/grokBuild.ts";
import { GROK_CLI_CONFIG, GROK_BUILD_OAUTH_CONFIG } from "../constants/oauth";
import {
  buildGrokBuildAuthUrl,
  exchangeGrokBuildToken,
  isGrokBuildBrowserTokens,
  mapGrokBuildBrowserTokens,
} from "./grok-cli-oauth";

interface GrokCliAuthInfo {
  user_id: string;
  email: string;
  team_id: string;
  tier: number;
  principal_type: string;
  principal_id: string;
  organization_id: string;
}

const EMPTY_STANDARD_TOKEN_FIELDS = {
  idToken: null,
  tokenType: null,
  scope: null,
  oauthExpiresIn: null,
} as const;

type ParsedGrokJwt = {
  email: string | null;
  authInfo: GrokCliAuthInfo | null;
  exp: number | null;
};

function emptyGrokJwt(): ParsedGrokJwt {
  return { email: null, authInfo: null, exp: null };
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  let base64 = parts[1];
  switch (base64.length % 4) {
    case 2:
      base64 += "==";
      break;
    case 3:
      base64 += "=";
      break;
  }
  base64 = base64.replace(/-/g, "+").replace(/_/g, "/");

  try {
    const payload = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
    return payload && typeof payload === "object" && !Array.isArray(payload)
      ? (payload as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function jwtString(payload: Record<string, unknown>, key: string): string {
  return typeof payload[key] === "string" ? payload[key] : "";
}

function parseJwtPayload(token: string): ParsedGrokJwt {
  const payload = decodeJwtPayload(token);
  if (!payload) return emptyGrokJwt();

  const principalType = jwtString(payload, "principal_type");
  const principalId = jwtString(payload, "principal_id");
  const normalizedPrincipalType = principalType.toLowerCase();
  const isTeamPrincipal = normalizedPrincipalType === "team" && principalId.length > 0;
  const isOrganizationPrincipal =
    normalizedPrincipalType === "organization" && principalId.length > 0;
  const email = jwtString(payload, "email");

  return {
    email: email || null,
    authInfo: {
      user_id: isTeamPrincipal || isOrganizationPrincipal ? principalId : jwtString(payload, "sub"),
      email,
      team_id: jwtString(payload, "team_id") || (isTeamPrincipal ? principalId : ""),
      tier: (payload.tier as number) || 1,
      principal_type: principalType,
      principal_id: principalId,
      organization_id:
        jwtString(payload, "organization_id") || (isOrganizationPrincipal ? principalId : ""),
    },
    exp: typeof payload.exp === "number" ? payload.exp : null,
  };
}

/**
 * Extract the JWT access token and refresh_token from user input.
 * Accepts either:
 *   - Raw JWT string (no refresh_token available)
 *   - The entire auth.json object: { "https://auth.x.ai::...": { "key": "eyJ...", "refresh_token": "..." } }
 */
function extractTokenAndRefresh(input: unknown): {
  accessToken: string;
  refreshToken: string | null;
  idToken: string | null;
  tokenType: string | null;
  scope: string | null;
  oauthExpiresIn: number | null;
  rawAuthJson: Record<string, unknown> | null;
  expiresAt: string | null;
} {
  // Direct JWT string
  if (typeof input === "string")
    return {
      ...EMPTY_STANDARD_TOKEN_FIELDS,
      accessToken: input,
      refreshToken: null,
      rawAuthJson: null,
      expiresAt: null,
    };

  if (input && typeof input === "object") {
    const obj = input as Record<string, unknown>;

    if (typeof obj.access_token === "string" && obj.access_token.length > 0) {
      return {
        accessToken: obj.access_token,
        refreshToken: typeof obj.refresh_token === "string" ? obj.refresh_token : null,
        idToken: typeof obj.id_token === "string" ? obj.id_token : null,
        tokenType: typeof obj.token_type === "string" ? obj.token_type : null,
        scope: typeof obj.scope === "string" ? obj.scope : null,
        oauthExpiresIn:
          typeof obj.expires_in === "number" && Number.isFinite(obj.expires_in)
            ? obj.expires_in
            : null,
        rawAuthJson: null,
        expiresAt: null,
      };
    }

    // The route handler wraps the token: { accessToken: <token> }.
    // Unwrap once before checking the inner value.
    const inner =
      typeof obj.accessToken === "object" && obj.accessToken !== null
        ? (obj.accessToken as Record<string, unknown>)
        : obj;

    // auth.json format: { "https://auth.x.ai::...": { key: "eyJ...", refresh_token: "..." } }
    if (inner && typeof inner === "object") {
      const preferredScope = `${GROK_BUILD_OAUTH_ISSUER}::${GROK_CLI_CONFIG.clientId}`;
      const innerKeys = Object.keys(inner);
      const orderedKeys = innerKeys.includes(preferredScope)
        ? [preferredScope, ...innerKeys.filter((key) => key !== preferredScope)]
        : innerKeys;
      for (const k of orderedKeys) {
        const entry = inner[k];
        if (entry && typeof entry === "object" && "key" in entry) {
          const e = entry as Record<string, unknown>;
          if (typeof e.key === "string" && e.key.startsWith("eyJ")) {
            return {
              ...EMPTY_STANDARD_TOKEN_FIELDS,
              accessToken: e.key,
              refreshToken: typeof e.refresh_token === "string" ? e.refresh_token : null,
              rawAuthJson: inner as Record<string, unknown>,
              expiresAt: typeof e.expires_at === "string" ? e.expires_at : null,
            };
          }
        }
      }
    }

    // Raw JWT passed as { accessToken: "eyJ..." }
    if (typeof obj.accessToken === "string" && obj.accessToken.length > 0) {
      return {
        ...EMPTY_STANDARD_TOKEN_FIELDS,
        accessToken: obj.accessToken,
        refreshToken: typeof obj.refreshToken === "string" ? obj.refreshToken : null,
        rawAuthJson: null,
        expiresAt: null,
      };
    }
  }

  return {
    ...EMPTY_STANDARD_TOKEN_FIELDS,
    accessToken: "",
    refreshToken: null,
    rawAuthJson: null,
    expiresAt: null,
  };
}

type ExtractedGrokToken = ReturnType<typeof extractTokenAndRefresh>;

function firstString(...values: Array<string | null | undefined>): string | null {
  return values.find((value) => Boolean(value)) || null;
}

function firstAuthInfoString(
  primaryClaims: ParsedGrokJwt,
  secondaryClaims: ParsedGrokJwt,
  key: Exclude<keyof GrokCliAuthInfo, "tier">
): string | null {
  return firstString(primaryClaims.authInfo?.[key], secondaryClaims.authInfo?.[key]);
}

function resolveGrokIdentity(accessClaims: ParsedGrokJwt, idClaims: ParsedGrokJwt) {
  const principalType = firstAuthInfoString(accessClaims, idClaims, "principal_type");
  const principalId = firstAuthInfoString(accessClaims, idClaims, "principal_id");
  const normalizedPrincipalType = principalType?.toLowerCase();
  const isTeamPrincipal = normalizedPrincipalType === "team" && Boolean(principalId);
  const isOrganizationPrincipal =
    normalizedPrincipalType === "organization" && Boolean(principalId);

  return {
    principalType,
    principalId,
    email: firstString(idClaims.email, accessClaims.email),
    userId:
      isTeamPrincipal || isOrganizationPrincipal
        ? principalId
        : firstAuthInfoString(idClaims, accessClaims, "user_id"),
    teamId: isTeamPrincipal ? principalId : firstAuthInfoString(accessClaims, idClaims, "team_id"),
    organizationId: isOrganizationPrincipal
      ? principalId
      : firstAuthInfoString(accessClaims, idClaims, "organization_id"),
  };
}

function resolveGrokExpiresIn(extracted: ExtractedGrokToken, accessClaims: ParsedGrokJwt): number {
  const currentSec = Math.floor(Date.now() / 1000);
  let expiresIn = extracted.oauthExpiresIn ?? 21600;

  if (extracted.oauthExpiresIn == null && extracted.expiresAt) {
    const parsed = Date.parse(extracted.expiresAt);
    if (!isNaN(parsed)) expiresIn = Math.floor(parsed / 1000) - currentSec;
  } else if (extracted.oauthExpiresIn == null && accessClaims.exp) {
    expiresIn = accessClaims.exp - currentSec;
  }

  // Keep an already-expired token eligible for the refresh path.
  return Math.max(1, expiresIn);
}

/**
 * The pre-existing paste-token mapping (auth.json / raw JWT import), generalized by
 * #7358 to also resolve identity off an accompanying id_token when present (team/org
 * principal handling via resolveGrokIdentity/resolveGrokExpiresIn) — #5775 clamp
 * included. Used for the import-token fallback path; the browser PKCE exchange uses
 * mapGrokBuildBrowserTokens (grok-cli-oauth.ts) instead, since auth.x.ai's OIDC
 * id_token carries standard claims (name/email) rather than Grok Build's own
 * principal_type/team_id/tier custom claims.
 */
function mapImportedToken(token: unknown) {
  const extracted = extractTokenAndRefresh(token);
  const accessClaims = parseJwtPayload(extracted.accessToken);
  const idClaims = extracted.idToken ? parseJwtPayload(extracted.idToken) : emptyGrokJwt();
  const identity = resolveGrokIdentity(accessClaims, idClaims);
  const expiresIn = resolveGrokExpiresIn(extracted, accessClaims);

  return {
    accessToken: extracted.accessToken,
    refreshToken: extracted.refreshToken,
    idToken: extracted.idToken,
    expiresIn,
    tokenType: extracted.tokenType,
    scope: extracted.scope,
    email: identity.email,
    providerSpecificData: {
      userId: identity.userId,
      email: identity.email,
      teamId: identity.teamId,
      tier: accessClaims.authInfo?.tier || idClaims.authInfo?.tier || 1,
      principalType: identity.principalType,
      principalId: identity.principalId,
      organizationId: identity.organizationId,
      rawAuthJson: extracted.rawAuthJson || undefined,
    },
  };
}

export const grokCli = {
  config: GROK_BUILD_OAUTH_CONFIG,
  flowType: "authorization_code_pkce" as const,
  fixedPort: GROK_BUILD_OAUTH_CONFIG.loopbackPort,
  callbackPath: GROK_BUILD_OAUTH_CONFIG.callbackPath,
  callbackHost: GROK_BUILD_OAUTH_CONFIG.callbackHost,
  // The xAI flow uses a 96-byte random verifier (128 base64url chars), same as xai-oauth.
  pkceVerifierBytes: 96,
  buildAuthUrl: buildGrokBuildAuthUrl,
  exchangeToken: exchangeGrokBuildToken,
  /**
   * Unified token mapper serving BOTH flows under this single provider entry:
   * the browser PKCE exchange (tokens shaped like the OAuth token-endpoint
   * response — `access_token`/`refresh_token`/`id_token`/`expires_in`) and
   * the paste-token import (`{ accessToken: <JWT string or auth.json blob> }`,
   * see extractTokenAndRefresh above). Both converge on the same persisted
   * connection shape, so refresh keeps working unmodified either way.
   */
  mapTokens: (token: unknown) =>
    isGrokBuildBrowserTokens(token) ? mapGrokBuildBrowserTokens(token) : mapImportedToken(token),
};
