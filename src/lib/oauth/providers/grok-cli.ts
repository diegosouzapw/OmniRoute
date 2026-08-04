/**
 * Grok Build OAuth Provider — Device Code + Browser PKCE + Import Token Flows
 *
 * Three ways to connect, merged under one provider entry (#7013 reworked to
 * coexist with #7358 instead of replacing it):
 *   - Device code (primary, flowType): the official Grok Build CLI flow —
 *     requestDeviceCode()/pollToken() poll cli-chat-proxy's device-authorization
 *     endpoint (GROK_CLI_CONFIG). This stays the DEFAULT in OAuthModal.tsx so
 *     existing installs / docs referencing "grok login"-style device codes
 *     keep working unchanged.
 *   - Browser login (supportsBrowserPkce): PKCE authorization-code flow against
 *     auth.x.ai, reusing the same public client id as the sibling xai-oauth
 *     provider (see grok-cli-oauth.ts / GROK_BUILD_OAUTH_CONFIG). One click,
 *     no polling — offered as an alternative via the OAuthModal chooser.
 *   - Import token: user pastes the entire auth.json from ~/.grok/auth.json
 *     or just the JWT access token string. Kept as a fallback for headless /
 *     remote installs where neither a loopback callback nor device-code
 *     verification page can be reached.
 * All three paths converge on mapTokens() below and support automatic refresh
 * using the refresh_token (open-sse token-refresh reads config.tokenUrl
 * generically, independent of which flow acquired the tokens).
 */

import {
  getGrokBuildOAuthHeaders,
  GROK_BUILD_OAUTH_ISSUER,
  GROK_BUILD_OAUTH_REFERRER,
} from "@omniroute/open-sse/config/grokBuild.ts";
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

async function parseOAuthResponse(response: Response): Promise<Record<string, unknown>> {
  try {
    const value = await response.json();
    return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  } catch {
    return {
      error: "invalid_response",
      error_description: "xAI returned a non-JSON OAuth response",
    };
  }
}

function validateVerificationUri(value: string): void {
  if (
    [...value].some((character) => {
      const codePoint = character.codePointAt(0) ?? 0;
      return codePoint <= 0x1f || codePoint === 0x7f;
    })
  ) {
    throw new Error("Grok returned an invalid verification URL");
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Grok returned an invalid verification URL");
  }

  const isLocalHttp =
    url.protocol === "http:" && (url.hostname === "localhost" || url.hostname === "127.0.0.1");
  if (url.protocol !== "https:" && !isLocalHttp) {
    throw new Error("Grok returned an unsupported verification URL");
  }
}

/**
 * Device-code flow (#7358). Kept alongside the browser PKCE flow below (#7013
 * rework) — see grokCli.flowType, which stays "device_code" so it remains the
 * primary/default experience in OAuthModal.tsx and the route.ts device-code
 * action family.
 *
 * `grokCli.config` below is GROK_BUILD_OAUTH_CONFIG (the browser-PKCE shape —
 * required so it stays reference-equal for oauth-providers-config.test.ts and
 * so buildAuthUrl/exchangeToken keep receiving the right config). The
 * device-code endpoints and scope live on a DIFFERENT config (GROK_CLI_CONFIG:
 * deviceCodeUrl + a wider legacy scope set) that has no `authorizeUrl`/
 * `loopbackPort` shape, so requestDeviceCode/pollToken intentionally ignore
 * whatever config providers.ts passes them and always read GROK_CLI_CONFIG
 * directly.
 */
