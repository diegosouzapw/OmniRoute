import { CODEX_CONFIG } from "../constants/oauth";

export const codex = {
  config: CODEX_CONFIG,
  flowType: "authorization_code_pkce",
  fixedPort: 1455,
  callbackPath: "/auth/callback",
  buildAuthUrl: (config, redirectUri, state, codeChallenge) => {
    const params = {
      response_type: "code",
      client_id: config.clientId,
      redirect_uri: redirectUri,
      scope: config.scope,
      code_challenge: codeChallenge,
      code_challenge_method: config.codeChallengeMethod,
      ...config.extraParams,
      state: state,
    };
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join("&");
    return `${config.authorizeUrl}?${queryString}`;
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
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  },
  mapTokens: (tokens) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    idToken: tokens.id_token,
    expiresIn: tokens.expires_in,
  }),
};
