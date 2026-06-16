import { BaseExecutor, setUserAgentHeader, type ExecuteInput } from "./base.ts";
import { PROVIDERS, OAUTH_ENDPOINTS } from "../config/constants.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";
import {
  getRotatingApiKey,
  getValidApiKey,
  resolveKeyForRequest,
} from "../services/apiKeyRotator.ts";
import type { KeyHealth } from "../services/apiKeyRotator.ts";
import {
  buildClaudeCodeCompatibleHeaders,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  joinClaudeCodeCompatibleUrl,
} from "../services/claudeCodeCompatible.ts";
import { getGigachatAccessToken } from "../services/gigachatAuth.ts";
import { getRegistryEntry } from "../config/providerRegistry.ts";
import { mergeClientAnthropicBeta } from "../config/anthropicHeaders.ts";
import { applyProviderRequestDefaults } from "../services/providerRequestDefaults.ts";
import {
  detectFormat,
  getOpenAICompatibleType,
  getTargetFormat,
  isClaudeCodeCompatible,
} from "../services/provider.ts";
import { sanitizeQwenThinkingToolChoice } from "../services/qwenThinking.ts";
import { buildDataRobotChatUrl } from "../config/datarobot.ts";
import { buildAzureAiChatUrl } from "../config/azureAi.ts";
import { buildWatsonxChatUrl } from "../config/watsonx.ts";
import { buildOciChatUrl } from "../config/oci.ts";
import { buildSapChatUrl, getSapResourceGroup } from "../config/sap.ts";
import { buildMaritalkChatUrl } from "../config/maritalk.ts";
import { LOCAL_PROVIDERS } from "@/shared/constants/providers";
import { isForbiddenCustomHeaderName } from "@/shared/constants/upstreamHeaders";
import { getClaudeCodeCompatibleRequestDefaults } from "@/lib/providers/requestDefaults";

import type { PoolConfig } from "../services/sessionPool/types.ts";

/**
 * Apply operator-configured per-provider custom headers onto an outgoing header
 * map. Defense-in-depth on top of the Zod `customHeadersSchema`:
 *  - skip hop-by-hop/framing AND auth header names (canonical denylist, so a row
 *    written before the schema tightening still can't override credential auth);
 *  - skip control-char (CR/LF/NUL) names/values before they reach undici;
 *  - assign case-insensitively, replacing any existing same-named header (e.g.
 *    the executor's own Content-Type/Accept) instead of emitting a duplicate.
 * Used for every *-compatible node, INCLUDING anthropic-compatible-cc-* (whose
 * header builder returns early, so custom headers must be merged in explicitly).
 */
function applyCustomHeaders(headers: Record<string, string>, rawCustomHeaders: unknown): void {
  let customHeaders: Record<string, unknown> | null = null;
  if (
    rawCustomHeaders &&
    typeof rawCustomHeaders === "object" &&
    !Array.isArray(rawCustomHeaders)
  ) {
    customHeaders = rawCustomHeaders as Record<string, unknown>;
  } else if (typeof rawCustomHeaders === "string") {
    try {
      const parsed = JSON.parse(rawCustomHeaders);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        customHeaders = parsed as Record<string, unknown>;
      }
    } catch {
      /* ignore invalid JSON */
    }
  }
  if (!customHeaders) return;
  for (const [k, v] of Object.entries(customHeaders)) {
    if (typeof k !== "string" || typeof v !== "string") continue;
    if (isForbiddenCustomHeaderName(k)) continue;
    if (/[\r\n\0]/.test(k) || /[\r\n]/.test(v)) continue;
    const lower = k.toLowerCase();
    for (const existing of Object.keys(headers)) {
      if (existing.toLowerCase() === lower) delete headers[existing];
    }
    headers[k] = v;
  }
}

function normalizeBaseUrl(baseUrl) {
  return (baseUrl || "").trim().replace(/\/$/, "");
}