async function requestDeviceCode(_config?: unknown) {
  const config = GROK_CLI_CONFIG;
  const response = await fetch(config.deviceCodeUrl, {
    method: "POST",
    headers: getGrokBuildOAuthHeaders("ui"),
    body: new URLSearchParams({
      client_id: config.clientId,
      scope: config.scope,
      referrer: GROK_BUILD_OAUTH_REFERRER,
    }),
  });
  const data = await parseOAuthResponse(response);

  if (!response.ok) {
    throw new Error(
      typeof data.error_description === "string"
        ? data.error_description
        : "Grok device authorization failed"
    );
  }
  if (
    typeof data.device_code !== "string" ||
    typeof data.user_code !== "string" ||
    typeof data.verification_uri !== "string"
  ) {
    throw new Error("Grok device authorization response is incomplete");
  }
  if (!/^[A-Za-z0-9-]+$/.test(data.user_code)) {
    throw new Error("Grok returned an invalid device code");
  }
  validateVerificationUri(data.verification_uri);
  if (typeof data.verification_uri_complete === "string") {
    validateVerificationUri(data.verification_uri_complete);
  }

  return {
    device_code: data.device_code,
    user_code: data.user_code,
    verification_uri: data.verification_uri,
    verification_uri_complete:
      typeof data.verification_uri_complete === "string"
        ? data.verification_uri_complete
        : data.verification_uri,
    expires_in: typeof data.expires_in === "number" ? data.expires_in : 1800,
    interval: typeof data.interval === "number" ? data.interval : 5,
  };
}

async function pollToken(_config: unknown, deviceCode: string) {
  const config = GROK_CLI_CONFIG;
  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: getGrokBuildOAuthHeaders("ui"),
    body: new URLSearchParams({
      client_id: config.clientId,
      device_code: deviceCode,
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
    }),
  });

  return { ok: response.ok, data: await parseOAuthResponse(response) };
}

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
  // NOTE: this is the BROWSER-PKCE config (authorizeUrl/loopbackPort/etc, same
  // reference oauth-providers-config.test.ts pins), used by buildAuthUrl /
  // exchangeToken below. The device-code endpoints (deviceCodeUrl + a wider
  // legacy scope set) live on the separate GROK_CLI_CONFIG that
  // requestDeviceCode/pollToken read directly — see the note above them.
  config: GROK_BUILD_OAUTH_CONFIG,
  // device_code stays PRIMARY (#7358) — OAuthModal.tsx defaults grok-cli into
  // the device-code panel and route.ts's device-code/poll action family keys
  // off this flowType. The browser PKCE login (#7013) is an ADDITIONAL,
  // equally-first-class method advertised via supportsBrowserPkce below —
  // callers that need capability detection (providers.ts::generateAuthData,
  // route.ts's exchange codeVerifier guard) check supportsBrowserPkce instead
  // of requiring flowType === "authorization_code_pkce".
  flowType: "device_code" as const,
  requestDeviceCode,
  pollToken,
  // Browser PKCE capability marker + fields (#7013), kept alongside device_code.
  supportsBrowserPkce: true as const,
  fixedPort: GROK_BUILD_OAUTH_CONFIG.loopbackPort,
  callbackPath: GROK_BUILD_OAUTH_CONFIG.callbackPath,
  callbackHost: GROK_BUILD_OAUTH_CONFIG.callbackHost,
  // The xAI flow uses a 96-byte random verifier (128 base64url chars), same as xai-oauth.
  pkceVerifierBytes: 96,
  buildAuthUrl: buildGrokBuildAuthUrl,
  exchangeToken: exchangeGrokBuildToken,
  /**
   * Unified token mapper serving ALL THREE flows under this single provider
   * entry: device-code polling (tokens shaped like the standard OAuth token
   * response, dispatched here the same as a paste-token import unless they
   * carry the browser-flow's id_token/OIDC shape), the browser PKCE exchange
   * (tokens shaped like the OAuth token-endpoint response —
   * `access_token`/`refresh_token`/`id_token`/`expires_in`, detected via
   * isGrokBuildBrowserTokens), and the paste-token import (`{ accessToken:
   * <JWT string or auth.json blob> }`, see extractTokenAndRefresh above).
   * All converge on the same persisted connection shape, so refresh keeps
   * working unmodified regardless of which flow acquired the tokens.
   */
  mapTokens: (token: unknown) =>
    isGrokBuildBrowserTokens(token) ? mapGrokBuildBrowserTokens(token) : mapImportedToken(token),
};
