import open from "open";
import { OAuthService } from "./oauth.js";
import { CODEX_CONFIG } from "../constants/oauth.js";
import { getServerCredentials } from "../config/index.js";
import { startLocalServer } from "../utils/server.js";
import { generatePKCE } from "../utils/pkce.js";
import { spinner as createSpinner } from "../utils/ui.js";

/**
 * Codex (OpenAI) OAuth Service
 */
export class CodexService extends OAuthService {
  constructor() {
    super(CODEX_CONFIG);
  }

  /**
   * Build Codex authorization URL
   */
  buildCodexAuthUrl(redirectUri, state, codeChallenge) {
    // Build URL manually to ensure space encoding as %20 instead of +
    const params = {
      response_type: "code",
      client_id: CODEX_CONFIG.clientId,
      redirect_uri: redirectUri,
      scope: CODEX_CONFIG.scope,
      code_challenge: codeChallenge,
      code_challenge_method: CODEX_CONFIG.codeChallengeMethod,
      ...CODEX_CONFIG.extraParams,
      state: state,
    };

    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    return `${CODEX_CONFIG.authorizeUrl}?${queryString}`;
  }

  /**
   * Save Codex tokens to server
   */
  async saveTokens(tokens) {
    const { server, token, userId } = getServerCredentials();

    const response = await fetch(`${server}/api/cli/providers/codex`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-User-Id": userId,
      },
      body: JSON.stringify({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        idToken: tokens.id_token,
        expiresIn: tokens.expires_in,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to save tokens");
    }

    return await response.json();
  }

  /**
   * Complete Codex OAuth flow
   */
  async connect() {
    const spinner = createSpinner("Starting Codex OAuth...").start();

    try {
      spinner.text = "Starting local server...";

      // Start local server for callback (use fixed port 1455 like real Codex CLI)
      const fixedPort = 1455;
      let callbackParams = null;
      const { port, close } = await startLocalServer((params) => {
        callbackParams = params;
      }, fixedPort);

      const redirectUri = `http://localhost:${port}/auth/callback`;
      spinner.succeed(`Local server started on port ${port}`);

      // Generate PKCE
      const { codeVerifier, codeChallenge, state } = generatePKCE();

      // Build authorization URL
      const authUrl = this.buildCodexAuthUrl(redirectUri, state, codeChallenge);

      console.log("\nOpening browser for OpenAI authentication...");
      console.log(`If browser doesn't open, visit:\n${authUrl}\n`);

      // Open browser
      await open(authUrl);

      // Wait for callback
      spinner.start("Waiting for OpenAI authorization...");

      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Authentication timeout (5 minutes)"));
        }, 300000);

        const checkInterval = setInterval(() => {
          if (callbackParams) {
            clearInterval(checkInterval);
            clearTimeout(timeout);
            resolve();
          }
        }, 100);
      });

      close();

      if (callbackParams.error) {
        throw new Error(callbackParams.error_description || callbackParams.error);
      }

      if (!callbackParams.code) {
        throw new Error("No authorization code received");
      }

      spinner.start("Exchanging code for tokens...");

      // Exchange code for tokens (Codex uses form-urlencoded)
      const tokens = await this.exchangeCode(
        callbackParams.code,
        redirectUri,
        codeVerifier,
        "application/x-www-form-urlencoded"
      );

      spinner.text = "Saving tokens to server...";

      // Save tokens to server
      await this.saveTokens(tokens);

      spinner.succeed("Codex connected successfully!");
      return true;
    } catch (error) {
      spinner.fail(`Failed: ${error.message}`);
      throw error;
    }
  }
}
