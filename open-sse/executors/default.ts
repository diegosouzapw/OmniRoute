import { createHash } from "node:crypto";

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { mapNvidiaGlm52ReasoningParams } from "./base/reasoningEffort.ts";
import { PROVIDERS, OAUTH_ENDPOINTS } from "../config/constants.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";

import {
  buildClaudeCodeCompatibleHeaders,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  joinClaudeCodeCompatibleUrl,
} from "../services/claudeCodeCompatible.ts";
import { getGigachatAccessToken } from "../services/gigachatAuth.ts";
import { getRegistryEntry } from "../config/providerRegistry.ts";
import { getModelTargetFormat } from "../config/providerModels.ts";
import {
  mergeClientAnthropicBeta,
  normalizeAnthropicHeaderVariants,
} from "../config/anthropicHeaders.ts";
import { isOfficialAnthropicBaseUrl } from "../utils/anthropicHost.ts";
import { applyProviderRequestDefaults } from "../services/providerRequestDefaults.ts";
import { stripUnsupportedParams } from "../translator/paramSupport.ts";
import { normalizeOpenAIToolNames } from "../translator/helpers/toolCallHelper.ts";
import {
  injectReasoningContentForThinkingModel,
  shouldInjectReasoningContentPlaceholder,
} from "../utils/reasoningContentInjector.ts";
import {
  detectFormat,
  getOpenAICompatibleType,
  getTargetFormat,
  isClaudeCodeCompatible,
} from "../services/provider.ts";
import { ensureToolMessageNames } from "./kimiToolNames.ts";
import { getSapResourceGroup } from "../config/sap.ts";
import {
  normalizeBailianMessagesUrl,
  normalizeDataRobotChatUrl,
  normalizeAzureAiChatUrl,
  normalizeWatsonxChatUrl,
  normalizeOciChatUrl,
  normalizeSapChatUrl,
  normalizeXiaomiMimoChatUrl,
  normalizeOpenAIChatUrl,
  getOpenRouterConnectionPreset,
} from "./default/urlNormalizers.ts";
import {
  isPoeMessagesEligibleModel,
  resolvePoeUpstreamUrl,
} from "../config/providers/registry/poe/index.ts";
import { buildMaritalkChatUrl } from "../config/maritalk.ts";
import { LOCAL_PROVIDERS } from "@/shared/constants/providers";
import { isForbiddenCustomHeaderName } from "@/shared/constants/upstreamHeaders";
import { getClaudeCodeCompatibleRequestDefaults } from "@/lib/providers/requestDefaults";
import { applyClineAuthHeaders } from "@/shared/utils/clineAuth";
import {
  normalizeHerokuChatUrl,
  normalizeDatabricksChatUrl,
  normalizeSnowflakeChatUrl,
  normalizeGigachatChatUrl,
} from "@/lib/providers/validation/urlHelpers";
import { forwardOpencodeClientHeaders } from "../utils/opencodeHeaders.ts";
import { resolveZaiUrl } from "./default/zaiFormatOverride.ts";
import { normalizePoolConfig } from "./default/poolConfig.ts";
import { acquireNvidiaConcurrencySlot } from "./default/nvidiaConcurrencyGate.ts";
import { resolveAlibabaProviderBaseUrl } from "@/shared/constants/alibabaProviderRegions";
import { usesCcWireImage } from "../services/ccWireImageBuiltins.ts";

const NVIDIA_TOOL_CALL_ID_PATTERN = /^[A-Za-z0-9]{9}$/;
const PERPLEXITY_AGENT_DEFAULT_MAX_OUTPUT_TOKENS = 4096;

function defaultPerplexityAgentMaxOutputTokens<T>(body: T): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;

  const record = body as Record<string, unknown>;
  if (
    record.max_output_tokens !== undefined ||
    record.max_completion_tokens !== undefined ||
    record.max_tokens !== undefined
  ) {
    return body;
  }

  return {
    ...record,
    max_output_tokens: PERPLEXITY_AGENT_DEFAULT_MAX_OUTPUT_TOKENS,
  } as T;
}

const ZAI_GLM_53_OPENAI_MODEL_PATTERN = /^glm-5\.3(?:-flash)?$/i;
const ZAI_GLM_53_EFFORT_MODEL_PATTERN = /^(glm-5\.3(?:-flash)?)-(low|high|max)$/i;

function hasTools(body: unknown): boolean {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const tools = (body as Record<string, unknown>).tools;
  return Array.isArray(tools) && tools.length > 0;
}

