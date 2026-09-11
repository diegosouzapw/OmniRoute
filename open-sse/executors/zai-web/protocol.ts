import { Buffer } from "node:buffer";
import { createHmac, randomUUID } from "node:crypto";
import type { ProviderCredentials } from "../base.ts";
import { extractImageUrls } from "../../utils/cursorImages.ts";
import { normalizeCookie, sanitizeErrorMessage } from "../../utils/error.ts";

export const ZAI_BASE_URL = "https://chat.z.ai";
export const ZAI_NEW_CHAT_URL = `${ZAI_BASE_URL}/api/v1/chats/new`;
export const ZAI_CHAT_URL = `${ZAI_BASE_URL}/api/v2/chat/completions`;
export const ZAI_DEFAULT_MODEL = "glm-5.3";
export const ZAI_DEFAULT_FE_VERSION = "prod-fe-1.1.92";
export const ZAI_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";
export const ZAI_FE_VERSION_CACHE_TTL_MS = 15 * 60 * 1000;

const CLIENT_PROTOCOL_VERSION = "0.0.1";
const SIGNATURE_KEY = "key-@@@@)))()((9))-xxxx&&&%%%%%";

export interface NewChatRequest {
  payload: Record<string, unknown>;
  userMessageId: string;
}

export type ZaiReasoningEffort = "low" | "high" | "max";

export interface ZaiThinkingConfig {
  enabled: boolean;
  effort: ZaiReasoningEffort;
  effortSupported: boolean;
  supported: boolean;
}

export interface ZaiModelCapabilities {
  mcp: boolean;
  reasoningEffort: boolean;
  returnFc: boolean;
  thinking: boolean;
  vision: boolean;
  vlmTools: boolean;
  vlmWebSearch: boolean;
  vlmWebsiteMode: boolean;
  webSearch: boolean;
}

export interface ZaiVlmConfig {
  toolsEnabled: boolean;
  webSearchEnabled: boolean;
  websiteModeEnabled: boolean;
}

const NO_ZAI_MODEL_CAPABILITIES: ZaiModelCapabilities = Object.freeze({
  mcp: false,
  reasoningEffort: false,
  returnFc: false,
  thinking: false,
  vision: false,
  vlmTools: false,
  vlmWebSearch: false,
  vlmWebsiteMode: false,
  webSearch: false,
});

/**
 * Verified against chat.z.ai/api/models (prod-fe-1.1.92).
 * `returnFc` is the site's internal function-call result capability; it is
 * distinct from accepting caller-supplied OpenAI `tools`.
 */
const ZAI_MODEL_CAPABILITIES: Record<string, ZaiModelCapabilities> = {
  "glm-5.3-flash": {
    mcp: false,
    reasoningEffort: true,
    returnFc: true,
    thinking: true,
    vision: true,
    vlmTools: false,
    vlmWebSearch: false,
    vlmWebsiteMode: false,
    webSearch: true,
  },
  "glm-5.3": {
    mcp: true,
    reasoningEffort: true,
    returnFc: true,
    thinking: true,
    vision: false,
    vlmTools: false,
    vlmWebSearch: false,
    vlmWebsiteMode: false,
    webSearch: true,
  },
  "glm-5.2": {
    mcp: true,
    reasoningEffort: true,
    returnFc: true,
    thinking: true,
    vision: false,
    vlmTools: false,
    vlmWebSearch: false,
    vlmWebsiteMode: false,
    webSearch: true,
  },
};

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function browserFailureDetail(body: Buffer): string {
  const raw = body.toString("utf8").trim();
  if (!raw) return "";
  try {
    const parsed = asRecord(JSON.parse(raw));
    const error = asRecord(parsed?.error);
    const detail = error?.message ?? parsed?.detail ?? parsed?.message;
    if (typeof detail === "string") return sanitizeErrorMessage(detail).slice(0, 500);
  } catch {
    // Non-JSON upstream errors are still useful after sanitizing and bounding them.
  }
  return sanitizeErrorMessage(raw).slice(0, 500);
}

