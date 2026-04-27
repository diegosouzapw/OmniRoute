import { DefaultExecutor } from "./default.ts";

const DEFAULT_API_VERSION = "2024-12-01-preview";

function normalizeAzureBaseUrl(rawBaseUrl?: string | null): string {
  const normalized = (rawBaseUrl || "").trim().replace(/\/+$/, "");
  if (!normalized) return "";

  return normalized
    .replace(/\/openai$/i, "")
    .replace(/\/openai\/deployments\/[^/]+\/chat\/completions.*$/i, "");
}

export class AzureOpenAIExecutor extends DefaultExecutor {
  constructor() {
    super("azure-openai");
  }

  buildUrl(model: string, stream: boolean, urlIndex = 0, credentials: any = null) {
    void urlIndex;

    const providerSpecificData = credentials?.providerSpecificData || {};
    const baseUrl = normalizeAzureBaseUrl(providerSpecificData.baseUrl || this.config.baseUrl);
    const apiVersion =
      typeof providerSpecificData.apiVersion === "string" && providerSpecificData.apiVersion.trim()
        ? providerSpecificData.apiVersion.trim()
        : DEFAULT_API_VERSION;
    return `${baseUrl}/openai/deployments/${encodeURIComponent(model)}/chat/completions?api-version=${encodeURIComponent(apiVersion)}`;
  }

  buildHeaders(credentials: any, stream = true) {
    const apiKey = credentials?.apiKey || credentials?.accessToken || "";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "api-key": apiKey,
    };

    headers.Accept = stream ? "text/event-stream" : "application/json";
    return headers;
  }
}
