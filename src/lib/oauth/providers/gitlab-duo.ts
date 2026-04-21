import { GITLAB_DUO_CONFIG } from "../constants/oauth";

function normalizeGitLabBaseUrl(baseUrl: string | undefined): string {
  const trimmed = (baseUrl || "").trim().replace(/\/+$/, "");
  return trimmed || "https://gitlab.com";
}

export const gitlabDuo = {
  config: GITLAB_DUO_CONFIG,
  flowType: "authorization_code_pkce",
  buildAuthUrl: (config, redirectUri, state, codeChallenge) => {
    const baseUrl = normalizeGitLabBaseUrl(config.baseUrl);
    const clientId = (config.clientId || "").trim();
    if (!clientId) {
      throw new Error(
        "GitLab Duo OAuth requires GITLAB_OAUTH_CLIENT_ID to be configured before starting the browser flow."
      );
    }

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: config.scope,
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: config.codeChallengeMethod,
    });
    return `${baseUrl}/oauth/authorize?${params.toString()}`;
  },
  exchangeToken: async (config, code, redirectUri, codeVerifier) => {
    const baseUrl = normalizeGitLabBaseUrl(config.baseUrl);
    const clientId = (config.clientId || "").trim();
    if (!clientId) {
      throw new Error(
        "GitLab Duo OAuth requires GITLAB_OAUTH_CLIENT_ID to be configured before exchanging tokens."
      );
    }

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      code: code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });

    if (typeof config.clientSecret === "string" && config.clientSecret.trim()) {
      body.set("client_secret", config.clientSecret.trim());
    }

    const response = await fetch(`${baseUrl}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  },
  postExchange: async (tokens) => {
    const response = await fetch(
      `${normalizeGitLabBaseUrl(GITLAB_DUO_CONFIG.baseUrl)}/api/v4/user`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          Accept: "application/json",
        },
      }
    );

    const user = response.ok ? await response.json() : {};
    return { user };
  },
  mapTokens: (tokens, extra) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    scope: tokens.scope,
    email: extra?.user?.email || extra?.user?.public_email,
    name: extra?.user?.name || extra?.user?.username,
    displayName: extra?.user?.name || extra?.user?.username,
    providerSpecificData: {
      baseUrl: normalizeGitLabBaseUrl(GITLAB_DUO_CONFIG.baseUrl),
      gitlabUserId: extra?.user?.id ?? null,
      gitlabUsername: extra?.user?.username ?? null,
    },
  }),
};
