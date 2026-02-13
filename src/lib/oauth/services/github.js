import { OAuthService } from "./oauth.js";
import { GITHUB_CONFIG } from "../constants/oauth.js";
import { spinner as createSpinner } from "../utils/ui.js";

/**
 * GitHub Copilot OAuth Service
 * Uses Device Code Flow for authentication
 */
export class GitHubService extends OAuthService {
  constructor() {
    super(GITHUB_CONFIG);
  }

  /**
   * Get device code for GitHub authentication
   */
  async getDeviceCode() {
    const response = await fetch(`${GITHUB_CONFIG.deviceCodeUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: GITHUB_CONFIG.clientId,
        scope: GITHUB_CONFIG.scopes,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get device code: ${error}`);
    }

    return await response.json();
  }

  /**
   * Poll for access token using device code
   */
  async pollAccessToken(deviceCode, verificationUri, userCode, interval = 5000) {
    const spinner = createSpinner("Waiting for GitHub authentication...").start();

    // Show user code and verification URL
    console.log(`\nPlease visit: ${verificationUri}`);
    console.log(`Enter code: ${userCode}\n`);

    // Open browser automatically
    try {
      const open = (await import("open")).default;
      await open(verificationUri);
    } catch (error) {
      console.log("Could not open browser automatically. Please visit the URL above manually.");
    }

    // Poll for access token
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, interval));

      const response = await fetch(`${GITHUB_CONFIG.tokenUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          client_id: GITHUB_CONFIG.clientId,
          device_code: deviceCode,
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        spinner.succeed("GitHub authentication successful!");
        return {
          access_token: data.access_token,
          token_type: data.token_type,
          scope: data.scope,
        };
      } else if (data.error === "authorization_pending") {
        // Continue polling
        continue;
      } else if (data.error === "slow_down") {
        // Increase polling interval
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
  }

  /**
   * Get Copilot token using GitHub access token
   */
  async getCopilotToken(accessToken) {
    const response = await fetch(`${GITHUB_CONFIG.copilotTokenUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // GitHub API typically uses Bearer
        Accept: "application/json",
        "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
        "User-Agent": GITHUB_CONFIG.userAgent,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get Copilot token: ${error}`);
    }

    return await response.json();
  }

  /**
   * Get user info using GitHub access token
   */
  async getUserInfo(accessToken) {
    const response = await fetch(`${GITHUB_CONFIG.userInfoUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // GitHub API typically uses Bearer
        Accept: "application/json",
        "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
        "User-Agent": GITHUB_CONFIG.userAgent,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get user info: ${error}`);
    }

    return await response.json();
  }

  /**
   * Complete GitHub Copilot authentication flow
   */
  async authenticate() {
    try {
      // Get device code
      const deviceResponse = await this.getDeviceCode();

      // Poll for access token
      const tokenResponse = await this.pollAccessToken(
        deviceResponse.device_code,
        deviceResponse.verification_uri,
        deviceResponse.user_code
      );

      // Get Copilot token
      const copilotToken = await this.getCopilotToken(tokenResponse.access_token);

      // Get user info
      const userInfo = await this.getUserInfo(tokenResponse.access_token);

      console.log(`\n✅ Successfully authenticated as ${userInfo.login}`);

      return {
        accessToken: tokenResponse.access_token,
        copilotToken: copilotToken.token,
        refreshToken: null, // GitHub device flow doesn't return refresh token
        expiresIn: copilotToken.expires_at,
        userInfo: {
          id: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          email: userInfo.email,
        },
        copilotTokenInfo: copilotToken,
      };
    } catch (error) {
      throw new Error(`GitHub authentication failed: ${error.message}`);
    }
  }

  /**
   * Connect to server with GitHub credentials
   */
  async connect() {
    try {
      // Authenticate with GitHub
      const authResult = await this.authenticate();

      // Send credentials to server
      const { server, token, userId } = await import("../config/index.js").then((m) =>
        m.getServerCredentials()
      );
      const spinner = (await import("../utils/ui.js")).spinner("Connecting to server...").start();

      const response = await fetch(`${server}/api/cli/providers/github`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-User-Id": userId,
        },
        body: JSON.stringify({
          accessToken: authResult.accessToken,
          copilotToken: authResult.copilotToken,
          userInfo: authResult.userInfo,
          copilotTokenInfo: authResult.copilotTokenInfo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to connect to server");
      }

      spinner.succeed("GitHub Copilot connected successfully!");
      console.log(`\nConnected as: ${authResult.userInfo.login}`);
    } catch (error) {
      const { error: showError } = await import("../utils/ui.js");
      showError(`GitHub connection failed: ${error.message}`);
      throw error;
    }
  }
}
