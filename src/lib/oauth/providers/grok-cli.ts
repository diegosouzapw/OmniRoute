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
function extractTokenAndRefresh(input: unknown): {
  accessToken: string;
  refreshToken: string | null;
  rawAuthJson: Record<string, unknown> | null;
} {
  // Direct JWT string
  if (typeof input === "string")
    return { accessToken: input, refreshToken: null, rawAuthJson: null };

  if (input && typeof input === "object") {
    const obj = input as Record<string, unknown>;

    // The route handler wraps the token: { accessToken: <token> }.
    // Unwrap once before checking the inner value.
    const inner =
      typeof obj.accessToken === "object" && obj.accessToken !== null
        ? (obj.accessToken as Record<string, unknown>)
        : obj;

    // auth.json format: { "https://auth.x.ai::...": { key: "eyJ...", refresh_token: "..." } }
    if (inner && typeof inner === "object") {
      const innerKeys = Object.keys(inner);
      for (const k of innerKeys) {
        const entry = inner[k];
        if (entry && typeof entry === "object" && "key" in entry) {
          const e = entry as Record<string, unknown>;
          if (typeof e.key === "string" && e.key.startsWith("eyJ")) {
            return {
              accessToken: e.key,
              refreshToken: typeof e.refresh_token === "string" ? e.refresh_token : null,
              rawAuthJson: inner as Record<string, unknown>,
            };
          }
        }
      }
    }

    // Raw JWT passed as { accessToken: "eyJ..." }
    if (typeof obj.accessToken === "string" && obj.accessToken.startsWith("eyJ")) {
      return {
        accessToken: obj.accessToken,
        refreshToken: typeof obj.refreshToken === "string" ? obj.refreshToken : null,
        rawAuthJson: null,
      };
    }
  }

  return { accessToken: "", refreshToken: null, rawAuthJson: null };
}

export const grokCli = {
  config: GROK_CLI_CONFIG,
  flowType: "import_token",
  mapTokens: (token: unknown) => {
    const { accessToken, refreshToken, rawAuthJson } = extractTokenAndRefresh(token);
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
        rawAuthJson: rawAuthJson || undefined,
      },
    };
  },
};
