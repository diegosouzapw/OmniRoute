import { OPENFERENCE_CONFIG } from "../constants/oauth";

const BASE64_BLOCK_SIZE = 4;

/** Extract display metadata from an Openference id_token (OIDC). */
export function decodeOpenferenceIdTokenIdentity(idToken: unknown): {
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

function getOpenferenceUserEmail(userInfo: Record<string, unknown>): string | null {
  const candidates = [userInfo.email, userInfo.preferred_username];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }
  return null;
}

function getOpenferenceUserName(userInfo: Record<string, unknown>): string | null {
  const candidates = [userInfo.name, userInfo.email, userInfo.preferred_username];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }
  return null;
}

export const openference = {
  config: OPENFERENCE_CONFIG,
  flowType: "authorization_code_pkce" as const,
  fixedPort: OPENFERENCE_CONFIG.loopbackPort,
  callbackPath: OPENFERENCE_CONFIG.callbackPath,
  callbackHost: OPENFERENCE_CONFIG.callbackHost,

  buildAuthUrl: (config, redirectUri, state, codeChallenge) => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: config.clientId,
      redirect_uri: redirectUri,
      scope: config.scope,
      code_challenge: codeChallenge,
      code_challenge_method: config.codeChallengeMethod,
      state,
    });
    return `${config.authorizeUrl}?${params.toString()}`;
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
      throw new Error(`Openference token exchange failed: ${error}`);
    }

    return response.json();
  },

  postExchange: async (tokens) => {
    const userinfoUrl = OPENFERENCE_CONFIG.userinfoUrl;
    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
      Accept: "application/json",
    };

    const userRes = await fetch(userinfoUrl, { headers });
    const userInfo = userRes.ok ? ((await userRes.json()) as Record<string, unknown>) : {};

    return { userInfo };
  },

  mapTokens: (tokens, extra) => {
    const identity = decodeOpenferenceIdTokenIdentity(tokens.id_token);
    const userInfo = (extra?.userInfo ?? {}) as Record<string, unknown>;
    const email = identity.email || getOpenferenceUserEmail(userInfo);
    const name = identity.name || getOpenferenceUserName(userInfo) || email;

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token,
      expiresIn: tokens.expires_in,
      email,
      name,
      providerSpecificData: {
        scope: tokens.scope || OPENFERENCE_CONFIG.scope,
        tokenType: tokens.token_type || "Bearer",
      },
    };
  },
};