function applyZaiGlm53OpenAIDefaults<T>(
  provider: string,
  model: string,
  body: T,
  stream: boolean
): T {
  if (provider !== "zai" && provider !== "glm-coding-apikey") return body;
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;

  const record = body as Record<string, unknown>;
  const outboundModel = typeof record.model === "string" ? record.model : model;
  const effortMatch = outboundModel.match(ZAI_GLM_53_EFFORT_MODEL_PATTERN);
  const baseModel = effortMatch?.[1] ?? outboundModel;
  if (!ZAI_GLM_53_OPENAI_MODEL_PATTERN.test(baseModel)) return body;

  let next: Record<string, unknown> | null = null;
  const mutate = (): Record<string, unknown> => (next ??= { ...record });

  const editableForEffort = mutate();
  if (effortMatch) editableForEffort.model = baseModel;
  if (record.reasoning_effort === undefined && record.reasoning === undefined) {
    // GLM-5.3 always reasons (thinking cannot be disabled upstream), so a
    // request with no effort — Pi "off", plain API calls — maps to the floor
    // tier "low" per the declared-tier clamp convention (none/minimal → low),
    // not the vendor default "max". Explicit max stays opt-in via
    // reasoning_effort or the -max model aliases; xhigh normalizes to max in
    // the shared sanitizer via the declared tiers.
    editableForEffort.reasoning_effort = (effortMatch?.[2] ?? "low").toLowerCase();
  }

  const existingThinking =
    record.thinking && typeof record.thinking === "object" && !Array.isArray(record.thinking)
      ? (record.thinking as Record<string, unknown>)
      : null;
  const editableForThinking = mutate();
  editableForThinking.thinking = {
    ...(existingThinking || {}),
    type: "enabled",
    clear_thinking: false,
  };

  if (stream && hasTools(record) && record.tool_stream === undefined) {
    mutate().tool_stream = true;
  }

  return (next ?? body) as T;
}

function normalizeNvidiaToolCallId(id: unknown): unknown {
  if (id === null || id === undefined) return id;
  const value = String(id);
  if (NVIDIA_TOOL_CALL_ID_PATTERN.test(value)) return value;
  return createHash("sha256").update(value).digest("hex").slice(0, 9);
}

function normalizeNvidiaToolCallIds(body: unknown): void {
  if (!body || typeof body !== "object" || Array.isArray(body)) return;
  const messages = (body as Record<string, unknown>).messages;
  if (!Array.isArray(messages)) return;

  for (const message of messages) {
    if (!message || typeof message !== "object" || Array.isArray(message)) continue;
    const record = message as Record<string, unknown>;
    if (Array.isArray(record.tool_calls)) {
      for (const toolCall of record.tool_calls) {
        if (!toolCall || typeof toolCall !== "object" || Array.isArray(toolCall)) continue;
        const call = toolCall as Record<string, unknown>;
        if (call.id !== null && call.id !== undefined) {
          call.id = normalizeNvidiaToolCallId(call.id);
        }
      }
    }
    if (record.tool_call_id !== null && record.tool_call_id !== undefined) {
      record.tool_call_id = normalizeNvidiaToolCallId(record.tool_call_id);
    }
  }
}

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

