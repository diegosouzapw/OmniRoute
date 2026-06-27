/**
 * Grok Build OAuth Provider — Import Token Flow with Refresh Support
 *
 * User pastes the entire auth.json from ~/.grok/auth.json
 * or just the JWT access token string.
 * Supports automatic token refresh using the refresh_token.
 */

import { GROK_CLI_CONFIG } from "../constants/oauth";

interface GrokCliAuthInfo {
  user_id: string;
  email: string;
  team_id: string;
  tier: number;
  principal_type: string;
}

function parseJwtPayload(token: string): {
  email: string | null;
  authInfo: GrokCliAuthInfo | null;
} {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return { email: null, authInfo: null };

    let base64 = parts[1];
    switch (base64.length % 4) {
      case 2:
        base64 += "==";
        break;
      case 3:
        base64 += "=";
        break;
    }
    base64 = base64.replace(/-/g, "+").replace(/_/g, "/");

    const payload = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
    return {
      email: payload.email || null,
      authInfo: {
        user_id: payload.sub || "",
        email: payload.email || "",
        team_id: payload.team_id || "",
        tier: payload.tier || 1,
        principal_type: payload.principal_type || "User",
      },
    };
  } catch {
    return { email: null, authInfo: null };
  }
}

/**
 * Extract the JWT access token and refresh_token from user input.
 * Accepts either:
 *   - Raw JWT string (no refresh_token available)
 *   - The entire auth.json object: { "https://auth.x.ai::...": { "key": "eyJ...", "refresh_token": "..." } }
 */
function extractTokenAndRefresh(input: any): { accessToken: string; refreshToken: string | null } {
  if (typeof input === "string") return { accessToken: input, refreshToken: null };

  if (input && typeof input === "object") {
    // auth.json format: first entry's "key" and "refresh_token" fields
    const keys = Object.keys(input);
    if (keys.length > 0 && input[keys[0]]?.key) {
      return {
        accessToken: input[keys[0]].key,
        refreshToken: input[keys[0]].refresh_token || null,
      };
    }
    // Already has accessToken
    if (input.accessToken) {
      return {
        accessToken: input.accessToken,
        refreshToken: input.refreshToken || null,
      };
    }
  }

  return { accessToken: "", refreshToken: null };
}

export const grokCli = {
  config: GROK_CLI_CONFIG,
  flowType: "import_token",
  mapTokens: (token: any) => {
    const { accessToken, refreshToken } = extractTokenAndRefresh(token);
    const { email, authInfo } = parseJwtPayload(accessToken);

    return {
      accessToken,
      refreshToken,
      expiresIn: 21600,
      email,
      providerSpecificData: {
        userId: authInfo?.user_id || null,
        teamId: authInfo?.team_id || null,
        tier: authInfo?.tier || 1,
        principalType: authInfo?.principal_type || "User",
      },
    };
  },
};
