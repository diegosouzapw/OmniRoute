import crypto from "node:crypto";

import { XAI_OAUTH_CONFIG } from "../constants/oauth";

const BASE64_BLOCK_SIZE = 4;

/**
 * Extract display metadata from an id_token already returned by xAI's token
 * endpoint. This is not used to authorize requests; xAI validates the access
 * token upstream.
 */
export function decodeXaiIdTokenIdentity(idToken: unknown): {
  email: string | null;
  name: string | null;
} {
  if (typeof idToken !== "string") return { email: null, name: null };
  const parts = idToken.split(".");
  if (parts.length !== 3) return { email: null, name: null };

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padding = (BASE64_BLOCK_SIZE - (base64.length % BASE64_BLOCK_SIZE)) % BASE64_BLOCK_SIZE;
    const payload = JSON.parse(
      Buffer.from(base64 + "=".repeat(padding), "base64").toString("utf8")
    );
    return {
      email: payload.email || payload.preferred_username || null,
      name: payload.name || null,
    };
  } catch {
    return { email: null, name: null };
  }
}

export const xaiOauth = {
  config: XAI_OAUTH_CONFIG,
  flowType: "authorization_code_pkce" as const,
  fixedPort: XAI_OAUTH_CONFIG.loopbackPort,
  callbackPath: XAI_OAUTH_CONFIG.callbackPath,
  callbackHost: XAI_OAUTH_CONFIG.callbackHost,
  // The official xAI flow uses a 96-byte random verifier (128 base64url chars).
  pkceVerifierBytes: 96,

  buildAuthUrl: (config, redirectUri, state, codeChallenge) => {
    const params = {
      response_type: "code",
      client_id: config.clientId,
      redirect_uri: redirectUri,
      scope: config.scope,
      code_challenge: codeChallenge,
      code_challenge_method: config.codeChallengeMethod,
      state,
      nonce: crypto.randomBytes(16).toString("hex"),
      plan: "generic",
      referrer: "cli-proxy-api",
    };
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    return `${config.authorizeUrl}?${query}`;
  },

  exchangeToken: async (config, code, redirectUri, codeVerifier) => {
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
      throw new Error(`xAI token exchange failed: ${error}`);
    }

    return response.json();
  },

  mapTokens: (tokens) => {
    const identity = decodeXaiIdTokenIdentity(tokens.id_token);
    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token,
      expiresIn: tokens.expires_in,
      email: identity.email,
      name: identity.name || identity.email,
      providerSpecificData: {
        scope: tokens.scope || XAI_OAUTH_CONFIG.scope,
        tokenType: tokens.token_type || "Bearer",
      },
    };
  },
};
