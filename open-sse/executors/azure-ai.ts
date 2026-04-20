import { DefaultExecutor } from "./default.ts";
import type { ExecuteInput } from "./base.ts";

export const AZURE_AI_DEFAULT_API_VERSION = "2024-05-01-preview";

function normalizeBaseUrl(baseUrl: string | null | undefined): string {
  return typeof baseUrl === "string" ? baseUrl.trim().replace(/\/+$/, "") : "";
}

function readString(data: Record<string, unknown> | null | undefined, ...keys: string[]): string {
  for (const key of keys) {
    const value = data?.[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

export function getAzureAiBaseUrl(
  providerSpecificData: Record<string, unknown> | null | undefined,
  fallbackBaseUrl = ""
): string {
  return (
    readString(providerSpecificData, "baseUrl", "apiBase", "endpoint") ||
    normalizeBaseUrl(process.env.AZURE_AI_API_BASE) ||
    normalizeBaseUrl(fallbackBaseUrl)
  );
}

export function getAzureAiApiVersion(
  providerSpecificData: Record<string, unknown> | null | undefined
): string {
  return (
    readString(providerSpecificData, "apiVersion", "api_version", "azureApiVersion") ||
    process.env.AZURE_API_VERSION ||
    AZURE_AI_DEFAULT_API_VERSION
  );
}

export function usesAzureApiKeyHeader(baseUrl: string | null | undefined): boolean {
  if (!baseUrl) return false;

  try {
    const hostname = new URL(baseUrl).hostname.toLowerCase();
    return (
      hostname.endsWith(".models.ai.azure.com") ||
      hostname.endsWith(".services.ai.azure.com") ||
      hostname.endsWith(".openai.azure.com")
    );
  } catch {
    return false;
  }
}

export function buildAzureAiUrl(
  baseUrl: string,
  apiVersion = AZURE_AI_DEFAULT_API_VERSION
): string {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";

  const url = new URL(normalized);
  const pathname = url.pathname.replace(/\/+$/, "");
  if (!pathname.endsWith("/chat/completions") && !pathname.endsWith("/models/chat/completions")) {
    const azureFoundryHost =
      url.hostname.endsWith(".models.ai.azure.com") ||
      url.hostname.endsWith(".services.ai.azure.com");
    url.pathname = `${pathname}${azureFoundryHost ? "/models/chat/completions" : "/chat/completions"}`;
  }
  if (apiVersion && !url.searchParams.has("api-version")) {
    url.searchParams.set("api-version", apiVersion);
  }
  return url.toString();
}

export function buildAzureAiHeaders({
  apiKey,
  accessToken,
  baseUrl,
  stream = true,
  model,
}: {
  apiKey?: string | null;
  accessToken?: string | null;
  baseUrl?: string | null;
  stream?: boolean;
  model?: string | null;
}): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: stream ? "text/event-stream" : "application/json",
  };

  if (apiKey) {
    if (usesAzureApiKeyHeader(baseUrl)) {
      headers["api-key"] = apiKey;
    } else {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }
  } else if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  if (typeof model === "string" && model.toLowerCase().includes("claude")) {
    headers["anthropic-version"] = "2023-06-01";
  }

  return headers;
}

export class AzureAIExecutor extends DefaultExecutor {
  constructor(provider = "azure-ai") {
    super(provider);
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ExecuteInput["credentials"] | null = null
  ): string {
    const providerSpecificData = credentials?.providerSpecificData || null;
    const baseUrl = getAzureAiBaseUrl(
      providerSpecificData as Record<string, unknown> | null,
      this.config.baseUrl
    );
    return buildAzureAiUrl(
      baseUrl,
      getAzureAiApiVersion(providerSpecificData as Record<string, unknown> | null)
    );
  }

  buildHeaders(credentials: ExecuteInput["credentials"], stream = true): Record<string, string> {
    const providerSpecificData = credentials?.providerSpecificData || null;
    const baseUrl = getAzureAiBaseUrl(
      providerSpecificData as Record<string, unknown> | null,
      this.config.baseUrl
    );
    const activeModel =
      typeof providerSpecificData?._azureAiActiveModel === "string"
        ? providerSpecificData._azureAiActiveModel
        : null;

    return buildAzureAiHeaders({
      apiKey: credentials?.apiKey || null,
      accessToken: credentials?.accessToken || null,
      baseUrl,
      stream,
      model: activeModel,
    });
  }

  async execute(input: ExecuteInput) {
    const providerSpecificData = {
      ...(input.credentials?.providerSpecificData || {}),
      _azureAiActiveModel: input.model,
    };

    return super.execute({
      ...input,
      credentials: {
        ...input.credentials,
        providerSpecificData,
      },
    });
  }
}

export default AzureAIExecutor;
