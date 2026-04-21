import { DefaultExecutor } from "./default.ts";
import { applyConfiguredUserAgent, type ProviderCredentials } from "./base.ts";
import { getRotatingApiKey } from "../services/apiKeyRotator.ts";

function normalizeBaseUrl(baseUrl: string | undefined): string {
  return (baseUrl || "").trim().replace(/\/+$/, "");
}

export function getCodeBuddySecret(credentials: ProviderCredentials): string {
  const extraKeys = (credentials.providerSpecificData?.extraApiKeys as string[] | undefined) ?? [];
  const rotatedApiKey =
    extraKeys.length > 0 && credentials.connectionId && credentials.apiKey
      ? getRotatingApiKey(credentials.connectionId, credentials.apiKey, extraKeys)
      : credentials.apiKey;

  const secret =
    (typeof rotatedApiKey === "string" && rotatedApiKey.trim()) ||
    (typeof credentials.accessToken === "string" && credentials.accessToken.trim()) ||
    "";

  return secret;
}

export function getCodeBuddyBaseUrl(credentials?: ProviderCredentials | null): string {
  const providerBaseUrl =
    typeof credentials?.providerSpecificData?.baseUrl === "string"
      ? credentials.providerSpecificData.baseUrl
      : "";

  return normalizeBaseUrl(providerBaseUrl) || "https://api.codebuddy.ai/v2/chat/completions";
}

export function buildCodeBuddyUrl(credentials?: ProviderCredentials | null): string {
  const baseUrl = getCodeBuddyBaseUrl(credentials);
  if (!baseUrl) return "";

  if (
    baseUrl.endsWith("/chat/completions") ||
    baseUrl.endsWith("/responses") ||
    baseUrl.endsWith("/chat")
  ) {
    return baseUrl;
  }

  if (/\/v\d+$/.test(baseUrl)) {
    return `${baseUrl}/chat/completions`;
  }

  return `${baseUrl}/chat/completions`;
}

export function buildCodeBuddyHeaders(
  credentials: ProviderCredentials,
  stream = true,
  extraHeaders: Record<string, string> = {}
): Record<string, string> {
  const secret = getCodeBuddySecret(credentials);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extraHeaders,
    Accept: stream ? "text/event-stream" : "application/json",
  };

  if (secret) {
    // CodeBuddy accepts the same secret via both headers for model requests.
    headers["X-Api-Key"] = secret;
    headers["Authorization"] = `Bearer ${secret}`;
  }

  applyConfiguredUserAgent(headers, credentials.providerSpecificData);
  return headers;
}

export class CodeBuddyExecutor extends DefaultExecutor {
  constructor(provider = "codebuddy") {
    super(provider);
  }

  buildUrl(
    model: string,
    stream: boolean,
    urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    void model;
    void stream;
    void urlIndex;
    return buildCodeBuddyUrl(credentials);
  }

  buildHeaders(credentials: ProviderCredentials, stream = true) {
    return buildCodeBuddyHeaders(credentials, stream, this.config.headers || {});
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    void model;
    void stream;
    void credentials;
    return super.transformRequest(model, body, stream, credentials);
  }
}
