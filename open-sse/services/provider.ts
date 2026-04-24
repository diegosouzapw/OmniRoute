// @ts-nocheck
import { PROVIDERS } from "../config/constants.ts";
import { getRegistryEntry } from "../config/providerRegistry.ts";
import {
  buildClaudeCodeCompatibleHeaders,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  joinClaudeCodeCompatibleUrl,
} from "./claudeCodeCompatible.ts";

const OPENAI_COMPATIBLE_PREFIX = "openai-compatible-";
const OPENAI_COMPATIBLE_DEFAULTS = {
  baseUrl: "https://api.openai.com/v1",
};

const ANTHROPIC_COMPATIBLE_PREFIX = "anthropic-compatible-";
const CLAUDE_CODE_COMPATIBLE_PREFIX = "anthropic-compatible-cc-";
const ANTHROPIC_COMPATIBLE_DEFAULTS = {
  baseUrl: "https://api.anthropic.com/v1",
};

function isOpenAICompatible(provider) {
  return typeof provider === "string" && provider.startsWith(OPENAI_COMPATIBLE_PREFIX);
}

function isAnthropicCompatible(provider) {
  return typeof provider === "string" && provider.startsWith(ANTHROPIC_COMPATIBLE_PREFIX);
}

export function isClaudeCodeCompatible(provider) {
  return typeof provider === "string" && provider.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX);
}

export function getOpenAICompatibleType(
  provider,
  providerSpecificData: Record<string, unknown> | null = null
) {
  if (!isOpenAICompatible(provider)) return "chat";
  const configuredType =
    providerSpecificData &&
    typeof providerSpecificData === "object" &&
    typeof providerSpecificData.apiType === "string"
      ? providerSpecificData.apiType
      : null;
  if (
    configuredType === "responses" ||
    configuredType === "chat" ||
    configuredType === "embeddings" ||
    configuredType === "audio-transcriptions" ||
    configuredType === "audio-speech" ||
    configuredType === "images-generations"
  ) {
    return configuredType;
  }
  if (provider.includes("responses")) return "responses";
  if (provider.includes("embeddings")) return "embeddings";
  if (provider.includes("audio-transcriptions")) return "audio-transcriptions";
  if (provider.includes("audio-speech")) return "audio-speech";
  if (provider.includes("images-generations")) return "images-generations";
  return "chat";
}

function buildOpenAICompatibleUrl(baseUrl, apiType) {
  const normalized = baseUrl.replace(/\/$/, "");
  let path = "/chat/completions";
  if (apiType === "responses") {
    path = "/responses";
  } else if (apiType === "embeddings") {
    path = "/embeddings";
  } else if (apiType === "audio-transcriptions") {
    path = "/audio/transcriptions";
  } else if (apiType === "audio-speech") {
    path = "/audio/speech";
  } else if (apiType === "images-generations") {
    path = "/images/generations";
  }
  return `${normalized}${path}`;
}

function buildAnthropicCompatibleUrl(baseUrl) {
  const normalized = baseUrl.replace(/\/$/, "");
  return `${normalized}/messages`;
}

// Detect request format from endpoint first when the route is known.
// This avoids ambiguous bodies like OpenAI /chat/completions requests that also
// contain max_tokens or Claude model names.
export function detectFormatFromEndpoint(body, endpointPath = "") {
  const path = String(endpointPath || "");

  if (/\/responses(?=\/|$)/i.test(path) || /^responses(?=\/|$)/i.test(path)) {
    return "openai-responses";
  }

  if (/\/messages(?=\/|$)/i.test(path) || /^messages(?=\/|$)/i.test(path)) {
    return "claude";
  }

  if (
    /\/(?:chat\/completions|completions)(?=\/|$)/i.test(path) ||
    /^(?:chat\/completions|completions)(?=\/|$)/i.test(path)
  ) {
    return "openai";
  }

  return detectFormat(body);
}

