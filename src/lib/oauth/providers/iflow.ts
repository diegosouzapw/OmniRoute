import { IFLOW_CONFIG } from "../constants/oauth";

export const iflow = {
  config: IFLOW_CONFIG,
  flowType: "authorization_code",
  buildAuthUrl: (config, redirectUri, state) => {
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
    const basicAuth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  },
  postExchange: async (tokens) => {
    const userInfoRes = await fetch(
      `${IFLOW_CONFIG.userInfoUrl}?accessToken=${encodeURIComponent(tokens.access_token)}`,
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
