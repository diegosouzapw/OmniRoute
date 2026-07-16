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
    // Prefer the dynamic proxy host returned by the GHE token endpoint
    // (endpoints.proxy). Fall back to the static gheUrl/chat/completions path.
    const psd = credentials?.providerSpecificData as Record<string, any> | undefined;
    const proxy = typeof psd?.copilotProxyUrl === "string" ? psd.copilotProxyUrl : undefined;
    if (proxy) {
      const base = proxy.replace(/\/+$/, "");
      return base.endsWith("/chat/completions") ? base : `${base}/chat/completions`;
    }
    const gheUrl = psd?.gheUrl as string | undefined;
    if (!gheUrl) {
      throw new Error("GHE Copilot executor requires gheUrl in providerSpecificData");
    }
    const base = gheUrl.replace(/\/$/, "");
    return base.endsWith("/chat/completions") ? base : `${base}/chat/completions`;
  }

  /**
   * Strip the `ghe-copilot/` provider prefix from a model id so the upstream
   * GHE Copilot proxy receives the bare id (e.g. `gpt-5-mini`).
   */
  private stripPrefix(model: string): string {
    return typeof model === "string" && model.startsWith("ghe-copilot/")
      ? model.slice("ghe-copilot/".length)
      : model;
  }

  override buildUrl(model: string, stream: boolean, urlIndex = 0, credentials: ProviderCredentials | null = null): string {
    // GHE Copilot proxy only reliably serves /chat/completions. Route every
    // model there (including ones flagged openai-responses) and let the
    // Responses→Chat transformer handle the format. Going to /responses on the
    // GHE proxy returns a bare 404 ("404 page not found").
    return this.getChatCompletionsBase(credentials);
  }

  /**
   * Strip the `ghe-copilot/` provider prefix from the model before sending to
   * the upstream GHE Copilot proxy, which expects bare model ids.
   */
  override transformRequest(model: string, body: any, stream: boolean, credentials: any): any {
    const bareModel = this.stripPrefix(model);
    const transformed = super.transformRequest(bareModel, body, stream, credentials);
    if (transformed && typeof transformed === "object" && typeof transformed.model === "string") {
      transformed.model = this.stripPrefix(transformed.model);
    }
    // GHE Copilot proxy rejects `stream: false` ("stream": false is not supported).
    // Only forward the flag when actually streaming; omit it otherwise.
    if (transformed && typeof transformed === "object" && !stream && "stream" in transformed) {
      delete transformed.stream;
    }
    return transformed;
  }

  override async refreshCopilotToken(
    githubAccessToken: string,
    log?: { info?: (cat: string, msg: string) => void; error?: (cat: string, msg: string) => void },
    credentials?: ProviderCredentials | null
  ): Promise<{ token: string; expiresAt: string | number; endpoints?: { proxy?: string; api?: string } } | null> {
    const gheUrl = credentials?.providerSpecificData?.gheUrl as string | undefined;
    if (!gheUrl) return null;

    try {
      const baseUrl = gheUrl.replace(/\/chat\/completions\/?$/, "").replace(/\/responses\/?$/, "");
      const tokenUrl = `${baseUrl}/api/v3/copilot_internal/v2/token`;

      const response = await fetch(tokenUrl, {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) return null;
      const data = await response.json();
      log?.info?.("TOKEN", "GHE Copilot token refreshed");
      // GHE returns a dynamic `endpoints` object; the chat/responses proxy host
      // lives at endpoints.proxy (NOT a static path on the GHE web host).
      const endpoints = data.endpoints
        ? { proxy: data.endpoints.proxy, api: data.endpoints.api }
        : undefined;
      return {
        token: data.token,
        expiresAt: data.expires_at,
        ...(endpoints ? { endpoints } : {}),
      };
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

  /**
   * Refresh credentials and capture the GHE Copilot proxy URL (endpoints.proxy)
   * returned by the token endpoint, storing it in providerSpecificData so
   * buildUrl routes chat/responses traffic to the correct enterprise host.
   */
  override async refreshCredentials(credentials: any, log?: any) {
    let copilotResult = await this.refreshCopilotToken(credentials?.accessToken, log, credentials);

    if (!copilotResult && credentials?.refreshToken) {
      const githubTokens = await this.refreshGitHubToken(credentials.refreshToken, log, credentials);
      if (githubTokens?.accessToken) {
        copilotResult = await this.refreshCopilotToken(githubTokens.accessToken, log, credentials);
        if (copilotResult) {
          return {
            ...githubTokens,
            copilotToken: copilotResult.token,
            copilotTokenExpiresAt: copilotResult.expiresAt,
            providerSpecificData: {
              ...credentials?.providerSpecificData,
              copilotToken: copilotResult.token,
              copilotTokenExpiresAt: copilotResult.expiresAt,
              copilotProxyUrl: copilotResult.endpoints?.proxy,
              gheUrl: credentials?.providerSpecificData?.gheUrl,
            },
          };
        }
        return githubTokens;
      }
    }

    if (copilotResult) {
      return {
        accessToken: credentials?.accessToken,
        refreshToken: credentials?.refreshToken,
        copilotToken: copilotResult.token,
        copilotTokenExpiresAt: copilotResult.expiresAt,
        providerSpecificData: {
          ...credentials?.providerSpecificData,
          copilotToken: copilotResult.token,
          copilotTokenExpiresAt: copilotResult.expiresAt,
          copilotProxyUrl: copilotResult.endpoints?.proxy,
          gheUrl: credentials?.providerSpecificData?.gheUrl,
        },
      };
    }

    return null;
  }
}

export default GheCopilotExecutor;