import { KILOCODE_CONFIG } from "../constants/oauth";

export const kilocode = {
  config: KILOCODE_CONFIG,
  flowType: "device_code",
  requestDeviceCode: async (config) => {
    const response = await fetch(config.initiateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many pending authorization requests. Please try again later.");
      }
      const error = await response.text();
      throw new Error(`Device auth initiation failed: ${error}`);
    }

    const data = await response.json();
    return {
      device_code: data.code,
      user_code: data.code,
      verification_uri: data.verificationUrl,
      verification_uri_complete: data.verificationUrl,
      expires_in: data.expiresIn || 300,
      interval: 3,
    };
  },
  pollToken: async (config, deviceCode) => {
    const response = await fetch(`${config.pollUrlBase}/${deviceCode}`);

    if (response.status === 202) {
      return { ok: false, data: { error: "authorization_pending" } };
    }
    if (response.status === 403) {
      return {
        ok: false,
        data: { error: "access_denied", error_description: "Authorization denied by user" },
      };
    }
    if (response.status === 410) {
      return {
        ok: false,
        data: { error: "expired_token", error_description: "Authorization code expired" },
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        data: { error: "poll_failed", error_description: `Poll failed: ${response.status}` },
      };
    }

    const data = await response.json();
    if (data.status === "approved" && data.token) {
      return {
        ok: true,
        data: {
          access_token: data.token,
          _userEmail: data.userEmail,
        },
      };
    }

    return { ok: false, data: { error: "authorization_pending" } };
  },
  mapTokens: (tokens) => ({
    accessToken: tokens.access_token,
    refreshToken: null,
    expiresIn: null,
    email: tokens._userEmail,
  }),
};
