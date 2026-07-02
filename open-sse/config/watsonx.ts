import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

export const WATSONX_DEFAULT_BASE_URL = "https://ca-tor.ml.cloud.ibm.com/ml/gateway/v1";

function normalizeBaseUrl(value: string | null | undefined): string {
  return stripTrailingSlashes((value || "").trim());
}

export function normalizeWatsonxBaseUrl(value: string | null | undefined): string {
  const normalized = normalizeBaseUrl(value || WATSONX_DEFAULT_BASE_URL);
  if (!normalized) return WATSONX_DEFAULT_BASE_URL;

  const stripped = normalized.replace(
    /\/(?:chat\/completions|completions|embeddings|models)$/i,
    ""
  );

  if (stripped.endsWith("/ml/gateway/v1")) {
    return stripped;
  }

  if (stripped.endsWith("/ml/gateway")) {
    return `${stripped}/v1`;
  }

  try {
    const parsed = new URL(stripped);
    if (!parsed.pathname || parsed.pathname === "/") {
      parsed.pathname = "/ml/gateway/v1";
    } else if (parsed.pathname.endsWith("/ml/gateway")) {
      parsed.pathname = `${parsed.pathname}/v1`;
    }
    parsed.search = "";
    parsed.hash = "";
    return stripTrailingSlashes(parsed.toString());
  } catch {
    return stripped;
  }
}

export function buildWatsonxChatUrl(value: string | null | undefined): string {
  return `${normalizeWatsonxBaseUrl(value)}/chat/completions`;
}

export function buildWatsonxModelsUrl(value: string | null | undefined): string {
  return `${normalizeWatsonxBaseUrl(value)}/models`;
}
