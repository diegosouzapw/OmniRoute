import { BaseExecutor } from "./base.js";
import { PROVIDERS, OAUTH_ENDPOINTS } from "../config/constants.js";
import { getModelTargetFormat } from "../config/providerModels.js";

export class GithubExecutor extends BaseExecutor {
  constructor() {
    super("github", PROVIDERS.github);
  }

  buildUrl(model, stream, urlIndex = 0) {
    const targetFormat = getModelTargetFormat("gh", model);
    if (targetFormat === "openai-responses") {
      return (
        this.config.responsesBaseUrl ||
        this.config.baseUrl?.replace(/\/chat\/completions\/?$/, "/responses") ||
        "https://api.githubcopilot.com/responses"
      );
    }
    return this.config.baseUrl;
  }

  buildHeaders(credentials, stream = true) {
    const token = credentials.copilotToken || credentials.accessToken;
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "copilot-integration-id": "vscode-chat",
      "editor-version": "vscode/1.107.1",
      "editor-plugin-version": "copilot-chat/0.26.7",
      "user-agent": "GitHubCopilotChat/0.26.7",
      "openai-intent": "conversation-panel",
      "x-github-api-version": "2025-04-01",
      "x-request-id":
        crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      "x-vscode-user-agent-library-version": "electron-fetch",
      "X-Initiator": "user",
      Accept: stream ? "text/event-stream" : "application/json",
    };
  }

  async refreshCopilotToken(githubAccessToken, log) {
    try {
      const response = await fetch("https://api.github.com/copilot_internal/v2/token", {
        headers: {
          Authorization: `token ${githubAccessToken}`,
          "User-Agent": "GithubCopilot/1.0",
          "Editor-Version": "vscode/1.100.0",
          "Editor-Plugin-Version": "copilot/1.300.0",
          Accept: "application/json",
        },
      });
      if (!response.ok) return null;
      const data = await response.json();
      log?.info?.("TOKEN", "Copilot token refreshed");
      return { token: data.token, expiresAt: data.expires_at };
    } catch (error) {
      log?.error?.("TOKEN", `Copilot refresh error: ${error.message}`);
      return null;
    }
  }

  async refreshGitHubToken(refreshToken, log) {
    try {
      const response = await fetch(OAUTH_ENDPOINTS.github.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        }),
      });
      if (!response.ok) return null;
      const tokens = await response.json();
      log?.info?.("TOKEN", "GitHub token refreshed");
      return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || refreshToken,
        expiresIn: tokens.expires_in,
      };
    } catch (error) {
      log?.error?.("TOKEN", `GitHub refresh error: ${error.message}`);
      return null;
    }
  }

  async refreshCredentials(credentials, log) {
    let copilotResult = await this.refreshCopilotToken(credentials.accessToken, log);

    if (!copilotResult && credentials.refreshToken) {
      const githubTokens = await this.refreshGitHubToken(credentials.refreshToken, log);
      if (githubTokens?.accessToken) {
        copilotResult = await this.refreshCopilotToken(githubTokens.accessToken, log);
        if (copilotResult) {
          return {
            ...githubTokens,
            copilotToken: copilotResult.token,
            copilotTokenExpiresAt: copilotResult.expiresAt,
          };
        }
        return githubTokens;
      }
    }

    if (copilotResult) {
      return {
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
        copilotToken: copilotResult.token,
        copilotTokenExpiresAt: copilotResult.expiresAt,
      };
    }

    return null;
  }

  needsRefresh(credentials) {
    // Always refresh if no copilotToken
    if (!credentials.copilotToken) return true;

    if (credentials.copilotTokenExpiresAt) {
      // Handle both Unix timestamp (seconds) and ISO string
      let expiresAtMs = credentials.copilotTokenExpiresAt;
      if (typeof expiresAtMs === "number" && expiresAtMs < 1e12) {
        expiresAtMs = expiresAtMs * 1000; // Convert seconds to ms
      } else if (typeof expiresAtMs === "string") {
        expiresAtMs = new Date(expiresAtMs).getTime();
      }
      if (expiresAtMs - Date.now() < 5 * 60 * 1000) return true;
    }
    return super.needsRefresh(credentials);
  }
}

export default GithubExecutor;
