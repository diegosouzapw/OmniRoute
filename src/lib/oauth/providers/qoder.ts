import { QODER_CONFIG } from "../constants/oauth";

export const qoder = {
  config: QODER_CONFIG,
  flowType: "authorization_code",
  buildAuthUrl: (config, redirectUri, state) => {
    if (!config?.enabled || !config?.authorizeUrl) {
      return null;
    }
    const params = new URLSearchParams({
      loginMethod: config.extraParams.loginMethod,
      type: config.extraParams.type,
      redirect: redirectUri,
      state: state,
      client_id: config.clientId,
    });
    return `${config.authorizeUrl}?${params.toString()}`;
  },
  exchangeToken: async (config, code, redirectUri) => {
    if (!config?.enabled || !config?.tokenUrl) {
      throw new Error(
        "Qoder browser OAuth is experimental and disabled by default. Configure QODER_OAUTH_* environment variables or use a Personal Access Token."
      );
    }
    const headers: Record<string, string> = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };

    if (config.clientSecret) {
      const basicAuth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
      headers.Authorization = `Basic ${basicAuth}`;
    }

    const bodyParams: Record<string, string> = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
      client_id: config.clientId,
    };

    if (config.clientSecret) {
      bodyParams.client_secret = config.clientSecret;
    }

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: headers,
      body: new URLSearchParams(bodyParams),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  },
  postExchange: async (tokens) => {
    if (!QODER_CONFIG.enabled || !QODER_CONFIG.userInfoUrl) {
      throw new Error(
        "Qoder browser OAuth is experimental and disabled by default. Configure QODER_OAUTH_* environment variables or use a Personal Access Token."
      );
    }
    const userInfoRes = await fetch(
      `${QODER_CONFIG.userInfoUrl}?accessToken=${encodeURIComponent(tokens.access_token)}`,
      { headers: { Accept: "application/json" } }
    );
    const result = userInfoRes.ok ? await userInfoRes.json() : {};
    const userInfo = result.success ? result.data : {};
    return { userInfo };
  },
  mapTokens: (tokens, extra) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    apiKey: extra?.userInfo?.apiKey,
    email: extra?.userInfo?.email || extra?.userInfo?.phone,
    displayName: extra?.userInfo?.nickname || extra?.userInfo?.name,
  }),
};
