/**
 * kiroExternalIdp.ts — shared helpers for Kiro / Amazon Q **External IdP**
 * (enterprise "Your organization" SSO) accounts.
 *
 * Unlike AWS Builder ID / IAM Identity Center (which mint AWS SSO-OIDC tokens
 * refreshed at `oidc.{region}.amazonaws.com` and whose refresh token starts with
 * `aorAAAAAG`) or the Google/GitHub social flow (refreshed at the Kiro auth
 * service), an **External IdP** login federates through the organization's own
 * identity provider (most commonly Microsoft Entra ID). Its Kiro token file
 * (`~/.aws/sso/cache/kiro-auth-token.json`) looks like:
 *
 *   {
 *     "accessToken":  "<JWT issued by the org IdP, scp: codewhisperer:*>",
 *     "refreshToken": "<IdP refresh token, NOT aorAAAAAG…>",
 *     "authMethod":   "external_idp",
 *     "provider":     "ExternalIdp",
 *     "clientId":     "<IdP application (client) id — a public client, no secret>",
 *     "tokenEndpoint":"https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token",
 *     "issuerUrl":    "https://login.microsoftonline.com/{tenant}/v2.0",
 *     "scopes":       "api://{clientId}/codewhisperer:conversations … offline_access"
 *   }
 *
 * Two consequences this module encodes (both verified against a live org token):
 *   1. The token is refreshed with a **standard public-client OAuth2
 *      `refresh_token` grant against `tokenEndpoint`** (form-encoded
 *      client_id + refresh_token + scope, NO client_secret) — see
 *      {@link buildExternalIdpRefreshParams}.
 *   2. At runtime the access token is sent to CodeWhisperer as a normal bearer
 *      but MUST carry the header `TokenType: EXTERNAL_IDP` so the service binds
 *      it to the Amazon Q Developer profile (without it every call returns
 *      `ValidationException: Invalid ARN <clientId>`). The profileArn itself is
 *      NOT discoverable via `ListAvailableProfiles` (it returns an empty list
 *      for these tokens); it is read from the Kiro IDE `profile.json` at import.
 */

/** authMethod marker persisted on External IdP connections. */
export const KIRO_EXTERNAL_IDP_AUTH_METHOD = "external_idp";

/** Header CodeWhisperer requires to bind an External IdP bearer to its profile. */
export const KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER = "TokenType";
export const KIRO_EXTERNAL_IDP_TOKEN_TYPE_VALUE = "EXTERNAL_IDP";

/**
 * Allowlist of enterprise IdP token-endpoint host suffixes. The refresh token is
 * POSTed to this endpoint, so we constrain it to well-known identity providers
 * (SSRF guard — the value ultimately originates from an on-disk token file).
 * Microsoft Entra is by far the most common Kiro org IdP; the others cover the
 * major enterprise SSO vendors an org might federate Kiro through.
 */
const ALLOWED_IDP_HOST_SUFFIXES: readonly string[] = [
  "login.microsoftonline.com",
  "login.microsoftonline.us",
  "login.partner.microsoftonline.cn",
  "login.microsoft.com",
  "login.windows.net",
  "sts.windows.net",
  ".okta.com",
  ".oktapreview.com",
  ".okta-emea.com",
  ".auth0.com",
  ".onelogin.com",
  ".pingidentity.com",
  ".pingone.com",
  "accounts.google.com",
  "oauth2.googleapis.com",
  ".amazoncognito.com",
];

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** True when a connection's providerSpecificData marks it as an External IdP login. */
export function isExternalIdpAuthMethod(authMethod: unknown): boolean {
  return normalizeString(authMethod).toLowerCase() === KIRO_EXTERNAL_IDP_AUTH_METHOD;
}

/**
 * Validate the IdP token endpoint before it is used as a fetch target. Requires
 * https and a host on {@link ALLOWED_IDP_HOST_SUFFIXES}. Returns the normalized
 * URL string; throws on anything unexpected.
 */
export function validateExternalIdpTokenEndpoint(rawEndpoint: unknown): string {
  const tokenEndpoint = normalizeString(rawEndpoint);
  if (!tokenEndpoint) throw new Error("tokenEndpoint is required for external_idp");
  let parsed: URL;
  try {
    parsed = new URL(tokenEndpoint);
  } catch {
    throw new Error("tokenEndpoint must be a valid URL");
  }
  if (parsed.protocol !== "https:") {
    throw new Error("tokenEndpoint must use https");
  }
  const host = parsed.hostname.toLowerCase();
  const allowed = ALLOWED_IDP_HOST_SUFFIXES.some((suffix) =>
    suffix.startsWith(".") ? host.endsWith(suffix) : host === suffix
  );
  if (!allowed) {
    throw new Error(`tokenEndpoint host is not an allowed identity provider: ${host}`);
  }
  return parsed.toString();
}

/** Collapse an array-or-space-delimited scope value into a single space-delimited string. */
export function normalizeScope(scopes: unknown): string {
  if (Array.isArray(scopes)) {
    return scopes.map(normalizeString).filter(Boolean).join(" ");
  }
  return normalizeString(scopes);
}

/** Best-effort base64url JWT payload decode (no signature verification). */
export function decodeJwtPayload(jwt: unknown): Record<string, unknown> | null {
  try {
    if (typeof jwt !== "string") return null;
    const parts = jwt.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (base64.length % 4)) % 4;
    const json = Buffer.from(`${base64}${"=".repeat(padding)}`, "base64").toString("utf8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Extract the login identity (email) from an External IdP access token. Org IdP
 * tokens carry it as `preferred_username`/`upn`/`email` rather than the AWS
 * `email` claim — otherwise the connection surfaces as the opaque "ExternalIdp".
 */
export function emailFromExternalIdpToken(accessToken: unknown): string | null {
  const claims = decodeJwtPayload(accessToken);
  if (!claims) return null;
  const pick = (k: string): string | undefined =>
    typeof claims[k] === "string" ? (claims[k] as string) : undefined;
  return pick("email") || pick("preferred_username") || pick("upn") || null;
}

export interface ExternalIdpRefreshRequest {
  tokenEndpoint: string;
  body: URLSearchParams;
}

/**
 * Build the public-client `refresh_token` grant for an External IdP token. The
 * IdP application is a PUBLIC client (no secret), so the body is exactly
 * `grant_type=refresh_token&client_id&refresh_token&scope`. Throws when any
 * required field is missing/invalid so callers can fail closed.
 */
export function buildExternalIdpRefreshParams(
  refreshToken: string,
  providerSpecificData: Record<string, unknown> | null | undefined
): ExternalIdpRefreshRequest {
  const psd = providerSpecificData || {};
  const clientId = normalizeString(psd.clientId ?? (psd as Record<string, unknown>).client_id);
  const tokenEndpoint = validateExternalIdpTokenEndpoint(
    psd.tokenEndpoint ?? (psd as Record<string, unknown>).token_endpoint
  );
  const scope = normalizeScope(psd.scope ?? psd.scopes);

  if (!refreshToken) throw new Error("refresh token is required for external_idp refresh");
  if (!clientId) throw new Error("clientId is required for external_idp refresh");
  if (!scope) throw new Error("scope is required for external_idp refresh");

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    refresh_token: refreshToken,
    scope,
  });

  return { tokenEndpoint, body };
}
