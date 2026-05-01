import { BaseExecutor } from "./base.ts";
import { PROVIDERS, OAUTH_ENDPOINTS } from "../config/constants.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";
import { getRotatingApiKey } from "../services/apiKeyRotator.ts";
import {
  buildClaudeCodeCompatibleHeaders,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  joinClaudeCodeCompatibleUrl,
} from "../services/claudeCodeCompatible.ts";
import { getGigachatAccessToken } from "../services/gigachatAuth.ts";
import { applyProviderRequestDefaults } from "../services/providerRequestDefaults.ts";
import {
  getOpenAICompatibleType,
  getTargetFormat,
  isClaudeCodeCompatible,
} from "../services/provider.ts";
import { sanitizeQwenThinkingToolChoice } from "../services/qwenThinking.ts";
import { buildDataRobotChatUrl } from "../config/datarobot.ts";
import { buildAzureAiChatUrl } from "../config/azureAi.ts";
import { buildBedrockChatUrl } from "../config/bedrock.ts";
import { buildWatsonxChatUrl } from "../config/watsonx.ts";
import { buildOciChatUrl } from "../config/oci.ts";
import { buildSapChatUrl, getSapResourceGroup } from "../config/sap.ts";
import { buildMaritalkChatUrl } from "../config/maritalk.ts";

function normalizeBaseUrl(baseUrl) {
  return (baseUrl || "").trim().replace(/\/$/, "");
}

function normalizeBailianMessagesUrl(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl).replace(/\?beta=true$/, "");
  const messagesUrl = normalized.endsWith("/messages") ? normalized : `${normalized}/messages`;
  return `${messagesUrl}?beta=true`;
}

function normalizeHerokuChatUrl(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (normalized.endsWith("/v1/chat/completions")) return normalized;
  return `${normalized}/v1/chat/completions`;
}

function normalizeDatabricksChatUrl(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (normalized.endsWith("/chat/completions")) return normalized;
  return `${normalized}/chat/completions`;
}

function normalizeDataRobotChatUrl(baseUrl) {
  return buildDataRobotChatUrl(baseUrl);
}

function normalizeAzureAiChatUrl(baseUrl: string, apiType: "chat" | "responses" = "chat") {
  return buildAzureAiChatUrl(baseUrl, apiType);
}

function normalizeWatsonxChatUrl(baseUrl: string) {
  return buildWatsonxChatUrl(baseUrl);
}

function normalizeOciChatUrl(baseUrl: string, apiType: "chat" | "responses" = "chat") {
  return buildOciChatUrl(baseUrl, apiType);
}

function normalizeSapChatUrl(baseUrl) {
  return buildSapChatUrl(baseUrl);
}

function normalizeXiaomiMimoChatUrl(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl).replace(/\/chat\/completions$/, "");
  return `${normalized}/chat/completions`;
}

function normalizeSnowflakeChatUrl(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl)
    .replace(/\/cortex\/inference:complete$/, "")
    .replace(/\/api\/v2$/, "");
  return `${normalized}/api/v2/cortex/inference:complete`;
}

function normalizeGigachatChatUrl(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl).replace(/\/chat\/completions$/, "");
  return `${normalized}/chat/completions`;
}

function normalizeOpenAIChatUrl(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (
    normalized.endsWith("/chat/completions") ||
    normalized.endsWith("/responses") ||
    normalized.endsWith("/chat")
  ) {
    return normalized;
  }
  return normalized.endsWith("/v1") ? `${normalized}/chat/completions` : normalized;
}

export class DefaultExecutor extends BaseExecutor {
  constructor(provider) {
    super(provider, PROVIDERS[provider] || PROVIDERS.openai);
  }

