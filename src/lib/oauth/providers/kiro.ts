import { KIRO_CONFIG } from "../constants/oauth";

export const kiro = {
  config: KIRO_CONFIG,
  flowType: "device_code",
  requestDeviceCode: async (config) => {
    // Step 1: Register client with AWS SSO OIDC
    const registerRes = await fetch(config.registerClientUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        clientName: config.clientName,
        clientType: config.clientType,
        scopes: config.scopes,
        grantTypes: config.grantTypes,
        issuerUrl: config.issuerUrl,
      }),
    });

    if (!registerRes.ok) {
      const error = await registerRes.text();
      throw new Error(`Client registration failed: ${error}`);
    }

    const clientInfo = await registerRes.json();

    // Step 2: Request device authorization
    const deviceRes = await fetch(config.deviceAuthUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        clientId: clientInfo.clientId,
        clientSecret: clientInfo.clientSecret,
        startUrl: config.startUrl,
      }),
    });

    if (!deviceRes.ok) {
      const error = await deviceRes.text();
      throw new Error(`Device authorization failed: ${error}`);
    }

    const deviceData = await deviceRes.json();

    return {
      device_code: deviceData.deviceCode,
      user_code: deviceData.userCode,
      verification_uri: deviceData.verificationUri,
      verification_uri_complete: deviceData.verificationUriComplete,
      expires_in: deviceData.expiresIn,
      interval: deviceData.interval || 5,
      _clientId: clientInfo.clientId,
      _clientSecret: clientInfo.clientSecret,
    };
  },
  pollToken: async (config, deviceCode, codeVerifier, extraData) => {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        clientId: extraData?._clientId,
        clientSecret: extraData?._clientSecret,
        deviceCode: deviceCode,
        grantType: "urn:ietf:params:oauth:grant-type:device_code",
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      const text = await response.text();
      data = { error: "invalid_response", error_description: text };
    }

    if (data.accessToken) {
      return {
        ok: true,
        data: {
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
          expires_in: data.expiresIn,
          _clientId: extraData?._clientId,
          _clientSecret: extraData?._clientSecret,
        },
      };
    }

    return {
      ok: false,
      data: {
        error: data.error || "authorization_pending",
        error_description: data.error_description || data.message,
      },
    };
  },
  mapTokens: (tokens) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    providerSpecificData: {
      clientId: tokens._clientId,
      clientSecret: tokens._clientSecret,
    },
  }),
};
