import { GITLAB_DUO_CONFIG } from "../constants/oauth";
import { buildGitLabOAuthEndpoints, parseGitLabDirectAccessDetails } from "../gitlab";

function getGitLabUserEmail(userInfo: Record<string, unknown>): string | null {
  const candidates = [userInfo.email, userInfo.public_email];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }
  return null;
}

function getGitLabUserName(userInfo: Record<string, unknown>): string | null {
  const candidates = [userInfo.name, userInfo.username, userInfo.email, userInfo.public_email];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }
  return null;
}

export const gitlabDuo = {
  config: GITLAB_DUO_CONFIG,
  flowType: "authorization_code_pkce",
  buildAuthUrl: (config, redirectUri, state, codeChallenge) => {
    if (!config.clientId) {
      throw new Error(
        "GitLab Duo OAuth requires GITLAB_DUO_OAUTH_CLIENT_ID (or GITLAB_OAUTH_CLIENT_ID) to be configured."
      );
    }

    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      state,
      scope: config.scope,
      code_challenge: codeChallenge,
      code_challenge_method: config.codeChallengeMethod,
    });

    return `${config.authorizeUrl}?${params.toString()}`;
  },
  exchangeToken: async (config, code, redirectUri, codeVerifier) => {
    const body = new URLSearchParams({
      client_id: config.clientId,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });

    if (config.clientSecret) {
      body.set("client_secret", config.clientSecret);
    }

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GitLab Duo token exchange failed: ${error}`);
    }

    return await response.json();
  },
  postExchange: async (tokens) => {
    const endpoints = buildGitLabOAuthEndpoints(GITLAB_DUO_CONFIG.baseUrl);
    const headers = {
      Authorization: `Bearer ${tokens.access_token}`,
      Accept: "application/json",
    };

    const userRes = await fetch(endpoints.userUrl, { headers });
    const userInfo = userRes.ok ? ((await userRes.json()) as Record<string, unknown>) : {};

    let directAccess = null;
    try {
      const directRes = await fetch(endpoints.directAccessUrl, {
        method: "POST",
        headers,
      });
      if (directRes.ok) {
        directAccess = parseGitLabDirectAccessDetails(await directRes.json());
      }
    } catch {
      // Direct access is optional at login time; executor will retry later.
    }

    return { userInfo, directAccess };
  },
  mapTokens: (tokens, extra) => {
    const userInfo =
      extra?.userInfo && typeof extra.userInfo === "object"
        ? (extra.userInfo as Record<string, unknown>)
        : {};
    const directAccess = extra?.directAccess ?? null;

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      email: getGitLabUserEmail(userInfo),
      name: getGitLabUserName(userInfo),
      providerSpecificData: {
        baseUrl: GITLAB_DUO_CONFIG.baseUrl,
        gitlabUserId: userInfo.id,
        gitlabUsername: userInfo.username,
        gitlabName: userInfo.name,
        ...(directAccess ? { gitlabDirectAccess: directAccess } : {}),
      },
    };
  },
};