export class DefaultExecutor extends BaseExecutor {
  constructor(provider) {
    super(provider, PROVIDERS[provider] || PROVIDERS.openai);
    const registryEntry = getRegistryEntry(provider);
    if (registryEntry?.poolConfig) {
      this.poolConfig = normalizePoolConfig(registryEntry.poolConfig) ?? undefined;
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
      const forceResponses = psd?._omnirouteForceResponsesUpstream === true;
      const path =
        forceResponses || getOpenAICompatibleType(this.provider, psd) === "responses"
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
    // An alternate protocol selected on the connection carries a complete endpoint
    // URL, so it must bypass the per-provider normalizers in the switch below —
    // those assume the provider's default (OpenAI-shaped) path and would mangle it,
    // e.g. appending "/chat/completions" to an Anthropic ".../v1/messages" endpoint.
    {
      const alternate = this.resolveAlternate(credentials);
      const manualBaseUrl = credentials?.providerSpecificData?.baseUrl;
      const hasManualBaseUrl = typeof manualBaseUrl === "string" && !!manualBaseUrl;
      if (alternate?.baseUrl && !hasManualBaseUrl) {
        // Operator's manual override (#6147) keeps its own semantics and falls
        // through to the provider-specific handling below.
        const normalized = alternate.baseUrl.replace(/\/$/, "");
        // A model-scoped alternate (the Gemini protocol: `{base}/{model}:generateContent`)
        // builds its own URL — chatPath/urlSuffix are constants and cannot carry the model.
        if (alternate.urlBuilder) return alternate.urlBuilder(normalized, model, stream);
        return `${normalized}${alternate.chatPath || ""}${alternate.urlSuffix || ""}`;
      }
    }
    switch (this.provider) {
      case "perplexity-agent":
        return this.config.baseUrl;
      case "openai": {
        // #5842: responses-only models (o1-pro / gpt-5.x-pro) 404 on
        // /v1/chat/completions ("only supported in v1/responses"). Route them to
        // the native /responses endpoint — the per-model targetFormat (registry tag
        // + the -pro heuristic in getModelTargetFormat) is the single source of
        // truth, keeping the URL in lockstep with the chatCore body translation.
        // Mirrors the gh executor's targetFormat-driven routing (9router#102).
        const customBaseUrl =
          typeof credentials?.providerSpecificData?.baseUrl === "string" &&
          credentials.providerSpecificData.baseUrl.trim()
            ? (credentials.providerSpecificData.baseUrl as string)
            : null;
        const chatUrl = customBaseUrl ? normalizeOpenAIChatUrl(customBaseUrl) : this.config.baseUrl;
        if (getModelTargetFormat("openai", model) === "openai-responses") {
          return chatUrl.replace(/\/chat\/completions\/?$/, "/responses");
        }
        return chatUrl;
      }
      case "bailian-coding-plan": {
        const baseUrl = resolveAlibabaProviderBaseUrl(
          this.provider,
          credentials?.providerSpecificData,
          this.config.baseUrl
        );
        return normalizeBailianMessagesUrl(baseUrl);
      }
      case "alibaba":
      case "alibaba-cn":
      case "qwen-cloud":
      case "qwen-cloud-token-plan": {
        const baseUrl = resolveAlibabaProviderBaseUrl(
          this.provider,
          credentials?.providerSpecificData,
          this.config.baseUrl
        );
        return normalizeOpenAIChatUrl(baseUrl);
      }
      case "heroku": {
        const baseUrl = this.resolveBaseUrl(credentials);
        return normalizeHerokuChatUrl(baseUrl);
      }
      case "databricks": {
        const baseUrl = this.resolveBaseUrl(credentials);
        return normalizeDatabricksChatUrl(baseUrl);
      }
      case "datarobot": {
        const baseUrl = this.resolveBaseUrl(credentials);
        return normalizeDataRobotChatUrl(baseUrl);
      }
      case "azure-ai": {
        const forceResponses =
          credentials?.providerSpecificData?._omnirouteForceResponsesUpstream === true;
        const apiType =
          forceResponses || credentials?.providerSpecificData?.apiType === "responses"
            ? "responses"
            : "chat";
        const baseUrl = this.resolveBaseUrl(credentials);
        const apiVersion =
          typeof credentials?.providerSpecificData?.apiVersion === "string" &&
          credentials.providerSpecificData.apiVersion.trim()
            ? credentials.providerSpecificData.apiVersion.trim()
            : "2024-12-01-preview";
        return normalizeAzureAiChatUrl(baseUrl, apiType, model, apiVersion);
      }
      case "watsonx": {
        const baseUrl = this.resolveBaseUrl(credentials);
        return normalizeWatsonxChatUrl(baseUrl);
      }
      case "oci": {
        const forceResponses =
          credentials?.providerSpecificData?._omnirouteForceResponsesUpstream === true;
        const apiType =
          forceResponses || credentials?.providerSpecificData?.apiType === "responses"
            ? "responses"
            : "chat";
        const baseUrl = this.resolveBaseUrl(credentials);
        return normalizeOciChatUrl(baseUrl, apiType);
      }
      case "sap": {
        const baseUrl = this.resolveBaseUrl(credentials);
        return normalizeSapChatUrl(baseUrl);
      }
      case "xiaomi-mimo":
      case "xiaomi-mimo-token-plan": {
        const baseUrl = this.resolveBaseUrl(credentials);
        return normalizeXiaomiMimoChatUrl(baseUrl);
      }
      case "snowflake": {
        const baseUrl = this.resolveBaseUrl(credentials);
        return normalizeSnowflakeChatUrl(baseUrl);
      }
      case "gigachat": {
        const baseUrl = this.resolveBaseUrl(credentials);
        return normalizeGigachatChatUrl(baseUrl);
      }
      case "maritalk": {
        const baseUrl = this.resolveBaseUrl(credentials);
        return buildMaritalkChatUrl(baseUrl);
      }
      case "siliconflow": {
        const baseUrl = this.resolveBaseUrl(credentials);
        return normalizeOpenAIChatUrl(baseUrl);
      }
      case "ollama-local":
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
      case "glm-coding-apikey":
        // #7364: format override extracted to zaiFormatOverride.ts (file-size ratchet).
        return resolveZaiUrl(credentials, (fallback) => this.resolveBaseUrl(credentials, fallback));
      case "poe": {
        // #8969: Poe API-key surfaces — Chat Completions, Responses, and
        // Claude-only Messages. Prefer the responses marker from
        // resolveExecutionCredentials (incoming /v1/responses), then the
        // registry Claude targetFormat → messagesUrl, else chat/completions.
        // GPT models must never hit /v1/messages (Poe rejects non-Claude there).
        const psd = credentials?.providerSpecificData;
        const manualBaseUrl =
          typeof psd?.baseUrl === "string" && psd.baseUrl.trim() ? psd.baseUrl.trim() : null;
        const forceResponses = psd?._omnirouteForceResponsesUpstream === true;
        const modelTarget = getModelTargetFormat("poe", model);
        const connectionTarget =
          typeof psd?.targetFormat === "string" ? (psd.targetFormat as string) : null;
        const effectiveTarget = modelTarget || connectionTarget;

        let protocol: "chat" | "responses" | "messages" = "chat";
        if (forceResponses || effectiveTarget === "openai-responses") {
          protocol = "responses";
        } else if (effectiveTarget === "claude" && isPoeMessagesEligibleModel(model)) {
          protocol = "messages";
        }

        return resolvePoeUpstreamUrl({
          protocol,
          configuredBaseUrl: manualBaseUrl,
          responsesBaseUrl: this.config.responsesBaseUrl,
          messagesUrl: this.config.messagesUrl,
          defaultChatUrl: this.config.baseUrl,
        });
      }
      case "claude":
      case "glm":
      case "glmt":
      case "kimi-coding":
        return `${this.config.baseUrl}?beta=true`;
      case "agentrouter":
        return this.usesClaudeCodeProtocol(credentials)
          ? `${this.config.baseUrl}?beta=true`
          : this.config.baseUrl;
      case "gemini":
        return `${this.config.baseUrl}/${model}:${stream ? "streamGenerateContent?alt=sse" : "generateContent"}`;
      default: {
        // Honor a user-supplied custom base URL (providerSpecificData.baseUrl) for
        // OpenAI-format providers (e.g. the built-in "openai" provider pointed at a
        // proxy/gateway). Without this, a configured custom base URL was silently
        // ignored and requests always hit the hardcoded this.config.baseUrl
        // (https://api.openai.com/v1/...). Scoped to openai-format providers so
        // non-OpenAI default-branch providers keep their existing behavior.
        const customBaseUrl =
          typeof credentials?.providerSpecificData?.baseUrl === "string" &&
          credentials.providerSpecificData.baseUrl.trim()
            ? (credentials.providerSpecificData.baseUrl as string)
            : null;
        const isOpenAIFormat = !this.config.format || this.config.format === "openai";
        if (customBaseUrl && isOpenAIFormat) {
          return normalizeOpenAIChatUrl(customBaseUrl);
        }
        const url = this.config.baseUrl;
        const entry = getRegistryEntry(this.provider);
        return entry?.urlSuffix ? `${url}${entry.urlSuffix}` : url;
      }
    }
  }

  buildHeaders(
    credentials,
    stream = true,
    clientHeaders?: Record<string, string> | null,
    model?: string | null
  ) {
    const { headers, effectiveKey } = this.buildHeadersPreamble(credentials, stream);

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
        if (effectiveKey) {
          headers["x-api-key"] = effectiveKey;
          // Port of decolua/9router commit b977bf74:
          // Third-party Anthropic-compatible gateways frequently require
          // Authorization: Bearer ALONGSIDE x-api-key — without it they
          // return 401 missing_api_key on every forward. Only emit the
          // Bearer fallback for non-official upstreams; api.anthropic.com
          // (and the empty/default baseUrl that targets it) must keep the
          // x-api-key-only behavior to avoid regressing the official path.
          const baseUrl = credentials?.providerSpecificData?.baseUrl || "";
          const isOfficial = isOfficialAnthropicBaseUrl(baseUrl);
          if (!isOfficial) {
            headers["Authorization"] = `Bearer ${effectiveKey}`;
          }
        } else if (credentials.accessToken) {
          headers["Authorization"] = `Bearer ${credentials.accessToken}`;
        }
        // If neither effectiveKey nor accessToken is available, emit no
        // auth header — the handler will produce a clean "no credentials"
        // 4xx instead of forwarding garbage auth headers to the upstream.
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
      case "clinepass": // dual-auth (OAuth or BYOK) — see applyClineAuthHeaders()
        applyClineAuthHeaders(headers, credentials, effectiveKey, clientHeaders, true);
        break;
      case "cline":
        // Cline's OAuth flow requires the bearer token prefixed with `workos:` plus a
        // set of Cline client-identification headers. However, BYOK API keys must NOT
        // have the `workos:` prefix.
        if (credentials?.authType === "apikey" || credentials?.authType === "api_key") {
          applyClineAuthHeaders(headers, credentials, effectiveKey, clientHeaders, true);
        } else {
          applyClineAuthHeaders(headers, credentials, effectiveKey, clientHeaders, false);
        }
        break;
      default:
        if (this.usesClaudeCodeProtocol(credentials)) {
          const ccRequestDefaults = getClaudeCodeCompatibleRequestDefaults(
            credentials?.providerSpecificData
          );
          const ccHeaders = buildClaudeCodeCompatibleHeaders(
            effectiveKey || credentials.accessToken || "",
            stream,
            credentials?.providerSpecificData?.ccSessionId,
            { redactThinking: ccRequestDefaults.redactThinking === true }
          );
          if (usesCcWireImage(this.provider)) {
            delete ccHeaders["Authorization"];
            ccHeaders["x-api-key"] = effectiveKey || credentials.accessToken || "";
          }
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
          // Port of decolua/9router commit b977bf74:
          // Third-party Anthropic-compatible gateways frequently require
          // Authorization: Bearer ALONGSIDE x-api-key — without it they
          // return 401 missing_api_key on every forward. Only emit the
          // Bearer fallback for non-official upstreams; api.anthropic.com
          // (and the empty/default baseUrl that targets it) must keep the
          // x-api-key-only behavior to avoid regressing the official path.
          if (effectiveKey && !headers["Authorization"]) {
            const baseUrl = credentials?.providerSpecificData?.baseUrl || "";
            const isOfficialAnthropic = isOfficialAnthropicBaseUrl(baseUrl);
            if (!isOfficialAnthropic) {
              headers["Authorization"] = `Bearer ${effectiveKey}`;
            }
          }
          // Default the anthropic-version header only when the caller/operator
          // has not already supplied one. The lookup is case-insensitive so a
          // pre-set "Anthropic-Version" (e.g. from this.config.headers or a
          // custom header) is not clobbered with a duplicate lowercase entry.
          const hasAnthropicVersion = Object.keys(headers).some(
            (key) => key.toLowerCase() === "anthropic-version"
          );
          if (!hasAnthropicVersion) {
            headers["anthropic-version"] = "2023-06-01";
          }
        } else {
          // Use registry authHeader if available, otherwise default to bearer.
          // An alternate protocol selected on the connection carries its own auth
          // scheme (e.g. claude uses x-api-key where openai uses bearer).
          const entry = getRegistryEntry(this.provider);
          const alternate = this.resolveAlternate(credentials);
          const authHeader = alternate?.authHeader || entry?.authHeader || "bearer";
          const token = effectiveKey || credentials.accessToken || entry?.anonymousApiKey;
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

    const isCompatibleProvider =
      this.provider?.startsWith?.("openai-compatible-") ||
      this.provider?.startsWith?.("anthropic-compatible-");

    if (isCompatibleProvider) {
      applyCustomHeaders(headers, credentials.providerSpecificData?.customHeaders);
    }

    // Forward client request metadata headers (from OpenCode or similar clients)
    // Allowlist-based: only specific x-opencode-* headers and User-Agent are forwarded
    if (clientHeaders) {
      forwardOpencodeClientHeaders(headers, clientHeaders);

      // #3974: merge the client's negotiated anthropic-beta (allowlisted) into the
      // outbound set. The registry's static ANTHROPIC_BETA_CLAUDE_OAUTH lacks
      // tool-search-tool-2025-10-19, so deferred-tool requests were rejected with
      // 400 "Tool reference not found". Allowlist-merge preserves it without
      // forwarding betas the backend rejects.
      const clientBeta = clientHeaders["anthropic-beta"] ?? clientHeaders["Anthropic-Beta"] ?? null;
      const betaKey = Object.keys(headers).find((key) => key.toLowerCase() === "anthropic-beta");
      if (betaKey && clientBeta) {
        headers[betaKey] = mergeClientAnthropicBeta(
          headers[betaKey],
          clientBeta,
          undefined,
          // Gate the client-negotiated context-1m beta on the RESOLVED target model:
          // combo/fallback can route a request negotiated for a [1m] sibling onto a
          // model that does not qualify (e.g. Haiku), which Anthropic rejects (#10119).
          model
        );
      }
    }

    normalizeAnthropicHeaderVariants(headers);

    return headers;
  }

  /**
   * Downgrade `response_format: { type: "json_schema" }` to `json_object` for
   * `openai-compatible-*` providers AND `kilocode`, injecting the JSON schema
   * into the system prompt instead. DeepSeek / Ollama / local OpenAI-compatible
   * models often lack native Structured Output and return empty or malformed
   * content when a `json_schema` response_format is forwarded as-is (kilocode's
   * DeepSeek V4 Flash rejects it with HTTP 400 `Invalid input: response_format`,
   * verified live 2026-08-15 — same class as #9992's opencode fix). Gated so
   * providers with native Structured Output support keep the native
   * `json_schema` path.
   */
  applyJsonSchemaFallback<T>(body: T): T {
    const provider = this.provider ?? "";
    const isOpenAiCompatible = provider.startsWith("openai-compatible-");
    const isKiloCode = provider === "kilocode";
    if (!isOpenAiCompatible && !isKiloCode) return body;
    if (!body || typeof body !== "object" || Array.isArray(body)) return body;

    const record = body as Record<string, unknown>;
    const rf = record.response_format as
      { type?: string; json_schema?: { schema?: unknown } } | undefined;
    if (!rf) return body;

    // openai-compatible-* providers accept json_object natively — only the
    // json_schema form needs downgrading there. kilocode rejects BOTH forms,
    // so it enters the strip path below regardless.
    if (isOpenAiCompatible && rf.type === "json_object") return body;

    const schema = rf.type === "json_schema" ? rf.json_schema?.schema : undefined;
    if (rf.type === "json_schema" && !schema) return body;

    const schemaJson = schema ? JSON.stringify(schema, null, 2) : null;
    const prompt =
      schemaJson !== null
        ? `You must respond with valid JSON that strictly follows this JSON schema:\n\`\`\`json\n${schemaJson}\n\`\`\`\nRespond ONLY with the JSON object, no other text.`
        : "You must respond with valid JSON only (a single JSON object), no other text.";

    const messages: Array<Record<string, unknown>> = Array.isArray(record.messages)
      ? (record.messages as Array<Record<string, unknown>>).map((m) => ({ ...m }))
      : [];
    const sys = messages.find((m) => m.role === "system");
    if (sys) {
      if (typeof sys.content === "string") {
        sys.content = `${sys.content}\n\n${prompt}`;
      } else if (Array.isArray(sys.content)) {
        sys.content.push({ type: "text", text: `\n\n${prompt}` });
      }
    } else {
      messages.unshift({ role: "system", content: prompt });
    }

    // kilocode's DeepSeek rejects ANY response_format (verified live 2026-08-15:
    // both json_schema AND json_object 400 with `param: response_format`) — strip
    // it entirely and rely on the schema prompt. openai-compatible-* providers
    // accept json_object, so keep the downgrade there.
    if (isKiloCode) {
      const { response_format: _dropped, ...rest } = record;
      return { ...rest, messages } as T;
    }
    return { ...record, messages, response_format: { type: "json_object" } } as T;
  }

  // Some Responses-compatible upstreams (e.g. LM Studio) reject a request whose
  // `text` is an object missing `text.format` with a 400 missing_required_parameter.
  // The Responses API default for that field is { type: "text" }, so default it
  // for openai-compatible "responses" providers before forwarding upstream.
  defaultResponsesTextFormat<T>(body: T): T {
    if (!this.provider?.startsWith?.("openai-compatible-")) return body;
    if (!this.provider.includes("responses")) return body;
    if (!body || typeof body !== "object" || Array.isArray(body)) return body;
    const record = body as Record<string, unknown>;
    const text = record.text;
    if (!text || typeof text !== "object" || Array.isArray(text)) return body;
    const textRecord = text as Record<string, unknown>;
    if (textRecord.format !== undefined) return body;
    return { ...record, text: { ...textRecord, format: { type: "text" } } } as T;
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

    // ponytail: backfill missing tool message names for strict OpenAI-compatible providers.
    // Kimi K3 and some BYOK endpoints reject tool messages whose `name` field was stripped
    // during combo routing or format translation. Build a tool_call_id → function.name
    // lookup from assistant messages and restore missing names before forwarding.
    if (
      withDefaults &&
      typeof withDefaults === "object" &&
      !Array.isArray(withDefaults) &&
      Array.isArray((withDefaults as Record<string, unknown>).messages)
    ) {
      withDefaults = ensureToolMessageNames(withDefaults as Record<string, unknown>);
    }

    withDefaults = this.applyJsonSchemaFallback(withDefaults);
    withDefaults = this.defaultResponsesTextFormat(withDefaults);
    if (this.provider === "perplexity-agent") {
      withDefaults = defaultPerplexityAgentMaxOutputTokens(withDefaults);
    }

    if (this.provider === "nvidia") {
      normalizeNvidiaToolCallIds(withDefaults);
    }

    // Port of decolua/9router commit d652300e:
    // Cerebras returns 400 (wrong_api_format), Mistral returns 422
    // (extra_forbidden), and NVIDIA's OpenAI-compatible wrapper returns 400
    // (Unsupported parameter) when the forwarded body carries `client_metadata`
    // (an OpenAI Codex / Claude CLI passthrough field with no equivalent on
    // these upstreams). Strip it before sending downstream. Other providers
    // (notably `openai` / `codex`) intentionally keep it.
    if (
      withDefaults &&
      typeof withDefaults === "object" &&
      !Array.isArray(withDefaults) &&
      (this.provider === "cerebras" || this.provider === "mistral" || this.provider === "nvidia") &&
      Object.prototype.hasOwnProperty.call(withDefaults, "client_metadata")
    ) {
      const withoutClientMetadata = { ...(withDefaults as Record<string, unknown>) };
      delete withoutClientMetadata.client_metadata;
      withDefaults = withoutClientMetadata;
    }
    // Nous Research inference gateway (portal.nousresearch.com) requires a top-level
    // `tags` array containing at least a `user=` item on raw API-key requests (#11861).
    // Without `tags`, upstream returns 400 "missing tags".
    // Without `user=...`, upstream returns 400 "missing user tag".
    if (
      this.provider === "nous-research" &&
      withDefaults &&
      typeof withDefaults === "object" &&
      !Array.isArray(withDefaults)
    ) {
      const record = withDefaults as Record<string, unknown>;
      const extraBody = record.extra_body as Record<string, unknown> | undefined;

      const rawTags = Array.isArray(record.tags)
        ? (record.tags as unknown[])
        : Array.isArray(extraBody?.tags)
          ? (extraBody.tags as unknown[])
          : [];

      const stringTags = rawTags.filter(
        (t): t is string => typeof t === "string" && t.trim().length > 0
      );

      const hasUserTag = stringTags.some((t) => t.startsWith("user="));
      if (!hasUserTag) {
        const username =
          typeof record.user === "string" && record.user.trim() ? record.user.trim() : "omniroute";
        record.tags = [...stringTags, `user=${username}`];
      } else {
        record.tags = stringTags;
      }
    }

    // 9router#1649: Mistral's API returns 422 (extra_forbidden) when an
    // assistant message carries a `reasoning_content` field (replayed thinking
    // from a prior turn, e.g. via the Codex /responses path). The field is
    // nested per-message, so the generic top-level 400/field-downgrade retry
    // doesn't cover it. Strip it from every message before sending — scoped to
    // Mistral so DeepSeek (which *requires* replayed reasoning_content) is
    // unaffected.
    if (
      this.provider === "mistral" &&
      withDefaults &&
      typeof withDefaults === "object" &&
      !Array.isArray(withDefaults) &&
      Array.isArray((withDefaults as Record<string, unknown>).messages)
    ) {
      const record = withDefaults as Record<string, unknown>;
      const messages = record.messages as unknown[];
      let mutated = false;
      const cleaned = messages.map((msg) => {
        if (
          msg &&
          typeof msg === "object" &&
          !Array.isArray(msg) &&
          Object.prototype.hasOwnProperty.call(msg, "reasoning_content")
        ) {
          mutated = true;
          const { reasoning_content: _dropped, ...rest } = msg as Record<string, unknown>;
          return rest;
        }
        return msg;
      });
      if (mutated) {
        withDefaults = { ...record, messages: cleaned };
      }
    }

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
        // Do not inject stream_options when the outgoing body explicitly disables streaming.
        const defaultsRecord = withDefaults as Record<string, unknown>;
        const bodyDisablesStreamOptions =
          defaultsRecord.stream !== undefined && defaultsRecord.stream !== true;
        if (bodyDisablesStreamOptions) {
          if (Object.prototype.hasOwnProperty.call(defaultsRecord, "stream_options")) {
            const withoutStreamOptions = { ...defaultsRecord };
            delete withoutStreamOptions.stream_options;
            withDefaults = withoutStreamOptions;
          }
        } else if (!credentials?.providerSpecificData?.disableStreamOptions) {
          withDefaults = {
            ...withDefaults,
            stream: true,
            stream_options: {
              ...((defaultsRecord.stream_options as object) || {}),
              include_usage: true,
            },
          };
        } else if (Object.prototype.hasOwnProperty.call(withDefaults, "stream_options")) {
          const withoutStreamOptions = { ...withDefaults } as Record<string, unknown>;
          delete withoutStreamOptions.stream_options;
          withDefaults = withoutStreamOptions;
        }
      } else if (!stream && Object.prototype.hasOwnProperty.call(withDefaults, "stream_options")) {
        // #3884: stream_options is only valid on streaming requests. NVIDIA NIM
        // (and the OpenAI spec) reject "Stream options can only be defined when
        // stream=True" on non-streaming calls. Strip any client-sent
        // stream_options when the outbound request is not streaming.
        const withoutStreamOptions = { ...withDefaults } as Record<string, unknown>;
        delete withoutStreamOptions.stream_options;
        withDefaults = withoutStreamOptions;
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
        const isRecentOpenAI = /^(?:openai\/)?(?:o1|o3|o4|gpt-5)/i.test(model);
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

      withDefaults = applyZaiGlm53OpenAIDefaults(this.provider, model, withDefaults, stream);
    }

    // Config-driven strip of params unsupported by the target provider/model
    // (e.g. claude-opus-4 deprecated `temperature` → Anthropic 400). Port from
    // 9router#7ae9fff6 (fixes upstream #1748). Rules live in
    // ../translator/paramSupport.ts so adding one means editing one table.
    if (typeof withDefaults === "object" && withDefaults !== null) {
      const bodyRecord = withDefaults as Record<string, unknown>;
      const outboundModel = typeof bodyRecord.model === "string" ? bodyRecord.model : model;
      withDefaults = mapNvidiaGlm52ReasoningParams(bodyRecord, this.provider, outboundModel);
      stripUnsupportedParams(this.provider, outboundModel, withDefaults as Record<string, unknown>);
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

    // Reasoning models burn all of max_tokens on the thinking phase when the budget is too
    // small, leaving content empty (finish_reason: "length"); applies to all providers (#6912).
    if (typeof withDefaults === "object" && withDefaults !== null) {
      this.ensureThinkingBudget(withDefaults as Record<string, unknown>, model);
    }

    // 9router#1480: native Moonshot providers 400 when a prior assistant turn
    // lacks reasoning_content. OpencodeExecutor
    // already injects a placeholder for OpenCode-routed thinking models; the
    // direct connections hit neither injection path. Scope to Moonshot ids so
    // gateway-served models that merely match the thinking-model name pattern
    // (and may reject an extra field) are unaffected.
    if (this.provider === "kimi" || this.provider === "moonshot") {
      const outboundModel =
        typeof (withDefaults as Record<string, unknown>)?.model === "string"
          ? ((withDefaults as Record<string, unknown>).model as string)
          : model;
      if (shouldInjectReasoningContentPlaceholder(this.provider, outboundModel)) {
        withDefaults = injectReasoningContentForThinkingModel(withDefaults);
      }
    }

    const toolNameMaxLength = getRegistryEntry(this.provider)?.toolNameMaxLength;
    if (
      toolNameMaxLength &&
      withDefaults &&
      typeof withDefaults === "object" &&
      !Array.isArray(withDefaults)
    ) {
      const toolNameMap = normalizeOpenAIToolNames(withDefaults, toolNameMaxLength);
      if (toolNameMap.size > 0) {
        const existingToolNameMap =
          (withDefaults as Record<string, unknown>)._toolNameMap instanceof Map
            ? ((withDefaults as Record<string, unknown>)._toolNameMap as Map<string, string>)
            : null;
        const responseToolNameMap = existingToolNameMap
          ? new Map(existingToolNameMap)
          : new Map<string, string>();
        for (const [alias, original] of toolNameMap) {
          responseToolNameMap.set(alias, original);
        }
        Object.defineProperty(withDefaults, "_toolNameMap", {
          value: responseToolNameMap,
          enumerable: false,
          configurable: true,
          writable: true,
        });
      }
    }

    return withDefaults;
  }

  // Reasoning models (ClinePass, OpenRouter, etc.) leave content empty when the reasoning
  // budget consumes all of max_tokens; bump max_tokens to a safe minimum when undersized.
  ensureThinkingBudget(body: Record<string, unknown>, model: string): Record<string, unknown> {
    if (!body) return body;

    const outboundModel = typeof body.model === "string" ? body.model : model;
    const entry = getRegistryEntry(this.provider);
    const modelEntry = entry?.models?.find((m) => m.id === outboundModel);
    if (!modelEntry?.supportsReasoning) return body;

    const extraBody = body.extra_body as Record<string, unknown> | undefined;
    const thinking = extraBody?.thinking as Record<string, unknown> | undefined;
    const effort = body.reasoning_effort;
    const reasoningEnabled =
      thinking?.type === "enabled" ||
      (typeof effort === "string" && effort !== "none" && effort !== "off") ||
      effort === true;
    if (!reasoningEnabled) return body;

    const MIN_TOKENS = 4096;
    const maxOutput =
      typeof modelEntry.maxOutputTokens === "number" && modelEntry.maxOutputTokens > 0
        ? modelEntry.maxOutputTokens
        : MIN_TOKENS;
    const target = Math.min(MIN_TOKENS, maxOutput);
    const current = body.max_tokens ?? body.max_completion_tokens;

    // #6912: keep whichever token key transformRequest already set (o1/o3/o4/gpt-5 use
    // max_completion_tokens) instead of re-introducing max_tokens alongside it.
    const tokenKey =
      body.max_completion_tokens !== undefined ? "max_completion_tokens" : "max_tokens";

    if (typeof current !== "number" || current <= 0) {
      body[tokenKey] = target;
    } else if (current < MIN_TOKENS && current < maxOutput) {
      body[tokenKey] = MIN_TOKENS;
    }
    return body;
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
    // #6846 Phase 1: per-connection concurrency cap for nvidia — no-op for every
    // other provider (returns null immediately, no semaphore key allocated).
    const releaseNvidiaSlot = await acquireNvidiaConcurrencySlot(
      this.provider,
      input.credentials?.connectionId
    );
    try {
      return await this.executeWithSessionPool(input);
    } finally {
      releaseNvidiaSlot?.();
    }
  }

  private async executeWithSessionPool(input: ExecuteInput) {
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
