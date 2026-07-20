import { GithubExecutor } from "./github.ts";
import type { ProviderCredentials, ExecuteInput, ExecutorLog } from "./base.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";

/** Result of a successful GHE Copilot internal token exchange. */
type CopilotTokenResult = {
  token: string;
  expiresAt: string | number;
  endpoints?: { proxy?: string; api?: string };
};

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
    // The GHE token endpoint returns TWO hosts:
    //   endpoints.api   → copilotApiUrl   (chat/completions + the /models catalog)
    //   endpoints.proxy → copilotProxyUrl (NES / autocomplete / instant-apply only)
    // Chat MUST go to the api host. The proxy host only serves the completion
    // models (copilot-nes-*, instant-apply, suggestions) and 404s/errors for
    // real chat models. Prefer copilotApiUrl, fall back to copilotProxyUrl for
    // legacy connections, then the static gheUrl/chat/completions path.
    const psd = credentials?.providerSpecificData;
    const apiOrProxy =
      (typeof psd?.copilotApiUrl === "string" ? psd.copilotApiUrl : undefined) ||
      (typeof psd?.copilotProxyUrl === "string" ? psd.copilotProxyUrl : undefined);
    if (apiOrProxy) {
      const base = apiOrProxy.replace(/\/+$/, "");
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
  override transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const bareModel = this.stripPrefix(model);
    const transformed = super.transformRequest(bareModel, body, stream, credentials);
    if (transformed && typeof transformed === "object") {
      const record = transformed as Record<string, unknown>;
      if (typeof record.model === "string") {
        record.model = this.stripPrefix(record.model);
      }
      // GHE Copilot proxy is streaming-only: force stream:true upstream
      // (chatCore drains the SSE back to JSON for non-stream clients).
      record.stream = true;
    }
    return transformed;
  }

  override async refreshCopilotToken(
    githubAccessToken: string,
    log?: { info?: (cat: string, msg: string) => void; error?: (cat: string, msg: string) => void },
    credentials?: ProviderCredentials | null
  ): Promise<CopilotTokenResult | null> {
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
   * Merge a fresh Copilot token result into providerSpecificData, preserving
   * existing fields and updating the token/expiry/endpoint bookkeeping GHE
   * Copilot needs (copilotApiUrl for chat/models, copilotProxyUrl legacy
   * fallback, gheUrl for the next refresh round-trip).
   */
  private buildRefreshedProviderSpecificData(
    credentials: ProviderCredentials,
    copilotResult: CopilotTokenResult
  ): Record<string, unknown> {
    return {
      ...credentials?.providerSpecificData,
      copilotToken: copilotResult.token,
      copilotTokenExpiresAt: copilotResult.expiresAt,
      copilotApiUrl: copilotResult.endpoints?.api,
      copilotProxyUrl: copilotResult.endpoints?.proxy,
      gheUrl: credentials?.providerSpecificData?.gheUrl,
    };
  }

  /**
   * Fallback path when the cached GitHub access token can no longer mint a
   * Copilot token directly: refresh the GitHub OAuth token first, then retry
   * the Copilot token exchange with the new access token.
   */
  private async refreshViaGitHubToken(credentials: ProviderCredentials, log?: ExecutorLog | null) {
    const githubTokens = await this.refreshGitHubToken(
      credentials.refreshToken as string,
      log,
      credentials
    );
    if (!githubTokens?.accessToken) return null;

    const copilotResult = await this.refreshCopilotToken(githubTokens.accessToken, log, credentials);
    if (!copilotResult) return githubTokens;

    return {
      ...githubTokens,
      copilotToken: copilotResult.token,
      copilotTokenExpiresAt: copilotResult.expiresAt,
      providerSpecificData: this.buildRefreshedProviderSpecificData(credentials, copilotResult),
    };
  }

  /**
   * Refresh credentials and capture the GHE Copilot proxy URL (endpoints.proxy)
   * returned by the token endpoint, storing it in providerSpecificData so
   * buildUrl routes chat/responses traffic to the correct enterprise host.
   */
  override async refreshCredentials(credentials: ProviderCredentials, log?: ExecutorLog | null) {
    const copilotResult = await this.refreshCopilotToken(credentials?.accessToken, log, credentials);

    if (!copilotResult && credentials?.refreshToken) {
      return this.refreshViaGitHubToken(credentials, log);
    }

    if (copilotResult) {
      return {
        accessToken: credentials?.accessToken,
        refreshToken: credentials?.refreshToken,
        copilotToken: copilotResult.token,
        copilotTokenExpiresAt: copilotResult.expiresAt,
        providerSpecificData: this.buildRefreshedProviderSpecificData(credentials, copilotResult),
      };
    }

    return null;
  }
}

export default GheCopilotExecutor;