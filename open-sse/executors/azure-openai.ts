import { DefaultExecutor } from "./default.ts";
import type { ProviderCredentials } from "./base.ts";
import { stripTrailingSlashes } from "../utils/urlSanitize.ts";

const DEFAULT_API_VERSION = "2024-12-01-preview";
const GPT5_OR_REASONING_DEPLOYMENT = /(?:^|[/_-])(?:gpt-5|o(?:1|3|4))(?:[._-]|$)/i;

function normalizeAzureBaseUrl(rawBaseUrl?: string | null): string {
  const normalized = stripTrailingSlashes((rawBaseUrl || "").trim());
  if (!normalized) return "";

  return normalized
    .replace(/\/openai$/i, "")
    .replace(/\/openai\/deployments\/[^/]+\/chat\/completions[^/]*$/i, "");
}

export class AzureOpenAIExecutor extends DefaultExecutor {
  constructor() {
    super("azure-openai");
  }

  buildUrl(
    model: string,
    stream: boolean,
    urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    void urlIndex;

    const providerSpecificData = credentials?.providerSpecificData || {};
    const baseUrl = normalizeAzureBaseUrl(providerSpecificData.baseUrl || this.config.baseUrl);
    const apiVersion =
      typeof providerSpecificData.apiVersion === "string" && providerSpecificData.apiVersion.trim()
        ? providerSpecificData.apiVersion.trim()
        : DEFAULT_API_VERSION;
    return `${baseUrl}/openai/deployments/${encodeURIComponent(model)}/chat/completions?api-version=${encodeURIComponent(apiVersion)}`;
  }

  buildHeaders(credentials: ProviderCredentials | null, stream = true) {
    const apiKey = credentials?.apiKey || credentials?.accessToken || "";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "api-key": apiKey,
    };

    headers.Accept = stream ? "text/event-stream" : "application/json";
    return headers;
  }

  override transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const transformed = super.transformRequest(model, body, stream, credentials);
    if (!GPT5_OR_REASONING_DEPLOYMENT.test(model)) return transformed;
    if (!transformed || typeof transformed !== "object" || Array.isArray(transformed)) {
      return transformed;
    }

    const original =
      body && typeof body === "object" && !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : null;
    const normalized = { ...(transformed as Record<string, unknown>) };

    if (original?.max_completion_tokens !== undefined) {
      normalized.max_completion_tokens = original.max_completion_tokens;
    } else if (
      normalized.max_completion_tokens === undefined &&
      original?.max_tokens !== undefined
    ) {
      normalized.max_completion_tokens = original.max_tokens;
    }
    delete normalized.max_tokens;

    if (normalized.temperature !== undefined && normalized.temperature !== 1) {
      delete normalized.temperature;
    }

    const hasTools = Array.isArray(normalized.tools) && normalized.tools.length > 0;
    if (hasTools || normalized.reasoning_effort === "none") {
      delete normalized.reasoning_effort;
    }

    return normalized;
  }
}
