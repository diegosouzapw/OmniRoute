import { HTTP_STATUS, FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { applyFingerprint, isCliCompatEnabled } from "../config/cliFingerprints.ts";
import { getRotatingApiKey } from "../services/apiKeyRotator.ts";
import { getOpenAICompatibleType, isClaudeCodeCompatible } from "../services/provider.ts";
import type { ProviderRequestDefaults } from "../services/providerRequestDefaults.ts";
import { signRequestBody } from "../services/claudeCodeCCH.ts";
import {
  appendAnthropicBetaHeader,
  CONTEXT_1M_BETA_HEADER,
  modelSupportsContext1mBeta,
} from "../services/claudeCodeCompatible.ts";
import { getClaudeCodeCompatibleRequestDefaults } from "@/lib/providers/requestDefaults";
import { supportsXHighEffort } from "../config/providerModels.ts";
import { remapToolNamesInRequest } from "../services/claudeCodeToolRemapper.ts";
import { obfuscateInBody } from "../services/claudeCodeObfuscation.ts";
import {
  computeFingerprint,
  extractFirstUserMessageText,
} from "../services/claudeCodeFingerprint.ts";
import { randomUUID } from "node:crypto";
import { createHash } from "node:crypto";

/**
 * Sanitizes a custom API path to prevent path traversal attacks.
 * Valid paths must start with '/', contain no '..' segments,
 * no null bytes, and be reasonable in length.
 */
function sanitizePath(path: string): boolean {
  if (typeof path !== "string") return false;
  if (!path.startsWith("/")) return false;
  if (path.includes("\0")) return false; // null byte
  if (path.includes("..")) return false; // path traversal
  if (path.length > 512) return false; // sanity limit
  return true;
}

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
  requestDefaults?: ProviderRequestDefaults;
  timeoutMs?: number;
  format?: string;
};

export type ProviderCredentials = {
  accessToken?: string;
  refreshToken?: string;
  apiKey?: string;
  expiresAt?: string;
  connectionId?: string; // T07: used for API key rotation index
  providerSpecificData?: JsonRecord;
  requestEndpointPath?: string;
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
  extendedContext?: boolean;
  /** Merged after auth + CLI fingerprint headers (values override same-named defaults). */
  upstreamExtraHeaders?: Record<string, string> | null;
  /** Original client request headers (read-only). Executors may forward select headers upstream. */
  clientHeaders?: Record<string, string> | null;
  /** Callback to persist tokens that are proactively refreshed during execution. */
  onCredentialsRefreshed?: (newCredentials: ProviderCredentials) => Promise<void> | void;
};

export type CountTokensInput = {
  body: Record<string, unknown>;
  credentials: ProviderCredentials;
  log?: ExecutorLog | null;
  model: string;
  signal?: AbortSignal | null;
};

/** Apply model-level extra upstream headers (e.g. Authentication, X-Custom-Auth). */
export function mergeUpstreamExtraHeaders(
  headers: Record<string, string>,
  extra?: Record<string, string> | null
): void {
  if (!extra) return;
  for (const [k, v] of Object.entries(extra)) {
    if (typeof k === "string" && k.length > 0 && typeof v === "string") {
      if (k.toLowerCase() === "user-agent") {
        setUserAgentHeader(headers, v);
        continue;
      }
      headers[k] = v;
    }
  }
}

export function getCustomUserAgent(providerSpecificData?: JsonRecord | null): string | null {
  const customUserAgent =
    typeof providerSpecificData?.customUserAgent === "string"
      ? providerSpecificData.customUserAgent.trim()
      : "";
  return customUserAgent || null;
}

export function setUserAgentHeader(headers: Record<string, string>, userAgent: string): void {
  headers["User-Agent"] = userAgent;
  if ("user-agent" in headers) {
    headers["user-agent"] = userAgent;
  }
}