export function describeZaiBrowserFailure(result: {
  status: number;
  body: Buffer;
  observedPostUrls?: string[];
  observedPostResponses?: Array<{ url: string; status: number }>;
  timing: { captureResponseMs: number; totalMs: number };
}): string {
  const status = result.status > 0 ? String(result.status) : "no matching response";
  const timing = `capture ${result.timing.captureResponseMs}ms, total ${result.timing.totalMs}ms`;
  const observed =
    result.observedPostUrls && result.observedPostUrls.length > 0
      ? ` Observed POST targets: ${result.observedPostUrls.join(", ")}.`
      : "";
  const observedResponses =
    result.observedPostResponses && result.observedPostResponses.length > 0
      ? ` Observed POST responses: ${result.observedPostResponses
          .map(({ url, status }) => `${url} [${status}]`)
          .join(", ")}.`
      : "";
  const detail =
    browserFailureDetail(result.body) ||
    (result.status === 0
      ? `The page did not issue the expected authenticated chat completion request.${observed}${observedResponses}`
      : "The browser response body was empty.");
  return `Z.ai browser transport failed (${status}; ${timing}): ${detail}`;
}

function parseCredentialJson(raw: string): Record<string, unknown> | null {
  if (!raw.trim().startsWith("{")) return null;
  try {
    return asRecord(JSON.parse(raw));
  } catch {
    return null;
  }
}

/** Extract the localStorage Bearer token, while accepting legacy token= input. */
export function extractZaiToken(rawCredential: string): string {
  const trimmed = rawCredential.trim();
  const json = parseCredentialJson(trimmed);
  if (json) {
    const token = json.token ?? json.accessToken ?? json.access_token;
    return typeof token === "string" ? token.trim() : "";
  }

  const bearer = trimmed.match(/^(?:Authorization:\s*)?Bearer\s+(.+)$/i);
  if (bearer) return bearer[1].trim();

  const normalized = normalizeCookie(trimmed);
  if (!normalized) return "";
  const match = normalized.match(/(?:^|;\s*)token=([^;]+)/);
  if (match) return match[1].trim();
  return normalized.includes(";") || normalized.includes("=") ? "" : normalized;
}

/** Read the short-lived browser CAPTCHA proof from supported input locations. */
export function extractZaiCaptchaVerifyParam(value: unknown): string {
  const record = asRecord(value);
  if (record) {
    const direct =
      record.captcha_verify_param ?? record.captchaVerifyParam ?? record.zaiCaptchaVerifyParam;
    if (typeof direct === "string" && direct.trim()) return direct.trim();
    const nested = asRecord(record.providerSpecificData);
    if (nested) return extractZaiCaptchaVerifyParam(nested);
    return "";
  }

  if (typeof value !== "string") return "";
  const json = parseCredentialJson(value);
  if (json) return extractZaiCaptchaVerifyParam(json);
  const match = value.match(/(?:^|;\s*)captcha_verify_param=([^;]+)/);
  return match?.[1]?.trim() ?? "";
}

export function resolveZaiCaptchaVerifyParam(
  credentials: ProviderCredentials,
  body: Record<string, unknown>
): string {
  return (
    extractZaiCaptchaVerifyParam(body) ||
    extractZaiCaptchaVerifyParam(credentials.providerSpecificData) ||
    extractZaiCaptchaVerifyParam(credentials.apiKey) ||
    extractZaiCaptchaVerifyParam(credentials.accessToken)
  );
}

export function extractZaiUserId(token: string): string {
  const payload = token.split(".")[1];
  if (!payload) return "";
  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof decoded?.id === "string" ? decoded.id : "";
  } catch {
    return "";
  }
}

