// Pure per-provider chat-URL normalizers + connection-preset reader.
// Extracted verbatim from default.ts (string transforms only, no host state/this).
import { buildDataRobotChatUrl } from "../../config/datarobot.ts";
import { buildAzureAiChatUrl } from "../../config/azureAi.ts";
import { buildWatsonxChatUrl } from "../../config/watsonx.ts";
import { buildOciChatUrl } from "../../config/oci.ts";
import { buildSapChatUrl } from "../../config/sap.ts";
import { normalizeBaseUrl } from "../../utils/urlSanitize.ts";

export function normalizeBailianMessagesUrl(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl).replace(/\?beta=true$/, "");
  const messagesUrl = normalized.endsWith("/messages") ? normalized : `${normalized}/messages`;
  return messagesUrl;
}

export function normalizeDataRobotChatUrl(baseUrl) {
  return buildDataRobotChatUrl(baseUrl);
}

export function normalizeAzureAiChatUrl(
  baseUrl: string,
  apiType: "chat" | "responses" = "chat",
  model?: string,
  apiVersion?: string
) {
  return buildAzureAiChatUrl(baseUrl, apiType, model, apiVersion);
}

export function normalizeWatsonxChatUrl(baseUrl: string) {
  return buildWatsonxChatUrl(baseUrl);
}

export function normalizeOciChatUrl(baseUrl: string, apiType: "chat" | "responses" = "chat") {
  return buildOciChatUrl(baseUrl, apiType);
}

export function normalizeSapChatUrl(baseUrl) {
  return buildSapChatUrl(baseUrl);
}

export function normalizeXiaomiMimoChatUrl(baseUrl) {
  const normalized = normalizeBaseUrl(baseUrl).replace(/\/chat\/completions$/, "");
  return `${normalized}/chat/completions`;
}

export function normalizeOpenAIChatUrl(baseUrl) {
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

export function getOpenRouterConnectionPreset(
  providerSpecificData?: Record<string, unknown> | null
): string | null {
  const preset =
    typeof providerSpecificData?.preset === "string" ? providerSpecificData.preset.trim() : "";
  return preset || null;
}
