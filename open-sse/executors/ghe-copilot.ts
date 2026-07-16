import { GithubExecutor } from "./github.ts";
import type { ProviderCredentials, ExecuteInput } from "./base.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";

export class GheCopilotExecutor extends GithubExecutor {
  constructor(config: Record<string, unknown>) {
    // Ensure gheUrl is in config
    super({
      ...config,
      baseUrl: config.gheUrl,
      responsesBaseUrl: config.gheUrl?.replace(/\/chat\/completions\/?$/, "/responses"),
    });
  }

  /**
   * Derive the base URL for chat/completions from gheUrl.
   * Appends /chat/completions if not already present.
   */
  private getChatCompletionsBase(): string {
    const gheUrl = this.config.gheUrl;
    if (!gheUrl) {
      throw new Error("GHE Copilot executor requires gheUrl in config");
    }
    // Ensure it ends with /chat/completions
    if (gheUrl.endsWith("/chat/completions")) {
      return gheUrl;
    }
    // If it's just the base (e.g., https://ghe.company.com), append the path
    return `${gheUrl.replace(/\/$/, "")}/chat/completions`;
  }

  /**
   * Derive the responses API base URL from gheUrl.
   */
  private getResponsesBase(): string {
    const gheUrl = this.config.gheUrl;
    if (!gheUrl) {
      throw new Error("GHE Copilot executor requires gheUrl in config");
    }
    const chatBase = this.getChatCompletionsBase();
    return chatBase.replace(/\/chat\/completions\/?$/, "/responses");
  }

  override buildUrl(model: string, stream: boolean, urlIndex = 0): string {
    const targetFormat = (this as { getModelTargetFormat?: (provider: string, model: string) => string }).getModelTargetFormat?.("gh", model) 
      || getModelTargetFormat("gh", model);
    
    // Reuse the same logic as GithubExecutor but with GHE base URLs
    if (
      (targetFormat === "openai-responses" || /codex/i.test(model)) &&
      this.supportsResponsesEndpoint(model)
    ) {
      return this.config.responsesBaseUrl || this.getResponsesBase();
    }
    return this.config.baseUrl || this.getChatCompletionsBase();
  }

  override async refreshCopilotToken(
    githubAccessToken: string,
    log?: { info?: (cat: string, msg: string) => void; error?: (cat: string, msg: string) => void }
  ): Promise<{ token: string; expiresAt: string | number } | null> {
    const gheUrl = this.config.gheUrl;
    if (!gheUrl) return null;

    try {
      const baseUrl = gheUrl.replace(/\/chat\/completions\/?$/, "").replace(/\/responses\/?$/, "");
      const tokenUrl = `${baseUrl}/copilot_internal/v2/token`;
      
      const response = await fetch(tokenUrl, {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
          Accept: "application/json",
        },
      });
      
      if (!response.ok) return null;
      const data = await response.json();
      log?.info?.("TOKEN", "GHE Copilot token refreshed");
      return { token: data.token, expiresAt: data.expires_at };
    } catch (error) {
      log?.error?.("TOKEN", `GHE Copilot refresh error: ${error.message}`);
      return null;
    }
  }

  override async refreshGitHubToken(
    refreshToken: string,
    log?: { info?: (cat: string, msg: string) => void; error?: (cat: string, msg: string) => void }
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  } | null> {
    const gheUrl = this.config.gheUrl;
    if (!gheUrl) return null;

    try {
      // GHE OAuth token endpoint
      const baseUrl = gheUrl.replace(/\/chat\/completions\/?$/, "").replace(/\/responses\/?$/, "");
      const tokenUrl = `${baseUrl}/login/oauth/access_token`;
      
      const params = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: this.config.clientId,
      });
      
      if (this.config.clientSecret) {
        params.set("client_secret", this.config.clientSecret);
      }

      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: params,
      });
      
      if (!response.ok) return null;
      const tokens = await response.json();
      log?.info?.("TOKEN", "GHE GitHub token refreshed");
      return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || refreshToken,
        expiresIn: tokens.expires_in,
      };
    } catch (error) {
      log?.error?.("TOKEN", `GHE GitHub refresh error: ${error.message}`);
      return null;
    }
  }
}

export default GheCopilotExecutor;