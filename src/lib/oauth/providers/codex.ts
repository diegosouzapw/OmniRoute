import { CODEX_CONFIG } from "../constants/oauth";

/**
 * OpenAI Codex Auth Info embedded in id_token JWT
 * The JWT claims contain a custom claim at "https://api.openai.com/auth"
 */
interface CodexAuthInfo {
  chatgpt_account_id: string;
  chatgpt_plan_type: string;
  chatgpt_user_id: string;
  user_id: string;
  organizations: Array<{
    id: string;
    is_default: boolean;
    role: string;
    title: string;
  }>;
}

/**
 * Decode base64 string with proper UTF-8 handling.
 * atob() doesn't handle multi-byte UTF-8 characters correctly.
 */
function base64Decode(str: string): string {
  // Add padding if necessary
  let base64 = str;
  switch (base64.length % 4) {
    case 2:
      base64 += "==";
      break;
    case 3:
      base64 += "=";
      break;
  }

  // Replace URL-safe characters with standard base64 characters
  base64 = base64.replace(/-/g, "+").replace(/_/g, "/");

  // Decode using atob, then handle UTF-8
  const binary = atob(base64);

  // Convert binary string to bytes, then to UTF-8 string
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  // Use TextDecoder for proper UTF-8 decoding
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}

/**
 * Parse the id_token JWT to extract Codex-specific auth information.
 * The workspace selection is embedded in the JWT after OAuth completion.
 *
 * Note: The OAuth flow already verified this token with OpenAI's server.
 * We only extract metadata (workspace info) from the already-validated token.
 */
function parseIdToken(idToken: string): { email: string | null; authInfo: CodexAuthInfo | null } {
  try {
    const parts = idToken.split(".");
    if (parts.length !== 3) {
      return { email: null, authInfo: null };
    }

    // Decode payload with proper UTF-8 handling
    const decoded = JSON.parse(base64Decode(parts[1]));

    const email = decoded.email || null;

    // Extract Codex auth info from custom claim
    const authInfo = decoded["https://api.openai.com/auth"] || null;

    return { email, authInfo };
  } catch (e) {
    return { email: null, authInfo: null };
  }
}

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

  /**
   * Post-exchange hook: Parse id_token to extract workspace info.
   * The workspace selected by the user during OAuth is embedded in the id_token.
   */
  postExchange: async (tokens) => {
    if (!tokens.id_token) {
      return { authInfo: null };
    }

    const { authInfo } = parseIdToken(tokens.id_token);
    return { authInfo };
  },

  mapTokens: (tokens, extra) => {
    // Parse id_token for email and auth info
    let email = null;
    let authInfo = extra?.authInfo || null;

    if (tokens.id_token) {
      const parsed = parseIdToken(tokens.id_token);
      email = parsed.email;
      // Use authInfo from postExchange if available, otherwise from parsing
      if (!authInfo && parsed.authInfo) {
        authInfo = parsed.authInfo;
      }
    }

    // Bind requests to the account selected by the OAuth grant. Organization
    // membership is metadata, not proof that the grant can use that account.
    // The Codex CLI import path uses this same JWT account claim.
    const workspaceId = authInfo?.chatgpt_account_id || null;
    const planType = (authInfo?.chatgpt_plan_type || "").toLowerCase();
    const organizations = authInfo?.organizations || [];

    const providerSpecificData = {
      autoSync: true,
      workspaceId,
      workspacePlanType: planType,
      // Also store the full authInfo for future reference
      chatgptUserId: authInfo?.chatgpt_user_id || null,
      organizations: organizations.length > 0 ? organizations : null,
    };

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token,
      expiresIn: tokens.expires_in,
      email,
      // Persist workspace binding to prevent fallback to wrong workspace
      providerSpecificData,
    };
  },
};
