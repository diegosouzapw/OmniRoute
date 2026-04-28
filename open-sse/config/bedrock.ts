import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

export const BEDROCK_DEFAULT_BASE_URL = "https://bedrock-mantle.us-east-1.api.aws/v1";

function normalizeBaseUrl(value: string | null | undefined): string {
  return stripTrailingSlashes((value || "").trim());
}

function isBedrockRuntimeHost(hostname: string): boolean {
  return hostname.startsWith("bedrock-runtime.") && hostname.endsWith(".amazonaws.com");
}

function isBedrockMantleHost(hostname: string): boolean {
  return hostname.startsWith("bedrock-mantle.") && hostname.endsWith(".api.aws");
}

export function isBedrockRuntimeBaseUrl(value: string | null | undefined): boolean {
  try {
    const parsed = new URL(normalizeBaseUrl(value || BEDROCK_DEFAULT_BASE_URL));
    return isBedrockRuntimeHost(parsed.hostname);
  } catch {
    return false;
  }
}

export function isBedrockMantleBaseUrl(value: string | null | undefined): boolean {
  try {
    const parsed = new URL(normalizeBaseUrl(value || BEDROCK_DEFAULT_BASE_URL));
    return isBedrockMantleHost(parsed.hostname);
  } catch {
    return false;
  }
}

export function normalizeBedrockBaseUrl(value: string | null | undefined): string {
  const normalized = normalizeBaseUrl(value || BEDROCK_DEFAULT_BASE_URL);
  if (!normalized) return BEDROCK_DEFAULT_BASE_URL;

  const stripped = normalized.replace(/\/(?:chat\/completions|responses|models)$/i, "");

  try {
    const parsed = new URL(stripped);
    const pathname = stripTrailingSlashes(parsed.pathname);

    if (isBedrockMantleHost(parsed.hostname)) {
      if (!pathname || pathname === "/" || pathname === "/openai" || pathname === "/openai/v1") {
        parsed.pathname = "/v1";
      } else if (!pathname.endsWith("/v1")) {
        parsed.pathname = pathname;
      }
    } else if (isBedrockRuntimeHost(parsed.hostname)) {
      if (!pathname || pathname === "/" || pathname === "/openai" || pathname === "/v1") {
        parsed.pathname = "/openai/v1";
      } else if (!pathname.endsWith("/openai/v1")) {
        parsed.pathname = pathname;
      }
    } else if (pathname.endsWith("/openai")) {
      parsed.pathname = `${pathname}/v1`;
    } else if (!pathname) {
      parsed.pathname = "/v1";
    }

    parsed.search = "";
    parsed.hash = "";
    return stripTrailingSlashes(parsed.toString());
  } catch {
    if (stripped.endsWith("/openai")) {
      return `${stripped}/v1`;
    }
    return stripped;
  }
}

export function buildBedrockChatUrl(value: string | null | undefined): string {
  return `${normalizeBedrockBaseUrl(value)}/chat/completions`;
}

export function buildBedrockModelsUrl(value: string | null | undefined): string {
  return `${normalizeBedrockBaseUrl(value)}/models`;
}

export function getBedrockValidationModelId(value: string | null | undefined): string {
  return isBedrockRuntimeBaseUrl(value) ? "openai.gpt-oss-120b-1:0" : "openai.gpt-oss-120b";
}
