import { BaseExecutor, ExecuteInput } from "./base.ts";
import { PROVIDERS, OAUTH_ENDPOINTS } from "../config/constants.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";

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

  injectResponseFormat(messages: any[], responseFormat: any) {
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

    const systemIdx = messages.findIndex((m: any) => m.role === "system");
    if (systemIdx >= 0) {
      return messages.map((m: any, i: number) =>
        i === systemIdx ? { ...m, content: `${m.content}\n\n${formatInstruction}` } : m
      );
    }

    return [{ role: "system", content: formatInstruction }, ...messages];
  }

  transformRequest(model: string, body: any, stream: boolean, credentials: any): any {
    const modifiedBody = JSON.parse(JSON.stringify(body));
    if (modifiedBody.response_format && model.toLowerCase().includes("claude")) {
      modifiedBody.messages = this.injectResponseFormat(
        modifiedBody.messages,
        modifiedBody.response_format
      );
      delete modifiedBody.response_format;
    }
    return modifiedBody;
  }

  async execute(input: ExecuteInput) {
    const result = await super.execute(input);
    if (!result || !result.response?.body) return result;

    const isStreaming = input.stream === true;
    if (isStreaming) {
      const decoder = new TextDecoder();
      const transformStream = new TransformStream({
        transform(chunk, controller) {
          const text = decoder.decode(chunk, { stream: true });
          if (text.includes("data: [DONE]")) {
            return;
          }
          controller.enqueue(chunk);
        },
      });

      const newResponse = new Response(result.response.body.pipeThrough(transformStream), {
        status: result.response.status,
        statusText: result.response.statusText,
        headers: result.response.headers, // Headers class carries over correctly
      });
      result.response = newResponse;
    }

    return result;
  }

  buildHeaders(credentials, stream = true) {
    const token = credentials.copilotToken || credentials.accessToken;
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "copilot-integration-id": "vscode-chat",
      "editor-version": "vscode/1.110.0",
      "editor-plugin-version": "copilot-chat/0.38.0",
      "user-agent": "GitHubCopilotChat/0.38.0",
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
          "Editor-Version": "vscode/1.110.0",
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
