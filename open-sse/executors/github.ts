import { BaseExecutor, ExecuteInput, type ProviderCredentials } from "./base.ts";
import { PROVIDERS, OAUTH_ENDPOINTS } from "../config/constants.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";
import {
  getGitHubCopilotChatHeaders,
  getGitHubCopilotRefreshHeaders,
} from "../config/providerHeaderProfiles.ts";

export class GithubExecutor extends BaseExecutor {
  constructor() {
    super("github", PROVIDERS.github);
  }

  getCopilotToken(credentials: Record<string, any> | null | undefined) {
    return credentials?.copilotToken || credentials?.providerSpecificData?.copilotToken || null;
  }

  getCopilotTokenExpiresAt(credentials: Record<string, any> | null | undefined) {
    return (
      credentials?.copilotTokenExpiresAt ||
      credentials?.providerSpecificData?.copilotTokenExpiresAt ||
      null
    );
  }

  buildUrl(model: string, _stream: boolean, _urlIndex = 0) {
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

  injectResponseFormat(messages: Array<Record<string, any>>, responseFormat: any) {
    if (!responseFormat) return messages;

    let formatInstruction = "";
    if (responseFormat.type === "json_object") {
      formatInstruction =
        "Respond only with valid JSON. Do not include any text before or after the JSON object.";
    } else if (responseFormat.type === "json_schema" && responseFormat.json_schema) {
      formatInstruction = `Respond only with valid JSON matching this schema:\n${JSON.stringify(
        responseFormat.json_schema.schema,
        null,
        2
      )}\nDo not include any text before or after the JSON.`;
    }

    if (!formatInstruction) return messages;

    const systemIdx = messages.findIndex((m) => m.role === "system");
    if (systemIdx >= 0) {
      return messages.map((m, i: number) =>
        i === systemIdx ? { ...m, content: `${m.content}\n\n${formatInstruction}` } : m
      );
    }

    return [{ role: "system", content: formatInstruction }, ...messages];
  }

  transformRequest(model: string, body: any, stream: boolean, credentials: any): any {
    void stream;
    void credentials;

    const sourceBody = body && typeof body === "object" ? body : {};
    const modifiedBody = { ...sourceBody };

    if (Array.isArray(sourceBody.messages)) {
      modifiedBody.messages = sourceBody.messages.map((msg) => {
        if (!msg || typeof msg !== "object") return msg;
        const role = typeof msg.role === "string" ? msg.role.toLowerCase() : "";
        if (role !== "assistant") return msg;
        if (msg.reasoning_text === undefined && msg.reasoning_content === undefined) return msg;
        const next = { ...msg };
        delete next.reasoning_text;
        delete next.reasoning_content;
        return next;
      });
    }

    if (modifiedBody.response_format && model.toLowerCase().includes("claude")) {
      modifiedBody.messages = this.injectResponseFormat(
        Array.isArray(modifiedBody.messages) ? modifiedBody.messages : [],
        modifiedBody.response_format
      );
      delete modifiedBody.response_format;
    }

    if (Array.isArray(modifiedBody.tools) && modifiedBody.tools.length > 128) {
      modifiedBody.tools = modifiedBody.tools.slice(0, 128);
    }

    return modifiedBody;
  }

  async execute(input: ExecuteInput) {
    const result = await super.execute(input);
    if (!result || !result.response) return result;

    if (!input.stream) {
      // wreq-js clone/text semantics consume the original response body. Materialize
      // non-streaming responses immediately so downstream code always sees a native
      // fetch Response with a readable body.
      const status = result.response.status;
      const statusText = result.response.statusText;
      const headers = new Headers(result.response.headers);
      const payload = await result.response.text();
      result.response = new Response(payload, { status, statusText, headers });
      return result;
    }

    return result;
  }

  buildHeaders(
    credentials: ProviderCredentials,
    stream = true,
    clientHeaders?: Record<string, string> | null
  ): Record<string, string> {
    const token = this.getCopilotToken(credentials) || credentials.accessToken;

    // Forward the client's x-initiator header when present. OpenCode and other
    // Copilot-aware clients use this to distinguish user-initiated turns
    // (x-initiator: user) from autonomous tool-call continuations
    // (x-initiator: agent). GitHub Copilot's billing treats "agent" turns as
    // free, so forwarding the value avoids burning a premium request on every
    // tool-call round-trip.  Fall back to "user" when the header is absent to
    // preserve the existing default behaviour.
    let clientInitiator = clientHeaders?.["x-initiator"] || clientHeaders?.["X-Initiator"];
    if (!clientInitiator && clientHeaders) {
      for (const key in clientHeaders) {
        if (key.toLowerCase() === "x-initiator") {
          clientInitiator = clientHeaders[key];
          break;
        }
      }
    }
    const initiator =
      clientInitiator === "agent" || clientInitiator === "user" ? clientInitiator : "user";

    return {
      ...getGitHubCopilotChatHeaders(stream ? "text/event-stream" : "application/json", initiator),
      Authorization: `Bearer ${token}`,
      "x-request-id":
        crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };
  }

  async refreshCopilotToken(githubAccessToken, log) {
    try {
      const response = await fetch("https://api.github.com/copilot_internal/v2/token", {
        headers: getGitHubCopilotRefreshHeaders(`token ${githubAccessToken}`),
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
            providerSpecificData: {
              copilotToken: copilotResult.token,
              copilotTokenExpiresAt: copilotResult.expiresAt,
            },
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
        providerSpecificData: {
          copilotToken: copilotResult.token,
          copilotTokenExpiresAt: copilotResult.expiresAt,
        },
      };
    }

    return null;
  }

  needsRefresh(credentials) {
    // Always refresh if no copilotToken
    if (!this.getCopilotToken(credentials)) return true;

    const copilotTokenExpiresAt = this.getCopilotTokenExpiresAt(credentials);
    if (copilotTokenExpiresAt) {
      // Handle both Unix timestamp (seconds) and ISO string
      let expiresAtMs = copilotTokenExpiresAt;
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