// Detect request format from body structure
export function detectFormat(body) {
  // OpenAI Responses API:
  // - input can be string, array, or object (not only array)
  // - some clients send responses-specific fields even when input is omitted
  const hasInputField =
    Object.prototype.hasOwnProperty.call(body, "input") && body.input !== undefined;
  const hasResponsesSpecificFields =
    body.max_output_tokens !== undefined ||
    body.previous_response_id !== undefined ||
    body.reasoning !== undefined;
  if (hasInputField || hasResponsesSpecificFields) {
    return "openai-responses";
  }

  // Antigravity format: Gemini wrapped in body.request
  if (body.request?.contents && body.userAgent === "antigravity") {
    return "antigravity";
  }

  // Gemini format: has contents array
  if (body.contents && Array.isArray(body.contents)) {
    return "gemini";
  }

  // OpenAI-specific indicators (check BEFORE Claude)
  // These fields are OpenAI-specific and never appear in Claude format
  if (
    body.stream_options || // OpenAI streaming options
    body.response_format || // JSON mode, etc.
    body.logprobs !== undefined || // Log probabilities
    body.top_logprobs !== undefined ||
    body.n !== undefined || // Number of completions
    body.presence_penalty !== undefined || // Penalties
    body.frequency_penalty !== undefined ||
    body.logit_bias || // Token biasing
    body.user // User identifier
  ) {
    return "openai";
  }

  // Claude format: messages with content as array of objects with type
  // Claude requires content to be array with specific structure
  if (body.messages && Array.isArray(body.messages)) {
    const firstMsg = body.messages[0];

    // If content is array, check if it follows Claude structure
    if (firstMsg?.content && Array.isArray(firstMsg.content)) {
      const firstContent = firstMsg.content[0];

      // Claude format has specific types: text, image, tool_use, tool_result
      // OpenAI multimodal has: text, image_url (note the difference)
      if (firstContent?.type === "text" && !body.model?.includes("/")) {
        // Could be Claude or OpenAI multimodal
        // Check for Claude-specific fields
        if (body.system || body.anthropic_version) {
          return "claude";
        }
        // Check if image format is Claude (source.type) vs OpenAI (image_url.url)
        const hasClaudeImage = firstMsg.content.some(
          (c) => c.type === "image" && c.source?.type === "base64"
        );
        const hasOpenAIImage = firstMsg.content.some(
          (c) => c.type === "image_url" && c.image_url?.url
        );
        if (hasClaudeImage) return "claude";
        if (hasOpenAIImage) return "openai";

        // If still unclear, check for tool format
        const hasClaudeTool = firstMsg.content.some(
          (c) => c.type === "tool_use" || c.type === "tool_result"
        );
        if (hasClaudeTool) return "claude";
      }
    }

    // If content is string, it's likely OpenAI (Claude also supports this)
    // Check for other Claude-specific indicators
    if (body.system !== undefined || body.anthropic_version) {
      return "claude";
    }

    // Additional Claude heuristic: max_tokens is a required Claude field
    // and Claude requests rarely include OpenAI-specific fields like
    // stream_options, response_format, or logprobs
    if (body.max_tokens && !body.stream_options && !body.response_format) {
      return "claude";
    }
  }

  // Default to OpenAI format
  return "openai";
}

// Get provider config
export function getProviderConfig(provider, providerSpecificData = null) {
  if (isOpenAICompatible(provider)) {
    const apiType = getOpenAICompatibleType(provider, providerSpecificData);
    return {
      ...PROVIDERS.openai,
      format: apiType === "responses" ? "openai-responses" : "openai",
      baseUrl: OPENAI_COMPATIBLE_DEFAULTS.baseUrl,
    };
  }
  if (isAnthropicCompatible(provider)) {
    return {
      ...PROVIDERS.anthropic, // Use Anthropic defaults (header: x-api-key)
      format: "claude",
      baseUrl: ANTHROPIC_COMPATIBLE_DEFAULTS.baseUrl,
    };
  }
  return PROVIDERS[provider] || PROVIDERS.openai;
}

// Get number of fallback URLs for provider (for retry logic)
export function getProviderFallbackCount(provider) {
  const config = getProviderConfig(provider);
  return config.baseUrls?.length || 1;
}

