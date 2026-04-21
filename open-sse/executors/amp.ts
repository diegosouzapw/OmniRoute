import { DefaultExecutor } from "./default.ts";
import { applyConfiguredUserAgent, type ProviderCredentials } from "./base.ts";

export const AMP_DEFAULT_BASE_URL = "https://api.ampcode.com/v1";

function normalizeBaseUrl(baseUrl: string | undefined): string {
  return (baseUrl || "").trim().replace(/\/+$/, "");
}

export function getAmpBaseUrl(credentials?: ProviderCredentials | null): string {
  const configuredBaseUrl =
    typeof credentials?.providerSpecificData?.baseUrl === "string"
      ? credentials.providerSpecificData.baseUrl
      : AMP_DEFAULT_BASE_URL;
  const normalized = normalizeBaseUrl(configuredBaseUrl) || AMP_DEFAULT_BASE_URL;

  try {
    const url = new URL(normalized);
    const hostname = url.hostname.toLowerCase();
    if (hostname === "ampcode.com" || hostname === "www.ampcode.com") {
      url.hostname = "api.ampcode.com";
    }

    const path = url.pathname.replace(/\/+$/, "");
    if (
      path.endsWith("/chat/completions") ||
      path.endsWith("/responses") ||
      path.endsWith("/chat")
    ) {
      url.pathname = path.replace(/\/(chat\/completions|responses|chat)$/, "") || "/v1";
    } else if (!path || path === "/") {
      url.pathname = "/v1";
    } else {
      url.pathname = path;
    }

    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/+$/, "");
  } catch {
    return normalized || AMP_DEFAULT_BASE_URL;
  }
}

export function buildAmpChatUrl(credentials?: ProviderCredentials | null): string {
  return `${getAmpBaseUrl(credentials)}/chat/completions`;
}

export function buildAmpHeaders(
  credentials: ProviderCredentials,
  stream = true,
  extraHeaders: Record<string, string> = {}
): Record<string, string> {
  const secret =
    (typeof credentials.apiKey === "string" && credentials.apiKey.trim()) ||
    (typeof credentials.accessToken === "string" && credentials.accessToken.trim()) ||
    "";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extraHeaders,
    Accept: stream ? "text/event-stream" : "application/json",
  };

  if (secret) {
    headers.Authorization = `Bearer ${secret}`;
  }

  applyConfiguredUserAgent(headers, credentials.providerSpecificData);
  return headers;
}

export class AmpExecutor extends DefaultExecutor {
  constructor(provider = "amp") {
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
    return buildAmpChatUrl(credentials);
  }

  buildHeaders(credentials: ProviderCredentials, stream = true) {
    return buildAmpHeaders(credentials, stream, this.config.headers || {});
  }
}
