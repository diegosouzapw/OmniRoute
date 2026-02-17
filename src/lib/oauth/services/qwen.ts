import open from "open";
import { QWEN_CONFIG } from "../constants/oauth";
import { getServerCredentials } from "../config/index";
import { generatePKCE } from "../utils/pkce";
import { spinner as createSpinner } from "../utils/ui";

/**
 * Qwen OAuth Service
 * Uses Device Code Flow with PKCE
 */
export class QwenService {
  constructor() {
    this.config = QWEN_CONFIG;
  }

  /**
   * Request device code
   */
  async requestDeviceCode(codeChallenge) {
    const response = await fetch(this.config.deviceCodeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: this.config.clientId,
        scope: this.config.scope,
        code_challenge: codeChallenge,
        code_challenge_method: this.config.codeChallengeMethod,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Device code request failed: ${error}`);
    }

    return await response.json();
  }

  /**
   * Poll for token
   */
  async pollForToken(deviceCode, codeVerifier, interval = 5) {
    const maxAttempts = 60; // 5 minutes
    const pollInterval = interval * 1000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise((r) => setTimeout(r, pollInterval));

      const response = await fetch(this.config.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          client_id: this.config.clientId,
          device_code: deviceCode,
          code_verifier: codeVerifier,
        }),
      });

      if (response.ok) {
        return await response.json();
      }

      const error = await response.json();

      if (error.error === "authorization_pending") {
        continue;
      } else if (error.error === "slow_down") {
        await new Promise((r) => setTimeout(r, 5000));
        continue;
      } else if (error.error === "expired_token") {
        throw new Error("Device code expired");
      } else if (error.error === "access_denied") {
        throw new Error("Access denied");
      } else {
        throw new Error(error.error_description || error.error);
      }
    }

    throw new Error("Authorization timeout");
  }

  /**
   * Save Qwen tokens to server
   */
  async saveTokens(tokens) {
    const { server, token, userId } = getServerCredentials();

    const response = await fetch(`${server}/api/cli/providers/qwen`, {
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
        resourceUrl: tokens.resource_url,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to save tokens");
    }

    return await response.json();
  }

  /**
   * Complete Qwen OAuth flow
   */
  async connect() {
    const spinner = createSpinner("Starting Qwen OAuth...").start();

    try {
      spinner.text = "Generating PKCE...";

      // Generate PKCE
      const { codeVerifier, codeChallenge } = generatePKCE();

      spinner.text = "Requesting device code...";

      // Request device code
      const deviceData = await this.requestDeviceCode(codeChallenge);

      spinner.stop();

      console.log("\n📋 Please visit the following URL and enter the code:\n");
      console.log(`   ${deviceData.verification_uri}\n`);
      console.log(`   Code: ${deviceData.user_code}\n`);

      // Open browser
      if (deviceData.verification_uri_complete) {
        await open(deviceData.verification_uri_complete);
      } else {
        await open(deviceData.verification_uri);
      }

      spinner.start("Waiting for authorization...");

      // Poll for token
      const tokens = await this.pollForToken(
        deviceData.device_code,
        codeVerifier,
        deviceData.interval || 5
      );

      spinner.text = "Saving tokens to server...";

      // Save tokens to server
      await this.saveTokens(tokens);

      spinner.succeed("Qwen connected successfully!");
      return true;
    } catch (error) {
      spinner.fail(`Failed: ${error.message}`);
      throw error;
    }
  }
}
