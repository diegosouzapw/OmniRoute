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
 * Parse the id_token JWT to extract Codex-specific auth information.
 * The workspace selection is embedded in the JWT after OAuth completion.
 *
 * IMPORTANT: The workspace selected by the user during OAuth is stored in
 * chatgpt_account_id - this is the workspace we MUST use, not a fallback.
 */
function parseIdToken(idToken: string): { email: string | null; authInfo: CodexAuthInfo | null } {
  try {
    const parts = idToken.split(".");
    if (parts.length !== 3) {
      return { email: null, authInfo: null };
    }

    // Base64 URL decode the payload
    let payload = parts[1];
    // Add padding if necessary
    switch (payload.length % 4) {
      case 2:
        payload += "==";
        break;
      case 3:
        payload += "=";
        break;
    }

    // Use atob for base64 decoding (works in both browser and Node.js)
    // Replace URL-safe characters with standard base64 characters
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

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

    // Determine the correct workspace to use
    //
    // IMPORTANT: A user can have both Team and Personal workspaces.
    // The JWT's chatgpt_account_id may not always reflect the workspace
    // the user selected during OAuth. We need to be smart about selection.
    //
    // Selection logic:
    // 1. If plan_type indicates team/business, use chatgpt_account_id
    // 2. If plan_type is "free" but organizations has team workspace, use team
    // 3. Otherwise use chatgpt_account_id as fallback
    let workspaceId = authInfo?.chatgpt_account_id || null;
    let planType = (authInfo?.chatgpt_plan_type || "").toLowerCase();

    // Check if we should use a team workspace instead
    const organizations = authInfo?.organizations || [];
    if (organizations.length > 0) {
      // Find team/business workspace (non-default usually means team)
      const teamOrg = organizations.find((org) => {
        const title = (org.title || "").toLowerCase();
        const role = (org.role || "").toLowerCase();
        // Team workspaces typically have role like "member" or "admin" and non-personal titles
        return (
          !org.is_default &&
          (title.includes("team") ||
            title.includes("business") ||
            title.includes("workspace") ||
            title.includes("org") ||
            role === "admin" ||
            role === "member")
        );
      });

      // If user's plan_type is "team" or we found a team org, prefer it
      if (planType.includes("team") || planType.includes("chatgptteam")) {
        // User authenticated via Team, use the chatgpt_account_id from JWT
      } else if (teamOrg && (planType === "free" || planType === "")) {
        // User has a team org but plan_type shows free - use team org instead
        workspaceId = teamOrg.id;
        planType = "team";
      }
    }

    const providerSpecificData = {
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
