import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

export const OCI_DEFAULT_BASE_URL =
  "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/openai/v1";

function normalizeBaseUrl(value: string | null | undefined): string {
  return stripTrailingSlashes((value || "").trim());
}

export function normalizeOciBaseUrl(value: string | null | undefined): string {
  const normalized = normalizeBaseUrl(value || OCI_DEFAULT_BASE_URL);
  if (!normalized) return OCI_DEFAULT_BASE_URL;

  const stripped = normalized.replace(/\/(?:chat\/completions|responses|models)$/i, "");

  if (stripped.endsWith("/openai/v1")) {
    return stripped;
  }

  if (stripped.endsWith("/openai")) {
    return `${stripped}/v1`;
  }

  try {
    const parsed = new URL(stripped);
    if (!parsed.pathname || parsed.pathname === "/") {
      parsed.pathname = "/openai/v1";
    } else if (parsed.pathname.endsWith("/openai")) {
      parsed.pathname = `${parsed.pathname}/v1`;
    }
    parsed.search = "";
    parsed.hash = "";
    return stripTrailingSlashes(parsed.toString());
  } catch {
    return stripped;
  }
}

export function buildOciChatUrl(
  value: string | null | undefined,
  apiType: "chat" | "responses" = "chat"
): string {
  return `${normalizeOciBaseUrl(value)}/${apiType === "responses" ? "responses" : "chat/completions"}`;
}

export function buildOciModelsUrl(value: string | null | undefined): string {
  return `${normalizeOciBaseUrl(value)}/models`;
}
