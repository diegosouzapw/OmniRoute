import { BaseExecutor } from "./base.js";
import { PROVIDERS, OAUTH_ENDPOINTS } from "../config/constants.js";
import { getAccessToken } from "../services/tokenRefresh.js";

export class DefaultExecutor extends BaseExecutor {
  constructor(provider) {
    super(provider, PROVIDERS[provider] || PROVIDERS.openai);
  }

  buildUrl(model, stream, urlIndex = 0, credentials = null) {
    if (this.provider?.startsWith?.("openai-compatible-")) {
      const baseUrl = credentials?.providerSpecificData?.baseUrl || "https://api.openai.com/v1";
      const normalized = baseUrl.replace(/\/$/, "");
      const path = this.provider.includes("responses") ? "/responses" : "/chat/completions";
      return `${normalized}${path}`;
    }
    if (this.provider?.startsWith?.("anthropic-compatible-")) {
      const baseUrl = credentials?.providerSpecificData?.baseUrl || "https://api.anthropic.com/v1";
      const normalized = baseUrl.replace(/\/$/, "");
      return `${normalized}/messages`;
    }
    switch (this.provider) {
      case "claude":
      case "glm":
      case "kimi-coding":
      case "minimax":
      case "minimax-cn":
        return `${this.config.baseUrl}?beta=true`;
      case "gemini":
        return `${this.config.baseUrl}/${model}:${stream ? "streamGenerateContent?alt=sse" : "generateContent"}`;
      default:
        return this.config.baseUrl;
    }
  }

  buildHeaders(credentials, stream = true) {
    const headers = { "Content-Type": "application/json", ...this.config.headers };

    switch (this.provider) {
      case "gemini":
        credentials.apiKey
          ? (headers["x-goog-api-key"] = credentials.apiKey)
          : (headers["Authorization"] = `Bearer ${credentials.accessToken}`);
        break;
      case "claude":
        credentials.apiKey
          ? (headers["x-api-key"] = credentials.apiKey)
          : (headers["Authorization"] = `Bearer ${credentials.accessToken}`);
        break;
      case "glm":
      case "kimi-coding":
      case "minimax":
      case "minimax-cn":
        headers["x-api-key"] = credentials.apiKey || credentials.accessToken;
        break;
      default:
        if (this.provider?.startsWith?.("anthropic-compatible-")) {
          if (credentials.apiKey) {
            headers["x-api-key"] = credentials.apiKey;
          } else if (credentials.accessToken) {
            headers["Authorization"] = `Bearer ${credentials.accessToken}`;
          }
          if (!headers["anthropic-version"]) {
            headers["anthropic-version"] = "2023-06-01";
          }
        } else {
          headers["Authorization"] = `Bearer ${credentials.apiKey || credentials.accessToken}`;
        }
    }

    if (stream) headers["Accept"] = "text/event-stream";
    return headers;
  }

  /**
   * For compatible providers, ensure the model name sent upstream
   * is the clean model name without any internal routing prefix.
   * e.g. "openapi-chat-anti/claude-opus-4-6-thinking" → "claude-opus-4-6-thinking"
   */
  transformRequest(model, body, stream, credentials) {
    if (
      this.provider?.startsWith?.("openai-compatible-") ||
      this.provider?.startsWith?.("anthropic-compatible-")
    ) {
      const cleanModel = model.includes("/") ? model.split("/").pop() : model;
      return { ...body, model: cleanModel };
    }
    return body;
  }

  /**
   * Refresh credentials via the centralized tokenRefresh service.
   * Delegates to getAccessToken() which handles all providers with
   * race-condition protection (deduplication via refreshPromiseCache).
   */
  async refreshCredentials(credentials, log) {
    if (!credentials.refreshToken) return null;
    try {
      return await getAccessToken(this.provider, credentials, log);
    } catch (error) {
      log?.error?.("TOKEN", `${this.provider} refresh error: ${error.message}`);
      return null;
    }
  }
}

export default DefaultExecutor;