export function applyConfiguredUserAgent(
  headers: Record<string, string>,
  providerSpecificData?: JsonRecord | null
): void {
  const customUserAgent = getCustomUserAgent(providerSpecificData);
  if (customUserAgent) {
    setUserAgentHeader(headers, customUserAgent);
  }
}

export function mergeAbortSignals(primary: AbortSignal, secondary: AbortSignal): AbortSignal {
  const controller = new AbortController();

  const abortFrom = (source: AbortSignal) => {
    if (!controller.signal.aborted) {
      controller.abort(source.reason);
    }
  };

  if (primary.aborted) {
    abortFrom(primary);
    return controller.signal;
  }
  if (secondary.aborted) {
    abortFrom(secondary);
    return controller.signal;
  }

  primary.addEventListener("abort", () => abortFrom(primary), { once: true });
  secondary.addEventListener("abort", () => abortFrom(secondary), { once: true });
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

  getTimeoutMs() {
    const configured = this.config?.timeoutMs;
    if (typeof configured !== "number" || !Number.isFinite(configured)) {
      return FETCH_TIMEOUT_MS;
    }
    return Math.max(1, Math.floor(configured));
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
      const psd = credentials?.providerSpecificData;
      const baseUrl = typeof psd?.baseUrl === "string" ? psd.baseUrl : "https://api.openai.com/v1";
      const normalized = baseUrl.replace(/\/$/, "");
      // Sanitize custom path: must start with '/', no path traversal, no null bytes
      const rawPath = typeof psd?.chatPath === "string" && psd.chatPath ? psd.chatPath : null;
      const customPath = rawPath && sanitizePath(rawPath) ? rawPath : null;
      if (customPath) return `${normalized}${customPath}`;
      const path =
        getOpenAICompatibleType(this.provider, psd) === "responses"
          ? "/responses"
          : "/chat/completions";
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
        setUserAgentHeader(headers, envUA);
      }
    }

    if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    } else if (credentials.apiKey) {
      // T07: rotate between primary + extra API keys when extraApiKeys is configured
      const extraKeys =
        (credentials.providerSpecificData?.extraApiKeys as string[] | undefined) ?? [];
      const effectiveKey =
        extraKeys.length > 0 && credentials.connectionId
          ? getRotatingApiKey(credentials.connectionId, credentials.apiKey, extraKeys)
          : credentials.apiKey;
      headers["Authorization"] = `Bearer ${effectiveKey}`;
    }

    headers["Accept"] = stream ? "text/event-stream" : "application/json";

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

  // Intra-URL retry config: retry same URL before falling back to next node
  static readonly RETRY_CONFIG = { maxAttempts: 2, delayMs: 2000 };
  // Timeout for receiving the initial upstream response headers. Once the response
  // starts streaming, STREAM_IDLE_TIMEOUT_MS / Undici bodyTimeout handle stalls.
  static FETCH_START_TIMEOUT_MS = FETCH_TIMEOUT_MS;

  // Override in subclass for provider-specific refresh
  async refreshCredentials(credentials: ProviderCredentials, log: ExecutorLog | null) {
    void credentials;
    void log;
    return null;
  }

  needsRefresh(credentials?: ProviderCredentials | null) {
    if (!credentials?.expiresAt) return false;
    const expiresAtMs = new Date(credentials.expiresAt).getTime();
    return expiresAtMs - Date.now() < 5 * 60 * 1000;
  }

  parseError(response: Response, bodyText: string) {
    return { status: response.status, message: bodyText || `HTTP ${response.status}` };
  }

  buildCountTokensUrl(model: string, credentials: ProviderCredentials | null = null) {
    void model;
    void credentials;
    const baseUrl = this.buildUrl(model, false, 0, credentials);
    if (typeof baseUrl !== "string" || baseUrl.length === 0) return null;
    if (this.config?.format !== "claude" || !baseUrl.includes("/messages")) return null;

    const [path, query = ""] = baseUrl.split("?");
    const normalizedPath = path.endsWith("/messages")
      ? `${path}/count_tokens`
      : `${path}/count_tokens`;
    return query ? `${normalizedPath}?${query}` : normalizedPath;
  }

  async countTokens({ model, body, credentials, signal, log }: CountTokensInput) {
    const url = this.buildCountTokensUrl(model, credentials);
    if (!url) return null;

    const headers = this.buildHeaders(credentials, false);
    const requestBody =
      body && typeof body === "object"
        ? {
            ...body,
            model,
          }
        : { model };

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let activeSignal = signal || null;
    let controller: AbortController | null = null;
    const timeoutMs = this.getTimeoutMs();

    if (!activeSignal) {
      controller = new AbortController();
      timeoutId = setTimeout(() => controller?.abort(), timeoutMs);
      activeSignal = controller.signal;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
        signal: activeSignal || undefined,
      });

      const text = await response.text();
      if (!response.ok) {
        const parsedError = this.parseError(response, text);
        throw new Error(parsedError.message);
      }

      const parsed = text ? JSON.parse(text) : {};
      const inputTokens = Number(parsed?.input_tokens);
      if (!Number.isFinite(inputTokens)) {
        throw new Error("Provider count_tokens response missing input_tokens");
      }

      return { input_tokens: inputTokens, provider: this.provider, source: "provider" };
    } catch (error) {
      log?.debug?.(
        "COUNT_TOKENS",
        `${this.provider}/${model} real count unavailable: ${error instanceof Error ? error.message : String(error)}`
      );
      return null;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    extendedContext,
    upstreamExtraHeaders,
    clientHeaders,
  }: ExecuteInput) {
    const fallbackCount = this.getFallbackCount();
    let lastError: unknown = null;
    let lastStatus = 0;
    let activeCredentials = credentials;
    // Track per-URL intra-retry attempts to avoid infinite loops
    const retryAttemptsByUrl: Record<number, number> = {};

    if (this.needsRefresh(credentials)) {
      try {
        const refreshed = await this.refreshCredentials(credentials, log || null);
        if (refreshed) {
          activeCredentials = {
            ...credentials,
            ...refreshed,
          };
          // Persist the proactively refreshed credentials to prevent consuming rotating tokens
          // without updating the central database connection.
          if (arguments[0].onCredentialsRefreshed) {
            await arguments[0].onCredentialsRefreshed(refreshed);
          }
        }
      } catch (error) {
        log?.warn?.(
          "TOKEN",
          `Credential refresh failed for ${this.provider}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    for (let urlIndex = 0; urlIndex < fallbackCount; urlIndex++) {
      const url = this.buildUrl(model, stream, urlIndex, activeCredentials);
      const headers = this.buildHeaders(activeCredentials, stream);
      applyConfiguredUserAgent(headers, activeCredentials?.providerSpecificData);

      const ccRequestDefaults = isClaudeCodeCompatible(this.provider)
        ? getClaudeCodeCompatibleRequestDefaults(activeCredentials?.providerSpecificData)
        : {};
      const shouldForwardExtendedContext =
        extendedContext &&
        modelSupportsContext1mBeta(model) &&
        !isClaudeCodeCompatible(this.provider);
      const shouldForwardCcCompatibleContext1m =
        isClaudeCodeCompatible(this.provider) && ccRequestDefaults.context1m === true;
      if (shouldForwardExtendedContext || shouldForwardCcCompatibleContext1m) {
        appendAnthropicBetaHeader(headers, CONTEXT_1M_BETA_HEADER);
      }

      const transformedBody = await this.transformRequest(model, body, stream, activeCredentials);

      try {
        // Only enforce the timeout while waiting for the initial fetch() response.
        // Once headers arrive, active streams must not be cut off by total elapsed time;
        // post-start stalls are handled separately by STREAM_IDLE_TIMEOUT_MS / bodyTimeout.
        const fetchStartTimeoutMs = this.getTimeoutMs();
        const timeoutController = fetchStartTimeoutMs > 0 ? new AbortController() : null;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        if (timeoutController) {
          timeoutId = setTimeout(() => {
            const timeoutError = new Error(
              `Fetch timeout after ${fetchStartTimeoutMs}ms on ${url}`
            );
            timeoutError.name = "TimeoutError";
            timeoutController.abort(timeoutError);
          }, fetchStartTimeoutMs);
        }
        const timeoutSignal = timeoutController?.signal ?? null;
        const combinedSignal =
          signal && timeoutSignal
            ? mergeAbortSignals(signal, timeoutSignal)
            : signal || timeoutSignal;

        const isClaudeCodeClient =
          clientHeaders?.["x-app"] === "cli" ||
          (clientHeaders?.["user-agent"] &&
            clientHeaders["user-agent"].toLowerCase().includes("claude-code")) ||
          (clientHeaders?.["user-agent"] &&
            clientHeaders["user-agent"].toLowerCase().includes("claude-cli"));

        if (
          this.provider === "claude" &&
          isClaudeCodeClient &&
          typeof transformedBody === "object" &&
          transformedBody !== null
        ) {
          const tb = transformedBody as Record<string, unknown>;
          remapToolNamesInRequest(tb);
          obfuscateInBody(tb);

          const ccVersion = "2.1.114";
          const messages = tb.messages as Array<{ role?: string; content?: unknown }> | undefined;
          const msgText = extractFirstUserMessageText(messages);
          const fp = computeFingerprint(msgText, ccVersion);
          const billingLine = `x-anthropic-billing-header: cc_version=${ccVersion}.${fp}; cc_entrypoint=cli; cch=00000;`;

          if (Array.isArray(tb.system)) {
            const sysBlocks = tb.system as Array<Record<string, unknown>>;
            const firstSystemCacheControl =
              sysBlocks[0] &&
              typeof sysBlocks[0] === "object" &&
              !Array.isArray(sysBlocks[0]) &&
              sysBlocks[0].cache_control
                ? sysBlocks[0].cache_control
                : undefined;
            const billingBlock: Record<string, unknown> = { type: "text", text: billingLine };
            if (firstSystemCacheControl) {
              billingBlock.cache_control = firstSystemCacheControl;
            }
            sysBlocks.unshift(billingBlock);
          } else if (typeof tb.system === "string") {
            tb.system = [
              { type: "text", text: billingLine },
              { type: "text", text: tb.system },
            ];
          } else {
            tb.system = [{ type: "text", text: billingLine }];
          }

          if (!tb.metadata || typeof tb.metadata !== "object") {
            tb.metadata = {
              user_id: JSON.stringify({
                device_id: createHash("sha256").update("omniroute").digest("hex").slice(0, 24),
                account_uuid: "",
                session_id: randomUUID(),
              }),
            };
          }

          const supportsAdaptiveThinking = supportsXHighEffort("claude", model);

          if (supportsAdaptiveThinking && !tb.thinking) {
            tb.thinking = { type: "adaptive" };
          }

          if (supportsAdaptiveThinking && !tb.context_management) {
            tb.context_management = {
              edits: [{ type: "clear_thinking_20251015", keep: "all" }],
            };
          }

          if (supportsAdaptiveThinking && !tb.output_config) {
            tb.output_config = { effort: "high" };
          }

          const ccHeaders: Record<string, string> = {
            "anthropic-version": "2023-06-01",
            "anthropic-beta":
              "claude-code-20250219,oauth-2025-04-20,interleaved-thinking-2025-05-14,redact-thinking-2026-02-12,context-management-2025-06-27,prompt-caching-scope-2026-01-05,advisor-tool-2026-03-01,advanced-tool-use-2025-11-20,effort-2025-11-24",
            "anthropic-dangerous-direct-browser-access": "true",
            "x-app": "cli",
            "User-Agent": `claude-cli/${ccVersion} (external, cli)`,
            "X-Stainless-Package-Version": "0.81.0",
            "X-Stainless-Timeout": "600",
            "accept-language": "*",
            "accept-encoding": "gzip, deflate, br, zstd",
            connection: "keep-alive",
            "x-client-request-id": randomUUID(),
            "X-Claude-Code-Session-Id": randomUUID(),
          };
          // Remove any existing case variants of ccHeaders keys before merging.
          // The claude provider config sets "Anthropic-Version" (Title-Case) while
          // ccHeaders uses all-lowercase keys.  Both JS keys normalise to the same
          // HTTP header name, so undici would combine them into "2023-06-01, 2023-06-01"
          // causing a 400 from Anthropic (see issue #1454).
          const ccKeysLower = new Set(Object.keys(ccHeaders).map((k) => k.toLowerCase()));
          for (const key of Object.keys(headers)) {
            if (ccKeysLower.has(key.toLowerCase())) {
              delete headers[key];
            }
          }
          Object.assign(headers, ccHeaders);
          delete headers["X-Stainless-Helper-Method"];

          // Add X-Stainless headers to match real Claude Code
          headers["X-Stainless-Arch"] = "x64";
          headers["X-Stainless-Lang"] = "js";
          headers["X-Stainless-OS"] = "Windows";
          headers["X-Stainless-Runtime"] = "node";
          headers["X-Stainless-Runtime-Version"] = "v24.3.0";
          headers["X-Stainless-Retry-Count"] = "0";
          delete headers["X-Stainless-Os"];

          console.log(
            `[CLAUDE-PATCH] provider=${this.provider} tools remapped, billing header injected, body fields added, headers patched`
          );
        }

        // Apply CLI fingerprint ordering if enabled for this provider
        let finalHeaders = headers;
        let bodyString = JSON.stringify(transformedBody);

        if (isCliCompatEnabled(this.provider)) {
          const fingerprinted = applyFingerprint(this.provider, headers, transformedBody);
          finalHeaders = fingerprinted.headers;
          bodyString = fingerprinted.bodyString;
        }

        // CCH signing: Claude Code-compatible providers AND native claude provider
        // require an xxHash64 integrity token over the serialized body.
        if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
          bodyString = await signRequestBody(bodyString);
        }

        mergeUpstreamExtraHeaders(finalHeaders, upstreamExtraHeaders);

        const fetchOptions: RequestInit = {
          method: "POST",
          headers: finalHeaders,
          body: bodyString,
        };
        if (combinedSignal) fetchOptions.signal = combinedSignal;

        let response;
        try {
          response = await fetch(url, fetchOptions);
        } finally {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
        }

        // Intra-URL retry: if 429 and we haven't exhausted per-URL retries, wait and retry the same URL
        if (
          response.status === HTTP_STATUS.RATE_LIMITED &&
          (retryAttemptsByUrl[urlIndex] ?? 0) < BaseExecutor.RETRY_CONFIG.maxAttempts
        ) {
          retryAttemptsByUrl[urlIndex] = (retryAttemptsByUrl[urlIndex] ?? 0) + 1;
          const attempt = retryAttemptsByUrl[urlIndex];
          log?.debug?.(
            "RETRY",
            `429 intra-retry ${attempt}/${BaseExecutor.RETRY_CONFIG.maxAttempts} on ${url} — waiting ${BaseExecutor.RETRY_CONFIG.delayMs}ms`
          );
          await new Promise((resolve) => setTimeout(resolve, BaseExecutor.RETRY_CONFIG.delayMs));
          urlIndex--; // re-run this urlIndex on the next loop iteration
          continue;
        }

        if (this.shouldRetry(response.status, urlIndex)) {
          log?.debug?.("RETRY", `${response.status} on ${url}, trying fallback ${urlIndex + 1}`);
          lastStatus = response.status;
          continue;
        }

        return { response, url, headers: finalHeaders, transformedBody };
      } catch (error) {
        // Distinguish timeout errors from other abort errors
        const err = error instanceof Error ? error : new Error(String(error));
        if (err.name === "TimeoutError") {
          log?.warn?.("TIMEOUT", `Fetch timeout after ${this.getTimeoutMs()}ms on ${url}`);
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