// Build provider URL
export function buildProviderUrl(
  provider,
  model,
  stream = true,
  options: {
    baseUrl?: string;
    baseUrlIndex?: number;
    providerSpecificData?: Record<string, unknown> | null;
  } = {}
) {
  if (isOpenAICompatible(provider)) {
    const providerSpecificData = options?.providerSpecificData || null;
    const apiType = getOpenAICompatibleType(provider, providerSpecificData);
    const baseUrl =
      options?.baseUrl ||
      (typeof providerSpecificData?.baseUrl === "string" ? providerSpecificData.baseUrl : null) ||
      OPENAI_COMPATIBLE_DEFAULTS.baseUrl;
    return buildOpenAICompatibleUrl(baseUrl, apiType);
  }
  if (isAnthropicCompatible(provider)) {
    const baseUrl = options?.baseUrl || ANTHROPIC_COMPATIBLE_DEFAULTS.baseUrl;
    if (isClaudeCodeCompatible(provider)) {
      return joinClaudeCodeCompatibleUrl(baseUrl, CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH);
    }
    return buildAnthropicCompatibleUrl(baseUrl);
  }

  const entry = getRegistryEntry(provider);
  const config = getProviderConfig(provider);

  // Registry-driven URL building
  if (entry) {
    // Multi-URL providers (e.g. antigravity)
    if (entry.baseUrls) {
      const urlIndex = options?.baseUrlIndex || 0;
      const baseUrl = entry.baseUrls[urlIndex] || entry.baseUrls[0];
      if (entry.urlBuilder) return entry.urlBuilder(baseUrl, model, stream);
      return baseUrl;
    }
    // Custom URL builder (e.g. gemini, gemini-cli)
    if (entry.urlBuilder) {
      const baseUrl = entry.baseUrl || config.baseUrl;
      if (baseUrl) {
        return entry.urlBuilder(baseUrl, model, stream);
      }
    }
    // URL suffix (e.g. claude: ?beta=true)
    if (entry.urlSuffix) {
      return `${entry.baseUrl}${entry.urlSuffix}`;
    }
  }

  return config.baseUrl;
}

// Build provider headers
export function buildProviderHeaders(provider, credentials, stream = true, body = null) {
  void body;
  const config = getProviderConfig(provider);
  const entry = getRegistryEntry(provider);
  const headers = {
    "Content-Type": "application/json",
    ...config.headers,
  };

  // Add auth header
  // Specific override for Anthropic Compatible
  if (isClaudeCodeCompatible(provider)) {
    const token = credentials.apiKey || credentials.accessToken || "";
    return buildClaudeCodeCompatibleHeaders(
      token,
      stream,
      credentials?.providerSpecificData?.ccSessionId
    );
  }
  if (isAnthropicCompatible(provider)) {
    if (credentials.apiKey) {
      headers["x-api-key"] = credentials.apiKey;
    } else if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    }
    if (!headers["anthropic-version"]) {
      headers["anthropic-version"] = "2023-06-01";
    }
  } else if (provider === "github") {
    // GitHub Copilot requires special dynamic headers (x-request-id)
    const githubToken = credentials.copilotToken || credentials.accessToken;
    headers["Authorization"] = `Bearer ${githubToken}`;
    headers["x-request-id"] = crypto.randomUUID
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
    if (!stream) {
      headers["Accept"] = "application/json";
    }
  } else if (entry) {
    // Registry-driven auth
    const authHeader = entry.authHeader || "bearer";
    if (authHeader === "x-api-key") {
      const token = credentials.apiKey || credentials.accessToken;
      if (token) {
        headers["x-api-key"] = token;
      }
    } else if (authHeader === "x-goog-api-key") {
      if (credentials.apiKey) {
        headers["x-goog-api-key"] = credentials.apiKey;
      } else if (credentials.accessToken) {
        headers["Authorization"] = `Bearer ${credentials.accessToken}`;
      }
    } else {
      // bearer (default)
      headers["Authorization"] = `Bearer ${credentials.apiKey || credentials.accessToken}`;
    }
  } else {
    // Fallback for unknown providers
    headers["Authorization"] = `Bearer ${credentials.apiKey || credentials.accessToken}`;
  }

  // Stream accept header
  if (stream) {
    headers["Accept"] = "text/event-stream";
  }

  return headers;
}

// Get target format for provider
export function getTargetFormat(provider, providerSpecificData = null) {
  if (isOpenAICompatible(provider)) {
    return getOpenAICompatibleType(provider, providerSpecificData) === "responses"
      ? "openai-responses"
      : "openai";
  }
  if (isAnthropicCompatible(provider)) {
    return "claude";
  }
  // Registry-driven format lookup
  const entry = getRegistryEntry(provider);
  if (entry) return entry.format || "openai";
  const config = getProviderConfig(provider);
  return config.format || "openai";
}

// Check if last message is from user
export function isLastMessageFromUser(body) {
  const messages = body.messages || body.contents;
  if (!messages?.length) return true;
  const lastMsg = messages[messages.length - 1];
  return lastMsg?.role === "user";
}

// Check if request has thinking config
export function hasThinkingConfig(body) {
  return !!(body.reasoning_effort || body.thinking?.type === "enabled");
}

// Normalize thinking config based on last message role
// - If lastMessage is not user → remove Claude/Gemini-style thinking config
// - Keep OpenAI Chat Completions reasoning_effort as a request-level option.
export function normalizeThinkingConfig(body) {
  if (!isLastMessageFromUser(body)) {
    delete body.thinking;
  }
  return body;
}
