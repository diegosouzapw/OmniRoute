import crypto from "crypto";
import open from "open";
import { GEMINI_CONFIG } from "../constants/oauth.js";
import { getServerCredentials } from "../config/index.js";
import { startLocalServer } from "../utils/server.js";
import { spinner as createSpinner } from "../utils/ui.js";

/**
 * Gemini CLI (Google Cloud Code Assist) OAuth Service
 * Uses standard OAuth2 Authorization Code flow (no PKCE)
 */
export class GeminiCLIService {
  constructor() {
    this.config = GEMINI_CONFIG;
  }

  /**
   * Build Gemini CLI authorization URL
   */
  buildAuthUrl(redirectUri, state) {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: this.config.scopes.join(" "),
      state: state,
      access_type: "offline",
      prompt: "consent",
    });

    return `${this.config.authorizeUrl}?${params.toString()}`;
  }

  /**
   * Exchange authorization code for tokens
   */
  async exchangeCode(code, redirectUri) {
    const response = await fetch(this.config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  }

  /**
   * Fetch project ID from Google Cloud Code Assist
   */
  async fetchProjectId(accessToken) {
    const response = await fetch("https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "User-Agent": "google-api-nodejs-client/9.15.1",
        "X-Goog-Api-Client": "google-cloud-sdk vscode_cloudshelleditor/0.1",
        "Client-Metadata": JSON.stringify({
          ideType: "IDE_UNSPECIFIED",
          platform: "PLATFORM_UNSPECIFIED",
          pluginType: "GEMINI",
        }),
      },
      body: JSON.stringify({
        metadata: {
          ideType: "IDE_UNSPECIFIED",
          platform: "PLATFORM_UNSPECIFIED",
          pluginType: "GEMINI",
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch project ID: ${error}`);
    }

    const data = await response.json();

    // Extract project ID
    let projectId = "";
    if (typeof data.cloudaicompanionProject === "string") {
      projectId = data.cloudaicompanionProject.trim();
    } else if (data.cloudaicompanionProject?.id) {
      projectId = data.cloudaicompanionProject.id.trim();
    }

    if (!projectId) {
      throw new Error("No project ID found in response");
    }

    return projectId;
  }

  /**
   * Get user info from Google
   */
  async getUserInfo(accessToken) {
    const response = await fetch(`${this.config.userInfoUrl}?alt=json`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get user info: ${error}`);
    }

    return await response.json();
  }

  /**
   * Save Gemini CLI tokens to server
   */
  async saveTokens(tokens, userInfo, projectId) {
    const { server, token, userId } = getServerCredentials();

    const response = await fetch(`${server}/api/cli/providers/gemini-cli`, {
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
        email: userInfo.email,
        projectId: projectId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to save tokens");
    }

    return await response.json();
  }

  /**
   * Complete Gemini OAuth flow
   */
  async connect() {
    const spinner = createSpinner("Starting Gemini OAuth...").start();

    try {
      spinner.text = "Starting local server...";

      // Start local server for callback
      let callbackParams = null;
      const { port, close } = await startLocalServer((params) => {
        callbackParams = params;
      });

      const redirectUri = `http://localhost:${port}/callback`;
      spinner.succeed(`Local server started on port ${port}`);

      // Generate state
      const state = crypto.randomBytes(32).toString("base64url");

      // Build authorization URL
      const authUrl = this.buildAuthUrl(redirectUri, state);

      console.log("\nOpening browser for Google authentication...");
      console.log(`If browser doesn't open, visit:\n${authUrl}\n`);

      // Open browser
      await open(authUrl);

      // Wait for callback
      spinner.start("Waiting for Google authorization...");

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

      // Exchange code for tokens
      const tokens = await this.exchangeCode(callbackParams.code, redirectUri);

      spinner.text = "Fetching user info...";

      // Get user info
      const userInfo = await this.getUserInfo(tokens.access_token);

      spinner.text = "Fetching project ID...";

      // Fetch project ID
      const projectId = await this.fetchProjectId(tokens.access_token);

      spinner.text = "Saving tokens to server...";

      // Save tokens to server
      await this.saveTokens(tokens, userInfo, projectId);

      spinner.succeed(
        `Gemini CLI connected successfully! (${userInfo.email}, Project: ${projectId})`
      );
      return true;
    } catch (error) {
      spinner.fail(`Failed: ${error.message}`);
      throw error;
    }
  }
}
