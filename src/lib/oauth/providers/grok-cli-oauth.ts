/**
 * Grok Build (xAI) OAuth Provider — Browser PKCE Flow helpers
 *
 * Shares the auth.x.ai authorize/token endpoints and public client id with
 * the sibling xai-oauth provider (PR #7399) — see GROK_BUILD_OAUTH_CONFIG in
 * ../constants/oauth.ts — but is scoped to the Grok Build
 * (cli-chat-proxy.grok.com) entitlement. Split into its own module so
 * grok-cli.ts stays focused on merging this browser flow with the existing
 * paste-token import flow under one provider entry.
 */

import { decodeXaiIdTokenIdentity } from "./xai-oauth";
import { GROK_BUILD_OAUTH_CONFIG } from "../constants/oauth";

const GROK_BUILD_DEFAULT_TTL_SEC = 21600;

export function buildGrokBuildAuthUrl(
  config: typeof GROK_BUILD_OAUTH_CONFIG,
  redirectUri: string,
  state: string,
  codeChallenge: string
): string {
  const params = {
    response_type: "code",
    client_id: config.clientId,
    redirect_uri: redirectUri,
    scope: config.scope,
    code_challenge: codeChallenge,
    code_challenge_method: config.codeChallengeMethod,
    state,
  };
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");
  return `${config.authorizeUrl}?${query}`;
}

export async function exchangeGrokBuildToken(
  config: typeof GROK_BUILD_OAUTH_CONFIG,
  code: string,
  redirectUri: string,
  codeVerifier: string
): Promise<Record<string, unknown>> {
  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: config.clientId,
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Grok Build token exchange failed: ${error}`);
  }

  return response.json();
}

/**
 * Detect an OAuth token-endpoint response (browser PKCE exchange output),
 * which uses snake_case `access_token`, as opposed to the paste-token import
 * shape (`{ accessToken: <JWT string or auth.json blob> }`).
 */
export function isGrokBuildBrowserTokens(tokens: unknown): tokens is Record<string, unknown> {
  return (
    !!tokens &&
    typeof tokens === "object" &&
    typeof (tokens as Record<string, unknown>).access_token === "string"
  );
}

/**
 * Map a browser PKCE token-endpoint response into the same field shape the
 * paste-token mapTokens() in grok-cli.ts produces, so downstream refresh
 * (which reads generically off config.tokenUrl + refresh_token, not
 * provider-specific code) keeps working unmodified regardless of which flow
 * acquired the tokens.
 */
export function mapGrokBuildBrowserTokens(tokens: Record<string, unknown>): {
  accessToken: string;
  refreshToken: string | null;
  expiresIn: number;
  email: string | null;
  name: string | null;
  providerSpecificData: Record<string, unknown>;
} {
  const identity = decodeXaiIdTokenIdentity(tokens.id_token);
  const rawExpiresIn = typeof tokens.expires_in === "number" ? tokens.expires_in : NaN;
  // #5775 follow-up (duplicated from the import-token path in grok-cli.ts):
  // clamp to a tiny positive TTL instead of letting a non-positive expiresIn
  // be read as "not expiring" downstream by AutoCombo.
  const expiresIn = Math.max(
    1,
    Number.isFinite(rawExpiresIn) ? rawExpiresIn : GROK_BUILD_DEFAULT_TTL_SEC
  );

  return {
    accessToken: typeof tokens.access_token === "string" ? tokens.access_token : "",
    refreshToken: typeof tokens.refresh_token === "string" ? tokens.refresh_token : null,
    expiresIn,
    email: identity.email,
    name: identity.name || identity.email,
    providerSpecificData: {
      scope: typeof tokens.scope === "string" ? tokens.scope : GROK_BUILD_OAUTH_CONFIG.scope,
      tokenType: typeof tokens.token_type === "string" ? tokens.token_type : "Bearer",
    },
  };
}