export function buildZaiSignature(input: {
  prompt: string;
  requestId: string;
  timestamp: number | string;
  userId: string;
}): string {
  const timestamp = String(input.timestamp);
  const sortedPayload = Object.entries({
    timestamp,
    requestId: input.requestId,
    user_id: input.userId,
  })
    .sort(([left], [right]) => left.localeCompare(right))
    .join(",");
  const encodedPrompt = Buffer.from(input.prompt, "utf8").toString("base64");
  const bucket = Math.floor(Number(timestamp) / (5 * 60 * 1000));
  const derivedKey = createHmac("sha256", SIGNATURE_KEY).update(String(bucket)).digest("hex");
  return createHmac("sha256", derivedKey)
    .update(`${sortedPayload}|${encodedPrompt}|${timestamp}`)
    .digest("hex");
}

export function parseZaiFrontendVersion(html: string): string | null {
  return html.match(/\/frontend\/(prod-fe-\d+(?:\.\d+)*)\/assets\//)?.[1] ?? null;
}

function textContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .flatMap((part) => {
      const record = asRecord(part);
      if (!record || (record.type !== "text" && record.type !== "input_text")) return [];
      const text = record.text ?? record.content;
      return typeof text === "string" ? [text] : [];
    })
    .join("\n");
}

export function latestUserPrompt(messages: Array<{ role: string; content: unknown }>): string {
  for (let index = messages.length - 1; index >= 0; index--) {
    if (messages[index]?.role !== "user") continue;
    return textContent(messages[index].content);
  }
  return "";
}

export function foldMessages(
  messages: Array<{ role: string; content: unknown }>
): Array<{ role: string; content: string }> {
  return messages.map((message) => ({
    role: message.role,
    content: textContent(message.content),
  }));
}

export function browserPrompt(messages: Array<{ role: string; content: unknown }>): string {
  const folded = foldMessages(messages);
  if (folded.length === 1 && folded[0]?.role === "user") return folded[0].content;
  return folded.map((message) => `${message.role.toUpperCase()}:\n${message.content}`).join("\n\n");
}

export function collectZaiImageUrls(messages: Array<{ role: string; content: unknown }>): string[] {
  return messages.flatMap((message) =>
    message.role === "user" ? extractImageUrls(message.content) : []
  );
}

export function zaiImageFileName(mimeType: string, index: number): string {
  const normalized = mimeType.toLowerCase().split(";")[0].trim();
  const extension =
    normalized === "image/jpeg"
      ? "jpg"
      : normalized === "image/svg+xml"
        ? "svg"
        : normalized.startsWith("image/")
          ? normalized.slice("image/".length).replace(/[^a-z0-9]/g, "") || "png"
          : "png";
  return `omniroute-image-${index + 1}.${extension}`;
}

export function unprefixedModelId(modelId: string): string {
  return modelId.trim().split("/").at(-1) || modelId.trim();
}

/** Map OmniRoute's public Flash id to the opaque id used by chat.z.ai's wire API. */
export function zaiUpstreamModelId(modelId: string): string {
  const unprefixed = unprefixedModelId(modelId);
  return unprefixed.toLowerCase() === "glm-5.3-flash" ? "x-preview-l" : unprefixed;
}

function zaiCapabilityModelId(modelId: string): string {
  const unprefixed = unprefixedModelId(modelId).toLowerCase();
  return unprefixed === "x-preview-l" ? "glm-5.3-flash" : unprefixed;
}

export function browserModelName(modelId: string): string {
  const normalized = zaiCapabilityModelId(modelId);
  if (normalized === "glm-5.3-flash") return "GLM-5.3-Flash";
  if (normalized === "glm-5.3") return "GLM-5.3";
  if (normalized === "glm-5.2") return "GLM-5.2";
  return unprefixedModelId(modelId);
}

export function getZaiModelCapabilities(modelId: string): ZaiModelCapabilities {
  return ZAI_MODEL_CAPABILITIES[zaiCapabilityModelId(modelId)] ?? NO_ZAI_MODEL_CAPABILITIES;
}

function getFeatureOption(body: Record<string, unknown>, key: string): unknown {
  if (body[key] !== undefined) return body[key];
  return asRecord(body.features)?.[key];
}

