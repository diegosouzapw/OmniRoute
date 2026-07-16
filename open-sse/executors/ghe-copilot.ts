import { GithubExecutor } from "./github.ts";
import type { ProviderCredentials, ExecuteInput } from "./base.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";

export class GheCopilotExecutor extends GithubExecutor {
  constructor(config?: Record<string, unknown>) {
    super("ghe-copilot", {
      format: "openai",
      baseUrl: "https://api.githubcopilot.com/chat/completions",
      responsesBaseUrl: "https://api.githubcopilot.com/responses",
      authType: "oauth",
      authHeader: "bearer",
      ...config,
    });
  }

  /**
   * Derive the base URL for chat/completions from gheUrl in providerSpecificData.
   * Appends /chat/completions if not already present.
   */
  private getChatCompletionsBase(credentials: ProviderCredentials | null): string {
    const gheUrl = credentials?.providerSpecificData?.gheUrl as string | undefined;
    if (!gheUrl) {
      throw new Error("GHE Copilot executor requires gheUrl in providerSpecificData");
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
  private getResponsesBase(credentials: ProviderCredentials | null): string {
    const gheUrl = credentials?.providerSpecificData?.gheUrl as string | undefined;
    if (!gheUrl) {
      throw new Error("GHE Copilot executor requires gheUrl in providerSpecificData");
    }
    const chatBase = this.getChatCompletionsBase(credentials);
    return chatBase.replace(/\/chat\/completions\/?$/, "/responses");
  }

  override buildUrl(model: string, stream: boolean, urlIndex = 0, credentials: ProviderCredentials | null = null): string {
    const targetFormat = getModelTargetFormat("gh", model);
    
    // GHE requires gheUrl in credentials - throw if not provided
    const gheUrl = credentials?.providerSpecificData?.gheUrl as string | undefined;
    if (!gheUrl) {
      throw new Error("GHE Copilot executor requires gheUrl in providerSpecificData");
    }
    
    // Reuse the same logic as GithubExecutor but with GHE base URLs
    if (
      (targetFormat === "openai-responses" || /codex/i.test(model)) &&
      this.supportsResponsesEndpoint(model)
    ) {
      return this.getResponsesBase(credentials);
    }
    return this.getChatCompletionsBase(credentials);
  }

  override async refreshCopilotToken(
    githubAccessToken: string,
    log?: { info?: (cat: string, msg: string) => void; error?: (cat: string, msg: string) => void },
    credentials?: ProviderCredentials | null
  ): Promise<{ token: string; expiresAt: string | number } | null> {
    const gheUrl = credentials?.providerSpecificData?.gheUrl as string | undefined;
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
    log?: { info?: (cat: string, msg: string) => void; error?: (cat: string, msg: string) => void },
    credentials?: ProviderCredentials | null
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  } | null> {
    const gheUrl = credentials?.providerSpecificData?.gheUrl as string | undefined;
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