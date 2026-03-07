import { HTTP_STATUS, FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { applyFingerprint, isCliCompatEnabled } from "../config/cliFingerprints.ts";

type JsonRecord = Record<string, unknown>;

export type ProviderConfig = {
  id?: string;
  baseUrl?: string;
  baseUrls?: string[];
  responsesBaseUrl?: string;
  chatPath?: string;
  clientVersion?: string;
  clientId?: string;
  clientSecret?: string;
  tokenUrl?: string;
  refreshUrl?: string;
  authUrl?: string;
  headers?: Record<string, string>;
};

export type ProviderCredentials = {
  accessToken?: string;
  refreshToken?: string;
  apiKey?: string;
  expiresAt?: string;
  providerSpecificData?: JsonRecord;
};

export type ExecutorLog = {
  debug?: (tag: string, message: string) => void;
  info?: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
  error?: (tag: string, message: string) => void;
};

export type ExecuteInput = {
  model: string;
  body: unknown;
  stream: boolean;
  credentials: ProviderCredentials;
  signal?: AbortSignal | null;
  log?: ExecutorLog | null;
};

function mergeAbortSignals(primary: AbortSignal, secondary: AbortSignal): AbortSignal {
  const controller = new AbortController();

  const abortBoth = () => {
    if (!controller.signal.aborted) {
      controller.abort();
    }
  };

  if (primary.aborted || secondary.aborted) {
    abortBoth();
    return controller.signal;
  }

  primary.addEventListener("abort", abortBoth, { once: true });
  secondary.addEventListener("abort", abortBoth, { once: true });
  return controller.signal;
}

/**
 * BaseExecutor - Base class for provider executors.
 * Implements the Strategy pattern: subclasses override specific methods
 * (buildUrl, buildHeaders, transformRequest, etc.) for each provider.
 */
export class BaseExecutor {
  provider: string;
  config: ProviderConfig;

  constructor(provider: string, config: ProviderConfig) {
    this.provider = provider;
    this.config = config;
  }

  getProvider() {
    return this.provider;
  }

  getBaseUrls() {
    return this.config.baseUrls || (this.config.baseUrl ? [this.config.baseUrl] : []);
  }

  getFallbackCount() {
    return this.getBaseUrls().length || 1;
  }

  buildUrl(
    model: string,
    stream: boolean,
    urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    void model;
    void stream;
    if (this.provider?.startsWith?.("openai-compatible-")) {
      const baseUrl =
        typeof credentials?.providerSpecificData?.baseUrl === "string"
          ? credentials.providerSpecificData.baseUrl
          : "https://api.openai.com/v1";
      const normalized = baseUrl.replace(/\/$/, "");
      const path = this.provider.includes("responses") ? "/responses" : "/chat/completions";
      return `${normalized}${path}`;
    }
    const baseUrls = this.getBaseUrls();
    return baseUrls[urlIndex] || baseUrls[0] || this.config.baseUrl;
  }

  buildHeaders(credentials: ProviderCredentials, stream = true): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...this.config.headers,
    };

    // Allow per-provider User-Agent override via environment variable.
    // Example: CLAUDE_USER_AGENT="my-agent/2.0" overrides the default for the Claude provider.
    const providerId = this.config?.id || this.provider;
    if (providerId) {
      const envKey = `${providerId.toUpperCase().replace(/[^A-Z0-9]/g, "_")}_USER_AGENT`;
      const envUA = process.env[envKey]?.trim();
      if (envUA) {
        // Override both common casing variants
        headers["User-Agent"] = envUA;
        if (headers["user-agent"]) headers["user-agent"] = envUA;
      }
    }

    if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    } else if (credentials.apiKey) {
      headers["Authorization"] = `Bearer ${credentials.apiKey}`;
    }

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  // Override in subclass for provider-specific transformations
  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    void model;
    void stream;
    void credentials;
    return body;
  }

  shouldRetry(status: number, urlIndex: number) {
    return status === HTTP_STATUS.RATE_LIMITED && urlIndex + 1 < this.getFallbackCount();
  }

  // Override in subclass for provider-specific refresh
  async refreshCredentials(credentials: ProviderCredentials, log: ExecutorLog | null) {
    void credentials;
    void log;
    return null;
  }

  needsRefresh(credentials: ProviderCredentials) {
    if (!credentials.expiresAt) return false;
    const expiresAtMs = new Date(credentials.expiresAt).getTime();
    return expiresAtMs - Date.now() < 5 * 60 * 1000;
  }

  parseError(response: Response, bodyText: string) {
    return { status: response.status, message: bodyText || `HTTP ${response.status}` };
  }

  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
    const fallbackCount = this.getFallbackCount();
    let lastError: unknown = null;
    let lastStatus = 0;

    for (let urlIndex = 0; urlIndex < fallbackCount; urlIndex++) {
      const url = this.buildUrl(model, stream, urlIndex, credentials);
      const headers = this.buildHeaders(credentials, stream);
      const transformedBody = this.transformRequest(model, body, stream, credentials);

      try {
        // For non-streaming requests, apply a fetch timeout to prevent stalled connections.
        // Streaming requests skip the timeout — they use stream idle detection instead.
        const timeoutSignal = !stream ? AbortSignal.timeout(FETCH_TIMEOUT_MS) : null;
        const combinedSignal =
          signal && timeoutSignal
            ? mergeAbortSignals(signal, timeoutSignal)
            : signal || timeoutSignal;

        // Apply CLI fingerprint ordering if enabled for this provider
        let finalHeaders = headers;
        let bodyString = JSON.stringify(transformedBody);

        if (isCliCompatEnabled(this.provider)) {
          const fingerprinted = applyFingerprint(this.provider, headers, transformedBody);
          finalHeaders = fingerprinted.headers;
          bodyString = fingerprinted.bodyString;
        }

        const fetchOptions: RequestInit = {
          method: "POST",
          headers: finalHeaders,
          body: bodyString,
        };
        if (combinedSignal) fetchOptions.signal = combinedSignal;

        const response = await fetch(url, fetchOptions);

        if (this.shouldRetry(response.status, urlIndex)) {
          log?.debug?.("RETRY", `${response.status} on ${url}, trying fallback ${urlIndex + 1}`);
          lastStatus = response.status;
          continue;
        }

        return { response, url, headers, transformedBody };
      } catch (error) {
        // Distinguish timeout errors from other abort errors
        const err = error instanceof Error ? error : new Error(String(error));
        if (err.name === "TimeoutError") {
          log?.warn?.("TIMEOUT", `Fetch timeout after ${FETCH_TIMEOUT_MS}ms on ${url}`);
        }
        lastError = err;
        if (urlIndex + 1 < fallbackCount) {
          log?.debug?.("RETRY", `Error on ${url}, trying fallback ${urlIndex + 1}`);
          continue;
        }
        throw err;
      }
    }

    throw lastError || new Error(`All ${fallbackCount} URLs failed with status ${lastStatus}`);
  }
}

export default BaseExecutor;