  buildUrl(model, stream, urlIndex = 0, credentials = null) {
    void model;
    void stream;
    void urlIndex;
    if (this.provider?.startsWith?.("openai-compatible-")) {
      const psd = credentials?.providerSpecificData;
      const baseUrl = psd?.baseUrl || "https://api.openai.com/v1";
      const normalized = baseUrl.replace(/\/$/, "");
      const customPath = typeof psd?.chatPath === "string" && psd.chatPath ? psd.chatPath : null;
      if (customPath) return `${normalized}${customPath}`;
      const path =
        getOpenAICompatibleType(this.provider, psd) === "responses"
          ? "/responses"
          : "/chat/completions";
      return `${normalized}${path}`;
    }
    if (this.provider?.startsWith?.("anthropic-compatible-")) {
      const psd = credentials?.providerSpecificData;
      const baseUrl = psd?.baseUrl || "https://api.anthropic.com/v1";
      const customPath = typeof psd?.chatPath === "string" && psd.chatPath ? psd.chatPath : null;
      if (isClaudeCodeCompatible(this.provider)) {
        return joinClaudeCodeCompatibleUrl(
          baseUrl,
          customPath || CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH
        );
      }
      const normalized = baseUrl.replace(/\/$/, "");
      return `${normalized}${customPath || "/messages"}`;
    }
    switch (this.provider) {
      case "bailian-coding-plan": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeBailianMessagesUrl(baseUrl);
      }
      case "heroku": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeHerokuChatUrl(baseUrl);
      }
      case "databricks": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeDatabricksChatUrl(baseUrl);
      }
      case "datarobot": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeDataRobotChatUrl(baseUrl);
      }
      case "azure-ai": {
        const apiType =
          credentials?.providerSpecificData?.apiType === "responses" ? "responses" : "chat";
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeAzureAiChatUrl(baseUrl, apiType);
      }
      case "bedrock": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return buildBedrockChatUrl(baseUrl);
      }
      case "watsonx": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeWatsonxChatUrl(baseUrl);
      }
      case "oci": {
        const apiType =
          credentials?.providerSpecificData?.apiType === "responses" ? "responses" : "chat";
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeOciChatUrl(baseUrl, apiType);
      }
      case "sap": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeSapChatUrl(baseUrl);
      }
      case "xiaomi-mimo": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeXiaomiMimoChatUrl(baseUrl);
      }
      case "snowflake": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeSnowflakeChatUrl(baseUrl);
      }
      case "gigachat": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeGigachatChatUrl(baseUrl);
      }
      case "maritalk": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return buildMaritalkChatUrl(baseUrl);
      }
      case "lm-studio":
      case "modal":
      case "reka":
      case "vllm":
      case "lemonade":
      case "llamafile":
      case "triton":
      case "docker-model-runner":
      case "xinference":
      case "oobabooga": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeOpenAIChatUrl(baseUrl);
      }
      case "claude":
      case "glm":
      case "glmt":
      case "kimi-coding":
      case "minimax":
      case "minimax-cn":
        return `${this.config.baseUrl}?beta=true`;
      case "gemini":
        return `${this.config.baseUrl}/${model}:${stream ? "streamGenerateContent?alt=sse" : "generateContent"}`;
      case "qwen": {
        const resourceUrl = credentials?.providerSpecificData?.resourceUrl;
        return `https://${resourceUrl || "portal.qwen.ai"}/v1/chat/completions`;
      }
      default:
        return this.config.baseUrl;
    }
  }

  buildHeaders(credentials, stream = true) {
    const headers = { "Content-Type": "application/json", ...this.config.headers };

    // T07: resolve extra keys round-robin locally since DefaultExecutor overrides BaseExecutor buildHeaders
    const extraKeys =
      (credentials.providerSpecificData?.extraApiKeys as string[] | undefined) ?? [];
    const effectiveKey =
      extraKeys.length > 0 && credentials.connectionId && credentials.apiKey
        ? getRotatingApiKey(credentials.connectionId, credentials.apiKey, extraKeys)
        : credentials.apiKey;

    switch (this.provider) {
      case "gemini":
        effectiveKey
          ? (headers["x-goog-api-key"] = effectiveKey)
          : (headers["Authorization"] = `Bearer ${credentials.accessToken}`);
        break;
      case "snowflake": {
        const rawToken = effectiveKey || credentials.accessToken || "";
        const usesProgrammaticAccessToken = rawToken.startsWith("pat/");
        headers["Authorization"] =
          `Bearer ${usesProgrammaticAccessToken ? rawToken.slice(4) : rawToken}`;
        headers["X-Snowflake-Authorization-Token-Type"] = usesProgrammaticAccessToken
          ? "PROGRAMMATIC_ACCESS_TOKEN"
          : "KEYPAIR_JWT";
        break;
      }
      case "gigachat":
        headers["Authorization"] = `Bearer ${credentials.accessToken || effectiveKey}`;
        break;
      case "clarifai": {
        const clarifaiToken = effectiveKey || credentials.accessToken;
        if (clarifaiToken) {
          headers["Authorization"] = `Key ${clarifaiToken}`;
        }
        break;
      }
      case "azure-ai":
        if (effectiveKey || credentials.accessToken) {
          headers["api-key"] = effectiveKey || credentials.accessToken;
        }
        delete headers["Authorization"];
        break;
      case "oci": {
        const bearerToken = effectiveKey || credentials.accessToken;
        if (bearerToken) {
          headers["Authorization"] = `Bearer ${bearerToken}`;
        }
        const projectId =
          credentials.projectId ||
          credentials?.providerSpecificData?.projectId ||
          credentials?.providerSpecificData?.project;
        if (projectId) {
          headers["OpenAI-Project"] = projectId;
        }
        break;
      }
      case "sap": {
        const bearerToken = effectiveKey || credentials.accessToken;
        if (bearerToken) {
          headers["Authorization"] = `Bearer ${bearerToken}`;
        }
        headers["AI-Resource-Group"] = getSapResourceGroup(credentials?.providerSpecificData);
        break;
      }
      case "reka": {
        const bearerToken = effectiveKey || credentials.accessToken;
        if (bearerToken) {
          headers["Authorization"] = `Bearer ${bearerToken}`;
          headers["X-Api-Key"] = bearerToken;
        }
        break;
      }
      case "maritalk": {
        const token = effectiveKey || credentials.accessToken;
        if (token) {
          headers["Authorization"] = `Key ${token}`;
        }
        break;
      }
      case "claude":
      case "anthropic":
        effectiveKey
          ? (headers["x-api-key"] = effectiveKey)
          : (headers["Authorization"] = `Bearer ${credentials.accessToken}`);
        break;
      case "glm":
      case "glmt":
      case "kimi-coding":
      case "bailian-coding-plan":
      case "kimi-coding-apikey":
        headers["x-api-key"] = effectiveKey || credentials.accessToken;
        break;
      default:
        if (isClaudeCodeCompatible(this.provider)) {
          return buildClaudeCodeCompatibleHeaders(
            effectiveKey || credentials.accessToken || "",
            stream,
            credentials?.providerSpecificData?.ccSessionId
          );
        }
        if (this.provider?.startsWith?.("anthropic-compatible-")) {
          if (effectiveKey) {
            headers["x-api-key"] = effectiveKey;
          } else if (credentials.accessToken) {
            headers["Authorization"] = `Bearer ${credentials.accessToken}`;
          }
          if (!headers["anthropic-version"]) {
            headers["anthropic-version"] = "2023-06-01";
          }
        } else {
          const bearerToken = effectiveKey || credentials.accessToken;
          if (bearerToken) {
            headers["Authorization"] = `Bearer ${bearerToken}`;
          }
        }
    }

    headers["Accept"] = stream ? "text/event-stream" : "application/json";

    // Qwen header cleanup: Remove X-Dashscope-* headers if using an API key (DashScope compatible mode).
    // If using OAuth (Qwen Code), we MUST keep them for portal.qwen.ai to accept the request.
    if (this.provider === "qwen" && effectiveKey) {
      for (const key of Object.keys(headers)) {
        if (key.toLowerCase().startsWith("x-dashscope-")) {
          delete headers[key];
        }
      }
    }

    return headers;
  }

  /**
   * For compatible providers, the model name is already clean by the time
   * it reaches the executor (chatCore sets body.model = modelInfo.model,
   * which is the parsed model ID without internal routing prefixes).
   *
   * Models may legitimately contain "/" as part of their ID (e.g. "zai-org/GLM-5-FP8",
   * "org/model-name") — we must NOT strip path segments. (Fix #493)
   */
  transformRequest(model, body, stream, credentials) {
    void model;
    const cleanedBody = super.transformRequest(model, body, stream, credentials);
    let withDefaults = applyProviderRequestDefaults(cleanedBody, this.config.requestDefaults);

    if (typeof withDefaults === "object" && withDefaults !== null && !Array.isArray(withDefaults)) {
      if (this.provider?.startsWith?.("anthropic-compatible-")) {
        if (Object.prototype.hasOwnProperty.call(withDefaults, "stream_options")) {
          const withoutStreamOptions = { ...withDefaults } as Record<string, unknown>;
          delete withoutStreamOptions.stream_options;
          withDefaults = withoutStreamOptions;
        }
      } else if (
        stream &&
        getTargetFormat(this.provider, credentials?.providerSpecificData) === "openai"
      ) {
        if (!credentials?.providerSpecificData?.disableStreamOptions) {
          withDefaults = {
            ...withDefaults,
            stream_options: {
              ...(((withDefaults as Record<string, unknown>).stream_options as object) || {}),
              include_usage: true,
            },
          };
        } else if (Object.prototype.hasOwnProperty.call(withDefaults, "stream_options")) {
          const withoutStreamOptions = { ...withDefaults } as Record<string, unknown>;
          delete withoutStreamOptions.stream_options;
          withDefaults = withoutStreamOptions;
        }
      }
    }

    if (this.provider === "qwen" && typeof withDefaults === "object" && withDefaults !== null) {
      return sanitizeQwenThinkingToolChoice(
        withDefaults as Record<string, unknown>,
        "QwenExecutor"
      );
    }
    return withDefaults;
  }

  /**
   * Refresh credentials via the centralized tokenRefresh service.
   * Delegates to getAccessToken() which handles all providers with
   * race-condition protection (deduplication via refreshPromiseCache).
   */
  async refreshCredentials(credentials, log) {
    if (this.provider === "gigachat") {
      if (!credentials.apiKey) return null;
      try {
        return await getGigachatAccessToken({
          credentials: credentials.apiKey,
        });
      } catch (error) {
        log?.error?.("TOKEN", `gigachat refresh error: ${error.message}`);
        return null;
      }
    }
    if (!credentials.refreshToken) return null;
    try {
      return await getAccessToken(this.provider, credentials, log);
    } catch (error) {
      log?.error?.("TOKEN", `${this.provider} refresh error: ${error.message}`);
      return null;
    }
  }

  needsRefresh(credentials) {
    if (this.provider === "gigachat") {
      if (credentials.apiKey && !credentials.accessToken) return true;
      if (!credentials.expiresAt) return false;
    }
    return super.needsRefresh(credentials);
  }
}

export default DefaultExecutor;
