import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

export const PETALS_DEFAULT_BASE_URL = "https://chat.petals.dev/api/v1/generate";
export const PETALS_DEFAULT_MODEL = "meta-llama/Llama-2-70b-chat-hf";

export function normalizePetalsBaseUrl(value: string | null | undefined): string {
  const normalized = stripTrailingSlashes((value || PETALS_DEFAULT_BASE_URL).trim());
  if (!normalized) return PETALS_DEFAULT_BASE_URL;

  return normalized.endsWith("/generate") ? normalized : `${normalized}/generate`;
}
