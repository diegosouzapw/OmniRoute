import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

const DATAROBOT_API_V2_SEGMENT = "/api/v2";
const DATAROBOT_LLMGW_CHAT_PATH = "/genai/llmgw/chat/completions/";
const DATAROBOT_LLMGW_CATALOG_PATH = "/genai/llmgw/catalog/";

export const DATAROBOT_DEFAULT_BASE_URL = "https://app.datarobot.com";

function normalizeBaseUrl(value: string | null | undefined): string {
  return stripTrailingSlashes((value || "").trim());
}

export function normalizeDataRobotBaseUrl(value: string | null | undefined): string {
  const normalized = normalizeBaseUrl(value || DATAROBOT_DEFAULT_BASE_URL);
  return normalized || DATAROBOT_DEFAULT_BASE_URL;
}

export function isDataRobotDeploymentUrl(value: string | null | undefined): boolean {
  const normalized = normalizeDataRobotBaseUrl(value);
  return /\/api\/v2\/deployments\/[^/]+(?:\/chat\/completions)?$/i.test(normalized);
}

export function buildDataRobotChatUrl(value: string | null | undefined): string {
  const normalized = normalizeDataRobotBaseUrl(value);

  if (normalized.endsWith("/chat/completions")) {
    return normalized;
  }

  if (/\/api\/v2\/deployments\/[^/]+$/i.test(normalized)) {
    return `${normalized}/chat/completions`;
  }

  if (/\/api\/v2\/genai\/llmgw$/i.test(normalized)) {
    return `${normalized}/chat/completions/`;
  }

  if (/\/api\/v2\/genai\/llmgw\/chat$/i.test(normalized)) {
    return `${normalized}/completions/`;
  }

  if (normalized.includes(DATAROBOT_API_V2_SEGMENT)) {
    return `${normalized}${DATAROBOT_LLMGW_CHAT_PATH}`;
  }

  return `${normalized}${DATAROBOT_API_V2_SEGMENT}${DATAROBOT_LLMGW_CHAT_PATH}`;
}

export function buildDataRobotCatalogUrl(value: string | null | undefined): string | null {
  const normalized = normalizeDataRobotBaseUrl(value);

  if (isDataRobotDeploymentUrl(normalized)) {
    return null;
  }

  const parsed = new URL(normalized);
  let basePath = stripTrailingSlashes(parsed.pathname);

  if (/\/api\/v2\/genai\/llmgw\/chat\/completions$/i.test(basePath)) {
    basePath = basePath.replace(/\/chat\/completions$/i, "");
  } else if (/\/api\/v2\/genai\/llmgw$/i.test(basePath)) {
    // Keep path as-is.
  } else if (basePath.includes(DATAROBOT_API_V2_SEGMENT)) {
    basePath = basePath.replace(/\/api\/v2.*$/i, "");
  }

  const catalogPath = `${basePath}${DATAROBOT_LLMGW_CATALOG_PATH}`.replace(/\/{2,}/g, "/");
  parsed.pathname = catalogPath;
  parsed.search = "";
  parsed.hash = "";

  return parsed.toString();
}
