import { stripTrailingSlashes, normalizeBaseUrl } from "../utils/urlSanitize.ts";

export const AZURE_AI_DEFAULT_BASE_URL = "https://example-resource.services.ai.azure.com/openai/v1";

export function normalizeAzureAiBaseUrl(value: string | null | undefined): string {
  const normalized = normalizeBaseUrl(value || AZURE_AI_DEFAULT_BASE_URL);
  if (!normalized) return AZURE_AI_DEFAULT_BASE_URL;

  if (
    normalized.endsWith("/chat/completions") ||
    normalized.endsWith("/responses") ||
    normalized.endsWith("/models")
  ) {
    return normalized.replace(/\/(?:chat\/completions|responses|models)$/i, "");
  }

  if (normalized.endsWith("/openai/v1") || normalized.endsWith("/v1")) {
    return normalized;
  }

  if (normalized.endsWith("/openai")) {
    return `${normalized}/v1`;
  }

  const parsed = new URL(normalized);
  if (
    parsed.hostname.endsWith(".services.ai.azure.com") ||
    parsed.hostname.endsWith(".openai.azure.com")
  ) {
    if (!parsed.pathname || parsed.pathname === "/") {
      parsed.pathname = "/openai/v1";
      return stripTrailingSlashes(parsed.toString());
    }
  }

  return normalized;
}

export type AzureUrlFormat = "foundry" | "classic";

export function detectAzureUrlFormat(baseUrl: string | null | undefined): AzureUrlFormat {
  if (!baseUrl || typeof baseUrl !== "string") return "foundry";
  const trimmed = baseUrl.trim();
  if (!trimmed) return "foundry";

  try {
    const urlStr =
      trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? trimmed
        : `https://${trimmed}`;
    const parsed = new URL(urlStr);
    const host = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.toLowerCase();

    if (host.endsWith(".services.ai.azure.com")) {
      return "foundry";
    }

    if (
      (host.endsWith(".openai.azure.com") || host.endsWith(".cognitiveservices.azure.com")) &&
      !pathname.includes("/v1")
    ) {
      return "classic";
    }

    if (pathname.includes("/v1")) {
      return "foundry";
    }

    return "foundry";
  } catch {
    return "foundry";
  }
}

export function buildAzureAiChatUrl(
  value: string | null | undefined,
  apiType: "chat" | "responses" = "chat",
  model?: string,
  apiVersion = "2024-12-01-preview"
): string {
  const format = detectAzureUrlFormat(value);
  const normalized = normalizeAzureAiBaseUrl(value);

  if (format === "classic" && model) {
    const raw = stripTrailingSlashes((value || "").trim())
      .replace(/\/openai$/i, "")
      .replace(/\/openai\/deployments\/[^/]+\/chat\/completions[^/]*$/i, "");
    return `${raw}/openai/deployments/${encodeURIComponent(model)}/chat/completions?api-version=${encodeURIComponent(apiVersion)}`;
  }

  return `${normalized}/${apiType === "responses" ? "responses" : "chat/completions"}`;
}

export function buildAzureAiModelsUrl(value: string | null | undefined): string {
  return `${normalizeAzureAiBaseUrl(value)}/models`;
}