function normalizeBailianMessagesUrl(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl).replace(/\?beta=true$/, "");
  const messagesUrl = normalized.endsWith("/messages") ? normalized : `${normalized}/messages`;
  return messagesUrl;
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
  if (normalized.endsWith("/v1")) {
    return `${normalized}/chat/completions`;
  }
  // Assume OpenAI-compatible /v1/chat/completions path structure
  // when the base URL is a bare hostname or custom path (e.g. llama.cpp, vLLM, LM Studio).
  return `${normalized}/v1/chat/completions`;
}

function getOpenRouterConnectionPreset(
  providerSpecificData?: Record<string, unknown> | null
): string | null {
  const preset =
    typeof providerSpecificData?.preset === "string" ? providerSpecificData.preset.trim() : "";
  return preset || null;
}

export class DefaultExecutor extends BaseExecutor {
  constructor(provider) {
    super(provider, PROVIDERS[provider] || PROVIDERS.openai);
    const registryEntry = getRegistryEntry(provider);
    if (registryEntry?.poolConfig) {
      this.poolConfig = registryEntry.poolConfig as PoolConfig;
    }
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
        const forceResponses =
          credentials?.providerSpecificData?._omnirouteForceResponsesUpstream === true;
        const apiType =
          forceResponses || credentials?.providerSpecificData?.apiType === "responses"
            ? "responses"
            : "chat";
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeAzureAiChatUrl(baseUrl, apiType);
      }
      case "watsonx": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeWatsonxChatUrl(baseUrl);
      }
      case "oci": {
        const forceResponses =
          credentials?.providerSpecificData?._omnirouteForceResponsesUpstream === true;
        const apiType =
          forceResponses || credentials?.providerSpecificData?.apiType === "responses"
            ? "responses"
            : "chat";
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
      case "siliconflow": {
        const baseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return normalizeOpenAIChatUrl(baseUrl);
      }
      case "llama-cpp":
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
        // #3197 (residual of #3136): for self-hosted/local providers, prefer the
        // catalog's localDefault when no explicit baseUrl is set. `this.config`
        // falls back to PROVIDERS.openai for providers not in the open-sse
        // registry (llama-cpp, etc.), so without this guard an empty baseUrl
        // silently hits OpenAI's API. Fall back to localDefault BEFORE config.
        const localDefault = LOCAL_PROVIDERS[this.provider]?.localDefault;
        const baseUrl =
          credentials?.providerSpecificData?.baseUrl || localDefault || this.config.baseUrl;
        return normalizeOpenAIChatUrl(baseUrl);
      }
      case "zai":
      case "glm-coding-apikey": {
        const zaiBaseUrl = credentials?.providerSpecificData?.baseUrl || this.config.baseUrl;
        return `${zaiBaseUrl}?beta=true`;
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
      default: {
        const url = this.config.baseUrl;
        const entry = getRegistryEntry(this.provider);
        return entry?.urlSuffix ? `${url}${entry.urlSuffix}` : url;
      }
    }
  }

  buildHeaders(credentials, stream = true, clientHeaders?: Record<string, string> | null) {
    const headers = { "Content-Type": "application/json", ...this.config.headers };

    // Allow per-provider User-Agent override via environment variable.
    const providerId = this.config?.id || this.provider;
    if (providerId) {
      const envKey = `${providerId.toUpperCase().replace(/[^A-Z0-9]/g, "_")}_USER_AGENT`;
      const envUA = process.env[envKey]?.trim();
      if (envUA) {
        headers["User-Agent"] = envUA;
        if ("user-agent" in headers) {
          headers["user-agent"] = envUA;
        }
      }
    }

    // T07: resolve extra keys round-robin locally since DefaultExecutor overrides BaseExecutor buildHeaders
    const extraKeys =
      (credentials.providerSpecificData?.extraApiKeys as string[] | undefined) ?? [];
    const selectedKeyId = (credentials.providerSpecificData as Record<string, unknown> | undefined)
      ?.selectedKeyId as string | undefined;
    let effectiveKey = credentials.apiKey;
    if (extraKeys.length > 0 && credentials.connectionId && credentials.apiKey) {
      const resolved = resolveKeyForRequest(
        credentials.connectionId,
        credentials.apiKey,
        extraKeys,
        selectedKeyId ?? null
      );
      effectiveKey = resolved?.key ?? credentials.apiKey;
      if (resolved && credentials.providerSpecificData) {
        (credentials.providerSpecificData as Record<string, unknown>).selectedKeyId =
          resolved.keyId;
      }
    }

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
      case "zai":
      case "glm-coding-apikey":
        headers["x-api-key"] = effectiveKey || credentials.accessToken;
        break;
      default:
        if (isClaudeCodeCompatible(this.provider)) {
          const ccRequestDefaults = getClaudeCodeCompatibleRequestDefaults(
            credentials?.providerSpecificData
          );
          const ccHeaders = buildClaudeCodeCompatibleHeaders(
            effectiveKey || credentials.accessToken || "",
            stream,
            credentials?.providerSpecificData?.ccSessionId,
            { redactThinking: ccRequestDefaults.redactThinking === true }
          );
          // CC nodes are also anthropic-compatible-*, so honor operator custom
          // headers here (the early return skips the shared block below).
          applyCustomHeaders(ccHeaders, credentials.providerSpecificData?.customHeaders);
          return ccHeaders;
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
          // Use registry authHeader if available, otherwise default to bearer
          const entry = getRegistryEntry(this.provider);
          const authHeader = entry?.authHeader || "bearer";
          const token = effectiveKey || credentials.accessToken;
          if (token) {
            if (authHeader === "x-api-key") {
              headers["x-api-key"] = token;
            } else if (authHeader === "x-goog-api-key") {
              headers["x-goog-api-key"] = token;
            } else {
              headers["Authorization"] = `Bearer ${token}`;
            }
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

    const isCompatibleProvider =
      this.provider?.startsWith?.("openai-compatible-") ||
      this.provider?.startsWith?.("anthropic-compatible-");

    if (isCompatibleProvider) {
      applyCustomHeaders(headers, credentials.providerSpecificData?.customHeaders);
    }

    // Forward client request metadata headers (from OpenCode or similar clients)
    // Allowlist-based: only specific x-opencode-* headers and User-Agent are forwarded
    if (clientHeaders) {
      const clientUA = clientHeaders["User-Agent"] || clientHeaders["user-agent"];
      if (clientUA) {
        setUserAgentHeader(headers, clientUA);
      }

      const opencodeHeaderKeys = [
        "x-opencode-session",
        "x-opencode-request",
        "x-opencode-project",
        "x-opencode-client",
      ];
      for (const headerName of opencodeHeaderKeys) {
        const value = Object.entries(clientHeaders).find(
          ([key]) => key.toLowerCase() === headerName.toLowerCase()
        )?.[1];
        if (value) {
          headers[headerName] = value;
        }
      }

      // #3974: merge the client's negotiated anthropic-beta (allowlisted) into the
      // outbound set. The registry's static ANTHROPIC_BETA_CLAUDE_OAUTH lacks
      // tool-search-tool-2025-10-19, so deferred-tool requests were rejected with
      // 400 "Tool reference not found". Allowlist-merge preserves it without
      // forwarding betas the backend rejects.
      const clientBeta = clientHeaders["anthropic-beta"] ?? clientHeaders["Anthropic-Beta"] ?? null;
      const betaKey = Object.keys(headers).find((key) => key.toLowerCase() === "anthropic-beta");
      if (betaKey && clientBeta) {
        headers[betaKey] = mergeClientAnthropicBeta(headers[betaKey], clientBeta);
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
    const cleanedBody = super.transformRequest(model, body, stream, credentials);
    let withDefaults = applyProviderRequestDefaults(cleanedBody, this.config.requestDefaults);
    const targetFormat = getTargetFormat(this.provider, credentials?.providerSpecificData);
    const requestFormat =
      withDefaults && typeof withDefaults === "object" && !Array.isArray(withDefaults)
        ? detectFormat(withDefaults as Record<string, unknown>)
        : "openai";

    if (typeof withDefaults === "object" && withDefaults !== null && !Array.isArray(withDefaults)) {
      if (this.provider?.startsWith?.("anthropic-compatible-")) {
        if (Object.prototype.hasOwnProperty.call(withDefaults, "stream_options")) {
          const withoutStreamOptions = { ...withDefaults } as Record<string, unknown>;
          delete withoutStreamOptions.stream_options;
          withDefaults = withoutStreamOptions;
        }
      } else if (stream && targetFormat === "openai" && requestFormat !== "openai-responses") {
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
      } else if (
        (targetFormat === "openai-responses" || requestFormat === "openai-responses") &&
        Object.prototype.hasOwnProperty.call(withDefaults, "stream_options")
      ) {
        const withoutStreamOptions = { ...withDefaults } as Record<string, unknown>;
        delete withoutStreamOptions.stream_options;
        withDefaults = withoutStreamOptions;
      }

      // #1961: Map max_tokens -> max_completion_tokens for recent OpenAI models
      if (targetFormat === "openai") {
        const isRecentOpenAI = /^(o1|o3|o4|gpt-5)/i.test(model);
        if (isRecentOpenAI && withDefaults && typeof withDefaults === "object") {
          const defaultsRecord = withDefaults as Record<string, unknown>;
          if ("max_tokens" in defaultsRecord) {
            defaultsRecord.max_completion_tokens = defaultsRecord.max_tokens;
            delete defaultsRecord.max_tokens;
          }
        }
      }

      if (this.provider === "openrouter") {
        const connectionPreset = getOpenRouterConnectionPreset(credentials?.providerSpecificData);
        if (connectionPreset && (withDefaults as Record<string, unknown>).preset === undefined) {
          withDefaults = {
            ...(withDefaults as Record<string, unknown>),
            preset: connectionPreset,
          };
        }
      }
    }

    if (this.provider === "qwen" && typeof withDefaults === "object" && withDefaults !== null) {
      return sanitizeQwenThinkingToolChoice(
        withDefaults as Record<string, unknown>,
        "QwenExecutor"
      );
    }

    // Apply modelIdPrefix from RegistryEntry (e.g. "accounts/fireworks/models/")
    // so registry can store short model IDs while the upstream API receives the full path.
    if (typeof withDefaults === "object" && withDefaults !== null) {
      const entry = getRegistryEntry(this.provider);
      if (entry?.modelIdPrefix) {
        const body = withDefaults as Record<string, unknown>;
        if (typeof body.model === "string") {
          // Skip prepending when the model already carries the canonical prefix OR any
          // other accepted fully-qualified prefix (e.g. Fireworks router IDs). #3133.
          const acceptedPrefixes = [entry.modelIdPrefix, ...(entry.acceptedModelIdPrefixes ?? [])];
          const alreadyQualified = acceptedPrefixes.some((prefix) =>
            (body.model as string).startsWith(prefix)
          );
          if (!alreadyQualified) {
            body.model = `${entry.modelIdPrefix}${body.model}`;
          }
        }
      }
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

  async execute(input: ExecuteInput) {
    const pool = this.getPool();
    if (!pool) return super.execute(input);

    const session = pool.acquire();
    if (session) {
      input.upstreamExtraHeaders = {
        ...session.buildHeaders(),
        ...input.upstreamExtraHeaders,
      };
    }

    let result;
    try {
      result = await super.execute(input);
    } catch (err) {
      if (session) {
        pool.reportCooldown(session);
        session.release();
      }
      throw err;
    }

    if (session) {
      try {
        const status = result?.response?.status;
        if (status === 429) {
          pool.reportCooldown(session);
        } else if (status >= 500) {
          pool.reportDead(session);
        } else {
          pool.reportSuccess(session);
        }
      } finally {
        session.release();
      }
    }

    return result;
  }
}

export default DefaultExecutor;
