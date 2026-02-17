import { OAuthService } from "./oauth";
import { CLAUDE_CONFIG } from "../constants/oauth";
import { getServerCredentials } from "../config/index";
import { spinner as createSpinner } from "../utils/ui";

/**
 * Claude OAuth Service
 */
export class ClaudeService extends OAuthService {
  constructor() {
    super(CLAUDE_CONFIG);
  }

  /**
   * Build Claude authorization URL
   */
  buildClaudeAuthUrl(redirectUri, state, codeChallenge) {
    const scopeStr = CLAUDE_CONFIG.scopes.join(" ");
    const params = new URLSearchParams({
      code: "true",
      client_id: CLAUDE_CONFIG.clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: scopeStr,
      code_challenge: codeChallenge,
      code_challenge_method: CLAUDE_CONFIG.codeChallengeMethod,
      state: state,
    });

    return `${CLAUDE_CONFIG.authorizeUrl}?${params.toString()}`;
  }

  /**
   * Exchange Claude authorization code (with special handling)
   */
  async exchangeClaudeCode(code, redirectUri, codeVerifier, state) {
    // Parse code - may contain state after #
    let authCode = code;
    let codeState = "";
    if (authCode.includes("#")) {
      const parts = authCode.split("#");
      authCode = parts[0];
      codeState = parts[1] || "";
    }

    // Claude uses JSON format (not form-urlencoded)
    const tokenPayload = {
      code: authCode,
      state: codeState || state,
      grant_type: "authorization_code",
      client_id: CLAUDE_CONFIG.clientId,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    };

    const response = await fetch(CLAUDE_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(tokenPayload),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  }

  /**
   * Save Claude tokens to server
   */
  async saveTokens(tokens) {
    const { server, token, userId } = getServerCredentials();

    // Server will auto-generate displayName based on existing account count
    const response = await fetch(`${server}/api/cli/providers/claude`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-User-Id": userId,
      },
      body: JSON.stringify({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresIn: tokens.expires_in,
        scope: tokens.scope,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to save tokens");
    }

    return await response.json();
  }

  /**
   * Complete Claude OAuth flow
   */
  async connect() {
    const spinner = createSpinner("Starting Claude OAuth...").start();

    try {
      spinner.text = "Starting local server...";

      // Authenticate and get authorization code
      const { code, state, codeVerifier, redirectUri } = await this.authenticate(
        "Claude",
        this.buildClaudeAuthUrl.bind(this)
      );

      spinner.start("Exchanging code for tokens...");

      // Exchange code for tokens
      const tokens = await this.exchangeClaudeCode(code, redirectUri, codeVerifier, state);

      spinner.text = "Saving tokens to server...";

      // Save tokens to server
      await this.saveTokens(tokens);

      spinner.succeed("Claude connected successfully!");
      return true;
    } catch (error) {
      spinner.fail(`Failed: ${error.message}`);
      throw error;
    }
  }
}
