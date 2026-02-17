import { CLINE_CONFIG } from "../constants/oauth";

export const cline = {
  config: CLINE_CONFIG,
  flowType: "authorization_code",
  buildAuthUrl: (config, redirectUri) => {
    const params = new URLSearchParams({
      client_type: "extension",
      callback_url: redirectUri,
      redirect_uri: redirectUri,
    });
    return `${config.authorizeUrl}?${params.toString()}`;
  },
  exchangeToken: async (config, code, redirectUri) => {
    try {
      let base64 = code;
      const padding = 4 - (base64.length % 4);
      if (padding !== 4) {
        base64 += "=".repeat(padding);
      }
      const decoded = Buffer.from(base64, "base64").toString("utf-8");
      const lastBrace = decoded.lastIndexOf("}");
      if (lastBrace === -1) {
        throw new Error("No JSON found in decoded code");
      }
      const jsonStr = decoded.substring(0, lastBrace + 1);
      const tokenData = JSON.parse(jsonStr);
      return {
        access_token: tokenData.accessToken,
        refresh_token: tokenData.refreshToken,
        email: tokenData.email,
        firstName: tokenData.firstName,
        lastName: tokenData.lastName,
        expires_at: tokenData.expiresAt,
      };
    } catch (e) {
      const response = await fetch(config.tokenExchangeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          code: code,
          client_type: "extension",
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Cline token exchange failed: ${error}`);
      }

      const data = await response.json();
      return {
        access_token: data.data?.accessToken || data.accessToken,
        refresh_token: data.data?.refreshToken || data.refreshToken,
        email: data.data?.userInfo?.email || "",
        expires_at: data.data?.expiresAt || data.expiresAt,
      };
    }
  },
  mapTokens: (tokens) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_at
      ? Math.floor((new Date(tokens.expires_at).getTime() - Date.now()) / 1000)
      : 3600,
    email: tokens.email,
    providerSpecificData: {
      firstName: tokens.firstName,
      lastName: tokens.lastName,
    },
  }),
};
