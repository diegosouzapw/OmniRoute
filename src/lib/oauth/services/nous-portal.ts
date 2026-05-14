import open from "open";
import { startLocalServer } from "../utils/server";
import { generatePKCE } from "../utils/pkce";
import { spinner as createSpinner } from "../utils/ui";
import { NOUS_PORTAL_CONFIG, OAUTH_TIMEOUT } from "../constants/oauth";

/**
 * Nous Portal OAuth Service
 * Uses Device Code Flow + Agent Key minting (unique to Nous Portal).
 */
export class NousPortalService {
  config: typeof NOUS_PORTAL_CONFIG;

  constructor() {
    this.config = NOUS_PORTAL_CONFIG;
  }

  /**
   * Request device code for Nous Portal authentication.
   */
  async requestDeviceCode(codeChallenge: string) {
    const response = await fetch(`${this.config.authorizeUrl}`, {
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
   * Poll for token using device code.
   */
  async pollForToken(deviceCode: string, codeVerifier: string, interval = 5000) {
    const spinner = createSpinner("Waiting for Nous Portal authentication...").start();

    // Show user code and verification URL
    console.log(`\nPlease visit: ${this.config.authorizeUrl}`);
    console.log(`Enter code: ${deviceCode}\n`);

    // Try to open browser
    try {
      await open(this.config.authorizeUrl);
    } catch {
      console.log("Could not open browser automatically. Please visit the URL above manually.");
    }

    const deadline = Date.now() + OAUTH_TIMEOUT;

    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, interval));

      const response = await fetch(`${this.config.tokenUrl}`, {
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

      const data = await response.json();

      if (data.access_token) {
        spinner.succeed("Nous Portal authentication successful!");
        return data;
      } else if (data.error === "authorization_pending") {
        continue;
      } else if (data.error === "slow_down") {
        interval += 5000;
        continue;
      } else if (data.error === "expired_token") {
        spinner.fail("Device code expired. Please try again.");
        throw new Error("Device code expired");
      } else if (data.error === "access_denied") {
        spinner.fail("Access denied by user.");
        throw new Error("Access denied");
      } else {
        spinner.fail("Failed to get access token.");
        throw new Error(data.error_description || data.error);
      }
    }

    throw new Error("Timed out waiting for Nous Portal device authorization.");
  }

  /**
   * Mint an agent API key using the portal access token.
   * This is unique to Nous Portal — the OAuth token alone isn't used for inference.
   */
  async mintAgentKey(portalAccessToken: string) {
    const response = await fetch(`${this.config.agentKeyUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${portalAccessToken}`,
      },
      body: JSON.stringify({ min_ttl_seconds: this.config.minKeyTtlSeconds }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Agent key mint failed: ${error}`);
    }

    const data = await response.json();

    if (!data.api_key) {
      throw new Error("Agent key mint response missing api_key");
    }

    return data;
  }

  /**
   * Complete Nous Portal authentication flow.
   */
  async authenticate(): Promise<any> {
    const { codeVerifier, codeChallenge, state } = generatePKCE();

    // Start local server for callback
    const spinner = createSpinner("Starting local server...").start();
    const { port, close } = await startLocalServer(() => {});
    const redirectUri = `http://localhost:${port}/callback`;
    spinner.succeed(`Local server started on port ${port}`);

    // Request device code
    const deviceResponse = await this.requestDeviceCode(codeChallenge);

    console.log(`\nPlease visit: ${deviceResponse.verification_uri_complete}`);
    console.log(`Enter code: ${deviceResponse.user_code}\n`);

    // Poll for token
    const tokenResponse = await this.pollForToken(
      deviceResponse.device_code,
      codeVerifier,
      deviceResponse.interval ? deviceResponse.interval * 1000 : 5000
    );

    // Close local server
    close();

    // Mint agent key
    const mintResponse = await this.mintAgentKey(tokenResponse.access_token);

    return {
      accessToken: mintResponse.api_key,
      refreshToken: tokenResponse.refresh_token || null,
      expiresIn: mintResponse.expires_in || this.config.minKeyTtlSeconds,
      portalAccessToken: tokenResponse.access_token,
      portalAccessTokenExpires: tokenResponse.expires_in
        ? Date.now() + tokenResponse.expires_in * 1000
        : null,
      inferenceBaseUrl:
        mintResponse.inference_base_url || "https://inference-api.nousresearch.com/v1",
      providerSpecificData: {
        keyId: mintResponse.key_id,
        reused: mintResponse.reused,
      },
    };
  }
}
