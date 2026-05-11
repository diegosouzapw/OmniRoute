import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

export const MARITALK_DEFAULT_BASE_URL = "https://chat.maritaca.ai/api";

export function normalizeMaritalkBaseUrl(value: string | null | undefined): string {
  const normalized = stripTrailingSlashes((value || MARITALK_DEFAULT_BASE_URL).trim());
  if (!normalized) return MARITALK_DEFAULT_BASE_URL;

  return normalized.replace(/\/chat\/(?:completions|inference)$/i, "");
}

export function buildMaritalkChatUrl(value: string | null | undefined): string {
  return `${normalizeMaritalkBaseUrl(value)}/chat/completions`;
}

export function buildMaritalkModelsUrl(value: string | null | undefined): string {
  return `${normalizeMaritalkBaseUrl(value)}/models`;
}
