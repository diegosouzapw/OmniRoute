import { OAuthService } from "./oauth.js";
import { OPENAI_CONFIG } from "../constants/oauth.js";
import { getServerCredentials } from "../config/index.js";
import { spinner as createSpinner } from "../utils/ui.js";

/**
 * OpenAI OAuth Service (Native)
 * Uses Authorization Code Flow with PKCE (similar to Codex)
 */
export class OpenAIService extends OAuthService {
  constructor() {
    super(OPENAI_CONFIG);
  }

  /**
   * Build OpenAI authorization URL
   */
  buildOpenAIAuthUrl(redirectUri, state, codeChallenge) {
    const params = new URLSearchParams({
      client_id: OPENAI_CONFIG.clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: OPENAI_CONFIG.scope,
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: OPENAI_CONFIG.codeChallengeMethod,
      ...OPENAI_CONFIG.extraParams,
    });

    return `${OPENAI_CONFIG.authorizeUrl}?${params.toString()}`;
  }

  /**
   * Exchange OpenAI authorization code for tokens
   */
  async exchangeOpenAICode(code, redirectUri, codeVerifier) {
    const response = await fetch(OPENAI_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: OPENAI_CONFIG.clientId,
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
  }

  /**
   * Save OpenAI tokens to server
   */
  async saveTokens(tokens) {
    const { server, token, userId } = getServerCredentials();

    const response = await fetch(`${server}/api/cli/providers/openai`, {
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
        idToken: tokens.id_token,
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
   * Complete OpenAI OAuth flow
   */
  async connect() {
    const spinner = createSpinner("Starting OpenAI OAuth...").start();

    try {
      spinner.text = "Starting local server...";

      // Authenticate and get authorization code
      const { code, codeVerifier, redirectUri } = await this.authenticate(
        "OpenAI",
        this.buildOpenAIAuthUrl.bind(this)
      );

      spinner.start("Exchanging code for tokens...");

      // Exchange code for tokens
      const tokens = await this.exchangeOpenAICode(code, redirectUri, codeVerifier);

      spinner.text = "Saving tokens to server...";

      // Save tokens to server
      await this.saveTokens(tokens);

      spinner.succeed("OpenAI connected successfully!");
      return true;
    } catch (error) {
      spinner.fail(`Failed: ${error.message}`);
      throw error;
    }
  }
}