/** Resolve each model's Deep Think control using its currently exposed effort vocabulary. */
export function resolveZaiThinkingConfig(
  modelId: string,
  body: Record<string, unknown>
): ZaiThinkingConfig {
  const capabilities = getZaiModelCapabilities(modelId);
  const supported = capabilities.thinking;
  const reasoning = asRecord(body.reasoning);
  const rawEffort =
    typeof body.reasoning_effort === "string"
      ? body.reasoning_effort.trim().toLowerCase()
      : typeof reasoning?.effort === "string"
        ? reasoning.effort.trim().toLowerCase()
        : "";
  const supportsLowEffort = zaiCapabilityModelId(modelId) !== "glm-5.2";
  const effort: ZaiReasoningEffort =
    rawEffort === "low" && supportsLowEffort
      ? "low"
      : rawEffort === "low" || rawEffort === "medium" || rawEffort === "high"
        ? "high"
        : "max";

  return {
    supported,
    // The current GLM-5.3/5.2 consumer models expose effort selection but no
    // non-thinking mode. Keep Deep Think enabled even when a generic client
    // sends an off/none compatibility value.
    enabled: supported,
    effort,
    effortSupported: capabilities.reasoningEffort,
  };
}

/** Resolve the selected model's visible Web Search and Tools controls. */
export function resolveZaiVlmConfig(modelId: string, body: Record<string, unknown>): ZaiVlmConfig {
  const capabilities = getZaiModelCapabilities(modelId);
  const toolsOption = getFeatureOption(body, "vlm_tools_enable");
  const webSearchOption =
    getFeatureOption(body, "vlm_web_search_enable") ??
    getFeatureOption(body, "auto_web_search") ??
    getFeatureOption(body, "web_search");
  const webSearchEnabled =
    webSearchOption === true || (webSearchOption !== false && capabilities.vlmWebSearch);
  return {
    toolsEnabled: capabilities.vlmTools && toolsOption !== false,
    webSearchEnabled: capabilities.webSearch && webSearchEnabled,
    websiteModeEnabled: capabilities.vlmWebsiteMode,
  };
}

export function buildZaiHeaders(
  token: string,
  options: {
    accept: "application/json" | "text/event-stream";
    frontendVersion?: string;
    signature?: string;
  }
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: options.accept,
    "Accept-Language": "en-US",
    "User-Agent": ZAI_USER_AGENT,
    Origin: ZAI_BASE_URL,
    Referer: `${ZAI_BASE_URL}/`,
    Authorization: `Bearer ${token}`,
  };
  if (options.frontendVersion) headers["X-FE-Version"] = options.frontendVersion;
  if (options.signature) headers["X-Signature"] = options.signature;
  return headers;
}

export function buildZaiCompletionUrl(input: {
  requestId: string;
  timestamp: number;
  token: string;
  userId: string;
}): string {
  const now = new Date(input.timestamp);
  const params = new URLSearchParams({
    timestamp: String(input.timestamp),
    requestId: input.requestId,
    user_id: input.userId,
    version: CLIENT_PROTOCOL_VERSION,
    platform: "web",
    token: input.token,
    user_agent: ZAI_USER_AGENT,
    language: "en-US",
    languages: "en-US,en",
    timezone: "UTC",
    cookie_enabled: "true",
    screen_width: "1280",
    screen_height: "800",
    screen_resolution: "1280x800",
    viewport_height: "800",
    viewport_width: "1280",
    viewport_size: "1280x800",
    color_depth: "24",
    pixel_ratio: "1",
    current_url: `${ZAI_BASE_URL}/`,
    pathname: "/",
    search: "",
    hash: "",
    host: "chat.z.ai",
    hostname: "chat.z.ai",
    protocol: "https:",
    referrer: "",
    title: "Z.ai - Advanced AI Chatbot & Agent powered by GLM-5.3",
    timezone_offset: "0",
    local_time: now.toISOString(),
    utc_time: now.toUTCString(),
    is_mobile: "false",
    is_touch: "false",
    max_touch_points: "0",
    browser_name: "Chrome",
    os_name: "Mac OS",
    signature_timestamp: String(input.timestamp),
  });
  return `${ZAI_CHAT_URL}?${params.toString()}`;
}

