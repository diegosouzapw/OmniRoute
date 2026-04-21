import { DefaultExecutor } from "./default.ts";
import type { ExecuteInput } from "./base.ts";

type JsonRecord = Record<string, unknown>;

const DATAROBOT_LLMGW_PATH = "/genai/llmgw/chat/completions";

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function readString(data: JsonRecord | null | undefined, ...keys: string[]): string {
  for (const key of keys) {
    const value = data?.[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function normalizeBaseUrl(baseUrl: string | null | undefined): string {
  return typeof baseUrl === "string" ? baseUrl.trim().replace(/\/+$/, "") : "";
}

function ensureTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

export function getDataRobotBaseUrl(
  providerSpecificData: JsonRecord | null | undefined,
  fallbackBaseUrl = ""
): string {
  return (
    readString(
      providerSpecificData,
      "baseUrl",
      "endpoint",
      "apiBase",
      "deploymentBaseUrl",
      "deploymentPath"
    ) ||
    normalizeBaseUrl(process.env.DATAROBOT_ENDPOINT) ||
    normalizeBaseUrl(fallbackBaseUrl) ||
    "https://app.datarobot.com"
  );
}

export function buildDataRobotUrl(baseUrl: string): string {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";

  const url = new URL(normalized);
  let path = url.pathname || "/";

  if (!path || path === "/") {
    path = `/api/v2${DATAROBOT_LLMGW_PATH}`;
  } else if (path.includes("/api/v2/deployments")) {
    // Dedicated deployment path is already fully specified.
  } else if (path.includes("/api/v2") && !path.includes(DATAROBOT_LLMGW_PATH)) {
    path = `${path}${DATAROBOT_LLMGW_PATH}`;
  }

  path = path.replace(/\/{2,}/g, "/");
  url.pathname = ensureTrailingSlash(path);
  return url.toString();
}

export class DataRobotExecutor extends DefaultExecutor {
  constructor(provider = "datarobot") {
    super(provider);
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ExecuteInput["credentials"] | null = null
  ) {
    const providerSpecificData = asRecord(credentials?.providerSpecificData);
    const baseUrl = getDataRobotBaseUrl(providerSpecificData, this.config.baseUrl);
    return buildDataRobotUrl(baseUrl);
  }
}

export default DataRobotExecutor;
