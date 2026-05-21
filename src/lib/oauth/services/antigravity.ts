import crypto from "crypto";
import open from "open";
import { ANTIGRAVITY_CONFIG } from "../constants/oauth";
import {
  antigravityNativeOAuthUserAgent,
  getAntigravityHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { getServerCredentials } from "../config/index";
import { startLocalServer } from "../utils/server";
import { spinner as createSpinner } from "../utils/ui";

/**
 * Antigravity OAuth Service
 * Uses standard OAuth2 Authorization Code flow (similar to Gemini)
 */
export class AntigravityService {
  config: any;

  constructor() {
    this.config = ANTIGRAVITY_CONFIG;
  }

  /**
   * Build Antigravity authorization URL
   */
  buildAuthUrl(redirectUri: string, state: string) {
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
  async exchangeCode(code: string, redirectUri: string) {
    const response = await fetch(this.config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "User-Agent": antigravityNativeOAuthUserAgent(),
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
   * Get user info from Google
   */
  async getUserInfo(accessToken: string) {
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
   * Get common headers for Antigravity API calls
   */
  getApiHeaders(accessToken: string) {
    return getAntigravityHeaders("loadCodeAssist", accessToken);
  }

  /**
   * Get metadata object for API calls
   */
  getMetadata() {
    return getAntigravityLoadCodeAssistMetadata();
  }

  private getEndpointList(key: string, fallbackKey: string) {
    const endpoints = this.config[key];
    if (Array.isArray(endpoints) && endpoints.length > 0) return endpoints;
    const fallback = this.config[fallbackKey];
    return typeof fallback === "string" && fallback ? [fallback] : [];
  }

  private async fetchFirstOk(endpoints: string[], init: RequestInit, label: string) {
    let lastError: unknown = null;
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, init);
        if (response.ok) return response;
        lastError = new Error(`${response.status} ${await response.text()}`);
      } catch (error) {
        lastError = error;
      }
    }

    const message =
      lastError instanceof Error ? lastError.message : String(lastError || "no endpoints");
    throw new Error(`Failed to ${label}: ${message}`);
  }

  /**
   * Fetch Project ID and Tier from loadCodeAssist API
   */
  async loadCodeAssist(accessToken: string) {
    const response = await this.fetchFirstOk(
      this.getEndpointList("loadCodeAssistEndpoints", "loadCodeAssistEndpoint"),
      {
        method: "POST",
        headers: this.getApiHeaders(accessToken),
        body: JSON.stringify({ metadata: this.getMetadata() }),
      },
      "load code assist"
    );

    const data = await response.json();

    // Extract project ID
    let projectId = data.cloudaicompanionProject;
    if (typeof projectId === "object" && projectId !== null && projectId.id) {
      projectId = projectId.id;
    }

    // Extract tier ID (default to legacy-tier)
    let tierId = "legacy-tier";
    if (Array.isArray(data.allowedTiers)) {
      for (const tier of data.allowedTiers) {
        if (tier.isDefault && tier.id) {
          tierId = tier.id.trim();
          break;
        }
      }
    }

    return { projectId, tierId, raw: data };
  }

  /**
   * Onboard user to enable Gemini Code Assist for the project
   */
  async onboardUser(accessToken: string, tierId: string) {
    const response = await this.fetchFirstOk(
      this.getEndpointList("onboardUserEndpoints", "onboardUserEndpoint"),
      {
        method: "POST",
        headers: this.getApiHeaders(accessToken),
        body: JSON.stringify({
          tier_id: tierId,
          metadata: this.getMetadata(),
        }),
      },
      "onboard user"
    );

    return await response.json();
  }

  /**
   * Complete onboarding flow with retry
   */
  async completeOnboarding(
    accessToken: string,
    projectId: string,
    tierId: string,
    maxRetries = 10
  ) {
    for (let i = 0; i < maxRetries; i++) {
      const result = await this.onboardUser(accessToken, tierId);

      if (result.done === true) {
        // Extract final project ID from response
        let finalProjectId = projectId;
        if (result.response?.cloudaicompanionProject) {
          const respProject = result.response.cloudaicompanionProject;
          if (typeof respProject === "string") {
            finalProjectId = respProject.trim();
          } else if (respProject.id) {
            finalProjectId = respProject.id.trim();
          }
        }
        return { success: true, projectId: finalProjectId };
      }

      // Wait 5 seconds before retry
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    throw new Error("Onboarding timeout - please try again");
  }

  /**
   * Fetch Project ID from loadCodeAssist API (legacy method for compatibility)
   */
  async fetchProjectId(accessToken: string) {
    const { projectId } = await this.loadCodeAssist(accessToken);
    if (!projectId) {
      throw new Error("No cloudaicompanionProject found in response");
    }
    return projectId;
  }

  /**
   * Save Antigravity tokens to server
   */
  async saveTokens(tokens: any, userInfo: any, projectId: string) {
    const { server, token, userId } = getServerCredentials();

    const response = await fetch(`${server}/api/cli/providers/antigravity`, {
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
        projectId: projectId, // Send projectId to server
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to save tokens");
    }

    return await response.json();
  }

  /**
   * Complete Antigravity OAuth flow
   */
  async connect() {
    const spinner = createSpinner("Starting Antigravity OAuth...").start();

    try {
      spinner.text = "Starting local server...";

      // Start local server for callback
      let callbackParams: any = null;
      const { port, close } = await startLocalServer((params) => {
        callbackParams = params;
      });

      const redirectUri = `http://localhost:${port}/callback`;
      spinner.succeed(`Local server started on port ${port}`);

      // Generate state
      const state = crypto.randomBytes(32).toString("base64url");

      // Build authorization URL
      const authUrl = this.buildAuthUrl(redirectUri, state);

      console.log("\nOpening browser for Antigravity authentication...");
      console.log(`If browser doesn't open, visit:\n${authUrl}\n`);

      // Open browser
      await open(authUrl);

      // Wait for callback
      spinner.start("Waiting for Antigravity authorization...");

      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Authentication timeout (5 minutes)"));
        }, 300000);

        const checkInterval = setInterval(() => {
          if (callbackParams) {
            clearInterval(checkInterval);
            clearTimeout(timeout);
            resolve(undefined);
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

      spinner.text = "Loading Code Assist configuration...";

      // Load Code Assist to get project ID and tier
      const { projectId, tierId } = await this.loadCodeAssist(tokens.access_token);

      if (!projectId) {
        throw new Error(
          "No Google Cloud Project found. Please ensure you have a GCP project with Gemini Code Assist enabled."
        );
      }

      spinner.text = "Onboarding to Gemini Code Assist...";

      // Complete onboarding to enable Gemini Code Assist
      const onboardResult = await this.completeOnboarding(tokens.access_token, projectId, tierId);
      const finalProjectId = onboardResult.projectId || projectId;

      spinner.text = "Saving tokens to server...";

      // Save tokens to server
      await this.saveTokens(tokens, userInfo, finalProjectId);

      spinner.succeed(
        `Antigravity connected successfully! (${userInfo.email}, Project: ${finalProjectId})`
      );
      return true;
    } catch (error: any) {
      spinner.fail(`Failed: ${error.message}`);
      throw error;
    }
  }
}