export function buildZaiNewChatBody(
  messages: Array<{ role: string; content: unknown }>,
  modelId: string,
  enableThinking: boolean,
  reasoningEffort: ZaiReasoningEffort,
  vlmConfig: ZaiVlmConfig
): NewChatRequest {
  const prompt = latestUserPrompt(messages);
  const userMessageId = randomUUID();
  const upstreamModelId = zaiUpstreamModelId(modelId);
  return {
    userMessageId,
    payload: {
      chat: {
        id: "",
        title: "New Chat",
        models: [upstreamModelId],
        params: {},
        history: {
          messages: {
            [userMessageId]: {
              id: userMessageId,
              parentId: null,
              childrenIds: [],
              role: "user",
              content: prompt,
              timestamp: Math.floor(Date.now() / 1000),
              models: [upstreamModelId],
            },
          },
          currentId: userMessageId,
        },
        tags: [],
        flags: [],
        features: [
          {
            server: "tool_selector_h",
            status: "hidden",
            type: "tool_selector",
          },
        ],
        mcp_servers: [],
        enable_thinking: enableThinking,
        reasoning_effort: reasoningEffort,
        auto_web_search: vlmConfig.webSearchEnabled,
        message_version: 1,
        extra: {
          vlm_tools_enable: vlmConfig.toolsEnabled,
          vlm_web_search_enable: vlmConfig.websiteModeEnabled && vlmConfig.webSearchEnabled,
          vlm_website_mode: vlmConfig.websiteModeEnabled,
        },
        timestamp: Date.now(),
        type: "default",
      },
    },
  };
}

export function buildZaiRequestBody(input: {
  body: Record<string, unknown>;
  captchaVerifyParam: string;
  chatId: string;
  messages: Array<{ role: string; content: unknown }>;
  modelId: string;
  prompt: string;
  userMessageId: string;
  enableThinking: boolean;
  reasoningEffort: ZaiReasoningEffort;
  reasoningEffortSupported: boolean;
  vlmConfig: ZaiVlmConfig;
}): Record<string, unknown> {
  const params = Object.fromEntries(
    ["temperature", "top_p", "max_tokens", "stop"]
      .filter((key) => input.body[key] !== undefined)
      .map((key) => [key, input.body[key]])
  );
  const features: Record<string, unknown> = {
    image_generation: false,
    web_search: false,
    auto_web_search: input.vlmConfig.websiteModeEnabled ? false : input.vlmConfig.webSearchEnabled,
    preview_mode: true,
    flags: [],
    vlm_tools_enable: input.vlmConfig.toolsEnabled,
    vlm_web_search_enable: input.vlmConfig.websiteModeEnabled && input.vlmConfig.webSearchEnabled,
    vlm_website_mode: input.vlmConfig.websiteModeEnabled,
    enable_thinking: input.enableThinking,
  };
  if (input.enableThinking && input.reasoningEffortSupported) {
    features.reasoning_effort = input.reasoningEffort;
  }
  return {
    stream: true,
    model: zaiUpstreamModelId(input.modelId),
    messages: foldMessages(input.messages),
    signature_prompt: input.prompt,
    params,
    extra: {
      vlm_tools_enable: input.vlmConfig.toolsEnabled,
      vlm_web_search_enable: input.vlmConfig.websiteModeEnabled && input.vlmConfig.webSearchEnabled,
      vlm_website_mode: input.vlmConfig.websiteModeEnabled,
    },
    features,
    variables: {},
    chat_id: input.chatId,
    id: randomUUID(),
    current_user_message_id: input.userMessageId,
    current_user_message_parent_id: null,
    background_tasks: {
      title_generation: true,
      tags_generation: true,
    },
    captcha_verify_param: input.captchaVerifyParam,
  };
}
